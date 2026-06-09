# saren.ai — foundation repair brief v2

> Claude Code execution brief, consolidated from the 2026-06-09 codebase audit. Drop this file at repo root, run `claude` from the same directory, paste this file as your first message. Work the phases in order; each has explicit acceptance criteria.

---

## Context

This is the saren.ai marketing site — a Next.js App Router project for Identogram LLC's fractional marketing lead and AI operations consulting practice (B2B SaaS, Series A–C, ~$1M–$10M ARR). A full codebase audit (2026-06-09) confirmed the technical foundation is top-5%-of-consulting-sites strong: metadata and canonical coverage is nearly complete, JSON-LD is dense and well-architected (global Person + Organization with 25 `knowsAbout` entries, Service/OfferCatalog, BreadcrumbList on ~40 pages), `/llms.txt` is a dynamic route with quantified results, robots.txt and redirects are correct.

The problems are execution bugs and a visibility gap — not strategy. This brief fixes them.

**Verified fine — do not touch:** metadata/canonical coverage (except the one straggler in Phase 5.4), llms.txt, robots.txt + Medium-era redirects, font loading, image optimization (zero raw `<img>`), redirect ordering, Person/Organization schema depth.

### Terminology rule (applies to every phase)

Saren's title is **"fractional marketing lead"** — not "fractional CMO." Use it in all visible copy, H1s, entity sentences, and JSON-LD `jobTitle`. The phrase "fractional CMO" appears in this brief only where it describes **what buyers type into search engines** (it has 5–10x the query volume), and per the SLUG NOTE at the end it may appear in meta descriptions and as a secondary keyword. Never in visible HTML.

### Brand voice (applies to all new copy)

Sentence case headlines — the audit's suggested H1s were Title Case; they have been corrected below and any copy you draft must follow sentence case. Direct, practitioner-to-practitioner, no hype adjectives ("transform," "unlock," "supercharge," "leverage" are banned). First-person "I" for Saren's work. Metric + label pairs, never naked numbers. If a sentence sounds like a SaaS landing page, rewrite it.

Fire Horse 2026 design tokens: dark-first, ember red `#E34234` (dark) / `#C43322` (light), ash `#0F0F0F` / `#F5F5F7`, Sora + JetBrains Mono. Logo is HTML text: `saren.ai()` with an ember period — never rasterized.

---

## Phase 1 — Broken OG images (P0 — ship today)

Every page without a page-specific OG image, every Twitter card fallback, and the Person schema's `image` property currently point at `/og-image.png`, **which does not exist**. All 13 playbook OG images are also missing (`public/og/` is empty). Every social share on the site silently 404s, and the canonical entity photo for "Saren Sakurai" is a dead link.

### 1.1 — Repoint the default OG image references

The file `/images/og/home.png` exists. Repoint the broken references at it:

- `src/app/layout.tsx` — lines ~58, 70, 117 (OG default, Twitter fallback, Person schema image)
- `src/app/page.tsx` — line ~145
- `src/app/case-studies/thought-leadership-development/page.tsx` — line ~76

Verify line numbers before editing — they may have drifted. Grep for `og-image.png` across `src/` to catch any reference the audit missed.

### 1.2 — Person schema image: headshot, not banner

For the Person schema specifically, do NOT use `/images/og/home.png`. An entity image should be a face, not a card — this is the photo Google and LLMs associate with "Saren Sakurai."

Look in `public/` (likely `assets/profile/` or similar) for an existing headshot or stylized portrait. If one exists at a stable path, use it. If none exists, **pause and ask Saren** for a headshot file rather than pointing the Person image at a banner. Acceptable interim: omit the `image` field entirely — absent is better than wrong.

### 1.3 — Generate the 13 playbook OG images dynamically

All playbook pages reference `/og/playbooks-${id}.jpg` (`src/app/playbooks/[id]/page.tsx`, ~lines 78, 91) and none exist. Use the Next.js file convention instead of hand-making images. Create `src/app/playbooks/[id]/opengraph-image.tsx`:

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

