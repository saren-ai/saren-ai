"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FrameworkPrompt } from "@/data/marketing-framework";
import { X, Github, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface PromptModalProps {
    prompt: FrameworkPrompt | null;
    onClose: () => void;
    isOpen: boolean;
}

const getLevelColors = (level: string) => {
    if (level === "L1" || level === "L2") return { bg: "bg-slate/10", text: "text-slate", border: "border-slate/20" };
    if (level === "L3" || level === "L4") return { bg: "bg-electric/10", text: "text-electric", border: "border-electric/20" };
    return { bg: "bg-ember/10", text: "text-ember", border: "border-ember/20" };
};

export default function PromptModal({ prompt, onClose, isOpen }: PromptModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!prompt) return null;

    const colors = getLevelColors(prompt.level);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        layoutId={`card-${prompt.id}`}
                        className="relative w-full max-w-5xl bg-[#0F0F0F] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Panel: Context */}
                        <div className="w-full md:w-1/3 p-8 bg-gradient-to-b from-white/[0.03] to-transparent border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                            <div className="mb-6">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${colors.bg} ${colors.text} ${colors.border} border`}>
                                    {prompt.level} // {prompt.levelTitle}
                                </span>
                            </div>

                            <motion.h2
                                layoutId={`title-${prompt.id}`}
                                className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight"
                            >
                                {prompt.title}
                            </motion.h2>

                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Strategic Objective</h3>
                                <p className="text-lg text-white/90 font-medium leading-relaxed">
                                    {prompt.hook}
                                </p>
                            </div>

                            <div className="mt-auto pt-6">
                                <a
                                    href={prompt.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-ember to-orange-600 text-white font-bold text-lg hover:from-ember/90 hover:to-orange-600/90 hover:scale-[1.02] transition-all w-full justify-center group shadow-lg shadow-ember/20"
                                >
                                    <Github className="w-6 h-6" />
                                    See full prompt
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Right Panel: Code */}
                        <div className="w-full md:w-2/3 bg-[#0A0A0A] flex flex-col min-h-[400px] relative">
                            {/* Fake Browser Toolbar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="text-xs font-mono text-white/30">
                                    {prompt.title.toLowerCase().replace(/ /g, "-")}.md
                                </div>
                                <div className="w-12" /> {/* Spacer */}
                            </div>

                            {/* Code Content */}
                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                                    {prompt.promptContent}
                                </pre>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 border-t border-white/5 bg-white/[0.02] text-[10px] font-mono text-white/30 flex justify-between items-center">
                                <span>Markdown Included</span>
                                <span className="text-white/20 uppercase tracking-widest font-bold">Sample Output</span>
                                <span>UTF-8</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
