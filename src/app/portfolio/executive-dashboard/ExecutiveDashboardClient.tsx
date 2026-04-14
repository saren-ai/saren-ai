"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/ui/Breadcrumb";

const STACK = [
  "Next.js",
  "Claude Code",
  "HubSpot API",
  "Apollo API",
  "LinkedIn Ads API",
  "GA4",
  "Pendo",
  "Vercel",
];

const HIGHLIGHTS = [
  {
    stat: "<2 days",
    label: "Build time",
    description:
      "From zero to a fully wired, multi-source executive dashboard using Claude Code and MCP servers.",
  },
  {
    stat: "5",
    label: "Data sources",
    description:
      "HubSpot CRM, Apollo outbound, LinkedIn Ads, Google Analytics 4, and Pendo — all live, all in one view.",
  },
  {
    stat: "100%",
    label: "Query transparency",
    description:
      "Every table exposes the exact API query powering it. No black box — users can see and modify what they're pulling.",
  },
  {
    stat: "0",
    label: "Vendor lock-in",
    description:
      "Lives outside any single platform's ecosystem. Reshapeable by the people using it, not just the person who built it.",
  },
];

export default function ExecutiveDashboardClient() {
  return (
    <article>
      {/* Hero */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <Breadcrumb
            back={{ href: "/portfolio", label: "Portfolio" }}
            current="Executive Dashboard"
            className="mb-6"
          />

          <div className="max-w-3xl mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-4"
            >
              <span className="px-3 py-1 bg-ember/20 text-ember text-xs font-bold rounded-full uppercase tracking-wide">
                AI-Built
              </span>
              <span className="px-3 py-1 bg-ash/10 text-ash/70 text-xs font-bold rounded-full uppercase tracking-wide">
                Marketing Ops
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              Demand Generation Command Center
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-ash/80 leading-relaxed mb-6"
            >
              AI-Built Executive Dashboard — HubSpot, Apollo, LinkedIn Ads, GA4,
              Pendo
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {STACK.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-ash/10 border border-ash/20 text-ash/70 text-xs rounded-full font-mono"
                >
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Dashboard screenshot — full view */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative rounded-xl overflow-hidden border border-ash/10 shadow-2xl"
          >
            <Image
              src="/portfolio/executive-dashboard/demand-dash_bigview.jpg"
              alt="Demand Generation Command Center — full executive dashboard view showing active pipeline, weighted forecast, deal velocity, and closed won/lost breakdowns"
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              Five tools. Five dashboards. Five versions of the truth.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="space-y-4 text-lg text-foreground-muted leading-relaxed"
            >
              <p>
                Every demand gen leader has the same problem: the data lives in
                five different tools, each with its own dashboard, its own
                limitations, and its own version of the truth.
              </p>
              <p>
                The C-suite doesn&apos;t want to log into HubSpot to check
                pipeline, then Apollo to review outbound, then LinkedIn to audit
                spend. They want one view.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3"
            >
              {[
                "HubSpot CRM",
                "Apollo.io",
                "LinkedIn Ads",
                "Google Analytics 4",
                "Pendo",
              ].map((tool) => (
                <div
                  key={tool}
                  className="bg-card-bg border border-border rounded-lg px-4 py-3 text-center text-sm font-medium text-foreground-muted"
                >
                  {tool}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-10 bg-gradient-to-r from-ember/10 to-copper/10 dark:from-background dark:to-background border-l-4 border-ember rounded-r-lg p-6"
            >
              <p className="text-lg font-semibold text-foreground">
                So I built one.
              </p>
              <p className="text-foreground-muted mt-2">
                Using Claude Code, I wired up the APIs and MCP servers from our
                entire demand gen stack into a single Next.js dashboard in under
                two days.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-ash dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card-bg border border-border rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-ember mb-1 font-mono">
                  {item.stat}
                </div>
                <div className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                  {item.label}
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What the dashboard surfaces */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              The metrics that actually matter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-lg text-foreground-muted leading-relaxed mb-8"
            >
              The executive summary surfaces what leadership needs — all live
              from the CRM, not a static export.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Pipeline & Forecast",
                  items: [
                    "Active pipeline value (live from CRM)",
                    "Weighted forecast with probability adjustments",
                    "Deal velocity and average deal size trends",
                    "Win rate over rolling periods",
                  ],
                },
                {
                  title: "Deal Health",
                  items: [
                    "Staleness indicators (zombie deals flagged)",
                    "Deal age by stage",
                    "Closed won / lost breakdowns",
                    "Top active deals with stage + rep",
                  ],
                },
                {
                  title: "Channel Performance",
                  items: [
                    "Outbound sequence metrics (Apollo)",
                    "Paid media performance (LinkedIn Ads)",
                    "UTM attribution and traffic sources (GA4)",
                    "Customer engagement signals (Pendo)",
                  ],
                },
                {
                  title: "Transparency Layer",
                  items: [
                    "Every table shows its API query",
                    "Filters exposed for user modification",
                    "No black-box transformations",
                    "Sort, filter, and reshape without an engineer",
                  ],
                },
              ].map((block, index) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card-bg border border-border rounded-xl p-6"
                >
                  <h3 className="text-base font-semibold text-foreground mb-3">
                    {block.title}
                  </h3>
                  <ul className="space-y-2">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground-muted"
                      >
                        <span className="text-ember mt-0.5 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparency screenshot */}
      <section className="section bg-ash dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Transparency over magic
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-lg text-foreground-muted leading-relaxed mb-8"
            >
              The key design choice: every table exposes the exact API query
              powering it. Users can see — and customize — what data they&apos;re
              pulling and how it&apos;s filtered. If the VP of Sales wants to
              re-sort by close date instead of deal value, they can see and
              modify the query directly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-xl overflow-hidden border border-border shadow-xl"
            >
              <Image
                src="/portfolio/executive-dashboard/demand-dash_query.jpg"
                alt="Dashboard query transparency — the HubSpot API query powering the active deals table is exposed inline, showing filters, fields, and sort order"
                width={1400}
                height={900}
                className="w-full h-auto"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-foreground-muted text-center mt-4"
            >
              The HubSpot API query powering the active deals table — visible and
              editable inline
            </motion.p>
          </div>
        </div>
      </section>

      {/* Design philosophy */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-8"
            >
              Why this works
            </motion.h2>

            <div className="space-y-4">
              {[
                {
                  title: "Lives outside any vendor's ecosystem",
                  body: "Most dashboards are features inside a platform. This one is neutral ground — it pulls from every system without being owned by any of them. Switching CRMs doesn't kill your visibility.",
                },
                {
                  title: "Updates in real time",
                  body: "No scheduled exports, no manual refreshes, no stale screenshots in the board deck. Every number reflects the current state of the CRM and ad platforms.",
                },
                {
                  title: "Reshapeable by the people using it",
                  body: "The audience for most dashboards is executives. The people who can modify them are engineers. This collapses that gap — the query is right there, readable and editable.",
                },
                {
                  title: "Built in under two days with Claude Code",
                  body: "Claude Code handled the API wiring, MCP server configuration, and component scaffolding. The time-to-insight wasn't bottlenecked by implementation — it was bottlenecked by deciding what mattered.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card-bg border border-border rounded-xl p-6"
                >
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            One view. Live data. No black box.
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Let&apos;s wire your demand gen stack into a single command center —
            built for your tools, your team, and the questions you actually need
            answered.
          </p>
          <Link href="/contact" className="btn-primary inline-flex text-lg">
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
