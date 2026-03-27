'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const PSYCH_SECTIONS = [
  {
    number: '1',
    title: "Prochaska's Transtheoretical Model (Stages of Change)",
    body: "Originally developed for clinical behavior change (addiction, health). Applies directly to buyer psychology.",
    keyInsight:
      "Intent data catches Preparation. Signal-State catches Contemplation — one stage earlier, far less competitive, and psychologically more resonant because the person hasn't yet been saturated by vendor messages. Most marketing competes at the Preparation and Action stages. Signal-State operates at Contemplation — where almost no one else is.",
    table: [
      { stage: 'Precontemplation', state: 'Unaware', looks: "Doesn't know they have a problem", mktg: 'Not addressable' },
      { stage: 'Contemplation', state: 'Aware, unresolved', looks: 'Publicly naming the pain', mktg: 'Signal-State window', highlight: true },
      { stage: 'Preparation', state: 'Researching', looks: 'Searching for solutions', mktg: 'Intent data window' },
      { stage: 'Action', state: 'Deciding', looks: 'Evaluating vendors', mktg: 'Behavioral/conversion window' },
      { stage: 'Maintenance', state: 'Using', looks: 'Post-purchase', mktg: 'Retention/expansion window' },
    ],
  },
  {
    number: '2',
    title: 'Elaboration Likelihood Model (Petty & Cacioppo, 1986)',
    body: 'Two routes by which humans process persuasive messages. Broadcast advertising catches people in peripheral processing by design — they weren\'t thinking about your product, so they process it superficially.',
    keyInsight:
      "Signal-State marketing finds people who are already in central processing mode — they've been thinking about the problem, they just named it. When your message arrives in that state, it gets processed seriously. It lands differently because the receiver is already primed.",
  },
  {
    number: '3',
    title: 'Psychological Reactance (Brehm, 1966)',
    body: 'When people perceive their autonomy is being acted upon — when something is being pushed at them — they instinctively push back. This is the mechanism behind ad blindness, spam filter behavior, and unsubscribes.',
    keyInsight:
      "Signal-State outreach — done correctly — does not trigger reactance because it is structurally indistinguishable from someone paying attention. It's not marketing. It's a response to something real.",
  },
  {
    number: '4',
    title: 'The Personalization Paradox',
    body: 'People want to feel understood. They resist feeling surveilled. Demographic personalization triggers the surveillance response. It demonstrates data access, not understanding.',
    keyInsight:
      "Signal-based personalization triggers the recognition response. It demonstrates attention, not data. The difference isn't what you know about them. It's what you noticed about them. One is a mail merge. The other is a conversation that was already started — by them.",
  },
  {
    number: '5',
    title: 'Recognition-Primed Decision Making (Gary Klein)',
    body: 'Expert decision makers don\'t evaluate options analytically. They pattern-match situations to prior experience and act on recognized patterns.',
    keyInsight:
      "AI agents doing signal detection are performing RPD at scale. They are pattern-matching expressed human states against a library of known signal signatures — the catalogues. The output is not a lead score. It's a situation recognition: this person is in this state at this moment. That's a qualitatively different intelligence than a lead score.",
  },
  {
    number: '6',
    title: 'Weak Signal Theory (Ansoff, 1975)',
    body: 'Originally developed in strategic management and futures research. The premise: early indicators of significant change are detectable before they become obvious trends — but only if you\'re looking for them with the right frame.',
    keyInsight:
      "The signal catalogues in this framework are exactly that: libraries of weak signals. A single Reddit post is a weak signal. Hundreds of them, clustered, form a strong pattern. AI agents make weak signal aggregation economically viable for the first time.",
  },
]

const SIGNAL_TYPES = [
  {
    type: 'Passive Signal',
    description: 'Structural indicators inferrable from profile or role',
    example: 'Solo creative director, 18 months independent',
    receptivity: 'Low — inferred, not expressed',
  },
  {
    type: 'Active Signal',
    description: 'Behavioral indicators from content consumption or search',
    example: 'Watching YouTube videos on pitch strategy',
    receptivity: 'Medium — intent without expression',
  },
  {
    type: 'Expressed Signal',
    description: 'Direct public statement of pain or struggle',
    example: '"Lost the pitch because the brief was weak"',
    receptivity: 'High — named, processed, open',
    highlight: true,
  },
  {
    type: 'Community-Validated Signal',
    description: 'Expressed pain that others affirmed or echoed',
    example: 'Post with 40 comments saying "same here"',
    receptivity: 'Very High — social proof of prevalence',
    highlight: true,
  },
]

