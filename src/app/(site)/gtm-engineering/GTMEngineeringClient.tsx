"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import FAQ from '@/components/ui/FAQ';
import { FAQS } from '@/data/faqs';

const instruments = [
  {
    number: '01',
    title: 'Signal — Intent intelligence',
    color: 'text-lavender',
    accent: 'border-lavender/20 bg-lavender/5',
    body: "I don't guess when buyers are in-market. I model it from real purchase data. At Cylance, I pulled Bombora intent signals across ~100 close/won enterprise accounts and mapped exactly what they researched — 18 months out to the day they signed. The output was a predictable 6-phase signal model: Cyberwarfare surging 306× at peak anxiety, Security Intelligence (+127% lift) and Security Threats (+125% lift) flagging final vendor selection. Content served against the signal, not the calendar.",
    link: { label: 'Intent Data as Funnel Intelligence', href: '/case-studies/intent-data' },
  },
  {
    number: '02',
    title: 'Scoring — Behavioral lead scoring',
    color: 'text-ember',
    accent: 'border-ember/20 bg-ember/5',
    body: "Scoring isn't job title plus company size. It's buyer motion, weighted and re-evaluated on every signal. A 0–100 composite: 50 points of Fit (seniority, ICP match, company size — set on entry) plus 50 points of Behavior (opens, clicks, web depth, downloads — updated dynamically). MQL fires at 75. Hand-raisers bypass the nurture for a 30-day fast track. The score doesn't just rank leads — it routes them.",
    link: { label: 'Hybrid Lead Scoring', href: '/playbooks/hybrid-lead-scoring' },
  },
  {
    number: '03',
    title: 'Routing — Dynamic nurture matrix',
    color: 'text-copper',
    accent: 'border-copper/20 bg-copper/5',
    body: "Nine content variants. Routed automatically. No manual sorting, and no lead falls through without a signal. A 3×3 system — Enterprise / SMB / Individual × Awareness / Consideration / Decision — where the score gates decide which of nine content tracks a contact sees. Entry sources, subscription-consent checks, sales hand-off at 75, contract-sent exit at 91, and a six-month sunset for the silent. The \"one size fits all\" problem, engineered out.",
    link: { label: 'Dynamic Email Nurture', href: '/case-studies/dynamic-nurture' },
  },
  {
    number: '04',
    title: 'Content — The Content Strategy Matrix',
    color: 'text-lavender',
    accent: 'border-lavender/20 bg-lavender/5',
    body: "Content mapped to the buyer's psychological state at every stage. Not random acts of content. A 120-day journey across ten stages, each instrumented on its own axes: buyer stage, tasks, personas, goals, KPIs, content score, media, strategy, tactics, and emotion. Problem awareness → solution education → vendor selection. This architecture fed $4M in quarterly pipeline at Cylance.",
    link: { label: '120-Day Content Journey', href: '/case-studies/120-day-content-journey' },
  },
  {
    number: '05',
    title: 'Spend — Paid media as a managed system',
    color: 'text-ember',
    accent: 'border-ember/20 bg-ember/5',
    body: "Budget allocation is an optimization problem. I treat it like one. At BlackBerry I directed a $2.3M annual paid budget across search, social, and programmatic at 8:1 ROI, and rebuilt the global paid search program to 550% YoY traffic growth. At Wethos, the same discipline applied to efficiency: a 2.2× CTR lift (0.74% → 1.63%) and 55% lower CPC on 81% less spend. Same system, two different optimization targets.",
    link: { label: 'Client results', href: '/about/clients' },
  },
  {
    number: '06',
    title: 'Measurement — The command center',
    color: 'text-copper',
    accent: 'border-copper/20 bg-copper/5',
    body: "A system you can't see, you can't optimize. I instrument every layer back to revenue. I wired HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into a single live executive view — built with Claude Code in under two days. Multi-touch attribution that revenue leadership actually trusts, because every component is tracked and connected to pipeline.",
    link: { label: 'Demand Gen Command Center', href: '/case-studies/executive-dashboard' },
  },
  {
    number: '07',
    title: 'AI orchestration — Machines handle scale. Humans handle meaning.',
    color: 'text-lavender',
    accent: 'border-lavender/20 bg-lavender/5',
    body: "AI as an integrated layer of the system, not an experimental add-on. Every agent routes through a human gate. Signal-State: agents scan six platforms every four hours, score expressed pain on recency and fit, and draft resonant outreach — then hand to a human review gate before anything reaches a real person. The machine finds the signal. The human decides if it's real. The machine scales delivery. The human reads the thread.",
    links: [
      { label: 'AI Orchestration', href: '/ai-orchestration' },
      { label: 'Signal-State', href: '/signal-state' },
    ],
  },
];

