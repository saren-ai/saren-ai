---
name: apollo-people-search
description: >
  Finds matching contacts in Apollo for the active client's ICP and writes them to Supabase
  (the system of record), then optionally exports a handoff for the zubair /sales suite. Use
  when an ICP spec exists and the user wants prospects — "find contacts", "run the Apollo
  search", "pull people for this ICP", "who matches" — or after icp-builder finishes. Runs a
  free search, post-filters exclusions, then (only on explicit confirmation, because it costs
  credits) enriches the chosen targets to get verified emails, upserts companies + contacts +
  provenance into Supabase with a pipeline stage, and — only when handing off — generates a
  DECISION-MAKERS.md export the suite reads. Works with ANY Apollo account that has an MCP
  connection — never hardcodes account IDs. Does NOT define the ICP (use icp-builder) and does
  NOT write the emails (use the suite's /sales outreach).
---

# Apollo People Search (adapter + seeder)

Translate the active client's ICP into an Apollo search, then write the best targets to the
database. Apollo search is FREE and returns names/titles/org but NO emails; emails come from a
separate enrichment call that costs 1 credit per person and requires explicit confirmation. So
this skill is a deliberate four-beat flow: **search → confirm → enrich → write to DB**. Search
wide for free; spend credits only on the contacts you'll actually pursue.

The system of record is **Supabase**, not files. This skill upserts records; the dashboard's
`v_pipeline` view derives stage and next-action from them. Files (DECISION-MAKERS.md) are
generated only on demand as a handoff to the file-based vendor `/sales` suite.

## Step 0 — Resolve client + validate inputs

Read `.active-client`; route to client-context if unset. Load `clients/<client>/icp.json`.
If buyer titles or company shape are empty, route back to icp-builder — don't run a
garbage-wide search.

## Step 1 — Map the ICP spec → `apollo_mixed_people_api_search` params (FREE)

The search tool is `apollo_mixed_people_api_search`. It takes company AND person filters
in one call, so a single search usually suffices.

| ICP spec field | Apollo param | Conversion |
|---|---|---|
| primary + secondary titles | `person_titles` (string[]) | concatenate; keep short ("COO", "Head of Ops") |
| seniorities (neutral) | `person_seniorities` (string[]) | **map down — Apollo only accepts `senior, manager, director, vp, c_suite`:** owner→c_suite · founder→c_suite · partner→c_suite · c_suite→c_suite · vp→vp · head→director · director→director · manager→manager · senior→senior · entry→(omit) |
| (title precision) | `include_similar_titles` (bool) | leave default `true`; set `false` when ICP titles are exact and you want strict matches only |
| geographies | `organization_locations` (HQ) and/or `person_locations` | default org HQ |
| employee_min/max | `organization_num_employees_ranges` (string[]) | pass as `"min,max"`, e.g. 201–5000 → `["201,5000"]` (split into buckets only if you want granularity) |
| industries / keywords | `q_organization_keyword_tags` (string[]) | e.g. `["SaaS","fintech"]` |
| technologies (include) | `currently_using_any_of_technology_uids` (string[]) | tech UIDs, underscores for spaces/dots |
| technologies (exclude) | `currently_not_using_any_of_technology_uids` (string[]) | native tech exclusion |
| known target domains | `q_organization_domains_list` (string[]) | if discovery already has domains |
| (reachability) | `contact_email_status` (string[]) | default `["verified","likely to engage"]` to bias toward enrichable contacts |
| pagination | `page`, `per_page` (1–100, default 10) | use per_page 25–50; paginate if needed |

**Exclusions have NO native title param.** Apply `exclusions.titles` by **post-filtering**
the results — drop any person whose title matches an excluded term. For WethosAI, dropping
HR / People / Talent / Recruiting is mandatory and happens here, after the search.

**Optional company-first branch:** if the ICP needs funding-stage targeting (Apollo people
search can filter `revenue_range` but NOT funding), first call `apollo_mixed_companies_search`
(also free) with `total_funding_range` / `latest_funding_*` / `organization_not_locations`,
collect `organization_ids`, then pass those into the people search.

## Step 2 — Run search, post-filter, present candidates

Run the search (free). Apply exclusion post-filtering. Note: depending on plan, last names
or fields may be masked — surface that to the user. Present a candidate table: company,
name, title, seniority, location. **No emails yet** — say so.

## Step 3 — Select best target(s) per company

For each company, pick the single best-matched decision-maker against the ICP (primary
title + seniority + clearest buying-role fit). This is the shortlist you'll spend credits
enriching — keep it tight.

## Step 4 — Confirm, then enrich (COSTS CREDITS)

Enrichment is the only way to get emails. Use `apollo_people_bulk_match` (up to 10 people
per call, 1 credit per match, loop in batches for more). **Before calling, state the cost
in this exact wording and wait for explicit approval:**

> "This will enrich [N] people and consume up to [N] credits (1 credit per match, no charge
> for unmatched). Do you want to proceed?"

