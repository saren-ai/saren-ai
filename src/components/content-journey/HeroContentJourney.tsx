"use client";

import React, { useState } from "react";
import Link from "next/link";
import JourneyMatrix from "./JourneyMatrix";
import { enterpriseMatrix } from "@/lib/content-journey";

export default function HeroContentJourney() {
    return (
        <section className="relative w-full bg-background text-foreground overflow-hidden min-h-[800px] flex items-center justify-center pt-24 pb-20">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background -z-10" />
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Header Section */}
                    <div className="lg:col-span-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="max-w-2xl">
                            <nav className="mb-4 flex text-xs font-mono tracking-widest text-foreground-muted/60 uppercase">
                                <ol className="flex items-center gap-2">
                                    <li>Home</li>
                                    <li>/</li>
                                    <li>Portfolio</li>
                                    <li>/</li>
                                    <li className="text-ember">120-Day Content Journey</li>
                                </ol>
                            </nav>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-4">
                                120-Day Content Journey
                            </h1>
                            <p className="text-lg text-foreground-muted max-w-xl leading-relaxed">
                                A strategic framework for engineering demand. From problem awareness to closed-won, see how content evolves across the buyer journey.
                            </p>
                        </div>
                    </div>

                    {/* Main Matrix Area */}
                    <div className="lg:col-span-12 w-full bg-card-bg/50 border border-border rounded-xl backdrop-blur-sm p-4 md:p-6 overflow-hidden">
                        <JourneyMatrix data={enterpriseMatrix} />
                    </div>

                </div>
            </div>
        </section>
    );
}
