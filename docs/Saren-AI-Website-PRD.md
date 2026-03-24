# Product Requirements Document (PRD)
## Saren.ai Website MVP - Interactive Portfolio Site

**Version:** 1.0  
**Last Updated:** February 3, 2026  
**Target Delivery:** 2 weeks from project start  
**Development Environment:** Cursor IDE with Claude Opus 4.5

---

## Executive Summary

Build a modern, interactive portfolio website for Saren.ai that positions the founder as a fractional CMO and AI operations consultant. The site emphasizes **interactive, code-based portfolio experiences** over traditional case studies, with the Golden Dashboard as the flagship proof-of-concept. The design follows a "Fire Horse 2026" aesthetic—bold, modern, high-contrast, with an AI-native feel.

---

## Product Vision

**Core Principle:** The website itself is a demonstration of capability—showing rather than telling through interactive experiences.

**Target Audience:**
- C-Suite Executives (CEOs, CFOs, CMOs)
- Founders of early-stage and Series A startups
- Heads of Sales in SaaS, cybersecurity, and AI sectors

**Key Differentiator:** Instead of static PDFs and screenshots, portfolio pieces are live, interactive code experiences that prospects can explore and engage with.

---

## Site Architecture

### Pages (Priority Order)

1. **Homepage** (`/`)
2. **Portfolio: Golden Dashboard** (`/portfolio/golden-dashboard`) - **PRIMARY FOCUS**
3. **About** (`/about`)
4. **Thinking** (`/thinking`) - Micro-blog
5. **Contact** (`/contact`)
6. **Additional Portfolio Pages** (lower priority for MVP):
   - `/portfolio/sovereign-personas`
   - `/portfolio/10-touch-sales-play`
   - `/portfolio/120-day-content-journey`

### Global Navigation

```
[Logo/Home] [Portfolio] [Thinking] [About] [Contact]
```

- Clean, minimal design
- Sticky/fixed on scroll
- Mobile-responsive hamburger menu
- Fire Horse color palette (defined below)

---

## Design System: Fire Horse 2026

### Color Palette

**Primary Colors:**
- Ember Red: `#E63946` (CTAs, key metrics, bold accents)
- Charcoal Black: `#1D3557` (backgrounds, primary text)
- Ash White: `#F1FAEE` (page backgrounds, card fills)

**Accent Colors:**
- Electric Blue: `#457B9D` (interactive elements, hover states)
- Copper/Bronze: `#A8763E` (borders, subtle highlights, secondary accents)

**Neutrals:**
- Slate Gray: `#6C757D` (secondary text, labels)
- Off-Black: `#212529` (deep backgrounds, depth layers)

### Typography

**Headings:** 
- Font: Inter, Space Grotesk, or Sora (bold weights)
- High contrast, clean lines

**Body Text:**
- Font: Inter or system UI stack
- Slightly wider tracking for readability

**Monospace (for data/metrics):**
- Font: JetBrains Mono or Fira Code
- Used in dashboard components, metric displays

### Design Principles

- High contrast, generous white space
- Architectural/grid-based layouts
- Sharp edges with intentional asymmetry
- Interactive elements feel responsive and alive
- Micro-animations on hover/interaction
- Clean line art for diagrams (technical blueprint style, modernized)

---

## Tech Stack Decision Framework

**Question for Cursor/Opus 4.5:**

*Given the following requirements, recommend an optimal tech stack:*

**Requirements:**
1. Fast page loads and smooth interactions
2. Interactive React components for portfolio pieces
3. Static site generation where possible (SEO)
4. Easy to deploy and iterate quickly
5. Markdown support for blog/thinking posts
6. Form submissions to HubSpot
7. Responsive design (mobile-first)
8. Modern animation capabilities

**Likely Options to Evaluate:**
- **Framework:** Next.js 14+ (App Router), Astro, Remix, or similar
- **Styling:** Tailwind CSS (custom config with Fire Horse colors)
- **Animation:** Framer Motion, React Spring, or CSS animations
- **Hosting:** Vercel, Netlify, Cloudflare Pages
- **Content:** Markdown files, MDX, or headless CMS (Sanity/Contentful)

