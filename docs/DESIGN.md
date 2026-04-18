# DESIGN.md — Saren.ai

**Fire Horse 2026** — Futuristic mid-century modern meets japonisme. Five colors. Two typefaces. Precision over decoration. Negative space earns its keep.

Saren.ai is the portfolio and consulting brand of a fractional CMO and AI strategist. The visual language draws from the 1950s Eames-era principle that form follows function, Japanese _ma_ (間) — the active emptiness between elements — and the cold precision of a command-line cursor. Lavender intellectual depth meets vermilion execution fire. Structured warmth, data made beautiful, restraint that signals confidence.

---

## Aesthetic Principles

**Ma (間) — Negative Space as Content**
Every layout must breathe. Whitespace is not empty — it is the pause before the insight. Do not fill; resist filling. Let one element dominate. Let the rest recede.

**Kintsugi Thinking**
The golden repair. Imperfection acknowledged, not hidden. Metrics show real numbers. Copper and lavender carry this: warm metallics and cool insight against obsidian.

**Mid-Century Geometry**
Circles. Half-circles. Diagonal rules at exactly 45°. Grids that are asymmetric by intention, not accident. Shapes drawn from atomic-age optimism — purposeful, iconic, immediately legible.

**Futurist Precision**
Monospaced data. Pixel-exact dividers. 1px rules at 20% opacity. Type set tight. Never decorative, never nostalgic alone — always pointing forward.

---

## Colors

Five core colors. Use them in this order of hierarchy: Charcoal → Ash → Ember → Lavender → Copper.

| Token              | Light mode  | Dark mode   | CSS class                             | Role                                      |
|--------------------|-------------|-------------|---------------------------------------|-------------------------------------------|
| **Ember Red**      | `#C43322`   | `#E34234`   | `text-ember` / `bg-ember`             | Primary action, accent, execution fire    |
| **Lavender**       | `#7C5AA3`   | `#B57EDC`   | `text-lavender` / `bg-lavender`       | Links, data highlights, insight           |
| **Charcoal**       | `#1D1D1F`   | `#F0F4FA`   | `text-charcoal` / `bg-charcoal`       | Dominant text, structural weight          |
| **Ash White**      | `#F5F5F7`   | `#0F0F0F`   | `text-ash` / `bg-ash`                 | Background, breathing room                |
| **Copper**         | `#C17D3A`   | `#D4A574`   | `text-copper` / `bg-copper`           | Secondary accent, kintsugi warmth         |
| **Slate**          | `#5B6470`   | `#A8B2BF`   | `text-slate`                          | Muted body text, metadata, labels         |
| **Obsidian**       | —           | `#0F0F0F`   | `bg-offblack`                         | Dark canvas, social media backgrounds     |

### Lavender Rationale

Lavender (`#7C5AA3` light / `#B57EDC` dark) replaces Electric Blue. It signals thinking and strategy (intellectual depth), codification and frameworks (structured insight), and paired with Ember creates fire + reflection — execution grounded in strategy.

The light mode variant (`#7C5AA3`) is darker/richer than the dark mode `#B57EDC` to ensure WCAG AA contrast on light backgrounds.

**Palette discipline:**
- Never use more than 3 colors in a single composition. Ember + Charcoal + Ash is the default trio; Lavender + Charcoal + Ash for strategy-forward content.
- Lavender and Copper should not appear together as text colors — they are alternates, not partners.
- Never use raw hex values in className. Always use token classes.
- Never use Tailwind's zinc-*, gray-*, blue-*, or slate-* utilities — use the tokens above.
- Electric Blue (`#2F6D8E` / `#4A9FD8`, `text-electric`) is retired. Do not use it.
- `bg-white` remaps to `#1A1A1A` in dark mode automatically — no `dark:bg-*` needed for card backgrounds.

