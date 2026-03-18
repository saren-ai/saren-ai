# Saren.ai — Master UX & Development Brief
### Prepared for: Google Antigravity
### Date: February 16, 2026
### Version: 1.0

---

## 1. Executive summary

Saren.ai is evolving from a portfolio showcase into an **interactive demand generation platform**. This brief covers two workstreams:

**Workstream A — UX & IA improvements** to the existing site (navigation, portfolio organization, page templates, consistency)

**Workstream B — "Demand Machine" component architecture** — five interconnected interactive tools that function as both portfolio pieces and lead generation funnels, with three monetization paths per component.

The site runs on **Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion**, deployed on Vercel. All components are client-rendered. No external state management library — React hooks + context only.

---

## 2. Current site architecture

### Existing routes

```
/                               → Homepage (hero + portfolio grid)
/about                          → About page (profile gallery, career timeline, stats, FAQ)
/about/clients                  → Client brand logos
/about/stack                    → AI stack tier list + tool categories
/contact                        → Contact form
/thinking                       → Micro-blog with RSS feed
/portfolio                      → Portfolio grid
/portfolio/calculator           → Interactive SaaS revenue calculator
/portfolio/golden-dashboard     → Full-funnel attribution analytics
/portfolio/sovereign-personas   → Committee buying personas
/portfolio/10-touch-sales-play  → Case study (static + interactive viz)
/portfolio/120-day-content-journey → Case study (matrix view)
/portfolio/b2b-marketing-framework → Case study (7 layers, 21 prompts)
/portfolio/behavioral-lead-scoring → Case study (fit + engagement scoring)
/portfolio/its-good-to-be-pitched  → Case study (TV storyboard)
```

### Key component directories

| Directory | Files | Purpose |
|-----------|-------|---------|
| `calculator/` | 11 | Bidirectional funnel math, industry benchmarks, CAC comparison |
| `golden-dashboard/` | 8 | KPI cards, metric drawers, funnel controls |
| `tier-list/` | 6 | Drag-and-drop AI tool tier list (@dnd-kit) |
| `behavioral-scoring/` | 4 | Lead scoring visualizations |
| `content-journey/` | 3 | 120-day buyer journey matrix (10 stages × 12 row types) |
| `sovereign-personas/` | 3 | Committee buying personas |
| `storyboard/` | 4 | TV spot storyboard viewer |
| `marketing-framework/` | 1 | B2B messaging pyramid |
| `layout/` | 7 | Header, Footer, TopBanner, ThemeProvider, ThemeToggle, MegaMenu |

---

## 3. Workstream A — UX & information architecture improvements

### 3.1 Portfolio reorganization

**Problem:** The portfolio grid currently presents all pieces as equal-weight items. There's no distinction between interactive tools (calculator, dashboard, tier list) and narrative case studies. Visitors can't quickly understand what's a "play with it" experience vs. a "read about it" experience.

**Solution: Two-tier portfolio taxonomy**

| Tier | Label | Items | UX Treatment |
|------|-------|-------|-------------|
| **Interactive tools** | "Try it" | Calculator, Golden Dashboard, Behavioral Lead Scoring, Tier List | Prominent cards with "Launch tool" CTA, tool-specific thumbnail/preview animation |
| **Case studies** | "See the work" | Sovereign Personas, 10-Touch Sales Play, 120-Day Content Journey, B2B Framework, TV Storyboard | Standard cards with "Read case study" CTA |

**Implementation:**
- Portfolio grid page (`/portfolio`) gets two sections with distinct visual treatment
- Interactive tools section appears first — these are the portfolio-as-product pieces
- Case studies section follows — traditional consulting deliverable showcases
- Each card type gets a badge: `Interactive` (ember red) or `Case Study` (electric blue)
- Mega menu (`src/lib/mega-menu-content.ts`) should mirror this taxonomy

### 3.2 Navigation & mega menu restructure

**Current:** The mega menu exists but portfolio content is growing and needs clearer hierarchy.

**Proposed mega menu structure:**

