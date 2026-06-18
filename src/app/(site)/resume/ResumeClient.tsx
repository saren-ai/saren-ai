'use client'

import { motion } from 'framer-motion'
import { Download, Printer } from 'lucide-react'
import Link from 'next/link'

const competencies = [
  {
    category: 'GTM Systems Design',
    description:
      'Architecting end-to-end demand infrastructure for high-growth B2B tech — funnel architecture, lifecycle staging, and campaign systems that convert long-cycle buying committees into measurable pipeline.',
  },
  {
    category: 'Turnaround Execution',
    description:
      'Rapid diagnostics and reconstruction of underperforming programs — post-M&A digital integration, SEM/SEO rebuilds, and CAC reduction through systematic funnel repair.',
  },
  {
    category: 'AI Integration & AEO',
    description:
      'Production-grade AI across the marketing stack — LLM-assisted persona research, agentic prospecting workflows, AI-accelerated content velocity, and zero-click search optimization (AEO).',
  },
  {
    category: 'MarketingOps & Data Governance',
    description:
      'CRM auditing and architecture (HubSpot/Salesforce), lead scoring and routing, speed-to-lead optimization, and multi-touch attribution tied to hard pipeline impact.',
  },
  {
    category: 'Executive & Team Leadership',
    description:
      'C-suite strategic partner with P&L-level budget ownership ($2.3M paid media); led global teams and matrixed agency networks through high-stakes M&A integration.',
  },
]

const experience = [
  {
    years: 'Oct 2023 – Present',
    role: 'Fractional Head of Marketing',
    company: 'Wethos AI — Irvine, CA',
    intro:
      'Own full-stack marketing for a post-stealth B2B SaaS platform, carrying it through a $7.5M Series A growth phase.',
    bullets: [
      'Built GTM Foundation: Developed the end-to-end marketing engine from scratch — positioning, ICP messaging, lifecycle nurture, and analytics infrastructure.',
      'Scaled Demand 344%: Drove a 344% increase in lead growth via integrated paid, organic, and partner campaigns; instituted a rigorous test-and-learn operating cadence.',
      'Optimized Paid Media Efficiency: Reengineered targeting, yielding a 2.2x CTR increase (0.74% → 1.63%) and 55% lower CPC on 81% less spend.',
      'Engineered Funnel Conversions: Led website + funnel rebuild (IA, messaging, CRO), driving a 3x lift in MQL→SQL conversion.',
      "Established Measurement & RevOps: Implemented the account's first conversion tracking ($5.33 CPA benchmark) and deployed the HubSpot/Apollo/ZoomInfo stack with automated routing, scoring, and multi-touch attribution.",
    ],
  },
  {
    years: 'Jul – Dec 2023',
    role: 'Head of Growth',
    company: 'Qwiet AI — Irvine, CA',
    intro: 'High-velocity turnaround sprint to rebuild digital marketing for an enterprise AppSec startup.',
    bullets: [
      'Funnel Reconstruction: Rebuilt paid media and landing page architecture, slashing Google Ads CAC by 70% while accelerating pipeline creation.',
      'Inbound Acceleration: Grew inbound MQLs by 300% through highly targeted SEO and intent-data capture; launched enterprise ABM pilot tailored to security buying centers.',
      'Sales Alignment: Partnered with Sales leadership to lock down ICP definitions, funnel stages, and strict SLAs to enforce cross-functional pipeline discipline.',
    ],
  },
  {
    years: 'Nov 2020 – Jan 2023',
    role: 'Senior Director of Marketing',
    company: 'BlackBerry (formerly Cylance) — Irvine, CA',
    intro:
      "Acquihired with the Cylance demand team following BlackBerry's $1.4B acquisition. Inherited an underperforming global digital advertising program and led its complete strategic and technical reconstruction.",
    bullets: [
      'Paid Search Overhaul: Rebuilt the global paid search program end to end — restructuring account architecture and keyword strategy to deliver a 550% YoY increase in paid search traffic.',
      'Budget Management & ROI: Directed a $2.3M annual paid media budget across search, social, and programmatic, delivering an 8:1 ROI.',
      'Conversion Optimization: Established a systematic A/B testing and UX optimization program that generated a 33% conversion lift on core product pages.',
      'SEO & ABM Scaling: Increased organic traffic 40% YoY through comprehensive SEO strategy; scaled advanced ABM framework to an 8x engagement lift using Demandbase and predictive analytics.',
    ],
  },
  {
    years: 'Jul 2017 – Nov 2020',
    role: 'Director of Marketing',
    company: 'Cylance — Irvine, CA',
    intro: 'Key driver of the hyper-growth demand engine leading up to the $1.4B acquisition by BlackBerry.',
    bullets: [
      'Pipeline Generation: Generated $4M in quarterly pipeline through the design and execution of highly integrated digital campaigns.',
      'Funnel Governance: Implemented the Forrester Demand Waterfall model, aligning marketing and sales around unified, transparent funnel metrics.',
    ],
  },
]

