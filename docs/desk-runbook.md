# Desk Runbook — Hustle & Flow

**URL:** https://saren.ai/desk (renamed from `/studio` on 2026-06-17)
**Supabase project:** Hustle & Flow (`ltsuosasgblbqhsjckfg`, us-west-2)
**Login:** magic link (Supabase Auth)

> **What Desk is now:** a pipeline cockpit. `/desk` opens directly on the
> funnel + Do-Next queue + gamification, all derived from `v_pipeline`. The old
> v1 surfaces (a separate dashboard, the contacts list, the sequences page, the
> outreach-pages manager) were removed — they were the previous attempt at this
> same system. The only sub-page is the per-contact cockpit.

---

## Access

1. Go to `saren.ai/desk`
2. Sign in with a magic link (email auth)
3. **Access is admin-only.** Migration `003` locked every dashboard table behind
   `public.is_admin()`, which whitelists two UIDs: `saren.sakurai@gmail.com` (super
   admin) and `saren@saren.ai`. Any other signed-in user sees an empty pipeline.
   To grant/revoke access, edit the `is_admin()` function (see schema reference).

Auth is gated in `src/proxy.ts`; sessions persist in cookies via `@supabase/ssr`.

---

## Routes

| Route | What it is |
|---|---|
| `/desk` | **The pipeline.** Funnel strip + Do-Next queue + gamification. The landing page. |
| `/desk/contacts/[id]` | Per-contact cockpit — inline field edit, sequence/touch timeline, reply logging |
| `/desk/login` | Magic-link sign-in |

There is no longer a `/desk/contacts` list, `/desk/sequences`, or
`/desk/outreach-pages`. Every contact is reachable from the queue.

---

## Data model

```
clients → companies → contacts → sequences → touches
                                    │
                                    └── v_pipeline (view: stage, next_action, due, priority)
```

Records are written by the sourcing skills (in the `lead-prospecting` workspace,
run via Claude); outreach **state** is the `touches` event log. The Desk reads
`v_pipeline` and writes `touches`. Full field list: `hustle-flow-schema-reference.md`.

---

## The pipeline view — `/desk`

**Gamification bar.** Today's sends vs. the 10/day ceiling, and a streak (consecutive
days with ≥1 send). Both computed live from `touches.sent_at`.

**Funnel strip.** A clickable chip per stage (`sourced / enriched / sequenced /
in_outreach / replied`) with counts; click to filter the queue. A client switcher
(top right) scopes everything to one client or all.

**Do-Next queue.** Every contact, ordered by `v_pipeline.priority` (replies first,
then overdue outreach, then unsequenced, fit_score as tiebreaker). Each row shows the
contact, due/overdue, the **next action** for its stage, and:

- **Review** → opens the contact cockpit (`/desk/contacts/[id]`) to read the copy
- **Mark sent** (stages `sequenced` / `in_outreach`) → logs a real `touches` row
  (`sent_at = now()`, next `touch_num`) and advances the stage
- **Mark replied** (stage `in_outreach`) → flags the latest touch replied

`enrich` and `write_sequence` are **chat actions**, not buttons — they happen in the
sourcing skills (Apollo enrich / `/sales outreach`), not in the UI. The Desk logs
and reviews outreach; it never auto-sends.

---

## The contact cockpit — `/desk/contacts/[id]`

Reached via **Review** from the queue.

- **Left:** contact fields — click any value to edit inline, Enter to save, Esc to cancel
- **Center:** every sequence and its touches, in order
- **Right:** click a touch → its detail + thread. **Log reply** appends the reply to
  the thread jsonb, sets `reply_at`, sets sentiment, flips status to `replied`

---

## Day-to-day flow

1. **Source / enrich** — done in chat via the Apollo sourcing skill. New contacts land
   in Supabase at stage `sourced` (or `enriched` once a deliverable email is verified)
   and appear in the funnel automatically.
2. **Write a sequence** — `/sales outreach` in chat drafts it; `outreach-ingest` writes
   it back to the `sequences` table. The contact moves to `sequenced`.
3. **Review & send** — open the contact from the queue, copy the draft, send it from
   Gmail, then click **Mark sent**. The contact moves to `in_outreach`.
4. **Follow up** — the queue surfaces the next touch when it's due (cadence in
   `v_pipeline`). Mark each send.
5. **Reply** — **Mark replied** from the queue, or **Log reply** in the cockpit to
   capture the thread + sentiment.

---

## Status reference

**Pipeline stage:** `sourced → enriched → sequenced → in_outreach → replied`
**Touch:** `drafted → sent → opened → replied / bounced`
**Sequence:** `queued → active → paused → completed / dead`
**Email (Apollo):** `verified` / `valid` (deliverable) · `unverified` / `bounced`

---

## What the Desk does NOT do

- **Does not send email.** Sending happens in Gmail/Apollo/LinkedIn; the Desk logs the touch.
- **Does not enrich or write copy.** Those are the chat skills (Apollo, `/sales outreach`).
- **Does not track opens/clicks automatically.** Set `opened_at` / `clicked_at` manually or via future integration.
- **Does not manage outreach pages anymore.** The public `saren.ai/for/[slug]` pages still render from `outreach_pages`; manage them via Supabase or re-add a manager UI.

---

## Supabase direct access

Dashboard: https://supabase.com/dashboard/project/ltsuosasgblbqhsjckfg
Migrations of record: `supabase/migrations/001–003` in this repo.

Useful for: managing outreach pages, bulk status edits, reviewing raw `thread` jsonb,
editing the `is_admin()` allowlist, and ad-hoc queries.
