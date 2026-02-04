"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  buyerStates,
  type BuyerState,
  type BuyerStateConfig,
  getStateColor,
} from "@/lib/behavioral-scoring";
import { ArrowRight, Info } from "lucide-react";

interface BehaviorJourneyTimelineProps {
  currentState: BuyerState;
  totalScore: number;
}

export function BehaviorJourneyTimeline({
  currentState,
  totalScore,
}: BehaviorJourneyTimelineProps) {
  const [expandedState, setExpandedState] = useState<BuyerState | null>(null);
  const currentIndex = buyerStates.findIndex((s) => s.id === currentState);

  return (
    <div className="space-y-6">
      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-charcoal/10 dark:bg-ash/10">
            <motion.div
              className="h-full bg-gradient-to-r from-electric to-ember"
              initial={{ width: 0 }}
              animate={{
                width: `${(currentIndex / (buyerStates.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* States */}
          <div className="relative grid grid-cols-5 gap-4">
            {buyerStates.map((state, index) => {
              const isActive = index === currentIndex;
              const isComplete = index < currentIndex;
              const stateColor = getStateColor(state.id);

              return (
                <div key={state.id} className="relative">
                  <button
                    onClick={() =>
                      setExpandedState(
                        expandedState === state.id ? null : state.id
                      )
                    }
                    className="w-full group"
                  >
                    {/* Node */}
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                          isActive
                            ? `border-${stateColor} bg-${stateColor}/10 scale-110`
                            : isComplete
                            ? `border-${stateColor} bg-${stateColor}/5`
                            : "border-charcoal/20 dark:border-ash/20 bg-ash dark:bg-card-bg"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="score-indicator"
                            className={`text-sm font-mono font-bold text-${stateColor}`}
                          >
                            {totalScore}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-center">
                      <h4
                        className={`text-xs md:text-sm font-semibold mb-1 ${
                          isActive
                            ? "text-ember dark:text-ember"
                            : "text-charcoal/70 dark:text-ash/70"
                        }`}
                      >
                        {state.label}
                      </h4>
                      <p className="text-xs text-slate dark:text-foreground-muted">
                        {state.scoreRange}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <div className="flex justify-center mt-2">
                      <Info className="w-4 h-4 text-slate/40 group-hover:text-electric transition-colors" />
                    </div>
                  </button>

                  {/* Arrow between states */}
                  {index < buyerStates.length - 1 && (
                    <ArrowRight className="absolute top-6 -right-2 w-4 h-4 text-charcoal/20 dark:text-ash/20" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Timeline (Vertical) */}
      <div className="md:hidden space-y-4">
        {buyerStates.map((state, index) => {
          const isActive = index === currentIndex;
          const isComplete = index < currentIndex;
          const stateColor = getStateColor(state.id);

          return (
            <div key={state.id} className="relative">
              <button
                onClick={() =>
                  setExpandedState(expandedState === state.id ? null : state.id)
                }
                className="w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all bg-white dark:bg-card-bg"
                style={{
                  borderColor: isActive
                    ? "var(--ember-red)"
                    : "rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                    isActive
                      ? `border-${stateColor} bg-${stateColor}/10`
                      : isComplete
                      ? `border-${stateColor} bg-${stateColor}/5`
                      : "border-charcoal/20 dark:border-ash/20"
                  }`}
                >
                  {isActive && (
                    <span
                      className={`text-sm font-mono font-bold text-${stateColor}`}
                    >
                      {totalScore}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h4
                    className={`text-sm font-semibold mb-1 ${
                      isActive ? "text-ember" : "text-charcoal"
                    }`}
                  >
                    {state.label}
                  </h4>
                  <p className="text-xs text-slate">{state.scoreRange}</p>
                </div>
                <Info className="w-4 h-4 text-slate/40 flex-shrink-0 mt-1" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Expanded State Details */}
      <AnimatePresence>
        {expandedState && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {(() => {
              const state = buyerStates.find((s) => s.id === expandedState);
              if (!state) return null;

              return (
                <div className="bg-gradient-to-br from-charcoal/5 to-electric/5 dark:from-background-secondary dark:to-background-secondary border border-charcoal/10 dark:border-ember/20 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-charcoal dark:text-foreground mb-2">
                    {state.label}
                  </h4>
                  <p className="text-slate dark:text-foreground-muted mb-4">
                    {state.description}
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-charcoal dark:text-foreground mb-2">
                        Typical Behaviors
                      </h5>
                      <ul className="space-y-1">
                        {state.typicalBehaviors.map((behavior, i) => (
                          <li
                            key={i}
                            className="text-slate dark:text-foreground-muted"
                          >
                            • {behavior}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-charcoal dark:text-foreground mb-2">
                        System Response
                      </h5>
                      <p className="text-slate dark:text-foreground-muted">
                        {state.systemResponse}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-charcoal dark:text-foreground mb-2">
                        Next Step
                      </h5>
                      <p className="text-slate dark:text-foreground-muted">
                        {state.nextStep}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
