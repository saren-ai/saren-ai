"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

const outcomes = [
  { value: "$4M", label: "Quarterly pipeline generated" },
  { value: "6", label: "Consecutive quarters of double-digit growth" },
  { value: "3 days", label: "Page dev time, down from three weeks" },
  { value: "1 month", label: "To rebuild the entire demand gen operating model" },
];

export default function CylanceClient() {
  return (
    <article>
      {/* Hero */}
      <section className="hero-card section gradient-dark text-ash overflow-hidden">
        <div className="container-narrow relative z-10">
          <Breadcrumb
            trail={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { label: "Cylance" },
            ]}
            className="mb-8"
          />

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-mono text-ash/60 uppercase tracking-wider mb-3"
            >
              2017 – 2023 · Irvine, CA
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Cylance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-ash/80 font-light leading-relaxed mb-8"
            >
              Director, Demand Generation → Sr. Director, Digital Marketing
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-baseline gap-3"
            >
              <span className="text-5xl font-bold text-ember">$4M</span>
              <span className="text-ash/70 text-lg">in quarterly pipeline</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outcomes bar */}
      <section className="bg-charcoal text-ash py-10">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-ember font-mono mb-1">{o.value}</div>
                <div className="text-xs text-ash/60 leading-snug">{o.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto space-y-16">

            {/* The brief */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-mono text-slate uppercase tracking-wider mb-6">The brief</p>
              <div className="prose prose-lg text-slate leading-relaxed space-y-5">
                <p>
                  When I joined Cylance it was a late-stage startup of about 800 employees, and
                  my first assignment was to upgrade the website. That became a nine-month,{" "}
                  <span className="font-semibold text-charcoal">$1M+ rebuild on Adobe Experience Manager</span> — where I
                  designed a custom modular system that cut page development from three weeks to three days.
                </p>
                <p>
                  But the real point of the site wasn&apos;t the redesign. It was the transition away from
                  random acts of marketing.
                </p>
                <p>
                  The new site was the destination for a{" "}
                  <Link href="/case-studies/120-day-content-journey" className="font-semibold text-lavender underline underline-offset-2 hover:text-ember transition-colors">
                    120-day content funnel
                  </Link>
                  : custom content and advertising moving buyers through digital channels into the website,
                  with every asset planned against{" "}
                  <Link href="/case-studies/intent-data" className="font-semibold text-lavender underline underline-offset-2 hover:text-ember transition-colors">
                    Bombora intent data
                  </Link>{" "}
                  — including signals as far as 18 months out from closed/won deals. For the first time,
                  we weren&apos;t just publishing. We were engineering the path.
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-charcoal/10" />

            {/* The system problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-mono text-slate uppercase tracking-wider mb-6">The system problem</p>
              <div className="prose prose-lg text-slate leading-relaxed space-y-5">
                <p>
                  From there my role grew to own marketing automation, digital, advertising, and lifecycle
                  marketing across a Salesforce and Marketo stack. The problem underneath all of it was that
                  demand gen had no shared definition of a lead and no scoring.
                </p>
                <p>
                  Marketing was pushing{" "}
                  <span className="font-semibold text-charcoal">5,000 raw leads a quarter</span> to sales.
                  Reps chased the loud ones. High-intent accounts went cold because nothing flagged when
                  they were ready. The pipeline was large but entirely luck-shaped.
                </p>
              </div>
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-l-4 border-ember pl-6 py-2"
            >
              <p className="text-2xl font-semibold text-charcoal leading-snug">
                The pipeline was large but entirely luck-shaped.
              </p>
            </motion.blockquote>

            {/* Divider */}
            <div className="h-px bg-charcoal/10" />

            {/* The fix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-mono text-slate uppercase tracking-wider mb-6">The fix</p>
              <div className="prose prose-lg text-slate leading-relaxed space-y-5">
                <p>
                  When a new CMO came in wanting to install the{" "}
                  <span className="font-semibold text-charcoal">SiriusDecisions Demand Generation framework</span>{" "}
                  (now Forrester), I owned the conversion. I attended the four-day certification and rebuilt
                  the entire department&apos;s operating model around the demand waterfall in a single month —
                  re-architecting how all 5,000 quarterly leads were defined, scored, routed, and measured.
                </p>
                <p>
                  The{" "}
                  <Link href="/playbooks/hybrid-lead-scoring" className="font-semibold text-lavender underline underline-offset-2 hover:text-ember transition-colors">
                    lead scoring
                  </Link>{" "}
                  and{" "}
                  <Link href="/case-studies/dynamic-nurture" className="font-semibold text-lavender underline underline-offset-2 hover:text-ember transition-colors">
                    lifecycle nurture
                  </Link>{" "}
                  were built in Marketo. Routing was handled in Salesforce. The architecture was mine
                  personally — the AEM build, the content funnel, the intent model, and the SiriusDecisions
                  rollout. I ran a team of eight.
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-charcoal/10" />

            {/* The result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-mono text-slate uppercase tracking-wider mb-6">The result</p>
              <div className="prose prose-lg text-slate leading-relaxed space-y-5">
                <p>
                  Six straight quarters of double-digit pipeline growth — reaching $4M in quarterly pipeline — sustained
                  right up to the BlackBerry acquisition. After the acquisition I moved into the
                  Sr. Director, Digital Marketing role, leading digital marketing through integration and
                  maintaining the growth momentum as the combined organization came together.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="section bg-charcoal/5 border-t border-charcoal/10">
        <div className="container-narrow">
          <div className="flex items-center justify-between">
            <Link
              href="/about"
              className="flex items-center gap-2 text-sm text-slate hover:text-charcoal font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to About
            </Link>

            <div className="text-sm text-slate/60 font-mono">Cylance · 2017–2023</div>
          </div>
        </div>
      </section>
    </article>
  );
}
