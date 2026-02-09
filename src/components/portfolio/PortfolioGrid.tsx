"use client";

import PortfolioCard from "./PortfolioCard";

const portfolioItems = [
  {
    title: "The Golden Dashboard",
    description:
      "Which channel spend creates real business outcomes? A single analytics view that answers the hardest question in marketing—and proves it with full-funnel ROI.",
    metric: "550%",
    metricLabel: "Pipeline Expansion",
    href: "/portfolio/golden-dashboard",
  },
  {
    title: "Sovereign Buyer Personas",
    description:
      "Making complex markets simple. A framework for building personas that drive real targeting, messaging, and content decisions.",
    metric: "3x",
    metricLabel: "Conversion Lift",
    href: "/portfolio/sovereign-personas",
  },
  {
    title: "10-Touch Sales Play",
    description:
      "Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings.",
    metric: "42%",
    metricLabel: "Meeting Rate",
    href: "/portfolio/10-touch-sales-play",
  },
  {
    title: "120-Day Content Journey",
    description:
      "How we engineered $4M in quarterly pipeline at Cylance. A 120-day content system that turned awareness into closed deals.",
    metric: "$4M",
    metricLabel: "Quarterly Pipeline",
    href: "/portfolio/120-day-content-journey",
  },
  {
    title: "B2B Marketing Framework",
    description:
      "The messaging infrastructure for teams who can't afford to build on quicksand. A 7-layer framework that creates B2B SaaS positioning from scratch.",
    metric: "21",
    metricLabel: "Prompts",
    href: "/portfolio/b2b-marketing-framework",
  },
  {
    title: "It's Good to Be Pitched",
    description:
      "A 30-second TV spot storyboard exploring the luxury of choice. An interactive demo of AI-assisted creative production.",
    metric: "8",
    metricLabel: "Storyboard Frames",
    href: "/portfolio/its-good-to-be-pitched",
  },
  {
    title: "Behavioral Lead Scoring",
    description:
      "Making buyer behavior predictable. An interactive system that connects engagement, lifecycle, and sales readiness into a single scoring model.",
    metric: "75+",
    metricLabel: "SQL Threshold",
    href: "/portfolio/behavioral-lead-scoring",
  },
  {
    title: "SaaS Revenue Calculator",
    description:
      "Work backwards from revenue to see exactly what it takes. Interactive annual planning tool using industry benchmarks to reverse-engineer your funnel metrics.",
    metric: "18",
    metricLabel: "Industries",
    href: "/portfolio/calculator",
  },
];

export default function PortfolioGrid() {
  return (
    <section className="section bg-ash">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            The Playbook
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            Interactive case studies that demonstrate strategy, systems, and
            results. Click to explore each project.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={item.href}
              {...item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
