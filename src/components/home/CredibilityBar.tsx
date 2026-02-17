"use client";

import { motion } from "framer-motion";

const metrics = [
    { label: "Exits", value: "3" },
    { label: "Cylance Exit", value: "$1.4B" },
    { label: "Pipeline Growth", value: "550%" },
    { label: "CAC Reduction", value: "70%" },
    { label: "Lead Growth (WethosAI)", value: "344%" },
];

export default function CredibilityBar() {
    return (
        <div className="w-full bg-charcoal/5 dark:bg-white/5 border-y border-charcoal/10 dark:border-white/10 py-6 overflow-hidden">
            <div className="container-narrow">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-8 gap-y-4">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                            className="flex items-baseline gap-2"
                        >
                            <span className="text-xl md:text-2xl font-bold text-ember font-mono">
                                {metric.value}
                            </span>
                            <span className="text-xs md:text-sm font-medium text-slate uppercase tracking-wide">
                                {metric.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