**Contrast compliance (WCAG AA minimum):**
- `text-ember` on ash/white: 5.06:1 ✓ AA
- `text-lavender` on ash/white: 4.8:1 ✓ AA large
- `text-lavender` on `#0F0F0F` dark: 6.2:1 ✓ AAA
- `text-lavender` on `#1A1A1A` card: 5.8:1 ✓ AAA
- `text-slate` on ash/white: 5.55:1 ✓ AA
- `text-copper` large/bold only (≥18px regular, ≥14px bold): 3.8:1 ✓ large
- White on ember (btn-primary): 5.46:1 ✓ AA

> Lavender as a background: only at low opacity (`bg-lavender/10` to `bg-lavender/15`). Never `bg-lavender` at full opacity as a text background.

---

## Gradients

Four named gradients. Use them as defined — do not improvise.

### `gradient-dark`
```css
light: linear-gradient(135deg, #1D3557 0%, #212529 100%)
dark:  linear-gradient(135deg, #1A1F2E 0%, #0A0E14 100%)
```
Use for: hero sections, dark feature panels, full-bleed backgrounds. Always add `dark:` variant explicitly — gradient stops are not auto-remapped.

### `gradient-accent`
```css
light: linear-gradient(135deg, #7C5AA3 0%, #1D3557 100%)
dark:  linear-gradient(135deg, #B57EDC 0%, #1A1F2E 100%)
```
Use for: feature callouts, data visualization backgrounds, highlighted stat cards. Lavender → charcoal, grounded and thinking-forward.

### `gradient-fire`
```css
light: linear-gradient(135deg, #C43322 0%, #7C5AA3 100%)
dark:  linear-gradient(135deg, #E34234 0%, #B57EDC 100%)
```
Use for: hero display text, section eyebrows, strategic callouts. Ember → Lavender: execution meets insight.

### `text-gradient` (ember → lavender)
```css
background: linear-gradient(90deg, var(--ember-red), var(--lavender))
-webkit-background-clip: text
-webkit-text-fill-color: transparent
background-clip: text
```
Use for: hero display text, section eyebrows, single words or short phrases only. Never full paragraphs.

### Social / Kintsugi gradient (dark mode only)
```css
linear-gradient(135deg, #1A0A00 0%, #0F0F0F 60%, #1A1A2E 100%)
```
Use for: Instagram post backgrounds. Ember-warm to lavender-cool in the shadows.

---

## Typography

Two typefaces. No exceptions.

### Sora — Display & Body
Used for everything except data/metrics.

| Role              | Weight | Size (desktop) | Size (mobile) | Tracking     | Line height |
|-------------------|--------|----------------|---------------|--------------|-------------|
| Hero display      | 700    | 4–6rem         | 2.5–3.5rem    | −0.03em      | 1.05        |
| Section heading   | 700    | 2–3rem         | 1.5–2rem      | −0.02em      | 1.1         |
| Subheading        | 600    | 1.25–1.5rem    | 1.125rem      | −0.01em      | 1.3         |
| Body              | 400    | 1rem           | 1rem          | +0.01em      | 1.6         |
| Label / eyebrow   | 600    | 0.75rem        | 0.75rem       | +0.08em      | 1.4         |
| Caption           | 400    | 0.875rem       | 0.875rem      | 0            | 1.5         |

Eyebrow labels are UPPERCASE with `letter-spacing: 0.08em`. Use sparingly — one per section.

### JetBrains Mono — Data & Metrics
Used exclusively for numbers, percentages, code, and data callouts.

| Role              | Weight | Size (desktop) | Notes                                |
|-------------------|--------|----------------|--------------------------------------|
| Hero metric       | 700    | 3–5rem         | Paired with a small label below      |
| Inline data       | 700    | 1.25–2rem      | Ember or lavender color              |
| Code              | 400    | 0.875rem       | Never in body paragraphs             |
| Dashboard label   | 500    | 0.75rem        | Uppercase, slate color               |

**Rules:**
- Never mix Sora and JetBrains Mono in the same text node.
- JetBrains Mono is reserved for numbers, percentages, and code — not for decorative use.
- Letter-spacing on headings is always negative (tight). Letter-spacing on labels is always positive (open).