const DECAY_WINDOWS = [
  { period: 'Hours 0–24', label: 'Peak window', description: 'Emotion still present. Response feels immediate.', intensity: 5 },
  { period: 'Hours 24–72', label: 'High window', description: 'Still resonant if message references the specific post.', intensity: 4 },
  { period: 'Days 3–7', label: 'Moderate window', description: 'Context still fresh but urgency fading.', intensity: 3 },
  { period: 'Days 7–30', label: 'Low window', description: 'Useful for nurture, not direct outreach.', intensity: 2 },
  { period: 'Days 30+', label: 'Signal archived', description: 'Use for persona research, not outreach timing.', intensity: 1 },
]

const RESPONSE_STEPS = [
  {
    step: '1',
    label: 'Mirror',
    description:
      'Reference something they actually said or did. Not their job title. Not their company. The thing they expressed.',
  },
  {
    step: '2',
    label: 'Recognize',
    description:
      'Name the pattern you saw without diagnosing them. "That brief problem is almost always the culprit when the creative is strong" — not "you need strategy help."',
  },
  {
    step: '3',
    label: 'Offer',
    description:
      'Connect the recognition to a specific capability. One sentence. Not a product description. A capability that resolves the exact state they named.',
  },
  {
    step: '4',
    label: 'Permission',
    description:
      'Don\'t close. Open. Invite a response if it resonates. "If any of that tracks, worth a conversation." Never: "Book a demo." Not yet.',
  },
]

const NOT_THIS = [
  {
    label: 'This is not social listening.',
    description:
      'Social listening monitors brand mentions and sentiment at scale. Signal-State Marketing finds individuals in specific psychological states. Different grain, different purpose.',
  },
  {
    label: 'This is not intent data.',
    description:
      'Intent data shows what people searched for. Signal-State shows what people said. Searching is research behavior. Saying is processing behavior. One is earlier and more open.',
  },
  {
    label: 'This is not surveillance marketing.',
    description:
      'The signals targeted are public, voluntary expressions. No private data. No behavioral tracking across sites. No inferred identity. People who post publicly about their struggles are, by the act of posting, broadcasting them.',
  },
  {
    label: 'This is not automation at scale.',
    description:
      'The response architecture requires genuine personalization — referencing the specific signal, using the subject\'s own language. It cannot be templatized without destroying the mechanism. Volume is limited by the quality of context compression, not by send capacity.',
  },
]

