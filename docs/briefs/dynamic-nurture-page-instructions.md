# saren.ai — Dynamic Email Nurture Page
## Claude Code Build Instructions

---

## Overview

Build a single standalone page for **saren.ai** that illustrates the concept of **dynamic email nurture** — a system where email content is personalized by both audience segment and funnel stage simultaneously. The goal is intuitive understanding for a visitor in ~30 seconds, no deep reading required.

This is a portfolio/thought-leadership page, not a product page. It should read as sophisticated systems thinking, elegantly visualized.

---

## Page Location & Integration

- **Route**: `/nurture` or `/work/dynamic-nurture` (match saren.ai routing convention)
- **File**: Create as a standalone page component matching the existing site stack (check current framework — likely Next.js or similar)
- **Nav**: Add a subtle link from the main nav or work section if appropriate; otherwise treat as a direct-link page

---

## Content Architecture

The page has **four sections**:

### 1. Hero / Premise

**Headline**: "Email That Knows Who You Are"  
**Subhead**: One sentence — something like: *A system that delivers different content to the right person at the right stage — automatically.*

Keep it short. No body copy block here. Let the visual do the work.

---

### 2. The Core Concept: The Matrix (Primary Visual)

This is the centerpiece. Build an **interactive 3×3 grid** showing the intersection of:

**Rows (Audience Segment):**
- Enterprise
- SMB
- Individual

**Columns (Funnel Stage):**
- Awareness
- Consideration
- Decision

Each cell = a unique email content type. 9 total combinations.

**Interaction design:**
- On load, all 9 cells are visible but subdued
- Hovering a **row** highlights the full row (same audience, all stages)
- Hovering a **column** highlights the full column (all audiences, same stage)
- Clicking a **cell** expands it to show a brief description of what that email does — 1-2 sentences max
- A subtle animated line traces a non-linear path through the grid on load, suggesting contacts don't always progress horizontally — they can advance diagonally based on behavioral scoring

**Cell content (write these into the component):**

| | Awareness | Consideration | Decision |
|---|---|---|---|
| **Enterprise** | Establishes the problem at scale. Thought leadership framing. No product pitch. | Introduces the methodology. Social proof from peer companies. | Case study + direct ask for a strategic conversation. |
| **SMB** | Pain-point led. Fast read. Acknowledges resource constraints. | Comparison framing. How this fits lean teams. | ROI-focused. Simple next step. |
| **Individual** | Personal, direct. Speaks to career/professional growth angle. | Skill or outcome focused. Peer stories. | Low-friction CTA. Trial, demo, or resource download. |

**Visual style for the matrix:**
- Clean, grid-based layout with clear labels
- Each cell should feel like a distinct content card — subtle background differentiation by column (stage) using opacity/tint
- The animated crossing path should use SVG `stroke-dashoffset` animation — a soft coral/orange line that draws itself on load

---

### 3. The Routing Logic (Secondary Visual)

A clean, designed flowchart — not a screenshot, not a stock diagram. Built as a page element using the same design tokens as the rest of the page.

#### Entry sources

Two entry types feed into the system:

**Net new leads:**
- Non-hand raiser (form or list load) → enters scoring immediately
- Hand raiser (form or list load) → goes directly to MQL check

**Existing contacts:**
- Recycled opps (closed/lost, stalled) and existing DB (one-time batch) → subscription consent check
  - Not subscribed → Goodbye campaign (6-month no-activity trigger)
  - Subscribed → enters scoring, joins KLT nurture

#### Lead scoring model

All contacts entering nurture are scored on a **0–100 composite scale**:

- **50 points — Fit score** (static, set on entry)
  - Job title / seniority
  - Industry / ICP match
  - Company size

- **50 points — Behavior score** (dynamic, updated on every signal)
  - Email opens and clicks
  - Web visits
  - Content downloads
  - Social follows

- **MQL threshold: 75 points**
- Score is re-evaluated on every new behavioral signal — contacts can advance stages at any time

#### Know, Like, Trust (KLT) nurture — stage bands

Score gates route contacts into one of three tracks:

| Stage | Score range | Content focus |
|---|---|---|
| Awareness | 0 – 39 | Problem-led content. No product pitch. |
| Consideration | 40 – 74 | Solution-led content. Methodology, proof points. |
| Decision | 75 – 90 | MQL achieved. Sales-assisted. Post-MQL nurture. |

#### Decision stage — sales handoff