**Cursor Task:** Recommend the stack and justify the choices based on:
- Performance benchmarks
- Developer experience
- Deployment simplicity
- Maintenance overhead
- Ability to add interactivity easily

---

## Page-by-Page Specifications

### 1. Homepage (`/`)

#### Hero Section

**Layout:**
- Full-width, high-impact section
- Centered or left-aligned content
- Background: Subtle gradient (Charcoal → Off-Black) or solid Ash White

**Content:**
- **Headline:** [TO BE PROVIDED - value proposition]
  - Example: "I build growth engines where strategy, storytelling, and systems converge"
- **Subhead:** [TO BE PROVIDED - specific audience/outcome]
  - Example: "Fractional CMO helping Series A founders turn vision into velocity through AI-driven operations"
- **Primary CTA:** Button (Ember Red)
  - Text: "See the work" or "View portfolio"
  - Action: Scroll to portfolio grid or navigate to `/portfolio/golden-dashboard`
- **Secondary CTA:** Ghost button (Charcoal border, transparent)
  - Text: "Book a call"
  - Action: Navigate to `/contact`

#### Portfolio Grid

**Layout:**
- 2×2 grid on desktop, single column on mobile
- Cards with hover effects (Copper accent border glow)

**Each Card Contains:**
- Title (e.g., "The Golden Dashboard")
- One-line description
- Key metric or outcome (Ember Red highlight)
- "View case study →" link

**Portfolio Pieces (4 total):**
1. Golden Dashboard - "Seeing ROI across the full demand funnel"
2. Sovereign Buyer Personas - "Making complex markets legible"
3. 10-Touch Sales Play - "Turning cold outreach into executive conversations"
4. 120-Day Content Journey - "How we engineered demand at Cylance"

**Interaction:**
- Click navigates to individual portfolio page
- Hover: Card lifts slightly, border glows (Electric Blue)

#### Footer

**Content:**
- Copyright: "© 2026 Saren Sakurai. All rights reserved."
- Links: Privacy, Terms of Use, Cookies
- Social links: LinkedIn, Instagram, BlueSky, Mastodon
- Additional properties: SarenSakurai.com, Japanifornia.com, Surfmint.co, Unklamned.com

---

### 2. Portfolio: Golden Dashboard (`/portfolio/golden-dashboard`)

**This is the PRIMARY DELIVERABLE for MVP.**

#### Page Structure

**Section 1: Problem**
- Heading: "The Problem"
- Body text: 
  > "Every startup says they want 'better attribution.' What they usually mean is: tell me which spend actually turns into revenue. When I worked with CloudKitchens as a Demand Generation consultant, we built what I call the Golden Dashboard—a single analytics view designed to answer the hardest question in marketing: Which channel spend is creating real business outcomes, and where are we leaking value?"

**Section 2: Approach**
- Heading: "The Approach"
- Body text explaining:
  - Full-funnel view (not just clicks or leads)
  - Cost normalization across stages
  - Conversion rates that expose friction
  - Designed for executive decision-making, not just analysts

**Section 3: Outcome**
- Heading: "The Outcome"
- Bulleted or prose description:
  - Aligned marketing, sales, and finance around one source of truth
  - Exposed hidden inefficiencies
  - Enabled confident budget decisions under pressure
  - Replaced guesswork with insight

**Section 4: The Interactive Deliverable** ⭐ **MOST IMPORTANT**

This section contains a **live, interactive, code-based recreation** of the Golden Dashboard.

##### Interactive Dashboard Component Requirements

**Visual Structure:**
- Full-funnel flow displayed horizontally (left to right)
- Each stage is a card/box containing:
  - Stage name (e.g., "Impressions", "Clicks", "Leads", etc.)
  - Volume metric (e.g., "2.8M impressions")
  - Cost metric (e.g., "CPM: $58.03")
  - Conversion rate to next stage (e.g., "CTR: 1.7%")

