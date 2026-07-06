# SPRINT.md — Playbook Build-Out (Mon 2026-06-08 → Fri 2026-06-12)

**Goal:** the full white-glove playbook operational by EOD Friday 2026-06-12 —
dossiers → ICP → list-build → score → human sort → deep OSINT → personalized
sequences → Gmail drafts → monitored touches, for both clients, on a daily heartbeat.

**How to resume in ANY session (either account):** read `AGENTS.md`, then this file
top to bottom. The current day's "Next up" list is the work queue. Update this file
at the end of every working session — status, blockers, decisions. This file is the
single source of momentum across sessions and accounts.

---

## Status board

| Day | Theme | Status |
|---|---|---|
| Tue 06-09 | Foundation + Agent 0 (dossiers, ICP research, learning schema) | ✅ done |
| Wed 06-10 | Agents 1+2: scorer, sort-phase capture, contact-enrich OSINT, real Apollo batch | ✅ done |
| Thu 06-11 | Agent 3: per-client voice, sequence-writer, Review queue edit capture | ✅ pulled forward to Wed PM |
| Fri 06-12 | Assistant: inbox-watch, daily driver, SMS alerts, meeting detection, E2E run | 🟡 mostly done Wed PM — meeting detection + E2E remain |

## Done (Tue 06-09)
- Git repo initialized, baseline + Day-1 commits; AGENTS.md; secrets-safe .gitignore
- client-intake rewritten → layered dossier system (company / people / product / sources)
- Both clients migrated to dossier structure; voice.md extracted per client
- icp-builder upgraded → deep persona/market research phase (icp-research.md)
- Migration 005 authored (decisions, draft_edits, meetings, meeting_booked stage,
  client quota/settings/sms columns) — **written, NOT yet applied** (see blockers)
- Saren's real sources ingested: LinkedIn PDF (converted), résumé v03, professional
  dossier → people/saren.md now has full career history + matchmaking fuel

## Blockers
- **2 replied contacts awaiting a human response** (Meegan Johnson/CEO,
  Richard Meyers/Exec Director) — top of Inbox since ~06-10; drafts only, human sends.
- **Session limit hit Fri 06-12 (resets 12pm PT)** — sequence-writer runs for
  May Mitchell + Kostyantyn died mid-dispatch; both still at stage 'enriched', re-run first.
- **10 of 13 newly enriched contacts have NO email.** Apollo reveal ≈ up to 10 credits
  (1/match) — needs Saren's explicit confirmation (asked 06-12, deferred). Cheaper
  paths: Kostya (Saren likely has his personal email), May Mitchell (1st-degree
  LinkedIn DM viable). May + Kostya sequences are READY and waiting only on addresses.
- ~~Railway auth~~ RESOLVED 06-12: Saren ran `railway login`; **dashboard DEPLOYED** —
  https://dashboard-production-5bd7.up.railway.app (service `dashboard` in project
  `tender-fascination`; free-plan project limit forced co-tenancy with the offline
  kanjilicious service). Dockerfile built first try; auth gate verified live
  (401/401/200). Secrets pushed via CLI shell-substitution, never through chat.
  Per Saren's instruction, `millionaire` + `frontend` services taken offline
  (`railway down`, both URLs now 404) to stay inside free-plan limits.
- **Heartbeat still Mac-bound** — the last durability leg. Decided approach: port
  inbox-watch's reply-detection + SMS + SLA-log core into a dashboard `/api/cron`
  route (imapflow/Twilio/Supabase already in the app), then Railway cron every
  5 min — the only path that makes the 90-sec reply SLA physically achievable.
  ~2-3h build; Claude-side skill keeps meetings/briefing/digests.

DB ops path: `psql "$SUPABASE_DB_URL"` (var in dashboard/.env.local; don't `source` —
grep the var). Supabase MCP token is unauthorized on the work account; psql is the path.

