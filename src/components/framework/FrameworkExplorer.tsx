"use client";

import { useState } from "react";
import { FRAMEWORK_PROMPTS, FrameworkPrompt } from "@/data/marketing-framework";
import SitemapVisualizer from "./SitemapVisualizer";
import CodeWindow from "./CodeWindow";

export default function FrameworkExplorer() {
    const [selectedPrompt, setSelectedPrompt] = useState<FrameworkPrompt>(FRAMEWORK_PROMPTS[0]);

    return (
        <section className="relative w-full bg-background text-foreground overflow-hidden min-h-screen flex flex-col transition-colors duration-500">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background -z-10" />

            {/* Ambient Blobs */}
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container-fluid pt-8 flex-1 flex flex-col h-full max-w-[1600px] mx-auto">

                {/* Header */}
                <div className="px-4 md:px-6 mb-6 text-center">
                    <nav className="mb-2 inline-flex text-xs font-mono tracking-widest text-foreground-muted/60 uppercase">
                        <ol className="flex items-center gap-2">
                            <li>Home</li>
                            <li>/</li>
                            <li>Portfolio</li>
                            <li>/</li>
                            <li className="text-ember">B2B Marketing Framework</li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-2">
                        B2B Messaging Framework
                    </h1>
                    <p className="text-foreground-muted text-sm md:text-base max-w-2xl mx-auto">
                        Use the map below to navigate the 23-step buyer journey.
                    </p>
                </div>

                {/* Sitemap Navigation (Top) */}
                <div className="border-t border-b border-white/10 bg-background/50 backdrop-blur-sm">
                    <SitemapVisualizer
                        prompts={FRAMEWORK_PROMPTS}
                        selectedId={selectedPrompt.id}
                        onSelect={setSelectedPrompt}
                    />
                </div>

                {/* Code Window (Bottom) */}
                <div className="flex-1 p-4 md:p-6 lg:p-8 bg-background-secondary/30">
                    <div className="h-[600px] lg:h-[800px] max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
                        <CodeWindow prompt={selectedPrompt} />
                    </div>
                </div>

            </div>
        </section>
    );
}
