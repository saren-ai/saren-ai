import type { MegaMenuContent } from "@/components/layout/MegaMenu";

/**
 * Portfolio Mega Menu Content
 */
export const portfolioMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Featured Work",
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
          href: "/portfolio/b2b-marketing-framework",
          label: "B2B Marketing Framework",
          description: "Messaging infrastructure",
        },
      ],
    },
    {
      title: "Interactive Tools",
      links: [
        {
          label: "Paid Media ROI Simulator",
          href: "/portfolio/roi-simulator",
          description: "Interactive financial modeling",
        },
        {
          href: "/portfolio/calculator",
          label: "SaaS Revenue Calculator",
          description: "Funnel metrics reversed from goals",
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
    image: "/portfolio/storyboards/storyboard_06.png",
    imageAlt: "Featured portfolio work",
    headline: "Interactive Case Studies",
    description:
      "Each project includes live demos, data models, and frameworks you can explore. Not just outcomes—actual systems.",
    cta: {
      label: "Explore Portfolio",
      href: "/portfolio",
    },
  },
};

/**
 * Playbooks Mega Menu Content
 */
export const playbooksMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Featured Sequences",
      links: [
        {
          href: "/playbooks/cmo-gtm-playbook",
          label: "CMO GTM Playbook",
          description: "6 parts for executing AI market strategies",
        },
        {
          href: "/portfolio/b2b-marketing-framework",
          label: "B2B Marketing Framework",
          description: "Build an active messaging foundation",
        },
        {
          href: "/portfolio/sovereign-personas",
          label: "Sovereign Buyer Personas",
          description: "Map your committee buying logic",
        },
      ],
    },
    {
      title: "Library",
      links: [
        {
          href: "/playbooks",
          label: "Browse All Playbooks",
          description: "View the full interactive prompt catalog.",
        },
      ],
    },
  ],
  promotional: {
    image: "/portfolio/storyboards/storyboard_06.png", // FPO from portfolio
    imageAlt: "B2B Marketing Framework",
    headline: "B2B Marketing Framework",
    description: "An interactive, 21-step tracked sequence to engineer your B2B SaaS positioning from scratch.",
    cta: {
      label: "Start the Framework",
      href: "/playbooks/b2b-marketing-framework",
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
        {
          href: "/about/brand",
          label: "Brand Style Guide",
          description: "Fire Horse design system",
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
