"use client";

import { useState } from "react";
import { Grid3x3, Film } from "lucide-react";
import { frames } from "@/lib/storyboard";
import SequenceView from "./SequenceView";
import GridView from "./GridView";

export default function StoryboardViewer() {
  const [viewMode, setViewMode] = useState<"sequence" | "grid">("sequence");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFrameClick = (index: number) => {
    setActiveIndex(index);
    setViewMode("sequence");
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <span className="inline-block px-4 py-1 bg-ember/10 text-ember text-sm font-semibold rounded-full">
            Interactive Storyboard
          </span>
        </div>
        <div className="flex items-center gap-2 bg-card-bg dark:bg-background-secondary border border-border rounded-lg p-1">
          <button
            onClick={() => setViewMode("sequence")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              viewMode === "sequence"
                ? "bg-ember text-white"
                : "text-foreground-muted hover:text-foreground"
            }`}
            aria-label="Sequence view"
            aria-pressed={viewMode === "sequence"}
          >
            <Film className="w-4 h-4" />
            <span className="hidden sm:inline">Sequence</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              viewMode === "grid"
                ? "bg-ember text-white"
                : "text-foreground-muted hover:text-foreground"
            }`}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <Grid3x3 className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[500px]">
        {viewMode === "sequence" ? (
          <SequenceView
            frames={frames}
            activeIndex={activeIndex}
            onIndexChange={setActiveIndex}
          />
        ) : (
          <GridView frames={frames} onFrameClick={handleFrameClick} />
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-foreground-muted">
        {viewMode === "sequence" ? (
          <p>
            Use <kbd className="px-2 py-1 bg-border rounded text-xs font-mono">←</kbd> and{" "}
            <kbd className="px-2 py-1 bg-border rounded text-xs font-mono">→</kbd> keys to navigate • Click thumbnails to jump
          </p>
        ) : (
          <p>Click any frame to view it in sequence mode</p>
        )}
      </div>
    </div>
  );
}
