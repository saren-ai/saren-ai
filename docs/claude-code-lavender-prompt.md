# Claude Code Prompt: Fire Horse 2026 Lavender Transition

Use this prompt verbatim when starting the CSS update session in Claude Code.

---

## PROMPT

You are updating the Saren.ai website (Next.js App Router, Tailwind v4, TypeScript) to implement the Fire Horse 2026 color transition. The full spec is in `DESIGN.md`. The transition guide is in `COLOR_TRANSITION_GUIDE.md`.

**One-sentence summary of the change:** Electric Blue (`#2F6D8E` / `#4A9FD8`) is being retired and replaced with Lavender (`#7C5AA3` light / `#B57EDC` dark) as the site's cool accent color. Ember Red is unchanged. Copper is unchanged.

---

### What is changing

| Retiring | Replacing with |
|----------|----------------|
| `--electric-blue` CSS variable | `--lavender` CSS variable |
| `#2F6D8E` (light) / `#4A9FD8` (dark) | `#7C5AA3` (light) / `#B57EDC` (dark) |
| `text-electric` / `bg-electric` | `text-lavender` / `bg-lavender` |
| `gradient-accent` (blue stops) | `gradient-accent` (lavender stops) |
| `text-gradient` (ember → copper) | `text-gradient` (ember → lavender) |
| `.btn-secondary-dark` as only dark secondary | Add new `.btn-lavender` variant |
| — | Add new `gradient-fire` (ember → lavender) |

---

### Step 1 — `src/app/globals.css`

This is the primary file. All design tokens live here. Make these exact changes:

**A. Replace the CSS variable in `:root, .light`:**
```css
/* REMOVE */
--electric-blue: #2F6D8E;

/* ADD */
--lavender: #7C5AA3;
```

**B. Replace the CSS variable in `.dark`:**
```css
/* REMOVE */
--electric-blue: #4A9FD8;

/* ADD */
--lavender: #B57EDC;
```

**C. In the `@theme inline` block, replace the color token:**
```css
/* REMOVE */
--color-electric: var(--electric-blue);

/* ADD */
--color-lavender: var(--lavender);
```

**D. Update `.gradient-accent`:**
```css
/* REMOVE */
.gradient-accent {
  background: linear-gradient(135deg, var(--electric-blue) 0%, #1D3557 100%);
}

/* REPLACE WITH */
.gradient-accent {
  background: linear-gradient(135deg, #7C5AA3 0%, #1D3557 100%);
}
.dark .gradient-accent {
  background: linear-gradient(135deg, #B57EDC 0%, #1A1F2E 100%);
}
```

