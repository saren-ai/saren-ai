# CLAUDE.md — Saren.ai

Portfolio + consulting site for Saren Sakurai (fractional CMO / AI ops consultant). Next.js App Router, TypeScript, Tailwind v4, Framer Motion. Deployed on Vercel.

**Live:** https://saren.ai | **Dev:** `npm run dev` → localhost:3000

## Commands

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build (run before deploying)
npm run lint     # ESLint
```

## Tech Stack

Next.js 16.1 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-based config, no tailwind.config.js) · Framer Motion 12 · @dnd-kit (tier list only) · Lucide React icons · MDX for content · No external carousel/state libs

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
/                              Homepage
/about                         Profile gallery, career timeline, stats, FAQ
/about/clients                 Client logos
/about/stack                   AI stack tier list + categories
/contact                       Contact form
/thinking                      Micro-blog + RSS
/portfolio                     Portfolio grid
/portfolio/calculator          SaaS revenue calculator
/portfolio/roi-simulator       Full-funnel attribution (ROI Simulator)
/portfolio/sovereign-personas  Committee buying personas
/portfolio/10-touch-sales-play          Case study
/portfolio/120-day-content-journey      Case study
/portfolio/b2b-marketing-framework      Case study
/portfolio/behavioral-lead-scoring      Case study
/portfolio/its-good-to-be-pitched       Case study (storyboard)
/demand-machine                        Overview (Vertical Blades)
/demand-machine/interview              Diagnostic Interview
```

### Key Config Files

`src/app/layout.tsx` (root layout) · `src/app/globals.css` (design system) · `next.config.ts` · `tsconfig.json` · `vercel.json`

## Common Tasks

**New page:** Create `src/app/route/page.tsx` → `"use client"` if interactive → `.section > .container-narrow` layout → framer-motion animations → add to mega menu (`src/lib/mega-menu-content.ts`)

**New tier list tool:** Add to `AI_TOOLS[]` in `src/lib/tier-list.ts` → 64x64 PNG in `public/logos/ai-apps/` → add ID to `SAREN_PICKS` → add to `stackCategories` in `src/app/about/stack/page.tsx`

**New case study:** Use `/project:new-case-study <slug>` command

**Design system changes:** All in `src/app/globals.css` via `@theme inline` blocks (Tailwind v4 CSS-based config)

## Repo Hygiene

Keep the repo clean so every Claude Code session starts with minimal noise.

### Root is sacred

Only config files (`next.config.ts`, `tsconfig.json`, `vercel.json`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`), `package.json`/`package-lock.json`, and project docs (`CLAUDE.md`, `README.md`, `ROADMAP.md`) belong at root. Everything else goes in the right directory:

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
