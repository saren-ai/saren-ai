"use client";

import { FrameworkPrompt } from "@/data/marketing-framework";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SitemapVisualizerProps {
    prompts: FrameworkPrompt[];
    selectedId?: string;
    onSelect?: (prompt: FrameworkPrompt) => void;
    enableNavigation?: boolean;
}

export default function SitemapVisualizer({ prompts, selectedId, onSelect, enableNavigation = false }: SitemapVisualizerProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Group prompts by level
    const grouped = prompts.reduce((acc, prompt) => {
        if (!acc[prompt.level]) {
            acc[prompt.level] = [];
        }
        acc[prompt.level].push(prompt);
        return acc;
    }, {} as Record<string, FrameworkPrompt[]>);

    const phases = ["Foundation", "Differentiation", "Decision", "Activation", "Measurement"];

    const getPhaseColors = (phase: string) => {
        if (["Foundation", "Differentiation"].includes(phase)) return {
            text: "text-electric",
            bg: "bg-electric/10",
            border: "border-electric/50",
            glow: "shadow-[0_0_20px_rgba(45,212,191,0.2)]", // Teal-ish glow
            selectedText: "text-electric"
        };
        if (["Decision", "Activation"].includes(phase)) return {
            text: "text-ember",
            bg: "bg-ember/10",
            border: "border-ember/50",
            glow: "shadow-[0_0_20px_rgba(255,145,0,0.2)]", // Orange glow
            selectedText: "text-ember"
        };
        return {
            text: "text-copper",
            bg: "bg-copper/10",
            border: "border-copper/50",
            glow: "shadow-[0_0_20px_rgba(217,119,6,0.2)]", // Copper glow
            selectedText: "text-copper"
        };
    };

    return (
        <div className="w-full bg-[#111] border-b border-white/10 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric via-ember to-copper opacity-50" />

            <div
                ref={scrollContainerRef}
                className="overflow-x-auto pb-8 pt-8 px-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex gap-16 min-w-full"
            >
                {/* Connecting Line (Horizontal Spine) */}
                <div className="absolute top-[60px] left-10 right-10 h-0.5 bg-white/10 -z-0" />

                {phases.map((phase, index) => {
                    const phasePrompts = grouped[phase] || [];
                    const isSelectedPhase = phasePrompts.some(p =>
                        enableNavigation ? pathname.includes(p.slug) : p.id === selectedId
                    );
                    const colors = getPhaseColors(phase);

                    return (
                        <div key={phase} className="flex-shrink-0 w-72 relative z-10 flex flex-col items-center">

                            {/* Phase Node */}
                            <div className={`
                                w-full p-3 rounded-xl border mb-6 relative text-center transition-all duration-300
                                ${isSelectedPhase
                                    ? `${colors.bg} ${colors.border} ${colors.glow}`
                                    : "bg-[#111] border-white/10"}
                            `}>
                                <div className={`text-[10px] font-mono uppercase tracking-widest opacity-50 mb-1 ${isSelectedPhase ? "text-white" : ""}`}>Phase 0{index + 1}</div>
                                <h3 className={`text-lg font-bold ${isSelectedPhase ? colors.text : "text-white"}`}>{phase}</h3>

                                {/* Connector Dot Bottom */}
                                <div className="absolute -bottom-[25px] left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/10" />
                            </div>

                            {/* Steps List */}
                            <div className="w-full space-y-2">
                                {phasePrompts.map((prompt, pIndex) => {
                                    const isSelected = enableNavigation
                                        ? pathname.includes(prompt.slug)
                                        : selectedId === prompt.id;

                                    const content = (
                                        <div className="flex items-start gap-3">
                                            <span className={`
                                                font-mono text-[10px] px-1.5 py-0.5 rounded
                                                ${isSelected
                                                    ? `bg-black/20 ${colors.text}`
                                                    : "bg-white/10 text-white/30"}
                                            `}>
                                                {prompt.id}
                                            </span>
                                            <span className={`text-sm font-medium leading-snug ${isSelected ? colors.text : "text-white/90"}`}>
                                                {prompt.title}
                                            </span>
                                        </div>
                                    );

                                    const className = `
                                        block w-full text-left p-3 rounded-lg border transition-all duration-200 group
                                        ${isSelected
                                            ? `${colors.bg} ${colors.border} ${colors.glow} scale-[1.02]`
                                            : "bg-[#1A1A1A] text-white/70 border-white/5 hover:border-white/20 hover:bg-white/5"}
                                    `;

                                    return (
                                        <div key={prompt.id} className="relative">
                                            {enableNavigation ? (
                                                <Link
                                                    href={`/portfolio/b2b-marketing-framework/${prompt.slug}`}
                                                    className={className}
                                                >
                                                    {content}
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => onSelect?.(prompt)}
                                                    className={className}
                                                >
                                                    {content}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Scroll Indicators (Fade) */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
    );
}
