"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MatrixCell from "./MatrixCell";
import CellDrawer from "./CellDrawer";
import { MatrixData, MatrixRow } from "@/lib/content-journey";
import { ChevronRight } from "lucide-react";

interface JourneyMatrixProps {
  data: MatrixData;
}

export default function JourneyMatrix({ data }: JourneyMatrixProps) {
  const [selectedCell, setSelectedCell] = useState<{
    row: MatrixRow;
    stageId: string;
    stageLabel: string;
  } | null>(null);
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  const [highlightedStage, setHighlightedStage] = useState<string | null>(null);

  // Quick navigation to specific stages
  const jumpToStage = (stageId: string) => {
    const element = document.getElementById(`stage-${stageId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setHighlightedStage(stageId);
    setTimeout(() => setHighlightedStage(null), 2000);
  };

  // Quick navigation to specific rows
  const highlightRowById = (rowId: string) => {
    setHighlightedRow(rowId);
    const element = document.getElementById(`row-${rowId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setHighlightedRow(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Helpers */}
      <div className="space-y-4">
        {/* Jump to Stage */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
            Jump to Stage
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "problem_identification", label: "Problem" },
              { id: "internal_consensus", label: "Consensus" },
              { id: "shortlist_comparison", label: "Comparison" },
              { id: "sales_meetings", label: "Sales" },
              { id: "renewal", label: "Renewal" },
            ].map((stage) => (
              <button
                key={stage.id}
                onClick={() => jumpToStage(stage.id)}
                className="px-3 py-1.5 bg-electric/10 hover:bg-electric/20 text-electric rounded-lg text-sm transition-colors"
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Row */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
            Highlight Row
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "user_tasks", label: "Tasks" },
              { id: "goal", label: "Goals" },
              { id: "metric", label: "KPIs" },
              { id: "content_scoring", label: "Scoring" },
              { id: "user_feelings", label: "Emotions" },
            ].map((row) => (
              <button
                key={row.id}
                onClick={() => highlightRowById(row.id)}
                className="px-3 py-1.5 bg-copper/10 hover:bg-copper/20 text-copper rounded-lg text-sm transition-colors"
              >
                {row.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Matrix Container */}
      <div className="overflow-x-auto border border-border rounded-lg">
        <div className="min-w-max">
          {/* AIDA Header Row */}
          <div className="flex sticky top-0 z-20 bg-background border-b-2 border-electric/30">
            {/* Empty corner */}
            <div className="w-48 flex-shrink-0 p-3 border-r border-border bg-background">
              <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                Journey Layer
              </div>
            </div>

            {/* AIDA stages */}
            {data.stages.map((stage) => (
              <div
                key={stage.id}
                id={`stage-${stage.id}`}
                className={`
                  w-64 flex-shrink-0 p-3 border-r border-border
                  ${highlightedStage === stage.id ? "bg-electric/10" : ""}
                `}
              >
                <div className="text-xs text-electric font-semibold uppercase tracking-wide mb-1">
                  {stage.aida}
                </div>
                <div className="text-sm font-semibold text-foreground">{stage.label}</div>
                <div className="text-xs text-foreground-muted mt-1">{stage.duration}</div>
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {data.rows.map((row, rowIndex) => (
            <div
              key={row.id}
              id={`row-${row.id}`}
              className={`
                flex border-b border-border
                ${highlightedRow === row.id ? "bg-copper/5" : ""}
              `}
            >
              {/* Row Header (Sticky Left) */}
              <div className="w-48 flex-shrink-0 p-3 border-r border-border bg-background sticky left-0 z-10">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {row.label}
                    </div>
                    {row.tooltip && (
                      <div className="text-xs text-foreground-muted leading-tight">
                        {row.tooltip.title}
                      </div>
                    )}
                  </div>
                  {row.tooltip && (
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-electric/10 flex items-center justify-center">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Cell Data */}
              {data.stages.map((stage) => (
                <div
                  key={`${row.id}-${stage.id}`}
                  className={`
                    w-64 flex-shrink-0 p-2 border-r border-border
                    ${highlightedStage === stage.id ? "bg-electric/5" : ""}
                  `}
                >
                  <MatrixCell
                    content={row.cells[stage.id] || "—"}
                    rowId={row.id}
                    stageId={stage.id}
                    rowLabel={row.label}
                    stageLabel={stage.label}
                    onClick={() =>
                      setSelectedCell({
                        row,
                        stageId: stage.id,
                        stageLabel: stage.label,
                      })
                    }
                    isHighlighted={
                      highlightedRow === row.id || highlightedStage === stage.id
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="text-center text-sm text-foreground-muted">
        💡 <strong>Hover</strong> for quick view • <strong>Click</strong> for detailed insights • Use navigation buttons to jump around
      </div>

      {/* Cell Drawer */}
      {selectedCell && (
        <CellDrawer
          isOpen={true}
          onClose={() => setSelectedCell(null)}
          rowLabel={selectedCell.row.label}
          stageLabel={selectedCell.stageLabel}
          content={selectedCell.row.cells[selectedCell.stageId] || "—"}
          row={selectedCell.row}
          stageId={selectedCell.stageId}
        />
      )}
    </div>
  );
}
