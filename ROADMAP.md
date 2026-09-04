# saren.ai — Roadmap

Living document. Updated as priorities shift.

---

## The Three-Surface Plan — Human / Machine / Agent proof of concept

North-star initiative, started 2026-08-25. The goal grew over the course of that
session's discussion: this isn't just a saren.ai tune-up, it's the reference platform
Saren recommends to clients for AI-native, AEO/GEO-optimized sites — saren.ai is the
live proof, not a slide. This is the AI-native-websites thesis (record / corroboration /
interface) built as a working demo. Immediate next actions live in `TODO.md`; this
section is the big picture.

### The foundational call: content-as-data, not content-as-prose

Everything wrong the 2026-08-25 audit found traces back to one root cause: content
lives inside the presentation layer instead of being its own structured thing. Case
study prose is hand-written JSX per page (`DynamicNurtureClient.tsx` etc.), playbook
content is read from the filesystem at request time (Node-only, breaks on Workers),
and JSON-LD is hand-written per page separately from the visible copy it's supposed to
describe (the exact failure `AGENTS.md` already calls out — "Schema you can't see is a
lie you're telling a machine that will check").

**The fix, and the platform recommendation this whole initiative is built to prove
out:** content is authored once, as structured data, and every surface is a
*rendering* of that same record, not an independent copy someone has to remember to
keep in sync. **Correction from the original framing (2026-08-26, after exploration):**
this isn't MDX/frontmatter — the 2026-08-25 audit assumed case studies were prose that
needed an authoring format; they're not (see Surface 1 below), so the actual mechanism
is Zod-validated TS data modules, matching the repo's existing convention (`faqs.ts`,
`testimonials.ts`, `portfolio-data.ts`). Next.js stays the canonical host and serves
the structured content two ways — as rendered human pages, and as a generated JSON
export at a predictable URL (`/api/record/*.json`). Surface 3 consumes that JSON
export over HTTP; it doesn't own its own copy of the content, so there's nothing to
drift. Phase 1 (case studies + playbooks) shipped 2026-08-26 — see `TODO.md` for what's
done vs. still open.

### Surface 1 — Human (Next.js on Vercel) — current site, gets a content refactor

Keeps Next.js/Vercel — not because it's the default, but because saren.ai genuinely
carries app weight (Desk admin app, Stripe commerce, gated playbooks, interactive
tools) that justifies the framework. The decision framework for clients going forward:
**Astro on Cloudflare for content-only marketing sites** (zero JS by default, cheaper
at the edge, content negotiation is just a route instead of a hydration workaround);
**Next.js when there's a real app inside the site** (auth, checkout, a dashboard,
meaningful client state). saren.ai is the hybrid case, which is exactly why it's a good
flagship — it can show both patterns.

Immediate work: close the remaining `is-agentic` gaps (see `TODO.md`). Content-layer
work is scoped narrower than originally planned — 6 of 8 case studies are bespoke
interactive builds (persona gallery, tabbed data explorer, bento dashboard, hand-drawn
diagram, long-form essays), not prose, and the "thin record only" decision means their
bodies stay exactly as they are. What moved to structured data (2026-08-26): the
summary/index-card record for all 8 case studies (title, tagline, category, highlights,
url) and the playbook catalog export — previously duplicated across 3-4 independent
hand-maintained lists, now generated from one source each.

### Surface 2 — retired 2026-08-26, not part of saren.ai

Briefly built as `records.saren.ai` (Astro on Cloudflare, serving Gen X concert history
and comic tracking) on 2026-08-26, then retired the same day once it became clear
those content verticals already have far richer, independent homes: `@j-comics`
(21,233+ comic-issue records — the real "Japanese diaspora comics" publication) and
`@Brain/genx-canon` (~3,930 notes — the real "Gen X Canon" content). Both are being
planned as **fully independent projects**, each on their own, not as saren.ai
subdomains or spokes of this roadmap. saren.ai's role in that model is narrower and
cleaner: `author`/`publisher` credit via JSON-LD `@id` reference
(`https://saren.ai/#person`), not content hosting. No further tracking of either here —
see their own project planning when it happens.

`pay.saren.ai` and `portal.saren.ai` (payment-rail isolation; an Identogram LLC client
portal) were also named in the same discussion as possible future saren.ai subdomains,
unbuilt and unscoped — left out of this doc entirely for now since neither has a
concrete plan yet; revisit if either becomes real work.

### Surface 3 — Agent (Cloudflare Workers + MCP) — port and expand the existing build

