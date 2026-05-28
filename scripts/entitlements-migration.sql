-- Run in Supabase Dashboard → SQL Editor

create table if not exists public.entitlements (
  id             uuid primary key default gen_random_uuid(),
  session_id     text unique not null,        -- Stripe checkout session ID; idempotency key
  playbook_id    text not null,
  cookie_token   uuid not null default gen_random_uuid(),  -- gates page rendering
  download_token uuid not null default gen_random_uuid(),  -- gates file delivery (separate from cookie)
  expires_at     timestamptz not null default (now() + interval '30 days'),
  download_count int not null default 0,      -- analytics only, not an enforcement cap
  created_at     timestamptz not null default now()
);

-- RLS: block all public access — service_role only
alter table public.entitlements enable row level security;
