"use client";

import { useState } from "react";
import { FRAMEWORK_PROMPTS, FrameworkPrompt } from "@/data/marketing-framework";
import SitemapVisualizer from "./SitemapVisualizer";
import CodeWindow from "./CodeWindow";

export default function FrameworkExplorer() {
    const [selectedPrompt, setSelectedPrompt] = useState<FrameworkPrompt>(FRAMEWORK_PROMPTS[0]);

    return (
        <section className="relative w-full bg-background text-foreground overflow-hidden flex flex-col transition-colors duration-500 py-12">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background -z-10" />

            {/* Ambient Blobs */}
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container-fluid flex-1 flex flex-col h-full max-w-[1600px] mx-auto">

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
