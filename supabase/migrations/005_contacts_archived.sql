-- ============================================================================
-- 005_contacts_archived.sql
-- Adds the `archived` boolean column to contacts that v_pipeline already
-- references via coalesce(c.archived, false). Without this column the view
-- technically still works (Postgres evaluates the coalesce path), but this
-- makes the intent explicit and lets the cockpit set it cleanly.
-- Idempotent. Additive only.
-- ============================================================================

begin;

alter table public.contacts
  add column if not exists archived boolean not null default false;

create index if not exists contacts_archived_idx
  on public.contacts (archived)
  where archived = false;

commit;