Live DB state (2026-06-10 PM): v_pipeline 45 — 26 sequenced (review_and_send),
10 sourced, 6 in_outreach, 2 replied, 1 enriched. Clients: saren (38 contacts, now all
sourced scored), **wethosai (0 contacts — needs ICP + first list build)**.

## Next up (Wed 06-10)
1. ✅ Migration 005 applied + verified via psql (keys provisioned; both clients now
   have DB rows: saren + wethosai)
2. ✅ prospect-scorer skill built + clients/saren/fit-scoring.md (surface score,
   threshold ≥25, decisions-table few-shot with ±10 cap)
3. ✅ Dashboard sort phase: Approve/[r]Reject-with-reason/[x]Archive all write
   `decisions`; reads moved to server actions w/ service-role client
   (lib/supabase-server.ts); anon client deleted
4. ✅ contact-enrich skill (post-approval OSINT, matchmaking pass, credit guard;
   job-runner dispatch row added for 'enrich-contact')
5. ✅ meeting_booked stage registered across dashboard; booked meetings pin to top
   of Inbox; tsc + build clean, verified against live DB
6. ✅ Ran prospect-scorer on saren's 14 unscored agency contacts (the Irvine-radius
   1-agencies batch). Top 5 surfaced (all score 37): Kirill Ougarov (Dir RevOps,
   Orange Marketing), Amy Winchell (MD, DemandSkill), Rebecca Cleary (MD, Spotlight),
   Eric Shim (Dir Ops, SEO Aesthetic), Linda Langley (Dir Ops, Capwell). 6 more at 30,
   2 at 27, 1 borderline at 20. Caution flagged: Tetsuya Kosaka @ BuyologyIQ
   (behavioral-science firm — verify not WethosAI-competitor before outreach).
   13 contacts now ≥ threshold awaiting human sort in the Approve queue.
   🟡 **Apollo top-up DEFERRED** — queue already 13-deep vs daily quota 5; piling more
   unsorted inventory ahead of the human-sort bottleneck is against quality-over-volume.
   Run the agencies top-up only after the Approve queue is drained.
7. ⏭️ Dossier→Supabase `documents` sync — DEFERRED to Thu. No `documents` table exists
   yet; needs schema + two-way-sync design (per ROADMAP in-platform editing idea).
8. ✅ Dashboard v2 from first real session feedback (migration 007 applied+verified
   via psql; all flows exercised against live DB w/ test rows, cleaned up after):
   - Inbox drop-on-draft: saving a Gmail draft (reply or next touch) now writes a
     'queued' touch (status check widened; server-authoritative touch_num) and
     v_pipeline treats queued-newer-than-reply/send as in_outreach + not overdue
     → contact leaves Inbox; a newer reply brings it back
   - Inbox [x] archive: reason quick-picks (no-thank-you/not-interested/
     wrong-timing/bounced/other) + note → decisions row, sequence stopped
     ('stopped' added to sequences status check), archived everywhere
   - Approve micro-interactions: [a] note ("direction") + light/medium depth →
     decisions.notes + contacts.notes + agent_jobs params {depth, direction};
     [r] reason digit auto-focuses prominent why-field, Enter saves; [x] optional
     note; [w] Skip-to-writer (required "how I know them" → personalization_seed,
     stage enriched, sequence-writer kind=draft job w/ skip_research)
   - Bug fixed: inject-context (and all per-contact form state) no longer carries
     across records — views keyed by contact id, detail state cleared on switch
   - Review voice training: first-impression field on generated drafts →
     draft_edits (+ feedback column in 007); edited-then-pushed drafts record
     generated-vs-final diff
   - Per-client voice: generateEmailCopy/generateNextTouch load
     clients/<slug>/voice.md (Learned rules included — verified in output) with
     SAREN_VOICE fallback
   - tsc + build clean; Gmail test drafts deleted via IMAP after verification
