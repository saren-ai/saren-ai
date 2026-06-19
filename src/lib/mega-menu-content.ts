import type { MegaMenuContent } from "@/components/layout/MegaMenu";

/**
 * Work Mega Menu
 * The commercial core: what I do (Services) + proof it works (Case Studies).
 */
export const workMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Services",
      links: [
        {
          href: "/ai-orchestration",
          label: "AI Orchestration",
          description: "Machines handle scale. Humans handle meaning.",
        },
        {
          href: "/gtm-engineering",
          label: "GTM Engineering",
          description: "Stop running campaigns. Engineer the system.",
        },
        {
          href: "/signal-state",
          label: "Signal-State Marketing",
          description: "AI-enabled expressed intent targeting",
        },
        {
          href: "/fractional-marketing-lead",
          label: "Fractional Marketing Lead",
          description: "Your first real marketing engine, built to scale",
        },
        {
          href: "/work",
          label: "Work With Me →",
          description: "Engagement models and how to start",
        },
      ],
    },
    {
      title: "Case Studies",
      links: [
        {
          href: "/case-studies/120-day-content-journey",
          label: "120-Day Content Journey",
          description: "$4M pipeline from content",
        },
        {
          href: "/case-studies/10-touch-sales-play",
          label: "10-Touch Sales Play",
          description: "Multi-channel outbound system",
        },
        {
          href: "/case-studies/executive-dashboard",
          label: "Demand Gen Command Center",
          description: "AI-built exec dashboard, 5 live APIs",
        },
        {
          href: "/case-studies",
          label: "All case studies →",
          description: "Eight enterprise B2B proof narratives",
        },
      ],
    },
  ],
  promotional: {
    image: "/images/og/ai-operations.png",
    imageAlt: "AI-orchestrated marketing operations",
    headline: "Build the engine, not the headcount",
    description:
      "Fractional marketing leadership and AI-orchestrated GTM systems for early-stage and Series A founders — demand gen, attribution, and category, without ripping out what works.",
    cta: {
      label: "Work With Me",
      href: "/work",
    },
  },
};

/**
 * Playbooks Mega Menu
 * Prompt-sequence playbooks + interactive tools (mirrors the /playbooks toggle).
 */
export const playbooksMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Playbooks",
      links: [
        {
          href: "/playbooks/cmo-gtm-playbook",
          label: "CMO GTM Playbook",
          description: "6-step go-to-market intelligence build for B2B",
        },
        {
          href: "/playbooks/mckinsey-strategy-suite",
          label: "McKinsey Strategy Suite",
          description: "Consulting-grade strategic analysis frameworks",
        },
        {
          href: "/playbooks/research-intelligence-pipeline",
          label: "Research Intelligence Pipeline",
          description: "Turn open questions into structured intelligence",
        },
        {
          href: "/playbooks",
          label: "Browse all Playbooks →",
          description: "The full prompt-sequence library",
        },
      ],
    },
    {
      title: "Interactive Tools",
      links: [
        {
          href: "/playbooks/roi-simulator",
          label: "Paid Media ROI Simulator",
          description: "Model revenue impact from real unit economics",
        },
        {
          href: "/playbooks/gtm-budget-calculator",
          label: "SaaS Revenue Calculator",
          description: "Reverse-engineer the funnel from a revenue goal",
        },
        {
          href: "/playbooks/hybrid-lead-scoring",
          label: "Hybrid Lead Scoring",
          description: "Fit + engagement dual-axis scoring model",
        },
        {
          href: "/playbooks/b2b-marketing-framework",
          label: "B2B Marketing Framework",
          description: "7-layer positioning built from scratch",
        },
      ],
    },
  ],
  promotional: {
    headline: "Run it now — no setup",
    description:
      "Calculators, scoring models, and prompt sequences drawn from real $4M pipeline programs. Browse by type or jump straight to a tool.",
    cta: {
      label: "Open the Playbook Library",
      href: "/playbooks",
    },
  },
};

/**
 * Studio Mega Menu
 * Creative & editorial — headlines the AI for Liberal Arts Majors series.
 */
export const studioMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "AI for Liberal Arts Majors",
      links: [
        {
          href: "/studio/ai-for-liberal-arts",
          label: "The Series",
          description: "Creative AI skills for humanities thinkers",
        },
        {
          href: "/studio/oblique-techniques",
          label: "Oblique Techniques",
          description: "Prompt Against the Machine — constraint-based stratagems",
        },
      ],
    },
    {
      title: "Features",
      links: [
        {
          href: "/studio",
          label: "All of the Studio",
          description: "Creative work and editorial, in one place",
        },
        {
          href: "/studio/psylocke-timeline",
          label: "Psylocke Timeline",
          description: "Interactive Kwannon / Betsy Braddock comics timeline",
        },
      ],
    },
  ],
  promotional: {
    headline: "Oblique Techniques",
    description:
      "A collection of stratagems from Surrealism, Oulipo, and Fluxus — for people who think the default AI output is the problem, not the solution.",
    cta: {
      label: "Explore the series",
      href: "/studio/ai-for-liberal-arts",
    },
  },
};

/**
 * About Mega Menu
 * Bio & Booking front-and-center; creative archives grouped separately.
 */
export const aboutMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Bio & Booking",
      links: [
        {
          href: "/about",
          label: "About Me",
          description: "Career journey and background",
        },
        {
          href: "/resume",
          label: "Resume",
          description: "Career history, impact metrics, and core competencies",
        },
        {
          href: "https://calendly.com/sarenai",
          label: "Book 30 Minutes",
          description: "Schedule a call — no pitch, just a real conversation",
          isExternal: true,
        },
      ],
    },
    {
      title: "The Archives",
      links: [
        {
          href: "/about/expertise",
          label: "Expertise Timeline",
          description: "Two decades of digital marketing trends",
        },
        {
          href: "/brand",
          label: "Brand Guide",
          description: "Fire Horse 2026 design system",
        },
        {
          href: "/about#stack",
          label: "My Stack",
          description: "Tools I use to build and grow",
        },
      ],
    },
  ],
  promotional: {
    headline: "Fractional Marketing Lead for Series A Founders",
    description:
      "I help technical founders build their first real marketing engine—from demand gen to attribution to category creation. Without ripping out what's working.",
    cta: {
      label: "See the Engagement",
      href: "/fractional-marketing-lead",
    },
  },
};