export default function FrameworkClient() {
  return (
    <>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mb-4"
          >
            Signal-State Marketing — v1.0
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            The Full Framework
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-foreground-muted text-lg max-w-2xl"
          >
            Psychological research, signal typology, decay model, and the response architecture. Everything you need to understand why this works — and how to deploy it.
          </motion.p>

          {/* Section Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {['Preface', 'Core Insight', 'Research Base', 'Signal Typology', 'Decay Model', 'Response Architecture', 'What This Is Not', 'Closing Frame'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.15)] text-foreground-muted hover:text-ash hover:border-[var(--ss-teal-border)] transition-colors"
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Preface */}
      <section id="preface" className="section">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-slate mb-4"
          >
            Preface
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="prose prose-sm max-w-none mb-8"
          >
            <p className="text-foreground leading-relaxed mb-4">
              For decades, B2B marketing has operated on two axes: <strong>Firmographic fit</strong> — who they are structurally — and <strong>Behavioral response</strong> — what they did when you reached them. Intent data added a third signal: what they searched for, unprompted, on third-party sites.
            </p>
            <p className="text-foreground-muted leading-relaxed">
              But all three models share a fundamental limitation: they infer psychological state from indirect proxies. None of them tell you who is <em>in the moment of naming the problem themselves.</em>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <pre className="bg-[#0d0f12] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 text-xs font-mono text-[#e2e4ea] overflow-x-auto leading-relaxed whitespace-pre">
{`FIRMOGRAPHIC MODEL
─────────────────────────────────────────────────────────
Who they are (structurally) = Fit Score
Industry + Title + Company Size + Region
Limitation: Static. Says nothing about psychological state or timing.


BEHAVIORAL MODEL
─────────────────────────────────────────────────────────
Who they are + What they did in response = Lead Score
Opened email + Clicked link + Attended webinar
Limitation: Reactive. Requires you to touch them first.
           Vulnerable to declining engagement rates.


INTENT DATA MODEL
─────────────────────────────────────────────────────────
Who they are + What they searched unprompted = Buying Stage Signal
Third-party search behavior + Topic clusters
Limitation: Inferred. A search is not an expression.
           High competition — everyone buys the same intent feeds.


SIGNAL-STATE MODEL  ← This framework
─────────────────────────────────────────────────────────
Who they are
+ What psychological state they are expressing publicly
+ At what moment of readiness
+ In what community context
= Intervention Window

Advantage: Expressed, not inferred.
           Found, not prompted.
           Specific, not probabilistic.
           Low competition — almost no one is operating here yet.`}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Core Insight */}
      <section id="core-insight" className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mb-6"
          >
            The Core Insight
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-2xl md:text-3xl font-bold leading-snug text-[var(--ss-teal-text)] mb-8 border-l-4 pl-6"
            style={{ borderColor: 'var(--ss-teal-border)' }}
          >
            "Public expression of struggle is not just a pain signal. It is a readiness signal."
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground-muted leading-relaxed space-y-4 max-w-2xl"
          >
            <p>
              When someone posts publicly about a problem — on LinkedIn, Reddit, Twitter, a community forum, a blog — they have crossed a threshold. They have moved from privately experiencing a pain to publicly naming it.
            </p>
            <p>
              That act of naming is a stage transition. They are not just hurting. They are processing. They have externalized the problem. They are, by definition, in a state of elevated openness to solutions.
            </p>
            <p>
              The person who posts "I wish I had a strategist brain in a box" is not yet searching for software. They're not yet filling out a form. They're in the gap between pain and action — and that gap is almost entirely uncontested territory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Psychological Research Base */}
      <section id="research-base" className="section">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-slate mb-2"
          >
            Part II
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold mb-10"
          >
            The Psychological Research Base
          </motion.h2>

          <div className="space-y-10">
            {PSYCH_SECTIONS.map((section, index) => (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card p-6"
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-slate mb-2">
                  {section.number} / {PSYCH_SECTIONS.length}
                </p>
                <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                <p className="text-foreground-muted leading-relaxed mb-4">{section.body}</p>

                {section.table && (
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 font-semibold text-slate text-xs uppercase tracking-wide">Stage</th>
                          <th className="text-left py-2 pr-4 font-semibold text-slate text-xs uppercase tracking-wide">State</th>
                          <th className="text-left py-2 pr-4 font-semibold text-slate text-xs uppercase tracking-wide hidden md:table-cell">What It Looks Like</th>
                          <th className="text-left py-2 font-semibold text-slate text-xs uppercase tracking-wide">Marketing Equivalent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.map((row) => (
                          <tr
                            key={row.stage}
                            className={`border-b border-border/50 ${row.highlight ? 'bg-[var(--ss-teal-bg)]' : ''}`}
                          >
                            <td className={`py-2 pr-4 font-medium ${row.highlight ? 'text-[var(--ss-teal-text)]' : ''}`}>{row.stage}</td>
                            <td className="py-2 pr-4 text-foreground-muted">{row.state}</td>
                            <td className="py-2 pr-4 text-foreground-muted hidden md:table-cell">{row.looks}</td>
                            <td className={`py-2 text-sm ${row.highlight ? 'text-[var(--ss-teal-text)] font-semibold' : 'text-foreground-muted'}`}>{row.mktg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div
                  className="rounded-lg p-4 border text-sm leading-relaxed"
                  style={{ background: 'var(--ss-teal-bg)', borderColor: 'var(--ss-teal-border)', color: 'var(--ss-teal-text)' }}
                >
                  <strong className="block text-xs uppercase tracking-widest mb-2 opacity-75">Key Insight</strong>
                  {section.keyInsight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Typology */}
      <section id="signal-typology" className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-purple-text)] mb-2"
          >
            Part III
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold mb-2"
          >
            Signal Typology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-foreground-muted mb-8"
          >
            Not all signals are equal. Four types, in ascending order of value.
          </motion.p>

          <div className="space-y-3">
            {SIGNAL_TYPES.map((row, index) => (
              <motion.div
                key={row.type}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="grid md:grid-cols-4 gap-4 rounded-lg p-4 border"
                style={{
                  background: row.highlight ? 'var(--ss-purple-bg)' : 'rgba(255,255,255,0.03)',
                  borderColor: row.highlight ? 'var(--ss-purple-border)' : 'rgba(255,255,255,0.08)',
                }}
              >
                <div>
                  <p className={`font-semibold text-sm ${row.highlight ? 'text-[var(--ss-purple-text)]' : 'text-foreground-muted'}`}>
                    {row.type}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-foreground-muted">{row.description}</p>
                  <p className="text-xs text-slate mt-1 italic">{row.example}</p>
                </div>
                <div>
                  <p className={`text-xs font-medium ${row.highlight ? 'text-[var(--ss-purple-text)]' : 'text-slate'}`}>
                    {row.receptivity}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Decay Model */}
      <section id="decay-model" className="section">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-slate mb-2"
          >
            Signal Decay Model
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold mb-2"
          >
            Signals are time-sensitive.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-slate mb-10"
          >
            Receptivity decreases as the acute moment passes.
          </motion.p>

          <div className="space-y-3">
            {DECAY_WINDOWS.map((window, index) => (
              <motion.div
                key={window.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-4"
              >
                <div className="w-28 shrink-0">
                  <p className="text-xs font-mono text-slate">{window.period}</p>
                </div>
                <div className="flex-1">
                  <div
                    className="h-1.5 rounded-full mb-2"
                    style={{
                      width: `${window.intensity * 20}%`,
                      background: `var(--ss-teal-border)`,
                      opacity: window.intensity / 5,
                    }}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold">{window.label}</span>
                    <span className="text-xs text-foreground-muted">{window.description}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-4 rounded-lg border border-[var(--ss-amber-border)] bg-[var(--ss-amber-bg)]"
          >
            <p className="text-sm text-[var(--ss-amber-text)] leading-relaxed">
              <strong>Implication for agent architecture:</strong> Signals need to be acted on within 24–72 hours of detection. A pipeline that takes 2 weeks to process a signal is operating on expired intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Response Architecture */}
      <section id="response-architecture" className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-coral-text)] mb-2"
          >
            The Response Architecture
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold mb-2"
          >
            Mirror → Recognize → Offer → Permission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-foreground-muted mb-10"
          >
            The outreach triggered by a signal must follow a specific structure to avoid triggering reactance.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            {RESPONSE_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl p-6 border"
                style={{ background: 'var(--ss-coral-bg)', borderColor: 'var(--ss-coral-border)' }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-coral-text)] mb-2">
                  {step.step}. {step.label}
                </p>
                <p className="text-sm leading-relaxed text-foreground-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Is Not */}
      <section id="what-this-is-not" className="section">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-slate mb-2"
          >
            Part VII
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold mb-10"
          >
            What This Is Not
          </motion.h2>

          <div className="space-y-4">
            {NOT_THIS.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="card p-6"
              >
                <h3 className="font-bold mb-2">{item.label}</h3>
                <p className="text-foreground-muted leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Frame */}
      <section id="closing-frame" className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mb-6"
          >
            Closing Frame
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="max-w-2xl space-y-4 text-foreground-muted leading-relaxed mb-8"
          >
            <p>Every one of the catalogues in this framework is, at its core, a library of moments.</p>
            <p>
              Moments when someone's frustration exceeded their threshold for keeping it private.
              Moments when a professional named something they'd been feeling for months.
              Moments when a gap became undeniable enough to say out loud.
            </p>
            <p>
              Traditional marketing was never able to find those moments at scale. It approximated them — with firmographics, with behavioral proxies, with intent signals — but it was always inference.
            </p>
            <p>
              The combination of ubiquitous public expression and AI-scale signal detection makes it possible, for the first time, to find the actual moment.
            </p>
            <p className="text-ash font-medium">
              Not the profile that might contain someone in pain.
              Not the behavior that suggests they might be considering a solution.
              The moment itself.
            </p>
            <p className="text-[var(--ss-teal-text)] font-semibold">
              That is what this framework is built to find.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-xs text-slate"
          >
            Framework version: 1.0 — March 2026
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link href="/signal-state/architecture" className="btn-primary">
              View the architecture →
            </Link>
            <Link href="/signal-state/use-cases" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-ash/50 text-ash font-semibold text-sm transition-all hover:bg-ash hover:text-charcoal hover:-translate-y-0.5">
              See use cases →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
