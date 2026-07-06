---
name: inbox-watch
description: >
  The monitoring assistant — the eyes on the pipeline between human sessions. Use on a
  schedule (the orchestrator runs it hourly) and on demand when the user says "check the
  inbox", "any replies?", "watch the pipeline", "did anyone write back", "run inbox-watch".
  Each run: loads active pipeline contacts from v_pipeline via psql, searches Gmail for
  NEW replies from those contacts (updates the touches row — reply_at + thread append —
  and fires ONE SMS per new reply to Saren's cell via scripts/sms.sh, deduped across runs
  via .inbox-watch-state.json), reconciles sent mail the dashboard didn't record (Gmail
  message id stored in touches.notes for idempotency), detects booked meetings by
  matching upcoming Google Calendar events (next ~30 days, via the Calendar MCP loaded
  through ToolSearch) against pipeline contact emails — inserting a meetings row
  (deduped on calendar_event_id) so v_pipeline flips the contact to meeting_booked,
  firing ONE "Meeting booked" SMS per event ever, and marking calendar-cancelled
  meetings status='canceled' — watches the 24h outbound SLA (digest SMS only when the
  breach set CHANGED — never nags hourly about the same contact), and between
  08:00-09:59 local adds a morning nudge when the Approve queue has unsorted contacts.
  READ-ONLY against Gmail and Calendar: never sends email, never moves drafts, never
  creates or edits calendar events, never spends Apollo credits; the only outbound
  action is SMS to ADMIN_PHONE_SAREN.
  Falls back to a node IMAP one-shot when the Gmail MCP is not connected this session;
  if both fail it reports and exits — never stalls. Distinct from job-runner (drains
  agent_jobs) and the dashboard's per-contact thread view (on-demand UI) — this is the
  unattended whole-pipeline sweep with the 90-second-SLA reply alert.
---

# Inbox Watch (monitoring assistant — reply alerts, sent reconciliation, meetings, SLA)

The assistant stage of the playbook. Runs unattended every hour (the orchestrator owns
the schedule) and whenever the user asks. Its one job: notice what changed in the
mailbox, the calendar, and the pipeline since the last run, write the truth into
Supabase, and tap Saren on the shoulder by SMS only when something actually needs
him — a reply (90-sec SLA goal), a freshly booked meeting, or a CHANGED set of SLA
breaches. Everything else is a silent reconcile.

## Hard rules

- **NEVER send an email. NEVER move, edit, or delete a draft.** Gmail access here is
  read-only — search and fetch, nothing else.
- **NEVER create, edit, respond to, or delete a calendar event.** Calendar access is
  read-only — `list_events` (and a targeted `get_event` when checking a cancellation),
  nothing else.
- **NEVER spend Apollo credits.** This skill does not enrich, reveal, or match.
- **SMS only to ADMIN_PHONE_SAREN**, only via `scripts/sms.sh` (which hard-codes that
  recipient). Max three SMS kinds per run: one per NEW reply, one per NEWLY detected
  meeting, plus at most one digest. Cancellations never SMS.
- **Dedupe is sacred.** A reply alerts exactly once, ever (state file). A meeting
  alerts exactly once per calendar event, ever (state file). A breach digest fires
  only when the breach set changed since last run. No hourly nagging.
- **Never stall.** Gmail MCP missing → IMAP fallback. IMAP fails → report the failure
  in the run summary and exit cleanly. Calendar MCP missing → skip meeting detection,
  note the degradation, keep going. A monitoring agent that hangs is worse than one
  that skips a run.

## DB access

`psql` using the connection string from `dashboard/.env.local` — grep the var, never
`source` the file, never print/echo the URL:

```bash
psql "$(grep '^SUPABASE_DB_URL=' dashboard/.env.local | cut -d= -f2-)" -c "<sql>"
```

Escape single quotes in SQL strings by doubling them. For jsonb thread appends, use
`coalesce(thread,'[]'::jsonb) || jsonb_build_object(...)`.

## Step 0 — Load state, then the watch list

**State file:** `.inbox-watch-state.json` at project root (gitignored — if the
`.inbox-watch-state.json` line is missing from `.gitignore`, add it before writing the
file). Shape:

