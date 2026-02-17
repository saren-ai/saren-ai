"use client";

import { InterviewQuestion } from "@/data/interview-questions";
import { Check, Copy, Download, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface InterviewResultsProps {
    answers: Record<string, string>;
    questions: InterviewQuestion[];
    isSending?: boolean;
    onReset: () => void;
}

export default function InterviewResults({ answers, questions, isSending, onReset }: InterviewResultsProps) {
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true); // Trigger confetti on mount
    }, []);

    // Generate Markdown content
    const generateMarkdown = () => {
        let md = "# Demand Machine: Stakeholder Interview\n\n";
        let currentSection = "";

        questions.forEach((q) => {
            if (q.section !== currentSection) {
                currentSection = q.section;
                md += `\n## ${currentSection}\n\n`;
            }
            md += `### ${q.number}. ${q.question}\n`;
            const answer = answers[q.id] || "(No answer provided)";
            md += `${answer}\n\n`;
        });

        return md;
    };

    const markdownContent = generateMarkdown();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(markdownContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([markdownContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "demand-machine-interview.md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeInUp">
            <div className="bg-card-bg border border-border rounded-xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-electric/10 text-electric rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" />
                </div>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Diagnostic Complete
                    </h2>
                    <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-4">
                        You've built the foundation. Use these answers to shape your messaging, content, and sales narrative.
                    </p>

                    {isSending && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric/10 text-electric rounded-full text-sm font-medium animate-pulse">
                            Sending copy to your email...
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-6 py-3 border border-border hover:bg-ash/50 text-foreground-muted hover:text-foreground rounded-lg font-medium transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Start Over
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-6 py-3 bg-ash dark:bg-white/10 text-foreground hover:text-electric rounded-lg font-medium transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy Markdown"}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric/90 text-white rounded-lg font-medium shadow-md transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download .md
                    </button>
                </div>
            </div>

            {/* Markdown Preview */}
            <div className="bg-ash/50 dark:bg-white/5 border border-border rounded-xl p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted">
                        Preview
                    </h3>
                    <span className="text-xs font-mono text-slate">demand-machine-interview.md</span>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-sm text-foreground/80 overflow-x-auto max-h-[400px] overflow-y-auto p-4 bg-background rounded-lg border border-border/50">
                    {markdownContent}
                </pre>
            </div>

            {/* Next Step CTA */}
            <div className="bg-gradient-to-r from-charcoal to-offblack text-white rounded-xl p-8 md:p-12 text-center md:text-left md:flex items-center justify-between gap-8 shadow-xl">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Next: Build your Messaging</h3>
                    <p className="text-white/70 max-w-lg">
                        Use these answers to populate the 21-Step Messaging Framework. Turn raw data into positioning gold.
                    </p>
                </div>
                <Link
                    href="/demand-machine/messaging"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-ember hover:bg-ember/90 text-white rounded-lg font-bold transition-transform hover:translate-y-[-2px] mt-6 md:mt-0 whitespace-nowrap"
                >
                    Go to Step 2
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}