```
Portfolio
├── Interactive tools
│   ├── SaaS Revenue Calculator
│   ├── Golden Dashboard
│   ├── Behavioral Lead Scoring
│   └── AI Stack Tier List
├── Case studies
│   ├── 120-Day Content Journey (Cylance)
│   ├── 10-Touch Sales Play (WethosAI)
│   ├── Sovereign Buyer Personas (Stealth — Taiwan)
│   ├── B2B Messaging Framework
│   └── It's Good to Be Pitched (TV Storyboard)
└── Demand Machine (NEW — see Workstream B)
    ├── 36-Question Interview
    ├── 21-Step Messaging Framework
    ├── 120-Day Content Planner
    ├── 10-Touch Outbound Builder
    └── Social & Ad Lead Magnet Program
```

**Note:** The "Demand Machine" section will roll out progressively. Initially it may contain only 1–2 components. The mega menu should be built to accommodate all five, with "Coming soon" states for unreleased items.

### 3.3 Homepage improvements

**Current state:** Hero section + portfolio grid.

**Proposed additions (in order of appearance):**

1. **Hero** — Keep current, but update subhead to: *"Interactive demand generation playbooks. Built by a fractional CMO who's scaled three exits."*
2. **Credibility bar** — Compact row of key metrics: `3 exits` · `$1.4B (Cylance)` · `550% pipeline growth` · `70% CAC reduction` · `344% lead growth (WethosAI)`
3. **"Try something" section** — 2–3 featured interactive tools with live preview thumbnails and "Launch" CTAs. This replaces the current uniform portfolio grid as the primary conversion zone.
4. **Demand Machine teaser** — Once components are built: horizontal scroll of the five stages with brief descriptions and "Start here" entry point.
5. **Case studies grid** — The remaining portfolio pieces
6. **Thinking/blog preview** — Latest 2–3 posts from `/thinking`
7. **CTA block** — "Book a call" + "Browse templates on Gumroad"

### 3.4 Consistent case study page template

**Problem:** Each portfolio piece was built independently. There's no consistent structure for context-setting, outcomes presentation, or CTAs.

**Proposed standard template for all case study pages:**

```
┌─────────────────────────────────────────────┐
│ Hero: Title + one-line summary              │
│ Company context bar: Logo | Stage | Sector  │
├─────────────────────────────────────────────┤
│ The challenge (2–3 sentences)               │
├─────────────────────────────────────────────┤
│ Interactive component / visual (main body)  │
├─────────────────────────────────────────────┤
│ Outcomes: 3–4 metric cards                  │
│ (e.g., "550% pipeline growth")              │
├─────────────────────────────────────────────┤
│ "What this means" — consulting framing      │
│ (2 paragraphs max)                          │
├─────────────────────────────────────────────┤
│ Dual CTA bar:                               │
│ [Book a consultation] [View next case study]│
├─────────────────────────────────────────────┤
│ Related portfolio pieces (2–3 cards)        │
└─────────────────────────────────────────────┘
```

**Reusable components to build:**
- `CaseStudyHero` — title, subtitle, company context bar
- `OutcomeMetrics` — row of 3–4 metric cards (JetBrains Mono values, ember red)
- `ConsultingCTA` — dual button bar with warm copy
- `RelatedWork` — horizontal card row pulling from portfolio data

### 3.5 /about page refinements

- Add a "Career timeline" component if not already interactive — should highlight the three exits (Cylance $1.4B, Qwiet AI, WethosAI) prominently
- Ensure the stats/metrics section uses real numbers from resume: 20+ years experience, 3 exits, $100M+ in managed campaign budget across career, enterprise clients (Nike, Kraft, AAA, Toyota, Palo Alto Networks, BlackBerry)
- Add Japanese heritage / cultural dimension as a differentiator (Sarah Lawrence BA, Oregon Nikkei Legacy Center oral history work, JLPT N5 certification) — this is brand texture, not filler

---

## 4. Workstream B — Demand Machine component architecture

### 4.1 Overview

Five interconnected interactive tools that can be accessed independently or sequentially. Each serves three purposes simultaneously:

