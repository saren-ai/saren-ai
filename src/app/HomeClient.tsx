"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import PortfolioCard from "@/components/portfolio/PortfolioCard";
import MatrixRain from "@/components/home/MatrixRain";

const interactiveTools = [
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
    href: "/portfolio/gtm-budget-calculator",
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
];

const caseStudies = [
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

export default function HomeClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-card min-h-[85vh] flex items-center relative overflow-hidden py-20 pb-0">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white dark:bg-offblack" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231D3557' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <MatrixRain />

        <div className="container-narrow relative z-10 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lavender font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
            >
              AI Integration · Marketing Architecture · Demand Acceleration
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[3.5rem] font-bold text-charcoal dark:text-foreground leading-[1.1] mb-4"
            >
              Most startups bolt AI on.
              <br />
              <span className="text-gradient">I wire it in.</span>
            </motion.h1>

            {/* Body / value prop */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base md:text-lg text-slate dark:text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-8"
            >
              The gap between &ldquo;we use AI tools&rdquo; and &ldquo;AI is driving our pipeline&rdquo; is where most startups stall.
              I close it using Claude Code, Claude Design, and Claude Cowork inside your team&rsquo;s workspace —
              embedding AI natively across every marketing function, not just bolted onto one workflow.
              The result: a holistic AI-native marketing operation. Built for speed. Tuned for revenue.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/portfolio"
                className="btn-primary"
                aria-label="Explore my portfolio"
              >
                Explore my portfolio
                <svg
                  className="w-5 h-5 ml-2"
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
              <Link
                href="/contact"
                className="btn-secondary"
                aria-label="Let's get in touch"
              >
                Let&apos;s get in touch
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-charcoal/10 dark:border-white/10 pt-8"
            >
              {[
                { value: "550%", label: "YoY pipeline growth", company: "BlackBerry" },
                { value: "70%", label: "CAC reduction", company: "Qwiet AI" },
                { value: "8:1", label: "Paid media ROI", company: "Cylance" },
                { value: "$4M", label: "Quarterly pipeline", company: "Cylance" },
                { value: "344%", label: "Inbound lead growth", company: "WethosAI" },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-xl md:text-2xl font-bold font-mono text-charcoal dark:text-foreground">
                    {m.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-slate dark:text-foreground-muted mt-0.5">
                    {m.label}
                  </div>
                  <div className="text-[10px] font-mono text-slate/50 dark:text-foreground-muted/50 mt-0.5">
                    {m.company}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Interactive Tools ("Try something") */}
      <section className="pt-8 md:pt-12 bg-ash dark:bg-background pb-0">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-ember/10 text-ember text-sm font-bold rounded-full uppercase tracking-wide mb-4">
              Interactive Tryouts
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-4">
              Don&apos;t just read about it.{" "}
              <span className="text-gradient">Launch it.</span>
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl mx-auto">
              Interactive financial models and frameworks you can use right now
              to validate your growth strategy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
            {interactiveTools.map((item, index) => (
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
            className="mb-10 flex items-center gap-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground">
              Recent Case Studies
            </h2>
            <div className="h-px flex-1 bg-charcoal/10 dark:bg-white/10" />
            <Link
              href="/portfolio"
              className="text-lavender font-medium hover:text-ember transition-colors flex items-center gap-1 group"
            >
              View All Work
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {caseStudies.map((item, index) => (
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

      {/* CTA Section */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s build your growth engine.
            </h2>
            <p className="text-ash/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Let&apos;s talk about how AI-driven operations turn chaotic spend
              into predictable pipeline.
            </p>
            <Link href="/contact" className="btn-primary inline-flex text-lg">
              Start a conversation
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