const contrastRows = [
  { dim: 'Unit of work', campaign: 'The campaign', gtm: 'The system' },
  { dim: 'Time horizon', campaign: "This quarter's number", gtm: 'Compounding infrastructure' },
  { dim: 'Where AI fits', campaign: 'A tool you tried once', gtm: 'An instrumented layer with a human gate' },
  { dim: 'Failure mode', campaign: 'A program flops; you find out late', gtm: 'A layer drifts; the instrumentation catches it' },
  { dim: 'What you measure', campaign: 'Leads, MQLs, touches', gtm: 'Connected pipeline, attributed by layer' },
  { dim: 'When someone leaves', campaign: 'The knowledge walks out', gtm: 'The system keeps running' },
  { dim: 'The output', campaign: 'Activity', gtm: 'Compounding pipeline' },
];

const proofRows = [
  { metric: '$4M', context: 'Engineered content system across the full buyer journey', company: 'Cylance' },
  { metric: '8:1', context: '$2.3M annual budget, search / social / programmatic', company: 'BlackBerry' },
  { metric: '550%', context: 'Post-acquisition global SEM rebuild', company: 'BlackBerry' },
  { metric: '344%', context: 'Full GTM build from zero', company: 'Wethos AI' },
  { metric: '70%', context: 'Demand engine rebuilt in under six weeks', company: 'Qwiet AI' },
  { metric: '~100', context: '18-month intent signal map from real close/won data', company: 'Cylance' },
];

const symptoms = [
  "You're running campaigns, but nobody can show you the system underneath them.",
  "Pipeline is unpredictable because the layers aren't connected — scoring doesn't talk to routing, spend doesn't talk to attribution.",
  "You've \"tried AI,\" but it lives in a sandbox, not the workflow.",
  "Your stack is maintained, not engineered. It records what happened; it doesn't create advantage.",
];