1. **Portfolio piece** — demonstrates systematic thinking and implementation depth
2. **Free tool** — delivers real value, builds trust
3. **Lead funnel** — converts via template purchase (Gumroad) or consulting inquiry (HubSpot/Calendly)

### 4.2 The five components

| # | Component | Route | Status | Priority |
|---|-----------|-------|--------|----------|
| 1 | 36-Question Interview | `/portfolio/demand-machine/interview` | New build | **P1** |
| 2 | 21-Step Messaging Framework | `/portfolio/demand-machine/messaging` | Evolves existing `/portfolio/b2b-marketing-framework` | **P1** |
| 3 | 120-Day Content Planner | `/portfolio/demand-machine/content-planner` | Evolves existing `/portfolio/120-day-content-journey` + `/portfolio/behavioral-lead-scoring` | P2 |
| 4 | 10-Touch Outbound Builder | `/portfolio/demand-machine/outbound` | Evolves existing `/portfolio/10-touch-sales-play` | P2 |
| 5 | Social & Ad Lead Magnet Program | `/portfolio/demand-machine/lead-magnets` | New build | P3 |

**Routing decision:** All Demand Machine components live under `/portfolio/demand-machine/` to keep them grouped. The existing case study pages remain at their current routes as read-only showcases. The new tools are the interactive, input-driven versions.

### 4.3 Standard component page structure

Every Demand Machine page follows this layout:

```
┌─────────────────────────────────────────────────────┐
│ Component header                                     │
│ Title + "Step X of 5 in the Demand Machine"          │
│ One-sentence value prop                              │
│ [Start from scratch] [Upload previous component PDF] │
├─────────────────────────────────────────────────────┤
│ Progress indicator (if multi-step)                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │                                                  │ │
│ │           Interactive code experience            │ │
│ │           (primary real estate)                   │ │
│ │                                                  │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
├─────────────────────────────────────────────────────┤
│ Output preview (live-updating as user inputs data)   │
├─────────────────────────────────────────────────────┤
│ Action bar:                                          │
│ [Download PDF] [Buy Notion Template — $29] [Book call]│
├─────────────────────────────────────────────────────┤
│ "Better with context" banner:                        │
│ "This works best with data from [previous component].│
│ [Start there →] or continue on your own."            │
├─────────────────────────────────────────────────────┤
│ Next component teaser: [Component N+1 →]             │
└─────────────────────────────────────────────────────┘
```

### 4.4 Component 1: 36-Question Interview (P1)

**Purpose:** Capture foundational business intelligence — ICP, business model, positioning, content themes, GTM context.

**UX spec:**
- Multi-step form with 5–7 sections (not all 36 questions on one page)
- Conditional logic: different follow-up questions based on answers (e.g., if "freemium model" → ask about activation metrics; if "sales-led" → ask about deal cycle length)
- Real-time validation, smart placeholder text, progress bar
- Conversational tone throughout — not a survey, more like a guided intake call
- Section titles like: "Let's start with who you're selling to" / "Now tell me about your revenue model"
- Auto-save to localStorage so users can return

**PDF output:**
- Structured interview transcript grouped by section
- Pulled metadata summary (company stage, ICP profile, primary message pillars, key challenges)
- Footer: "Feed this into the Messaging Framework → saren.ai/portfolio/demand-machine/messaging"

**Gumroad template:** "B2B SaaS Interview Template for Notion" — $29

**Consulting CTA copy:** "I'll conduct this interview with your team, aggregate cross-functional inputs, and synthesize the raw material into actionable positioning."

**Data model (new file: `src/lib/demand-machine/interview.ts`):**
```typescript
interface InterviewSection {
  id: string;
  title: string;
  description: string;
  questions: InterviewQuestion[];
}

interface InterviewQuestion {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'multi-select' | 'scale';
  placeholder?: string;
  options?: string[];
  conditionalOn?: { questionId: string; value: string };
  required: boolean;
}

interface InterviewResponse {
  questionId: string;
  value: string | string[];
  timestamp: number;
}
```

### 4.5 Component 2: 21-Step Messaging Framework (P1)

**Purpose:** Transform interview outputs into cohesive brand positioning, message pillars, and content vectors.

