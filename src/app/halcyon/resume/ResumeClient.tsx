'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import HalcyonSubnav from '@/components/halcyon/HalcyonSubnav'

const experience = [
  {
    years: '2023–Present',
    role: 'Principal · Fractional CMO & Demand Gen Advisor',
    company: 'Saren Sakurai Consulting · saren.ai · Remote',
    intro:
      'Embedded VP-level demand gen leadership across AI-native and cybersecurity companies — owning pipeline targets, leading cross-functional teams, and deploying the full-funnel infrastructure methodology built at Cylance: intent scoring, ABM programs, nurture architecture, and attribution modeling.',
    subsections: [
      {
        name: 'WethosAI (AI Platform, Pre-Series A)',
        bullets: [
          '344% inbound lead growth in 12 months. Built demand gen from zero: GTM strategy, content engine, paid acquisition, and marketing ops.',
          '28% demo-to-opportunity uplift through narrative overhaul and mid-funnel content alignment.',
          'Led cross-functional marketing and sales team; defined roles, set KPIs, and drove collaboration across content, demand gen, and sales to align pipeline goals.',
        ],
      },
      {
        name: 'Qwiet AI (Application Security, SaaS)',
        bullets: [
          'Led core marketing and sales team; aligned cross-functional efforts across demand gen, content, and outbound to accelerate pipeline velocity.',
          '70%+ CAC reduction by rebuilding the demand gen program in under 6 weeks — leads went from 2–3/week to 20–30/week.',
          '300% inbound MQL growth in a single quarter via restructured social ad strategy and predictive audience targeting.',
          '50% full-funnel conversion improvement through intent-based content syndication and landing page re-engineering.',
        ],
      },
      {
        name: 'CloudKitchens (Full-Scope Marketing, Confidential Engagement)',
        bullets: [
          'Led full marketing scope — content generation, growth marketing, web, and demand gen — while advising the CRO on strategies to expand reach from SMB to national and international enterprise accounts.',
          'Audited existing demand gen programs cross-functionally with sales and ops; redesigned customer journey and content strategy to align with ABM goals for large global accounts.',
          'Re-architected analytics dashboards to capture granular enterprise lead generation and conversion data across all campaign channels.',
        ],
      },
    ],
  },
  {
    years: 'Nov 2020–Jan 2023',
    role: 'Senior Director of Marketing',
    company: 'BlackBerry (Cylance Post-Acquisition) · Irvine, CA · Remote',
    intro:
      "Managed global digital marketing for the world's largest AI cybersecurity software firm across 5 regions, 7 languages.",
    bullets: [
      '550% paid search recovery — rebuilt the inherited, underperforming post-acquisition SEM program end to end, with ABM expansion targeting enterprise and government accounts.',
      '8× YoY ABM traction through account-based programs with multi-stakeholder persona mapping and deal orchestration frameworks.',
      'Owned $2.3M paid media budget across LinkedIn, Google Ads, display, retargeting, and content syndication channels.',
      'Led demand center operations: campaign planning, lead scoring, attribution, and weekly pipeline reporting to executive team.',
    ],
  },
  {
    years: 'Jul 2017–Feb 2020',
    role: 'Director, Demand Generation & Web',
    company: 'Cylance · Acquired by BlackBerry for $1.4B · Irvine, CA',
    intro:
      'Built demand gen infrastructure from the ground up at an AI-native endpoint security startup selling to enterprise and government buyers — the same buyer profile and competitive objection map as Halcyon ("We already have CrowdStrike").',
    bullets: [
      '$4M quarterly pipeline on a $1M annual paid media budget — built on the original Sirius Decisions demand waterfall framework, deployed end-to-end across all funnel stages.',
      '70%+ CAC reduction via intent-driven targeting, behavioral segmentation, and full-funnel conversion optimization.',
      'Built and led a 7-person global demand center across 5 regions — spanning paid media, marketing automation, marketing operations, sales enablement, web development, and project management.',
      'Enabled partner and reseller channel programs across digital: built co-branded landing pages, automated partner email delivery in Marketo, and created field marketing infrastructure for event signup, lead ingestion, and post-event nurture.',
      'Oversaw $1.3M rebuild of cylance.com — 300+ page multi-lingual site — coordinating 40 internal and agency resources; improved product page conversions by 31%.',
      'Doubled share of voice through SEO/SEM strategy, delivering 28% lead growth from digital and organic channels.',
    ],
  },
  {
    years: 'Sep 2012–Jul 2017',
    role: 'Group Account Director, UX & Digital Marketing',
    company: 'Perficient Digital · Irvine, CA',
    bullets: [
      'Led cross-functional teams (up to 25) delivering full-channel digital marketing and UX for Palo Alto Networks, AAA Southern California, and Toyota Motor Sales.',
      'Spearheaded $5M AAA Southern California account: 200+ annual email campaigns to 250K member database; 98.7% deliverability rate.',
      'Managed $250K–1M project scopes: authored contracts, led stakeholder negotiations, oversaw delivery from scoping to launch.',
    ],
  },
  {
    years: 'Mar 2010–Jul 2012',
    role: 'Director of Client Service / Senior Account Director',
    company: 'Juxt Interactive, a Division of George P. Johnson (GPJ) · Newport Beach, CA',
    bullets: [
      'Led digital interactive programs for Toyota, Honda, and Lexus at major auto show floors — designing and executing immersive brand experiences that drove measurable lead capture and audience engagement.',
      'Served as digital agency of record for Sprite (Coca-Cola) North America; Sprite Step-Off event program delivered 50% increase in pre-event registration and 70% lead increase via custom iPad lead gen apps and 82″ touchscreen interactive experiences.',
    ],
  },
  {
    years: 'Oct 2007–Feb 2010',
    role: 'Management Supervisor, Client Service',
    company: 'AKQA · Irvine, CA',
    bullets: [
      'Led Kraft Foods account — the IMC planning voice across 11 brands and $100M+ in annual marketing budget; grew account from 1 brand to 11, quadrupling annual agency revenue year-over-year.',
      'Delivered bi-annual digital forecasting and IMC strategy presentations to Kraft senior management; maintained 40% agency profitability across the account.',
    ],
  },
]