export default function GTMEngineeringClient() {
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
            GTM Engineering
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-3xl"
          >
            Stop running campaigns.{' '}
            <span className="text-gradient">Engineer the system.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl md:text-2xl font-semibold text-ash mb-6 max-w-2xl"
          >
            Most demand teams ask the wrong question.
          </motion.p>
          <p className="text-lg md:text-xl text-foreground-muted max-w-2xl leading-relaxed mb-10">
            <em>What campaign do we run next?</em> The teams that compound ask a harder one — how do data, media, content, scoring, AI, and channel connect into one instrumented system that reliably produces revenue? I&apos;ve been building those systems for a decade. Before the category had a name.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/work" className="btn-primary">
              Work with me
            </Link>
            <Link href="#instruments" className="btn-secondary-dark">
              See the instruments ↓
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── The Principle ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-ember mb-4">The Principle</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Campaign marketing is linear. Engineered demand is architectural.
            </h2>
            <p className="text-foreground-muted text-lg leading-relaxed mb-4">
              Campaign-centric demand gen runs in a straight line: build an asset, launch a program, count the leads, repeat. Every quarter starts near zero. Knowledge lives in someone&apos;s head. When they leave, it walks out the door.
            </p>
            <p className="text-foreground-muted text-lg leading-relaxed mb-4">
              GTM Engineering inverts that. You design the system. You instrument every layer. You optimize the connections <em>between</em> the layers — because that&apos;s where pipeline actually leaks. Then you let the machine compound.
            </p>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Campaigns don&apos;t disappear. They become an <em>output</em> of the system — one component of an engineered motion, not the strategy itself. That&apos;s the difference between activity and compounding pipeline. Big difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Instruments ────────────────────────────────────────────────── */}
      <section id="instruments" className="section bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-ember mb-4">The Instruments</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seven layers. Each one built, instrumented, and proven on real revenue.
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl">
              A demand engine is only as good as the layers underneath it — and the connections between them. Every instrument links to the work.
            </p>
          </motion.div>

          <div className="space-y-4">
            {instruments.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`card rounded-xl p-6 border ${item.accent}`}
              >
                <div className="flex items-start gap-5">
                  <span className={`font-mono text-sm font-bold shrink-0 mt-0.5 ${item.color}`}>
                    {item.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-semibold tracking-widest uppercase mb-2 ${item.color}`}>
                      {item.title}
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                      {item.body}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-3 border-t border-border">
                      {'links' in item && item.links
                        ? item.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              className={`text-xs font-medium hover:opacity-80 transition-opacity ${item.color}`}
                            >
                              → {l.label}
                            </a>
                          ))
                        : item.link && (
                            <a
                              href={item.link.href}
                              className={`text-xs font-medium hover:opacity-80 transition-opacity ${item.color}`}
                            >
                              → {item.link.label}
                            </a>
                          )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Connective layer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="card rounded-xl p-6 border border-border"
            >
              <div className="flex items-start gap-5">
                <span className="font-mono text-sm font-bold shrink-0 mt-0.5 text-slate">+</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-slate">
                    The connective layer — Integration
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                    A demand engine isn&apos;t one channel. It&apos;s parallel forces moving in coordination. Channel, field marketing, sales, and events are four routes to the same pipeline — and they fail separately unless something connects them. The marketing team I led ran the engine room across all four: the through-partner content, co-branded advertising, and microsites that let channel partners execute in-market, synchronized with field activation and sales motion. The instruments above are layers. This is the wiring that makes them fire as one system.
                  </p>
                  <div className="pt-3 border-t border-border">
                    <Link
                      href="/ai-orchestration"
                      className="text-xs font-medium text-slate hover:opacity-80 transition-opacity"
                    >
                      → How I build systems like this
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contrast Table ─────────────────────────────────────────────────── */}
      <section className="section bg-charcoal dark:bg-offblack text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-lavender mb-4">The Contrast</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Campaign marketing vs. GTM Engineering
            </h2>
            <p className="text-foreground-muted text-lg">
              Most competitors are still planning campaigns. That&apos;s the window.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-semibold tracking-widest uppercase text-slate w-40">Dimension</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold tracking-widest uppercase text-slate">Campaign marketing</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold tracking-widest uppercase text-ember">GTM Engineering</th>
                </tr>
              </thead>
              <tbody>
                {contrastRows.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-[rgba(255,255,255,0.08)]"
                  >
                    <td className="py-4 px-5 text-xs font-semibold text-slate uppercase tracking-wider">{row.dim}</td>
                    <td className="py-4 px-5 text-sm text-foreground-muted leading-relaxed">{row.campaign}</td>
                    <td className="py-4 px-5 text-sm text-ash leading-relaxed">{row.gtm}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Proof ──────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-ember mb-4">Proof</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The receipts</h2>
            <p className="text-foreground-muted text-lg">
              Twenty-plus years scaling revenue engines from Series A startups to a $1.4B acquisition.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[480px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-6 text-xs font-semibold tracking-widest uppercase text-slate w-24">Metric</th>
                  <th className="text-left py-3 pr-6 text-xs font-semibold tracking-widest uppercase text-slate">Context</th>
                  <th className="text-left py-3 text-xs font-semibold tracking-widest uppercase text-slate">Company</th>
                </tr>
              </thead>
              <tbody>
                {proofRows.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border"
                  >
                    <td className="py-4 pr-6">
                      <span className="font-mono font-bold text-xl text-ember">{row.metric}</span>
                    </td>
                    <td className="py-4 pr-6 text-sm text-foreground-muted leading-relaxed">{row.context}</td>
                    <td className="py-4 text-sm font-medium text-foreground">{row.company}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <p className="text-xs font-semibold tracking-widest uppercase text-lavender mb-4">Who This Is For</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Series A–C B2B SaaS or cybersecurity, and the symptoms are familiar.
            </h2>
            <ul className="space-y-4 mb-8">
              {symptoms.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-ember font-mono font-bold shrink-0 mt-0.5 text-sm">—</span>
                  <p className="text-foreground-muted text-lg leading-relaxed">{s}</p>
                </motion.li>
              ))}
            </ul>
            <p className="text-ash text-lg font-semibold">
              If you&apos;re nodding, you don&apos;t have a campaign problem. You have a systems problem. That&apos;s the one I solve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <FAQ
        title="GTM Engineering FAQ"
        description="The most common questions about systems-thinking demand generation."
        items={FAQS.gtmEngineering}
      />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-5"
          >
            Build the system, not the next campaign.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-foreground-muted text-lg max-w-xl mx-auto mb-8"
          >
            The fastest way to find out if your demand engine is engineered or just busy is a 30-minute call. No pitch — a real look at where your layers connect and where they leak.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/work" className="btn-primary">
              Work with me →
            </Link>
            <Link href="/case-studies" className="btn-secondary-dark">
              See the full body of work
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
