"use client";

import { motion } from "framer-motion";
import { formatPercent, formatCurrency } from "@/lib/calculator/funnel-calculations";
import { Lightbulb, TrendingDown, ArrowRight } from "lucide-react";

interface Suggestion {
  type: string;
  stage: string;
  current: number;
  target: number;
  impact: string;
  savingsEstimate: number;
}

interface OptimizationSuggestionsProps {
  suggestions: Suggestion[];
}

export function OptimizationSuggestions({
  suggestions,
}: OptimizationSuggestionsProps) {
  if (suggestions.length === 0) {
    return (
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-emerald-500" />
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Your funnel is performing at or above industry benchmarks. Nice work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb className="w-5 h-5 text-copper" />
        <h3 className="text-base font-semibold text-charcoal dark:text-foreground">
          Optimization Levers
        </h3>
        <span className="text-xs text-slate dark:text-foreground-muted ml-1">
          Based on your funnel
        </span>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-charcoal/3 dark:bg-background-secondary rounded-lg p-4 border border-charcoal/5 dark:border-ember/10"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-copper/10 text-copper text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-charcoal dark:text-foreground">
                    {suggestion.type === "improve-conversion"
                      ? `Improve ${suggestion.stage}`
                      : suggestion.stage}
                  </span>
                </div>

                {suggestion.type === "improve-conversion" ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-slate dark:text-foreground-muted">
                      <span className="font-mono text-ember">
                        {formatPercent(suggestion.current)}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">
                        {formatPercent(suggestion.target)}
                      </span>
                    </div>
                    <p className="text-xs text-slate dark:text-foreground-muted">
                      {suggestion.impact}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate dark:text-foreground-muted">
                    {suggestion.impact}
                  </p>
                )}

                {suggestion.savingsEstimate > 0 && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <TrendingDown className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Est. impact: {formatCurrency(suggestion.savingsEstimate)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
