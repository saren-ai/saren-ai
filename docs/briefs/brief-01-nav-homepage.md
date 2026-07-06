# Brief 01 — saren.ai nav restructure + homepage rewrite

**For:** Claude Code, working in the saren.ai repo (Next.js)
**Goal:** Convert the homepage from content library → conversation-setup funnel. Primary visitor is someone Saren just met at an OC event (incubator founder, CEO, CRO) validating him post-handshake. They need: what he does → proof → one button. Target: 60 seconds to Calendly.

---

## 1. Global nav

### Current (replace)

`Work · Playbooks · Studio · About Me · [Work With Me]` — "Work" and "Work With Me" both → /work. Service pages footer-only. Studio in prime slot.

### New

| Label | Target | Notes |
|---|---|---|
| Services | `/services` | NEW page — see §2 |
| Results | `/case-studies` | Exists. Proof one click from everywhere |
| Playbooks | `/playbooks` | Exists, unchanged |
| About | `/about` | Rename from "About Me" |
| **[Book a Call]** | `/work` | Button style. Keep URL (backlinks); retitle page — see §3 |

- **Studio moves to footer only.** Keep the Personal Vault footer block as-is.
- Keep ⌘K if trivial; kill if it complicates the build.
- Mobile: same five items, Book a Call pinned as the visually distinct action.

## 2. New page: `/services`

Lightweight index, not a sales letter. Structure:

1. H1: `How I work with teams`
2. One paragraph: "Three engagement types, depending on where you are. All of them build the same thing: a demand system that compounds — signal, scoring, content, spend, and AI wired together — instead of another quarter of disconnected campaigns."
3. Four cards (first three lift copy from current /work "How we can work together" — it's good, don't rewrite):
   - **GTM Systems Audit** — NEW entry rung. "Fixed-price, 2-week teardown of your funnel, stack, and spend. You get a scored gap map and a build sequence — run it yourself or hire me to run it. Best for: pre-seed/seed, incubator cohorts, teams deciding what to fix first." Price: `[PRICE — Saren to set, target $2–5k]`. CTA → /work
   - **Fractional Marketing Lead** — existing copy. Link out to `/fractional-marketing-lead`
   - **Project Engagement** — existing copy. Link → /case-studies
   - **Advisory & Positioning** — existing copy. Link → /thinkers
4. Below cards, one line linking the deep service pages: `/fractional-marketing-lead` · `/ai-orchestration` · `/signal-state`
5. Footer CTA: Book a Call → /work

## 3. `/work` page changes (minimal)

- Retitle H1: `Book a call.` Keep the intro line about reading materials beforehand — it's differentiated.
- **Embed Calendly inline** (calendly.com/sarenai) instead of link-out button. This is the single highest-leverage change on the site.
- Move "Recent results" stats above the engagement-type cards (unchanged) — or drop the cards entirely now that /services exists; keep a one-line link to /services instead. Prefer the latter: /work becomes pure conversion.
- Keep "Send a message" block.

## 4. Homepage — new section order + copy

**Cut entirely:** "Featured Downloads" (three Coming-Soon cards — vaporware above proof), duplicate CTAs, "See GTM Engineering →" hero link.

### 4.1 Hero

- Eyebrow: `GTM Engineer · Orange County, CA · Fractional & Full-Time`
- H1 (keep): `Stop running campaigns. Engineer the system.`
- Subhead (replace jargon stack):

  > I build the demand system that turns your marketing spend into repeatable pipeline — then run it as your fractional marketing lead. 20+ years from AKQA to Cylance ($1.4B exit).

- CTAs: `[Book a Call]` → /work · `[See Results]` → /case-studies

### 4.2 Proof bar

Keep exactly as-is (BlackBerry 8:1 ROI · Qwiet AI 70% CAC · Cylance $4M pipeline · Wethos 344% lead growth). Best asset on the page.

### 4.3 How we work together

Pull the four cards from §2 up onto the homepage (condensed: title + one line + Best-for + link). Section header: `Pick your entry point.` The Audit card goes first — it's the offer an incubator founder can actually say yes to.

### 4.4 Case studies

Two, not four: **120-Day Content Journey** ($4M pipeline) and **10-Touch Sales Play** (42% meeting rate). Link: `All case studies →`.

### 4.5 Interactive tools

Keep the three-tool section (ROI Simulator, Revenue Calculator, Lead Scoring) — they demo the craft. Retitle: `Try the tools I build.` One section, no downloads block.

### 4.6 Audience router (demoted, reframed)

Move below tools. Reframe labels by situation, not category — visitors self-select by pain, and current labels ("Subject Matter Experts") don't match slugs (`/thinkers`):

- `"We have budget but no system."` → /smb
- `"I am the entire marketing team."` → /solopreneurs
- `"I have expertise, but no audience."` → /thinkers

### 4.7 FAQ + final CTA

Keep FAQ. Final CTA block: keep headline `Let's build your growth engine.`, button → /work.

## 5. Identity + meta consistency

One noun everywhere: **GTM Engineer** (differentiated, board-repeatable). "Fractional marketing lead" stays as the SEO keyword/role descriptor, never the headline identity.

- Title tag: `Saren Sakurai | GTM Engineer — Fractional Marketing Lead & AI Operations`
- Meta description: `GTM Engineer in Orange County, CA. I build AI-driven demand systems that turn marketing spend into repeatable pipeline for B2B SaaS and cybersecurity teams.`
- Footer bio line, replace: `GTM Engineer based in Orange County. I build marketing systems that scale with AI, not headcount.`

## 6. Acceptance checklist

- [ ] No nav item and button share a destination with different labels
- [ ] /fractional-marketing-lead, /ai-orchestration, /signal-state reachable within 2 clicks from home
- [ ] Calendly embedded inline on /work, no link-out as primary action
- [ ] Zero "Coming Soon" content on homepage
- [ ] "Orange County" appears in hero eyebrow, meta description, footer
- [ ] Homepage has exactly one primary CTA repeated (Book a Call); everything else secondary
- [ ] All removed sections' URLs still resolve (no orphaned links from /smb, /solopreneurs, /thinkers)
- [ ] Lighthouse/build passes; no layout shift from Calendly embed