Adjust the data-fetch call to whatever `src/lib/playbooks.ts` actually exports. Load Sora via `fetch` for font fidelity if straightforward; system fonts are acceptable for v1. Then **delete the hardcoded `images:` entries** in that route's `generateMetadata` — Next.js wires the generated image into OG and Twitter automatically.

Also resolve the other missing assets the audit found: `/playbooks/roi-simulator-og.png`, `/og/playbooks.jpg`, `/og/halcyon.png`. Either generate them with the same convention on their routes or repoint to existing assets.

### 1.4 — Case study OG images

Several case studies have existing `portfolio-*.png` artwork in `public/portfolio/` that their metadata doesn't reference. For each case study page, point `openGraph.images` at its matching portfolio asset. Output a mapping table (route → asset) for any where the match is ambiguous.

**Acceptance:** Grep the repo for `og-image.png` — zero hits outside this brief. `curl -I` every OG URL emitted in metadata across `/`, three playbooks, three case studies — all 200. Cards render at https://www.opengraph.xyz/. Person schema image is a headshot or absent, never a banner.

---

## Phase 2 — Answer-first entity copy (P0)

Answer engines extract from visible prose; JSON-LD corroborates but doesn't substitute. Right now the strongest entity statements on this site exist only in metadata. The H1s are taglines with zero keyword or entity content.

### 2.1 — Homepage: H1 + extractable entity sentence

In `src/app/HomeClient.tsx` (or wherever the hero renders):

Current H1: *"AI Operations for Marketing & Sales"*
New H1 (sentence case): **"Fractional marketing lead & AI operations for B2B SaaS"**

Keep the existing subhead, but insert one extractable sentence ahead of it, rendered as a plain `<p>` (no decorative typography, no animation — extractability is the point):

> "I'm Saren Sakurai — a fractional marketing lead who builds AI-native demand generation systems for Series A–C B2B SaaS and cybersecurity companies. 20+ years from Cylance ($1.4B exit) to AKQA."

### 2.2 — /ai-orchestration: H1 swap + definition block

Current H1: *"Machines handle scale. Humans handle meaning."* — good copy, wrong element. Demote it to the subhead.

New H1 (sentence case): **"AI orchestration consulting for B2B marketing & sales"**

Open the body with a definition block — this page can own the "what is AI orchestration" answer box:

> "**AI orchestration** is the practice of designing multi-agent systems where machines handle every task they're better at — and hand off to a human wherever judgment matters. I design and build these systems for B2B go-to-market teams."

### 2.3 — /contact: H1

Current: *"Let's Connect"*
New (sentence case): **"Hire a fractional marketing lead — contact Saren Sakurai"**

### 2.4 — H1 audit across the remaining route tree

For every other page (`find src/app -name "page.tsx"`), extract the rendered H1 and output a table:

| Route | Current H1 | Entity/keyword present? | Suggested rewrite (sentence case) |
|---|---|---|---|

Do not make these changes — output the table for Saren to review.

**Acceptance:** A visitor reading only above-the-fold copy on `/` can answer "what does this person do, and for whom." Paste the homepage into Claude or ChatGPT and ask "summarize what this person offers" — the response should accurately describe fractional marketing leadership and AI operations for B2B SaaS without hallucinating.

---

## Phase 3 — Buyer-intent content cluster (P0/P1 — biggest strategic gap)

The content inventory is portfolio-proof with no buyer-intent content. The best AEO asset on the site — real pricing: **$8K–$15K/month, 10–20 hrs/week, 6–12 months** — is buried in an About-page accordion. "Fractional CMO cost" is a high-intent, answer-engine-dominated query and almost no competitor publishes real numbers. This site already has the numbers; they're just trapped.

### 3.1 — Build the service hub + cost child page

Per the site's IA rules this is neither a playbook nor a case study — it's a new editorial/service page pair:

- **Hub:** `/fractional-marketing-lead` (see SLUG NOTE before creating — slug choice has a search trade-off)
- **Child:** `/fractional-marketing-lead/cost`

The cost page opens answer-first:

> "**How much does a fractional marketing lead cost in 2026?** Typical engagements run **$8,000–$15,000/month** for 10–20 hours per week, usually over 6–12 months. That's roughly one-third the fully-loaded cost of a full-time CMO ($350K–$450K+ with equity). Here's how I structure engagements and when fractional is the wrong choice."

