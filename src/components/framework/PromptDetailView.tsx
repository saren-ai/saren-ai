"use client";

import { FrameworkPrompt } from "@/data/marketing-framework";
import { ArrowRight, Copy, Check, Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";


interface PromptDetailViewProps {
    prompt: FrameworkPrompt;
    nextPrompt?: FrameworkPrompt;
    prevPrompt?: FrameworkPrompt;
}

export default function PromptDetailView({ prompt, nextPrompt, prevPrompt }: PromptDetailViewProps) {
    const [copied, setCopied] = useState(false);

    // Helper to extract the actual prompt text (after the separator)
    const extractPromptText = () => {
        const parts = prompt.promptContent.split('---');
        if (parts.length > 1) {
            // Return the part after ---, trimming code fences if present
            let text = parts.slice(1).join('---').trim(); // Join back in case multiple separators
            // Remove leading/trailing code blocks
            text = text.replace(/^```\w*\n?/, '').replace(/\n?```$/, '').trim();
            return text;
        }
        return prompt.promptContent;
    };

    const actualPrompt = extractPromptText();

    // Context Parsing (Pre-prompt)
    const extractContextInputs = () => {
        const prePrompt = prompt.promptContent.split('---')[0];
        // Look for items in "Prepare your inputs" section
        // Matches **{{variable}}** lines
        const matches = prePrompt.match(/\*\*\{\{.*?\}\}\*\*/g);
        return matches ? matches.map(m => m.replace(/\*\*|\{\{|\}\}/g, '').trim()) : [];
    };

    // Prompt Parsing (Role, Objective, Output)
    const extractRole = () => {
        // Look for "You are a [Role]..."
        const match = actualPrompt.match(/You are a (.*?)(?=\.|,|\n)/);
        return match ? match[1].trim() : "Marketing Strategist";
    };

    const extractObjective = () => {
        // Look for "## Your objective" or "## Your task"
        const match = actualPrompt.match(/## Your (objective|task)\n+([\s\S]*?)(?=\n##|$)/);
        return match ? match[2].trim().split('\n')[0] : ""; // Take first paragraph
    };

    const extractOutputs = () => {
        // Look for "## Output requirements" or "## Required output"
        const section = actualPrompt.match(/## (Output requirements|Required output[s]?)([\s\S]*?)(?=\n##|$)/);
        if (!section) return [];

        // Extract items that look like headers (###) or bold bullets
        const text = section[2];
        const headers = text.match(/### \d+\.\s*(.*?)(?=\n)/g);
        if (headers) return headers.map(h => h.replace(/### \d+\.\s*/, '').trim());

        const bullets = text.match(/^\s*-\s*\*\*(.*?)\*\*/gm);
        if (bullets) return bullets.map(b => b.replace(/^\s*-\s*\*\*/, '').replace(/\*\*$/, '').trim());

        return ["See details"];
    };

    const role = extractRole();
    const objective = extractObjective();
    const inputs = extractContextInputs();
    const outputs = extractOutputs();

    const handleCopy = () => {
        navigator.clipboard.writeText(actualPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
            {/* Header */}
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 text-electric text-sm font-medium mb-4">
                    <span>{prompt.levelTitle}</span>
                    <span>•</span>
                    <span>Step {prompt.id}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{prompt.title}</h1>
                <p className="text-xl text-foreground-muted max-w-2xl mx-auto">{prompt.hook}</p>
            </div>

            {/* Visual Logic Flow */}
            <div className="mb-16">
                <div className="bg-background-secondary/50 rounded-2xl p-8 border border-white/5 text-center">
                    <h3 className="text-sm font-mono text-foreground-muted uppercase tracking-wider mb-6">Workflow Logic</h3>
                    <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm md:text-base font-medium">
                        {prompt.visualLogic.split('->').map((step, i, arr) => (
                            <div key={i} className="flex items-center">
                                <span className={`px-4 py-2 rounded-lg ${step.includes('[')
                                    ? 'bg-electric/10 text-electric border border-electric/20'
                                    : step.includes('{')
                                        ? 'bg-ember/10 text-ember border border-ember/20'
                                        : 'bg-copper/10 text-copper border border-copper/20'
                                    }`}>
                                    {step.trim().replace(/\[|\]|\{|\}/g, '')}
                                </span>
                                {i < arr.length - 1 && (
                                    <ArrowRight className="w-5 h-5 mx-2 text-foreground-muted/50" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info Row (Inputs, Outputs, Frameworks) */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Box 1: Required Inputs */}
                <div className="bg-card-bg border border-border rounded-xl p-6 flex flex-col h-full">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-ember" />
                        Required Inputs
                    </h3>
                    <ul className="space-y-2 flex-grow">
                        {inputs.map((input, i) => (
                            <li key={i} className="flex gap-3 text-sm text-foreground-muted">
                                <div className="w-1.5 h-1.5 rounded-full bg-ember/50 mt-1.5 flex-shrink-0" />
                                {input}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Box 2: Expected Outputs */}
                <div className="bg-card-bg border border-border rounded-xl p-6 flex flex-col h-full">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-copper" />
                        Expected Outputs
                    </h3>
                    <ul className="space-y-2 flex-grow">
                        {outputs.map((output, i) => (
                            <li key={i} className="flex gap-3 text-sm text-foreground-muted">
                                <div className="w-1.5 h-1.5 rounded-full bg-copper/50 mt-1.5 flex-shrink-0" />
                                {output}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Box 3: Frameworks Used */}
                <div className="bg-card-bg border border-border rounded-xl p-6 flex flex-col h-full">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-electric" />
                        Frameworks Used
                    </h3>
                    <ul className="space-y-2 flex-grow">
                        {prompt.frameworks?.map((fw, i) => (
                            <li key={i} className="flex gap-3 text-sm text-foreground-muted">
                                <div className="w-1.5 h-1.5 rounded-full bg-electric/50 mt-1.5 flex-shrink-0" />
                                {fw}
                            </li>
                        )) || <li className="text-sm text-foreground-muted italic">None specified</li>}
                    </ul>
                </div>
            </div>

            {/* Role & Objective Section (Full Width) */}
            <div className="mb-8 bg-card-bg/50 border border-border/50 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                    <strong className="text-foreground block mb-1 text-sm uppercase tracking-wide opacity-70">Role</strong>
                    <p className="text-foreground-muted">{role}</p>
                </div>
                <div className="flex-[2]">
                    <strong className="text-foreground block mb-1 text-sm uppercase tracking-wide opacity-70">Objective</strong>
                    <p className="text-foreground-muted">{objective}</p>
                </div>
            </div>

            {/* Main Prompt Window (Full Width) */}
            <div className="mb-16">
                <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl h-full flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopy}
                                className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-2"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                <span className="text-xs font-mono">Copy Prompt</span>
                            </button>
                            <div className="w-px h-4 bg-white/10" />
                            <a
                                href={prompt.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-2"
                            >
                                <Github className="w-4 h-4" />
                                <span className="text-xs font-mono">Source</span>
                            </a>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 overflow-y-auto h-[240px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                            {actualPrompt}
                        </pre>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="mb-20 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {prompt.faq?.map((item, i) => (
                        <div key={i} className="bg-card-bg border border-border rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-2 text-foreground">{item.question}</h3>
                            <p className="text-foreground-muted leading-relaxed">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="border-t border-white/10 pt-12">
                <div className="grid grid-cols-2 gap-4">
                    {prevPrompt ? (
                        <Link
                            href={`/portfolio/b2b-marketing-framework/${prevPrompt.slug}`}
                            className="group p-6 bg-card-bg border border-border rounded-xl hover:border-electric/50 transition-all"
                        >
                            <span className="text-xs font-mono text-foreground-muted mb-2 block">Previous Step</span>
                            <div className="font-bold text-foreground group-hover:text-electric transition-colors flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs">
                                    ←
                                </div>
                                {prevPrompt.title}
                            </div>
                        </Link>
                    ) : <div />}

                    {nextPrompt ? (
                        <Link
                            href={`/portfolio/b2b-marketing-framework/${nextPrompt.slug}`}
                            className="group p-6 bg-card-bg border border-border rounded-xl hover:border-electric/50 transition-all text-right"
                        >
                            <span className="text-xs font-mono text-foreground-muted mb-2 block">Next Step</span>
                            <div className="font-bold text-foreground group-hover:text-electric transition-colors flex items-center justify-end gap-2">
                                {nextPrompt.title}
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs">
                                    →
                                </div>
                            </div>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}
