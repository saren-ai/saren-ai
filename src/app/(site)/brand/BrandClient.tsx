"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart,
  BarChart2,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Clock,
  Copy,
  DollarSign,
  ExternalLink,
  Eye,
  EyeOff,
  Factory,
  FileText,
  Film,
  Filter,
  Github,
  Grid3x3,
  Info,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MousePointer2,
  MousePointerClick,
  Navigation,
  Pencil,
  Phone,
  RefreshCw,
  Rocket,
  RotateCcw,
  Settings,
  Share2,
  Shield,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ────────────────────────────────────────────
   Contrast ratio helpers (WCAG 2.1 algorithm)
   ──────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagLevel(ratio: number): { label: string; color: string } {
  if (ratio >= 7) return { label: "AAA", color: "#16a34a" };
  if (ratio >= 4.5) return { label: "AA", color: "#2563eb" };
  if (ratio >= 3) return { label: "AA Large", color: "#ca8a04" };
  return { label: "FAIL", color: "#dc2626" };
}

/* ────────────────────────────────────────────
   Design tokens (source of truth from globals.css)
   ──────────────────────────────────────────── */

interface ColorToken {
  name: string;
  cssVar: string;
  tailwind: string;
  lightHex: string;
  darkHex: string;
  notes: string;
}

const COLOR_TOKENS: ColorToken[] = [
  {
    name: "Ember Red",
    cssVar: "--ember-red",
    tailwind: "text-ember / bg-ember",
    lightHex: "#C43322",
    darkHex: "#E34234",
    notes: "Primary brand color. 5.06:1 on light bg. Darkened from #E34234 for AA.",
  },
  {
    name: "Charcoal",
    cssVar: "--charcoal-black",
    tailwind: "text-charcoal / bg-charcoal",
    lightHex: "#1D1D1F",
    darkHex: "#F0F4FA",
    notes: "Primary text. 15.6:1 AAA on light bg. Inverts in dark mode.",
  },
  {
    name: "Ash White",
    cssVar: "--ash-white",
    tailwind: "text-ash / bg-ash",
    lightHex: "#F5F5F7",
    darkHex: "#0F0F0F",
    notes: "Background surface. Flips to obsidian in dark mode.",
  },
  {
    name: "Electric Blue",
    cssVar: "--lavender",
    tailwind: "text-lavender / bg-lavender",
    lightHex: "#7C5AA3",
    darkHex: "#B57EDC",
    notes: "Accent / links. 5.26:1 AA on light bg. Darkened from #7C5AA3.",
  },
  {
    name: "Copper",
    cssVar: "--copper",
    tailwind: "text-copper / bg-copper",
    lightHex: "#C17D3A",
    darkHex: "#D4A574",
    notes: "Warm accent. 3.8:1 — AA for large text only. Do not use for small body.",
  },
  {
    name: "Slate Gray",
    cssVar: "--slate-gray",
    tailwind: "text-slate",
    lightHex: "#5B6470",
    darkHex: "#A8B2BF",
    notes: "Muted/secondary text. 5.55:1 AA on light bg. Darkened from #6C757D.",
  },
  {
    name: "Off-black",
    cssVar: "--off-black",
    tailwind: "bg-offblack",
    lightHex: "#1D1D1F",
    darkHex: "#0F0F0F",
    notes: "Deep background. Same as charcoal in light; obsidian in dark.",
  },
];

/* Foreground/background combos to test */
interface ContrastPair {
  fg: string;
  fgHex: string;
  bg: string;
  bgHex: string;
  mode: "light" | "dark";
}

const LIGHT_BG = "#F5F5F7";
const DARK_BG = "#0F0F0F";
const WHITE = "#FFFFFF";
const CARD_DARK = "#1A1A1A";
const GRADIENT_DARK_START = "#1D3557";
const GRADIENT_DARK_END = "#212529";

function buildContrastPairs(): ContrastPair[] {
  const pairs: ContrastPair[] = [];

  // Light mode pairs
  const lightFgs: [string, string][] = [
    ["Ember", "#C43322"],
    ["Charcoal", "#1D1D1F"],
    ["Electric", "#7C5AA3"],
    ["Copper", "#C17D3A"],
    ["Slate", "#5B6470"],
    ["White (btn)", "#FFFFFF"],
  ];
  const lightBgs: [string, string][] = [
    ["Ash (#F5F5F7)", LIGHT_BG],
    ["White (#FFF)", WHITE],
    ["Ember (#C43322)", "#C43322"],
    ["Gradient-dark start", GRADIENT_DARK_START],
    ["Gradient-dark end", GRADIENT_DARK_END],
  ];
  for (const [fgName, fgHex] of lightFgs) {
    for (const [bgName, bgHex] of lightBgs) {
      if (fgHex === bgHex) continue;
      pairs.push({ fg: fgName, fgHex, bg: bgName, bgHex, mode: "light" });
    }
  }

  // Dark mode pairs
  const darkFgs: [string, string][] = [
    ["Ember", "#E34234"],
    ["Charcoal (inv)", "#F0F4FA"],
    ["Electric", "#B57EDC"],
    ["Copper", "#D4A574"],
    ["Slate", "#A8B2BF"],
    ["White (btn)", "#FFFFFF"],
    ["Ash text", "#E8EDF4"],
  ];
  const darkBgs: [string, string][] = [
    ["Obsidian (#0F0F0F)", DARK_BG],
    ["Card (#1A1A1A)", CARD_DARK],
    ["Ember (#E34234)", "#E34234"],
    ["Gradient-dark start (dk)", "#1A1F2E"],
    ["Gradient-dark end (dk)", "#0A0E14"],
  ];
  for (const [fgName, fgHex] of darkFgs) {
    for (const [bgName, bgHex] of darkBgs) {
      if (fgHex === bgHex) continue;
      pairs.push({ fg: fgName, fgHex, bg: bgName, bgHex, mode: "dark" });
    }
  }

  return pairs;
}

