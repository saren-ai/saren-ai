---
name: job-runner
description: >
  Drains the Studio cockpit's job queue. Use when the user says "run the queue", "process
  jobs", "check the agent jobs", "drain agent_jobs", "what did Studio ask for" — or on a
  schedule. Reads requested rows from the `agent_jobs` table (the trigger layer added in
  saren.ai migration 004), claims each atomically, dispatches it to the matching prospecting
  skill (apollo-people-search, the vendor /sales outreach, account research), then writes the
  result back and flips the job status so the Studio cockpit reflects reality. This is the
  bridge that lets a click in https://saren.ai/studio fire a skill here. Supabase stays the
  system of record — a job is an INTENT, not the work. CRITICAL credit guard: only ever runs
  Apollo enrichment when the job's `kind = 'enrich'` (the human already confirmed the spend in
  the UI). Does NOT define ICPs, invent targets, or send anything — it only routes queued work.
---

# Job Runner (Studio cockpit → engine bridge)

The Studio cockpit can't run skills; it can only *ask*. It inserts a row into `agent_jobs`
(`status='requested'`). This skill is the loop that picks those up, runs the right skill, and
writes the answer back. All DB access is via `mcp__supabase__execute_sql` — same door every
other skill in this project uses. Supabase project: `ltsuosasgblbqhsjckfg`.

One job at a time. Drain until the queue is empty. Never hand-edit the work product — route it.

## The loop

Repeat until `claim_next_job()` returns no row:

### 1. Claim the next job (atomic)
```sql
select * from claim_next_job();
```
Returns one row with `status='claimed'`, or nothing (queue empty → stop and report). The
function uses `FOR UPDATE SKIP LOCKED`, so it is safe even if two runners race.

From the row you get: `id`, `client_id`, `contact_id`, `company_id`, `skill`, `kind`, `params`.

### 2. Mark it running and load context
```sql
update agent_jobs set status='running', started_at=now() where id = :id;
```
Resolve the client slug and contact, then switch context so downstream skills read the right
folder:
```sql
select c.slug, ct.full_name, ct.email, ct.email_status, ct.title,
       ct.company, ct.linkedin_url, ct.apollo_id
from agent_jobs j
join clients c on c.id = j.client_id
left join contacts ct on ct.id = j.contact_id
where j.id = :id;
```
Then run **client-context** for that slug (so `clients/<slug>/` and its ICP are active).

### 3. Dispatch by `skill` + `kind`

| job `skill`          | job `kind` | What to run | Cost |
|----------------------|-----------|-------------|------|
| `account-research`   | research  | Vendor `/sales research <company-url-or-name>` for this contact's company. Web/firmographics only. | free |
| `sales-outreach`     | draft     | Vendor `/sales outreach <contact>` to write the sequence, then run **outreach-ingest** to push the result into `sequences`/`touches`. | free |
| `apollo-people-search` | enrich  | Run **apollo-people-search** in single-contact enrich mode for this `contact_id` / `apollo_id`. **Spends 1 Apollo credit.** | 1 credit |
| `enrich-contact` (also accept `contact-enrich`) | action | Run **contact-enrich** for this `contact_id` — post-approval deep OSINT → dossier into `tool_outputs`, seed/angle onto the contact. The dashboard's Approve button creates exactly this job. Web research only on `kind='action'`; Apollo email reveal inside it still requires `kind='enrich'`. | free |
| `gmail-draft`        | action    | Push a pre-written email body to Gmail Drafts via the Gmail MCP. Params: `{ to, subject, body_md, touch_id }`. Call `create_draft` with `to=[params.to]`, `subject=params.subject`, `body=params.body_md`. Result: `{ summary: "Draft created for <to>: <subject>" }`. No external services beyond Gmail MCP. | free |

**GMAIL-DRAFT:** `params.to` is the contact's email address. If `params.to` is null or empty, fail the job with `error='no recipient email — enrich the contact first'`. Do not guess an email address.

**CREDIT GUARD — non-negotiable:** run Apollo enrichment *only* when `kind = 'enrich'`. The
human confirmed the spend when they clicked the gated button in Studio, which is the only path
that creates an `enrich` job. If `kind` is anything else, never call the enrichment endpoint —
free search/preview only. If a job asks you to enrich but `kind != 'enrich'`, fail it with that
reason (step 5) rather than spending a credit.

Unknown `skill`? Don't guess. Fail the job with `error = 'unknown skill: <skill>'`.

### 4. On success — write the result back
Keep the result small and human-readable; the cockpit shows `result.summary`.
```sql
update agent_jobs
   set status='done',
       finished_at=now(),
       result = :result_jsonb   -- e.g. {"summary":"Verified email j@acme.com; stage → enriched","stage":"enriched"}
 where id = :id;
```
The underlying records (contacts/companies/sequences/touches) are written by the dispatched
skill itself, exactly as if you'd run it by hand. This step only closes out the *job*.

### 5. On failure — record why, don't crash the loop
```sql
update agent_jobs
   set status='failed', finished_at=now(), error = :error_text
 where id = :id;
```
Then continue to the next job. A poisoned job must not stall the queue.

### 6. After the queue is empty
Report a one-line tally: `Ran N jobs: X done, Y failed (queue empty).` List any failures with
their reason so the user can re-queue or fix.

## Guardrails
- **Idempotency:** the cockpit already de-dupes (won't queue a second identical pending job),
  but if you see two equivalent `requested` jobs, run the oldest and cancel the rest
  (`status='canceled'`, `error='superseded by <id>'`).
- **No sending.** Drafting writes drafts. Sending stays a human action in the client's rules.
- **Wrong client is the costly failure.** Always switch client-context from the job's
  `client_id` before dispatching — never assume the active client is correct.
- **Stuck jobs:** a row in `running` for more than ~15 min likely died mid-flight. It's safe to
  reset to `requested` (`update agent_jobs set status='requested' where id=:id`) and re-claim.

## Scheduling
This skill is built to run unattended. A Cowork scheduled task that says
*"run the job-runner skill"* every few minutes turns the Studio buttons into near-real-time
triggers. Until that's set up, run it manually whenever you've queued work from the cockpit.
