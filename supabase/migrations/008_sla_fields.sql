-- ============================================================================
-- 008_sla_fields.sql
-- The 24-hour outbound SLA, surfaced. Two clocks the operator maintains:
--
--   approval → first touch   24h from the human's APPROVE verdict (the latest
--                            decisions row with decision='approved') to the
--                            first SENT touch.
--   touch due → touch sent   24h from a cadence touch becoming due (next_due)
--                            to actually sending it.
--
-- (Replies have a separate 90-second SMS SLA — deliberately NOT modeled here.)
--
-- v_pipeline gains two columns APPENDED at the end (CREATE OR REPLACE VIEW
-- permits appending; the 001-007 column list/order is unchanged — the
-- dashboard reads fields by name; do not rename or drop any):
--
--   approved_at  timestamptz — latest 'approved' decision for the contact;
--                              null if never approved from the dashboard.
--   sla_due_at   timestamptz — when the current SLA clock breaches:
--       meeting booked / pending_send  → null (nothing for the human to send)
--       unhandled reply                → null (SMS SLA, out of scope)
--       in outreach with a next_due    → next_due + 24h (due at midnight UTC,
--                                        24h grace to send)
--       approved, nothing sent yet     → approved_at + 24h
--       everything else                → null
--
-- The dashboard renders sla_due_at as the green/amber/red chip and floats
-- closest-to-breach rows up within their priority bands. No base-table
-- changes; decisions.created_at (005) already carries the approval timestamp.
--
-- Idempotent: safe to re-run. Additive only — drops nothing from 001-007.
--
-- APPLY: psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f migrations/008_sla_fields.sql
--   (var in dashboard/.env.local; grep it, never source the file)
-- ============================================================================

begin;

-- approvals CTE probes decisions per contact; keep that lookup index-backed.
create index if not exists decisions_contact_decision_idx
  on public.decisions (contact_id, decision, created_at desc);

-- ============================================================================
-- v_pipeline  (007 logic verbatim + approvals CTE + appended SLA columns)
-- ============================================================================

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
approvals as (
  select d.contact_id,
         max(d.created_at)              as approved_at
  from public.decisions d
  where d.decision = 'approved'
  group by d.contact_id
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
   - coalesce(c.fit_score, 0)             as priority,

  -- ── 008 additions (appended; everything above is the 007 contract) ────────
  ap.approved_at                          as approved_at,

  case
    -- nothing for the human to send / out-of-scope reply SLA
    when f.has_meeting or f.pending_send           then null
    when f.has_reply                               then null
    -- in outreach: 24h from the touch becoming due (midnight of next_due, UTC)
    when ls.contact_id is not null then
      ((ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                             when 2 then 2 when 3 then 4
                             when 4 then 7 when 5 then 7 else null end)
       )::timestamptz + interval '24 hours')
    -- approved, nothing sent yet: 24h from the approval verdict
    when ap.approved_at is not null                then ap.approved_at + interval '24 hours'
    else null
  end                                     as sla_due_at

from public.contacts c
join flags f on f.contact_id = c.id
left join last_sent ls on ls.contact_id = c.id
left join approvals ap on ap.contact_id = c.id
where coalesce(c.archived, false) = false;

-- View honors base-table RLS (003 end-state: admins via authenticated only).
alter view public.v_pipeline set (security_invoker = on);
grant select on public.v_pipeline to authenticated;

commit;

-- ============================================================================
-- VERIFY (run these after; eyeball before trusting the new state)
-- ============================================================================
-- select stage, count(*), count(sla_due_at) as with_sla
--   from public.v_pipeline group by stage order by 1;
-- select contact_id, stage, next_due, approved_at, sla_due_at
--   from public.v_pipeline where sla_due_at is not null
--   order by sla_due_at limit 10;
-- -- column order preserved + two appended:
-- select column_name, ordinal_position from information_schema.columns
--   where table_name = 'v_pipeline' order by ordinal_position;
