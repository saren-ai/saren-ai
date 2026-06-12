"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hourglass, GitMerge, TrendingUp, ArrowRight, Bell } from "lucide-react";

const painPoints = [
  {
    icon: Hourglass,
    title: "You're the bottleneck in your own pipeline",
    description:
      "Everything routes through you. Outreach, nurture, follow-up, content. Nothing scales because nothing runs without your direct involvement.",
  },
  {
    icon: GitMerge,
    title: "You're selling with one hand and delivering with the other",
    description:
      "When client work is heavy, prospecting stops. When it's light, you're scrambling to refill the funnel. The cycle never breaks.",
  },
  {
    icon: TrendingUp,
    title: "You lose momentum between clients",
    description:
      "No consistent outreach means feast-or-famine revenue. Each new engagement feels like starting from zero instead of compounding from a system.",
  },
];

const resources = [
  {
    type: "Playbook",
    title: "CMO Content Marketing Pipeline",
    description:
      "A content engine that generates qualified pipeline at scale — without requiring daily creative output from you.",
    href: "/playbooks/cmo-content-marketing-pipeline",
  },
  {
    type: "Playbook",
    title: "Daily Executive GSD Stack",
    description:
      "An operating system for high-output solo executives. Structure your day to protect deep work and keep pipeline moving.",
    href: "/playbooks/daily-executive-gsd-stack",
  },
  {
    type: "Playbook",
    title: "LinkedIn Prospect Dashboard",
    description:
      "Signal-driven LinkedIn prospecting that finds the right conversations without spending hours scrolling.",
    href: "/playbooks/linkedin-prospect-dashboard",
  },
  {
    type: "Case Study",
    title: "10-Touch Sales Play",
    description:
      "A systematic multi-channel outbound sequence that books executive meetings with a 42% reply rate.",
    href: "/case-studies/10-touch-sales-play",
  },
  {
    type: "Case Study",
    title: "120-Day Content Journey",
    description:
      "How a structured content system generated $4M in quarterly pipeline — the exact architecture you can replicate.",
    href: "/case-studies/120-day-content-journey",
  },
  {
    type: "Framework",
    title: "Signal-State: Independent Creative",
    description:
      "AI-enabled intent targeting designed for solo operators who need precision over volume.",
    href: "/signal-state/use-cases/independent-creative",
  },
];

const typeStyles: Record<string, string> = {
  Playbook: "bg-lavender/10 text-lavender",
  "Case Study": "bg-copper/10 text-copper",
  Framework: "bg-charcoal/10 text-charcoal dark:bg-white/10 dark:text-foreground-muted",
};

export default function SolopreneursClient() {
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
            <span className="inline-block px-4 py-1.5 bg-lavender/20 text-lavender text-sm font-bold rounded-full uppercase tracking-wide mb-6">
              For Solo Founders &amp; Fractional CMOs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.1]">
              You&apos;re the entire marketing team.
              <br />
              <span className="text-gradient">Let&apos;s build like one.</span>
            </h1>
            <p className="text-lg md:text-xl text-ash/80 max-w-2xl leading-relaxed mb-10">
              The best operators don&apos;t work more hours. They build
              systems that work when they don&apos;t. Here&apos;s the
              infrastructure for running a solo practice like a scalable
              operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/playbooks"
                className="btn-primary inline-flex items-center gap-2"
              >
                Browse Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary-dark">
                Book a Strategy Call
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
              These three patterns show up in almost every solo operator
              engagement before I build the systems layer.
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
                  <div className="w-10 h-10 rounded-lg bg-lavender/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-lavender" />
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
              Playbooks, case studies, and frameworks designed for operators who
              need execution speed, pipeline automation, and self-managed
              workflows.
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
                  className="group flex flex-col p-5 rounded-xl border border-border bg-ash dark:bg-background hover:border-lavender/40 transition-all duration-200 h-full"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeStyles[resource.type]}`}
                    >
                      {resource.type}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate group-hover:text-lavender group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-1.5 group-hover:text-lavender transition-colors">
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
              <div className="absolute top-0 left-0 right-0 h-1 bg-lavender rounded-t-2xl" />

              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-lavender/10 text-lavender text-xs font-bold rounded-full uppercase tracking-wide mb-3">
                    Coming Soon
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal dark:text-foreground">
                    The Fractional Marketing Lead Pipeline Dashboard
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-bold font-mono text-lavender">
                    $99
                  </div>
                  <div className="text-xs text-slate uppercase tracking-wide">
                    one-time
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {[
                  "Weekly pipeline tracking template with automated status logic",
                  "Outreach cadence framework for consistent solo prospecting",
                  "Client onboarding and offboarding operating checklist",
                  "AI prompts for proposal writing and status reporting",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate dark:text-foreground-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lavender mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="btn-lavender inline-flex items-center gap-2 w-full justify-center"
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
              Want this custom-built for your practice?
            </h2>
            <p className="text-ash/70 text-lg max-w-xl mx-auto mb-8">
              Templates accelerate. Custom engagements transform. Let&apos;s
              talk about building a pipeline system that runs on your
              workflows, not someone else&apos;s.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Book a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/fractional-marketing-lead/cost"
                className="btn-secondary-dark inline-flex items-center gap-2"
              >
                See engagement pricing
              </Link>
            </div>
            <p className="text-ash/60 text-sm mt-6">
              New to the model?{" "}
              <Link
                href="/fractional-marketing-lead"
                className="text-ash underline underline-offset-4 hover:text-ash/70 transition-colors"
              >
                How a fractional marketing lead engagement works
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
