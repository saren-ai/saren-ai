"use client";

import { RotateCcw, Check, BarChart3 } from "lucide-react";

interface TierListControlsProps {
  onReset: () => void;
  onVote: () => void;
  onSeeResults: () => void;
  hasVoted: boolean;
  isSubmitting: boolean;
  canVote: boolean;
}

export function TierListControls({
  onReset,
  onVote,
  onSeeResults,
  hasVoted,
  isSubmitting,
  canVote,
}: TierListControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      {/* Reset */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-ember/10 text-ember hover:bg-ember/20 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>

      {/* Vote */}
      <button
        onClick={onVote}
        disabled={hasVoted || !canVote || isSubmitting}
        className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
          hasVoted
            ? "bg-green-500/20 text-green-700 dark:text-green-400 cursor-default"
            : canVote
              ? "bg-electric text-white hover:bg-electric/90"
              : "bg-charcoal/10 text-foreground-muted cursor-not-allowed"
        }`}
      >
        {hasVoted ? (
          <>
            <Check className="w-4 h-4" />
            Voted
          </>
        ) : isSubmitting ? (
          "Saving..."
        ) : (
          "Vote"
        )}
      </button>

      {/* See Results */}
      <button
        onClick={onSeeResults}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-copper/10 text-copper hover:bg-copper/20 transition-colors"
      >
        <BarChart3 className="w-4 h-4" />
        See Results
      </button>
    </div>
  );
}