```json
{
  "last_run_at": "2026-06-10T17:00:00Z",
  "alerted_reply_message_ids": ["<CAF=abc123@mail.gmail.com>", "..."],
  "reconciled_sent_message_ids": ["<CAF=def456@mail.gmail.com>", "..."],
  "alerted_meeting_event_ids": ["<google_calendar_event_id>", "..."],
  "last_breach_set": ["<contact_id>", "<contact_id>"],
  "reply_sla_log": [
    {"message_id": "<CAF=abc123@...>", "reply_at": "2026-06-12T18:02:11Z",
     "alerted_at": "2026-06-12T19:07:40Z", "latency_s": 3929}
  ]
}
```

Read it at start; write it at end (always, even on a partial run — record what WAS
processed). If the file doesn't exist (first run), treat `last_run_at` as 24h ago and
all lists as empty. A state file written before this list existed simply lacks the
`alerted_meeting_event_ids` key — treat missing as empty, don't error. Cap the two
message-id lists at the most recent ~500 entries each when writing — Gmail search is
already windowed by date, so old ids can age out. `alerted_meeting_event_ids` is not
capped (meetings are rare; the list stays tiny).

**Watch list** — every active (non-archived) pipeline contact with an email:

```sql
select p.contact_id, p.full_name, p.company, p.email, p.stage, p.next_action,
       p.next_due, p.overdue, p.fit_score, p.client
from v_pipeline p
where p.email is not null and p.email <> ''
order by p.priority;
```

Also grab each contact's latest sequence and latest sent/queued touch in one pass —
the reply and reconcile steps need them:

```sql
select s.contact_id, s.id as sequence_id,
       (select t.id from touches t where t.sequence_id = s.id and t.sent_at is not null
         order by t.sent_at desc limit 1)   as last_sent_touch_id,
       (select t.id from touches t where t.sequence_id = s.id and t.status = 'queued'
         order by t.scheduled_at desc limit 1) as queued_touch_id
from sequences s
where s.contact_id in (<watch-list ids>)
  and s.started_at = (select max(s2.started_at) from sequences s2
                      where s2.contact_id = s.contact_id);
```

Empty watch list → write state, report "0 active contacts", exit.

## Step 1 — Gmail access (MCP first, IMAP fallback, then give up loudly)

**Primary — Gmail MCP** (available when this runs in a work-account session): use
`search_threads` / `get_thread`. Probe availability with one cheap call; if the tools
are not in the session, fall back immediately — do not retry.

Search queries, windowed by `last_run_at` (Gmail `after:` takes `YYYY/MM/DD`, so use
the DATE of last_run_at and filter exact timestamps yourself — the message-id dedupe
makes the over-fetch harmless). Batch contacts to keep queries sane (~20 addresses per
query):

- Replies: `from:(a@x.com OR b@y.com OR ...) after:YYYY/MM/DD`
- Sent: `in:sent to:(a@x.com OR b@y.com OR ...) after:YYYY/MM/DD`

**Fallback — node IMAP one-shot** using the dashboard's ImapFlow dependency and the
IMAP creds in `dashboard/.env.local` (read them inside node from the file — never
paste credentials onto the command line). Exact command, run from project root:

```bash
node --input-type=module -e '
import { ImapFlow } from "./dashboard/node_modules/imapflow/lib/imap-flow.js";
import { readFileSync } from "fs";
const env = Object.fromEntries(readFileSync("dashboard/.env.local","utf8")
  .split("\n").filter(l => l.includes("=") && !l.startsWith("#"))
  .map(l => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]));
const since = new Date(process.argv[1]);            // last_run_at ISO string
const addrs = process.argv.slice(2);                // contact emails
const me = [env.GMAIL_IMAP_USER, "saren@saren.ai", "saren@wethos.ai"]
  .filter(Boolean).map(a => a.toLowerCase());
const client = new ImapFlow({ host: "imap.gmail.com", port: 993, secure: true,
  auth: { user: env.GMAIL_IMAP_USER, pass: env.GMAIL_IMAP_PASS }, logger: false });
await client.connect();
const lock = await client.getMailboxLock("[Gmail]/All Mail");
const out = [];
try {
  for (const addr of addrs) {
    const uids = await client.search({ since, or: [{ from: addr }, { to: addr }] });
    if (!Array.isArray(uids) || uids.length === 0) continue;
    for await (const msg of client.fetch(uids.slice(-10),
        { envelope: true, bodyParts: ["1"], uid: true }, { uid: true })) {
      const e = msg.envelope ?? {};
      const from = (e.from?.[0]?.address ?? "").toLowerCase();
      const body = (msg.bodyParts?.get("1")?.toString("utf8") ?? "")
        .split("\n").filter(l => !l.startsWith(">") && !/^On .+wrote:/.test(l))
        .join("\n").replace(/\r/g, "").trim().slice(0, 500);
      out.push({ contact: addr, direction: me.some(a => from.includes(a)) ? "sent" : "reply",
        message_id: e.messageId ?? "", date: e.date?.toISOString?.() ?? "",
        subject: e.subject ?? "", from, snippet: body });
    }
  }
} finally { lock.release(); }
await client.logout();
console.log(JSON.stringify(out));
' -- "<last_run_at_iso>" <email1> <email2> ...
```

