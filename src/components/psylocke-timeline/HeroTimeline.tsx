"use client";

import React from "react";
import Link from "next/link";
import InteractiveTimeline from "./InteractiveTimeline";
export default function HeroTimeline() {
    return (
        <section className="relative w-full bg-background text-foreground overflow-hidden min-h-[800px] flex items-center justify-center pt-24 pb-20">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background -z-10" />
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container-wide px-4 md:px-6 relative z-10 flex flex-col items-center">
                {/* Header Section */}
                <div className="w-full max-w-3xl flex flex-col items-center text-center mb-12">
                    <nav className="mb-6 flex text-xs font-mono tracking-widest text-foreground-muted/60 uppercase">
                        <ol className="flex items-center gap-2">
                            <li>Home</li>
                            <li>/</li>
                            <li>Portfolio</li>
                            <li>/</li>
                            <li className="text-ember">Psylocke Timeline</li>
                        </ol>
                    </nav>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-6">
                        Psylocke Backstory Timeline
                    </h1>
                    <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
                        30 years of body-swaps, psychic warfare, and identity reclamation — tracing Betsy Braddock and Kwannon across 27 key comic issues from 1989 to 2019.
                    </p>
                </div>

                {/* Timeline Area */}
                <div className="w-full relative z-20">
                    <InteractiveTimeline />

                    {/* Instructions Below Timeline */}
                    <div className="text-center mt-12 w-full">
                        <span className="inline-block px-3 py-1 bg-ember/10 text-ember text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                            Interactive Archive
                        </span>
                        <p className="text-foreground-muted text-sm max-w-2xl mx-auto">
                            Click any comic cover to explore the issue details. Scroll right to left to follow the chronological history.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
