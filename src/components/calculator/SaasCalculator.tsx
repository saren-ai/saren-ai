"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  DEFAULT_CONVERSION_RATES,
  INDUSTRY_CONVERSION_RATES,
} from "@/lib/calculator/conversion-rates";
import {
  calculateBidirectionalFunnel,
  generateOptimizationSuggestions,
  formatCurrency,
} from "@/lib/calculator/funnel-calculations";
import { getBenchmark, getAllStageBenchmarks } from "@/lib/calculator/benchmark-data";
import type {
  CalculatorState,
  ViewMode,
  ConversionRates,
  CalculationDirection,
  CustomerType,
  ChannelMix,
} from "@/lib/calculator/types";
import { ConfigurationPanel } from "./ConfigurationPanel";
import { BidirectionalInputs } from "./BidirectionalInputs";
import { FunnelDisplay } from "./FunnelDisplay";
import { PerformanceDashboard } from "./PerformanceDashboard";
import { IndustryComparison } from "./IndustryComparison";
import { OptimizationSuggestions } from "./OptimizationSuggestions";
import { AlternativePathways } from "./AlternativePathways";
import { ExportControls } from "./ExportControls";
import { CacComparison } from "./CacComparison";
import { Calendar, TrendingUp, RotateCcw } from "lucide-react";