**Stages to Display:**
1. **Total Ad Spend** - Starting point, total budget
2. **Impressions** - CPM, CW (Cost per 1000 impressions)
3. **Clicks** - CPC, CTR (Click-through rate from impressions)
4. **Leads** - CPL, CVR (Conversion rate from clicks)
5. **Qualified Leads** - CPQL, Lead→QL conversion rate
6. **Opportunities** - CPO, QL→Opp conversion rate
7. **First Meetings (demos)** - Cost per meeting, Opp→Meeting rate
8. **Closed-Won Deals** - Cost per closed deal, Meeting→Close rate

**Data Source:**
- Reference the Golden Dashboard PDF (uploaded in project files)
- Extract visible numbers from the screenshot
- If numbers are unclear, use realistic example data:
  - Total Spend: $161.9K
  - Impressions: 2.8M (CPM: $58)
  - Clicks: 48.6K (CPC: $3.33, CTR: 1.7%)
  - Leads: 5,066 (CPL: $31.96, CVR: 10.6%)
  - Qualified Leads: 1,125 (CPQL: $144, QL rate: 21.7%)
  - Opportunities: 1,026 (CPO: $158)
  - First Meetings: 225 (Cost per meeting: $720)
  - Closed-Won: 12 (Cost per deal: $13,491)

**Interactive Features:**
1. **Hover tooltips** on each metric:
   - Explain what the metric means
   - Why it matters
   - Example: Hovering over "CTR" shows "Click-through rate: the percentage of people who saw your ad and clicked. Low CTR means your messaging isn't resonating or you're targeting the wrong audience."

2. **Visual connectors** between stages:
   - Lines or arrows showing flow from one stage to the next
   - Display conversion rate on the connector
   - Color-coded by health: Green (>20%), Yellow (10-20%), Red (<10%)

3. **Optional (stretch goal for MVP):** Editable inputs
   - User can click a metric and input their own numbers
   - Dashboard recalculates all downstream metrics
   - "Reset to example" button

**Styling:**
- Cards: Ash White background, Charcoal border
- Metrics: Ember Red for key numbers, Slate Gray for labels
- Connectors: Electric Blue with transparency
- Tooltips: Dark background (Off-Black), Electric Blue border, white text

**Technical Notes for Cursor:**
- Build as a React component
- Consider using SVG for connectors/flow lines
- Ensure mobile-responsive (stack vertically on small screens)
- Smooth animations on hover (Framer Motion or CSS transitions)

**Section 5: CTA**
- Heading: "Want a dashboard like this for your business?"
- Button: "Let's talk" (Ember Red, links to `/contact`)

---

### 3. About (`/about`)

#### Career Timeline

**Content:**
- Visual timeline (horizontal or vertical)
- Key roles with dates:
  - WethosAI (Fractional Head of Marketing, 2023-Present)
  - Qwiet AI (Head of Growth Marketing, 2023)
  - BlackBerry/Cylance (Sr. Director Digital Marketing, 2020-2023)
  - Cylance (Director of Demand Gen, 2017-2020)
  - Previous roles (condensed)

**Interaction:**
- Click/tap a role to expand details
- Show key metrics inline (e.g., "+344% lead growth at WethosAI")

#### By the Numbers

**Aggregate metrics across all clients:**
- Example stats to pull from resume/portfolio:
  - "550% pipeline expansion"
  - "70% CAC reduction"
  - "344% lead growth"
  - "8:1 ROI on paid media"
  - "$4M quarterly pipeline from automated channels"

**Layout:**
- Grid of stat cards
- Large number (Ember Red), small label (Slate Gray)

#### Personal Interests

**Heading:** "Outside of work" or "What I'm into"

**Content:**
- [TO BE PROVIDED - Links to personal collections]
- Comic Geeks collection URL
- Funko Pop collection (link or mention)
- Discogs vinyl collection URL
- Letterboxd movies URL

**Layout:**
- Simple text links with small icons
- Clean, minimal, not overemphasized

