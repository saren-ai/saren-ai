"use client";

import React from "react";
import Link from "next/link";
import { SalesPlayCalendar } from "./SalesPlayCalendar";

export default function HeroSalesPlay() {
    return (
        <section className="relative w-full bg-background text-foreground overflow-hidden min-h-[800px] flex items-center justify-center">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background -z-10" />
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container px-4 md:px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text */}
                    <div className="max-w-2xl">
                        <nav className="mb-6 flex text-xs font-mono tracking-widest text-foreground-muted/60 uppercase">
                            <ol className="flex items-center gap-2">
                                <li>Home</li>
                                <li>/</li>
                                <li>Portfolio</li>
                                <li>/</li>
                                <li className="text-ember">10-Touch Sales Play</li>
                            </ol>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            10-Touch Sales Play
                        </h1>

                        <p className="text-xl text-foreground-muted leading-relaxed mb-8">
                            Turning cold outreach into executive conversations—a systematic approach to multi-channel prospecting that consistently books meetings with decision-makers.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {[
                                "25-Day Sequence",
                                "Multi-Channel",
                                "Value-First",
                                "Executive Relevance"
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-foreground-muted"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Interactive Calendar */}
                    <div className="w-full relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-ember/10 to-electric/10 rounded-2xl blur-xl opacity-50 -z-10" />
                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">The 25-Day Sequence</h3>
                                <span className="text-xs font-mono text-ember bg-ember/10 px-2 py-1 rounded">PROVEN FRAMEWORK</span>
                            </div>
                            <SalesPlayCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
