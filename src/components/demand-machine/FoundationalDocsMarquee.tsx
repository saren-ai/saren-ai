"use client";

import { useMemo } from "react";
import { FileText } from "lucide-react";

const DOCS_LIST = [
    "Target customer profiles (detailed buyer personas)",
    "Market & competitive analysis (landscape overview)",
    "Mission, vision, values (strategic purpose)",
    "Brand voice & tone guidelines (how the brand sounds)",
    "Brand personality & archetype (brand character framework)",
    "Unique value propositions (why customers should care)",
    "Brand positioning statement (market stake in the ground)",
    "Brand promise (customer-facing commitment)",
    "Core messaging pillars (the key themes your messaging leans on)",
    "Message map (hierarchical messaging architecture)",
    "Elevator pitch & boilerplate (30-second and ~100-word intro)",
    "Example communications (templates for key touchpoints)",
    "Taglines & slogans (short hooks that stick)",
    "Industry context document (trends, forces shaping the category)",
    "Sales methodology blueprint (how you close deals)",
    "Product/service catalog (what you sell + how you describe it)",
    "Brand guidelines master document (execution rulebook)",
    "Communication strategy plan (where & how you show up)",
    "Training & enablement materials (team alignment docs)",
    "Performance measurement framework (metrics & KPIs)",
    "Review & iteration protocol (how you refine and evolve)",
];

function chunkArray<T>(array: T[], chunks: number): T[][] {
    const result: T[][] = [];
    const chunkSize = Math.ceil(array.length / chunks);
    for (let i = 0; i < chunks; i++) {
        result.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return result;
}

function DocChip({ text }: { text: string }) {
    // Split title and parenthesis if possible for better styling
    const match = text.match(/^(.*?)\s*\((.*?)\)$/);
    const title = match ? match[1] : text;
    const description = match ? match[2] : "";

    return (
        <span
            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-electric/20 bg-electric/5 text-electric whitespace-nowrap"
            style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                boxShadow: "0 0 15px -8px rgba(0, 122, 255, 0.4)", // Electric glow
            }}
        >
            <FileText className="w-4 h-4 opacity-50 flex-shrink-0" />
            <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-tight">{title}</span>
                {description && (
                    <span className="text-[10px] font-medium opacity-60 text-charcoal/60 dark:text-white/60 uppercase tracking-wider">
                        {description}
                    </span>
                )}
            </div>
        </span>
    );
}

function MarqueeRow({
    items,
    direction,
    speed,
}: {
    items: string[];
    direction: "left" | "right";
    speed: number;
}) {
    const dur = Math.max(25, items.length * speed);

    return (
        <div className="relative overflow-hidden py-2 border-t border-charcoal/5 dark:border-white/5 first:border-t-0">
            {/* Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent dark:from-[#0A0E14] dark:to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent dark:from-[#0A0E14] dark:to-transparent z-10" />

            <div
                className={direction === "right" ? "scroll-right" : "scroll-left"}
                style={{
                    display: "flex",
                    gap: "16px",
                    width: "max-content",
                    // @ts-ignore
                    "--dur": `${dur}s`,
                    animationDuration: `${dur}s`,
                }}
            >
                {[...items, ...items].map((t, i) => (
                    <DocChip key={`${i}`} text={t} />
                ))}
            </div>
        </div>
    );
}

export default function FoundationalDocsMarquee() {
    // Split into 5 rows as requested
    const rows = useMemo(() => chunkArray(DOCS_LIST, 5), []);

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
                    <span className="text-sm font-bold text-electric tracking-tight">
                        ASSET_GENERATION
                    </span>
                    <span className="text-[10px] text-charcoal/40 dark:text-white/20">v2.0 — 21 files</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-sm bg-electric/40" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-electric/60" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-electric/80" />
                    </div>
                    <span className="text-[10px] text-charcoal/40 dark:text-white/20 ml-2">Processing...</span>
                </div>
            </div>

            {/* Rows */}
            <div className="py-2">
                {rows.map((rowItems, i) => (
                    <MarqueeRow
                        key={i}
                        items={rowItems}
                        direction={i % 2 === 0 ? "right" : "left"}
                        speed={4.0 + i * 0.3} // Slightly slower for readability of descriptions
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between px-6 py-3 border-t border-charcoal/5 dark:border-white/5 bg-charcoal/[0.02] dark:bg-white/[0.02]">
                <span className="text-[10px] text-charcoal/20 dark:text-white/10 uppercase tracking-widest">
                    System.File.Write
                </span>
                <span className="text-[10px] text-electric/40">
                    saren.ai
                </span>
            </div>

            <style jsx global>{`
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
