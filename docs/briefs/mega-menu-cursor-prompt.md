# Cursor Prompt: Implement Mega Menu Navigation System

## Objective
Replace the current global navigation with a mega menu system that provides significantly more real estate for content, particularly for the growing portfolio section.

---

## Core Concept

Transform the top navigation into a system where hovering over main nav items triggers full-width dropdown "drawers" that slide down from the header. These drawers should feel spacious, organized, and provide room for both navigation links and promotional content.

---

## Visual & Layout Requirements

### Dropdown Panel Structure
- **Full-width container** that spans the viewport width
- **Inner content area** that's centered and follows the site's max-width constraint (likely max-w-7xl)
- **3-column grid layout:**
  - **Left two columns (2/3 width):** Primary navigation content (links, portfolio items, service descriptions, etc.)
  - **Right column (1/3 width):** Promotional/featured content box with image support

### The Promotional Box
- Should accept an image (can be decorative, featured work, headshot, case study preview, etc.)
- Include headline text
- Include supporting copy (2-3 lines)
- Optional CTA button or link
- Visually distinct from the nav links (subtle background color, border, or card styling)

---

## Interaction Behavior

### Trigger
- Hover over main navigation items opens the corresponding mega menu
- Each nav item can have its own unique mega menu content, or some items can remain simple links

### Opening
- Smooth slide-down animation (Framer Motion preferred)
- Should feel immediate but not jarring (~200-300ms)
- Consider a subtle fade-in combined with the slide

### Closing
- Mouse leaving the entire navigation + dropdown area should close it
- Add a small delay (~100-150ms) before closing to prevent accidental dismissal when moving the mouse
- Should animate out smoothly

### States
- Only one mega menu open at a time (opening a new one closes the previous)
- Active/hover states on nav items should be clear
- Maintain accessibility for keyboard navigation

---

## Styling Direction

### The Dropdown Panel
- Clean white or very light background
- Strong shadow to lift it off the page (`shadow-xl` or similar)
- Generous padding (probably `p-8` to `p-12`)
- Subtle top border or separator from the header

### Content Within
- Left columns: Clean, scannable link lists or grid of items
- Links should have clear hover states
- Consider grouping with subtle headings if categories make sense
- Right promotional box: Card-like appearance, slightly different background (e.g., `bg-gray-50`), rounded corners, contained padding

### Typography
- Nav links: Medium weight, good contrast
- Promotional box headline: Larger, bold
- Promotional box description: Smaller, muted color

---

## Content Strategy

### Portfolio Mega Menu (primary use case)
- Left two columns: Display portfolio entries, grouped by type/category if relevant (e.g., "Revenue Systems," "GTM Architecture," "Buyer Intelligence")
- Right promotional box: Feature a recent or standout project with visual + short description + "View All Work" CTA

### Other Nav Items
- Decide which other nav items (Services, About, etc.) should get mega menus vs. staying as simple links
- If a nav item doesn't need expanded content, keep it as a standard link—no dropdown needed

---

## Technical Considerations

### Component Architecture
- Build this as a reusable system—a nav item should be able to declare whether it has a mega menu and pass in the content
- Keep the mega menu content definition separate from the navigation logic (easier to update content)

### Animation
- Use Framer Motion for smooth, controlled animations
- Consider `AnimatePresence` for proper exit animations
- Stagger animations for content within the mega menu if it feels right (links fade in slightly after panel)

### Responsive Behavior
- On mobile/tablet, this should collapse to a standard mobile menu (hamburger)
- Mega menus don't make sense on small screens—fall back to accordion or simple vertical list

### Performance
- Don't render all mega menu content on page load if it's heavy
- Consider lazy-loading images in the promotional boxes

---

## Accessibility

- Full keyboard navigation support (tab through links, escape to close)
- Proper ARIA attributes (`aria-expanded`, `aria-controls`, etc.)
- Focus management when opening/closing
- Consider adding `onFocus`/`onBlur` handlers in addition to hover for keyboard users

---

## Examples of What This Enables

### Portfolio dropdown
- Show 8-12 portfolio pieces in a clean grid (left columns)
- Feature your latest or most impressive case study in the promo box (right column)
- Include a "View All Portfolio" link at the bottom

### Services dropdown (if applicable)
- List your service offerings in left columns
- Use promo box to highlight a testimonial, recent win, or "Book a Call" CTA with your headshot

### About dropdown (optional)
- Quick links to credentials, case studies, resume/LinkedIn
- Promo box: Headshot + tagline + CTA to contact

---

## Final Notes

This isn't about cramming more stuff into the nav—it's about creating breathing room and making high-value content more discoverable. The promotional box is a chance to guide visitors toward your best work or most relevant CTAs without cluttering the primary nav.

The mega menu should feel like a natural extension of the site's design language—spacious, confident, and information-dense without being overwhelming.

---

## Implementation Preference

Build the system to be flexible so you can easily add/remove mega menus from nav items and update the content without touching the core navigation logic.

---

## Tech Stack Context
- Framework: Next.js 14+ (App Router) with React and TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- Hosting: Vercel (deployed from GitHub)
