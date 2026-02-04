"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  DEFAULT_CONVERSION_RATES,
  INDUSTRY_CONVERSION_RATES,
} from "@/lib/calculator/conversion-rates";
import { calculateFunnel } from "@/lib/calculator/funnel-calculations";
import type { CalculatorState, ViewMode } from "@/lib/calculator/types";
import { InputFields } from "./InputFields";
import { IndustrySelector } from "./IndustrySelector";
import { FunnelDisplay } from "./FunnelDisplay";
import { CacComparison } from "./CacComparison";
import { Calendar, TrendingUp } from "lucide-react";

export function SaasCalculator() {
  const [state, setState] = useState<CalculatorState>({
    revenueGoal: 1_000_000,
    avgDealSize: 20_000,
    selectedIndustry: "Average / General SaaS",
    customRates: DEFAULT_CONVERSION_RATES,
    useCustomRates: false,
  });

  const [viewMode, setViewMode] = useState<ViewMode>("annual");

  // Get rates based on industry or custom
  const rates = useMemo(() => {
    if (state.useCustomRates) return state.customRates;
    const industryRates = INDUSTRY_CONVERSION_RATES.find(
      (i) => i.industry === state.selectedIndustry
    );
    return industryRates || DEFAULT_CONVERSION_RATES;
  }, [state.selectedIndustry, state.customRates, state.useCustomRates]);

  // Calculate funnel
  const funnel = useMemo(
    () => calculateFunnel(state.revenueGoal, state.avgDealSize, rates),
    [state.revenueGoal, state.avgDealSize, rates]
  );

  const handleStateChange = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-6 md:p-8"
      >
        <div className="space-y-6">
          <InputFields state={state} onChange={handleStateChange} />
          <IndustrySelector
            value={state.selectedIndustry}
            onChange={(industry) =>
              handleStateChange({ selectedIndustry: industry })
            }
          />
        </div>
      </motion.div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setViewMode("annual")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "annual"
              ? "bg-electric text-white"
              : "bg-white dark:bg-card-bg text-charcoal dark:text-foreground border border-charcoal/20 dark:border-ember/20 hover:border-electric dark:hover:border-electric"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Annual View
        </button>
        <button
          onClick={() => setViewMode("monthly")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "monthly"
              ? "bg-electric text-white"
              : "bg-white dark:bg-card-bg text-charcoal dark:text-foreground border border-charcoal/20 dark:border-ember/20 hover:border-electric dark:hover:border-electric"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Monthly View
        </button>
      </div>

      {/* Funnel Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-6 md:p-8"
      >
        <h3 className="text-xl font-semibold text-charcoal dark:text-foreground mb-6">
          Your Funnel Breakdown
        </h3>
        <FunnelDisplay funnel={funnel} rates={rates} viewMode={viewMode} />
      </motion.div>

      {/* CAC Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CacComparison
          closedWonDeals={funnel.closedWon}
          revenueGoal={state.revenueGoal}
          selectedIndustry={state.selectedIndustry}
        />
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-charcoal/5 dark:bg-background-secondary border border-charcoal/10 dark:border-ember/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-4">
          Key Takeaways
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
            <span>
              You'll need <strong className="text-charcoal dark:text-foreground">{viewMode === "monthly" ? funnel.monthlyLeads.toLocaleString() : funnel.leads.toLocaleString()}</strong> {viewMode === "monthly" ? "monthly" : "annual"} leads to hit your revenue target
            </span>
          </li>
          <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
            <span>
              That requires <strong className="text-charcoal dark:text-foreground">{viewMode === "monthly" ? funnel.monthlyVisitors.toLocaleString() : funnel.webVisitors.toLocaleString()}</strong> {viewMode === "monthly" ? "monthly" : "annual"} website visitors
            </span>
          </li>
          <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
            <span>
              Your marketing team needs to generate <strong className="text-charcoal dark:text-foreground">{viewMode === "monthly" ? funnel.monthlyMQLs.toLocaleString() : funnel.mqls.toLocaleString()}</strong> {viewMode === "monthly" ? "monthly" : "annual"} MQLs for sales
            </span>
          </li>
          <li className="flex items-start gap-3 text-slate dark:text-foreground-muted">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-electric mt-1.5" />
            <span>
              These conversion rates are based on <strong className="text-charcoal dark:text-foreground">{state.selectedIndustry}</strong> benchmarks
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
