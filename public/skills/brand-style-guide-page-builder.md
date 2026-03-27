---
description: Generate a comprehensive, living brand style guide page that audits the codebase and documents every design standard with live rendered examples and programmatic WCAG contrast audits.
---

# Brand Style Guide Page Builder

Before building, audit these files to extract the current design system truth:
- The main CSS file (globals.css, tailwind config, or equivalent) for all design tokens, utility classes, and dark mode overrides
- The root layout file for fonts and metadata
- Any design system documentation files (.claude/rules/, style guides, etc.)

Create a new page at /brand that serves as the living brand style guide. The page should include these sections, each with **live rendered examples** and the class name / token to use:

## 1. Color Palette

Render every design token as swatches showing light and dark mode values, hex codes, CSS variable names, and utility class names. Compute and display WCAG contrast ratios against the primary background.

## 2. Typography

Show each typeface with full character specimens. Render live examples of every heading level (h1-h4), body, small, and mono text at their actual sizes/weights. Document font-size, font-weight, line-height, and letter-spacing. Pull actual values from the CSS — don't invent sizes.

## 3. Accessibility & Contrast Audit

For every text color + background color combination on the site:
- Compute WCAG 2.1 contrast ratios programmatically using the relative luminance algorithm
- Render a matrix showing every foreground/background pair in both light and dark mode
- Mark each cell: AAA (>=7:1), AA (>=4.5:1), AA Large (>=3:1), or FAIL
- Use green/blue/yellow/red visual indicators
- Flag known problem areas (warm accents on light backgrounds, text on gradients, muted text)
- Include a "Minimum Standards" reference box:
  - Body text: minimum AA (4.5:1)
  - Large text (>=18px / >=14px bold): minimum AA Large (3:1)
  - Interactive elements: minimum AA (4.5:1)
  - Non-text contrast: minimum 3:1
  - Aspirational: AAA (7:1)

## 4. Standardized Elements

Audit the codebase to catalog recurring patterns. Document each with a live example:
- Page margins and spacing rhythm (alignment between nav, hero, content)
- Section/container layout
- Hero section patterns
- Breadcrumbs
- Card styles and variants
- Metric displays
- Gradient backgrounds

## 5. Buttons

Render live examples of every button variant in default, hover, and disabled states. Document when to use each. Include contrast ratios for text vs. background.

## 6. Taxonomy

Catalog the site's content hierarchy: page categories, naming conventions, navigation structure.

## 7. Iconography

Document the icon library, all icons currently in use (grep for imports), sizing conventions, and usage patterns.

## 8. Animation Patterns

Document standard animation patterns: scroll-triggered, mount animations, stagger delays, and CSS animation classes.

The page itself should use the site's own design system (standard layout, dark mode, animations). Add it to the navigation. Run a production build when done.
