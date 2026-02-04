"use client";

import { engagementActions, type EngagementAction } from "@/lib/behavioral-scoring";
import { MousePointerClick, Zap, TrendingUp } from "lucide-react";

interface EngagementSimulatorProps {
  onActionTrigger: (actionId: string) => void;
  actionCounts: { [key: string]: number };
}

export function EngagementSimulator({
  onActionTrigger,
  actionCounts,
}: EngagementSimulatorProps) {
  const getCategoryIcon = (category: EngagementAction["category"]) => {
    switch (category) {
      case "low":
        return <MousePointerClick className="w-4 h-4" />;
      case "medium":
        return <Zap className="w-4 h-4" />;
      case "high":
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: EngagementAction["category"]) => {
    switch (category) {
      case "low":
        return "border-slate/20 hover:border-slate/40";
      case "medium":
        return "border-electric/20 hover:border-electric/40";
      case "high":
        return "border-ember/20 hover:border-ember/40";
    }
  };

  const getCategoryBadgeColor = (category: EngagementAction["category"]) => {
    switch (category) {
      case "low":
        return "bg-slate/10 text-slate";
      case "medium":
        return "bg-electric/10 text-electric";
      case "high":
        return "bg-ember/10 text-ember";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-charcoal dark:text-foreground mb-2">
          Engagement Signal Simulator
        </h3>
        <p className="text-slate dark:text-foreground-muted">
          Click actions below to simulate buyer engagement and watch the score
          change in real time
        </p>
      </div>

      {/* Action Categories */}
      <div className="space-y-4">
        {/* Low Intent */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MousePointerClick className="w-4 h-4 text-slate" />
            <h4 className="text-sm font-semibold text-slate dark:text-foreground-muted uppercase tracking-wide">
              Low Intent Signals
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {engagementActions
              .filter((a) => a.category === "low")
              .map((action) => (
                <ActionButton
                  key={action.id}
                  action={action}
                  count={actionCounts[action.id] || 0}
                  onTrigger={() => onActionTrigger(action.id)}
                  categoryColor={getCategoryColor(action.category)}
                  badgeColor={getCategoryBadgeColor(action.category)}
                />
              ))}
          </div>
        </div>

        {/* Medium Intent */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-electric" />
            <h4 className="text-sm font-semibold text-electric uppercase tracking-wide">
              Medium Intent Signals
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {engagementActions
              .filter((a) => a.category === "medium")
              .map((action) => (
                <ActionButton
                  key={action.id}
                  action={action}
                  count={actionCounts[action.id] || 0}
                  onTrigger={() => onActionTrigger(action.id)}
                  categoryColor={getCategoryColor(action.category)}
                  badgeColor={getCategoryBadgeColor(action.category)}
                />
              ))}
          </div>
        </div>

        {/* High Intent */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-ember" />
            <h4 className="text-sm font-semibold text-ember uppercase tracking-wide">
              High Intent Signals
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {engagementActions
              .filter((a) => a.category === "high")
              .map((action) => (
                <ActionButton
                  key={action.id}
                  action={action}
                  count={actionCounts[action.id] || 0}
                  onTrigger={() => onActionTrigger(action.id)}
                  categoryColor={getCategoryColor(action.category)}
                  badgeColor={getCategoryBadgeColor(action.category)}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-charcoal/5 dark:bg-background-secondary rounded-lg p-4 text-sm">
        <p className="text-slate dark:text-foreground-muted">
          <strong className="text-charcoal dark:text-foreground">
            Remember:
          </strong>{" "}
          No single action "flips" the system. Scoring is cumulative and reveals
          patterns over time. Sales review begins at <strong>75+ points</strong>.
        </p>
      </div>
    </div>
  );
}

function ActionButton({
  action,
  count,
  onTrigger,
  categoryColor,
  badgeColor,
}: {
  action: EngagementAction;
  count: number;
  onTrigger: () => void;
  categoryColor: string;
  badgeColor: string;
}) {
  const isDisabled = !action.repeatable && count > 0;

  return (
    <button
      onClick={onTrigger}
      disabled={isDisabled}
      className={`relative group p-4 rounded-lg border-2 transition-all text-left ${
        isDisabled
          ? "opacity-40 cursor-not-allowed bg-ash/50 dark:bg-card-bg/50"
          : `bg-white dark:bg-card-bg ${categoryColor} hover:shadow-md`
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h5 className="text-sm font-semibold text-charcoal dark:text-foreground">
          {action.label}
        </h5>
        {count > 0 && (
          <span className="flex-shrink-0 ml-2 px-2 py-0.5 bg-charcoal/10 dark:bg-ash/10 rounded-full text-xs font-mono text-charcoal dark:text-foreground">
            {count}×
          </span>
        )}
      </div>
      <p className="text-xs text-slate dark:text-foreground-muted mb-3">
        {action.description}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${badgeColor}`}
        >
          +{action.points} pts
        </span>
        {!action.repeatable && count === 0 && (
          <span className="text-[10px] text-slate/60 dark:text-foreground-muted/60">
            One-time only
          </span>
        )}
        {isDisabled && (
          <span className="text-[10px] text-slate/60 dark:text-foreground-muted/60">
            Already counted
          </span>
        )}
      </div>
    </button>
  );
}
