# “it’s good to be pitched” — interactive storyboard portfolio page (Cursor build spec)

Create a **net-new** portfolio page that presents a 30-second TV spot storyboard and process notes in a clean, interactive, “case study as product demo” format.

**Proposed route**
- `/portfolio/its-good-to-be-pitched` (recommended)
- Add to portfolio index with short teaser: “A 30-second TV spot storyboard about the pleasure of having 3 great options.”

**Local assets folder**
- You said you created: `portfolio/storyboards/`
- Use the storyboard images already present in that folder with these filenames (exact):
  - `storyboard_01.jpeg`
  - `storyboard_02.jpeg`
  - `storyboard_03.jpeg`
  - `storyboard_04.png`
  - `storyboard_05.jpeg`
  - `storyboard_06.png`
  - `storyboard_07.png`

> Note: Your written sequence has **8 shots**, but we currently have **7 images**. Treat “Shot 8: tagline card” as:
> - either a simple on-page “title card” component (no image needed), or
> - a future image placeholder (recommended placeholder card in the slider).

---

## 1) Page goal (what the viewer should get fast)

This piece should prove three things:
1) **Strategic insight**: the “product” is the *experience of being pitched*—the enjoyment of having 3 strong options to choose from.
2) **Narrative craft**: a clean 30-second arc (setup → 3 pitches → decision → satisfaction → tagline).
3) **AI-assisted execution discipline**: concept → structured prompts (JSON) → consistent storyboard frames.

---

## 2) Hero section (above the interactive module)

**H1:** it’s good to be pitched  
**Subhead:** a 30-second TV spot storyboard about the pleasure of having three great options  
**Meta chips:** `30 seconds` • `storyboard` • `agency pitch concept` • `AI-assisted ideation`

**One-paragraph overview (tight):**
Most agencies sell “the best creative.” This concept sells something simpler: the *feeling* you get when you’re pitched great ideas. The story follows a marketing exec through three pitches, then lands on the satisfaction of choosing the perfect fit.

**Client context line (small):**
Juxt Interactive — agency concept / portfolio piece

---

## 3) Primary interactive component (top of page)

### Required behavior
The top of the page should be an interactive viewer with **two modes**:

#### Mode A — “room view” (grid)
- Shows a grid of the pitching scenario images (the “multiple agencies pitching” world).
- For the grid, use a 2-column layout on desktop and 1-column on mobile.
- Clicking any tile opens that frame in the “sequence view” at the correct index.

#### Mode B — “sequence view” (frame-by-frame)
- Shows a **slider / scrubber** that walks through the storyboard frames in order.
- Controls:
  - Prev/Next buttons
  - Keyboard left/right navigation
  - A scrubber or progress dots labeled **1–8**
  - Thumbnail strip (optional but strong)
- Each frame displays:
  - Frame image (or title-card component for Shot 8)
  - Shot title
  - Timecode range (e.g., 0:00–0:05)
  - 1–2 line description
  - “Mood” chip (e.g., anticipation, electric, clarity)

**Default view**: Sequence view (because it reads like a commercial).  
**Toggle**: “sequence” ↔ “room view (grid)”.

### Suggested UI structure
- A single `StoryboardViewer` component with:
  - `viewMode: "sequence" | "grid"`
  - `activeIndex: number` (0..7)
  - `frames: StoryboardFrame[]` (see data model below)

### Frame definitions (use your notes verbatim, lightly polished)
Frame 1 (0:00–0:05) — the setup  
Frame 2 (0:05–0:08) — tech team presents  
Frame 3 (0:08–0:11) — executive reaction (interested)  
Frame 4 (0:11–0:14) — classic agency presents  
Frame 5 (0:14–0:17) — creative collective presents  
Frame 6 (0:17–0:21) — the eureka moment  
Frame 7 (0:21–0:24) — mission accomplished  
Frame 8 (0:24–0:30) — the tagline card (render as a design component)

### Shot 8 (tagline card) as a component
Implement as a clean “card” with:
- Headline (handwritten-ish font optional): **it’s good to be pitched**
- Subline: **Juxt Interactive**
- Tiny sketch accent (optional SVG line art: easel, pointer, or simple underline)
No image required.

---

## 4) Optional interactive “extras” (keep tasteful)

These are portfolio flexes. Build 1–2 if time allows.

### A) “view prompt” (JSON viewer) per frame
Under each frame (sequence view), include:
- Button: “view prompt JSON”
- Expands a code block with the JSON prompt for that shot (syntax highlighted).
- Include “Copy” button.

