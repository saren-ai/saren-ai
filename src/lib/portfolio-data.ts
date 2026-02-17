export interface PortfolioItem {
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    href: string;
    pillars: string[];
    type: "interactive" | "case_study";
}

export const portfolioItems: PortfolioItem[] = [
    // Interactive Tools
    {
        title: "Paid Media ROI Simulator",
        description:
            "Stop guessing. Simulate the revenue impact of your ad spend using real unit economics. An interactive financial model for performance marketers.",
        metric: "550%",
        metricLabel: "Pipeline Expansion",
        href: "/portfolio/roi-simulator",
        pillars: ["Predictive Infrastructure", "Scale Without Headcount"],
        type: "interactive",
    },
    {
        title: "SaaS Revenue Calculator",
        description:
            "Reverse-engineer funnel metrics from revenue goals. Calculate exactly how many leads, MQLs, and demos you need to hit your target.",
        metric: "100%",
        metricLabel: "Funnel Clarity",
        href: "/portfolio/calculator",
        pillars: ["Predictive Infrastructure", "Revenue Engineering"],
        type: "interactive",
    },
    {
        title: "Behavioral Lead Scoring",
        description:
            "Making buyer motion legible. A dynamic scoring model that tracks fit and engagement to surface high-intent accounts automatically.",
        metric: "3x",
        metricLabel: "Lead Quality",
        href: "/portfolio/behavioral-lead-scoring",
        pillars: ["Predictive Infrastructure", "Automated Qualification"],
        type: "interactive",
    },
    {
        title: "AI Stack Tier List",
        description:
            "A living, rankable database of the AI tools that actually matter for B2B growth. Sift through the noise.",
        metric: "50+",
        metricLabel: "Tools Ranked",
        href: "/about/stack",
        pillars: ["Scale Without Headcount"],
        type: "interactive",
    },

    // Case Studies
    {
        title: "Sovereign Buyer Personas",
        description:
            "Making complex markets simple. A framework for building personas that drive real targeting, messaging, and content decisions.",
        metric: "3x",
        metricLabel: "Conversion Lift",
        href: "/portfolio/sovereign-personas",
        pillars: ["Human Strategy", "Predictive Infrastructure"],
        type: "case_study",
    },
    {
        title: "10-Touch Sales Play",
        description:
            "Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings.",
        metric: "42%",
        metricLabel: "Meeting Rate",
        href: "/portfolio/10-touch-sales-play",
        pillars: ["Human Strategy", "Predictive Infrastructure"],
        type: "case_study",
    },
    {
        title: "120-Day Content Journey",
        description:
            "How we engineered $4M in quarterly pipeline at Cylance. A 120-day content system that turned awareness into closed deals.",
        metric: "$4M",
        metricLabel: "Quarterly Pipeline",
        href: "/portfolio/120-day-content-journey",
        pillars: ["Human Strategy", "Scale Without Headcount"],
        type: "case_study",
    },
    {
        title: "B2B Marketing Framework",
        description:
            "The messaging infrastructure for teams who can't afford to build on quicksand. A 7-layer framework that creates B2B SaaS positioning from scratch.",
        metric: "21",
        metricLabel: "Prompts",
        href: "/portfolio/b2b-marketing-framework",
        pillars: ["Human Strategy"],
        type: "case_study",
    },
    {
        title: "It's Good to Be Pitched",
        description:
            "A 30-second TV spot storyboard exploring the luxury of choice. An interactive demo of AI-assisted creative production.",
        metric: "8",
        metricLabel: "Storyboard Frames",
        href: "/portfolio/its-good-to-be-pitched",
        pillars: ["Human Strategy"],
        type: "case_study",
    },
];

export const getInteractiveTools = () => portfolioItems.filter(item => item.type === "interactive");
export const getCaseStudies = () => portfolioItems.filter(item => item.type === "case_study");
export const getRelatedWork = (currentHref: string, limit = 2) => {
    return portfolioItems
        .filter(item => item.href !== currentHref && item.type === "case_study")
        .slice(0, limit);
};
