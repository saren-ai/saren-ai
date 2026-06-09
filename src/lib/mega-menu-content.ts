import type { MegaMenuContent } from "@/components/layout/MegaMenu";

/**
 * Solutions Mega Menu
 * Audience paths (SMB / Solopreneurs / Thinkers) + AI Capability offerings.
 */
export const solutionsMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "By Audience",
      links: [
        {
          href: "/smb",
          label: "Founders & Mid-Market",
          description: "GTM systems and demand gen architecture for growth-stage companies",
        },
        {
          href: "/solopreneurs",
          label: "Solo Founders & Fractional CMOs",
          description: "Pipeline automation and leverage systems for independent operators",
        },
        {
          href: "/thinkers",
          label: "Subject Matter Experts",
          description: "Authority engineering and content architecture for knowledge practitioners",
        },
      ],
    },
    {
      title: "By Capability",
      links: [
        {
          href: "/ai-orchestration",
          label: "AI Orchestration",
          description: "Machines handle scale. Humans handle meaning.",
        },
        {
          href: "/signal-state",
          label: "Signal-State Marketing",
          description: "AI-enabled expressed intent targeting",
        },
        {
          href: "/signal-state/framework",
          label: "The Framework",
          description: "The Signal-State method, step by step",
        },
        {
          href: "/signal-state/signal-library",
          label: "Signal Library",
          description: "Catalogued intent patterns and targeting signals",
        },
      ],
    },
  ],
  promotional: {
    headline: "Built for your situation",
    description:
      "Every resource, playbook, and framework on this site maps to a specific audience challenge. Find yours and go deeper.",
    cta: {
      label: "Browse Playbook Library",
      href: "/playbooks",
    },
  },
};

/**
 * Case Studies Mega Menu
 * B2B proof narratives — pipeline programs and strategy & systems.
 */
export const caseStudiesMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Pipeline Programs",
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
          href: "/case-studies/intent-data",
          label: "Intent Data Intelligence",
          description: "Bombora signals → enterprise close",
        },
        {
          href: "/case-studies/dynamic-nurture",
          label: "Dynamic Email Nurture",
          description: "Personalized B2B nurture engine",
        },
      ],
    },
    {
      title: "Strategy & Systems",
      links: [
        {
          href: "/case-studies/executive-dashboard",
          label: "Demand Gen Command Center",
          description: "AI-built exec dashboard, 5 live APIs",
        },
        {
          href: "/case-studies/sovereign-personas",
          label: "Sovereign Buyer Personas",
          description: "Committee buying logic mapped",
        },
        {
          href: "/case-studies/authority-engineering",
          label: "Authority Engineering",
          description: "LLM-citation content architecture",
        },
        {
          href: "/case-studies/thought-leadership-development",
          label: "Thought Leadership Dev",
          description: "Executive visibility pipeline",
        },
      ],
    },
  ],
  promotional: {
    image: "/mega-menu/120-day-content-journey.png",
    imageAlt: "120-Day Content Journey",
    headline: "Proof Over Promises",
    description:
      "Pipeline programs, scoring models, and frameworks built for enterprise B2B. Not just outcomes — the actual systems behind them.",
    cta: {
      label: "Client Brands",
      href: "/about/clients",
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

// Legacy export aliases — used by any older imports not yet updated
export const whoWeServeMegaMenu = solutionsMegaMenu;
export const workMegaMenu = caseStudiesMegaMenu;
