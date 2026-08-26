"use client";

import { motion } from 'framer-motion';
import FAQ from '@/components/ui/FAQ';
import { FAQS } from '@/data/faqs';

const CALENDLY_URL = 'https://calendly.com/sarenai';

const heroStats = [
  { value: '95%', label: 'The winning vendor is already on the Day One shortlist before any outreach begins' },
  { value: '80%', label: 'Of deals go to the pre-contact favorite — first contact validates an existing preference' },
  { value: '94%', label: 'Of buyers use LLMs during research — the shortlist now forms inside AI answers' },
];

const surfaces = [
  {
    label: 'On-site',
    color: 'text-ember',
    accent: 'border-ember/20 bg-ember/5',
    title: 'The canonical record',
    body: 'Extraction-ready structure, schema, entity clarity, first-party data. Pages with sequential heading hierarchy see a 2.8x citation lift.',
    source: 'AirOps research',
  },
  {
    label: 'Off-site',
    color: 'text-lavender',
    accent: 'border-lavender/20 bg-lavender/5',
    title: 'The citation graph',
    body: 'Third-party corroboration engines already trust. Strong Reddit/Quora mention volume drives ~4x citation odds; active G2, Capterra, and Trustpilot profiles drive ~3x source-selection odds.',
    source: 'SE Ranking data',
  },
];

const phases = [
  { number: '01', window: 'Days 0–30', title: 'Audit', body: 'AI visibility baseline, entity consistency scan, the ranked-but-never-cited gap map.' },
  { number: '02', window: 'Days 30–60', title: 'Restructure', body: 'Answer-first rewrites, schema, comparison-page coverage.' },
  { number: '03', window: 'Days 60–90', title: 'Seed', body: 'Reviews, editorial PR, community presence, first-party benchmark data.' },
  { number: '04', window: 'Ongoing', title: 'Measure', body: 'Citation frequency, AI-agent referrals, share of answer vs. competitors.' },
];

const exclusions = ['B2B SaaS and services companies', 'Roughly 200–5,000 employees', 'Teams that already invest in content and SEO'];

export default function AEOPlaybookClient() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-ember mb-4"
          >
            My AEO Playbook
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-3xl"
          >
            The deal is decided <span className="text-gradient">before the first call</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed mb-10"
          >
            B2B selection now happens in an anonymous research phase that runs through LLMs — answer engine optimization determines whether you exist in that phase.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="metric-value text-3xl md:text-4xl">{stat.value}</div>
                <div className="metric-label mt-2 text-ash/60 text-sm leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-ash/50 mb-8">Source: 6sense 2025 Buyer Experience Report (n≈4,000)</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book an intro call
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── What is AEO? ───────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is answer engine optimization?
            </h2>
            <p className="text-foreground-muted text-lg leading-relaxed mb-4">
              Answer engine optimization (AEO) is the practice of structuring your content and reputation so AI systems — ChatGPT, Perplexity, Google AI Overviews — extract, trust, and cite your brand as the answer to buyer questions. It moves the success metric from ranked-and-clicked to extracted-and-cited.
            </p>
            <p className="text-foreground-muted text-lg leading-relaxed mb-4">
              LLMs answer from either frozen training data or live retrieval. Only retrieval is optimizable on a business timeline, since training data updates on the vendor&apos;s schedule, not yours.
            </p>
            <p className="text-foreground-muted text-lg leading-relaxed mb-4">
              Retrieval behaves like search. It rewards solid SEO, clean structure, and corroborated reputation — the same fundamentals, applied to a new consumer.
            </p>
            <p className="text-foreground text-lg font-semibold">
              AEO is not a new discipline — it is SEO with a new definition of winning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Dual-Surface Model ─────────────────────────────────────────── */}
      <section className="section bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The dual-surface model</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {surfaces.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`card rounded-xl p-6 border ${s.accent}`}
              >
                <p className={`text-[10px] font-semibold tracking-widest uppercase mb-2 ${s.color}`}>{s.label}</p>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed mb-4">{s.body}</p>
                <p className="text-xs text-foreground-muted/70 pt-3 border-t border-border">Source: {s.source}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-foreground text-lg font-semibold max-w-2xl"
          >
            Your site is the record. The citation graph is what makes engines trust the record. Budget effort 50/50.
          </motion.p>
        </div>
      </section>

      {/* ── How the Playbook Works ────────────────────────────────────────── */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How the playbook works</h2>
          </motion.div>

          <div className="space-y-4 mb-10">
            {phases.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card rounded-xl p-6 border border-border flex items-start gap-5"
              >
                <span className="font-mono text-sm font-bold shrink-0 mt-0.5 text-ember">{p.number}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1 text-ember">{p.window}</p>
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-foreground-muted text-lg leading-relaxed mb-6">
              The full audit checklist and canonical boilerplate framework are what we walk through on an intro call.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Book an intro call
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Who This Is For ────────────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who this is for</h2>
            <ul className="space-y-3 mb-6">
              {exclusions.map((e, i) => (
                <motion.li
                  key={e}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-ember font-mono font-bold shrink-0 mt-0.5 text-sm">—</span>
                  <p className="text-foreground-muted text-lg leading-relaxed">{e}</p>
                </motion.li>
              ))}
            </ul>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Teams already investing in content and SEO who are watching organic decline without understanding where the demand went. Not for e-commerce, not for local businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <FAQ
        title="AEO Playbook FAQ"
        description="The most common questions about answer engine optimization."
        items={FAQS.aeoPlaybook}
      />

      {/* ── Closing CTA ────────────────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-foreground-muted text-lg max-w-xl mx-auto mb-8"
          >
            A vendor not driving digital preference in the anonymous 60% of the journey is competing for a residual sliver of probability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book an intro call
            </a>
            <a href="mailto:hello@saren.ai" className="text-sm text-ash/70 hover:text-ash transition-colors">
              or email hello@saren.ai
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