**Not starting from zero** — `/api/mcp` already exists and is live on Vercel, with 3
tools (`search_saren_content`, `list_playbooks`, `get_playbook`), discovered during the
2026-08-25 audit and previously undocumented. Plan: port it to a Cloudflare Worker
(swap the `fs`-based playbook loader and direct Supabase/Voyage calls for the shared
JSON export + HTTP calls, both of which work fine from Workers), and expand the tool
set toward genuinely transactional shapes — check playbook availability, get current
pricing, start a contact/booking flow — with clean input/output schemas designed to
map onto ACP/AP2/UCP "offer" and "availability" concepts now, so standardization later
is a schema alignment, not a rewrite. Needs the Cloudflare token's DNS:Edit permission
(deferred 2026-08-25) once `mcp.saren.ai` is actually being wired up.

### Platform baseline (applies to every future client build, not just saren.ai)

Correct Cloudflare AI-bot-category config from day one (saren.ai's own was inverted
until 2026-08-25 — silently blocking the exact retrieval/agent traffic it should have
allowed), Content-Signal directives in `robots.txt`, JSON-LD generated from structured
content instead of hand-written, content negotiation on every content route. Ship these
as the platform default for new client sites, not something an audit catches later.

### Sequencing

1. Extract case studies + playbooks into the structured content layer; migrate the
   Next.js pages that currently hand-write this content to read from it instead
2. Generate the JSON export Surface 3 will consume
3. Port and expand Surface 3 (MCP → Cloudflare Worker, transactional tool shapes)
4. Write up the platform baseline as a reusable pattern (candidate:
   `wiki/patterns/ai-native-marketing-site-model.md`, alongside the existing
   `nextjs-marketing-site-model.md`) once proven out here

---

## Completed (2026-08-15) — JSON-LD graph consolidation, LocalBusiness, FAQ SSR fix, CI

Session shipped in `docs/changelogs/2026-08-15-jsonld-graph-consolidation.md`.

- [x] **One `@graph` per page** — 52 files / 143 separate `<script ld+json>` blocks →
      shared `src/lib/schema/` library (`buildGraph`, stable `@id` registry,
      `validateGraph`), wired through `src/components/seo/JsonLd.tsx` as the sole
      emission point (grep-guarded by a vitest test)
- [x] **LocalBusiness** — service-area business, `GeoCircle` on Irvine at a 10mi
      radius, backed by new visible copy in the footer and `/contact` (no fabricated
      address/phone)
- [x] **Fixed FAQ SSR bug** — collapsed answers were unmounted, never in server HTML;
      now always rendered, collapsed via height/opacity. All 16 FAQ sections
      centralized in `src/data/faqs.ts`, shared by the visible component and the
      JSON-LD (fixes `gtm-engineering`/`aeo-playbook` FAQ text that had drifted
      between the hand-written schema and the visible copy)
- [x] **Visibility audit** — added real visible breadcrumbs to ~20 pages that were
      emitting `BreadcrumbList` JSON-LD with no breadcrumb UI on the page at all;
      fixed paid/locked playbooks marking up `HowTo` step content the paywall never
      renders
- [x] Fixed 5 pre-existing structured-data defects (dangling `@id`, `@id` squatting,
      a page missing its `WebPage` node, duplicate Service entities, unlinked
      `hasPart`) — see changelog for detail
- [x] **CI added** — repo had none; new `.github/workflows/ci.yml`
      (lint → test → build → `validate:schema`), new `scripts/validate-schema.ts`
- [x] Documented a real environment limitation: `npm test`/`npm run build` can't
      complete locally because `#` in this repo's directory path breaks Vite and
      Turbopack — see `wiki/patterns/fuse-mount-gotchas.md`

---

## Up next (post-IA restructure, 2026-06-17)

Session shipped in `docs/changelogs/2026-06-17-ia-nav-search-restructure.md`. Immediate follow-ups:

- [ ] **Vault Chat / Ingest Pipeline** — `scripts/ingest-vault.ts`, `/playbooks/vault-chat`, `/api/vault-chat` RAG interface over Obsidian prompt vault catalog
- [x] **Linting & React 19 Hook Hygiene** — `RelativeTime.tsx` set-state-in-effect fix, eslint ignore for legacy prospecting/vault data, JSX entity escapes
- [ ] **Oblique Techniques hero** — create `public/images/feature/oblique-techniques-hero.png` (1200×630 OG; spec in `public/images/feature/README.md`)
- [ ] Verify `public/downloads/Saren-Sakurai-Resume.pdf` matches resume v03 content
- [ ] Decide: homepage "Featured Downloads" section markets 3 Coming Soon products —
      collapse to teaser or move below Case Studies until they ship
