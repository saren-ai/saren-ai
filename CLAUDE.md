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

## Rules

- **Always `"use client"`** unless the component is purely layout/metadata
- **Always `<Image>` from next/image** — never raw `<img>`
- **Path alias**: `@/*` → `./src/*`
- **No new dependencies** without discussion — keep the bundle lean
- **No external carousel/slider libs** — use framer-motion + React state
- **No external state libs** — React hooks + Context only
- **localStorage keys**: `"theme"` (dark mode), `"saren-tier-list-votes"` (tier list)
- Run `npm run build` to verify changes compile before finishing

## Design System — Fire Horse 2026

### Colors (CSS vars + Tailwind classes)

| Token | Light | Dark | Class prefix |
|-------|-------|------|-------------|
| Ember Red | `#E34234` | same | `text-ember` / `bg-ember` |
| Charcoal | `#1D3557` | `#FFF` | `text-charcoal` / `bg-charcoal` |
| Ash White | `#F1FAEE` | `#0A0E14` | `text-ash` / `bg-ash` |
| Electric Blue | `#457B9D` | `#4A9FD8` | `text-electric` / `bg-electric` |
| Copper | `#C17D3A` | `#D4A574` | `text-copper` / `bg-copper` |
| Slate Gray | `#6C757D` | `#B0B8C4` | `text-slate` |
| Off-black | `#212529` | `#0A0E14` | `bg-offblack` |

### Fonts

- **Sora** (`--font-sora`): headings (700), body (400)
- **JetBrains Mono** (`--font-jetbrains` / `font-mono`): metrics, data, code

### Key Classes

`.section` `.container-narrow` `.btn-primary` `.btn-secondary` `.card` `.metric-value` `.metric-label` `.gradient-dark` `.gradient-accent` `.text-gradient` `.animate-fadeInUp` `.stagger-1…4`

### Dark Mode

`ThemeProvider` context → `ThemeToggle` in header → `localStorage("theme")` → fallback `prefers-color-scheme`. Flash prevention via inline script in `layout.tsx`. WCAG AAA contrast.

## Patterns

### Standard animation (framer-motion)

```tsx
// In-viewport elements
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>

// Hero / page-level (use animate, not whileInView)
<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
```

### Layout wrapper

```tsx
<section className="section"><div className="container-narrow">…</div></section>
```

### Images

AVIF + WebP enabled. `fill` mode requires `relative` parent with explicit dimensions. Profile images: 1080x1920. AI logos: 64x64 PNG.

### Drag & Drop (@dnd-kit) — tier list only

`pointerWithin` → `rectIntersection` collision. Sensors: Pointer (8px), Touch (200ms delay), Keyboard. Sortable within/across tier rows + unranked pool.

## Project Map

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
/portfolio/golden-dashboard    Full-funnel attribution
/portfolio/sovereign-personas  Committee buying personas
/portfolio/10-touch-sales-play          Case study
/portfolio/120-day-content-journey      Case study
/portfolio/b2b-marketing-framework      Case study
/portfolio/behavioral-lead-scoring      Case study
/portfolio/its-good-to-be-pitched       Case study (storyboard)
```

### Components (`src/components/`)

`calculator/` (11) · `tier-list/` (6) · `golden-dashboard/` (8) · `behavioral-scoring/` (4) · `content-journey/` (3) · `sovereign-personas/` (3) · `storyboard/` (4) · `marketing-framework/` (1) · `layout/` (7: Header, Footer, TopBanner, ThemeProvider, ThemeToggle, MegaMenu) · `portfolio/` (2) · `ui/` (2: FAQ, ProfileGallery)

### Data (`src/lib/`)

`calculator/{types,funnel-calculations,conversion-rates,benchmark-data}.ts` · `tier-list.ts` (AI_TOOLS, TIER_CONFIG, SAREN_PICKS, votes) · `golden-dashboard.ts` (computeModel, presets, metricMetadata) · `behavioral-scoring.ts` · `content-journey.ts` · `sovereign-personas.ts` · `storyboard.ts` · `marketing-framework.ts` · `mega-menu-content.ts` · `substack-rss.ts` · `thinking.ts`

### Assets (`public/`)

`logos/ai-apps/` (15 tool logos 64x64) · `logos/clients/` (26 brand logos) · `portfolio/personas/` (PDFs + thumbnails) · `portfolio/storyboards/` (7 frames) · `profile/` (7 images 1080x1920) · `og-image.png`

### Key Config Files

`src/app/layout.tsx` (root layout) · `src/app/globals.css` (design system) · `next.config.ts` · `tsconfig.json` · `vercel.json`

## Common Tasks

**New page:** Create `src/app/route/page.tsx` → `"use client"` if interactive → `.section > .container-narrow` layout → framer-motion animations → add to mega menu (`src/lib/mega-menu-content.ts`)

**New tier list tool:** Add to `AI_TOOLS[]` in `src/lib/tier-list.ts` → 64x64 PNG in `public/logos/ai-apps/` → add ID to `SAREN_PICKS` → add to `stackCategories` in `src/app/about/stack/page.tsx`

**New case study:** Create `src/app/portfolio/slug/page.tsx` → components in `src/components/slug/` → data in `src/lib/slug.ts` → add to portfolio grid → add to mega menu

**Design system changes:** All in `src/app/globals.css` via `@theme inline` blocks (Tailwind v4 CSS-based config)

## Deployment

Vercel · Region: iad1 (US East) · Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` · Font caching: immutable 1yr