const competencies = [
  {
    category: 'Demand Gen & ABM',
    items: [
      'Multi-channel pipeline strategy',
      'ABM (6sense / Demandbase)',
      'Intent-driven segmentation',
      'Lead scoring & MQL/SQL architecture',
      'Content syndication & nurture programs',
    ],
  },
  {
    category: 'Digital & Paid Media',
    items: [
      'LinkedIn Campaign Manager',
      'Google Ads / SEM (Search + Display)',
      'Paid retargeting & content syndication',
      'SEO/SEM strategy & optimization',
      'Website CRO & UX',
    ],
  },
  {
    category: 'Analytics & Tech Stack',
    items: [
      'Salesforce CRM',
      'Marketo / HubSpot (MAP)',
      '6sense / Demandbase (ABM + intent)',
      'Attribution & pipeline reporting',
      'AI-augmented marketing ops (23-prompt framework)',
    ],
  },
]

const impactRows = [
  { metric: '550% paid search recovery', context: 'Post-acquisition digital program rebuild — SEM, SEO, landing experience', company: 'BlackBerry' },
  { metric: '8:1 paid media ROI', context: '$2.3M annual paid media budget', company: 'BlackBerry' },
  { metric: '70%+ CAC reduction', context: 'Rebuilt demand gen program in <6 weeks (2–3 leads/wk → 20–30/wk)', company: 'Qwiet AI' },
  { metric: '344% inbound leads', context: 'Full GTM build from zero — 12 months to exit velocity', company: 'WethosAI' },
  { metric: '300% inbound MQLs', context: 'Single quarter via new social ad strategy + predictive audiences', company: 'Qwiet AI' },
  { metric: '8× ABM traction YoY', context: 'Enterprise/gov account-based programs with deal orchestration', company: 'BlackBerry' },
  { metric: '31% page conversion ↑', context: 'Post-rebuild cylance.com — 300+ pages, 40 resources, $1.3M project', company: 'Cylance' },
]