#### CTA
- "Ready to talk about your growth engine?" 
- Button: "Get in touch" → `/contact`

---

### 4. Thinking (`/thinking`)

**Purpose:** Micro-blog for quick ideas, research links, interesting sites

#### Page Layout

**Header:**
- Title: "Thinking"
- Subhead: "Quick ideas, links, research, and things I'm paying attention to"

**Content Format:**
- Reverse chronological list (newest first)
- Each post is a card with:
  - Date stamp (small, Slate Gray)
  - Title or first line (if no title)
  - Body text (can include links)
  - Optional: Embedded content (tweet, article preview)

**Styling:**
- Cards: Ash White background, subtle Charcoal border
- Links: Electric Blue, underlined on hover
- Spacing: Generous, easy to scan

#### Content Management

**Question for Cursor:**

*Recommend the simplest approach for managing blog posts:*

**Options:**
1. **Markdown files** in a `/thinking` directory
   - Pros: Simple, version-controlled, no CMS overhead
   - Cons: Requires Git commit to publish
2. **MDX** (Markdown + React components)
   - Pros: Can embed interactive elements
   - Cons: Slightly more complex
3. **Headless CMS** (Sanity, Contentful, Notion API)
   - Pros: Easier for non-technical updates
   - Cons: Additional setup, API calls

**Cursor Task:** Recommend and implement the best option for MVP.

#### Initial Posts (Placeholder Content)

[TO BE PROVIDED - First 3-5 posts]

For MVP, create 2-3 example posts:
1. A short text note (e.g., "Thinking about how attribution models break at scale")
2. A link with commentary (e.g., link to a research paper with 2-3 sentence take)
3. A quick list (e.g., "5 tools I'm using this week")

---

### 5. Contact (`/contact`)

#### Page Layout

**Two-column layout (desktop) / Single-column (mobile)**

##### Left Column: HubSpot Form

**Form Fields:**
- Name (required)
- Email (required)
- Company (optional)
- Message (textarea, required)
- Submit button (Ember Red, "Send message")

**Technical Integration:**
- [TO BE PROVIDED - HubSpot Portal ID and Form ID]
- On submit, send data to HubSpot API
- Show success message after submission
- Error handling if submission fails

**Cursor Task:** 
- If HubSpot details are not provided, implement a placeholder form that logs to console
- Add comments explaining where to insert HubSpot configuration

##### Right Column: Other Contact Methods

**Content:**
1. **HubSpot Live Chat**
   - Heading: "Need an answer right now?"
   - Button: "Start a live chat" (Electric Blue)
   - [TO BE PROVIDED - HubSpot chat embed code or link]
   - Cursor: Implement as button that opens chat widget or links to HubSpot chat URL

2. **LinkedIn**
   - Text: "Connect with me on LinkedIn"
   - Link: [TO BE PROVIDED - LinkedIn profile URL]
   - Icon + text link

3. **Email Fallback**
   - Text: "Or email me directly: saren.sakurai@gmail.com"
   - Clickable mailto link

**Styling:**
- Section headings: Charcoal, medium weight
- Buttons: Consistent with global button styles
- Links: Electric Blue, hover underline

---

## Additional Portfolio Pages (Lower Priority for MVP)

These follow the same structure as Golden Dashboard but with **static content** for MVP:

### `/portfolio/sovereign-personas`
- Problem/Approach/Outcome text (from uploaded PDF)
- Static image of persona document
- (Future: Make personas interactive/explorable)

### `/portfolio/10-touch-sales-play`
- Problem/Approach/Outcome text (from uploaded PDF)
- Static image of sales play diagram
- (Future: Make sales play interactive/explorable)

### `/portfolio/120-day-content-journey`
- Problem/Approach/Outcome text (from uploaded PDF)
- Static image of journey map
- (Future: Make journey map interactive)

**Cursor Task for MVP:** 
- Create page templates using content from PDFs
- Use placeholder images extracted from PDFs
- Add TODO comments for future interactive implementations

---

