"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Info, Printer, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FitState {
  companySize: string;
  industry: string;
  titleSeniority: string;
  techStack: string;
}

interface EngState {
  behaviors: string[];
  buyingGroup: string;
  daysSinceTouch: string;
}

interface Signal {
  label: string;
  pts: number;
}

interface TierInfo {
  key: "DQ" | "A" | "B" | "C" | "D";
  label: string;
  color: string;
  bg: string;
  verdict: string;
}

// ─── Scoring constants ────────────────────────────────────────────────────────

const FIT_COMPANY = [
  { value: "lt_50", label: "< 50 employees", pts: 0 },
  { value: "50_200", label: "50–200", pts: 8 },
  { value: "200_1000", label: "200–1,000", pts: 15 },
  { value: "1000_5000", label: "1,000–5,000", pts: 12 },
  { value: "5000_plus", label: "5,000+", pts: 5 },
];

const FIT_INDUSTRY = [
  { value: "outside_icp", label: "Outside ICP (disqualify)", pts: -30, dq: true },
  { value: "adjacent", label: "Adjacent vertical", pts: 5 },
  { value: "core_icp", label: "Core ICP", pts: 12 },
  { value: "core_named", label: "Core ICP + named account", pts: 18 },
];

const FIT_TITLE = [
  { value: "ic", label: "Individual contributor", pts: 0 },
  { value: "manager", label: "Manager", pts: 5 },
  { value: "director", label: "Director", pts: 10 },
  { value: "vp", label: "VP", pts: 14 },
  { value: "c_suite", label: "C-suite", pts: 12 },
];

const FIT_TECH = [
  { value: "no_overlap", label: "No detected stack overlap", pts: 0 },
  { value: "complementary", label: "Complementary tools", pts: 4 },
  { value: "integration_partner", label: "Direct integration partner", pts: 8 },
  { value: "competitor", label: "Active competitor installed", pts: -10 },
];

const BEHAVIORS = [
  { value: "pricing_page", label: "Pricing page · 2+ visits", pts: 25 },
  { value: "demo_request", label: "Demo request submitted", pts: 20 },
  { value: "comparison_page", label: "Product comparison page", pts: 15 },
  { value: "case_study", label: "Case study download", pts: 12 },
  { value: "webinar", label: "Webinar attended live", pts: 8 },
  { value: "email_engaged", label: "Email sequence engaged", pts: 5 },
];

const BUYING_GROUP = [
  { value: "single", label: "Single contact only", pts: 0 },
  { value: "two", label: "2 contacts engaged", pts: 6 },
  { value: "3_4", label: "3–4 contacts (14d window)", pts: 12 },
  { value: "5_plus", label: "5+ stakeholders (PQA territory)", pts: 18 },
];

const DECAY = [
  { value: "0_14", label: "0–14 days (fresh)", pts: 0 },
  { value: "15_30", label: "15–30 days", pts: -8 },
  { value: "31_60", label: "31–60 days", pts: -18 },
  { value: "61_90", label: "61–90 days (cold)", pts: -30 },
];

// ─── Pure scoring functions ───────────────────────────────────────────────────

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function calcFit(s: FitState): { score: number; disqualified: boolean; breakdown: Signal[] } {
  const compPts = FIT_COMPANY.find((o) => o.value === s.companySize)?.pts ?? 0;
  const indPts = FIT_INDUSTRY.find((o) => o.value === s.industry)?.pts ?? 0;
  const titlePts = FIT_TITLE.find((o) => o.value === s.titleSeniority)?.pts ?? 0;
  const techPts = FIT_TECH.find((o) => o.value === s.techStack)?.pts ?? 0;

  const disqualified = s.industry === "outside_icp";
  const score = disqualified ? 0 : clamp(compPts + indPts + titlePts + techPts, 0, 50);

  return {
    score,
    disqualified,
    breakdown: [
      { label: "Company size", pts: compPts },
      { label: "Industry / ICP", pts: indPts },
      { label: "Title seniority", pts: titlePts },
      { label: "Tech stack", pts: techPts },
    ],
  };
}

function calcEng(s: EngState): {
  score: number;
  decayValue: number;
  behaviorSignals: Signal[];
  buyingGroupPts: number;
} {
  const behaviorPts = s.behaviors.reduce(
    (sum, b) => sum + (BEHAVIORS.find((o) => o.value === b)?.pts ?? 0),
    0
  );
  const buyingGroupPts = BUYING_GROUP.find((o) => o.value === s.buyingGroup)?.pts ?? 0;
  const score = clamp(behaviorPts + buyingGroupPts, 0, 50);
  const decayValue = DECAY.find((o) => o.value === s.daysSinceTouch)?.pts ?? 0;

  return {
    score,
    decayValue,
    behaviorSignals: s.behaviors.map((b) => {
      const opt = BEHAVIORS.find((o) => o.value === b)!;
      return { label: opt.label, pts: opt.pts };
    }),
    buyingGroupPts,
  };
}

