"use client";

import { useState } from "react";
import { FrameworkPrompt, FRAMEWORK_PROMPTS } from "@/data/marketing-framework";
import BentoCard from "./BentoCard";
import PromptModal from "./PromptModal";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroBentoDashboard() {
    const [selectedPrompt, setSelectedPrompt] = useState<FrameworkPrompt | null>(null);

    return (
        <section className="relative min-h-screen bg-[#0F0F0F] pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-[1400px] mx-auto">

                {/* Header Section */}
                <div className="mb-12">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <ol className="flex items-center gap-2 text-sm text-ash/60">
                            <li>
                                <Link href="/" className="hover:text-ash transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link
                                    href="/portfolio"
                                    className="hover:text-ash transition-colors"
                                >
                                    Portfolio
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-ember">B2B Marketing Framework</li>
                        </ol>
                    </nav>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                            B2B Marketing Framework
                        </h1>
                        <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
                            A 7-layer prompt matrix for building B2B SaaS messaging infrastructure from scratch—because random acts of content don't compound.
                        </p>
                    </div>
                </div>

                {/* Dense Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 grid-flow-dense">
                    {FRAMEWORK_PROMPTS.map((prompt, index) => {
                        // Determine column span based on size prop
                        // Determine column span based on size prop
                        // Prioritize density: 'standard' is 1x1, 'wide' is 2x1, 'featured' is 2x2, 'tall' is 1x2
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
