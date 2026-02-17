import type { MegaMenuContent } from "@/components/layout/MegaMenu";

/**
 * Portfolio Mega Menu Content
 */
export const portfolioMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
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
        {
          href: "/about/stack",
          label: "AI Stack Tier List",
          description: "Rank my tool choices",
        },
      ],
    },
    {
      title: "Case Studies",
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
          href: "/portfolio/sovereign-personas",
          label: "Sovereign Buyer Personas",
          description: "Committee buying frameworks",
        },
        {
          href: "/portfolio/b2b-marketing-framework",
          label: "B2B Marketing Framework",
          description: "Messaging infrastructure",
        },
        {
          href: "/portfolio/its-good-to-be-pitched",
          label: "It's Good to Be Pitched",
          description: "AI-assisted TV storyboard",
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
 * Demand Machine Mega Menu Content
 */
export const demandMachineMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Diagnostic & Strategy",
      links: [
        {
          href: "/demand-machine/interview",
          label: "36-Question Interview",
          description: "Foundational business intel and gap analysis",
          isComingSoon: true,
        },
        {
          href: "/demand-machine/messaging",
          label: "21-Step Messaging Framework",
          description: "Positioning, pillars, and voice builder",
          isComingSoon: true,
        },
      ],
    },
    {
      title: "Growth Engines",
      links: [
        {
          href: "/demand-machine/content-planner",
          label: "120-Day Content Planner",
          description: "Topic authority and channel allocation",
          isComingSoon: true,
        },
        {
          href: "/demand-machine/lead-magnets",
          label: "Social & Ad Program",
          description: "High-intent lead magnet testing",
          isComingSoon: true,
        },
        {
          href: "/demand-machine/outbound",
          label: "10-Touch Outbound Builder",
          description: "Sales cadence and script designer",
          isComingSoon: true,
        },
      ],
    },
  ],
  promotional: {
    image: "/portfolio/storyboards/storyboard_06.png", // Placeholder as requested
    imageAlt: "The Demand Machine logic flow",
    headline: "The Demand Machine",
    description:
      "A complete operating system for B2B growth. Follow the flow from diagnostic to outbound execution.",
    cta: {
      label: "Start the Machine",
      href: "/demand-machine/interview",
    },
  },
};

/**
 * Thinking Mega Menu Content
 */
export const thinkingMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      links: [
        {
          href: "/ai-operations",
          label: "AI Operations",
          description: "Why AI turns marketing into engineering",
        },
        {
          href: "/podcast/scaling-smarter",
          label: "Scaling Smarter",
          description: "The new architecture of strategy",
        },
        {
          href: "/thinking",
          label: "Micro-Blog",
          description: "Quick takes and tactical insights",
        },
        {
          href: "https://sarenai.substack.com",
          label: "Substack Newsletter",
          description: "Long-form articles and guides",
          isExternal: true,
        },
      ],
    },
  ],
  customContent: null, // Will be populated dynamically in Header
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
    {
      title: "Outside of Work",
      links: [
        {
          href: "/portfolio/psylocke-timeline",
          label: "Psylocke Timeline",
          description: "30 years of body-swaps and identity",
          isExternal: false,
        },
        {
          href: "https://leagueofcomicgeeks.com/profile/saren/collection",
          label: "Comic Collection",
          description: "My pulls and collection on League of Comic Geeks",
          isExternal: true,
        },
        {
          href: "https://www.discogs.com/user/saren13",
          label: "Vinyl Collection",
          description: "Browse my record collection on Discogs",
          isExternal: true,
        },
        {
          href: "https://letterboxd.com/saren13/films/",
          label: "Letterboxd",
          description: "Films I've watched and reviewed",
          isExternal: true,
        },
        {
          href: "https://pops.today/user/Saren/collection/",
          label: "Funko Pop Collection",
          description: "Pop culture collectibles",
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
