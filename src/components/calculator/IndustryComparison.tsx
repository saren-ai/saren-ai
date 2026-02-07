"use client";

import { motion } from "framer-motion";
import type { CustomerType, ConversionRates } from "@/lib/calculator/types";
import {
  getConversionPercentile,
  getCACPercentile,
  getAllStageBenchmarks,
} from "@/lib/calculator/benchmark-data";
import { formatPercent, formatCurrencyFull } from "@/lib/calculator/funnel-calculations";
import { BarChart3 } from "lucide-react";

interface IndustryComparisonProps {
  userCAC: number;
  userRates: ConversionRates;
  benchmarkCAC: { min: number; avg: number; max: number };
  industry: string;
  customerType: CustomerType;
}

const percentileColors: Record<string, string> = {
  poor: "bg-ember",
  "below-average": "bg-yellow-500",
  average: "bg-yellow-400",
  "above-average": "bg-emerald-400",
  excellent: "bg-electric",
};

const percentileLabels: Record<string, string> = {
  poor: "Needs work",
  "below-average": "Below avg",
  average: "Average",
  "above-average": "Above avg",
  excellent: "Top performer",
};

const customerTypeLabels: Record<CustomerType, string> = {
  consumer: "Consumer",
  smb: "SMB",
  middleMarket: "Mid-Market",
  enterprise: "Enterprise",
};

export function IndustryComparison({
  userCAC,
  userRates,
  benchmarkCAC,
  industry,
  customerType,
}: IndustryComparisonProps) {
  const stageBenchmarks = getAllStageBenchmarks();

  const metrics = [
    {
      label: "Your CAC",
      value: formatCurrencyFull(userCAC),
      benchmark: `Avg: ${formatCurrencyFull(benchmarkCAC.avg)}`,
      result: getCACPercentile(userCAC, benchmarkCAC),
      inverted: true,
    },
    {
      label: "Visitor → Lead",
      value: formatPercent(userRates.visitorToLead),
      benchmark: `Avg: ${formatPercent(stageBenchmarks.visitorToLead.avg)}`,
      result: getConversionPercentile(
        userRates.visitorToLead,
        stageBenchmarks.visitorToLead
      ),
      inverted: false,
    },
    {
      label: "Lead → MQL",
      value: formatPercent(userRates.leadToMQL),
      benchmark: `Avg: ${formatPercent(stageBenchmarks.leadToMQL.avg)}`,
      result: getConversionPercentile(
        userRates.leadToMQL,
        stageBenchmarks.leadToMQL
      ),
      inverted: false,
    },
    {
      label: "MQL → SQL",
      value: formatPercent(userRates.mqlToSQL),
      benchmark: `Avg: ${formatPercent(stageBenchmarks.mqlToSQL.avg)}`,
      result: getConversionPercentile(
        userRates.mqlToSQL,
        stageBenchmarks.mqlToSQL
      ),
      inverted: false,
    },
    {
      label: "Opp → Close",
      value: formatPercent(userRates.opportunityToClose),
      benchmark: `Avg: ${formatPercent(stageBenchmarks.opportunityToClose.avg)}`,
      result: getConversionPercentile(
        userRates.opportunityToClose,
        stageBenchmarks.opportunityToClose
      ),
      inverted: false,
    },
  ];

  return (
    <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="w-5 h-5 text-electric" />
        <h3 className="text-base font-semibold text-charcoal dark:text-foreground">
          How You Stack Up
        </h3>
        <span className="text-xs text-slate dark:text-foreground-muted ml-1">
          ({customerTypeLabels[customerType]} {industry})
        </span>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-charcoal dark:text-foreground">
                  {metric.label}
                </span>
                <span className="font-mono font-semibold text-charcoal dark:text-foreground">
                  {metric.value}
                </span>
              </div>
              <span className="text-xs text-slate dark:text-foreground-muted">
                {metric.benchmark}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-charcoal/10 dark:bg-background-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(5, metric.result.percentile)}%` }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={`h-full rounded-full ${percentileColors[metric.result.label]}`}
                />
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  metric.result.label === "poor" || metric.result.label === "below-average"
                    ? "text-ember"
                    : metric.result.label === "excellent" || metric.result.label === "above-average"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {percentileLabels[metric.result.label]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
