"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuthorityProcessNavigator from "@/components/agentic-web/AuthorityProcessNavigator";

const checklist = [
    {
        title: "Named frameworks",
        body: "Give an idea a proper noun. \"The Zero to GTM Motion Playbook\" is citable. \"Some thoughts on go-to-market\" is not.",
    },
    {
        title: "Structured argumentation",
        body: "A model reads cleanly through thesis, then evidence, then implication. Write like a case is being made, not a thought being mused.",
    },
    {
        title: "Original data or synthesis",
        body: "Repeating someone else's numbers gets them cited, not you. Pull from real work, anonymized, or synthesize primary research nobody else has done.",
    },
    {
        title: "Consistent publishing cadence",
        body: "One strong piece doesn't build authority, a body of work does. A model pattern-matches across the whole corpus, so a consistent point of view is what becomes recognizable.",
    },
    {
        title: "Structured metadata and semantic markup",
        body: "Technical SEO still matters, but now it means schema markup, clear entity relationships, and content that answers one specific question cleanly, not keyword density.",
    },
];

export default function AuthorityEngineeringClient() {
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
                        The agentic web · Layer 02 method
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-3xl"
                    >
                        From clicks <span className="text-gradient">to citations</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed"
                    >
                        How to build B2B authority content that a retrieval model actually
                        cites, not just a search engine ranks.
                    </motion.p>
                </div>
            </section>

            {/* ── Philosophy ────────────────────────────────────────────────────── */}
            <section className="section py-8 md:py-12 bg-card border-y border-border">
                <div className="container-narrow">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto text-center font-medium"
                    >
                        Content isn&apos;t only written for people anymore. A model reads it
                        once, on a buyer&apos;s behalf, and either cites it or forgets it.
                        Structured, verifiable, well-attributed content is what moves a page
                        from search result to primary source.
                    </motion.p>
                </div>
            </section>

            {/* ── Interactive Process ───────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">The engineering process</h2>
                        <p className="text-foreground-muted">A 6-step system for building citable authority.</p>
                    </motion.div>
                    <AuthorityProcessNavigator />
                </div>
            </section>

            {/* ── What LLM-ready content actually looks like ────────────────────── */}
            <section className="section bg-card">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What LLM-ready content actually looks like
                        </h2>
                        <p className="text-foreground-muted text-lg leading-relaxed">
                            Writing a think-piece and hoping a model finds it isn&apos;t a
                            strategy. This is what makes content citable in practice.
                        </p>
                    </motion.div>

                    <div className="space-y-5 max-w-2xl">
                        {checklist.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="pl-5 border-l-2 border-ember/40"
                            >
                                <h3 className="font-bold mb-1">{item.title}</h3>
                                <p className="text-foreground-muted leading-relaxed">{item.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── The strategic flip ────────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The strategic flip</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl bg-card p-6 md:p-8 rounded-2xl border border-border flex flex-col gap-6"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            <span className="px-3 py-1 rounded-full bg-foreground/10 text-xs font-bold uppercase tracking-wider shrink-0 self-start mt-1">
                                Old method
                            </span>
                            <p className="text-foreground-muted flex-1 leading-relaxed pt-1">
                                Write content, hope humans find it, nurture them into buyers.
                            </p>
                        </div>
                        <div className="h-px w-full bg-border" />
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            <span className="px-3 py-1 rounded-full bg-lavender/10 text-lavender text-xs font-bold uppercase tracking-wider shrink-0 self-start mt-1">
                                New reality
                            </span>
                            <p className="text-foreground font-medium flex-1 leading-relaxed pt-1">
                                Build a citable body of work, get referenced by AI systems, show
                                up while a buyer is actively researching, earn trust before the
                                first conversation.
                            </p>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-foreground-muted text-lg leading-relaxed max-w-2xl mt-8"
                    >
                        The funnel didn&apos;t disappear. It got a new top.
                    </motion.p>
                </div>
            </section>

            {/* ── Layer tie-in ──────────────────────────────────────────────────── */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-ember">
                            This is Layer 02 method
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Authority engineering is Machine Readability, applied
                        </h2>
                        <p className="text-ash/80 text-lg leading-relaxed mb-6">
                            This process is one concrete method inside the layer that makes a
                            business legible to a retrieval model: entity definition, named
                            frameworks, structured argument, citable claims. It&apos;s not a
                            standalone content trick, it&apos;s how Layer 02 actually gets built.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/agentic-web/machine-readability" className="btn-lavender inline-flex items-center gap-2">
                                Read Layer 02 <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/agentic-web" className="text-sm text-ash/70 hover:text-ash transition-colors self-center">
                                or the pillar page
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Closing CTA ────────────────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-foreground-muted text-lg max-w-xl mx-auto mb-8"
                    >
                        Most competitors haven&apos;t started building this yet. That&apos;s
                        the window.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="flex flex-wrap justify-center items-center gap-4"
                    >
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                            Talk it through <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
