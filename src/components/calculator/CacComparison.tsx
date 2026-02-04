"use client";

import { useState } from "react";
import { CAC_BY_SCALE } from "@/lib/calculator/conversion-rates";
import {
  calculateCAC,
  formatCurrency,
  getScaleLabel,
} from "@/lib/calculator/funnel-calculations";
import type { CompanyScale } from "@/lib/calculator/types";
import { TrendingUp } from "lucide-react";

interface CacComparisonProps {
  closedWonDeals: number;
  revenueGoal: number;
  selectedIndustry: string;
}

export function CacComparison({
  closedWonDeals,
  revenueGoal,
  selectedIndustry,
}: CacComparisonProps) {
  const [selectedScale, setSelectedScale] =
    useState<CompanyScale>("middleMarket");

  // Find CAC data for selected industry
  const industryCAC = CAC_BY_SCALE.find(
    (item) =>
      item.industry.toLowerCase() === selectedIndustry.toLowerCase() ||
      item.industry === "AVERAGE"
  ) || CAC_BY_SCALE.find((item) => item.industry === "AVERAGE")!;

  const scales: CompanyScale[] = ["consumer", "smb", "middleMarket", "enterprise"];

  return (
    <div className="bg-gradient-to-br from-electric/5 to-copper/5 dark:from-background-secondary dark:to-background-secondary border border-charcoal/10 dark:border-electric/20 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-charcoal dark:text-foreground mb-2">
            Required Marketing Budget
          </h3>
          <p className="text-slate dark:text-foreground-muted text-sm">
            Based on industry CAC benchmarks. Select your company scale to see
            estimated budget.
          </p>
        </div>
      </div>

      {/* Scale Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {scales.map((scale) => {
          const cacValue = industryCAC[scale];
          if (cacValue === null) return null;

          const isSelected = selectedScale === scale;
          return (
            <button
              key={scale}
              onClick={() => setSelectedScale(scale)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-electric text-white"
                  : "bg-white dark:bg-card-bg text-charcoal dark:text-foreground border border-charcoal/20 dark:border-ember/20 hover:border-electric dark:hover:border-electric"
              }`}
            >
              {getScaleLabel(scale)}
            </button>
          );
        })}
      </div>

      {/* Budget Display */}
      {(() => {
        const cacValue = industryCAC[selectedScale];
        if (cacValue === null) {
          return (
            <div className="text-center py-8 text-slate dark:text-foreground-muted">
              CAC data not available for this scale
            </div>
          );
        }

        const { budget, percentOfGoal } = calculateCAC(
          closedWonDeals,
          cacValue,
          revenueGoal
        );

        return (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card-bg rounded-lg p-4 border border-charcoal/10 dark:border-ember/20">
              <div className="text-sm text-slate dark:text-foreground-muted mb-1">
                CAC per Customer
              </div>
              <div className="text-2xl font-bold text-charcoal dark:text-foreground">
                {formatCurrency(cacValue)}
              </div>
            </div>
            <div className="bg-white dark:bg-card-bg rounded-lg p-4 border border-charcoal/10 dark:border-ember/20">
              <div className="text-sm text-slate dark:text-foreground-muted mb-1">
                Total Budget Required
              </div>
              <div className="text-2xl font-bold text-electric">
                {formatCurrency(budget)}
              </div>
            </div>
            <div className="bg-white dark:bg-card-bg rounded-lg p-4 border border-charcoal/10 dark:border-ember/20">
              <div className="text-sm text-slate dark:text-foreground-muted mb-1">
                % of Revenue Goal
              </div>
              <div className="text-2xl font-bold text-copper">
                {percentOfGoal.toFixed(1)}%
              </div>
            </div>
          </div>
        );
      })()}

      {/* Explanation */}
      <div className="mt-6 text-xs text-slate dark:text-foreground-muted bg-charcoal/5 dark:bg-background-secondary rounded-lg p-4">
        <strong className="text-charcoal dark:text-foreground">Formula:</strong>{" "}
        Budget = CAC × Closed/Won Deals ({formatCurrency(industryCAC[selectedScale] || 0)} × {closedWonDeals} = {formatCurrency((industryCAC[selectedScale] || 0) * closedWonDeals)})
      </div>
    </div>
  );
}
