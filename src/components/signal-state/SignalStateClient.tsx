'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SignalStateSubnav from './SignalStateSubnav'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import { FAQS } from '@/data/faqs'

const PILLARS = [
  {
    number: '01',
    label: 'Detect',
    description:
      'AI agents monitor Reddit, LinkedIn, Twitter, Glassdoor, and professional communities for organic expressions of pain. Every signal is scored for clarity, recency, and persona fit.',
    bgVar: '--ss-purple-bg',
    borderVar: '--ss-purple-border',
    textVar: '--ss-purple-text',
  },
  {
    number: '02',
    label: 'Empathize',
    description:
      'Each signal is interpreted not just for what was said but for what was felt. The output is an emotional brief — the state, the language, the window.',
    bgVar: '--ss-coral-bg',
    borderVar: '--ss-coral-border',
    textVar: '--ss-coral-text',
  },
  {
    number: '03',
    label: 'Respond',
    description:
      'Outreach mirrors the signal. It references what they said. It names the pattern without diagnosing. It invites a response. It does not feel like marketing because it is structured as a reply.',
    bgVar: '--ss-teal-bg',
    borderVar: '--ss-teal-border',
    textVar: '--ss-teal-text',
  },
]

const COMPARISONS = [
  {
    model: 'Firmographic',
    summary: 'Who they are structurally.',
    limitation: 'Static. Says nothing about psychological state or timing.',
  },
  {
    model: 'Behavioral',
    summary: 'Who responded when you reached them.',
    limitation: 'Reactive. Requires you to touch them first.',
  },
  {
    model: 'Intent Data',
    summary: 'What they searched unprompted.',
    limitation: 'Inferred. High competition — everyone buys the same feeds.',
  },
  {
    model: 'Signal-State',
    summary: 'What psychological state they are expressing publicly, at what moment of readiness.',
    limitation: null,
    highlight: true,
  },
]

const ARCHITECTURE_STAGES = [
  { label: 'Agents', color: '--ss-gray-border', textColor: '--ss-gray-text', bgColor: '--ss-gray-bg' },
  { label: 'Detect', color: '--ss-purple-border', textColor: '--ss-purple-text', bgColor: '--ss-purple-bg' },
  { label: 'Empathize', color: '--ss-coral-border', textColor: '--ss-coral-text', bgColor: '--ss-coral-bg' },
  { label: 'Respond', color: '--ss-purple-border', textColor: '--ss-purple-text', bgColor: '--ss-purple-bg' },
  { label: 'Landing', color: '--ss-teal-border', textColor: '--ss-teal-text', bgColor: '--ss-teal-bg' },
  { label: 'Sales', color: '--ss-green-border', textColor: '--ss-green-text', bgColor: '--ss-green-bg' },
]

export default function SignalStateClient() {
  return (
    <>
      {/* Hero */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <Breadcrumb
            trail={[{ href: '/', label: 'Home' }, { label: 'Signal-State Marketing' }]}
            accentColor="var(--ss-teal-text)"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mb-4"
          >
            Framework · v1.0
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            Traditional marketing speaks in three dimensions.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-xl font-medium text-[var(--ss-teal-text)] mb-6"
          >
            Let us introduce you to the fourth.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mb-10"
          >
            We send AI agents across the internet to find people who are already talking about a problem — out loud, in public — that your product can solve. Then we respond within hours, before the moment passes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/signal-state/framework" className="btn-primary">
              Explore the framework →
            </Link>
            <Link
              href="/signal-state/architecture"
              className="btn-secondary-dark"
            >
              See the architecture →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Subnav — inline after hero on overview page */}
      <SignalStateSubnav />

      {/* Three Pillars */}
      <section className="section">
        <div className="container-narrow">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-2"
          >
            Three stages. One mechanism.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-slate mb-10"
          >
            Every Signal-State campaign runs through the same pipeline.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl p-6 border"
                style={{
                  background: `var(${pillar.bgVar})`,
                  borderColor: `var(${pillar.borderVar})`,
                }}
              >
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: `var(${pillar.textVar})` }}
                >
                  {pillar.number} — {pillar.label}
                </p>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold leading-snug text-[var(--ss-teal-text)] mb-12 border-l-4 pl-6"
            style={{ borderColor: 'var(--ss-teal-border)' }}
          >
            &ldquo;Public expression of struggle is not just a pain signal. It is a readiness signal.&rdquo;
          </motion.blockquote>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6"
          >
            Why this works when nothing else does
          </motion.h2>

          <div className="space-y-3">
            {COMPARISONS.map((row, index) => (
              <motion.div
                key={row.model}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-4 rounded-lg p-4 border ${
                  row.highlight
                    ? 'border-[var(--ss-teal-border)] bg-[var(--ss-teal-bg)]'
                    : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]'
                }`}
              >
                <div className="w-28 shrink-0">
                  <span
                    className={`text-xs font-semibold tracking-wide uppercase ${
                      row.highlight ? 'text-[var(--ss-teal-text)]' : 'text-slate'
                    }`}
                  >
                    {row.model}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${row.highlight ? 'text-ash font-medium' : 'text-foreground-muted'}`}>
                    {row.summary}
                  </p>
                  {row.limitation && (
                    <p className="text-xs text-slate mt-1">{row.limitation}</p>
                  )}
                  {row.highlight && (
                    <p className="text-xs text-[var(--ss-teal-text)] mt-1 font-medium">
                      Expressed, not inferred. Found, not prompted. Low competition.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Teaser */}
      <section className="section">
        <div className="container-narrow">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-2"
          >
            The pipeline at a glance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-slate mb-8"
          >
            From signal detection to closed deal — six stages, fully automated.
          </motion.p>

          <div className="flex flex-wrap gap-3 items-center mb-8">
            {ARCHITECTURE_STAGES.map((stage, index) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div
                  className="px-4 py-2 rounded-lg border text-sm font-semibold"
                  style={{
                    background: `var(${stage.bgColor})`,
                    borderColor: `var(${stage.color})`,
                    color: `var(${stage.textColor})`,
                  }}
                >
                  {stage.label}
                </div>
                {index < ARCHITECTURE_STAGES.length - 1 && (
                  <span className="text-slate text-sm">→</span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/signal-state/architecture"
              className="text-[var(--ss-teal-text)] text-sm font-medium hover:underline"
            >
              View the full interactive architecture →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Signal-State FAQ"
        description="Factual breakdown of intent-detection pipelines, privacy, and GTM mechanics."
        items={FAQS.signalState}
      />

      {/* CTA Section */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-amber-text)] mb-4"
          >
            The competitive window
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold mb-4"
          >
            The intervention window is open.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground-muted text-lg mb-8 max-w-lg mx-auto"
          >
            It will not remain open.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/signal-state/framework" className="btn-primary">
              Read the full framework →
            </Link>
            <Link href="/ai-orchestration" className="btn-secondary-dark">
              See how I deploy it →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
