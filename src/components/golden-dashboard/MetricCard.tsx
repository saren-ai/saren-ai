"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Tooltip from "./Tooltip";
import {
  MetricMeta,
  formatNumber,
  formatCurrency,
  formatPercent,
  calculateDelta,
} from "@/lib/golden-dashboard";

interface MetricCardProps {
  id: string;
  name: string;
  volume: number | null;
  volumeLabel: string;
  cost: number | null;
  costLabel: string;
  rate?: number;
  rateLabel?: string;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
  tooltipMeta?: MetricMeta;
  delta?: number; // % change from baseline
  onClick?: () => void;
  showBenchmark?: boolean;
  benchmark?: { low: number; typical: number; high: number };
}

export default function MetricCard({
  id,
  name,
  volume,
  volumeLabel,
  cost,
  costLabel,
  rate,
  rateLabel,
  index,
  isFirst,
  isLast,
  tooltipMeta,
  delta,
  onClick,
  showBenchmark,
  benchmark,
}: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
    setShowTooltip(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      if (isTouched) {
        setShowTooltip(false);
        setIsTouched(false);
      }
    }, 3000);
  };

  // Format the volume display
  const volumeDisplay =
    id === "spend" ? formatCurrency(volume, 0) : formatNumber(volume);

  // Format the cost display
  const costDisplay =
    cost !== null && !isFirst ? formatCurrency(cost, 2) : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative"
      onMouseEnter={() => !isTouched && setShowTooltip(true)}
      onMouseLeave={() => !isTouched && setShowTooltip(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      <div
        className={`
          relative bg-card-bg border border-border rounded-lg p-4 md:p-5
          transition-all duration-300 cursor-pointer
          hover:border-border-hover hover:shadow-lg hover:shadow-electric/10
          ${isFirst ? "border-l-4 border-l-ember" : ""}
          ${isLast ? "border-r-4 border-r-copper" : ""}
        `}
      >
        {/* Stage Name */}
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isFirst ? "bg-ember" : isLast ? "bg-copper" : "bg-electric"
            }`}
          />
          {name}
        </h3>

        {/* Primary Metric */}
        <div className="mb-3">
          <div className="font-mono text-2xl md:text-3xl font-bold text-ember leading-none">
            {volumeDisplay}
          </div>
          <div className="text-xs text-foreground-muted uppercase tracking-wide mt-1">
            {volumeLabel}
          </div>

          {/* Delta Indicator */}
          {delta !== undefined && Math.abs(delta) > 0.1 && (
            <div
              className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-mono ${
                delta > 0
                  ? "bg-electric/10 text-electric"
                  : "bg-ember/10 text-ember"
              }`}
            >
              <span>{delta > 0 ? "↑" : "↓"}</span>
              <span>{Math.abs(delta).toFixed(1)}%</span>
            </div>
          )}
        </div>

        {/* Cost Metric */}
        <div className="flex items-baseline gap-2 text-sm border-t border-border pt-3">
          <span className="font-mono font-semibold text-foreground">
            {costDisplay}
          </span>
          <span className="text-foreground-muted text-xs">{costLabel}</span>
        </div>

        {/* Conversion Rate (if exists) */}
        {rate !== undefined && (
          <div className="flex items-baseline gap-2 text-sm mt-2">
            <span className="font-mono font-semibold text-electric">
              {formatPercent(rate)}
            </span>
            <span className="text-foreground-muted text-xs">{rateLabel}</span>
          </div>
        )}

        {/* Benchmark Indicator */}
        {showBenchmark && benchmark && rate !== undefined && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="relative h-1 bg-charcoal/10 dark:bg-ash/10 rounded-full">
              {/* Range bar */}
              <div
                className="absolute h-full bg-electric/30 rounded-full"
                style={{
                  left: `${benchmark.low * 100}%`,
                  width: `${(benchmark.high - benchmark.low) * 100}%`,
                }}
              />
              {/* Current value marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-ember rounded-full shadow-lg"
                style={{ left: `${Math.min(rate * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-foreground-muted mt-1">
              <span>Low</span>
              <span>Typical</span>
              <span>High</span>
            </div>
          </div>
        )}

        {/* Info Icon */}
        <div className="absolute top-3 right-3 text-foreground-muted/40 hover:text-electric transition-colors">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      {tooltipMeta && (
        <Tooltip
          title={tooltipMeta.label}
          description={tooltipMeta.definition}
          formula={tooltipMeta.formula}
          whyItMatters={tooltipMeta.whyItMatters}
          isVisible={showTooltip}
          position="bottom"
        />
      )}
    </motion.div>
  );
}
