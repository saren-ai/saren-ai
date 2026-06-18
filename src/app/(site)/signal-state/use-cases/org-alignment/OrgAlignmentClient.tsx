'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SignalStateSubnav from '@/components/signal-state/SignalStateSubnav'

export default function OrgAlignmentClient() {
  return (
    <>
      {/* Hero */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <Link
              href="/signal-state/use-cases"
              className="text-xs text-foreground-muted hover:text-[var(--ss-coral-text)] transition-colors"
            >
              ← Use Cases
            </Link>
            <span className="text-xs text-foreground-muted">·</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-coral-text)]">
              Use Case 02
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-3"
          >
            Organizational Misalignment / Culture Dysfunction
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[var(--ss-coral-text)] text-xl font-medium"
          >
            Reading the signals leadership can&apos;t see from inside.
          </motion.p>
        </div>
      </section>

      <SignalStateSubnav />

      <section className="section">
        <div className="container-narrow space-y-8">

          {/* Signal Moment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate mb-3">
              The Signal Moment
            </p>
            <div
              className="rounded-xl border border-white/[0.08] p-6 font-mono text-sm leading-relaxed bg-offblack text-ash"
            >
              <p className="text-slate text-xs mb-3">{"// The Target: 1,200-person SaaS company · Third rebrand in 4 years · Glassdoor 3.8 → 2.9 over 18 months · CEO approval 44% · VP Product just departed after 11 months"}</p>
              <p className="text-slate text-xs mb-3">{"// LinkedIn post from departing VP of Product:"}</p>
              <p className="mb-4">
                <span className="text-[var(--ss-coral-text)]">&ldquo;Leaving [Company] after an incredible year of learning. Sometimes the vision and the execution culture aren&apos;t quite aligned yet — and that&apos;s okay. Excited for what&apos;s next.&rdquo;</span>
              </p>
              <p className="text-slate text-xs">{"// 43 comments. 12 from current employees using the same careful language. 3 from ex-employees who are less careful."}</p>
            </div>
          </motion.div>

          {/* What the Agent Detects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate mb-3">
              What the Agent Detects
            </p>
            <ul className="space-y-2">
              {[
                'High-profile expressed signal (VP-level public departure statement)',
                'Community validation (43 comments — signal amplified)',
                'Pattern confirmation (Glassdoor trend, prior VP departures, rebrand history)',
                'Subtext decoding: "vision and execution culture aren\'t aligned" = the pain named in diplomatic language',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
                  <span className="text-[var(--ss-coral-text)] mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Empathic Read */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate mb-3">
              Empathic Read
            </p>
            <div
              className="rounded-xl border p-6 font-mono text-sm leading-relaxed"
              style={{ background: 'var(--ss-purple-bg)', borderColor: 'var(--ss-purple-border)', color: 'var(--ss-purple-text)' }}
            >
              <div className="space-y-2">
                <p><span className="opacity-60">WHO:</span>     Series C SaaS, 1,200 employees, likely new or interim CPO incoming</p>
                <p><span className="opacity-60">STATE:</span>   Leadership acknowledging misalignment publicly but diplomatically</p>
                <p><span className="opacity-60">MOMENT:</span>  Post is 31 hours old. Comment thread still active. Window: HIGH.</p>
                <p><span className="opacity-60">LANGUAGE:</span> &ldquo;vision and execution culture aren&apos;t aligned&rdquo; — use this frame exactly</p>
                <p><span className="opacity-60">AUDIENCE:</span> Likely receptive: incoming CPO, CEO, Chief of Staff, or Head of People</p>
              </div>
            </div>
          </motion.div>

          {/* Resonant Outreach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate mb-3">
              Resonant Outreach
            </p>
            <div
              className="rounded-xl border p-6 text-sm leading-relaxed relative"
              style={{ background: 'var(--ss-coral-bg)', borderColor: 'var(--ss-coral-border)' }}
            >
              <div className="absolute top-4 left-4 text-4xl text-[var(--ss-coral-border)] font-serif leading-none select-none">&ldquo;</div>
              <p className="pl-8 text-foreground italic leading-relaxed">
                The post from your outgoing VP caught my attention — specifically the line about vision and execution culture not being aligned yet. That&apos;s almost always the real issue when good leaders leave quietly. We work with leadership teams going through exactly that transition — helping them see what&apos;s creating the gap before the next hire walks into the same dynamic. If that&apos;s the conversation happening internally right now, I might have something useful.
              </p>
              <div className="absolute bottom-4 right-4 text-4xl text-[var(--ss-coral-border)] font-serif leading-none select-none rotate-180">&rdquo;</div>
            </div>
          </motion.div>

          {/* What Makes It Land */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="card p-6"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate mb-3">
              What Makes It Land
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              It quotes their own language back at them. It reframes the departure as a diagnostic opportunity, not a failure. It offers value before the next hire is made — arriving at exactly the right moment in the transition window.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="/signal-state/use-cases/cybersecurity" className="btn-secondary-dark">
              ← Use Case 01
            </Link>
            <Link href="/signal-state/use-cases/independent-creative" className="btn-primary">
              Use Case 03: Independent Creative →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
