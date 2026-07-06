# SUPABASE-TASKS.md — actions that need the PERSONAL account

The Supabase MCP connector is authenticated on Saren's **personal** Claude account.
The work account has no Supabase MCP access and (until step 2 is done) no API
credentials. This file is the handoff list: open it from the personal account and
work through it, or do the dashboard steps manually in the browser.

Project: `ltsuosasgblbqhsjckfg` (https://supabase.com/dashboard/project/ltsuosasgblbqhsjckfg)

## 1. Apply migration 005  ⬜
From a personal-account session in this project, say:
> "Apply migrations/005_learning_and_meetings.sql to the Supabase project with the
> Supabase MCP apply_migration tool, name it 005_learning_and_meetings."

Or manually: Supabase dashboard → SQL Editor → paste the file → Run (it is
idempotent; safe to re-run).

Verify — paste exactly this into the SQL editor and run:

```sql
select
  (select count(*) from decisions)    as decisions_rows,
  (select count(*) from draft_edits)  as draft_edits_rows,
  (select count(*) from meetings)     as meetings_rows;
```

Expected: one row, three zeros. If you get "relation does not exist", the migration
didn't apply. Then run:

```sql
select * from v_pipeline limit 1;
```

Expected: no error (zero or more rows — both fine).

## 2. Give the work account API access  ⬜
So the work account can run data operations via the Supabase REST API and apply
future migrations via psql, without the MCP connector:

1. Dashboard → Project Settings → **API** → copy the `service_role` key.
2. Dashboard → Project Settings → **Database** → copy the **connection string**
   (URI, "Transaction pooler" variant).
3. Add BOTH to `~/Projects/.env.local` (master registry) under a new header:
   ```
   # ── Lead Prospecting (Supabase: ltsuosasgblbqhsjckfg) ─────────
   # Used by: @lead-prospecting (dashboard server actions, skills, migrations)
   LEADPROSPECTING_SUPABASE_SERVICE_ROLE_KEY=...
   LEADPROSPECTING_SUPABASE_DB_URL=...
   ```
4. Copy the same two lines into `@lead-prospecting/dashboard/.env.local`
   (as `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_DB_URL`).
5. Tell the work-account session "Supabase keys are in place" — it takes over from
   there (future migrations apply via `psql "$SUPABASE_DB_URL" -f migrations/xxx.sql`).

Security notes: service_role bypasses RLS — server-side only, never NEXT_PUBLIC_,
never committed (both .env.local files are gitignored; verified).

## 3. Recurring (only when asked)
Future migrations will be queued here by the work account when the API path is not
available. Check the "Blockers" section of SPRINT.md whenever you open the personal
account.

## Done log
- 2026-06-10: Step 2 done — service_role key + Session-pooler DB URL provisioned into
  `~/Projects/.env.local` (LEADPROSPECTING_*) and `dashboard/.env.local`. Work account
  verified connection via psql.
- 2026-06-10: Step 1 done — migration 005 applied via psql from the work account
  (browser SQL editor no longer needed). Verified: decisions/draft_edits/meetings
  exist, clients.daily_quota present, v_pipeline healthy (45 rows).
