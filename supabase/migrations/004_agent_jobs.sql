-- ============================================================================
-- 004_agent_jobs.sql
-- The trigger layer: a job queue that lets the Studio cockpit ASK the engine
-- (Claude/Cowork skills) to do work, without the cockpit doing the work itself.
--
-- Flow:
--   Studio inserts a row (status='requested')  ->  the engine claims it
--   -> runs the matching skill -> writes result back -> status='done'.
--
-- Design rules this encodes:
--   * Supabase stays the system of record. A job is an INTENT, not the work.
--   * The credit guard lives in `kind`: 'enrich' jobs cost Apollo credits and are
--     only ever created by a deliberate, confirmed click. The runner refuses to
--     enrich on any other kind. (Mirrors apollo-people-search's confirm-before-spend.)
--   * RLS mirrors 003: admins only via public.is_admin(). The engine writes via the
--     service_role / Supabase MCP, which bypasses RLS by design.
--
-- Idempotent. Additive only. Touches nothing in 001-003. Requires 003 (is_admin()).
-- ============================================================================

begin;

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. agent_jobs  (the queue)
-- ----------------------------------------------------------------------------
create table if not exists public.agent_jobs (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid references public.clients(id)   on delete cascade,
  contact_id    uuid references public.contacts(id)  on delete cascade,
  company_id    uuid references public.companies(id) on delete cascade,

  skill         text not null,                       -- which skill to dispatch to
                                                      --   e.g. 'apollo-people-search',
                                                      --   'sales-outreach', 'account-research'
  kind          text not null default 'action',      -- 'search'|'enrich'|'draft'|'research'|'action'
                                                      --   'enrich' = costs credits (guarded)
  status        text not null default 'requested',    -- requested|claimed|running|done|failed|canceled
  params        jsonb not null default '{}'::jsonb,   -- arbitrary args for the skill
  result        jsonb,                                -- summary the engine writes back
  error         text,                                 -- failure reason
  attempts      int  not null default 0,

  requested_by  uuid,                                 -- auth.uid() of the admin who clicked
  created_at    timestamptz not null default now(),
  claimed_at    timestamptz,
  started_at    timestamptz,
  finished_at   timestamptz,
  updated_at    timestamptz not null default now()
);

-- Constrain status + kind to known values (drop-first so re-runs can widen them).
alter table public.agent_jobs drop constraint if exists agent_jobs_status_chk;
alter table public.agent_jobs add  constraint agent_jobs_status_chk
  check (status in ('requested','claimed','running','done','failed','canceled'));

alter table public.agent_jobs drop constraint if exists agent_jobs_kind_chk;
alter table public.agent_jobs add  constraint agent_jobs_kind_chk
  check (kind in ('search','enrich','draft','research','action'));

-- ----------------------------------------------------------------------------
-- 2. Indexes
-- ----------------------------------------------------------------------------
-- Partial index = a tight, always-small "inbox" the runner polls.
create index if not exists agent_jobs_queue_idx
  on public.agent_jobs (created_at)
  where status = 'requested';

-- Per-contact history for the cockpit's job panel.
create index if not exists agent_jobs_contact_idx
  on public.agent_jobs (contact_id, created_at desc);

-- ----------------------------------------------------------------------------
-- 3. updated_at trigger
-- ----------------------------------------------------------------------------
create or replace function public.agent_jobs_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists agent_jobs_set_updated on public.agent_jobs;
create trigger agent_jobs_set_updated
  before update on public.agent_jobs
  for each row execute function public.agent_jobs_set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. claim_next_job()  — atomic dequeue for the engine
-- ----------------------------------------------------------------------------
-- FOR UPDATE SKIP LOCKED makes concurrent runners safe and never hands the same
-- job out twice. RETURNS SETOF so `select * from claim_next_job()` yields exactly
-- ZERO rows when the queue is empty (a composite return would give a row of NULLs
-- instead — a footgun for the caller). SECURITY DEFINER so it works regardless of
-- the caller's row policies; the engine calls it via the Supabase MCP / service_role.
create or replace function public.claim_next_job()
returns setof public.agent_jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  j public.agent_jobs;
begin
  select * into j
    from public.agent_jobs
   where status = 'requested'
   order by created_at
   for update skip locked
   limit 1;

  if not found then
    return;                       -- empty queue → zero rows
  end if;

  update public.agent_jobs
     set status     = 'claimed',
         claimed_at = now(),
         attempts   = attempts + 1
   where id = j.id
   returning * into j;

  return next j;                  -- one claimed job
  return;
end;
$$;

revoke all on function public.claim_next_job() from public, anon;
grant execute on function public.claim_next_job() to authenticated, service_role;

-- ----------------------------------------------------------------------------
-- 5. RLS  (mirror 003: admins only; engine uses service_role which bypasses RLS)
-- ----------------------------------------------------------------------------
alter table public.agent_jobs enable row level security;

drop policy if exists admin_all_agent_jobs on public.agent_jobs;
create policy admin_all_agent_jobs on public.agent_jobs
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

commit;

-- ============================================================================
-- VERIFY
-- ============================================================================
-- select count(*) from public.agent_jobs;
-- select * from public.claim_next_job();        -- NULL when empty
-- select tablename, policyname, roles from pg_policies
--   where schemaname='public' and tablename='agent_jobs';
