# Sovereign personas: interactive portfolio page upgrade (Cursor build spec)

Upgrade the existing page:
- https://www.saren.ai/portfolio/sovereign-personas

This page should showcase persona work designed for **sovereign infrastructure / sovereign cloud** buying committees—where you’re selling *national outcomes, political credibility, and long-term economic viability*, not “features.” fileciteturn4file0L1-L4

The deliverable set includes:
- Main write-up PDF: `saren-ai_portfolio_sovereignpersonas.pdf` fileciteturn4file0
- Persona PDFs (linked as primary artifacts):
  - `Minister_Al-Rashid_Architecting_Sovereignty.pdf` fileciteturn4file1
  - `The_Architects_Mandate_Dr_Wei_Chen.pdf` fileciteturn4file2
  - `The_Sovereign_Cloud_Chief_s_Dilemma.pdf` fileciteturn4file3

---

## 1) Objective (what this page must communicate)

### Primary story
These personas are **strategic instruments**, built to help Marketing + Sales align around:
- the *real power dynamics* in sovereign deals
- the *career/political risk* behind decisions
- the *language altitude* required (policy/legacy vs architecture vs operations) fileciteturn4file0L14-L29

### Why this matters
In sovereign infrastructure, generic personas (“CIO/CTO”) collapse under complexity; decisions are justified publicly, not just made privately, and timelines stretch. fileciteturn4file0L14-L22

### What the viewer should leave with
- “Saren builds buyer clarity for complex, high-stakes GTM.” fileciteturn4file0L69-L74
- “These personas are designed to drive messaging, content strategy, sales enablement, and deal orchestration.” fileciteturn4file0L58-L66

---

## 2) Recommended page structure (tight, portfolio-grade)

### A) Hero section (high signal, not long)
- Headline: **designing sovereign buyer personas**
- Subhead: “When you sell infrastructure to sovereign clients, you’re selling national outcomes—not technology.” fileciteturn4file0L1-L4
- Micro-subhead: “Three personas. One buying system. Built to help teams speak the right language at the right altitude.” fileciteturn4file0L26-L29
- Include 3 quick chips: “sovereign cloud • long-cycle deals • committee buying”

### B) “The sovereign buying system” (one short explainer block)
A compact, scannable paragraph + bullets:
- Buying committee complexity + public stakes fileciteturn4file0L14-L22
- “Messaging must be strategic and geopolitical—not technical-first” (for the Minister persona) fileciteturn4file0L37-L45
- “Credibility is earned through frameworks, peer references, and clear trade-offs” (for the Architect persona) fileciteturn4file0L46-L54
- “Value must be demonstrated through ROI and live workloads” (for the Operator persona) fileciteturn4file0L55-L57

### C) Persona artifact gallery (the main interactive section)
A 3-card grid (responsive) with **thumbnails** + hover micro-explanations + CTA buttons.

Each card includes:
- Thumbnail (cover image)
- Persona name + role archetype (plain English)
- 1–2 line “mandate” summary
- Hover: show “what they trust / what they dismiss” (short)
- Buttons:
  - “Open persona PDF” (primary)
  - “Key messaging implications” (opens a drawer/accordion on-page)

### D) “How these personas get used” (proof of value)
A short section that maps deliverables to outcomes:
- Messaging architecture
- Content strategy
- Sales enablement
- Executive briefings
- Long-cycle deal orchestration fileciteturn4file0L58-L66

### E) Optional: “Read the case write-up”
A single link card to the main PDF write-up (the narrative wrapper). fileciteturn4file0

---

## 3) The three personas (best-practice descriptions)

Use simple, marketer-readable names; avoid internal jargon.

