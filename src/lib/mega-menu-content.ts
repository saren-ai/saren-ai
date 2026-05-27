import type { MegaMenuContent } from "@/components/layout/MegaMenu";

/**
 * Who We Serve Mega Menu
 * Routes visitors to the three audience-specific persona landing pages.
 */
export const whoWeServeMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Choose Your Path",
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
  ],
  promotional: {
    headline: "Built for your situation",
    description:
      "Every resource, playbook, and framework on this site maps to a specific audience challenge. Find yours and go deeper.",
    cta: {
      label: "Browse All Downloads",
      href: "/downloads",
    },
  },
};

/**
 * Work Mega Menu Content
 * Portfolio case studies + AI Orchestration / Signal-State in one place.
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
          href: "/portfolio/executive-dashboard",
          label: "Demand Gen Command Center",
          description: "AI-built exec dashboard, 5 live APIs",
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
          href: "/portfolio/hybrid-lead-scoring",
          label: "Hybrid Lead Scoring",
          description: "Buyer motion intent tracking",
        },
      ],
    },
    {
      title: "AI Orchestration",
      links: [
        {
          href: "/ai-orchestration",
          label: "AI Orchestration Overview",
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
          description: "The Signal-State method",
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
        {
          href: "/about/clients",
          label: "Client Brands",
          description: "26+ brands from startups to Fortune 500",
        },
        {
          href: "https://calendly.com/sarenai",
          label: "Book 30 Minutes",
          description: "Book 30 minutes and let's talk",
          isExternal: true,
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
