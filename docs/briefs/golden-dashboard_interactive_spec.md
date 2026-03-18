# Golden Dashboard: interactive funnel simulator (Cursor build spec)

This module is a **decision model UI**: editable assumptions on the left → recomputed funnel outcomes on the right. It should feel like a “funnel instrument panel,” not a static chart.

> Tagline above module: **“This isn’t a dashboard. It’s a decision model.”**

---

## 1) Objective

Build a **hero-level interactive funnel** that:
- **Teaches** the viewer what each metric means (hover definitions).
- **Explains** what drives each metric (click overlays).
- **Simulates** the impact of spend + conversion changes (calculator mode).
- **Showcases consulting thinking**: diagnostic logic, levers, tradeoffs, benchmarks, and caveats.

Primary audience: B2B SaaS executives / founders / marketing leaders.

---

## 2) UX overview (what the viewer can do)

### A) Hover (quick comprehension)
- Hover any tile or arc → **tooltip** with:
  - 1-line definition (common terms > jargon)
  - Formula (short)
  - “Why it matters” (1 line)
  - Typical benchmark range (optional toggle) + citation link

### B) Click (depth)
- Click any tile or arc → **side drawer** (preferred) or modal containing:
  1) Definition (simple)
  2) Formula
  3) What moves it (controllable levers)
  4) Common failure modes (diagnostic patterns)
  5) What I do in consulting (playbook)
  6) Benchmark range + caveats + citations

### C) Calculator mode (simulate)
- Inputs / sliders update the model live.
- Show “what changed” explanation (causal chain):  
  “Because CTR increased from 2.1% → 2.8%, clicks rose +33%, which flowed to +X closes.”

---

## 3) Layout spec (hero module)

### A) Top row: funnel tiles (left → right)
Each tile shows:
- **Primary number** (volume)
- Secondary line: **rate or unit cost** (e.g., CTR, CPL)
- Delta pill vs baseline (optional): +/− %
- Hover + click enabled

**Tiles (recommended ordering):**
1. Spend (input)
2. Impressions (derived) + CPM
3. Clicks (derived) + CTR + CPC
4. Leads (derived) + click→lead CVR + CPL
5. **MQLs** (rename from “Qualified Leads”) + lead→MQL + CP-MQL
6. Opportunities + MQL→Opp + CPOpp
7. **Sales meetings** (rename from “First meetings”) + Opp→Meeting + Cost/Meeting
8. Closed-won + Win rate (Meeting→Close or Opp→Close) + Cost/CW

### B) Arcs (conversion connectors)
Arcs between tiles display key conversion rates:
- CTR (Impressions→Clicks)
- Click→Lead CVR
- Lead→MQL
- MQL→Opp
- Opp→Meeting (Sales meeting rate)
- Meeting→Close (Win rate)

Arcs are also click targets to open “conversion step” overlays.

### C) Toggle layer (optional, recommended)
- Toggle: **Show benchmark ranges**
- When on: each tile shows a small bar or min/max range with a marker on current value.

---

## 4) Data model (single source of truth)

### A) Core derived volumes
Use one function to compute all stages based on assumptions.

**Formulas:**
- impressions = spend / (cpm / 1000)
- clicks = impressions * ctr
- leads = clicks * click_to_lead_cvr
- mqls = leads * lead_to_mql
- opps = mqls * mql_to_opp
- sales_meetings = opps * opp_to_meeting
- closed_won = sales_meetings * meeting_to_close  *(or use opp_to_close in advanced mode)*

### B) Unit costs
- cpc = spend / clicks
- cpl = spend / leads
- cpmql = spend / mqls
- cpopp = spend / opps
- cpmeeting = spend / sales_meetings
- cpcw = spend / closed_won

### C) Guardrails (avoid NaN/Infinity UI)
- Clamp all rates to [0, 1].
- If denominator is 0: show “—” + tooltip (“No volume yet”).

---

## 5) Interaction + state rules

### A) Baseline vs current
- Store two sets of assumptions:
  - baselineAssumptions (default or last-saved)
  - currentAssumptions (live edits)
- Deltas should compare current to baseline.

### B) Inputs (Simple mode)
Editable inputs:
- spend
- cpm
- ctr
- click_to_lead_cvr
- lead_to_mql
- mql_to_opp
- opp_to_meeting
- meeting_to_close

### C) Advanced mode toggle (optional)
Split assumptions by more granular steps:
- channel mix: paid search / paid social / linkedin / etc.
- separate: MQL→SQL and SQL→Opp
- alternate win model: Opp→Close rather than Meeting→Close

### D) “What changed?” narrative
After any edit, show a small explanation area:
- “Primary driver: CTR increased → clicks increased → leads increased → … → closed-won increased.”
- Highlight the **largest contributing step** (the bottleneck or boost).

