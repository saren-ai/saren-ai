---
name: prospect-scorer
description: >
  Agent 2 — the surface scorer. Scores the active client's sourced contacts from CHEAP
  signals only (title, seniority, headcount, industry, segment, geography, signals already
  on record) using clients/<client>/fit-scoring.md plus the last ~50 human verdicts from
  the decisions table as few-shot context, writes fit_score + fit_rationale (+ segment)
  back to Supabase, and surfaces the top N (the client's daily_quota) for the dashboard
  Approve queue. Use when the user says "score the batch", "rank the candidates", "who's
  worth approving", "sort the new contacts" — right after apollo-people-search lands a
  batch — or when dispatched by job-runner (agent_jobs.skill = 'prospect-scorer'). This is
  the pre-sort half of the picture: it NEVER triggers Apollo enrichment (zero credits),
  NEVER approves or archives anything (the human sort phase is sacred), and never applies
  one client's scoring model to another. Deep OSINT on approved contacts is contact-enrich's
  job, not this one.
---

# Prospect Scorer (Agent 2 — surface sort)

Turn a raw sourced batch into a ranked Approve queue. The score is deliberately ~half the
total picture — everything cheap Apollo search already gave us, nothing that costs a
credit or a web fetch. The human approves; deep OSINT happens after. Two inputs make the
ranking: the client's **fit-scoring.md rulebook**, and the client's **own recorded
verdicts** (the `decisions` table) replayed as few-shot context so the scorer drifts
toward what this client actually approves.

All DB access is `psql` against the pooler. Get the connection string fresh in each call
— never `source` the env file, never print the URL:

```bash
psql "$(grep '^SUPABASE_DB_URL=' dashboard/.env.local | cut -d= -f2-)" -c "<sql>"
```

## Step 0 — Resolve client + load the rulebook

1. Read `.active-client` at the project root. Unset → route to client-context first.
2. Load, all from `clients/<client>/`:
   - `fit-scoring.md` — the scoring model. **If missing**, stop and offer to derive one:
     read `profile.md` (segment ranking + exclusions) and every `icp*.json`, and draft a
     surface model in the shape of `clients/saren/fit-scoring.md` (weighted factors from
     cheap signals, kill conditions, networking/caution flags, a defensible threshold).
     Get the user's sign-off on the weights before scoring with it.
   - every `icp*.json` (some clients have one spec, saren has three segment specs) — the
     buyer title lists and company shapes the model references.
   - `profile.md` — the exclusions section, in case the model lags the profile.
3. Resolve the client row once:
   ```sql
   select id, coalesce(daily_quota, 5) as quota from clients where slug = '<client>';
   ```

**Per-client isolation is absolute.** Only ever read `clients/<active-client>/`. Applying
another client's fit-scoring.md (or letting another client's decisions leak into the
few-shot set) is the costly failure this boundary exists to prevent.

## Step 1 — Learning loop: replay the client's verdicts

Pull the last ~50 human sort-phase decisions, joined to what the contact looked like:

```sql
select d.decision, d.reason, d.notes,
       ct.title, ct.seniority, ct.company, ct.segment,
       co.industry, co.employee_count
from decisions d
join contacts ct on ct.id = d.contact_id
left join companies co on co.id = ct.company_id
where d.client_id = '<client_id>'
order by d.created_at desc
limit 50;
```

Use the rows as few-shot context, not as new rules. Look for repeated `reason` tags
against patterns — e.g., this client rejected `wrong-seniority` three times for
director-level agency titles → shade director-level agency contacts down; approved
several borderline startup founders → shade that pattern up. Constraints:

- **Learned adjustment is capped at ±10 per contact** and is always named in the
  rationale ("−6: client has rejected director-level at agencies 3x as wrong-seniority").
  The rulebook stays primary; the decisions nudge.
- One-off decisions are anecdotes, not signal. Two-plus repetitions of the same
  reason-pattern before it moves a score.
- **If the table is empty (it is today), say so explicitly** — "no decisions recorded
  yet; scoring rules-only" — and proceed. Never invent prior preferences.
- When a pattern repeats 5+ times, ALSO suggest promoting it into fit-scoring.md as a
  permanent weight — but only suggest; the human edits the rulebook.

## Step 2 — Pull the scope

Default scope: every sourced, non-archived contact for this client.

```sql
select ct.id, ct.full_name, ct.title, ct.seniority, ct.location, ct.segment,
       ct.fit_score, ct.company, co.industry, co.employee_count, co.domain
from contacts ct
left join companies co on co.id = ct.company_id
where ct.client_id = '<client_id>'
  and coalesce(ct.archived, false) = false
  and coalesce(ct.stage, 'sourced') = 'sourced'
order by ct.created_at desc;
```

