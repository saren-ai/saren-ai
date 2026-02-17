"use client";

import { motion } from "framer-motion";

interface CaseStudyHeroProps {
    title: string;
    subtitle: string;
    role: string;
    date: string;
    tags?: string[];
}

export default function CaseStudyHero({
    title,
    subtitle,
    role,
    date,
    tags,
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
                    className="max-w-4xl"
                >
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
                </motion.div>
            </div>
        </section>
    );
}
