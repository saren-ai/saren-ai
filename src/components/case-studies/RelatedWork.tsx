"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { getRelatedWork } from "@/lib/portfolio-data";

interface RelatedWorkProps {
    currentHref: string;
}

export default function RelatedWork({ currentHref }: RelatedWorkProps) {
    const relatedItems = getRelatedWork(currentHref);

    if (relatedItems.length === 0) return null;

    return (
        <section className="section bg-ash dark:bg-background border-t border-charcoal/5 dark:border-white/5">
            <div className="container-narrow">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-bold text-charcoal dark:text-foreground">
                        Related Work
                    </h3>
                    <Link
                        href="/portfolio"
                        className="text-electric font-medium hover:text-ember transition-colors flex items-center gap-1 group"
                    >
                        View Portfolio
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {relatedItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PortfolioCard
                                {...item}
                                index={index}
                                variant="case_study"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
