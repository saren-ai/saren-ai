"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FAQ from "@/components/ui/FAQ";
import { FAQS } from "@/data/faqs";
import { AGENTIC_WEB_DEFINITION as DEFINITION } from "@/lib/agentic-web/definition";

const regimes = [
    { era: "Directories", body: "Businesses indexed by category. Findable if you were listed." },
    { era: "Search engines", body: "Pages indexed by keyword. Findable if you ranked." },
    { era: "Social graphs", body: "Content surfaced by relationship. Findable if you were shared." },
    { era: "Answer engines", body: "A site read once, on a buyer's behalf, answered without a click. Findable if a model can extract and act on it." },
];

const failures = [
    {
        name: "The seven-second miss",
        layer: "Human Experience",
        body: "A person lands on the site and can't say what the business does before they leave. No narrative, no clear claim, just a wall of category language.",
        symptom: "Symptom: ask someone who's never seen the site to read the homepage for seven seconds, then explain the business back to you. If they can't, neither can a model reading the same page.",
    },
    {
        name: "The record contradicts the page",
        layer: "Machine Readability",
        body: "The schema claims one thing and the visible page shows another, or there's no schema at all. Either way, a model has nothing stable to cite.",
        symptom: "Symptom: ask any AI assistant to describe the business from the site alone. It hedges, gets a fact wrong, or can't answer.",
    },
    {
        name: "No door for an agent",
        layer: "Agent Access",
        body: "Even a model that understands the business correctly has nowhere to send an agent with a task. Everything is gated behind a form built for a human name field.",
        symptom: "Symptom: give an agent a task, like checking pricing or booking a slot, and watch it dead-end on navigation built only for a mouse.",
    },
];

const layers = [
    {
        num: "01",
        name: "Human Experience",
        href: "/agentic-web/human-experience",
        reader: "A person",
        body: "Positioning, narrative, interface. The pitch a reader can restate in their own words.",
    },
    {
        num: "02",
        name: "Machine Readability",
        href: "/agentic-web/machine-readability",
        reader: "A retrieval model",
        body: "Entity definition, schema, named frameworks, structured argument, citable claims.",
    },
    {
        num: "03",
        name: "Agent Access",
        href: "/agentic-web/agent-access",
        reader: "An agent with a task",
        body: "llms.txt, crawler and agent policy, feeds, MCP endpoints, machine-actionable paths.",
    },
];

const boundaries = [
    {
        title: "Not an SEO retainer",
        body: "SEO optimizes for a ranking algorithm and a click. This works on whether an agent can act once it arrives, not just whether the page ranks.",
    },
    {
        title: "Not a content mill",
        body: "More pages isn't the fix. A site with ten accurate, well-structured pages beats one with two hundred pages a model can't trust.",
    },
    {
        title: "Not an \"add schema\" plugin fix",
        body: "Markup that describes content the visible page doesn't actually show is the most common failure in this discipline, and a plugin can't tell the difference between real structure and a lie told to a machine that will check.",
    },
];

export default function AgenticWebClient() {
    return (
        <>
            {/* ── Hero / Definition ─────────────────────────────────────────────── */}
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
                        Built to be read by <span className="text-gradient">people and agents</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed mb-10"
                    >
                        {DEFINITION}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/services/audit" className="btn-primary inline-flex items-center gap-2">
                            Get the agentic readiness audit <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── What changed ──────────────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What changed</h2>
                        <p className="text-foreground-muted text-lg leading-relaxed">
                            Retrieval has changed four times. The interface changed each time. The
                            requirement, being legible to whatever is doing the reading, did not.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {regimes.map((r, i) => (
                            <motion.div
                                key={r.era}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="card rounded-xl p-6 border border-border"
                            >
                                <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-ember">
                                    {String(i + 1).padStart(2, "0")}
                                </p>
                                <h3 className="text-lg font-bold mb-2">{r.era}</h3>
                                <p className="text-sm text-foreground-muted leading-relaxed">{r.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What breaks ───────────────────────────────────────────────────── */}
            <section className="section bg-card">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What breaks</h2>
                        <p className="text-foreground-muted text-lg leading-relaxed">
                            Three failure modes, one per layer. Each is checkable on any site,
                            including this one, in a few minutes.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {failures.map((f, i) => (
                            <motion.div
                                key={f.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="card rounded-xl p-6 border border-border"
                            >
                                <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-lavender">
                                    Breaks Layer {String(i + 1).padStart(2, "0")} · {f.layer}
                                </p>
                                <h3 className="text-xl font-bold mb-2">{f.name}</h3>
                                <p className="text-foreground-muted leading-relaxed mb-3">{f.body}</p>
                                <p className="text-sm text-foreground-muted/80 border-t border-border pt-3">{f.symptom}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── The three layers ──────────────────────────────────────────────── */}
            <section className="section">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The three layers</h2>
                        <p className="text-foreground-muted text-lg leading-relaxed">
                            Fixed names, fixed order. The same three terms in the nav, the
                            services, and every case study on this site.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {layers.map((l, i) => (
                            <motion.div
                                key={l.name}
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
                                        Layer {l.num} · {l.reader}
                                    </p>
                                    <h3 className="text-xl font-bold mb-3">{l.name}</h3>
                                    <p className="text-sm text-foreground-muted leading-relaxed mb-4">{l.body}</p>
                                    <span className="text-sm font-semibold text-ember inline-flex items-center gap-1">
                                        Read Layer {l.num} <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What this is not ──────────────────────────────────────────────── */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What this is not</h2>
                    </motion.div>

                    <div className="space-y-6 max-w-2xl">
                        {boundaries.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <h3 className="text-lg font-bold mb-1">{b.title}</h3>
                                <p className="text-ash/70 leading-relaxed">{b.body}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg font-semibold max-w-2xl mt-10"
                    >
                        The target keeps moving.{" "}
                        <Link href="/agentic-web/standards" className="text-ember underline underline-offset-4">
                            See what changed most recently on this page.
                        </Link>
                    </motion.p>
                </div>
            </section>

            {/* ── FAQ ────────────────────────────────────────────────────────────── */}
            <FAQ
                title="The agentic web, in plain terms"
                description="What actually changes, and what doesn't, for a site trying to work with both people and agents."
                items={FAQS.agenticWeb}
            />

            {/* ── Closing CTA ────────────────────────────────────────────────────── */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-foreground-muted text-lg max-w-xl mx-auto mb-8"
                    >
                        Every term above is defined in one place, with the page it applies to
                        linked from every use.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="flex flex-wrap justify-center items-center gap-4"
                    >
                        <Link href="/services/audit" className="btn-primary">
                            Get the agentic readiness audit
                        </Link>
                        <Link href="/agentic-web/glossary" className="text-sm text-ash/70 hover:text-ash transition-colors">
                            or read the glossary
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