Pass each person's identifying fields (name, organization_name, domain, linkedin_url, and
the Apollo `id` from the search result if present) in the `details` array. Default
`reveal_personal_emails: false`. Never enrich without the confirmation above.

## Step 5 — Write to Supabase (system of record)

The database is the source of truth, NOT files. Write enriched targets to Supabase via the
`mcp__supabase__execute_sql` tool. Do NOT write `target.json` anymore — that store is retired.

Resolve the client id once: `select id from clients where slug = '<client>'`.

**5a. Upsert the company** (dedup on client + domain):
```sql
insert into companies (client_id, name, domain, url, industry, employee_count, segment, fit_rationale, stage)
values (:client_id, :name, :domain, :url, :industry, :employee_count, :segment, :fit_rationale, 'sourced')
on conflict (client_id, lower(domain)) where domain is not null
do update set industry = excluded.industry, url = excluded.url,
              employee_count = excluded.employee_count, updated_at = now()
returning id;
```
If domain is null, select-then-insert by `(client_id, name)` instead.

**5b. Dedup-guard each contact via `contact_sources`, then upsert.** Before inserting a
person, check whether Apollo already seeded them:
```sql
select contact_id from contact_sources where source = 'apollo' and source_id = :apollo_id;
```
If found, UPDATE that contact; else INSERT a new contact, then INSERT the source row:
```sql
insert into contacts (client_id, company_id, full_name, first_name, last_name, title,
                       seniority, email, email_status, linkedin_url, apollo_id, segment,
                       buying_role_hypothesis, fit_rationale, personalization_seed,
                       recommended_angle, fit_score, location, stage)
values (..., :stage)            -- stage = 'enriched' if email_status='verified', else 'sourced'
returning id;

insert into contact_sources (contact_id, source, source_id, raw)
values (:contact_id, 'apollo', :apollo_id, :raw_jsonb)
on conflict (source, source_id) do nothing;
```
Store the full Apollo person payload in `contact_sources.raw` (jsonb) so nothing is lost.

**5c. Set the stage explicitly.** After enrichment: `stage = 'enriched'` for any contact
whose `email_status` is `'verified'` OR `'valid'` (both are deliverable in Apollo), otherwise
`'sourced'`. `'unverified'` and `'bounced'` stay `'sourced'`. The `v_pipeline` view recomputes
stage live with the same rule, but writing it keeps the record self-describing.

**5d. On-demand handoff export (ONLY when the user will run the vendor `/sales` suite).**
The suite reads files, so generate `clients/<client>/targets/<company-slug>/DECISION-MAKERS.md`
from the DB rows — buying-committee table, top contacts, real emails — in the shape
`sales-contacts` emits. This is a *generated export*, not the store. Skip it if the user
isn't handing off to the suite. Never write `target.json`.

## Step 6 — Recommend the next move

Output a short ranked list (company, best contact, fit rationale, angle), then state:
"Wrote N contacts across M companies to Supabase (stage: enriched/sourced). They're live in
the dashboard's funnel now. To draft outreach, run `/sales outreach` — I'll export the
DECISION-MAKERS.md handoff first, then `outreach-ingest` pulls the result back into the DB."

## Boundaries & credit discipline

- Search / companies-search / contacts-search = 0 credits. Enrichment (`people_bulk_match`,
  `organizations_enrich`) = 1 credit each — ALWAYS confirm with the exact wording first.
- Never enroll contacts in sequences, send mail, or modify the Apollo account here. The
  suite's outreach owns messaging; sequence enrollment is a separate guarded flow.
- Never define/improve the ICP here — wrong results from a wrong spec route to icp-builder.
- Account-portable: operate on whatever Apollo MCP is connected; take any list/owner IDs as
  runtime inputs, never baked in.
- Supabase is the store. Files under `clients/<client>/targets/` are on-demand exports for
  the vendor suite, never the source of truth. Never resurrect `target.json`.