## Responsive Design Requirements

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile-Specific Behaviors

- Navigation collapses to hamburger menu
- Portfolio grid stacks to single column
- Golden Dashboard interactive component stacks vertically
- Two-column layouts become single-column
- Text sizes scale down appropriately

### Touch Interactions

- All interactive elements have sufficient touch targets (min 44×44px)
- Hover tooltips activate on tap (mobile)
- Smooth scrolling between sections

---

## Performance Requirements

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Lighthouse Score:** > 90 (Performance, Accessibility, Best Practices, SEO)
- **Image Optimization:** Use modern formats (WebP, AVIF), lazy loading
- **Code Splitting:** Load interactive components only when needed

---

## SEO Requirements

### Meta Tags (all pages)

```html
<title>[Page-specific title] | Saren.ai</title>
<meta name="description" content="[Page-specific description]">
<meta property="og:title" content="[Page title]">
<meta property="og:description" content="[Page description]">
<meta property="og:image" content="[Social share image]">
<meta property="og:url" content="[Canonical URL]">
<meta name="twitter:card" content="summary_large_image">
```

### Specific Meta Content

**Homepage:**
- Title: "Saren Sakurai | Fractional CMO & AI Operations Consultant"
- Description: "Building AI-driven growth engines for early-stage and Series A startups. Scalable strategy, systems, and storytelling that turns vision into velocity."

**Golden Dashboard:**
- Title: "The Golden Dashboard: Seeing ROI Across the Full Demand Funnel | Saren.ai"
- Description: "An interactive analytics framework that answers the hardest question in marketing: which channel spend creates real business outcomes?"

**Cursor Task:** Generate appropriate meta tags for all pages.

---

## Analytics & Tracking

### Requirements

1. **Page views** tracked on all pages
2. **Interaction events:**
   - Button clicks (CTAs, contact form submission)
   - Portfolio card clicks
   - Golden Dashboard interactions (tooltip hovers, metric exploration)
   - External link clicks (personal interests, thinking post links)

3. **Form submissions:**
   - Contact form success/failure
   - HubSpot form integration events

**Question for Cursor:**

*Recommend an analytics solution:*
- Google Analytics 4
- Plausible Analytics (privacy-focused)
- Vercel Analytics
- Custom event tracking via PostHog or similar

**Cursor Task:** Implement chosen solution with GDPR-friendly cookie consent if needed.

---

## Deployment & Hosting

### Requirements

- **Domain:** saren.ai (assumed ready or will be configured)
- **SSL:** Required (automatic via hosting provider)
- **Continuous Deployment:** Git push triggers automatic deployment
- **Preview Deployments:** Each branch/PR gets a preview URL

**Question for Cursor:**

*Based on chosen tech stack, recommend hosting:*
- Vercel (if using Next.js)
- Netlify (flexible, works with most frameworks)
- Cloudflare Pages (fast, global CDN)

**Cursor Task:** Provide deployment configuration files (vercel.json, netlify.toml, etc.)

---

## File Structure (Suggested)

```
saren-ai/
├── public/
│   ├── images/
│   │   ├── portfolio/
│   │   │   ├── golden-dashboard.png
│   │   │   ├── sovereign-personas.png
│   │   │   ├── 10-touch-sales-play.png
│   │   │   └── 120-day-content-journey.png
│   │   └── social-share.png
│   └── favicon.ico
├── src/
│   ├── app/ (or pages/ depending on framework)
│   │   ├── page.tsx (Homepage)
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── thinking/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── portfolio/
│   │       ├── golden-dashboard/
│   │       │   └── page.tsx
│   │       ├── sovereign-personas/
│   │       │   └── page.tsx
│   │       ├── 10-touch-sales-play/
│   │       │   └── page.tsx
│   │       └── 120-day-content-journey/
│   │           └── page.tsx
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Nav.tsx
│   │   ├── Portfolio/
│   │   │   ├── PortfolioGrid.tsx
│   │   │   └── PortfolioCard.tsx
│   │   ├── GoldenDashboard/
│   │   │   ├── DashboardFlow.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── StageConnector.tsx
│   │   │   └── Tooltip.tsx
│   │   ├── About/
│   │   │   ├── Timeline.tsx
│   │   │   ├── MetricsGrid.tsx
│   │   │   └── PersonalLinks.tsx
│   │   └── Contact/
│   │       ├── HubSpotForm.tsx
│   │       └── ContactLinks.tsx
│   ├── styles/
│   │   └── globals.css (Tailwind imports + custom styles)
│   ├── lib/
│   │   ├── hubspot.ts (API integration)
│   │   └── analytics.ts (tracking utilities)
│   └── content/
│       └── thinking/
│           ├── 2026-02-01-example-post.md
│           └── 2026-02-03-another-post.md
├── tailwind.config.js (Fire Horse color palette)
├── next.config.js (or equivalent)
├── package.json
└── README.md
```

