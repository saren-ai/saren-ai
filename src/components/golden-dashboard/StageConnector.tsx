"use client";

import { motion } from "framer-motion";

interface StageConnectorProps {
  rate: number;
  label: string;
  index: number;
  isVertical?: boolean;
}

export default function StageConnector({
  rate,
  label,
  index,
  isVertical = false,
}: StageConnectorProps) {
  // Color based on conversion rate health
  const getHealthColor = (rate: number) => {
    if (rate >= 20) return "bg-green-500";
    if (rate >= 10) return "bg-yellow-500";
    return "bg-ember";
  };

  const getHealthTextColor = (rate: number) => {
    if (rate >= 20) return "text-green-600";
    if (rate >= 10) return "text-yellow-600";
    return "text-ember";
  };

  if (isVertical) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        className="flex flex-col items-center py-2"
      >
        {/* Vertical Line */}
        <div className="w-0.5 h-4 bg-electric/30" />

        {/* Rate Badge */}
        <div
          className={`
            px-2 py-1 rounded-full text-xs font-mono font-semibold
            bg-electric/10 ${getHealthTextColor(rate)}
          `}
        >
          {rate.toFixed(1)}%
        </div>
        <div className="text-[10px] text-slate mt-0.5">{label}</div>

        {/* Arrow */}
        <div className="w-0.5 h-4 bg-electric/30" />
        <svg
          className="w-3 h-3 text-electric/50"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 16l-6-6h12l-6 6z" />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      className="flex flex-col items-center justify-center px-1 min-w-[60px]"
    >
      {/* Rate Badge */}
      <div
        className={`
          px-2 py-1 rounded-full text-xs font-mono font-semibold mb-1
          bg-electric/10 ${getHealthTextColor(rate)}
        `}
      >
        {rate.toFixed(1)}%
      </div>

      {/* Connector Line */}
      <div className="relative w-full h-0.5 bg-electric/30">
        {/* Health Indicator Dot */}
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${getHealthColor(
            rate
          )}`}
        />
        {/* Arrow */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-3 h-3 text-electric/50"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 4l8 8-8 8V4z" />
        </svg>
      </div>

      {/* Label */}
      <div className="text-[10px] text-slate mt-1 whitespace-nowrap">
        {label}
      </div>
    </motion.div>
  );
}
