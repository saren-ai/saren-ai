'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Node detail data ───────────────────────────────────────────────────────

const NODE_DETAILS: Record<string, string> = {
  reddit:
    'Reddit agent monitors r/advertising, r/freelance, r/brandstrategy, and related communities for pain expressions matching the signal library. Searches run every ~4 hours. Signals are scored for recency, explicitness, and persona fit before entering the pipeline.',
  linkedin:
    'LinkedIn agent monitors posts, comments, and profile transitions for expressed struggle signals. High-value events: recent indie transitions (0–12 months), pitch loss posts, partner-seeking language. Uses LinkedIn API or scraping layer depending on access tier.',
  twitter:
    'Twitter/X agent monitors real-time venting from creatives and strategists. Key search strings: "solo creative", "one person agency", "I need a strategist", "lost the pitch". High signal-to-noise for acute, in-the-moment expressions. Rock API handles this channel.',
  glassdoor:
    'Glassdoor agent monitors review trends for org dysfunction signals: CEO approval drops, recurring keywords (siloed, politics, no accountability), score trajectory over 12–18 months. Primary use case: cybersecurity and org alignment products.',
  g2:
    'G2 and Capterra agent monitors product reviews for signals that incumbent solutions are failing users. Reviews mentioning "wish it had strategy", "great creative but", or "needed more depth" are high-intent signals for the platform.',
  upwork:
    'Upwork agent monitors freelancer profiles and client job postings for explicit capability gap signals. Profiles offering both strategy and creative solo, reviews mentioning gaps, and postings seeking "strategist + designer combo" are all high-confidence signals.',
  detect:
    'Detect: The agent finds an organic, public expression of pain that matches the signal library. It scores the signal on three axes — state clarity (how explicitly is pain named?), recency (hours vs days), and persona fit (does the firmographic profile match ICP?). Output: a scored, timestamped signal record.',
  empathize:
    "Empathize: The platform interprets not just what was said but what was felt. What emotion is underneath the words? Why did this person say it publicly rather than privately? What do they need to feel in a response for it to land? Output: an emotional brief — not a data summary. This is the step that transforms a data point into a human moment.",
  respond:
    'Respond: Outreach is drafted using the Mirror → Recognize → Offer → Permission architecture. It references what they said (not their job title), names the pattern without diagnosing, offers a specific capability (not a product), and invites a response without pressure. It does not feel like marketing because it is structured as a reply.',
  post:
    'Post via channel API: The platform posts the resonant message through the native API for each channel — comment on Reddit, reply on Twitter/X, connection message on LinkedIn, etc. Timing is deliberately casual: not instant, but within 1–4 hours of detection. Immediate responses feel automated. Slightly delayed responses feel human.',
  logging:
    'Logging agent: At the moment of outreach, the logging agent records the signal source, the message sent, the timestamp, and starts the follow-up timer. If no response within 24 hours, a follow-up is queued. A second follow-up fires at 48 hours. After that, the signal is archived — no further contact.',
  handle:
    'Handle captured: When the prospect responds or clicks through, their platform handle (Twitter username, LinkedIn slug, Reddit username) is captured and set as a URL parameter on the inbound landing page link. This is the variable that enables full personalization on the landing page — surfacing their name, the platform they came from, and a message that references their original post.',
  followup:
    "Follow-up queue: The 24hr follow-up is a single soft re-engagement — not a pitch, not a reminder to buy. It adds one piece of value (a relevant case study, a resource) and re-opens the door. The 48hr follow-up is the final touch — brief, no pressure. After 48 hours with no response, the signal is logged as archived and no further outreach is sent. Three touches max.",
  landing:
    'Custom landing page: The landing page is personalized at load time using the captured handle parameter. It surfaces the prospect\'s name, acknowledges the platform they came from, and mirrors the language from their original signal back to them. Structure: value first (case study, insight, relevant proof), CTA last. No form. No pricing. No friction. The goal of this page is to deliver enough value that booking a call feels like a natural next step, not a transaction.',
  book:
    "Book a meeting — single CTA: The only call to action on the landing page. It appears after value has been delivered — not above the fold, not in a pop-up. A Calendly or Cal.com embed is sufficient. The copy mirrors the signal: 'If any of this tracks, 20 minutes — no pitch, just the conversation.' After booking, the signal dossier is automatically assembled and delivered to the assigned sales rep before the meeting.",
  sales:
    'Sales handoff — signal dossier: The rep receives the complete signal chain before the call: original post (verbatim), emotional read, persona classification, outreach trail (which message, response time), landing page engagement (time on page, sections read), and a first-call frame with an opening question and the one appropriate ask. The rep never opens with "tell me about yourself." They open with the moment.',
}