---

## Spacing

Base unit: **4px**. All spacing is a multiple of 4.

| Token   | Value  | Use                                       |
|---------|--------|-------------------------------------------|
| `xs`    | 4px    | Icon gaps, tight inline spacing           |
| `sm`    | 8px    | Component internals, badge padding        |
| `md`    | 16px   | Card padding, list item gaps              |
| `lg`    | 24px   | Section subcomponent spacing              |
| `xl`    | 32px   | Between cards in a grid                   |
| `2xl`   | 48px   | Section internal breathing room           |
| `3xl`   | 64px   | Section vertical padding (mobile)         |
| `4xl`   | 96px   | Section vertical padding (desktop)        |
| `5xl`   | 128px  | Hero vertical padding                     |

**Layout pattern:**
```tsx
<section className="section">        // 96px vertical padding
  <div className="container-narrow"> // max-width: 1200px, 24px side padding
    …
  </div>
</section>
```

---

## Shapes & Geometry

The mid-century modernist vocabulary meets Japanese reduction. Use these forms — do not invent new ones.

### Border radius system

| Context            | Radius         | Token          |
|--------------------|----------------|----------------|
| Buttons            | 9999px (pill)  | Always pill    |
| Cards              | 8px            | `rounded-lg`   |
| Badges / tags      | 4px            | `rounded`      |
| Data panels        | 0px (sharp)    | `rounded-none` |
| Modal / sheet      | 12px           | `rounded-xl`   |
| Avatar / icon wrap | 9999px (circle)| `rounded-full` |

Never mix rounded and sharp corners in the same component.

### Accent shapes

**Vertical ember rule** — execution content:
```css
width: 4px; height: 40px; /* or 240px on hero */
background: var(--ember-red); border-radius: 2px;
```

**Vertical lavender rule** — strategy/framework content:
```css
width: 3px; height: 40px–120px;
background: var(--lavender); border-radius: 2px; opacity: 0.8;
```
Use alongside `text-lavender` callouts to signal thinking and frameworks. Can be paired with an ember bar for execution + strategy compositions.

**Thin horizontal divider** — the washi-paper line:
```css
height: 1px; background: var(--foreground); opacity: 0.15; width: 100%;
```

**Atomic circle** — mid-century accent:
```css
width: 80–240px; height: same; border-radius: 50%;
border: 2px solid var(--lavender); /* or var(--ember-red) for fire-forward */
opacity: 0.15–0.3; /* always recessive */
```
Outline only. Never filled.

**45° diagonal slash** — futurist geometry:
```css
transform: rotate(45deg);
width: 2px; height: 60–120px;
background: var(--copper); opacity: 0.2;
```
Rare. One per composition maximum.

### Composition rules (Haiku grid)

Divide any layout into asymmetric thirds: 60% dominant / 30% support / 10% negative space. This applies to cards, hero sections, and social assets. Never centered-everything.

**Forbidden:** accent shapes at opacity > 0.4 · more than one accent shape type per component · borders used as decoration

---

## Components

### Button

All buttons are pills (border-radius: 9999px). Never override.

```
.btn-primary       — Ember Red bg, white text. All primary actions.
.btn-lavender      — Transparent bg, lavender border + text. Secondary on dark or neutral bg.
                     Hover: bg-lavender/10
.btn-secondary     — Transparent bg, foreground border + text. Theme-adaptive on light bg.
.btn-secondary-dark — Transparent bg, ash border + white text. On gradient-dark/bg-charcoal.
                      Hover: fills ash, text flips to charcoal.
```

Rules: Never `!rounded-full` overrides. Never inline Tailwind to replicate button styles. On dark sections: use `.btn-secondary-dark` or `.btn-lavender`, never `.btn-secondary`.

### Card

```css
background: var(--card-bg)   /* #FFFFFF light / #1A1A1A dark */
border: 1px solid var(--border)
border-radius: 8px
```

