# Brief: Intent Data Portfolio Page — saren.ai
**File:** `intent-data-page-brief.md`  
**For:** Claude Code  
**Output:** `/pages/intent-data.tsx` (or equivalent for saren.ai stack)  
**Status:** Build-ready

---

## Overview

Build a single portfolio page on saren.ai that documents a real intent data methodology developed and executed at Cylance (2018). The page should function as a thought leadership artifact — demonstrating deep, data-driven demand gen thinking to prospects and peers. It is not a case study; it's a methodology showcase.

**Core story:** Pulled Bombora intent data for ~100 Cylance close/won enterprise accounts, mapped intent signal behavior from 18 months pre-close back to purchase. From that data, identified what buyers were researching at each funnel stage and built "just-in-time" content mapped to those signals — resulting in measurable lift in conversion metrics.

---

## Page Architecture

### Layout
- Dark background, editorial/data-science aesthetic
- Full-width hero section with a brief framing statement
- Tabbed interface housing 4 data views (see tabs below)
- Tabs persist on scroll; content area updates below

### Typography & Aesthetic Direction
- Dark theme: near-black background (`#0a0c0f` or similar), off-white text
- Monospace or semi-monospace for data labels and table content (e.g., `JetBrains Mono`, `IBM Plex Mono`)
- Display font with editorial character for headings (e.g., `Syne`, `Neue Haas Grotesk`, or similar — avoid generic choices)
- Accent color: electric cyan or amber — one strong signal color used sparingly
- Subtle grid/noise texture in background
- Table cells, hover states, and tab transitions should feel precise and intentional — not flashy

---

## Section 1: Hero

**Headline:**  
`Intent Data as Funnel Intelligence`

**Subhead:**  
`At Cylance, I pulled Bombora intent data across ~100 close/won enterprise accounts and mapped exactly what those buyers were researching — 18 months out to the day they signed. The result: a predictable signal model that let me serve the right content at the right time, and move conversion metrics.`

**Visual cue:** A subtle timeline graphic or horizontal axis showing 18 Mo → 0 Mo (Close/Won), with the concept of signal intensity increasing toward the right. Can be SVG-drawn — simple, not decorative.

---

## Section 2: Tabbed Data Interface

### Tab Labels (in order)
1. **Intent Timeline** _(default active)_
2. **Buyer Journey**
3. **Campaign Strategy**
4. **ABM Triggers**

---

### Tab 1: Intent Timeline

**Concept:** Interactive table showing the top intent keywords that surged across close/won accounts for each 3-month period from 18 months pre-close to 0-3 months pre-close.

**Data (6 columns — display top 8-10 rows per period):**

| Period | Top Keywords |
|--------|-------------|
| 15–18 Mo Pre-Close | Endpoint Security, Managed Security Services, Email Security, Computer Hacking, Security Solutions, Anti Spam, Security Tools, Malware Detection |
| 12–15 Mo Pre-Close | Security Solutions, Computer Hacking, Managed Security Services, Cyber Security Framework, Anti Virus, Email Security, Security Monitoring, Malware Detection, Security Breaches |
| 9–12 Mo Pre-Close | Computer Hacking, Security Solutions, Cyberwarfare, Malware Detection, Security Monitoring, Security Tools, Symantec (SYMC), System Monitors, Endpoint Security, Security Breaches |
| 6–9 Mo Pre-Close | Cyberwarfare, Computer Hacking, Symantec (SYMC), Security Tools, Malware Detection, Malware Attacks, Security Monitoring, Anti Spam, System Monitors, Ransomware |
| 3–6 Mo Pre-Close | Cyberwarfare, Cyber Threats, Security Tools, Computer Hacking, Malware Detection, Email Security, Fraud Detection and Prevention, Symantec (SYMC), Security Monitoring, Anti Spam |
| 0–3 Mo Pre-Close | Security Tools, Email Security, Security Monitoring, Symantec (SYMC), Malware Attacks, System Monitors, Data Encryption, Security Intelligence, Cyberwarfare, Security Threats |

**Interaction:**
- The 6 time periods display as columns in the table
- Each keyword cell has a **hover state** that surfaces a tooltip or inline callout with the following context:

**Hover state content per period (use these as the messaging layer):**

- **15–18 Mo:** `"Early posture research. Buyers are assessing whether their current stack is adequate — not yet alarmed by a specific threat. Compliance and framework topics confirm a governance trigger may be initiating the cycle."`
- **12–15 Mo:** `"Threat awareness doubles. Security Breaches enters the top 10 with the highest lift (+147%) of any topic in this period. Buyers are reading about breaches — but still through a solutions lens."`
- **9–12 Mo:** `"The inflection point. Threat topics surge. Cyberwarfare jumps from #13 to #3. Ransomware enters the top 15. Symantec appears for the first time — vendor research has begun."`
- **6–9 Mo:** `"Peak anxiety. Cyberwarfare hits 306 surges — the highest volume of any topic across all periods. Buyers are consuming threat content voraciously. Evaluation of legacy vendors is active."`
- **3–6 Mo:** `"Active evaluation begins. Buyers shift from 'what's the threat?' to 'what stops it?' Security Tools, Malware Detection, and Fraud Detection signal tool-shopping and internal business case building."`
- **0–3 Mo:** `"Final vendor selection. Security Intelligence (+127% lift) and Security Threats (+125% lift) are the sharpest purchase-intent signals. Decision friction is what kills deals at this stage."`