**Relationship to existing:** This evolves the current `/portfolio/b2b-marketing-framework` (7 layers, 21 prompts) from a read-only showcase into an interactive builder. The existing page remains as the "case study" version.

**UX spec:**
- Accepts data from Component 1 (via PDF upload or localStorage) OR manual input
- Steps user through 21 messaging decisions with guidance panels
- Visual builder: shows how positioning statement, differentiators, proof points, and content pillars interconnect
- Live preview of the messaging architecture as user completes each step
- Drag-and-drop for reordering proof points and pillars (leverage existing @dnd-kit setup)

**PDF output:**
- Messaging map: positioning statement → differentiators → proof points
- Content pillar definitions with example topic clusters
- Key phrases / language library
- "Ready to use in: Claude Projects, Notion, pitch decks"

**Gumroad template:** "21-Step Messaging Framework for Notion" — $49

**Consulting CTA copy:** "I'll facilitate your team through this framework live, push back on weak differentiators, and deliver a messaging house that actually resonates with your ICP."

### 4.6 Component 3: 120-Day Content Planner (P2)

**Purpose:** Map a repeatable content strategy with channel sequencing and lead scoring.

**Relationship to existing:** Evolves `/portfolio/120-day-content-journey` (10-stage matrix) and absorbs `/portfolio/behavioral-lead-scoring` as a sub-module.

**UX spec:**
- Quarter-long content calendar builder with drag-and-drop
- Channel allocation UI (blog, video, email, guides, webinars, social)
- Cadence + format decisions per channel
- **Sub-module: Lead Scoring** — builds scoring model with engagement signals, firmographic fit, intent triggers. Outputs scoring rules as exportable JSON or visual table.
- Uses industry benchmark data from project CSV files (`traffic_to_lead_by_industry.csv`, `conversion_rate_by_page_type.csv`, etc.) to suggest realistic targets

**PDF output:**
- 120-day content calendar with channel assignments
- Content pillar breakdown by month
- Lead scoring model (criteria, weights, thresholds)
- Success metrics framework with benchmark comparisons

**Gumroad template:** "120-Day Content Calendar + Lead Scoring for Notion" — $69

### 4.7 Component 4: 10-Touch Outbound Builder (P2)

**Purpose:** Design a repeatable sales cadence that complements inbound.

**Relationship to existing:** Evolves `/portfolio/10-touch-sales-play` from static visualization into a configurable sequence builder.

**UX spec:**
- Sequence builder: define touch types (email, LinkedIn, call, video message)
- Personalization angle selector per touch
- Template editor with variable injection (`{{company_name}}`, `{{pain_point}}`, etc.)
- Touch timing and conditional logic (skip if replied, escalate if no response)
- Visual timeline showing the 10-touch flow with phase markers (Awareness → Engagement → Final Push)

**PDF output:**
- Outbound sequence map (touch 1–10 with timing, channel, template outline)
- Personalization prompts per touch
- Qualification criteria (when to stop, when to escalate)

**Gumroad template:** "10-Touch Outbound Sequence for Notion + Slack" — $39

### 4.8 Component 5: Social & Ad Lead Magnet Program (P3)

**Purpose:** Define demand acceleration through paid channels and organic social.

**UX spec:**
- Lead magnet builder (format, topic, offer structure)
- Ad creative prompt generator (outputs ready for design/copywriting teams)
- Social amplification calendar (30 days of posts)
- Budget allocation helper by channel and phase
- CPA/ROAS modeling using benchmark data from project CSVs (`cac_by_marketing_channel.csv`, `cac_by_industry_and_customer_type.csv`)

**PDF output:**
- Lead magnet spec (format, topic, pitch, landing page brief)
- Ad creative prompts
- 30-day social calendar
- Budget allocation + projected outcomes

**Gumroad template:** "Lead Magnet + Ad Strategy for Notion" — $49

---

## 5. Shared infrastructure requirements

### 5.1 PDF generation system

**Requirement:** All five Demand Machine components + existing interactive tools should be able to export branded PDFs.

