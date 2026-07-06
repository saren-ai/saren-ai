---
name: client-intake
description: >
  Onboards a prospecting client and builds their layered dossier — the client's company,
  the individual salesperson(s) we represent, and the product/offer. Use the moment the
  user says "add a new client called X", "onboard X", "set up client X", "new client X" —
  or wants to feed an existing client's dossier ("here's X's LinkedIn PDF", "ingest X's
  résumé", "scrape X's website", "add a case study to X", "update X's competitors"). A
  client is an INDIVIDUAL at a company (e.g., "Dan Collins at Stryke Security"), so the
  dossier is layered: clients/<client>/dossier/ holds company.md, product.md,
  people/<person>.md, and sources/ (raw dated captures), plus voice.md and the thin
  profile.md index that icp-builder and the zubair /sales suite still read. Ingests
  LinkedIn profile PDFs, résumés (PDF/docx/text), website scrapes via WebFetch, and
  pasted info-dumps; interviews to fill matchmaking fuel the sources can't (communities,
  networks, alumni groups, speaking history). Accepts partial info and is re-runnable to
  fill gaps over time. Distinct from client-context (which only SWITCHES between existing
  clients) and from contact-enrich (deep OSINT on TARGETS — this skill is the CLIENT
  side only).
---

# Client Intake — Layered Client Dossier (Agent 0a)

Onboard a client by building the layered dossier every downstream skill reuses. A
**client is an individual at a company** — "Dan Collins at Stryke Security," not just
"Stryke Security." The writing agent (Agent 3) consumes ALL dossier layers plus the
target-contact dossier to craft 1:1 emails that surface direct connections between the
salesperson and the target (shared communities, alma maters, past companies, mutual
context). That matchmaking element is why the people files exist — capture fuel for it
aggressively.

This skill does NOT define the ICP spec (icp-builder), search for anyone
(apollo-people-search), or research targets (contact-enrich). **Deep OSINT on TARGETS is
explicitly not this skill** — this is the CLIENT side only.

## The structure (create and maintain)

```
clients/<client>/
  dossier/
    company.md              # the client's company: what it does, market, positioning,
                            #   proof points, competitors
    product.md              # the offer/pitch: what's being sold, pricing posture,
                            #   differentiators, case studies
    people/<person-slug>.md # one per salesperson we represent: role, background, voice
                            #   notes, network, communities, alma maters, past companies
                            #   — fuel for matchmaking
    sources/                # raw inputs: linkedin-profile.md (converted from PDF),
                            #   resume.md, website scrapes, pasted dumps — dated,
                            #   NEVER edited after capture
  profile.md                # thin synthesized index/summary linking the dossier files
                            #   (kept for backward compat — icp-builder and the vendor
                            #   suite read it)
  voice.md                  # per-client email voice spec (tone rules, banned phrases,
                            #   kill conditions, send limits)
```

## Step 0 — Resolve the client

Slugify the name (`Sample Company` → `sample-company`). Check `clients/`:
- **New:** confirm creation, then create `clients/<slug>/`, `clients/<slug>/dossier/`,
  `dossier/people/`, `dossier/sources/`, and `clients/<slug>/targets/`.
- **Exists:** this is an enrichment run — load `profile.md` and the dossier files, then
  only fill gaps or update what the user named. Never clobber captured facts without the
  user saying so.
- **Legacy layout** (monolithic `profile.md`, no `dossier/`): migrate first — split the
  profile into the dossier files below, extract `voice.md`, then rewrite `profile.md` as
  the thin index. Preserve every captured fact verbatim; migration adds structure, not
  content.

Then set this client active by writing the slug to `.active-client` (same convention as
client-context).

## Step 1 — Ingest sources

Let the user lead. Take any combination, in any order, across any number of runs:

**(a) LinkedIn profile PDF.** Ask the user to drop the PDF into
`clients/<client>/dossier/sources/`. Convert it to clean markdown as
`sources/YYYY-MM-DD-linkedin-<person-slug>.md` (use the pdf skill / a text extractor —
strip layout junk, keep sections: headline, about, experience, education, volunteering,
licenses, skills, recommendations). Education, volunteering, and groups are matchmaking
gold — never drop them.

**(b) Résumé** (PDF / docx / text). Same flow: raw file into `sources/`, converted to
`sources/YYYY-MM-DD-resume-<person-slug>.md`. Mine past companies, dates, titles, and
anything community-shaped (boards, associations, certifications, speaking).

**(c) Website.** WebFetch the key pages — home, about, services/product, case studies,
pricing if public. Save each capture as
`sources/YYYY-MM-DD-website-<page>.md` (raw fetched content, lightly cleaned), then
synthesize into `company.md` and `product.md`. If the site blocks fetches, note that in
`company.md` and fall back to interview.

**(d) Pasted info-dump.** Save the dump verbatim as
`sources/YYYY-MM-DD-dump-<topic>.md`, then parse it into the dossier files.

**Sources rules:** every file is dated in its filename and gets a one-line provenance
header (where it came from, capture date). Sources are append-only — never edit a source
after capture; a re-scrape is a NEW dated file. Synthesis happens in the dossier files,
not in `sources/`.

## Step 2 — Interview the gaps

