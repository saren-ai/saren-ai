"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, User, Lightbulb } from "lucide-react";

type FilterTag = "All" | "SMB" | "Solopreneurs" | "Thinkers";

const filterTabs: FilterTag[] = ["All", "SMB", "Solopreneurs", "Thinkers"];

const filterIcons: Record<FilterTag, React.ComponentType<{ className?: string }>> = {
  All: ArrowRight,
  SMB: Building2,
  Solopreneurs: User,
  Thinkers: Lightbulb,
};

const accentClasses = {
  ember: {
    badge: "bg-ember/10 text-ember",
    dot: "bg-ember",
    border: "hover:border-ember/40",
    bar: "bg-ember",
  },
  lavender: {
    badge: "bg-lavender/10 text-lavender",
    dot: "bg-lavender",
    border: "hover:border-lavender/40",
    bar: "bg-lavender",
  },
  copper: {
    badge: "bg-copper/10 text-copper",
    dot: "bg-copper",
    border: "hover:border-copper/40",
    bar: "bg-copper",
  },
};

type CaseStudyItem = {
  id: string;
  name: string;
  tagline: string;
  tag: "SMB" | "Solopreneurs" | "Thinkers";
  accentColor: "ember" | "lavender" | "copper";
  items: string[];
  href: string;
};

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "120-day-content-journey",
    name: "120-Day Content Journey",
    tagline: "How I engineered $4M in quarterly pipeline at Cylance.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "$4M pipeline generated in a single quarter",
      "Full editorial calendar with demand gen integration",
      "Stage-specific content mapped from awareness to close",
      "Reusable across B2B SaaS verticals",
    ],
    href: "/case-studies/120-day-content-journey",
  },
  {
    id: "dynamic-nurture",
    name: "Dynamic Email Nurture",
    tagline: "A score-gated system that personalizes email by segment and funnel stage.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "9 content variants covering full audience × funnel matrix",
      "Continuous re-scoring after every touchpoint",
      "Sales handoff triggers at 75 behavioral points",
      "Segment-aware subject line and CTA logic",
    ],
    href: "/case-studies/dynamic-nurture",
  },
  {
    id: "intent-data",
    name: "Intent Data as Funnel Intelligence",
    tagline: "Bombora signals mapped to buyer behavior 18 months pre-close.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "Analyzed 100+ close/won accounts for pre-purchase signal patterns",
      "Just-in-time content model triggered by intent spikes",
      "18-month signal horizon for account-based targeting",
      "Measurably improved mid-funnel conversion",
    ],
    href: "/case-studies/intent-data",
  },
  {
    id: "executive-dashboard",
    name: "Demand Gen Command Center",
    tagline: "HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo wired into one live view.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "Real-time pipeline visibility across all active channels",
      "AI-generated executive summaries and anomaly flags",
      "Built with Claude Code in under two days",
      "Full API query transparency — no black boxes",
    ],
    href: "/case-studies/executive-dashboard",
  },
  {
    id: "sovereign-personas",
    name: "Sovereign Buyer Personas",
    tagline: "A framework for building personas that drive targeting, messaging, and content.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "3x conversion lift when applied to paid and content",
      "Failure-aware architecture — not just job titles and firmographics",
      "ICP segmentation by trigger event, not company size",
      "Includes alignment template for sales and marketing",
    ],
    href: "/case-studies/sovereign-personas",
  },
  {
    id: "10-touch-sales-play",
    name: "10-Touch Sales Play",
    tagline: "Turning cold outreach into executive conversations at a 42% meeting rate.",
    tag: "Solopreneurs",
    accentColor: "lavender",
    items: [
      "42% meeting rate across cold outreach programs",
      "Multi-channel cadence: email, LinkedIn, phone, and video",
      "Sequence templates for all 10 touches",
      "Personalization framework that scales without deep research",
    ],
    href: "/case-studies/10-touch-sales-play",
  },
  {
    id: "authority-engineering",
    name: "Authority Engineering Process",
    tagline: "The system for building compounding authority as a knowledge practitioner.",
    tag: "Thinkers",
    accentColor: "copper",
    items: [
      "Converts deep expertise into inbound gravity over time",
      "Content architecture that ranks and compounds — not resets",
      "Positioning framework for subject matter experts entering market",
      "Battle-tested in cybersecurity and AI verticals",
    ],
    href: "/case-studies/authority-engineering",
  },
  {
    id: "thought-leadership-development",
    name: "Thought Leadership Development",
    tagline: "How to build a reputation that does your pipeline work for you.",
    tag: "Thinkers",
    accentColor: "copper",
    items: [
      "Executive POV framework for consistent, credible positioning",
      "Publishing cadence and format strategy for knowledge workers",
      "Ghostwriting architecture for busy executives",
      "Used to build visibility for CISOs and CMOs",
    ],
    href: "/case-studies/thought-leadership-development",
  },
];

export default function CaseStudiesPageContent() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All");

  const filtered =
    activeFilter === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.tag === activeFilter);

  return (
    <article>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-ember/20 text-ember text-sm font-bold rounded-full uppercase tracking-wide mb-6">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
              Proof over promises.
              <br />
              <span className="text-gradient">Systems that shipped.</span>
            </h1>
            <p className="text-lg text-ash/80 leading-relaxed">
              Enterprise B2B programs built from real engagements — the pipeline
              systems, demand gen architectures, and outbound plays behind $4M
              pipelines, 42% meeting rates, and an 8:1 ROI on paid media.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {filterTabs.map((tab) => {
              const Icon = filterIcons[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    activeFilter === tab
                      ? "bg-ember text-white"
                      : "bg-card border border-border text-foreground hover:border-ember/40 hover:text-ember"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((cs) => {
                const accent = accentClasses[cs.accentColor];
                return (
                  <div
                    key={cs.id}
                    className={`flex flex-col p-6 bg-card rounded-2xl border border-border ${accent.border} transition-all duration-200 relative overflow-hidden`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 ${accent.bar} rounded-t-2xl`} />
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${accent.badge}`}>
                        {cs.tag}
                      </span>
                      <span className="text-[10px] text-slate uppercase tracking-wide pt-1">
                        B2B Case Study
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-charcoal dark:text-foreground mb-2 leading-snug">
                      {cs.name}
                    </h2>
                    <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed mb-5">
                      {cs.tagline}
                    </p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {cs.items.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-xs text-slate dark:text-foreground-muted">
                          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-1 shrink-0`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={cs.href}
                      className="btn-secondary inline-flex items-center gap-2 justify-center text-sm py-3"
                    >
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want tools you can run yourself?
            </h2>
            <p className="text-ash/70 text-lg max-w-xl mx-auto mb-8">
              Calculators, scoring models, and prompt playbooks are in the
              Playbook Library — free and paid, organized by use case.
            </p>
            <Link href="/playbooks" className="btn-primary inline-flex items-center gap-2">
              Browse the Library
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