export default function ResumeClient() {
  return (
    <>
      {/* ── Resume header ─────────────────────────────────────────────── */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <Breadcrumb
            back={{ href: '/halcyon', label: 'Halcyon' }}
            current="Resume"
            accentColor="var(--ember-red)"
          />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-ash mb-3 leading-tight"
          >
            Saren Sakurai
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-ash/60 text-base mb-6"
          >
            VP, Demand Generation · Cybersecurity · AI-Augmented Pipeline Builder
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ash/50 font-mono"
          >
            <span>310.570.7585</span>
            <span>hello@saren.ai</span>
            <span>saren.ai</span>
            <span>Irvine, CA (Remote)</span>
          </motion.div>
        </div>
      </section>

      <HalcyonSubnav />

      {/* ── Profile ───────────────────────────────────────────────────── */}
      <section className="section border-b border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-4">Profile</p>
            <p className="text-charcoal dark:text-foreground leading-relaxed max-w-3xl">
              Demand generation leader with 20+ years in B2B marketing and a track record built specifically in AI-native
              cybersecurity. Architected the demand gen infrastructure at Cylance through its{' '}
              <span className="text-ember font-semibold">$1.4B acquisition by BlackBerry</span> — selling a technically
              sophisticated, AI-first endpoint security product to the same enterprise and government buyers Halcyon
              targets. Combines deep funnel architecture (Sirius Decisions / Forrester framework, ABM, intent-driven SEM)
              with an AI-augmented operating model that scales pipeline without scaling headcount. Consistent results
              across budget sizes and company stages:{' '}
              <span className="font-semibold text-charcoal dark:text-foreground">344% lead growth</span>,{' '}
              <span className="font-semibold text-charcoal dark:text-foreground">70%+ CAC reduction</span>,{' '}
              <span className="font-semibold text-charcoal dark:text-foreground">8:1 paid media ROI</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-narrow">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-10">Experience</p>

          <div className="space-y-14">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10"
              >
                {/* Left: date */}
                <div className="shrink-0">
                  <p className="text-xs font-mono text-slate dark:text-slate leading-relaxed">{job.years}</p>
                </div>

                {/* Right: content */}
                <div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-0.5">{job.role}</h3>
                  <p className="text-sm text-slate dark:text-slate italic mb-3">{job.company}</p>

                  {job.intro && (
                    <p className="text-sm text-slate dark:text-slate leading-relaxed mb-4">{job.intro}</p>
                  )}

                  {job.subsections ? (
                    <div className="space-y-5">
                      {job.subsections.map((sub, j) => (
                        <div key={j}>
                          <p className="text-sm font-semibold text-charcoal dark:text-foreground mb-2">{sub.name}</p>
                          <ul className="space-y-1.5">
                            {sub.bullets.map((b, k) => (
                              <li key={k} className="flex gap-2.5 text-sm text-slate dark:text-slate leading-relaxed">
                                <span className="text-ember shrink-0 mt-0.5">—</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : job.bullets ? (
                    <ul className="space-y-1.5">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2.5 text-sm text-slate dark:text-slate leading-relaxed">
                          <span className="text-ember shrink-0 mt-0.5">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Competencies ─────────────────────────────────────────── */}
      <section className="section bg-ash dark:bg-background border-t border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-8">Core Competencies</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {competencies.map((col, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="text-xs font-semibold tracking-wide uppercase text-ember mb-3">{col.category}</p>
                  <ul className="space-y-1.5">
                    {col.items.map((item, j) => (
                      <li key={j} className="text-sm text-slate dark:text-slate flex gap-2">
                        <span className="text-charcoal/30 dark:text-white/20 shrink-0">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Snapshot ───────────────────────────────────────────── */}
      <section className="section border-t border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-8">Impact Snapshot</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal/10 dark:border-white/10">
                    <th className="text-left text-xs font-semibold tracking-wide uppercase text-slate dark:text-slate pb-3 pr-8">Metric</th>
                    <th className="text-left text-xs font-semibold tracking-wide uppercase text-slate dark:text-slate pb-3 pr-8">Context</th>
                    <th className="text-left text-xs font-semibold tracking-wide uppercase text-slate dark:text-slate pb-3">Company</th>
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
                      <td className="py-3 pr-8 font-mono font-semibold text-charcoal dark:text-foreground whitespace-nowrap">{row.metric}</td>
                      <td className="py-3 pr-8 text-slate dark:text-slate leading-relaxed">{row.context}</td>
                      <td className="py-3 text-slate dark:text-slate whitespace-nowrap">{row.company}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────────────── */}
      <section className="section bg-ash dark:bg-background border-t border-charcoal/10 dark:border-white/10">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate">Education</p>
            <div>
              <p className="font-bold text-charcoal dark:text-foreground">Sarah Lawrence College</p>
              <p className="text-sm text-slate dark:text-slate">BA, Liberal Arts (Creative Writing)</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ash mb-3">
              Ready to build Halcyon&apos;s demand engine.
            </h2>
            <p className="text-ash/50 text-sm mb-8 font-mono">hello@saren.ai · 310.570.7585</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:hello@saren.ai" className="btn-primary">
                Email Saren
              </a>
              <Link
                href="/halcyon"
                className="btn-secondary-dark"
              >
                ← Back to Halcyon
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
