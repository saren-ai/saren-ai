"use client";

import { motion } from "framer-motion";
import { ComputedModel, Assumptions, calculateDelta } from "@/lib/golden-dashboard";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface InsightNarrativeProps {
  currentModel: ComputedModel;
  baselineModel: ComputedModel;
  currentAssumptions: Assumptions;
  baselineAssumptions: Assumptions;
}

export default function InsightNarrative({
  currentModel,
  baselineModel,
  currentAssumptions,
  baselineAssumptions,
}: InsightNarrativeProps) {
  // Calculate deltas - Updated with new conversion stages
  const deltas = {
    spend: calculateDelta(currentAssumptions.spend, baselineAssumptions.spend),
    ctr: calculateDelta(currentAssumptions.ctr, baselineAssumptions.ctr),
    clickToLead: calculateDelta(
      currentAssumptions.clickToLead,
      baselineAssumptions.clickToLead
    ),
    leadToMql: calculateDelta(
      currentAssumptions.leadToMql,
      baselineAssumptions.leadToMql
    ),
    mqlToSql: calculateDelta(
      currentAssumptions.mqlToSql,
      baselineAssumptions.mqlToSql
    ),
    sqlToOpp: calculateDelta(
      currentAssumptions.sqlToOpp,
      baselineAssumptions.sqlToOpp
    ),
    oppToClose: calculateDelta(
      currentAssumptions.oppToClose,
      baselineAssumptions.oppToClose
    ),
    closedWon: calculateDelta(
      currentModel.stages.closed_won,
      baselineModel.stages.closed_won
    ),
  };

  // Find primary driver (largest absolute change)
  const driverCandidates = [
    { name: "CTR", value: Math.abs(deltas.ctr), label: "click-through rate", key: "ctr" as const },
    {
      name: "Click→Lead CVR",
      value: Math.abs(deltas.clickToLead),
      label: "landing page conversion",
      key: "clickToLead" as const,
    },
    {
      name: "Lead→MQL",
      value: Math.abs(deltas.leadToMql),
      label: "lead qualification rate",
      key: "leadToMql" as const,
    },
    {
      name: "MQL→SQL",
      value: Math.abs(deltas.mqlToSql),
      label: "sales acceptance rate",
      key: "mqlToSql" as const,
    },
    {
      name: "SQL→Opp",
      value: Math.abs(deltas.sqlToOpp),
      label: "pipeline creation rate",
      key: "sqlToOpp" as const,
    },
    {
      name: "Win Rate",
      value: Math.abs(deltas.oppToClose),
      label: "close rate",
      key: "oppToClose" as const,
    },
  ];

  const primaryDriver = driverCandidates.reduce((max, curr) =>
    curr.value > max.value ? curr : max
  );

  // Identify bottleneck (lowest conversion rate) - Updated with new stages
  const bottleneckCandidates = [
    { name: "CTR", rate: currentAssumptions.ctr, label: "ad creative" },
    {
      name: "Click→Lead",
      rate: currentAssumptions.clickToLead,
      label: "landing page",
    },
    {
      name: "Lead→MQL",
      rate: currentAssumptions.leadToMql,
      label: "lead qualification",
    },
    {
      name: "MQL→SQL",
      rate: currentAssumptions.mqlToSql,
      label: "sales acceptance",
    },
    {
      name: "SQL→Opp",
      rate: currentAssumptions.sqlToOpp,
      label: "pipeline creation",
    },
    {
      name: "Win Rate",
      rate: currentAssumptions.oppToClose,
      label: "sales close",
    },
  ];

  const bottleneck = bottleneckCandidates.reduce((min, curr) =>
    curr.rate < min.rate ? curr : min
  );

  const hasChanged = Math.abs(deltas.closedWon) > 0.1;

  if (!hasChanged) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-electric/10 to-copper/10 border border-electric/30 rounded-lg p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {deltas.closedWon > 0 ? (
            <TrendingUp className="w-6 h-6 text-electric" />
          ) : (
            <TrendingDown className="w-6 h-6 text-ember" />
          )}
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            What Changed?
          </h3>

          {/* Primary Impact */}
          <p className="text-foreground leading-relaxed">
            <strong className={deltas.closedWon > 0 ? "text-electric" : "text-ember"}>
              {deltas.closedWon > 0 ? "↑" : "↓"}{" "}
              {Math.abs(deltas.closedWon).toFixed(1)}% change in closed-won deals
            </strong>
            {primaryDriver.value > 1 && (
              <>
                {" "}driven primarily by your {primaryDriver.label} change.
              </>
            )}
          </p>

          {/* Causal Chain */}
          {primaryDriver.value > 1 && (
            <p className="text-sm text-foreground-muted leading-relaxed">
              When {primaryDriver.name}{" "}
              {deltas[primaryDriver.key] > 0 ? "increased" : "decreased"}
              , it created a ripple effect downstream through the entire funnel.
            </p>
          )}

          {/* Bottleneck Alert */}
          {bottleneck.rate < 0.15 && (
            <div className="flex items-start gap-2 mt-4 pt-4 border-t border-border">
              <AlertCircle className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong className="text-ember">Bottleneck Alert:</strong>{" "}
                Your {bottleneck.label} ({(bottleneck.rate * 100).toFixed(1)}%) is the
                tightest constraint in the funnel. Improving this stage will have
                the biggest impact on overall performance.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
