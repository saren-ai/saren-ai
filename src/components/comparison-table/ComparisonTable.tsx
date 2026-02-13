"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPARISON_TABLES } from "./comparison-data";

interface ComparisonTableProps {
    tableId: string;
    showToggle?: boolean;
    defaultView?: 'split' | 'old' | 'ai';
    className?: string;
}

export default function ComparisonTable({
    tableId,
    showToggle = false,
    defaultView = 'split',
    className = "",
}: ComparisonTableProps) {
    const [viewMode, setViewMode] = useState<'split' | 'old' | 'ai'>(defaultView);
    const data = COMPARISON_TABLES[tableId];

    if (!data) return null;

    return (
        <div className={`w-full ${className}`}>
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
                <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-2">
                    {data.title}
                </h3>
                <p className="text-slate dark:text-slate-gray">
                    {data.description}
                </p>
            </div>

            {/* Toggle Controls */}
            {showToggle && (
                <div className="flex justify-center md:justify-start gap-2 mb-6">
                    <button
                        onClick={() => setViewMode('split')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'split'
                                ? "bg-charcoal text-white dark:bg-white dark:text-charcoal"
                                : "bg-transparent text-charcoal border border-charcoal/20 hover:bg-charcoal/5 dark:text-white dark:border-white/20 dark:hover:bg-white/10"
                            }`}
                    >
                        Split View
                    </button>
                    <button
                        onClick={() => setViewMode('old')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'old'
                                ? "bg-ember text-white"
                                : "bg-transparent text-charcoal border border-charcoal/20 hover:bg-ember/10 hover:text-ember dark:text-white dark:border-white/20"
                            }`}
                    >
                        Old World
                    </button>
                    <button
                        onClick={() => setViewMode('ai')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'ai'
                                ? "bg-electric text-white"
                                : "bg-transparent text-charcoal border border-charcoal/20 hover:bg-electric/10 hover:text-electric dark:text-white dark:border-white/20"
                            }`}
                    >
                        AI-Native
                    </button>
                </div>
            )}

            {/* Table Container */}
            <div className="border border-slate/20 dark:border-white/10 rounded-xl overflow-hidden shadow-sm dark:bg-card-bg">
                {/* Table Header - Only visible in Split View on larger screens */}
                <div className={`hidden md:grid ${viewMode === 'split' ? 'grid-cols-12' : 'grid-cols-1'} bg-gradient-to-r from-electric to-charcoal text-white font-bold text-sm tracking-wide uppercase border-b border-white/10`}>
                    {viewMode === 'split' && (
                        <>
                            <div className="col-span-3 p-4 bg-black/10">Category</div>
                            <div className="col-span-9 grid grid-cols-2">
                                <div className="p-4 bg-ember/10 border-r border-white/10">Old World Demand Gen</div>
                                <div className="p-4 bg-electric/10">AI-Native Demand Gen</div>
                            </div>
                        </>
                    )}
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate/10 dark:divide-white/5">
                    {data.rows.map((row, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`
                group
                hover:bg-slate/5 dark:hover:bg-white/5 transition-colors
                md:grid ${viewMode === 'split' ? 'md:grid-cols-12' : 'md:grid-cols-1'}
                flex flex-col
              `}
                        >
                            {/* Category Cell - Visible as header in mobile or column in desktop */}
                            {viewMode === 'split' && (
                                <div className="md:col-span-3 p-4 md:p-6 bg-charcoal/5 dark:bg-white/5 font-semibold text-charcoal dark:text-white flex items-center border-b md:border-b-0 border-slate/10 dark:border-white/5">
                                    {row.category}
                                </div>
                            )}

                            {/* Content Cells */}
                            <div className={`
                ${viewMode === 'split' ? 'md:col-span-9 md:grid md:grid-cols-2' : 'w-full'}
              `}>
                                <AnimatePresence mode="wait">
                                    {(viewMode === 'split' || viewMode === 'old') && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`
                        p-6 md:p-6 
                        ${viewMode === 'split' ? 'bg-ember/5 dark:bg-ember/10 md:border-r border-slate/10 dark:border-white/5' : 'bg-ember/5 dark:bg-ember/10'}
                      `}
                                        >
                                            {viewMode !== 'split' && (
                                                <div className="font-bold text-ember mb-3 uppercase text-xs tracking-wider">Old World - {row.category}</div>
                                            )}
                                            <ul className="space-y-3">
                                                {row.oldWorld.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate dark:text-slate-gray leading-relaxed">
                                                        <span className="text-ember mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    {(viewMode === 'split' || viewMode === 'ai') && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`
                        p-6 md:p-6 
                        ${viewMode === 'split' ? 'bg-electric/5 dark:bg-electric/10' : 'bg-electric/5 dark:bg-electric/10'}
                      `}
                                        >
                                            {viewMode !== 'split' && (
                                                <div className="font-bold text-electric mb-3 uppercase text-xs tracking-wider">AI-Native - {row.category}</div>
                                            )}
                                            <ul className="space-y-3">
                                                {row.aiNative.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate dark:text-slate-gray leading-relaxed">
                                                        <span className="text-electric mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
