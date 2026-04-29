"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "solutions" | "threats" | "vendors" | "compliance";

// ─── Data ────────────────────────────────────────────────────────────────────

const PERIODS = ["15–18 Mo", "12–15 Mo", "9–12 Mo", "6–9 Mo", "3–6 Mo", "0–3 Mo"];

const PERIOD_LABELS = PERIODS.map((p) => `${p} Pre-Close`);

const PERIOD_CONTEXT = [
  "Early posture research. Buyers are assessing whether their current stack is adequate — not yet alarmed by a specific threat. Compliance and framework topics confirm a governance trigger may be initiating the cycle.",
  "Threat awareness doubles. Security Breaches enters the top 10 with the highest lift (+147%) of any topic in this period. Buyers are reading about breaches — but still through a solutions lens.",
  "The inflection point. Threat topics surge. Cyberwarfare jumps from #13 to #3. Ransomware enters the top 15. Symantec appears for the first time — vendor research has begun.",
  "Peak anxiety. Cyberwarfare hits 306 surges — the highest volume of any topic across all periods. Buyers are consuming threat content voraciously. Evaluation of legacy vendors is active.",
  "Active evaluation begins. Buyers shift from 'what's the threat?' to 'what stops it?' Security Tools, Malware Detection, and Fraud Detection signal tool-shopping and internal business case building.",
  "Final vendor selection. Security Intelligence (+127% lift) and Security Threats (+125% lift) are the sharpest purchase-intent signals. Decision friction is what kills deals at this stage.",
];

const KEYWORD_CATEGORIES: Record<string, Category> = {
  "Endpoint Security": "solutions",
  "Managed Security Services": "solutions",
  "Email Security": "solutions",
  "Anti Spam": "solutions",
  "Anti Virus": "solutions",
  "Security Tools": "solutions",
  "Data Encryption": "solutions",
  "Fraud Detection and Prevention": "solutions",
  "Security Solutions": "solutions",
  "Computer Hacking": "threats",
  "Malware Detection": "threats",
  Cyberwarfare: "threats",
  Ransomware: "threats",
  "Malware Attacks": "threats",
  "Security Breaches": "threats",
  "Cyber Threats": "threats",
  "Security Threats": "threats",
  "Symantec (SYMC)": "vendors",
  "Cyber Security Framework": "compliance",
  "Security Monitoring": "compliance",
  "System Monitors": "compliance",
  "Security Intelligence": "compliance",
  "Security Forensics": "compliance",
};

const CAT_STYLE: Record<Category, string> = {
  solutions: "bg-lavender/15 text-lavender border-lavender/25",
  threats: "bg-copper/15 text-copper border-copper/25",
  vendors: "bg-ember/10 text-ember/80 border-ember/20",
  compliance: "bg-lavender/10 text-lavender border-lavender/20",
};

const KEYWORDS_BY_PERIOD: string[][] = [
  [
    "Endpoint Security",
    "Security Monitoring",
    "Managed Security Services",
    "Computer Hacking",
    "Security Solutions",
    "Anti Spam",
    "Security Tools",
    "Malware Detection",
  ],
  [
    "Security Solutions",
    "Computer Hacking",
    "Managed Security Services",
    "Cyber Security Framework",
    "Anti Virus",
    "Email Security",
    "Security Monitoring",
    "Malware Detection",
    "Security Breaches",
  ],
  [
    "Computer Hacking",
    "Security Solutions",
    "Cyberwarfare",
    "Malware Detection",
    "Security Monitoring",
    "Security Tools",
    "Symantec (SYMC)",
    "System Monitors",
    "Endpoint Security",
    "Security Breaches",
  ],
  [
    "Cyberwarfare",
    "Computer Hacking",
    "Symantec (SYMC)",
    "Security Tools",
    "Malware Detection",
    "Malware Attacks",
    "Security Monitoring",
    "Anti Spam",
    "System Monitors",
    "Ransomware",
  ],
  [
    "Cyberwarfare",
    "Cyber Threats",
    "Security Tools",
    "Computer Hacking",
    "Malware Detection",
    "Email Security",
    "Fraud Detection and Prevention",
    "Symantec (SYMC)",
    "Security Monitoring",
    "Anti Spam",
  ],
  [
    "Security Tools",
    "Email Security",
    "Security Monitoring",
    "Symantec (SYMC)",
    "Malware Attacks",
    "System Monitors",
    "Data Encryption",
    "Security Intelligence",
    "Cyberwarfare",
    "Security Threats",
  ],
];

