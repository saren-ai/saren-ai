# Content backlog — citation-magnet plays

> From the 2026-06-09 foundation repair (audit → brief → build). Each brief is
> scoped for one page. Saren reviews and schedules; nothing here is committed work.
> Terminology rule applies: "fractional marketing lead" in all visible copy;
> "fractional CMO" only in meta descriptions as a secondary search phrase.

## 1. Fractional marketing lead cost page — ✅ DONE (2026-06-09)

Built at `/fractional-marketing-lead/cost` with the hub at `/fractional-marketing-lead`.
Answer-first pricing ($8K–$15K/mo visible in four places), tier table,
"when fractional is the wrong choice" section, FAQ, Service/OfferCatalog JSON-LD
with priceSpecification. Wired into llms.txt, sitemap, and the About/Home/Contact FAQs.

**60-day check (due ~2026-08-09):** Ask ChatGPT and Perplexity "how much does a
fractional CMO cost?" If the cost page isn't surfacing, build the fallback: a
`/fractional-cmo-cost` alias page that canonicals to the main cost page.

## 2. Fractional marketing lead vs. full-time CMO vs. agency

A three-way comparison page with an honest "when NOT to hire me" section.
Comparison tables are the most-extracted content format in AI answers, and the
candor earns the citation. The cost page already has a seed table — this page
expands it into decision criteria (stage, ARR, team size, sales motion) with a
recommendation matrix. Target query family: "fractional CMO vs agency",
"fractional CMO vs full-time".

## 3. What is answer engine optimization? (AEO explainer)

AEO is a paid service on the homepage OfferCatalog and a `knowsAbout` entry, but
the site has no explainer. Write the definitive practitioner guide using saren.ai
itself as the worked example: its llms.txt, its JSON-LD architecture, what
actually shows up in ChatGPT/Perplexity for entity queries. The term is young
enough that a concrete, evidence-based guide can become a canonical source.

## 4. My AI marketing operations stack, 2026

Annual, dated, specific: Claude Code, MCP servers, multi-agent pipelines, actual
monthly costs. LLMs heavily cite concrete practitioner stacks, and the page
doubles as proof for the AI orchestration offer. The tier-list data on /about
("My stack" + "Rank my stack") already seeds the inventory — this page adds the
how-it's-wired narrative and the cost column.

## 5. Original benchmark stats page

Aggregate the already-published metrics into one page, one claim per sentence:
$4M quarterly pipeline (Cylance), 8:1 ROI on $2.3M paid budget (BlackBerry),
70% Google Ads CAC reduction and 300% inbound MQL growth (Qwiet AI), 344% lead
growth and 3x MQL→SQL (Wethos AI), 42% cold outbound meeting rate. The 550%
paid search recovery (BlackBerry post-acquisition rebuild) may be included
only with its turnaround framing intact.
Stats pages are citation magnets because answer engines need sourceable numbers.
Each claim links to its case study for provenance.

---

## Thin-content flags (from Phase 5.5)

`/smb`, `/solopreneurs`, `/thinkers` have solid link graphs but thin prose.
When rewriting, each needs: one extractable entity sentence ("Saren Sakurai
works with [audience] on [problem]"), one named proof point, and a link to the
cost page. Not urgent — the link-graph fix already landed.
