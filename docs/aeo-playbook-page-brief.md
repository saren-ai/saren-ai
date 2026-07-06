# Brief: "My AEO Playbook" page for saren.ai

## Objective

Build a single new page on saren.ai that summarizes my Answer Engine Optimization playbook. The page is a pitch teaser, not the full playbook: it reveals the executive-summary layer with enough substance to establish authority, and withholds the operational detail (full audit checklist, boilerplate form, engagement pricing) as intro-call material. Every section should pull toward one conversion action: booking an intro call.

Critical constraint: this page must itself be a working demonstration of AEO practice. Answer-first structure, question-formatted headers, schema markup, self-contained extractable sentences. A prospect (or an LLM) reading this page should see the methodology applied to itself.

## Open questions — resolve before building

1. What is the saren.ai stack? (Static site, Webflow, Next.js, plain HTML?) Match existing conventions; inspect the repo/site structure first.
2. Booking link: use `{{BOOKING_URL}}` as a placeholder everywhere a CTA appears. I will supply the real calendar link.
3. Confirm existing nav structure and where "AEO Playbook" should live (top nav vs. footer vs. /playbook route). Default to `/aeo-playbook`.

## Page metadata

- Title tag: `My AEO Playbook — How B2B Brands Win the AI Shortlist | Saren`
- Meta description: A question-answering sentence, ~150 chars: "What is answer engine optimization and why does it decide B2B deals before the first sales call? A practical AEO playbook for B2B SaaS."
- Schema: `Article` + `FAQPage` (FAQ items listed below) + `Person`/`ProfessionalService` for me as the entity.
- H1: one only. Sequential H2 > H3 hierarchy throughout — no skipped levels.

## Voice

Direct, opinionated, economical. No corporate filler, no "unlock/leverage/delve" vocabulary, no exclamation points. Short declarative sentences that can be lifted verbatim by an answer engine. Write like a practitioner sharing findings, not an agency selling services.

## Page structure

### 1. Hero

- H1: `The deal is decided before the first call`
- Kicker above H1: `MY AEO PLAYBOOK`
- Subhead (one sentence, extractable): "B2B selection now happens in an anonymous research phase that runs through LLMs — answer engine optimization determines whether you exist in that phase."
- Three stat cards, sourced inline to "6sense 2025 Buyer Experience Report (n≈4,000)":
  - 95% — the winning vendor is already on the Day One shortlist before any outreach begins
  - 80% — of deals go to the pre-contact favorite; first contact validates an existing preference
  - 94% — of buyers use LLMs during research; the shortlist now forms inside AI answers
- Primary CTA button: `Book an intro call` → {{BOOKING_URL}}

### 2. What is answer engine optimization? (H2, question format)

Open with a self-contained two-sentence definition an engine can extract:
"Answer engine optimization (AEO) is the practice of structuring your content and reputation so AI systems — ChatGPT, Perplexity, Google AI Overviews — extract, trust, and cite your brand as the answer to buyer questions. It moves the success metric from ranked-and-clicked to extracted-and-cited."

Then two short paragraphs on the mechanics: LLMs answer from either frozen training data or live retrieval (RAG); only retrieval is optimizable on a business timeline; retrieval behaves like search, so it rewards solid SEO, clean structure, and corroborated reputation. Close with: AEO is not a new discipline — it is SEO with a new definition of winning.

### 3. The dual-surface model (H2)

Brief section, two columns or two cards:
- **On-site — the canonical record.** Extraction-ready structure, schema, entity clarity, first-party data. Proof point: 2.8x citation lift for pages with sequential heading hierarchy (AirOps research).
- **Off-site — the citation graph.** Third-party corroboration engines already trust. Proof points: ~4x citation odds with strong Reddit/Quora mention volume; ~3x source-selection odds with active G2/Capterra/Trustpilot profiles (SE Ranking data).

One closing line: "Your site is the record. The citation graph is what makes engines trust the record. Budget effort 50/50."

### 4. How the playbook works (H2)

Tease the four-phase engagement without operational detail. Four short blocks:
1. **Audit (days 0–30).** AI visibility baseline, entity consistency scan, the ranked-but-never-cited gap map. One line only — do NOT publish the full 8-point checklist.
2. **Restructure (days 30–60).** Answer-first rewrites, schema, comparison-page coverage.
3. **Seed (days 60–90).** Reviews, editorial PR, community presence, first-party benchmark data.
4. **Measure (ongoing).** Citation frequency, AI-agent referrals, share of answer vs. competitors.

After the blocks: "The full audit checklist and canonical boilerplate framework are what we walk through on an intro call." Secondary CTA here.

### 5. Who this is for (H2)

Three sentences max: B2B SaaS and services companies, roughly 200–5,000 employee target market, teams that already invest in content/SEO and are watching organic decline without understanding where the demand went. Include the explicit exclusion (sharpens entity matching): not for e-commerce, not for local businesses.

### 6. FAQ (H2) — feeds FAQPage schema

Five Q&As, each answer 2–3 self-contained sentences:
- Is AEO different from SEO? (Complementary; AEO is the citation layer on top of technical SEO. Weak SEO means no AEO.)
- How long until results? (Faster than traditional SEO for restructured existing pages — engines re-crawl and swap sources continuously; off-site authority compounds over quarters.)
- How do you measure AEO? (Citation frequency, AI referral traffic, share of answer. Rankings alone no longer describe buyer reality.)
- Does this replace demand gen? (No — it determines whether demand gen has a shortlist to land on. 95% of wins are already on the Day One shortlist.)
- What does an engagement look like? (Four phases over 90 days, then ongoing measurement. Details on the intro call.)

### 7. Closing CTA section

- One-line restatement of stakes: "A vendor not driving digital preference in the anonymous 60% of the journey is competing for a residual sliver of probability."
- CTA: `Book an intro call` → {{BOOKING_URL}}
- Optional secondary link: email placeholder `{{EMAIL}}`.

## What NOT to include

- The full 8-point audit checklist (call material)
- The 6-field canonical boilerplate form (call material)
- Pricing, retainer structure, or hour commitments
- Client names or WethosAI-specific references
- Stock imagery, decorative icons without function, emoji

## Design notes

- Match the existing saren.ai design system; do not invent a new one. If the site has no system, default: generous whitespace, single accent color, strong typographic hierarchy, dark-on-light.
- Stat cards in the hero are the only "designed" element that matters. Everything else is typography.
- Mobile-first; the page is likely to be read from a LinkedIn tap.
- Page weight target: fast. No heavy JS. This page's load speed is part of its own argument.

## Acceptance criteria

- [ ] Lighthouse performance 90+; valid FAQPage and Article schema (test with Google Rich Results)
- [ ] Every H2 that poses a question is answered in the first sentence beneath it
- [ ] No paragraph exceeds 4 sentences
- [ ] All CTAs point to {{BOOKING_URL}} placeholder
- [ ] Page added to sitemap and internal nav per existing site conventions
- [ ] Stats retain their inline source attributions (6sense, AirOps, SE Ranking, Gartner)
