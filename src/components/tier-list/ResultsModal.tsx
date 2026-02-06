"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  type TierResults,
  type TierId,
  TIER_CONFIG,
  getToolById,
  scoreToTier,
} from "@/lib/tier-list";

interface ResultsModalProps {
  results: TierResults | null;
  isOpen: boolean;
  onClose: () => void;
}

const tierColorMap: Record<TierId, string> = {
  S: "#FF7F7F",
  A: "#FFBF7F",
  B: "#FFDF7F",
  C: "#FFFF7F",
  D: "#BFFF7F",
};

export function ResultsModal({ results, isOpen, onClose }: ResultsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && results && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[80vh] bg-white dark:bg-card-bg rounded-xl shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-card-bg border-b border-charcoal/10 dark:border-ember/20 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-charcoal dark:text-foreground">
                  Community Rankings
                </h3>
                <p className="text-xs text-foreground-muted">
                  {results.totalVotes} vote{results.totalVotes !== 1 ? "s" : ""}{" "}
                  recorded
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-charcoal/5 dark:hover:bg-ember/10 transition-colors"
              >
                <X className="w-5 h-5 text-foreground-muted" />
              </button>
            </div>

            {/* Results */}
            <div className="px-6 py-4 space-y-4">
              {results.totalVotes === 0 ? (
                <p className="text-sm text-foreground-muted text-center py-8">
                  No votes yet. Be the first to rank!
                </p>
              ) : (
                results.tools.map((toolResult, index) => {
                  const tool = getToolById(toolResult.toolId);
                  if (!tool) return null;
                  const avgTier = scoreToTier(toolResult.averageScore);
                  const totalPlacements = Object.values(
                    toolResult.distribution
                  ).reduce((a, b) => a + b, 0);

                  return (
                    <div
                      key={toolResult.toolId}
                      className="flex items-center gap-3"
                    >
                      {/* Rank */}
                      <span className="text-xs font-mono text-foreground-muted w-5 text-right shrink-0">
                        {index + 1}
                      </span>

                      {/* Tier Badge */}
                      <span
                        className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor: tierColorMap[avgTier],
                          color: "#000",
                        }}
                      >
                        {avgTier}
                      </span>

                      {/* Tool Name + Distribution */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-charcoal dark:text-foreground truncate">
                          {tool.name}
                        </div>

                        {/* Distribution Bar */}
                        {totalPlacements > 0 && (
                          <div className="flex h-2 rounded-full overflow-hidden mt-1">
                            {TIER_CONFIG.map((tier) => {
                              const count =
                                toolResult.distribution[tier.id] || 0;
                              const pct = (count / totalPlacements) * 100;
                              if (pct === 0) return null;
                              return (
                                <div
                                  key={tier.id}
                                  style={{
                                    width: `${pct}%`,
                                    backgroundColor: tier.color,
                                  }}
                                  title={`${tier.id}: ${count} vote${count !== 1 ? "s" : ""}`}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Score */}
                      <span className="text-xs font-mono text-foreground-muted shrink-0">
                        {toolResult.averageScore.toFixed(1)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Legend */}
            {results.totalVotes > 0 && (
              <div className="px-6 py-3 border-t border-charcoal/10 dark:border-ember/20">
                <div className="flex flex-wrap gap-3 justify-center">
                  {TIER_CONFIG.map((tier) => (
                    <div key={tier.id} className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: tier.color }}
                      />
                      <span className="text-[10px] text-foreground-muted font-mono">
                        {tier.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