// ─── Step-through order ──────────────────────────────────────────────────────

const STEP_SEQUENCE = [
  'reddit', 'linkedin', 'twitter', 'glassdoor', 'g2', 'upwork',
  'detect', 'empathize', 'respond',
  'post', 'logging',
  'handle', 'followup',
  'landing', 'book', 'sales',
]

// ─── Sub-components ──────────────────────────────────────────────────────────

interface NodeProps {
  id: string
  label: string
  sublabel?: string
  bg: string
  border: string
  textColor: string
  activeId: string | null
  stepActiveId: string | null
  onClick: (id: string) => void
  className?: string
}

function DiagramNode({ id, label, sublabel, bg, border, textColor, activeId, stepActiveId, onClick, className = '' }: NodeProps) {
  const isDetailOpen = activeId === id
  const isStepHighlighted = stepActiveId === id

  return (
    <motion.div
      layout
      animate={{
        scale: isStepHighlighted ? 1.04 : 1,
        boxShadow: isStepHighlighted ? `0 0 0 2px ${border}` : '0 0 0 0px transparent',
      }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg border cursor-pointer transition-all ${className}`}
      style={{
        background: bg,
        borderColor: isDetailOpen ? border : `${border}88`,
      }}
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(id) }}
      aria-expanded={isDetailOpen}
    >
      <div className="p-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: textColor, opacity: 0.75 }}>
          {sublabel}
        </p>
        <p className="text-sm font-semibold mt-0.5" style={{ color: textColor }}>
          {label}
        </p>
      </div>
    </motion.div>
  )
}

// ─── SVG connectors ──────────────────────────────────────────────────────────

function FlowDown() {
  return (
    <div className="flex justify-center h-8 items-center">
      <svg width="40" height="32" viewBox="0 0 40 32">
        <line
          x1="20" y1="0" x2="20" y2="24"
          stroke="var(--ss-gray-border)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
          style={{ animation: 'flowDown 0.9s linear infinite' }}
        />
        <polygon points="15,20 20,30 25,20" fill="var(--ss-gray-border)" />
      </svg>
    </div>
  )
}

function ForkConnector() {
  return (
    <div className="flex justify-center h-8 mb-1.5">
      <svg width="320" height="32" viewBox="0 0 320 32">
        <line x1="160" y1="0"  x2="160" y2="12" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="160" y1="12" x2="52"  y2="12" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="160" y1="12" x2="268" y2="12" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="52"  y1="12" x2="52"  y2="24" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="268" y1="12" x2="268" y2="24" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <polygon points="47,20 52,30 57,20"   fill="var(--ss-gray-border)" />
        <polygon points="263,20 268,30 273,20" fill="var(--ss-gray-border)" />
        <circle cx="160" cy="12" r="3.5" fill="var(--ss-gray-border)" style={{ animation: 'ssPulse 1.8s ease-in-out infinite' }} />
      </svg>
    </div>
  )
}

function MergeConnector() {
  return (
    <div className="flex justify-center h-8 mb-1.5">
      <svg width="320" height="32" viewBox="0 0 320 32">
        <line x1="52"  y1="0"  x2="52"  y2="20" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="268" y1="0"  x2="268" y2="20" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="52"  y1="20" x2="160" y2="20" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="268" y1="20" x2="160" y2="20" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <line x1="160" y1="20" x2="160" y2="28" stroke="var(--ss-gray-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <polygon points="155,24 160,32 165,24" fill="var(--ss-gray-border)" />
        <circle cx="160" cy="20" r="3.5" fill="var(--ss-gray-border)" style={{ animation: 'ssPulse 1.8s ease-in-out infinite' }} />
      </svg>
    </div>
  )
}

function AmberArrow() {
  return (
    <div className="flex justify-center h-8 items-center">
      <svg width="40" height="32" viewBox="0 0 40 32">
        <line x1="20" y1="0" x2="20" y2="24" stroke="var(--ss-amber-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <polygon points="15,20 20,30 25,20" fill="var(--ss-amber-border)" />
      </svg>
    </div>
  )
}

function GreenArrow() {
  return (
    <div className="flex justify-center h-8 items-center">
      <svg width="40" height="32" viewBox="0 0 40 32">
        <line x1="20" y1="0" x2="20" y2="24" stroke="var(--ss-green-border)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'flowDown 0.9s linear infinite' }} />
        <polygon points="15,20 20,30 25,20" fill="var(--ss-green-border)" />
      </svg>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ArchitectureDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [stepIndex, setStepIndex] = useState<number | null>(null)
  const [isWalking, setIsWalking] = useState(false)

  const handleClick = useCallback((id: string) => {
    setStepIndex(null)
    setActiveId((prev) => (prev === id ? null : id))
  }, [])

  const handleStartWalk = useCallback(() => {
    if (isWalking) return
    setIsWalking(true)
    setActiveId(null)
    let i = 0
    const advance = () => {
      setStepIndex(i)
      setActiveId(STEP_SEQUENCE[i])
      i++
      if (i < STEP_SEQUENCE.length) {
        setTimeout(advance, 1500)
      } else {
        setTimeout(() => {
          setIsWalking(false)
          setStepIndex(null)
        }, 2000)
      }
    }
    advance()
  }, [isWalking])

  const stepActiveId = stepIndex !== null ? STEP_SEQUENCE[stepIndex] : null

  const AGENT_NODES = [
    { id: 'reddit',    label: 'Reddit',      sublabel: 'r/freelance etc.' },
    { id: 'linkedin',  label: 'LinkedIn',    sublabel: 'posts + profiles' },
    { id: 'twitter',   label: 'Twitter/X',   sublabel: 'real-time venting' },
    { id: 'glassdoor', label: 'Glassdoor',   sublabel: 'review signals' },
    { id: 'g2',        label: 'G2 / Capterra', sublabel: 'product reviews' },
    { id: 'upwork',    label: 'Upwork',      sublabel: 'profile gaps' },
  ]

  return (
    <div>
      {/* Step-through button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleStartWalk}
          disabled={isWalking}
          className="px-4 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-50"
          style={{
            background: 'var(--ss-teal-bg)',
            borderColor: 'var(--ss-teal-border)',
            color: 'var(--ss-teal-text)',
          }}
        >
          {isWalking ? 'Walking through…' : 'Walk me through this →'}
        </button>
      </div>

      {/* Card wrapper */}
      <div className="rounded-2xl border border-white/10 bg-offblack p-7">

        {/* Signal Sources */}
        <p className="text-[10px] font-semibold tracking-widest uppercase text-slate mb-2.5">
          signal sources — scan every 4 hrs
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mb-1.5">
          {AGENT_NODES.map((node) => (
            <DiagramNode
              key={node.id}
              id={node.id}
              label={node.label}
              sublabel={node.sublabel}
              bg="var(--ss-gray-bg)"
              border="var(--ss-gray-border)"
              textColor="var(--ss-gray-text)"
              activeId={activeId}
              stepActiveId={stepActiveId}
              onClick={handleClick}
            />
          ))}
        </div>

        <FlowDown />

        {/* Pipeline */}
        <p className="text-[10px] font-semibold tracking-widest uppercase text-slate mb-2.5">
          pipeline — detect · empathize · respond
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-stretch mb-1.5">
          <DiagramNode
            id="detect"
            label="Signal detected"
            sublabel="01 — detect · Score · timestamp · persona fit"
            bg="var(--ss-purple-bg)"
            border="var(--ss-purple-border)"
            textColor="var(--ss-purple-text)"
            activeId={activeId}
            stepActiveId={stepActiveId}
            onClick={handleClick}
            className="flex-1"
          />
          <div className="hidden md:flex items-center px-2 text-[var(--ss-gray-border)] text-lg">→</div>
          <DiagramNode
            id="empathize"
            label="Emotional read"
            sublabel="02 — empathize · State · feeling · language"
            bg="var(--ss-coral-bg)"
            border="var(--ss-coral-border)"
            textColor="var(--ss-coral-text)"
            activeId={activeId}
            stepActiveId={stepActiveId}
            onClick={handleClick}
            className="flex-1"
          />
          <div className="hidden md:flex items-center px-2 text-[var(--ss-gray-border)] text-lg">→</div>
          <DiagramNode
            id="respond"
            label="Resonant message"
            sublabel="03 — respond · Mirror · recognize · offer"
            bg="var(--ss-purple-bg)"
            border="var(--ss-purple-border)"
            textColor="var(--ss-purple-text)"
            activeId={activeId}
            stepActiveId={stepActiveId}
            onClick={handleClick}
            className="flex-1"
          />
        </div>

        <ForkConnector />

        {/* Two-col: post / logging */}
        <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-1.5 w-full">
          <DiagramNode
            id="post"
            label="Post via channel API"
            sublabel="outbound · Comment · reply · DM — casual timing"
            bg="var(--ss-teal-bg)"
            border="var(--ss-teal-border)"
            textColor="var(--ss-teal-text)"
            activeId={activeId}
            stepActiveId={stepActiveId}
            onClick={handleClick}
          />
          <DiagramNode
            id="logging"
            label="Logging agent"
            sublabel="tracking · Start follow-up timer on signal"
            bg="var(--ss-gray-bg)"
            border="var(--ss-gray-border)"
            textColor="var(--ss-gray-text)"
            activeId={activeId}
            stepActiveId={stepActiveId}
            onClick={handleClick}
          />
        </div>

        <FlowDown />

        {/* Two-col: handle / followup */}
        <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-1.5 w-full">
          <DiagramNode
            id="handle"
            label="Handle captured"
            sublabel="capture · URL parameter set for personalization"
            bg="var(--ss-teal-bg)"
            border="var(--ss-teal-border)"
            textColor="var(--ss-teal-text)"
            activeId={activeId}
            stepActiveId={stepActiveId}
            onClick={handleClick}
          />
          <DiagramNode
            id="followup"
            label="Follow-up queue"
            sublabel="follow-up · 24hr + 48hr outreach cadence"
            bg="var(--ss-gray-bg)"
            border="var(--ss-gray-border)"
            textColor="var(--ss-gray-text)"
            activeId={activeId}
            stepActiveId={stepActiveId}
            onClick={handleClick}
          />
        </div>

        <MergeConnector />

        {/* Conversion */}
        <p className="text-[10px] font-semibold tracking-widest uppercase text-slate mb-2.5 text-center">
          conversion
        </p>

        <DiagramNode
          id="landing"
          label="Custom landing page"
          sublabel="inbound · Personalized by handle · high-value content first · no CTA yet"
          bg="var(--ss-teal-bg)"
          border="var(--ss-teal-border)"
          textColor="var(--ss-teal-text)"
          activeId={activeId}
          stepActiveId={stepActiveId}
          onClick={handleClick}
          className="mb-0 w-1/2 min-w-[220px] mx-auto"
        />

        <AmberArrow />

        <DiagramNode
          id="book"
          label="Book a meeting"
          sublabel="single CTA · One ask · after value is delivered · no form, no friction"
          bg="var(--ss-amber-bg)"
          border="var(--ss-amber-border)"
          textColor="var(--ss-amber-text)"
          activeId={activeId}
          stepActiveId={stepActiveId}
          onClick={handleClick}
          className="mb-0 w-1/2 min-w-[220px] mx-auto"
        />

        <GreenArrow />

        <DiagramNode
          id="sales"
          label="Sales — signal dossier delivered"
          sublabel="handoff · Original post · emotional read · first call frame · one ask"
          bg="var(--ss-green-bg)"
          border="var(--ss-green-border)"
          textColor="var(--ss-green-text)"
          activeId={activeId}
          stepActiveId={stepActiveId}
          onClick={handleClick}
          className="mb-0 w-1/2 min-w-[220px] mx-auto"
        />

        {/* Detail Drawer */}
        <AnimatePresence>
          {activeId && NODE_DETAILS[activeId] && (
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 overflow-hidden"
            >
              <div className="rounded-lg border border-[rgba(255,255,255,0.14)] bg-charcoal p-4 text-sm text-slate leading-relaxed">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold tracking-widest uppercase text-slate/60">
                    {activeId}
                  </span>
                  <button
                    onClick={() => setActiveId(null)}
                    className="text-slate hover:text-ash transition-colors text-base leading-none ml-4 shrink-0"
                    aria-label="Close detail"
                  >
                    ✕
                  </button>
                </div>
                <p>
                  {NODE_DETAILS[activeId].split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                    part.startsWith('**') ? (
                      <strong key={i} className="text-ash">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider + Legend */}
        <div className="border-t border-[rgba(255,255,255,0.06)] mt-5 pt-5 flex flex-wrap gap-4">
          {[
            { color: '#534AB7', label: 'pipeline intelligence' },
            { color: '#993C1D', label: 'empathize' },
            { color: '#0F6E56', label: 'outbound + landing' },
            { color: '#854F0B', label: 'conversion' },
            { color: '#3B6D11', label: 'sales handoff' },
            { color: '#888780', label: 'agents + tracking' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-slate">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: item.color }}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