**E. Update `.text-gradient` (ember → lavender, not ember → copper):**
```css
/* REMOVE */
.text-gradient {
  background: linear-gradient(90deg, var(--ember-red), var(--copper));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* REPLACE WITH */
.text-gradient {
  background: linear-gradient(90deg, var(--ember-red), var(--lavender));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**F. Add new `gradient-fire` class (after `.gradient-accent`):**
```css
.gradient-fire {
  background: linear-gradient(135deg, #C43322 0%, #7C5AA3 100%);
}
.dark .gradient-fire {
  background: linear-gradient(135deg, #E34234 0%, #B57EDC 100%);
}
```

**G. Add new `.btn-lavender` class (after `.btn-secondary-dark`):**
```css
.btn-lavender {
  background: transparent;
  color: var(--lavender);
  padding: 0.875rem 2rem;
  border: 2px solid var(--lavender);
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-lavender:hover {
  background: color-mix(in srgb, var(--lavender), transparent 90%);
  transform: translateY(-2px);
}
```

**H. Update `::selection` and `:focus-visible` (currently use electric blue):**
```css
/* REPLACE electric-blue references with lavender */
::selection {
  background: var(--lavender);
  color: var(--ash-white);
}
:focus-visible {
  outline: 2px solid var(--lavender);
  outline-offset: 2px;
}
```

**I. Update `.card:hover` border and shadow (currently electric-blue):**
```css
.card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 8px 32px rgba(123, 90, 163, 0.15); /* lavender shadow light */
  transform: translateY(-4px);
}
.dark .card:hover {
  box-shadow: 0 8px 32px rgba(181, 126, 220, 0.3); /* lavender shadow dark */
  border-color: #B57EDC;
}
```

Also update `--border-hover` in `:root, .light` and `.dark`:
```css
/* In :root, .light — REMOVE */
--border-hover: #457B9D;
/* ADD */
--border-hover: #7C5AA3;

/* In .dark — REMOVE */
--border-hover: #4A9FD8;
/* ADD */
--border-hover: #B57EDC;
```

**J. Update dark `.dark .text-*` overrides** — find any `color: #4A9FD8` override and change to `color: #B57EDC`. Find any `color: #2F6D8E` override and change to `#7C5AA3`.

---

### Step 2 — `.claude/rules/design-system.md`

This file is already updated. Do not modify it.

---

### Step 3 — Audit all component and page files

Search for every occurrence of these strings across `src/` and replace:

| Find | Replace with |
|------|-------------|
| `text-electric` | `text-lavender` |
| `bg-electric` | `bg-lavender` |
| `border-electric` | `border-lavender` |
| `from-electric` | `from-[#7C5AA3] dark:from-[#B57EDC]` |
| `to-electric` | `to-[#7C5AA3] dark:to-[#B57EDC]` |
| `#4A9FD8` | `#B57EDC` |
| `#2F6D8E` | `#7C5AA3` |
| `457B9D` (old border-hover) | `7C5AA3` |
| `electric-blue` (in comments) | `lavender` |

**Commands to find them:**
```bash
grep -r "text-electric\|bg-electric\|border-electric\|4A9FD8\|2F6D8E\|electric.blue\|electric_blue" src/ --include="*.tsx" --include="*.ts" --include="*.css" -l
```

For each file found, make the substitution. Check context — don't blindly replace if something is intentionally electric (there shouldn't be any, since it's retired).

---

### Step 4 — Signal-State palette

The Signal-State palette in globals.css (the `--ss-*` variables used in specific data components) uses a teal/purple/coral/amber color set. These are **not** the main brand palette and should **not** be changed. Leave `--ss-purple-*`, `--ss-teal-*`, `--ss-coral-*`, etc. exactly as they are.

---

### Step 5 — Gradient-dark stays unchanged

The `.gradient-dark` class uses navy/charcoal stops (`#1D3557` / `#1A1F2E`). Do not change these — they are structural backgrounds, not accent colors.

---

### Critical gotchas

1. **Gradient stops do not auto-remap.** Every gradient that uses lavender must have explicit `dark:` variants in TSX. Check that any component using `gradient-accent` in a `className` string also has the dark mode handled via the CSS class (the class itself now includes `.dark .gradient-accent` — so if you're using the class, not inline Tailwind, you're fine).

2. **Two different hex values for lavender.** Light mode = `#7C5AA3` (darker). Dark mode = `#B57EDC` (brighter). Never use dark mode hex on a light background or vice versa.

3. **`bg-lavender/10` opacity variants.** These work in both modes but verify visually. The light mode tint on ash white is subtle but readable.

4. **Do not touch Sentry config files, `next.config.ts`, `tsconfig.json`, or `vercel.json`.** Color changes are scoped to CSS and TSX className strings only.

---

### Step 6 — Verify

After all changes:

```bash
npm run build
```

Build must complete with zero errors. If there are TypeScript errors from color token changes, fix them — they'll be className string issues, not logic.

Then run:
```bash
npm run lint
```

Fix any lint issues before finishing.

---

### What NOT to change

- Ember Red tokens — unchanged
- Copper tokens — unchanged
- Charcoal / Ash / Slate / Obsidian — unchanged
- Signal-State palette (`--ss-*`) — unchanged
- `.gradient-dark` stops — unchanged
- Animation patterns — unchanged
- Typography — unchanged
- Spacing — unchanged
- All `.btn-primary` styles — unchanged
- All `.btn-secondary-dark` styles — unchanged (still used on gradient-dark sections)

---

### Definition of done

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] No `text-electric`, `bg-electric`, `#4A9FD8`, or `#2F6D8E` anywhere in `src/`
- [ ] `--lavender` defined in `:root` (light) and `.dark` with correct hex values
- [ ] `--color-lavender` in `@theme inline` block
- [ ] `.btn-lavender` class defined in globals.css
- [ ] `.gradient-fire` class defined
- [ ] `.text-gradient` updated to ember → lavender
- [ ] `.gradient-accent` updated with lavender stops + dark variant
- [ ] `border-hover` variable updated to lavender in both modes
- [ ] Card hover shadow updated to lavender rgba values
- [ ] `::selection` and `:focus-visible` use lavender
