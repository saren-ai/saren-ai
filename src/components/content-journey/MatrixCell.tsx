"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatrixCellProps {
  content: string;
  rowId: string;
  stageId: string;
  rowLabel: string;
  stageLabel: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export default function MatrixCell({
  content,
  rowId,
  stageId,
  rowLabel,
  stageLabel,
  onClick,
  isHighlighted = false,
}: MatrixCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Truncate content for display (show first 2-3 lines)
  const lines = content.split("\n");
  const preview = lines.slice(0, 2).join("\n");
  const hasMore = lines.length > 2;

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={onClick}
        className={`
          w-full h-full min-h-[100px] p-3 text-left text-sm
          border border-border rounded-lg
          transition-all duration-200
          hover:border-electric hover:shadow-lg hover:shadow-electric/10
          focus:outline-none focus:ring-2 focus:ring-electric
          ${isHighlighted ? "bg-electric/5 border-electric/50" : "bg-card-bg"}
        `}
      >
        <div className="text-foreground whitespace-pre-wrap leading-relaxed">
          {preview}
          {hasMore && (
            <span className="text-foreground-muted"> …</span>
          )}
        </div>

        {/* "Click for more" hint */}
        {hasMore && (
          <div className="absolute bottom-2 right-2 text-[10px] text-foreground-muted/50">
            click
          </div>
        )}
      </button>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full mt-2 left-0 w-80 max-w-[90vw] p-4 
                       bg-offblack border border-electric/30 rounded-lg shadow-xl pointer-events-none"
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-4 w-4 h-4 bg-offblack border-l border-t border-electric/30 rotate-45" />

            <div className="space-y-2">
              <div className="text-xs text-electric font-semibold uppercase tracking-wide">
                {stageLabel}
              </div>
              <h4 className="text-ash font-semibold text-sm">{rowLabel}</h4>
              <div className="text-ash/80 text-xs leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {content}
              </div>
              <div className="text-[10px] text-ash/40 pt-2 border-t border-electric/20">
                💡 Click for expanded insights
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
