"use client";

import { motion } from "framer-motion";

interface Metric {
    label: string;
    value: string;
    context?: string;
}

interface CaseStudyHeroProps {
    title: string;
    subtitle: string;
    role: string;
    date: string;
    tags?: string[];
    metrics?: Metric[];
}

export default function CaseStudyHero({
    title,
    subtitle,
    role,
    date,
    tags,
    metrics,
}: CaseStudyHeroProps) {
    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-ash via-ash to-white pointer-events-none -z-10" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-electric/5 -skew-x-12 transform translate-x-1/2 pointer-events-none -z-10" />

            <div className="container-narrow">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start"
                >
                    {/* Main Content (Left, ~70%) */}
                    <div className="lg:col-span-8">
                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-slate mb-6 uppercase tracking-wider">
                            <span className="text-electric font-bold">{role}</span>
                            <span className="w-1 h-1 bg-slate/30 rounded-full" />
                            <span>{date}</span>
                            {tags && tags.length > 0 && (
                                <>
                                    <span className="w-1 h-1 bg-slate/30 rounded-full hidden sm:block" />
                                    <div className="flex gap-2">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-slate/10 text-slate rounded text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
                            {title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-slate max-w-2xl leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    {/* Metrics Block (Right, ~30%) */}
                    {metrics && metrics.length > 0 && (
                        <div className="lg:col-span-4 flex flex-col gap-8 lg:text-center w-full max-w-sm ml-0 lg:ml-auto">
                            {metrics.map((metric, index) => (
                                <div key={index} className="lg:border-l lg:border-charcoal/10 lg:pl-8">
                                    <div className="text-4xl lg:text-5xl font-mono font-bold text-ember mb-1">
                                        {metric.value}
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-charcoal mb-0.5">
                                        {metric.label}
                                    </div>
                                    {metric.context && (
                                        <div className="text-xs text-slate">
                                            {metric.context}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
