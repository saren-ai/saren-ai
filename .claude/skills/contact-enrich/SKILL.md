---
name: contact-enrich
description: >
  White-glove deep-OSINT dossier builder for APPROVED target contacts — the post-sort
  research stage of the playbook. Use when the user says "enrich <name>", "research the
  approved contacts", "build the contact dossier", "deep dive on <contact>" — after the
  human approves contacts in the dashboard sort phase, or via job-runner draining
  agent_jobs rows with skill='enrich-contact' (the dashboard's Approve button inserts
  exactly that string; 'contact-enrich' is also accepted). Researches each approved
  contact's published writing, talks, social presence, and company context, then runs a
  matchmaking pass against the client's salesperson dossier (shared companies, alumni
  networks, communities, geography). Writes personalization_seed / recommended_angle /
  buying_role_hypothesis back to the contacts table, stashes the full cited dossier in
  tool_outputs, and reports a per-contact hook + angle + matchmaking seams summary.
  HARD GATE: only runs on human-approved contacts (a decisions row, a dashboard-created
  agent_jobs row, or the user naming the contact in chat) — refuses to bulk-enrich
  unapproved lists. Apollo credit spend (email reveal) only on kind='enrich' jobs or
  explicit chat confirmation, never silently. Default research depth is LIGHT — a
  rapid pass per lane; 'medium' runs only via agent_jobs.params.depth='medium', an
  explicit user ask ("go deeper on X"), or as a flagged recommendation when the light
  pass comes back thin (never a silent escalation). Honors agent_jobs.params.direction
  (the human's free-text note at approval time) to weight the research lanes. Distinct
  from client-intake (CLIENT-side dossiers) and apollo-people-search (list building) —
  this is TARGET-side depth, on the few contacts worth it.
---

# Contact Enrich (deep OSINT — post-approval only)

The expensive research stage, deliberately placed AFTER the human sort. AGENTS.md hard
rule: **deep OSINT only after human approval of a contact — white-glove economics.**
Agent 1 finds hundreds for free; Agent 2 scores them cheaply; the human approves a
handful; THIS skill spends real research effort on only those. If asked to enrich a
list nobody approved, refuse and point at the Approve queue — burning an hour of OSINT
on a contact the human would have rejected in two seconds is exactly the waste the
sort phase exists to prevent.

Output is fuel for the writer (Agent 3): one true, specific, recent hook per contact;
the angle that fits; the matchmaking seams between THIS salesperson and THIS target.
Supabase is the system of record — the dossier lands in `tool_outputs`, the
distilled fields land on the `contacts` row, and the chat summary is a courtesy copy.

## DB access (every step that touches the DB)

`psql` using the connection string from `dashboard/.env.local` — grep the var, never
`source` the file, never print/echo the URL:

```bash
psql "$(grep '^SUPABASE_DB_URL=' dashboard/.env.local | cut -d= -f2-)" -c "<sql>"
```

Escape single quotes in SQL strings by doubling them (`O'Brien` → `O''Brien`). For
multi-line writes (the dossier insert), pipe a heredoc into psql and dollar-quote the
markdown body (`$dossier$ ... $dossier$`) so quotes and newlines pass through intact.

## Step 0 — The gate: resolve client + the APPROVED set

Read `.active-client` (route to client-context if unset). Then establish, per contact,
WHICH approval path applies. Exactly three are valid:

1. **A human verdict in `decisions`** — an `'approved'` row for this contact.
2. **A dashboard-created job** — an `agent_jobs` row with
   `skill in ('enrich-contact','contact-enrich')` for this contact (the Approve
   button's insert; honor both spellings).
3. **The user names the contact explicitly in chat** — "enrich Jane Doe at Acme" is
   itself the human approval. Names only; "enrich everyone sourced yesterday" is NOT
   naming contacts and fails the gate.

To collect the approved-but-not-yet-enriched queue:

```sql
select distinct ct.id, ct.full_name, ct.title, ct.company, ct.email, ct.email_status,
       ct.linkedin_url, ct.apollo_id, ct.fit_score, ct.segment, ct.stage
from contacts ct
left join decisions  d on d.contact_id = ct.id and d.decision = 'approved'
left join agent_jobs j on j.contact_id = ct.id
                      and j.skill in ('enrich-contact','contact-enrich')
                      and j.status in ('requested','claimed','running')
where ct.client_id = (select id from clients where slug = '<client>')
  and coalesce(ct.archived, false) = false
  and (d.id is not null or j.id is not null)
  and coalesce(ct.stage, 'sourced') not in ('enriched','sequenced','in_outreach','replied');
```

If the request would enrich anyone NOT covered by a path above, stop and say so —
cite the white-glove rule, list which contacts ARE approved, and suggest the dashboard
Approve queue for the rest. Never quietly widen the set.

**Job params:** the dashboard's Approve flow writes
`agent_jobs.params = {depth: 'light'|'medium', direction: '<free-text note>'}`. Read
them per job: `depth` selects the research depth (see "Depth policy" below; absent or
unrecognized → `light`), and `direction` is the human's steering note at approval time
("focus on their podcast", "I met him at ACG — verify") — it weights which lanes get
effort and is quoted verbatim in the dossier header. Honor the same two signals from
chat: a user saying "go deeper on X" is `depth='medium'` for X.

**Job hygiene:** when entered via job-runner, the runner owns the job row — just do
the work and return the summary. When you pulled `requested` jobs from `agent_jobs`
yourself (no runner in the loop), close them out the way job-runner does: `running` +
`started_at` before, `done`/`failed` + `finished_at` + `result`/`error` after.

## Step 1 — Load context before searching

Per contact, load BOTH sides of the match:

- **Target side:** the contact row (above) plus `contact_sources.raw` for the Apollo
  payload (org, location, seniority — free facts already paid for).
- **Client side:**
  - `clients/<client>/dossier/people/*.md` (the salesperson dossier(s) — especially
    "Matchmaking fuel" and "LinkedIn comparison profile" sections)
  - `clients/<client>/dossier/sources/*linkedin*.md` — the salesperson's LinkedIn
    source file(s), which carry the full chronological employment timeline and the
    company list used for overlap searches. Load this alongside the people dossier;
    it is the ground truth for company-by-company comparison.
  - `dossier/company.md`, `dossier/product.md`
  - `clients/<client>/icp-research.md` if it exists (pain points, watering holes,
    message angles), and `fit-scoring.md` if the client has one.

## Depth policy — light by default, medium by request

The goal at **light** (the default): noticeably more than a Google glance, never a
novel. Rapid research across multiple channels, not a five-minute deep dive per lane.

- **Light** — one fast pass per research lane (writing / speaking / social / company):
  **max ~2-3 searches per lane**, take the best of what surfaces, move on. The
  **matchmaking pass always runs** — it's the white-glove differentiator — but quick:
  compare what the light lanes found against the salesperson dossier; don't launch new
  searches just to hunt for seams. The finished dossier is capped at **roughly one
  screen of markdown** — same section skeleton, one or two cited bullets per section.
- **Medium** — the fuller fan-out: more searches per lane, follow promising threads,
  fetch primary sources. Runs ONLY when one of these holds:
  1. `agent_jobs.params.depth = 'medium'`,
  2. the user asks in chat ("go deeper on X", "medium dive on Jane"), or
  3. — as a **recommendation, never an auto-run** — the light pass came back thin.
     Report "thin — recommend medium dive" with what light coverage did find, and let
     the human pull the trigger. Never silently escalate.
- **`params.direction`** (the human's free-text note from the Approve flow) steers
  lane weight at either depth: "focus on their podcast" → spend the speaking-lane
  budget there and trim elsewhere; "I met him at ACG — verify" → put the matchmaking
  pass on that seam first. Quote the direction verbatim in the dossier header so the
  writer sees what the human flagged.

Depth changes search budget and dossier length — it changes NOTHING else. The
approval gate, Apollo credit rules, citation honesty, and per-client isolation apply
identically at every depth.

## Step 2 — Research fan-out (WebSearch / WebFetch)

Five lanes per contact, budgeted per the depth policy above (light: ~2-3 searches per
lane; medium: the fuller fan-out). When enriching multiple contacts, spawn one parallel
subagent per contact, each running all five lanes — don't serialize a batch.

1. **Published writing** — articles, blog posts, company-blog authorship, guest posts,
   newsletters. Search name + company, name + topic, `site:` the company blog.
2. **Speaking** — conference talks, webinars, podcast appearances. Capture dates and
   the event/show name; a 2019 talk is a biography fact, a 2026 talk is a hook.
3. **Social presence** — LinkedIn activity themes via web search (posts, comments,
   articles surfaced in results — **no login scraping, ever**); X/Bluesky if findable.
   Themes, not a feed dump: what do they keep talking about?
4. **Company context** — recent funding, product launches, press, leadership changes,
   open roles. Use `apollo_organizations_job_postings` (free) if the Apollo MCP is
   connected this session; job boards via web search otherwise. Open roles are both a
   pain signal and a timing hook.
5. **Matchmaking pass** — the white-glove differentiator. Lanes 1–4 find facts;
   this lane finds the *bridge*. A dossier with no attempted matchmaking pass is
   incomplete. Run these sub-steps in order:

   **5a. LinkedIn employment timeline comparison.** From the salesperson's LinkedIn
   source file (loaded in Step 1), extract the full list of past companies and their
   date ranges. Then search the target's LinkedIn profile via web search
   (`"[target first last]" site:linkedin.com`) to surface their employment history.
   Go company by company: did the target work at any of the salesperson's past
   employers — even in different roles, different offices, or adjacent years? Overlaps
   don't have to be concurrent; an ex-Cylance contact who joined after Saren left is
   still an alumni seam. Record every match with dates.

   **5b. Direct co-worker search.** For any company overlap found in 5a, search
   `"[target name]" "[company name]"` to confirm the overlap and find any public
   evidence of shared projects, teams, or mutual colleagues. Then search for the
   target alongside key named connections from the salesperson dossier (e.g.,
   `"[target name]" "Stuart McClure"` if Cylance/Qwiet is the seam, or another
   named former colleague). A mutual named connection is a stronger bridge than a
   shared employer.

   **5c. Community and event overlap.** Cross-reference the target's speaking,
   associations, and communities (from lanes 1–3) against the salesperson's community
   list (ProVisors, ACG OC, Irvine Chamber, Sol Hub, GigX, Sarah Lawrence alumni,
   Japanese-American community, SXSW, etc.). Search `"[target name]" "ProVisors"` (or
   whichever community is plausible given the target's profile) to find shared affiliations.

   **5d. Synthesize.** Rank every seam found: (1) direct co-worker with named shared
   colleague, (2) same employer with date overlap, (3) same employer alumni (no date
   overlap), (4) shared community / association, (5) geography + industry proximity.
   Report the top seam clearly; list others as supporting context. If no seam is found
   after all searches, say so explicitly — "no overlap found" is a valid, stated result
   and is more useful to the writer than silence or hedging.

**Honesty rules — non-negotiable:**
- Every claim in the dossier carries a citation: URL + the date of the content (or
  access date when undated). No citation, no claim.
- Never fabricate, never embellish, never promote a "probably" to a fact. The writer
  agent will put these claims in a real email under the client's name.
- **"Nothing public found" is a valid outcome.** Report it per lane, mark the contact
  as a **thin dossier** in both the chat summary and the dossier itself — the writer
  needs to know it must lean on company context and matchmaking instead of a personal
  hook. Do not pad a thin dossier with generic industry filler to make it look full.
  When the LIGHT pass is what came back thin, report **"thin — recommend medium dive"**
  (per the depth policy) rather than escalating yourself — more searches might fix
  thin, but that's the human's call.

## Step 3 — Disqualification check

Research sometimes kills a contact, and that's a win — it saves three touches. If you
find the contact **left the company**, moved into a non-buying role, works at a
**competitor or conflict** (check `dossier/company.md` competitors), or anything else
disqualifying: stop enriching, recommend archive with the reason, and on confirmation:

```sql
update contacts set archived = true, updated_at = now() where id = '<contact_id>';
insert into decisions (client_id, contact_id, decision, reason, notes)
values ('<client_id>', '<contact_id>', 'archived', 'left-company',
        'contact-enrich: <one-line evidence + URL>');
```

The `decisions` row feeds the scorer — a disqualification discovered late is exactly
the signal that teaches it to catch the pattern early.

## Step 4 — Apollo email enrichment (COSTS CREDITS — guarded)

Only relevant when the contact **lacks a verified email** (`email_status` not in
`verified`/`valid`). Even then, spend a credit ONLY when one of these holds:

- The driving `agent_jobs` row has `kind = 'enrich'` (the human confirmed the spend in
  the UI — the only path that creates that kind), or
- The user explicitly confirms in chat, using apollo-people-search's exact wording:
  > "This will enrich [N] people and consume up to [N] credits (1 credit per match,
  > no charge for unmatched). Do you want to proceed?"

Note the dashboard's Approve button creates `kind='action'` jobs — approval to
RESEARCH is not approval to SPEND. Never silently call `apollo_people_match` /
`apollo_people_bulk_match`. On reveal, update `email`, `email_status`, and stash the
payload via `contact_sources` per the apollo-people-search pattern.

## Step 5 — Write back to Supabase

**5a. Distill onto the contact row.** The seed is the single best TRUE, specific,
recent hook — one sentence, citable. The angle names which message angle fits (from
`icp-research.md` "Message angles" when it exists) and why, in a phrase.

```sql
update contacts
   set personalization_seed   = '<one sentence, the best hook>',
       recommended_angle      = '<angle + why, one phrase>',
       buying_role_hypothesis = '<economic buyer / champion / influencer + evidence>',
       fit_score              = <only if research materially changes it — else omit>,
       stage                  = 'enriched',
       last_action_date       = now(),
       updated_at             = now()
 where id = '<contact_id>';
```

Adjust `fit_score` only on a material discovery (e.g., they own the exact problem, or
the company just funded the initiative) — note the old → new value and the reason in
the chat summary. Be aware `v_pipeline` derives its live stage from `email_status`
(verified/valid → 'enriched'), so a contact enriched without a verified email keeps
showing `sourced`/`enrich` in the dashboard until the email is verified — that's the
view working as designed, not a write failure.

**5b. Stash the full dossier in `tool_outputs`.** Check the live schema first
(`\d tool_outputs` via psql) and look at existing rows (`select tool_id, export_format
from tool_outputs limit 5`) — follow the established row pattern. Current shape
(matches outreach-ingest):

```sql
insert into tool_outputs (tool_id, contact_id, output, export_format, version, created_at)
values ('contact-enrich', '<contact_id>',
        jsonb_build_object('dossier_md', $dossier$<full dossier markdown>$dossier$::text),
        'markdown',
        coalesce((select max(version)+1 from tool_outputs
                  where contact_id = '<contact_id>' and tool_id = 'contact-enrich'), 1),
        now());
```

Versioned on purpose — a re-enrich months later is a NEW version, never an overwrite.

## The dossier (what goes in `tool_outputs`)

At light depth the whole document stays ~one screen of markdown — keep every section,
shrink the bullets. Omit the Direction line when no direction was given.

```markdown
# Contact Dossier: <Full Name> — <Title>, <Company>
Client: <client> · Enriched: <date> · Depth: light | medium · Coverage: full | thin
Direction: "<params.direction quoted verbatim>"

## Identity & role
## Company snapshot                <!-- funding, launches, press, open roles — dated -->
## What they're saying publicly    <!-- writing, talks, social themes — every item cited + dated -->
## Pain hypothesis                 <!-- tied to icp-research.md ranked pains when it exists -->
## Matchmaking seams               <!-- salesperson ↔ target bridges, each with its evidence;
                                        "none found" is a valid, stated result -->
## Personalization seed candidates <!-- exactly 3, ranked; #1 is what went on the contact row -->
## Recommended angle               <!-- which angle + why; angles to AVOID for this person -->
## Sources                         <!-- every URL with access/content date -->
```

## Step 6 — Report per contact

Concise, per contact, in chat: the depth run (light/medium) and the direction honored
(if any), the hook (the seed), the recommended angle, matchmaking seams found (or
"none"), thin-dossier flag if applicable — phrased **"thin — recommend medium dive"**
when a light pass came back thin — and any fit_score change with reason. For
disqualifications: the evidence and the archive recommendation instead.
Close with the handoff: "Dossier(s) stored in tool_outputs; contacts at stage
`enriched`. Next: sequence-writer (or `/sales outreach`) reads the dossier + the
salesperson dossier to draft the sequence."

## Boundaries

- **Never enrich unapproved contacts in bulk.** The gate in Step 0 is the skill's
  reason to exist. White-glove economics (AGENTS.md): deep research on ~3/day that a
  human chose, not on everything Agent 1 found.
- **Never spend Apollo credits silently.** `kind='enrich'` or explicit chat
  confirmation only (Step 4). Research approval ≠ spend approval.
- **Never silently escalate depth.** Light is the default; medium needs
  `params.depth='medium'`, an explicit user ask, or a human's yes to a
  "thin — recommend medium dive" report. Depth never relaxes any other rule.
- **No login scraping** of LinkedIn or any walled platform. Public web only.
- **Never fabricate.** Uncited claims don't ship; thin dossiers get flagged, not padded.
- **Don't write outreach copy here** — that's sequence-writer / the vendor suite. The
  seed is a hook, not a first line.
- **Client-side dossiers are client-intake's** — if the salesperson dossier is missing
  matchmaking fuel, flag it and suggest a client-intake run; don't research the CLIENT
  here.
- **Per-client isolation:** never reuse another client's research, angles, or voice.
- Supabase is the store. Any .md file export of a dossier is on-demand output from
  `tool_outputs`, never the source of truth.
