"use client";

import { motion } from "framer-motion";

interface Metric {
    label: string;
    value: string;
    context?: string;
}

interface OutcomeMetricsProps {
    metrics: Metric[];
}

export default function OutcomeMetrics({ metrics }: OutcomeMetricsProps) {
    return (
        <section className="py-12 border-y border-charcoal/5 bg-charcoal/5 dark:bg-white/5">
            <div className="container-narrow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center md:text-left"
                        >
                            <div className="text-4xl md:text-5xl font-mono font-bold text-ember mb-2">
                                {metric.value}
                            </div>
                            <div className="text-sm font-bold uppercase tracking-wider text-charcoal dark:text-white mb-1">
                                {metric.label}
                            </div>
                            {metric.context && (
                                <div className="text-sm text-slate dark:text-ash/70">
                                    {metric.context}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