Card accent bar (left edge, 3–4px wide):
- Ember bar: execution/product/campaign content
- Lavender bar: strategy/framework/insight content

Card padding: always `p-6` (24px) or `p-8` (32px). Never `p-4`.

### Metric display

```css
.metric-value  — JetBrains Mono, 700, 2.5rem+, ember or lavender
.metric-label  — Sora, 600, 0.75rem, uppercase, slate, letter-spacing: 0.08em
```

Metric + label always stacked vertically. Label always below, never above.

### Badge / tag

```
border-radius: 4px · font-size: 0.75rem · font-weight: 600
padding: 2px 8px · uppercase · letter-spacing: 0.06em
```

Use `bg-ember/10 text-ember` or `bg-lavender/10 text-lavender` for status. Never solid brand colors as badge backgrounds.

### Divider

Use the washi-paper line (`opacity: 0.15`). Never `<hr>` with default styling.

---

## Animations

Framer Motion for all transitions. CSS `.animate-fadeInUp` for static fallback.

**In-viewport:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.05 }}
>
```

**Hero / above fold:**
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
```

**Rules:**
- Duration: 0.4–0.6s. Never > 0.8s.
- Stagger: index × 0.05s for lists/grids.
- Never animate color, background, or shadow on scroll — only opacity/transform.
- `whileInView` always uses `viewport={{ once: true }}`.
- Never use `whileHover` for transform effects on cards (use CSS).

---

## Social Media Assets

### Canvas: 1080 × 1080px (Instagram Square / Carousel)

All social assets are dark-mode only. Obsidian or Kintsugi gradient background.

#### Safe zone
96px inset from all edges → **888 × 888px** content area.

#### Layout grid (Haiku asymmetric thirds)
```
Columns: 200px | 48px gap | 640px  (or inverted)
Rows:    160px | 48px gap | 680px
```

#### Typography at 1080×1080

| Role             | Font             | Weight | Size         | Color              |
|------------------|------------------|--------|--------------|--------------------|
| Hero metric      | JetBrains Mono   | 700    | 140–180px    | `#E34234` ember    |
| Headline         | Sora             | 700    | 72–96px      | `#F0F4FA` ash      |
| Subheadline      | Sora             | 400    | 36–44px      | `#A8B2BF` slate    |
| Body copy        | Sora             | 400    | 28px         | `#A8B2BF` slate    |
| Eyebrow (exec)   | Sora             | 600    | 20px         | `#E34234` ember    |
| Eyebrow (strategy)| Sora            | 600    | 20px         | `#B57EDC` lavender |
| Caption / handle | Sora             | 400    | 20px         | `#5B6470` muted    |
| Data label       | JetBrains Mono   | 500    | 20px         | `#D4A574` copper   |

Body copy maximum: 3 lines. One idea per card.

#### Accent element (required, one per card)
- **Vertical ember rule**: 4px × 160–240px, `#E34234` — execution/data content
- **Vertical lavender rule**: 3px × 160–240px, `#B57EDC` — strategy/framework content
- **Horizontal ember rule**: 480px × 3px — under eyebrow on cover/statement cards
- **Horizontal lavender rule**: 480px × 3px — under lavender eyebrow on insight cards

#### Background options
1. **Obsidian solid**: `#0F0F0F` — cleanest, most editorial
2. **Kintsugi gradient**: `linear-gradient(135deg, #1A0A00 0%, #0F0F0F 60%, #1A1A2E 100%)` — ember-warm to lavender-cool
3. **Dark gradient**: `linear-gradient(135deg, #1A1F2E 0%, #0A0E14 100%)` — for data content

Never use light backgrounds for social assets.

#### Composition patterns

**Data card** (metric-forward):
```
[eyebrow — ember — top left]
[hero metric — JetBrains Mono — dominant]
[label below metric]
[vertical ember rule — left edge]
[@saren.ai — bottom right]
```

