"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PortfolioCard from "@/components/portfolio/PortfolioCard";

const interactiveItems = [
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
    title: "SaaS Revenue Calculator",
    description:
      "Reverse-engineer funnel metrics from revenue goals. Calculate exactly how many leads, MQLs, and demos you need to hit your target.",
    metric: "100%",
    metricLabel: "Funnel Clarity",
    href: "/portfolio/calculator",
    pillars: ["Predictive Infrastructure", "Revenue Engineering"],
  },
  {
    title: "Behavioral Lead Scoring",
    description:
      "Making buyer motion legible. A dynamic scoring model that tracks fit and engagement to surface high-intent accounts automatically.",
    metric: "3x",
    metricLabel: "Lead Quality",
    href: "/portfolio/behavioral-lead-scoring",
    pillars: ["Predictive Infrastructure", "Automated Qualification"],
  },
  {
    title: "AI Stack Tier List",
    description:
      "My personal tech stack for building growth engines. Drag and drop to rank the tools yourself or see my top picks for 2026.",
    metric: "25+",
    metricLabel: "AI Tools",
    href: "/about/stack",
    pillars: ["AI Operations", "Systems Thinking"],
  },
];

const caseStudyItems = [
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
];

export default function PortfolioPageContent() {
  return (
    <article>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-ash/60">
                <li>
                  <Link href="/" className="hover:text-ash transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ember">Portfolio</li>
              </ol>
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              The Work
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-ash/80 leading-relaxed"
            >
              Interactive case studies that demonstrate strategy, systems, and
              results. Each project showcases a different aspect of demand
              generation, analytics, and AI-native creative production.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="section bg-ash dark:bg-background pb-0">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center gap-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground">
              Interactive Tools
            </h2>
            <span className="px-3 py-1 bg-ember/10 text-ember text-sm font-bold rounded-full uppercase tracking-wide">
              Try it
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {interactiveItems.map((item, index) => (
              <PortfolioCard
                key={item.href}
                {...item}
                index={index}
                variant="interactive"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 mt-16 flex items-center gap-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground">
              Case Studies
            </h2>
            <span className="px-3 py-1 bg-electric/10 text-electric text-sm font-bold rounded-full uppercase tracking-wide">
              See the work
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {caseStudyItems.map((item, index) => (
              <PortfolioCard
                key={item.href}
                {...item}
                index={index}
                variant="case_study"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build your growth engine?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Let&apos;s build the systems, analytics, and content strategy that
            turn vision into velocity.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ember hover:bg-ember/90 text-white rounded-lg font-semibold transition-colors text-lg"
          >
            Let&apos;s talk
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </article>
  );
}