/* ────────────────────────────────────────────
   Typography scale (from globals.css)
   ──────────────────────────────────────────── */

interface TypoLevel {
  tag: string;
  label: string;
  classes: string;
  font: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  sample: string;
}

const TYPO_LEVELS: TypoLevel[] = [
  {
    tag: "h1",
    label: "Heading 1",
    classes: "text-4xl md:text-5xl lg:text-6xl",
    font: "Sora",
    weight: "700",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    sample: "Pipeline Programs at Scale",
  },
  {
    tag: "h2",
    label: "Heading 2",
    classes: "text-3xl md:text-4xl",
    font: "Sora",
    weight: "700",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    sample: "Strategy & Systems",
  },
  {
    tag: "h3",
    label: "Heading 3",
    classes: "text-2xl md:text-3xl",
    font: "Sora",
    weight: "700",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    sample: "Behavioral Lead Scoring",
  },
  {
    tag: "h4",
    label: "Heading 4",
    classes: "text-xl md:text-2xl",
    font: "Sora",
    weight: "700",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    sample: "Signal Taxonomy",
  },
  {
    tag: "p",
    label: "Body",
    classes: "text-base",
    font: "Sora",
    weight: "400",
    lineHeight: "1.6",
    letterSpacing: "0.01em",
    sample:
      "VP-level demand generation for AI-native cybersecurity companies. Built the program at Cylance. Scaled it at BlackBerry.",
  },
  {
    tag: "p",
    label: "Small",
    classes: "text-sm",
    font: "Sora",
    weight: "400",
    lineHeight: "1.6",
    letterSpacing: "0.01em",
    sample: "Updated March 2026 · WCAG AA compliant",
  },
  {
    tag: "code",
    label: "Mono / Metric",
    classes: "text-base font-mono",
    font: "JetBrains Mono",
    weight: "400 / 700",
    lineHeight: "1.6",
    letterSpacing: "0.01em",
    sample: "$4M pipeline · 70% CAC reduction · $1.4B exit",
  },
];

/* ────────────────────────────────────────────
   Icon catalog
   ──────────────────────────────────────────── */

const ICON_CATALOG: { name: string; icon: LucideIcon }[] = [
  { name: "Activity", icon: Activity },
  { name: "AlertCircle", icon: AlertCircle },
  { name: "AlertTriangle", icon: AlertTriangle },
  { name: "ArrowDown", icon: ArrowDown },
  { name: "ArrowLeft", icon: ArrowLeft },
  { name: "ArrowLeftRight", icon: ArrowLeftRight },
  { name: "ArrowRight", icon: ArrowRight },
  { name: "ArrowUp", icon: ArrowUp },
  { name: "ArrowUpRight", icon: ArrowUpRight },
  { name: "BarChart", icon: BarChart },
  { name: "BarChart2", icon: BarChart2 },
  { name: "BarChart3", icon: BarChart3 },
  { name: "Briefcase", icon: Briefcase },
  { name: "Building2", icon: Building2 },
  { name: "Calendar", icon: Calendar },
  { name: "Check", icon: Check },
  { name: "CheckCircle", icon: CheckCircle },
  { name: "ChevronDown", icon: ChevronDown },
  { name: "ChevronLeft", icon: ChevronLeft },
  { name: "ChevronRight", icon: ChevronRight },
  { name: "ChevronsUpDown", icon: ChevronsUpDown },
  { name: "ChevronUp", icon: ChevronUp },
  { name: "Clock", icon: Clock },
  { name: "Copy", icon: Copy },
  { name: "DollarSign", icon: DollarSign },
  { name: "ExternalLink", icon: ExternalLink },
  { name: "Eye", icon: Eye },
  { name: "EyeOff", icon: EyeOff },
  { name: "Factory", icon: Factory },
  { name: "FileText", icon: FileText },
  { name: "Film", icon: Film },
  { name: "Filter", icon: Filter },
  { name: "Github", icon: Github },
  { name: "Grid3x3", icon: Grid3x3 },
  { name: "Info", icon: Info },
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Lock", icon: Lock },
  { name: "Mail", icon: Mail },
  { name: "MapPin", icon: MapPin },
  { name: "Megaphone", icon: Megaphone },
  { name: "MousePointer2", icon: MousePointer2 },
  { name: "MousePointerClick", icon: MousePointerClick },
  { name: "Navigation", icon: Navigation },
  { name: "Pencil", icon: Pencil },
  { name: "Phone", icon: Phone },
  { name: "RefreshCw", icon: RefreshCw },
  { name: "Rocket", icon: Rocket },
  { name: "RotateCcw", icon: RotateCcw },
  { name: "Settings", icon: Settings },
  { name: "Share2", icon: Share2 },
  { name: "Shield", icon: Shield },
  { name: "Star", icon: Star },
  { name: "Target", icon: Target },
  { name: "TrendingDown", icon: TrendingDown },
  { name: "TrendingUp", icon: TrendingUp },
  { name: "Users", icon: Users },
  { name: "Video", icon: Video },
  { name: "X", icon: X },
  { name: "Zap", icon: Zap },
];

/* ────────────────────────────────────────────
   Section wrapper
   ──────────────────────────────────────────── */