const additionalExperience = [
  {
    years: 'Jan – Jun 2023',
    role: 'Head of Marketing (Fractional)',
    company: 'CloudKitchens — Los Angeles, CA',
    note: 'Applied enterprise B2B demand generation and marketing operations practices to a high-growth food-tech platform.',
  },
  {
    years: '2012 – 2017',
    role: 'Group Account Director',
    company: 'Perficient Digital — Irvine, CA',
    note: 'Directed enterprise digital delivery for national clients across Adobe Experience Manager and Salesforce ecosystem rollouts.',
  },
  {
    years: '2010 – 2012',
    role: 'Director of Client Service',
    company: 'JUXT Interactive — Newport Beach, CA',
    note: null,
  },
  {
    years: '2007 – 2010',
    role: 'Management Supervisor',
    company: 'AKQA — San Francisco, CA',
    note: null,
  },
  {
    years: '2001 – 2007',
    role: 'Web Producer, Asia Pacific Region',
    company: 'Nike (via Aquent)',
    note: 'Localized AKQA-built digital commerce and brand properties for Japan, Korea, China, and Taiwan markets.',
  },
]

const impactRows = [
  { metric: '344% lead growth', context: 'Full GTM build from zero — 12 months to exit velocity', company: 'Wethos AI' },
  { metric: '3x MQL→SQL lift', context: 'Website + funnel rebuild (IA, messaging, CRO)', company: 'Wethos AI' },
  { metric: '70% CAC reduction', context: 'Demand gen rebuilt in <6 weeks — 2–3 leads/wk → 20–30/wk', company: 'Qwiet AI' },
  { metric: '300% inbound MQLs', context: 'Single quarter via targeted SEO and intent-data capture', company: 'Qwiet AI' },
  { metric: '550% paid search traffic', context: 'Post-acquisition global SEM program rebuild', company: 'BlackBerry' },
  { metric: '8:1 paid media ROI', context: '$2.3M annual budget across search, social, programmatic', company: 'BlackBerry' },
  { metric: '$4M quarterly pipeline', context: 'Integrated digital campaigns on $1M annual paid budget', company: 'Cylance' },
]

