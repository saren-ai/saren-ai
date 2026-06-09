'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import HalcyonSubnav from '@/components/halcyon/HalcyonSubnav'

// ── Hooks ──────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, isInView] as const
}

function useCountUp(target: number, isVisible: boolean, duration = 1400) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let animFrame: number
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) animFrame = requestAnimationFrame(tick)
    }
    animFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrame)
  }, [isVisible, target, duration])
  return count
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ProgressBar({ value, isVisible, label }: { value: number; isVisible: boolean; label: string }) {
  return (
    <div
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="w-full h-0.5 bg-charcoal/10 dark:bg-white/10 rounded-full overflow-hidden"
    >
      <div
        className="h-full bg-ember rounded-full"
        style={{
          width: isVisible ? `${value}%` : '0%',
          transition: isVisible ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1) 0.15s' : 'none',
        }}
      />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mb-3">
      {children}
    </p>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────

const proofOfWork = [
  {
    tag: 'Buyer Intelligence',
    headline: 'Intent Activity Matrix',
    body: 'Ransomware intent signals mapped across an 18-month buying timeline — 6 intent topics from general awareness to Halcyon brand research, with per-vertical intensity filters (Healthcare, Manufacturing, Government, Retail). Each cell surfaces example queries, deal value context, outreach strategy, and content recommendation.',
    href: '/halcyon/intent-matrix',
    cta: 'Explore intent signals →',
    label: '6sense configuration framework',
  },
  {
    tag: 'Content Strategy',
    headline: 'Full-Funnel Content Matrix',
    body: '4 buying personas × 4 buying stages. Every cell is a working content brief: recommended assets, success KPIs, why-at-this-stage rationale, instrumentation plan, content formats, and activation guidance. CISO, IT Security Lead, Infra/Ops, and CFO — each with a distinct content motion from Awareness through Selection.',
    href: '/halcyon/content-matrix',
    cta: 'View content strategy →',
    label: 'Day 1 planning artifact',
  },
  {
    tag: 'ICP Scoring',
    headline: 'Lead Scoring Calculator',
    body: "A working MQL/SQL scoring model built to Halcyon's ICP: Fit Score (company size, vertical, security stack, ransomware pressure, budget signals) + Engagement Score (6sense tier, website behavior, email, paid intent). Score any account and get an immediate pipeline tier recommendation with outreach guidance.",
    href: '/halcyon/lead-scoring',
    cta: 'Score an account →',
    label: 'Days 31–60 deliverable',
  },
]

const competencies = [
  {
    name: 'Enterprise cybersecurity demand gen',
    evidence:
      '3+ years at Cylance building the demand engine Jon Miller helped found; post-acquisition at BlackBerry managing global demand gen for the world\'s largest AI cybersecurity firm',
    fit: 100,
  },
  {
    name: 'ABM strategy & execution',
    evidence:
      '8× YoY ABM traction at BlackBerry against the same CISO buyer Halcyon targets; 6sense intent signal configuration and account tiering across manufacturing, healthcare, and government verticals',
    fit: 97,
  },
  {
    name: 'Paid digital acquisition',
    evidence:
      'Led $1M Cylance paid media budget generating $4M quarterly pipeline; 300% inbound MQL growth at Qwiet AI in a single quarter on a restructured spend model',
    fit: 100,
  },
  {
    name: 'Marketing tech stack (Marketo, 6sense, SFDC)',
    evidence:
      'Deployed Sirius Decisions demand gen framework at scale; built behavioral lead scoring system; Halcyon\'s confirmed stack matches Saren\'s operating environment exactly',
    fit: 92,
  },
  {
    name: 'Team leadership & P&L ownership',
    evidence:
      'Led 5-person global demand center at Cylance across 5 regions; managed $2.3M paid media budget at BlackBerry; reported to CMO with quarterly board presentations',
    fit: 88,
  },
  {
    name: 'AI-augmented marketing ops',
    evidence:
      'Built 23-prompt AI marketing framework operating on top of Marketo + 6sense; co-founded Onederous AI brand engine; scales a 5-person team to 10-person output',
    fit: 100,
  },
  {
    name: 'Pipeline analytics & attribution',
    evidence:
      'Real-time behavioral lead scoring (0–100 model); demo-to-opp conversion +28% at WethosAI through mid-funnel content architecture; board-ready pipeline reporting at BlackBerry',
    fit: 95,
  },
]

const uvpCards = [
  {
    tag: 'Unfair Advantage 01',
    headline: 'He already knows your buyer',
    body: "Cylance sold AI-native endpoint security to the same CISO at manufacturing, healthcare, and government organizations that Halcyon targets — the CISO who already has CrowdStrike and still can't sleep — with the same incumbent objection and the same 12–18 month deal cycle. Saren built the demand gen playbook for that exact conversation. He doesn't need a learning curve.",
  },
  {
    tag: 'Unfair Advantage 02',
    headline: 'AI-augmented, not headcount-dependent',
    body: "His 23-prompt AI marketing framework layers on top of Marketo and 6sense — the exact stack Halcyon runs. No waiting on ops to pull a report. No black-box vendor dashboards. Limitless analysis, in the moment. In a Series B environment where CAC efficiency matters as much as growth, a VP who can produce VP-level output with a lean team is worth more than a traditional hire who needs 15 FTEs to match it.",
  },
  {
    tag: 'Unfair Advantage 03',
    headline: 'Pattern recognition across 10+ GTMs',
    body: "Fractional CMO work isn't a liability — it's a force multiplier. He's diagnosed and rebuilt demand gen engines across cybersecurity, SaaS, and AI categories. He'll identify Halcyon's infrastructure gaps — and the Dell distribution channel's new buyer journey requirements — in weeks, not quarters.",
  },
  {
    tag: 'Unfair Advantage 04',
    headline: 'Board-ready from day one',
    body: "He reported to the CMO and presented quarterly to the BlackBerry Board of Directors. With Nicholas Warner — who grew SentinelOne from <$10M to $500M+ ARR after Cylance — on the Halcyon board, Saren's Cylance credential is directly legible to the person whose job is to validate whether Halcyon can execute that same trajectory.",
  },
]

const phases = [
  {
    num: '01',
    label: 'Discovery & diagnosis',
    days: 'Days 1–30',
    items: [
      'Stakeholder interviews: sales, product, CS, finance, and the Federal Practice team',
      'Full audit of demand gen infrastructure — Marketo, 6sense, SFDC, attribution model, lead scoring',
      'Dell Trusted Workspace channel analysis: map the new IT purchaser buyer journey vs. CISO-direct enterprise motion',
      'Competitive positioning review: CrowdStrike, SentinelOne, Microsoft Defender share-of-voice',
    ],
    deliverable: '"State of Halcyon Demand Gen" report — ranked gaps, quick wins, 6-month roadmap aligned to Scott Stout\'s GTM build-out mandate',
  },
  {
    num: '02',
    label: 'Quick wins & infrastructure',
    days: 'Days 31–60',
    items: [
      'Launch first ABM play or "Ransomware Gap" webinar targeting CISO persona in manufacturing/healthcare',
      'Build the Dell channel buyer journey — IT purchasers entering via Trusted Workspace need a distinct funnel from CISO-direct enterprise',
      'Implement lead scoring model with MQL/SQL thresholds validated against sales (Marketo + 6sense configuration)',
      '6-month content calendar: asset types, channels, buyer stage alignment mapped to Jeff St. Clair\'s pipeline targets',
    ],
    deliverable: 'Scoring model live. First campaign results with pipeline attribution. Dell channel demand gen architecture documented.',
  },
  {
    num: '03',
    label: 'Team & systems scaling',
    days: 'Days 61–90',
    items: [
      '6sense intent signal audit — configure account tiering, intent topic prioritization, and campaign trigger logic for the ransomware buyer',
      'Federal Practice demand gen playbook: Sovereign Buyer Persona framework adapted for government procurement cycles',
      'Org structure proposal with hiring plan and span-of-control recommendations',
      'KPI dashboards and weekly metrics cadence aligned to board reporting requirements',
    ],
    deliverable: 'Org structure with open requisitions filed. 12-month financial model with CAC, pipeline, and payback projections — so the CFO sees marketing\'s contribution in real numbers, not estimates. Board-ready pipeline reporting live for Kelly Fiedler.',
  },
]

const timelineEntries = [
  {
    years: '2023–Present',
    role: 'Fractional CMO & AI Ops',
    company: 'WethosAI / Qwiet AI / CloudKitchens',
    bullets: [
      '+344% inbound leads at WethosAI — full GTM built from zero; +28% demo-to-opp conversion',
      '5× lead increase at Qwiet AI in 6 weeks; 300% inbound MQL growth on restructured spend model',
      '70% Google Ads spend reduction with +30% conversion improvement at Qwiet AI',
    ],
  },
  {
    years: '2020–2023',
    role: 'Senior Director, Digital Marketing & Web',
    company: 'BlackBerry (post-Cylance acquisition)',
    bullets: [
      'Managed $2.3M global paid media across 5 regions, 7 languages — 8:1 ROI',
      '550% paid search recovery — rebuilt the inherited post-acquisition SEM program end to end',
      '8× YoY ABM traction against enterprise security accounts',
      'Quarterly board presentations — pipeline attribution, CAC, LTV',
    ],
  },
  {
    years: '2017–2020',
    role: 'Director, Demand Generation & Web',
    company: 'Cylance (acq. BlackBerry, $1.4B)',
    bullets: [
      '$4M quarterly pipeline on $1M annual paid media',
      '70%+ CAC reduction through intent-driven segmentation',
      'Built 5-person global demand center across North America, EMEA, APAC',
      '$1.3M website rebuild: 300+ pages, multi-lingual, global demand gen infrastructure',
    ],
  },
]

// ── Component ──────────────────────────────────────────────────────────────────

export default function HalcyonClient() {
  const [metricsRef, metricsVisible] = useInView(0.2)
  const [matrixRef, matrixVisible] = useInView(0.08)

  const count1 = useCountUp(550, metricsVisible)
  const count2 = useCountUp(70, metricsVisible)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-ash/50 mb-10"
          >
            <Link href="/" className="hover:text-ash/80 transition-colors">saren.ai</Link>
            <span>/</span>
            <span className="text-ash/80">Halcyon</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-14 items-start">
            {/* ── Left: main hero content ── */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-xs font-semibold tracking-widest uppercase text-ash/40 mb-5"
              >
                VP, Demand Generation · Reports to Kelly Fiedler, CMO · March 2026
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-ash mb-8 max-w-3xl leading-tight"
              >
                We did it once.<br />
                <span className="text-gradient">Let&apos;s do it again.</span>
              </motion.h1>

              <div className="space-y-5">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                  className="text-ash/80 text-lg leading-relaxed"
                >
                  At Cylance, Jon Miller wrote the AI engine that changed everything.
                  I built the demand generation infrastructure that scaled it —
                  selling AI-native security to enterprise and government buyers
                  against the same core objection Halcyon faces every day:{' '}
                  <span className="text-ash/95 italic">&ldquo;we already have an EDR.&rdquo;</span>
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.24 }}
                  className="text-ash/70 text-base leading-relaxed"
                >
                  That AI-first approach to endpoint security didn&apos;t just build a company —
                  it created a category. It created a{' '}
                  <span className="text-copper font-semibold">$1.4B exit</span>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.30 }}
                  className="text-ash/70 text-base leading-relaxed"
                >
                  Now Jon is at Halcyon, writing the next chapter with ransomware.
                  Same visionary technologist. Stronger narrative. Better timing.
                  Halcyon&apos;s encryption key capture and kernel protection aren&apos;t just features —
                  they&apos;re the kind of defensible IP that changes how an industry works.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.36 }}
                  className="text-ash/70 text-base leading-relaxed"
                >
                  I know exactly what it takes to move that kind of technology from greenfield
                  to $1B+ company in a crowded market.
                </motion.p>

                {/* Pull quote */}
                <motion.blockquote
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.42 }}
                  className="border-l-2 border-ember pl-5 py-1"
                >
                  <p className="text-ash/90 text-base italic leading-relaxed">
                    Demand gen in enterprise security isn&apos;t luck. It&apos;s pattern recognition.
                    It&apos;s understanding your buyer&apos;s fear. It&apos;s positioning that turns
                    technical advantage into revenue acceleration. It&apos;s the discipline to scale
                    without burning cash.
                  </p>
                </motion.blockquote>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.48 }}
                  className="text-ash/80 text-base leading-relaxed font-medium"
                >
                  On ramp time: I won&apos;t need one. My first 30 days would be diagnosis, not orientation.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.54 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <a href="#proof" className="btn-primary">
                  See the work →
                </a>
                <a
                  href="#matrix"
                  className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded bg-transparent border-2 border-ash/30 text-ash hover:bg-ash hover:text-charcoal transition-all duration-200"
                >
                  Capability fit
                </a>
              </motion.div>
            </div>

            {/* ── Right: resume card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:sticky lg:top-28"
            >
              <Link
                href="/halcyon/resume"
                className="group block bg-ash/6 border border-ash/15 rounded-xl p-5 hover:bg-ash/10 hover:border-ash/25 transition-all duration-200"
              >
                <p className="text-[10px] font-semibold tracking-widest uppercase text-ember mb-4">
                  Resume
                </p>

                <p className="font-bold text-ash text-base leading-tight mb-0.5">Saren Sakurai</p>
                <p className="text-ash/50 text-xs mb-5 leading-relaxed">
                  VP, Demand Generation<br />
                  Cybersecurity · AI-Augmented Pipeline
                </p>

                <div className="space-y-3 border-t border-ash/10 pt-4 mb-5">
                  {[
                    { stat: '$4M', label: 'Quarterly pipeline at Cylance' },
                    { stat: '8:1', label: 'Paid media ROI at BlackBerry' },
                    { stat: '20+', label: 'Years in B2B demand gen' },
                  ].map(({ stat, label }) => (
                    <div key={stat} className="flex items-baseline gap-2">
                      <span className="font-mono font-bold text-ash text-lg leading-none">{stat}</span>
                      <span className="text-ash/70 text-xs">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-lavender group-hover:text-ash transition-colors">
                  <span>View full resume</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section subnav (overview page only — sub-pages get it from layout) ── */}
      <HalcyonSubnav />

      {/* ── Proof metrics ─────────────────────────────────────────────── */}
      <section id="metrics" className="section bg-ash dark:bg-background" ref={metricsRef}>
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-charcoal/10 md:dark:divide-white/10">
            <div className="md:pr-12">
              <div className="metric-value">{metricsVisible ? count1 : 0}%</div>
              <div className="metric-label mt-2 mb-1">Paid search recovery</div>
              <p className="text-sm text-slate dark:text-slate">
                BlackBerry — rebuilt the underperforming post-acquisition SEM program end to end, targeting the same CISO buyer profile Halcyon sells to today
              </p>
            </div>
            <div className="md:px-12">
              <div className="metric-value">{metricsVisible ? count2 : 0}%</div>
              <div className="metric-label mt-2 mb-1">CAC reduction</div>
              <p className="text-sm text-slate dark:text-slate">
                Qwiet AI — rebuilt demand gen in 6 weeks by replacing mis-targeted spend with intent-driven behavioral segmentation
              </p>
            </div>
            <div className="md:pl-12">
              <div className="metric-value">8:1</div>
              <div className="metric-label mt-2 mb-1">ROI on paid media</div>
              <p className="text-sm text-slate dark:text-slate">
                BlackBerry — $2.3M annual paid media budget, selling AI-native security to the same enterprise buyer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof of work ─────────────────────────────────────────────── */}
      <section id="proof" className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionLabel>Proof of work</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-3">
              Built for Halcyon. Working today.
            </h2>
            <p className="text-slate dark:text-slate max-w-2xl leading-relaxed">
              These aren&apos;t slides. They&apos;re working tools — the kind of thinking
              I&apos;d ship in the first 60 days. Score an account against the ICP.
              Map intent signals across the buying timeline. Pull a full-funnel content brief
              for any persona at any stage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofOfWork.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="group flex flex-col h-full card p-6 hover:border-ember/30 transition-colors"
                >
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-ember mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-charcoal dark:text-foreground mb-3 group-hover:text-ember transition-colors">
                    {item.headline}
                  </h3>
                  <p className="text-slate dark:text-slate text-sm leading-relaxed flex-1 mb-5">
                    {item.body}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/8 dark:border-white/8">
                    <span className="text-xs text-slate dark:text-slate font-mono">
                      {item.label}
                    </span>
                    <span className="text-sm text-lavender group-hover:text-ember transition-colors font-medium">
                      {item.cta}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capability fit matrix ─────────────────────────────────────── */}
      <section id="matrix" className="section">
        <div className="container-narrow" ref={matrixRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionLabel>Capability fit</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-3">
              7 core VP competencies — mapped
            </h2>
            <p className="text-slate dark:text-slate max-w-2xl">
              Evidence-backed assessment against the specific demands of this role.
              Halcyon&apos;s confirmed stack (Marketo, 6sense, SFDC) matches Saren&apos;s
              exact operating environment.
            </p>
          </motion.div>

          <div className="space-y-0 border-t border-charcoal/10 dark:border-white/10">
            {competencies.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_200px_48px] gap-x-8 gap-y-3 items-center py-5 border-b border-charcoal/10 dark:border-white/10"
              >
                <div>
                  <p className="font-semibold text-charcoal dark:text-foreground text-sm mb-1">
                    {item.name}
                  </p>
                  <p className="text-slate dark:text-slate text-sm leading-relaxed">
                    {item.evidence}
                  </p>
                </div>
                <div>
                  <ProgressBar
                    value={item.fit}
                    isVisible={matrixVisible}
                    label={`${item.name}: ${item.fit}% fit`}
                  />
                </div>
                <p className="font-mono text-sm font-semibold text-slate dark:text-slate md:text-right">
                  {item.fit}%
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unfair advantages ─────────────────────────────────────────── */}
      <section id="uvp" className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionLabel>Why Saren specifically</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground">
              Four unfair advantages
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uvpCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card p-6"
              >
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-copper dark:text-copper mb-3">
                  {card.tag}
                </span>
                <h3 className="text-xl font-bold text-charcoal dark:text-foreground mb-3">
                  {card.headline}
                </h3>
                <p className="text-slate dark:text-slate text-sm leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 90-day plan ───────────────────────────────────────────────── */}
      <section id="plan" className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionLabel>90-day plan</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-3">
              What Saren does in the first 90 days
            </h2>
            <p className="text-slate dark:text-slate">
              Three phases. Named deliverables. No ramp-up theater.
              Built around the Federal Practice launch, the Dell distribution channel,
              and the GTM scaling mandate Scott Stout was hired to execute.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-charcoal/10 md:dark:divide-white/10">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${i > 0 ? 'md:pl-8' : ''} ${i < phases.length - 1 ? 'md:pr-8' : ''}`}
              >
                <span
                  className="font-mono font-bold text-7xl text-charcoal/8 dark:text-white/8 leading-none block mb-3"
                  aria-hidden="true"
                >
                  {phase.num}
                </span>
                <p className="text-xs font-semibold tracking-widest uppercase text-lavender dark:text-lavender mb-2">
                  {phase.days}
                </p>
                <h3 className="text-lg font-bold text-charcoal dark:text-foreground mb-4">
                  {phase.label}
                </h3>
                <ul className="space-y-2 mb-5">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-slate dark:text-slate leading-relaxed">
                      <span className="text-ember mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-ash dark:bg-background-secondary rounded-lg p-4 border border-charcoal/8 dark:border-white/8">
                  <p className="text-xs font-semibold tracking-wider uppercase text-copper dark:text-copper mb-1">
                    Deliverable
                  </p>
                  <p className="text-sm text-slate dark:text-slate leading-relaxed">
                    {phase.deliverable}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career timeline ───────────────────────────────────────────── */}
      <section id="background" className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionLabel>Track record</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground">
              Career credibility
            </h2>
          </motion.div>

          <div className="max-w-2xl">
            <ol className="relative" style={{ listStyle: 'none', padding: 0 }}>
              <div
                className="absolute left-[7px] top-2 bottom-2 w-px bg-charcoal/15 dark:bg-white/15"
                aria-hidden="true"
              />
              {timelineEntries.map((entry, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 pb-10 last:pb-0"
                >
                  <div
                    className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-ember border-2 border-ash dark:border-background"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-mono text-slate dark:text-slate mb-1">{entry.years}</p>
                  <p className="font-bold text-charcoal dark:text-foreground mb-0.5">{entry.company}</p>
                  <p className="text-sm italic text-slate dark:text-slate mb-3">{entry.role}</p>
                  <ul className="space-y-1">
                    {entry.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm text-slate dark:text-slate">
                        <span className="text-ember shrink-0 mt-0.5">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section id="contact" className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ash mb-4">
              Let&apos;s build Halcyon&apos;s demand engine.
            </h2>
            <p className="text-copper font-semibold text-lg mb-2">
              Kelly Fiedler · Jon Miller · Scott Stout — this is the hire.
            </p>
            <p className="text-ash/50 text-base mb-10">
              hello@saren.ai · Irvine, CA · Remote-ready
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:hello@saren.ai" className="btn-primary">
                Email Saren
              </a>
              <Link
                href="/"
                className="btn-secondary-dark"
              >
                Back to saren.ai
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