**Optional visual enhancement:** Color-code keyword cells by category — Solutions (blue), Threats (amber/orange), Vendors (muted red/rose), Compliance (green) — with a small legend below the table.

---

### Tab 2: Buyer Journey

**Concept:** A narrative view of how intent signals evolve. Shows which topics persisted across 4+ time periods — the "backbone" of the buyer journey.

**Data (topics appearing in 4+ periods):**

| Topic | 15–18 Mo | 12–15 Mo | 9–12 Mo | 6–9 Mo | 3–6 Mo | 0–3 Mo | Periods |
|-------|----------|----------|---------|--------|--------|--------|---------|
| Security Monitoring | #10 | #7 | #5 | #7 | #9 | #3 | 6 of 6 |
| Computer Hacking | #4 | #2 | #1 | #2 | #4 | — | 5 of 6 |
| Security Tools | #7 | — | #6 | #4 | #3 | #1 | 5 of 6 |
| Malware Detection | #8 | #9 | #4 | #5 | #5 | — | 5 of 6 |
| Email Security | #3 | #6 | — | — | #6 | #2 | 4 of 6 |
| Cyberwarfare | — | — | #3 | #1 | #1 | #9 | 4 of 6 |
| Symantec (SYMC) | — | — | #7 | #3 | #8 | #4 | 4 of 6 |

**Phase narrative (display as labeled sections or accordion):**

- **Phase 1 (15–18 Mo) — "Do we have a problem?"**  
  Broad category research. Buyers are assessing posture, not hunting vendors. Endpoint Security, Managed Security Services. Compliance frameworks appear early — governance or audit triggers likely initiating the cycle. Content play: awareness assets, security maturity benchmarks.

- **Phase 2 (12–15 Mo) — "What should we worry about?"**  
  Threat awareness doubles. Security Breaches enters the top 10 (+147% lift). Buyers are reading about attacks but still framing them through a solutions lens. Content play: breach case studies, "why traditional AV fails" narratives.

- **Phase 3 (9–12 Mo) — "It's worse than we thought"**  
  Inflection point. Computer Hacking takes #1. Cyberwarfare jumps from #13 to #3. Symantec appears for the first time — vendor research has begun. Content play: urgency-building, "next-gen vs. legacy" framing, competitive positioning.

- **Phase 4 (6–9 Mo) — "Who can actually stop this?"**  
  Peak threat volume. Cyberwarfare hits 306 surges. Ransomware spikes. Vendor comparison in full swing. Content play: threat intelligence reports, cost-of-breach calculators, head-to-head comparisons.

- **Phase 5 (3–6 Mo) — "We need to evaluate tools"**  
  Shift to evaluation. Security Tools, Malware Detection, Security Forensics (+103% lift). Buyers are tool-shopping and building internal business cases. Content play: POC programs, ROI models, TCO comparisons.

- **Phase 6 (0–3 Mo) — "Time to decide"**  
  Sharpest signals. Security Intelligence (+127% lift), Security Threats (+125% lift), Data Encryption (+85% lift). Symantec still at #4 — competitive pressure runs to the finish line. Content play: deployment guides, competitive knockdowns, executive-ready briefs.

---

### Tab 3: Campaign Strategy

**Concept:** How the intent data mapped to a quarterly campaign framework. Illustrate the strategic layer — four quarterly campaigns, each targeting a different funnel stage, cycling prospects from first awareness through close.

**Layout suggestion:** Timeline/roadmap cards — Q1 through Q4 as horizontal tiles or vertical stacked sections.

**Q1 — "The Security Audit" (Top-of-Funnel)**  
Buyer phase: 15–18 and 12–15 months pre-close  
Intent signals: Endpoint Security, Managed Security Services, Email Security, Cyber Security Framework  
Concept: Security Posture Assessment / Maturity Model. Buyers asking "are we covered?" need a framework to answer that.  
Content: State of Endpoint Security report, self-assessment tool, CISO webinar series  
KPIs: Net-new contacts from gated assets, Bombora surge correlation, engagement depth

**Q2 — "Under Attack" (Mid-Funnel / Threat Education)**  
Buyer phase: 9–12 and 6–9 months pre-close  
Intent signals: Computer Hacking, Cyberwarfare, Ransomware, Malware Attacks, Security Breaches  
Concept: Threat-forward campaign building urgency. This is peak anxiety — 306 Cyberwarfare surges, 291 Computer Hacking. Lean into it.  
Content: Quarterly Threat Intelligence Report, anatomy-of-an-attack interactives, breach cost calculator, competitive wedge content  
KPIs: Influenced pipeline, MQL-to-SQL conversion, surge-to-engagement correlation

