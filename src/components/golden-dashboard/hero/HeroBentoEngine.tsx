"use client";

import React, { useState, useMemo, useEffect } from "react";
import EngineInputs from "./EngineInputs";
import EngineMetrics from "./EngineMetrics";
import EngineOutcomes from "./EngineOutcomes";
import PipelineConnector from "./PipelineConnector";
import GuidedLogicOverlay from "./GuidedLogicOverlay";
import { computeModel, defaultAssumptions } from "@/lib/golden-dashboard";
import { Info, Share2, Check } from "lucide-react";
import type { Assumptions } from "@/lib/golden-dashboard";

// Constants
const FIXED_CPM = 60; // $60 CPM baseline
const DEFAULT_ACV = 25000; // $25k Average Contract Value

export default function HeroBentoEngine() {
    // --- Local State for "Hero" Inputs ---
    const [inputs, setInputs] = useState({
        monthlyBudget: 100000,
        targetCpc: 2.86,
        targetCpl: 43.33,
        acv: DEFAULT_ACV,
    });

    // --- UI State ---
    const [pulseTrigger, setPulseTrigger] = useState(0);
    const [showGuide, setShowGuide] = useState(false);
    const [copied, setCopied] = useState(false);

    // --- Hydrate from URL on Mount ---
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const budget = params.get("budget");
            const cpc = params.get("cpc");
            const cpl = params.get("cpl");
            const acv = params.get("acv");

            if (budget || cpc || cpl || acv) {
                setInputs(prev => ({
                    monthlyBudget: budget ? Number(budget) : prev.monthlyBudget,
                    targetCpc: cpc ? Number(cpc) : prev.targetCpc,
                    targetCpl: cpl ? Number(cpl) : prev.targetCpl,
                    acv: acv ? Number(acv) : prev.acv,
                }));
            }
        }
    }, []);

    // --- Derived Assumptions for the Model ---
    const derivedAssumptions: Assumptions = useMemo(() => {
        const safeCpc = Math.max(inputs.targetCpc, 0.01);
        const derivedCtr = (FIXED_CPM / 1000) / safeCpc;
        const safeCpl = Math.max(inputs.targetCpl, 0.01);
        const derivedClickToLead = safeCpc / safeCpl;

        return {
            ...defaultAssumptions,
            spend: inputs.monthlyBudget,
            cpm: FIXED_CPM,
            ctr: derivedCtr,
            clickToLead: derivedClickToLead,
            leadToMql: defaultAssumptions.leadToMql,
            mqlToSql: defaultAssumptions.mqlToSql,
            sqlToOpp: defaultAssumptions.sqlToOpp,
            oppToClose: defaultAssumptions.oppToClose,
        };
    }, [inputs]);

    // --- Compute the Model ---
    const model = computeModel(derivedAssumptions);

    // --- Handlers ---
    const handleInputChange = (field: keyof typeof inputs, value: number) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
        setPulseTrigger((prev) => prev + 1);
    };

    const handleShare = () => {
        const params = new URLSearchParams();
        params.set("budget", inputs.monthlyBudget.toString());
        params.set("cpc", inputs.targetCpc.toString());
        params.set("cpl", inputs.targetCpl.toString());
        params.set("acv", inputs.acv.toString());

        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- Theme Toggle (Temp) ---
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <section className="relative w-full bg-background text-foreground pb-12 overflow-hidden min-h-[800px] flex items-center justify-center transition-colors duration-500">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background -z-10" />
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Guided Logic Overlay */}
            {showGuide && <GuidedLogicOverlay onDismiss={() => setShowGuide(false)} />}

            <div className="container px-4 md:px-6 py-12 relative">

                {/* The 3-Column Engine Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative max-w-[1400px] mx-auto">

                    {/* Header Row (Top Left Alignment as requested) */}
                    <div className="col-span-1 lg:col-span-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20">
                        <div className="max-w-2xl">
                            <nav className="mb-4 flex text-xs font-mono tracking-widest text-foreground-muted/60 uppercase">
                                <ol className="flex items-center gap-2">
                                    <li>Home</li>
                                    <li>/</li>
                                    <li>Portfolio</li>
                                    <li>/</li>
                                    <li className="text-ember">Demand Economics Lab</li>
                                </ol>
                            </nav>
                            <div className="flex items-center gap-4 mb-3">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                                    ROI Simulator
                                </h1>
                                <button
                                    onClick={() => setShowGuide(true)}
                                    className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-electric transition-colors"
                                    title="Start Guided Tour"
                                >
                                    <Info className="w-5 h-5" />
                                </button>
                                {/* Temp Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="px-3 py-1 text-xs border border-border rounded-full hover:bg-foreground/5 transition-colors"
                                >
                                    Toggle Theme
                                </button>
                            </div>
                            <p className="text-lg text-foreground-muted max-w-xl leading-relaxed">
                                Map the friction between ad spend and revenue. Adjust the levers below to find your growth engine&apos;s Golden Ratio.
                            </p>
                        </div>

                        {/* Export / Share Button */}
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/5 border border-border hover:bg-foreground/10 hover:border-foreground/20 transition-all text-sm font-medium text-foreground"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                            {copied ? "Link Copied" : "Share Scenario"}
                        </button>
                    </div>

                    {/* Connector Overlay (Desktop) */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 mt-32">
                        <PipelineConnector trigger={pulseTrigger} />
                    </div>

                    {/* Mobile Vertical Connector Line */}
                    <div className="absolute left-8 top-32 bottom-32 w-0.5 bg-gradient-to-b from-electric/20 via-ember/20 to-transparent lg:hidden -z-10" />

                    {/* Column 1: Inputs (Span 3) */}
                    <div className="lg:col-span-3 z-10 relative">
                        {/* Mobile Label overlap fix */}
                        <EngineInputs
                            inputs={inputs}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Column 2: Funnel Metrics (Span 5) */}
                    <div className="lg:col-span-5 z-10 flex flex-col justify-center relative">
                        <EngineMetrics model={model} />
                    </div>

                    {/* Column 3: Outcomes (Span 4) */}
                    <div className="lg:col-span-4 z-10 relative">
                        <EngineOutcomes
                            model={model}
                            acv={inputs.acv}
                            spend={inputs.monthlyBudget}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
