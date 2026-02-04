"use client";

import { motion } from "framer-motion";
import type { FunnelResult, ConversionRates, ViewMode } from "@/lib/calculator/types";
import { formatNumber, formatPercent } from "@/lib/calculator/funnel-calculations";
import { ArrowRight } from "lucide-react";

interface FunnelDisplayProps {
  funnel: FunnelResult;
  rates: ConversionRates;
  viewMode: ViewMode;
}

interface Stage {
  id: string;
  name: string;
  value: number;
  color: string;
  borderColor: string;
}

export function FunnelDisplay({ funnel, rates, viewMode }: FunnelDisplayProps) {
  const isMonthly = viewMode === "monthly";

  const stages: Stage[] = [
    {
      id: "webVisitors",
      name: "Web Visitors",
      value: isMonthly ? funnel.monthlyVisitors : funnel.webVisitors,
      color: "bg-ember/10 dark:bg-ember/20",
      borderColor: "border-ember",
    },
    {
      id: "leads",
      name: "Leads",
      value: isMonthly ? funnel.monthlyLeads : funnel.leads,
      color: "bg-orange-500/10 dark:bg-orange-500/20",
      borderColor: "border-orange-500",
    },
    {
      id: "mqls",
      name: "MQLs",
      value: isMonthly ? funnel.monthlyMQLs : funnel.mqls,
      color: "bg-yellow-500/10 dark:bg-yellow-500/20",
      borderColor: "border-yellow-500",
    },
    {
      id: "sqos",
      name: "SQOs/SQLs",
      value: isMonthly ? funnel.monthlySQOs : funnel.sqos,
      color: "bg-lime-500/10 dark:bg-lime-500/20",
      borderColor: "border-lime-500",
    },
    {
      id: "opportunities",
      name: "Opportunities",
      value: isMonthly ? funnel.monthlyOpportunities : funnel.opportunities,
      color: "bg-emerald-500/10 dark:bg-emerald-500/20",
      borderColor: "border-emerald-500",
    },
    {
      id: "closedWon",
      name: "Closed/Won",
      value: isMonthly ? funnel.monthlyClosedWon : funnel.closedWon,
      color: "bg-green-600/10 dark:bg-green-600/20",
      borderColor: "border-green-600",
    },
  ];

  const conversionRates = [
    { label: formatPercent(rates.visitorToLead), from: 0, to: 1 },
    { label: formatPercent(rates.leadToMQL), from: 1, to: 2 },
    { label: formatPercent(rates.mqlToSQL), from: 2, to: 3 },
    { label: formatPercent(rates.sqlToOpportunity), from: 3, to: 4 },
    { label: formatPercent(rates.opportunityToClose), from: 4, to: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Desktop Horizontal View */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between gap-2">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1">
              {/* Stage Box */}
              <motion.div
                layout
                className={`funnel-stage ${stage.color} ${stage.borderColor} flex-1 min-w-0`}
              >
                <div className="text-xs font-semibold text-charcoal/70 dark:text-foreground-muted mb-1 uppercase tracking-wide">
                  {stage.name}
                </div>
                <motion.div
                  key={stage.value}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="funnel-value text-charcoal dark:text-foreground"
                >
                  {formatNumber(stage.value)}
                </motion.div>
              </motion.div>

              {/* Arrow with Conversion Rate */}
              {index < stages.length - 1 && (
                <div className="flex flex-col items-center px-2">
                  <ArrowRight className="w-6 h-6 text-electric mb-1" />
                  <span className="text-xs font-mono font-semibold text-electric bg-electric/10 dark:bg-electric/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {conversionRates[index].label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="lg:hidden space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="space-y-2">
            {/* Stage Box */}
            <motion.div
              layout
              className={`funnel-stage ${stage.color} ${stage.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-charcoal/70 dark:text-foreground-muted mb-1 uppercase tracking-wide">
                    {stage.name}
                  </div>
                  <motion.div
                    key={stage.value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-charcoal dark:text-foreground tabular-nums"
                  >
                    {formatNumber(stage.value)}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Arrow with Conversion Rate */}
            {index < stages.length - 1 && (
              <div className="flex items-center gap-2 pl-4">
                <div className="w-0.5 h-6 bg-electric/30" />
                <span className="text-xs font-mono font-semibold text-electric bg-electric/10 dark:bg-electric/20 px-2 py-1 rounded">
                  {conversionRates[index].label} conversion
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
