---
name: icp-builder
description: >
  Produces the Agent 0b ICP dossier for the ACTIVE client: the machine-readable,
  Apollo-ready spec at clients/<client>/icp.json PLUS deep persona/market research at
  clients/<client>/icp-research.md (market map, tools of the trade, ranked pain points,
  trends, persona archetypes, watering holes, message angles). Use whenever the user
  wants to define or refine WHO to target for prospecting, is about to run an Apollo
  people search, or says "build the ICP", "who should we go after", "tighten the
  targeting", "research the persona", "what's the buyer's world like". Outputs a
  provider-neutral JSON spec (titles, seniorities, headcount, geo, keywords, exclusions,
  optional personas) that drives apollo-people-search, and a research doc the
  sequence-writer reads for message angles. Research runs via WebSearch/WebFetch fan-out,
  or by ingesting external deep-research exports dropped in
  clients/<client>/dossier/sources/. If a narrative IDEAL-CUSTOMER-PROFILE.md from the
  suite's sales-icp skill exists in the client folder, convert it rather than starting
  over. This is the STRUCTURED spec for machine consumption — for a prose ICP document
  for humans, use the suite's sales-icp instead. Does NOT search for contacts.
---

# ICP Builder (Agent 0b)

Turn an offering into the ICP dossier for the active client, then stop. Two outputs:

1. `clients/<client>/icp.json` — the machine-readable spec apollo-people-search consumes.
2. `clients/<client>/icp-research.md` — deep persona/market research the human and the
   sequence-writer consume.

Finding contacts is apollo-people-search's job. This skill exists because the zubair
suite's `sales-icp` writes a narrative document a human reads — but Apollo needs
structured fields, and a good sequence needs to understand the buyer's *world*, not
just their firmographics. This bridges all three.

## First: resolve the active client

Read `.active-client` at the project root for the current client name (set by the
client-context skill). All output goes to `clients/<client>/`. If no active client is
set, ask which client this ICP is for before proceeding.

## Phase 1 — Compose the spec

Read whatever client context already exists before asking the user anything:
- `clients/<client>/profile.md` (from client-intake) — the primary seed. Its
  "What they sell / core problem" fills `offering`; its "Who they sell to" and
  "Known exclusions" seed `buyer`, `company`, and `exclusions`.
