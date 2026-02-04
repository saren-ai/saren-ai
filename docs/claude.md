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