**Recommendation:** Client-side HTML-to-PDF using a library like `@react-pdf/renderer` or `html2pdf.js`. Server-side generation (Puppeteer) is overkill for V1.

**Brand requirements for exported PDFs:**
- Saren.ai logo + URL in header
- Fire Horse 2026 color palette (Ember Red headers, Charcoal body, Electric Blue accents)
- JetBrains Mono for metrics/data
- Sora for body text
- Footer: "Generated at saren.ai — [Component Name] — [Date]"
- Suggested next component link in footer

### 5.2 Data persistence

**Requirement:** Users should be able to save progress and return later.

**V1 approach:** `localStorage` keyed by component (e.g., `saren-dm-interview`, `saren-dm-messaging`). Same pattern already used for tier list votes.

**V2 consideration (future):** If user accounts are ever added, migrate to a lightweight backend (Supabase, Vercel KV). Not in scope for this brief.

### 5.3 Cross-component data flow

**Requirement:** Component 2 should be able to ingest Component 1's output. Component 3 should be able to use Component 2's output. And so on.

**Approach:**
- Each component exports a standardized JSON structure to localStorage
- Subsequent components check for previous component data on mount
- If found: show "We found your interview data — use it?" banner
- If not found: allow manual input, show "Better with context" banner linking to the previous component
- PDF upload path: user can upload a PDF from a previous component, and the system parses key fields (V2 — start with localStorage pass-through for V1)

### 5.4 Analytics events

Track the following events (Google Analytics / Vercel Analytics / Mixpanel — whatever is currently implemented):

| Event | Trigger |
|-------|---------|
| `dm_component_start` | User begins any Demand Machine component |
| `dm_component_complete` | User reaches the end / output preview |
| `dm_pdf_download` | PDF export button clicked |
| `dm_gumroad_click` | Gumroad template link clicked |
| `dm_consult_click` | "Book a call" CTA clicked |
| `dm_cross_component` | User navigates from one DM component to another |
| `dm_data_imported` | User imports data from a previous component |
| `portfolio_tool_launch` | Any interactive tool opened (calculator, dashboard, etc.) |
| `case_study_view` | Any case study page viewed |

### 5.5 Gumroad integration

**Requirement:** Each Demand Machine component has a "Buy Notion Template" CTA linking to a Gumroad product page.

**Implementation:** Simple external links — no embedded checkout needed for V1. Links should include UTM parameters: `?utm_source=saren_ai&utm_medium=demand_machine&utm_campaign=[component_name]`

### 5.6 Consultation booking

**Requirement:** "Book a call" CTAs throughout the site.

**Implementation:** External link to HubSpot meeting scheduler or Calendly. Should open in new tab. Link should be configurable from a single constant (e.g., `src/lib/constants.ts`) so it can be updated globally.

---

## 6. Design system updates

### 6.1 New component: `DemandMachineHeader`

Consistent header for all five Demand Machine component pages:
- Component number and title (e.g., "Step 2 of 5 — Messaging Framework")
- One-sentence value prop
- Two entry buttons: [Start fresh] [Import previous data]
- Breadcrumb: Portfolio → Demand Machine → [Component]

### 6.2 New component: `DemandMachineProgress`

Horizontal progress indicator showing all five stages:
- Current stage highlighted in ember red
- Completed stages shown with checkmark
- Future stages shown muted
- Clickable to navigate between components (if data exists)

### 6.3 New component: `ComponentActionBar`

Sticky bottom bar (or floating bar on scroll) with three actions:
- [Download PDF] — primary, ember red
- [Buy Template — $XX] — secondary, outlined
- [Book a Call] — tertiary, text link

### 6.4 New component: `ContextBanner`

"Better with context" banner for components 2–5:
- Soft background (light electric blue / ash)
- Copy: "This works best with data from [Previous Component]. [Start there →] or continue on your own."
- Dismissible (stores dismissal in localStorage)

### 6.5 Badge system for portfolio cards

Two badge variants for the portfolio grid:
- `Interactive` — ember red background, white text
- `Case Study` — electric blue background, white text

---

## 7. Route architecture (final)