export function SaasCalculator() {
  const [state, setState] = useState<CalculatorState>({
    selectedIndustry: "Average / General SaaS",
    customerType: "smb",
    channelMix: "paid-led",
    direction: "reverse",
    budget: null,
    revenueGoal: 1_000_000,
    avgDealSize: 20_000,
    conversionRates: { ...DEFAULT_CONVERSION_RATES },
    useCustomRates: false,
  });

  const [viewMode, setViewMode] = useState<ViewMode>("annual");

  // Get active rates (industry defaults or custom-edited)
  const activeRates = useMemo(() => {
    if (state.useCustomRates) return state.conversionRates;
    const industryRates = INDUSTRY_CONVERSION_RATES.find(
      (i) => i.industry === state.selectedIndustry
    );
    return industryRates || DEFAULT_CONVERSION_RATES;
  }, [state.selectedIndustry, state.conversionRates, state.useCustomRates]);

  // Calculate funnel (bidirectional)
  const funnel = useMemo(
    () =>
      calculateBidirectionalFunnel({
        ...state,
        conversionRates: activeRates,
      }),
    [state, activeRates]
  );

  // Get benchmark data for comparison
  const benchmarkData = useMemo(
    () => getBenchmark(state.selectedIndustry, state.customerType),
    [state.selectedIndustry, state.customerType]
  );

  const stageBenchmarks = useMemo(() => getAllStageBenchmarks(), []);

  // Generate optimization suggestions
  const suggestions = useMemo(
    () =>
      funnel.totalSpend > 0
        ? generateOptimizationSuggestions(
            activeRates,
            stageBenchmarks,
            funnel,
            benchmarkData.cac.avg
          )
        : [],
    [activeRates, stageBenchmarks, funnel, benchmarkData.cac.avg]
  );

  // State update handlers
  const updateState = useCallback(
    (updates: Partial<CalculatorState>) => {
      setState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const handleIndustryChange = useCallback(
    (industry: string) => {
      const industryRates = INDUSTRY_CONVERSION_RATES.find(
        (i) => i.industry === industry
      );
      updateState({
        selectedIndustry: industry,
        conversionRates: industryRates || DEFAULT_CONVERSION_RATES,
        useCustomRates: false,
      });
    },
    [updateState]
  );

  const handleConversionRateEdit = useCallback(
    (stage: keyof ConversionRates, newRate: number) => {
      setState((prev) => ({
        ...prev,
        useCustomRates: true,
        conversionRates: {
          ...prev.conversionRates,
          [stage]: newRate,
        },
      }));
    },
    []
  );

  const handleDirectionChange = useCallback(
    (direction: CalculationDirection) => {
      updateState({ direction });
    },
    [updateState]
  );

  const handleResetRates = useCallback(() => {
    const industryRates = INDUSTRY_CONVERSION_RATES.find(
      (i) => i.industry === state.selectedIndustry
    );
    updateState({
      conversionRates: industryRates || DEFAULT_CONVERSION_RATES,
      useCustomRates: false,
    });
  }, [state.selectedIndustry, updateState]);

  const hasData = funnel.webVisitors > 0;

  return (
    <div className="space-y-6">
      {/* Configuration + Inputs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-5 md:p-7"
      >
        <div className="space-y-6">
          {/* Configuration Panel */}
          <ConfigurationPanel
            selectedIndustry={state.selectedIndustry}
            customerType={state.customerType}
            channelMix={state.channelMix}
            onIndustryChange={handleIndustryChange}
            onCustomerTypeChange={(type) => updateState({ customerType: type })}
            onChannelMixChange={(mix) => updateState({ channelMix: mix })}
          />

          <div className="border-t border-charcoal/10 dark:border-ember/10 pt-5">
            {/* Bidirectional Inputs */}
            <BidirectionalInputs
              direction={state.direction}
              budget={state.budget}
              revenueGoal={state.revenueGoal}
              avgDealSize={state.avgDealSize}
              calculatedRevenue={funnel.revenue}
              calculatedBudget={funnel.totalSpend}
              onDirectionChange={handleDirectionChange}
              onBudgetChange={(v) => updateState({ budget: v, direction: "forward" })}
              onRevenueGoalChange={(v) => updateState({ revenueGoal: v, direction: "reverse" })}
              onAvgDealSizeChange={(v) => updateState({ avgDealSize: v })}
            />
          </div>
        </div>
      </motion.div>

      {/* View Mode Toggle + Reset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("annual")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === "annual"
                ? "bg-electric text-white"
                : "bg-white dark:bg-card-bg text-charcoal dark:text-foreground border border-charcoal/20 dark:border-ember/20 hover:border-electric"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Annual
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === "monthly"
                ? "bg-electric text-white"
                : "bg-white dark:bg-card-bg text-charcoal dark:text-foreground border border-charcoal/20 dark:border-ember/20 hover:border-electric"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Monthly
          </button>
        </div>
        {state.useCustomRates && (
          <button
            onClick={handleResetRates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate dark:text-foreground-muted hover:text-charcoal dark:hover:text-foreground border border-charcoal/10 dark:border-ember/20 hover:border-ember transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to industry defaults
          </button>
        )}
      </div>

      {/* Funnel Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-5 md:p-7"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-charcoal dark:text-foreground">
            Your Funnel
          </h3>
          <p className="text-xs text-slate dark:text-foreground-muted">
            Click conversion rates to edit
          </p>
        </div>
        <FunnelDisplay
          funnel={funnel}
          rates={activeRates}
          viewMode={viewMode}
          showCosts={hasData}
          onConversionRateEdit={handleConversionRateEdit}
        />
      </motion.div>

      {/* Performance Dashboard */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PerformanceDashboard
            roi={funnel.roi}
            blendedCAC={funnel.cac}
            totalSpend={funnel.totalSpend}
            revenue={funnel.revenue}
            gap={funnel.gap}
            benchmarkCAC={benchmarkData.cac}
            direction={state.direction}
          />
        </motion.div>
      )}

      {/* CAC Comparison (original feature, enhanced) */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <CacComparison
            closedWonDeals={funnel.closedWon}
            revenueGoal={state.revenueGoal || funnel.revenue}
            selectedIndustry={state.selectedIndustry}
          />
        </motion.div>
      )}

      {/* Intelligence Section */}
      {hasData && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Industry Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <IndustryComparison
              userCAC={funnel.cac}
              userRates={activeRates}
              benchmarkCAC={benchmarkData.cac}
              industry={state.selectedIndustry}
              customerType={state.customerType}
            />
          </motion.div>

          {/* Optimization Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <OptimizationSuggestions suggestions={suggestions} />
          </motion.div>
        </div>
      )}

      {/* Alternative Pathways */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AlternativePathways
            industry={state.selectedIndustry}
            currentCAC={funnel.cac}
            totalSpend={funnel.totalSpend}
          />
        </motion.div>
      )}

      {/* Key Insights */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-charcoal/5 dark:bg-background-secondary border border-charcoal/10 dark:border-ember/20 rounded-xl p-5"
        >
          <h3 className="text-base font-semibold text-charcoal dark:text-foreground mb-3">
            Key Takeaways
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
              <span>
                {state.direction === "forward" ? (
                  <>
                    Your {formatCurrency(state.budget || 0)} budget can generate{" "}
                    <strong className="text-charcoal dark:text-foreground">{formatCurrency(funnel.revenue)}</strong> in revenue
                  </>
                ) : (
                  <>
                    You need{" "}
                    <strong className="text-charcoal dark:text-foreground">
                      {viewMode === "monthly"
                        ? funnel.monthlyLeads.toLocaleString()
                        : funnel.leads.toLocaleString()}
                    </strong>{" "}
                    {viewMode === "monthly" ? "monthly" : "annual"} leads to hit your revenue target
                  </>
                )}
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
              <span>
                That requires{" "}
                <strong className="text-charcoal dark:text-foreground">
                  {viewMode === "monthly"
                    ? funnel.monthlyVisitors.toLocaleString()
                    : funnel.webVisitors.toLocaleString()}
                </strong>{" "}
                {viewMode === "monthly" ? "monthly" : "annual"} website visitors
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
              <span>
                Estimated required budget:{" "}
                <strong className="text-charcoal dark:text-foreground">
                  {formatCurrency(funnel.totalSpend)}
                </strong>{" "}
                ({formatCurrency(Math.ceil(funnel.totalSpend / 12))}/mo)
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
              <span>
                Based on{" "}
                <strong className="text-charcoal dark:text-foreground">
                  {state.selectedIndustry}
                </strong>{" "}
                benchmarks
                {state.useCustomRates && " (with your custom rates)"}
              </span>
            </li>
          </ul>
        </motion.div>
      )}

      {/* Export / CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ExportControls hasData={hasData} />
      </motion.div>
    </div>
  );
}