const JOURNEY_TOPICS: { topic: string; periods: (number | null)[]; count: string }[] = [
  { topic: "Security Monitoring", periods: [10, 7, 5, 7, 9, 3], count: "6 of 6" },
  { topic: "Computer Hacking", periods: [4, 2, 1, 2, 4, null], count: "5 of 6" },
  { topic: "Security Tools", periods: [7, null, 6, 4, 3, 1], count: "5 of 6" },
  { topic: "Malware Detection", periods: [8, 9, 4, 5, 5, null], count: "5 of 6" },
  { topic: "Email Security", periods: [3, 6, null, null, 6, 2], count: "4 of 6" },
  { topic: "Cyberwarfare", periods: [null, null, 3, 1, 1, 9], count: "4 of 6" },
  { topic: "Symantec (SYMC)", periods: [null, null, 7, 3, 8, 4], count: "4 of 6" },
];

const PHASES = [
  {
    label: "Phase 1 · 15–18 Mo",
    title: '"Do we have a problem?"',
    desc: "Broad category research. Buyers are assessing posture, not hunting vendors. Endpoint Security, Managed Security Services. Compliance frameworks appear early — governance or audit triggers likely initiating the cycle.",
    content: "Content play: awareness assets, security maturity benchmarks.",
  },
  {
    label: "Phase 2 · 12–15 Mo",
    title: '"What should we worry about?"',
    desc: "Threat awareness doubles. Security Breaches enters the top 10 (+147% lift). Buyers are reading about attacks but still framing them through a solutions lens.",
    content: 'Content play: breach case studies, "why traditional AV fails" narratives.',
  },
  {
    label: "Phase 3 · 9–12 Mo",
    title: '"It\'s worse than we thought"',
    desc: 'Inflection point. Computer Hacking takes #1. Cyberwarfare jumps from #13 to #3. Symantec appears for the first time — vendor research has begun.',
    content: 'Content play: urgency-building, "next-gen vs. legacy" framing, competitive positioning.',
  },
  {
    label: "Phase 4 · 6–9 Mo",
    title: '"Who can actually stop this?"',
    desc: "Peak threat volume. Cyberwarfare hits 306 surges. Ransomware spikes. Vendor comparison in full swing.",
    content: "Content play: threat intelligence reports, cost-of-breach calculators, head-to-head comparisons.",
  },
  {
    label: "Phase 5 · 3–6 Mo",
    title: '"We need to evaluate tools"',
    desc: "Shift to evaluation. Security Tools, Malware Detection, Security Forensics (+103% lift). Buyers are tool-shopping and building internal business cases.",
    content: "Content play: POC programs, ROI models, TCO comparisons.",
  },
  {
    label: "Phase 6 · 0–3 Mo",
    title: '"Time to decide"',
    desc: "Sharpest signals. Security Intelligence (+127% lift), Security Threats (+125% lift), Data Encryption (+85% lift). Symantec still at #4 — competitive pressure runs to the finish line.",
    content: "Content play: deployment guides, competitive knockdowns, executive-ready briefs.",
  },
];

