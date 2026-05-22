"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import PortfolioCard from "@/components/portfolio/PortfolioCard";
import MatrixRain from "@/components/home/MatrixRain";
import FAQ from "@/components/ui/FAQ";

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
              AI Operations · Marketing Systems · Lean Scaling
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-charcoal dark:text-foreground leading-[1.1] mb-8"
            >
              AI operations for <span className="text-gradient">lean teams</span>
            </motion.h1>

            {/* Body / value prop */}
            <div className="space-y-6 text-base md:text-lg text-slate dark:text-foreground-muted max-w-3xl mx-auto leading-relaxed mb-10 text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-semibold text-charcoal dark:text-foreground text-lg md:text-xl"
              >
                AI shouldn&apos;t just be a tool your team uses. It should be the infrastructure your business runs on.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Early-stage companies stall in the gap between buying ChatGPT and running an AI-powered marketing operation. We bridge it by building multi-agent systems directly into your existing workflows.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                The result: less manual grind, fewer chaotic spreadsheets, and clean, automated leverage.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/portfolio"
                className="btn-primary"
                aria-label="Explore the systems"
              >
                Explore the systems
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
                aria-label="Let's map your workflow"
              >
                Let&apos;s map your workflow
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

            {/* Reframe client logos and wins */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 border-t border-charcoal/10 dark:border-white/10 pt-10"
            >
              <h3 className="text-lg md:text-xl font-bold text-charcoal dark:text-foreground mb-2">
                Enterprise-grade architecture, scaled for early-stage teams.
              </h3>
              <p className="text-sm text-slate dark:text-foreground-muted mb-8">
                Experience engineering systems and reducing operational friction for:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { name: "BlackBerry", logo: "blackberry.png", metric: "550% Pipeline Growth", href: "/portfolio/120-day-content-journey" },
                  { name: "Qwiet AI", logo: "qwiet.png", metric: "70% CAC Reduction", href: "/about/clients" },
                  { name: "Cylance", logo: "cylance.png", metric: "$4M Quarterly Pipeline", href: "/portfolio/120-day-content-journey" },
                  { name: "WethosAI", logo: "wethos.png", metric: "344% Lead Growth", href: "/about/clients" },
                ].map((client) => (
                  <Link
                    key={client.name}
                    href={client.href}
                    className="flex flex-col items-center justify-between p-6 rounded-xl bg-offblack border border-charcoal/10 dark:border-white/10 hover:border-ember/40 dark:hover:border-lavender/40 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="h-12 w-full flex items-center justify-center mb-4 relative">
                      <Image
                        src={`/logos/clients/${client.logo}`}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain opacity-75 dark:opacity-60 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-300"
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    </div>
                    <div className="text-center mt-2 border-t border-white/10 pt-4 w-full">
                      <div className="text-lg md:text-xl font-bold font-mono text-ember">
                        {client.metric.split(" ")[0]}
                      </div>
                      <div className="text-[10px] md:text-[11px] uppercase tracking-widest text-ash/60 font-semibold mt-1 leading-tight">
                        {client.metric.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate dark:text-foreground-muted text-sm font-mono">
              💡 Looking for B2B frameworks and AI prompts you can run today?{" "}
              <Link
                href="/playbooks"
                className="text-ember dark:text-lavender font-bold hover:underline transition-all"
              >
                Browse the Playbooks &rarr;
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="GTM & Operations FAQ"
        description="Direct answers to hard questions about marketing architecture and fractional execution."
        items={[
          {
            question: "Why hire a Fractional CMO instead of a full-time marketing executive?",
            answer: "A Fractional CMO gives you senior GTM leadership to build your strategy and operations without the bloated executive salary, equity package, and overhead of a full-timer who just wants to manage agencies. You get active system-building, positioning clarity, and operational pipeline setup for early-stage and Series A startups, rather than a slide-deck generator."
          },
          {
            question: "What does \"demand generation as engineering\" actually mean?",
            answer: "It means we treat your pipeline like a software system—defined by data inputs, logic gates, and feedback loops—instead of a series of hope-based branding campaigns. We build intent detection, lead scoring, and automated GTM tracking to capture active buyers, rather than throwing budget at Google Ads and hoping for a miracle."
          },
          {
            question: "What size startups benefit most from Saren's consulting?",
            answer: "Startups that have product-market fit (usually $1M–$10M ARR) but find their growth is stalling because their messaging is muddy and their sales cycles are stretching. If you're spending $50k+/month on ads or sales development and can't trace where your best deals are coming from, we need to talk."
          }
        ]}
      />

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
