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
/playbooks                                Playbooks index
/playbooks/b2b-marketing-framework        B2B marketing framework playbook
/playbooks/[id]                           Dynamic playbook pages (free + paid tiers)
/playbooks/[id]/success                   Route Handler — verifies Stripe session, sets dlx_ cookie, redirects
/portfolio                                Portfolio grid (proof-of-work only)
/portfolio/10-touch-sales-play            Case study
/portfolio/120-day-content-journey        Case study
/portfolio/authority-engineering          Case study
/portfolio/behavioral-lead-scoring        Case study
/portfolio/dynamic-nurture                Case study
/portfolio/executive-dashboard            Case study
/portfolio/gtm-budget-calculator          Tool
/portfolio/intent-data                    Case study
/portfolio/its-good-to-be-pitched         Storyboard
/portfolio/roi-simulator                  Tool
/portfolio/sovereign-personas             Tool
/portfolio/thought-leadership-development Case study
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

**New portfolio case study:** Use `/project:new-case-study <slug>` command. `/portfolio/*` is for proof-of-work only — paid client deliverables and capability-demonstrating tools.

**New feature article:** Add entry to `featureArticles` in `src/lib/feature.ts` → create `src/app/feature/<slug>/page.tsx` (server component, metadata + JSON-LD) + `src/app/feature/<slug>/ArticleClient.tsx` (`"use client"` if interactive) → create `src/components/feature/<slug>/` if the article needs dedicated components → no mega menu entry needed (feature lives as editorial, not primary nav).

**Design system changes:** All in `src/app/globals.css` via `@theme inline` blocks (Tailwind v4 CSS-based config)

**New paid playbook:** Add entry to `PAID_TIERS` in `src/lib/playbook-tiers.ts` with `priceId` (Stripe Price ID) and `storageKey` (Supabase Storage path in `downloads` bucket) → add catalog entry to `playbook-prompts/prompt_catalog.json` → build landing page copy and buy button on the `/playbooks/[id]` page. The RSC gate reads `cookies().get('dlx_' + id)` and validates against the `entitlements` table.

**Adding searchable content:** New routes are indexed automatically at build time. Add `data-pagefind-ignore` to elements that should not be searched. Wrap section content with `<PagefindBoundary section="...">` to set group label. Halcyon and `/api/*` are excluded globally. Test locally with `npm run build && npm run start` (not `npm run dev` — index doesn't exist there).

## IA Conventions

- `/portfolio/*` — proof-of-work case studies and interactive tools demonstrating capability for paying clients. Do not add personal or editorial content here.
- `/playbooks/*` — structured, reusable artifacts (frameworks, templates, prompt sequences). Playbooks with a `paid` tier gate their content server-side via HttpOnly cookie (`dlx_{id}`) validated against the `entitlements` table. Free playbooks are unchanged.
- `/feature/*` — editorial / personal projects (magazine-style articles). Not indexed in primary nav.
- `/signal-state/*` — Signal State framework workspace (in development).
- `/halcyon/*` — archived; do not link from primary nav. Routes still resolve.
- `/brand` — Fire Horse 2026 brand guideline page. `/about/brand` is deprecated and 301s to `/brand`.

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
