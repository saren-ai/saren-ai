"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ComicIssue, formatDateShort } from "@/lib/psylocke-timeline";

interface IssueNodeProps {
  issue: ComicIssue;
  index: number;
  isActive: boolean;
  onClick: (issue: ComicIssue) => void;
}

const IssueNode = React.memo(function IssueNode({
  issue,
  index,
  isActive,
  onClick,
}: IssueNodeProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0 flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      role="listitem"
    >
      {/* Date marker */}
      <span className="font-mono text-xs text-foreground-muted whitespace-nowrap mb-2">
        {formatDateShort(issue.releaseDate)}
      </span>

      {/* Connection line (above thumbnail) */}
      <div className="w-px h-6 bg-border" />

      {/* Comic thumbnail button */}
      <motion.button
        onClick={() => onClick(issue)}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`relative w-[100px] h-[150px] md:w-[120px] md:h-[180px] rounded-lg overflow-hidden border-2 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 ${
          isActive
            ? "border-ember shadow-[0_0_12px_rgba(227,66,52,0.4)]"
            : "border-border hover:border-electric"
        }`}
        aria-label={`View details for ${issue.title}`}
        aria-selected={isActive}
      >
        <Image
          src={issue.thumbnailPath}
          alt={`Cover of ${issue.title}`}
          fill
          className="object-cover"
          sizes="120px"
        />
      </motion.button>

      {/* Connection line (below thumbnail) */}
      <div className="w-px h-4 bg-border" />

      {/* Dot on axis */}
      <div
        className={`w-3 h-3 rounded-full transition-colors ${
          isActive ? "bg-ember" : "bg-border"
        }`}
      />

      {/* Title below axis */}
      <span className="text-[10px] text-foreground-muted text-center truncate max-w-[100px] md:max-w-[120px] mt-2">
        {issue.title}
      </span>
    </motion.div>
  );
});

export default IssueNode;
