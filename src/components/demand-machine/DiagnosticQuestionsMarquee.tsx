"use client";

import { useMemo } from "react";
import { INTERVIEW_QUESTIONS, InterviewQuestion } from "@/data/interview-questions";

function chunkArray<T>(array: T[], chunks: number): T[][] {
    const result: T[][] = [];
    const chunkSize = Math.ceil(array.length / chunks);
    for (let i = 0; i < chunks; i++) {
        result.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return result;
}

function QuestionChip({ question }: { question: InterviewQuestion }) {
    return (
        <span
            className="inline-flex items-center gap-4 px-6 py-3 rounded-lg border border-electric/20 bg-electric/5 text-electric whitespace-nowrap"
            style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            }}
        >
            <span className="text-xs font-bold opacity-50">
                {String(question.number).padStart(2, "0")}
            </span>
            <span className="text-lg font-medium">{question.question}</span>
        </span>
    );
}

function MarqueeRow({
    questions,
    direction,
    speed,
}: {
    questions: InterviewQuestion[];
    direction: "left" | "right";
    speed: number;
}) {
    const dur = Math.max(30, questions.length * speed);

    return (
        <div className="relative overflow-hidden py-4 border-t border-white/5 first:border-t-0">
            {/* Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0E14] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0E14] to-transparent z-10" />

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
                {[...questions, ...questions].map((q, i) => (
                    <QuestionChip key={`${q.id}-${i}`} question={q} />
                ))}
            </div>
        </div>
    );
}

export default function DiagnosticQuestionsMarquee() {
    // Split questions into 3 roughly equal chunks
    const rows = useMemo(() => chunkArray(INTERVIEW_QUESTIONS, 3), []);

    return (
        <div
            className="w-full max-w-[900px] mx-auto bg-[#0A0E14] rounded-xl overflow-hidden border border-white/5 shadow-2xl"
            style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-electric tracking-tight">
                        DIAGNOSTIC_PROTOCOL
                    </span>
                    <span className="text-[10px] text-white/20">v1.0 — 36 inputs</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                    <span className="text-[10px] text-white/20">Live Input</span>
                </div>
            </div>

            {/* Rows */}
            <div className="py-2">
                {rows.map((rowQuestions, i) => (
                    <MarqueeRow
                        key={i}
                        questions={rowQuestions}
                        direction={i % 2 === 0 ? "left" : "right"}
                        speed={3.0 + i * 0.2} // Slower speed as requested (base 3.0 vs 1.6)
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between px-6 py-3 border-t border-white/5">
                <span className="text-[10px] text-white/10 uppercase tracking-widest">
                    System.Input.Raw
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
        /* Hover pause is optional, enabling it for better readability */
        .marquee-wrapper:hover .scroll-left,
        .marquee-wrapper:hover .scroll-right {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
}
