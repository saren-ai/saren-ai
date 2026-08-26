"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GLOSSARY } from "@/lib/agentic-web/glossary";

export default function GlossaryClient() {
    return (
        <>
            {/* ── Hero ───────────────────────────────────────────────────────────── */}
            <section className="hero-card section gradient-dark text-ash">
                <div className="container-narrow">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-semibold tracking-widest uppercase text-ember mb-4"
                    >
                        The agentic web
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-3xl"
                    >
                        Glossary
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed"
                    >
                        The vocabulary bridge. What buyers actually search and what this
                        practice calls it, defined in one place, linked to where each term
                        applies.
                    </motion.p>
                </div>
            </section>

            {/* ── Terms ──────────────────────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow">
                    <div className="space-y-6 max-w-3xl">
                        {GLOSSARY.map((entry, i) => (
                            <motion.div
                                key={entry.term}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: Math.min(i, 6) * 0.03 }}
                                id={entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                                className="card rounded-xl p-6 border border-border scroll-mt-24"
                            >
                                <h2 className="text-xl font-bold mb-2">{entry.term}</h2>
                                <p className="text-foreground-muted leading-relaxed mb-3">{entry.definition}</p>
                                <p className="text-sm text-foreground-muted/80 border-t border-border pt-3 mb-3">
                                    <span className="font-semibold text-foreground">In practice: </span>
                                    {entry.inPractice}
                                </p>
                                <Link
                                    href={entry.href}
                                    className="text-sm font-semibold text-ember inline-flex items-center gap-1"
                                >
                                    {entry.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Closing CTA ────────────────────────────────────────────────────── */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-foreground-muted text-lg max-w-xl mx-auto mb-8"
                    >
                        Every term above traces back to the page that puts it into
                        practice, starting with the pillar.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="flex flex-wrap justify-center items-center gap-4"
                    >
                        <Link href="/agentic-web" className="btn-primary">
                            Read the agentic web pillar
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