9. 🟡 006 migration WRITTEN (`migrations/006_drop_anon_policies.sql`), pending
   apply with explicit confirmation (Supabase MCP or SQL editor). Verified safe:
   Studio cockpit authenticates via Supabase Auth (src/proxy.ts gate) so requests
   run as `authenticated` → admin_all_* policies; anon key is only the API key.
   Landing pages (/for/[slug]) keep anon grants on outreach_pages/tool_outputs —
   untouched. BONUS hole found+fixed in 006: v_todays_outreach had
   security_invoker OFF (bypassed RLS) with anon SELECT. Until 006 is applied,
   pipeline tables remain publicly readable/writable with the anon key.

## Done late Wed 06-10 PM (Thu + most of Fri pulled forward; user feedback round 2)
- **sequence-writer skill (Agent 3)** — four-dossier composition, plan + touch-1 copy,
  later touches just-in-time; voice.md Learned rules as hard constraints + draft_edits
  few-shot. Ran live for Tracy Perlongo (skip-research path): warm-reactivation, 3
  touches, subject "overdue hello from the cylance days" — now in Review,
  **flagged no-email (needs lookup before send)**.
- **inbox-watch skill + scripts/sms.sh** — Twilio SMS live-tested to Saren's cell
  (HTTP 201). Reply detection (one SMS per reply, 90-sec SLA), sent reconciliation,
  24h-SLA breach digests (only on set change), morning sort nudge. Hourly schedule
  created: "lead-prospecting-inbox-watch" at :07. State in .inbox-watch-state.json
  (gitignored). Saren authorized hourly sent-mailbox access 2026-06-10.
- **Dashboard v3** (migration 008 applied: approved_at + sla_due_at in v_pipeline):
  SLA chips (green/amber/red, breach-first sort), persona + title pills, thread
  digest (one sentence/msg via Haiku, cached in tool_outputs), on-load + manual
  sent-folder sync (reconciled a real John Fox reply-send), New Client onboarding
  modal (clients row + dossier scaffold + checklist). tsc/build clean.
- **Bug fixed:** getGmailThread UID/seq-number mismatch — thread view had been
  silently empty on large mailboxes.
- **Doc drift fixed:** outreach-ingest 'drafted'→'queued'; contact-enrich
  export_format 'md'→'markdown' (both violated live check constraints).
- Standing directive recorded: always advance the next sprint item every session.

## Next up (Thu 06-11)
0. 🔴 **Human/Saren:** (a) respond to the 2 replied contacts in Inbox; (b) sort the
   13-deep Approve queue for saren — reject-with-reason clicks train the scorer;
   (c) decide on migration 006 (anon-policy hardening — say "apply 006");
   (d) Tracy Perlongo's draft is in Review but she has no email on record.
1. ✅ Meeting-booked detection: inbox-watch Step 4 — Calendar MCP scan (next 30d,
   meetings row → meeting_booked stage + SMS confirm); fold into inbox-watch or
   the morning driver.
2. ⬜ First full E2E run for saren: sort → enrich (light) → write → review → push
   drafts → send; then wethosai ICP + first list build (0 contacts there).
3. ⏭️ Carried: Apollo agencies top-up (only after Approve queue drains);
   dossier→Supabase `documents` two-way sync (needs table + design);
   saren icp-research.md per segment.

## Done (Fri 06-12 — work account)
- ✅ **Migration 006 APPLIED + verified via psql** — zero anon policies remain, anon
  grants only on the 4 landing-page tables, both views security_invoker=on, bare anon
  role denied on contacts/v_pipeline, landing pages still readable. Hole closed.
- ✅ **agent_jobs queue fully drained** (was 27 requested, not 13): 9 duplicates
  canceled (superseded-by-oldest), 4 account-research jobs from 06-01 canceled as
  obsolete (contacts already sequenced), **13 contact-enrich light enrichments run**
  (parallel subagents; dossiers in tool_outputs, seed/angle/buying-role on rows),
  1 BuyologyIQ research run. Queue: 0 requested/running.
