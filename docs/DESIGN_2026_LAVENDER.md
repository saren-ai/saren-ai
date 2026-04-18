# DESIGN.md — Saren.ai (2026 Update)

**Fire Horse 2026** — Futuristic mid-century modern meets japonisme. Five colors. Two typefaces. Precision over decoration. Negative space earns its keep.

Saren.ai is the portfolio and consulting brand of a fractional CMO and AI strategist. The visual language draws from the 1950s Eames-era principle that form follows function, Japanese _ma_ (間) — the active emptiness between elements — and the cold precision of a command-line cursor. **2026 refresh:** lavender intellectual depth meets vermilion execution fire. Structured warmth, data made beautiful, restraint that signals confidence.

---

## Aesthetic Principles

**Ma (間) — Negative Space as Content**
Every layout must breathe. Whitespace is not empty — it is the pause before the insight. Do not fill; resist filling. Let one element dominate. Let the rest recede.

**Kintsugi Thinking**
The golden repair. Imperfection acknowledged, not hidden. Metrics show real numbers. Copper and lavender accent tones carry this: warm metallics and cool insight against obsidian.

**Mid-Century Geometry**
Circles. Half-circles. Diagonal rules at exactly 45°. Grids that are asymmetric by intention, not accident. Shapes drawn from atomic-age optimism — purposeful, iconic, immediately legible.

**Futurist Precision**
Monospaced data. Pixel-exact dividers. 1px rules at 20% opacity. Type set tight. Never decorative, never nostalgic alone — always pointing forward.

---

## Colors

**Five core colors. Use them in this order of hierarchy: Charcoal → Ash → Ember → Lavender → Copper.**

| Token              | Light mode  | Dark mode   | CSS class                             | Role                                      |
|--------------------|-------------|-------------|---------------------------------------|-------------------------------------------|
| **Ember Red**      | `#C43322`   | `#E34234`   | `text-ember` / `bg-ember`             | Primary action, accent, execution fire    |
| **Lavender**       | `#7C5AA3`   | `#B57EDC`   | `text-lavender` / `bg-lavender`       | Links, data highlights, insight           |
| **Charcoal**       | `#1D1D1F`   | `#F0F4FA`   | `text-charcoal` / `bg-charcoal`       | Dominant text, structural weight          |
| **Ash White**      | `#F5F5F7`   | `#0F0F0F`   | `text-ash` / `bg-ash`                 | Background, breathing room                |
| **Copper**         | `#C17D3A`   | `#D4A574`   | `text-copper` / `bg-copper`           | Secondary accent, kintsugi warmth         |
| **Slate**          | `#5B6470`   | `#A8B2BF`   | `text-slate`                         | Muted body text, metadata, labels         |
| **Obsidian**       | —           | `#0F0F0F`   | `bg-offblack`                        | Dark canvas, social media backgrounds     |

### New in 2026: Lavender Rationale

