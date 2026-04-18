# Design System — Fire Horse 2026

## Colors (use token classes, never raw hex)

Light-mode values meet WCAG AA. **Electric Blue is retired — use Lavender.**

| Token         | Light (AA-compliant) | Dark      | Contrast (light/bg)  | Classes                           |
|---------------|----------------------|-----------|----------------------|-----------------------------------|
| Ember Red     | #C43322              | #E34234   | 5.06:1 ✓ AA          | `text-ember` / `bg-ember`         |
| Lavender      | #7C5AA3              | #B57EDC   | 4.8:1 ✓ AA large     | `text-lavender` / `bg-lavender`   |
| Charcoal      | #1D1D1F              | #F0F4FA   | 15.6:1 ✓ AAA         | `text-charcoal` / `bg-charcoal`   |
| Ash White     | #F5F5F7              | #0F0F0F   | background           | `text-ash` / `bg-ash`             |
| Copper        | #C17D3A              | #D4A574   | 3.8:1 large text AA  | `text-copper` / `bg-copper`       |
| Slate Gray    | #5B6470              | #A8B2BF   | 5.55:1 ✓ AA          | `text-slate`                      |
| Off-black     | #1D1D1F              | #0F0F0F   | background           | `bg-offblack`                     |

**Contrast rules:**
- `text-ember` / `text-lavender` / `text-slate`: safe for large/bold text on bg-ash or bg-white
- `text-lavender` dark mode on `#0F0F0F`: 6.2:1 ✓ AAA
- `text-copper`: only safe for large/bold text (≥18px regular, ≥14px bold); do not use for small body copy
- `btn-primary` (white on ember): 5.46:1 ✓ AA
- Dark mode text on `#0F0F0F` bg: all tokens ≥ 7:1 AAA
- **NEVER** use `text-electric`, `bg-electric`, `#2F6D8E`, or `#4A9FD8` — Electric Blue is retired
- Never use zinc-*, gray-*, blue-*, or raw hex in className — use the token classes above

## Fonts
- **Sora** (`--font-sora`): headings (700), body (400)
- **JetBrains Mono** (`--font-jetbrains` / `font-mono`): metrics, data, code

## Key Utility Classes
`.section` `.container-narrow` `.btn-primary` `.btn-lavender` `.btn-secondary` `.btn-secondary-dark` `.card` `.metric-value` `.metric-label` `.gradient-dark` `.gradient-accent` `.gradient-fire` `.text-gradient` `.animate-fadeInUp` `.stagger-1…4`

## CTA Button Standard — ALL buttons are pills (border-radius: 9999px)

- **`.btn-primary`** — Ember Red bg, white text, pill. Use for all primary actions.
- **`.btn-lavender`** — Transparent bg, lavender border + text, pill. Secondary on dark or neutral bg. Hover: bg-lavender/10.
- **`.btn-secondary`** — Transparent bg, foreground border + text, pill. Theme-adaptive on light/neutral bg.
- **`.btn-secondary-dark`** — Transparent bg, ash/white border + white text, pill. On `gradient-dark` / `bg-charcoal`. Hover fills ash and flips text to charcoal.

**Rules:**
- Never use `!rounded-full` overrides.
- Never use inline Tailwind to replicate button styles.
- On dark sections: use `.btn-secondary-dark` or `.btn-lavender`, never `.btn-secondary`.
- Card accent bars can be ember (execution content) or lavender (strategy/framework content).

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
