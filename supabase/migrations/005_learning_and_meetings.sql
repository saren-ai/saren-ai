-- ============================================================================
-- 005_learning_and_meetings.sql
-- The learning layer + the finish line: record every human judgment so the
-- agents improve, and make a booked meeting a first-class pipeline outcome.
--
--   decisions    — every sort-phase verdict (approve/reject/archive + reason)
--                  → the prospect-scorer learns the client's preferences.
--   draft_edits  — AI draft vs. what the human actually approved/sent
--                  → the sequence-writer learns the client's voice.
--   meetings     — booked meetings (calendar-detected or manual)
--                  → new terminal v_pipeline stage 'meeting_booked'.
--   clients      — + daily_quota / settings / sms_phone (future SMS assistant).
--   v_pipeline   — recreated with 'meeting_booked' on top of the 002 logic.
--                  Column list/order unchanged; dashboard reads it as-is.
--
-- RLS mirrors 003/004: admins only via public.is_admin(); the engine writes
-- via service_role (bypasses RLS by design). Requires 003 (is_admin()).
--
-- Idempotent: safe to re-run. Additive only — drops nothing from 001-004.
--
-- APPLY: not applied automatically. Run via the Supabase MCP
--   (apply_migration, project ltsuosasgblbqhsjckfg) or paste into the
--   Supabase SQL editor. Then run the VERIFY queries at the bottom.
-- ============================================================================

begin;

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. decisions  (human sort-phase verdicts → scorer training signal)
-- ----------------------------------------------------------------------------
-- reason is a short machine-usable tag, e.g. 'know-them', 'wrong-seniority',
-- 'competitor'. notes is free text for the human.
create table if not exists public.decisions (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references public.clients(id)  on delete cascade,
  contact_id  uuid references public.contacts(id) on delete cascade,
  decision    text not null,                       -- 'approved'|'rejected'|'archived'
  reason      text,                                -- machine-usable tag, nullable
  notes       text,                                -- free-text, nullable
  decided_by  uuid,                                -- auth.uid() of the admin who clicked
  created_at  timestamptz not null default now()
);

-- Drop-first so re-runs can widen the allowed set (pattern from 004).
alter table public.decisions drop constraint if exists decisions_decision_chk;
alter table public.decisions add  constraint decisions_decision_chk
  check (decision in ('approved','rejected','archived'));

create index if not exists decisions_client_created_idx
  on public.decisions (client_id, created_at desc);

-- ----------------------------------------------------------------------------
-- 2. draft_edits  (AI draft vs. human-approved final → voice training signal)
-- ----------------------------------------------------------------------------
-- Nullable FKs use ON DELETE SET NULL: the diff text is the learning asset and
-- must survive even if the touch/sequence row is later pruned.
create table if not exists public.draft_edits (
  id             uuid primary key default gen_random_uuid(),
  client_id      uuid references public.clients(id)   on delete cascade,
  contact_id     uuid references public.contacts(id)  on delete set null,
  touch_id       uuid references public.touches(id)   on delete set null,
  sequence_id    uuid references public.sequences(id) on delete set null,
  channel        text,                                -- 'email'|'linkedin'|...
  draft_subject  text,                                -- what the AI wrote
  draft_body     text,
  final_subject  text,                                -- what the human approved/sent
  final_body     text,
  created_at     timestamptz not null default now()
);

create index if not exists draft_edits_client_created_idx
  on public.draft_edits (client_id, created_at desc);

