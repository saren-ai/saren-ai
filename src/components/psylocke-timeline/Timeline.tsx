"use client";

import { useState, useCallback, useMemo } from "react";
import { COMIC_ISSUES, ComicIssue } from "@/lib/psylocke-timeline";
import CircularIssueNode from "./CircularIssueNode";
import IssueDrawer from "./IssueDrawer";
import CircularGallery from "./CircularGallery";


export default function Timeline() {
  const [selectedIssue, setSelectedIssue] = useState<ComicIssue | null>(null);

  // Reverse to show newest first (left in list, but in circular gallery it depends on rotation)
  // Let's keep newest first logic
  const displayIssues = useMemo(() => [...COMIC_ISSUES], []);

  const handleIssueClick = useCallback((issue: ComicIssue) => {
    setSelectedIssue(issue);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIssue(null);
  }, []);

  return (
    <div className="relative min-h-[600px] w-full">

      <CircularGallery
        items={displayIssues}
        getItemKey={(issue) => issue.id}
        onItemClick={handleIssueClick}
        renderItem={(issue, index, isActive) => (
          <CircularIssueNode
            issue={issue}
            index={index}
            isActive={isActive || selectedIssue?.id === issue.id}
          />
        )}
      />

      {/* Issue Drawer */}
      <IssueDrawer
        issue={selectedIssue}
        isOpen={selectedIssue !== null}
        onClose={handleClose}
      />
    </div>
  );
}
