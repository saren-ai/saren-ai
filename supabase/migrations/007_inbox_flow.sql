-- ============================================================================
-- 007_inbox_flow.sql
-- Inbox = "my current to-do list." Once a Gmail draft exists for the immediate
-- next step, the contact must DROP out of Inbox until something new happens
-- (a reply, or the draft being sent and the cadence lapsing).
--
-- Mechanism: the dashboard's draft-save flows now create/update a touches row
-- with status 'queued' + scheduled_at = now(). v_pipeline learns a new flag,
-- pending_send: a queued touch NEWER than both the last reply and the last
-- send means "responded — waiting on human send". Such a contact is
-- 'in_outreach' (not 'replied') and never 'overdue', so buildInbox() in the
-- dashboard no longer surfaces it. If the prospect replies AGAIN after the
-- draft was queued, the reply is newer → the contact returns to Inbox.
--
-- Also in this migration:
--   touches.status   — CHECK widened with 'queued' and 'draft'. The dashboard
--                      has been inserting status 'draft' since the next-touch
--                      module shipped; the 'pending|sent|opened|replied|
--                      bounced|skipped' check was silently rejecting those
--                      inserts. Fixed here.
--   sequences.status — CHECK widened with 'stopped' (Inbox archive action
--                      stops the active sequence).
--   draft_edits      — + feedback text. First-impression notes on a generated
--                      draft ("opener feels AI-ish") land here even when no
--                      edit was made; the voice learns from both.
--   v_pipeline       — recreated with pending_send on top of the 005 logic.
--                      Column list/order unchanged; dashboard reads it as-is.
--
-- Idempotent: safe to re-run. Additive only — drops nothing from 001-006.
--
-- APPLY: psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f migrations/007_inbox_flow.sql
--   (var in dashboard/.env.local; grep it, never source the file)
-- ============================================================================

begin;

-- ----------------------------------------------------------------------------
-- 1. touches.status  (drop-first so re-runs can widen the set; pattern from 004)
-- ----------------------------------------------------------------------------
-- 'queued' = a Gmail draft for this touch exists, waiting on the human to send.
-- 'draft'  = copy staged in the dashboard (e.g. a LinkedIn message copied to
--            clipboard) but no draft saved in the outbox yet.
alter table public.touches drop constraint if exists touches_status_check;
alter table public.touches add  constraint touches_status_check
  check (status in ('pending','draft','queued','sent','opened','replied','bounced','skipped'));

-- v_pipeline probes queued touches per sequence; keep that lookup index-backed.
create index if not exists touches_seq_queued_idx
  on public.touches (sequence_id, scheduled_at)
  where status = 'queued';

-- ----------------------------------------------------------------------------
-- 2. sequences.status  (+ 'stopped' — terminal, set by the Inbox archive action)
-- ----------------------------------------------------------------------------
alter table public.sequences drop constraint if exists sequences_status_check;
alter table public.sequences add  constraint sequences_status_check
  check (status in ('queued','active','paused','completed','dead','stopped','draft_pushed'));
-- 'draft_pushed' included because the Review push flow has been writing it;
-- the old check was silently rejecting that update too.

-- ----------------------------------------------------------------------------
-- 3. draft_edits.feedback  (first-impression capture → voice training signal)
-- ----------------------------------------------------------------------------
alter table public.draft_edits add column if not exists feedback text;

-- ============================================================================
-- 4. v_pipeline  (add pending_send on top of the 005 logic)
-- ============================================================================
-- Same column list and order as 001/002/005 — the dashboard (lib/types.ts
-- PipelineContact, lib/queues.ts, components/triage.tsx, components/pipeline.tsx)
-- reads these fields by name; do not rename or drop any.
--
-- New rule: pending_send = a 'queued' touch whose scheduled_at is newer than
-- BOTH the latest reply and the latest send. Such a contact:
--   stage 'in_outreach' (wins over 'replied' — the reply has been handled),
--   next_action 'send_next_touch' (the draft sits in Gmail),
--   next_due null, overdue false (nothing for the dashboard to chase).
-- meeting_booked stays terminal and wins over everything (005 rule).
-- Cadence (+2/+4/+7/+7), stage chain, and the fit_score tiebreaker unchanged.