### New routes to create

```
/portfolio/demand-machine                → Demand Machine landing/overview page
/portfolio/demand-machine/interview      → Component 1: 36-Question Interview
/portfolio/demand-machine/messaging      → Component 2: Messaging Framework
/portfolio/demand-machine/content-planner → Component 3: Content Planner + Lead Scoring
/portfolio/demand-machine/outbound       → Component 4: Outbound Builder
/portfolio/demand-machine/lead-magnets   → Component 5: Social & Ad Program
```

### Existing routes — no changes

All current `/portfolio/*` routes remain intact. They serve as the "case study" / read-only versions of the work. The Demand Machine routes are the interactive, user-input-driven evolutions.

### New file structure

```
src/
├── app/portfolio/demand-machine/
│   ├── page.tsx                    → Overview/landing page
│   ├── interview/page.tsx          → Component 1
│   ├── messaging/page.tsx          → Component 2
│   ├── content-planner/page.tsx    → Component 3
│   ├── outbound/page.tsx           → Component 4
│   └── lead-magnets/page.tsx       → Component 5
├── components/demand-machine/
│   ├── DemandMachineHeader.tsx
│   ├── DemandMachineProgress.tsx
│   ├── ComponentActionBar.tsx
│   ├── ContextBanner.tsx
│   ├── PdfExport.tsx
│   ├── interview/                  → Interview-specific components
│   ├── messaging/                  → Messaging-specific components
│   ├── content-planner/            → Content planner components
│   ├── outbound/                   → Outbound builder components
│   └── lead-magnets/               → Lead magnet components
├── lib/demand-machine/
│   ├── types.ts                    → Shared types across all components
│   ├── interview.ts                → Interview questions, logic, scoring
│   ├── messaging.ts                → 21-step framework data + logic
│   ├── content-planner.ts          → Calendar logic, channel data
│   ├── outbound.ts                 → Sequence templates, timing logic
│   ├── lead-magnets.ts             → Lead magnet types, ad prompts
│   ├── pdf-generator.ts            → Shared PDF generation utilities
│   └── cross-component.ts          → Data import/export between components
```

---

## 8. Development priorities & phasing

### Phase 1 (Immediate — 4–6 weeks)

| Task | Type | Effort |
|------|------|--------|
| Portfolio grid reorganization (two-tier taxonomy) | UX refactor | S |
| Mega menu restructure | UX refactor | S |
| Case study page template (reusable components) | New components | M |
| Apply template to 2–3 existing case studies | Content | S |
| Homepage credibility bar + "try something" section | UX enhancement | M |
| Demand Machine landing page (`/portfolio/demand-machine`) | New page | S |
| Component 1: 36-Question Interview | New build | L |
| Component 2: 21-Step Messaging Framework | New build (evolves existing) | L |
| PDF export system (shared) | Infrastructure | M |
| ComponentActionBar + ContextBanner + Progress | New components | S |

### Phase 2 (Weeks 7–12)

| Task | Type | Effort |
|------|------|--------|
| Component 3: 120-Day Content Planner + Lead Scoring | New build (evolves existing) | L |
| Component 4: 10-Touch Outbound Builder | New build (evolves existing) | L |
| Cross-component data flow (localStorage) | Infrastructure | M |
| Analytics event implementation | Infrastructure | S |
| Apply case study template to remaining portfolio pieces | Content | S |

### Phase 3 (Weeks 13–16)

| Task | Type | Effort |
|------|------|--------|
| Component 5: Social & Ad Lead Magnet Program | New build | L |
| Gumroad integration (UTM links, template pages) | Integration | S |
| Homepage "Demand Machine" teaser section | UX enhancement | S |
| Performance optimization pass | Engineering | M |

**Effort key:** S = 1–3 days, M = 3–7 days, L = 1–3 weeks

---

## 9. Open questions for Antigravity

1. **Component independence vs. awareness:** Recommendation is "allow independence, encourage sequence." Each component accepts manual input, but shows a soft banner if previous component data exists in localStorage. Does the team agree with this approach, or do we want stricter gating?

