-- ============================================================================
-- 003_auth_lockdown.sql   ⚠️ RUN THIS LAST — AT CUTOVER ONLY
--
-- Replaces the wide-open anon policies on the dashboard tables with policies
-- pinned to specific admin UIDs via public.is_admin(). Even an accidentally
-- created Supabase user reads NOTHING unless its UID is in that function.
--
-- DO NOT run this until the new SvelteKit app can authenticate via Supabase Auth.
-- The instant this applies, anything using the bare anon key (the old
-- dashboard.html) stops working — by design.
--
-- Leaves the landing-page / monetization tables (outreach_pages, tool_outputs,
-- entitlements, purchases) and their public policies UNTOUCHED.
--
-- Prereq in Supabase dashboard (not SQL): Authentication → enable Email (magic
-- link), and turn OFF "Allow new users to sign up". WethosAI is a CLIENT (a row
-- in clients), never an admin; client read-only sharing is a separate, later
-- mechanism.
-- ============================================================================

begin;

-- ----------------------------------------------------------------------------
-- Single source of "who is allowed". Add/remove a UID here to grant/revoke.
--   eb6f0525-4669-4e66-8fd1-f2453ff41eff  = saren.sakurai@gmail.com (super admin)
--   113bc2bb-716e-4a94-8ddc-fc32a3b2e220  = saren@saren.ai (send-as identity)
-- To go gmail-only, delete the second UID line below.
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select auth.uid() in (
    'eb6f0525-4669-4e66-8fd1-f2453ff41eff',
    '113bc2bb-716e-4a94-8ddc-fc32a3b2e220'
  );
$$;
grant execute on function public.is_admin() to authenticated, anon;

-- ----------------------------------------------------------------------------
-- Dashboard tables: full CRUD for admins only.
-- ----------------------------------------------------------------------------

-- contacts
drop policy if exists anon_read_contacts on public.contacts;
drop policy if exists auth_all_contacts  on public.contacts;
create policy admin_all_contacts on public.contacts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- companies
drop policy if exists anon_read_companies on public.companies;
drop policy if exists auth_all_companies  on public.companies;
create policy admin_all_companies on public.companies
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- clients
drop policy if exists anon_read_clients on public.clients;
drop policy if exists auth_all_clients  on public.clients;
create policy admin_all_clients on public.clients
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- sequences
drop policy if exists anon_read_sequences   on public.sequences;
drop policy if exists anon_update_sequences on public.sequences;
drop policy if exists auth_all_sequences    on public.sequences;
create policy admin_all_sequences on public.sequences
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- sequence_steps
alter table public.sequence_steps enable row level security;
drop policy if exists auth_all_sequence_steps on public.sequence_steps;
create policy admin_all_sequence_steps on public.sequence_steps
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- touches
drop policy if exists anon_read_touches   on public.touches;
drop policy if exists anon_insert_touches on public.touches;
drop policy if exists anon_update_touches on public.touches;
drop policy if exists auth_all_touches    on public.touches;
create policy admin_all_touches on public.touches
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- contact_signals
alter table public.contact_signals enable row level security;
drop policy if exists auth_all_contact_signals on public.contact_signals;
create policy admin_all_contact_signals on public.contact_signals
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- contact_sources
alter table public.contact_sources enable row level security;
drop policy if exists auth_all_contact_sources on public.contact_sources;
create policy admin_all_contact_sources on public.contact_sources
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- v_pipeline (view): security_invoker = on (set in 001) means it already honors
-- the base-table policies above. Move grants from anon to authenticated.
-- ----------------------------------------------------------------------------
revoke select on public.v_pipeline from anon;
grant  select on public.v_pipeline to authenticated;

commit;

-- VERIFY: confirm only admin_* policies remain on the dashboard tables.
-- select tablename, policyname, roles from pg_policies
--  where schemaname = 'public'
--    and tablename in ('contacts','companies','clients','sequences',
--                      'sequence_steps','touches','contact_signals','contact_sources')
--  order by tablename, policyname;
