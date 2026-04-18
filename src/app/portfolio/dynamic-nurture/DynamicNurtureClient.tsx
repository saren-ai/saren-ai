"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEGMENTS = ["Enterprise", "SMB", "Individual"] as const;
const STAGES = ["Awareness", "Consideration", "Decision"] as const;

const CELL_CONTENT = [
  [
    {
      brief: "Establishes the problem at scale.",
      full: "Establishes the problem at scale. Thought leadership framing. No product pitch.",
    },
    {
      brief: "Introduces the methodology.",
      full: "Introduces the methodology. Social proof from peer companies.",
    },
    {
      brief: "Case study + direct ask.",
      full: "Case study + direct ask for a strategic conversation.",
    },
  ],
  [
    {
      brief: "Pain-point led. Fast read.",
      full: "Pain-point led. Fast read. Acknowledges resource constraints.",
    },
    {
      brief: "Comparison framing.",
      full: "Comparison framing. How this fits lean teams.",
    },
    {
      brief: "ROI-focused.",
      full: "ROI-focused. Simple next step.",
    },
  ],
  [
    {
      brief: "Personal, direct.",
      full: "Personal, direct. Speaks to career/professional growth angle.",
    },
    {
      brief: "Skill or outcome focused.",
      full: "Skill or outcome focused. Peer stories.",
    },
    {
      brief: "Low-friction CTA.",
      full: "Low-friction CTA. Trial, demo, or resource download.",
    },
  ],
] as const;

// Column tints and accent per stage — use Fire Horse system tokens
const STAGE_TINT = [
  "bg-lavender/[0.04]",
  "bg-copper/[0.04]",
  "bg-ember/[0.04]",
];
const STAGE_BORDER_ACTIVE = [
  "border-lavender/35",
  "border-copper/35",
  "border-ember/35",
];
const STAGE_TEXT_ACTIVE = ["text-lavender", "text-copper", "text-ember"];

// Flowchart diagram node palette (illustration colors — not text contrast targets)
const C = {
  teal: "#0d9488",
  purple: "#8b5cf6",
  amber: "#d97706",
  coral: "#D4624A",
  rose: "#f43f5e",
};

// ─── Flow node primitive ──────────────────────────────────────────────────────