- [ ] About page dark-mode consistency pass (hero→timeline rely on global overrides)
- [ ] Mobile mega-menu promos don't render; `/fractional-marketing-lead` is
      footer-only on mobile — consider a mobile menu entry

---

## Completed (2026-06-17) — IA, nav, search, Pagefind

- [x] **Admin app** `/studio` → `/desk` — `(desk)` route group, `src/components/desk/`, proxy gate, runbook rename
- [x] **Editorial** `/feature` → `/studio` — 301 redirects; AI for Liberal Arts hub, Oblique Techniques page
- [x] **Work hub** `/engage` → `/work` — 301, canonicals, sitemap, nav CTAs
- [x] **Primary nav** — Work · Playbooks · Studio · About Me (clickable labels + 3-col mega menus); audience pages → footer
- [x] **Route groups** — public marketing under `(site)/`; static root `layout.tsx`; Substack RSS via `unstable_cache` in `(site)/layout.tsx`
- [x] **Pagefind** — 74+ pages indexed (was 1); Psylocke timeline indexing/metadata pass
- [x] **Search UX** — pill modal, lavender chrome, suggested searches, result ranking, site hotkeys (`⌘K`, `/`+letter)
- [x] **Config** — Substack CDN in `images.remotePatterns`; Sora 2 catalog path fix; indexnow/llms.txt/sitemap updates

---

## Up next (post-audit, 2026-06-12)

Full audit + remediation: `docs/changelogs/2026-06-12-site-audit-remediation.md`. All immediate follow-ups from that session are done (prod verified, Pagefind fixed in 2026-06-17 session, legal pages shipped). Open items moved to **Up next (post-IA restructure)** above.

---

## Completed (2026-06-12) — Site audit & remediation

- [x] Security: deleted unauthenticated `/api/upload-video`; Next 16.1.6 → 16.2.9
      (middleware-bypass CVEs); removed wildcard `images.remotePatterns`
- [x] Verified Supabase migration 003 lockdown live in prod (anon → 401 on all CRM tables)
- [x] Fixed redirect-shadowed static assets: `public/portfolio/*` was 308→404 for ALL
      OG images, persona PDFs, storyboards → moved to `public/images/portfolio/` +
      `public/downloads/personas/`; fixed hybrid-lead-scoring JSON-LD page URLs
- [x] `/downloads` retired: links → `/playbooks`, page deleted, sitemap cleaned
- [x] `/resume` page shipped + unified (hero CTA → page, PDF button on page, sitemap 0.9,
      footer, mega menu); section labels `<p>` → `<h2>`
- [x] About timeline reconciled with resume (canonical): Cylance title, CloudKitchens
      added, Trigger removed, agency-era spine matches; "Coming soon" pills removed
- [x] Custom 404 page; footer IA refresh; header active states; robots.txt single group
- [x] Cross-linking pass: case studies ↔ ai-orchestration ↔ tools; persona pages →
      proof + engagement model; signal-state → service page; 120-day ↔ Cylance page
- [x] Electric Blue fully retired (incl. two real rendered colors: WaveformHero canvas,
      BentoCard L3); banned-word copy cleanup; Wethos AI spelling unified
- [x] Decide: should `/smb`, `/solopreneurs`, `/thinkers`, `/work`, `/about/concerts` be
      in `sitemap.ts`? → Resolved: all present in sitemap as of 2026-06-12; `/engage` 301s to `/work`

---

## In progress — Commerce (next session)

- [ ] **RSC gate** — `/playbooks/[id]/page.tsx` reads `dlx_{id}` cookie, validates `cookie_token` + `expires_at` against `entitlements`, renders gated JSX server-side only
- [ ] **Download endpoint** — update `/api/download/[token]` to query `entitlements` table, enforce `expires_at`, increment `download_count` (analytics only)
- [ ] **Gen X playbook landing page** — copy, layout, free preview section, buy button UI on `/playbooks/genx-executive-ai-playbook`
- [ ] **Buy button** — nothing triggers checkout on `/playbooks/[id]` yet; ships with RSC gate

---

## Completed (2026-05-28) — Commerce & Paid Playbooks

