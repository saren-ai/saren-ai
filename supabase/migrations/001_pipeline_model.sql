-- ============================================================================
-- 001_pipeline_model.sql
-- Prospecting backend: normalize spine, event-source state, add action layer.
--
-- Design:
--   clients -> companies -> contacts        (records; skills write, browser reads)
--   touches                                  (mutable outreach STATE, event log)
--   v_pipeline                               (computed: stage, next_action, due)
--
-- Transition strategy: WRITE-BOTH. We ADD the new structures and backfill from
-- the legacy contacts.* state columns, but we DO NOT drop those columns yet.
-- Verify touches against the old columns, then run 002 to drop the legacy state.
--
-- Idempotent: safe to re-run. Additive only. Touches nothing in
-- outreach_pages / entitlements / purchases (the monetization layer).
-- ============================================================================

begin;

-- Postgres 13+ has gen_random_uuid() in pgcrypto; Supabase enables it by default.
create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. CLIENTS  (un-hardcode client = 'saren')
-- ----------------------------------------------------------------------------
create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text,
  created_at  timestamptz not null default now()
);

-- Seed from whatever clients already exist in contacts.
insert into public.clients (slug)
select distinct client
from public.contacts
where client is not null
on conflict (slug) do nothing;

-- ----------------------------------------------------------------------------
-- 2. COMPANIES  (the account/target as a first-class record)
-- ----------------------------------------------------------------------------
create table if not exists public.companies (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid references public.clients(id) on delete cascade,
  name            text not null,
  domain          text,
  url             text,
  industry        text,
  employee_count  integer,
  segment         text,
  fit_score       numeric,
  fit_rationale   text,
  stage           text,                       -- account-level rollup (optional)
  archived        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Dedup: one company per (client, domain) when domain is known.
create unique index if not exists companies_client_domain_uniq
  on public.companies (client_id, lower(domain))
  where domain is not null;

-- ----------------------------------------------------------------------------
-- 3. CONTACTS  (extend; keep legacy state columns for write-both transition)
-- ----------------------------------------------------------------------------
alter table public.contacts add column if not exists company_id  uuid references public.companies(id);
alter table public.contacts add column if not exists client_id   uuid references public.clients(id);
alter table public.contacts add column if not exists seniority   text;
alter table public.contacts add column if not exists buying_role_hypothesis text;
alter table public.contacts add column if not exists fit_score   numeric;
alter table public.contacts add column if not exists stage       text;  -- contact pipeline stage

-- ----------------------------------------------------------------------------
-- 4. TOUCHES  (the STATE — ALREADY EXISTS, do not recreate)
-- ----------------------------------------------------------------------------
-- The live touches table keys off SEQUENCE_ID, not contact_id, and is already rich:
--   id, sequence_id, touch_num, channel, status, scheduled_at, sent_at, notes,
--   subject, body_md, thread (jsonb), reply_at, sentiment, opened_at, clicked_at.
-- Model is: contact -> sequences -> touches. We use it as-is. Just add one index to
-- speed the contact-level rollups the view does (no-op if it already exists).
create index if not exists touches_seq_sent_idx on public.touches (sequence_id, sent_at);

-- ----------------------------------------------------------------------------
-- 5. DEDUP guard on contact_sources (stop the same Apollo person twice)
-- ----------------------------------------------------------------------------
create unique index if not exists contact_sources_source_uniq
  on public.contact_sources (source, source_id)
  where source_id is not null;

-- ============================================================================
-- 6. BACKFILL  (populate the new spine from legacy data)
-- ============================================================================

-- 6a. Companies from distinct (client, company) on contacts.
--     Best-effort domain from the most common email domain in that company.
insert into public.companies (client_id, name, domain)
select
  cl.id,
  c.company,
  (array_agg(nullif(split_part(c.email,'@',2),'') )
     filter (where c.email like '%@%'))[1] as domain
from public.contacts c
join public.clients cl on cl.slug = c.client
where c.company is not null and c.company <> ''
  and not exists (select 1 from public.companies co
                  where co.client_id = cl.id and co.name = c.company)
group by cl.id, c.company
on conflict do nothing;

-- 6b. Link contacts -> clients.
update public.contacts c
set client_id = cl.id
from public.clients cl
where c.client = cl.slug and c.client_id is null;

-- 6c. Link contacts -> companies (by client + name).
update public.contacts c
set company_id = co.id
from public.companies co
where co.client_id = c.client_id
  and co.name = c.company
  and c.company_id is null;

-- 6d. (no-op) NOTE on legacy columns:
--   contacts.status = outreach pipeline status ('new','sent','replied','bounced','ooo') -- KEEP, used by v_pipeline.
--   contacts.state  = US state, geo, imported from Apollo, mostly null, unread.
--                     Redundant with contacts.location. Leave alone here; drop in 002 if unwanted.
--   seniority is intentionally NOT backfilled here -- it gets populated from Apollo on (re-)enrichment.

-- 6e. (removed) No touch backfill needed — touches already holds real history (join via
--     sequences). Nothing lossy to seed.

-- 6f. Derive an initial contact.stage (the view recomputes live; this is just a seed).
--     State comes from touches joined through sequences (contact -> sequences -> touches).
update public.contacts c
set stage = sub.stage
from (
  select
    c2.id,
    case
      when exists (select 1 from public.sequences s join public.touches t on t.sequence_id = s.id
                   where s.contact_id = c2.id and t.reply_at is not null)
                                  then 'replied'
      when c2.status = 'replied'  then 'replied'
      when exists (select 1 from public.sequences s join public.touches t on t.sequence_id = s.id
                   where s.contact_id = c2.id and t.sent_at is not null)
                                  then 'in_outreach'
      when exists (select 1 from public.sequences s where s.contact_id = c2.id)
                                  then 'sequenced'
      when c2.email_status = 'verified' then 'enriched'
      else 'sourced'
    end as stage
  from public.contacts c2
) sub
where c.id = sub.id;

-- ============================================================================
-- 7. v_pipeline  (THE ACTION LAYER: stage, next_action, due, overdue, priority)
-- ============================================================================
-- Touch cadence (days between sending touch N-1 and touch N), keyed by NEXT touch:
--   touch 2: +2d, touch 3: +4d, touch 4: +7d, touch 5: +7d. Final touch = 5.
-- Reads touches first; coalesces with legacy contacts.* during write-both.

create or replace view public.v_pipeline as
with last_sent as (
  -- roll touches up to the contact via sequences; a touch is "sent" when sent_at is set
  select s.contact_id,
         max(t.sent_at)::date           as last_sent_on,
         max(t.touch_num)               as sent_touch_no
  from public.touches t
  join public.sequences s on s.id = t.sequence_id
  where t.sent_at is not null
  group by s.contact_id
),
flags as (
  select
    c.id as contact_id,
    (c.status = 'replied'
       or exists (select 1 from public.sequences s
                  join public.touches t on t.sequence_id = s.id
                  where s.contact_id = c.id and t.reply_at is not null))          as has_reply,
    exists (select 1 from public.sequences s where s.contact_id = c.id)           as has_sequence,
    (c.email_status = 'verified')                                                 as is_verified
  from public.contacts c
)
select
  c.id                                   as contact_id,
  c.client_id,
  c.client,
  c.company_id,
  c.company,
  c.full_name,
  c.title,
  c.segment,
  c.fit_score,
  c.email,
  c.linkedin_url,

  -- live stage
  case
    when f.has_reply                       then 'replied'
    when ls.contact_id is not null         then 'in_outreach'
    when f.has_sequence                    then 'sequenced'
    when f.is_verified                     then 'enriched'
    else 'sourced'
  end                                    as stage,

  -- the single next action for that stage
  case
    when f.has_reply                       then 'respond'
    when ls.contact_id is not null         then 'send_next_touch'
    when f.has_sequence                    then 'review_and_send'
    when f.is_verified                     then 'write_sequence'
    else 'enrich'
  end                                    as next_action,

  -- when the next touch is due (only meaningful once in outreach)
  case
    when ls.contact_id is not null then
      ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                           when 2 then 2 when 3 then 4
                           when 4 then 7 when 5 then 7 else null end)
    else null
  end                                    as next_due,

  -- overdue flag
  case
    when ls.contact_id is not null
      and (ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                                when 2 then 2 when 3 then 4
                                when 4 then 7 when 5 then 7 else null end)) < current_date
    then true else false
  end                                    as overdue,

  -- priority: lower = do sooner. Replies first, then overdue outreach,
  -- then unsequenced verified leads, then fit_score as a tiebreaker.
  (case
     when f.has_reply               then 0
     when ls.contact_id is not null then 1
     when f.has_sequence            then 2
     when f.is_verified             then 3
     else 4
   end) * 1000
   - coalesce(c.fit_score, 0)             as priority