Structure for the cost page:

- The answer-first paragraph above, as visible `<p>` text near the top of `<main>`
- Engagement tiers as a comparison table — pull from the existing About-page accordion; the rates must appear as visible text in at least three places (tier H2s, the table, the opening paragraph)
- "When fractional is the wrong choice" section — the candor earns the citation
- Visible Q&A section using the existing FAQ component: "What's included in a fractional marketing lead engagement?", "Fractional marketing lead vs. marketing agency — which is cheaper?", "How long until results?" — **with `schema={false}`, see Phase 5.2**
- Twin CTA: primary "Work with me" → /engage, secondary → /playbooks

Meta description (this is where the buyer-search keyword lives — see SLUG NOTE):

> "Fractional marketing lead pricing in 2026: real rates ($8K–$15K/mo), engagement structures, and when you shouldn't hire one. What a fractional CMO costs, from a practitioner with 20+ years in B2B SaaS."

JSON-LD: `Service` / `OfferCatalog` with tiers, `priceCurrency`, `priceSpecification` — one of the few schema patterns that still drives rich results.

### 3.2 — Wire the internal links

- Homepage FAQ, /contact FAQ, and /about FAQ answers that mention pricing → link to the cost page
- Remove pricing detail from the About accordion; replace with one line linking to the cost page
- Add both new pages to `/llms.txt` (it's a dynamic route — find where its content is defined and add entries)
- Add both to the sitemap (Phase 4 covers the generator)

### 3.3 — Content backlog (output briefs only, do not draft)

The audit identified five citation-magnet content plays. Write a 3–4 sentence brief for each in a `content-backlog.md` at repo root, for Saren to review and schedule:

1. The cost page (built in 3.1 — mark done)
2. **"Fractional marketing lead vs. full-time CMO vs. agency"** — comparison page with an honest "when NOT to hire me" section; comparison tables are the most-extracted format in AI answers
3. **"What is answer engine optimization?"** — AEO is a paid service and a `knowsAbout` entry but has no explainer; a definitive practitioner guide using saren.ai itself as the worked example (its llms.txt, its schema architecture, what shows up in ChatGPT/Perplexity) can become a canonical source
4. **"My AI marketing operations stack, 2026"** — annual, dated, specific (Claude Code, MCP, multi-agent pipelines, actual costs); LLMs heavily cite concrete practitioner stacks; the tier-list data on /about can seed it
5. **Original benchmark stats page** — aggregate the already-published metrics (550% pipeline, 70% CAC reduction, 8:1 paid ROI, 42% meeting rate) into one page, one claim per sentence; stats pages are citation magnets because answer engines need sourceable numbers

**Acceptance:** Cost page live with rates in visible HTML in three places. About accordion no longer contains pricing detail. Internal links wired. Both pages in llms.txt and sitemap. `content-backlog.md` exists with five briefs.

---

## Phase 4 — Sitemap hygiene (P1 — two minutes of code, real signal impact)

`src/app/sitemap.ts` stamps `lastModified: new Date()` on every build. Every URL reports as modified-today on every deploy, which trains Google to distrust and ignore the field entirely. A lastmod that changes on every deploy is worse than none.

### 4.1 — Honest lastModified

Replace `new Date()` with a per-route date map. Coarse but honest beats precise but fake:

- Content with frontmatter or data-file dates: use the actual `updated` date
- Static routes: the git mtime of the page file (`git log -1 --format=%cI -- <file>`)
- If no source date can be determined for a route: **omit `lastModified` for that route** rather than fabricating one

### 4.2 — Add the missing routes

The audit found these live routes missing from the sitemap:

`/about/concerts`, `/about/work/cylance`, `/downloads`, `/engage`, `/smb`, `/solopreneurs`, `/thinkers`

That's seven; the audit summary says eight. Run `find src/app -name "page.tsx" -not -path "*/api/*"`, diff the full route list against sitemap output, and add anything else missing. Exclude: noindex routes, drafts, dev-only routes.

### 4.3 — Priority differentiation

Currently flat 0.7. Bump money pages to `priority: 0.9`: `/ai-orchestration`, `/case-studies`, `/playbooks`, `/contact`, plus the new `/fractional-marketing-lead` pages from Phase 3. Homepage 1.0. Leave the rest at 0.7.

**Acceptance:** Sitemap contains every live route. lastmod values are differentiated, not uniform. Validates at xml-sitemaps.com. Resubmit in Google Search Console and Bing Webmaster Tools after deploy.

---

## Phase 5 — Trust signals, schema corrections, stragglers (P1)

### 5.1 — Kill the Gmail address (do this first — five minutes, disproportionate trust impact)

The contact CTA routes to `saren.sakurai@gmail.com`. A premium engagement priced at $8K–$15K/month does not accept inquiries at a personal Gmail.

Replace with `hello@saren.ai` everywhere public-facing. Grep targets: `mailto:` hrefs, `/contact` and `/engage` pages, footer component, Person schema `email`, Organization `contactPoint`, any form handler or env-driven recipient. The forwarding alias is confirmed live — no verification step needed. One nuance: if the Person schema's `email` field is meant to identify Saren-the-person rather than the business contact point, `Organization.contactPoint` gets `hello@saren.ai` and `Person.email` may be omitted entirely — an entity field pointing at a role alias is slightly off-spec. Omit over mismatch.

### 5.2 — FAQ schema: a documented disagreement

The audit marks the FAQ component's auto-emitted FAQPage schema as "fine as-is" and recommends adding more of it. This brief takes the opposite position, and Claude Code should follow this brief: **Google restricted FAQ rich results to authoritative government and health sites in August 2023, and the March 2026 core update made FAQPage markup on non-FAQ pages ineligible for any display benefit.** The schema is not penalized — the audit is right that it's harmless — but it's inert weight, and emitting it sitewide contradicts the positioning of a consultancy that sells AEO precision.

Modify `src/components/ui/FAQ.tsx` to accept a `schema` prop, **defaulting to `false`**. The visible Q&A structure (question as heading, answer as paragraph) is the actual AEO signal and stays everywhere. No current page should set `schema={true}`.

This is P2 within this phase — do it, but it's the lowest-stakes item in the brief.

### 5.3 — Testimonial component (structure now, quotes later)

26 client logos, specific metrics, zero testimonials. Build the slot; Saren fills it.

Create `components/Testimonial.tsx` (semantic `<figure>` / `<blockquote>` / `<figcaption>`) and a `TestimonialGrid`. Placements per the audit: homepage (between the metric strip and Featured Downloads) and `/contact`. Also add to the new cost page above the CTA.

Populate with three placeholders marked `{/* TODO: replace with real attributed quotes — do not ship placeholders */}`. **Do not invent testimonials.** Add `Review` schema only when real quotes exist — and wire it to review the Person/Organization, not the Service (Service self-review markup is a manual-action risk post-March-2026).

### 5.4 — Case studies: upgrade WebPage → Article

Case studies currently emit `WebPage` + `BreadcrumbList` only. They're dated narrative content with an author — exactly what `Article` is for, and it makes them citable with provenance. Per case study, add:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "120-day content journey: $4M quarterly pipeline at Cylance",
  "author": { "@id": "https://saren.ai/#person" },
  "publisher": { "@id": "https://identogram.com/#organization" },
  "datePublished": "2025-11-01",
  "dateModified": "2026-03-01",
  "image": "https://saren.ai/portfolio/portfolio-content-journey.png",
  "about": ["content marketing", "B2B demand generation", "pipeline development"]
}
```

Use real dates from git history or content files — same honesty rule as the sitemap. Confirm the publisher `@id` matches the Organization node's actual `@id` in the codebase (the audit shows `identogram.com/#organization`; verify, don't assume).