- `clients/<client>/IDEAL-CUSTOMER-PROFILE.md` (from the suite's sales-icp), if present
  — a richer narrative target; fold it in.
- `clients/<client>/icp-research.md`, if a previous run produced it — the `personas`
  array should cross-reference its archetypes, not contradict them.

Then build from the user's description for anything still missing. Ask only for slots
you cannot infer; treat exclusions as seriously as inclusions — a sloppy exclusion list
poisons every downstream search.

## Output: the canonical ICP spec (the contract)

Write EXACTLY this to `clients/<client>/icp.json`. Provider-neutral on purpose:
integers for headcount, plain strings for geos/titles. apollo-people-search does the
provider-specific casting.

```json
{
  "icp_spec_version": "1.1",
  "client": "",
  "offering": { "summary": "", "core_problem": "" },
  "buyer": {
    "primary_titles": [],
    "primary_seniorities": [],
    "secondary_titles": [],
    "secondary_seniorities": []
  },
  "company": {
    "employee_min": null,
    "employee_max": null,
    "geographies": [],
    "industries": [],
    "keywords": [],
    "technologies": []
  },
  "exclusions": { "titles": [], "industries": [], "geographies": [] },
  "signals": { "intent": [], "growth": [] },
  "personas": [
    {
      "name": "",
      "titles": [],
      "why_they_buy": "",
      "primary_pain": ""
    }
  ],
  "rationale": { "why_titles": "", "why_size": "", "why_exclusions": "" }
}
```

### Field conventions
- **seniorities** — neutral tokens: owner, founder, c_suite, partner, vp, head,
  director, manager, senior, entry. The adapter maps to the provider's enum.
- **employee_min/max** — integers; null for an open end.
- **titles/geographies/industries/keywords** — plain human strings.
- **personas** — OPTIONAL. Populate from the archetypes in `icp-research.md` once Phase 2
  has run; omit the array entirely if research hasn't happened yet. Each `name` must
  match an archetype heading in icp-research.md so downstream skills can join the two.
  Everything else in the schema is unchanged from 1.0 — existing icp.json files without
  `personas` remain valid; never force a rewrite just to add an empty array.

## Phase 2 — Deep persona/market research

The spec says WHO matches a filter. The research says what that person's *world* looks
like — what they use, what hurts, what's rising and dying around them, where they hang
out, and what language lands or backfires. A client selling to "C-level + Hiring
Managers (NOT HR)" needs to understand that archetype's day, not just their job title.
Write the result to `clients/<client>/icp-research.md`.

Run Phase 2 on the first ICP build for a client, or whenever the user asks to refresh
the research. If the user only wants a quick spec tweak ("add VP of Data to the
titles"), skip Phase 2 — don't burn searches re-deriving a doc that already exists.

### Research method

Two input paths; use both when both are available.

**A. Imported deep research.** Check `clients/<client>/dossier/sources/` for external
deep-research exports (Perplexity, Gemini, ChatGPT deep research — typically .md, .txt,
or .pdf dumps the user dropped in). If present, ingest and synthesize them into the
sections below. Keep the original files untouched; cite them as sources ("dossier/sources/<file>, imported <date>"). Imported research can fully replace fresh
searching, or supplement it — ask the user only if the imports look stale (12+ months)
or leave required sections empty.

**B. WebSearch/WebFetch fan-out.** Run focused searches per section — market structure
and budget ownership, the personas' daily toolstack, pain-point evidence (surveys,
practitioner threads, analyst reports), 12-month trend pieces, community/podcast/
conference listings. Fetch the strongest hits for detail. Prefer sources from the last
12 months; mark anything older. Every factual claim in the doc gets a citation in the
Sources section — no uncited "everybody knows" assertions.

This phase researches the MARKET and the PERSONA. It never searches for specific
contacts or builds lists — that boundary stays with apollo-people-search.

### icp-research.md — required sections

```markdown
# ICP Research — <client>
Updated: <date> · Spec: icp.json

## Market map
The space the target personas operate in: segments, who reports to whom,
where budget sits, who signs vs. who champions.

## Tools of the trade
What these personas use daily (platforms, stacks, rituals). Informs
credibility ("we know your world") and pain hooks.

## Pain points (ranked)
Numbered, most acute first. Each with evidence: a cited source, a quote,
or a stat — not vibes.

## Trends — up
What's growing in their market over the last 12 months.

## Trends — down
What's shrinking, dying, or losing budget over the last 12 months.

## Persona archetypes
2–4 named archetypes (e.g., "The Scaling COO"). Each with: typical titles,
goals, fears, success metrics, objection patterns. These names feed
icp.json `personas[].name`.

## Watering holes
Communities, podcasts, conferences, newsletters, Slack/Discord groups where
these people gather. Feeds matchmaking and the deep-OSINT stage later.

## Message angles
Angles that should resonate (tied to ranked pains) AND angles to avoid
(framings that misfire — e.g., anything that reads as an HR pitch to a
WethosAI target).

## Sources
URLs with access dates, plus any dossier/sources/ imports with import dates.
```

### Living document

`icp-research.md` is append-friendly, not write-once. The roadmap's per-client
industry-watch agent will append fresh signals to it; the sequence-writer reads it
(especially Message angles and Pain points) when drafting touches. When updating,
revise sections in place and bump the `Updated:` line — don't fork a second research
file.

## Default ICP (WethosAI)

If the active client is WethosAI and the user doesn't override, seed and confirm:
primary buyers = execution-constrained CEOs, COOs, Presidents (c_suite, owner);
secondary sponsors = Chief Transformation / Innovation / AI Officers (c_suite); hard
exclusions = HR / People / Talent / Recruiting (the HVI angle reads as an HR pitch to
those titles and burns the lead). Confirm headcount, geo, industry per engagement.
These are defaults, not law.

## Handoff

After writing the spec (and research, when Phase 2 ran), do not search. State: "ICP
dossier for <client> ready — spec at clients/<client>/icp.json, research at
clients/<client>/icp-research.md. Run apollo-people-search to pull and seed targets."