- [x] Stripe integration — `stripe` package, live keys, webhook on `checkout.session.completed`
- [x] `/downloads` page — 4 products, Buy Now buttons, Stripe hosted checkout, `purchases` table, token-based delivery via Supabase Storage signed URLs
- [x] Supabase Storage `downloads` bucket — private, service role only
- [x] Paid playbook tier write path — `entitlements` table (two tokens: `cookie_token` gates page, `download_token` gates file), checkout route, webhook (raw body), success handler (sets HttpOnly `dlx_{id}` cookie, dual-write idempotency keyed on `session_id`)
- [x] Gen X Executive AI Playbook — Stripe product/price created (`price_1TbxuzCf1qdA5NGTt5gFpBSh`, $59), file uploaded to Supabase Storage, catalog entry added

---

## Completed (2026-03-17)

- [x] Code quality audit — type safety, unused imports, HTML sanitization
- [x] Sentry error tracking — client, server, edge configs + global error boundary
- [x] Vitest test suite — 88 tests across calculator math and behavioral scoring
- [x] Dynamic imports — calculator, ROI simulator, psylocke timeline, behavioral scoring
- [x] Bundle analyzer — `ANALYZE=true npm run build` to inspect chunks
- [x] ESLint cleanup — 88 → 3 errors, .vercel/scripts ignored, 51 entity fixes
- [x] Type safety — removed all `as any` except justified RSS parser cast
- [x] Cascading render fix — EngineOutcomes useState → useRef for prevRevenue

---

## Up next

### Commerce (deferred v1 scope)
- [ ] Magic-link email re-entry for multi-device access (data model already supports it — look up entitlement by email, re-set cookie)
- [ ] Upload files for legacy `/downloads` products (`gtm-execution-kit`, `fractional-cmo-dashboard`, `content-hook-bundle` — all have `filePath: null`)
- [x] Deprecate `/downloads` page — done 2026-06-12 (page deleted, route 301s to `/playbooks`, `/downloads/success` kept for legacy purchase links)

### Resilience & observability
- [ ] Configure Sentry DSN in Vercel env vars (needs Sentry account setup)
- [ ] Uptime monitoring (Vercel's built-in or Checkly) for critical paths
- [ ] Structured logging for API routes (replace remaining console.error)

### Testing expansion
- [ ] E2E smoke test for contact form submission (Playwright)
- [ ] Component tests for interactive tools (calculator inputs, tier list drag)
- [ ] Visual regression tests for key pages

### Performance
- [ ] Run `ANALYZE=true npm run build` and audit largest chunks
- [ ] Audit public/ assets — compress profile images (1080x1920 PNGs → WebP)
- [ ] Review Framer Motion impact on INP (Interaction to Next Paint)
- [ ] Consider converting `/about/stack` from full client component to server + dynamic client split

### SEO & content
- [x] Fix stale canonicals across all pages (2026-05-28)
- [x] Add canonical + OG + Twitter card to signal-state use-case sub-pages (2026-05-31)
- [x] Fix redirect ordering bug in `next.config.ts` (specific before catch-alls) (2026-05-31)
- [x] Redirect old Medium publication URLs (saren.ai was a Medium custom domain pre-2026) (2026-05-31)
- [x] Decide: should `/smb`, `/solopreneurs`, `/thinkers`, `/work`, `/about/concerts` be in `sitemap.ts`? → All in sitemap (resolved by 2026-06-12; `/engage` → `/work` 2026-06-17).
- [ ] Investigate "Crawled — currently not indexed" pages (14 pages) via Search Console export — likely thin content on some `/playbooks/[id]` pages.
- [ ] OG images: most pages reference `/og/playbooks-{id}.jpg` etc. that don't exist in `public/` — generate or update to a real fallback image.

### Data integrity
- [ ] Evaluate SQLite persistence on Vercel serverless (ephemeral risk)
- [ ] Consider Turso or Vercel Postgres if contact form DB matters beyond email
- [ ] Add environment variable validation on startup (fail fast if RESEND_API_KEY missing)

### DX & maintenance
- [ ] Audit `class-variance-authority` usage — adopt more broadly or remove
- [x] Clean up `psylocke-backstory/` in public/ — removed 2026-08-26; feature and assets moved to `_jpn/psylocke-timeline` (fan content, not professional site scope)
- [ ] Move `playbook-prompts/` to separate content repo if it keeps growing (31 MB)
- [ ] Address 3 remaining `setState in effect` lint errors (mount-only patterns — low priority)

---

## Ideas (unscheduled)

- Additional paid playbooks using the same entitlement infrastructure
- Auto-responder email for contact form submissions (commented-out code exists)
- HubSpot chat integration (TODO in ContactClient)
- Dark mode color audit against WCAG AAA
- Component storybook
- Analytics dashboard for playbook/tool engagement
- A/B test hero copy / CTA variants

---

*Last updated: 2026-08-25*