from public.contacts c
join flags f on f.contact_id = c.id
left join last_sent ls on ls.contact_id = c.id
where coalesce(c.archived, false) = false;

-- View should respect the RLS of its base tables (PG15+/Supabase).
alter view public.v_pipeline set (security_invoker = on);

-- ============================================================================
-- 8. RLS  (mirror the existing anon pattern: read records, write touches)
-- ============================================================================
alter table public.clients   enable row level security;
alter table public.companies enable row level security;
alter table public.touches   enable row level security;

-- clients: anon read
drop policy if exists anon_read_clients on public.clients;
create policy anon_read_clients on public.clients
  for select to anon using (true);

-- companies: anon read
drop policy if exists anon_read_companies on public.companies;
create policy anon_read_companies on public.companies
  for select to anon using (true);

-- touches: anon read / insert / update  (the browser logs state here)
drop policy if exists anon_read_touches   on public.touches;
drop policy if exists anon_insert_touches on public.touches;
drop policy if exists anon_update_touches on public.touches;
create policy anon_read_touches   on public.touches for select to anon using (true);
create policy anon_insert_touches on public.touches for insert to anon with check (true);
create policy anon_update_touches on public.touches for update to anon using (true) with check (true);

-- Make sure anon can read the new view.
grant select on public.v_pipeline to anon;

commit;

-- ============================================================================
-- VERIFY (run these after; eyeball before trusting the new state)
-- ============================================================================
-- select count(*) as clients   from public.clients;
-- select count(*) as companies from public.companies;
-- select stage, count(*) from public.v_pipeline group by stage order by 1;
-- select count(*) as touches_seen from public.touches;   -- expect ~40
-- -- legacy status vs derived stage sanity:
-- select c.status as legacy_status, p.stage as derived_stage, count(*)
--   from public.contacts c
--   join public.v_pipeline p on p.contact_id = c.id
--  group by 1,2 order by 1,2;