- ✅ **BuyologyIQ verdict: CLEAR** — B2C lead-gen agency (walk-in tubs etc.), no
  WethosAI conflict. Kosaka's held sequence releasable. Evidence:
  `clients/saren/targets/buyologyiq/COMPANY-RESEARCH.md` + note on his contact row.
- ✅ **May Mitchell data bug fixed** — row had archived=t/client_id NULL with NO
  decisions row; restored to saren/active. Her dossier is the crown jewel: VERIFIED
  ex-Cylance overlap with Saren 2017–2020, June 24 AI-partner-marketing panel hook
  (time-sensitive), 1st-degree LinkedIn since 2024.
- ✅ Approve queue confirmed fully sorted (zero unscored sourced) → **Apollo agencies
  top-up now UNBLOCKED** per the 06-10 decision. Shane Moustakas linkedin_url backfilled.
- ✅ **Dashboard deployability scoped** (read-only audit): NOT same-day. P0 blockers:
  (1) NO auth of any kind in front of service-role server actions — public deploy =
  full pipeline control exposed; (2) filesystem deps outside dashboard/ —
  `../clients/<slug>/voice.md` reads + createNewClient writes break in a container;
  (3) secrets provisioning. ~1 focused day of prep, then ~30 min deploy.
- 🟡 Enrichment caveats to honor downstream: thin dossiers for Kostyantyn + Rey
  Fernando; **Ali Reza Kohani identity ambiguity (kohani.com tax firm vs LA tech
  profile) — resolve before sequencing**; Dana Tschupp runs G&A/HR search (Linda
  Phillips runs Marketing) — phrase asks firm-level.

## Done (Fri 06-12 PM — same session, after limit-handoff summary)
- ✅ **Sequences written inline for May Mitchell + Kostyantyn** (subagent path was
  limit-blocked; main loop wrote them). Both at `sequenced`/review_and_send, plans
  versioned in tool_outputs. May: warm-reactivation off the verified Cylance overlap
  + June 24 panel, 3 touches (touch 3 pinned post-panel). Kostya: 2-touch friendly
  hello, asks-not-asserts his next venture. **Both flagged no-email — need address
  before send.** Duplicate Kostya sequence from the dead subagent found committed
  ("long overdue hello") — stopped; the inline one is the live row.
- ✅ **Dashboard auth gate shipped** — `dashboard/middleware.ts`, HTTP Basic via
  `DASHBOARD_AUTH` env (off when unset, so localhost unchanged). Live-tested:
  401 no/wrong creds, 200 right creds, 200 with gate off. P0 deploy blocker cleared.
- ✅ **clients/-path refactor** — `CLIENTS_DIR` env overrides the `../clients`
  repo-layout assumption (voiceForContact + createNewClient). Container-ready.
  tsc + build clean. Env vars documented in AGENTS.md.

## Done (Fri 06-12 eve — Apollo agencies top-up)
- ✅ **Top-up ran** (the 06-10 deferral condition met — Approve queue drained).
  Free search: 731 matches on the icp.json filters; page 1 post-filtered → **27 new
  contacts / 27 new companies** landed as sourced (9 dupes vs DB, 7 ICP exclusions
  dropped, one-best-per-company applied). Zero credits spent.
- ✅ **Scored, calibrated to the 06-10 batch**: 4 at 37 (Sandra C./Racer Media VP Ops,
  Andrew Hsu/DAWN MD, Tim Z./Bergman MD, Holly W./Whalls MD-Ops), Zenatta's COO at 35
  (Zoho/CRM consultancy — best thesis fit), 21 at 30, Social Curator at 24 (likely
  SaaS product co, segment downgraded). 26 of 27 ≥ threshold → Monday's Approve
  queue is stocked. Few-shot: 11/11 approvals, 0 rejections — no learned adjustment
  possible yet; the first reject-with-reason clicks will teach the scorer.
