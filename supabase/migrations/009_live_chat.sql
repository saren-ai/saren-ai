-- ============================================================================
-- 009_live_chat.sql
--
-- Public-site live chat widget (Web Widget + Twilio SMS wake-up + AI night
-- mode). Two tables, no public RLS policies — every read/write goes through
-- server-side route handlers using the service-role client
-- (src/lib/supabase/admin.ts). The browser never talks to Supabase directly,
-- so there's no anon-key exposure to reason about.
-- ============================================================================

begin;

create table public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'open' check (status in ('open', 'waiting_admin', 'closed')),
  mode text not null default 'day' check (mode in ('day', 'night')),
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('visitor', 'saren', 'ai')),
  body text not null,
  created_at timestamptz not null default now()
);

create index chat_messages_session_id_created_at_idx
  on public.chat_messages (session_id, created_at);

create index chat_sessions_status_last_message_at_idx
  on public.chat_sessions (status, last_message_at desc);

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- No policies for anon/authenticated — service-role key bypasses RLS and is
-- the only credential these tables are ever accessed with.

commit;