function FlowNode({
  color,
  title,
  subtitle,
  badge,
  note,
  wide,
  children,
}: {
  color: string;
  title: string;
  subtitle?: string;
  badge?: string;
  note?: string;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${wide ? "w-full" : ""}`}
      style={{ borderColor: `${color}45`, backgroundColor: `${color}0a` }}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: color }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold leading-snug" style={{ color: `${color}CC` }}>
              {title}
            </span>
            {badge && (
              <span
                className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                style={{ color: color, backgroundColor: `${color}20`, border: `1px solid ${color}35` }}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs font-mono text-slate/70 dark:text-white/35 leading-relaxed">{subtitle}</p>
          )}
          {note && (
            <p className="mt-2 text-xs text-slate dark:text-white/45 leading-relaxed italic">{note}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

function Connector({ label, dim }: { label?: string; dim?: boolean }) {
  return (
    <div className="flex flex-col items-center py-1 gap-0.5">
      <div className={`w-px h-5 ${dim ? "bg-charcoal/10 dark:bg-white/8" : "bg-charcoal/15 dark:bg-white/12"}`} />
      {label && (
        <span className="text-[9px] font-mono text-slate/50 dark:text-white/22 px-2 text-center leading-tight">{label}</span>
      )}
      <svg width="8" height="6" viewBox="0 0 8 6" className={dim ? "text-charcoal/10 dark:text-white/10" : "text-charcoal/20 dark:text-white/18"}>
        <path d="M 0 0 L 4 6 L 8 0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

// ─── Matrix ───────────────────────────────────────────────────────────────────

function MatrixSection() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const toggleCell = (r: number, c: number) => {
    setSelectedCell((prev) => (prev?.[0] === r && prev?.[1] === c ? null : [r, c]));
  };

  return (
    <section className="section bg-ash dark:bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="font-mono text-ember text-[10px] uppercase tracking-[0.2em] mb-3">
            The Core Concept
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-white mb-3">9 Emails. One System.</h2>
          <p className="text-slate text-sm font-mono max-w-lg">
            Hover a row or column label to see the full track. Click any cell to read the content brief.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-offblack p-6 md:p-8 text-white"
        >
          {/* Column headers */}
          <div className="grid grid-cols-[120px_1fr_1fr_1fr] gap-2 mb-2">
            <div />
            {STAGES.map((stage, ci) => (
              <button
                key={stage}
                onMouseEnter={() => setHoveredCol(ci)}
                onMouseLeave={() => setHoveredCol(null)}
                className={`py-2.5 rounded border text-center font-mono text-[10px] uppercase tracking-widest transition-all duration-150 ${
                  hoveredCol === ci
                    ? `${STAGE_BORDER_ACTIVE[ci]} ${STAGE_TEXT_ACTIVE[ci]} bg-white/[0.04]`
                    : "border-white/8 text-white/25 bg-white/[0.015]"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>

          {/* Rows — wrapped in relative for SVG overlay */}
          <div className="relative space-y-2">
            {/* Animated path overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 28 17 L 28 50 L 57 50 L 86 83"
                stroke="#D4624A"
                strokeWidth="1.2"
                strokeDasharray="3 2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.38 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
              />
              <motion.circle
                cx="86"
                cy="83"
                r="1.8"
                fill="#D4624A"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.55 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.3 }}
              />
            </svg>

            {SEGMENTS.map((segment, ri) => (
              <div key={segment} className="grid grid-cols-[120px_1fr_1fr_1fr] gap-2">
                {/* Row label */}
                <button
                  onMouseEnter={() => setHoveredRow(ri)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex items-center justify-end pr-3 rounded font-mono text-[10px] uppercase tracking-widest transition-all duration-150 ${
                    hoveredRow === ri ? "text-white/72 bg-white/[0.03]" : "text-white/22"
                  }`}
                >
                  {segment}
                </button>

                {CELL_CONTENT[ri].map((cell, ci) => {
                  const isSelected = selectedCell?.[0] === ri && selectedCell?.[1] === ci;
                  const highlighted = hoveredRow === ri || hoveredCol === ci;

                  return (
                    <button
                      key={ci}
                      onClick={() => toggleCell(ri, ci)}
                      onMouseEnter={() => setHoveredRow(ri)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`text-left p-4 rounded border min-h-[88px] transition-all duration-150 ${STAGE_TINT[ci]} ${
                        isSelected
                          ? "border-ember/45 bg-ember/[0.08] ring-1 ring-[#D4624A]/18"
                          : highlighted
                          ? "border-white/18 bg-white/[0.05]"
                          : "border-white/8 hover:border-white/14"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isSelected ? (
                          <motion.p
                            key="full"
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.14 }}
                            className="text-sm text-white/78 leading-relaxed"
                          >
                            {cell.full}
                          </motion.p>
                        ) : (
                          <motion.p
                            key="brief"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            className="text-[11px] font-mono text-white/40 leading-relaxed"
                          >
                            {cell.brief}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Path legend */}
          <div className="mt-5 flex items-center gap-2">
            <svg width="28" height="6" viewBox="0 0 28 6">
              <line
                x1="0"
                y1="3"
                x2="28"
                y2="3"
                stroke="#D4624A"
                strokeWidth="1.2"
                strokeDasharray="3 2"
                opacity="0.4"
              />
            </svg>
            <span className="text-[10px] font-mono text-white/22">
              Non-linear path — contacts advance based on behavioral scoring, not fixed sequence
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Routing Logic ────────────────────────────────────────────────────────────

function RoutingSection() {
  return (
    <section className="section bg-ash dark:bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-ember text-[10px] uppercase tracking-[0.2em] mb-3">
            The Routing Logic
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-white mb-3">How Contacts Move Through the System</h2>
          <p className="text-slate text-sm font-mono max-w-lg">
            Every lead enters, scores, and advances — or exits — based on fit and behavior. No manual sorting required.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-0 rounded-2xl bg-offblack p-6 md:p-8 text-white">

          {/* ── Block 1: Entry Sources ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate/50 dark:text-white/20 mb-3">Entry sources</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* Net New track */}
              <div
                className="rounded-xl border p-4 space-y-3"
                style={{ borderColor: `${C.teal}35`, backgroundColor: `${C.teal}08` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: C.teal }}>
                  Net New Lead
                </p>
                <FlowNode
                  color={C.teal}
                  title="Non-hand raiser"
                  subtitle="Form or list load → enters scoring immediately"
                />
                <div className="space-y-2">
                  <FlowNode
                    color={C.teal}
                    title="Hand raiser"
                    subtitle="Form or list load → goes directly to MQL check"
                  />
                  <div className="ml-5 pl-3 border-l" style={{ borderColor: `${C.amber}35` }}>
                    <FlowNode
                      color={C.amber}
                      title="★ First-Touch Demo Accelerator"
                      badge="30-day fast track"
                      note="Hand raisers bypass KLT for a 30-day fast track to demo conversion."
                    />
                  </div>
                </div>
              </div>

              {/* Existing contacts track */}
              <div
                className="rounded-xl border p-4 space-y-3"
                style={{ borderColor: `${C.purple}35`, backgroundColor: `${C.purple}08` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: C.purple }}>
                  Existing Contacts
                </p>
                <FlowNode
                  color={C.purple}
                  title="Recycled opps / Existing DB"
                  subtitle="Closed/lost, stalled, or one-time batch entry"
                />
                <FlowNode
                  color={C.amber}
                  title="Subscription consent check"
                />
                <div className="grid grid-cols-2 gap-2">
                  <FlowNode
                    color={C.coral}
                    title="Not subscribed"
                    subtitle="→ Goodbye Campaign"
                  />
                  <FlowNode
                    color={C.purple}
                    title="Subscribed"
                    subtitle="→ enters scoring, joins KLT"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <Connector />

          {/* ── Block 2: Scoring Engine ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border p-5"
            style={{ borderColor: `${C.amber}40`, backgroundColor: `${C.amber}08` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.amber }} />
              <span className="font-semibold text-sm" style={{ color: `${C.amber}CC` }}>
                Lead Scoring Engine
              </span>
              <span
                className="ml-auto font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ color: C.amber, backgroundColor: `${C.amber}20`, border: `1px solid ${C.amber}35` }}
              >
                0–100 composite
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/25 mb-2">
                  Fit Score — 50 pts
                </p>
                <ul className="space-y-1 text-xs text-white/45 font-mono">
                  <li>· Job title / seniority</li>
                  <li>· Industry / ICP match</li>
                  <li>· Company size</li>
                </ul>
                <p className="mt-2 text-[10px] font-mono text-white/22 italic">Static — set on entry</p>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/25 mb-2">
                  Behavior Score — 50 pts
                </p>
                <ul className="space-y-1 text-xs text-white/45 font-mono">
                  <li>· Email opens &amp; clicks</li>
                  <li>· Web visits</li>
                  <li>· Content downloads</li>
                  <li>· Social follows</li>
                </ul>
                <p className="mt-2 text-[10px] font-mono text-white/22 italic">Dynamic — updated on every signal</p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 rounded-lg border px-4 py-2.5"
              style={{ borderColor: `${C.amber}35`, backgroundColor: `${C.amber}10` }}
            >
              <span className="font-mono text-xs text-white/38">MQL threshold</span>
              <span className="font-bold text-lg font-mono" style={{ color: C.amber }}>75</span>
              <span className="font-mono text-xs text-white/38">points</span>
              <span className="ml-auto text-[10px] font-mono text-white/25 italic">
                Re-evaluated on every behavioral signal
              </span>
            </div>
          </motion.div>

          <Connector label="Score gates route to stage" />

          {/* ── Block 3: KLT Nurture ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 mb-3">
              Know, Like, Trust — automated nurture
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Awareness", range: "0–39", content: "Problem-led content. No product pitch.", color: "#B57EDC" },
                { label: "Consideration", range: "40–74", content: "Solution-led content. Methodology, proof points.", color: "#D4A574" },
                { label: "Decision", range: "75–90", content: "MQL achieved. Sales-assisted. Post-MQL nurture.", color: C.rose, isSales: true },
              ].map(({ label, range, content, color, isSales }) => (
                <div
                  key={label}
                  className="rounded-lg border p-4"
                  style={{ borderColor: `${color}40`, backgroundColor: `${color}0a` }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color }}>
                    {label}
                  </p>
                  <p className="font-bold text-xl font-mono mb-2" style={{ color: `${color}CC` }}>
                    {range}
                  </p>
                  <p className="text-xs text-white/42 leading-relaxed">{content}</p>
                  {isSales && (
                    <span
                      className="mt-2 inline-block text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: C.rose, backgroundColor: `${C.rose}18`, border: `1px solid ${C.rose}35` }}
                    >
                      Sales zone ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <Connector label="75+ → MQL trigger" />

          {/* ── Block 4: Sales Handoff ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border p-5"
            style={{ borderColor: `${C.rose}40`, backgroundColor: `${C.rose}08` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.rose }} />
              <span className="font-semibold text-sm" style={{ color: `${C.rose}CC` }}>
                Sales Takes Control
              </span>
              <span
                className="ml-auto font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ color: C.rose, backgroundColor: `${C.rose}20`, border: `1px solid ${C.rose}35` }}
              >
                Decision stage
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { step: "1", text: "MQL status triggered in CRM" },
                { step: "2", text: "Assigned Sales rep notified" },
                { step: "3", text: "Sequences manually managed by rep" },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${C.rose}20`, color: C.rose }}
                  >
                    {step}
                  </span>
                  <p className="text-xs text-white/50 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: `${C.rose}20` }}>
              <p className="text-[10px] font-mono text-white/25 mb-2">Sales toolkit at this stage</p>
              <div className="flex flex-wrap gap-2">
                {["1:1 sequences", "Case studies", "ROI content", "Competitive comparisons", "Proposal / pricing / contract"].map((item) => (
                  <span
                    key={item}
                    className="text-[10px] font-mono px-2 py-1 rounded"
                    style={{ color: `${C.rose}90`, backgroundColor: `${C.rose}10`, border: `1px solid ${C.rose}25` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <Connector label="91+ → contract sent signal" />

          {/* ── Block 5: Exit ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 mb-3">Exit</p>
            <div className="grid grid-cols-2 gap-3">
              <FlowNode
                color={C.coral}
                title="Score 91+"
                subtitle="Contract sent signal → exits all nurture sequences"
              />
              <FlowNode
                color={C.coral}
                title="Closed / Won"
                subtitle="Removed from all nurture entirely"
              />
            </div>
          </motion.div>

          <Connector dim />

          {/* ── Block 6: Goodbye ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 mb-3">
              Goodbye campaign
            </p>
            <FlowNode
              color={C.coral}
              title="Goodbye"
              subtitle="No activity for 6 months → sunset sequence → marked inactive"
              note="Strategic/ABM accounts are exempt and handled separately outside this system."
              wide
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DynamicNurtureClient() {
  return (
    <article>

      {/* ── Hero ── */}
      <section className="hero-card pt-16 pb-16 md:pt-24 md:pb-24 relative bg-white dark:bg-[#161616] border border-charcoal/10 dark:border-charcoal/10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-ember/5 -skew-x-12 transform translate-x-1/2 pointer-events-none -z-10" />
        <div className="container-narrow">
          <Breadcrumb
            back={{ href: '/portfolio', label: 'Portfolio' }}
            current="Case Study"
            className="mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-slate mb-6 uppercase tracking-wider">
              <span className="text-ember font-bold">B2B Demand Gen</span>
              <span className="w-1 h-1 bg-slate/30 rounded-full" />
              <span>HubSpot · Apollo</span>
              <span className="w-1 h-1 bg-slate/30 rounded-full hidden sm:block" />
              <div className="flex gap-2">
                {["Score-Gated Nurture", "Email Automation"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-slate/10 text-slate rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal dark:text-white leading-[1.05] tracking-tight mb-7">
              Email That Knows<br />Who You Are
            </h1>
            <p className="text-xl md:text-2xl text-slate max-w-2xl leading-relaxed">
              A system that delivers different content to the right person at the right stage — automatically.
            </p>
          </motion.div>

          {/* Concept pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { label: "3 segments", token: "text-lavender" },
              { label: "3 funnel stages", token: "text-copper" },
              { label: "9 content variants", token: "text-ember" },
              { label: "0–100 composite score", token: "text-slate" },
              { label: "Continuous re-evaluation", token: "text-slate" },
            ].map(({ label, token }) => (
              <span
                key={label}
                className={`font-mono text-[11px] px-3 py-1.5 rounded-full bg-charcoal/5 dark:bg-white/5 border border-charcoal/10 dark:border-white/10 ${token}`}
              >
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <RoutingSection />

      {/* ── Footer note ── */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-2xl border border-charcoal/10 dark:border-white/10 rounded-lg p-8 bg-white dark:bg-white/[0.03]">
            <p className="font-mono text-ember text-[10px] uppercase tracking-[0.2em] mb-4">Signal &amp; Context</p>
            <p className="text-slate leading-relaxed text-sm italic mb-4">
              This system was designed to eliminate the &ldquo;one size fits all&rdquo; problem in B2B nurture.
              The matrix ensures relevance at every touchpoint. The routing logic ensures no lead falls
              through without a signal.
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-charcoal/10 dark:border-white/10">
              <p className="text-[10px] font-mono text-slate/50">Built with</p>
              {["HubSpot", "Apollo"].map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] font-mono px-2 py-1 rounded border border-charcoal/10 dark:border-white/10 text-slate"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