const CAMPAIGNS = [
  {
    quarter: "Q1",
    name: '"The Security Audit"',
    funnel: "Top-of-Funnel",
    buyerPhase: "15–18 & 12–15 Mo Pre-Close",
    signals: ["Endpoint Security", "Managed Security Services", "Email Security", "Cyber Security Framework"],
    concept:
      'Security Posture Assessment / Maturity Model. Buyers asking "are we covered?" need a framework to answer that.',
    content: "State of Endpoint Security report, self-assessment tool, CISO webinar series",
    kpis: "Net-new contacts from gated assets, Bombora surge correlation, engagement depth",
  },
  {
    quarter: "Q2",
    name: '"Under Attack"',
    funnel: "Mid-Funnel / Threat Education",
    buyerPhase: "9–12 & 6–9 Mo Pre-Close",
    signals: ["Computer Hacking", "Cyberwarfare", "Ransomware", "Malware Attacks", "Security Breaches"],
    concept:
      "Threat-forward campaign building urgency. Peak anxiety — 306 Cyberwarfare surges, 291 Computer Hacking. Lean into it.",
    content:
      "Quarterly Threat Intelligence Report, anatomy-of-an-attack interactives, breach cost calculator, competitive wedge content",
    kpis: "Influenced pipeline, MQL-to-SQL conversion, surge-to-engagement correlation",
  },
  {
    quarter: "Q3",
    name: '"Prove It"',
    funnel: "Evaluation / Bottom-of-Funnel",
    buyerPhase: "3–6 Mo Pre-Close",
    signals: ["Security Tools", "Malware Detection", "Security Forensics", "Cyber Threats"],
    concept: "Buyers are tool-shopping and building internal business cases. Give them proof and ammunition.",
    content:
      "Technical whitepaper, third-party test results, customer case studies by vertical, POC program, ROI/TCO comparison tool",
    kpis: "POC requests, sales-accepted opportunities, competitive win rate, deal velocity",
  },
  {
    quarter: "Q4",
    name: '"Decision Time"',
    funnel: "Purchase / Close",
    buyerPhase: "0–3 Mo Pre-Close",
    signals: ["Security Tools", "Security Intelligence", "Data Encryption", "Security Threats"],
    concept:
      "Remove friction. These are the sharpest purchase-intent signals in the data. Every content piece should reduce switching risk and help champions sell up.",
    content:
      "Competitive knockdown guides (Symantec still top 5), deployment/integration guides, executive security brief, customer success stories",
    kpis: "Close rate, deal size, time-to-close, competitive displacement rate",
  },
];

const ABM_ROWS = [
  {
    stage: "Early Research",
    timeframe: "12–18 Mo Pre-Close",
    topics: [
      { name: "Security Breaches", lift: "+147%" },
      { name: "Endpoint Security", lift: "+60%" },
      { name: "Anti Spam", lift: "+98%" },
      { name: "Security Solutions", lift: "+55%" },
    ],
    action: "Enroll in awareness nurture. Prioritize for brand content. Flag for BDR awareness outreach.",
    color: "#B57EDC",
  },
  {
    stage: "Building Urgency",
    timeframe: "6–9 Mo Pre-Close",
    topics: [
      { name: "Ransomware", lift: "+127%" },
      { name: "Anti Spam", lift: "+127%" },
      { name: "Malware Attacks", lift: "+91%" },
      { name: "Symantec", lift: "+77%" },
      { name: "Computer Hacking", lift: "+67%" },
    ],
    action: "Escalate to threat-education track. Begin sales notification. Add to ABM target list.",
    color: "#D4A574",
  },
  {
    stage: "Active Evaluation",
    timeframe: "3–6 Mo Pre-Close",
    topics: [
      { name: "Security Forensics", lift: "+103%" },
      { name: "Anti Spam", lift: "+56%" },
      { name: "Email Security", lift: "+46%" },
      { name: "Malware Detection", lift: "+42%" },
    ],
    action: "Trigger sales outreach sequence. Serve POC/trial offers. Deploy competitive content.",
    color: "#f59e0b",
  },
  {
    stage: "Immediate Purchase Intent",
    timeframe: "0–3 Mo Pre-Close",
    topics: [
      { name: "Security Intelligence", lift: "+127%" },
      { name: "Security Threats", lift: "+125%" },
      { name: "Data Encryption", lift: "+85%" },
      { name: "Malware Attacks", lift: "+65%" },
    ],
    action: "Immediate sales priority. Executive briefing offer. Competitive knockdown ready. Remove all friction.",
    color: "#E34234",
  },
];

const TABS = ["Intent Timeline", "Buyer Journey", "Campaign Strategy", "ABM Triggers"];

