"use client";

import { FrameworkPrompt } from "@/data/marketing-framework";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface MindMapNavProps {
    prompts: FrameworkPrompt[];
    selectedId: string;
    onSelect: (prompt: FrameworkPrompt) => void;
}

export default function MindMapNav({ prompts, selectedId, onSelect }: MindMapNavProps) {
    // Group prompts by level
    const grouped = prompts.reduce((acc, prompt) => {
        if (!acc[prompt.level]) {
            acc[prompt.level] = [];
        }
        acc[prompt.level].push(prompt);
        return acc;
    }, {} as Record<string, FrameworkPrompt[]>);

    const levels = ["Foundation", "Differentiation", "Decision", "Activation", "Measurement"];

    return (
        <div className="h-full overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent">
            {/* Root Node (Visual only) */}
            <div className="mb-6 pl-4">
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-foreground/5 text-foreground font-mono text-xs font-bold border border-foreground/10">
                    B2B_Marketing_Framework_v2.0
                </div>
                {/* Connector Line to Children */}
                <div className="h-4 w-px bg-foreground/10 ml-6" />
            </div>

            <div className="space-y-0 relative">
                {/* Main Vertical Spine */}
                <div className="absolute top-0 bottom-4 left-[27px] w-px bg-foreground/10" />

                {levels.map((level, levelIndex) => (
                    <div key={level} className="relative pl-12 mb-8">
                        {/* Horizontal Connector to Level Node */}
                        <div className="absolute top-4 left-[28px] w-5 h-px bg-foreground/10" />

                        {/* Level Node */}
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-foreground/80 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full border border-foreground/30 bg-background" />
                                {level}
                            </h3>
                        </div>

                        {/* Children List */}
                        <div className="space-y-1 relative pl-4 border-l border-foreground/10 ml-1">
                            {grouped[level]?.map((prompt) => (
                                <button
                                    key={prompt.id}
                                    onClick={() => onSelect(prompt)}
                                    className={`group relative w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center gap-2
                                        ${selectedId === prompt.id
                                            ? "bg-foreground text-background font-medium shadow-md"
                                            : "hover:bg-foreground/5 text-foreground/70 hover:text-foreground"
                                        }`}
                                >
                                    {/* Connector for selected state */}
                                    {selectedId === prompt.id && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-4 h-px bg-foreground"
                                        />
                                    )}

                                    <span className={`font-mono text-[10px] opacity-50 ${selectedId === prompt.id ? "text-background/70" : "text-foreground/40"}`}>
                                        {prompt.id}
                                    </span>
                                    <span className="truncate">{prompt.title}</span>
                                    {selectedId === prompt.id && (
                                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
