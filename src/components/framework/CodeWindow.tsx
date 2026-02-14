"use client";

import { FrameworkPrompt } from "@/data/marketing-framework";
import { Github, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeWindowProps {
    prompt: FrameworkPrompt;
}

const getLevelColors = (level: string) => {
    // Foundation & Differentiation
    if (level === "Foundation" || level === "Differentiation") return { bg: "bg-electric/10", text: "text-electric", border: "border-electric/20", gradient: "from-electric to-electric/0" };
    // Decision & Activation
    if (level === "Decision" || level === "Activation") return { bg: "bg-ember/10", text: "text-ember", border: "border-ember/20", gradient: "from-ember to-ember/0" };
    // Measurement
    return { bg: "bg-copper/10", text: "text-copper", border: "border-copper/20", gradient: "from-copper to-copper/0" };
};

export default function CodeWindow({ prompt }: CodeWindowProps) {
    const [copied, setCopied] = useState(false);
    const colors = getLevelColors(prompt.level);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Context Header */}
            <div className={`px-6 py-6 border-b border-white/5 bg-gradient-to-r ${colors.gradient} via-transparent to-transparent opacity-80`}>
                <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {prompt.levelTitle}
                    </span>
                    <span className="text-white/40 text-xs font-mono">ID: {prompt.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{prompt.title}</h2>
                <p className="text-white/70 text-sm">{prompt.hook}</p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/30 hidden md:block">
                        {prompt.title.toLowerCase().replace(/ /g, "-")}.md
                    </span>
                </div>
                <a
                    href={`/portfolio/b2b-marketing-framework/${prompt.slug}`}
                    className="p-1.5 text-white/40 hover:text-electric hover:bg-electric/10 rounded-md transition-colors flex items-center gap-2 group"
                    title="View Full Page"
                >
                    <span className="text-xs font-mono hidden group-hover:block text-electric">Open Page</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
                <button
                    onClick={handleCopy}
                    className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                    href={prompt.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    title="View on GitHub"
                >
                    <Github className="w-4 h-4" />
                </a>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={prompt.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                            {prompt.promptContent}
                        </pre>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02] text-[10px] font-mono text-white/30 flex justify-between items-center">
                <span>Markdown</span>
                <span>UTF-8</span>
            </div>
        </div>
    );
}