const Q_COLORS = ["text-lavender", "text-copper", "text-amber-400", "text-ember"];
const Q_BORDERS = [
  "border-lavender/20 bg-lavender/[0.03]",
  "border-copper/20 bg-copper/[0.03]",
  "border-copper/20 bg-copper/[0.03]",
  "border-ember/20 bg-ember/[0.03]",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KeywordChip({ keyword }: { keyword: string }) {
  const cat = (KEYWORD_CATEGORIES[keyword] ?? "solutions") as Category;
  const words = keyword.split(" ");
  const needsBreak = words.length > 2;

  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-mono rounded border leading-tight ${CAT_STYLE[cat]}`}>
      {needsBreak ? (
        <>
          {words.slice(0, 2).join(" ")}
          <br />
          {words.slice(2).join(" ")}
        </>
      ) : (
        keyword
      )}
    </span>
  );
}

function TimelineSVG() {
  return (
    <svg
      viewBox="0 0 680 64"
      className="w-full h-auto"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="signalGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B57EDC" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#B57EDC" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Axis */}
      <line x1="16" y1="44" x2="660" y2="44" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* Arrow */}
      <polygon points="660,40 668,44 660,48" fill="rgba(255,255,255,0.1)" />
      {/* Ticks */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 16 + i * 108;
        const label = `${18 - i * 3}mo`;
        return (
          <g key={i}>
            <line x1={x} y1="41" x2={x} y2="47" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text
              x={x}
              y="58"
              textAnchor="middle"
              fontSize="9"
              fill="rgba(255,255,255,0.22)"
              fontFamily="JetBrains Mono, monospace"
            >
              {label}
            </text>
          </g>
        );
      })}
      {/* Close/Won label */}
      <text
        x="668"
        y="58"
        textAnchor="end"
        fontSize="9"
        fill="#B57EDC"
        fontFamily="JetBrains Mono, monospace"
        opacity="0.75"
      >
        CLOSE/WON
      </text>
      {/* Signal area */}
      <path
        d="M 16 43 C 100 42, 200 40, 300 35 C 420 28, 540 18, 660 6 L 660 44 L 16 44 Z"
        fill="url(#signalGrad)"
      />
      {/* Signal line */}
      <path
        d="M 16 43 C 100 42, 200 40, 300 35 C 420 28, 540 18, 660 6"
        stroke="#B57EDC"
        strokeWidth="1.5"
        opacity="0.55"
      />
      {/* Label */}
      <text
        x="20"
        y="14"
        fontSize="8"
        fill="rgba(74,159,216,0.28)"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="1.5"
      >
        SIGNAL INTENSITY →
      </text>
    </svg>
  );
}

// ─── Tab 1: Intent Timeline ───────────────────────────────────────────────────

function IntentTimelineTab() {
  const [hoveredPeriod, setHoveredPeriod] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Intent Signal Timeline</h2>
        <p className="text-white/35 text-sm font-mono">
          Top keywords by 3-month window. Hover a column to see buyer context.
        </p>
      </div>

      {/* Keyword grid */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-[860px]">
          {KEYWORDS_BY_PERIOD.map((keywords, colIdx) => (
            <div
              key={colIdx}
              className="flex-1 min-w-[130px] cursor-default"
              onMouseEnter={() => setHoveredPeriod(colIdx)}
              onMouseLeave={() => setHoveredPeriod(null)}
            >
              {/* Column header */}
              <div
                className={`px-3 py-2.5 rounded-t border-t border-x transition-all duration-150 ${
                  hoveredPeriod === colIdx
                    ? "border-lavender/35 bg-lavender/10 text-lavender"
                    : "border-white/8 bg-white/[0.025] text-white/30"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest leading-tight">
                  {PERIODS[colIdx]}
                </p>
                <p
                  className={`font-mono text-[9px] mt-0.5 transition-colors ${
                    hoveredPeriod === colIdx ? "text-lavender/50" : "text-white/15"
                  }`}
                >
                  Pre-Close
                </p>
              </div>
              {/* Keywords */}
              <div
                className={`px-2 py-3 rounded-b border border-t-0 flex flex-col gap-1.5 transition-all duration-150 ${
                  hoveredPeriod === colIdx
                    ? "border-lavender/35 bg-lavender/[0.04]"
                    : "border-white/8 bg-white/[0.01]"
                }`}
              >
                {keywords.map((kw) => (
                  <KeywordChip key={kw} keyword={kw} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context panel */}
      <div
        className={`p-5 rounded-lg border transition-all duration-200 ${
          hoveredPeriod !== null
            ? "border-lavender/25 bg-lavender/[0.05]"
            : "border-white/5 bg-white/[0.015]"
        }`}
      >
        <AnimatePresence mode="wait">
          {hoveredPeriod !== null ? (
            <motion.div
              key={hoveredPeriod}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <p className="font-mono text-lavender text-[10px] uppercase tracking-widest mb-2">
                {PERIOD_LABELS[hoveredPeriod]}
              </p>
              <p className="text-white/60 text-sm leading-relaxed">{PERIOD_CONTEXT[hoveredPeriod]}</p>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/20 text-sm font-mono"
            >
              Hover a period column to see buyer context →
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 pt-1">
        {(
          [
            ["solutions", "Solutions"],
            ["threats", "Threats"],
            ["vendors", "Vendors"],
            ["compliance", "Intelligence"],
          ] as [Category, string][]
        ).map(([cat, label]) => (
          <div key={cat} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded border ${CAT_STYLE[cat]}`} />
            <span className="text-[11px] text-white/30 font-mono">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 2: Buyer Journey ─────────────────────────────────────────────────────

function BuyerJourneyTab() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-1">Buyer Journey Backbone</h2>
        <p className="text-white/35 text-sm font-mono">
          Topics appearing in 4+ periods — the persistent signals across the full buying cycle.
        </p>
      </div>

      {/* Persistence table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/8">
              <th className="text-left py-3 pr-6 font-mono text-[10px] text-white/25 uppercase tracking-wider w-44">
                Topic
              </th>
              {PERIODS.map((p) => (
                <th
                  key={p}
                  className="py-3 px-2 font-mono text-[10px] text-white/25 uppercase tracking-wider text-center"
                >
                  {p}
                </th>
              ))}
              <th className="py-3 pl-4 font-mono text-[10px] text-white/25 uppercase tracking-wider text-right">
                Periods
              </th>
            </tr>
          </thead>
          <tbody>
            {JOURNEY_TOPICS.map((row, i) => (
              <motion.tr
                key={row.topic}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 pr-6 font-mono text-xs text-white/65">{row.topic}</td>
                {row.periods.map((rank, pIdx) => (
                  <td key={pIdx} className="py-3 px-2 text-center">
                    {rank !== null ? (
                      <span className="font-mono text-xs text-lavender font-semibold">#{rank}</span>
                    ) : (
                      <span className="text-white/15 text-sm">—</span>
                    )}
                  </td>
                ))}
                <td className="py-3 pl-4 font-mono text-xs text-white/35 text-right">{row.count}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phase narratives */}
      <div>
        <h3 className="text-lg font-bold mb-6 text-white/75">Phase Narrative</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PHASES.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 rounded-lg border border-white/8 bg-white/[0.02] hover:border-white/15 transition-colors"
            >
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">{phase.label}</p>
              <p className="font-bold text-white/85 mb-3 leading-snug">{phase.title}</p>
              <p className="text-sm text-white/48 leading-relaxed mb-3">{phase.desc}</p>
              <p className="text-xs font-mono text-lavender/55 italic">{phase.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3: Campaign Strategy ─────────────────────────────────────────────────

function CampaignStrategyTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">Quarterly Campaign Framework</h2>
        <p className="text-white/35 text-sm font-mono">
          Four campaigns mapping intent stages to content strategy and conversion goals.
        </p>
      </div>

      {/* Brand theme */}
      <div className="p-5 rounded-lg border border-white/8 bg-white/[0.02]">
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-wider mb-2">Global Brand Overlay</p>
        <p className="text-white/70 font-semibold italic mb-4">
          &ldquo;The Threat Has Evolved. Your Defense Should Too.&rdquo;
        </p>
        <div className="flex flex-wrap gap-5">
          {["Threat Intelligence", "Prevention Science", "Proof & Validation"].map((pillar, i) => (
            <span key={pillar} className="flex items-center gap-2 text-xs font-mono text-white/35">
              <span className="text-lavender opacity-60">{i + 1}.</span>
              {pillar}
            </span>
          ))}
        </div>
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CAMPAIGNS.map((c, i) => (
          <motion.div
            key={c.quarter}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`p-5 rounded-lg border ${Q_BORDERS[i]}`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`font-mono text-2xl font-bold ${Q_COLORS[i]}`}>{c.quarter}</span>
              <span className="font-mono text-[10px] text-white/22 uppercase tracking-wider text-right leading-snug">
                {c.buyerPhase}
              </span>
            </div>
            <p className="font-bold text-white/88 text-lg mb-1">{c.name}</p>
            <p className={`font-mono text-xs ${Q_COLORS[i]} opacity-65 mb-4`}>{c.funnel}</p>

            {/* Signals */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {c.signals.map((s) => (
                <KeywordChip key={s} keyword={s} />
              ))}
            </div>

            <div className="space-y-3.5">
              <div>
                <p className="text-[10px] font-mono text-white/22 uppercase tracking-wider mb-1">Concept</p>
                <p className="text-sm text-white/52 leading-relaxed">{c.concept}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-white/22 uppercase tracking-wider mb-1">Content</p>
                <p className="text-sm text-white/52 leading-relaxed">{c.content}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-white/22 uppercase tracking-wider mb-1">KPIs</p>
                <p className="text-sm text-white/52 leading-relaxed">{c.kpis}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 4: ABM Triggers ──────────────────────────────────────────────────────

function ABMTriggersTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">ABM Triggers — Signal to Action</h2>
        <p className="text-white/35 text-sm font-mono">
          High-lift intent topics mapped to buying stage and playbook action.
        </p>
      </div>

      <div className="space-y-4">
        {ABM_ROWS.map((row, i) => (
          <motion.div
            key={row.stage}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-lg border border-white/8 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.025]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                <span className="font-bold text-white/85">{row.stage}</span>
              </div>
              <span className="font-mono text-xs text-white/25">{row.timeframe}</span>
            </div>

            {/* Body */}
            <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-5 gap-5">
              {/* High-lift topics */}
              <div className="md:col-span-3">
                <p className="font-mono text-[10px] text-white/22 uppercase tracking-wider mb-2.5">High-Lift Signals</p>
                <div className="flex flex-wrap gap-2">
                  {row.topics.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-2 bg-white/[0.03] rounded px-3 py-1.5 border border-white/8"
                    >
                      <span className="text-xs text-white/55 font-mono">{t.name}</span>
                      <span className="text-xs font-bold font-mono" style={{ color: row.color }}>
                        {t.lift}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="md:col-span-2">
                <p className="font-mono text-[10px] text-white/22 uppercase tracking-wider mb-2.5">What to Do</p>
                <p className="text-sm text-white/52 leading-relaxed">{row.action}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IntentDataClient() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <article className="min-h-screen bg-offblack text-white">
      {/* Hero */}
      <section className="hero-card py-20 md:py-28 border-b border-white/5">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <ol className="flex items-center gap-2 text-xs text-white/28 font-mono">
              <li>
                <Link href="/" className="hover:text-white/55 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/15">/</li>
              <li>
                <Link href="/portfolio" className="hover:text-white/55 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li className="text-white/15">/</li>
              <li className="text-lavender">Intent Data</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="font-mono text-lavender text-[10px] uppercase tracking-[0.25em] mb-5">
              Cylance · 2018 · Bombora Intent Data · ~100 Close/Won Accounts
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-7">
              Intent Data as
              <br />
              Funnel Intelligence
            </h1>
            <p className="text-lg md:text-xl text-white/52 leading-relaxed">
              At Cylance, I pulled Bombora intent data across ~100 close/won enterprise accounts and mapped
              exactly what those buyers were researching — 18 months out to the day they signed. The result: a
              predictable signal model that let me serve the right content at the right time, and move
              conversion metrics.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12"
          >
            <TimelineSVG />
          </motion.div>
        </div>
      </section>

      {/* Sticky tab bar */}
      <div
        className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10, 12, 15, 0.96)" }}
      >
        <div className="container-narrow">
          <div className="flex overflow-x-auto">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 px-5 py-4 text-[11px] font-mono uppercase tracking-widest transition-all duration-150 border-b-2 ${
                  activeTab === i
                    ? "border-lavender text-lavender"
                    : "border-transparent text-white/28 hover:text-white/55"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 0 && <IntentTimelineTab />}
              {activeTab === 1 && <BuyerJourneyTab />}
              {activeTab === 2 && <CampaignStrategyTab />}
              {activeTab === 3 && <ABMTriggersTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Methodology note */}
      <section className="py-16 border-t border-white/5">
        <div className="container-narrow">
          <div className="max-w-2xl border border-white/8 rounded-lg p-8 bg-white/[0.015]">
            <p className="font-mono text-lavender text-[10px] uppercase tracking-[0.2em] mb-4">
              How this was built
            </p>
            <p className="text-white/48 leading-relaxed text-sm">
              Pulled Bombora intent data from ~100 Cylance close/won enterprise accounts (Jan–Jun 2018).
              Analyzed intent surge activity across 6 three-month windows from 18 months pre-close through
              close/won. Compared surge frequency and topic ranking against a non-buyer comparison group to
              calculate lift. The output: a signal model that let the demand gen team know what content to
              serve, to whom, and when — based on observed behavior from real buyers.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
