-- Run this in Supabase Dashboard → SQL Editor

-- 1. purchases table
create table if not exists public.purchases (
  id               uuid primary key default gen_random_uuid(),
  product_id       text not null,
  stripe_session_id text unique not null,
  customer_email   text,
  download_token   uuid unique not null default gen_random_uuid(),
  download_count   int not null default 0,
  download_limit   int not null default 5,
  expires_at       timestamptz not null default (now() + interval '30 days'),
  created_at       timestamptz not null default now()
);

-- RLS: block all public access — only service_role key can read/write
alter table public.purchases enable row level security;

-- 2. Storage bucket for downloadable files (private — no public URLs)
insert into storage.buckets (id, name, public)
values ('downloads', 'downloads', false)
on conflict (id) do nothing;

-- 3. Storage policy: only service_role can access objects in this bucket
create policy "Service role full access to downloads bucket"
on storage.objects
for all
to service_role
using (bucket_id = 'downloads')
with check (bucket_id = 'downloads');
