"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Assumptions, presets, formatPercent } from "@/lib/golden-dashboard";
import { Settings, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

interface FunnelControlsProps {
  assumptions: Assumptions;
  onUpdate: (assumptions: Assumptions) => void;
  onReset: () => void;
}

export default function FunnelControls({
  assumptions,
  onUpdate,
  onReset,
}: FunnelControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (field: keyof Assumptions, value: number) => {
    onUpdate({ ...assumptions, [field]: value });
  };

  const loadPreset = (presetKey: keyof typeof presets) => {
    onUpdate(presets[presetKey].assumptions);
  };

  return (
    <div className="space-y-4">
      {/* Header & Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-electric/10 hover:bg-electric/20 text-electric rounded-lg transition-colors font-medium"
        >
          <Settings className="w-4 h-4" />
          <span>Calculator Mode</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-ember/10 hover:bg-ember/20 text-ember rounded-lg transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-card-bg border border-border rounded-lg p-6 space-y-6">
              {/* Presets */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Load Preset Scenario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(presets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() =>
                        loadPreset(key as keyof typeof presets)
                      }
                      className="p-3 bg-charcoal/5 dark:bg-ash/5 hover:bg-electric/10 border border-border hover:border-electric rounded-lg transition-all text-left group"
                    >
                      <div className="font-semibold text-foreground group-hover:text-electric transition-colors text-sm">
                        {preset.name}
                      </div>
                      <div className="text-xs text-foreground-muted mt-1">
                        {preset.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                  Edit Assumptions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Spend */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Total Ad Spend ($)
                    </label>
                    <input
                      type="number"
                      value={assumptions.spend}
                      onChange={(e) =>
                        handleChange("spend", parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric text-foreground"
                      min="0"
                      step="1000"
                    />
                  </div>

                  {/* CPM */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CPM ($)
                    </label>
                    <input
                      type="number"
                      value={assumptions.cpm}
                      onChange={(e) =>
                        handleChange("cpm", parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric text-foreground"
                      min="0"
                      step="1"
                    />
                  </div>

                  {/* CTR */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Click-Through Rate (CTR)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        value={assumptions.ctr * 100}
                        onChange={(e) =>
                          handleChange("ctr", parseFloat(e.target.value) / 100)
                        }
                        className="flex-1"
                        min="0"
                        max="10"
                        step="0.1"
                      />
                      <span className="font-mono text-sm text-foreground w-16 text-right">
                        {formatPercent(assumptions.ctr)}
                      </span>
                    </div>
                  </div>

                  {/* Click to Lead */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Click-to-Lead CVR
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        value={assumptions.clickToLead * 100}
                        onChange={(e) =>
                          handleChange(
                            "clickToLead",
                            parseFloat(e.target.value) / 100
                          )
                        }
                        className="flex-1"
                        min="0"
                        max="20"
                        step="0.1"
                      />
                      <span className="font-mono text-sm text-foreground w-16 text-right">
                        {formatPercent(assumptions.clickToLead)}
                      </span>
                    </div>
                  </div>

                  {/* Lead to MQL */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Lead-to-MQL Rate
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        value={assumptions.leadToMql * 100}
                        onChange={(e) =>
                          handleChange(
                            "leadToMql",
                            parseFloat(e.target.value) / 100
                          )
                        }
                        className="flex-1"
                        min="0"
                        max="100"
                        step="1"
                      />
                      <span className="font-mono text-sm text-foreground w-16 text-right">
                        {formatPercent(assumptions.leadToMql)}
                      </span>
                    </div>
                  </div>

                  {/* MQL to SQL - NEW */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      MQL-to-SQL Rate
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        value={assumptions.mqlToSql * 100}
                        onChange={(e) =>
                          handleChange(
                            "mqlToSql",
                            parseFloat(e.target.value) / 100
                          )
                        }
                        className="flex-1"
                        min="10"
                        max="60"
                        step="1"
                      />
                      <span className="font-mono text-sm text-foreground w-16 text-right">
                        {formatPercent(assumptions.mqlToSql)}
                      </span>
                    </div>
                  </div>

                  {/* SQL to Opp - NEW */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      SQL-to-Opportunity Rate
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        value={assumptions.sqlToOpp * 100}
                        onChange={(e) =>
                          handleChange(
                            "sqlToOpp",
                            parseFloat(e.target.value) / 100
                          )
                        }
                        className="flex-1"
                        min="20"
                        max="70"
                        step="1"
                      />
                      <span className="font-mono text-sm text-foreground w-16 text-right">
                        {formatPercent(assumptions.sqlToOpp)}
                      </span>
                    </div>
                  </div>

                  {/* Opp to Close - RENAMED from meetingToClose */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Opportunity-to-Close Rate (Win Rate)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        value={assumptions.oppToClose * 100}
                        onChange={(e) =>
                          handleChange(
                            "oppToClose",
                            parseFloat(e.target.value) / 100
                          )
                        }
                        className="flex-1"
                        min="10"
                        max="60"
                        step="1"
                      />
                      <span className="font-mono text-sm text-foreground w-16 text-right">
                        {formatPercent(assumptions.oppToClose)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