**Cursor Task:** Set up initial project structure based on chosen framework.

---

## Content Placeholders & Data Needed

### TO BE PROVIDED by Client

1. **Homepage:**
   - Hero headline (value proposition)
   - Hero subhead (specific audience/outcome)
   - Portfolio grid: 4 case study titles, descriptions, key metrics

2. **Golden Dashboard:**
   - Confirm data accuracy from PDF or provide actual numbers

3. **About:**
   - Personal interest links:
     - Comic Geeks URL
     - Funko Pop (link or mention only)
     - Discogs vinyl collection URL
     - Letterboxd movies URL

4. **Thinking:**
   - First 3-5 blog posts (title, date, body text)

5. **Contact:**
   - HubSpot Portal ID
   - HubSpot Form ID
   - HubSpot Live Chat embed code or URL
   - LinkedIn profile URL

6. **Domain:**
   - Confirm saren.ai is ready to point to hosting provider
   - DNS access for configuration

### Temporary Placeholders (for MVP development)

**Cursor Task:** Use placeholder content where client data is pending:
- Lorem ipsum for any missing copy
- Placeholder images (generated or from project files)
- Console logs for HubSpot integration (with clear TODO comments)
- Example blog posts for Thinking page

---

## Development Phases

### Phase 1: Foundation (Days 1-3)
- ✅ Set up project with chosen tech stack
- ✅ Configure Tailwind with Fire Horse colors
- ✅ Build global layout (Header, Footer, Nav)
- ✅ Homepage structure (hero + portfolio grid, static content)
- ✅ Deployment pipeline configured

**Deliverable:** Live preview URL with basic homepage

### Phase 2: Golden Dashboard (Days 4-7)
- ✅ Golden Dashboard page layout (Problem, Approach, Outcome sections)
- ✅ **Interactive Dashboard component** (full implementation)
  - All stages with metrics
  - Hover tooltips
  - Visual connectors with conversion rates
  - Responsive mobile layout
- ✅ Polish animations and interactions

**Deliverable:** Fully functional Golden Dashboard page

### Phase 3: Supporting Pages (Days 8-10)
- ✅ About page (timeline, metrics, personal links)
- ✅ Thinking page (blog structure, example posts)
- ✅ Contact page (HubSpot form, contact links)

**Deliverable:** Complete site with all core pages

### Phase 4: Additional Portfolio & Polish (Days 11-14)
- ✅ Remaining portfolio pages (static content from PDFs)
- ✅ SEO meta tags across all pages
- ✅ Analytics integration
- ✅ Performance optimization (image optimization, code splitting)
- ✅ Cross-browser testing
- ✅ Final QA

**Deliverable:** Production-ready site on saren.ai

---

## Testing Checklist

### Functionality
- [ ] All navigation links work correctly
- [ ] Portfolio grid cards navigate to correct pages
- [ ] Golden Dashboard interactive component functions on all devices
- [ ] Tooltips appear on hover (desktop) and tap (mobile)
- [ ] Contact form submits successfully to HubSpot
- [ ] HubSpot Live Chat triggers correctly
- [ ] External links open in new tabs
- [ ] All CTAs have correct destinations

