"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Mail,
  Clock,
  ArrowRight,
  Building2,
  User,
  Lightbulb,
} from "lucide-react";

const proofPoints = [
  { metric: "$4M", label: "Quarterly pipeline generated at Cylance", href: "/case-studies/120-day-content-journey" },
  { metric: "8:1", label: "ROI on $2.3M paid media at BlackBerry", href: "/about" },
  { metric: "42%", label: "Meeting rate on cold outbound sequences", href: "/case-studies/10-touch-sales-play" },
  { metric: "70%", label: "CAC reduction for Qwiet AI", href: "/about/clients" },
];

const engagementTypes = [
  {
    icon: Building2,
    title: "Fractional Marketing Lead",
    description:
      "Strategic marketing leadership 10–20 hours/week. System building, demand gen architecture, team development, and GTM execution.",
    fits: "Series A–C, $1M–$15M ARR",
    cta: "Explore this fit",
    href: "/smb",
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

export default function EngageClient() {
  return (
    <article>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <div className="flex items-center gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="shrink-0 hidden sm:block"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src="/profile/saren-profile_2026.png"
                  alt="Saren Sakurai"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

            <div className="min-w-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-ember font-mono text-sm uppercase tracking-wider mb-3"
              >
                Work With Me
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1]"
              >
                Let&apos;s build your
                <br />
                growth engine.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-ash/80 leading-relaxed max-w-xl mb-6"
              >
                I work with founders, fractional operators, and subject matter
                experts to build marketing infrastructure that compounds —
                pipeline systems, AI operations, and authority architecture.
              </motion.p>
              <motion.a
                href="https://calendly.com/sarenai"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="btn-primary inline-flex items-center gap-2 self-start"
              >
                <CalendarDays className="w-4 h-4" />
                Schedule 30 Minutes
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-sm text-slate dark:text-foreground-muted font-mono uppercase tracking-wider">
              Recent results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {proofPoints.map((point, index) => (
              <motion.div
                key={point.metric}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={point.href}
                  className="group block p-5 bg-card rounded-xl border border-border hover:border-ember/40 transition-all"
                >
                  <div className="text-3xl font-bold font-mono text-ember mb-1">
                    {point.metric}
                  </div>
                  <div className="text-xs text-slate dark:text-foreground-muted leading-snug group-hover:text-ember transition-colors">
                    {point.label}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Engage */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              How we can work together
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl">
              Three engagement types depending on where you are and what you
              need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {engagementTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col p-6 bg-ash dark:bg-background rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-ember/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ember" />
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">
                    {type.title}
                  </h3>
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
        </div>
      </section>

      {/* Book + Contact split */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Calendly card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-ember rounded-t-2xl" />
              <CalendarDays className="w-8 h-8 text-ember mb-4" />
              <h2 className="text-2xl font-bold text-charcoal dark:text-foreground mb-3">
                Schedule a call
              </h2>
              <p className="text-slate dark:text-foreground-muted mb-6 leading-relaxed">
                30 minutes to talk through your situation. I&apos;ll read what
                you share beforehand so we don&apos;t spend the call on
                background. We&apos;ll get straight to what&apos;s not working.
              </p>
              <a
                href="https://calendly.com/sarenai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                Open Calendly
              </a>
              <p className="text-xs text-slate/60 dark:text-foreground-muted/60 mt-3">
                Opens in a new tab · calendly.com/sarenai
              </p>
            </motion.div>

            {/* Email card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-lavender rounded-t-2xl" />
              <Mail className="w-8 h-8 text-lavender mb-4" />
              <h2 className="text-2xl font-bold text-charcoal dark:text-foreground mb-3">
                Send a message
              </h2>
              <p className="text-slate dark:text-foreground-muted mb-6 leading-relaxed">
                Not ready to schedule? Write directly. Tell me what&apos;s
                going on — what&apos;s working, what isn&apos;t, what
                you&apos;ve already tried. I read every message and write back.
              </p>
              <a
                href="mailto:hello@saren.ai?subject=Working%20Together"
                className="btn-lavender inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Saren
              </a>
              <p className="text-xs text-slate/60 dark:text-foreground-muted/60 mt-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Typical reply within 24–48 hours
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumb back to persona pages */}
      <section className="py-12 bg-white dark:bg-card border-t border-border">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <p className="text-slate dark:text-foreground-muted text-sm">
              Not sure which engagement fits? Start with your audience.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Founders & Mid-Market", href: "/smb" },
                { label: "Solopreneurs", href: "/solopreneurs" },
                { label: "Subject Matter Experts", href: "/thinkers" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-ember hover:underline inline-flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
