# Hustle & Flow — Schema Reference

Supabase project: `ltsuosasgblbqhsjckfg` (us-west-2, Hustle & Flow)
Desk: https://saren.ai/desk (admin pipeline — renamed from `/studio` 2026-06-17)
Migrations of record: `supabase/migrations/001–003` (in this repo)

> **Model in one line:** `clients → companies → contacts → sequences → touches`.
> Records (clients/companies/contacts) are written by the sourcing skills; outreach
> **state** lives in `touches` (the event log); the `v_pipeline` view derives each
> contact's stage and next action. Supabase is the system of record — not files.

---

## clients

Added in `001`. One row per prospecting client (you + each consulting client).

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| slug | text | Unique — e.g. `saren`, `wethosai` |
| name | text | |
| created_at | timestamptz | |

## companies

Added in `001`. The account/target as a first-class record (was previously just a text field on contacts).

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| client_id | uuid | FK → clients |
| name | text | Required |
| domain | text | Dedup key — unique per `(client_id, lower(domain))` |
| url | text | |
| industry | text | |
| employee_count | int | |
| segment | text | |
| fit_score | numeric | |
| fit_rationale | text | |
| stage | text | Account-level rollup (optional) |
| archived | bool | |
| created_at / updated_at | timestamptz | |

## contacts

Original columns plus the `001` additions (marked **new**). `email` is no longer the dedup key — dedup is now `contact_sources(source, source_id)`.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| full_name / first_name / last_name | text | |
| email | text | |
| email_status | text | `verified` / `valid` / `unverified` / `bounced` (Apollo). `verified`+`valid` = deliverable |
| company | text | Legacy free-text; prefer `company_id` |
| company_id | uuid | **new** — FK → companies |
| client_id | uuid | **new** — FK → clients |
| title | text | |
| seniority | text | **new** |
| buying_role_hypothesis | text | **new** |
| fit_score | numeric | **new** |
| stage | text | **new** — maintained seed; `v_pipeline` recomputes live |
| segment | text | |
| location | text | |
| phone | text | |
| linkedin_url | text | |
| apollo_id | text | Apollo person ID |
| fit_rationale / personalization_seed / recommended_angle | text | Outreach context |
| status / touch_number / last_action_date / ooo_until | — | **Legacy** outreach-state columns. Superseded by `touches`; kept during transition, droppable in a future migration |
| state | text | US state (geo, mostly null); redundant with `location` |
| notes | text | |
| archived | bool | `v_pipeline` excludes archived |
| created_at / updated_at | timestamptz | |

## contact_sources

Provenance + **dedup guard**. `001` added a unique index on `(source, source_id)`.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| contact_id | uuid | FK → contacts |
| source | text | `apollo` / `csv` / `manual` |
| source_id | text | Apollo person ID when source=apollo — unique per source |
| raw | jsonb | Full Apollo payload or CSV row |
| imported_at | timestamptz | |

## contact_signals

Intent / growth signals per contact (feeds fit scoring). Unchanged by `001–003`.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| contact_id | uuid | FK → contacts |
| signal_id | text | |
| vector | text | |
| score | numeric | |
| detected_at | timestamptz | |
| notes | text | |

## sequences

One outreach play per contact. Holds the structured copy.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| contact_id | uuid | FK → contacts |
| play | text | e.g. `cold-outbound`, `warm-follow-up` |
| status | text | queued / active / paused / completed / dead |
| subject_a / subject_b | text | A/B subject lines |
| email_body | text | Touch-1 copy |
| linkedin_connect_msg / linkedin_day10_msg | text | LinkedIn copy |
| outreach_page_slug | text | FK → outreach_pages.slug (optional) |
| started_at / updated_at | timestamptz | |

## touches  ← the STATE (event log)

One row per outreach action. Keyed by **sequence_id** (not contact_id). `001` added a `(sequence_id, sent_at)` index. This is the source for streaks / daily-goal / cadence.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| sequence_id | uuid | FK → sequences |
| touch_num | int | Auto-incremented per sequence |
| channel | text | email / linkedin / phone |
| status | text | drafted / sent / opened / replied / bounced |
| scheduled_at / sent_at / opened_at / clicked_at / reply_at | timestamptz | |
| subject / body_md | text | |
| thread | jsonb | `[{direction, body_md, sent_at}]` |
| sentiment | text | positive / neutral / negative |
| notes | text | |