(That import path matches `dashboard/node_modules/imapflow`'s main module; if it
errors, check `dashboard/node_modules/imapflow/package.json` `main` and adjust.) Keep
the address list per invocation under ~30; loop for more.

**Both fail** → set a `gmail_unavailable` flag, skip Steps 2-3, still run Steps 4-6
(Step 4 needs only Calendar + DB; Steps 5-6 are DB-only), and say so plainly in the
report. Never stall.

## Step 2 — Reply detection (the 90-second SLA alert)

For each inbound message FROM a watched contact, newer than `last_run_at`, whose
Gmail message-id is NOT in `alerted_reply_message_ids`:

1. **Update the touches row** — the contact's latest SENT touch (from the Step 0
   sequence query; if the contact has no sent touch, create a `touch_num` continuation
   row on the latest sequence with `status='replied'` so the reply has a home):

   ```sql
   update touches
      set reply_at = '<message date iso>',
          thread   = coalesce(thread, '[]'::jsonb) || jsonb_build_object(
                       'role', 'them',
                       'content', '<one-sentence summary of the reply>',
                       'at', '<YYYY-MM-DD>')
    where id = '<last_sent_touch_id>'
      and reply_at is null;  -- never clobber an earlier recorded reply
   ```

   If `reply_at` was already set (a second reply on the same touch), append to
   `thread` only. `v_pipeline` flips the contact's stage to `replied` automatically —
   do not touch `contacts.stage` here.

2. **SMS immediately**, one per new reply:

   ```bash
   scripts/sms.sh "Reply from <Full Name> (<Company>): <one-line snippet>. 90-sec SLA — open the pipeline."
   ```

   The script truncates at 300 chars; trim the snippet to ~120 chars yourself so the
   name and the call to action always survive.

3. Add the message-id to `alerted_reply_message_ids`.

4. **Instrument the SLA** — append to `reply_sla_log` in state: the message-id, the
   reply's Gmail date (`reply_at`), the SMS time (`alerted_at`, now), and
   `latency_s` (alerted_at − reply_at, whole seconds). This is the real number
   behind the 90-second-SLA goal: on an hourly schedule it will read ~minutes-to-an-
   hour, and that documented gap is the case for a faster trigger — measure it,
   don't hide it. Cap the log at the most recent ~200 entries. Missing key in an
   older state file = start it empty, don't error.

A reply that arrived before `last_run_at` but is somehow unrecorded: record it in the
DB (step 1) but only SMS if its message-id was never alerted — the state list, not the
timestamp, is the alert dedupe.

## Step 3 — Sent reconciliation

The dashboard records a send when the human clicks through it — but humans also send
straight from Gmail. For each message in Sent TO a watched contact, newer than
`last_run_at`, whose message-id is NOT in `reconciled_sent_message_ids`:

1. **Idempotency check** — same coordination the dashboard sync uses: the Gmail
   message id lives in `touches.notes`. Skip if already recorded:

   ```sql
   select id from touches t join sequences s on s.id = t.sequence_id
   where s.contact_id = '<contact_id>' and t.notes like '%<message_id>%';
   ```

