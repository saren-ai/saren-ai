# B2B marketing framework page: build spec for Cursor (new portfolio page)

Create a **net-new page** inside the Portfolio section of saren.ai that showcases the GitHub repository:
- Repo: https://github.com/saren-ai/b2b-marketing-framework citeturn1view0

Core idea: this repo is a **7-layer, 21-prompt operating system** for building a complete B2B SaaS messaging + GTM foundation from scratch. citeturn1view0

This spec includes:
1) Page layout and copy intent
2) A top-of-page interactive component that visualizes **L1 → L7**
3) Repo highlights (what’s inside, how it’s used)
4) FAQ with **FAQPage schema** (JSON-LD)

---

## 1) Page goals

### What the viewer should learn (in <60 seconds)
- This is not “random prompts.” It’s a **sequenced system** that prevents brand/messaging chaos.
- The layers build: foundations → identity → positioning → messaging → context → activation → iteration. citeturn1view0
- The output is **real working documents** (positioning statement, message map, enablement, measurement framework). citeturn1view0

### What the viewer should feel
- “This is senior marketing thinking—structured, reusable, and execution-aware.”

---

## 2) Route + placement

- Route: `/portfolio/b2b-marketing-framework` (or whatever matches your portfolio routing conventions)
- Add to portfolio index list/grid with a short teaser: “A 7-layer prompt matrix for building B2B messaging infrastructure.” citeturn1view0

---

## 3) Page structure (recommended)

### A) Hero
- H1: “B2B marketing framework”
- Subhead: “A 7-layer prompt matrix for building B2B SaaS messaging infrastructure from scratch.” citeturn1view0
- Primary CTA: “View the repo on GitHub” → link to repo
- Secondary CTA: “Jump to L1–L7” → anchor to interactive module (if hero is above it)

### B) Top interactive: L1→L7 explorer (NEW)
This is the main interactive artifact (details below).

### C) What’s inside (tight + scannable)
Explain in 3–5 bullets:
- 7 layers, 21 prompts, each prompt includes template + context + examples. citeturn1view0
- Intended use: start at L1, don’t skip, plan ~60–90 minutes per prompt. citeturn1view0
- Designed for early-stage teams and consultants building a foundation that compounds. citeturn1view0

### D) “Outputs you can expect” (show the artifacts)
Create a simple grid/list of deliverables the prompts generate (examples from the README):
- target customer profiles
- market & competitive analysis
- mission/vision/values
- brand voice & tone
- positioning statement
- message pillars + message map
- elevator pitch + boilerplate
- guidelines + enablement
- measurement + iteration protocol citeturn1view0

### E) How to use (workflow)
A short “operating cadence” section:
1) gather raw inputs (customer notes, win/loss, call recordings)
2) run prompts with real constraints
3) synthesize outputs into a messaging system (not a doc graveyard)
4) activate across website, pitch, ads, sales, enablement
5) measure and iterate (L7)

### F) FAQ (with schema)
Include 5–8 questions (below) and render FAQPage JSON-LD.

---

## 4) The L1→L7 interactive component (top of page)

### Purpose
Make the “system-ness” instantly legible: the repo is layered, sequential, and each layer unlocks the next. citeturn1view0

### Interaction concept
A **horizontal stepper + accordion** that works like this:
- Desktop: a left-to-right row of L1…L7 “pills” (or cards)
- Clicking a pill opens its accordion panel below (or in-place expansion)
- The panel shows:
  - layer name (improved nomenclature, below)
  - 2–4 bullet description (in plain growth marketer language)
  - list of the prompt files inside (01..21 labels)
  - direct links to the folders/files on GitHub (deep links)

Optional: add a tiny “progress” indicator: “Start here” on L1, “Measurement” on L7.

### Recommended nomenclature upgrades
Keep the repo’s canonical folder names, but display **friendlier layer titles**:

- **L1 — foundations (who + where)**  
  Target customers + market/competitors. (In repo: “Foundational Elements”) citeturn1view0

- **L2 — identity (why + how you show up)**  
  Mission/vision/values, voice, personality. citeturn1view0

- **L3 — positioning (what you are + why you win)**  
  Value props, positioning statement, promise. citeturn1view0

- **L4 — messaging system (how you say it)**  
  Pillars, message map, boilerplate, examples, taglines. citeturn1view0

- **L5 — GTM context (what surrounds the message)**  
  Industry forces, sales methodology, product catalog. citeturn1view0

- **L6 — activation & governance (how it ships and stays consistent)**  
  Guidelines, comms strategy, enablement. citeturn1view0

- **L7 — measurement & iteration (how it improves without starting over)**  
  Measurement framework, review protocol. citeturn1view0

### Panel content (per layer)
Each expanded layer panel should include:
- Layer summary (1–2 sentences)
- “Best used for” bullets (e.g., “website rewrite,” “pitch deck,” “ads,” “sales enablement”)
- Prompt list (title + short purpose)
- GitHub deep links (folder + key files)
- Micro-CTA: “Open L# folder on GitHub”

### Repo structure (from README)
Use the exact layer/prompt mapping from the repo README:

**L1. Foundational Elements**
- 01. Target Customer Profiles
- 02. Market & Competitive Analysis citeturn1view0

