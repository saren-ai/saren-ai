"use client";

import { useState } from "react";
import { FrameworkPrompt, FRAMEWORK_PROMPTS } from "@/data/marketing-framework";
import BentoCard from "./BentoCard";
import PromptModal from "./PromptModal";
import { motion } from "framer-motion";

export default function BentoGrid() {
    const [selectedPrompt, setSelectedPrompt] = useState<FrameworkPrompt | null>(null);

    return (
        <section className="py-24 px-4 md:px-6 bg-[#0F0F0F]">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-electric/30 bg-electric/5 text-electric text-sm font-mono font-bold mb-6"
                    >
                        THE FRAMEWORK DATABASE
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Explore the Code
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate"
                    >
                        21 battle-tested prompts structured by strategic level. Click any card to view the source code and implementation logic.
                    </motion.p>
                </div>

                {/* CSS Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(280px,auto)] gap-6">
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
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
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
