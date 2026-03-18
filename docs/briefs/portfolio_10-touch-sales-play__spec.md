# saren.ai portfolio page spec — 10-touch-sales-play
Version: v1
Last updated: 2026-02-04

Source doc: "The 10‑Touch Sales Play: Turning Cold Outreach Into a Credible Executive Conversation" (PDF). fileciteturn1file0

## 0) page objective + audience takeaway

**Objective**
Show a *repeatable outbound operating system* (not “better emails”) that earns trust over time, uses role ownership, and measures success by executive signals—not volume. The page should also demonstrate that the play is *operationalized in HubSpot* via an MQL→Mature scoring threshold that auto-enrolls prospects into the sequence, where a BDR runs relationship building.

**Audience takeaway (founders / CMOs / CROs / agency leaders / performance marketers)**
“Cold outreach fails when it asks for attention before earning trust. This page shows the system: phased touches, role ownership, signal-based outcomes, and the automation wiring that makes it scalable.” fileciteturn1file0

---

## 1) recommended page structure (minimal + modern)

1. **Hero**
   - Title: *The 10-touch sales play*
   - Subtitle: *Turning cold outreach into a credible executive conversation*
   - Proof bullets (3): (a) executive-buyer design, (b) 3-phase structure, (c) HubSpot automation & scoring gate
   - CTAs: **Open the play** (scroll to interactive) + **Download .md spec** + **Download one-page PDF** (optional)

2. **The core idea (tight narrative)**
   - 2–3 short paragraphs:
     - Cold outreach fails because it asks for attention before it earns trust. fileciteturn1file0
     - This is a sales play: repeatable, multi-touch, credibility-first. fileciteturn1file0

3. **Top-of-page interactive zone (engagement-heavy, above-the-fold)**
   - One primary interactive module + supporting micro-modules (8 options below; implement 1–2 first, then iterate).

4. **The play, explained**
   - Phase 1: Awareness (Week 1) — legitimacy, not selling. fileciteturn1file0
   - Phase 2: Engagement (Week 2) — value exchange + diagnostic content. fileciteturn1file0
   - Phase 3: Final push (Weeks 3–4) — clear ask after earned credibility; ends softly into nurture. fileciteturn1file0

5. **Ownership + outcomes**
   - Roles: ADR/BDR, exec sponsor, sales leader. fileciteturn1file0
   - Signals: discovery calls, direct replies/engagement, clean nurture transitions. fileciteturn1file0

6. **How it’s operationalized (HubSpot wiring)**
   - Score threshold gate (MQL → Mature at 75) → auto-enroll sequence
   - BDR runs relationship building
   - Nurture fallback when no engagement (soft landing)

7. **Download + reuse**
   - One-page play PDF download (as mentioned in source). fileciteturn1file0
   - Cursor-ready .md spec download (this file)

8. **FAQ + FAQPage JSON-LD**
9. **Retrofit guidance**
10. **CTA: talk to Saren (fractional CMO / AI ops)**

---

## 2) key UX rules (global)

- **Hover = definition** (tooltips on terms like “signal-based outcomes,” “nurture,” “MQL,” “Mature,” “exec sponsor”).
- **Click = deeper detail** (drawer/modal: what / why / how / reuse).
- **Fast + educational**: no heavy animations; micro-interactions only.
- **Use common growth/performance language** consistently (funnel stage, signal, conversion, velocity, nurture).

---

## 3) eight engagement-heavy interactive expressions (top-of-page)

These are *top-of-page* interactive modules. Pick **1 primary** + **1 secondary** to ship first.

### Option A — “10-touch timeline” (primary)
**What it is:** A horizontal timeline with 10 touch points grouped into 3 phases.
- Hover shows: purpose, owner, success signal.
- Click opens drawer: sample message intent, guardrails, and “why this touch exists.”

**Why it works:** Most visitors only need 30 seconds to “get it.” This makes the system visible instantly.

### Option B — “phase purpose toggle” (micro-module)
A 3-position toggle (Awareness / Engagement / Final Push). Switching:
- highlights relevant touches
- swaps the right-side explanation
- updates the “do NOT do this yet” caution line

### Option C — “ownership map” (micro-module)
A small role filter: ADR/BDR vs Exec Sponsor vs Sales Leader.
- Selecting a role dims touches not owned by that role and surfaces role-specific success criteria. fileciteturn1file0

### Option D — “signal scoreboard” (micro-module)
Three KPI chips:
- Discovery calls scheduled
- Direct reply / engagement
- Clean transition to nurture fileciteturn1file0

Clicking a chip opens a drawer: definition, how measured, what to do when it’s low.

### Option E — “trust earned meter” (primary/secondary)
A simple meter that fills across touches:
- early touches build legitimacy (no demo ask) fileciteturn1file0
- middle touches test recognition (diagnostic) fileciteturn1file0
- late touches earn the ask (executive validation + reference-backed call) fileciteturn1file0

This is *the philosophy* made visible.

