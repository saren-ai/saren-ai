'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SignalStateSubnav from '@/components/signal-state/SignalStateSubnav'

export default function IndependentCreativeClient() {
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
              className="text-xs text-foreground-muted hover:text-[var(--ss-purple-text)] transition-colors"
            >
              ← Use Cases
            </Link>
            <span className="text-xs text-foreground-muted">·</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-purple-text)]">
              Use Case 03
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-3"
          >
            Independent Creative / Solo Strategist
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[var(--ss-purple-text)] text-xl font-medium"
          >
            The moment a solo operator names the capability gap.
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
              className="rounded-xl border p-6 font-mono text-sm leading-relaxed"
              style={{ background: '#0d0f12', borderColor: 'rgba(255,255,255,0.08)', color: '#e2e4ea' }}
            >
              <p className="text-slate text-xs mb-3">{"// The Target: Freelance art director · 12 years agency experience · 8 months independent · Strong portfolio · Just lost a pitch to a full-service agency"}</p>
              <p className="text-slate text-xs mb-3">{"// LinkedIn post, posted 6 hours ago:"}</p>
              <p className="mb-4">
                <span className="text-[var(--ss-purple-text)]">&ldquo;Lost a pitch today that I&apos;m genuinely proud of creatively. The work was strong. But sitting across from a team of six — strategist, account director, researcher, two creatives and a PM — I realized I was bringing a knife to a gunfight. Time to figure out how solo operators compete with full rooms.&rdquo;</span>
              </p>
              <p className="text-slate text-xs">{"// 31 comments. 18 people saying \"same.\" 4 recommending collaborators. 2 recommending tools. Nobody recommending the right thing yet."}</p>
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
                'Acute expressed signal (posted 6 hours ago — peak window)',
                'Exact pain named: capability gap vs. full-service team, not skill gap',
                'Community validation (31 comments, 18 direct identifications)',
                'Transition context: 8 months independent — still in the adjustment window',
                'Active search signal: "time to figure out" = preparation stage beginning',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
                  <span className="text-[var(--ss-purple-text)] mt-0.5 shrink-0">→</span>
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
                <p><span className="opacity-60">WHO:</span>     Freelance CD, 8 months independent, pitching brand clients direct</p>
                <p><span className="opacity-60">STATE:</span>   Acute pitch loss, capability gap explicitly named, solution-seeking begins</p>
                <p><span className="opacity-60">MOMENT:</span>  6 hours old. Peak window. Act within 18 hours.</p>
                <p><span className="opacity-60">LANGUAGE:</span> &ldquo;knife to a gunfight&rdquo; / &ldquo;solo operators compete with full rooms&rdquo;</p>
                <p className="pl-[5.5rem] opacity-80">— use the competitive frame, not the capability gap frame</p>
                <p><span className="opacity-60">INTENT:</span>  Active — &ldquo;time to figure out&rdquo; signals they are now in Preparation stage</p>
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
              style={{ background: 'var(--ss-purple-bg)', borderColor: 'var(--ss-purple-border)' }}
            >
              <div className="absolute top-4 left-4 text-4xl text-[var(--ss-purple-border)] font-serif leading-none select-none">&ldquo;</div>
              <p className="pl-8 text-foreground italic leading-relaxed">
                Saw your post about the pitch — &ldquo;knife to a gunfight&rdquo; is exactly right, and it&apos;s not a creative problem. The strategy layer, the research, the market framing — that&apos;s what a team of six brings that one person can&apos;t fake. We built something for exactly this: a platform that gives a solo creative director the strategic layer on demand — market research, positioning frameworks, competitive context — so you walk into the next room as a full team of one. Worth a look if you&apos;re in &ldquo;figure it out&rdquo; mode right now.
              </p>
              <div className="absolute bottom-4 right-4 text-4xl text-[var(--ss-purple-border)] font-serif leading-none select-none rotate-180">&rdquo;</div>
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
              It quotes their exact phrase. It correctly diagnoses the problem as structural, not a skill gap — which respects their seniority. It arrives while they&apos;re actively processing the loss. It offers the exact missing piece they named. It doesn&apos;t oversell. It lands as a response to something they said, not an ad for something they searched.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="/signal-state/use-cases/org-alignment" className="btn-secondary-dark">
              ← Use Case 02
            </Link>
            <Link href="/signal-state/signal-library" className="btn-primary">
              View the signal library →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
