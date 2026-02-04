"use client";

import { motion } from "framer-motion";
import type { ScoringResult } from "@/lib/behavioral-scoring";
import { TrendingUp, AlertCircle } from "lucide-react";

interface ScoreVisualizerProps {
  scoring: ScoringResult;
}

export function ScoreVisualizer({ scoring }: ScoreVisualizerProps) {
  const { fitScore, engagementScore, totalScore, threshold, buyerState } =
    scoring;

  const getStateLabel = (state: string) => {
    switch (state) {
      case "unknown-unknown":
        return "Unknown Unknown";
      case "known-unknown":
        return "Known Unknown";
      case "known-lead":
        return "Known Lead";
      case "mql":
        return "MQL";
      case "sql":
        return "SQL";
      default:
        return state;
    }
  };

  const isSQL = buyerState === "sql";
  const isMQL = buyerState === "mql";

  return (
    <div className="bg-gradient-to-br from-charcoal to-offblack dark:from-background dark:to-background-secondary text-ash rounded-xl p-8 border border-charcoal/20 dark:border-ember/20">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Total Score */}
        <div className="md:col-span-1">
          <p className="text-sm text-ash/60 dark:text-foreground-muted uppercase tracking-wide mb-2">
            Total Score
          </p>
          <div className="relative">
            <motion.div
              key={totalScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-bold text-ember"
            >
              {totalScore}
            </motion.div>
            <span className="text-2xl text-ash/40 dark:text-foreground-muted">
              / 100
            </span>
          </div>

          {/* Current State Badge */}
          <div className="mt-4">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                isSQL
                  ? "bg-ember/20 text-ember border border-ember/40"
                  : isMQL
                  ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/40"
                  : "bg-electric/20 text-electric border border-electric/40"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {getStateLabel(buyerState)}
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="md:col-span-2 space-y-6">
          {/* Fit Score Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ash dark:text-foreground">
                Fit Score (Identity-Based)
              </span>
              <span className="text-sm font-mono font-semibold text-electric">
                {fitScore} / 50
              </span>
            </div>
            <div className="h-3 bg-ash/10 dark:bg-card-bg rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(fitScore / 50) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-electric"
              />
            </div>
          </div>

          {/* Engagement Score Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ash dark:text-foreground">
                Engagement Score (Behavior-Based)
              </span>
              <span className="text-sm font-mono font-semibold text-copper">
                {engagementScore} / 50
              </span>
            </div>
            <div className="h-3 bg-ash/10 dark:bg-card-bg rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(engagementScore / 50) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-copper"
              />
            </div>
          </div>

          {/* Threshold Indicators */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ash/20 dark:border-ember/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-3 h-3 rounded-full ${
                    threshold.toMQL === 0
                      ? "bg-green-500"
                      : "bg-ash/20 dark:bg-card-bg"
                  }`}
                />
                <span className="text-sm text-ash/80 dark:text-foreground-muted">
                  MQL Threshold (60)
                </span>
              </div>
              {threshold.toMQL > 0 ? (
                <p className="text-xs text-ash/60 dark:text-foreground-muted ml-5">
                  {threshold.toMQL} points to reach
                </p>
              ) : (
                <p className="text-xs text-green-500 ml-5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Achieved
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-3 h-3 rounded-full ${
                    threshold.toSQL === 0
                      ? "bg-ember"
                      : "bg-ash/20 dark:bg-card-bg"
                  }`}
                />
                <span className="text-sm text-ash/80 dark:text-foreground-muted">
                  SQL Threshold (75)
                </span>
              </div>
              {threshold.toSQL > 0 ? (
                <p className="text-xs text-ash/60 dark:text-foreground-muted ml-5">
                  {threshold.toSQL} points to reach
                </p>
              ) : (
                <p className="text-xs text-ember ml-5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Sales Review Ready
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* System Insight */}
      {isSQL && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-6 border-t border-ember/20"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-ember flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-ember mb-1">
                Sales Review Triggered
              </p>
              <p className="text-sm text-ash/80 dark:text-foreground-muted">
                This lead has crossed the 75-point threshold and is now eligible
                for sales outreach. Human judgment determines next steps: direct
                outreach, meeting request, or continued nurture.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
