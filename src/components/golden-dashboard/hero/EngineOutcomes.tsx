"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ComputedModel } from "@/lib/golden-dashboard";
import { TrendingUp, DollarSign } from "lucide-react";
import CountingNumber from "@/components/ui/CountingNumber";

interface EngineOutcomesProps {
    model: ComputedModel;
    acv: number;
    spend: number;
}

export default function EngineOutcomes({ model, acv, spend }: EngineOutcomesProps) {
    const revenue = model.stages.closed_won * acv;
    const roi = spend > 0 ? ((revenue - spend) / spend) : 0;
    const roas = spend > 0 ? (revenue / spend) : 0;

    // Flash Animation Logic
    const glowControls = useAnimation();
    const [prevRevenue, setPrevRevenue] = useState(revenue);

    useEffect(() => {
        if (revenue > prevRevenue) {
            // Trigger Flash/Bloom
            glowControls.start({
                opacity: [0, 0.6, 0],
                scale: [1, 1.2, 1],
                transition: { duration: 0.8, ease: "easeOut" }
            });
        }
        setPrevRevenue(revenue);
    }, [revenue, prevRevenue, glowControls]);

    return (
        <div className="h-full bg-gradient-to-br from-background-secondary/80 to-ember/5 backdrop-blur-xl border border-ember/20 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-black/10 transition-colors duration-500">
            {/* Ambient Glows */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-ember/10 rounded-full blur-3xl pointer-events-none group-hover:bg-ember/20 transition-colors duration-500" />

            {/* Flash / Bloom Overlay */}
            <motion.div
                animate={glowControls}
                initial={{ opacity: 0 }}
                className="absolute inset-0 bg-ember/20 mix-blend-overlay pointer-events-none z-0"
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 bg-ember/10 rounded-lg text-ember shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-ember uppercase tracking-wider text-shadow-ember">
                    Business Outcomes
                </h3>
            </div>

            <div className="space-y-10 relative z-10 flex-1 flex flex-col justify-center">
                {/* Primary Metric: Revenue */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-ember/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="text-xs text-foreground-muted uppercase tracking-widest mb-3 font-bold">
                        Estimated Revenue
                    </div>

                    <div className="flex items-baseline gap-2 relative">
                        <motion.div
                            className="text-4xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-ember via-orange-400 to-ember bg-[length:200%_auto] animate-shine drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            $<CountingNumber value={revenue} format={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 0 })} />
                        </motion.div>
                    </div>

                    <div className="text-sm text-foreground-muted/80 mt-2 font-mono flex items-center gap-2 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                        Based on ${acv.toLocaleString()} ACV
                    </div>
                </div>

                {/* Secondary Metric: ROI & ROAS */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <OutcomeCard
                        label="ROI"
                        value={roi}
                        format={(v) => `${(v * 100).toFixed(0)}%`}
                        icon={<TrendingUp className="w-4 h-4" />}
                    />
                    <OutcomeCard
                        label="ROAS"
                        value={roas}
                        format={(v) => `${v.toFixed(2)}x`}
                        icon={<DollarSign className="w-4 h-4" />}
                    />
                </div>
            </div>
        </div>
    );
}

function OutcomeCard({ label, value, format, icon }: { label: string, value: number, format: (v: number) => string, icon: React.ReactNode }) {
    return (
        <div className="p-5 bg-card-bg/50 rounded-2xl border border-ember/20 backdrop-blur-sm transition-all hover:bg-ember/10 hover:border-ember/30 group/card">
            <div className="flex items-center gap-2 text-ember text-xs font-bold uppercase tracking-wide mb-2 group-hover/card:text-ember-300 transition-colors">
                {icon} {label}
            </div>
            <div className="text-3xl font-mono font-bold text-foreground text-shadow-sm group-hover/card:text-ember transition-colors">
                <CountingNumber value={value} format={format} />
            </div>
        </div>
    )
}
