"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { LayerDefinition, otherLayers } from "@/lib/agentic-web/layers";

export default function LayerPageClient({ layer }: { layer: LayerDefinition }) {
    const related = otherLayers(layer.slug);

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
                        The agentic web · Layer {layer.num}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-3xl"
                    >
                        {layer.name}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed"
                    >
                        {layer.whatThisIs}
                    </motion.p>
                </div>
            </section>

            {/* ── Who reads it ──────────────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-ember">
                            Who reads it
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{layer.reader}</h2>
                        <p className="text-foreground-muted text-lg leading-relaxed">{layer.readerDetail}</p>
                    </motion.div>
                </div>
            </section>

            {/* ── What good looks like ──────────────────────────────────────────── */}
            <section className="section bg-card">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What good looks like</h2>
                    </motion.div>

                    <div className="space-y-3 max-w-2xl">
                        {layer.goodLooksLike.map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3"
                            >
                                <Check className="w-5 h-5 text-ember shrink-0 mt-0.5" />
                                <p className="text-foreground-muted text-lg leading-relaxed">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What it costs you when it's missing ───────────────────────────── */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What it costs you when it&apos;s missing
                        </h2>
                        <p className="text-ash/80 text-lg leading-relaxed">{layer.costOfMissing}</p>
                    </motion.div>
                </div>
            </section>

            {/* ── How I work on it ──────────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">How I work on it</h2>
                        {layer.howIWorkOnIt.map((p) => (
                            <p key={p} className="text-foreground-muted text-lg leading-relaxed mb-4">
                                {p}
                            </p>
                        ))}
                        <Link href={layer.serviceLink.href} className="btn-primary inline-flex items-center gap-2 mt-4">
                            {layer.serviceLink.label} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── Related ────────────────────────────────────────────────────────── */}
            <section className="section bg-card">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">Related</h2>
                        <p className="text-foreground-muted text-lg">
                            The other two layers, and the page that defines all three together.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {related.map((l, i) => (
                            <motion.div
                                key={l.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    href={l.href}
                                    className="card rounded-xl p-6 border border-border block h-full hover:border-ember/40 transition-colors"
                                >
                                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-ember">
                                        Layer {l.num}
                                    </p>
                                    <h3 className="text-lg font-bold">{l.name}</h3>
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: related.length * 0.05 }}
                        >
                            <Link
                                href="/agentic-web"
                                className="card rounded-xl p-6 border border-border block h-full hover:border-ember/40 transition-colors"
                            >
                                <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-lavender">
                                    Pillar page
                                </p>
                                <h3 className="text-lg font-bold">The agentic web</h3>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