**Q3 — "Prove It" (Evaluation / Bottom-of-Funnel)**  
Buyer phase: 3–6 months pre-close  
Intent signals: Security Tools, Malware Detection, Security Forensics (+103% lift), Cyber Threats  
Concept: Buyers are tool-shopping and building internal business cases. Give them proof and ammunition.  
Content: Technical whitepaper, third-party test results, customer case studies by vertical, POC program, ROI/TCO comparison tool  
KPIs: POC requests, sales-accepted opportunities, competitive win rate, deal velocity

**Q4 — "Decision Time" (Purchase / Close)**  
Buyer phase: 0–3 months pre-close  
Intent signals: Security Tools (#1), Security Intelligence (+127% lift), Data Encryption (+85% lift), Security Threats (+125% lift)  
Concept: Remove friction. These are the sharpest purchase-intent signals in the data. Every content piece at this stage should reduce switching risk and help champions sell up.  
Content: Competitive knockdown guides (Symantec still top 5), deployment/integration guides, executive security brief, customer success stories focused on time-to-value  
KPIs: Close rate, deal size, time-to-close, competitive displacement rate

**Global brand overlay:**  
Theme: *"The Threat Has Evolved. Your Defense Should Too."*  
Three always-on content pillars:  
1. Threat Intelligence — feeds the 6–12 month alarm phase  
2. Prevention Science — differentiates from legacy detection  
3. Proof & Validation — closes the loop

---

### Tab 4: ABM Triggers

**Concept:** A practical reference card showing which high-lift intent topics indicate which buying stage. The actionable distillation of the whole analysis — the signal-to-action map.

**Data:**

| Stage | Timeframe | High-Lift Topics | What to Do |
|-------|-----------|-----------------|------------|
| Early Research | 12–18 Mo Pre-Close | Security Breaches (+147%), Endpoint Security (+60%), Anti Spam (+98%), Security Solutions (+55%) | Enroll in awareness nurture. Prioritize for brand content. Flag for BDR awareness outreach. |
| Building Urgency | 6–9 Mo Pre-Close | Ransomware (+127%), Anti Spam (+127%), Malware Attacks (+91%), Symantec (+77%), Computer Hacking (+67%) | Escalate to threat-education track. Begin sales notification. Add to ABM target list. |
| Active Evaluation | 3–6 Mo Pre-Close | Security Forensics (+103%), Anti Spam (+56%), Email Security (+46%), Malware Detection (+42%) | Trigger sales outreach sequence. Serve POC/trial offers. Deploy competitive content. |
| Immediate Purchase Intent | 0–3 Mo Pre-Close | Security Intelligence (+127%), Security Threats (+125%), Data Encryption (+85%), Malware Attacks (+65%) | Immediate sales priority. Executive briefing offer. Competitive knockdown ready. Remove all friction. |

**Design note:** This tab should feel like a quick-reference card. Bold the lift percentages. Use color-coding consistent with Tab 1 (stage-based). Could include a simple "signal score → action" flow visual.

---

## Section 3: Methodology Note (Below Tabs)

Brief, plain-language callout section explaining the data source and process. Not a wall of text.

> **How this was built:**  
> Pulled Bombora intent data from ~100 Cylance close/won enterprise accounts (Jan–Jun 2018). Analyzed intent surge activity across 6 three-month windows from 18 months pre-close through close/won. Compared surge frequency and topic ranking against a non-buyer comparison group to calculate lift. The output: a signal model that let the demand gen team know what content to serve, to whom, and when — based on observed behavior from real buyers.

---

## Technical Notes for Claude Code

- **Framework:** Match existing saren.ai stack (Next.js + Tailwind assumed — verify)
- **Tab state:** Use `useState` for active tab; no router-level tab state needed
- **Hover tooltips:** Use a lightweight tooltip (Radix `Tooltip` or custom CSS — no heavy libraries)
- **Animations:** Subtle fade on tab switch, staggered row entrance on table render — keep it fast
- **Mobile:** Tabs stack vertically on mobile; table converts to card view at `<768px`
- **No backend needed:** All data is static; hardcode in the component
- **Fonts:** Import from Google Fonts or local — confirm what's already in the saren.ai font stack before adding new
- **Color tokens:** Use existing saren.ai design tokens where they exist; introduce new tokens only if needed for the accent/data colors specific to this page

---

## Deliverable

A single page component (`intent-data.tsx` or `.jsx`) plus any necessary static data file (`intent-data.ts`) if the data is factored out. Page should be linkable from the portfolio/work section of saren.ai.

---

*Brief prepared: March 2026*  
*Source data: Bombora / Cylance, 2018*
