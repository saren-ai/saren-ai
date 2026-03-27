import type { MegaMenuContent } from "@/components/layout/MegaMenu";

/**
 * Work Mega Menu Content
 * Replaces the old split between Portfolio and Playbooks.
 * Two columns: Pipeline Programs (demand gen proof) + Strategy & Systems (frameworks/tools).
 */
export const workMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Pipeline Programs",
      links: [
        {
          href: "/portfolio/120-day-content-journey",
          label: "120-Day Content Journey",
          description: "$4M pipeline from content",
        },
        {
          href: "/portfolio/10-touch-sales-play",
          label: "10-Touch Sales Play",
          description: "Multi-channel outbound system",
        },
        {
          href: "/portfolio/intent-data",
          label: "Intent Data Intelligence",
          description: "Bombora signals → enterprise close",
        },
        {
          href: "/portfolio/dynamic-nurture",
          label: "Dynamic Email Nurture",
          description: "Personalized B2B nurture engine",
        },
      ],
    },
    {
      title: "Strategy & Systems",
      links: [
        {
          href: "/portfolio/b2b-marketing-framework",
          label: "B2B Marketing Framework",
          description: "Full messaging infrastructure",
        },
        {
          href: "/portfolio/sovereign-personas",
          label: "Sovereign Buyer Personas",
          description: "Committee buying logic mapped",
        },
        {
          href: "/portfolio/roi-simulator",
          label: "Paid Media ROI Simulator",
          description: "Interactive attribution modeling",
        },
        {
          href: "/portfolio/behavioral-lead-scoring",
          label: "Behavioral Lead Scoring",
          description: "Buyer motion intent tracking",
        },
      ],
    },
  ],
  promotional: {
    image: "/mega-menu/120-day-content-journey.png",
    imageAlt: "120-Day Content Journey",
    headline: "Demand Gen at Scale",
    description:
      "Pipeline programs, scoring models, and frameworks built for enterprise B2B. Not just outcomes — the actual systems behind them.",
    cta: {
      label: "View All Work",
      href: "/portfolio",
    },
  },
};

/**
 * AI Orchestration Mega Menu Content
 */
export const aiOrchestrationMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "AI Orchestration",
      links: [
        {
          href: "/ai-orchestration",
          label: "Overview",
          description: "Machines handle scale. Humans handle meaning.",
        },
      ],
    },
    {
      title: "Signal-State Marketing",
      links: [
        {
          href: "/signal-state",
          label: "Overview",
          description: "AI-enabled expressed intent targeting",
        },
        {
          href: "/signal-state/framework",
          label: "Framework",
          description: "The Signal-State method",
        },
        {
          href: "/signal-state/architecture",
          label: "Architecture",
          description: "System design for agentic outreach",
        },
        {
          href: "/signal-state/use-cases",
          label: "Use Cases",
          description: "Cybersecurity, org alignment, creative",
        },
        {
          href: "/signal-state/signal-library",
          label: "Signal Library",
          description: "Catalogued targeting patterns",
        },
      ],
    },
  ],
  promotional: {
    headline: "AI That Serves Human Judgment",
    description:
      "Orchestration means designing AI systems where the machine handles scale and the human handles meaning. Signal-State is the proof of concept.",
    cta: {
      label: "Explore Signal-State",
      href: "/signal-state",
    },
  },
};

/**
 * About Mega Menu Content
 */
export const aboutMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Professional",
      links: [
        {
          href: "/about",
          label: "About Me",
          description: "Career journey and background",
        },
        {
          href: "/about/clients",
          label: "Client Brands",
          description: "26+ brands from startups to Fortune 500",
        },
        {
          href: "/about/stack",
          label: "My Stack",
          description: "Tools I use to build and grow",
        },
      ],
    },
  ],
  promotional: {
    headline: "Fractional CMO for Series A Founders",
    description:
      "I help technical founders build their first real marketing engine—from demand gen to attribution to category creation. Without ripping out what's working.",
    cta: {
      label: "Book a Call",
      href: "/contact",
    },
  },
};