create or replace view public.v_pipeline as
with last_sent as (
  select s.contact_id,
         max(t.sent_at)::date           as last_sent_on,
         max(t.sent_at)                 as last_sent_at,
         max(t.touch_num)               as sent_touch_no
  from public.touches t
  join public.sequences s on s.id = t.sequence_id
  where t.sent_at is not null
  group by s.contact_id
),
last_reply as (
  select s.contact_id,
         max(t.reply_at)                as last_reply_at
  from public.touches t
  join public.sequences s on s.id = t.sequence_id
  where t.reply_at is not null
  group by s.contact_id
),
queued as (
  select s.contact_id,
         max(t.scheduled_at)            as last_queued_at
  from public.touches t
  join public.sequences s on s.id = t.sequence_id
  where t.status = 'queued' and t.scheduled_at is not null
  group by s.contact_id
),
flags as (
  select
    c.id as contact_id,
    exists (select 1 from public.meetings m
            where m.contact_id = c.id
              and m.status in ('scheduled','held'))                              as has_meeting,
    (c.status = 'replied' or lr.contact_id is not null)                          as has_reply,
    (q.last_queued_at is not null
       and (lr.last_reply_at is null or q.last_queued_at > lr.last_reply_at)
       and (ls.last_sent_at  is null or q.last_queued_at > ls.last_sent_at))     as pending_send,
    exists (select 1 from public.sequences s where s.contact_id = c.id)          as has_sequence,
    (c.email_status in ('verified','valid'))                                     as is_verified
  from public.contacts c
  left join last_reply lr on lr.contact_id = c.id
  left join queued     q  on q.contact_id  = c.id
  left join last_sent  ls on ls.contact_id = c.id
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
    when f.has_meeting                              then 'meeting_booked'
    when f.has_reply and not f.pending_send         then 'replied'
    when ls.contact_id is not null or f.pending_send then 'in_outreach'
    when f.has_sequence                             then 'sequenced'
    when f.is_verified                              then 'enriched'
    else 'sourced'
  end                                    as stage,

  case
    when f.has_meeting                              then 'prep_meeting'
    when f.has_reply and not f.pending_send         then 'respond'
    when ls.contact_id is not null or f.pending_send then 'send_next_touch'
    when f.has_sequence                             then 'review_and_send'
    when f.is_verified                              then 'write_sequence'
    else 'enrich'
  end                                    as next_action,

  -- next_due: meaningless once a meeting is booked or a draft is queued.
  case
    when f.has_meeting or f.pending_send then null
    when ls.contact_id is not null then
      ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                           when 2 then 2 when 3 then 4
                           when 4 then 7 when 5 then 7 else null end)
    else null
  end                                    as next_due,

  case
    when not f.has_meeting
      and not f.pending_send
      and ls.contact_id is not null
      and (ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                                when 2 then 2 when 3 then 4
                                when 4 then 7 when 5 then 7 else null end)) < current_date
    then true else false
  end                                    as overdue,

  -- priority: lower = do sooner. Unhandled replies first, then booked meetings,
  -- then outreach (incl. queued drafts), then the rest; fit_score tiebreaker.
  (case
     when f.has_reply and not f.has_meeting and not f.pending_send then 0
     when f.has_meeting                               then 1
     when ls.contact_id is not null or f.pending_send then 2
     when f.has_sequence                              then 3
     when f.is_verified                               then 4
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
--   -- expect identical to pre-007 until a 'queued' touch exists
-- begin;
--   -- pick a replied contact, queue a touch, watch it leave 'replied':
--   -- insert into touches (sequence_id, touch_num, channel, status, scheduled_at)
--   --   values ('<seq>', 99, 'email', 'queued', now());
--   -- select stage, next_action, overdue from v_pipeline where contact_id = '<id>';
-- rollback;
-- select conname, pg_get_constraintdef(oid) from pg_constraint
--   where conrelid in ('public.touches'::regclass, 'public.sequences'::regclass)
--     and conname like '%status%';
-- select column_name from information_schema.columns
--   where table_name = 'draft_edits' and column_name = 'feedback';