function calcAI(fit: number, eng: number, dq: boolean): number {
  if (dq) return 0;
  if (fit >= 35 && eng >= 30) return 8;
  if (fit >= 30 && eng >= 20) return 5;
  if (fit >= 20 && eng >= 10) return 2;
  if (fit < 15 || eng < 5) return -3;
  return 0;
}

function getTier(total: number, dq: boolean): TierInfo {
  if (dq)
    return {
      key: "DQ",
      label: "DQ · OUTSIDE ICP",
      color: "#C43322",
      bg: "rgba(196,51,34,0.08)",
      verdict:
        "Disqualified at the fit layer. Route to nurture or suppress. Don't let engagement signals mask a structural mismatch.",
    };
  if (total >= 85)
    return {
      key: "A",
      label: "TIER A · SALES-READY",
      color: "#1B6B3A",
      bg: "rgba(27,107,58,0.08)",
      verdict:
        "PQA-grade. Auto-route to senior AE with sub-1hr SLA. Pull all buying group contacts into the play.",
    };
  if (total >= 70)
    return {
      key: "B",
      label: "TIER B · NURTURE-HOT",
      color: "#C17D3A",
      bg: "rgba(193,125,58,0.08)",
      verdict:
        "Hot nurture. SDR cadence + buying-group-aware sequences. Watch for the third signal that flips them to A.",
    };
  if (total >= 50)
    return {
      key: "C",
      label: "TIER C · MID-FUNNEL",
      color: "#1D1D1F",
      bg: "rgba(29,29,31,0.06)",
      verdict:
        "Mid-funnel. Behavioral retargeting + champion enablement content. Don't hand to sales yet.",
    };
  return {
    key: "D",
    label: "TIER D · TOP-FUNNEL",
    color: "#5B6470",
    bg: "rgba(91,100,112,0.06)",
    verdict:
      "Top-funnel. Educational nurture only. Pushing them to sales now burns the relationship and the AE's calendar.",
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string; pts: number }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-mono text-foreground-muted uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ember/40"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label} ({o.pts >= 0 ? "+" : ""}
            {o.pts} pts)
          </option>
        ))}
      </select>
    </div>
  );
}

function ScoreBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max === 0 ? 0 : Math.max(0, (Math.abs(value) / max) * 100);
  const isNegative = value < 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-foreground-muted">{label}</span>
        <span style={{ color }} className="font-semibold">
          {value >= 0 ? "+" : ""}
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: isNegative ? "#C43322" : color,
          }}
        />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HybridScoringClient() {
  const [fit, setFit] = useState<FitState>({
    companySize: "200_1000",
    industry: "core_icp",
    titleSeniority: "director",
    techStack: "integration_partner",
  });

  const [eng, setEng] = useState<EngState>({
    behaviors: [],
    buyingGroup: "3_4",
    daysSinceTouch: "0_14",
  });

  const fitResult = useMemo(() => calcFit(fit), [fit]);
  const engResult = useMemo(() => calcEng(eng), [eng]);
  const aiScore = useMemo(
    () => calcAI(fitResult.score, engResult.score, fitResult.disqualified),
    [fitResult.score, engResult.score, fitResult.disqualified]
  );

  const total = useMemo(
    () =>
      fitResult.disqualified
        ? 0
        : clamp(fitResult.score + engResult.score + engResult.decayValue + aiScore, 0, 100),
    [fitResult, engResult, aiScore]
  );

  const tier = useMemo(() => getTier(total, fitResult.disqualified), [total, fitResult.disqualified]);

  const topSignals = useMemo<Signal[]>(() => {
    const all: Signal[] = [
      ...fitResult.breakdown,
      ...engResult.behaviorSignals,
      { label: "Buying group activity", pts: engResult.buyingGroupPts },
      { label: "AI overlay", pts: aiScore },
    ];
    if (engResult.decayValue !== 0) {
      all.push({ label: "Time decay", pts: engResult.decayValue });
    }
    return all
      .filter((s) => s.pts !== 0)
      .sort((a, b) => Math.abs(b.pts) - Math.abs(a.pts))
      .slice(0, 5);
  }, [fitResult, engResult, aiScore]);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleBehavior = (value: string) => {
    setEng((prev) => ({
      ...prev,
      behaviors: prev.behaviors.includes(value)
        ? prev.behaviors.filter((b) => b !== value)
        : [...prev.behaviors, value],
    }));
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <section className="section border-b border-border">
        <div className="container-narrow">
          <motion.p
            className="text-xs font-mono text-ember uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Portfolio · Revenue Operations
          </motion.p>
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
          >
            Hybrid Lead Scoring
          </motion.h1>
          <motion.p
            className="text-lg text-foreground-muted max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            Simulate a real scoring model — fit layer, engagement layer, time
            decay, and AI overlay — then print the setup blueprint for your team.
          </motion.p>
        </div>
      </section>

      {/* ── Calculator zone ──────────────────────────────────────────────────── */}
      <section className="print:hidden py-8 md:py-12 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
            role="region"
            aria-label="Hybrid lead scoring calculator"
          >
            {/* ── Three-panel grid (responsive via inline grid) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.1fr] gap-4">

              {/* Panel 1 — Fit */}
              <div
                className="bg-background border border-border rounded-lg p-5 space-y-5"
                role="group"
                aria-label="Layer 01: Fit inputs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-mono text-ember uppercase tracking-widest font-semibold">
                      Layer 01 · Fit
                    </p>
                    <span className="text-xs font-mono text-foreground-muted">max 50 pts</span>
                  </div>
                  <p className="text-xs text-foreground-muted">
                    Firmographic + technographic fit against your ICP
                  </p>
                </div>

                <SelectField
                  label="Company size"
                  value={fit.companySize}
                  options={FIT_COMPANY}
                  onChange={(v) => setFit((p) => ({ ...p, companySize: v }))}
                />
                <SelectField
                  label="Industry / ICP match"
                  value={fit.industry}
                  options={FIT_INDUSTRY}
                  onChange={(v) => setFit((p) => ({ ...p, industry: v }))}
                />
                <SelectField
                  label="Title seniority"
                  value={fit.titleSeniority}
                  options={FIT_TITLE}
                  onChange={(v) => setFit((p) => ({ ...p, titleSeniority: v }))}
                />
                <SelectField
                  label="Tech stack signal"
                  value={fit.techStack}
                  options={FIT_TECH}
                  onChange={(v) => setFit((p) => ({ ...p, techStack: v }))}
                />

                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
                      Fit score
                    </span>
                    <span
                      className="text-lg font-mono font-bold"
                      style={{ color: fitResult.disqualified ? "#C43322" : "#1D1D1F" }}
                    >
                      {fitResult.disqualified ? "DQ" : `${fitResult.score} / 50`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Panel 2 — Engagement */}
              <div
                className="bg-background border border-border rounded-lg p-5 space-y-5"
                role="group"
                aria-label="Layer 02: Engagement inputs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-mono text-lavender uppercase tracking-widest font-semibold">
                      Layer 02 · Engagement
                    </p>
                    <span className="text-xs font-mono text-foreground-muted">max 50 pts</span>
                  </div>
                  <p className="text-xs text-foreground-muted">
                    High-intent behaviors in the last 14 days
                  </p>
                </div>

                <fieldset className="space-y-2" aria-label="High-intent behaviors (last 14 days)">
                  <legend className="text-xs font-mono text-foreground-muted uppercase tracking-wider mb-2">
                    High-intent behaviors (last 14 days)
                  </legend>
                  {BEHAVIORS.map((b) => (
                    <label
                      key={b.value}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={eng.behaviors.includes(b.value)}
                        onChange={() => toggleBehavior(b.value)}
                        className="w-4 h-4 rounded border-border text-ember accent-ember focus:ring-ember/30 cursor-pointer"
                        aria-label={`${b.label} (+${b.pts} pts)`}
                      />
                      <span className="text-sm text-foreground group-hover:text-ember transition-colors flex-1">
                        {b.label}
                      </span>
                      <span className="text-xs font-mono text-foreground-muted">+{b.pts}</span>
                    </label>
                  ))}
                </fieldset>

                <SelectField
                  label="Buying group activity"
                  value={eng.buyingGroup}
                  options={BUYING_GROUP}
                  onChange={(v) => setEng((p) => ({ ...p, buyingGroup: v }))}
                />

                <SelectField
                  label="Days since last meaningful touch"
                  value={eng.daysSinceTouch}
                  options={DECAY}
                  onChange={(v) => setEng((p) => ({ ...p, daysSinceTouch: v }))}
                />

                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
                      Engagement score
                    </span>
                    <span className="text-lg font-mono font-bold text-foreground">
                      {engResult.score} / 50
                    </span>
                  </div>
                  {engResult.decayValue < 0 && (
                    <p className="text-xs font-mono text-ember mt-1">
                      Decay: {engResult.decayValue} pts applied to composite
                    </p>
                  )}
                </div>
              </div>

              {/* Panel 3 — Output */}
              <div
                className="border-2 rounded-lg p-5 flex flex-col gap-5 transition-all duration-500"
                style={{ borderColor: tier.color, backgroundColor: tier.bg }}
                role="region"
                aria-label="Scoring output"
                aria-live="polite"
              >
                {/* Score + tier */}
                <div className="text-center">
                  <div
                    className="text-8xl font-mono font-bold leading-none tracking-tighter transition-all duration-500"
                    style={{ color: tier.color }}
                    aria-label={`Composite score: ${fitResult.disqualified ? "Disqualified" : total}`}
                  >
                    {fitResult.disqualified ? "—" : total}
                  </div>
                  <div
                    className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest transition-all duration-500"
                    style={{ color: tier.color, backgroundColor: `${tier.color}20` }}
                  >
                    {tier.label}
                  </div>
                </div>

                {/* Score bars */}
                <div className="space-y-3">
                  <ScoreBar label="Fit" value={fitResult.score} max={50} color={tier.color} />
                  <ScoreBar label="Engagement" value={engResult.score} max={50} color={tier.color} />
                  <ScoreBar label="AI overlay" value={aiScore} max={10} color={tier.color} />
                  <ScoreBar label="Time decay" value={engResult.decayValue} max={30} color={tier.color} />
                </div>

                {/* Top signals */}
                {topSignals.length > 0 && (
                  <div>
                    <p className="text-xs font-mono text-foreground-muted uppercase tracking-wider mb-2">
                      Top signals
                    </p>
                    <ul className="space-y-1">
                      {topSignals.map((s, i) => (
                        <li key={i} className="flex justify-between text-xs font-mono">
                          <span className="text-foreground truncate pr-2">{s.label}</span>
                          <span
                            className="font-semibold shrink-0"
                            style={{ color: s.pts < 0 ? "#C43322" : tier.color }}
                          >
                            {s.pts >= 0 ? "+" : ""}
                            {s.pts}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Verdict */}
                <div
                  className="rounded px-4 py-3 mt-auto"
                  style={{ backgroundColor: `${tier.color}15` }}
                >
                  <p
                    className="text-xs italic leading-relaxed"
                    style={{ color: tier.color }}
                  >
                    {tier.verdict}
                  </p>
                </div>

                {/* AI overlay footnote */}
                <p className="text-[10px] font-mono text-foreground-muted flex items-start gap-1">
                  <Info size={10} className="mt-0.5 shrink-0" />
                  AI overlay is simulated. Real HubSpot AI scoring requires 500+
                  contacts and 3 months of labeled outcome data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Action bar ───────────────────────────────────────────────────────── */}
      <section className="print:hidden bg-charcoal dark:bg-offblack border-b border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-white/70 max-w-xl">
              This is the model. The hard part is{" "}
              <em className="text-white not-italic font-medium">
                operationalizing it inside HubSpot
              </em>{" "}
              — workflow logic, decay rules, explainability fields, SLA routing, third-party
              intent gates. Print the setup blueprint for your team, or bring me in to build
              it.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => window.print()}
                className="btn-secondary-dark inline-flex items-center gap-2 text-sm"
                aria-label="Print setup blueprint as PDF"
              >
                <Printer size={15} />
                Print blueprint
              </button>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Hire Saren
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Print blueprint (hidden on screen) ───────────────────────────────── */}
      <div className="hidden print:block p-8 max-w-3xl mx-auto font-sans text-black">
        <div className="border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold">Hybrid Lead Scoring Setup Blueprint</h1>
          <p className="text-sm text-gray-600 mt-1">
            Generated {today} · saren.ai/playbooks/hybrid-lead-scoring
          </p>
        </div>

        {/* Score summary callout */}
        <div
          className="border rounded-lg p-5 mb-8"
          style={{ borderColor: tier.color, backgroundColor: tier.bg }}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: tier.color }}>
                Simulated composite score
              </p>
              <p className="text-5xl font-mono font-bold" style={{ color: tier.color }}>
                {fitResult.disqualified ? "DQ" : total}
              </p>
              <p className="font-mono text-sm mt-1" style={{ color: tier.color }}>
                {tier.label}
              </p>
            </div>
            <div className="text-sm space-y-1 text-right font-mono">
              <p>Fit: <strong>{fitResult.score}</strong> / 50</p>
              <p>Engagement: <strong>{engResult.score}</strong> / 50</p>
              <p>AI overlay: <strong>{aiScore >= 0 ? "+" : ""}{aiScore}</strong></p>
              <p>Decay: <strong>{engResult.decayValue}</strong></p>
            </div>
          </div>
          <p className="text-sm italic mt-3 border-t pt-3" style={{ borderColor: `${tier.color}40`, color: tier.color }}>
            Recommended routing: {tier.verdict}
          </p>
        </div>

        {/* Blueprint sections */}
        <h2 className="text-lg font-bold mb-2 mt-6">1. Deploy Hybrid Architecture</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm mb-5">
          <li>Run native AI predictive scoring alongside manual rules — not instead of them</li>
          <li>AI catches non-obvious patterns; manual layer enforces ICP guardrails and hard disqualifiers</li>
          <li>Prerequisite: 500+ contacts, 3 months of clean historical data, labeled closed-won/lost outcomes</li>
          <li>Validate data hygiene before activating the model — garbage in, confident garbage out</li>
        </ul>

        <h2 className="text-lg font-bold mb-2">2. Configure Contact + Company Scoring</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm mb-5">
          <li>Enable company-level scoring with parent-child hierarchy support</li>
          <li>Company score identifies the PQA (Pipeline Qualified Account)</li>
          <li>Contact score identifies the champion or decision-maker within the PQA</li>
          <li>Aggregate buying-group signals across all contacts at the account level</li>
          <li>Map stakeholder engagement windows: 5+ contacts in 14 days = PQA-territory signal</li>
        </ul>

        <h2 className="text-lg font-bold mb-2">3. Calibrate Fit, Engagement, and Decay</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm mb-5">
          <li>Fit layer (50 pts max): firmographics + technographics, no automatic decay</li>
          <li>Engagement layer (50 pts max): behavior signals with 30–90 day timed decay</li>
          <li>Pricing page visits: +15 to +35 pts. Demo request: +20 to +30 pts</li>
          <li>Configure decay curves per layer — engagement decay is the most common failure mode</li>
          <li>Refresh fit data via enrichment every 60–90 days</li>
        </ul>

        <h2 className="text-lg font-bold mb-2">4. Make Scores Explainable</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm mb-5">
          <li>Expose top 3 signal-contribution drivers on every contact and company record</li>
          <li>Surface color-coded tier badges (A/B/C/D) in AE and SDR list views</li>
          <li>Add a plain-language explanation string to the contact card</li>
          <li>If an AE can&apos;t explain a score in 5 seconds, the model is dead on arrival</li>
        </ul>

        <h2 className="text-lg font-bold mb-2">5. Wire Scores into Workflows</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm mb-5">
          <li>Auto-route top-decile + ICP-fit accounts to senior AEs with sub-1hr first-touch SLAs</li>
          <li>Third-party intent (Bombora, 6sense) as a trigger, not a base score</li>
          <li>Bombora surge + first-party engagement event within 14 days = escalate to sales-ready</li>
          <li>Integrate Crossbeam / Reveal partner-overlap signals into account-level engagement scores</li>
        </ul>

        <div className="border-t border-gray-300 mt-8 pt-4 text-xs text-gray-500 font-mono">
          Saren Peetz · Fractional Marketing Lead + AI Ops · saren.ai/contact · Identogram LLC
        </div>
      </div>

      {/* ── Long-form copy ────────────────────────────────────────────────────── */}
      <article className="print:hidden">

        {/* Section 1 — State of scoring in 2026 */}
        <section className="section border-b border-border">
          <div className="container-narrow prose prose-neutral dark:prose-invert max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                The state of scoring in 2026
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-4">
                Most B2B marketing teams are still running a 2018 scoring model on a 2026 buyer.
              </p>
              <p className="text-foreground-muted leading-relaxed mb-4">
                The buyer has changed. Buying groups are larger (Gartner&apos;s last cut put the average
                B2B buying committee at 11+ people). Cycles are longer. First-touch happens in places
                your CRM can&apos;t see — Slack communities, LinkedIn posts, peer recommendations, AI
                search. And the same lead can look like a tire-kicker on Monday and a sales-ready
                PQA on Thursday because three of their colleagues quietly opened your pricing page.
              </p>
              <p className="text-foreground-muted leading-relaxed mb-4">
                The scoring system has not changed. Most HubSpot instances I audit still look like
                this:
              </p>
              <ul className="space-y-1 mb-4 text-foreground-muted">
                {[
                  "Single contact-level score",
                  "Manual point accumulation only",
                  "No company-level rollup",
                  "No inactivity decay",
                  "No third-party intent gating",
                  "No explainability — sales has no idea why anyone is a 73",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-ember mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground-muted leading-relaxed mb-4">
                Result: a number sales doesn&apos;t trust, scoring a person who isn&apos;t actually the
                decision-maker, based on signals that went cold two months ago. The score still goes
                up. Sales still ignores it. Marketing still reports MQLs. Nobody closes.
              </p>
              <p className="text-foreground-muted leading-relaxed">
                In <strong className="text-foreground">August 2025, HubSpot shipped its biggest
                scoring overhaul in a decade</strong> for Marketing Hub Pro and Enterprise. Native AI
                predictive scoring. Company-level scoring with parent-child hierarchies.
                Signal-contribution explainability. Configurable decay rules. The pieces are finally
                in the box.{" "}
                <span className="text-foreground font-medium">Almost nobody is using them.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 2 — The old way */}
        <section className="section border-b border-border">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                The old way (and why it&apos;s broken)
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Manual rules only.",
                    body: "Someone in marketing ops wrote a Google Doc in 2021 listing point values for every form fill and email click. It hasn't been touched since. Half the conditions reference fields that no longer exist.",
                  },
                  {
                    title: "Contact-level only.",
                    body: "You score the analyst who downloaded the whitepaper. You don't score the VP who visited the pricing page from a different browser, on a different day, from the same company. They look like two unrelated humans to your CRM. They are not.",
                  },
                  {
                    title: "No decay.",
                    body: "A pricing page visit from January counts the same as one from yesterday. Sales gets handed a lead who hasn't opened an email in 90 days and is told they're \"hot.\"",
                  },
                  {
                    title: "No explainability.",
                    body: "The score is 73. Why? Nobody knows. Sales clicks past it. The whole system is theatrical.",
                  },
                  {
                    title: "Third-party intent treated as a base score.",
                    body: "Bombora says the account is surging on \"lead scoring.\" You inflate the score 30 points based on a vendor-supplied signal with no first-party corroboration. You hand sales a lead they've never heard from. They ghost it.",
                  },
                ].map((item) => (
                  <div key={item.title} className="pl-4 border-l-2 border-ember/30">
                    <p className="text-foreground leading-relaxed">
                      <strong className="text-foreground">{item.title}</strong>{" "}
                      <span className="text-foreground-muted">{item.body}</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-foreground-muted leading-relaxed mt-6 italic">
                This is functionally indistinguishable from not scoring at all — except you spent
                six figures on the tooling.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 3 — The new way */}
        <section className="section border-b border-border">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-3">
                The new way: hybrid architecture
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-8">
                The 2026 model is not &quot;let AI do it.&quot; It&apos;s{" "}
                <strong className="text-foreground">
                  AI + manual rules, contact + company, fit + engagement, with explainability and
                  decay baked in.
                </strong>{" "}
                Five non-negotiables:
              </p>

              <div className="space-y-8">
                {/* Non-negotiable 1 */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    1. Hybrid architecture (AI + manual rules)
                  </h3>
                  <p className="text-foreground-muted leading-relaxed mb-3">
                    Native AI predictive scoring runs <em>alongside</em> manual rules, not instead
                    of them. The AI catches patterns humans miss. The manual layer enforces hard
                    guardrails — ICP fit, absolute disqualifiers, baseline sanity checks. Neither
                    layer alone is enough.
                  </p>
                  <div className="bg-ember/5 border border-ember/20 rounded-lg px-4 py-3">
                    <p className="text-sm text-foreground-muted">
                      <strong className="text-foreground">Activation requirements:</strong> 500+
                      contacts, 3 months of clean historical data, properly labeled closed-won and
                      closed-lost outcomes. If you don&apos;t have the data hygiene, fix that before
                      turning on the model. Garbage in, confident garbage out.
                    </p>
                  </div>
                </div>

                {/* Non-negotiable 2 */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    2. Contact AND company-level scoring
                  </h3>
                  <p className="text-foreground-muted leading-relaxed mb-3">
                    80%+ of B2B SaaS purchases are buying-group decisions. Scoring individuals in
                    isolation tells you who&apos;s curious. Scoring accounts tells you who&apos;s{" "}
                    <em>buying</em>.
                  </p>
                  <ul className="space-y-2 text-foreground-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-ember mt-1 shrink-0">→</span>
                      <span>
                        <strong className="text-foreground">Company-level</strong> — identifies
                        the PQA. Aggregates signals across the buying group. Maps parent-child
                        corporate structures.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ember mt-1 shrink-0">→</span>
                      <span>
                        <strong className="text-foreground">Contact-level</strong> — identifies
                        the champion or decision-maker inside the PQA. Tells the AE which name to
                        put on the calendar invite.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Non-negotiable 3 */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    3. Fit vs. engagement weighting and decay
                  </h3>
                  <p className="text-foreground-muted leading-relaxed mb-4">
                    HubSpot&apos;s 2025 default is a 50/50 split between firmographic fit and behavioral
                    engagement on a 100-point scale. Configure each layer with its own decay rules:
                  </p>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 font-mono text-xs text-foreground-muted uppercase tracking-wider">Layer</th>
                          <th className="text-left py-2 pr-4 font-mono text-xs text-foreground-muted uppercase tracking-wider">Decay</th>
                          <th className="text-left py-2 font-mono text-xs text-foreground-muted uppercase tracking-wider">Refresh mechanism</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-2.5 pr-4 font-medium text-foreground">Fit <span className="font-normal text-foreground-muted">(firmographics, technographics)</span></td>
                          <td className="py-2.5 pr-4 text-foreground-muted">None — long half-life</td>
                          <td className="py-2.5 text-foreground-muted">Enrichment every 60–90 days</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-4 font-medium text-foreground">Engagement <span className="font-normal text-foreground-muted">(behavior)</span></td>
                          <td className="py-2.5 pr-4 text-foreground-muted">30–90 day timed decay</td>
                          <td className="py-2.5 text-foreground-muted">Continuous from CRM activity</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-ember/5 border border-ember/20 rounded-lg px-4 py-3">
                    <p className="text-sm text-foreground-muted">
                      <strong className="text-foreground">The single most common mid-market
                      failure mode is the lack of engagement decay.</strong> If you fix one thing
                      in your scoring system this quarter, fix this.
                    </p>
                  </div>
                </div>

                {/* Non-negotiable 4 */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    4. Explainability — or sales won&apos;t use it
                  </h3>
                  <p className="text-foreground-muted leading-relaxed mb-3">
                    The reason predictive scoring fails is not technical. It&apos;s that AEs distrust
                    black-box numbers. HubSpot now exposes{" "}
                    <strong className="text-foreground">signal-contribution explanations</strong>{" "}
                    showing which inputs drove the score. Surface them.
                  </p>
                  <ul className="space-y-2 text-foreground-muted">
                    {[
                      "Top 3 score drivers on every contact and company record",
                      "Color-coded tier badges (A/B/C/D) in views SDRs and AEs actually use",
                      "A short explanation string in the contact card — not buried in a settings panel",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-ember mt-1 shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-foreground-muted leading-relaxed mt-3 italic">
                    If your AEs can&apos;t tell you why a score is what it is in 5 seconds, the model
                    is dead on arrival. The math doesn&apos;t matter if humans don&apos;t trust it.
                  </p>
                </div>

                {/* Non-negotiable 5 */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    5. Workflows: routing and third-party intent triggers
                  </h3>
                  <p className="text-foreground-muted leading-relaxed mb-3">
                    Scoring only generates ROI when it&apos;s wired into RevOps execution:
                  </p>
                  <ul className="space-y-2 text-foreground-muted">
                    {[
                      "Auto-route top-decile + ICP-fit accounts to senior AEs with sub-1-hour first-touch SLAs",
                      "Third-party intent as a trigger, not a base score. A Bombora surge alone shouldn&apos;t move the needle — but a Bombora surge plus a first-party engagement event inside a 14-day window → escalate to sales-ready",
                      "Ecosystem integration: Crossbeam / Reveal for partner-overlap signals → feed into account-level engagement scores natively",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-ember mt-1 shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4 — Implementation plan */}
        <section className="section border-b border-border">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-3">
                What it takes to upgrade your platform
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-8">
                If you&apos;re on Marketing Hub Pro or Enterprise, you already have the tooling. What
                you don&apos;t have is the time, the data hygiene, or the cross-functional buy-in to
                ship this without dropping the rest of your quarter.
              </p>

              <div className="space-y-6">
                {[
                  {
                    week: "Week 1",
                    title: "Audit",
                    items: [
                      "Inventory current scoring rules. Most teams find 40–60% are obsolete or reference dead fields.",
                      "Validate closed-won/closed-lost data quality for the last 6 months",
                      "Stakeholder interviews: marketing, SDR leadership, AE leadership, RevOps",
                    ],
                  },
                  {
                    week: "Week 2–3",
                    title: "Architecture",
                    items: [
                      "Define fit criteria with sales (firmographics, titles, tech stack signals)",
                      "Map behavioral signal weights against actual win/loss data",
                      "Configure company-level scoring with parent-child rules",
                      "Set decay curves per layer",
                    ],
                  },
                  {
                    week: "Week 4",
                    title: "Build",
                    items: [
                      "Implement scoring in HubSpot (manual layer first, AI overlay second)",
                      "Build explainability surfaces in CRM views",
                      "Wire workflow logic: routing, SLAs, intent triggers",
                      "Integrate third-party intent and ecosystem data (6sense, Bombora, Crossbeam, Reveal)",
                    ],
                  },
                  {
                    week: "Week 5",
                    title: "Sales enablement",
                    items: [
                      "Train AEs on the new tier system",
                      "Build the playbooks per tier",
                      "Set up feedback loop: AEs flag bad scores → model recalibrates",
                    ],
                  },
                  {
                    week: "Week 6+",
                    title: "Calibrate",
                    items: [
                      "Weekly score-quality review for the first 60 days",
                      "Adjust weights based on AE feedback and pipeline conversion data",
                      "Quarterly enrichment refresh on fit data",
                    ],
                  },
                ].map((phase) => (
                  <div key={phase.week} className="flex gap-4 md:gap-6">
                    <div className="shrink-0 w-20 text-right">
                      <span className="text-xs font-mono text-ember font-semibold uppercase tracking-wider">
                        {phase.week}
                      </span>
                    </div>
                    <div className="flex-1 pb-6 border-l border-border pl-4 md:pl-6">
                      <h3 className="font-bold text-foreground mb-2">{phase.title}</h3>
                      <ul className="space-y-1.5">
                        {phase.items.map((item) => (
                          <li key={item} className="text-sm text-foreground-muted flex items-start gap-2">
                            <span className="text-ember mt-1 shrink-0">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-foreground-muted leading-relaxed mt-6 italic">
                This is not a HubSpot admin task. It is a cross-functional revenue operations
                rebuild that touches marketing, sales, RevOps, and data. Done well, it pays for
                itself inside one quarter through better AE conversion and faster time-to-first-touch
                on real PQAs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 5 — Hire-me CTA */}
        <section className="section">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                I do this for a living.
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-8">
                I&apos;m Saren — Fractional Marketing Lead and AI Ops consultant. I&apos;ve rebuilt scoring systems for
                sovereign AI infrastructure companies, behavioral intelligence platforms, and B2B
                SaaS teams running on HubSpot Pro and Enterprise. I&apos;ll audit what you have, design
                the hybrid model your buyers actually need, and ship it inside your HubSpot instance
                with sales adoption built into the rollout.
              </p>

              <p className="text-sm font-semibold text-foreground mb-4">Two ways to start:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="card p-5">
                  <p className="text-xs font-mono text-ember uppercase tracking-wider mb-2">
                    1. Free · 30 min
                  </p>
                  <h3 className="font-bold text-foreground mb-2">Diagnostic call</h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    I&apos;ll review your current scoring setup and tell you, honestly, whether you need
                    a tune-up or a rebuild.
                  </p>
                  <Link href="/contact" className="btn-primary text-sm inline-flex items-center gap-2">
                    Book a diagnostic call
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="card p-5">
                  <p className="text-xs font-mono text-lavender uppercase tracking-wider mb-2">
                    2. Paid · Fixed-fee
                  </p>
                  <h3 className="font-bold text-foreground mb-2">Scoring audit</h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    Full audit of your HubSpot scoring instance + a written hybrid architecture
                    recommendation. Deliverable in 10 business days.
                  </p>
                  <Link href="/contact" className="btn-lavender text-sm inline-flex items-center gap-2">
                    Enquire about the audit
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <p className="text-xs text-foreground-muted border-t border-border pt-6">
                Saren Peetz operates Identogram LLC (EIN: 88-1671889). Fractional marketing lead engagements
                for B2B SaaS and AI infrastructure companies. Based in Orange County, working with
                teams in PT, ET, and JST.
              </p>
            </motion.div>
          </div>
        </section>

      </article>
    </div>
  );
}
