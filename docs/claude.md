# Saren.ai Website Project Memory

**Repository**: https://github.com/saren-ai/saren-ai  
**Tech Stack**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion, TypeScript  
**Deployment**: Vercel (connected to GitHub main branch)  
**Purpose**: Portfolio website for Saren — fractional CMO and AI operations consultant

## Project Overview

This is a modern, interactive portfolio website built with a "Fire Horse 2026" aesthetic—bold, high-contrast, AI-native design. The site features:

- **Interactive portfolio pieces**: Golden Dashboard (funnel simulator), 120-Day Content Journey (buyer journey matrix), B2B Marketing Framework (7-layer explorer)
- **Dark/light mode**: Theme persistence with localStorage
- **SEO optimized**: Proper metadata, sitemap, FAQ schema
- **Responsive design**: Mobile-first with breakpoints
- **Build in Public banner**: Links to `/about/stack` showing marketing/tech tools

Key architectural decisions:
- Component-driven with client/server separation (`"use client"` for interactivity)
- Data-driven design (all interactive components use typed data models from `/lib`)
- Reusable components (`FAQ`, `Tooltip`, `MetricCard`, etc.)
- Fire Horse 2026 color palette via CSS variables for theme switching

---

# 2026-02-03 - B2B Marketing Framework Portfolio Page

## Summary
Created a comprehensive new portfolio page showcasing the 7-layer, 21-prompt B2B Marketing Framework from GitHub. Built an interactive LayerExplorer component that visualizes the sequential nature of the framework (L1 foundations → L7 measurement). Integrated the page into homepage portfolio grid, sitemap, and cross-portfolio navigation.

## Key Decisions/Changes
- **Interactive L1→L7 explorer**: Horizontal stepper on desktop (pills with expandable panels), vertical accordion on mobile
- **Data-driven architecture**: Created typed data model with all 21 prompts, GitHub deep links, and metadata in `@src/lib/marketing-framework.ts`
- **Layer nomenclature upgrade**: Used friendlier display names (e.g., "Foundations" instead of "Foundational Elements") while preserving GitHub folder names
- **Direct GitHub integration**: All prompt tiles and layer panels link to specific folders in the GitHub repo
- **7 FAQ questions with FAQPage schema**: Proper JSON-LD for Google rich snippets
- **Portfolio cross-linking**: Added "Explore More Work" sections to improve discoverability

## Files Modified
- `@src/app/portfolio/b2b-marketing-framework/page.tsx` (created)
- `@src/components/marketing-framework/LayerExplorer.tsx` (created)
- `@src/lib/marketing-framework.ts` (created)
- `@src/app/sitemap.ts` (added new route)
- `@src/components/portfolio/PortfolioGrid.tsx` (added framework card)
- `@src/app/portfolio/golden-dashboard/page.tsx` (updated cross-links)

## TODO / Next Steps
- [ ] Consider adding analytics tracking to GitHub link clicks (to measure engagement with framework)
- [ ] Potential: Add "Fork this framework" CTA with instructions for customizing the prompts
- [ ] Future: Create visual flowchart of layer dependencies (L1→L2→L3...) as an SVG or Mermaid diagram
- [ ] Monitor: Check Google Search Console for FAQ rich snippets appearing in search results
- [ ] Content: Consider adding testimonials from teams who've used the framework

---

# 2026-02-03 - Sovereign Personas Interactive Gallery

## Summary
Transformed the Sovereign Personas page from a static placeholder into a fully interactive portfolio showcase with 3-card persona gallery, hover states, messaging implications drawers, and comprehensive FAQ. Integrated user-provided 1920x1080 thumbnails and built responsive components that work across desktop/tablet/mobile. The page now demonstrates strategic persona methodology for sovereign infrastructure deals.

## Key Decisions/Changes
- **Interactive persona cards with hover overlays**: Desktop hover reveals mandate and primary risks; mobile users can tap "Messaging Implications" button
- **PersonaDrawer component**: Side drawer shows full messaging strategy—altitude, trust signals, dismissals, best content types, and anti-patterns
- **Three personas with complete data**: Minister (political sponsor), Architect (technical authority), Sovereign Cloud Chief (operator)—each with mandate, risks, trusts, dismisses, messaging altitude, best content, and anti-patterns
- **Next.js Image optimization**: User provided 1920x1080 PNGs; Next.js handles responsive sizing and optimization automatically
- **New page sections**: "The Sovereign Buying System" explainer, "How These Personas Get Used" with 5 use cases, 7-question FAQ with FAQPage schema
- **PDF linking**: All cards link to existing persona PDFs in `/public/portfolio/personas/` with both "Open PDF" primary CTA and "Download" option in drawer

