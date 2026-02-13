"use client";

import { motion } from "framer-motion";
import { FrameworkPrompt } from "@/data/marketing-framework";
import { ArrowUpRight } from "lucide-react";

interface BentoCardProps {
    prompt: FrameworkPrompt;
    onClick: () => void;
}

const getLevelColors = (level: string) => {
    switch (level) {
        case "L1":
            return {
                border: "border-slate-700/30 group-hover:border-slate-500/50",
                glow: "group-hover:shadow-[0_0_20px_-5px_rgba(148,163,184,0.2)]",
                text: "text-slate-400",
                accent: "bg-slate-500/10 text-slate-300",
                code: "text-slate-300",
                gradient: "from-slate-900/80 to-slate-900/20"
            };
        case "L2":
            return {
                border: "border-indigo-500/30 group-hover:border-indigo-400/50",
                glow: "group-hover:shadow-[0_0_20px_-5px_rgba(129,140,248,0.2)]",
                text: "text-indigo-400",
                accent: "bg-indigo-500/10 text-indigo-300",
                code: "text-indigo-300",
                gradient: "from-indigo-900/80 to-indigo-900/20"
            };
        case "L3":
            return {
                border: "border-electric/30 group-hover:border-electric/50",
                glow: "group-hover:shadow-[0_0_20px_-5px_rgba(0,255,255,0.2)]",
                text: "text-electric",
                accent: "bg-electric/10 text-electric",
                code: "text-electric-300",
                gradient: "from-cyan-900/80 to-cyan-900/20" // Electric approximation
            };
        case "L4":
            return {
                border: "border-emerald-500/30 group-hover:border-emerald-400/50",
                glow: "group-hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.2)]",
                text: "text-emerald-400",
                accent: "bg-emerald-500/10 text-emerald-300",
                code: "text-emerald-300",
                gradient: "from-emerald-900/80 to-emerald-900/20"
            };
        case "L5":
            return {
                border: "border-amber-500/30 group-hover:border-amber-400/50",
                glow: "group-hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]",
                text: "text-amber-400",
                accent: "bg-amber-500/10 text-amber-300",
                code: "text-amber-300",
                gradient: "from-amber-900/80 to-amber-900/20"
            };
        case "L6":
            return {
                border: "border-ember/30 group-hover:border-ember/50",
                glow: "group-hover:shadow-[0_0_20px_-5px_rgba(255,165,0,0.2)]",
                text: "text-ember",
                accent: "bg-ember/10 text-ember",
                code: "text-ember-300",
                gradient: "from-orange-900/80 to-orange-900/20"
            };
        case "L7":
            return {
                border: "border-rose-500/30 group-hover:border-rose-400/50",
                glow: "group-hover:shadow-[0_0_20px_-5px_rgba(244,63,94,0.2)]",
                text: "text-rose-400",
                accent: "bg-rose-500/10 text-rose-300",
                code: "text-rose-300",
                gradient: "from-rose-900/80 to-rose-900/20"
            };
        default:
            return {
                border: "border-slate-700/30",
                glow: "",
                text: "text-slate-400",
                accent: "bg-slate-500/10",
                code: "text-slate-300",
                gradient: "from-slate-900/80 to-slate-900/20"
            };
    }
};

export default function BentoCard({ prompt, onClick }: BentoCardProps) {
    const colors = getLevelColors(prompt.level);

    return (
        <motion.div
            layoutId={`card-${prompt.id}`}
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`group relative overflow-hidden rounded-3xl bg-[#0F0F0F] border ${colors.border} ${colors.glow} cursor-pointer transition-all duration-300 flex flex-col h-full`}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />

            <div className="p-6 flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div className={`text-[10px] font-mono font-bold tracking-wider uppercase ${colors.text} opacity-80`}>
                        {prompt.level} // {prompt.levelTitle}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className={`p-1.5 rounded-full ${colors.accent}`}
                    >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.div>
                </div>

                {/* Title */}
                <motion.h3
                    layoutId={`title-${prompt.id}`}
                    className="text-lg md:text-xl font-bold text-white mb-2 leading-tight"
                >
                    {prompt.title}
                </motion.h3>

                {/* Conditional Description for non-standard sizes */}
                {prompt.size !== 'standard' && (
                    <p className="text-sm text-white/50 mb-4 line-clamp-3">
                        {prompt.hook}
                    </p>
                )}

                {/* Code Glimpse - Pushed to bottom */}
                <div className="mt-auto pt-4">
                    <div className="text-[10px] font-mono bg-black/40 rounded-lg p-2.5 border border-white/5 overflow-hidden text-ellipsis whitespace-nowrap backdrop-blur-sm">
                        <span className={colors.code}>
                            {prompt.visualLogic}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