If the JSON files exist locally, reference them by filename in the data model:
```
shot_01_the_setup.json
shot_02_tech_team_presents.json
shot_03_executive_reaction_interested.json
shot_04_classic_agency_presents.json
shot_05_creative_collective_presents.json
shot_06_the_eureka_moment.json
shot_07_mission_accomplished.json
shot_08_the_tagline_card.json
```
If they don’t exist yet, implement placeholders and add TODO comments.

### B) Mood timeline (tiny)
A slim horizontal timeline that highlights mood progression across the 8 beats:
- anticipation → energetic → thoughtful → confident → electric → clarity → satisfied → resolution

Make it informational, not decorative.

---

## 5) Rest of page content (sections and copy intent)

### Section: the core insight (pull quote)
Use a wide quote block:
> “The experience of being pitched great creative ideas is itself valuable and enjoyable.”

Then one sentence below:
Agencies aren’t just vendors—they’re providers of a premium “creative showcase” experience.

### Section: the brief (short)
- Create a commercial concept in a single session.
- Protagonist: Asian woman exec, black-framed glasses.
- Three different pitch styles; the joy is having three strong options.

### Section: process (3 columns)
Create a “process overview” row with 3 phases:
1) Concept development (Claude)  
2) Technical specification (JSON per shot)  
3) Image generation (Nano Banana / Gemini)

Each column includes:
- 1–2 sentence explanation
- tool used
- a small “what this solved” bullet

### Section: why the structure matters (short, strategic)
Explain the reason for JSON-per-shot:
- character consistency
- shot-to-shot continuity
- controllable camera angles and mood progression
- avoids “AI drift” across a sequence

### Section: results & applications (cards)
3 cards:
- client pitch deck asset
- agency positioning (the insight)
- portfolio proof (AI prompt engineering + narrative craft)

### CTA section
- Primary: “Let’s talk” (links to contact)
- Secondary: “more portfolio work”

---

## 6) FAQ (5–8 questions) + schema (required)

### Rendered FAQ questions (copy-ready)
1) **What is this project?**  
A storyboarded 30-second TV spot concept built to sell the *experience* of being pitched—having three great options.

2) **What’s the insight behind it?**  
The pleasure isn’t “who wins.” The pleasure is the buyer’s confidence when multiple ideas are genuinely strong.

3) **Why use storyboard sketch style instead of photoreal images?**  
Sketch storyboards reduce uncanny valley and match how real pre-production work looks.

4) **How did you maintain character consistency across frames?**  
By generating prompts per shot with explicit carryover details (the same protagonist description and continuity notes).

5) **What tools did you use?**  
Claude for concept + prompt structure; Nano Banana/Gemini for image generation; JSON to keep the system deterministic.

6) **How would this concept translate to a final commercial?**  
The beats stay the same; the storyboards become a shot list, then production design, casting, and edit timing.

7) **Can you apply this process to other narratives?**  
Yes—any short-form story benefits from beat structure + consistency constraints.

### FAQPage JSON-LD
Add this JSON-LD in the page head (Next.js: `next/script` or metadata injection):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is this project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A storyboarded 30-second TV spot concept built to sell the experience of being pitched—having three great options."
      }
    },
    {
      "@type": "Question",
      "name": "What’s the insight behind it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The pleasure isn’t who wins. The pleasure is the buyer’s confidence when multiple ideas are genuinely strong."
      }
    },
    {
      "@type": "Question",
      "name": "Why use storyboard sketch style instead of photoreal images?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sketch storyboards reduce uncanny valley and match how real pre-production work looks."
      }
    },
    {
      "@type": "Question",
      "name": "How did you maintain character consistency across frames?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By generating prompts per shot with explicit carryover details—same protagonist description and continuity notes across every frame."
      }
    },
    {
      "@type": "Question",
      "name": "What tools did you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude for concept and prompt structure; Nano Banana/Gemini for image generation; JSON to keep the system deterministic."
      }
    },
    {
      "@type": "Question",
      "name": "How would this concept translate to a final commercial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The beats stay the same; the storyboards become a shot list, then production design, casting, and edit timing."
      }
    },
    {
      "@type": "Question",
      "name": "Can you apply this process to other narratives?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes—any short-form story benefits from beat structure plus consistency constraints."
      }
    }
  ]
}
</script>
```

---

## 7) Data model + component plan (Cursor build details)

### Data model (TypeScript)
Create a single config file, e.g.:
- `portfolio/storyboards/its-good-to-be-pitched.data.ts`

```ts
export type StoryboardFrame = {
  id: number; // 1..8
  title: string;
  timecode: string; // "0:00–0:05"
  description: string;
  mood: string;
  imageSrc?: string; // undefined for shot 8 (tagline card)
  alt: string;
  jsonSrc?: string; // optional local path to JSON file
};