## outreach_pages

Personalized public landing pages at `saren.ai/for/[slug]`. **Not touched by 001–003** — keeps its own public RLS. (The studio manager UI was removed; the public pages still render. Manage via SQL or a future re-add.)

| Column | Type | Notes |
|---|---|---|
| slug | text | PK — `saren.ai/for/[slug]` |
| company / industry / role / pain_point | text | |
| cta_text / cta_href | text | |
| tools | jsonb | |
| view_count | int | Auto-incremented on load |
| published_at | timestamptz | |

---

## v_pipeline  (the action layer — added in 001, fixed in 002)

A view, not a table. Rolls `touches` up through `sequences` to derive, per non-archived contact: current **stage**, the single **next_action**, **next_due**, **overdue**, and a **priority** sort key. Runs `security_invoker = on`, so it honors the base-table RLS.

Columns: `contact_id, client_id, client, company_id, company, full_name, title, segment, fit_score, email, linkedin_url, stage, next_action, next_due, overdue, priority`.

| stage | meaning | next_action |
|---|---|---|
| `sourced` | record exists, email not deliverable | `enrich` |
| `enriched` | email `verified`/`valid`, no sequence | `write_sequence` |
| `sequenced` | sequence exists, nothing sent | `review_and_send` |
| `in_outreach` | ≥1 touch with `sent_at` | `send_next_touch` |
| `replied` | a touch has `reply_at` (or contact.status='replied') | `respond` |

Touch cadence for `next_due`: touch 2 +2d, 3 +4d, 4 +7d, 5 +7d. The studio's Do-Next queue is just `select * from v_pipeline order by priority`.

## is_admin() + RLS  (added in 003 — the cutover lockdown)

Single source of access control. The dashboard tables (`clients, companies, contacts, sequences, sequence_steps, touches, contact_signals, contact_sources`) have `admin_all_*` policies that allow full CRUD only when `public.is_admin()` is true; `v_pipeline` grants `select` to `authenticated`. `anon` can no longer read or write these tables.

```sql
create or replace function public.is_admin() returns boolean language sql stable as $$
  select auth.uid() in (
    'eb6f0525-4669-4e66-8fd1-f2453ff41eff',  -- saren.sakurai@gmail.com (super admin)
    '113bc2bb-716e-4a94-8ddc-fc32a3b2e220'   -- saren@saren.ai
  );
$$;
```

Add/remove a UID here to grant/revoke. `outreach_pages` / `tool_outputs` / `entitlements` / `purchases` keep their own public policies — untouched by the lockdown.

---

## Write patterns

### Contact dedup + upsert (dedup on Apollo source_id, not email)

```sql
-- 1. has Apollo already seeded this person?
select contact_id from contact_sources where source = 'apollo' and source_id = '[apollo_id]';
-- 2a. found → UPDATE that contact (fill blanks)
-- 2b. not found → INSERT contact, then:
insert into contact_sources (contact_id, source, source_id, raw)
values ('[id]', 'apollo', '[apollo_id]', '[payload]'::jsonb)
on conflict (source, source_id) do nothing;
```

### Company upsert (dedup on client + domain)

```sql
insert into companies (client_id, name, domain, industry, stage)
values ('[client_id]', '[name]', '[domain]', '[industry]', 'sourced')
on conflict (client_id, lower(domain)) where domain is not null
do update set industry = excluded.industry, updated_at = now()
returning id;
```

### Stage on write

`stage = 'enriched'` when `email_status` ∈ (`verified`,`valid`), else `'sourced'`. `v_pipeline` recomputes live; writing it keeps the record self-describing.

### Touch insert (state change)

```sql
insert into touches (sequence_id, touch_num, channel, status, sent_at, subject, body_md)
select '[sequence_id]',
  coalesce((select max(touch_num) from touches where sequence_id = '[sequence_id]'), 0) + 1,
  'email', 'sent', now(), '[subject]', '[body_md]';
```

---

## Status values

**Pipeline stage (v_pipeline):** `sourced → enriched → sequenced → in_outreach → replied`
**Sequence:** `queued → active → paused → completed / dead`
**Touch:** `drafted → sent → opened → replied / bounced`
**Email (Apollo):** `verified` / `valid` (deliverable) · `unverified` / `bounced`
**Sentiment:** `positive` / `neutral` / `negative`