-- ----------------------------------------------------------------------------
-- 3. meetings  (booked meetings — the pipeline's terminal win)
-- ----------------------------------------------------------------------------
create table if not exists public.meetings (
  id                 uuid primary key default gen_random_uuid(),
  client_id          uuid references public.clients(id)  on delete cascade,
  contact_id         uuid references public.contacts(id) on delete cascade,
  calendar_event_id  text,                               -- Google Calendar event id, nullable
  scheduled_at       timestamptz,
  source             text not null default 'calendar',   -- 'calendar'|'manual'
  status             text not null default 'scheduled',  -- scheduled|held|canceled|no_show
  notes              text,
  created_at         timestamptz not null default now()
);

alter table public.meetings drop constraint if exists meetings_source_chk;
alter table public.meetings add  constraint meetings_source_chk
  check (source in ('calendar','manual'));

alter table public.meetings drop constraint if exists meetings_status_chk;
alter table public.meetings add  constraint meetings_status_chk
  check (status in ('scheduled','held','canceled','no_show'));

-- v_pipeline probes meetings per contact; keep that lookup index-backed.
create index if not exists meetings_contact_status_idx
  on public.meetings (contact_id, status);

-- ----------------------------------------------------------------------------
-- 4. clients extensions  (per-client knobs)
-- ----------------------------------------------------------------------------
alter table public.clients add column if not exists daily_quota int   not null default 5;
alter table public.clients add column if not exists settings    jsonb not null default '{}'::jsonb;
alter table public.clients add column if not exists sms_phone   text;          -- future SMS assistant

-- ----------------------------------------------------------------------------
-- 5. RLS  (mirror 003/004: admins only; engine uses service_role which bypasses)
-- ----------------------------------------------------------------------------
alter table public.decisions   enable row level security;
alter table public.draft_edits enable row level security;
alter table public.meetings    enable row level security;

drop policy if exists admin_all_decisions on public.decisions;
create policy admin_all_decisions on public.decisions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists admin_all_draft_edits on public.draft_edits;
create policy admin_all_draft_edits on public.draft_edits
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists admin_all_meetings on public.meetings;
create policy admin_all_meetings on public.meetings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- 6. v_pipeline  (add terminal stage 'meeting_booked' on top of the 002 logic)
-- ============================================================================
-- Same column list and order as 001/002 — the dashboard (lib/types.ts
-- PipelineContact, lib/queues.ts, components/triage.tsx, components/pipeline.tsx)
-- reads these fields positionally-by-name; do not rename or drop any.
--
-- New rule: a contact with a meeting in status 'scheduled' or 'held' is
-- 'meeting_booked' (terminal — wins over every other stage), next_action
-- 'prep_meeting'. Priority: replied stays first (bucket 0), meeting_booked
-- slots in right after (bucket 1); everything else shifts down one bucket.
-- The dashboard only ever sorts by priority numerically, so renumbering the
-- buckets is safe as long as relative order is preserved.
-- Cadence (+2/+4/+7/+7), stage chain sourced→enriched→sequenced→in_outreach→
-- replied, and the fit_score tiebreaker are unchanged from 002.

create or replace view public.v_pipeline as
with last_sent as (
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
    exists (select 1 from public.meetings m
            where m.contact_id = c.id
              and m.status in ('scheduled','held'))                              as has_meeting,
    (c.status = 'replied'
       or exists (select 1 from public.sequences s
                  join public.touches t on t.sequence_id = s.id
                  where s.contact_id = c.id and t.reply_at is not null))          as has_reply,
    exists (select 1 from public.sequences s where s.contact_id = c.id)           as has_sequence,
    (c.email_status in ('verified','valid'))                                      as is_verified
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

  case
    when f.has_meeting                     then 'meeting_booked'
    when f.has_reply                       then 'replied'
    when ls.contact_id is not null         then 'in_outreach'
    when f.has_sequence                    then 'sequenced'
    when f.is_verified                     then 'enriched'
    else 'sourced'
  end                                    as stage,

  case
    when f.has_meeting                     then 'prep_meeting'
    when f.has_reply                       then 'respond'
    when ls.contact_id is not null         then 'send_next_touch'
    when f.has_sequence                    then 'review_and_send'
    when f.is_verified                     then 'write_sequence'
    else 'enrich'
  end                                    as next_action,

  -- next_due: the touch cadence is meaningless once a meeting is booked.
  case
    when f.has_meeting then null
    when ls.contact_id is not null then
      ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                           when 2 then 2 when 3 then 4
                           when 4 then 7 when 5 then 7 else null end)
    else null
  end                                    as next_due,

  case
    when not f.has_meeting
      and ls.contact_id is not null
      and (ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                                when 2 then 2 when 3 then 4
                                when 4 then 7 when 5 then 7 else null end)) < current_date
    then true else false
  end                                    as overdue,

  -- priority: lower = do sooner. Replies first, then booked meetings,
  -- then overdue outreach, then the rest; fit_score as a tiebreaker.
  (case
     when f.has_reply and not f.has_meeting then 0
     when f.has_meeting             then 1
     when ls.contact_id is not null then 2
     when f.has_sequence            then 3
     when f.is_verified             then 4
     else 5
   end) * 1000
   - coalesce(c.fit_score, 0)             as priority

from public.contacts c
join flags f on f.contact_id = c.id
left join last_sent ls on ls.contact_id = c.id
where coalesce(c.archived, false) = false;

-- View honors base-table RLS (003 end-state: admins via authenticated only).
alter view public.v_pipeline set (security_invoker = on);
grant select on public.v_pipeline to authenticated;

commit;

-- ============================================================================
-- VERIFY (run these after; eyeball before trusting the new state)
-- ============================================================================
-- select stage, count(*) from public.v_pipeline group by stage order by 1;
--   -- expect identical to pre-005 until a meetings row exists
-- select count(*) from public.decisions;
-- select count(*) from public.draft_edits;
-- select count(*) from public.meetings;
-- select daily_quota, settings, sms_phone from public.clients limit 5;
-- select tablename, policyname, roles from pg_policies
--   where schemaname = 'public'
--     and tablename in ('decisions','draft_edits','meetings')
--   order by tablename, policyname;