When a contact crosses **75**, the system:
1. Triggers MQL status in CRM
2. Notifies the assigned Sales rep
3. Hands off nurture control — sequences are now **manually managed by the rep**

Sales toolkit at this stage:
- 1:1 sequences curated by the rep
- Case studies, ROI content, competitive comparisons
- Proposal, pricing, contract delivery

Scoring continues to run in the background through the Decision stage (75–90).

#### Exit

- **Score 91+** = contract sent signal → contact exits all nurture
- **Closed/won** = remove from all nurture entirely

#### Re-score loop

On every behavioral signal, score is recalculated and the contact's stage is updated. There is no scheduled batch re-evaluation — advancement is continuous.

#### Goodbye campaign

Contacts with no activity for 6 months are routed to a sunset sequence and marked inactive. Strategic/ABM accounts are exempt and handled separately outside this system.

---

**Key labels to include in the visual:**
- "First-Touch Demo Accelerator" — hand raisers bypass KLT for a 30-day fast track to demo conversion
- "Know, Like, Trust" — the automated nurture engine, score-gated
- "Sales takes control" — the Decision stage handoff moment, visually distinct from the automated tracks
- "Goodbye" — the 6-month inactivity exit

**Visual treatment for the flowchart:**

Use distinct node colors to encode node type — not sequence:

| Color | Meaning |
|---|---|
| Teal | Net new lead entry nodes |
| Purple | Existing contact entry nodes |
| Amber | Score gates and decision points |
| Coral | Exit / action nodes (Goodbye, Opp closed/won) |
| Pink / rose | Sales-led nodes (Decision stage, post-MQL handoff) |

The Decision stage and everything below it should read as a visually distinct zone — Sales territory, not marketing automation. The pink/rose color signals this mode shift clearly.

---

### 4. Signal & Context Footer (Minimal)

A closing note — 2-3 lines:

> *This system was designed to eliminate the "one size fits all" problem in B2B nurture. The matrix ensures relevance at every touchpoint. The routing logic ensures no lead falls through without a signal.*

Optional: A small "Built with" tool stack callout (HubSpot, Apollo) if appropriate for the saren.ai context.

---

## Design Direction

**Aesthetic**: Editorial/systems — think a beautifully typeset technical document meets a product strategy deck. Precise, confident, not loud.

**Palette**:
- Dark background (deep charcoal or near-black)
- Off-white/warm white type
- Primary accent — coral/orange (`#D4624A` or similar) for animated path lines and highlights
- Teal for net-new/automated nodes
- Rose/pink for the sales-led Decision zone — signals a mode shift from marketing automation

**Typography**:
- Display/heading: `DM Serif Display`, `Playfair Display`, or `Fraunces`
- Body/labels: `Syne`, `Epilogue`, or `Space Mono` for data labels
- Avoid: Inter, Roboto, system-ui

**Motion**:
- Page load: staggered fade-in of sections (subtle)
- Matrix grid: cells scale up slightly on load
- Routing diagram: nodes appear sequentially on scroll-into-view
- Path line in matrix: draws itself using `stroke-dasharray` / `stroke-dashoffset` animation

**Layout**:
- Max-width content container, generous padding
- Matrix is the dominant visual — give it room
- Flowchart sits below the matrix, full-width, reads top to bottom
- On mobile: matrix columns collapse to tabs or accordion by stage; flowchart stacks vertically with reduced node width

---

## Technical Notes

- Check saren.ai's current component/styling system before writing new CSS — extend it, don't conflict
- If the site uses Tailwind, use utility classes; if CSS modules or global CSS, match that pattern
- Matrix interaction should work without heavy JS frameworks — vanilla JS or lightweight React state is fine
- SVG path animation: `stroke-dashoffset` on load for the crossing line
- Flowchart: build as inline SVG or a structured HTML/CSS node tree — not an image
- Accessibility: matrix cells need keyboard navigation and ARIA labels; flowchart nodes need readable text alternatives

---

## Files to Create/Modify

1. **New page component** — e.g., `pages/nurture.tsx` or `app/nurture/page.tsx`
2. **Styles** — co-located module or additions to global stylesheet
3. **No new dependencies** unless strictly necessary

---

## Out of Scope

- Backend/data fetching — all static content
- Actual email previews or screenshots
- CMS integration
- Parking Lot nurture types (match advertising, upsell, recycle, ABM) — not ready, exclude entirely
