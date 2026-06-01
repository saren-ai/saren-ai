# AGENTS.md — Saren.ai

Portfolio + consulting site for Saren Sakurai (fractional CMO / AI ops consultant). Next.js App Router, TypeScript, Tailwind v4, Framer Motion. Deployed on Vercel.

**Live:** https://saren.ai | **Dev:** `npm run dev` → localhost:3000

## Commands

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build (run before deploying)
npm run lint     # ESLint
```

## Tech Stack

Next.js 16.1 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-based config, no tailwind.config.js) · Framer Motion 12 · @dnd-kit (tier list only) · Lucide React icons · MDX for content · Pagefind (static search index, generated at build time) · Stripe (hosted checkout, webhooks) · Supabase (Postgres + Storage) · No external carousel/state libs

## Studio (Hustle & Flow) — prospecting cockpit

`/studio` is the admin-only lead-prospecting app, backed by the Hustle & Flow Supabase project (`ltsuosasgblbqhsjckfg`). It is **not** part of the public marketing site — noindex, gated in `src/proxy.ts`, isolated in the `(studio)` route group.

- **Data model:** `clients → companies → contacts → sequences → touches`, with a `v_pipeline` view that derives each contact's stage, next action, due date, and priority. Records are written by the sourcing skills (in the separate `lead-prospecting` workspace, run via Claude); outreach **state** is the `touches` event log. Supabase is the system of record.
- **Routes:** `/studio` is the pipeline landing (funnel + Do-Next queue + gamification); `/studio/contacts/[id]` is the per-contact cockpit (inline edit, touch timeline, reply logging); `/studio/login` is magic-link auth. There is no contacts-list, sequences, or outreach-pages page — those v1 surfaces were removed.
- **Auth/RLS:** Supabase Auth (magic link) + `@supabase/ssr`. Access is admin-only via the `public.is_admin()` function, which whitelists specific UIDs (migration `003`). Edit that function to grant/revoke. `outreach_pages` (public `/for/[slug]`) keeps its own public policies and is untouched.
- **Migrations:** `supabase/migrations/001–003` are the schema of record (pipeline model, verified/valid email fix, auth lockdown).
- **Docs:** `docs/studio-runbook.md` (workflow), `docs/hustle-flow-schema-reference.md` (tables + write patterns).
- **Note:** `src/lib/supabase/database.types.ts` predates `001–003` — regenerate it to type `v_pipeline`/`companies`/`clients` (a single justified cast reads the view meanwhile).

## Modular Rules

Detailed rules live in `.claude/rules/` and are loaded automatically:

- **code-style.md** — directives, imports, dependencies, localStorage, TypeScript conventions
- **design-system.md** — Fire Horse 2026 colors, fonts, layout, dark mode, images
- **animations.md** — framer-motion patterns, CSS animation classes, @dnd-kit constraints

## Directory Structure

```
.
├── .claude/              # Settings, commands, rules, agents
│   ├── commands/         # /project:deploy, /project:review, /project:new-case-study
│   ├── rules/            # code-style, design-system, animations
│   └── agents/           # code-reviewer
├── docs/                 # Changelogs, setup guides, screenshots
│   ├── briefs/           # Original page specs and build instructions (archive)
│   └── changelogs/       # Per-session change logs
├── playbook-prompts/     # Obsidian vault — prompt catalog
├── public/               # Static assets (logos, images, PDFs)
├── scripts/              # One-off and utility scripts
├── supabase/             # DB migrations (001–003) — schema of record for the Studio
└── src/
    ├── app/              # Next.js App Router pages
    ├── components/       # React components by domain
    ├── content/          # MDX content
    ├── data/             # Static data files
    ├── lib/              # Business logic, calculations, types
    └── test/             # Test setup