function Section({
  id,
  title,
  number,
  children,
}: {
  id: string;
  title: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section border-b border-charcoal/10">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-ember uppercase tracking-widest mb-2">
            {String(number).padStart(2, "0")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function CodeLabel({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-xs bg-charcoal/5 text-lavender px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

/* ────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────── */

export default function BrandClient() {
  const contrastPairs = buildContrastPairs();
  const lightPairs = contrastPairs.filter((p) => p.mode === "light");
  const darkPairs = contrastPairs.filter((p) => p.mode === "dark");

  return (
    <>
      {/* Hero */}
      <div className="hero-card gradient-dark">
        <section className="section">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-mono text-xs text-lavender uppercase tracking-widest mb-4">
                Design System
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ash mb-6">
                🔥 Fire Horse 2026
              </h1>
              <p className="text-lg md:text-xl text-ash/80 max-w-2xl">
                The living brand style guide for saren.ai. Every color, font,
                component, and accessibility standard — documented with live
                examples.
              </p>
            </motion.div>

            {/* TOC */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {[
                ["colors", "Colors"],
                ["typography", "Typography"],
                ["contrast", "Contrast Audit"],
                ["elements", "Elements"],
                ["buttons", "Buttons"],
                ["taxonomy", "Taxonomy"],
                ["icons", "Iconography"],
                ["animations", "Animations"],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="btn-secondary-dark text-sm !py-2 !px-4"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          </div>
        </section>
      </div>

      {/* 1. Color Palette */}
      <Section id="colors" title="Color Palette" number={1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLOR_TOKENS.map((token, i) => {
            const lightRatio = contrastRatio(token.lightHex, LIGHT_BG);
            const darkRatio = contrastRatio(token.darkHex, DARK_BG);
            return (
              <motion.div
                key={token.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card p-0 overflow-hidden"
              >
                {/* Swatch row */}
                <div className="flex">
                  <div
                    className="w-1/2 h-24 flex items-end p-3"
                    style={{ background: token.lightHex }}
                  >
                    <span
                      className="font-mono text-[10px]"
                      style={{
                        color:
                          relativeLuminance(hexToRgb(token.lightHex)) > 0.4
                            ? "#1D1D1F"
                            : "#F5F5F7",
                      }}
                    >
                      Light
                    </span>
                  </div>
                  <div
                    className="w-1/2 h-24 flex items-end p-3"
                    style={{ background: token.darkHex }}
                  >
                    <span
                      className="font-mono text-[10px]"
                      style={{
                        color:
                          relativeLuminance(hexToRgb(token.darkHex)) > 0.4
                            ? "#1D1D1F"
                            : "#F5F5F7",
                      }}
                    >
                      Dark
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-charcoal">{token.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-mono text-slate text-xs">
                      Light: {token.lightHex} &middot; Dark: {token.darkHex}
                    </p>
                    <p className="font-mono text-xs text-slate">
                      var({token.cssVar})
                    </p>
                    <p className="text-xs text-slate">
                      <CodeLabel>{token.tailwind}</CodeLabel>
                    </p>
                  </div>
                  <div className="flex gap-2 text-xs font-mono">
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        background: wcagLevel(lightRatio).color,
                        color: "#fff",
                      }}
                    >
                      L: {lightRatio.toFixed(1)}:1{" "}
                      {wcagLevel(lightRatio).label}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        background: wcagLevel(darkRatio).color,
                        color: "#fff",
                      }}
                    >
                      D: {darkRatio.toFixed(1)}:1 {wcagLevel(darkRatio).label}
                    </span>
                  </div>
                  <p className="text-xs text-slate mt-1">{token.notes}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gradient swatches */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-charcoal mb-4">Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden border border-charcoal/10">
              <div className="gradient-dark h-20" />
              <div className="p-3">
                <p className="font-bold text-sm text-charcoal">gradient-dark</p>
                <p className="font-mono text-xs text-slate">
                  135deg: #1D3557 → #212529
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-charcoal/10">
              <div className="gradient-accent h-20" />
              <div className="p-3">
                <p className="font-bold text-sm text-charcoal">
                  gradient-accent
                </p>
                <p className="font-mono text-xs text-slate">
                  135deg: var(--lavender) → #1D3557
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-charcoal/10">
              <div className="h-20 flex items-center justify-center bg-ash">
                <span className="text-gradient text-2xl font-bold">
                  text-gradient
                </span>
              </div>
              <div className="p-3">
                <p className="font-bold text-sm text-charcoal">text-gradient</p>
                <p className="font-mono text-xs text-slate">
                  90deg: var(--ember-red) → var(--copper)
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Typography */}
      <Section id="typography" title="Typography" number={2}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Sora specimen */}
          <div className="card p-6">
            <p className="font-mono text-xs text-ember uppercase tracking-widest mb-3">
              Primary Typeface
            </p>
            <p className="text-5xl font-bold text-charcoal mb-2">Sora</p>
            <p className="text-slate text-sm mb-4">
              Headings (700) and body (400). Geometric sans-serif with clean
              proportions.
            </p>
            <p className="text-charcoal text-base">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 !@#$%&amp;*()
            </p>
          </div>

          {/* JetBrains Mono specimen */}
          <div className="card p-6">
            <p className="font-mono text-xs text-ember uppercase tracking-widest mb-3">
              Mono Typeface
            </p>
            <p className="text-5xl font-bold font-mono text-charcoal mb-2">
              JetBrains Mono
            </p>
            <p className="text-slate text-sm mb-4">
              Metrics, data displays, code. Used with{" "}
              <CodeLabel>font-mono</CodeLabel>.
            </p>
            <p className="font-mono text-charcoal text-base">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 !@#$%&amp;*()
            </p>
          </div>
        </div>

        {/* Type scale */}
        <div className="space-y-6">
          {TYPO_LEVELS.map((level, i) => (
            <motion.div
              key={level.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-charcoal/10 pb-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="lg:w-48 shrink-0 space-y-1">
                  <p className="font-mono text-xs text-ember">&lt;{level.tag}&gt;</p>
                  <p className="text-sm font-semibold text-charcoal">
                    {level.label}
                  </p>
                  <div className="text-xs text-slate space-y-0.5">
                    <p>
                      Font: {level.font} &middot; {level.weight}
                    </p>
                    <p>Line-height: {level.lineHeight}</p>
                    <p>Letter-spacing: {level.letterSpacing}</p>
                  </div>
                  <p>
                    <CodeLabel>{level.classes}</CodeLabel>
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  {level.tag === "code" ? (
                    <p
                      className={`${level.classes} text-charcoal break-words`}
                    >
                      {level.sample}
                    </p>
                  ) : level.tag === "h1" ? (
                    <p
                      className={`${level.classes} font-bold text-charcoal leading-[1.2] tracking-[-0.02em] break-words`}
                    >
                      {level.sample}
                    </p>
                  ) : level.tag === "h2" ? (
                    <p
                      className={`${level.classes} font-bold text-charcoal leading-[1.2] tracking-[-0.02em] break-words`}
                    >
                      {level.sample}
                    </p>
                  ) : level.tag === "h3" ? (
                    <p
                      className={`${level.classes} font-bold text-charcoal leading-[1.2] tracking-[-0.02em] break-words`}
                    >
                      {level.sample}
                    </p>
                  ) : level.tag === "h4" ? (
                    <p
                      className={`${level.classes} font-bold text-charcoal leading-[1.2] tracking-[-0.02em] break-words`}
                    >
                      {level.sample}
                    </p>
                  ) : (
                    <p className={`${level.classes} text-charcoal break-words`}>
                      {level.sample}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 3. Accessibility & Contrast Audit */}
      <Section id="contrast" title="Accessibility & Contrast Audit" number={3}>
        {/* Minimum standards box */}
        <div className="card p-6 mb-10 border-ember/30 bg-ember/5">
          <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-ember" /> Minimum Standards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-charcoal">
            <div className="space-y-2">
              <p>
                <strong>Body text (any size):</strong> AA (4.5:1) minimum
              </p>
              <p>
                <strong>Large text (&ge;18px / &ge;14px bold):</strong> AA Large
                (3:1) min, target AA (4.5:1)
              </p>
              <p>
                <strong>Interactive elements:</strong> AA (4.5:1) minimum
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Non-text contrast:</strong> 3:1 against adjacent colors
              </p>
              <p>
                <strong>Aspirational target:</strong> AAA (7:1) wherever possible
              </p>
              <p>
                <strong>Focus indicators:</strong> 2px solid var(--lavender)
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#16a34a" }}
            />
            AAA (&ge;7:1)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#2563eb" }}
            />
            AA (&ge;4.5:1)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#ca8a04" }}
            />
            AA Large (&ge;3:1)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded"
              style={{ background: "#dc2626" }}
            />
            FAIL (&lt;3:1)
          </span>
        </div>

        {/* Light mode matrix */}
        <h3 className="text-xl font-bold text-charcoal mb-4">Light Mode</h3>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border border-charcoal/10 bg-charcoal/5 text-charcoal">
                  FG \ BG
                </th>
                {[...new Set(lightPairs.map((p) => p.bg))].map((bg) => (
                  <th
                    key={bg}
                    className="p-2 border border-charcoal/10 bg-charcoal/5 text-charcoal text-center"
                  >
                    {bg}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...new Set(lightPairs.map((p) => p.fg))].map((fg) => (
                <tr key={fg}>
                  <td className="p-2 border border-charcoal/10 font-semibold text-charcoal">
                    {fg}
                  </td>
                  {[...new Set(lightPairs.map((p) => p.bg))].map((bg) => {
                    const pair = lightPairs.find(
                      (p) => p.fg === fg && p.bg === bg
                    );
                    if (!pair) {
                      return (
                        <td
                          key={bg}
                          className="p-2 border border-charcoal/10 text-center text-slate"
                        >
                          &mdash;
                        </td>
                      );
                    }
                    const ratio = contrastRatio(pair.fgHex, pair.bgHex);
                    const level = wcagLevel(ratio);
                    return (
                      <td
                        key={bg}
                        className="p-2 border border-charcoal/10 text-center"
                      >
                        <div
                          className="inline-flex items-center gap-1 px-2 py-1 rounded"
                          style={{
                            background: level.color + "18",
                            color: level.color,
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: level.color }}
                          />
                          {ratio.toFixed(1)} {level.label}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dark mode matrix */}
        <h3 className="text-xl font-bold text-charcoal mb-4">Dark Mode</h3>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border border-charcoal/10 bg-charcoal/5 text-charcoal">
                  FG \ BG
                </th>
                {[...new Set(darkPairs.map((p) => p.bg))].map((bg) => (
                  <th
                    key={bg}
                    className="p-2 border border-charcoal/10 bg-charcoal/5 text-charcoal text-center"
                  >
                    {bg}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...new Set(darkPairs.map((p) => p.fg))].map((fg) => (
                <tr key={fg}>
                  <td className="p-2 border border-charcoal/10 font-semibold text-charcoal">
                    {fg}
                  </td>
                  {[...new Set(darkPairs.map((p) => p.bg))].map((bg) => {
                    const pair = darkPairs.find(
                      (p) => p.fg === fg && p.bg === bg
                    );
                    if (!pair) {
                      return (
                        <td
                          key={bg}
                          className="p-2 border border-charcoal/10 text-center text-slate"
                        >
                          &mdash;
                        </td>
                      );
                    }
                    const ratio = contrastRatio(pair.fgHex, pair.bgHex);
                    const level = wcagLevel(ratio);
                    return (
                      <td
                        key={bg}
                        className="p-2 border border-charcoal/10 text-center"
                      >
                        <div
                          className="inline-flex items-center gap-1 px-2 py-1 rounded"
                          style={{
                            background: level.color + "18",
                            color: level.color,
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: level.color }}
                          />
                          {ratio.toFixed(1)} {level.label}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Known issues */}
        <h3 className="text-xl font-bold text-charcoal mb-4">
          Known Issues & Recommendations
        </h3>
        <div className="space-y-4">
          {[
            {
              severity: "warning" as const,
              title: "Copper on light backgrounds",
              detail: `text-copper (#C17D3A) on bg-ash (#F5F5F7) = ${contrastRatio("#C17D3A", "#F5F5F7").toFixed(1)}:1 — passes AA Large only (3:1). Safe for headings ≥18px but not body text.`,
              fix: "Restrict copper to headings ≥24px or decorative elements. For body text, use charcoal or slate instead.",
            },
            {
              severity: "info" as const,
              title: "Gradient-dark text contrast",
              detail: `White text on gradient-dark darkest stop (#212529) = ${contrastRatio("#FFFFFF", "#212529").toFixed(1)}:1 — AAA. On lightest stop (#1D3557) = ${contrastRatio("#FFFFFF", "#1D3557").toFixed(1)}:1 — safe.`,
              fix: "No action needed. All text on gradient-dark passes AAA.",
            },
            {
              severity: "info" as const,
              title: "Slate (muted text)",
              detail: `text-slate on bg-ash = ${contrastRatio("#5B6470", "#F5F5F7").toFixed(1)}:1 (AA). Dark mode: #A8B2BF on #0F0F0F = ${contrastRatio("#A8B2BF", "#0F0F0F").toFixed(1)}:1 (AAA).`,
              fix: "Slate passes AA in both modes. Safe for secondary text at any size.",
            },
            {
              severity: "info" as const,
              title: "Button contrast (btn-primary)",
              detail: `White (#FFF) on ember (#C43322) = ${contrastRatio("#FFFFFF", "#C43322").toFixed(1)}:1 — AA. Hover darkens ember further, improving ratio.`,
              fix: "Passes AA. No action needed.",
            },
          ].map((issue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`card p-4 ${issue.severity === "warning" ? "border-amber-500/30" : "border-lavender/20"}`}
            >
              <div className="flex items-start gap-3">
                {issue.severity === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-lavender shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-charcoal text-sm">
                    {issue.title}
                  </p>
                  <p className="text-xs text-slate mt-1 font-mono">
                    {issue.detail}
                  </p>
                  <p className="text-xs text-charcoal mt-2">
                    <strong>Recommendation:</strong> {issue.fix}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 4. Standardized Elements */}
      <Section id="elements" title="Standardized Elements" number={4}>
        {/* Page Margins & Spacing */}
        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4">
              Page Margins & Spacing Rhythm
            </h3>
            <div className="card p-6 border-ember/20 mb-6">
              <p className="font-mono text-xs text-ember uppercase tracking-widest mb-3">
                The Golden Rule
              </p>
              <p className="text-charcoal font-semibold mb-2">
                Nav, hero card, and content sections all share the same width
                system: percentage-based with a 1200px cap, centered.
              </p>
              <p className="text-sm text-slate">
                Every horizontal edge on the page should align. If the nav pill
                is 80% wide on desktop, the hero card is 80% wide, and the
                content inside sections is bounded to the same 1200px max. No
                exceptions.
              </p>
            </div>

            {/* Width system table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 border border-charcoal/10 bg-charcoal/5 text-charcoal font-semibold">
                      Component
                    </th>
                    <th className="text-center p-3 border border-charcoal/10 bg-charcoal/5 text-charcoal font-semibold">
                      Mobile (&lt;640px)
                    </th>
                    <th className="text-center p-3 border border-charcoal/10 bg-charcoal/5 text-charcoal font-semibold">
                      Tablet (640px+)
                    </th>
                    <th className="text-center p-3 border border-charcoal/10 bg-charcoal/5 text-charcoal font-semibold">
                      Desktop (1024px+)
                    </th>
                    <th className="text-center p-3 border border-charcoal/10 bg-charcoal/5 text-charcoal font-semibold">
                      Max
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr>
                    <td className="p-3 border border-charcoal/10 text-charcoal font-semibold text-sm">
                      Nav pill
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-lavender">
                      90%
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-lavender">
                      85%
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-lavender">
                      80%
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-ember">
                      1200px
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-charcoal/10 text-charcoal font-semibold text-sm">
                      Hero card
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-lavender">
                      90%
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-lavender">
                      85%
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-lavender">
                      80%
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-ember">
                      1200px
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-charcoal/10 text-charcoal font-semibold text-sm">
                      Content sections
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-slate" colSpan={3}>
                      100% with 1.5rem (24px) side padding
                    </td>
                    <td className="p-3 border border-charcoal/10 text-center text-ember">
                      1200px
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate mb-6">
              At 1440px viewport: nav and hero render at 1152px (80%), content
              at 1200px. At 1500px+: all three hit the 1200px cap and align
              perfectly. Below 1024px the percentage model keeps spacing
              proportional.
            </p>

            {/* Visual diagram */}
            <div className="card p-6 space-y-4">
              <p className="font-mono text-xs text-lavender uppercase tracking-widest mb-2">
                Layout Stack (top to bottom)
              </p>

              {/* Nav representation */}
              <div className="mx-auto" style={{ width: "80%" }}>
                <div className="bg-lavender/10 border border-lavender/30 rounded-full px-4 py-2 text-center">
                  <p className="font-mono text-xs text-lavender">
                    Nav pill — w-[80%] max-w-[1200px] mx-auto
                  </p>
                </div>
              </div>

              {/* Hero card representation */}
              <div className="mx-auto" style={{ width: "80%" }}>
                <div className="bg-ember/10 border border-ember/30 rounded-2xl px-4 py-6 text-center">
                  <p className="font-mono text-xs text-ember">
                    .hero-card — width: 80%, max-width: 1200px, margin: auto
                  </p>
                </div>
              </div>

              {/* Section representation */}
              <div className="w-full bg-charcoal/5 border border-charcoal/10 py-4">
                <div
                  className="mx-auto bg-slate/10 border border-slate/20 rounded-lg px-4 py-3 text-center"
                  style={{ maxWidth: "1200px" }}
                >
                  <p className="font-mono text-xs text-slate">
                    .section &gt; .container-narrow — max-width: 1200px, px:
                    1.5rem
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section / Container */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4">
              Section & Container
            </h3>
            <div className="card p-6 space-y-3">
              <div className="bg-lavender/10 border border-lavender/20 rounded-lg p-4">
                <p className="font-mono text-xs text-lavender mb-2">
                  .section (padding: 6rem 0, 4rem on mobile)
                </p>
                <div className="bg-ember/10 border border-ember/20 rounded-lg p-4">
                  <p className="font-mono text-xs text-ember">
                    .container-narrow (max-width: 1200px, margin: 0 auto,
                    padding: 0 1.5rem)
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate">
                Every page section uses{" "}
                <CodeLabel>.section &gt; .container-narrow</CodeLabel> as its
                outer wrapper. This provides consistent vertical rhythm and
                horizontal bounds.
              </p>
              <div className="card p-4 border-amber-500/30 mt-3">
                <div className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-charcoal">
                    <strong>Never</strong> add inline{" "}
                    <CodeLabel>max-w-[1200px] mx-auto px-4</CodeLabel> when using{" "}
                    <CodeLabel>.container-narrow</CodeLabel> — the class already
                    handles max-width, centering, and padding. Doubling up
                    creates conflicting constraints.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4">Hero Card</h3>
            <div className="card p-6 space-y-3">
              <div className="hero-card gradient-dark p-8 text-ash">
                <p className="font-mono text-xs text-lavender uppercase tracking-widest mb-2">
                  Eyebrow
                </p>
                <p className="text-2xl font-bold mb-2">Page Title</p>
                <p className="text-ash/80 text-sm">
                  Subtitle or description text goes here.
                </p>
              </div>
              <p className="text-sm text-slate">
                <CodeLabel>.hero-card</CodeLabel> — Bento-style floating hero.
                Width matches the nav pill (90% → 85% → 80%, max 1200px, centered).
                Rounded corners (1.5rem). Use{" "}
                <CodeLabel>.container-narrow</CodeLabel> inside for content.
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4">Breadcrumb</h3>
            <div className="card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-foreground-muted">
                  ← Portfolio
                </span>
                <span className="text-xs text-foreground-muted">&middot;</span>
                <span className="text-xs font-semibold tracking-widest uppercase text-ember">
                  Current Page
                </span>
              </div>
              <p className="text-sm text-slate mt-3">
                <CodeLabel>
                  &lt;Breadcrumb back=&#123;&#123; href, label &#125;&#125;
                  current=&quot;Page&quot; /&gt;
                </CodeLabel>{" "}
                — Back arrow + parent link, dot separator, current page in
                uppercase with accent color. Default accent: ember red. Pass{" "}
                <CodeLabel>accentColor</CodeLabel> for dark sections.
              </p>
            </div>
          </div>

          {/* Card */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4">Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h4 className="text-lg font-bold text-charcoal mb-2">
                  Default Card
                </h4>
                <p className="text-sm text-slate">
                  Hover to see the lift effect with lavender border glow.
                </p>
              </div>
              <div className="space-y-2 text-sm text-slate">
                <p>
                  <CodeLabel>.card</CodeLabel>
                </p>
                <p>Background: var(--card-bg) — white / #1A1A1A</p>
                <p>Border: 1px solid var(--border)</p>
                <p>Border-radius: 8px</p>
                <p>Hover: translateY(-4px), border-color shift, box-shadow glow</p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4">
              Metric Display
            </h3>
            <div className="card p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="metric-value">8:1</p>
                  <p className="metric-label">ROI on Paid Media</p>
                </div>
                <div>
                  <p className="metric-value">70%</p>
                  <p className="metric-label">CAC Reduction</p>
                </div>
                <div>
                  <p className="metric-value">$1.4B</p>
                  <p className="metric-label">Exit Value</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate space-y-1">
                <p>
                  <CodeLabel>.metric-value</CodeLabel> — JetBrains Mono, 2.5rem,
                  700, ember-red
                </p>
                <p>
                  <CodeLabel>.metric-label</CodeLabel> — 0.875rem, uppercase,
                  tracking 0.1em, foreground-muted
                </p>
              </div>
            </div>
          </div>

          {/* Gradient backgrounds */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4">
              Gradient Backgrounds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="gradient-dark rounded-lg p-6">
                <p className="text-ash font-bold mb-1">gradient-dark</p>
                <p className="text-ash/70 text-sm">
                  Used for hero sections, footer, dark feature blocks. Text
                  should use text-ash / btn-secondary-dark.
                </p>
              </div>
              <div className="gradient-accent rounded-lg p-6">
                <p className="text-ash font-bold mb-1">gradient-accent</p>
                <p className="text-ash/70 text-sm">
                  Electric blue accent gradient. Used for promotional blocks and
                  CTAs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Buttons */}
      <Section id="buttons" title="Buttons" number={5}>
        <div className="space-y-10">
          {/* btn-primary */}
          <div>
            <h3 className="text-lg font-bold text-charcoal mb-4">
              Primary Button
            </h3>
            <div className="card p-6">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <button className="btn-primary">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-primary opacity-50 cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div className="text-sm text-slate space-y-1">
                <p>
                  <CodeLabel>.btn-primary</CodeLabel> — Ember bg, white text,
                  pill (9999px), font-weight 600
                </p>
                <p>
                  Hover: darken 10%, translateY(-2px), red glow shadow
                </p>
                <p className="font-mono text-xs">
                  Contrast: white on #C43322 ={" "}
                  {contrastRatio("#FFFFFF", "#C43322").toFixed(1)}:1 (
                  {wcagLevel(contrastRatio("#FFFFFF", "#C43322")).label})
                </p>
                <p>
                  <strong>When:</strong> Primary CTAs — &quot;Book a Call&quot;, &quot;Get
                  Started&quot;, &quot;View Case Study&quot;
                </p>
              </div>
            </div>
          </div>

          {/* btn-secondary */}
          <div>
            <h3 className="text-lg font-bold text-charcoal mb-4">
              Secondary Button
            </h3>
            <div className="card p-6">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <button className="btn-secondary">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary opacity-50 cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div className="text-sm text-slate space-y-1">
                <p>
                  <CodeLabel>.btn-secondary</CodeLabel> — Transparent bg,
                  foreground border + text, pill
                </p>
                <p>
                  Hover: fills with foreground, text flips to background
                </p>
                <p>
                  <strong>When:</strong> Secondary actions on light/neutral
                  backgrounds. Theme-adaptive.
                </p>
              </div>
            </div>
          </div>

          {/* btn-secondary-dark */}
          <div>
            <h3 className="text-lg font-bold text-charcoal mb-4">
              Secondary Dark Button
            </h3>
            <div className="gradient-dark rounded-lg p-6">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <button className="btn-secondary-dark">
                  Explore <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary-dark opacity-50 cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div className="text-sm text-ash/70 space-y-1">
                <p>
                  <CodeLabel>.btn-secondary-dark</CodeLabel> — Transparent bg,
                  ash/white border (50% opacity), white text, pill
                </p>
                <p>
                  Hover: fills ash, text flips to charcoal
                </p>
                <p>
                  <strong>When:</strong> Secondary actions on dark backgrounds
                  (gradient-dark, bg-charcoal). Never use .btn-secondary on dark
                  sections.
                </p>
              </div>
            </div>
          </div>

          {/* Button rules summary */}
          <div className="card p-6 border-ember/20">
            <h3 className="text-lg font-bold text-charcoal mb-3">
              Button Rules
            </h3>
            <ul className="text-sm text-charcoal space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                All buttons are pills (border-radius: 9999px) by default
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                Always use the class — never replicate with inline Tailwind
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                On gradient-dark: use .btn-secondary-dark, not .btn-secondary
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                Never use !rounded-full overrides
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 6. Taxonomy */}
      <Section id="taxonomy" title="Taxonomy" number={6}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Navigation structure */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-charcoal mb-4">
              Navigation Structure
            </h3>
            <div className="space-y-4 text-sm">
              {[
                {
                  label: "Solutions",
                  mega: true,
                  children: [
                    "By Audience (SMB, Solopreneurs, Thinkers)",
                    "By Capability (AI Orchestration, Signal-State, Framework, Signal Library)",
                  ],
                },
                {
                  label: "Playbooks",
                  mega: false,
                  children: ["Playbook Library (prompts + interactive tools)"],
                },
                {
                  label: "Case Studies",
                  mega: true,
                  children: [
                    "Pipeline Programs (120-Day Content Journey, 10-Touch Sales Play, Intent Data, Dynamic Nurture)",
                    "Strategy & Systems (Executive Dashboard, Sovereign Personas, Authority Engineering, TLD)",
                  ],
                },
                {
                  label: "About Me",
                  mega: true,
                  children: ["Bio & Booking (About Me, Book 30 Minutes)", "The Archives (Marketing Brain, Brand Guide, My Stack)"],
                },
                { label: "Contact", mega: false, children: [] },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-semibold text-charcoal flex items-center gap-2">
                    {item.label}
                    {item.mega && (
                      <span className="font-mono text-[10px] text-lavender bg-lavender/10 px-1.5 py-0.5 rounded">
                        mega menu
                      </span>
                    )}
                  </p>
                  {item.children.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-0.5 text-slate">
                      {item.children.map((child) => (
                        <li key={child} className="flex items-start gap-1.5">
                          <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                          {child}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content hierarchy */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-4">
                Page Categories
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-charcoal">Portfolio</p>
                  <p className="text-slate">
                    Case studies and interactive tools. Each has a slug, hero,
                    metrics, and content sections.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">
                    AI Orchestration / Signal-State
                  </p>
                  <p className="text-slate">
                    Framework pages with their own sub-navigation and purple-teal
                    palette.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">About</p>
                  <p className="text-slate">
                    Profile, client logos, stack tier list, brand guide.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Thinking</p>
                  <p className="text-slate">
                    Micro-blog with RSS. Short-form insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-4">
                Case Study Structure
              </h3>
              <div className="text-sm text-slate space-y-2">
                <p>
                  Route: <CodeLabel>/case-studies/[slug]</CodeLabel>
                </p>
                <p>
                  Hero: CaseStudyHero with breadcrumb, metadata (role, date),
                  h1, subtitle, optional metrics column
                </p>
                <p>
                  Naming: kebab-case slugs (e.g.,{" "}
                  <CodeLabel>120-day-content-journey</CodeLabel>)
                </p>
                <p>
                  Tags: uppercase mono tracking-widest for metadata labels
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Iconography */}
      <Section id="icons" title="Iconography" number={7}>
        <div className="mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-charcoal mb-2">
              Lucide React
            </h3>
            <p className="text-sm text-slate mb-4">
              The sole icon library. {ICON_CATALOG.length} icons currently in use
              across the site. All sizing via Tailwind classes (no{" "}
              <CodeLabel>size</CodeLabel> prop).
            </p>

            {/* Sizing reference */}
            <div className="flex flex-wrap items-end gap-6 mb-6 pb-6 border-b border-charcoal/10">
              {[
                ["w-3 h-3", "12px"],
                ["w-4 h-4", "16px"],
                ["w-5 h-5", "20px"],
                ["w-6 h-6", "24px"],
                ["w-8 h-8", "32px"],
                ["w-12 h-12", "48px"],
              ].map(([cls, px]) => (
                <div key={cls} className="text-center">
                  <Zap className={`${cls} text-ember mx-auto mb-1`} />
                  <p className="font-mono text-[10px] text-slate">{cls}</p>
                  <p className="font-mono text-[10px] text-slate">{px}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate mb-4">
              Most common: <CodeLabel>w-4 h-4</CodeLabel> (UI elements),{" "}
              <CodeLabel>w-5 h-5</CodeLabel> (buttons/links),{" "}
              <CodeLabel>w-3 h-3</CodeLabel> (inline/nested)
            </p>
          </div>
        </div>

        {/* Full catalog */}
        <h3 className="text-xl font-bold text-charcoal mb-4">
          Full Icon Catalog ({ICON_CATALOG.length})
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {ICON_CATALOG.map(({ name, icon: Icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.01 }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-charcoal/10 hover:border-lavender/30 transition-colors"
            >
              <Icon className="w-5 h-5 text-charcoal" />
              <p className="font-mono text-[9px] text-slate text-center leading-tight truncate w-full">
                {name}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 8. Animation Patterns */}
      <Section id="animations" title="Animation Patterns" number={8}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Framer Motion patterns */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-3">
                whileInView (Scroll Elements)
              </h3>
              <div className="bg-charcoal/5 rounded-lg p-4 font-mono text-xs text-charcoal overflow-x-auto">
                <pre>{`<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.05 }}
>`}</pre>
              </div>
              <p className="text-sm text-slate mt-3">
                Most common pattern. Elements fade up as they enter the viewport.{" "}
                <CodeLabel>viewport: once</CodeLabel> ensures animations fire
                only once.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-3">
                animate (Hero / Above-fold)
              </h3>
              <div className="bg-charcoal/5 rounded-lg p-4 font-mono text-xs text-charcoal overflow-x-auto">
                <pre>{`<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>`}</pre>
              </div>
              <p className="text-sm text-slate mt-3">
                For content visible on page load. Fires immediately on mount,
                not on scroll.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-3">
                Stagger Pattern
              </h3>
              <div className="bg-charcoal/5 rounded-lg p-4 font-mono text-xs text-charcoal overflow-x-auto">
                <pre>{`transition={{ delay: index * 0.05 }}`}</pre>
              </div>
              <p className="text-sm text-slate mt-3">
                For lists and grids. Each item delays slightly longer than the
                previous, creating a cascade effect. 0.05s per item is standard.
              </p>
            </div>
          </div>

          {/* CSS animations + live demos */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-3">
                CSS Animation Classes
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-charcoal mb-2">
                    <CodeLabel>.animate-fadeInUp</CodeLabel> — 0.6s ease, opacity
                    0→1, translateY 20px→0
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`animate-fadeInUp stagger-${n} bg-ember/10 border border-ember/20 rounded px-3 py-2 text-xs font-mono text-ember`}
                      >
                        .stagger-{n} ({n * 100}ms)
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live demo */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-3">
                Live Demo: Staggered Cards
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {["Alpha", "Beta", "Gamma", "Delta"].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-lavender/10 border border-lavender/20 rounded-lg p-4 text-center"
                  >
                    <p className="font-mono text-xs text-lavender">
                      delay: {i * 0.1}s
                    </p>
                    <p className="font-bold text-charcoal text-sm">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-charcoal mb-3">Rules</h3>
              <ul className="text-sm text-charcoal space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  Always use <CodeLabel>viewport: &#123; once: true &#125;</CodeLabel>{" "}
                  for scroll animations
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  Use <CodeLabel>animate</CodeLabel> (not whileInView) for
                  above-fold content
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  Standard stagger: <CodeLabel>index * 0.05</CodeLabel>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  Do not use @dnd-kit outside the tier list feature
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