---

## 6) Benchmarks (defaults + citations)

These are **starting points**, not truth. Use ranges and disclaimers:
- “Benchmarks vary by ACV, audience, offer, sales motion, and definitions.”
- “Definitions matter more than benchmarks (e.g., what counts as an MQL).”

**Suggested defaults:**
- Paid search CTR (B2B): ~2.1% average  
  Source: First Page Sage – CTR benchmarks by industry  
  https://firstpagesage.com/reports/clickthrough-rates-ctrs-by-industry/

- Landing page conversion (broad B2B): ~6.6% median  
  Source: Unbounce – B2B conversion benchmarks  
  https://unbounce.com/conversion-rate-optimization/b2b-conversion-rates/

- Lead → MQL (B2B SaaS): ~39% (definition-sensitive)  
  Source: First Page Sage – Lead-to-MQL benchmarks  
  https://firstpagesage.com/reports/lead-to-mql-conversion-rate-benchmarks-by-industry-channel-fc/

- Opportunity → Close (B2B): ~15–30% range (wide variance)  
  Source: HiBob – Sales funnel conversion benchmarks discussion  
  https://www.hibob.com/blog/sales-funnel-conversion-rate/

**Implementation note:** store benchmark data as `{ metricId: { low, typical, high, citationUrl } }`.

---

## 7) Content spec: tooltips and overlays

### A) Tooltip format (hover)
- Title: metric name
- Definition: one sentence, plain language
- Formula: short
- Why it matters: one sentence
- Benchmark range: (optional toggle)
- Link: “Source”

### B) Overlay (click) template
For each metric or conversion step:
1) Definition (plain)
2) Formula
3) What moves it (levers)
4) Common failure modes (patterns)
5) Consulting playbook (what I do)
6) Benchmarks + caveats + sources

### C) Example overlay content (click→lead CVR)
- Definition: % of clicks that become leads.
- Formula: leads / clicks.
- Levers: message match, offer, page speed, proof, form friction, CTA clarity.
- Failure modes:
  - High CTR + low CVR → mismatch between ad promise and landing page.
  - Low CTR + high CVR → targeting/creative bottleneck (good offer, weak reach).
- Consulting playbook:
  - Message match audit (ad → page)
  - Offer ladder + proof upgrades
  - Friction test (fields, steps)
  - Speed + mobile UX pass
  - A/B test plan with prioritized hypotheses

Replicate this structure for each tile and arc.

---

## 8) Component architecture (Cursor build plan)

### Recommended stack
- Next.js (React)
- State: Zustand or useReducer
- UI: Drawer/Modal + Tooltip components from your design system
- Optional: Framer Motion for number transitions and delta animations

### Proposed components
- `GoldenFunnelSimulator`
  - `FunnelControls` (spend + toggles + presets)
  - `FunnelRow` (tiles)
    - `FunnelTile`
  - `FunnelArcs` (conversion connectors)
    - `FunnelArc`
  - `InsightNarrative` (“what changed”)
  - `MetricDrawer` (overlay content)

### Data structures (TypeScript shape)
```ts
type Assumptions = {
  spend: number;
  cpm: number;
  ctr: number; // 0..1
  clickToLead: number; // 0..1
  leadToMql: number; // 0..1
  mqlToOpp: number; // 0..1
  oppToMeeting: number; // 0..1
  meetingToClose: number; // 0..1
};

type StageId =
  | "spend" | "impressions" | "clicks" | "leads"
  | "mqls" | "opps" | "sales_meetings" | "closed_won";

type MetricId =
  | "cpm" | "ctr" | "cpc" | "clickToLead" | "cpl"
  | "leadToMql" | "cpmql" | "mqlToOpp" | "cpopp"
  | "oppToMeeting" | "cpmeeting" | "meetingToClose" | "cpcw";

type Bench = { low: number; typical: number; high: number; citationUrl: string };

type MetricMeta = {
  id: MetricId;
  label: string;
  definition: string;
  formula: string;
  whyItMatters: string;
  levers: string[];
  failureModes: string[];
  playbook: string[];
  bench?: Bench;
};
```

### Compute function (single source of truth)
```ts
function computeModel(a: Assumptions) {
  const impressions = a.spend / (a.cpm / 1000);
  const clicks = impressions * a.ctr;
  const leads = clicks * a.clickToLead;
  const mqls = leads * a.leadToMql;
  const opps = mqls * a.mqlToOpp;
  const sales_meetings = opps * a.oppToMeeting;
  const closed_won = sales_meetings * a.meetingToClose;

  const safeDiv = (num: number, den: number) => (den > 0 ? num / den : null);

  return {
    stages: { impressions, clicks, leads, mqls, opps, sales_meetings, closed_won },
    unitCosts: {
      cpc: safeDiv(a.spend, clicks),
      cpl: safeDiv(a.spend, leads),
      cpmql: safeDiv(a.spend, mqls),
      cpopp: safeDiv(a.spend, opps),
      cpmeeting: safeDiv(a.spend, sales_meetings),
      cpcw: safeDiv(a.spend, closed_won),
    },
  };
}
```