2. **Match the touch.** Prefer the contact's `queued` touch (the dashboard staged the
   draft; the human sent it from Gmail) — flip it to sent. Else, if the latest sent
   touch has a `sent_at` within ~2 minutes of the message date, it is already
   recorded — just stamp the message-id into its notes. Else insert a new touch
   (server-authoritative numbering, same rule as the dashboard: next = last sent + 1):

   ```sql
   -- flip a queued touch:
   update touches
      set status = 'sent', sent_at = '<message date iso>',
          notes  = trim(both E'\n' from coalesce(notes,'') || E'\n' || 'gmail_message_id: <message_id>')
    where id = '<queued_touch_id>';

   -- or insert an unrecorded send:
   insert into touches (sequence_id, touch_num, channel, status, sent_at, subject, notes, thread)
   values ('<sequence_id>',
           (select coalesce(max(touch_num),0)+1 from touches
             where sequence_id = '<sequence_id>' and sent_at is not null),
           'email', 'sent', '<message date iso>', '<subject>',
           'gmail_message_id: <message_id> (inbox-watch reconcile)', '[]'::jsonb);
   ```

   A contact with no sequence at all: create the minimal one first
   (`play='cold-outbound', status='active', started_at=<message date>`), matching the
   dashboard's `queueTouchDraft` fallback.

3. Add the message-id to `reconciled_sent_message_ids`. No SMS for reconciles — this
   is bookkeeping, not news.

## Step 4 — Meeting detection (calendar → meetings table) — runs even when Gmail is down

A booked meeting is the pipeline's terminal win. Each run, sweep the calendar for
upcoming events with a pipeline contact in the attendee list and make the DB reflect
them — `v_pipeline` does the stage flip on its own.

