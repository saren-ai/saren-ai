"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CalendlyInlineWidget from "@/components/ui/CalendlyInlineWidget";

const proof = [
  { name: "BlackBerry", logo: "white/blackberry.svg", metric: "8:1", label: "ROI on Paid Media", href: "/about" },
  { name: "Qwiet AI", logo: "white/qwietai.svg", metric: "70%", label: "CAC Reduction", href: "/about/clients" },
  { name: "Cylance", logo: "white/cylance.svg", metric: "$4M", label: "Quarterly Pipeline", href: "/case-studies/120-day-content-journey" },
  { name: "Wethos AI", logo: "white/wethosai.png", metric: "344%", label: "Lead Growth", href: "/about/clients" },
];

const offers = [
  {
    title: "GTM Systems Audit",
    tag: "Fixed price · 2 weeks",
    description:
      "A teardown of your funnel, stack, and spend. You get a scored gap map and a build sequence — run it yourself or hire me to run it. Built for seed-stage and incubator cohorts.",
    price: "$2,500",
  },
  {
    title: "Fractional Marketing Lead",
    tag: "10–20 hrs/week",
    description:
      "Ongoing system building and GTM execution for teams past $1M ARR that need senior leadership without the full-time hire.",
  },
];

export default function OcClient() {
  return (
    <article>
      {/* Hero */}
      <section className="section pb-10">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-ember font-mono text-sm uppercase tracking-wider mb-3"
          >
            Orange County, CA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold text-charcoal dark:text-foreground mb-6 leading-[1.1]"
          >
            Good meeting you.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate dark:text-foreground-muted leading-relaxed max-w-2xl"
          >
            I&apos;m Saren — a GTM Engineer based here in OC. I build the
            demand system that turns marketing spend into repeatable
            pipeline: signal, scoring, content, and AI wired into one engine.
            20+ years, AKQA to Cylance ($1.4B exit), now working with OC
            startups and revenue teams in person.
          </motion.p>
        </div>
      </section>

      {/* Proof bar */}
      <section className="section bg-white dark:bg-card py-10">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {proof.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={client.href}
                  className="flex flex-col items-center justify-between p-5 rounded-xl bg-offblack border border-charcoal/10 hover:border-ember/40 transition-all duration-300 group h-full"
                >
                  <div className="h-10 w-full flex items-center justify-center mb-3 relative">
                    <Image
                      src={`/logos/clients/${client.logo}`}
                      alt={`${client.name} logo`}
                      fill
                      className="object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 768px) 100px, 120px"
                    />
                  </div>
                  <div className="text-center border-t border-white/10 pt-3 w-full">
                    <div className="text-lg font-bold font-mono text-ember">{client.metric}</div>
                    <div className="text-[10px] uppercase tracking-widest text-ash/60 font-semibold mt-1 leading-tight">{client.label}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer block */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground mb-8"
          >
            Where most OC conversations start
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-charcoal dark:text-foreground">{offer.title}</h3>
                  {offer.price && (
                    <span className="text-lg font-bold font-mono text-ember">{offer.price}</span>
                  )}
                </div>
                <div className="text-xs text-slate/70 dark:text-foreground-muted/70 font-mono uppercase tracking-wide mb-3">
                  {offer.tag}
                </div>
                <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed">
                  {offer.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate dark:text-foreground-muted text-sm"
          >
            Incubators &amp; accelerators: I also run GTM workshops and office
            hours for cohorts — ask.
          </motion.p>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="section bg-white dark:bg-card scroll-mt-24">
        <div className="container-narrow">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground mb-3"
          >
            30 minutes, no pitch deck
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate dark:text-foreground-muted leading-relaxed max-w-2xl mb-8"
          >
            Tell me what&apos;s working and what isn&apos;t. I read whatever
            you send beforehand, so we skip background and get straight to
            the system.
          </motion.p>

          <div className="p-4 md:p-6 bg-ash dark:bg-background rounded-2xl border border-border">
            <CalendlyInlineWidget />
          </div>

          <p className="text-sm text-slate dark:text-foreground-muted mt-6">
            Prefer email?{" "}
            <a href="mailto:saren#saren.ai" className="text-ember font-semibold hover:underline">
              saren#saren.ai
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