**L2. Core Identity**
- 03. Mission, Vision, Values
- 04. Brand Voice & Tone
- 05. Brand Personality & Archetype citeturn1view0

**L3. Core Message**
- 06. Unique Value Propositions
- 07. Brand Positioning Statement
- 08. Brand Promise citeturn1view0

**L4. Message Articulation**
- 09. Core Messaging Pillars
- 10. Message Map
- 11. Elevator Pitch & Boilerplate
- 12. Example Communications
- 13. Taglines & Slogans citeturn1view0

**L5. Supporting Context**
- 14. Industry Context
- 15. Sales Methodology
- 16. Product/Service Catalog citeturn1view0

**L6. Activation & Governance**
- 17. Brand Guidelines Master Document
- 18. Communication Strategy
- 19. Training & Enablement Materials citeturn1view0

**L7. Evolution & Refinement**
- 20. Performance Measurement Framework
- 21. Review & Iteration Protocol citeturn1view0

### UX details
- Hover states on L pills: short one-liners (“Positioning”, “Messaging system”, etc.)
- Keyboard accessibility: pills focusable, Enter toggles panel
- URL hash support (optional): `#l3` opens L3 by default (nice for sharing)
- Mobile: switch to a vertical accordion stack (L1…L7) with the same content

---

## 5) Implementation notes (Cursor plan)

### Tech assumptions
Match existing saren.ai stack (likely Next.js + React). Don’t reinvent the site’s design system.

### Components
- `B2BMarketingFrameworkPage`
  - `FrameworkHero`
  - `LayerExplorer`  ← interactive piece (L1–L7)
    - `LayerPills`
    - `LayerPanel`
    - `PromptList`
  - `RepoHighlights`
  - `ExpectedOutputs`
  - `HowToUse`
  - `FAQ` (+ JSON-LD schema)

### Data model (keep it data-driven)
```ts
type Prompt = { id: string; title: string; purpose: string; githubUrl: string };
type Layer = {
  id: "l1"|"l2"|"l3"|"l4"|"l5"|"l6"|"l7";
  label: string;          // “L3 — positioning (what you are + why you win)”
  shortLabel: string;     // “Positioning”
  summary: string;
  bestUsedFor: string[];
  folderUrl: string;
  prompts: Prompt[];
};
```

Populate layers from a hardcoded config file (fast + stable). You don’t need to fetch GitHub at runtime.

### GitHub deep links
Use GitHub URLs that point to each folder and file. Start from:
- Repo root: https://github.com/saren-ai/b2b-marketing-framework citeturn1view0

---

## 6) FAQ (5–8 questions) + schema

### Rendered FAQ questions (copy-ready)
1) **What is this framework, in plain English?**  
It’s a step-by-step system of prompts that produces the core documents your B2B marketing needs before you scale campaigns.

2) **Who is it for?**  
Founders without a CMO, early marketing hires starting from zero, and consultants building GTM foundations. citeturn1view0

3) **How long does it take to complete?**  
Plan ~60–90 minutes per prompt if you’re doing it seriously; the speed comes from structure, not shortcuts. citeturn1view0

4) **Can I skip layers and jump to messaging?**  
You can, but you’ll usually get generic outputs. L1–L3 create the raw truth that makes L4 messaging specific.

5) **What do I get at the end?**  
A usable messaging platform: positioning, pillars, message map, boilerplate, enablement, and a measurement/iteration loop. citeturn1view0

6) **Do I need a specific AI tool to use this?**  
No—any LLM works. The quality depends on your inputs, constraints, and willingness to be specific.

7) **How do I keep the work from becoming a doc graveyard?**  
Treat it like an operating system: activate in the website, pitch, sales enablement, and measure/iterate through L7.

### FAQPage JSON-LD
Implement JSON-LD in the page head:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is this framework, in plain English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It’s a step-by-step system of prompts that produces the core documents your B2B marketing needs before you scale campaigns."
      }
    },
    {
      "@type": "Question",
      "name": "Who is it for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Founders without a CMO, early marketing hires starting from zero, and consultants building GTM foundations."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to complete?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan ~60–90 minutes per prompt if you’re doing it seriously; the speed comes from structure, not shortcuts."
      }
    },
    {
      "@type": "Question",
      "name": "Can I skip layers and jump to messaging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can, but you’ll usually get generic outputs. L1–L3 create the raw truth that makes L4 messaging specific."
      }
    },
    {
      "@type": "Question",
      "name": "What do I get at the end?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A usable messaging platform: positioning, pillars, message map, boilerplate, enablement, and a measurement/iteration loop."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a specific AI tool to use this?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No—any LLM works. The quality depends on your inputs, constraints, and willingness to be specific."
      }
    },
    {
      "@type": "Question",
      "name": "How do I keep the work from becoming a doc graveyard?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Treat it like an operating system: activate it in your website, pitch, sales enablement, then measure and iterate through L7."
      }
    }
  ]
}
</script>
```

---

## 7) QA checklist

- L1–L7 explorer is the first thing a viewer notices.
- Clicking L pills reliably opens the correct panel.
- Panel content is scannable: summary + bullets + prompt list + GitHub links.
- Mobile UX is clean (vertical accordion).
- FAQ renders and schema validates.
- All GitHub links work and open in a new tab. citeturn1view0