export default function ResumeClient() {
  return (
    <>
      <style>{`
        @media print {
          header, nav, footer, [data-noprint] { display: none !important; }
          [data-printbg="dark"] {
            background: white !important;
            background-image: none !important;
          }
          [data-printbg="dark"] * {
            color: #1D1D1F !important;
          }
          [data-resumeentry] {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          @page { margin: 0.65in; }
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash" data-printbg="dark">
        <div className="container-narrow">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-ash mb-2 leading-tight"
          >
            Saren Sakurai
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-ash/80 text-lg font-semibold mb-1"
          >
            Demand Generation & Marketing Systems Leader
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="text-ember text-sm font-mono mb-6"
          >
            AI-Native MarketingOps
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-ash/50 font-mono"
          >
            <a href="tel:+13105707585" className="hover:text-ash/80 transition-colors">
              (310) 570-7585
            </a>
            <a href="mailto:saren.sakurai@me.com" className="hover:text-ash/80 transition-colors">
              saren.sakurai@me.com
            </a>
            <a
              href="https://linkedin.com/in/saren"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ash/80 transition-colors"
            >
              LinkedIn.com/in/saren
            </a>
            <a href="https://saren.ai" className="hover:text-ash/80 transition-colors">
              saren.ai
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
            data-noprint
          >
            <a
              href="/downloads/Saren-Sakurai-Resume.pdf"
              download="Saren-Sakurai-Resume.pdf"
              className="flex items-center gap-1.5 text-xs text-ash/40 hover:text-ash/70 transition-colors font-mono"
            >
              <Download size={12} />
              Download PDF
            </a>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs text-ash/40 hover:text-ash/70 transition-colors font-mono"
            >
              <Printer size={12} />
              Print / Save PDF
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Profile ───────────────────────────────────────────────────── */}
      <section className="section border-b border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-4">
              Profile
            </h2>
            <p className="text-charcoal dark:text-foreground leading-relaxed max-w-3xl">
              Systems thinker and marketing leader with{' '}
              <span className="font-semibold">20+ years</span> building the high-yield infrastructure
              that transforms demand generation from a craft into a predictable machine. Expert at
              architecting multi-channel GTM frameworks that convert complex B2B buying journeys into
              measurable pipeline. A proven turnaround operator called in to rebuild broken programs.
              Early adopter of production-grade AI workflows (AEO, LLM research) with a track record
              scaling revenue engines from Series A startups to a{' '}
              <span className="text-ember font-semibold">$1.4B acquisition</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Core Competencies ─────────────────────────────────────────── */}
      <section className="section bg-ash dark:bg-background border-b border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-8">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competencies.map((comp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3"
                >
                  <span className="text-ember font-mono shrink-0 mt-0.5">—</span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal dark:text-foreground mb-1">
                      {comp.category}
                    </p>
                    <p className="text-sm text-slate dark:text-slate leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Professional Experience ───────────────────────────────────── */}
      <section className="section border-b border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-10">
            Professional Experience
          </h2>
          <div className="space-y-14">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                data-resumeentry="true"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10"
              >
                <div className="shrink-0">
                  <p className="text-xs font-mono text-slate dark:text-slate leading-relaxed">
                    {job.years}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-0.5">{job.role}</h3>
                  <p className="text-sm text-slate dark:text-slate italic mb-3">{job.company}</p>
                  {job.intro && (
                    <p className="text-sm text-slate dark:text-slate leading-relaxed mb-4">
                      {job.intro}
                    </p>
                  )}
                  <ul className="space-y-1.5">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-slate dark:text-slate leading-relaxed">
                        <span className="text-ember shrink-0 mt-0.5">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional Experience ─────────────────────────────────────── */}
      <section className="section bg-ash dark:bg-background border-b border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-8">
              Additional Experience
            </h2>
            <div className="space-y-5">
              {additionalExperience.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-10"
                >
                  <p className="text-xs font-mono text-slate dark:text-slate pt-0.5">{job.years}</p>
                  <div>
                    <p className="text-sm font-semibold text-charcoal dark:text-foreground">
                      {job.role}
                    </p>
                    <p className="text-xs text-slate dark:text-slate italic">{job.company}</p>
                    {job.note && (
                      <p className="text-xs text-slate dark:text-slate mt-1 leading-relaxed">
                        {job.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Snapshot ───────────────────────────────────────────── */}
      <section className="section border-b border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-8">
              Impact Snapshot
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal/10 dark:border-white/10">
                    <th className="text-left text-xs font-semibold tracking-wide uppercase text-slate dark:text-slate pb-3 pr-8">
                      Metric
                    </th>
                    <th className="text-left text-xs font-semibold tracking-wide uppercase text-slate dark:text-slate pb-3 pr-8">
                      Context
                    </th>
                    <th className="text-left text-xs font-semibold tracking-wide uppercase text-slate dark:text-slate pb-3">
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {impactRows.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-charcoal/6 dark:border-white/6 last:border-0"
                    >
                      <td className="py-3 pr-8 font-mono font-semibold text-charcoal dark:text-foreground whitespace-nowrap">
                        {row.metric}
                      </td>
                      <td className="py-3 pr-8 text-slate dark:text-slate leading-relaxed">
                        {row.context}
                      </td>
                      <td className="py-3 text-slate dark:text-slate whitespace-nowrap">
                        {row.company}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────────────── */}
      <section className="section bg-ash dark:bg-background border-b border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10"
          >
            <h2 className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate">
              Education
            </h2>
            <div>
              <p className="font-bold text-charcoal dark:text-foreground">Sarah Lawrence College</p>
              <p className="text-sm text-slate dark:text-slate">
                Bachelor of Arts in Liberal Arts — Bronxville, NY
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA (screen only) ─────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash" data-noprint data-printbg="dark">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ash mb-3">
              Let&apos;s build something together.
            </h2>
            <p className="text-ash/50 text-sm mb-8 font-mono">
              saren.sakurai@me.com · (310) 570-7585
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:saren.sakurai@me.com" className="btn-primary">
                Email Saren
              </a>
              <a
                href="https://calendly.com/sarenai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-dark"
              >
                Book 30 Minutes
              </a>
              <Link href="/case-studies" className="btn-secondary-dark">
                See the Work
              </Link>
            </div>
            <p className="mt-6 text-sm text-ash/50">
              The full story behind these numbers:{' '}
              <Link href="/case-studies" className="text-lavender hover:text-ash transition-colors">
                case studies
              </Link>{' '}
              ·{' '}
              <Link href="/about" className="text-lavender hover:text-ash transition-colors">
                about me
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
