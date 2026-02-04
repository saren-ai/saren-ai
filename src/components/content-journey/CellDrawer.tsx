"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MatrixRow } from "@/lib/content-journey";

interface CellDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rowLabel: string;
  stageLabel: string;
  content: string;
  row: MatrixRow;
  stageId: string;
}

export default function CellDrawer({
  isOpen,
  onClose,
  rowLabel,
  stageLabel,
  content,
  row,
  stageId,
}: CellDrawerProps) {
  const expandedContent = row.expandedContent?.[stageId];

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
                  <div className="text-xs text-electric font-semibold uppercase tracking-wider mb-2">
                    {stageLabel}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {rowLabel}
                  </h2>
                  {row.tooltip && (
                    <p className="text-foreground-muted text-sm mt-2">
                      {row.tooltip.body}
                    </p>
                  )}
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
                {/* Full Content */}
                <section>
                  <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                    What's Happening
                  </h3>
                  <div className="text-foreground leading-relaxed whitespace-pre-wrap bg-charcoal/5 dark:bg-ash/5 rounded-lg p-4 border border-border">
                    {content}
                  </div>
                </section>

                {/* Why It Matters */}
                {expandedContent?.why && (
                  <section>
                    <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                      Why This Matters at This Stage
                    </h3>
                    <ul className="space-y-2">
                      {expandedContent.why.map((item, index) => (
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
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* What to Instrument */}
                {expandedContent?.instruments && (
                  <section>
                    <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                      What We'd Instrument
                    </h3>
                    <ul className="space-y-2">
                      {expandedContent.instruments.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-foreground"
                        >
                          <span className="flex-shrink-0 w-5 h-5 bg-copper/10 rounded-full flex items-center justify-center mt-0.5">
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
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Typical Formats */}
                {expandedContent?.formats && (
                  <section>
                    <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                      Typical Content Formats
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {expandedContent.formats.map((format, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-electric/10 text-electric rounded-full text-sm"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* How to Use */}
                {row.tooltip?.howToUse && (
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
                      How to Use This
                    </h3>
                    <p className="text-foreground">{row.tooltip.howToUse}</p>
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
