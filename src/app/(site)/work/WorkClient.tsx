"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import GoogleCalendarInlineWidget from "@/components/ui/GoogleCalendarInlineWidget";

const proofPoints = [
  { metric: "$4M", label: "Quarterly pipeline generated at Cylance", href: "/case-studies/120-day-content-journey" },
  { metric: "8:1", label: "ROI on $2.3M paid media at BlackBerry", href: "/about" },
  { metric: "42%", label: "Meeting rate on cold outbound sequences", href: "/case-studies/10-touch-sales-play" },
  { metric: "70%", label: "CAC reduction for Qwiet AI", href: "/about/clients" },
];

export default function WorkClient() {
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
                Book a call.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-ash/80 leading-relaxed max-w-xl mb-6"
              >
                I&apos;ll read what you share beforehand so we don&apos;t
                spend the call on background. We&apos;ll get straight to
                what&apos;s not working.
              </motion.p>
              <motion.a
                href="#book"
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

      {/* Link to Services */}
      <section className="section bg-white dark:bg-card py-10">
        <div className="container-narrow text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate dark:text-foreground-muted text-base"
          >
            Not sure which engagement fits?{" "}
            <Link href="/services" className="text-ember font-semibold hover:underline inline-flex items-center gap-1 group">
              See how I work with teams
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Book inline */}
      <section id="book" className="section bg-ash dark:bg-background scroll-mt-24">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-card rounded-2xl border border-border relative overflow-hidden mb-8"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-ember rounded-t-2xl" />
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="w-6 h-6 text-ember" />
              <h2 className="text-2xl font-bold text-charcoal dark:text-foreground">
                Schedule a call
              </h2>
            </div>
            <GoogleCalendarInlineWidget />
          </motion.div>

          {/* Email fallback */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-card rounded-2xl border border-border"
          >
            <div>
              <p className="text-charcoal dark:text-foreground font-semibold mb-1">
                Not ready to schedule? Send a message.
              </p>
              <p className="text-sm text-slate dark:text-foreground-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Typical reply within 24–48 hours
              </p>
            </div>
            <a
              href="mailto:hello@saren.ai?subject=Working%20Together"
              className="btn-lavender inline-flex items-center gap-2 shrink-0"
            >
              <Mail className="w-4 h-4" />
              Email Saren
            </a>
          </motion.div>
        </div>
      </section>

    </article>
  );
}
