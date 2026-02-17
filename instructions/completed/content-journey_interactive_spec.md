# 120-day content journey: interactive content matrix (Cursor build spec)

Upgrade the existing portfolio page:
- https://www.saren.ai/portfolio/120-day-content-journey

Goal: turn the matrix into an **interactive “demand architecture map”**—not a static image—so a growth/performance marketer can scan it fast, hover for quick context, and click to see the deeper system logic.

This matrix is explicitly **not a content calendar**; it’s intended as a **go-to-market operating system** that aligns content, sales, and scoring to how buyers actually move from anxiety → confidence. fileciteturn3file2L7-L8

---

## 1) Product intent (what the page should communicate)

### Core message
- The content journey is designed around the **buyer’s reality**, not arbitrary “lead stages.” fileciteturn3file2L13-L22
- Content reduces **emotional friction** across the cycle (early: validation/clarity; mid: credibility/comparison; late: proof/decision support). fileciteturn3file2L30-L42
- The system includes **behavior scoring** so marketing + sales can see where a buyer actually is (passive → active research → commercial intent → sales readiness). fileciteturn3file0L6-L12

### Interaction philosophy
- “Hover = quick definition.”
- “Click = why it exists + how to use it.”
- Keep language **common for growth + performance marketers**: pipeline, intent, conversion, velocity, CAC, sales cycle, handoff, enablement.

---

## 2) Primary data source

Use this uploaded CSV as the “main example” dataset:
- `Consumer Journey —Enterprise-Table 1.csv`

The CSV is essentially a structured matrix:
- Columns = journey stages (left → right)
- Rows = layers (AIDA, buyer stage, duration, tasks, personas, relevance, goals, metrics, scoring, media, strategy, tactics, thoughts, feelings)

**Implementation note:** the CSV has a “matrix export” shape (first column is row labels, remaining columns are stage columns). Do a small transform step into JSON before rendering.

---

## 3) Stage naming (use common GTM terms)

From the Enterprise CSV, normalize the stage columns into a consistent set of stage IDs + labels.

Recommended stage set (10 columns):
1. Problem identification
2. Problem analysis
3. Internal consensus
4. External research
5. Shortlist & comparison
6. Recommendation (champion / “sales loop” moment)
7. Sales meetings & demos
8. Purchase decision
9. Post-purchase adoption / validation
10. Renewal

Also show an “AIDA-style” line above the table (Awareness → Consideration → Decision → Action → Retention → Renewal) to give fast orientation.

---

## 4) Page layout (top-to-bottom)

### A) Hero section
- Headline: “the 120-day content journey”
- Subhead (tight): “A buyer-led content system that moves enterprise deals from panic to purchase—without spraying content.” (tone match to saren.ai)

### B) Interactive matrix (main artifact)
A horizontally scrollable, responsive grid:
- Sticky left column = row headers
- Sticky top row = stage headers
- Body cells = content for each row × stage

### C) “How to read this” (short explainer)
3 bullets:
- Each column is a buyer stage.
- Each row is a different planning layer (tasks, personas, KPIs, content, scoring, emotional state).
- Hover for definitions; click for deeper context.

### D) Optional: “Download / print view”
- Provide a “static image” accordion for the original screenshot (optional).
- Provide an export button to download the rendered matrix as an image/PDF (nice-to-have, not required).

---

## 5) Interactions (exact behavior)

### A) Hover tooltips (the main interaction you asked for)
Hover behavior should focus on “areas that need brief explanation.” Prioritize these rows:

1) AIDA stages  
2) Customer stages (buyer stage)  
3) Phase duration  
4) Players/personas  
5) Relevance  
6) Goal  
7) Metric  
8) Content scoring  
9) Media / Strategy / Tactics  
10) User thoughts / User feelings

**Tooltip format (compact):**
- Title (e.g., “Content scoring”)
- One-line explanation in growth terms
- “How to use” (1 line)
- Optional: example signal types (passive/active/commercial/sales-ready) for scoring row fileciteturn3file0L6-L12

### B) Click-to-expand (optional but recommended)
Clicking a cell opens a side drawer with:
- Full text (multi-line)
- “Why this matters at this stage” (2–3 bullets)
- “What we’d instrument” (for Metric/Scoring rows)
- “Typical content formats” (for Media/Strategy/Tactics rows)

If you want to keep it super minimal: tooltips only is acceptable. But drawers are a portfolio flex.

### C) Table navigation helpers (small but high leverage)
- “Jump to stage” chips (Problem identification / Comparison / Sales meetings / Renewal)
- “Highlight row” chips (Tasks / KPIs / Content / Scoring / Emotions)
- Search/filter (optional): search within cells, highlight matches

---

## 6) Data transform (CSV → renderable JSON)

### A) Read and normalize the CSV
The CSV structure is:
- Column 0 = row label (e.g., “User Tasks”)
- Columns 1..N = stage columns

Transform into:
- `stages[]`: { id, label, aidaStage, duration? }
- `rows[]`: { id, label, description, cells: Record<stageId, string> }