## Files Modified
- `@src/lib/sovereign-personas.ts` (created) - Data model with PersonaCard type and full content for 3 personas
- `@src/components/sovereign-personas/PersonaCard.tsx` (created) - Card with thumbnail, hover overlay, and dual CTAs
- `@src/components/sovereign-personas/PersonaDrawer.tsx` (created) - Full-screen side drawer with messaging strategy details
- `@src/components/sovereign-personas/PersonaGallery.tsx` (created) - State orchestrator for gallery + drawer
- `@src/app/portfolio/sovereign-personas/page.tsx` (redesigned) - Complete page overhaul with hero, system explainer, gallery, use cases, FAQ
- `@public/portfolio/personas/thumbnails/` (added 3 images) - minister-al-rashid.png, dr-wei-chen.png, sovereign-cloud-chief.png

## TODO / Next Steps
- [ ] Consider adding video testimonials from sovereign infrastructure clients
- [ ] Potential: Create an interactive "buying committee mapper" tool for other complex deals
- [ ] Monitor: Track which personas get the most PDF downloads and drawer opens
- [ ] Content: Add a downloadable "Sovereign Persona Template" for DIY teams
- [ ] Future: Create a blog post series diving deeper into each persona's decision journey

---

# 2026-02-03 - Mega Menu Navigation System

## Summary
Implemented a full-width mega menu navigation system to replace the compact dropdowns, providing significantly more real estate for portfolio content and promotional opportunities. Built with a 3-column layout (2/3 navigation + 1/3 promotional box) and smooth Framer Motion animations. The system makes portfolio discovery much easier and adds space for strategic CTAs.

## Key Decisions/Changes
- **3-column mega menu architecture**: Left 2/3 for navigation organized by category, right 1/3 for promotional content with images and CTAs
- **Hover behavior with delay**: Opens immediately on hover, closes with 150ms delay to prevent accidental dismissal
- **One mega menu at a time**: Opening a new menu automatically closes the previous one
- **Portfolio categorization**: Organized 6 portfolio pieces into 4 categories (Revenue Systems, GTM Architecture, Buyer Intelligence, Creative Production)
- **Promotional boxes**: Each mega menu has custom promotional content (featured work for Portfolio, build-in-public for Thinking, positioning for About)
- **Mobile fallback**: Mega menus hidden on mobile; existing accordion menu preserved
- **Reusable system**: Content definitions separated from component logic for easy updates
- **External link support**: Visual indicators for Substack and other external links

## Files Modified
- `@src/components/layout/MegaMenu.tsx` (created) - Full-width dropdown component with 3-column grid
- `@src/lib/mega-menu-content.ts` (created) - Content definitions for Portfolio, Thinking, and About mega menus
- `@src/components/layout/Header.tsx` (completely redesigned) - New navigation system with hover management and timeout logic

## TODO / Next Steps
- [ ] Monitor: Track which portfolio items get clicked most from mega menu vs. portfolio page
- [ ] Consider: Add visual category icons to Portfolio mega menu sections
- [ ] Future: A/B test different promotional box content (featured work vs. testimonial vs. CTA)
- [ ] Content: Create promotional images specifically sized for mega menu boxes (currently using storyboard image)
- [ ] Enhancement: Add "Recently Updated" badge to portfolio items in mega menu

---

# 2026-02-03 - Dark Mode Fixes, Homepage Hero Update, and 10-Touch Sales Play Refinement

## Summary
Resolved critical dark mode contrast issues in global navigation and mega menu. Updated homepage hero with new outcome-focused positioning. Created portfolio index page for better site navigation. Transformed the 10-Touch Sales Play page from a vertical timeline into an interactive 25-day calendar grid, and replaced fabricated metrics with realistic operational efficiency statistics.

## Key Decisions/Changes
- **Dark mode contrast fix**: Updated Header and MegaMenu components to use semantic color tokens (`text-foreground`, `dark:text-foreground`) instead of manual color definitions. Changed mega menu background from `dark:bg-offblack` to `dark:bg-card-bg` for better contrast. Result: WCAG AAA compliant text visibility.
- **Homepage hero rewrite**: New outcome-focused positioning: "I architect AI-powered growth systems that turn chaotic marketing spend into predictable revenue" with proof points (344% inbound lift, 550% pipeline expansion, built Collaborative AI category).
- **Portfolio index page**: Created `/portfolio` page with grid of all portfolio items, resolving broken breadcrumb links across all portfolio pages.
- **10-Touch calendar grid**: Replaced vertical list of touches with 5-column, 25-day calendar grid showing spacing and multi-channel cadence visually. Days with touches show channel badge and action; inactive days are faded gray.
- **Credible metrics**: Removed fabricated conversion stats (42% meeting rate, etc.) and replaced with realistic BDR productivity gains: 5x contacts managed, <1 hour daily tasks, 45% task time reduction.

