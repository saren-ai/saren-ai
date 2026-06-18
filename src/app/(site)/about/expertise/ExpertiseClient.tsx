"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import trendsDataRaw from "@/data/trends-data.json";

// Type declarations for our extracted trends data
interface Trend {
  trend: string;
  theme: string;
  counts: number[];
  total: number;
  first: number;
  last: number;
  peak_year: number;
  peak_count: number;
}

interface FileItem {
  year: number;
  label: string;
}

interface TrendsData {
  years: number[];
  trends: Trend[];
  files_by_trend: Record<string, FileItem[]>;
}

const data = trendsDataRaw as unknown as TrendsData;

// Theme color definitions for light and dark modes
const THEME_COLORS: Record<string, { light: string; dark: string; label: string }> = {
  UX: { light: "#2563EB", dark: "#60A5FA", label: "blue" },
  Brand: { light: "#EC4899", dark: "#F472B6", label: "pink/rose" },
  Strategy: { light: "#0D9488", dark: "#2DD4BF", label: "teal" },
  B2B: { light: "#8B5CF6", dark: "#A78BFA", label: "purple" },
  Channel: { light: "#F97316", dark: "#FB923C", label: "orange" },
  Measurement: { light: "#D97706", dark: "#FBBF24", label: "amber" },
  CX: { light: "#16A34A", dark: "#4ADE80", label: "green" },
  Ops: { light: "#4B5563", dark: "#9CA3AF", label: "gray" },
  eLearning: { light: "#1D4ED8", dark: "#3B82F6", label: "navy" },
  Reports: { light: "#4F46E5", dark: "#818CF8", label: "indigo" },
  Misc: { light: "#9CA3AF", dark: "#D1D5DB", label: "light gray" },
  Pitching: { light: "#EF4444", dark: "#F87171", label: "coral" },
  Behavior: { light: "#7C3AED", dark: "#A78BFA", label: "violet" },
  Creativity: { light: "#84CC16", dark: "#A3E635", label: "yellow-green" },
  Academic: { light: "#64748B", dark: "#94A3B8", label: "slate" },
  Design: { light: "#06B6D4", dark: "#22D3EE", label: "cyan" },
  Engagement: { light: "#C084FC", dark: "#E9D5FF", label: "lavender" },
};

// Era divisions
const ERAS = [
  { start: 2003, end: 2008, label: "UX & pitch foundations" },
  { start: 2009, end: 2013, label: "Gamification + CX wave" },
  { start: 2013, end: 2016, label: "Mobile-first era" },
  { start: 2017, end: 2020, label: "Enterprise in-house" },
  { start: 2021, end: 2026, label: "B2B revival + GenAI" },
];

// Helper: Clean up library filenames for cleaner reading
function cleanFileName(name: string): string {
  let clean = name.replace(/\.pdf$/i, ""); // Strip extension
  clean = clean.replace(/^\d+[-_]/, ""); // Strip leading catalog numbers
  clean = clean.replace(/_/g, " "); // Replace underscores with spaces
  return clean;
}

// Deterministic random jitter generator based on string seed
function getDeterministicJitter(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 25) - 12; // Range [-12, 12]
}

