# AGENTS.md — Saren.ai

Portfolio + consulting site for Saren Sakurai (fractional CMO / AI ops consultant). Next.js App Router, TypeScript, Tailwind v4, Framer Motion. Deployed on Vercel.

**Live:** https://saren.ai | **Dev:** `npm run dev` → localhost:3000

## Working Style

### Confirmations
When I reply 'yes', 'go', or 'ship it' to a proposed action, treat it as full authorization and proceed — do not ask for a second confirmation. If a request is ambiguous in scope (especially deletions or route removals), state the exact list of files/routes you will change and ask once, before doing anything.

## Deployment

After any merge to `main`, verify the Vercel **production** alias actually points at the newest build (`vercel ls` + `vercel alias set`). GitHub being current does not mean production is current — auto-deploy hooks are unreliable on these projects.

- **Automatic:** pushes to `main` on GitHub trigger a Vercel deployment — always confirm the production alias actually moved (see above), don't trust the trigger alone.
- **Manual (avoid):** CLI deployment (`vercel deploy`) is not recommended due to file size limits with project assets. Use the GitHub integration.
- **Region:** iad1 (US East)
- **Security headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- **Font caching:** immutable 1yr

## Pre-push checklist

Before committing or pushing: run typecheck, lint, and a production build. Client/server import-boundary errors in Next.js only surface at build time, so `next build` is mandatory — a passing dev server is not sufficient evidence.

## Commands

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build (run before deploying)
npm run lint     # ESLint
npm test         # Vitest
```

## Tech Stack

Next.js 16.2 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-based config, no tailwind.config.js) · Framer Motion 12 · @dnd-kit (tier list only) · Lucide React icons · MDX for content · Pagefind (static search index, generated at build time) · Stripe (hosted checkout, webhooks) · Supabase (Postgres + Storage) · No external carousel/state libs

## Desk (Hustle & Flow) — prospecting cockpit

`/desk` is the admin-only lead-prospecting app, backed by the Hustle & Flow Supabase project (`ltsuosasgblbqhsjckfg`). It is **not** part of the public marketing site — noindex, gated in `src/proxy.ts`, isolated in the `(desk)` route group. (Renamed from `/studio` on 2026-06-17 to free that path for the public Studio editorial section — see IA Conventions.)

- **Data model:** `clients → companies → contacts → sequences → touches`, with a `v_pipeline` view that derives each contact's stage, next action, due date, and priority. Records are written by the sourcing skills (in the separate `lead-prospecting` workspace, run via Claude); outreach **state** is the `touches` event log. Supabase is the system of record.
- **Routes:** `/desk` is the pipeline landing (funnel + Do-Next queue + gamification); `/desk/contacts/[id]` is the per-contact cockpit (inline edit, touch timeline, reply logging); `/desk/login` is magic-link auth. There is no contacts-list, sequences, or outreach-pages page — those v1 surfaces were removed.
- **Auth/RLS:** Supabase Auth (magic link) + `@supabase/ssr`. Access is admin-only via the `public.is_admin()` function, which whitelists specific UIDs (migration `003`). Edit that function to grant/revoke. `outreach_pages` (public `/for/[slug]`) keeps its own public policies and is untouched.
- **Migrations:** `supabase/migrations/001–003` are the schema of record (pipeline model, verified/valid email fix, auth lockdown).
- **Docs:** `docs/desk-runbook.md` (workflow), `docs/hustle-flow-schema-reference.md` (tables + write patterns).
- **Note:** `src/lib/supabase/database.types.ts` predates `001–003` — regenerate it to type `v_pipeline`/`companies`/`clients` (a single justified cast reads the view meanwhile).

## Modular Rules

Detailed rules live in `.claude/rules/` and are loaded automatically:

- **code-style.md** — directives, imports, dependencies, localStorage, TypeScript conventions
- **design-system.md** — Fire Horse 2026 colors, fonts, layout, dark mode, images
- **animations.md** — framer-motion patterns, CSS animation classes, @dnd-kit constraints

## Conventions

### Shared constants
Site-wide URLs and third-party endpoints (booking links, scheduler URLs, API bases) must live in a single exported constant (e.g. `BOOKING_URL`) and be imported everywhere. Never hardcode the same external URL in more than one file.

## Directory Structure

```
.
├── .claude/              # Settings, commands, rules, agents
│   ├── commands/         # /project:deploy, /project:review, /project:new-case-study
│   ├── rules/            # code-style, design-system, animations
│   └── agents/           # code-reviewer
├── docs/                 # Changelogs, setup guides, screenshots — gitignored, local-only
│   ├── briefs/           # Original page specs and build instructions (archive)
│   └── changelogs/       # Per-session change logs
├── playbook-prompts/     # Obsidian vault — prompt catalog
├── public/               # Static assets (logos, images, PDFs)
├── scripts/              # One-off and utility scripts
├── supabase/             # DB migrations (001–003) — schema of record for the Desk
└── src/
    ├── app/
    │   ├── (site)/       # Public marketing routes — Header/Footer/search chrome
    │   ├── (desk)/       # Admin prospecting app (/desk/*)
    │   ├── api/          # Route handlers (desk OTP, indexnow, etc.)
    │   ├── auth/         # Supabase auth callback
    │   ├── layout.tsx    # Root layout — static (no headers()); fonts + providers only
    │   └── globals.css
    ├── components/       # React components by domain
    ├── content/          # MDX content
    ├── data/             # Static data files
    ├── lib/              # Business logic, calculations, types
    └── test/             # Test setup
