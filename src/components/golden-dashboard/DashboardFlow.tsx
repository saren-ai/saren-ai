"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MetricCard from "./MetricCard";
import StageConnector from "./StageConnector";
import MetricDrawer from "./MetricDrawer";
import FunnelControls from "./FunnelControls";
import InsightNarrative from "./InsightNarrative";
import {
  Assumptions,
  defaultAssumptions,
  computeModel,
  metricMetadata,
  calculateDelta,
  formatNumber,
  formatCurrency,
  formatPercent,
  MetricMeta,
} from "@/lib/golden-dashboard";
import { Eye, EyeOff } from "lucide-react";

export default function DashboardFlow() {
  // State management
  const [baselineAssumptions, setBaselineAssumptions] =
    useState<Assumptions>(defaultAssumptions);
  const [currentAssumptions, setCurrentAssumptions] =
    useState<Assumptions>(defaultAssumptions);
  const [showBenchmarks, setShowBenchmarks] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricMeta | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Compute models
  const baselineModel = computeModel(baselineAssumptions);
  const currentModel = computeModel(currentAssumptions);

  // Reset to baseline
  const handleReset = () => {
    setCurrentAssumptions(baselineAssumptions);
  };

  // Build stage cards data
  const stageCards = [
    {
      id: "spend",
      name: "Total Ad Spend",
      volume: currentAssumptions.spend,
      volumeLabel: "Total Budget",
      cost: null,
      costLabel: "Starting Point",
      meta: metricMetadata.spend,
    },
    {
      id: "impressions",
      name: "Impressions",
      volume: currentModel.stages.impressions,
      volumeLabel: "Total Impressions",
      cost: currentAssumptions.cpm,
      costLabel: "CPM",
      rate: currentModel.conversionRates.ctr,
      rateLabel: "CTR",
      meta: metricMetadata.impressions,
    },
    {
      id: "clicks",
      name: "Clicks",
      volume: currentModel.stages.clicks,
      volumeLabel: "Total Clicks",
      cost: currentModel.unitCosts.cpc,
      costLabel: "CPC",
      rate: currentModel.conversionRates.clickToLead,
      rateLabel: "CVR to Lead",
      meta: metricMetadata.clicks,
    },
    {
      id: "leads",
      name: "Leads",
      volume: currentModel.stages.leads,
      volumeLabel: "Total Leads",
      cost: currentModel.unitCosts.cpl,
      costLabel: "CPL",
      rate: currentModel.conversionRates.leadToMql,
      rateLabel: "Lead→MQL",
      meta: metricMetadata.leads,
    },
    {
      id: "mqls",
      name: "MQLs",
      volume: currentModel.stages.mqls,
      volumeLabel: "Marketing Qualified",
      cost: currentModel.unitCosts.cpmql,
      costLabel: "CPMQL",
      rate: currentModel.conversionRates.mqlToOpp,
      rateLabel: "MQL→Opp",
      meta: metricMetadata.mqls,
    },
    {
      id: "opps",
      name: "Opportunities",
      volume: currentModel.stages.opps,
      volumeLabel: "Sales Pipeline",
      cost: currentModel.unitCosts.cpopp,
      costLabel: "CPOpp",
      rate: currentModel.conversionRates.oppToMeeting,
      rateLabel: "Opp→Meeting",
      meta: metricMetadata.opps,
    },
    {
      id: "meetings",
      name: "Sales Meetings",
      volume: currentModel.stages.sales_meetings,
      volumeLabel: "First Meetings",
      cost: currentModel.unitCosts.cpmeeting,
      costLabel: "Cost/Meeting",
      rate: currentModel.conversionRates.meetingToClose,
      rateLabel: "Win Rate",
      meta: metricMetadata.sales_meetings,
    },
    {
      id: "closed_won",
      name: "Closed-Won",
      volume: currentModel.stages.closed_won,
      volumeLabel: "Deals Won",
      cost: currentModel.unitCosts.cpcw,
      costLabel: "CAC",
      meta: metricMetadata.closed_won,
    },
  ];

  // Conversion rates for connectors (7 connectors for 8 stages)
  const conversionRates = [
    { rate: 100, label: "Deployed" }, // Spend → Impressions (budget deployed)
    { rate: currentModel.conversionRates.ctr * 100, label: "CTR" },
    {
      rate: currentModel.conversionRates.clickToLead * 100,
      label: "Click→Lead",
    },
    { rate: currentModel.conversionRates.leadToMql * 100, label: "Lead→MQL" },
    { rate: currentModel.conversionRates.mqlToOpp * 100, label: "MQL→Opp" },
    {
      rate: currentModel.conversionRates.oppToMeeting * 100,
      label: "Opp→Meeting",
    },
    {
      rate: currentModel.conversionRates.meetingToClose * 100,
      label: "Win Rate",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tagline */}
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-foreground italic">
          "This isn't a dashboard. It's a decision model."
        </p>
      </div>

      {/* Controls */}
      <FunnelControls
        assumptions={currentAssumptions}
        onUpdate={setCurrentAssumptions}
        onReset={handleReset}
      />

      {/* Insight Narrative */}
      <InsightNarrative
        currentModel={currentModel}
        baselineModel={baselineModel}
        currentAssumptions={currentAssumptions}
        baselineAssumptions={baselineAssumptions}
      />

      {/* Toggle Benchmarks */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-foreground-muted">Healthy (&gt;20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-foreground-muted">Moderate (10-20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ember" />
            <span className="text-foreground-muted">Needs Attention (&lt;10%)</span>
          </div>
        </div>

        <button
          onClick={() => setShowBenchmarks(!showBenchmarks)}
          className="flex items-center gap-2 px-3 py-1.5 bg-copper/10 hover:bg-copper/20 text-copper rounded-lg transition-colors text-sm"
        >
          {showBenchmarks ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          <span>{showBenchmarks ? "Hide" : "Show"} Benchmarks</span>
        </button>
      </div>

      {/* Desktop View - Two Row Split (Marketing → Sales) */}
      <div className="hidden lg:block space-y-6">
        {/* Marketing Funnel (Row 1) */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-electric" />
            Marketing Funnel
          </h3>
          <div className="flex items-stretch gap-0">
            {stageCards.slice(0, 5).map((card, index) => {
              const baselineValue =
                card.id === "spend"
                  ? baselineAssumptions.spend
                  : baselineModel.stages[
                      card.id as keyof typeof baselineModel.stages
                    ];
              const currentValue =
                card.id === "spend"
                  ? currentAssumptions.spend
                  : currentModel.stages[
                      card.id as keyof typeof currentModel.stages
                    ];
              const delta =
                typeof baselineValue === "number" &&
                typeof currentValue === "number"
                  ? calculateDelta(currentValue, baselineValue)
                  : undefined;

              return (
                <div key={card.id} className="flex items-center">
                  <div className="w-[190px]">
                    <MetricCard
                      {...card}
                      index={index}
                      isFirst={index === 0}
                      isLast={false}
                      tooltipMeta={card.meta}
                      delta={delta}
                      onClick={() => setSelectedMetric(card.meta)}
                      showBenchmark={showBenchmarks && card.meta.bench !== undefined}
                      benchmark={card.meta.bench}
                    />
                  </div>
                  {index < 4 && (
                    <StageConnector
                      rate={conversionRates[index].rate}
                      label={conversionRates[index].label}
                      index={index}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Handoff Connector */}
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center gap-4 px-6 py-3 bg-copper/10 border-2 border-copper/30 rounded-lg">
            <div className="text-center">
              <div className="text-xs text-copper uppercase tracking-wider font-semibold mb-1">
                Marketing → Sales Handoff
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground-muted text-sm">MQL-to-Opp Rate:</span>
                <span className="font-mono text-lg font-bold text-copper">
                  {formatPercent(currentModel.conversionRates.mqlToOpp)}
                </span>
              </div>
            </div>
            <svg
              className="w-6 h-6 text-copper"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Sales Funnel (Row 2) */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            Sales Funnel
          </h3>
          <div className="flex items-stretch gap-0">
            {stageCards.slice(5).map((card, index) => {
              const baselineValue =
                baselineModel.stages[
                  card.id as keyof typeof baselineModel.stages
                ];
              const currentValue =
                currentModel.stages[card.id as keyof typeof currentModel.stages];
              const delta =
                typeof baselineValue === "number" &&
                typeof currentValue === "number"
                  ? calculateDelta(currentValue, baselineValue)
                  : undefined;

              return (
                <div key={card.id} className="flex items-center">
                  <div className="w-[190px]">
                    <MetricCard
                      {...card}
                      index={index + 5}
                      isFirst={false}
                      isLast={index === 2}
                      tooltipMeta={card.meta}
                      delta={delta}
                      onClick={() => setSelectedMetric(card.meta)}
                      showBenchmark={showBenchmarks && card.meta.bench !== undefined}
                      benchmark={card.meta.bench}
                    />
                  </div>
                  {index < 2 && (
                    <StageConnector
                      rate={conversionRates[index + 5].rate}
                      label={conversionRates[index + 5].label}
                      index={index + 5}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tablet View - Marketing & Sales Split */}
      <div className="hidden md:block lg:hidden space-y-6">
        {/* Marketing Row */}
        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-electric" />
            Marketing
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {stageCards.slice(0, 5).map((card, index) => {
              const baselineValue =
                card.id === "spend"
                  ? baselineAssumptions.spend
                  : baselineModel.stages[
                      card.id as keyof typeof baselineModel.stages
                    ];
              const currentValue =
                card.id === "spend"
                  ? currentAssumptions.spend
                  : currentModel.stages[
                      card.id as keyof typeof currentModel.stages
                    ];
              const delta =
                typeof baselineValue === "number" &&
                typeof currentValue === "number"
                  ? calculateDelta(currentValue, baselineValue)
                  : undefined;

              return (
                <MetricCard
                  key={card.id}
                  {...card}
                  index={index}
                  isFirst={index === 0}
                  tooltipMeta={card.meta}
                  delta={delta}
                  onClick={() => setSelectedMetric(card.meta)}
                  showBenchmark={showBenchmarks && card.meta.bench !== undefined}
                  benchmark={card.meta.bench}
                />
              );
            })}
          </div>
        </div>

        {/* Handoff */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-copper/10 border border-copper/30 rounded-lg">
            <span className="text-xs text-copper font-semibold">
              MQL→Opp: {formatPercent(currentModel.conversionRates.mqlToOpp)}
            </span>
            <svg className="w-4 h-4 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Sales Row */}
        <div>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-copper" />
            Sales
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {stageCards.slice(5).map((card, index) => {
              const baselineValue =
                baselineModel.stages[
                  card.id as keyof typeof baselineModel.stages
                ];
              const currentValue =
                currentModel.stages[card.id as keyof typeof currentModel.stages];
              const delta =
                typeof baselineValue === "number" &&
                typeof currentValue === "number"
                  ? calculateDelta(currentValue, baselineValue)
                  : undefined;

              return (
                <MetricCard
                  key={card.id}
                  {...card}
                  index={index + 5}
                  isLast={index === 2}
                  tooltipMeta={card.meta}
                  delta={delta}
                  onClick={() => setSelectedMetric(card.meta)}
                  showBenchmark={showBenchmarks && card.meta.bench !== undefined}
                  benchmark={card.meta.bench}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile View - Vertical Stack */}
      <div className="md:hidden space-y-2">
        {/* Show first 4 stages, expandable to show rest */}
        {stageCards
          .slice(0, isExpanded ? undefined : 4)
          .map((card, index) => {
            const baselineValue =
              card.id === "spend"
                ? baselineAssumptions.spend
                : baselineModel.stages[
                    card.id as keyof typeof baselineModel.stages
                  ];
            const currentValue =
              card.id === "spend"
                ? currentAssumptions.spend
                : currentModel.stages[
                    card.id as keyof typeof currentModel.stages
                  ];
            const delta =
              typeof baselineValue === "number" &&
              typeof currentValue === "number"
                ? calculateDelta(currentValue, baselineValue)
                : undefined;

            return (
              <div key={card.id}>
                <MetricCard
                  {...card}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === stageCards.length - 1}
                  tooltipMeta={card.meta}
                  delta={delta}
                  onClick={() => setSelectedMetric(card.meta)}
                  showBenchmark={showBenchmarks && card.meta.bench !== undefined}
                  benchmark={card.meta.bench}
                />
                {index < (isExpanded ? stageCards.length - 1 : 3) && (
                  <StageConnector
                    rate={conversionRates[index]?.rate || 0}
                    label={conversionRates[index]?.label || ""}
                    index={index}
                    isVertical
                  />
                )}
              </div>
            );
          })}

        {/* Expand/Collapse Button */}
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsExpanded(true)}
            className="w-full py-4 bg-electric/10 text-electric rounded-lg font-medium hover:bg-electric/20 transition-colors flex items-center justify-center gap-2"
          >
            Show Full Funnel
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        )}

        {isExpanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsExpanded(false)}
            className="w-full py-3 text-foreground-muted text-sm hover:text-foreground transition-colors flex items-center justify-center gap-2"
          >
            Collapse
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-charcoal/5 dark:bg-ash/5 rounded-xl border border-border"
      >
        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
          Funnel Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="font-mono text-2xl font-bold text-ember">
              ${formatNumber(currentAssumptions.spend, 0)}
            </div>
            <div className="text-xs text-foreground-muted">Total Spend</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-electric">
              {formatNumber(currentModel.stages.closed_won, 1)}
            </div>
            <div className="text-xs text-foreground-muted">Deals Won</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-copper">
              {formatCurrency(currentModel.unitCosts.cpcw, 0)}
            </div>
            <div className="text-xs text-foreground-muted">CAC</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-foreground">
              {currentModel.stages.impressions > 0
                ? formatPercent(
                    currentModel.stages.closed_won /
                      currentModel.stages.impressions,
                    4
                  )
                : "—"}
            </div>
            <div className="text-xs text-foreground-muted">Full-Funnel CVR</div>
          </div>
        </div>
      </motion.div>

      {/* Interaction hints */}
      <div className="text-center space-y-2">
        <p className="text-xs text-foreground-muted">
          💡 <strong>Hover</strong> over cards for quick info • <strong>Click</strong> for detailed insights
        </p>
        <p className="text-xs text-foreground-muted">
          🎛️ Use <strong>Calculator Mode</strong> to simulate scenarios
        </p>
      </div>

      {/* Metric Drawer */}
      <MetricDrawer
        metric={selectedMetric}
        isOpen={selectedMetric !== null}
        onClose={() => setSelectedMetric(null)}
      />
    </div>
  );
}