Lavender (#7C5AA3 light / #B57EDC dark) replaces Electric Blue. It signals:
- **Thinking & strategy** (intellectual depth)
- **Codification & frameworks** (structured insight)
- **Paired with Ember** (fire + reflection = execution grounded in strategy)

The light mode variant (#7C5AA3) is darker/richer than the dark mode #B57EDC to ensure WCAG AA contrast on white/light backgrounds. The dark mode version (#B57EDC) is brighter for visibility on dark canvases.

**Palette discipline:**
- Never use more than 3 colors in a single composition. Ember + Charcoal + Ash is the default trio; Lavender + Charcoal + Ash for strategy-forward content.
- Lavender and Copper should not appear together in text — they are alternates, not partners.
- Never use raw hex values in className. Always use token classes.
- Never use Tailwind's zinc-*, gray-*, blue-*, or slate-* utilities — use the tokens above.
- `bg-white` remaps to `#1A1A1A` in dark mode automatically — no dark: override needed.

**Contrast compliance (WCAG AA minimum):**
- `text-ember` on ash/white: 5.06:1 ✓
- `text-lavender` on ash/white: 4.8:1 ✓ (AA large, enhanced for reading)
- `text-lavender` on dark (#0F0F0F): 6.2:1 ✓ AAA
- `text-slate` on ash/white: 5.55:1 ✓
- `text-copper` large/bold only (≥18px or ≥14px bold): 3.8:1 ✓ large
- White on ember (btn-primary): 5.46:1 ✓
- White on lavender (btn-secondary): 5.1:1 ✓

> **Note:** Lavender as a *background* (e.g., `bg-lavender/10` or `bg-lavender/15`) with dark text maintains excellent contrast. Never use `bg-lavender` at full opacity as a text background.

---

## Gradients

Four named gradients, revised for 2026. Use them as defined — do not improvise.

### `gradient-dark`
```css
light: linear-gradient(135deg, #1D3557 0%, #212529 100%)
dark:  linear-gradient(135deg, #1A1F2E 0%, #0A0E14 100%)
```
Use for: hero sections, dark feature panels, full-bleed backgrounds. Always add `dark:` variant explicitly — gradient stops are not auto-remapped.

### `gradient-accent` (UPDATED for 2026)
```css
light: linear-gradient(135deg, #7C5AA3 0%, #1D3557 100%)
dark:  linear-gradient(135deg, #B57EDC 0%, #1A1F2E 100%)
```
Use for: feature callouts, data visualization backgrounds, highlighted stat cards. Lavender → charcoal, grounded and thinking-forward.

### `gradient-fire` (NEW for 2026)
```css
light: linear-gradient(135deg, #C43322 0%, #7C5AA3 100%)
dark:  linear-gradient(135deg, #E34234 0%, #B57EDC 100%)
```
Use for: hero display text, section eyebrows, strategic callouts. Ember → Lavender: execution meets insight.

### `text-gradient` (ember → lavender, updated)
```css
background: linear-gradient(90deg, var(--ember-red), var(--lavender))
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```
Use for: hero display text, section eyebrows, single words or short phrases only. Never full paragraphs. Fire and strategy in tandem.

### Social / Kintsugi gradient (dark mode only, updated)
```css
linear-gradient(135deg, #1A0A00 0%, #0F0F0F 60%, #1A1A2E 100%)
```
Use for: Instagram post backgrounds when a richer dark ground is needed. Shifts from ember-warmth to lavender-cool in the shadows.

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

| Role              | Weight | Size (desktop) | Notes                              |
|-------------------|--------|----------------|------------------------------------|
| Hero metric       | 700    | 3–5rem         | Paired with a small label below    |
| Inline data       | 700    | 1.25–2rem      | Ember or lavender color            |
| Code              | 400    | 0.875rem       | Never in body paragraphs           |
| Dashboard label   | 500    | 0.75rem        | Uppercase, slate color             |

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

Never mix rounded and sharp corners in the same component. Data panels are always sharp. Cards are always 8px. Buttons are always pill.

### Accent shapes (CSS/SVG decorative elements)

**Vertical ember rule** — section punctuation:
```css
width: 4px;
height: 40px;       /* or 240px on hero */
background: var(--ember-red);
border-radius: 2px;
```
Use as a vertical separator before section eyebrows, or as a standing accent in hero compositions.

**Lavender accent bar** (NEW for 2026) — strategy callout:
```css
width: 3px;
height: 40px–120px;
background: var(--lavender);
border-radius: 2px;
opacity: 0.8;
```
Use alongside text-lavender callouts to signal thinking/frameworks. Paired with ember bar for execution + strategy compositions.

**Thin horizontal divider** — the washi-paper line:
```css
height: 1px;
background: var(--foreground);
opacity: 0.15;
width: 100%;
```
Separates content zones without visual weight. Never use a full-opacity rule.

**Atomic circle** — mid-century accent:
```css
width: 80–240px;    /* scale to context */
height: same;
border-radius: 50%;
border: 2px solid var(--lavender);   /* outline only, never filled; updated for 2026 */
```
Outline only. Light mode uses #7C5AA3, dark mode uses #B57EDC. Can also use ember (#E34234) for fire-forward compositions.

---

## Components

All components follow the spacing system, typography rules, and color constraints above.

### Button

```
Primary (ember):
  background: #E34234 (dark mode) / #C43322 (light mode)
  color: #F0F4FA
  border-radius: 9999px
  padding: 12px 24px (md), 10px 20px (sm)
  font-weight: 600
  letter-spacing: 0.01em

Secondary (lavender, NEW):
  background: transparent
  border: 2px solid var(--lavender)
  color: var(--lavender)
  border-radius: 9999px
  padding: 10px 22px
  font-weight: 600
  
  &:hover { background: var(--lavender) / 10% }
  &:active { background: var(--lavender) / 20% }

Tertiary (slate):
  background: transparent
  color: var(--slate)
  border-radius: 9999px
  padding: 10px 20px
  font-weight: 600
  text-decoration: underline
  text-decoration-color: transparent
  
  &:hover { text-decoration-color: var(--slate) }
```

### Card

```
border-radius: 8px
background: transparent (light mode) / #1A1A1A (dark mode via auto remap)
border: 1px solid rgba(foreground, 0.1)
padding: 24px
```

Card titles are always `text-charcoal`, not colored. Use an accent bar (left edge, 3–4px) to signal color/intent (ember or lavender).

### Data metric

```
.metric-value    — JetBrains Mono, 700, 1.25–5rem, ember or lavender, line-height: 1
.metric-label    — Sora, 600, 0.75rem, uppercase, slate, letter-spacing: 0.08em
```

Metric + label are always stacked vertically. Label always below value, never above.

### Badge / tag

```
border-radius: 4px
font-size: 0.75rem
font-weight: 600
padding: 2px 8px
uppercase, letter-spacing: 0.06em
```

Use `bg-ember/10 text-ember`, `bg-lavender/10 text-lavender`, or `bg-electric/10 text-electric` for status colors. Never use raw background colors for badges.

### Divider

Use the 1px washi-paper line (`opacity: 0.15`) between sections. Never `<hr>` with default styling.

---

## Animations

Framer Motion for all transitions. CSS `.animate-fadeInUp` for static/no-JS fallback.

**In-viewport (most common):**
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
- Easing: ease-out default.
- Stagger: index × 0.05s for lists/grids.
- Never animate color, background, or shadow on scroll — only opacity/transform.
- `whileInView` always uses `viewport={{ once: true }}` — animations fire once.
- Never use `whileHover` for transform effects on cards (use CSS).

---

## Social Media Assets

### Canvas: 1080 × 1080px (Instagram Square / Carousel)

All social assets are dark-mode only. The Obsidian (#0F0F0F) or Kintsugi gradient is the default background.

#### Safe zone
Inset 96px from all four edges. Content lives within the resulting **888 × 888px** area. Nothing critical outside this zone.

#### Layout grid (Haiku asymmetric thirds)
```
Columns: 3 unequal — 200px | 48px (gutter) | 640px  (total: 888px)
   OR inverted:      640px | 48px          | 200px
Rows:    3 unequal — 160px | 48px (gutter) | 680px
```
Let one zone dominate. The gutter columns and rows are always empty — they are the _ma_.

#### Typography at 1080×1080

| Role             | Font             | Weight | Size         | Tracking    | Color            |
|------------------|------------------|--------|--------------|-------------|------------------|
| Hero metric      | JetBrains Mono   | 700    | 140–180px    | −0.02em     | `#E34234` ember  |
| Headline         | Sora             | 700    | 72–96px      | −0.03em     | `#F0F4FA` ash    |
| Subheadline      | Sora             | 400    | 36–44px      | −0.01em     | `#A8B2BF` slate  |
| Body copy        | Sora             | 400    | 28px         | 0           | `#A8B2BF` slate  |
| Eyebrow label    | Sora             | 600    | 20px         | +0.10em     | `#E34234` ember  |
| Accent label     | Sora             | 600    | 20px         | +0.10em     | `#B57EDC` lavender (NEW) |
| Caption / handle | Sora             | 400    | 20px         | 0           | `#5B6470` muted  |
| Data label       | JetBrains Mono   | 500    | 20px         | +0.06em     | `#D4A574` copper |

**Body copy maximum: 3 lines.** One idea per card. If you need more words, you need more cards.

#### Accent element (required on every card, UPDATED)
One of these — never both:
- **Vertical ember rule**: 4px × 160–240px, `#E34234`, positioned left of headline or top-left of content zone
- **Vertical lavender rule** (NEW): 3px × 160–240px, `#B57EDC`, positioned left for strategy/frameworks content
- **Horizontal ember rule**: 480px × 3px, `#E34234`, positioned under eyebrow label
- **Horizontal lavender rule** (NEW): 480px × 3px, `#B57EDC`, positioned under accent label for insight callouts

#### Background options
1. **Obsidian solid**: `#0F0F0F` — cleanest, most editorial
2. **Kintsugi gradient**: `linear-gradient(135deg, #1A0A00 0%, #0F0F0F 60%, #1A1A2E 100%)` — subtle warmth shifting to cool
3. **Dark gradient**: `linear-gradient(135deg, #1A1F2E 0%, #0A0E14 100%)` — blue-shifted for data content

Never use light backgrounds for social assets. Never use the gradient-accent at full saturation at this scale.

#### Composition patterns

**Data card** (metric-forward):
```
[eyebrow label — ember — top left]
[hero metric — JetBrains Mono — dominant, centered-left]
[small label below metric]
[vertical ember rule — left edge accent]
[@saren.ai — bottom right — muted]
```

**Strategy/Framework card** (lavender-forward, NEW):
```
[accent label — lavender — top left]
[headline — Sora 700 — 2–4 words, strategy-focused]
[subheadline — 1 line, explaining the framework]
[vertical lavender rule — left edge accent]
[@saren.ai — bottom right]
```

**Statement card** (copy-forward):
```
[vertical ember rule — left edge]
[headline — Sora 700 — 2–4 words max]
[subheadline — 1 line]
[empty lower third — negative space]
[@saren.ai — bottom right]
```

**Cover card** (carousel slide 1):
```
[full-bleed background — gradient dark]
[centered headline — Sora 700 — 3–5 words]
[horizontal ember rule — below headline]
[eyebrow label — above headline — ember]
[@saren.ai — bottom center]
```

---

### Carousel: 1080 × 1080px × N slides

Carousels have a consistent anatomy across slides.

| Slot             | Spec                                                        |
|------------------|-------------------------------------------------------------|
| **Top border**   | 4px × full width, `#E34234` ember — every content slide     |
| **Slide number** | JetBrains Mono, 400, 20px, slate — top right (`01 / 06`)   |
| **Content zone** | 888px wide safe zone, left-weighted haiku grid              |
| **Bottom strip** | 48px, `@saren.ai` handle right-aligned, muted               |

**Slide structure:**
- Slide 1 (Cover): No top border rule. Full hero treatment. Eyebrow + headline + horizontal ember rule + handle.
- Slides 2–N (Content): 4px ember top border. Slide number. Left-vertical ember or lavender rule (strategy slides). Headline + body (max 3 lines). Data callout if relevant.
- Last slide (CTA): Centered layout. Headline. Pill button (rendered as pill shape, `#C43322` fill, white text, OR lavender outline for secondary CTA). Handle. No top border.

**Visual continuity rules:**
- Same background across all slides in one carousel.
- Headline font size consistent across all content slides.
- Top border present on all slides except Cover and CTA.
- Use ember rule for execution/product content, lavender rule for strategy/framework content.

---

## Dark Mode

Dark mode is the canonical design. Light mode is the inversion.

- Default text on `#0F0F0F`: all tokens ≥ 7:1 AAA
- Flash prevention: inline script in `layout.tsx`
- `bg-white` auto-remaps to `#1A1A1A` in dark via global CSS override — no `dark:bg-*` needed for card backgrounds
- Gradient stops (`from-*`, `to-*`) are NOT auto-remapped — always add `dark:` variants for gradient sections
- globals.css `.dark .text-*` overrides use `!important` — do not remove them

### Lavender in dark/light modes

**Light mode:** Use `#7C5AA3` for `text-lavender`. This is darker/richer to maintain WCAG AA contrast (4.8:1) on light backgrounds.

**Dark mode:** Use `#B57EDC` for `text-lavender`. This is brighter to pop against dark canvases (6.2:1 on #0F0F0F).

Always test contrast in your specific context. If you're using `bg-lavender/10` or similar opacity backgrounds, the underlying foreground color changes the effective contrast.

---

## Do's and Don'ts

**DO:**
- Let negative space dominate. One focal element per composition.
- Use JetBrains Mono only for numbers and code.
- Apply `text-copper` only on large/bold text (≥18px regular, ≥14px bold).
- Use the vertical ember rule as a structural accent for execution content — it earns its place.
- Use the vertical lavender rule for strategy/framework content.
- Dark mode first, always — especially for social assets.
- Set `viewport={{ once: true }}` on every `whileInView` animation.
- Reach for Lucide icons at 1.5px stroke. Stay thin.
- Use asymmetric layouts — let one element dominate (60/30/10).
- Pair ember and lavender in gradient text for "fire + thinking" callouts.

**DON'T:**
- Mix Lavender and Copper as text colors in the same composition — they are alternates.
- Use more than 3 colors in a single composition.
- Invent new border radii — use the five defined: pill, 8px, 4px, 0px, circle.
- Add more than one accent shape type per component.
- Use emoji as icons.
- Animate color or background-color on scroll.
- Put more than one primary CTA on a page section.
- Put more than 3 lines of body copy on a social card.
- Use filled Lucide icon variants.
- Use centered-everything layouts — offset with intention.
- Use `!rounded-full` overrides on buttons.
- Add new localStorage keys without discussion.
- Use Electric Blue (#2F6D8E / #4A9FD8) — it's retired in 2026.

---

## 2026 Transition Checklist

- [ ] Update global CSS color tokens (charcoal, ash, ember, lavender, copper, slate)
- [ ] Replace `var(--electric-blue)` with `var(--lavender)` in all gradients
- [ ] Update button secondary variant to lavender outline + hover
- [ ] Refresh card accent bars: left edge, 3–4px, can be ember or lavender
- [ ] Update social media card templates in Figma/Canva with lavender accent options
- [ ] Audit all link colors: change from electric to lavender
- [ ] Test contrast ratios on live site in both dark and light mode
- [ ] Update hero gradient to `gradient-fire` (ember → lavender) where relevant
- [ ] Add lavender accent bar option to all social card types
- [ ] Retire any "electric blue" naming in comments/documentation

---

**Version:** 2026.1  
**Theme:** Fire Horse (Codification Year)  
**Colors:** Vermilion + Lavender  
**Accessibility:** WCAG AA (AAA in most dark mode scenarios)  
**Updated:** April 2026
