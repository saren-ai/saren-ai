---
name: outreach-ingest
description: >
  Pulls the vendor /sales suite's outreach output back into Supabase so the database stays the
  system of record. Use right AFTER running the suite's `/sales outreach` (or sales-outreach
  skill) for a target — "ingest the sequence", "save that outreach to the DB", "sync the
  sequence", or automatically as the closing step of an outreach run. Reads the generated
  OUTREACH-SEQUENCE.md (and the suite's email/LinkedIn copy) for the active client's target,
  writes a row into the `sequences` table, advances the contact's pipeline stage to
  'sequenced', stashes the full markdown in `tool_outputs` as a versioned on-demand export, and
  surfaces the contact in the dashboard's Do-Next queue as review_and_send. Does NOT write the
  emails (that's the suite) and does NOT send anything (drafts only, per the client's rules).
---

# Outreach Ingest (vendor suite → Supabase)

The vendor `/sales` suite writes files. This project's source of truth is Supabase. This
skill is the one-way bridge that carries the suite's output back into the DB so the funnel,
the dashboard, and `v_pipeline` reflect reality. One job: ingest, don't author.

## Step 0 — Resolve client + target

Read `.active-client`. Take the target the user just ran outreach for (company slug, or ask).
Locate the suite's output for that target — typically
`clients/<client>/targets/<company-slug>/OUTREACH-SEQUENCE.md` plus any email/LinkedIn copy
the suite emitted. If no output exists, stop and tell the user to run `/sales outreach` first.

## Step 1 — Resolve the contact in the DB

The contact should already exist (apollo-people-search wrote it). Find it:
```sql
select id, stage from contacts
where client_id = (select id from clients where slug = :client)
  and (apollo_id = :apollo_id or lower(email) = lower(:email));
```
If not found, the contact was never seeded — write it first via the apollo flow, don't
fabricate a row here.

## Step 2 — Parse the suite output

From OUTREACH-SEQUENCE.md and companion copy, extract: subject A/B, email body (touch 1),
LinkedIn connect message, LinkedIn day-10 message, the framework/play used, the readiness
score, and the personalization seed / recommended angle if richer than what's on the contact.
Keep the FULL markdown intact for the export stash (Step 4) — don't lossily flatten it.

## Step 3 — Upsert the sequence + advance stage

```sql
insert into sequences (contact_id, play, status, subject_a, subject_b, email_body,
                       linkedin_connect_msg, linkedin_day10_msg, started_at, updated_at)
values (:contact_id, :framework, 'queued', :subject_a, :subject_b, :email_body,
        :li_connect, :li_day10, now(), now())
returning id;

update contacts set stage = 'sequenced', updated_at = now()
where id = :contact_id and stage in ('sourced','enriched');  -- never regress a live outreach
```
If the suite produced richer personalization, also update
`contacts.personalization_seed / recommended_angle / fit_score`.

## Step 4 — Stash the full export (versioned, on-demand)

Keep the complete markdown so it can be re-exported to a file later without regenerating:
```sql
insert into tool_outputs (tool_id, contact_id, sequence_id, output, export_format, version, created_at)
values ('outreach-ingest', :contact_id, :sequence_id,
        jsonb_build_object('outreach_md', :full_markdown), 'md',
        coalesce((select max(version)+1 from tool_outputs
                  where contact_id = :contact_id and tool_id = 'outreach-ingest'), 1),
        now());
```

## Step 5 — Confirm

State: "Ingested the sequence for <name> at <company> → stage is now `sequenced`. It's in the
dashboard's Do-Next queue as `review_and_send`. The full draft is stored; say 'export the
sequence' to write it back to a .md file." Do NOT send — outreach is drafts-only and review is
the human's job, per the client's outreach rules.

## Boundaries

- Ingest only. Never author or rewrite the copy — that's the vendor suite's `/sales outreach`.
- Never send, never enroll in an Apollo sequence, never auto-advance past `sequenced`.
  Sending is logged as a `touch` by the dashboard when the human marks it sent.
- Never regress stage (don't knock a replied/in_outreach contact back to sequenced).
- Supabase is the store; the .md file is an input you're consuming and, later, an on-demand
  export — not the source of truth.