export const frames: StoryboardFrame[] = [
  {
    id: 1,
    title: "the setup",
    timecode: "0:00–0:05",
    description: "Wide establishing shot: exec at the head of the table as three distinct teams prepare to pitch.",
    mood: "anticipation",
    imageSrc: "/portfolio/storyboards/storyboard_01.jpeg",
    alt: "Conference room wide shot with an executive and multiple teams prepared to pitch."
  },
  {
    id: 2,
    title: "tech team presents",
    timecode: "0:05–0:08",
    description: "A tech-forward presenter uses a laser pointer to pitch motion and digital concepts.",
    mood: "energetic",
    imageSrc: "/portfolio/storyboards/storyboard_02.jpeg",
    alt: "Presenter pitching with laser pointer in a conference room."
  },
  {
    id: 3,
    title: "executive reaction (interested)",
    timecode: "0:08–0:11",
    description: "Close-up: thoughtful evaluation—hand on chin, engaged but reserving judgment.",
    mood: "thoughtful",
    imageSrc: "/portfolio/storyboards/storyboard_03.jpeg",
    alt: "Close-up of executive thinking with hand on chin."
  },
  {
    id: 4,
    title: "classic agency presents",
    timecode: "0:11–0:14",
    description: "A polished agency lead draws a strategy framework on a whiteboard.",
    mood: "confident",
    imageSrc: "/portfolio/storyboards/storyboard_04.png",
    alt: "Presenter at a whiteboard showing campaign framework sketches."
  },
  {
    id: 5,
    title: "creative collective presents",
    timecode: "0:14–0:17",
    description: "High-energy pitch: dual presentation with boards and screen—unexpected, bold ideas.",
    mood: "electric",
    imageSrc: "/portfolio/storyboards/storyboard_05.jpeg",
    alt: "Creative team presenting with energetic gestures and visual boards."
  },
  {
    id: 6,
    title: "the eureka moment",
    timecode: "0:17–0:21",
    description: "Clarity arrives—glasses adjustment, then a decisive raised finger.",
    mood: "clarity",
    imageSrc: "/portfolio/storyboards/storyboard_06.png",
    alt: "Executive adjusting glasses and raising a finger in a eureka gesture."
  },
  {
    id: 7,
    title: "mission accomplished",
    timecode: "0:21–0:24",
    description: "Satisfied and resolved—leaning back with a confident smile.",
    mood: "satisfied",
    imageSrc: "/portfolio/storyboards/storyboard_07.png",
    alt: "Executive leaning back with a satisfied expression in the conference room."
  },
  {
    id: 8,
    title: "tagline card",
    timecode: "0:24–0:30",
    description: "Title card: it’s good to be pitched — Juxt Interactive.",
    mood: "resolution"
  }
];
```

### Components
- `ItsGoodToBePitchedPage`
  - `Hero`
  - `StoryboardViewer` (top interactive)
    - `ViewerHeader` (toggle: sequence/grid)
    - `SequenceView`
      - `FrameStage` (image + meta)
      - `FrameControls` (prev/next, scrubber)
      - `FrameThumbStrip` (optional)
      - `FrameJsonToggle` (optional)
      - `TaglineCard` (for shot 8)
    - `GridView` (clickable tiles)
  - `InsightPullQuote`
  - `Brief`
  - `ProcessOverview`
  - `WhyJsonMatters`
  - `Applications`
  - `FAQ` (+ schema)
  - `CTA`

### Interaction rules
- Clicking a grid tile sets `activeIndex` and switches to sequence view.
- Scrubber updates `activeIndex` and animates transition (crossfade is fine).
- Keyboard nav supported on sequence view.
- Mobile: default to sequence view with swipe gestures; grid view remains accessible.

---

## 8) Copy hygiene / naming consistency

Your notes list “Saren Rogers” in Credits. If your site identity is “Saren Sakurai,” standardize to one name on-page (recommended: match site-wide identity). Keep “Juxt Interactive” as client context.

---

## 9) Performance and accessibility (must-haves)

- Use `next/image` or equivalent with responsive sizing.
- Lazy-load frames not currently visible (especially for grid view).
- Alt text is required (provided in data model).
- Respect reduced-motion settings for transitions.
- Ensure the viewer is keyboard navigable.

---

## 10) Done definition (QA checklist)

- Page exists at `/portfolio/its-good-to-be-pitched` and is linked from portfolio.
- Top viewer toggles grid/sequence.
- Sequence view supports 1–8 (with Shot 8 rendered as title card).
- Grid tiles open the correct frame in sequence view.
- All sections render cleanly on mobile.
- FAQ renders + schema validates.