**Strategy card** (lavender-forward):
```
[eyebrow — lavender — top left]
[headline — Sora 700 — 2–4 words]
[subheadline — 1 line]
[vertical lavender rule — left edge]
[@saren.ai — bottom right]
```

**Statement card** (copy-forward):
```
[vertical ember rule — left edge]
[headline — Sora 700 — 2–4 words]
[subheadline — 1 line]
[empty lower third — negative space / ma]
[@saren.ai — bottom right]
```

**Cover card** (carousel slide 1):
```
[full-bleed dark gradient background]
[eyebrow — above headline — ember]
[centered headline — Sora 700 — 3–5 words]
[horizontal ember rule — below headline]
[@saren.ai — bottom center]
```

---

### Carousel: 1080 × 1080px × N slides

| Slot             | Spec                                                                        |
|------------------|-----------------------------------------------------------------------------|
| **Top border**   | 4px × full width, `#E34234` ember — every content slide                     |
| **Slide number** | JetBrains Mono, 400, 20px, slate — top right (`01 / 06`)                   |
| **Content zone** | 888px wide safe zone, left-weighted haiku grid                              |
| **Bottom strip** | 48px, `@saren.ai` handle right-aligned, muted                               |

**Slide structure:**
- Slide 1 (Cover): No top border. Hero treatment. Eyebrow + headline + horizontal ember rule + handle.
- Slides 2–N (Content): 4px ember top border. Slide number. Left ember rule (execution) or lavender rule (strategy). Headline + body (max 3 lines).
- Last slide (CTA): No top border. Centered. Pill button: ember fill primary or lavender outline secondary. Handle.

**Continuity rules:** Same background all slides. Consistent headline size per deck. Ember rule for execution content, lavender rule for strategy content.

---

## Dark Mode

Dark mode is the canonical design. Light mode is the inversion.

- Default text on `#0F0F0F`: all tokens ≥ 7:1 AAA
- Flash prevention: inline script in `layout.tsx`
- `bg-white` auto-remaps to `#1A1A1A` in dark — no `dark:bg-*` needed for cards
- Gradient stops are NOT auto-remapped — always add `dark:` variants for gradient sections
- globals.css `.dark .text-*` overrides use `!important` — do not remove them

**Lavender in dark/light:**
- Light mode: `#7C5AA3` — darker/richer for 4.8:1 on light bg
- Dark mode: `#B57EDC` — brighter for 6.2:1 on dark bg
- Never swap them. Never use the dark hex on light bg or vice versa.

---

## Do's and Don'ts

**DO:**
- Let negative space dominate. One focal element per composition.
- Use JetBrains Mono only for numbers and code.
- Apply `text-copper` only on large/bold text (≥18px regular, ≥14px bold).
- Use ember rule for execution content, lavender rule for strategy content.
- Pair ember and lavender in `text-gradient` for "fire + thinking" callouts.
- Dark mode first, always.
- Set `viewport={{ once: true }}` on every `whileInView` animation.
- Lucide icons at 1.5px stroke. Stay thin.
- Asymmetric layouts — 60/30/10.

**DON'T:**
- Use Electric Blue (`text-electric`, `bg-electric`, `#2F6D8E`, `#4A9FD8`) — it is retired.
- Mix Lavender and Copper as text colors in the same composition.
- Use more than 3 colors in a single composition.
- Invent new border radii — five defined values only: pill, 8px, 4px, 0px, circle.
- Add more than one accent shape type per component.
- Use emoji as icons.
- Animate color or background-color on scroll.
- Put more than one primary CTA on a page section.
- Put more than 3 lines of body copy on a social card.
- Use filled Lucide icon variants.
- Use centered-everything layouts.
- Use `!rounded-full` overrides on buttons.
- Add new localStorage keys without discussion.
- Install new dependencies without discussion.

---

**Version:** 2026.1 — Fire Horse (Codification Year)
**Colors:** Vermilion + Lavender
**Accessibility:** WCAG AA (AAA in most dark mode scenarios)
