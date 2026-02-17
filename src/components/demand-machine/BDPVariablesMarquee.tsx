"use client";

import { useState } from "react";
import { BDP_VARIABLES } from "@/data/bdp-variables";

const LEVEL_COLORS: Record<string, string> = {
    L1: "#E34234", L2: "#457B9D", L3: "#C17D3A",
    L4: "#A8DADC", L5: "#2A9D8F", L6: "#6C757D", L7: "#E76F51",
};

const LEVEL_LABELS: Record<string, string> = {
    L1: "Foundation", L2: "Identity", L3: "Message",
    L4: "Articulation", L5: "Context", L6: "Activation", L7: "Evolution",
};

function chunkByLevel() {
    return ["L1", "L2", "L3", "L4", "L5", "L6", "L7"].map((level) =>
        BDP_VARIABLES.filter((v) => v.level === level)
    );
}

function VariableChip({ variable }: { variable: typeof BDP_VARIABLES[0] }) {
    const c = LEVEL_COLORS[variable.level];
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "3px",
                fontSize: "12px",
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                fontWeight: 500,
                whiteSpace: "nowrap",
                flexShrink: 0,
                background: c + "18",
                color: c,
                border: `1px solid ${c}35`,
            }}
        >
            <span style={{ fontSize: "9px", fontWeight: 700, opacity: 0.4 }}>
                {String(variable.id).padStart(3, "0")}
            </span>
            <span>{variable.name}</span>
        </span>
    );
}

function MarqueeRow({
    variables,
    direction,
    speed,
    rowIndex,
}: {
    variables: typeof BDP_VARIABLES[0][];
    direction: "left" | "right";
    speed: number;
    rowIndex: number;
}) {
    const c = LEVEL_COLORS[variables[0]?.level];
    const label = LEVEL_LABELS[variables[0]?.level];
    // Vary speed by row length
    const dur = Math.max(20, variables.length * (speed || 1.8));

    return (
        <div
            style={{
                overflow: "hidden",
                position: "relative",
                borderTop: rowIndex > 0 ? `1px solid rgba(255,255,255,0.04)` : "none",
                padding: "6px 0",
            }}
            className="marquee-wrapper"
        >
            {/* Left fade + label */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "90px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    background: "linear-gradient(90deg, #0A0E14 55%, transparent)",
                }}
            >
                <span
                    style={{
                        fontSize: "8px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: c,
                        opacity: 0.6,
                        fontFamily: "'JetBrains Mono', monospace",
                    }}
                >
                    {label}
                </span>
            </div>
            {/* Right fade */}
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "50px",
                    zIndex: 2,
                    background: "linear-gradient(270deg, #0A0E14 15%, transparent)",
                }}
            />

            <div
                className={direction === "right" ? "scroll-right" : "scroll-left"}
                style={{
                    display: "flex",
                    gap: "8px",
                    width: "max-content",
                    // @ts-ignore
                    "--dur": `${dur}s`,
                    animationDuration: `${dur}s`, // standard property
                }}
            >
                {[...variables, ...variables].map((v, i) => (
                    <VariableChip key={`${v.id}-${i}`} variable={v} />
                ))}
            </div>
        </div>
    );
}

export default function BDPVariablesMarquee() {
    const rows = chunkByLevel();
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "900px",
                margin: "0 auto",
                background: "#0A0E14",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: "16px 20px 10px",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span
                        style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#E34234",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        BDP_FRAMEWORK
                    </span>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>
                        v1.0 — 21 prompts
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>
                        {BDP_VARIABLES.length} variables
                    </span>
                    <div style={{ display: "flex", gap: "3px" }}>
                        {Object.entries(LEVEL_COLORS).map(([level, c]) => (
                            <div
                                key={level}
                                onMouseEnter={() => setHovered(level)}
                                onMouseLeave={() => setHovered(null)}
                                title={`${level}: ${LEVEL_LABELS[level]}`}
                                style={{
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "2px",
                                    background: c,
                                    cursor: "pointer",
                                    opacity: hovered && hovered !== level ? 0.15 : 0.75,
                                    transition: "opacity 0.2s",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Rows */}
            <div style={{ padding: "6px 0" }}>
                {rows.map((rowVars, i) => (
                    <MarqueeRow
                        key={i}
                        variables={rowVars}
                        direction={i % 2 === 0 ? "right" : "left"}
                        speed={1.6 + i * 0.15}
                        rowIndex={i}
                    />
                ))}
            </div>

            {/* Footer */}
            <div
                style={{
                    padding: "6px 20px 10px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.15)" }}>
                    7 layers × 21 prompts → complete B2B brand system
                </span>
                <span style={{ fontSize: "9px", color: "#E34234", opacity: 0.5 }}>
                    saren.ai
                </span>
            </div>

            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap");

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
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