### Option F — “HubSpot enrollment simulator” (primary if you want ops cred)
A tiny simulator with:
- Score slider (0–100)
- At **75**, the UI flips states:
  - “Entered sequence”
  - “BDR owner assigned”
  - “Touch 1 scheduled”
- If engagement = none by end → “Move to nurture (soft landing)” fileciteturn1file0

### Option G — “personalization guardrails” (micro-module)
A 3x3 matrix:
- **Personalization depth** (Light / Medium / High)
- **Risk** (Time cost / Brand risk / Relevance risk)

Hover definitions teach: “standardize quality without killing personalization.” fileciteturn1file0

### Option H — “exec buyer allergy filter” (micro-module)
Three toggle pills:
- Time-constrained
- Allergic to generic outreach
- Skeptical of vendor claims fileciteturn1file0

Toggling pills updates the “what we avoid” copy (e.g., no demo ask in week 1).

---

## 4) primary interactive component spec (ship-first recommendation)

**Ship-first recommendation:** Option A (Timeline) + Option F (HubSpot enrollment simulator) in one cohesive top module.

Component: `PortfolioInteractive__10TouchSalesPlay`

### Behavior
- Default: show full timeline with phase grouping and 10 nodes.
- Hover (desktop): tooltip definitions for terms + touch summaries.
- Click (desktop): right-side drawer with deeper details (what/why/how/reuse).
- Mobile: tap-to-open bottom sheet for definitions; drawer becomes full-screen modal.

### States
- `default`
- `phaseFiltered` (when Phase toggle is used)
- `roleFiltered` (when Ownership filter is used)
- `drawerOpen` (touch details)
- `scoreSimActive` (score ≥ 75 state)
- `empty` (if data missing; show fallback copy)

### Accessibility
- All nodes keyboard-focusable.
- Tooltip uses `aria-describedby`.
- Drawer/modal traps focus; ESC closes; returns focus to triggering node.
- No color-only meaning: use icons + labels (Phase 1/2/3, Role chips).

---

## 5) data model + component plan (TypeScript-friendly)

### Data model
```ts
export type SalesPlayPhase = "awareness" | "engagement" | "final_push";

export type OwnerRole = "bdr" | "exec_sponsor" | "sales_leader";

export type SuccessSignal = "discovery_scheduled" | "direct_engagement" | "nurture_transition";

export type Touch = {
  id: string;              // "t01"..."t10"
  dayLabel: string;        // "Day 1" etc (or "Week 3")
  phase: SalesPlayPhase;
  title: string;           // e.g., "Hyper-personalized email"
  intent: string;          // 1 sentence why it exists
  owner: OwnerRole;
  channel: "email" | "linkedin" | "phone";
  asksForMeeting: boolean; // should be false until final phase
  signals: SuccessSignal[];
  tooltip: string;         // short hover definition
  detail: {
    what: string;
    why: string;
    how: string;           // execution guardrails
    reuse: string;         // how a team applies it
  };
};

export type HubSpotGate = {
  property: string;        // e.g., "Lead score"
  mqlState: string;        // "MQL"
  matureState: string;     // "Mature"
  threshold: number;       // 75
  onPass: string[];        // actions: enroll sequence, assign owner
  onFailOrNoEngagement: string[]; // move to nurture
};

export type SalesPlayData = {
  slug: "10-touch-sales-play";
  title: string;
  subtitle: string;
  thesis: string;
  phases: Array<{ id: SalesPlayPhase; name: string; goal: string; }>;
  touches: Touch[];
  signals: Array<{ id: SuccessSignal; label: string; definition: string; measuredBy: string; }>;
  hubspotGate: HubSpotGate;
  glossary: Array<{ term: string; definition: string; }>;
  downloads: Array<{ kind: "pdf"|"md"; label: string; href: string; }>;
};
```

### Component plan
- `PortfolioPageLayout` (shared)
- `PortfolioHero` (shared)
- `InteractiveSalesPlayPanel` (new; composes submodules)
  - `SalesPlayTimeline`
  - `PhaseToggle`
  - `RoleFilter`
  - `SignalScoreboard`
  - `HubSpotEnrollmentSimulator`
  - `DetailDrawer`
- `FAQSection` (shared)
- `DownloadBar` (shared)

---

## 6) copy blocks (tight + practical)

### Hero title/subtitle
- **Title:** The 10-touch sales play
- **Subtitle:** Turning cold outreach into a credible executive conversation fileciteturn1file0

### 1–2 sentence thesis (near hero)
Cold outreach fails to the extent it asks for attention before it earns trust. This play earns credibility over time—then makes the ask—using clear ownership and signal-based outcomes. fileciteturn1file0

### Phase summaries (short)
- **Awareness (Week 1):** establish legitimacy, not selling. fileciteturn1file0
- **Engagement (Week 2):** exchange value; test recognition of the problem. fileciteturn1file0
- **Final push (Weeks 3–4):** executive-level ask after credibility; end softly into nurture. fileciteturn1file0

---

## 7) assets + naming conventions

Folder: `/public/assets/portfolio/10-touch-sales-play/`