- ⚠️ **Apollo plan masks last names in search** (e.g. "Ca***r") — stored as-is with a
  note; they resolve free in contact-enrich's web pass or via gated credit enrichment.
  No emails on any of the 27 (search never returns them; enrichment is the gated path).
- ⚠️ **Schema gap found:** contact_sources has NO unique (source, source_id)
  constraint — the apollo-people-search skill's ON CONFLICT template assumes it.
  Worked around with NOT EXISTS; migration 009 candidate.

## Next up (next session)
1. Saren decisions: Apollo email reveal for the email-less enriched/sequenced
   contacts (up to 10 credits)? Kostya's email manually (cheaper)? Release Kosaka
   sequence? Respond to the 2 replies; Tracy Perlongo email.
2. **Railway deploy runbook** (Dockerfile at repo root ships clients/ beside the
   app; build UNVERIFIED locally — no Docker on this Mac). After `! railway login`:
   ```bash
   cd ~/Projects/@lead-prospecting && railway init -n lead-prospecting
   for VAR in SUPABASE_SERVICE_ROLE_KEY ANTHROPIC_API_KEY GMAIL_IMAP_USER \
              GMAIL_IMAP_PASS GMAIL_FROM DASHBOARD_AUTH \
              NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY; do
     railway variables --set "$VAR=$(grep "^$VAR=" dashboard/.env.local | cut -d= -f2-)"
   done   # shell substitution — values never printed or pasted
   railway up && railway domain
   ```
   Smoke test: first request MUST 401 without creds (DASHBOARD_AUTH was generated
   06-12 and lives in both .env.local files). createNewClient writes are ephemeral
   in-container — documented degraded mode until the documents-table sync lands.
3. Off-Mac heartbeat for inbox-watch + 90-sec SLA instrumentation (measure
   reply→SMS latency; depends on where inbox-watch runs post-deploy).
4. Apollo agencies top-up (unblocked) + wethosai ICP/first list build (0 contacts).
5. Finish E2E proof: review → push drafts → human send on the new sequences.

## Decisions log
- 2026-06-12: sequence-writer scoped to 2 of 13 enriched (May Mitchell, Kostyantyn) —
  Review queue already 23-deep and 10/13 lack emails; never out-run the human bottleneck.
- 2026-06-12: 06-01 account-research jobs canceled as obsolete (contacts already
  sequenced) — except Kosaka's, repurposed to settle the competitor flag.
- 2026-06-10: Apollo top-up deferred — never out-run the human-sort bottleneck. When
  ≥ quota contacts already sit at/above threshold in the Approve queue, scoring the
  existing pile beats sourcing a deeper one. Top-up resumes once the queue drains.
- 2026-06-10: BuyologyIQ (behavioral-science marketing) flagged as possible
  WethosAI-competitor space — scored but caution-tagged in fit_rationale; human verifies
  confidentiality posture before any outreach (not auto-killed; it's a services agency).
- 2026-06-09: NotebookLM rejected as RAG (no API); file-based dossiers are the RAG;
  external deep-research exports get imported into dossier/sources/
- 2026-06-09: deep OSINT runs AFTER human approval (white-glove economics)
- 2026-06-09: sequence PLAN upfront, copy just-in-time per touch
- 2026-06-09: learning loop = decisions + draft_edits tables fed back as few-shot
- 2026-06-09: this week = operator cockpit; client-facing logins are post-sprint
- 2026-06-09: vendor/ excluded from git (own repo); Supabase ops via API once keys
  are in env (MCP connector lives on personal account only)

## Parking lot
Moved to `ROADMAP.md` (durable idea backlog — add ideas there, review when time
allows). Still sprint-relevant: saren icp-research.md generation (icp-builder
Phase 2) for each segment.
