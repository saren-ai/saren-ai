"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FAQ from '@/components/ui/FAQ';

export default function AIOrchestrationClient() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-lavender mb-4"
          >
            AI Orchestration
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-3xl"
          >
            Machines handle scale.{' '}
            <span className="text-gradient">Humans handle meaning.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl leading-relaxed mb-10"
          >
            Orchestration is the practice of designing AI systems where the machine handles every task it&apos;s better at — and hands off to a human at every moment where judgment, empathy, or meaning matters. Not AI that replaces you. AI that makes your decisions count more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/signal-state" className="btn-primary">
              See Signal-State in action <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
            <Link href="/contact" className="btn-secondary-dark">
              Book a strategy call
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Human in the Loop ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-14"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-ember mb-4">The Principle</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Every AI system I build has a human review gate.
            </h2>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Machines that operate without review don&apos;t fail loudly — they fail slowly and quietly. A miscalibrated scoring model routes the wrong leads for months before anyone notices. An automated outreach sequence sends the wrong message to the wrong person a thousand times before a human sees the pattern.
            </p>
            <p className="text-foreground-muted text-lg leading-relaxed mt-4">
              Orchestration means building the loop. The AI moves fast. The human moves purposefully. The system compounds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                phase: 'Signal Detection',
                machine: 'Scans six platforms every 4 hours. Scores every signal on recency, explicitness, and persona fit.',
                human: 'Reviews flagged signals above a score threshold. Decides which ones are worth acting on.',
                color: 'text-lavender',
                accent: 'border-lavender/20 bg-lavender/5',
              },
              {
                phase: 'Message Drafting',
                machine: 'Generates resonant outreach using the Mirror → Recognize → Offer → Permission architecture.',
                human: 'Reviews the emotional read and frame. Approves or adjusts before send.',
                color: 'text-ember',
                accent: 'border-ember/20 bg-ember/5',
              },
              {
                phase: 'Lead Scoring',
                machine: 'Weights behavioral signals — page depth, return visits, content type, timing — in real time.',
                human: 'Sets the scoring rules. Reviews edge cases. Retrains the model when results diverge.',
                color: 'text-copper',
                accent: 'border-copper/20 bg-copper/5',
              },
              {
                phase: 'Campaign Optimization',
                machine: 'Reallocates spend across channels based on conversion velocity.',
                human: 'Sets guardrails. Interprets anomalies. Decides when a trend is a signal vs. noise.',
                color: 'text-lavender',
                accent: 'border-lavender/20 bg-lavender/5',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`card border rounded-xl p-6 ${item.accent}`}
              >
                <p className={`text-[10px] font-semibold tracking-widest uppercase mb-3 ${item.color}`}>
                  {item.phase}
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Machine</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{item.machine}</p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Human</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{item.human}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signal-State as Proof ─────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
          >
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mb-4">
                Proof of concept
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Signal-State is what orchestration looks like in practice.
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-4">
                Signal-State is a framework for detecting expressed pain signals across public platforms — then responding with outreach that feels human because it references what the prospect actually said, not just what they match in a firmographic filter.
              </p>
              <p className="text-foreground-muted leading-relaxed mb-4">
                The agents do the searching, scoring, and drafting. Every touchpoint passes through a human review gate before it reaches a real person. The machine finds the signal. The human decides if it&apos;s real. The machine scales the delivery. The human reads the thread.
              </p>
              <p className="text-foreground-muted leading-relaxed mb-8">
                That&apos;s orchestration. Not automation. Not AI replacing judgment — AI giving judgment more signal to work with.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/signal-state" className="btn-primary">
                  Explore Signal-State →
                </Link>
                <Link href="/signal-state/architecture" className="btn-secondary-dark">
                  See the architecture
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { step: '01 — Scan', label: 'Agents scan six platforms', detail: 'Reddit, LinkedIn, Twitter/X, Glassdoor, G2, Upwork — every 4 hours, looking for expressed pain that matches a signal library.' },
                { step: '02 — Score', label: 'Signal scored for fit', detail: 'Recency, explicitness, persona match. Signals above threshold are flagged for human review — not auto-fired.' },
                { step: '03 — Empathize', label: 'Emotional brief generated', detail: 'What was said. What was felt. Why it was said publicly. What a response needs to feel like to land.' },
                { step: '04 — Review gate', label: 'Human approves or passes', detail: 'The human reviews the emotional read and drafted message. This is the moment orchestration separates from automation.' },
                { step: '05 — Respond', label: 'Resonant outreach sent', detail: 'Mirror → Recognize → Offer → Permission. References what they said, not what their job title implies.' },
                { step: '06 — Handoff', label: 'Signal dossier to sales', detail: 'Original post, emotional read, outreach trail, landing page engagement. The rep opens with the moment, not "tell me about yourself."' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 p-4 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
                >
                  <div className="shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono font-semibold text-[var(--ss-teal-text)]">{item.step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ash mb-1">{item.label}</p>
                    <p className="text-xs text-foreground-muted leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What I Build ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-ember mb-4">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">What I actually build</h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Every orchestration engagement starts with a clear handoff map — where the machine takes over, and where the human must stay in the loop.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                area: 'Signal Intelligence',
                description: 'Multi-platform agent pipelines that detect expressed intent signals in real time. Scored, prioritized, and surfaced — not dumped in a spreadsheet.',
                proofs: [
                  { label: 'Signal-State Framework', href: '/signal-state/framework' },
                  { label: 'Signal Library', href: '/signal-state/signal-library' },
                ],
                color: 'text-lavender',
                accent: 'border-lavender/30',
              },
              {
                area: 'Behavioral Scoring',
                description: 'Lead scoring models built on buyer motion — engagement depth, content type, timing patterns — not job title and company size.',
                proofs: [
                  { label: 'Behavioral Lead Scoring', href: '/playbooks/hybrid-lead-scoring' },
                  { label: 'Intent Data Intelligence', href: '/case-studies/intent-data' },
                ],
                color: 'text-copper',
                accent: 'border-copper/30',
              },
              {
                area: 'Agentic Outreach',
                description: 'Outreach pipelines that draft resonant messages from signal context — and always route through a human review gate before touching a real person.',
                proofs: [
                  { label: 'Signal-State Architecture', href: '/signal-state/architecture' },
                  { label: '10-Touch Sales Play', href: '/case-studies/10-touch-sales-play' },
                ],
                color: 'text-ember',
                accent: 'border-ember/30',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`card rounded-xl p-6 border ${item.accent}`}
              >
                <p className={`text-[10px] font-semibold tracking-widest uppercase mb-3 ${item.color}`}>
                  {item.area}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed mb-5">
                  {item.description}
                </p>
                <div className="space-y-2 pt-4 border-t border-border">
                  {item.proofs.map((proof) => (
                    <Link
                      key={proof.href}
                      href={proof.href}
                      className={`flex items-center gap-1.5 text-xs font-medium hover:opacity-80 transition-opacity ${item.color}`}
                    >
                      {proof.label} →
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Automation vs Orchestration table ───────────────────────────── */}
      <section className="section bg-charcoal dark:bg-offblack text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-lavender mb-4">The distinction</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Automation vs. Orchestration</h2>
            <p className="text-foreground-muted text-lg">Most teams reach for automation. That&apos;s the wrong frame.</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-semibold tracking-widest uppercase text-slate w-36">Dimension</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold tracking-widest uppercase text-slate">Automation</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold tracking-widest uppercase text-lavender">Orchestration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: 'Goal', auto: 'Remove humans from the loop to save time', orch: 'Keep humans in the loop at the moments that matter' },
                  { dim: 'Failure mode', auto: 'Runs wrong at scale. Nobody notices until damage is done.', orch: 'Human review catches drift before it compounds.' },
                  { dim: 'Output', auto: 'Volume. Emails sent, touches made, leads scored.', orch: 'Signal. Which contacts deserve human attention, and why.' },
                  { dim: 'What AI does', auto: 'Executes tasks end-to-end without oversight', orch: 'Surfaces, scores, drafts — then hands off' },
                  { dim: 'What humans do', auto: 'Build the workflow once, then review outcomes quarterly', orch: 'Set strategy, staff the review gates, decide edge cases' },
                  { dim: 'Result', auto: 'Efficient operations that can\'t read the room', orch: 'Fast execution that still sounds like a human sent it' },
                ].map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-[rgba(255,255,255,0.08)]"
                  >
                    <td className="py-4 px-5 text-xs font-semibold text-slate uppercase tracking-wider">{row.dim}</td>
                    <td className="py-4 px-5 text-sm text-foreground-muted leading-relaxed">{row.auto}</td>
                    <td className="py-4 px-5 text-sm text-ash leading-relaxed">{row.orch}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="AI Orchestration FAQ"
        description="Clear operational details on designing high-leverage human-in-the-loop AI systems."
        items={[
          {
            question: "Can I just automate all of my outbound marketing with AI agents?",
            answer: "Sure, if you want your brand to sound like a generic spambot and systematically alienate every high-value prospect in your pipeline. AI orchestration is about using machines for high-scale scanning and drafting, while keeping humans at critical review gates to inject actual judgment and empathy before anything touches a client."
          },
          {
            question: "Why is a human review gate necessary in AI operations?",
            answer: "Because LLMs are excellent at hallucinating confidently and will happily email the wrong pitch to your top enterprise prospect without blinking. A human review gate catches context failures, ensuring you don't scale embarrassing GTM mistakes at the speed of light."
          },
          {
            question: "How does AI orchestration prevent systems from failing quietly?",
            answer: "It flags anomalies, scoring drifts, and edge cases to human operators rather than letting a broken automation run unchecked for three quarters. When an AI system operates without a human loop, a miscalibrated scoring model can route worthless leads to sales for months before anyone notices the pipeline is dry."
          }
        ]}
      />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-5"
          >
            Build AI systems that serve your judgment — not bypass it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-foreground-muted text-lg max-w-xl mx-auto mb-8"
          >
            If you&apos;re building a signal-based pipeline, a scoring model, or an agentic outreach system — let&apos;s design the human review gates before we automate anything.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary">
              Book a call →
            </Link>
            <Link href="/signal-state" className="btn-secondary-dark">
              Explore Signal-State
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
