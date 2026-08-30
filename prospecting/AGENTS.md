# AGENTS.md — #lead-prospecting

White-glove, multi-client B2B prospecting platform. Quality over volume: 3–10
hyper-personalized contacts per client per weekday, human-reviewed at every
judgment point, sent from the client's own mailbox. Never spray-and-pray.

## Working Style

### Confirmations
When I reply 'yes', 'go', or 'ship it' to a proposed action, treat it as full authorization and proceed — do not ask for a second confirmation. If a request is ambiguous in scope (especially deletions or route removals), state the exact list of files/routes you will change and ask once, before doing anything.

## Deployment

This folder is tracked inside the `saren.ai` repo (see below) — it has no separate
production deployment or build. Changes here ship as part of a `saren.ai` deploy;
follow `saren.ai/AGENTS.md`'s Deployment section (verify the Vercel production alias
after any merge to `main` — don't trust GitHub-current as proof production is current).
`legacy-dashboard/` is a separate, superseded Railway-deployed app with uncommitted
edits — do not deploy it.

## Pre-push checklist

Same checklist as the parent `saren.ai` repo: run typecheck, lint, and `npm run build`
before pushing. Client/server import-boundary errors in Next.js only surface at build
time — a passing dev server is not sufficient evidence.

## Folder status — read before trusting anything below

Reconciled with disk 2026-08-25.

- **This folder is no longer its own repo.** It was `~/Projects/#lead-prospecting`;
  it now lives inside the saren.ai repo at `saren.ai/prospecting/` and is tracked
  there. `git log` from inside this folder resolves to the saren.ai repo.
- **`legacy-dashboard/` is superseded.** The live cockpit is `/desk` in the saren.ai
  app (`src/app/(desk)/`, gated in `src/proxy.ts`, renamed from `/studio` 2026-06-17).
  `legacy-dashboard/` is the Railway-deployed Next.js app from the June sprint and
  still has uncommitted edits in `app/actions.ts` — do not move or delete it without
  resolving those first.
- **`migrations/` and `.claude/skills/` did not come across.** Schema of record is now
  `saren.ai/supabase/migrations/001–003`. Migrations 005–008 referenced in SPRINT.md
  are not in that set — reconcile before writing SQL against the assumptions below.
- **`SPRINT.md` is frozen at 2026-06-12** and describes a sprint that ended. Its
  "Next up" is not a live queue. `ROADMAP.md` is still valid as a backlog.
- **`vendor/ai-sales-team-claude/`** is an unmodified external checkout, read-only.
- **`clients/README.md`** is the current client registry. `clients/_template/` is the
  scaffold for adding one.

The architecture table below still describes the intended pipeline correctly. The
*locations* it names are what drifted.

## The playbook (target architecture)

