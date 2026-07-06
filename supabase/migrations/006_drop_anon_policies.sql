-- ============================================================================
-- 006_drop_anon_policies.sql
-- Finish what 003 started: remove every anon-role path into the pipeline data.
--
-- After 003 was applied, twelve wide-open anon policies (`using (true)`) were
-- re-added to the pipeline tables, and anon kept table-level grants plus
-- SELECT on the views. Nothing legitimate uses them anymore:
--
--   * dashboard/ — all data access goes through server actions
--     (dashboard/app/actions.ts) using the service-role client
--     (dashboard/lib/supabase-server.ts). The anon-key client
--     (lib/supabase.ts) was deleted in June 2026. service_role bypasses RLS.
--   * saren.ai Studio cockpit — gated by Supabase Auth in src/proxy.ts;
--     signed-in requests run as `authenticated` and hit the admin_all_*
--     policies via public.is_admin(). The anon key is only the API key.
--   * The engine (Claude skills, job-runner) — Supabase MCP / service_role.
--
-- Also closes a hole 003 missed: v_todays_outreach had security_invoker OFF
-- (runs as owner → bypasses base-table RLS) and anon held SELECT on it,
-- exposing contacts/sequences/touches to the bare anon key.
--
-- Leaves the landing-page / monetization tables (outreach_pages, tool_outputs,
-- entitlements, purchases) UNTOUCHED, per 003's note. The public site's
-- /for/[slug] pages read outreach_pages + tool_outputs as anon through their
-- `to public` policies — those policies need anon's table grants to function,
-- so this migration deliberately does NOT revoke anon grants on those four.
--
-- Idempotent: safe to re-run. Drops policies/grants only — no data touched.
--
-- APPLY: not applied automatically. Run via the Supabase MCP
--   (apply_migration, project ltsuosasgblbqhsjckfg) or paste into the
--   Supabase SQL editor. Then run the VERIFY queries at the bottom.
-- ============================================================================

begin;

-- ----------------------------------------------------------------------------
-- 1. Drop the re-added anon policies (the live list as of 2026-06-10)
-- ----------------------------------------------------------------------------

-- contacts
drop policy if exists anon_read_contacts   on public.contacts;
drop policy if exists anon_update_contacts on public.contacts;

-- companies
drop policy if exists anon_read_companies   on public.companies;
drop policy if exists anon_update_companies on public.companies;

-- sequences
drop policy if exists anon_read_sequences   on public.sequences;
drop policy if exists anon_update_sequences on public.sequences;

-- touches
drop policy if exists anon_read_touches   on public.touches;
drop policy if exists anon_insert_touches on public.touches;
drop policy if exists anon_update_touches on public.touches;

-- agent_jobs
drop policy if exists anon_read_agent_jobs   on public.agent_jobs;
drop policy if exists anon_insert_agent_jobs on public.agent_jobs;

-- contact_sources
drop policy if exists anon_read_contact_sources on public.contact_sources;

-- Belt-and-suspenders: re-drop the 001-era names 003 already dropped, in case
-- any were re-created alongside the batch above.
drop policy if exists anon_read_clients on public.clients;

-- ----------------------------------------------------------------------------
-- 2. Revoke anon table grants on the pipeline tables
-- ----------------------------------------------------------------------------
-- Policies gate rows; grants gate the table itself. anon currently holds full
-- CRUD grants (Supabase's defaults) on every pipeline table — dead weight now
-- that no anon policies exist, but revoking closes the door for good: a
-- future accidental `to anon using (true)` policy does nothing without these.
revoke all on table public.agent_jobs      from anon;
revoke all on table public.agent_runs      from anon;
revoke all on table public.clients         from anon;
revoke all on table public.companies       from anon;
revoke all on table public.contact_signals from anon;
revoke all on table public.contact_sources from anon;
revoke all on table public.contacts        from anon;
revoke all on table public.decisions       from anon;
revoke all on table public.draft_edits     from anon;
revoke all on table public.meetings        from anon;
revoke all on table public.sequence_steps  from anon;
revoke all on table public.sequences       from anon;
revoke all on table public.touches         from anon;

-- NOT revoked (public landing pages read these as anon via `to public`
-- policies — see header): outreach_pages, tool_outputs, entitlements,
-- purchases.

-- ----------------------------------------------------------------------------
-- 3. Views
-- ----------------------------------------------------------------------------
-- v_pipeline: security_invoker is already ON (001/005), so it honors the
-- base-table policies — but anon still held grants on it. Remove them;
-- authenticated keeps SELECT (003/005).
revoke all on public.v_pipeline from anon;
grant  select on public.v_pipeline to authenticated;

-- v_todays_outreach: had security_invoker OFF — it ran as the view owner and
-- BYPASSED the base-table RLS entirely, with anon holding SELECT. Flip it to
-- invoker (matching v_pipeline) and strip anon. Admins keep access through
-- the admin_all_* policies; the engine's service_role bypasses RLS anyway.
alter view public.v_todays_outreach set (security_invoker = on);
revoke all on public.v_todays_outreach from anon;
grant  select on public.v_todays_outreach to authenticated;

commit;

-- ============================================================================
-- VERIFY (run these after; eyeball before trusting the new state)
-- ============================================================================
-- 1. No policy anywhere names the anon role — expect ZERO rows.
--    (outreach_pages/tool_outputs use `to public`, which reports {public},
--    so they correctly do not appear here.)
-- select tablename, policyname, roles from pg_policies
--  where schemaname = 'public'
--    and 'anon' = any(string_to_array(translate(roles::text,'{}',''),','))
--  order by tablename, policyname;
--
-- 2. anon's only remaining table grants are the four landing-page tables.
-- select table_name, string_agg(privilege_type, ',' order by privilege_type)
--   from information_schema.role_table_grants
--  where grantee = 'anon' and table_schema = 'public'
--  group by table_name order by table_name;
--   -- expect: entitlements, outreach_pages, purchases, tool_outputs only
--
-- 3. Both views now honor base-table RLS.
-- select c.relname,
--        coalesce((select option_value from pg_options_to_table(c.reloptions)
--                   where option_name = 'security_invoker'), 'off') as sec_invoker
--   from pg_class c join pg_namespace n on n.oid = c.relnamespace
--  where n.nspname = 'public' and c.relkind = 'v';
--   -- expect: v_pipeline on, v_todays_outreach on
--
-- 4. The bare anon role reads nothing from the pipeline but the landing
--    pages still work.
-- set role anon;
-- select count(*) from public.outreach_pages;   -- works (public policy)
-- select count(*) from public.contacts;          -- expect: permission denied
-- select count(*) from public.v_pipeline;        -- expect: permission denied
-- reset role;
