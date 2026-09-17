-- ============================================================================
-- 011_drop_live_chat.sql
--
-- The live chat widget was removed (2026-09-16) — no bandwidth to staff it.
-- Drops the two tables it introduced in 009_live_chat.sql / 010_chat_hardening.sql.
-- chat_messages first (FK references chat_sessions).
-- ============================================================================

begin;

drop table if exists public.chat_messages;
drop table if exists public.chat_sessions;

commit;
