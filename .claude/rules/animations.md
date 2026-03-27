# Animation Patterns (Framer Motion)

## In-viewport elements (most common)
Use `whileInView` with `viewport={{ once: true }}` so animations fire once on scroll:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.05 }}
>
```

## Hero / page-level elements
Use `animate` (not `whileInView`) for above-the-fold content that should animate on mount:

```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
```

## Stagger pattern
For lists/grids, multiply delay by index: `transition={{ delay: index * 0.05 }}`

## CSS animation classes
Available in globals.css: `.animate-fadeInUp` with `.stagger-1` through `.stagger-4`

## Drag & Drop (@dnd-kit) — tier list page only
- Collision: `pointerWithin` → `rectIntersection`
- Sensors: Pointer (8px activation), Touch (200ms delay), Keyboard
- Sortable within and across tier rows + unranked pool
- Do not use @dnd-kit outside the tier list feature
