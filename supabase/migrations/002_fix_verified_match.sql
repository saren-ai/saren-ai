-- ============================================================================
-- 002_fix_verified_match.sql
-- Apollo marks deliverable emails as BOTH 'verified' and 'valid'. The v_pipeline
-- view in 001 only counted 'verified', so 'valid' contacts fell into 'sourced'
-- (wrong next-action: "enrich" instead of "write_sequence"). Fix: treat both as
-- enriched-qualifying. 'unverified' and 'bounced' stay un-enriched (sourced).
--
-- Idempotent: create-or-replace. Safe to re-run.
-- ============================================================================

begin;

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
    when f.has_reply                       then 'replied'
    when ls.contact_id is not null         then 'in_outreach'
    when f.has_sequence                    then 'sequenced'
    when f.is_verified                     then 'enriched'
    else 'sourced'
  end                                    as stage,

  case
    when f.has_reply                       then 'respond'
    when ls.contact_id is not null         then 'send_next_touch'
    when f.has_sequence                    then 'review_and_send'
    when f.is_verified                     then 'write_sequence'
    else 'enrich'
  end                                    as next_action,

  case
    when ls.contact_id is not null then
      ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                           when 2 then 2 when 3 then 4
                           when 4 then 7 when 5 then 7 else null end)
    else null
  end                                    as next_due,

  case
    when ls.contact_id is not null
      and (ls.last_sent_on + (case coalesce(ls.sent_touch_no,1) + 1
                                when 2 then 2 when 3 then 4
                                when 4 then 7 when 5 then 7 else null end)) < current_date
    then true else false
  end                                    as overdue,

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

alter view public.v_pipeline set (security_invoker = on);
grant select on public.v_pipeline to anon;

commit;

-- VERIFY: expect ~7 contacts to move from sourced -> enriched
-- select stage, count(*) from public.v_pipeline group by stage order by 1;
