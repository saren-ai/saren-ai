# Color Transition Guide: Blue → Lavender (2026)

## Quick Hex Reference

| Token         | Old (Electric Blue)     | New (Lavender)          | CSS Class          |
|---------------|-----------------------|-----------------------|-------------------|
| Light mode    | `#2F6D8E`             | `#7C5AA3`              | `text-lavender`   |
| Dark mode     | `#4A9FD8`             | `#B57EDC`              | `text-lavender`   |
| Social media  | N/A (not used)        | `#B57EDC`              | Always dark mode  |

---

## Contrast Ratios (WCAG Compliance)

### Lavender text on backgrounds

| Scenario                                | Ratio | Standard | Status |
|-----------------------------------------|-------|----------|--------|
| `#7C5AA3` (light) on `#F5F5F7` (ash)   | 4.8:1 | AA large | ✓      |
| `#7C5AA3` (light) on `#FFFFFF` (white) | 4.4:1 | AA large | ✓      |
| `#B57EDC` (dark) on `#0F0F0F` (dark)   | 6.2:1 | AAA      | ✓      |
| `#B57EDC` (dark) on `#1A1A1A` (card)   | 5.8:1 | AAA      | ✓      |

> All combinations meet **WCAG AA minimum**. Most dark mode combinations hit **AAA**. Light mode is AA large (18px+), which is sufficient for links, callouts, and data highlights.

---

## Gradient Swap Checklist

### Locate & Replace

**In your CSS/Tailwind:**

```diff
- gradient-accent: linear-gradient(135deg, #2F6D8E 0%, #1D3557 100%)
+ gradient-accent: linear-gradient(135deg, #7C5AA3 0%, #1D3557 100%) [light mode]
+ gradient-accent: linear-gradient(135deg, #B57EDC 0%, #1A1F2E 100%) [dark mode]

- text-electric
+ text-lavender

- bg-electric
+ bg-lavender
```

**Gradients with dark mode variants:**
All gradients with color stops **must** include explicit `dark:` variants. You cannot rely on auto-remapping for gradient colors.

```tsx
// BEFORE
<div className="from-electric to-charcoal">

// AFTER
<div className="dark:from-[#B57EDC] dark:to-[#1A1F2E] from-[#7C5AA3] to-charcoal">
```

---

## Implementation Priority (Order of Execution)

### Phase 1: Foundation (Day 1)
- [ ] Update Tailwind color config: add `lavender` token
- [ ] Remove (or alias) `electric` token
- [ ] Update all `text-electric` → `text-lavender`
- [ ] Update all link colors globally
- [ ] Test in both light & dark modes

### Phase 2: Accent Elements (Day 2)
- [ ] Update gradients (`gradient-accent`, `gradient-fire`)
- [ ] Replace accent bar colors in cards (left edge 3px): can now be `text-lavender` or `text-ember`
- [ ] Update button secondary variant (lavender outline)
- [ ] Update data highlight colors in tables/charts

### Phase 3: Social Media Assets (Day 3)
- [ ] Update Figma/Canva templates
- [ ] Add lavender accent bar option to all card types
- [ ] Update social media gradient backgrounds (if using electric blue variant)
- [ ] Refresh any static Instagram/LinkedIn post designs

### Phase 4: Testing & QA (Day 4)
- [ ] Contrast ratio audit (use WebAIM checker)
- [ ] Light mode screenshot review
- [ ] Dark mode screenshot review
- [ ] Mobile responsiveness check
- [ ] Social media asset export test

---

## Specific Component Updates

### Links
```tsx
// BEFORE
<a className="text-electric hover:text-electric/80">

// AFTER
<a className="text-lavender hover:text-lavender/80">
```

### Buttons (Secondary variant — NEW)
```tsx
<button className="border-2 border-lavender text-lavender hover:bg-lavender/10 rounded-full">
  Secondary action
</button>
```

### Card accent bars
```tsx
// BEFORE (could only be ember)
<div className="absolute left-0 top-0 w-1 h-12 bg-ember" />

// AFTER (now either)
<div className="absolute left-0 top-0 w-1 h-12 bg-lavender" /> {/* strategy/insight content */}
<div className="absolute left-0 top-0 w-1 h-12 bg-ember" />   {/* execution/product content */}
```

### Data highlights in tables/charts
```tsx
// BEFORE
<span className="text-electric font-bold">92%</span>

// AFTER
<span className="text-lavender font-bold">92%</span>
```

### Social media eyebrow labels
```
// BEFORE
Eyebrow: Ember
Link color: Electric

// AFTER
Eyebrow: Ember (execution) OR Lavender (strategy/thinking)
Link color: Lavender (always)
Accent bar: Lavender for strategy content, Ember for execution content
```

---

## Accessibility Testing Commands

### Check contrast on live site

**Using WebAIM Contrast Checker:**
1. Input: `#7C5AA3` (lavender light)
2. Background: `#F5F5F7` (ash)
3. Result should show: **4.8:1 ✓**

**Using browser DevTools (Chrome/Firefox):**
- Inspect any link
- Check "Computed" tab
- Look for contrast ratio badge (should show green checkmark for AA+)

### Automated check (Lighthouse)
```bash
lighthouse https://saren.ai --view
# Check "Accessibility" report → contrast scores
```

---

## Dark Mode / Light Mode Gotchas

### Gotcha #1: Gradient colors don't auto-remap
```tsx
// ❌ WRONG — electric color bleeds through in dark mode
<div className="from-electric to-[#1D3557]">

// ✓ RIGHT — explicit dark: variant
<div className="from-[#7C5AA3] dark:from-[#B57EDC] to-[#1D3557] dark:to-[#1A1F2E]">
```

### Gotcha #2: Lavender on light backgrounds needs to be darker
Light mode lavender is `#7C5AA3` (darker, more saturated). Dark mode is `#B57EDC` (brighter). **Never swap them.**

### Gotcha #3: Opacity variants need dark mode checks
```tsx
// ❌ Risky — opacity might drop contrast in dark mode
<div className="bg-lavender/10">

// ✓ Test — verify the opacity ratio works on both modes
// bg-lavender/10 on #0F0F0F = still good
// bg-lavender/10 on #F5F5F7 = also good
```

---

## Color Psychology (Why Lavender?)

- **Thinking & Strategy:** Lavender = intellectual depth, contemplation
- **Execution:** Ember = fire, action, forward momentum
- **Paired:** Fire + Reflection = the codification theme of 2026
- **Contrast:** Purple + Red = dynamic, energetic, "both thinking and doing"

---

## Rollback Plan

If you need to revert (unlikely):
1. Update Tailwind config: swap lavender back to electric blue hex values
2. Run find/replace: `text-lavender` → `text-electric`
3. Revert gradient changes to original blue stops
4. Test in both modes

---

## Questions?

- **"Why `#7C5AA3` for light mode?"** — It's darker than dark mode's `#B57EDC` to maintain 4.8:1+ contrast on light backgrounds. If it were the same hex, it would drop to ~3.5:1 on white (fails AA).
- **"Can I use lavender as a background?"** — Yes, but only at low opacity (5–20%). Never full `bg-lavender`. Use `bg-lavender/10` for subtle backgrounds.
- **"What about the old Electric Blue references?"** — Search for `#2F6D8E`, `#4A9FD8`, `text-electric`, `bg-electric` and replace. If there are comments, update those too.
- **"Do I need to update social media post templates?"** — Yes, refresh them in Figma/Canva to reflect lavender as the cool accent. Old posts can stay as-is (they're on brand for their time).

---

**Date:** April 2026  
**Theme:** Fire Horse / Codification Year  
**Status:** Ready to implement
