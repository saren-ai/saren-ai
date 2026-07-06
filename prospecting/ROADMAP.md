# ROADMAP.md — Idea Backlog

Durable parking lot for ideas beyond the current sprint. Add freely, review when time
allows (the weekday sprint-driver can prompt a review when the sprint board is clear).
When an idea gets scheduled, move it into SPRINT.md "Next up" and note the date here.

## Platform / UX
- **In-platform dossier editing** — dossiers (company/product/people/voice/icp-research)
  editable as plain text inside the dashboard, not just via files. Implies the
  dossier→Supabase `documents` sync becomes two-way (files ⇄ DB) or DB becomes the
  editing surface with file export. Pairs with "login, get shit done, get out."
  (Added 2026-06-10)
- **Client-facing logins / RBAC** — clients review their own sort + draft queues;
  per-client row-level security beyond the current `is_admin()` gate. Post-sprint.
- **Live chat** option for the assistant agent; **Calendly** (or Google Calendar
  appointment pages) as the booking path in sequences.
- **Mobile-friendly triage** — sort phase and draft review from a phone.

## Agents / Intelligence
- **Per-client industry-watch agent** — programmed at client signing: monitors their
  ICP in the news, industry trends, feeds findings into contact/company/industry
  dossiers on a schedule. Dossier folder may grow an `industry.md` layer.
- **Preference learning v2** — beyond few-shot on `decisions`: periodic distillation
  of approve/reject patterns into a per-client scoring rubric the scorer cites.
- **Voice learning v2** — distill `draft_edits` diffs into voice.md amendments the
  client approves ("you always delete adjectives — codify?").

## Sources / Integrations
- **Apify scrapers** (LinkedIn activity, company news) as list + enrichment sources.
- **Vibe Prospecting / ZoomInfo** as alternate data providers behind the same
  contact_sources provenance model.
- **LinkedIn connections export** ingestion → fills "Notable connections" in person
  dossiers; powers warm-intro detection (matchmaking v2).
- **HubSpot sync** — push booked meetings / won deals back to a client's CRM.

## Ops
- **Dossier→Supabase sync** (`documents` table) — read surface for dashboard/portal;
  prerequisite for in-platform editing. (Sprint candidate, Wed/Thu 06-10/11)
- **Deployed dashboard** (Vercel) + auth so the platform is reachable off this Mac.
- **Per-client send-mailbox routing** — send-as per salesperson (e.g., Dan Collins
  sends from his own Gmail; OAuth per client).
- **SLA instrumentation** — measure the 90-second reply SLA once SMS alerts exist.

## Scheduled / decided
- (move items here with a date when they enter a sprint)
