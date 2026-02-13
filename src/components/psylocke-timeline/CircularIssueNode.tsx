"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ComicIssue, formatDateShort } from "@/lib/psylocke-timeline";

interface CircularIssueNodeProps {
    issue: ComicIssue;
    index: number;
    isActive: boolean;
    onClick?: (issue: ComicIssue) => void;
}

const CircularIssueNode = React.memo(function CircularIssueNode({
    issue,
    isActive,
    onClick,
}: CircularIssueNodeProps) {
    return (
        <motion.div
            className={`flex flex-col items-center gap-2 cursor-pointer group`}
            onClick={() => onClick?.(issue)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Comic thumbnail */}
            <div
                className={`
            relative rounded-lg overflow-hidden border-2 transition-all duration-300
            ${isActive
                        ? "w-[320px] h-[480px] border-ember shadow-[0_0_30px_rgba(227,66,52,0.6)]"
                        : "w-[240px] h-[360px] border-white/20 hover:border-white/60 grayscale-[0.5] hover:grayscale-0"
                    }
        `}
            >
                <Image
                    src={issue.thumbnailPath}
                    alt={`Cover of ${issue.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, 320px"
                    priority={isActive}
                />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Title - visible on hover or active */}
            <div className={`
            text-center max-w-[240px] px-3 py-2 mt-4 rounded bg-black/40 backdrop-blur-md
            transition-opacity duration-300
            ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
      `}>
                <span className="text-sm text-white font-medium block">
                    {issue.title}
                </span>
                <span className="text-xs text-white/60 font-mono block mt-1">
                    {formatDateShort(issue.releaseDate)}
                </span>
            </div>
        </motion.div>
    );
});

export default CircularIssueNode;
