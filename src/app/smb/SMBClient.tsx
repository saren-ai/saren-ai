"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shuffle, TrendingDown, Building2, ArrowRight, Bell } from "lucide-react";

const painPoints = [
  {
    icon: Shuffle,
    title: "Marketing and sales are misaligned",
    description:
      "Campaigns launch but sales never follows up. Pipeline reports are contested. Everyone agrees there's a problem — nobody agrees on why.",
  },
  {
    icon: TrendingDown,
    title: "Spend is increasing, but returns aren't",
    description:
      "Budget approvals get easier. Attribution gets harder. You're investing more in channels that can't tell you what's actually working.",
  },
  {
    icon: Building2,
    title: "You have a team but not a system",
    description:
      "Individual contributors are skilled. But the org runs on tribal knowledge, manual handoffs, and spreadsheets no one fully owns.",
  },
];

const resources = [
  {
    type: "Playbook",
    title: "CMO GTM Playbook",
    description:
      "End-to-end go-to-market execution for B2B teams building their first real pipeline engine from scratch.",
    href: "/playbooks/cmo-gtm-playbook",
  },
  {
    type: "Playbook",
    title: "McKinsey Strategy Suite",
    description:
      "Enterprise-grade strategic frameworks adapted for mid-market decision-making velocity.",
    href: "/playbooks/mckinsey-strategy-suite",
  },
  {
    type: "Interactive Tool",
    title: "GTM Budget Calculator",
    description:
      "Reverse-engineer funnel metrics from revenue goals. Know exactly how many leads, MQLs, and demos you need to hit your number.",
    href: "/playbooks/gtm-budget-calculator",
  },
  {
    type: "Case Study",
    title: "Demand Gen Command Center",
    description:
      "An AI-built executive dashboard integrating 5 live data sources for real-time pipeline visibility.",
    href: "/case-studies/executive-dashboard",
  },
  {
    type: "Framework",
    title: "Signal-State: Org Alignment",
    description:
      "How AI-enabled intent targeting surfaces misalignment signals before they become lost revenue.",
    href: "/signal-state/use-cases/org-alignment",
  },
];

const typeStyles: Record<string, string> = {
  Playbook: "bg-lavender/10 text-lavender",
  "Interactive Tool": "bg-ember/10 text-ember",
  "Case Study": "bg-copper/10 text-copper",
  Framework: "bg-charcoal/10 text-charcoal dark:bg-white/10 dark:text-foreground-muted",
};

export default function SMBClient() {
  return (
    <article>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-ember/20 text-ember text-sm font-bold rounded-full uppercase tracking-wide mb-6">
              For Founders &amp; Mid-Market Teams
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.1]">
              You have budget.
              <br />
              <span className="text-gradient">
                You need a system it can run on.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-ash/80 max-w-2xl leading-relaxed mb-10">
              Most growth-stage companies aren&apos;t failing for lack of
              investment. They&apos;re failing because their marketing
              infrastructure can&apos;t compound the spend into repeatable
              pipeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/downloads"
                className="btn-primary inline-flex items-center gap-2"
              >
                Browse Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary-dark">
                Book an Advisory Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              Sound familiar?
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-xl mx-auto">
              These are the three patterns that show up in every mid-market
              engagement before we rebuild the system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-ember/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ember" />
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Hub */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              Built for your situation
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl">
              Playbooks, tools, and frameworks mapped to the exact challenges
              growth-stage founders and mid-market marketing teams face.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={resource.href}
                  className="group flex flex-col p-5 rounded-xl border border-border bg-ash dark:bg-background hover:border-ember/40 transition-all duration-200 h-full"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeStyles[resource.type]}`}
                    >
                      {resource.type}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate group-hover:text-ember group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-1.5 group-hover:text-ember transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Bridge */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 bg-card rounded-2xl border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-ember rounded-t-2xl" />

              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-ember/10 text-ember text-xs font-bold rounded-full uppercase tracking-wide mb-3">
                    Coming Soon
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal dark:text-foreground">
                    The Complete Mid-Market GTM Execution Kit
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-bold font-mono text-ember">
                    $499
                  </div>
                  <div className="text-xs text-slate uppercase tracking-wide">
                    one-time
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {[
                  "GTM strategy templates, ICP worksheets, and positioning frameworks",
                  "Demand gen architecture blueprints with attribution setup",
                  "Sales-marketing alignment operating model and SLA templates",
                  "AI prompt sequences for pipeline acceleration",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate dark:text-foreground-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ember mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 w-full justify-center"
              >
                <Bell className="w-4 h-4" />
                Notify Me When Available
              </Link>
            </div>
          </motion.div>
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
              Need this custom-built for your org?
            </h2>
            <p className="text-ash/70 text-lg max-w-xl mx-auto mb-8">
              Downloads get you 80% of the way. An advisory engagement gets you
              the rest — built for your stack, your team, and your pipeline
              goals.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Schedule an Enterprise Advisory Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
