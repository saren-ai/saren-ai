"use client";

import { motion } from "framer-motion";
import { formatCurrencyFull, formatCurrency } from "@/lib/calculator/funnel-calculations";
import { TrendingUp, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";

interface PerformanceDashboardProps {
  roi: number;
  blendedCAC: number;
  totalSpend: number;
  revenue: number;
  gap?: {
    revenueGap: number;
    budgetGap: number;
    percentageOff: number;
  };
  benchmarkCAC: { min: number; avg: number; max: number };
  direction: "forward" | "reverse";
}

export function PerformanceDashboard({
  roi,
  blendedCAC,
  totalSpend,
  revenue,
  gap,
  benchmarkCAC,
  direction,
}: PerformanceDashboardProps) {
  // ROI color coding
  const roiColor =
    roi > 3
      ? "text-emerald-600 dark:text-emerald-400"
      : roi > 2
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-ember";
  const roiBg =
    roi > 3
      ? "from-emerald-500/10 to-emerald-500/5 border-emerald-500/30"
      : roi > 2
        ? "from-yellow-500/10 to-yellow-500/5 border-yellow-500/30"
        : "from-ember/10 to-ember/5 border-ember/30";

  // CAC color coding
  const cacRatio = blendedCAC / (benchmarkCAC.avg || 1);
  const cacColor =
    cacRatio < 2
      ? "text-emerald-600 dark:text-emerald-400"
      : cacRatio < 3
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-ember";
  const cacBg =
    cacRatio < 2
      ? "from-emerald-500/10 to-emerald-500/5 border-emerald-500/30"
      : cacRatio < 3
        ? "from-yellow-500/10 to-yellow-500/5 border-yellow-500/30"
        : "from-ember/10 to-ember/5 border-ember/30";

  // Gap color coding
  const hasGap = gap && (gap.budgetGap > 0 || gap.revenueGap > 0);
  const gapSeverity =
    gap && Math.abs(gap.percentageOff) > 20
      ? "severe"
      : gap && Math.abs(gap.percentageOff) > 5
        ? "moderate"
        : "on-target";
  const gapBg =
    gapSeverity === "on-target"
      ? "from-emerald-500/10 to-emerald-500/5 border-emerald-500/30"
      : gapSeverity === "moderate"
        ? "from-yellow-500/10 to-yellow-500/5 border-yellow-500/30"
        : "from-ember/10 to-ember/5 border-ember/30";

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* ROI Multiple */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${roiBg} rounded-xl p-5 border`}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-slate dark:text-foreground-muted" />
          <span className="text-xs font-semibold text-charcoal/70 dark:text-foreground-muted uppercase tracking-wider">
            ROI Multiple
          </span>
        </div>
        <div className={`text-3xl font-bold ${roiColor} font-mono`}>
          {roi > 0 ? `${roi.toFixed(1)}x` : "—"}
        </div>
        <p className="text-xs text-slate dark:text-foreground-muted mt-2">
          {roi > 0
            ? `For every $1 spent, you generate $${roi.toFixed(2)} in revenue`
            : "Enter values to calculate"}
        </p>
      </motion.div>

      {/* Blended CAC */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`bg-gradient-to-br ${cacBg} rounded-xl p-5 border`}
      >
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-slate dark:text-foreground-muted" />
          <span className="text-xs font-semibold text-charcoal/70 dark:text-foreground-muted uppercase tracking-wider">
            Blended CAC
          </span>
        </div>
        <div className={`text-3xl font-bold ${cacColor} font-mono`}>
          {blendedCAC > 0 ? formatCurrency(blendedCAC) : "—"}
        </div>
        {blendedCAC > 0 && (
          <p className="text-xs text-slate dark:text-foreground-muted mt-2">
            Industry avg: {formatCurrencyFull(benchmarkCAC.avg)}
            {cacRatio > 2 && (
              <span className="text-ember ml-1 font-semibold">
                ({cacRatio.toFixed(1)}x above avg)
              </span>
            )}
          </p>
        )}
      </motion.div>

      {/* Investment Gap / Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`bg-gradient-to-br ${gapBg} rounded-xl p-5 border`}
      >
        <div className="flex items-center gap-2 mb-3">
          {gapSeverity === "on-target" ? (
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-slate dark:text-foreground-muted" />
          )}
          <span className="text-xs font-semibold text-charcoal/70 dark:text-foreground-muted uppercase tracking-wider">
            {gap ? (direction === "forward" ? "Revenue Gap" : "Investment Gap") : "Status"}
          </span>
        </div>
        {gap && hasGap ? (
          <>
            <div className="text-3xl font-bold text-ember font-mono">
              {direction === "forward"
                ? formatCurrency(Math.abs(gap.revenueGap))
                : formatCurrency(Math.abs(gap.budgetGap))}
            </div>
            <p className="text-xs text-slate dark:text-foreground-muted mt-2">
              {direction === "forward"
                ? `${Math.abs(gap.percentageOff).toFixed(0)}% short of your revenue goal`
                : `You need ${formatCurrency(totalSpend)} total to hit your goal`}
            </p>
          </>
        ) : (
          <>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              On Track
            </div>
            <p className="text-xs text-slate dark:text-foreground-muted mt-2">
              Your budget aligns with your revenue goal
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