While in there: **add the missing `alternates.canonical` on `/case-studies/thought-leadership-development`** — the repo's own CLAUDE.md requires it.

### 5.5 — Audience pages: de-orphan

`/smb`, `/solopreneurs`, `/thinkers` are thin and orphaned. Phase 4 adds them to the sitemap; here, verify the homepage audience-router cards link to them (the audit suggests they may already) and add reciprocal links from each audience page back to relevant playbooks and the cost page. Do not bulk up the copy in this pass — just fix the link graph. Flag thin-content rewrites in `content-backlog.md`.

### 5.6 — Positioning alignment

The audit's closing note: the site is split between "AI operations consultancy" (homepage H1) and the fractional title (title tags, schema, FAQ), and answer engines resolve entities better when one is primary. Phase 2's H1 rewrite resolves this by making the fractional title primary with AI operations as the methodology clause. As you touch metadata in other phases, align stragglers to that hierarchy: **fractional marketing lead first, AI-native methodology as the modifier.** Output a list of any page where the two identities still conflict.

---

## Phase 6 — Lead capture (P2 — needs Saren's input before execution)

The audit flags zero email capture: every conversion path is email-or-Calendly. The Supabase + entitlements infrastructure already exists in the repo.

Propose — do not build without confirmation — gating ONE playbook behind an email form. Output a short recommendation: which playbook has the best traffic-to-value ratio for gating, what the form flow would look like using the existing infra, and what stays ungated. Saren decides; this phase ends at the proposal.

