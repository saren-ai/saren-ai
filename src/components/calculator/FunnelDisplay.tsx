"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { FunnelResult, ConversionRates, ViewMode } from "@/lib/calculator/types";
import {
  formatNumber,
  formatPercent,
  formatCurrency,
  formatCompactNumber,
} from "@/lib/calculator/funnel-calculations";
import { getAllStageBenchmarks } from "@/lib/calculator/benchmark-data";
import { ArrowRight, Pencil, Check, X } from "lucide-react";

interface FunnelDisplayProps {
  funnel: FunnelResult;
  rates: ConversionRates;
  viewMode: ViewMode;
  showCosts?: boolean;
  onConversionRateEdit?: (stage: keyof ConversionRates, newRate: number) => void;
}

interface Stage {
  id: string;
  name: string;
  value: number;
  costPer: number;
  costLabel: string;
  color: string;
  borderColor: string;
}

interface EditState {
  stageIndex: number | null;
  value: string;
}

const CONVERSION_KEYS: (keyof ConversionRates)[] = [
  "visitorToLead",
  "leadToMQL",
  "mqlToSQL",
  "sqlToOpportunity",
  "opportunityToClose",
];

export function FunnelDisplay({
  funnel,
  rates,
  viewMode,
  showCosts = true,
  onConversionRateEdit,
}: FunnelDisplayProps) {
  const [editState, setEditState] = useState<EditState>({ stageIndex: null, value: "" });
  const isMonthly = viewMode === "monthly";
  const benchmarks = getAllStageBenchmarks();

  const stages: Stage[] = [
    {
      id: "webVisitors",
      name: "Web Visitors",
      value: isMonthly ? funnel.monthlyVisitors : funnel.webVisitors,
      costPer: funnel.costPerVisitor,
      costLabel: "CPV",
      color: "bg-ember/10 dark:bg-ember/20",
      borderColor: "border-ember",
    },
    {
      id: "leads",
      name: "Leads",
      value: isMonthly ? funnel.monthlyLeads : funnel.leads,
      costPer: funnel.cpl,
      costLabel: "CPL",
      color: "bg-orange-500/10 dark:bg-orange-500/20",
      borderColor: "border-orange-500",
    },
    {
      id: "mqls",
      name: "MQLs",
      value: isMonthly ? funnel.monthlyMQLs : funnel.mqls,
      costPer: funnel.cpql,
      costLabel: "CPQL",
      color: "bg-yellow-500/10 dark:bg-yellow-500/20",
      borderColor: "border-yellow-500",
    },
    {
      id: "sqos",
      name: "SQLs",
      value: isMonthly ? funnel.monthlySQOs : funnel.sqos,
      costPer: funnel.cpsql,
      costLabel: "CPSQL",
      color: "bg-lime-500/10 dark:bg-lime-500/20",
      borderColor: "border-lime-500",
    },
    {
      id: "opportunities",
      name: "Opportunities",
      value: isMonthly ? funnel.monthlyOpportunities : funnel.opportunities,
      costPer: funnel.cpOpp,
      costLabel: "CPOpp",
      color: "bg-emerald-500/10 dark:bg-emerald-500/20",
      borderColor: "border-emerald-500",
    },
    {
      id: "closedWon",
      name: "Closed/Won",
      value: isMonthly ? funnel.monthlyClosedWon : funnel.closedWon,
      costPer: funnel.cac,
      costLabel: "CAC",
      color: "bg-green-600/10 dark:bg-green-600/20",
      borderColor: "border-green-600",
    },
  ];

  const conversionRateValues = [
    rates.visitorToLead,
    rates.leadToMQL,
    rates.mqlToSQL,
    rates.sqlToOpportunity,
    rates.opportunityToClose,
  ];

  const conversionRateBenchmarks = [
    benchmarks.visitorToLead,
    benchmarks.leadToMQL,
    benchmarks.mqlToSQL,
    benchmarks.sqlToOpportunity,
    benchmarks.opportunityToClose,
  ];

  const getPerformanceColor = (rate: number, benchmark: { avg: number }) => {
    const ratio = rate / benchmark.avg;
    if (ratio >= 1.05) return "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20";
    if (ratio >= 0.95) return "text-yellow-500 bg-yellow-500/10 dark:bg-yellow-500/20";
    return "text-ember bg-ember/10 dark:bg-ember/20";
  };

  const handleEditStart = useCallback((index: number) => {
    if (!onConversionRateEdit) return;
    setEditState({
      stageIndex: index,
      value: (conversionRateValues[index] * 100).toFixed(1),
    });
  }, [conversionRateValues, onConversionRateEdit]);

  const handleEditConfirm = useCallback(() => {
    if (editState.stageIndex === null || !onConversionRateEdit) return;
    const newRate = parseFloat(editState.value) / 100;
    if (!isNaN(newRate) && newRate > 0 && newRate <= 1) {
      onConversionRateEdit(CONVERSION_KEYS[editState.stageIndex], newRate);
    }
    setEditState({ stageIndex: null, value: "" });
  }, [editState, onConversionRateEdit]);

  const handleEditCancel = useCallback(() => {
    setEditState({ stageIndex: null, value: "" });
  }, []);

  return (
    <div className="space-y-6">
      {/* Desktop Horizontal View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="flex items-stretch gap-1 min-w-0">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-stretch flex-1 min-w-0">
              {/* Stage Box */}
              <motion.div
                layout
                className={`funnel-stage ${stage.color} ${stage.borderColor} flex-1 min-w-0 flex flex-col justify-between`}
              >
                <div>
                  <div className="text-[10px] font-semibold text-charcoal/60 dark:text-foreground-muted mb-0.5 uppercase tracking-wider">
                    {stage.name}
                  </div>
                  <motion.div
                    key={stage.value}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xl font-bold text-charcoal dark:text-foreground tabular-nums leading-tight"
                  >
                    {formatCompactNumber(stage.value)}
                  </motion.div>
                </div>
                {showCosts && stage.costPer > 0 && (
                  <div className="text-[10px] font-mono text-slate dark:text-foreground-muted mt-1.5 tabular-nums">
                    {stage.costLabel}: {formatCurrency(stage.costPer)}
                  </div>
                )}
              </motion.div>

              {/* Arrow with Conversion Rate */}
              {index < stages.length - 1 && (
                <div className="flex flex-col items-center justify-center px-1 py-2 min-w-[3.5rem]">
                  <ArrowRight className="w-4 h-4 text-charcoal/30 dark:text-foreground-muted/30 mb-0.5" />
                  {editState.stageIndex === index ? (
                    // Edit mode
                    <div className="flex flex-col items-center gap-0.5">
                      <input
                        type="text"
                        value={editState.value}
                        onChange={(e) =>
                          setEditState((prev) => ({ ...prev, value: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleEditConfirm();
                          if (e.key === "Escape") handleEditCancel();
                        }}
                        autoFocus
                        className="w-14 text-center text-xs font-mono bg-white dark:bg-card-bg border border-electric rounded px-1 py-0.5 text-charcoal dark:text-foreground"
                      />
                      <div className="flex gap-0.5">
                        <button
                          onClick={handleEditConfirm}
                          className="p-0.5 text-emerald-500 hover:bg-emerald-500/10 rounded"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="p-0.5 text-ember hover:bg-ember/10 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[9px] text-slate dark:text-foreground-muted whitespace-nowrap">
                        Avg: {formatPercent(conversionRateBenchmarks[index].avg)}
                      </span>
                    </div>
                  ) : (
                    // Display mode
                    <button
                      onClick={() => handleEditStart(index)}
                      className={`group relative text-xs font-mono font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap transition-all ${
                        getPerformanceColor(conversionRateValues[index], conversionRateBenchmarks[index])
                      } ${onConversionRateEdit ? "cursor-pointer hover:ring-1 hover:ring-electric" : "cursor-default"}`}
                      disabled={!onConversionRateEdit}
                      title={
                        onConversionRateEdit
                          ? `Click to edit • Industry avg: ${formatPercent(conversionRateBenchmarks[index].avg)}`
                          : undefined
                      }
                    >
                      {formatPercent(conversionRateValues[index])}
                      {onConversionRateEdit && (
                        <Pencil className="w-2.5 h-2.5 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-electric" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="lg:hidden space-y-3">
        {stages.map((stage, index) => (
          <div key={stage.id} className="space-y-2">
            <motion.div
              layout
              className={`funnel-stage ${stage.color} ${stage.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-charcoal/70 dark:text-foreground-muted mb-0.5 uppercase tracking-wide">
                    {stage.name}
                  </div>
                  <motion.div
                    key={stage.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-charcoal dark:text-foreground tabular-nums"
                  >
                    {formatNumber(stage.value)}
                  </motion.div>
                </div>
                {showCosts && stage.costPer > 0 && (
                  <div className="text-right">
                    <div className="text-xs text-slate dark:text-foreground-muted">
                      {stage.costLabel}
                    </div>
                    <div className="text-sm font-mono font-semibold text-charcoal dark:text-foreground tabular-nums">
                      {formatCurrency(stage.costPer)}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {index < stages.length - 1 && (
              <div className="flex items-center gap-2 pl-4">
                <div className="w-0.5 h-6 bg-electric/30" />
                {editState.stageIndex === index ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editState.value}
                      onChange={(e) =>
                        setEditState((prev) => ({ ...prev, value: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditConfirm();
                        if (e.key === "Escape") handleEditCancel();
                      }}
                      autoFocus
                      className="w-16 text-center text-xs font-mono bg-white dark:bg-card-bg border border-electric rounded px-2 py-1 text-charcoal dark:text-foreground"
                    />
                    <span className="text-[10px] text-slate dark:text-foreground-muted">
                      % (Avg: {formatPercent(conversionRateBenchmarks[index].avg)})
                    </span>
                    <button onClick={handleEditConfirm} className="text-emerald-500">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={handleEditCancel} className="text-ember">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditStart(index)}
                    className={`text-xs font-mono font-semibold px-2 py-1 rounded transition-all ${
                      getPerformanceColor(conversionRateValues[index], conversionRateBenchmarks[index])
                    } ${onConversionRateEdit ? "active:scale-95" : ""}`}
                    disabled={!onConversionRateEdit}
                  >
                    {formatPercent(conversionRateValues[index])} conversion
                    {onConversionRateEdit && <Pencil className="w-3 h-3 inline ml-1.5 opacity-50" />}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