---

## 9) Presets (instant credibility)

Add 3 preset buttons that load assumption sets:
- Early-stage B2B SaaS (low brand, higher CPM, lower CTR, lower win rate)
- Mid-market demand capture (balanced)
- Enterprise (higher CPM, lower CVR, lower win rate, longer cycle if modeled)

Presets should also update baselineAssumptions (so deltas make sense).

---

## 10) Copy/labels (maximize comprehension)

Use **common terms** and clarify on hover:
- “MQLs (marketing qualified leads)”
- “Sales meetings” (not “first meetings”)
- “Closed-won” (standard sales term)

Avoid ambiguous internal acronyms unless defined immediately on hover.

---

## 11) Nice-to-have polish (recommended)
- Animate numbers on change (subtle).
- Show bottleneck highlight: the lowest conversion step gets a small “Bottleneck” tag.
- Add “Reset to baseline” button.
- Add “Share scenario” (encode assumptions in URL querystring) for portfolio sharing.

---

## 12) Deliverable checklist (for Cursor)
1) Build `computeModel()` and test with default assumptions.
2) Build tiles row + arcs + tooltips.
3) Build drawer overlays driven by `MetricMeta` config.
4) Add calculator inputs + toggles + presets.
5) Add benchmark toggle with mini range bars.
6) Add “what changed” narrative and bottleneck highlight.
7) Ensure mobile-responsive behavior (stack tiles or horizontal scroll).

---

## 13) Default assumptions (starter set)
Use these as initial values (edit freely):
- spend: 100000
- cpm: 60
- ctr: 0.021
- clickToLead: 0.066
- leadToMql: 0.39
- mqlToOpp: 0.25
- oppToMeeting: 0.22
- meetingToClose: 0.20

These create realistic-ish volumes without getting too small or too huge.

---

## 14) Retrofit notes for existing page (/portfolio/golden-dashboard)

You already have a page at:
- https://www.saren.ai/portfolio/golden-dashboard

The current implementation appears to have limited interactivity (per owner note). The goal is to **replace or wrap** the current hero section with the new `GoldenFunnelSimulator` while keeping the rest of the page content intact (case study narrative, images, etc.).

### A) Find the current implementation
In the codebase, search for:
- route: `portfolio/golden-dashboard`
- page/component names containing: `GoldenDashboard`, `GoldenFunnel`, `Funnel`, `Dashboard`, `PortfolioCaseStudy`
- the image asset name: `golden-dashboard_1920x1080.png` (if referenced)

### B) Replace the hero section safely
1. Keep the page shell (layout, SEO meta, copy blocks).
2. Swap only the current “dashboard image / limited interaction” section for:
   - `<GoldenFunnelSimulator />`
3. Keep a fallback static image below the interactive module for accessibility/SEO and as a “print view”:
   - “Static view” accordion that reveals the original screenshot.
4. Ensure the interactive module is **client-rendered**, but the page is still indexable:
   - Next.js: render the page normally, but load the simulator with `dynamic(..., { ssr: false })` *only if necessary*.
   - Prefer SSR for surrounding copy.

### C) Migrate existing interactions (if any)
If you already have:
- tooltips
- a modal
- clickable tiles
…reuse the UI components, but **re-point everything** to the new data-driven system:
- Tooltips pull from `MetricMeta` config
- Drawer content pulls from `MetricMeta` config
- Numbers always come from `computeModel(currentAssumptions)`

### D) Single source of truth rule (no hardcoding)
A common failure mode is “values hardcoded per tile.” Avoid that by enforcing:
- All displayed stage volumes come from `model.stages`
- All unit costs come from `model.unitCosts`
- All rates come from `currentAssumptions` (and deltas compare to `baselineAssumptions`)

### E) Add “portfolio proof” details
Add a small line under the module:
- “Benchmarks are starting points; your definitions and sales motion matter.”
Include a “Methodology” drawer that lists benchmark sources and caveats.

### F) QA checklist
- Editing spend updates every stage.
- Editing a mid-funnel rate updates downstream only.
- No NaN/Infinity appears at extreme values.
- Tooltips show plain-language definitions.
- Drawer overlays open for every tile + arc.
- Mobile: tiles stack or horizontal scroll works.
- Performance: avoid re-render storms (memoize computed model).