---

## Phase 7 — Validation gauntlet

1. **Rich Results Test** on `/`, `/ai-orchestration`, the cost page, three case studies. No errors. Case studies show Article eligibility.
2. **Schema.org validator** on the same set, plus the Person node. No warnings.
3. **W3C HTML validator** on `/`, the cost page. Zero structural errors.
4. **Lighthouse** on `/`: SEO ≥ 95, Accessibility ≥ 90, Performance ≥ 85.
5. **`curl -I` every OG asset** referenced in metadata or JSON-LD anywhere. All 200.
6. **opengraph.xyz** render check: homepage, one playbook, one case study.
7. **Grep gates:** `og-image.png` → 0 hits; `gmail.com` → 0 hits; `new Date()` in sitemap.ts → 0 hits.
8. **Resubmit sitemap** in GSC and Bing Webmaster Tools.
9. **AI citation smoke test:** ask Claude and ChatGPT "Who is Saren Sakurai and what does he do?" and "How much does a fractional CMO cost?" — the first should describe fractional marketing leadership for B2B SaaS citing saren.ai; the second is the lagging indicator for Phase 3 (expect weeks-to-months, note baseline now).

---

## Output expectations

Per phase: summary of changes, diff of files modified, acceptance result (pass / fail / needs human review). Do not modify `.env*`, deploy config, or anything credential-shaped. Do not commit or push — Saren reviews locally before deploying.

Pause and ask when you hit: the Person headshot (1.2), any H1 rewrite beyond the three specified (2.4 is review-only), the slug decision if Saren hasn't confirmed (SLUG NOTE), testimonial content (never invent), the lead-capture build (Phase 6 is proposal-only), and any case where brand voice is ambiguous — draft three options and ask.

**Run order:** 5.1 (email) → 1 → 2 → 4 → 3 → 5.4 → 5.3 → 5.5 → 5.6 → 5.2 → 6 (proposal) → 7.

---

## SLUG NOTE — terminology and search-behavior trade-off

Saren's title is "fractional marketing lead." Buyers search "fractional CMO" at roughly 5–10x the volume, and the audit's closing note confirms the machines currently resolve this entity toward the fractional-CMO framing. This creates a positioning-vs-visibility split. Resolution for this run — **Option B (split), confirmed default:**

- **Visible HTML** (H1s, body copy, entity sentences, JSON-LD `jobTitle`): "fractional marketing lead," always.
- **Meta descriptions and og:descriptions** on the hub and cost pages: include "fractional CMO" once as a secondary phrase (see the Phase 3 meta description for the pattern).
- **Slugs:** `/fractional-marketing-lead` and `/fractional-marketing-lead/cost`. Saren may veto in favor of neutral `/pricing` — if he does, keep the hub/child IA and just rename.
- **Do not 301-redirect any existing URL** as part of this work without explicit confirmation.

If ChatGPT/Perplexity citation tests (Phase 7, item 9) show the cost page failing to surface for "fractional CMO cost" after 60 days, revisit — the fallback is a `/fractional-cmo-cost` alias page that canonicals to the main cost page. Note this in `content-backlog.md` as a 60-day check.
