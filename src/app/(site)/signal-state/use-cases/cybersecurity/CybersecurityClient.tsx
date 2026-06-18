'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SignalStateSubnav from '@/components/signal-state/SignalStateSubnav'

export default function CybersecurityClient() {
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
              className="text-xs text-foreground-muted hover:text-[var(--ss-teal-text)] transition-colors"
            >
              ← Use Cases
            </Link>
            <span className="text-xs text-foreground-muted">·</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)]">
              Use Case 01
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-3"
          >
            Cybersecurity / Ransomware Vulnerability
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[var(--ss-teal-text)] text-xl font-medium"
          >
            Finding organizational vulnerability before the attack.
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
              <p className="text-slate text-xs mb-3">{"// Glassdoor review — posted this week"}</p>
              <p className="mb-4">
                <span className="text-[var(--ss-teal-text)]">&ldquo;IT is a one-man show. We got hit with a phishing attack last month and it took three days to respond. Nobody seems to care.&rdquo;</span>
              </p>
              <p className="text-slate text-xs mb-3">{"// Simultaneously — passive signals confirmed:"}</p>
              <p className="text-ash">• Shodan: RDP port 3389 open on primary IP</p>
              <p className="text-ash">• LinkedIn: last security hire left 8 months ago</p>
              <p className="text-ash">• LinkedIn: same role reposted twice</p>
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
                'Expressed internal vulnerability (Glassdoor review — community-validated pain)',
                'Structural confirmation (open ports, no security leadership)',
                'Organizational signal (high turnover in the one function that matters most)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
                  <span className="text-[var(--ss-teal-text)] mt-0.5 shrink-0">→</span>
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
                <p><span className="opacity-60">WHO:</span>     Mid-size logistics company, 400 employees, no CISO</p>
                <p><span className="opacity-60">STATE:</span>   Active vulnerability, internally acknowledged, leadership unaware</p>
                <p><span className="opacity-60">MOMENT:</span>  Review posted 18 hours ago. Recency window: HIGH.</p>
                <p><span className="opacity-60">LANGUAGE:</span> &ldquo;nobody seems to care&rdquo; — leadership disconnection is the expressed pain, not the technical exposure itself</p>
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
              style={{ background: 'var(--ss-teal-bg)', borderColor: 'var(--ss-teal-border)' }}
            >
              <div className="absolute top-4 left-4 text-4xl text-[var(--ss-teal-border)] font-serif leading-none select-none">&ldquo;</div>
              <p className="pl-8 text-foreground italic leading-relaxed">
                Saw a recent review from your team mentioning the phishing response took three days — that gap between incident and response is usually where the real damage happens. We work with companies that don&apos;t have a full security team but need one. If the timing is relevant, worth 20 minutes.
              </p>
              <div className="absolute bottom-4 right-4 text-4xl text-[var(--ss-teal-border)] font-serif leading-none select-none rotate-180">&rdquo;</div>
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
              It references something real and recent. It names the pattern (response gap) without accusing. It positions the offering as filling a structural gap, not selling software. It doesn&apos;t mention ransomware, ports, or scores. It sounds like someone paying attention.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="/signal-state/use-cases" className="btn-secondary-dark">
              ← All use cases
            </Link>
            <Link href="/signal-state/use-cases/org-alignment" className="btn-primary">
              Use Case 02: Org Alignment →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