### Persona 1: the minister (political sponsor)
**Working label:** “Minister of digital economy & AI”  
**Archetype:** *architect of national sovereignty*  
**Mandate:** legacy outcomes: AI competitiveness, independence from hyperscalers, GDP impact. fileciteturn4file0L30-L35  
**Risks:** political fallout, geopolitical scrutiny, audits/public accountability. fileciteturn4file0L36-L39  
**Messaging altitude:** strategic, geopolitical, aspirational—never technical-first. fileciteturn4file0L40-L45

(Visual references exist inside the Minister PDF: “Blueprint for a legacy,” “Council of advisors,” “Signal vs noise,” “7–16 month approval journey,” and an “engagement blueprint.”) fileciteturn4file1

### Persona 2: the architect (national technical authority)
**Working label:** “National chief architect / principal engineer”  
**Archetype:** *guardian of technical credibility*  
**Mandate:** translate political ambition into executable architecture; evaluate multi-vendor risk. fileciteturn4file0L46-L50  
**Fear:** recommending the wrong path and becoming the scapegoat. fileciteturn4file0L50-L51  
**What earns trust:** sober evaluation frameworks, peer references, trade-offs, implementation realism. fileciteturn4file0L52-L54

Persona PDF to link: `The_Architects_Mandate_Dr_Wei_Chen.pdf` fileciteturn4file2

### Persona 3: the sovereign cloud chief (operator / P&L owner)
**Working label:** “Sovereign cloud GM / infrastructure operator”  
**Archetype:** *accountable for performance*  
**Owns:** GPU utilization, profitability, customer satisfaction, competing with hyperscalers on merit. fileciteturn4file0L55-L56  
**Decision lens:** commercial—ROI in 12–18 months, proof via live workloads, minimal migration disruption. fileciteturn4file0L55-L57  
**Messaging requirement:** connect “sovereignty” to operational excellence + financial performance. fileciteturn4file0L55-L57

Persona PDF to link: `The_Sovereign_Cloud_Chief_s_Dilemma.pdf` fileciteturn4file3

---

## 4) Thumbnail strategy (create visual links that feel premium)

You want thumbnails for each PDF link. Do this in a deterministic, low-effort way:

### Option A (recommended): generate thumbnails from PDF page 1
- Render page 1 of each persona PDF to a 600px wide image (webp preferred).
- Crop to a consistent ratio (e.g., 4:3 or 3:4), centered on the hero portrait/title.
- Save into your public assets folder (e.g., `/public/portfolio/sovereign-personas/`).

**Suggested output filenames:**
- `minister-al-rashid.webp`
- `dr-wei-chen.webp`
- `sovereign-cloud-chief.webp`
- (optional) `sovereign-personas-writeup.webp` for the main narrative PDF

### Option B: use an existing static image if already in repo
If you already have exported images (screenshots), use them—but enforce consistent sizing + aspect ratio.

### UX note
Make the entire card clickable (thumbnail + title), and add a “Open PDF” button for clarity.

---

## 5) Interactions (subtle, high-comprehension)

### A) Hover state (micro-explainer)
On hover over each persona card:
- Fade in a 3–4 bullet overlay:
  - Mandate (1 line)
  - Primary risk (1 line)
  - What they trust (1 line)
  - What they dismiss (1 line)

Keep this *short*. The hover is for orientation, not reading a dissertation.

### B) Click state (detail drawer / accordion)
Click “Key messaging implications” opens a drawer with:
- “How to win with this persona” (3 bullets)
- “Best content types” (policy brief vs eval framework vs ROI case)
- “What not to do” (anti-patterns)

### C) Artifact links
- “Open persona PDF” opens in a new tab.
- Provide a “Download PDF” link as a secondary CTA (same URL, different label).

---

## 6) Copy tone (how to describe the work, without over-selling)

Use language that reads like a strategic GTM operator wrote it:
- “Buying committee, not a buyer.”
- “Justification path, not a decision moment.”
- “Altitude: policy / architecture / operations.”
- “Proof formats: briefs, frameworks, workload validation.”

Avoid buzzwords like “synergy.” Keep it precise.

