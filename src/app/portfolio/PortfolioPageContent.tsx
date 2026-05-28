"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, User, Lightbulb, ShoppingCart, Loader2 } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

type FilterTag = "All" | "SMB" | "Solopreneurs" | "Thinkers";

const filterTabs: FilterTag[] = ["All", "SMB", "Solopreneurs", "Thinkers"];

const filterIcons: Record<FilterTag, React.ComponentType<{ className?: string }>> = {
  All: ArrowRight,
  SMB: Building2,
  Solopreneurs: User,
  Thinkers: Lightbulb,
};

const accentClasses: Record<string, { badge: string; price: string; dot: string; border: string; bar: string }> = {
  ember: {
    badge: "bg-ember/10 text-ember",
    price: "text-ember",
    dot: "bg-ember",
    border: "hover:border-ember/40",
    bar: "bg-ember",
  },
  lavender: {
    badge: "bg-lavender/10 text-lavender",
    price: "text-lavender",
    dot: "bg-lavender",
    border: "hover:border-lavender/40",
    bar: "bg-lavender",
  },
  copper: {
    badge: "bg-copper/10 text-copper",
    price: "text-copper",
    dot: "bg-copper",
    border: "hover:border-copper/40",
    bar: "bg-copper",
  },
};

type FreeItem = {
  id: string;
  name: string;
  tagline: string;
  tag: "SMB" | "Solopreneurs" | "Thinkers";
  accentColor: "ember" | "lavender" | "copper";
  items: string[];
  href: string;
};

const FREE_ITEMS: FreeItem[] = [
  // --- SMB ---
  {
    id: "roi-simulator",
    name: "Paid Media ROI Simulator",
    tagline: "Simulate the revenue impact of your ad spend using real unit economics.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "Interactive financial model for performance marketers",
      "Input spend, CPL, and conversion rates for instant output",
      "Projects pipeline and revenue against industry benchmarks",
      "Built from real $4M pipeline programs",
    ],
    href: "/portfolio/roi-simulator",
  },
  {
    id: "saas-revenue-calculator",
    name: "SaaS Revenue Calculator",
    tagline: "Reverse-engineer funnel metrics from revenue goals.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "Set a revenue target and work backwards through the funnel",
      "Calculate required leads, MQLs, and demos",
      "Adjustable conversion rates at every stage",
      "Board-ready output for planning and forecasting",
    ],
    href: "/portfolio/gtm-budget-calculator",
  },
  {
    id: "behavioral-lead-scoring",
    name: "Hybrid Lead Scoring",
    tagline: "A dynamic scoring model that surfaces high-intent accounts automatically.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "Fit + engagement dual-axis scoring model",
      "Configurable signal weights and intent thresholds",
      "Sales handoff trigger logic at 75+ behavioral points",
      "Built to run on HubSpot or Salesforce",
    ],
    href: "/portfolio/hybrid-lead-scoring",
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
    href: "/portfolio/executive-dashboard",
  },
  {
    id: "sovereign-buyer-personas",
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
    href: "/portfolio/sovereign-personas",
  },
  {
    id: "120-day-content-journey",
    name: "120-Day Content Journey",
    tagline: "How we engineered $4M in quarterly pipeline at Cylance.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "$4M pipeline generated in a single quarter",
      "Full editorial calendar with demand gen integration",
      "Stage-specific content mapped from awareness to close",
      "Reusable across B2B SaaS verticals",
    ],
    href: "/portfolio/120-day-content-journey",
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
    href: "/portfolio/dynamic-nurture",
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
    href: "/portfolio/intent-data",
  },
  {
    id: "b2b-marketing-framework",
    name: "B2B Marketing Framework",
    tagline: "A 7-layer framework that builds B2B SaaS positioning from scratch.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "21 AI prompt sequences for positioning and messaging",
      "7-layer architecture from ICP definition to launch-ready narrative",
      "Works for early-stage teams with no marketing history",
      "Battle-tested across cybersecurity and AI verticals",
    ],
    href: "/portfolio/b2b-marketing-framework",
  },
  // --- Solopreneurs ---
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
    href: "/portfolio/10-touch-sales-play",
  },
  {
    id: "ai-stack-tier-list",
    name: "AI Stack Tier List",
    tagline: "My personal 2026 tech stack for building growth engines. Drag, rank, remix.",
    tag: "Solopreneurs",
    accentColor: "lavender",
    items: [
      "25+ AI tools across research, content, ops, and outreach",
      "My personal S-tier picks for solo operators",
      "Interactive drag-and-drop — build your own ranking",
      "Updated as the tool landscape shifts",
    ],
    href: "/about#stack",
  },
  // --- Thinkers ---
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
    href: "/portfolio/authority-engineering",
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
    href: "/portfolio/thought-leadership-development",
  },
  {
    id: "expertise-trend-library",
    name: "Expertise Trend Library",
    tagline: "Two decades of digital marketing research mapped across 63 core trends.",
    tag: "Thinkers",
    accentColor: "copper",
    items: [
      "63 trends × 192 source references across 24 years",
      "Interactive multi-view SVG visualizer",
      "Spans early SEO era through current AI landscape",
      "Useful for content strategy, positioning, and keynote research",
    ],
    href: "/about/expertise",
  },
  {
    id: "its-good-to-be-pitched",
    name: "It's Good to Be Pitched",
    tagline: "A 30-second TV spot storyboard — an interactive AI creative production demo.",
    tag: "Thinkers",
    accentColor: "copper",
    items: [
      "8 interactive storyboard frames",
      "Demonstrates AI-assisted creative production workflow end-to-end",
      "Luxury brand positioning reference for enterprise contexts",
      "Useful for AI creative directors and brand strategists",
    ],
    href: "/portfolio/its-good-to-be-pitched",
  },
];

