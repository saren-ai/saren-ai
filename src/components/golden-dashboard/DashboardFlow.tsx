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
import { Eye, EyeOff, ArrowDown } from "lucide-react";
import LeadScoringContainer from "./LeadScoringContainer";
import { StaticSConnector } from "./StaticSConnector";

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

  // Helper to calculate delta for a stage
  const getDelta = (stageId: string) => {
    if (stageId === "spend") {
      return calculateDelta(currentAssumptions.spend, baselineAssumptions.spend);
    }
    const baselineValue = baselineModel.stages[stageId as keyof typeof baselineModel.stages];
    const currentValue = currentModel.stages[stageId as keyof typeof currentModel.stages];
    if (typeof baselineValue === "number" && typeof currentValue === "number") {
      return calculateDelta(currentValue, baselineValue);
    }
    return undefined;
  };

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

      {/* ========== DESKTOP VIEW: 4-Row Serpentine Layout ========== */}
      <div className="hidden lg:block">
        <div className="flex flex-col items-center gap-6">
          
          {/* ROW 1: Total Ad Spend (centered) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-[220px]"
          >
            <MetricCard
              id="spend"
              name="Total Ad Spend"
              volume={currentAssumptions.spend}
              volumeLabel="Total Budget"
              cost={null}
              costLabel="Starting Point"
              index={0}
              isFirst={true}
              tooltipMeta={metricMetadata.spend}
              delta={getDelta("spend")}
              onClick={() => setSelectedMetric(metricMetadata.spend)}
              showBenchmark={false}
            />
          </motion.div>

          {/* Connector: Spend → Row 2 (branching down) */}
          <div className="flex flex-col items-center py-2">
            <div className="w-0.5 h-8 bg-electric/50 rounded-full" />
            <div className="flex items-center gap-1 text-xs text-electric font-medium my-1">
              <ArrowDown className="w-4 h-4" />
              <span>Budget Deployed</span>
            </div>
          </div>

          {/* ROW 2: Impressions → Clicks → Leads */}
          <div className="flex items-center justify-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-[200px]"
            >
              <MetricCard
                id="impressions"
                name="Impressions"
                volume={currentModel.stages.impressions}
                volumeLabel="Total Impressions"
                cost={currentAssumptions.cpm}
                costLabel="CPM"
                rate={currentModel.conversionRates.ctr}
                rateLabel="CTR"
                index={1}
                tooltipMeta={metricMetadata.impressions}
                delta={getDelta("impressions")}
                onClick={() => setSelectedMetric(metricMetadata.impressions)}
                showBenchmark={showBenchmarks && metricMetadata.impressions.bench !== undefined}
                benchmark={metricMetadata.impressions.bench}
              />
            </motion.div>

            <StageConnector
              rate={currentModel.conversionRates.ctr * 100}
              label="CTR"
              index={1}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-[200px]"
            >
              <MetricCard
                id="clicks"
                name="Clicks"
                volume={currentModel.stages.clicks}
                volumeLabel="Total Clicks"
                cost={currentModel.unitCosts.cpc}
                costLabel="CPC"
                rate={currentModel.conversionRates.clickToLead}
                rateLabel="CVR to Lead"
                index={2}
                tooltipMeta={metricMetadata.clicks}
                delta={getDelta("clicks")}
                onClick={() => setSelectedMetric(metricMetadata.clicks)}
                showBenchmark={showBenchmarks && metricMetadata.clicks.bench !== undefined}
                benchmark={metricMetadata.clicks.bench}
              />
            </motion.div>

            <StageConnector
              rate={currentModel.conversionRates.clickToLead * 100}
              label="Click→Lead"
              index={2}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-[200px]"
            >
              <MetricCard
                id="leads"
                name="Leads"
                volume={currentModel.stages.leads}
                volumeLabel="Total Leads"
                cost={currentModel.unitCosts.cpl}
                costLabel="CPL"
                rate={currentModel.conversionRates.leadToMql}
                rateLabel="Lead→MQL"
                index={3}
                tooltipMeta={metricMetadata.leads}
                delta={getDelta("leads")}
                onClick={() => setSelectedMetric(metricMetadata.leads)}
                showBenchmark={showBenchmarks && metricMetadata.leadToMql.bench !== undefined}
                benchmark={metricMetadata.leadToMql.bench}
              />
            </motion.div>
          </div>

          {/* S-Curve Connector: Row 2 → Row 3 */}
          <StaticSConnector
            rate={currentModel.conversionRates.leadToMql}
            rateLabel="Lead→MQL"
            color="electric"
          />

          {/* ROW 3: Lead Scoring Container */}
          <LeadScoringContainer
            mqls={currentModel.stages.mqls}
            cpmql={currentModel.unitCosts.cpmql}
            mqlToSqlRate={currentModel.conversionRates.mqlToSql}
            mqlMetricMeta={metricMetadata.mqls}
            mqlBenchmark={metricMetadata.mqlToSql.bench}
            delta={getDelta("mqls")}
            showBenchmark={showBenchmarks}
            onMqlClick={() => setSelectedMetric(metricMetadata.mqls)}
          />

          {/* S-Curve Connector: Row 3 → Row 4 */}
          <StaticSConnector
            rate={currentModel.conversionRates.mqlToSql}
            rateLabel="MQL→SQL"
            color="copper"
          />

          {/* ROW 4: SQL → Opportunities → Closed-Won */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2 justify-center">
              <span className="w-2 h-2 rounded-full bg-copper" />
              Sales Funnel
            </h3>
            <div className="flex items-center justify-center gap-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="w-[200px]"
              >
                <MetricCard
                  id="sqls"
                  name="SQLs"
                  volume={currentModel.stages.sqls}
                  volumeLabel="Sales Qualified"
                  cost={currentModel.unitCosts.cpsql}
                  costLabel="CPSQL"
                  rate={currentModel.conversionRates.sqlToOpp}
                  rateLabel="SQL→Opp"
                  index={5}
                  tooltipMeta={metricMetadata.sqls}
                  delta={getDelta("sqls")}
                  onClick={() => setSelectedMetric(metricMetadata.sqls)}
                  showBenchmark={showBenchmarks && metricMetadata.sqlToOpp.bench !== undefined}
                  benchmark={metricMetadata.sqlToOpp.bench}
                />
              </motion.div>

              <StageConnector
                rate={currentModel.conversionRates.sqlToOpp * 100}
                label="SQL→Opp"
                index={5}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="w-[200px]"
              >
                <MetricCard
                  id="opps"
                  name="Opportunities"
                  volume={currentModel.stages.opps}
                  volumeLabel="Pipeline"
                  cost={currentModel.unitCosts.cpopp}
                  costLabel="CPOpp"
                  rate={currentModel.conversionRates.oppToClose}
                  rateLabel="Win Rate"
                  index={6}
                  tooltipMeta={metricMetadata.opps}
                  delta={getDelta("opps")}
                  onClick={() => setSelectedMetric(metricMetadata.opps)}
                  showBenchmark={showBenchmarks && metricMetadata.oppToClose.bench !== undefined}
                  benchmark={metricMetadata.oppToClose.bench}
                />
              </motion.div>

              <StageConnector
                rate={currentModel.conversionRates.oppToClose * 100}
                label="Win Rate"
                index={6}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="w-[200px]"
              >
                <MetricCard
                  id="closed_won"
                  name="Closed-Won"
                  volume={currentModel.stages.closed_won}
                  volumeLabel="Deals Won"
                  cost={currentModel.unitCosts.cpcw}
                  costLabel="CAC"
                  index={7}
                  isLast={true}
                  tooltipMeta={metricMetadata.closed_won}
                  delta={getDelta("closed_won")}
                  onClick={() => setSelectedMetric(metricMetadata.closed_won)}
                  showBenchmark={false}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== TABLET VIEW ========== */}
      <div className="hidden md:block lg:hidden space-y-4">
        {/* Row 1: Spend */}
        <div className="flex justify-center">
          <div className="w-[200px]">
            <MetricCard
              id="spend"
              name="Total Ad Spend"
              volume={currentAssumptions.spend}
              volumeLabel="Total Budget"
              cost={null}
              costLabel="Starting Point"
              index={0}
              isFirst={true}
              tooltipMeta={metricMetadata.spend}
              delta={getDelta("spend")}
              onClick={() => setSelectedMetric(metricMetadata.spend)}
              showBenchmark={false}
            />
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center py-2">
          <div className="w-0.5 h-6 bg-electric/50 rounded-full" />
        </div>

        {/* Row 2: Marketing metrics */}
        <div>
          <h4 className="text-xs font-semibold text-electric uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-electric" />
            Marketing Funnel
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "impressions", name: "Impressions", volume: currentModel.stages.impressions, cost: currentAssumptions.cpm, costLabel: "CPM" },
              { id: "clicks", name: "Clicks", volume: currentModel.stages.clicks, cost: currentModel.unitCosts.cpc, costLabel: "CPC" },
              { id: "leads", name: "Leads", volume: currentModel.stages.leads, cost: currentModel.unitCosts.cpl, costLabel: "CPL" },
            ].map((card, idx) => (
              <MetricCard
                key={card.id}
                id={card.id}
                name={card.name}
                volume={card.volume}
                volumeLabel={card.name}
                cost={card.cost}
                costLabel={card.costLabel}
                index={idx + 1}
                tooltipMeta={metricMetadata[card.id]}
                delta={getDelta(card.id)}
                onClick={() => setSelectedMetric(metricMetadata[card.id])}
                showBenchmark={showBenchmarks}
                benchmark={metricMetadata[card.id]?.bench}
              />
            ))}
          </div>
        </div>

        {/* Lead Scoring Container - Tablet version */}
        <div className="p-4 bg-electric/5 border border-electric/20 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-electric flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric" />
              Lead Scoring
            </span>
            <span className="text-xs text-foreground-muted">
              {formatPercent(currentModel.conversionRates.leadToMql)} Lead→MQL
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-foreground-muted">Fit + Engagement → 75+ pts</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground-muted">MQLs:</span>
              <span className="font-mono text-xl font-bold text-electric">
                {formatNumber(currentModel.stages.mqls, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Handoff indicator */}
        <div className="flex flex-col items-center py-2">
          <div className="w-0.5 h-4 bg-copper/50 rounded-full" />
          <span className="px-2 py-1 my-1 rounded-full text-xs font-medium border border-copper/40 text-copper bg-background">
            {formatPercent(currentModel.conversionRates.mqlToSql)} MQL→SQL
          </span>
          <div className="w-0.5 h-4 bg-copper/50 rounded-full" />
        </div>

        {/* Row 3: Sales metrics */}
        <div>
          <h4 className="text-xs font-semibold text-copper uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-copper" />
            Sales Funnel
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "sqls", name: "SQLs", volume: currentModel.stages.sqls, cost: currentModel.unitCosts.cpsql, costLabel: "CPSQL" },
              { id: "opps", name: "Opps", volume: currentModel.stages.opps, cost: currentModel.unitCosts.cpopp, costLabel: "CPOpp" },
              { id: "closed_won", name: "Won", volume: currentModel.stages.closed_won, cost: currentModel.unitCosts.cpcw, costLabel: "CAC" },
            ].map((card, idx) => (
              <MetricCard
                key={card.id}
                id={card.id}
                name={card.name}
                volume={card.volume}
                volumeLabel={card.name}
                cost={card.cost}
                costLabel={card.costLabel}
                index={idx + 5}
                isLast={card.id === "closed_won"}
                tooltipMeta={metricMetadata[card.id]}
                delta={getDelta(card.id)}
                onClick={() => setSelectedMetric(metricMetadata[card.id])}
                showBenchmark={showBenchmarks}
                benchmark={metricMetadata[card.id]?.bench}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========== MOBILE VIEW: Vertical Stack ========== */}
      <div className="md:hidden space-y-2">
        {/* Marketing Funnel Section Header */}
        <h4 className="text-xs font-semibold text-electric uppercase tracking-wider mb-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-electric" />
          Marketing Funnel
        </h4>

        {/* Stages in order */}
        {[
          { id: "spend", name: "Ad Spend", volume: currentAssumptions.spend, cost: null, costLabel: "Budget", isFirst: true },
          { id: "impressions", name: "Impressions", volume: currentModel.stages.impressions, cost: currentAssumptions.cpm, costLabel: "CPM", rate: currentModel.conversionRates.ctr, rateLabel: "CTR" },
          { id: "clicks", name: "Clicks", volume: currentModel.stages.clicks, cost: currentModel.unitCosts.cpc, costLabel: "CPC" },
          { id: "leads", name: "Leads", volume: currentModel.stages.leads, cost: currentModel.unitCosts.cpl, costLabel: "CPL" },
        ].slice(0, isExpanded ? undefined : 4).map((card, idx) => (
          <div key={card.id}>
            <MetricCard
              id={card.id}
              name={card.name}
              volume={card.volume}
              volumeLabel={card.name}
              cost={card.cost}
              costLabel={card.costLabel}
              rate={card.rate}
              rateLabel={card.rateLabel}
              index={idx}
              isFirst={card.isFirst}
              tooltipMeta={metricMetadata[card.id]}
              delta={getDelta(card.id)}
              onClick={() => setSelectedMetric(metricMetadata[card.id])}
              showBenchmark={showBenchmarks}
              benchmark={metricMetadata[card.id]?.bench}
            />
            {idx < 3 && (
              <div className="flex justify-center py-1.5">
                <div className="w-0.5 h-4 bg-electric/40 rounded-full" />
              </div>
            )}
          </div>
        ))}

        {/* Expanded stages */}
        {isExpanded && (
          <>
            {/* Lead Scoring → MQLs */}
            <div className="p-3 bg-electric/5 border border-electric/20 rounded-lg my-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-electric font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                  Lead Scoring
                </span>
                <span className="text-[10px] text-foreground-muted">
                  {formatPercent(currentModel.conversionRates.leadToMql)} Lead→MQL
                </span>
              </div>
              <MetricCard
                id="mqls"
                name="MQLs"
                volume={currentModel.stages.mqls}
                volumeLabel="Marketing Qualified"
                cost={currentModel.unitCosts.cpmql}
                costLabel="CPMQL"
                index={4}
                tooltipMeta={metricMetadata.mqls}
                delta={getDelta("mqls")}
                onClick={() => setSelectedMetric(metricMetadata.mqls)}
                showBenchmark={showBenchmarks}
              />
            </div>

            {/* Handoff connector with rate */}
            <div className="flex flex-col items-center py-2">
              <div className="w-0.5 h-3 bg-copper/40 rounded-full" />
              <div className="px-2 py-1 bg-background border border-copper/30 rounded-full text-[10px] font-medium text-copper my-1">
                {formatPercent(currentModel.conversionRates.mqlToSql)} MQL→SQL
              </div>
              <div className="w-0.5 h-3 bg-copper/40 rounded-full" />
            </div>

            {/* Sales Funnel Section Header */}
            <h4 className="text-xs font-semibold text-copper uppercase tracking-wider mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              Sales Funnel
            </h4>

            {/* Sales stages */}
            {[
              { id: "sqls", name: "SQLs", volume: currentModel.stages.sqls, cost: currentModel.unitCosts.cpsql, costLabel: "CPSQL" },
              { id: "opps", name: "Opps", volume: currentModel.stages.opps, cost: currentModel.unitCosts.cpopp, costLabel: "CPOpp" },
              { id: "closed_won", name: "Won", volume: currentModel.stages.closed_won, cost: currentModel.unitCosts.cpcw, costLabel: "CAC", isLast: true },
            ].map((card, idx) => (
              <div key={card.id}>
                <MetricCard
                  id={card.id}
                  name={card.name}
                  volume={card.volume}
                  volumeLabel={card.name}
                  cost={card.cost}
                  costLabel={card.costLabel}
                  index={idx + 5}
                  isLast={card.isLast}
                  tooltipMeta={metricMetadata[card.id]}
                  delta={getDelta(card.id)}
                  onClick={() => setSelectedMetric(metricMetadata[card.id])}
                  showBenchmark={showBenchmarks}
                  benchmark={metricMetadata[card.id]?.bench}
                />
                {idx < 2 && (
                  <div className="flex justify-center py-1.5">
                    <div className="w-0.5 h-4 bg-copper/40 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Expand/Collapse Button */}
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsExpanded(true)}
            className="w-full py-4 bg-electric/10 text-electric rounded-lg font-medium hover:bg-electric/20 transition-colors flex items-center justify-center gap-2"
          >
            Show Full Funnel
            <ArrowDown className="w-4 h-4" />
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
          </motion.button>
        )}
      </div>

      {/* ========== FUNNEL SUMMARY ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-charcoal/5 dark:bg-ash/5 rounded-xl border border-border"
      >
        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
          Funnel Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="font-mono text-2xl font-bold text-ember">
              ${formatNumber(currentAssumptions.spend, 0)}
            </div>
            <div className="text-xs text-foreground-muted">Total Spend</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-electric">
              {formatNumber(currentModel.stages.mqls, 0)}
            </div>
            <div className="text-xs text-foreground-muted">MQLs</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-copper">
              {formatNumber(currentModel.stages.closed_won, 1)}
            </div>
            <div className="text-xs text-foreground-muted">Deals Won</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-ember">
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