The user (or a job's `params`) can narrow scope — "just the agencies batch", a list of
contact ids — or widen it ("re-score everything"). Re-scoring already-scored contacts is
fine and expected after new decisions land; the score is a living pre-sort, not a record.

When the companies row is sparse, check the cached search payload before shrugging —
`select raw from contact_sources where contact_id = '<id>' and source = 'apollo'` often
has industry, headcount, technologies, and funding stage. That cache is the ONLY extra
place to look. No Apollo calls, no web fetches — anything not already on the record is
deep-research territory and stays unknown at this stage.

## Step 3 — Score every contact in scope

Apply fit-scoring.md exactly: derive the segment, then walk the factor tables, kill
conditions, and flags. For each contact produce:

- `fit_score` — the summed points (kill conditions cap at the model's floor).
- `fit_rationale` — 2–3 sentences of WHY, citing the specific factors and points
  ("+12 agencies segment, +15 primary title 'Head of Delivery', +10 in-radius Costa
  Mesa, +5 HubSpot on record = 42"), plus any learned adjustment, caution flag, or kill
  by name. The dashboard shows this string to the human — write it for them.
- `segment` — the derived segment slug, only when derivable.

Never skip a contact silently; if it can't be scored (no title, no company data), give
it the model's no-data treatment and say so in the rationale.

## Step 4 — Write back to Supabase

Batch updates ~20 per psql call inside one transaction. **Escape every single quote in
rationale text by doubling it** (`'` → `''`) — rationales cite titles like
`'Head of Delivery'`, so this is not optional. Only fill `segment` when the contact
doesn't already have one (a human- or search-set segment outranks a derived one):

```sql
begin;
update contacts set fit_score = 42,
       fit_rationale = '+12 agencies segment; +15 primary title ''Head of Delivery''; +10 in-radius (Costa Mesa); +5 HubSpot on record. Surface score 42 of ~50 ceiling.',
       segment = coalesce(segment, '1-agencies')
 where id = '<uuid>';
-- ... next contact ...
commit;
```

Do NOT touch `stage`, `archived`, or anything in `decisions` — scoring changes the sort
order, never the pipeline state.

## Step 5 — Output: the ranked summary

Rank scored contacts descending; take the top N where N = the client's `daily_quota`
(default 5). For each, print:

```
1. <Full Name> — <Title>, <Company> — score <n>
   Why: <the fit_rationale>
   Why you might reject: <one honest devil's-advocate line>
```

The devil's-advocate line is mandatory and specific — the weakest factor, the caution
flag, the thing the score can't see ("50-person shop is at the very top of the agency
band — may already have an ops hire", "regulated-adjacent fintech; compliance ownership
unknown"). It primes the human's reject-with-reason click, which is next run's training
data.

Below the top-N, report the bands: how many scored ≥ threshold but missed the cut,
how many borderline, how many killed (with which kill), and list any networking-only
flags separately — they are relationship moves, not queue items. Close with:

> Scored N contacts for <client> (<rules-only | rules + M decisions as context>). Top
> <quota> are ready in the dashboard Approve queue. Decisions you record there feed the
> next scoring run.

## Running under job-runner

When dispatched from `agent_jobs` (skill = 'prospect-scorer'): resolve the client from
the job's `client_id` (run client-context for that slug — never trust the current
`.active-client`), honor any scope in `params` (e.g. `{"segment": "1-agencies"}` or
`{"contact_ids": [...]}`), and write a compact result back:
`{"summary": "Scored 38 contacts; top 5 surfaced (high 42, threshold 25)", "scored": 38, "surfaced": 5}`.

## Hard rules

- **Zero Apollo calls. Zero credits.** Scoring reads the DB and the cached
  `contact_sources.raw` only. If a signal isn't on the record, it stays unscored — that
  is the design, not a gap. Enrichment is a separate human-confirmed flow.
- **Never approve, reject, or archive.** The human sort phase is sacred; this skill ends
  at a ranked list. It writes `fit_score`/`fit_rationale`/`segment` and nothing else.
- **Per-client isolation.** Active client's fit-scoring.md, icp specs, and decisions
  only. Cross-client leakage poisons both clients' rankings.
- **Secrets discipline.** The connection string goes from `grep` straight into `psql`'s
  argv — never sourced, never echoed, never logged.
- **Honest rationales.** Every score must be reproducible from the rationale text. No
  vibes-based bonuses; learned adjustments are capped, counted, and cited.