```

### Routes (`src/app/`)

```
/                                         Homepage
/about                                    Profile, career timeline, stats, FAQ
/about/clients                            Client logos
/about/concerts                           Concert log
/ai-orchestration                         AI orchestration service page
/brand                                    Fire Horse 2026 brand guidelines
/contact                                  Contact form
/feature                                  Feature articles index
/feature/psylocke-timeline                 Kwannon timeline editorial + interactive
/downloads                                Digital products store (legacy flow — 4 products)
/downloads/success                        Post-purchase download page (purchases table)
/playbooks                                Playbook Library index (toggle: Playbooks | Interactive Tools)
/playbooks/b2b-marketing-framework        B2B marketing framework (prompt library + interactive)
/playbooks/gtm-budget-calculator          SaaS revenue calculator tool
/playbooks/hybrid-lead-scoring            Hybrid lead scoring tool
/playbooks/its-good-to-be-pitched         TV spot storyboard / creative production demo
/playbooks/roi-simulator                  Paid media ROI simulator tool
/playbooks/[id]                           Dynamic playbook pages (free + paid tiers)
/playbooks/[id]/success                   Route Handler — verifies Stripe session, sets dlx_ cookie, redirects
/case-studies                             Case Studies index (static B2B narratives)
/case-studies/10-touch-sales-play         Case study
/case-studies/120-day-content-journey     Case study
/case-studies/authority-engineering       Case study
/case-studies/dynamic-nurture             Case study
/case-studies/executive-dashboard         Case study
/case-studies/intent-data                 Case study
/case-studies/sovereign-personas          Case study
/case-studies/thought-leadership-development Case study
/signal-state                             Signal State framework overview
/signal-state/architecture
/signal-state/framework
/signal-state/signal-library
/signal-state/use-cases
/signal-state/use-cases/cybersecurity
/signal-state/use-cases/independent-creative
/signal-state/use-cases/org-alignment
/halcyon                                  (archived — not in primary nav)
/halcyon/content-matrix
/halcyon/faq
/halcyon/intent-matrix
/halcyon/lead-scoring
/halcyon/resume
```

### Components (`src/components/`)

| Directory | Purpose |
|---|---|
| `authority-engineering/` | Authority Engineering case study components |
| `behavioral-scoring/` | Lead scoring tool components |
| `calculator/` | GTM budget calculator components |
| `case-studies/` | Shared case study layout components |
| `comparison-table/` | Comparison table UI |
| `content-journey/` | 120-day content journey components |
| `feature/` | Feature section shared components (FeatureCard) |
| `feature/psylocke-timeline/` | Kwannon interactive timeline (9 components + data) |
| `framework/` | Framework page components |
| `golden-dashboard/` | Executive dashboard components |
| `halcyon/` | Halcyon workspace components (archived section) |
| `home/` | Homepage section components |
| `layout/` | Header, Footer, nav, providers |
| `marketing-framework/` | B2B marketing framework components |
| `portfolio/` | Portfolio grid and card components |
| `psylocke-timeline/` | (moved to `feature/psylocke-timeline/`) |
| `search/` | Search modal, provider, hotkey, boundary (8 files) |
| `seo/` | JsonLd and other SEO helpers |
| `signal-state/` | Signal State framework components |
| `sovereign-personas/` | Sovereign personas tool components |
| `storyboard/` | Storyboard case study components |
| `thought-leadership-development/` | TLD case study components |
| `tier-list/` | AI stack tier list (About page) |
| `ui/` | Shared primitives (navigation menu, etc.) |

### Libraries (`src/lib/`)

| File | Purpose |
|---|---|
| `feature.ts` | `FeatureArticle` type + `featureArticles` registry |
| `mega-menu-content.ts` | Nav mega menu structure and links |
| `playbooks.ts` | Playbooks data fetching and types (includes `paid?` field on `Playbook`) |
| `playbook-tiers.ts` | `PAID_TIERS` map of `playbook_id → { priceId, storageKey }` — add entries here to gate a playbook |
| `products.ts` | Legacy `/downloads` product config (price, items, filePath) |
| `stripe.ts` | Lazy Stripe singleton (`getStripe()`) |
| `portfolio-data.ts` | Portfolio item types |
| `psylocke-timeline.ts` | Comic issue data for the Kwannon timeline (internal to `feature/psylocke-timeline/` components) |
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

**New feature article:** Add entry to `featureArticles` in `src/lib/feature.ts` → create `src/app/feature/<slug>/page.tsx` (server component, metadata + JSON-LD) + `src/app/feature/<slug>/ArticleClient.tsx` (`"use client"` if interactive) → create `src/components/feature/<slug>/` if the article needs dedicated components → no mega menu entry needed (feature lives as editorial, not primary nav).

**Design system changes:** All in `src/app/globals.css` via `@theme inline` blocks (Tailwind v4 CSS-based config)

**New paid playbook:** Add entry to `PAID_TIERS` in `src/lib/playbook-tiers.ts` with `priceId` (Stripe Price ID) and `storageKey` (Supabase Storage path in `downloads` bucket) → add catalog entry to `playbook-prompts/prompt_catalog.json` → build landing page copy and buy button on the `/playbooks/[id]` page. The RSC gate reads `cookies().get('dlx_' + id)` and validates against the `entitlements` table.

**Adding searchable content:** New routes are indexed automatically at build time. Add `data-pagefind-ignore` to elements that should not be searched. Wrap section content with `<PagefindBoundary section="...">` to set group label. Halcyon and `/api/*` are excluded globally. Test locally with `npm run build && npm run start` (not `npm run dev` — index doesn't exist there).

## SEO & Redirects

### Canonical tag requirement

Every `page.tsx` that should be indexed **must** declare `alternates: { canonical: 'https://saren.ai/path' }` in its `metadata` export. Pages missing this will appear in Search Console as "Duplicate without user-selected canonical." Check any new routes before pushing.

Pages intentionally not indexed use `robots: { index: false, follow: false }` instead (e.g. `/downloads/success`, `/for/[slug]`, `/studio/*`).

### Redirect rules in `next.config.ts`

**Specific patterns must come before catch-alls.** Next.js evaluates redirects top-to-bottom and stops at the first match. If a catch-all like `/portfolio/:slug*` appears before a specific rule like `/portfolio/behavioral-lead-scoring`, the catch-all fires first and the specific rule is dead code.

Correct order:
1. Specific slugs (e.g. `/portfolio/behavioral-lead-scoring → /playbooks/hybrid-lead-scoring`)
2. Prefix-specific catch-alls (e.g. `/portfolio/b2b-marketing-framework/:slug*`)
3. General catch-alls (e.g. `/portfolio/:slug*`)

### Domain history: saren.ai was a Medium custom domain

Before the current Next.js site, `saren.ai` was the custom domain for a Medium publication. Google indexed Medium articles, tag pages (`/tag/*`, `/tagged/*`), and user paths (`/followers`, `/latest`) under this domain. Redirects for all known Medium URLs are in `next.config.ts`. Do not delete them — they carry residual link equity and removing them would re-open 404s that Search Console has now resolved.

### robots.txt

`public/robots.txt` disallows `/halcyon` and `/api`. The halcyon section is archived and must stay disallowed. Studio routes (`/studio/*`) are not in robots.txt but carry `noindex` in their metadata — that's intentional (noindex is sufficient; robots.txt would block Googlebot from seeing the noindex tag itself).

## IA Conventions

**Classification rule:** Interactive feature on the page OR paid download → `/playbooks/*`. Static narrative proof → `/case-studies/*`. Prompt library items → `/playbooks/*`.

- `/case-studies/*` — static B2B proof narratives (no interactive widgets). Pure case studies only.
- `/playbooks/*` — Playbook Library: prompt sequences, interactive tools, paid downloads. The index page has a toggle (Playbooks | Interactive Tools). Interactive tools live at `/playbooks/<tool-slug>/`. Paid playbooks gate content via HttpOnly cookie (`dlx_{id}`) validated against the `entitlements` table.
- `/feature/*` — editorial / personal projects (magazine-style articles). Not indexed in primary nav.
- `/signal-state/*` — Signal State framework workspace (in development).
- `/halcyon/*` — archived; do not link from primary nav. Routes still resolve.
- `/brand` — Fire Horse 2026 brand guideline page. `/about/brand` is deprecated and 301s to `/brand`.
- `/portfolio/*` — all old routes redirect via `next.config.ts`; do not create new content here.

## Repo Hygiene

Keep the repo clean so every Claude Code session starts with minimal noise.

### Root is sacred

Only config files (`next.config.ts`, `tsconfig.json`, `vercel.json`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`), `package.json`/`package-lock.json`, and project docs (`AGENTS.md`, `README.md`, `ROADMAP.md`) belong at root. Everything else goes in the right directory:

| What | Where |
|------|-------|
| One-off / utility scripts | `scripts/` |
| Build specs, briefs, guides, screenshots | `docs/` (archive in `docs/briefs/`) |
| Session changelogs | `docs/changelogs/` |
| Application code | `src/` |
| Static assets | `public/` |
| Sentry configs | Root (required by `@sentry/nextjs`) |

### File placement rules

- **Never leave stray scripts, images, or data files at root.** Move them immediately.
- **New scripts** → `scripts/`. Name descriptively (`sync-prompts.js`, not `fix.mjs`).
- **New docs/guides** → `docs/`. Build specs go in `docs/briefs/`.
- **New test files** → colocate with source (`src/lib/__tests__/`) or in `src/test/`.
- **Database files** (`.db`, `.db-shm`, `.db-wal`) are gitignored. Never commit them.
- **`.DS_Store`**, `.obsidian/`, editor configs (`.cursor`, `.idea`, `.vscode`) are gitignored.

### Before finishing a session

1. Run `npm run build` — nothing merges unless it compiles.
2. Check `git status` — no unintended files at root, no stray untracked artifacts.
3. If you created temporary files during debugging, clean them up.

### Gitignore principles

The `.gitignore` covers: dependencies, build output, env files, local databases, OS files, editor configs, and Obsidian vault configs. If a new category of generated/local file appears, add it to `.gitignore` rather than committing it.

## Deployment

### Vercel (Recommended)

- **Automatic:** Pushes to `main` branch on GitHub automatically trigger a Vercel deployment.
- **Manual (Avoid):** CLI deployment (`vercel deploy`) is **not recommended** due to file size limits with project assets. Always use the GitHub integration.
- **Region:** iad1 (US East)
- **Security headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- **Font caching:** immutable 1yr

## Search

Site-wide search uses Pagefind, generated at build time. The modal lives in `src/components/search/` and is triggered by Cmd+K or the header search button. The architecture supports a future "Ask" mode (Phase 2 — semantic search + chat via RAG); the mode switcher already exists as a disabled UI state. See `docs/search-phase-2.md`.