After ingesting whatever exists, ask only for what the sources couldn't fill. Batch
related questions, keep it short, accept "skip" / "later" — a dossier with `_pending_`
fields is valid and expected.

Prioritize **matchmaking fuel**, because no document reliably contains it:
- Communities and networks (Slack/Discord groups, masterminds, associations, meetups)
- Alumni groups (universities AND companies — ex-Cylance, ex-Google networks count)
- Speaking history (conferences, podcasts, webinars) and publishing (newsletter, book)
- Cities/regions with real ties; military service; sports/hobby communities they'd
  genuinely bond over
- Mutual-connection seams: investors, board members, notable former colleagues

Then business gaps in priority order: what they sell → differentiator → proof points →
pricing posture → competitors → rough ICP → exclusions → voice/tone preferences.

Minimum viable dossier = client name + what they sell + one person file with name and
role. Never fabricate a field. `_pending_` is honest; a guessed competitor is not. Mark
every gap as `_pending_` **with a note about which source would fill it** — e.g.,
`_pending_ — LinkedIn PDF not yet provided`, `_pending_ — résumé not yet provided`,
`_pending_ — website scrape not yet run`, `_pending_ — interview question for client`.

## Step 3 — Write the dossier files

### `dossier/company.md`
```markdown
# Company Dossier: <Company Name>
Last updated: <date> · Sources: <list of sources/ files + interview dates>

## What it does
## Market & positioning
## Proof points            <!-- named clients, metrics, press, funding -->
## Competitors             <!-- with the wedge against each, when known -->
## Open gaps               <!-- _pending_ items + which source fills them -->
```

### `dossier/product.md`
```markdown
# Product / Offer Dossier: <Company Name>
Last updated: <date> · Sources: <...>

## What's being sold       <!-- the actual offer(s), named -->
## Pricing posture         <!-- fixed-fee / subscription / ACV band / "no public pricing" -->
## Differentiators
## Case studies & evidence <!-- reusable in outreach; note any usage constraints -->
## Open gaps
```

### `dossier/people/<person-slug>.md`
```markdown
# Person Dossier: <Full Name>
Role: <title at client company> · Sends as: <name / email> · Last updated: <date>
Sources: <...>

## Role & responsibilities
## Background              <!-- career history, past companies with dates -->
## Voice notes             <!-- how THIS person sounds; defer rules to ../../voice.md -->
## Matchmaking fuel
- **Past companies & alumni networks:**
- **Education / alma maters:**
- **Communities & associations:**
- **Speaking / publishing:**
- **Geography & personal ties:**
- **Notable connections:**
## Open gaps
```

### `voice.md`
The per-client email voice spec, extracted from tone rules wherever they were captured.
Keep rules **verbatim** — banned phrases, kill conditions, send limits, sequence
structure, factual constraints, segment register shifts. This is what the writer and
reviewer enforce; do not paraphrase a hard rule into a soft one.

## Step 4 — Refresh `profile.md` (the thin index)

`profile.md` survives for backward compat — icp-builder seeds from it and the vendor
/sales suite reads it. After every run, rewrite it as a thin synthesis:

```markdown
# Client Profile: <Name>
Layered dossier · Last updated: <date> · Active person: <person-slug>

## Index
| Layer | File | State |
|---|---|---|
| Company | dossier/company.md | <fresh/stale + gap count> |
| Product/offer | dossier/product.md | ... |
| Person: <name> | dossier/people/<slug>.md | ... |
| Voice | voice.md | ... |
| Raw sources | dossier/sources/ | <n files> |

## Summary
<3–6 sentences: who the client is (individual at company), what's sold, to whom.>

## Who they sell to (rough ICP)        <!-- keep inline — icp-builder seeds from this -->
## Known exclusions                    <!-- keep inline — same reason -->
## Outreach identity                   <!-- send-as line; full rules live in voice.md -->
```

Keep the rough ICP and exclusions **inline in profile.md**, not just linked — downstream
consumers read this file without walking the dossier.

## Step 5 — Report and hand off

Report per layer: captured vs `_pending_` (with the filling source named), and which
sources/ files were added this run. Then suggest the next step:
- Rough ICP filled → "Run **icp-builder** to turn this into the Apollo targeting spec."
- Person file thin on matchmaking fuel → ask for the LinkedIn PDF / résumé specifically.
- Offering captured but targeting thin → "Add who they sell to, then run icp-builder."

## Re-runnability

Every run: update dossier files in place, append NEW dated files to `sources/`, refresh
`profile.md`'s index/state/date. Enrichment runs touch only the layers the new input
feeds. A client can be onboarded across five sessions with one source each — the dossier
must converge, never reset.

## Boundaries

- Confirm before creating a new client folder.
- **TARGET research is out of scope.** Articles, talks, and socials of prospects belong
  to contact-enrich (post-approval, white-glove economics) — never burn that effort here.
- Don't define the structured ICP spec here — capture the raw "who they sell to" and let
  icp-builder formalize it.
- Never edit a file in `sources/` after capture. New information = new dated file.
- Enrichment runs never clobber existing captured facts without the user saying so.
- Keep all `icp*.json` files untouched — they belong to icp-builder.
- Per-client voice isolation: never copy one client's voice.md rules into another's.