- `portfolio_10-touch-sales-play__hero@2x.webp`
- `portfolio_10-touch-sales-play__timeline@2x.webp` (optional fallback image)
- `portfolio_10-touch-sales-play__onepager.pdf` (the “one-page sales play” download referenced in the doc) fileciteturn1file0
- `portfolio_10-touch-sales-play__data.json`
- `portfolio_10-touch-sales-play__glossary.json`
- `portfolio_10-touch-sales-play__faq.json`
- `portfolio_10-touch-sales-play__spec.md` (this file)

---

## 8) FAQ (7 Qs) + FAQPage JSON-LD

### FAQ content (draft)
1. **Why does cold outreach fail most often?**  
   Because it asks for attention before earning trust, especially with senior buyers. fileciteturn1file0

2. **What makes this a “sales play” instead of a sequence?**  
   It’s a repeatable system with phases, role ownership, and signal-based outcomes—not just messages. fileciteturn1file0

3. **When do you actually ask for a meeting?**  
   Only after multiple credibility-building touches; the first week focuses on legitimacy, not selling. fileciteturn1file0

4. **How do you measure success?**  
   By signals: discovery calls scheduled, direct engagement, and clean transitions into nurture. fileciteturn1file0

5. **What happens if there’s no engagement?**  
   The play ends softly and moves the buyer into nurture—protecting brand equity. fileciteturn1file0

6. **How is this operationalized in HubSpot?**  
   Leads reach a Mature threshold (e.g., score ≥ 75), are auto-enrolled into the 10-touch sequence, and a BDR owns relationship-building.

7. **Can you retrofit this into an existing SDR program?**  
   Yes: keep your channels, replace your order/asks, enforce ownership, and add a scoring gate + nurture fallback.

### FAQPage JSON-LD (replace answers if you edit)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why does cold outreach fail most often?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because it asks for attention before earning trust, especially with senior buyers."
      }
    },
    {
      "@type": "Question",
      "name": "What makes this a sales play instead of a sequence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It’s a repeatable system with phases, role ownership, and signal-based outcomes—not just messages."
      }
    },
    {
      "@type": "Question",
      "name": "When do you actually ask for a meeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only after multiple credibility-building touches; the first week focuses on legitimacy, not selling."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By signals: discovery calls scheduled, direct engagement, and clean transitions into nurture."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if there’s no engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The play ends softly and moves the buyer into nurture—protecting brand equity."
      }
    },
    {
      "@type": "Question",
      "name": "How is this operationalized in HubSpot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leads reach a Mature threshold (e.g., score ≥ 75), are auto-enrolled into the 10-touch sequence, and a BDR owns relationship-building."
      }
    },
    {
      "@type": "Question",
      "name": "Can you retrofit this into an existing SDR program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes: keep your channels, replace your order/asks, enforce ownership, and add a scoring gate plus a nurture fallback."
      }
    }
  ]
}
</script>
```

---

## 9) retrofit guidance (when upgrading an existing page)

If an older version of this page already exists:
- **Keep:** the narrative thesis + the 3-phase explanation text. fileciteturn1file0
- **Replace:** any static image of the play with the interactive timeline module (Option A).
- **Add:** HubSpot enrollment simulator (Option F) to prove it’s operationalized (not conceptual).
- **Add:** glossary tooltips for “signals,” “nurture,” “exec sponsor,” “MQL/Mature.”
- **Add:** FAQ + JSON-LD + download bar.

Asset migration:
- Move PDFs/images into `/public/assets/portfolio/10-touch-sales-play/`
- Rename to the convention in section 7.

---

## 10) Cursor implementation instructions (files to create)

Create these files:

1. `content/portfolio/10-touch-sales-play.md`
   - Narrative copy + section headings matching structure in section 1.

2. `data/portfolio/10-touch-sales-play.data.json`
   - Populate phases, touches, signals, hubspotGate.

3. `data/portfolio/10-touch-sales-play.glossary.json`
   - Term definitions for tooltips.

4. `data/portfolio/10-touch-sales-play.faq.json`
   - FAQ content (mirrors section 8).

5. `components/portfolio/InteractiveSalesPlayPanel.tsx`
   - Composed module: timeline + toggles + simulator + drawer.

6. `components/portfolio/SalesPlayTimeline.tsx`
7. `components/portfolio/HubSpotEnrollmentSimulator.tsx`
8. `components/portfolio/DetailDrawer.tsx` (if not already shared)

Plug assets:
- Put images/PDFs under `/public/assets/portfolio/10-touch-sales-play/`
- Wire downloads in the hero and in a sticky `DownloadBar`.

Replace points:
- Replace placeholder touch copy in JSON with your exact touch titles/notes (see “Example Sales Play” diagram on page 1 for inspiration; the PDF describes touch types and phases in text). fileciteturn1file0

---

## 11) open items (assumptions made in this spec)

Assumptions (edit if needed):
- “BDR runs relationship building from there” = owner role `"bdr"` for most touches.
- Touch schedule spans Weeks 1–4, matching the doc phases. fileciteturn1file0
- Score threshold is **75** (as provided by you) and maps to “Mature”.

