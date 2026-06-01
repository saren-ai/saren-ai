# 2026-05-31 — Pipeline backend + Studio refactor

Reworked the Hustle & Flow backend into a proper pipeline model and rebuilt `/studio` around it, removing the v1 surfaces. Companion work (sourcing skills, dead Svelte prototype) lives in the separate `lead-prospecting` workspace.

## What shipped

### Schema migrations (`supabase/migrations/`)
- **001 — pipeline model:** added `clients` and `companies` tables; extended `contacts` (`company_id`, `client_id`, `stage`, `fit_score`, `seniority`, `buying_role_hypothesis`); added a `(sequence_id, sent_at)` index on `touches` and a unique dedup index on `contact_sources(source, source_id)`; created the **`v_pipeline`** view (derives `stage`, `next_action`, `next_due`, `overdue`, `priority` by rolling `touches` up through `sequences`); backfilled clients/companies from existing rows.
- **002 — verified/valid fix:** `v_pipeline` now treats Apollo `email_status` of both `verified` and `valid` as deliverable (enriched), not just `verified`.
- **003 — auth lockdown (cutover):** replaced the wide-open `anon` policies on all dashboard tables with `admin_all_*` policies gated by `public.is_admin()`, which whitelists two UIDs (`saren.sakurai@gmail.com` super admin, `saren@saren.ai`). `anon` can no longer read/write the pipeline. `outreach_pages` / `tool_outputs` / `entitlements` / `purchases` were left on their own public policies.

### Model
`clients → companies → contacts → sequences → touches`. Records are written by the sourcing skills; outreach **state** is the `touches` event log; `v_pipeline` is the read model. Supabase is the system of record (files retired).

### Studio rebuilt around the pipeline
- `/studio` **is now the pipeline cockpit** — funnel strip + priority Do-Next queue + gamification (today's sends vs. 10/day ceiling, send streak), all from `v_pipeline` and `touches`. Server component gates on `auth.getUser()`; client renders; server actions (`logTouchSent`, `markReplied`) write touches via `revalidatePath`.
- **Kept:** `/studio/contacts/[id]` (the per-contact cockpit — inline edit, touch timeline, reply logging with thread + sentiment) and the shared studio components (`RelativeTime`, `StatusPill`, `ThreadBubble`, `TouchDots`).
- **Removed (v1 of this same system):** `StudioDashboard` (old stat cards + outreach table), the `/studio/contacts` list + `AddContactButton`, `/studio/sequences`, `/studio/outreach-pages`, and the now-orphaned `SlideOver`. Repointed the links that referenced deleted routes.

## Key decisions
- **Content vs. state split:** structured records in normalized tables; mutable outreach progress event-sourced in `touches`. Streaks/daily-goal fall out of `touches` for free.
- **Action lives in the DB:** `v_pipeline` decides stage + next action + order, so any surface (studio, a digest, a scheduled nudge) gets the same answer. The UI renders, it doesn't compute the funnel.
- **Single-admin auth, not multi-tenant:** the client switcher is a filter, not a security boundary. `is_admin()` is the entire access-control surface — edit it to grant/revoke.
- **`outreach_pages` manager removed, public pages kept:** `saren.ai/for/[slug]` still renders; management moved to SQL / a future re-add.

## Follow-ups
- Regenerate `src/lib/supabase/database.types.ts` (predates 001–003) to type `v_pipeline`/`companies`/`clients` and drop the single justified cast in `studio/page.tsx`.
- Migrations 001–002 ran clean; 003 was applied as the cutover. The old anon-key `dashboard.html` prototype (in `lead-prospecting`) is now dead by design.

## Docs updated
`docs/studio-runbook.md`, `docs/hustle-flow-schema-reference.md`, `docs/hustle-flow-project-instructions.md`, `AGENTS.md` (new Studio section + `supabase/` in structure).