export default function ExpertiseClient() {
  const { theme } = useTheme();
  
  // Mounted status to prevent hydration mismatch on dynamic colors
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme : "light";

  // Tab state: "matrix" | "year" | "bubble"
  const [activeTab, setActiveTab] = useState<"matrix" | "year" | "bubble">("matrix");

  // Default selected trend (the one with highest total count)
  const defaultTrend = useMemo(() => {
    return data.trends.reduce(
      (prev, curr) => (curr.total > prev.total ? curr : prev),
      data.trends[0]
    );
  }, []);

  // Selection states
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(defaultTrend);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectionType, setSelectionType] = useState<"trend" | "year" | null>("trend");

  // Year View sorting: "chrono" | "volume"
  const [yearSortMode, setYearSortMode] = useState<"chrono" | "volume">("chrono");

  // Global hover tooltip state (used by all views)
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    title: string;
    subtitle: string;
    details: string;
    x: number;
    y: number;
  }>({
    show: false,
    title: "",
    subtitle: "",
    details: "",
    x: 0,
    y: 0,
  });

  // Theme helper
  const getThemeColor = (themeName: string) => {
    const colorObj = THEME_COLORS[themeName] || THEME_COLORS.Misc;
    return currentTheme === "dark" ? colorObj.dark : colorObj.light;
  };

  // Dimensions & Constants
  const startYear = data.years[0];
  const maxCount = useMemo(() => {
    return Math.max(...data.trends.flatMap((t) => t.counts));
  }, []);

  // Sort trends by 'first' year ascending for Matrix rows
  const sortedTrends = useMemo(() => {
    return [...data.trends].sort((a, b) => a.first - b.first);
  }, []);

  // Max total count across all trends (used for bubble sizing)
  const maxTrendTotal = useMemo(() => {
    return Math.max(...data.trends.map((t) => t.total));
  }, []);

  // Total files count across the entire dataset
  const totalFiles = useMemo(() => {
    return Object.values(data.files_by_trend).reduce((sum, list) => sum + list.length, 0);
  }, []);

  // Bubble Map: Sort themes chronologically by earliest 'first' year of member trends
  const sortedThemes = useMemo(() => {
    const mins: Record<string, number> = {};
    data.trends.forEach((t) => {
      if (mins[t.theme] === undefined || t.first < mins[t.theme]) {
        mins[t.theme] = t.first;
      }
    });
    const uniqueThemes = Array.from(new Set(data.trends.map((t) => t.theme)));
    return uniqueThemes.sort((a, b) => (mins[a] ?? 9999) - (mins[b] ?? 9999));
  }, []);

  // Year View Aggregations
  const yearRecords = useMemo(() => {
    const records = data.years.map((year, yearIdx) => {
      const breakdowns: Record<string, number> = {};
      let total = 0;
      data.trends.forEach((t) => {
        const c = t.counts[yearIdx];
        if (c > 0) {
          total += c;
          breakdowns[t.theme] = (breakdowns[t.theme] || 0) + c;
        }
      });
      return {
        year,
        total,
        breakdowns: Object.entries(breakdowns).map(([theme, count]) => ({ theme, count })),
      };
    }).filter((r) => r.total > 0);

    if (yearSortMode === "volume") {
      return [...records].sort((a, b) => b.total - a.total);
    }
    return records;
  }, [yearSortMode]);

  // Selected Detail Panel Computed Values
  const selectedTrendFiles = useMemo(() => {
    if (!selectedTrend) return [];
    const files = data.files_by_trend[selectedTrend.trend] || [];
    return [...files].sort((a, b) => a.year - b.year);
  }, [selectedTrend]);

  const selectedYearFiles = useMemo(() => {
    if (selectedYear === null) return [];
    const list: { trend: string; theme: string; label: string }[] = [];
    data.trends.forEach((t) => {
      const files = data.files_by_trend[t.trend] || [];
      files.forEach((f) => {
        if (f.year === selectedYear) {
          list.push({ trend: t.trend, theme: t.theme, label: f.label });
        }
      });
    });
    return list.sort((a, b) => {
      if (a.theme !== b.theme) return a.theme.localeCompare(b.theme);
      return a.label.localeCompare(b.label);
    });
  }, [selectedYear]);

  const selectedYearTopThemes = useMemo(() => {
    if (selectedYear === null) return [];
    const counts: Record<string, number> = {};
    data.trends.forEach((t) => {
      const idx = data.years.indexOf(selectedYear);
      if (idx >= 0) {
        const c = t.counts[idx];
        if (c > 0) {
          counts[t.theme] = (counts[t.theme] || 0) + c;
        }
      }
    });
    return Object.entries(counts)
      .map(([theme, count]) => ({ theme, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [selectedYear]);

  // Dimension Constants for Matrix SVG
  const ROW_H = 18;
  const LABEL_W = 200;
  const PAD_LEFT = LABEL_W + 16;
  const PAD_TOP = 60;
  const PAD_BOTTOM = 30;
  const CELL_W = 34;

  const MatrixW = PAD_LEFT + data.years.length * CELL_W + 20;
  const MatrixH = PAD_TOP + sortedTrends.length * ROW_H + PAD_BOTTOM;

  // Dimension Constants for Bubble SVG
  const BubbleSwimlaneH = 44;
  const BubbleLabelW = 120;
  const BubblePadLeft = BubbleLabelW + 16;
  const BubblePadRight = 40;
  const BubbleW = MatrixW; // Keep visual width identical
  const BubbleCellW = (BubbleW - BubblePadLeft - BubblePadRight) / data.years.length;
  const BubbleH = PAD_TOP + sortedThemes.length * BubbleSwimlaneH + PAD_BOTTOM;

  // Tooltip Handlers
  const handleShowTooltip = (
    e: React.MouseEvent,
    title: string,
    subtitle: string,
    details: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      title,
      subtitle,
      details,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    });
  };

  const handleHideTooltip = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <article className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Header Banner */}
      <section className="section bg-charcoal text-ash relative overflow-hidden py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-ember/15 to-lavender/15 opacity-40 pointer-events-none" />
        <div className="container-narrow relative z-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-lavender hover:text-ember mb-4 transition-colors font-mono uppercase tracking-wider"
          >
            <svg
              className="w-3.5 h-3.5 rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Back to About
          </Link>
          <h1 className="text-xl md:text-2xl font-bold font-heading mb-3 tracking-tight">
            Two decades of digital marketing — Saren&apos;s research library, {data.years[0]}–{data.years[data.years.length - 1]}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-ash/10 text-slate px-2.5 py-1 rounded-full font-mono border border-white/5">
              {totalFiles} files
            </span>
            <span className="bg-ash/10 text-slate px-2.5 py-1 rounded-full font-mono border border-white/5">
              {data.trends.length} trends
            </span>
            <span className="bg-ash/10 text-slate px-2.5 py-1 rounded-full font-mono border border-white/5">
              {data.years.length} years
            </span>
          </div>
        </div>
      </section>

      {/* Legend Block */}
      <section className="py-4 bg-card border-b border-border">
        <div className="container-narrow">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono justify-center">
            {Object.entries(THEME_COLORS).map(([themeName, colors]) => {
              const swatchColor = currentTheme === "dark" ? colors.dark : colors.light;
              return (
                <div key={themeName} className="flex items-center gap-1.5 bg-background/50 px-2 py-0.5 rounded border border-border/30">
                  <span
                    className="w-2.5 h-2.5 rounded-[2px] shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: swatchColor }}
                  />
                  <span className="text-foreground font-medium">{themeName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Interactive Visualizer Column Layout */}
      <section className="section bg-background">
        <div className="container-narrow">
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            
            {/* Visualizer Column (~70% width) */}
            <div className="w-full lg:w-[70%] overflow-hidden">
              
              {/* Tab Bar */}
              <div className="flex border-b border-border mb-6 justify-start items-center gap-1">
                {(["matrix", "year", "bubble"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  const label = tab === "matrix" ? "Matrix" : tab === "year" ? "Year View" : "Bubble Map";
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-4 py-2 text-sm font-semibold transition-colors font-heading ${
                        isActive
                          ? "text-ember font-bold"
                          : "text-foreground-muted hover:text-foreground"
                      }`}
                    >
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="expertise-tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-ember"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* View Wrapper */}
              <div className="w-full">
                
                {/* 1. Matrix View (Heatmap) */}
                {activeTab === "matrix" && (
                  <div className="bg-card border border-border rounded-xl shadow-sm overflow-x-auto relative scrollbar-thin">
                    <div style={{ width: MatrixW }} className="p-4 relative">
                      <svg
                        width={MatrixW}
                        height={MatrixH}
                        viewBox={`0 0 ${MatrixW} ${MatrixH}`}
                        className="select-none font-mono"
                      >
                        {/* Era Background Band Annotations */}
                        {ERAS.map((era) => {
                          const x = PAD_LEFT + (era.start - startYear) * CELL_W;
                          const w = (era.end - era.start + 1) * CELL_W;
                          return (
                            <g key={era.label}>
                              <rect
                                x={x}
                                y={PAD_TOP - 32}
                                width={w}
                                height={MatrixH - PAD_TOP + 20}
                                className="fill-ash/40 dark:fill-ash/5 stroke-none transition-colors duration-300"
                              />
                              <text
                                x={x + w / 2}
                                y={PAD_TOP - 18}
                                textAnchor="middle"
                                className="fill-foreground-muted text-[9px] tracking-wider font-bold"
                              >
                                {era.label}
                              </text>
                            </g>
                          );
                        })}

                        {/* Year Axis Labels */}
                        {data.years.map((y, i) => (
                          <text
                            key={y}
                            x={PAD_LEFT + i * CELL_W + CELL_W / 2}
                            y={PAD_TOP - 4}
                            textAnchor="middle"
                            className="fill-foreground-muted text-[10px] font-bold"
                          >
                            {`'${String(y).slice(-2)}`}
                          </text>
                        ))}

                        {/* Alternating Row Stripes */}
                        {sortedTrends.map((t, i) => {
                          if (i % 2 === 0) {
                            return (
                              <rect
                                key={`stripe-${i}`}
                                x={0}
                                y={PAD_TOP + i * ROW_H}
                                width={MatrixW}
                                height={ROW_H}
                                className="fill-foreground/[0.015] dark:fill-white/[0.007]"
                              />
                            );
                          }
                          return null;
                        })}

                        {/* Grid Rows */}
                        {sortedTrends.map((t, i) => {
                          const rowY = PAD_TOP + i * ROW_H + ROW_H / 2;
                          const themeColor = getThemeColor(t.theme);
                          const isSelected = selectionType === "trend" && selectedTrend?.trend === t.trend;

                          return (
                            <g key={t.trend} className="group">
                              {/* Row selection/hover highlight bar */}
                              <rect
                                x={0}
                                y={PAD_TOP + i * ROW_H}
                                width={MatrixW}
                                height={ROW_H}
                                className={`cursor-pointer transition-colors duration-150 ${
                                  isSelected
                                    ? "fill-ember/5"
                                    : "fill-transparent hover:fill-lavender/5"
                                }`}
                                onClick={() => {
                                  setSelectedTrend(t);
                                  setSelectedYear(null);
                                  setSelectionType("trend");
                                }}
                              />

                              {/* Theme color line */}
                              <line
                                x1={LABEL_W + 8}
                                y1={rowY - 6}
                                x2={LABEL_W + 8}
                                y2={rowY + 6}
                                stroke={themeColor}
                                strokeWidth={3.5}
                                strokeLinecap="round"
                              />

                              {/* Row text label */}
                              <text
                                x={LABEL_W}
                                y={rowY + 3.5}
                                textAnchor="end"
                                className={`text-[10px] cursor-pointer transition-colors duration-150 ${
                                  isSelected
                                    ? "fill-ember font-bold"
                                    : "fill-foreground-muted hover:fill-foreground group-hover:fill-foreground"
                                }`}
                                onClick={() => {
                                  setSelectedTrend(t);
                                  setSelectedYear(null);
                                  setSelectionType("trend");
                                }}
                              >
                                {t.trend.length > 30 ? t.trend.slice(0, 28) + "…" : t.trend}
                              </text>

                              {/* Cells */}
                              {t.counts.map((c, j) => {
                                if (c === 0) return null;
                                const intensity = Math.pow(c / maxCount, 0.5);
                                const cellX = PAD_LEFT + j * CELL_W + 2;
                                const cellY = PAD_TOP + i * ROW_H + 2;
                                const cellW = CELL_W - 4;
                                const cellH = ROW_H - 4;

                                const isPeakCell = data.years[j] === t.peak_year;

                                return (
                                  <g key={`${t.trend}-${data.years[j]}`}>
                                    <rect
                                      x={cellX}
                                      y={cellY}
                                      width={cellW}
                                      height={cellH}
                                      fill={themeColor}
                                      fillOpacity={0.25 + intensity * 0.65}
                                      rx={2}
                                      className={`cursor-pointer transition-all hover:stroke-foreground dark:hover:stroke-white ${
                                        isSelected
                                          ? "stroke-ember stroke-[1px]"
                                          : "stroke-border/20 stroke-[0.5px]"
                                      } hover:stroke-[1.5px] hover:scale-[1.05]`}
                                      onClick={() => {
                                        setSelectedTrend(t);
                                        setSelectedYear(null);
                                        setSelectionType("trend");
                                      }}
                                      onMouseEnter={(e) =>
                                        handleShowTooltip(
                                          e,
                                          t.trend,
                                          `${data.years[j]} · ${t.theme}`,
                                          `${c} file${c === 1 ? "" : "s"}`
                                        )
                                      }
                                      onMouseLeave={handleHideTooltip}
                                    />
                                    {c >= 2 && (
                                      <text
                                        x={cellX + cellW / 2}
                                        y={cellY + cellH / 2 + 3}
                                        textAnchor="middle"
                                        className="text-[9px] font-bold pointer-events-none fill-white dark:fill-black mix-blend-difference"
                                      >
                                        {c}
                                      </text>
                                    )}

                                    {/* Peak Year marker circle */}
                                    {isPeakCell && (
                                      <circle
                                        cx={cellX + cellW / 2}
                                        cy={cellY + cellH / 2}
                                        r={6.5}
                                        fill="none"
                                        stroke={themeColor}
                                        strokeWidth={1.2}
                                        className="pointer-events-none opacity-80"
                                      />
                                    )}
                                  </g>
                                );
                              })}
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                )}

                {/* 2. Year View */}
                {activeTab === "year" && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    {/* Sort Modes */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate dark:text-foreground-muted font-heading">
                        Volume by Theme breakdown
                      </h3>
                      <div className="flex bg-background rounded-lg p-0.5 border border-border text-xs font-mono">
                        <button
                          onClick={() => setYearSortMode("chrono")}
                          className={`px-3 py-1.5 rounded-md transition-colors ${
                            yearSortMode === "chrono"
                              ? "bg-card text-ember font-bold shadow-sm"
                              : "text-foreground-muted hover:text-foreground"
                          }`}
                        >
                          Chronological
                        </button>
                        <button
                          onClick={() => setYearSortMode("volume")}
                          className={`px-3 py-1.5 rounded-md transition-colors ${
                            yearSortMode === "volume"
                              ? "bg-card text-ember font-bold shadow-sm"
                              : "text-foreground-muted hover:text-foreground"
                          }`}
                        >
                          By Volume
                        </button>
                      </div>
                    </div>

                    {/* Years List Stack */}
                    <div className="space-y-3.5">
                      {yearRecords.map((r) => {
                        const isSelected = selectionType === "year" && selectedYear === r.year;
                        return (
                          <div
                            key={r.year}
                            onClick={() => {
                              setSelectedYear(r.year);
                              setSelectedTrend(null);
                              setSelectionType("year");
                            }}
                            className={`flex items-center gap-4 cursor-pointer p-1.5 rounded-lg transition-all border ${
                              isSelected
                                ? "bg-ember/5 border-ember/20 shadow-sm"
                                : "border-transparent hover:bg-lavender/5"
                            }`}
                          >
                            {/* Year row label */}
                            <span className="w-10 text-right font-mono text-xs font-bold text-foreground-muted">
                              &apos;{String(r.year).slice(-2)}
                            </span>

                            {/* Stacked bar */}
                            <div className="flex-1 h-4 bg-ash dark:bg-ash/5 rounded overflow-hidden flex">
                              {r.breakdowns.map(({ theme, count }) => {
                                const widthPct = (count / r.total) * 100;
                                const bgCol = getThemeColor(theme);
                                return (
                                  <div
                                    key={theme}
                                    className="h-full first:rounded-l last:rounded-r transition-all"
                                    onMouseEnter={(e) =>
                                      handleShowTooltip(
                                        e,
                                        theme,
                                        `${r.year} breakdown`,
                                        `${count} file${count === 1 ? "" : "s"} (${widthPct.toFixed(0)}%)`
                                      )
                                    }
                                    onMouseLeave={handleHideTooltip}
                                    style={{
                                      backgroundColor: bgCol,
                                      width: `${widthPct}%`,
                                    }}
                                  />
                                );
                              })}
                            </div>

                            {/* Total Year Count */}
                            <span className="w-8 text-left font-mono text-xs font-bold text-foreground">
                              {r.total}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Bubble Map View */}
                {activeTab === "bubble" && (
                  <div className="bg-card border border-border rounded-xl shadow-sm overflow-x-auto relative scrollbar-thin">
                    <div style={{ width: BubbleW }} className="p-4 relative">
                      <svg
                        width={BubbleW}
                        height={BubbleH}
                        viewBox={`0 0 ${BubbleW} ${BubbleH}`}
                        className="select-none font-mono"
                      >
                        {/* Year grids vertical lines (Every 3 years) */}
                        {data.years.map((y, i) => {
                          if (i % 3 !== 0 && y !== data.years[data.years.length - 1]) return null;
                          const x = BubblePadLeft + i * BubbleCellW + BubbleCellW / 2;
                          return (
                            <g key={`grid-v-${y}`}>
                              <line
                                x1={x}
                                y1={PAD_TOP}
                                x2={x}
                                y2={BubbleH - PAD_BOTTOM}
                                className="stroke-border/20 dark:stroke-border/10 stroke-1 stroke-dasharray-[2,2]"
                                strokeDasharray="3,3"
                              />
                              <text
                                x={x}
                                y={PAD_TOP - 4}
                                textAnchor="middle"
                                className="fill-foreground-muted text-[10px] font-bold"
                              >
                                {y}
                              </text>
                            </g>
                          );
                        })}

                        {/* Swimlane backgrounds + horizontal lines */}
                        {sortedThemes.map((theme, i) => {
                          const yTop = PAD_TOP + i * BubbleSwimlaneH;
                          return (
                            <g key={theme}>
                              {/* Horizontal separator line */}
                              <line
                                x1={0}
                                y1={yTop + BubbleSwimlaneH}
                                x2={BubbleW}
                                y2={yTop + BubbleSwimlaneH}
                                className="stroke-border/30 dark:stroke-border/10 stroke-[0.5px]"
                              />

                              {/* Lane Label */}
                              <text
                                x={BubbleLabelW}
                                y={yTop + BubbleSwimlaneH / 2 + 3.5}
                                textAnchor="end"
                                className="fill-foreground-muted text-[10px] font-bold"
                              >
                                {theme}
                              </text>
                            </g>
                          );
                        })}

                        {/* Swimlane divider bounding line for label zone */}
                        <line
                          x1={BubbleLabelW + 8}
                          y1={PAD_TOP}
                          x2={BubbleLabelW + 8}
                          y2={BubbleH - PAD_BOTTOM}
                          className="stroke-border"
                          strokeWidth={1}
                        />

                        {/* Bubbles */}
                        {data.trends.map((t) => {
                          const themeIdx = sortedThemes.indexOf(t.theme);
                          if (themeIdx < 0) return null;

                          const yCenter = PAD_TOP + themeIdx * BubbleSwimlaneH + BubbleSwimlaneH / 2;
                          const jitter = getDeterministicJitter(t.trend);
                          const bubbleY = yCenter + jitter;

                          const yearIdx = data.years.indexOf(t.peak_year);
                          const bubbleX =
                            BubblePadLeft + yearIdx * BubbleCellW + BubbleCellW / 2;

                          // Sqrt scaling for radius: min 8px, max 26px
                          const radius =
                            8 + Math.sqrt(t.total / maxTrendTotal) * 16;

                          const themeColor = getThemeColor(t.theme);
                          const isSelected = selectionType === "trend" && selectedTrend?.trend === t.trend;

                          return (
                            <g key={t.trend}>
                              <circle
                                cx={bubbleX}
                                cy={bubbleY}
                                r={radius}
                                fill={themeColor}
                                fillOpacity={isSelected ? 1.0 : 0.6}
                                stroke={themeColor}
                                strokeWidth={isSelected ? 3 : 1.5}
                                className="cursor-pointer transition-all duration-200 hover:scale-[1.1] hover:fill-opacity-95"
                                onClick={() => {
                                  setSelectedTrend(t);
                                  setSelectedYear(null);
                                  setSelectionType("trend");
                                }}
                                onMouseEnter={(e) =>
                                  handleShowTooltip(
                                    e,
                                    t.trend,
                                    `${t.theme} · Peak: ${t.peak_year}`,
                                    `Total: ${t.total} files (Peak: ${t.peak_count})`
                                  )
                                }
                                onMouseLeave={handleHideTooltip}
                              />
                              {radius > 14 && (
                                <text
                                  x={bubbleX}
                                  y={bubbleY + 3}
                                  textAnchor="middle"
                                  className="text-[9px] font-bold pointer-events-none fill-white dark:fill-black mix-blend-difference"
                                >
                                  {t.total}
                                </text>
                              )}
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Sticky Sidebar Detail Panel (~30% width) */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-24 shrink-0">
              <AnimatePresence mode="wait">
                
                {/* 1. No selection state */}
                {selectionType === null && (
                  <motion.div
                    key="none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-card border border-border rounded-xl p-6 text-center text-foreground-muted"
                  >
                    <p className="text-sm font-medium">Click any trend, year, or bubble to inspect.</p>
                  </motion.div>
                )}

                {/* 2. Trend detail view */}
                {selectionType === "trend" && selectedTrend && (
                  <motion.div
                    key={`trend-${selectedTrend.trend}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="bg-card border border-border rounded-lg shadow-sm p-4 text-xs"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2 font-mono">
                      <span
                        className="w-3.5 h-3.5 rounded-[2px]"
                        style={{ backgroundColor: getThemeColor(selectedTrend.theme) }}
                      />
                      <span className="font-bold uppercase tracking-wider text-foreground-muted text-[10px]">
                        {selectedTrend.theme}
                      </span>
                    </div>

                    <h2 className="text-sm font-semibold font-heading mb-3 text-foreground leading-tight">
                      {selectedTrend.trend}
                    </h2>

                    {/* Metadata matrix */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-b border-border/60 py-3 mb-4 text-slate dark:text-foreground-muted">
                      <div>
                        <div className="text-[10px] uppercase text-foreground-muted/60 mb-0.5">First Year</div>
                        <span className="font-mono text-foreground font-bold">{selectedTrend.first}</span>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-foreground-muted/60 mb-0.5">Peak Activity</div>
                        <span className="font-mono text-foreground font-bold">
                          {selectedTrend.peak_year} ({selectedTrend.peak_count} file{selectedTrend.peak_count === 1 ? "" : "s"})
                        </span>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-foreground-muted/60 mb-0.5">Last Cataloged</div>
                        <span className="font-mono text-foreground font-bold">{selectedTrend.last}</span>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-foreground-muted/60 mb-0.5">Active Span</div>
                        <span className="font-mono text-foreground font-bold">
                          {selectedTrend.last - selectedTrend.first + 1} years
                        </span>
                      </div>
                      <div className="col-span-2">
                        <div className="text-[10px] uppercase text-foreground-muted/60 mb-0.5">Total References</div>
                        <span className="font-mono text-foreground font-bold">{selectedTrend.total} files</span>
                      </div>
                    </div>

                    {/* Library references */}
                    <h3 className="font-semibold text-slate dark:text-foreground-muted uppercase tracking-wider mb-2 font-heading text-[10px]">
                      Files List ({selectedTrendFiles.length})
                    </h3>

                    <div className="max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin divide-y divide-border/40">
                      {selectedTrendFiles.length === 0 ? (
                        <p className="text-foreground-muted italic py-3">No source records for this trend.</p>
                      ) : (
                        selectedTrendFiles.map((file, idx) => (
                          <div key={idx} className="py-2.5 flex items-start gap-2 hover:bg-ash/20 dark:hover:bg-white/[0.01] px-1 rounded transition-colors duration-150">
                            <span className="font-mono text-ember font-bold shrink-0 bg-ember/5 dark:bg-ember/20 px-1 rounded">
                              {file.year}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-foreground leading-normal break-words">
                                {cleanFileName(file.label)}
                              </p>
                              <p className="text-[9.5px] text-foreground-muted font-mono truncate opacity-60 mt-0.5 select-all" title={file.label}>
                                {file.label}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 3. Year detail view */}
                {selectionType === "year" && selectedYear !== null && (
                  <motion.div
                    key={`year-${selectedYear}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="bg-card border border-border rounded-lg shadow-sm p-4 text-xs"
                  >
                    <h2 className="text-3xl font-bold font-mono text-ember mb-1">
                      {selectedYear}
                    </h2>
                    <p className="text-foreground-muted font-mono mb-4 text-[11px]">
                      Total files this year: <strong className="text-foreground font-bold">{selectedYearFiles.length}</strong>
                    </p>

                    {/* Top themes breakdown badges */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-slate dark:text-foreground-muted uppercase tracking-wider mb-2.5 font-heading text-[10px]">
                        Top Themes
                      </h3>
                      <div className="space-y-1.5">
                        {selectedYearTopThemes.map(({ theme, count }) => (
                          <div key={theme} className="flex items-center justify-between bg-background border border-border/50 px-2.5 py-1.5 rounded">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-[2px]"
                                style={{ backgroundColor: getThemeColor(theme) }}
                              />
                              <span className="font-mono font-bold text-foreground">{theme}</span>
                            </div>
                            <span className="font-mono text-foreground-muted">{count} file{count === 1 ? "" : "s"}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Files list for that year */}
                    <h3 className="font-semibold text-slate dark:text-foreground-muted uppercase tracking-wider mb-2 font-heading text-[10px]">
                      All files this year ({selectedYearFiles.length})
                    </h3>

                    <div className="max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin divide-y divide-border/40">
                      {selectedYearFiles.length === 0 ? (
                        <p className="text-foreground-muted italic py-3">No records archived for this year.</p>
                      ) : (
                        selectedYearFiles.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex items-start gap-2 hover:bg-ash/20 dark:hover:bg-white/[0.01] px-1 rounded transition-colors duration-150">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                              style={{ backgroundColor: getThemeColor(item.theme) }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="font-mono text-[9px] font-bold text-foreground-muted uppercase">
                                  {item.theme}
                                </span>
                                <span className="text-[9px] text-foreground-muted/40">·</span>
                                <span className="text-[9.5px] text-foreground-muted font-mono truncate" title={item.trend}>
                                  {item.trend}
                                </span>
                              </div>
                              <p className="font-medium text-foreground leading-normal break-words">
                                {cleanFileName(item.label)}
                              </p>
                              <p className="text-[9.5px] text-foreground-muted font-mono truncate opacity-60 mt-0.5 select-all" title={item.label}>
                                {item.label}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Floating cell/bubble hover tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-50 pointer-events-none bg-charcoal text-ash text-[11px] px-3 py-2 rounded-lg border border-border shadow-xl font-mono max-w-[280px]"
          style={{
            left: tooltip.x - window.scrollX,
            top: tooltip.y - window.scrollY,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-bold text-ember truncate mb-0.5">{tooltip.title}</div>
          <div className="text-[10px] text-slate dark:text-ash/60 truncate mb-1">
            {tooltip.subtitle}
          </div>
          <div className="text-lavender font-bold text-[10px] border-t border-border/20 pt-1 mt-1">
            {tooltip.details}
          </div>
        </div>
      )}

    </article>
  );
}
