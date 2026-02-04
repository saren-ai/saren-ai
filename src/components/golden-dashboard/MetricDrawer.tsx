"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MetricMeta } from "@/lib/golden-dashboard";
import { X } from "lucide-react";

interface MetricDrawerProps {
  metric: MetricMeta | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MetricDrawer({
  metric,
  isOpen,
  onClose,
}: MetricDrawerProps) {
  if (!metric) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-offblack/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-background shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {metric.label}
                  </h2>
                  <p className="text-foreground-muted text-sm">
                    Deep dive into this metric
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-charcoal/10 dark:hover:bg-ash/10 rounded-lg transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5 text-foreground-muted" />
                </button>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {/* Definition */}
                <section>
                  <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                    Definition
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {metric.definition}
                  </p>
                </section>

                {/* Formula */}
                <section>
                  <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                    Formula
                  </h3>
                  <div className="bg-offblack/5 dark:bg-ash/5 rounded-lg p-4 font-mono text-sm text-electric border border-border">
                    {metric.formula}
                  </div>
                </section>

                {/* Why It Matters */}
                <section>
                  <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                    Why It Matters
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {metric.whyItMatters}
                  </p>
                </section>

                {/* What Moves It */}
                <section>
                  <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                    What Moves It (Levers)
                  </h3>
                  <ul className="space-y-2">
                    {metric.levers.map((lever, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground"
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-electric/10 rounded-full flex items-center justify-center mt-0.5">
                          <svg
                            className="w-3 h-3 text-electric"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                        <span className="flex-1">{lever}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Common Failure Modes */}
                <section>
                  <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                    Common Failure Modes
                  </h3>
                  <ul className="space-y-2">
                    {metric.failureModes.map((mode, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground"
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-ember/10 rounded-full flex items-center justify-center mt-0.5">
                          <svg
                            className="w-3 h-3 text-ember"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </span>
                        <span className="flex-1">{mode}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Consulting Playbook */}
                <section className="bg-copper/5 dark:bg-copper/10 rounded-lg p-6 border border-copper/20">
                  <h3 className="text-sm font-semibold text-copper uppercase tracking-wider mb-3 flex items-center gap-2">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    What I Do (Consulting Playbook)
                  </h3>
                  <ul className="space-y-2">
                    {metric.playbook.map((action, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-foreground"
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-copper/20 rounded-full flex items-center justify-center mt-0.5">
                          <svg
                            className="w-3 h-3 text-copper"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="flex-1">{action}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Benchmarks */}
                {metric.bench && (
                  <section>
                    <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                      Industry Benchmarks
                    </h3>
                    <div className="bg-charcoal/5 dark:bg-ash/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center flex-1">
                          <div className="text-xs text-foreground-muted mb-1">
                            Low
                          </div>
                          <div className="font-mono text-lg font-bold text-foreground">
                            {typeof metric.bench.low === "number" &&
                            metric.bench.low < 1
                              ? `${(metric.bench.low * 100).toFixed(1)}%`
                              : `$${metric.bench.low}`}
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-xs text-foreground-muted mb-1">
                            Typical
                          </div>
                          <div className="font-mono text-lg font-bold text-electric">
                            {typeof metric.bench.typical === "number" &&
                            metric.bench.typical < 1
                              ? `${(metric.bench.typical * 100).toFixed(1)}%`
                              : `$${metric.bench.typical}`}
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-xs text-foreground-muted mb-1">
                            High
                          </div>
                          <div className="font-mono text-lg font-bold text-foreground">
                            {typeof metric.bench.high === "number" &&
                            metric.bench.high < 1
                              ? `${(metric.bench.high * 100).toFixed(1)}%`
                              : `$${metric.bench.high}`}
                          </div>
                        </div>
                      </div>

                      {metric.bench.citationUrl && (
                        <a
                          href={metric.bench.citationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-electric hover:text-copper transition-colors flex items-center gap-1"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          View Source
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-foreground-muted mt-3">
                      ⚠️ Benchmarks vary by ACV, audience, offer, sales motion,
                      and definitions. Use as directional guidance, not gospel.
                    </p>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