### B) Stage label fill rules
Some CSV columns have “meta markers” (e.g., “Sales loop” or “Core loop”) and some stage header cells are blank.
Rules:
- If “Customer Stages” value is blank, fall back to AIDA label (e.g., “Renewal”).
- If column contains a “sales loop” marker, label as “Recommendation (sales loop)”.
- If column contains “Core loop (Updates)”, label as “Purchase decision (core loop)” or similar.

### C) Keep raw cell text intact
Cells include newlines. Render them as:
- In-grid: truncated preview (2–3 lines) + “…”
- Tooltip/drawer: full text with line breaks preserved

---

## 7) Content semantics (make it marketer-friendly)

Use these row descriptions (for tooltips + drawer intros). Keep wording familiar to growth/perf folks:

- **AIDA stage**: the macro marketing intent of this stage (awareness / consideration / decision / retention).
- **Buyer stage**: what the buying team is doing now (not what marketing wishes they were doing).
- **Phase duration**: typical time-in-stage; a planning assumption for pacing and touchpoints.
- **User tasks**: the jobs-to-be-done; what the buyer is actively trying to accomplish.
- **Players/personas**: who’s involved; influences channels, proof type, and friction tolerance.
- **Relevance**: how “in-market” the buyer is; how aggressive your CTA should be.
- **Goal**: the outcome the content must produce in this stage (clarity, shortlist, consensus, proof).
- **Metric**: how you measure progress (traffic quality, return visits, demo starts, completions, renewals).
- **Content scoring**: how you translate behavior into intent; scoring should vary by stage. fileciteturn3file0L6-L12
- **Media**: the format container (blog, webinar, demo, sales convo, etc.).
- **Strategy**: the message approach (validation, comparison, de-risking, proof).
- **Tactics**: specific executions (retargeting, nurture, SDR enablement, case studies).
- **User thoughts / feelings**: the psychological layer; use content to reduce emotional friction. fileciteturn3file2L30-L42

---

## 8) Component architecture (Cursor build plan)

### Recommended stack
- Next.js / React (match the rest of saren.ai)
- State: minimal local state; optional Zustand for search/highlights
- UI: Tooltip + Drawer components (from your existing component library)
- Accessibility: keyboard focusable cells; tooltips on focus

### Components
- `ContentJourneyPage` (existing route)
  - `MatrixHero`
  - `JourneyMatrix`
    - `StageHeaderRow`
    - `RowHeaderCell`
    - `MatrixCell`
    - `CellTooltip`
    - `CellDrawer` (optional)
  - `HowToRead`
  - `Methodology` (benchmarks / scoring philosophy)

### Data types (TypeScript)
```ts
type Stage = {
  id: string;
  label: string;
  aida?: string;
  duration?: string;
};

type MatrixRow = {
  id: string;
  label: string;
  tooltip?: { title: string; body: string; howToUse?: string };
  cells: Record<string, string | null>; // stageId -> cell text
};

type MatrixData = {
  persona: "enterprise" | "smb";
  stages: Stage[];
  rows: MatrixRow[];
};
```

### Rendering rules
- Sticky first column and stage header row.
- Cells show a short preview (truncate).
- Hover/focus shows tooltip (rich text).
- Click opens drawer (optional).

---

## 9) Retrofit notes for the existing page

Upgrade the existing portfolio page without breaking the narrative flow.

### A) Find the current implementation
Search for:
- route: `portfolio/120-day-content-journey`
- component names: `ContentJourney`, `JourneyMatrix`, `BuyerJourney`, `Matrix`

### B) Replace the static matrix image with the interactive matrix
Keep:
- Page header, story copy, and sections.
Swap:
- The static “matrix image” section → `<JourneyMatrix data={enterpriseData} />`

### C) Keep a fallback view
Include a “Static view” accordion below the interactive module:
- Helps with accessibility, printing, and “quick scan” for impatient readers.

---

## 10) QA checklist (make it feel professional)

- Hover works on desktop; focus works on keyboard.
- On mobile: table becomes horizontal scroll; tooltips convert to tap-to-open drawer or popover.
- No layout jank: sticky headers remain aligned.
- Truncation is consistent and doesn’t cut mid-word too aggressively.
- The tooltip language is “growth marketer normal,” not academic.
- “Methodology” section clearly explains scoring philosophy and emotional alignment. fileciteturn3file0L6-L12 fileciteturn3file2L30-L42

---

## 11) (Optional) extra-lethal touches

If you want to turn this into a “wow” portfolio artifact (still tasteful):
- A toggle: **“Show the emotion layer”**  
  Highlights the “User feelings” row and dims others.
- A toggle: **“Show scoring layer”**  
  Highlights “Content scoring” and “Metric” rows.
- “Show me the bottleneck” mini insight:  
  if a stage has low relevance + high friction, add a subtle “risk” tag.

---

## 12) Assets provided (for Cursor)

- PDF (narrative + intent): `saren-ai_portfolio_The 120-day Content Journey_ How We Engineered Demand at Cylance – Saren.ai.pdf` fileciteturn3file2
- CSV (Enterprise matrix): `Consumer Journey —Enterprise-Table 1.csv`
- CSV (SMB example): `Consumer Journey — SMB-Table 1.csv`

Use the Enterprise CSV as the default render on the page. Offer SMB later as a toggle if you want.

