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

## Theme System (Light + Dark)

Both modes are live and togglable.

**How it works:**
- `ThemeProvider` reads `localStorage("theme")` on mount, falls back to `prefers-color-scheme`
- `ThemeToggle` in the header (desktop + mobile) writes the preference back to localStorage
- Flash-prevention inline script in `layout.tsx` applies the correct class before first paint — no FOUC
- `html.dark` drives dark mode; no class = light mode

**CSS architecture:**
- `:root, .light { ... }` in `globals.css` defines light mode variables (default)
- `.dark { ... }` overrides to dark values — all semantic tokens (`--background`, `--foreground`, `--card-bg`, etc.) flip automatically
- `color-scheme: light` on `html` root; `html.dark` sets `color-scheme: dark`

### CRITICAL: Tailwind v4 dark-variant binding

`globals.css` contains this directive at the top:
```css
@custom-variant dark (&:where(.dark, .dark *));
```

**Why:** Tailwind v4 defaults the `dark:` variant to the `prefers-color-scheme: dark` media query. Our theme system uses an `html.dark` class. Without this directive, `dark:text-*` / `dark:bg-*` utilities apply based on the OS preference — but the CSS variables flip based on the `.dark` class. When those two disagree (e.g., user is on macOS dark mode but selected "light" in our toggle), Tailwind picks dark-mode utility values while CSS variables resolve to light-mode values, producing invisible text (light-on-light) or other broken contrast. **Do not remove this directive.**

### Semantic tokens registered in `@theme inline`

These produce Tailwind utility classes that auto-flip with the `.dark` class:

| Token | Light | Dark | Utilities |
|---|---|---|---|
| `--color-foreground` | `#1D1D1F` | `#F5F5F7` | `text-foreground`, `bg-foreground` |
| `--color-foreground-muted` | `#5B6470` | `#A1A1AA` | `text-foreground-muted` |
| `--color-background` | `#F5F5F7` | `#0F0F0F` | `bg-background` |
| `--color-border` | `#D2D2D7` | `#333` | `border-border` |
| `--color-card` | `#FFFFFF` | `#1A1A1A` | `bg-card` |
| `--color-linkedin` | `#0077B5` | (same) | `bg-linkedin`, `text-linkedin`, `border-linkedin` (no flip — third-party brand color) |

### Tailwind v4 gotcha: opacity modifiers + var() tokens

`bg-card/85` works ONLY when `--color-card` is registered in `@theme inline`. If a token is missing from `@theme inline`, the class compiles to nothing (no warning, no error — just silently absent from the generated CSS). The next utility class in the cascade wins, which can produce wildly wrong colors. **Symptom:** the wrong-mode background renders. **Fix:** verify the token exists in `@theme inline`.

When you add a new token to `@theme inline`, **clear the Next.js cache** (`rm -rf .next && npm run dev`) — Turbopack caches the compiled CSS independently and will not pick up new tokens via HMR.

### Authoring rules

- Use semantic token classes (`text-charcoal`, `bg-ash`, `text-slate`, `text-foreground`, `bg-card`, `border-border`) so they flip automatically in dark mode
- globals.css contains `.dark .text-*` overrides with `!important` — these control dark mode text color. Do not remove them.
- `bg-white` automatically remaps to `--card-bg` (#1A1A1A) in dark mode via global override — no need to add `dark:bg-*` for white card backgrounds
- Gradient stops (`from-*`, `to-*`) are NOT remapped by the global override — always add explicit `dark:` variants for gradient backgrounds
- On dark-only sections (e.g., `gradient-dark`): use `.btn-secondary-dark` or `.btn-lavender`, not `.btn-secondary`
- **Never hardcode hex in `className`.** Use semantic tokens. Browser-chrome dots (macOS traffic lights) and WCAG-utility colors are the only sanctioned exceptions.
- For SVG `fill`/`stroke`/`stopColor` attributes, hex is acceptable (Tailwind tokens don't apply to SVG attribute syntax).

### Perception vs. measured contrast

Sora at `font-medium` (500) reads thinner than the measured contrast suggests. For nav and other small UI text on light backgrounds, prefer `font-semibold` (600) — same color, but the heavier strokes restore perceived contrast. Dark backgrounds are more forgiving; `font-medium` works fine there. The pattern `font-semibold dark:font-medium` is used in the global nav.

**Target:** WCAG AA in both modes (achieved); AAA on charcoal/slate text

## Images
- AVIF + WebP enabled in next.config.ts
- `fill` mode requires a `relative` parent with explicit dimensions
- Profile images: 1080x1920
- AI logos: 64x64 PNG
- All images via `<Image>` from next/image

## Config Location
All design system changes go in `src/app/globals.css` via `@theme inline` blocks (Tailwind v4 CSS-based config — no tailwind.config.js).