### Responsive Design
- [ ] Layout adapts correctly at mobile/tablet/desktop breakpoints
- [ ] Golden Dashboard stacks vertically on mobile
- [ ] Navigation collapses to hamburger menu on mobile
- [ ] All text remains readable at all sizes
- [ ] Touch targets are adequately sized (min 44×44px)

### Performance
- [ ] Lighthouse score > 90 on all metrics
- [ ] Images are optimized and lazy-loaded
- [ ] No console errors
- [ ] Page load time < 3s on 3G connection

### SEO
- [ ] All pages have unique, descriptive titles
- [ ] Meta descriptions present and accurate
- [ ] Open Graph tags configured
- [ ] Canonical URLs set correctly
- [ ] robots.txt and sitemap.xml generated

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Success Criteria

### MVP is considered complete when:

1. ✅ All 5 core pages are live and functional
2. ✅ Golden Dashboard interactive component is fully working with tooltips
3. ✅ Site is responsive across mobile/tablet/desktop
4. ✅ Contact form successfully submits to HubSpot
5. ✅ Lighthouse score > 90 across all metrics
6. ✅ Site is deployed to saren.ai (or staging URL)
7. ✅ No critical bugs or broken links
8. ✅ Fire Horse 2026 design aesthetic is consistently applied

### Post-MVP Enhancements (Future Iterations)

- Make remaining portfolio pieces interactive (Personas, Sales Play, Journey)
- Add conversational AI chat interface
- Implement quiz/diagnostic tool
- Add case study filtering/search
- Create downloadable resources section
- Integrate blog RSS feed
- Add testimonials/social proof section

---

## Notes for Cursor Development

### Decision-Making Authority

**Cursor with Claude Opus 4.5 is authorized to make technical decisions on:**
- Specific npm packages/libraries to use
- Code architecture and component structure
- Animation implementation details
- Performance optimization techniques
- Accessibility improvements
- Minor UX enhancements that align with stated goals

**Cursor should ask for clarification on:**
- Content/copy decisions
- Major design changes
- Additional features not specified in PRD
- Integration details requiring client credentials
- Budget/scope changes

### Documentation Requirements

As you build, please:
- Comment complex code sections
- Document component props and usage
- Create a README with setup instructions
- Note any TODOs for client data integration
- Track any deviations from PRD with rationale

### Output Format

After completing each phase:
- Provide preview URL for client review
- List completed features
- Note any blockers or pending items
- Recommend next steps

---

## Appendix: Reference Materials

### Included in Project Knowledge

1. **Saren_Sakurai_LinkedIn_Profile.pdf** - Resume and career details
2. **Golden_Dashboard_Portfolio.pdf** - Full case study with metrics
3. **Sovereign_Personas_Portfolio.pdf** - Buyer persona framework
4. **10Touch_Sales_Play_Portfolio.pdf** - Outbound sales methodology
5. **120day_Content_Journey_Portfolio.pdf** - Content strategy framework

### Key Metrics to Extract (from PDFs)

**For Golden Dashboard:**
- Total ad spend, impressions, clicks, leads, qualified leads, opportunities, meetings, closed-won
- All associated cost metrics (CPM, CPC, CPL, etc.)
- Conversion rates between stages

**For Homepage Portfolio Grid:**
- Key outcomes from each case study (%, $, scale indicators)

---

## Contact for Questions

**Project Owner:** Saren Sakurai  
**Communication Method:** [To be determined - GitHub issues, direct message, etc.]

---

**END OF PRD**

---

## Quick Start Checklist for Cursor

1. [ ] Review entire PRD
2. [ ] Recommend tech stack with justification
3. [ ] Set up project structure
4. [ ] Configure Tailwind with Fire Horse colors
5. [ ] Build homepage (hero + portfolio grid)
6. [ ] Build Golden Dashboard interactive component
7. [ ] Complete remaining pages
8. [ ] Deploy and share preview URL

**Let's build something great. Start with Phase 1 and let's iterate from there.**