## Files Modified
- `@src/components/layout/Header.tsx` (dark mode contrast: text colors, borders, hover states)
- `@src/components/layout/MegaMenu.tsx` (dark mode contrast: background, promotional box, borders)
- `@src/app/page.tsx` (homepage hero content update)
- `@src/app/portfolio/page.tsx` (created portfolio index)
- `@src/components/portfolio/PortfolioGrid.tsx` (updated to include all portfolio items)
- `@src/app/portfolio/10-touch-sales-play/page.tsx` (calendar grid + realistic metrics)
- `@src/app/sitemap.ts` (added /portfolio route)
- All portfolio pages (updated breadcrumbs to link to `/portfolio`)

## TODO / Next Steps
- [x] All portfolio pages now have consistent breadcrumb navigation
- [x] Dark mode accessibility meets WCAG AAA standards
- [ ] Consider adding hover tooltips to calendar grid cells on desktop for better touch descriptions
- [ ] Monitor user feedback on new homepage messaging
- [ ] Potential: Add FAQ section to 10-touch sales play page
- [ ] Future: Consider adding case study client logo or testimonial to 10-touch page

---

# 2026-02-03 - Behavioral Lead Scoring Interactive Portfolio Page

## Summary
Built a comprehensive new interactive portfolio page demonstrating a behavioral lead scoring system. The page transforms complex scoring logic into an intuitive, explorable experience where users can adjust fit factors and trigger engagement actions to see how scoring drives buyer progression through 5 distinct states (Unknown Unknown → Known Unknown → Known Lead → MQL → SQL). The system emphasizes legibility and human judgment while showcasing demand systems expertise.

## Key Decisions/Changes
- **Interactive scoring simulator**: Real-time calculation of fit score (0-50, identity-based) + engagement score (0-50, behavior-based) = total score (0-100). Users manipulate both sides to see impact.
- **5-state buyer journey timeline**: Horizontal left-to-right progression with score indicator traveling through states. Click states to reveal definitions, typical behaviors, system responses, and next steps.
- **Fit score configurator**: 4 firmographic factors (company size, industry, role, geography) with explicit point values and visual confidence meter. Demonstrates intentional, non-vibes-based qualification.
- **Engagement signal simulator**: 9 actions across 3 intent levels (low/medium/high). Each action shows point value, one-time vs. repeatable status, and running count. Reinforces cumulative evidence model.
- **Threshold visualization**: Real-time feedback on MQL (60) and SQL (75) thresholds. System triggers "Sales Review Ready" alert at 75+, showing human gate.
- **Content journey connector**: Explicitly links to existing 120-Day Content Journey as upstream system, reinforcing "content creates motion → behavior reveals intent → scoring measures momentum → humans decide action" loop.
- **Calm, explanatory tone**: No gamification, no AI hype. Emphasizes legibility, evidence-based decisions, and systems that inform human judgment.
- **Core positioning**: "Making complex behavior-driven systems intuitive enough for humans to act on with confidence."

## Files Modified
- `@src/app/portfolio/behavioral-lead-scoring/page.tsx` (created) - Main page with all sections, hero, feedback loop model, interactive demo, content connection, system architecture, CTA
- `@src/lib/behavioral-scoring.ts` (created) - Complete data model with types (BuyerState, BuyerProfile, ScoringResult), scoring logic, state determination, 4 fit factors, 9 engagement actions
- `@src/components/behavioral-scoring/BehaviorJourneyTimeline.tsx` (created) - Horizontal timeline with state nodes, score indicator, expandable details, responsive mobile vertical layout
- `@src/components/behavioral-scoring/ScoreVisualizer.tsx` (created) - Dashboard showing total score, fit/engagement bars with animations, threshold progress, SQL trigger alert
- `@src/components/behavioral-scoring/FitScoreBreakdown.tsx` (created) - Configurable fit factors with button selectors, point values, confidence meter, explanatory text
- `@src/components/behavioral-scoring/EngagementSimulator.tsx` (created) - Grid of action buttons organized by intent level, action counts, point badges, one-time restrictions
- `@src/app/sitemap.ts` (added /portfolio/behavioral-lead-scoring route)
- `@src/components/portfolio/PortfolioGrid.tsx` (added as 7th portfolio item: "75+ SQL Threshold")
- `@src/lib/mega-menu-content.ts` (added to "Buyer Intelligence" section alongside Sovereign Personas)

## TODO / Next Steps
- [ ] Consider adding FAQ section with schema markup
- [ ] Potential: Add "preset buyer profiles" (e.g., "Enterprise Champion", "SMB User") for quick exploration
- [ ] Monitor: Track which engagement actions users trigger most in simulator
- [ ] Content: Add case study testimonial about scoring system implementation
- [ ] Future: Create downloadable "Behavioral Scoring Design Template" spreadsheet
- [ ] Enhancement: Add timeline animation showing score progression over days/weeks
- [ ] Consider: Add "Export this model" button that generates scoring criteria as JSON/CSV
