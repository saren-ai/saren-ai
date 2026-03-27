"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface Metric {
    label: string;
    value: string;
    context?: string;
}

interface Action {
    label: string;
    href: string;
    variant: "primary" | "secondary";
}

interface CaseStudyHeroProps {
    title: string;
    subtitle: string;
    role: string;
    date: string;
    tags?: string[];
    metrics?: Metric[];
    actions?: Action[];
}

export default function CaseStudyHero({
    title,
    subtitle,
    role,
    date,
    tags,
    metrics,
    actions,
}: CaseStudyHeroProps) {
    return (
        <section className="hero-card pt-16 pb-16 md:pt-24 md:pb-24 relative bg-white dark:bg-[#161616] border border-[#D2D2D7] dark:border-[#2A2A2A]">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-electric/5 -skew-x-12 transform translate-x-1/2 pointer-events-none -z-10" />

            <div className="container-narrow">
                <Breadcrumb
                    back={{ href: '/portfolio', label: 'Portfolio' }}
                    current="Case Study"
                    className="mb-8"
                />
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

                        {/* Actions */}
                        {actions && actions.length > 0 && (
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                {actions.map((action, index) => (
                                    <Link
                                        key={index}
                                        href={action.href}
                                        className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${action.variant === "primary"
                                            ? "bg-ember text-white hover:bg-ember/90 shadow-lg shadow-ember/20"
                                            : "bg-charcoal/5 dark:bg-white/5 text-charcoal dark:text-white hover:bg-charcoal/10 dark:hover:bg-white/10"
                                            }`}
                                    >
                                        {action.label}
                                    </Link>
                                ))}
                            </div>
                        )}
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
