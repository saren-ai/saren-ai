"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

const ColorCard = ({
    name,
    hex,
    variable,
    textColor = "text-white",
    className,
}: {
    name: string;
    hex: string;
    variable: string;
    textColor?: string;
    className?: string;
}) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl relative group cursor-pointer ${className}`}
            onClick={copyToClipboard}
        >
            <div className="flex justify-between items-start mb-8">
                <span className={`font-mono text-sm opacity-60 ${textColor}`}>{variable}</span>
                {copied ? (
                    <Check className={`w-4 h-4 ${textColor}`} />
                ) : (
                    <Copy className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${textColor}`} />
                )}
            </div>
            <div>
                <h3 className={`text-2xl font-bold mb-1 ${textColor}`}>{name}</h3>
                <p className={`font-mono opacity-80 ${textColor}`}>{hex}</p>
            </div>
        </motion.div>
    );
};

export default function BrandClient() {
    return (
        <article className="min-h-screen bg-ash text-charcoal pb-24">
            {/* Header */}
            <div className="pt-24 pb-12 bg-white/50 border-b border-charcoal/5">
                <div className="container-narrow">
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-slate hover:text-charcoal transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to About
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Brand Style Guide
                    </h1>
                    <p className="text-xl text-slate max-w-2xl">
                        The visual language of Saren.ai. Built on the "Fire Horse" design system — bold, precise, and system-oriented.
                    </p>
                </div>
            </div>

            <div className="container-narrow py-12">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Primary Colors - EMBER */}
                    <div className="md:col-span-2 md:row-span-2">
                        <ColorCard
                            name="Ember Red"
                            hex="#E34234"
                            variable="--ember-red"
                            className="bg-ember h-full"
                        />
                    </div>

                    {/* Primary Colors - CHARCOAL */}
                    <div className="md:col-span-2">
                        <ColorCard
                            name="Charcoal"
                            hex="#1D1D1F"
                            variable="--charcoal-black"
                            className="bg-charcoal h-full"
                        />
                    </div>

                    {/* Primary Colors - ASH */}
                    <div className="md:col-span-1">
                        <ColorCard
                            name="Ash White"
                            hex="#F5F5F7"
                            variable="--ash-white"
                            textColor="text-charcoal"
                            className="bg-ash border border-charcoal/10 h-full"
                        />
                    </div>
                    {/* Accent - COPPER */}
                    <div className="md:col-span-1">
                        <ColorCard
                            name="Copper"
                            hex="#C17D3A"
                            variable="--copper"
                            textColor="text-white"
                            className="bg-copper h-full"
                        />
                    </div>


                    {/* Accent - ELECTRIC */}
                    <div className="md:col-span-1 md:row-span-2">
                        <ColorCard
                            name="Electric"
                            hex="#457B9D"
                            variable="--electric-blue"
                            className="bg-electric h-full"
                        />
                    </div>

                    {/* Typography - HEADINGS */}
                    <div className="md:col-span-3 bg-white p-8 rounded-2xl border border-charcoal/5">
                        <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-6">Typography — Headings (Sora)</h3>
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-b border-charcoal/5 pb-4">
                                <span className="text-slate font-mono text-sm w-16">H1</span>
                                <h1 className="text-4xl md:text-5xl font-bold">Marketing for the messy middle.</h1>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 border-b border-charcoal/5 pb-4">
                                <span className="text-slate font-mono text-sm w-16">H2</span>
                                <h2 className="text-3xl md:text-4xl font-bold">What’s actually going wrong</h2>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                                <span className="text-slate font-mono text-sm w-16">H3</span>
                                <h3 className="text-2xl font-bold">Failure-based positioning</h3>
                            </div>
                        </div>
                    </div>

                    {/* Typography - BODY */}
                    <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-charcoal/5">
                        <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-6">Typography — Body (Sora)</h3>
                        <div className="space-y-6">
                            <p className="text-xl text-slate leading-relaxed">
                                <span className="text-charcoal font-bold block mb-2 text-sm font-mono uppercase">Unleaded (lg)</span>
                                I build growth engines at the intersection of cultural storytelling and systems design.
                            </p>
                            <p className="text-base text-slate leading-relaxed">
                                <span className="text-charcoal font-bold block mb-2 text-sm font-mono uppercase">Regular (base)</span>
                                Most teams think they have a traffic problem. They usually have a clarity problem. The value proposition isn’t painfully clear. The site speaks in generic ambition instead of naming a specific failure.
                            </p>
                        </div>
                    </div>

                    {/* Typography - MONO */}
                    <div className="md:col-span-2 bg-charcoal text-ash p-8 rounded-2xl">
                        <h3 className="text-sm font-mono text-ember uppercase tracking-wider mb-6">Typography — Mono (JetBrains)</h3>
                        <div className="font-mono space-y-4 text-sm">
                            <p><span className="text-ember">const</span> <span className="text-electric">mission</span> = <span className="text-copper">"Fix the invisible leaks"</span>;</p>
                            <p><span className="text-ember">if</span> (growth === <span className="text-copper">"stalled"</span>) {"{"}</p>
                            <div className="pl-4 text-slate">
                                <p>// Check positioning first</p>
                                <p>return <span className="text-electric">betterSignal()</span>;</p>
                            </div>
                            <p>{"}"}</p>
                        </div>
                    </div>

                    {/* UI Components - Buttons */}
                    <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-charcoal/5 flex flex-col justify-center items-start gap-6">
                        <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-2">UI Elements — Buttons</h3>
                        <div className="flex flex-wrap gap-4">
                            <button className="btn-primary">
                                Primary Action
                            </button>
                            <button className="btn-secondary">
                                Secondary Action
                            </button>
                        </div>
                    </div>

                    {/* UI Components - Input */}
                    <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-charcoal/5 flex flex-col justify-center">
                        <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-4">UI Elements — Forms</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Email address"
                                className="w-full p-3 rounded-lg border border-charcoal/20 focus:border-electric focus:ring-1 focus:ring-electric outline-none transition-all"
                            />
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-ember"></div>
                                <span className="text-slate text-sm">Active State Focus</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