2. **PDF generation approach:** Client-side (`@react-pdf/renderer` or `html2pdf.js`) vs. server-side (Puppeteer via API route). Client-side is simpler and avoids infrastructure, but less control over layout. What's the team's preference?

3. **Data persistence beyond localStorage:** Is there any appetite for a lightweight backend (Supabase, Vercel KV) for V1, or should we defer all persistence beyond localStorage to V2?

4. **Consultation booking integration:** Is HubSpot meeting scheduler already set up, or do we need to configure Calendly or equivalent? What's the current CTA destination?

5. **Analytics stack:** What's currently implemented? (GA4? Vercel Analytics? Something else?) We need to confirm before defining the event taxonomy.

6. **Existing case study pages:** When we build the interactive Demand Machine versions, should the original case study pages get a banner linking to the new interactive tool? (e.g., "Want to build your own? Try the interactive version →")

7. **Mobile experience:** The Demand Machine components are complex interactive tools. What's the mobile strategy — responsive with simplified inputs, or desktop-first with a "best experienced on desktop" notice on mobile?

8. **Gumroad template creation:** Is Saren responsible for building the actual Notion templates on Gumroad, or does Antigravity have a role in template design/packaging?

---

## 10. Success criteria

**Portfolio/Brand:**
- Unique visitors to each Demand Machine component
- Time spent in interactive experiences (target: 3+ minutes average)
- PDF downloads by component

**Conversion:**
- Gumroad template click-through rate per component
- Consultation booking rate from Demand Machine pages vs. general site average
- Template purchase → consultation booking progression

**Engagement:**
- Component completion rate (started vs. reached output preview)
- Multi-component users (how many visitors use 2+ components)
- Return visitor rate on Demand Machine pages

---

## Appendix A: Existing benchmark data files

The project includes CSV benchmark datasets that should power Components 3 and 5:

| File | Contents | Used by |
|------|----------|---------|
| `funnel_conversion_rates_by_channel.csv` | Channel-level funnel conversion | Component 5 |
| `free_trial_freemium_conversion_by_industry.csv` | 16 industries, trial/freemium rates | Component 3 |
| `traffic_to_lead_by_industry.csv` | 32 industries, conversion rates | Components 3, 5 |
| `traffic_to_lead_by_source.csv` | Traffic source conversion rates | Component 5 |
| `cac_by_marketing_channel.csv` | 25 channels, B2B vs B2C CAC | Component 5 |
| `conversion_rate_by_page_type.csv` | 9 page types, conversion rates | Component 3 |
| `saas_funnel_stages_benchmarks.csv` | 12 phases, full-funnel metrics | Components 1, 3 |
| `saas_conversion_rate_overview.csv` | SaaS conversion overview | Components 1, 3 |
| `cac_by_industry_and_customer_type.csv` | 29 industries × 4 customer types | Components 3, 5 |

These files are already in the project root and can be imported as static data or loaded at build time.

---

## Appendix B: Key metrics from Saren's portfolio (for case study templates)

Use these verified metrics when populating the `OutcomeMetrics` component:

**Cylance (acquired by BlackBerry for $1.4B):**
- 550% YoY increase in intent-driven traffic
- $4M/quarter pipeline from automated digital channels
- 8:1 ROI on demand generation
- 23% conversion surge on demand gen forms
- 8× YoY increase in ABM traction

**WethosAI:**
- 344% increase in inbound leads (implied from 5× lead gen surge + additional growth)
- 28% demo-to-opportunity conversion improvement
- 41% of pipeline content-assisted
- 22% organic growth QoQ

**Qwiet AI:**
- 70% reduction in Google Ads spend while boosting conversion 30%
- 5× lead generation surge in first 6 weeks
- 300% increase in LinkedIn inbound leads in one quarter
- 50% improvement in full-funnel conversion

**BlackBerry (post-acquisition):**
- $2.3M paid media budget managed
- 40% boost in organic traffic via SEO
- 550% YoY SEM traffic growth
- 33% visitor-to-lead conversion improvement on product pages

---

*End of brief. Questions → saren.sakurai@gmail.com*