```

### Routes (`src/app/`)

```
/                                         Homepage
/about                                    Profile, career timeline (mirrors /resume — resume is canonical), stats, FAQ
/about/clients                            Client logos
/about/concerts                           Concert log
/about/expertise                          Expertise timeline
/about/work/cylance                       Cylance work deep-dive
/resume                                   Interactive resume — canonical career history; PDF download lives here
/work                                     Work hub — primary "Work With Me" CTA target (formerly /engage; 301 redirect kept)
/services                                 Services index — GTM Systems Audit, Fractional Marketing Lead, Project Engagement, Advisory & Positioning
/fractional-marketing-lead                Engagement model (money page, priority 0.9)
/fractional-marketing-lead/cost           Pricing page
/gtm-engineering                          GTM Engineering service page — systems-thinking pipeline approach
/ai-orchestration                         AI orchestration service page
/aeo-playbook                             AEO playbook essay — winning the AI shortlist
/smb                                      Audience page — founders & mid-market
/solopreneurs                             Audience page — solo founders & fractional CMOs
/thinkers                                 Audience page — subject matter experts
/agentic-web                              Agentic Web pillar hub — definition + layer pages (replaces the retired authority-engineering and thought-leadership-development case studies)
/agentic-web/agent-access                 Agentic Web layer page
/agentic-web/authority-engineering        Agentic Web layer page
/agentic-web/glossary                     Agentic Web glossary
/agentic-web/human-experience             Agentic Web layer page
/agentic-web/machine-readability          Agentic Web layer page
/brand                                    Fire Horse 2026 brand guidelines
/contact                                  Contact form
/studio                                   Studio — creative/editorial index (formerly /feature)
/studio/ai-for-liberal-arts                AI for Liberal Arts Majors series hub
/studio/oblique-techniques                 Oblique Techniques (Claude Skills promo)
/downloads/success                        Post-purchase download page (purchases table; /downloads itself 301s to /playbooks — page deleted 2026-06-12)
/playbooks                                Playbook Library index (toggle: Playbooks | Interactive Tools)
/playbooks/b2b-marketing-framework        B2B marketing framework (prompt library + interactive)
/playbooks/gtm-budget-calculator          SaaS revenue calculator tool
/playbooks/hybrid-lead-scoring            Hybrid lead scoring tool
/playbooks/its-good-to-be-pitched         TV spot storyboard / creative production demo
/playbooks/roi-simulator                  Paid media ROI simulator tool
/playbooks/vault-chat                     Ask-the-marketing-knowledge-base RAG chat tool
/playbooks/[id]                           Dynamic playbook pages (free + paid tiers)
/playbooks/[id]/success                   Route Handler — verifies Stripe session, sets dlx_ cookie, redirects
/case-studies                             Case Studies index (static B2B narratives)
/case-studies/10-touch-sales-play         Case study
/case-studies/120-day-content-journey     Case study
/case-studies/dynamic-nurture             Case study
/case-studies/executive-dashboard         Case study
/case-studies/intent-data                 Case study
/case-studies/sovereign-personas          Case study
/signal-state                             Signal State framework overview
/signal-state/architecture
/signal-state/framework
/signal-state/signal-library
/signal-state/use-cases
/signal-state/use-cases/cybersecurity
/signal-state/use-cases/independent-creative
/signal-state/use-cases/org-alignment
/privacy                                  Privacy policy
/terms                                    Terms of service
/oc                                       Local-SEO landing page — "GTM Engineer, Orange County" (lives at app root, not in the (site) group)
/llms.txt                                 llms.txt endpoint
/openapi.json                             OpenAPI spec endpoint
/halcyon                                  (archived — not in primary nav)
/halcyon/content-matrix
/halcyon/faq
/halcyon/intent-matrix
/halcyon/lead-scoring
/halcyon/resume
```

`/api/*` route handlers (checkout, desk OTP, download tokens, indexnow, MCP, record JSON feeds, reddit proxy, vault-chat, Stripe webhooks) and `/auth/callback` are omitted from this table — see `src/app/api/` directly.

### Components (`src/components/`)

| Directory | Purpose |
|---|---|
| `agentic-web/` | Agentic Web pillar components (replaces the retired `authority-engineering/` and `thought-leadership-development/` case study components) |
| `behavioral-scoring/` | Lead scoring tool components |
| `calculator/` | GTM budget calculator components |
| `case-studies/` | Shared case study layout components |
| `comparison-table/` | Comparison table UI |
| `content-journey/` | 120-day content journey components |
| `desk/` | Desk (Hustle & Flow) UI — JobTriggers, StatusPill, TouchDots, etc. |
| `feature/` | Studio editorial shared components (FeatureCard) — route is `/studio`, lib name is `feature` |
| `framework/` | Framework page components |
| `golden-dashboard/` | Executive dashboard components |
| `halcyon/` | Halcyon workspace components (archived section) |
| `home/` | Homepage section components |
| `layout/` | Header, Footer, nav, providers |
| `marketing-framework/` | B2B marketing framework components |
| `portfolio/` | Portfolio grid and card components |
| `sales-play/` | Sales play case study components |
| `search/` | Search modal, Pagefind provider, site hotkeys, ranking (9 files) |
| `seo/` | JsonLd and other SEO helpers |
| `signal-state/` | Signal State framework components |
| `sovereign-personas/` | Sovereign personas tool components |
| `storyboard/` | Storyboard case study components |
| `tier-list/` | AI stack tier list (About page) |
| `vault-chat/` | Vault Chat (RAG playbook chat) components |
| `ui/` | Shared primitives (navigation menu, etc.) |

### Libraries (`src/lib/`)

| File | Purpose |
|---|---|
| `feature.ts` | `FeatureArticle` type + `featureArticles` registry |
| `mega-menu-content.ts` | Nav mega menu structure and links |
| `playbooks.ts` | Playbooks data fetching and types (includes `paid?` field on `Playbook`) |
| `playbook-tiers.ts` | `PAID_TIERS` map of `playbook_id → { priceId, storageKey }` — add entries here to gate a playbook |
| `products.ts` | Legacy `/downloads` product config (price, items, filePath) |
| `search-rank.ts` | Pagefind result ranking — title/body match scoring for “Best match” vs “Also mentioned on” |
| `stripe.ts` | Lazy Stripe singleton (`getStripe()`) |
| `portfolio-data.ts` | Portfolio item types |
| `tier-list.ts` | AI tools list, SAREN_PICKS, stack categories |
| `utils.ts` | Shared utility functions |
| `supabase/admin.ts` | Service role Supabase client — server-side only, never expose to browser |
| `supabase/client.ts` | Browser Supabase client |
| `supabase/server.ts` | Cookie-based server Supabase client (for auth flows) |

### Key Config Files

`src/app/layout.tsx` (root layout) · `src/app/globals.css` (design system) · `next.config.ts` · `tsconfig.json` · `vercel.json`

## Common Tasks

**New page:** Create `src/app/route/page.tsx` → `"use client"` if interactive → `.section > .container-narrow` layout → framer-motion animations → add to mega menu (`src/lib/mega-menu-content.ts`)

**New tier list tool:** Add to `AI_TOOLS[]` in `src/lib/tier-list.ts` → 64x64 PNG in `public/logos/ai-apps/` → add ID to `SAREN_PICKS` → add to `stackCategories` in `src/app/about/page.tsx` (tier list lives inside `/about`, not a sub-route)

**New case study:** Use `/project:new-case-study <slug>` command. `/case-studies/*` is for static B2B proof narratives only. Interactive tools and paid downloads go in `/playbooks/*`.

**New Studio entry (feature article):** Add entry to `featureArticles` in `src/lib/feature.ts` → create `src/app/studio/<slug>/page.tsx` (server component, metadata + JSON-LD) + `src/app/studio/<slug>/ArticleClient.tsx` (`"use client"` if interactive) → create `src/components/feature/<slug>/` if the entry needs dedicated components → optionally surface in the Studio mega menu (`src/lib/mega-menu-content.ts`). Note: route base is `/studio`, but the internal lib/components domain is still named `feature` (the content type); the public section brand is "Studio".

**Design system changes:** All in `src/app/globals.css` via `@theme inline` blocks (Tailwind v4 CSS-based config)

**New paid playbook:** Add entry to `PAID_TIERS` in `src/lib/playbook-tiers.ts` with `priceId` (Stripe Price ID) and `storageKey` (Supabase Storage path in `downloads` bucket) → add catalog entry to `playbook-prompts/prompt_catalog.json` → build landing page copy and buy button on the `/playbooks/[id]` page. The RSC gate reads `cookies().get('dlx_' + id)` and validates against the `entitlements` table.

**Adding searchable content:** New routes under `(site)/` are indexed automatically at build time. Root `layout.tsx` must stay static — do not add `headers()` or other dynamic APIs there (breaks Pagefind). Add `data-pagefind-ignore` to elements that should not be searched. Wrap section content with `<PagefindBoundary section="...">` to set group label. Halcyon and `/api/*` are excluded globally. Test locally with `npm run build && npm run start` (not `npm run dev` — index doesn't exist there).

## SEO & Redirects

### Canonical tag requirement

Every `page.tsx` that should be indexed **must** declare `alternates: { canonical: 'https://saren.ai/path' }` in its `metadata` export. Pages missing this will appear in Search Console as "Duplicate without user-selected canonical." Check any new routes before pushing.

Pages intentionally not indexed use `robots: { index: false, follow: false }` instead (e.g. `/downloads/success`, `/for/[slug]`, `/desk/*`).

### Redirect rules in `next.config.ts`

**Specific patterns must come before catch-alls.** Next.js evaluates redirects top-to-bottom and stops at the first match. If a catch-all like `/portfolio/:slug*` appears before a specific rule like `/portfolio/behavioral-lead-scoring`, the catch-all fires first and the specific rule is dead code.

Correct order:
1. Specific slugs (e.g. `/portfolio/behavioral-lead-scoring → /playbooks/hybrid-lead-scoring`)
2. Prefix-specific catch-alls (e.g. `/portfolio/b2b-marketing-framework/:slug*`)
3. General catch-alls (e.g. `/portfolio/:slug*`)

**Redirects also shadow `public/` static files.** `redirects()` runs before public-file serving, so a catch-all like `/portfolio/:slug*` 308s every asset under `public/portfolio/` into a 404. This silently broke all OG images, the persona PDFs, and the storyboard images until 2026-06-12 (assets now live in `public/images/portfolio/` and `public/downloads/personas/`). Never store static assets under a path prefix that has a catch-all redirect.

### Domain history: saren.ai was a Medium custom domain

Before the current Next.js site, `saren.ai` was the custom domain for a Medium publication. Google indexed Medium articles, tag pages (`/tag/*`, `/tagged/*`), and user paths (`/followers`, `/latest`) under this domain. Redirects for all known Medium URLs are in `next.config.ts`. Do not delete them — they carry residual link equity and removing them would re-open 404s that Search Console has now resolved.

### robots.txt

`public/robots.txt` disallows `/halcyon` and `/api`. The halcyon section is archived and must stay disallowed. Desk routes (`/desk/*`) are not in robots.txt but carry `noindex` in their metadata — that's intentional (noindex is sufficient; robots.txt would block Googlebot from seeing the noindex tag itself). It also declares `Content-Signal` directives (search/ai-input/ai-train/use) and names retrieval crawlers explicitly (added 2026-07-30) — see Cloudflare below for the enforcement layer that backs this up.

### Cloudflare

saren.ai is proxied through Cloudflare in front of Vercel (Bot Fight Mode on) — `robots.txt` is advisory, Cloudflare is the actual enforcement layer for bots that ignore it. `CLOUDFLARE_API_TOKEN` in `.env.local` is a zone-scoped token (Zone Settings:Edit, Bot Management:Edit, Cache Purge:Purge) covering saren.ai plus six other personal domains — server-only, never expose via `NEXT_PUBLIC_`. Source of truth for the token and its full zone list is `~/Projects/.env.local` under `─── CLOUDFLARE ───`.

## Structured data

Every indexable page emits exactly **one** JSON-LD `@graph`, assembled by `src/lib/schema/` and rendered through `src/components/seo/JsonLd.tsx` — that component is the only place a `<script type="application/ld+json">` may appear (enforced by a vitest guard in `src/lib/schema/__tests__/graph.test.ts` that greps `src/` for the string). Never hand-write a raw `<script>` JSON-LD block in a page.

- **`buildGraph({...})`** (`src/lib/schema/graph.ts`) assembles the graph for one page. It always embeds full `Person`, `Organization`, `WebSite`, and `LocalBusiness` nodes — not bare `@id` references — so a single page is self-contained for a single-page fetch (an AI answer-engine crawler that only sees one page still resolves every reference). The same stable `@id`s repeat across every page's graph by design; Google and other crawlers merge same-`@id` nodes across a site.
- **`@id` registry** lives in `src/lib/schema/ids.ts` (`ID.person`, `ID.organization`, `ID.website`, `ID.localBusiness`, plus path-scoped helpers `webPageId`/`articleId`/`breadcrumbId`/`workId`/`howToId`/`serviceId`/`listId`). Never hand-type an `@id` string in a page — use these helpers so the convention stays consistent site-wide.
- **Person detail** (`identity: "full" | "lean"`, default `"lean"`) — only pass `"full"` on pages that actually render the career/bio detail (knowsAbout, alumniOf, skills): `/`, `/about`, `/about/expertise`. Every other page gets the lean identity node (name/url/jobTitle/worksFor/sameAs) — putting the full node on a tool page would mark up content that isn't on that page.
- **Breadcrumb rule:** `buildGraph({ breadcrumb: trail })` and the visible `<Breadcrumb trail={trail} />` (`src/components/ui/Breadcrumb.tsx`) must be fed the exact same `trail` array. A page must never emit `BreadcrumbList` JSON-LD without a corresponding visible breadcrumb on the page — that's the "never mark up anything not visible" rule made concrete, and it's checked in CI (see below).
- **FAQ:** all FAQ content lives in `src/data/faqs.ts` (`FAQS` record) — the visible `<FAQ items={FAQS.x} />` and the JSON-LD `buildGraph({ faq: FAQS.x })` read the same array, so visible copy and markup cannot drift. `FAQ_SCHEMA_EXCLUDED` in that file flags FAQ sets whose answers are too short (under ~40 words) to be self-contained answer-engine citations — those still render visibly, just without `FAQPage` markup. `src/components/ui/FAQ.tsx` always renders answer text in the DOM (collapsed via height/opacity, never unmounted) — don't reintroduce a mount/unmount gate, or answers disappear from the server-rendered HTML again.
- **LocalBusiness** is a service-area business (no street address or phone published) — `GeoCircle` centered on Irvine at a 10-mile radius. It's backed by visible "Irvine, California" + service-radius text in the sitewide footer and on `/contact`; don't widen the radius or change the city without updating that visible text too.
- **Paywalled content:** on `playbooks/[id]/page.tsx`, the `HowTo` node is only built when `access.state !== 'locked' && playbook.steps.length > 0` — a locked (paid, unpurchased) page renders `GatedTeaser`, which shows a step *count* only, never step titles or content. If you add another gated content type anywhere, apply the same rule: a node describing content the paywall hides is a visibility violation, not just an access-control nuance.
- **CI enforcement:** `.github/workflows/ci.yml` runs `npm run validate:schema` (`scripts/validate-schema.ts`) after `npm run build` — it parses every prerendered page's HTML, fails if a page has more than one `ld+json` block, fails on any dangling `@id` reference (via `validateGraph()` in `src/lib/schema/validate.ts`), and fails if a `Question`/`BreadcrumbList` item/`Article` headline in the graph doesn't appear as visible text on that page. Force-dynamic and DB-backed dynamic routes (`about/concerts`, `playbooks/[id]`) aren't prerendered so this check can't reach them — they're covered by the unit tests instead.
- `src/app/(site)/halcyon/faq/FaqClient.tsx` has the same historical SSR gap FAQ.tsx used to have (answers absent until clicked) — left as-is since `/halcyon` is archived and disallowed in robots.txt. Don't use it as a reference pattern.

## IA Conventions

**Classification rule:** Interactive feature on the page OR paid download → `/playbooks/*`. Static narrative proof → `/case-studies/*`. Prompt library items → `/playbooks/*`.

- `/case-studies/*` — static B2B proof narratives (no interactive widgets). Pure case studies only.
- `/playbooks/*` — Playbook Library: prompt sequences, interactive tools, paid downloads. The index page has a toggle (Playbooks | Interactive Tools). Interactive tools live at `/playbooks/<tool-slug>/`. Paid playbooks gate content via HttpOnly cookie (`dlx_{id}`) validated against the `entitlements` table.
- `/studio/*` — Studio: creative/editorial work, magazine-style articles, and the AI for Liberal Arts Majors series. Surfaced via the **Studio** mega menu. (Formerly `/feature/*`, which 301s here. Internal lib/components are still named `feature`.)
- `/signal-state/*` — Signal State framework workspace (in development).
- `/halcyon/*` — archived; do not link from primary nav. Routes still resolve.
- `/brand` — Fire Horse 2026 brand guideline page. `/about/brand` is deprecated and 301s to `/brand`.
- `/portfolio/*` — all old routes redirect via `next.config.ts`; do not create new content here.

## Repository / Project Layout

### Project layout
Project directories under `~/Projects/` are named without `#` prefixes. When renaming or moving directories, sweep all docs, wiki cards, and code references — but exclude markdown headings, CSS colors, and URL fragments from `#` matches.

## Repo Hygiene

Keep the repo clean so every Claude Code session starts with minimal noise.

### Root is sacred

Only config files (`next.config.ts`, `tsconfig.json`, `vercel.json`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`), `package.json`/`package-lock.json`, and project docs (`AGENTS.md`, `README.md`, `ROADMAP.md`) belong at root. Everything else goes in the right directory:

| What | Where |
|------|-------|
| One-off / utility scripts | `scripts/` |
| Build specs, briefs, guides, screenshots | `docs/` (archive in `docs/briefs/`) — **gitignored, local-only as of 2026-08-04** |
| Session changelogs | `docs/changelogs/` |
| Application code | `src/` |
| Static assets | `public/` |
| Sentry configs | Root (required by `@sentry/nextjs`) |

### File placement rules

- **Never leave stray scripts, images, or data files at root.** Move them immediately.
- **New scripts** → `scripts/`. Name descriptively (`sync-prompts.js`, not `fix.mjs`).
- **New docs/guides** → `docs/`. Build specs go in `docs/briefs/`. `docs/` itself is gitignored (2026-08-04) — local working notes only, never committed.
- **New test files** → colocate with source (`src/lib/__tests__/`) or in `src/test/`.
- **Database files** (`.db`, `.db-shm`, `.db-wal`) are gitignored. Never commit them.
- **`.DS_Store`**, `.obsidian/`, editor configs (`.cursor`, `.idea`, `.vscode`) are gitignored.

### Before finishing a session

1. Run `npm run build` — nothing merges unless it compiles. If a local build/test fails, confirm with `tsc --noEmit` + `eslint` + targeted `npx tsx` scripts, falling back on CI (`.github/workflows/ci.yml`) or a Vercel preview as the oracle.
2. Check `git status` — no unintended files at root, no stray untracked artifacts.
3. If you created temporary files during debugging, clean them up.

### Gitignore principles

The `.gitignore` covers: dependencies, build output, env files, local databases, OS files, editor configs, and Obsidian vault configs. If a new category of generated/local file appears, add it to `.gitignore` rather than committing it.

## Search

Site-wide search uses Pagefind, generated at build time (postbuild → `public/_pagefind`). The modal lives in `src/components/search/` and opens via **⌘K**, the header search button, or **`/`** then a section key (`W` Work, `P` Playbooks, `S` Studio, `A` About, `H` Home). Results are ranked by `src/lib/search-rank.ts` (24 fetched, 12 shown, grouped as Best match / Also mentioned on). Focus ring is on the pill input wrapper, not the raw `<input>` (`.search-pill-input` in `globals.css`).

The architecture supports a future **Ask** mode (Phase 2 — semantic search + chat via RAG); the mode switcher exists as a disabled UI state. See `docs/search-phase-2.md`.

---

## Workspace knowledge hub

Cross-project knowledge lives in the LLM wiki at `~/Projects/wiki/`. Read it before any
broad architectural change, and update it in the same session when something changes.

- **This project:** [`../wiki/projects/saren.ai.md`](../wiki/projects/saren.ai.md)
- **Map:** [`../wiki/index.md`](../wiki/index.md)
- **Before searching the workspace:** [`../wiki/reference/markdown-corpus-map.md`](../wiki/reference/markdown-corpus-map.md)
- **Before running shell commands:** [`../wiki/patterns/fuse-mount-gotchas.md`](../wiki/patterns/fuse-mount-gotchas.md)
- **Building a new site off this one as a model:** [`../wiki/patterns/nextjs-marketing-site-model.md`](../wiki/patterns/nextjs-marketing-site-model.md) (rendering, animation, search, gating, verification) and [`../wiki/patterns/aeo-structured-data.md`](../wiki/patterns/aeo-structured-data.md) (JSON-LD architecture) — this repo is their reference implementation; the patterns are written generically for reuse, this file documents the specific implementation

Self-maintenance protocol: [`../AGENTS.md`](../AGENTS.md)
