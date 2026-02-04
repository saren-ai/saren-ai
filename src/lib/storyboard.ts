/**
 * Data model and content for "It's Good to Be Pitched" storyboard portfolio page
 */

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
    description:
      "Wide establishing shot: exec at the head of the table as three distinct teams prepare to pitch.",
    mood: "anticipation",
    imageSrc: "/portfolio/storyboards/storyboard_01.png",
    alt: "Conference room wide shot with an executive and multiple teams prepared to pitch.",
  },
  {
    id: 2,
    title: "tech team presents",
    timecode: "0:05–0:08",
    description:
      "A tech-forward presenter uses a laser pointer to pitch motion and digital concepts.",
    mood: "energetic",
    imageSrc: "/portfolio/storyboards/storyboard_02.png",
    alt: "Presenter pitching with laser pointer in a conference room.",
  },
  {
    id: 3,
    title: "executive reaction (interested)",
    timecode: "0:08–0:11",
    description:
      "Close-up: thoughtful evaluation—hand on chin, engaged but reserving judgment.",
    mood: "thoughtful",
    imageSrc: "/portfolio/storyboards/storyboard_03.png",
    alt: "Close-up of executive thinking with hand on chin.",
  },
  {
    id: 4,
    title: "classic agency presents",
    timecode: "0:11–0:14",
    description:
      "A polished agency lead draws a strategy framework on a whiteboard.",
    mood: "confident",
    imageSrc: "/portfolio/storyboards/storyboard_04.png",
    alt: "Presenter at a whiteboard showing campaign framework sketches.",
  },
  {
    id: 5,
    title: "creative collective presents",
    timecode: "0:14–0:17",
    description:
      "High-energy pitch: dual presentation with boards and screen—unexpected, bold ideas.",
    mood: "electric",
    imageSrc: "/portfolio/storyboards/storyboard_05.png",
    alt: "Creative team presenting with energetic gestures and visual boards.",
  },
  {
    id: 6,
    title: "the eureka moment",
    timecode: "0:17–0:21",
    description:
      "Clarity arrives—glasses adjustment, then a decisive raised finger.",
    mood: "clarity",
    imageSrc: "/portfolio/storyboards/storyboard_06.png",
    alt: "Executive adjusting glasses and raising a finger in a eureka gesture.",
  },
  {
    id: 7,
    title: "mission accomplished",
    timecode: "0:21–0:24",
    description:
      "Satisfied and resolved—leaning back with a confident smile.",
    mood: "satisfied",
    imageSrc: "/portfolio/storyboards/storyboard_07.png",
    alt: "Executive leaning back with a satisfied expression in the conference room.",
  },
  {
    id: 8,
    title: "tagline card",
    timecode: "0:24–0:30",
    description: "Title card: it's good to be pitched — Juxt Interactive.",
    mood: "resolution",
    alt: "Title card showing the tagline and brand.",
  },
];

/**
 * Mood color mappings for visual consistency
 */
export const moodColors: Record<string, string> = {
  anticipation: "bg-slate/10 text-slate",
  energetic: "bg-electric/10 text-electric",
  thoughtful: "bg-copper/10 text-copper",
  confident: "bg-charcoal/10 text-charcoal",
  electric: "bg-ember/10 text-ember",
  clarity: "bg-electric/10 text-electric",
  satisfied: "bg-copper/10 text-copper",
  resolution: "bg-charcoal/10 text-charcoal",
};

/**
 * Process phases
 */
export const processPhases = [
  {
    number: 1,
    title: "Concept Development",
    tool: "Claude",
    description:
      "Structured the narrative arc, defined the protagonist, and mapped the three pitch styles to create emotional progression.",
    whatItSolved: "Clear beat structure prevents AI drift",
  },
  {
    number: 2,
    title: "Technical Specification",
    tool: "JSON per shot",
    description:
      "Created detailed prompts for each frame with explicit character continuity, camera angles, and mood progression.",
    whatItSolved: "Character consistency across all frames",
  },
  {
    number: 3,
    title: "Image Generation",
    tool: "Nano Banana / Gemini",
    description:
      "Generated storyboard sketches using the JSON specifications, maintaining visual continuity throughout.",
    whatItSolved: "Sketch style reduces uncanny valley",
  },
];

/**
 * Application cards
 */
export const applications = [
  {
    title: "Client Pitch Deck Asset",
    description:
      "Professional storyboard frames that demonstrate campaign narrative and production readiness.",
  },
  {
    title: "Agency Positioning",
    description:
      "Selling the insight: the value isn't just 'the best idea'—it's the experience of having great options.",
  },
  {
    title: "Portfolio Proof",
    description:
      "Demonstrates AI prompt engineering, narrative craft, and systematic approach to creative production.",
  },
];
