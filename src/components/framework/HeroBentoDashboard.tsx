"use client";

import { useState } from "react";
import { FrameworkPrompt, FRAMEWORK_PROMPTS } from "@/data/marketing-framework";
import BentoCard from "./BentoCard";
import PromptModal from "./PromptModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function HeroBentoDashboard() {
    const [selectedPrompt, setSelectedPrompt] = useState<FrameworkPrompt | null>(null);

    return (
        <section className="relative w-full bg-background text-foreground pb-12 overflow-hidden min-h-[800px] flex items-center justify-center transition-colors duration-500">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background -z-10" />
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container px-4 md:px-6 py-12 relative">

                {/* Header Section */}
                <div className="col-span-1 lg:col-span-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20">
                    <div className="max-w-2xl">
                        <nav className="mb-4 flex text-xs font-mono tracking-widest text-foreground-muted/60 uppercase">
                            <ol className="flex items-center gap-2">
                                <li>Home</li>
                                <li>/</li>
                                <li>Portfolio</li>
                                <li>/</li>
                                <li className="text-ember">B2B Marketing Framework</li>
                            </ol>
                        </nav>
                        <div className="flex items-center gap-4 mb-3">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                                B2B Marketing Framework
                            </h1>
                        </div>
                        <p className="text-lg text-foreground-muted max-w-xl leading-relaxed">
                            A 7-layer prompt matrix for building B2B SaaS messaging infrastructure from scratch—because random acts of content don't compound.
                        </p>
                    </div>
                </div>

                {/* Dense Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 grid-flow-dense relative z-10">
                    {FRAMEWORK_PROMPTS.map((prompt, index) => {
                        // Determine column span based on size prop
                        let colSpan = "md:col-span-1";
                        let rowSpan = "row-span-1";

                        if (prompt.size === "wide") {
                            colSpan = "md:col-span-2";
                        } else if (prompt.size === "featured") {
                            colSpan = "md:col-span-2";
                            rowSpan = "md:row-span-2";
                        } else if (prompt.size === "tall") {
                            rowSpan = "md:row-span-2";
                        }

                        return (
                            <motion.div
                                key={prompt.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.02 }}
                                className={`${colSpan} ${rowSpan}`}
                            >
                                <BentoCard
                                    prompt={prompt}
                                    onClick={() => setSelectedPrompt(prompt)}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Modal */}
                <PromptModal
                    prompt={selectedPrompt}
                    isOpen={!!selectedPrompt}
                    onClose={() => setSelectedPrompt(null)}
                />
            </div>
        </section>
    );
}
