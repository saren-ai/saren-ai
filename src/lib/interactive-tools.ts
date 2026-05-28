export type InteractiveTool = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  audience: "SMB" | "Solopreneurs" | "Thinkers";
  accentColor: "ember" | "lavender" | "copper";
  items: string[];
  href: string;
};

export const INTERACTIVE_TOOLS: InteractiveTool[] = [
  {
    id: "roi-simulator",
    name: "Paid Media ROI Simulator",
    tagline: "Simulate the revenue impact of your ad spend using real unit economics.",
    category: "Demand Gen",
    audience: "SMB",
    accentColor: "ember",
    items: [
      "Interactive financial model for performance marketers",
      "Input spend, CPL, and conversion rates for instant output",
      "Projects pipeline and revenue against industry benchmarks",
      "Built from real $4M pipeline programs",
    ],
    href: "/playbooks/roi-simulator",
  },
  {
    id: "gtm-budget-calculator",
    name: "SaaS Revenue Calculator",
    tagline: "Reverse-engineer funnel metrics from revenue goals.",
    category: "Revenue Planning",
    audience: "SMB",
    accentColor: "ember",
    items: [
      "Set a revenue target and work backwards through the funnel",
      "Calculate required leads, MQLs, and demos",
      "Adjustable conversion rates at every stage",
      "Board-ready output for planning and forecasting",
    ],
    href: "/playbooks/gtm-budget-calculator",
  },
  {
    id: "hybrid-lead-scoring",
    name: "Hybrid Lead Scoring",
    tagline: "A dynamic scoring model that surfaces high-intent accounts automatically.",
    category: "Scoring & Qualification",
    audience: "SMB",
    accentColor: "ember",
    items: [
      "Fit + engagement dual-axis scoring model",
      "Configurable signal weights and intent thresholds",
      "Sales handoff trigger logic at 75+ behavioral points",
      "Built to run on HubSpot or Salesforce",
    ],
    href: "/playbooks/hybrid-lead-scoring",
  },
  {
    id: "b2b-marketing-framework",
    name: "B2B Marketing Framework",
    tagline: "A 7-layer framework that builds B2B SaaS positioning from scratch.",
    category: "Positioning & Messaging",
    audience: "SMB",
    accentColor: "ember",
    items: [
      "21 AI prompt sequences for positioning and messaging",
      "7-layer architecture from ICP definition to launch-ready narrative",
      "Works for early-stage teams with no marketing history",
      "Battle-tested across cybersecurity and AI verticals",
    ],
    href: "/playbooks/b2b-marketing-framework",
  },
  {
    id: "its-good-to-be-pitched",
    name: "It's Good to Be Pitched",
    tagline: "A 30-second TV spot storyboard — an interactive AI creative production demo.",
    category: "Creative Production",
    audience: "Thinkers",
    accentColor: "copper",
    items: [
      "8 interactive storyboard frames",
      "Demonstrates AI-assisted creative production workflow end-to-end",
      "Luxury brand positioning reference for enterprise contexts",
      "Useful for AI creative directors and brand strategists",
    ],
    href: "/playbooks/its-good-to-be-pitched",
  },
];
