"use client";

import PortfolioCard from "./PortfolioCard";

const portfolioItems = [
  {
    title: "The Golden Dashboard",
    description:
      "Seeing ROI across the full demand funnel. A single analytics view that answers the hardest question in marketing: which channel spend creates real business outcomes?",
    metric: "550%",
    metricLabel: "Pipeline Expansion",
    href: "/portfolio/golden-dashboard",
  },
  {
    title: "Sovereign Buyer Personas",
    description:
      "Making complex markets legible. A framework for building personas that actually drive targeting, messaging, and content decisions.",
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
      "How we engineered demand at Cylance. A content system designed to move buyers from awareness through purchase consideration.",
    metric: "$4M",
    metricLabel: "Quarterly Pipeline",
    href: "/portfolio/120-day-content-journey",
  },
];

export default function PortfolioGrid() {
  return (
    <section className="section bg-ash">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            The Work
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
