"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Building2,
  User,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const engagementTypes = [
  {
    icon: ClipboardCheck,
    title: "GTM Systems Audit",
    description:
      "Fixed-price, 2-week teardown of your funnel, stack, and spend. You get a scored gap map and a build sequence — run it yourself or hire me to run it.",
    fits: "Pre-seed/seed, incubator cohorts, teams deciding what to fix first",
    price: "$2,500",
    priceLabel: "Fixed price · 2 weeks",
    cta: "Get the audit",
    href: "/work",
  },
  {
    icon: Building2,
    title: "Fractional Marketing Lead",
    description:
      "Strategic marketing leadership 10–20 hours/week. System building, demand gen architecture, team development, and GTM execution.",
    fits: "Series A–C, $1M–$15M ARR",
    cta: "Explore this fit",
    href: "/fractional-marketing-lead",
  },
  {
    icon: User,
    title: "Project Engagement",
    description:
      "Scoped deliverables: pipeline framework, attribution system, AI ops build-out, or full GTM strategy for a specific launch.",
    fits: "Teams with clear initiatives",
    cta: "See project work",
    href: "/case-studies",
  },
  {
    icon: Lightbulb,
    title: "Advisory & Positioning",
    description:
      "Thought leadership architecture, personal brand strategy, or positioning for subject matter experts and founders.",
    fits: "SMEs, consultants, solopreneurs",
    cta: "Learn more",
    href: "/thinkers",
  },
];

export default function ServicesClient() {
  return (
    <article>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]"
          >
            How I work with teams
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-ash/80 leading-relaxed max-w-2xl"
          >
            Three engagement types, depending on where you are. All of them
            build the same thing: a demand system that compounds — signal,
            scoring, content, spend, and AI wired together — instead of
            another quarter of disconnected campaigns.
          </motion.p>
        </div>
      </section>

      {/* Engagement cards */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engagementTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col p-6 bg-ash dark:bg-background rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-ember/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ember" />
                  </div>
                  <h2 className="font-bold text-charcoal dark:text-foreground mb-2 text-lg">
                    {type.title}
                  </h2>
                  {type.price && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold font-mono text-ember">
                        {type.price}
                      </span>
                      <span className="text-xs text-slate dark:text-foreground-muted font-mono uppercase tracking-wide">
                        {type.priceLabel}
                      </span>
                    </div>
                  )}
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed mb-4 flex-1">
                    {type.description}
                  </p>
                  <div className="text-xs text-slate/70 dark:text-foreground-muted/70 font-mono uppercase tracking-wide mb-4">
                    Best for: {type.fits}
                  </div>
                  <Link
                    href={type.href}
                    className="text-ember text-sm font-semibold hover:underline inline-flex items-center gap-1 group"
                  >
                    {type.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-slate dark:text-foreground-muted text-sm">
              Want the deep dive?{" "}
              <Link href="/fractional-marketing-lead" className="text-ember font-semibold hover:underline">
                Fractional Marketing Lead
              </Link>
              {" · "}
              <Link href="/ai-orchestration" className="text-ember font-semibold hover:underline">
                AI Orchestration
              </Link>
              {" · "}
              <Link href="/signal-state" className="text-ember font-semibold hover:underline">
                Signal-State Marketing
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Not sure which fits? Let&apos;s figure it out together.
            </h2>
            <Link href="/work" className="btn-primary inline-flex items-center gap-2">
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
