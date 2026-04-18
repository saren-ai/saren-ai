'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import HalcyonSubnav from '@/components/halcyon/HalcyonSubnav'

interface FaqItem {
  q: string
  a: React.ReactNode
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: '"He\'s been a fractional CMO consultant. Can he own full P&L?"',
    a: (
      <div className="space-y-3 text-sm leading-relaxed text-slate dark:text-slate">
        <p>Yes — and the evidence comes from his operational history, not his title.</p>
        <p>
          At Cylance, Saren owned a <strong className="text-charcoal dark:text-foreground">$2.5M annual paid media budget</strong> with
          an 8:1 ROI expectation. He didn&apos;t advise on that budget — he controlled it,
          allocated it across channels and regions, reported on its performance, and was
          accountable when it didn&apos;t deliver. The $4M quarterly pipeline he generated
          wasn&apos;t a consulting deliverable. It was a number he was on the hook for.
        </p>
        <p>
          At BlackBerry post-acquisition, that accountability scaled: he managed{' '}
          <strong className="text-charcoal dark:text-foreground">$2.3M in corporate paid media</strong> and
          reported directly to the CMO with quarterly board presentations.
        </p>
        <p>
          His WethosAI work follows the same pattern. He built the entire go-to-market
          function from scratch, owned the pipeline and conversion metrics, and drove 344%
          inbound lead growth. The deliverable wasn&apos;t a strategy deck. It was a
          functioning demand gen engine with measurable outputs.
        </p>
        <p className="text-charcoal dark:text-foreground font-medium">
          The fractional structure describes how he was contracted. It doesn&apos;t describe
          the scope or accountability of what he owned. Those two things are different.
        </p>
      </div>
    ),
  },
  {
    q: '"Has he led teams at scale? We need a leader who can build and manage."',
    a: (
      <div className="space-y-3 text-sm leading-relaxed text-slate dark:text-slate">
        <p>He&apos;s built and managed demand gen teams across multiple configurations and scales.</p>
        <p>
          At <strong className="text-charcoal dark:text-foreground">Cylance</strong>, he established a
          five-member global demand center spanning five regions — a distributed team responsible
          for content production, digital campaign execution, and demand gen across North America,
          EMEA, and APAC.
        </p>
        <p>
          At <strong className="text-charcoal dark:text-foreground">BlackBerry</strong>, he operated within
          a 40-person mix of internal staff and agency resources, managing the paid media team as
          part of the broader corporate marketing function.
        </p>
        <p>
          Earlier at <strong className="text-charcoal dark:text-foreground">Perficient Digital</strong>,
          he ran client service and execution teams of up to 25 members, overseeing projects across
          accounts including Palo Alto Networks.
        </p>
        <p>
          His 90-day plan includes an explicit org structure deliverable — team composition, span
          of control, and hiring plan — because team design isn&apos;t an afterthought. It&apos;s
          part of the infrastructure he builds first.
        </p>
      </div>
    ),
  },
  {
    q: '"Why would he leave fractional work for an FTE role? Isn\'t this a step down?"',
    a: (
      <div className="space-y-3 text-sm leading-relaxed text-slate dark:text-slate">
        <p>It&apos;s not a step down — it&apos;s a different optimization.</p>
        <p>
          Fractional work optimizes for variety, flexibility, and breadth. A VP role at
          Halcyon optimizes for depth, ownership, and upside. The signals here suggest the
          conditions are right:
        </p>
        <ul className="space-y-2 pl-4">
          <li className="flex gap-2">
            <span className="text-ember shrink-0 mt-0.5">—</span>
            <span>
              <strong className="text-charcoal dark:text-foreground">Market timing:</strong> The
              appointment of Scott Stout as President three weeks ago signals Halcyon is entering
              serious GTM scaling. A VP DG hired into this moment is building — not maintaining.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-ember shrink-0 mt-0.5">—</span>
            <span>
              <strong className="text-charcoal dark:text-foreground">Business trajectory:</strong> At
              ~$79.5M ARR with $249M raised, a $1B valuation, a Dell distribution partnership,
              and three consecutive Fortune Cyber 60 appearances, Halcyon is on a defined exit
              path. The equity conversation for a VP-level hire at this stage is real.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-ember shrink-0 mt-0.5">—</span>
            <span>
              <strong className="text-charcoal dark:text-foreground">Category expertise:</strong>{' '}
              Saren built demand gen at Cylance — an AI-native cybersecurity company that exited
              for $1.4B. Returning to that context isn&apos;t a pivot. It&apos;s a homecoming.
            </span>
          </li>
        </ul>
        <p>
          Fractional work doesn&apos;t offer what Halcyon offers: the chance to build a demand
          gen engine for a company he understands, in a market he&apos;s operated in, at a stage
          where the outcome is genuinely meaningful.
        </p>
      </div>
    ),
  },
  {
    q: '"How does his experience in enterprise/government apply to our current buyers?"',
    a: (
      <div className="space-y-3 text-sm leading-relaxed text-slate dark:text-slate">
        <p>More directly than almost any other candidate you&apos;ll consider.</p>
        <p>
          Halcyon&apos;s primary buyer is a CISO or VP of Security at a 500–10,000-person
          company in manufacturing, healthcare, or government — someone under board pressure
          to demonstrate ransomware resilience, who already has an EDR deployed, and who is
          psychologically resistant to adding another security vendor.
        </p>
        <p>
          Saren built demand gen for Cylance against nearly that exact profile. Cylance sold
          AI-native endpoint security to enterprise and government buyers who had incumbent
          tools, skeptical procurement teams, and long multi-stakeholder decision cycles.
          The objection wasn&apos;t &quot;we don&apos;t have a security budget&quot; — it
          was &quot;we already have a solution.&quot; Navigating that objection in the market
          is exactly what his Cylance demand gen programs were designed to do.
        </p>
        <p>
          He also built the <strong className="text-charcoal dark:text-foreground">Sovereign Buyer
          Persona framework</strong> — a three-persona architecture mapping the Minister (political
          authority), the Architect (technical authority), and the Operator (implementation owner)
          across 16-month deal cycles. That&apos;s the kind of buyer mapping Halcyon&apos;s sales
          team needs to crack government and regulated-industry accounts, including the Federal
          Practice launched in August 2025.
        </p>
        <p className="text-charcoal dark:text-foreground font-medium">
          The buyer overlap isn&apos;t approximate. It&apos;s specific.
        </p>
      </div>
    ),
  },
  {
    q: '"What\'s his track record with paid media and demand gen performance?"',
    a: (
      <div className="space-y-4 text-sm leading-relaxed text-slate dark:text-slate">
        <p>The numbers are well-documented and span multiple companies:</p>
        <div className="border border-charcoal/10 dark:border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-charcoal/5 dark:bg-white/5">
                <th className="text-left p-3 font-semibold text-charcoal dark:text-foreground">Metric</th>
                <th className="text-left p-3 font-semibold text-charcoal dark:text-foreground">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/8 dark:divide-white/8">
              {[
                ['550% YoY pipeline growth', 'BlackBerry — intent-driven SEM + ABM'],
                ['70%+ CAC reduction', 'Qwiet AI — rebuilt demand gen in 6 weeks'],
                ['8:1 ROI on paid media', 'Cylance — $4M quarterly pipeline on $2.5M annual budget'],
                ['344% inbound lead growth', 'WethosAI — full GTM build from scratch'],
                ['300% LinkedIn lead increase', 'Qwiet AI — single quarter, restructured social strategy'],
                ['$4M quarterly pipeline', 'Cylance — fully automated digital channels'],
                ['+28% demo-to-opportunity', 'WethosAI — narrative and mid-funnel content alignment'],
                ['8× ABM traction YoY', 'BlackBerry — account-based marketing program'],
              ].map(([metric, context]) => (
                <tr key={metric}>
                  <td className="p-3 font-semibold text-charcoal dark:text-foreground">{metric}</td>
                  <td className="p-3">{context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          These aren&apos;t isolated wins. The pattern repeats across cybersecurity, SaaS, and AI
          categories, at different budget scales, at different company stages. That consistency is
          the signal worth paying attention to.
        </p>
        <p>
          His approach isn&apos;t channel-specific — it&apos;s infrastructure-first. He builds
          the scoring models, attribution frameworks, and nurture architecture before optimizing
          individual campaigns. That&apos;s why the results compound rather than spike and decay.
        </p>
      </div>
    ),
  },
  {
    q: '"Has he worked in cybersecurity before? How well does he know the market?"',
    a: (
      <div className="space-y-3 text-sm leading-relaxed text-slate dark:text-slate">
        <p>
          Three-plus years at Cylance and two-plus years at BlackBerry.{' '}
          <strong className="text-charcoal dark:text-foreground">This is his home market.</strong>
        </p>
        <p>
          At Cylance, he was selling AI-native behavioral endpoint security to enterprise and
          government buyers — understanding the buyer&apos;s threat language, procurement cycles,
          and competitive positioning against CrowdStrike and SentinelOne predecessors.
        </p>
        <p>
          At BlackBerry post-Cylance-acquisition, he managed global digital marketing for what was
          then the world&apos;s largest AI cybersecurity software firm, running campaigns across
          five regions in seven languages.
        </p>
        <p>
          Cybersecurity demand gen is distinct from general B2B SaaS in two ways that matter:
          buyers are technically sophisticated and allergic to vendor noise, and the product being
          sold is often invisible until it fails. That combination demands a demand gen leader who
          can build credibility-first, education-led programs rather than traditional awareness
          campaigns. Saren has done exactly that — and the &quot;Ransomware Gap&quot; messaging
          architecture he&apos;d build at Halcyon is a direct extension of the same playbook.
        </p>
      </div>
    ),
  },
  {
    q: '"What would his first 90 days look like? How do we know he\'ll deliver?"',
    a: (
      <div className="space-y-4 text-sm leading-relaxed text-slate dark:text-slate">
        <div>
          <p className="font-semibold text-charcoal dark:text-foreground mb-2">Days 1–30: Discovery and diagnosis</p>
          <p>
            Stakeholder interviews across sales, product, CS, finance, and the Federal Practice
            team. Full audit of demand gen infrastructure — Marketo, 6sense, SFDC, attribution
            model, lead scoring — including the Dell Trusted Workspace channel, which represents
            a new buyer journey that differs substantially from the CISO-direct enterprise motion.
          </p>
          <p className="mt-2 text-copper dark:text-copper font-medium">
            Deliverable: &quot;State of Halcyon Demand Gen&quot; report — ranked gaps, immediate priorities, 6-month roadmap.
          </p>
        </div>
        <div>
          <p className="font-semibold text-charcoal dark:text-foreground mb-2">Days 31–60: Quick wins and infrastructure</p>
          <p>
            First demand gen initiative launched — ABM play or &quot;Ransomware Gap&quot; webinar
            targeting the CISO persona. Lead scoring model live with sales-validated MQL/SQL
            thresholds. Dell channel buyer journey architected separately from the enterprise motion.
          </p>
          <p className="mt-2 text-copper dark:text-copper font-medium">
            Deliverable: Scoring model live, first campaign results with pipeline attribution, paid media strategy documented.
          </p>
        </div>
        <div>
          <p className="font-semibold text-charcoal dark:text-foreground mb-2">Days 61–90: Team and systems scaling</p>
          <p>
            6sense intent signal audit — account tiering, intent topic prioritization, campaign
            trigger logic configured for the ransomware buyer. Federal Practice demand gen playbook.
            Org structure proposal with hiring plan.
          </p>
          <p className="mt-2 text-copper dark:text-copper font-medium">
            Deliverable: Org structure with open requisitions. 12-month financial model. Board-ready pipeline reporting live.
          </p>
        </div>
        <p>
          This isn&apos;t a speculative plan. It&apos;s the observable sequence from his prior
          engagements at Cylance, Qwiet AI, and WethosAI — compressed and adapted for
          Halcyon&apos;s stage and context.
        </p>
      </div>
    ),
  },
  {
    q: '"Is there a risk he\'ll want to go back to consulting after a year?"',
    a: (
      <div className="space-y-3 text-sm leading-relaxed text-slate dark:text-slate">
        <p>Every VP-level hire carries retention risk. The question is whether the specific conditions that drive retention are present.</p>
        <p>
          For Saren, the conditions that would pull him back to consulting — variety, autonomy,
          flexibility — are largely present in a VP role at a company operating like Halcyon.
          VP DG at a growth-stage cybersecurity company is not a process management job.
          It&apos;s a build-from-scratch role with high autonomy, high visibility, and high
          accountability.
        </p>
        <p>
          More specifically: the Halcyon equity story is not abstract. A company at ~$79.5M ARR
          with $249M raised ($100M Series C at $1B valuation, led by Evolution Equity Partners
          with Bain Capital) and a distribution partnership with Dell is on a defined path. A
          VP-level equity grant at this stage, with a 3–4 year vest, creates material retention
          alignment that fractional work structurally cannot replicate.
        </p>
        <p className="text-charcoal dark:text-foreground font-medium">
          His deepest expertise is cybersecurity demand gen. Halcyon is the most compelling
          application of that expertise available in the market right now. Walking away after
          a year would mean leaving the best possible use of his skills. That&apos;s a weak
          retention risk, not a strong one.
        </p>
      </div>
    ),
  },
  {
    q: '"How does his AI-augmented demand gen approach fit our current stack?"',
    a: (
      <div className="space-y-3 text-sm leading-relaxed text-slate dark:text-slate">
        <p>
          Halcyon&apos;s confirmed tech stack — Marketo, HubSpot, 6sense, Salesforce,
          Google/LinkedIn paid — matches Saren&apos;s exact operating environment.
        </p>
        <p>
          His AI-augmented approach doesn&apos;t require replacing that infrastructure.
          The 23-prompt AI marketing framework he built operates <em>on top of</em> existing
          CRM and automation systems to accelerate content production, persona development,
          messaging architecture, and campaign configuration.
        </p>
        <p>
          On 6sense specifically: Halcyon already has the right tooling for ABM. The missing
          ingredient is a VP who knows how to configure intent signal prioritization, account
          tiering, and campaign trigger logic for the security buyer. Saren has done this — the
          8× YoY ABM traction at BlackBerry was built on this exact kind of configuration work.
          That&apos;s a specific skill, not a general ABM familiarity.
        </p>
        <p>
          Practically: a demand gen function that would typically require a team of 8–10 to
          produce consistent content, campaign execution, and performance analysis can operate
          effectively with 4–5 people when the content and analysis layers are AI-augmented.
          For Halcyon, in a funding environment where efficiency ratios matter, that&apos;s a
          meaningful structural advantage.
        </p>
      </div>
    ),
  },
  {
    q: '"What would you ask him if you were on the hiring committee?"',
    a: (
      <div className="space-y-4 text-sm leading-relaxed text-slate dark:text-slate">
        <p>These are the questions that surface his actual thinking:</p>
        <ol className="space-y-4">
          {[
            {
              num: '1',
              q: '"Walk me through the last time your pipeline number was wrong. What happened and what did you change?"',
              note: 'Surfaces whether he owns outcomes or explains them away.',
            },
            {
              num: '2',
              q: '"What\'s your read on Halcyon\'s current positioning in the market? Where is the message landing and where is it falling short?"',
              note: 'Tests pre-work and willingness to be direct. Candidates who haven\'t done the research can\'t answer this.',
            },
            {
              num: '3',
              q: '"How would you structure a demand gen team of five people for Halcyon 18 months from now? What roles, in what order, and why?"',
              note: 'An operational intelligence test. The answer reveals whether he thinks in systems or in individual hires.',
            },
            {
              num: '4',
              q: '"Describe the worst-performing campaign you\'ve ever run. What was the diagnosis?"',
              note: 'Accountability and analytical honesty — not just wins.',
            },
            {
              num: '5',
              q: '"6sense is already in your stack. How would you use it differently than it\'s probably being used today?"',
              note: 'Tests whether ABM knowledge is real or performative. He should have a specific, technical answer about intent signal configuration and account tiering.',
            },
            {
              num: '6',
              q: '"What does Halcyon\'s demand gen need to look like in 36 months for a board to say marketing delivered?"',
              note: 'Tests ability to think in outcomes, not activities. The answer should include pipeline metrics, CAC trajectory, and category positioning.',
            },
          ].map((item) => (
            <li key={item.num} className="flex gap-4">
              <span className="shrink-0 font-mono text-xs font-bold text-lavender dark:text-lavender mt-1 w-4">
                {item.num}.
              </span>
              <div>
                <p className="font-medium text-charcoal dark:text-foreground mb-1">{item.q}</p>
                <p className="text-xs text-slate dark:text-slate italic">{item.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
]

function AccordionItem({ item, index, isOpen, onToggle }: {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-charcoal/10 dark:border-white/10"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 font-mono text-xs font-bold text-slate dark:text-slate mt-1 w-6">
            Q{index + 1}
          </span>
          <span className="font-semibold text-charcoal dark:text-foreground text-sm md:text-base leading-snug group-hover:text-lavender dark:group-hover:text-lavender transition-colors">
            {item.q}
          </span>
        </div>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-slate dark:text-slate transition-transform duration-200 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-9">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <>
      {/* Page header */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Breadcrumb
              back={{ href: '/halcyon', label: 'Halcyon' }}
              current="FAQ"
              accentColor="var(--ember-red)"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-ash mb-5 max-w-2xl leading-tight">
              10 questions.{' '}
              <span className="text-gradient">10 direct answers.</span>
            </h1>
            <p className="text-ash/70 text-lg max-w-xl">
              Prepared for the Halcyon AI hiring committee — Kelly Fiedler, Jon Miller,
              Scott Stout, Jeff St. Clair, and Nicholas Warner.
            </p>
          </motion.div>
        </div>
      </section>

      <HalcyonSubnav />

      {/* FAQ accordion */}
      <section className="section">
        <div className="container-narrow max-w-3xl">
          <div className="border-t border-charcoal/10 dark:border-white/10">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-slate dark:text-slate mb-8">
            Ask them directly — or explore the interactive tools that show the frameworks
            Saren would bring to Halcyon on day one.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:saren.sakurai@gmail.com" className="btn-primary">
              Email Saren
            </a>
            <Link href="/halcyon/lead-scoring" className="btn-secondary">
              See the lead scoring model →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