A **client is an individual at a company** (e.g., "Dan Collins at Stryke
Security"), not just the company. Emails are 1:1 human-to-human; there is a
matchmaking element between the salesperson and the target.

| Stage | Owner | What happens |
|---|---|---|
| Agent 0a — Client dossier | `client-intake` | Layered dossier: company + salesperson individual(s) + product/offer. Sources: résumé, LinkedIn PDF→md, website scrape. |
| Agent 0b — ICP dossier | `icp-builder` | Apollo-ready `icp.json` + deep persona/market research (`icp-research.md`): tools, pain points, trends, archetypes. |
| Agent 1 — List builder | `apollo-people-search` | Cheap-signal candidate list (10–1000). Free search; no credits without confirmation. |
| Agent 2 — Surface scorer | `prospect-scorer` | Fit score (~half of total points) from cheap signals + learned preferences. Top N surfaced. |
| Human sort | Dashboard Approve queue | Approve / reject-with-reason / archive / notes. Decisions recorded → scorer learns. |
| Deep research | `contact-enrich` | OSINT on approved top ~3/day only: articles, talks, social, LinkedIn activity → contact dossier. |
| Agent 3 — Writer | `sequence-writer` | Contact dossier + salesperson dossier + company dossier + product dossier → personalized ~3-touch sequence plan; copy drafted just-in-time per touch. |
| Human review | Dashboard Review queue | Tweak/polish (edits recorded → voice learns) → push to Gmail drafts → human sends. |
| Assistant | `inbox-watch` + daily driver | Monitors threads, flips stages, alerts on replies (SMS, 90-sec SLA goal), morning briefing, meeting-booked detection. |

## Layout

```
clients/<client>/          One folder per client
  dossier/                 Layered client dossier (company.md, people/, product.md, sources/)
  icp.json                 Machine-readable ICP spec (Apollo-ready)
  icp-research.md          Deep persona/market research
  voice.md                 Per-client email voice spec
  targets/<company>/       Per-target working files
dashboard/                 Next.js operator cockpit (Triage: Inbox/Approve/Review)
migrations/                Supabase SQL migrations (system of record)
vendor/ai-sales-team-claude/  Vendored /sales suite (external, read-only)
.claude/skills/            The pipeline skills
```

## Working across two accounts

Saren works on this project from TWO Claude accounts on this machine. The filesystem
and this repo are shared; the connected tools are NOT:

| Capability | Personal account | Work account |
|---|---|---|
| Supabase MCP (migrations, SQL) | ✅ connected | ❌ — use API keys once provisioned (see SUPABASE-TASKS.md) |
| Apollo MCP | check at session start (`apollo_users_api_profile`) | ✅ connected (saren@wethos.ai) |
| Gmail / Calendar MCP | check at session start | ✅ connected |
| Files, git, dashboard, skills | ✅ | ✅ |

Protocol: any session that hits a tool it can't reach writes the task into
`SUPABASE-TASKS.md` (or a sibling `*-TASKS.md`) instead of stalling, and notes it in
SPRINT.md "Blockers". Never assume the other account's connectors from memory —
verify with a cheap call first.

## Session-resume protocol (any session, any account, any day)

1. Read this file, then `SPRINT.md` (status board, blockers, "Next up" = work queue).
2. `git log --oneline -5` for what actually landed last.
3. Do the work. Update `SPRINT.md` before the session ends. Commit with a clear message.

Doc map: `AGENTS.md` (architecture + rules, this file) · `SPRINT.md` (live sprint
state — update every session) · `ROADMAP.md` (durable idea backlog — capture ideas
there, review when time allows) · `SUPABASE-TASKS.md` (personal-account handoff queue) ·
`migrations/` (schema history) · `clients/<client>/` (per-client dossiers and specs) ·
memory directory (cross-session facts, auto-loaded).

## System of record

Supabase project `ltsuosasgblbqhsjckfg`. Tables: `clients`, `companies`,
`contacts`, `sequences`, `touches`, `agent_jobs`, `decisions`, `draft_edits`
(+ `v_pipeline` view computing stage/next-action/priority).
Files under `clients/` hold dossiers and specs; the DB holds pipeline state.

## Env vars (values in `.env.local`, never committed)

Dashboard: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`ANTHROPIC_API_KEY`, `GMAIL_IMAP_USER`, `GMAIL_IMAP_PASS`, `GMAIL_FROM`.
Deploy-only: `DASHBOARD_AUTH` (`user:pass` — enables the HTTP Basic gate in
`dashboard/middleware.ts`; REQUIRED on any non-localhost deploy, since server
actions run with the service-role key), `CLIENTS_DIR` (base path for the
`clients/` tree when the repo layout isn't available, e.g. a mounted volume).
Master registry: `~/Projects/.env.local` (see workspace secrets policy).

## Conventions

### Shared constants
Site-wide URLs and third-party endpoints (booking links, scheduler URLs, API bases) must live in a single exported constant (e.g. `BOOKING_URL`) and be imported everywhere — relevant here once the roadmapped Calendly integration lands. Never hardcode the same external URL in more than one file.

## Repository / Project Layout

### Project layout
Project directories under `~/Projects/` are named without `#` prefixes. When renaming or moving directories, sweep all docs, wiki cards, and code references — but exclude markdown headings, CSS colors, and URL fragments from `#` matches. (This folder's own name, `#lead-prospecting`, is an internal doc reference from before the 2026-08-25 move into `saren.ai/prospecting/` — the directory itself is no longer `#`-prefixed on disk.)

## Hard rules

- **Drafts are never auto-sent.** Gmail drafts only; a human clicks send.
- **Apollo enrichment costs credits** — only run on explicit human approval
  (dashboard click → `agent_jobs.kind = 'enrich'`) or direct user confirmation.
- **Per-client voice.** Never apply one client's voice/exclusions to another.
- **Deep OSINT only after human approval** of a contact — white-glove economics.

## Roadmap (not yet built)

- Per-client industry-watch agent feeding company/industry dossiers
- Client-facing logins (RBAC beyond `is_admin()`)
- Additional list sources: Apify scrapers, Vibe Prospecting, ZoomInfo
- Live chat + Calendly integration for the assistant
