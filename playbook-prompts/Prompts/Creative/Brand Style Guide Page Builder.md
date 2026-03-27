# Brand Style Guide Page Builder

Generate a comprehensive, living brand style guide page for a Next.js site using its own design system. The prompt audits the actual codebase to extract the source of truth, then builds a self-documenting reference with live rendered examples.

---

## The Prompt

Create a new page at /brand (src/app/brand/page.tsx) that serves as the living brand style guide for the site. This page should be a comprehensive, visual reference that documents every design standard in the system.

Before building, audit these files to extract the current truth:
- src/app/globals.css (all @theme inline blocks, utility classes, dark mode overrides)
- src/app/layout.tsx (fonts, metadata)
- .claude/rules/design-system.md
- .claude/rules/animations.md
- .claude/rules/code-style.md

The page should include these sections, each with live rendered examples + the class name / token to use:

### 1. Color Palette

Render every design token as swatches showing light and dark mode values, hex codes, CSS variable names, and Tailwind class names. Note contrast ratios and WCAG compliance level for each.

### 2. Typography

Show each typeface. Render live examples of h1, h2, h3, h4, body, small, and mono text at their actual sizes/weights. Document the font-size, font-weight, line-height, and letter-spacing for each level. Pull actual values from globals.css — don't invent sizes.

### 3. Accessibility & Contrast Audit

This section is critical. For every text color + background color combination that exists or could exist on the site:
- Compute the WCAG 2.1 contrast ratio programmatically (don't hardcode — calculate from the actual hex values)
- Render a matrix/table showing every foreground/background pair in both light and dark mode
- Mark each cell as: AAA (>=7:1), AA (>=4.5:1), AA Large (>=3:1), or FAIL
- Use green/yellow/red visual indicators so problems are immediately obvious
- Specifically flag known problem areas:
  - Any text colors that barely pass (e.g., warm accent colors on light backgrounds)
  - Any text on gradient backgrounds — test against the darkest and lightest stops
  - Subtle/muted text on both light and dark backgrounds
  - Interactive element states: button text on hover backgrounds, link colors, focus ring contrast
- Include a "Minimum Standards" box at the top of this section that states the rules:
  - Body text (any size): minimum AA (4.5:1)
  - Large text (>=18px regular / >=14px bold): minimum AA Large (3:1), target AA (4.5:1)
  - Interactive elements (buttons, links, form controls): minimum AA (4.5:1)
  - Non-text contrast (borders, icons, focus indicators): minimum 3:1 against adjacent colors
  - Target: WCAG AAA (7:1) wherever possible
- If any current combination FAILS or only barely passes AA, note it as a violation with a recommended fix

### 4. Standardized Elements

Audit every page in src/app/ to catalog recurring patterns, then document each with a live example:
- Page margins and spacing rhythm (the alignment system between nav, hero, and content sections)
- Section/container layout (.section + .container-narrow)
- Hero sections (document the standard hero layout: heading, subtext, CTA placement)
- Breadcrumbs (find the canonical pattern)
- Card styles (.card class + any variants)
- Box borders, border-radius, shadows
- Metric displays (.metric-value, .metric-label)
- Gradient backgrounds (.gradient-dark, .gradient-accent)

### 5. Buttons

Render live examples of every button variant. Show each in default, hover, and disabled states. Document when to use each variant. Include contrast ratios for button text vs. background in every state.

### 6. Taxonomy

Catalog the site's content hierarchy and naming conventions:
- Page categories
- How case studies are structured and named
- Tag/label patterns used across the site
- Navigation structure (mega menu items)

### 7. Iconography

Document:
- The icon library in use
- All icons currently in use across the site (grep for imports)
- Icon sizing conventions (px/class)
- When icons are used vs. not

### 8. Animation Patterns

Document the standard animation patterns:
- Scroll-triggered animations (whileInView)
- Mount animations for above-fold content
- Stagger delays
- CSS animation classes

The page itself should use the site's own design system (standard layout classes, dark mode support, animations). Add it to the navigation under a logical location. Run a production build when done.

---

## Why This Works

- **Audit-first approach**: The prompt forces Claude to read the actual source files before building anything, so the guide reflects reality rather than assumptions.
- **Programmatic contrast ratios**: The WCAG calculations are computed from real hex values using the relative luminance algorithm — not hardcoded numbers that go stale.
- **Self-documenting**: Because the page uses the design system it documents, any drift between the guide and the actual system is immediately visible.
- **Living reference**: The page renders live components (buttons, cards, animations) rather than screenshots, so it always shows current behavior.

## Adapt It

Replace the file paths and design tokens with your own project's equivalents. The structure works for any component-based frontend with a CSS design system. The accessibility audit section is universally applicable.
