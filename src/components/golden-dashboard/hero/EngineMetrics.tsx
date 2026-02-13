"use client";

import React from "react";
import { ComputedModel, formatPercent } from "@/lib/golden-dashboard";
import { Activity, MousePointer2, Users, Target, Filter } from "lucide-react";
import CountingNumber from "@/components/ui/CountingNumber";
import { motion } from "framer-motion";

interface EngineMetricsProps {
    model: ComputedModel;
}

export default function EngineMetrics({ model }: EngineMetricsProps) {
    return (
        <div className="h-full bg-background-secondary/80 backdrop-blur-xl border border-border rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden shadow-sm transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric/0 via-electric/50 to-electric/0 opacity-30" />

            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-electric/10 rounded-lg text-electric shadow-lg shadow-electric/10">
                    <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Funnel Metrics
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {/* Row 1: Top of Funnel */}
                <MetricCard
                    label="Impressions"
                    icon={<Activity className="w-3 h-3" />}
                    value={model.stages.impressions}
                    subtext="Reach"
                    delay={0}
                />

                <MetricCard
                    label="Clicks"
                    icon={<MousePointer2 className="w-3 h-3" />}
                    value={model.stages.clicks}
                    subtext={`${formatPercent(model.conversionRates.ctr)} CTR`}
                    delay={0.1}
                />

                {/* Row 2: Mid Funnel */}
                <MetricCard
                    label="Leads"
                    icon={<Users className="w-3 h-3" />}
                    value={model.stages.leads}
                    subtext={`${formatPercent(model.conversionRates.clickToLead)} CVR`}
                    delay={0.2}
                />

                {/* NEW: MQL Card */}
                <MetricCard
                    label="MQLs"
                    icon={<Filter className="w-3 h-3" />}
                    value={model.stages.mqls}
                    subtext={`${formatPercent(model.conversionRates.leadToMql)} Qual Rate`}
                    delay={0.25}
                />

                {/* Row 3: Bottom Funnel (Feature Card) */}
                <div className="col-span-2">
                    <MetricCard
                        label="Sales Qualified Leads (SQLs)"
                        icon={<Target className="w-4 h-4" />}
                        value={model.stages.sqls}
                        subtext={`${formatPercent(model.conversionRates.mqlToSql)} Accept Rate`}
                        highlight
                        delay={0.3}
                        trend={[5, 8, 12, 15, 18, 22, 25, 28, 30, 35]}
                    />
                </div>
            </div>
        </div>
    );
}

// --- Sub-Component: Metric Card ---

interface MetricCardProps {
    label: string;
    icon: React.ReactNode;
    value: number;
    subtext: string;
    highlight?: boolean;
    delay?: number;
    trend?: number[];
    format?: (v: number) => string;
}

function MetricCard({ label, icon, value, subtext, highlight, delay, trend, format }: MetricCardProps) {
    // Default formatter: commas for integers
    const defaultFormat = (v: number) => Math.round(v).toLocaleString();
    const formatter = format || defaultFormat;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            className={`
                relative p-4 rounded-2xl border transition-all group overflow-hidden flex flex-col justify-between
                ${highlight
                    ? "bg-electric/10 border-electric/40 min-h-[120px] shadow-lg shadow-electric/5"
                    : "bg-card-bg/50 border-border hover:border-border-hover min-h-[100px]"}
            `}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-foreground-muted font-semibold text-[11px] uppercase tracking-wide">
                    {icon}
                    {label}
                </div>
                {highlight && trend && (
                    <div className="w-12 h-6 opacity-80">
                        <Sparkline data={trend} color="var(--electric-blue)" />
                    </div>
                )}
            </div>

            <div>
                <div className={`font-mono font-bold text-foreground group-hover:text-electric transition-colors ${highlight ? "text-3xl" : "text-2xl"}`}>
                    <CountingNumber value={value} format={formatter} />
                </div>
                <div className="text-xs text-electric font-semibold mt-1">
                    {subtext}
                </div>
            </div>

            {highlight && (
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-electric/20 rounded-full blur-2xl group-hover:bg-electric/30 transition-colors" />
            )}
        </motion.div>
    )
}

function Sparkline({ data, color }: { data: number[], color: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    // Create points string
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((val - min) / range) * 100;
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <motion.polyline
                fill="none"
                stroke={color}
                strokeWidth="3"
                points={points}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
        </svg>
    )
}
