"use client";

import { useMemo } from "react";

const PROMPT_TITLES = [
    "Target Market & Competition",
    "Ideal Customer Profile",
    "Mission, Vision, Values",
    "Brand Voice & Tone",
    "Unique Value Proposition",
    "Positioning Statement",
    "Brand Promise",
    "Strategic Messaging Pillars",
    "Message Map",
    "Elevator Pitch",
    "Sales Playbook Outline",
    "Website Copy",
    "Case Study Framework",
    "Objection Handling",
    "Hooks & Taglines",
    "Channel Strategy",
    "Sales Enablement Plan",
    "Campaign Brief",
    "Nurture Sequence Strategy",
    "Content Formats",
    "Marketing KPIs & Metrics",
    "Marketing Dashboard",
    "Quarterly Business Review",
];

function chunkArray<T>(array: T[], chunks: number): T[][] {
    const result: T[][] = [];
    const chunkSize = Math.ceil(array.length / chunks);
    for (let i = 0; i < chunks; i++) {
        result.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return result;
}

function PromptChip({ title }: { title: string }) {
    return (
        <span
            className="inline-flex items-center px-4 py-2 rounded-md border border-ember/20 bg-ember/5 text-ember whitespace-nowrap"
            style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                boxShadow: "0 0 10px -5px rgba(227, 66, 52, 0.3)", // Ember glow
            }}
        >
            <span className="text-sm font-bold tracking-tight">{title}</span>
        </span>
    );
}

function MarqueeRow({
    titles,
    direction,
    speed,
}: {
    titles: string[];
    direction: "left" | "right";
    speed: number;
}) {
    const dur = Math.max(20, titles.length * speed);

    return (
        <div className="relative overflow-hidden py-3">
            {/* Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0A0E14] dark:to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0A0E14] dark:to-transparent z-10" />

            <div
                className={direction === "right" ? "scroll-right" : "scroll-left"}
                style={{
                    display: "flex",
                    gap: "12px",
                    width: "max-content",
                    // @ts-ignore
                    "--dur": `${dur}s`,
                    animationDuration: `${dur}s`,
                }}
            >
                {[...titles, ...titles].map((t, i) => (
                    <PromptChip key={`${i}`} title={t} />
                ))}
            </div>
        </div>
    );
}

export default function MessagingPromptsMarquee() {
    // Split titles into 4 rows as requested
    const rows = useMemo(() => chunkArray(PROMPT_TITLES, 4), []);

    return (
        <div
            className="w-full max-w-[900px] mx-auto bg-white dark:bg-[#0A0E14] rounded-xl overflow-hidden border border-charcoal/5 dark:border-white/5 shadow-2xl"
            style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal/5 dark:border-white/5 bg-charcoal/[0.02] dark:bg-white/[0.02]">
                <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-ember tracking-tight">
                        PROMPT_LIBRARY
                    </span>
                    <span className="text-[10px] text-charcoal/40 dark:text-white/20">v1.2 — 23 modules</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <span className="w-1 h-1 rounded-full bg-ember/40" />
                        <span className="w-1 h-1 rounded-full bg-ember/60" />
                        <span className="w-1 h-1 rounded-full bg-ember/80" />
                    </div>
                </div>
            </div>

            {/* Rows */}
            <div className="py-4 space-y-1">
                {rows.map((rowTitles, i) => (
                    <MarqueeRow
                        key={i}
                        titles={rowTitles}
                        direction={i % 2 === 0 ? "right" : "left"}
                        speed={2.5 + i * 0.2}
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between px-6 py-3 border-t border-charcoal/5 dark:border-white/5 bg-charcoal/[0.02] dark:bg-white/[0.02]">
                <span className="text-[10px] text-charcoal/20 dark:text-white/10 uppercase tracking-widest">
                    System.Output.Generated
                </span>
                <span className="text-[10px] text-ember/40">
                    saren.ai
                </span>
            </div>

            <style jsx global>{`
        /* Reusing global keyframes if they exist, but defining locally to be safe */
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-left {
          animation: scrollLeft linear infinite;
        }
        .scroll-right {
          animation: scrollRight linear infinite;
        }
        .marquee-wrapper:hover .scroll-left,
        .marquee-wrapper:hover .scroll-right {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
}
