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
        <article className="min-h-screen bg-ash text-charcoal py-24">
            <div className="container-narrow space-y-12">

                {/* SECTION 1: Hero & Colors Bento Box */}
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-charcoal/5 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="lg:col-span-5 relative z-10">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-slate hover:text-charcoal transition-colors mb-8 group font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to About
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                                Brand Style Guide
                            </h1>
                            <p className="text-xl text-slate leading-relaxed">
                                The visual language of Saren.ai. Built on the &quot;Fire Horse&quot; design system — bold, precise, and system-oriented.
                            </p>
                        </div>

                        {/* Colors Grid */}
                        <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                            <ColorCard
                                name="Ember Red"
                                hex="#E34234"
                                variable="--ember-red"
                                className="bg-ember h-32 md:h-40"
                            />
                            <ColorCard
                                name="Charcoal"
                                hex="#1D1D1F"
                                variable="--charcoal-black"
                                className="bg-charcoal h-32 md:h-40"
                            />
                            <ColorCard
                                name="Ash White"
                                hex="#F5F5F7"
                                variable="--ash-white"
                                textColor="text-charcoal"
                                className="bg-ash border border-charcoal/10 h-32 md:h-40"
                            />
                            <ColorCard
                                name="Electric"
                                hex="#457B9D"
                                variable="--electric-blue"
                                className="bg-electric h-32 md:h-40"
                            />
                            <ColorCard
                                name="Copper"
                                hex="#C17D3A"
                                variable="--copper"
                                textColor="text-white"
                                className="bg-copper h-32 md:h-40 lg:col-span-2"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Typography Bento Box */}
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-charcoal/5 shadow-sm">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight">Typography</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Headings */}
                        <div className="bg-ash p-8 rounded-2xl border border-charcoal/5">
                            <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-8">Headings (Sora)</h3>
                            <div className="space-y-8">
                                <div className="border-b border-charcoal/10 pb-6">
                                    <span className="text-slate font-mono text-sm block mb-2">H1</span>
                                    <h1 className="text-4xl md:text-5xl font-bold">Marketing for the messy middle.</h1>
                                </div>
                                <div className="border-b border-charcoal/10 pb-6">
                                    <span className="text-slate font-mono text-sm block mb-2">H2</span>
                                    <h2 className="text-3xl md:text-4xl font-bold">What&apos;s actually going wrong</h2>
                                </div>
                                <div>
                                    <span className="text-slate font-mono text-sm block mb-2">H3</span>
                                    <h3 className="text-2xl font-bold">Failure-based positioning</h3>
                                </div>
                            </div>
                        </div>

                        {/* Body & Mono */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-ash p-8 rounded-2xl border border-charcoal/5 flex-1">
                                <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-6">Body (Sora)</h3>
                                <div className="space-y-6">
                                    <p className="text-xl text-slate text-balance">
                                        <span className="text-charcoal font-bold block mb-2 text-sm font-mono uppercase">Unleaded (lg)</span>
                                        I build growth engines at the intersection of cultural storytelling and systems design.
                                    </p>
                                    <p className="text-base text-slate">
                                        <span className="text-charcoal font-bold block mb-2 text-sm font-mono uppercase">Regular (base)</span>
                                        Most teams think they have a traffic problem. They usually have a clarity problem. The value proposition isn&apos;t painfully clear. The site speaks in generic ambition instead of naming a specific failure.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-charcoal text-ash p-8 rounded-2xl flex-1">
                                <h3 className="text-sm font-mono text-ember uppercase tracking-wider mb-6">Mono (JetBrains)</h3>
                                <div className="font-mono space-y-2 text-sm overflow-x-auto">
                                    <p><span className="text-ember">const</span> <span className="text-electric">mission</span> = <span className="text-copper">&quot;Fix the invisible leaks&quot;</span>;</p>
                                    <p><span className="text-ember">if</span> (growth === <span className="text-copper">&quot;stalled&quot;</span>) {"{"}</p>
                                    <div className="pl-4 text-slate">
                                        <p>// Check positioning first</p>
                                        <p>return <span className="text-electric">betterSignal()</span>;</p>
                                    </div>
                                    <p>{"}"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Article Formatting (Prose) */}
                        <div className="lg:col-span-2 bg-ash p-8 rounded-2xl border border-charcoal/5">
                            <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-8">Articles (Tailwind Prose)</h3>
                            <article className="prose prose-slate prose-lg max-w-none bg-white p-8 md:p-12 rounded-xl border border-charcoal/5 shadow-sm">
                                <h2>Standardizing the B2B Article Structure</h2>
                                <p className="lead">
                                    Blog posts and thought leadership should follow a consistent semantic structure. The <code>.prose</code> setup guarantees identical spacing across pages.
                                </p>
                                <p>
                                    We rely on typography and layout, rather than disruptive colors, to establish hierarchy. This means avoiding custom override classes like <code>text-zinc-900</code> within articles, allowing the global design system to handle theme switching seamlessly.
                                </p>
                                <h3>Data and Lists</h3>
                                <p>
                                    When citing frameworks or statistics, bulleted structures work best:
                                </p>
                                <ul>
                                    <li><strong>Named frameworks.</strong> Give your ideas proper nouns.</li>
                                    <li><strong>Original synthesis.</strong> Don&apos;t just regurgitate third-party stats.</li>
                                </ul>
                                <blockquote>
                                    &quot;Zero-click authority is the new share of voice.&quot;
                                </blockquote>
                            </article>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: UI Elements Bento Box */}
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-charcoal/5 shadow-sm">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight">UI Elements</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Buttons */}
                        <div className="bg-ash p-8 rounded-2xl border border-charcoal/5 flex flex-col items-center justify-center gap-6 lg:col-span-2">
                            <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-2 w-full text-left">Buttons</h3>
                            <div className="flex flex-wrap items-center justify-center gap-6 w-full h-full">
                                <button className="btn-primary">
                                    Primary Action
                                </button>
                                <button className="btn-secondary">
                                    Secondary Action
                                </button>
                            </div>
                        </div>

                        {/* Forms */}
                        <div className="bg-ash p-8 rounded-2xl border border-charcoal/5 lg:col-span-2">
                            <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-6">Text Inputs</h3>
                            <div className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="w-full p-4 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition-all shadow-sm bg-white"
                                />
                                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-electric ring-2 ring-electric/20 shadow-sm">
                                    <div className="w-2.5 h-2.5 rounded-full bg-electric animate-pulse"></div>
                                    <span className="text-charcoal text-sm font-medium">Active Focus State</span>
                                </div>
                            </div>
                        </div>

                        {/* Tags / Badges */}
                        <div className="bg-ash p-8 rounded-2xl border border-charcoal/5 lg:col-span-2">
                            <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-6">Badges & Indicators</h3>
                            <div className="flex flex-wrap gap-4">
                                <span className="inline-flex flex-col gap-2">
                                    <span className="px-3 py-1.5 bg-ember/10 text-ember rounded-lg text-sm font-bold tracking-wide">NEW FEATURE</span>
                                    <span className="text-xs font-mono text-slate text-center">Primary</span>
                                </span>
                                <span className="inline-flex flex-col gap-2">
                                    <span className="px-3 py-1.5 bg-electric/10 text-electric rounded-lg text-sm font-bold tracking-wide">IN PROGRESS</span>
                                    <span className="text-xs font-mono text-slate text-center">Secondary</span>
                                </span>
                                <span className="inline-flex flex-col gap-2">
                                    <span className="px-3 py-1.5 bg-charcoal/5 text-charcoal rounded-lg text-sm font-bold tracking-wide border border-charcoal/10">ARCHIVED</span>
                                    <span className="text-xs font-mono text-slate text-center">Neutral</span>
                                </span>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="bg-ash p-8 rounded-2xl border border-charcoal/5 lg:col-span-2">
                            <h3 className="text-sm font-mono text-slate uppercase tracking-wider mb-6">Interactive Elements</h3>
                            <div className="flex flex-col justify-center h-full gap-6 pb-6">
                                <label className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-xl border border-charcoal/5 shadow-sm">
                                    <span className="font-medium text-charcoal">Enable analytics</span>
                                    <div className="relative">
                                        <div className="block bg-electric w-12 h-6 rounded-full"></div>
                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform translate-x-6"></div>
                                    </div>
                                </label>
                                <label className="flex items-center justify-between cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                                    <span className="font-medium text-charcoal">Send notifications</span>
                                    <div className="relative">
                                        <div className="block bg-charcoal/20 w-12 h-6 rounded-full"></div>
                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </article>
    );
}
