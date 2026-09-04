-- ============================================================================
-- 010_chat_hardening.sql
--
-- Supports the live chat abuse-defense layers: per-IP daily message limits
-- and the global daily session cap need the requester's IP recorded on each
-- visitor message so limits hold across serverless instances (an in-memory
-- counter doesn't survive a cold start).
-- ============================================================================

begin;

alter table public.chat_messages add column ip text;

create index chat_messages_ip_created_at_idx
  on public.chat_messages (ip, created_at)
  where role = 'visitor';

commit;
