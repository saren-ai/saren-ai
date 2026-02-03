"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Tooltip from "./Tooltip";

export interface MetricData {
  id: string;
  name: string;
  volume: string;
  volumeLabel: string;
  cost: string;
  costLabel: string;
  rate?: string;
  rateLabel?: string;
  tooltip: {
    title: string;
    description: string;
  };
}

interface MetricCardProps {
  data: MetricData;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function MetricCard({
  data,
  index,
  isFirst,
  isLast,
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
    >
      <div
        className={`
          relative bg-ash border border-charcoal/10 rounded-lg p-4 md:p-5
          transition-all duration-300 cursor-pointer
          hover:border-electric hover:shadow-lg hover:shadow-electric/10
          ${isFirst ? "border-l-4 border-l-ember" : ""}
          ${isLast ? "border-r-4 border-r-copper" : ""}
        `}
      >
        {/* Stage Name */}
        <h3 className="text-sm font-semibold text-charcoal mb-3 flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isFirst ? "bg-ember" : isLast ? "bg-copper" : "bg-electric"
            }`}
          />
          {data.name}
        </h3>

        {/* Primary Metric */}
        <div className="mb-3">
          <div className="font-mono text-2xl md:text-3xl font-bold text-ember leading-none">
            {data.volume}
          </div>
          <div className="text-xs text-slate uppercase tracking-wide mt-1">
            {data.volumeLabel}
          </div>
        </div>

        {/* Cost Metric */}
        <div className="flex items-baseline gap-2 text-sm border-t border-charcoal/10 pt-3">
          <span className="font-mono font-semibold text-charcoal">
            {data.cost}
          </span>
          <span className="text-slate text-xs">{data.costLabel}</span>
        </div>

        {/* Conversion Rate (if exists) */}
        {data.rate && (
          <div className="flex items-baseline gap-2 text-sm mt-2">
            <span className="font-mono font-semibold text-electric">
              {data.rate}
            </span>
            <span className="text-slate text-xs">{data.rateLabel}</span>
          </div>
        )}

        {/* Info Icon */}
        <div className="absolute top-3 right-3 text-slate/40 hover:text-electric transition-colors">
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
      <Tooltip
        title={data.tooltip.title}
        description={data.tooltip.description}
        isVisible={showTooltip}
        position="bottom"
      />
    </motion.div>
  );
}