**Calendar access:** a Google Calendar MCP server is connected on this account but its
tools are deferred — load them via ToolSearch first (e.g. query `+calendar list
events`, then call `list_events`). If no Calendar MCP is connected this session, skip
this step entirely and note the degradation in the report ("Calendar MCP unavailable —
meeting detection skipped this run") — never stall, and never guess at events. There
is no fallback path for the calendar; read-only `list_events` / `get_event` are the
only calls allowed.

1. **Fetch the window:** `list_events` on the primary calendar from now to now+30
   days. Results paginate — follow `nextPageToken` until exhausted (a 30-day window
   on a busy calendar easily exceeds one page). Collect for each event: event id,
   start time, status, and attendee emails (lowercased).

2. **Match attendees** against the Step 0 watch-list emails (lowercase both sides).
   Skip events with no attendees and events whose status is `cancelled`. One event can
   match at most one pipeline contact in practice; if it somehow matches several,
   record a meetings row per matched contact but reuse the same event id.

3. **Dedupe on `calendar_event_id`, then insert.** The not-exists guard makes the
   insert itself idempotent — safe even if two runs race:

   ```sql
   insert into meetings (contact_id, client_id, calendar_event_id, scheduled_at, source, status)
   select c.id, c.client_id, '<event_id>', '<event start iso>', 'calendar', 'scheduled'
   from contacts c
   where c.id = '<contact_id>'
     and not exists (select 1 from meetings m where m.calendar_event_id = '<event_id>');
   ```

   `client_id` comes from the contact row — never guess it. An `INSERT 0 0` result
   means the event was already recorded (calendar-detected earlier, or entered
   manually from the dashboard); that is success, not an error.

4. **Verify the flip** after a real insert (INSERT 0 1):

   ```sql
   select stage, next_action from v_pipeline where contact_id = '<contact_id>';
   ```

   Expect `meeting_booked` / `prep_meeting`. If it didn't flip, say so in the report —
   that's a view-logic regression worth a human's eyes.

5. **SMS once per event, ever** — only when THIS run inserted the row (INSERT 0 1) AND
   the event id is not in `alerted_meeting_event_ids`:

   ```bash
   scripts/sms.sh "Meeting booked: <Full Name> (<Company>) <date short>. Prep card is in your Inbox."
   ```

   `<date short>` like `Mon 6/15 2:00pm` (local time). Add the event id to
   `alerted_meeting_event_ids` whether or not the SMS fired — once it's in the
   meetings table it must never alert again.

6. **Cancellations.** For each existing meetings row with `source='calendar'`,
   `status='scheduled'`, and `scheduled_at` in the future: if its `calendar_event_id`
   is absent from the fetched window or the event's status is `cancelled`, confirm with
   a targeted `get_event` when the tool is available (absence from a windowed list is
   weaker evidence than an explicit cancelled status), then:

   ```sql
   update meetings set status = 'canceled'
   where calendar_event_id = '<event_id>' and status = 'scheduled';
   ```

   No SMS for cancellations — `v_pipeline` drops the contact back to its underlying
   stage automatically, and the change shows in the run report. Never touch rows whose
   `scheduled_at` is in the past (they're outside the fetch window by design — that's
   the `held`/`no_show` bookkeeper's territory, not this skill's).

## Step 5 — SLA watch (24h outbound) — DB-only, runs even when Gmail is down

Compute the current breach set:

```sql
-- breach A: a scheduled next touch blown by more than 24h
select p.contact_id, p.full_name, p.company, 'next_due +' ||
       (current_date - p.next_due) || 'd' as breach
from v_pipeline p
where p.next_due is not null and p.next_due < current_date - 1;
```

```sql
-- breach B: approved >24h ago, still no first touch
select p.contact_id, p.full_name, p.company, 'approved, no first touch' as breach
from v_pipeline p
join decisions d on d.contact_id = p.contact_id and d.decision = 'approved'
where d.created_at < now() - interval '24 hours'
  and not exists (select 1 from touches t join sequences s on s.id = t.sequence_id
                  where s.contact_id = p.contact_id and t.sent_at is not null);
```

Sort the union of contact_ids and compare with `last_breach_set` from state:

- **Identical** → no digest. Silence is the design — the human was already told.
- **Changed** (any addition OR removal leaving a non-empty set) → ONE digest SMS, max
  one per run, listing up to ~4 names: `"SLA: <N> overdue — <Name> (<Co>) +3d, <Name>
  (<Co>) no first touch[, +k more]."` New breaches first.
- **Emptied** → no SMS; just note "breach set cleared" in the report.

Write the new set to state regardless.

## Step 6 — Morning nudge (08:00-09:59 local only)

If the run's local time is between 08:00 and 09:59, count the unsorted Approve queue —
scored contacts the human has not ruled on:

```sql
select count(*) from v_pipeline p
where p.stage = 'sourced' and p.fit_score is not null
  and not exists (select 1 from decisions d where d.contact_id = p.contact_id);
```

If N > 0, append one line to the digest: `"N contacts awaiting your sort."` — riding
along in the Step 5 digest when one is going out anyway, or as its own single SMS when
there is no breach digest this run. Outside the 08:00-09:59 window, skip entirely;
this fires at most once per morning in practice because the window is two hourly runs
wide and the queue usually gets sorted after the first.

## Step 7 — Write state, then report

Write `.inbox-watch-state.json` (full shape from Step 0, `last_run_at` = this run's
start time so nothing that arrived mid-run falls in a gap). Then report, every run,
exactly this footing:

```
inbox-watch <timestamp>: replies found: N | sends reconciled: N | meetings detected: N | SLA breaches: N (changed|unchanged|cleared) | SMS sent: N | reply-alert latency: <this run's worst, human units; "—" when no new replies>
```

When `reply_sla_log` holds ≥5 entries, also report a one-line rolling read —
`reply SLA to date: median <m>m, worst <h>h over <N> replies (goal: 90s)` — so the
gap between the hourly schedule and the 90-second goal stays visible until a faster
trigger exists.

(`meetings detected` counts new meetings rows inserted this run; note cancellations
separately when any occurred, e.g. "1 meeting canceled".) Plus, when non-zero: one
line per reply (name, snippet, touch updated), one line per reconcile (name,
queued-flip or insert), one line per meeting (name, company, event start, flip
verified), the breach list, and any degradation ("Gmail MCP unavailable, used IMAP
fallback" / "Gmail unreachable — reply detection skipped this run" / "Calendar MCP
unavailable — meeting detection skipped this run").

## Boundaries

- Read-only against Gmail. Drafting is the dashboard's and job-runner's job; sending
  is the human's. This skill only observes and records.
- Read-only against Calendar. Booking, rescheduling, and responding to invites are the
  human's; this skill only notices what the human (or the contact) already booked.
- No Apollo calls of any kind. Not even free ones — this skill has no business there.
- SMS only through `scripts/sms.sh`, only to ADMIN_PHONE_SAREN, only for: a new reply,
  a newly detected meeting, a changed breach digest, the morning nudge. Nothing else
  earns a text — cancellations and reconciles are silent.
- Per-client isolation does not relax: the watch list spans clients (one mailbox), but
  summaries written into `thread` stay factual — no voice, no angles.
- Never schedule yourself. The orchestrator owns the cadence; on-demand runs are the
  user's call.
- State file stays out of git. If `.gitignore` lost the `.inbox-watch-state.json`
  line, restore it before writing the file.