export default function PortfolioPageContent() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const filteredPaid =
    activeFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.tag === activeFilter);
  const filteredFree =
    activeFilter === "All" ? FREE_ITEMS : FREE_ITEMS.filter((p) => p.tag === activeFilter);

  async function handleBuy(productId: string) {
    setLoadingId(productId);
    setErrorId(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch {
      setErrorId(productId);
      setLoadingId(null);
    }
  }

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
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
              Enterprise-grade frameworks.
              <br />
              <span className="text-gradient">Priced for operators.</span>
            </h1>
            <p className="text-lg text-ash/80 leading-relaxed">
              Every product and resource here was built from real enterprise work — the
              same systems that generated $4M pipelines, 42% meeting rates,
              and 550% growth. Available for any operator to run.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grids */}
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

          {/* Paid section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground">
              Premium Downloads
            </h2>
            <span className="px-3 py-1 bg-ember/10 text-ember text-sm font-bold rounded-full uppercase tracking-wide">
              Paid
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`paid-${activeFilter}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {filteredPaid.length === 0 ? (
                <p className="col-span-full text-sm text-slate dark:text-foreground-muted py-4">
                  No paid products in this segment yet — check back soon.
                </p>
              ) : (
                filteredPaid.map((product) => {
                  const accent = accentClasses[product.accentColor];
                  const isLoading = loadingId === product.id;
                  const hasError = errorId === product.id;
                  return (
                    <div
                      key={product.id}
                      className={`flex flex-col p-6 bg-card rounded-2xl border border-border ${accent.border} transition-all duration-200 relative overflow-hidden`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 ${accent.bar} rounded-t-2xl`} />
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <Link
                          href={product.persona}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${accent.badge} hover:opacity-80 transition-opacity`}
                        >
                          {product.tag}
                        </Link>
                        <div className="text-right">
                          <div className={`text-2xl font-bold font-mono ${accent.price}`}>
                            ${(product.priceCents / 100).toFixed(0)}
                          </div>
                          <div className="text-[10px] text-slate uppercase tracking-wide">
                            one-time
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-charcoal dark:text-foreground mb-2 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed mb-5">
                        {product.tagline}
                      </p>
                      <ul className="space-y-2 mb-6 flex-1">
                        {product.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-slate dark:text-foreground-muted">
                            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-1 shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {hasError && (
                        <p className="text-ember text-xs text-center mb-2">
                          Something went wrong — please try again.
                        </p>
                      )}
                      <button
                        onClick={() => handleBuy(product.id)}
                        disabled={isLoading || loadingId !== null}
                        className="btn-primary inline-flex items-center gap-2 justify-center text-sm py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Redirecting…
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Buy Now
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

          {/* Divider */}
          <div className="border-t border-border mb-12" />

          {/* Free section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground">
              Free Resources
            </h2>
            <span className="px-3 py-1 bg-lavender/10 text-lavender text-sm font-bold rounded-full uppercase tracking-wide">
              No paywall
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`free-${activeFilter}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFree.map((item) => {
                const accent = accentClasses[item.accentColor];
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col p-6 bg-card rounded-2xl border border-border ${accent.border} transition-all duration-200 relative overflow-hidden`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 ${accent.bar} rounded-t-2xl`} />
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${accent.badge}`}>
                        {item.tag}
                      </span>
                      <div className="text-right">
                        <div className={`text-2xl font-bold font-mono ${accent.price}`}>
                          Free
                        </div>
                        <div className="text-[10px] text-slate uppercase tracking-wide">
                          always free
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal dark:text-foreground mb-2 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed mb-5">
                      {item.tagline}
                    </p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {item.items.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-xs text-slate dark:text-foreground-muted">
                          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-1 shrink-0`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.href}
                      className="btn-secondary inline-flex items-center gap-2 justify-center text-sm py-3"
                    >
                      Explore
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
              Need something custom-built?
            </h2>
            <p className="text-ash/70 text-lg max-w-xl mx-auto mb-8">
              Downloads are the starting point. An engagement builds the version
              that runs on your stack, with your data, for your team.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Work With Me
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
