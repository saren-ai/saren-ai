"use client";

import { formatPercent } from "@/lib/golden-dashboard";
import { ChevronDown } from "lucide-react";

interface FunnelHandoffProps {
  rate: number;
  rateLabel: string;
  color?: "electric" | "copper";
  className?: string;
}

const colorConfig = {
  electric: {
    bg: "bg-electric/10",
    border: "border-electric/30",
    text: "text-electric",
    arrow: "text-electric/60",
  },
  copper: {
    bg: "bg-copper/10",
    border: "border-copper/30",
    text: "text-copper",
    arrow: "text-copper/60",
  },
} as const;

/**
 * FunnelHandoff - A clear visual indicator showing flow between funnel rows
 * 
 * Design rationale:
 * - Simple downward arrow shows direction unambiguously
 * - Conversion rate is the hero element (large, prominent)
 * - Subtle background creates visual "channel" between rows
 * - No complex SVG paths that look disconnected
 */
export function FunnelHandoff({ 
  rate, 
  rateLabel, 
  color = "electric",
  className = ""
}: FunnelHandoffProps) {
  const { bg, border, text, arrow } = colorConfig[color];
  
  return (
    <div className={`flex flex-col items-center py-4 ${className}`}>
      {/* Downward arrow */}
      <ChevronDown className={`w-5 h-5 ${arrow}`} />
      
      {/* Conversion rate badge - the main element */}
      <div className={`
        px-4 py-2 my-2 rounded-lg 
        ${bg} ${border} border
        flex flex-col items-center gap-0.5
      `}>
        <span className={`text-lg font-bold font-mono ${text}`}>
          {formatPercent(rate)}
        </span>
        <span className={`text-xs ${text} opacity-80`}>
          {rateLabel}
        </span>
      </div>
      
      {/* Downward arrow */}
      <ChevronDown className={`w-5 h-5 ${arrow}`} />
    </div>
  );
}

// Keep the old export name for backwards compatibility
export { FunnelHandoff as StaticSConnector };
