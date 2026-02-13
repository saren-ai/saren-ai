import type { MegaMenuContent } from "@/components/layout/MegaMenu";

/**
 * Portfolio Mega Menu Content
 */
export const portfolioMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      title: "Revenue & Systems",
      links: [
        {
          label: "Paid Media ROI Simulator",
          href: "/portfolio/roi-simulator",
          description: "Interactive financial modeling for ad spend.",
        },
        {
          href: "/portfolio/120-day-content-journey",
          label: "120-Day Content Journey",
          description: "$4M quarterly pipeline from systematic content",
        },
        {
          href: "/portfolio/calculator",
          label: "SaaS Revenue Calculator",
          description: "Reverse-engineer funnel metrics from revenue goals",
        },
        {
          href: "/portfolio/behavioral-lead-scoring",
          label: "Behavioral Lead Scoring",
          description: "Making buyer motion legible across the journey",
        },
      ],
    },
    {
      title: "Strategy & Creative",
      links: [
        {
          href: "/portfolio/b2b-marketing-framework",
          label: "B2B Marketing Framework",
          description: "7-layer prompt matrix for messaging infrastructure",
        },
        {
          href: "/portfolio/10-touch-sales-play",
          label: "10-Touch Sales Play",
          description: "Multi-channel outbound system (42% meeting rate)",
        },
        {
          href: "/portfolio/sovereign-personas",
          label: "Sovereign Buyer Personas",
          description: "Committee buying frameworks for complex deals",
        },
        {
          href: "/portfolio/its-good-to-be-pitched",
          label: "It's Good to Be Pitched",
          description: "AI-assisted storyboard for 30-second TV spot",
        },
        {
          href: "/portfolio/psylocke-timeline",
          label: "Psylocke Timeline",
          description: "Interactive comic history across 27 issues",
        },
        {
          href: "/portfolio",
          label: "View All Work →",
          description: "Complete portfolio",
        },
      ],
    },
    // Merged Creative Production into GTM or just kept as is? 
    // User asked for "two columns with text links". Currently we have 4 sections. 
    // I will consolidate into 2 main columns by grouping.
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
 * Thinking Mega Menu Content
 */
export const thinkingMegaMenu: MegaMenuContent = {
  layout: "three-column",
  sections: [
    {
      links: [
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
