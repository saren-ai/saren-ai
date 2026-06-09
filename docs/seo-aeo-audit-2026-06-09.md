# SEO & AEO Audit — saren.ai

**Date:** 2026-06-09
**Context:** Saren Sakurai, fractional CMO / AI operations consultant for B2B SaaS (Series A–C, ~$1M–$10M ARR). Target topics: *fractional CMO*, *AI marketing operations / AI orchestration*, *demand generation*.
**Method:** Full codebase audit (metadata exports, JSON-LD, sitemap/robots, content copy) with filesystem verification of referenced assets.

---

## Executive summary

The technical and structured-data foundation of this site is genuinely strong — top 5% of consulting sites. Nearly every route has a title, description, and canonical; JSON-LD is dense and well-architected (global Person + Organization with 25 `knowsAbout` entries, Service/OfferCatalog, FAQPage auto-emitted by the FAQ component, BreadcrumbList on ~40 pages); `/llms.txt` is implemented as a dynamic route with quantified results; redirects and robots.txt are correct. The two biggest problems are execution bugs, not strategy: **the site-wide default OG image `/og-image.png` does not exist** (it's referenced in the root layout, the Twitter card fallback, and as the Person schema's `image` — every social share and the entity's canonical photo currently 404), and **all 13 dynamic playbook OG images are missing** (`public/og/` is empty). Second, there's a gap between what the JSON-LD says and what the visible HTML says: answer engines quote visible text, and no page contains a plain extractable sentence like "Saren Sakurai is a fractional CMO who helps B2B SaaS companies…" — the H1s are taglines ("Machines handle scale. Humans handle meaning.") with zero keyword or entity content. Third, the content inventory is almost entirely portfolio-proof with no buyer-intent content — the best AEO asset (real pricing: "$8K–$15K/month") is buried in an accordion on the About page instead of owning the "fractional CMO cost" query. Finally, the sitemap stamps `lastModified: new Date()` on every build (which trains Google to ignore the lastmod entirely) and omits eight live routes. Trust signals are half-built: 26 client logos and specific metrics, but zero testimonials, and the contact CTA routes to a **gmail.com address**, which undercuts a premium positioning.

---

## Prioritized findings

| # | Issue | Impact | Effort | Recommended fix |
|---|-------|--------|--------|-----------------|
| 1 | `/og-image.png` referenced in root layout OG/Twitter fallback + Person schema `image` — **file doesn't exist** | High | Low | Create the file (1200×630) or repoint to `/images/og/home.png` |
| 2 | All `/og/playbooks-{id}.jpg` (13 playbooks) + `/playbooks/roi-simulator-og.png` + `/og/playbooks.jpg` + `/og/halcyon.png` missing — `public/og/` is empty | High | Med | Add `opengraph-image.tsx` dynamic generation for `/playbooks/[id]` (code below) |
| 3 | No visible answer-first entity statement; H1s on `/` and `/ai-orchestration` are keyword-free taglines | High | Low | Rewrites below |
| 4 | No buyer-intent content (cost, vs-alternatives, how-to-hire); pricing answer hidden in About FAQ | High | Med | Build pricing/hiring cluster (details below) |
| 5 | Sitemap: `lastModified: new Date()` every build; missing `/about/concerts`, `/about/work/cylance`, `/downloads`, `/engage`, `/smb`, `/solopreneurs`, `/thinkers`; flat 0.7 priority | Med | Low | Fix below |
| 6 | Contact email is `saren.sakurai@gmail.com` on a premium consulting site | Med | Low | Use `saren@saren.ai` (or identogram.com) |
| 7 | No testimonials anywhere — logos and self-reported metrics only | Med | Med | Add 2–3 attributed quotes (homepage + /contact); add `Review` schema if real |
| 8 | Case studies emit `WebPage` only — no `Article` schema, no `datePublished`; several lack OG images | Med | Low | Upgrade to `Article` (JSON-LD below); reuse existing `portfolio-*.png` as OG |
| 9 | No email capture / lead magnet — all conversion paths are email-or-Calendly | Med | Med | Gate one playbook behind email; Supabase + entitlements infra already exists |
| 10 | `/case-studies/thought-leadership-development` missing canonical | Low | Low | Add `alternates.canonical` per the repo's own CLAUDE.md rule |
| 11 | Positioning split: homepage H1 sells "AI Operations," title tag sells "Fractional CMO" | Low | Low | Pick the lead horse; make the other the supporting clause |
| 12 | Audience pages (`/smb`, `/solopreneurs`, `/thinkers`) thin and orphaned from sitemap | Low | Low | Add to sitemap; cross-link from audience router cards |

**Fine as-is (verified, no action):** metadata/canonical coverage, FAQPage schema (the `FAQ` component at `src/components/ui/FAQ.tsx:22-33` emits it correctly — it SSRs despite `"use client"`), llms.txt, robots.txt + Medium-era redirects, font loading, image optimization (zero raw `<img>`), redirect ordering, Person/Organization schema depth.

---

## Top 5 — implementation detail

### 1. Fix the broken default OG image (ship today)

Every page without a page-specific OG image — and every Twitter card fallback — currently points at a 404. So does the Person schema's `image` property, which is the photo Google/LLMs associate with the entity "Saren Sakurai."

Either drop a real 1200×630 `og-image.png` into `public/`, or repoint the references:

- `src/app/layout.tsx:58,70,117`
- `src/app/page.tsx:145`
- `src/app/case-studies/thought-leadership-development/page.tsx:76`

…at the existing `/images/og/home.png`. For the Person schema specifically, a headshot beats a banner — entity image should be a face, not a card.

### 2. Generate playbook OG images dynamically

All 13 playbook pages reference `/og/playbooks-${id}.jpg` (`src/app/playbooks/[id]/page.tsx:78,91`) and none exist. Rather than hand-making 13 images, add `src/app/playbooks/[id]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import { getPlaybook } from "@/lib/playbooks";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playbook = await getPlaybook(id);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: 80, background: "#0F0F0F", color: "#F5F5F7" }}>
        <div style={{ fontSize: 28, color: "#C43322", marginBottom: 16 }}>SAREN.AI PLAYBOOKS</div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{playbook?.title ?? "Playbook"}</div>
      </div>
    ),
    size
  );
}
```

Then delete the hardcoded `images:` entries in that page's `generateMetadata` — Next.js wires the generated image into OG and Twitter automatically. (Adjust the data-fetch call to whatever `src/lib/playbooks.ts` exports; load Sora via `fetch` for font fidelity, but system fonts are acceptable for v1.)

### 3. Answer-first entity block + H1 rewrites

Answer engines extract from visible prose, not JSON-LD — schema corroborates, it doesn't substitute. Right now the strongest entity statements only exist in metadata.

**Homepage H1** (`src/app/HomeClient.tsx`), current: *"AI Operations for Marketing & Sales"*
→ `Fractional CMO & AI Operations for B2B SaaS`

Keep the existing subhead, but insert one extractable sentence ahead of it:

> "I'm Saren Sakurai — a fractional CMO who builds AI-native demand generation systems for Series A–C B2B SaaS and cybersecurity companies. 20+ years from Cylance ($1.4B exit) to AKQA."

**/ai-orchestration H1**, current: *"Machines handle scale. Humans handle meaning."*
→ Make that the subhead (it's good copy — just not an H1) and use:
`AI Orchestration Consulting for B2B Marketing & Sales`

Then open the body with a definition block — this page can own the "what is AI orchestration" answer box:

> "**AI orchestration** is the practice of designing multi-agent systems where machines handle every task they're better at — and hand off to a human wherever judgment matters. I design and build these systems for B2B go-to-market teams."

**/contact H1**: *"Let's Connect"* → `Hire a Fractional CMO — Contact Saren Sakurai`.

### 4. Build the buyer-intent cluster (biggest strategic gap)

The answers are already published — they're just trapped in accordions. "Fractional CMO cost" is a high-intent, answer-engine-dominated query, and almost no competitor publishes real numbers. This site does: *$8K–$15K/month, 10–20 hrs/week, 6–12 months*.

Per the IA rules this is neither a playbook nor a case study; it's a new editorial/service page, e.g. `/fractional-cmo` (service hub) with child `/fractional-cmo/cost`. Answer-first opening:

> "**How much does a fractional CMO cost in 2026?** Typical engagements run **$8,000–$15,000/month** for 10–20 hours per week, usually over 6–12 months. That's roughly one-third the fully-loaded cost of a full-time CMO ($350K–$450K+ with equity). Here's how I structure engagements and when fractional is the wrong choice."

Add a `FAQ` component instance (FAQPage schema for free): "What's included in a fractional CMO engagement?", "Fractional CMO vs. marketing agency — which is cheaper?", "How long until results?". Meta description:

> "Fractional CMO pricing in 2026: real rates ($8K–$15K/mo), engagement structures, and when you shouldn't hire one — from a fractional CMO with 20+ years in B2B SaaS."

Internally link from the homepage FAQ, /contact FAQ, and /about FAQ answers to this page, and add it to `/llms.txt`.

### 5. Upgrade case studies to Article schema + fix metadata stragglers

Case studies currently emit `WebPage` + `BreadcrumbList` only. They're dated narrative content with an author — exactly what `Article` is for, and it makes them citable with provenance. Per case study:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "120-Day Content Journey: $4M Quarterly Pipeline at Cylance",
  "author": { "@id": "https://saren.ai/#person" },
  "publisher": { "@id": "https://identogram.com/#organization" },
  "datePublished": "2025-11-01",
  "dateModified": "2026-03-01",
  "image": "https://saren.ai/portfolio/portfolio-content-journey.png",
  "about": ["content marketing", "B2B demand generation", "pipeline development"]
}
```

While in there: add the missing canonical on `thought-leadership-development`, and point each case study's `openGraph.images` at its existing `portfolio-*.png` (the files exist; the metadata just doesn't reference them on several pages).

**Plus the sitemap fix (item 5 — two minutes):** in `src/app/sitemap.ts`, replace `lastModified: new Date()` with a per-route date map (even a coarse, honest one), add the seven missing routes, and bump money pages (`/ai-orchestration`, `/case-studies`, `/playbooks`, `/contact`) to `priority: 0.9`. A lastmod that changes on every deploy is worse than none — Google learns to distrust it.

---

## Strategic content ideas for AI-search citations

1. **"What does a fractional CMO cost in 2026?"** — covered above; the single highest-intent gap. Real numbers from a practitioner get cited over agency listicles.
2. **"Fractional CMO vs. full-time CMO vs. agency"** comparison page with an honest "when NOT to hire me" section — comparison tables are the most-extracted content format in AI answers, and the candor earns the citation.
3. **Own the term being sold: "What is Answer Engine Optimization?"** AEO is listed as a paid service and in `knowsAbout`, but there's no explainer. The term is young enough that a definitive practitioner guide (with this site as the worked example — "here's my llms.txt, here's my schema architecture, here's what showed up in ChatGPT/Perplexity") can become a canonical source.
4. **"My AI marketing operations stack, 2026"** — annual, dated, specific (Claude Code, MCP, multi-agent pipelines, actual costs). LLMs heavily cite concrete practitioner stacks; it also showcases the orchestration offer. The tier-list data on /about can seed it.
5. **Original benchmark data: "B2B SaaS demand gen benchmarks from $XXM in pipeline"** — aggregate the metrics already published (550% pipeline, 70% CAC reduction, 8:1 paid ROI, 42% meeting rate) into a stats page with one claim per sentence. Stats pages are citation magnets because answer engines need sourceable numbers.

---

## Closing note on positioning

The site is currently split between two identities — "AI operations consultancy" (homepage H1) and "fractional CMO" (title tags, schema, FAQ). Both are legitimate, but answer engines resolve entities better when one is primary. Based on the structured data and llms.txt, "fractional CMO with an AI-native methodology" is the framing the machines already believe — align the visible copy to it.