---

## 7) Implementation notes (Cursor build plan)

### A) Where to update
Search for the route/component:
- `portfolio/sovereign-personas`
- `SovereignPersonas` / `PersonaGallery` / `PortfolioPage`

### B) Create a reusable gallery component
Build a data-driven component so adding future personas is trivial.

**TypeScript model:**
```ts
type PersonaCard = {
  id: "minister" | "architect" | "operator";
  title: string;
  subtitle: string; // role in plain english
  thumbSrc: string; // /public/... image
  pdfHref: string; // public path or storage url
  mandate: string;
  risks: string[];
  trusts: string[];
  dismisses: string[];
  messagingAltitude: string;
  bestContent: string[];
  antiPatterns: string[];
};
```

### C) Render pattern
- `PersonaGallery` maps `PersonaCard[]` → cards
- Tooltip/hover overlay uses the `mandate/risks/trusts/dismisses` fields
- Drawer content uses `bestContent/antiPatterns/messagingAltitude`

### D) File linking
Make PDFs available under a stable public path (recommended):
- `/public/portfolio/sovereign-personas/pdfs/...`
and reference with normal anchors.

### E) Accessibility
- Hover overlay must also appear on keyboard focus.
- Ensure the “Open PDF” CTA is a real `<a>` element.

---

## 8) Suggested content for the three cards (ready to paste)

### Card 1: Minister (political sponsor)
- Title: “the minister”
- Subtitle: “political sponsor of national AI & infrastructure”
- Mandate: “Deliver national AI competitiveness, sovereignty, and measurable economic transformation.” fileciteturn4file0L30-L35
- Risks: “public failure,” “geopolitical scrutiny,” “audits and accountability.” fileciteturn4file0L36-L39
- Trusts: “policy briefs,” “peer nation examples,” “top-tier validation.” fileciteturn4file0L40-L45
- Dismisses: “feature-by-feature comparisons,” “vendor bravado.” fileciteturn4file0L40-L45

### Card 2: Architect (technical authority)
- Title: “the architect”
- Subtitle: “national technical authority & risk translator”
- Mandate: “Turn political ambition into an executable, multi-vendor architecture.” fileciteturn4file0L46-L50
- Risks: “being the quiet scapegoat if the recommendation fails.” fileciteturn4file0L50-L51
- Trusts: “evaluation frameworks,” “peer references,” “clear trade-offs,” “implementation realism.” fileciteturn4file0L52-L54
- Dismisses: “hype and bravado.” fileciteturn4file0L52-L54

### Card 3: Sovereign cloud chief (operator)
- Title: “the sovereign cloud chief”
- Subtitle: “operator accountable for performance and economics”
- Mandate: “Drive utilization, SLAs, and profitability while competing with hyperscalers.” fileciteturn4file0L55-L56
- Trusts: “live workload proof,” “ROI in 12–18 months,” “low-disruption migration plans.” fileciteturn4file0L55-L57
- Dismisses: “sovereignty talk with no operational proof.” fileciteturn4file0L55-L57

---

## 9) QA checklist

- Thumbnails load fast and are consistent in aspect ratio.
- Hover overlays appear on focus as well as hover.
- Each card opens the correct PDF.
- Drawer content is scannable (no walls of text).
- The page clearly explains why sovereign deals require different personas than standard enterprise IT. fileciteturn4file0L14-L22

---

## 10) Files provided (for Cursor to reference)

- `saren-ai_portfolio_sovereignpersonas.pdf` (page narrative) fileciteturn4file0
- `Minister_Al-Rashid_Architecting_Sovereignty.pdf` (persona artifact) fileciteturn4file1
- `The_Architects_Mandate_Dr_Wei_Chen.pdf` (persona artifact) fileciteturn4file2
- `The_Sovereign_Cloud_Chief_s_Dilemma.pdf` (persona artifact) fileciteturn4file3
