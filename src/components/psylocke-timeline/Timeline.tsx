"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { COMIC_ISSUES, ComicIssue } from "@/lib/psylocke-timeline";
import IssueNode from "./IssueNode";
import IssueDrawer from "./IssueDrawer";

export default function Timeline() {
  const [selectedIssue, setSelectedIssue] = useState<ComicIssue | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Reverse to show newest first (left) → oldest last (right)
  const displayIssues = useMemo(() => [...COMIC_ISSUES].reverse(), []);

  const handleIssueClick = useCallback((issue: ComicIssue) => {
    setSelectedIssue(issue);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIssue(null);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const len = displayIssues.length;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev < 0 ? 0 : Math.min(prev + 1, len - 1);
            return next;
          });
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev < 0 ? 0 : Math.max(prev - 1, 0);
            return next;
          });
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < len) {
            setSelectedIssue(displayIssues[focusedIndex]);
          }
          break;
        case "Escape":
          if (selectedIssue) {
            setSelectedIssue(null);
          }
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(len - 1);
          break;
      }
    },
    [displayIssues, focusedIndex, selectedIssue]
  );

  // Auto-scroll focused node into view
  useEffect(() => {
    if (focusedIndex < 0) return;
    const node = nodeRefs.current.get(focusedIndex);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [focusedIndex]);

  return (
    <div>
      {/* Scroll hint */}
      <p className="text-center text-sm text-foreground-muted mb-6">
        Scroll horizontally to explore the timeline.{" "}
        <span className="hidden md:inline">
          Use <kbd className="px-1.5 py-0.5 bg-charcoal/10 dark:bg-ash/10 rounded text-xs font-mono">←</kbd>{" "}
          <kbd className="px-1.5 py-0.5 bg-charcoal/10 dark:bg-ash/10 rounded text-xs font-mono">→</kbd> arrow
          keys to navigate.
        </span>
      </p>

      {/* Scrollable timeline container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto pb-4 outline-none"
        role="list"
        aria-label="Psylocke comic timeline — 27 issues from 2019 to 1989"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-4 md:gap-6 min-w-max px-8 py-4 relative">
          {/* Horizontal axis line */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-border pointer-events-none"
            style={{ bottom: "calc(1rem + 6px + 0.5rem + 10px)" }}
            aria-hidden="true"
          />

          {displayIssues.map((issue, index) => (
            <div
              key={issue.id}
              ref={(el) => {
                if (el) nodeRefs.current.set(index, el);
              }}
            >
              <IssueNode
                issue={issue}
                index={index}
                isActive={selectedIssue?.id === issue.id || focusedIndex === index}
                onClick={handleIssueClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Issue Drawer */}
      <IssueDrawer
        issue={selectedIssue}
        isOpen={selectedIssue !== null}
        onClose={handleClose}
      />
    </div>
  );
}
