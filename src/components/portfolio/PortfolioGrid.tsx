"use client";

import { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { motion, AnimatePresence } from "framer-motion";

const PILLARS = [
  "All",
  "Predictive Infrastructure",
  "Human Strategy",
  "Scale Without Headcount",
];

const portfolioItems = [
  {
    title: "Paid Media ROI Simulator",
    description:
      "Stop guessing. Simulate the revenue impact of your ad spend using real unit economics. An interactive financial model for performance marketers.",
    metric: "550%",
    metricLabel: "Pipeline Expansion",
    href: "/portfolio/roi-simulator",
    pillars: ["Predictive Infrastructure", "Scale Without Headcount"],
  },
  {
    title: "Sovereign Buyer Personas",
    description:
      "Making complex markets simple. A framework for building personas that drive real targeting, messaging, and content decisions.",
    metric: "3x",
    metricLabel: "Conversion Lift",
    href: "/portfolio/sovereign-personas",
    pillars: ["Human Strategy", "Predictive Infrastructure"],
  },
  {
    title: "10-Touch Sales Play",
    description:
      "Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings.",
    metric: "42%",
    metricLabel: "Meeting Rate",
    href: "/portfolio/10-touch-sales-play",
    pillars: ["Human Strategy", "Predictive Infrastructure"],
  },
  {
    title: "120-Day Content Journey",
    description:
      "How we engineered $4M in quarterly pipeline at Cylance. A 120-day content system that turned awareness into closed deals.",
    metric: "$4M",
    metricLabel: "Quarterly Pipeline",
    href: "/portfolio/120-day-content-journey",
    pillars: ["Human Strategy", "Scale Without Headcount"],
  },
  {
    title: "B2B Marketing Framework",
    description:
      "The messaging infrastructure for teams who can't afford to build on quicksand. A 7-layer framework that creates B2B SaaS positioning from scratch.",
    metric: "21",
    metricLabel: "Prompts",
    href: "/portfolio/b2b-marketing-framework",
    pillars: ["Human Strategy"],
  },
  {
    title: "It's Good to Be Pitched",
    description:
      "A 30-second TV spot storyboard exploring the luxury of choice. An interactive demo of AI-assisted creative production.",
    metric: "8",
    metricLabel: "Storyboard Frames",
    href: "/portfolio/its-good-to-be-pitched",
    pillars: ["Human Strategy"],
  },
  {
    title: "Behavioral Lead Scoring",
    description:
      "Making buyer behavior predictable. An interactive system that connects engagement, lifecycle, and sales readiness into a single scoring model.",
    metric: "75+",
    metricLabel: "SQL Threshold",
    href: "/portfolio/behavioral-lead-scoring",
    pillars: ["Predictive Infrastructure", "Scale Without Headcount"],
  },
  {
    title: "SaaS Revenue Calculator",
    description:
      "Work backwards from revenue to see exactly what it takes. Interactive annual planning tool using industry benchmarks to reverse-engineer your funnel metrics.",
    metric: "18",
    metricLabel: "Industries",
    href: "/portfolio/calculator",
    pillars: ["Predictive Infrastructure", "Scale Without Headcount"],
  },
];

export default function PortfolioGrid() {
  const [activePillar, setActivePillar] = useState("All");

  const filteredItems = portfolioItems.filter((item) => {
    if (activePillar === "All") return true;
    return item.pillars.includes(activePillar);
  });

  return (
    <section className="section bg-ash min-h-screen">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            The Playbook
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto mb-8">
            Interactive case studies that demonstrate strategy, systems, and
            results. Filter by pillar below.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrapjustify-center gap-3 mb-12">
            {PILLARS.map((pillar) => {
              const isActive = activePillar === pillar;
              let activeClass = "bg-charcoal text-white border-charcoal";

              if (isActive) {
                if (pillar === "Predictive Infrastructure") activeClass = "bg-electric text-white border-electric";
                else if (pillar === "Human Strategy") activeClass = "bg-copper text-white border-copper";
                else if (pillar === "Scale Without Headcount") activeClass = "bg-ember text-white border-ember";
              }

              return (
                <button
                  key={pillar}
                  onClick={() => setActivePillar(pillar)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${isActive
                    ? activeClass
                    : "bg-transparent text-slate border-slate/30 hover:border-charcoal hover:text-charcoal"
                    }`}
                >
                  {pillar}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, index) => (
              <PortfolioCard
                key={item.href}
                {...item}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
