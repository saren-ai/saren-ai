"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layer } from "@/lib/marketing-framework";
import { ExternalLink, ChevronDown } from "lucide-react";

interface LayerExplorerProps {
  layers: Layer[];
}

export default function LayerExplorer({ layers }: LayerExplorerProps) {
  const [activeLayer, setActiveLayer] = useState<string | null>("l1");

  const toggleLayer = (layerId: string) => {
    setActiveLayer(activeLayer === layerId ? null : layerId);
  };

  return (
    <div className="space-y-6">
      {/* Desktop: Horizontal Pills */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-3 justify-center mb-8">
          {layers.map((layer, index) => (
            <div key={layer.id} className="flex items-center gap-3">
              <button
                onClick={() => toggleLayer(layer.id)}
                className={`
                  relative px-6 py-3 rounded-lg font-semibold transition-all duration-300
                  ${
                    activeLayer === layer.id
                      ? "bg-electric text-white shadow-lg scale-105"
                      : "bg-card-bg border-2 border-border text-foreground hover:border-electric"
                  }
                `}
              >
                <div className="text-sm">{layer.shortLabel}</div>
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-ember text-white text-[10px] font-bold rounded-full">
                    Start
                  </div>
                )}
              </button>
              {index < layers.length - 1 && (
                <svg
                  className="w-6 h-6 text-foreground-muted flex-shrink-0"
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
              )}
            </div>
          ))}
        </div>

        {/* Expanded Panel */}
        <AnimatePresence mode="wait">
          {activeLayer && (
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card-bg border border-border rounded-xl p-8"
            >
              {layers
                .filter((l) => l.id === activeLayer)
                .map((layer) => (
                  <LayerPanel key={layer.id} layer={layer} />
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile/Tablet: Vertical Accordion */}
      <div className="lg:hidden space-y-3">
        {layers.map((layer) => (
          <div key={layer.id} className="bg-card-bg border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleLayer(layer.id)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-charcoal/5 dark:hover:bg-ash/5 transition-colors"
            >
              <div>
                <div className="font-semibold text-foreground">{layer.label}</div>
                <div className="text-xs text-foreground-muted mt-1">{layer.prompts.length} prompts</div>
              </div>
              <motion.div
                animate={{ rotate: activeLayer === layer.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-foreground-muted" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeLayer === layer.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <LayerPanel layer={layer} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerPanel({ layer }: { layer: Layer }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-3">{layer.label}</h3>
        <p className="text-foreground-muted leading-relaxed">{layer.summary}</p>
      </div>

      {/* Best Used For */}
      <div>
        <h4 className="text-sm font-semibold text-ember uppercase tracking-wide mb-3">
          Best Used For
        </h4>
        <ul className="space-y-2">
          {layer.bestUsedFor.map((use, index) => (
            <li key={index} className="flex items-start gap-3 text-foreground">
              <span className="flex-shrink-0 w-5 h-5 bg-electric/10 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="flex-1">{use}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prompts */}
      <div>
        <h4 className="text-sm font-semibold text-ember uppercase tracking-wide mb-3">
          Prompts in This Layer
        </h4>
        <div className="space-y-2">
          {layer.prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="flex items-start gap-3 p-3 bg-charcoal/5 dark:bg-ash/5 rounded-lg"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-copper/20 text-copper rounded-lg flex items-center justify-center font-bold text-sm">
                {prompt.number}
              </span>
              <div className="flex-1">
                <div className="font-semibold text-foreground text-sm">{prompt.title}</div>
                <div className="text-xs text-foreground-muted mt-1">{prompt.purpose}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Link */}
      <div className="pt-4 border-t border-border">
        <a
          href={layer.folderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-electric/10 hover:bg-electric/20 text-electric rounded-lg transition-colors font-medium"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Open {layer.shortLabel} on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
