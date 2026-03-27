# Design System — Fire Horse 2026

## Colors (use token classes, never raw hex)

Light-mode values were darkened in March 2026 for WCAG AA compliance. Dark-mode values are unchanged.

| Token         | Light (AA-compliant) | Dark      | Contrast (light/bg) | Classes                         |
|---------------|----------------------|-----------|---------------------|---------------------------------|
| Ember Red     | #C43322              | #E34234   | 5.06:1 ✓ AA         | `text-ember` / `bg-ember`       |
| Charcoal      | #1D1D1F              | #F0F4FA   | 15.6:1 ✓ AAA        | `text-charcoal` / `bg-charcoal` |
| Ash White     | #F5F5F7              | #0F0F0F   | background          | `text-ash` / `bg-ash`           |
| Electric Blue | #2F6D8E              | #4A9FD8   | 5.26:1 ✓ AA         | `text-electric` / `bg-electric` |
| Copper        | #C17D3A              | #D4A574   | 3.8:1 large text AA | `text-copper` / `bg-copper`     |
| Slate Gray    | #5B6470              | #A8B2BF   | 5.55:1 ✓ AA         | `text-slate`                    |
| Off-black     | #1D1D1F              | #0F0F0F   | background          | `bg-offblack`                   |

**Contrast rules:**
- `text-ember` / `text-electric` / `text-slate`: safe for all text sizes on bg-ash or bg-white
- `text-copper`: only safe for large/bold text (≥18px regular, ≥14px bold); do not use for small body copy
- `btn-primary` (white on ember): 5.46:1 ✓ AA
- Dark mode text on `#0F0F0F` bg: all tokens ≥ 7:1 AAA
- Never use zinc-*, gray-*, blue-*, or raw hex in className — use the token classes above

## Fonts
- **Sora** (`--font-sora`): headings (700), body (400)
- **JetBrains Mono** (`--font-jetbrains` / `font-mono`): metrics, data, code

## Key Utility Classes
`.section` `.container-narrow` `.btn-primary` `.btn-secondary` `.card` `.metric-value` `.metric-label` `.gradient-dark` `.gradient-accent` `.text-gradient` `.animate-fadeInUp` `.stagger-1…4`

## Layout Pattern
Always wrap page content in: `<section className="section"><div className="container-narrow">…</div></section>`

## Dark Mode
- `ThemeProvider` context → `ThemeToggle` in header → `localStorage("theme")`
- Fallback: `prefers-color-scheme`
- Flash prevention via inline script in `layout.tsx`
- Target WCAG AA (achieved); AAA on charcoal/slate text
- globals.css contains `.dark .text-*` overrides with `!important` — these control dark mode text color, not the CSS variables. Do not remove them.
- `bg-white` automatically remaps to `--card-bg` (#1A1A1A) in dark mode via global override — no need to add `dark:bg-*` for white card backgrounds
- Gradient stops (`from-*`, `to-*`) are NOT remapped by the global override — always add explicit `dark:` variants for gradient backgrounds

## Images
- AVIF + WebP enabled in next.config.ts
- `fill` mode requires a `relative` parent with explicit dimensions
- Profile images: 1080x1920
- AI logos: 64x64 PNG
- All images via `<Image>` from next/image

## Config Location
All design system changes go in `src/app/globals.css` via `@theme inline` blocks (Tailwind v4 CSS-based config — no tailwind.config.js).
