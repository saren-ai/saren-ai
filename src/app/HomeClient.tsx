"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CredibilityBar from "@/components/home/CredibilityBar";
import PortfolioCard from "@/components/portfolio/PortfolioCard";

const interactiveTools = [
    {
        title: "Paid Media ROI Simulator",
        description:
            "Stop guessing. Simulate the revenue impact of your ad spend using real unit economics. An interactive financial model for performance marketers.",
        metric: "550%",
        metricLabel: "Pipeline Expansion",
        href: "/portfolio/roi-simulator",
        pillars: ["Predictive Infrastructure", "Scale Without Headcount"],
    },
    {
        title: "SaaS Revenue Calculator",
        description:
            "Reverse-engineer funnel metrics from revenue goals. Calculate exactly how many leads, MQLs, and demos you need to hit your target.",
        metric: "100%",
        metricLabel: "Funnel Clarity",
        href: "/portfolio/calculator",
        pillars: ["Predictive Infrastructure", "Revenue Engineering"],
    },
    {
        title: "Behavioral Lead Scoring",
        description:
            "Making buyer motion legible. A dynamic scoring model that tracks fit and engagement to surface high-intent accounts automatically.",
        metric: "3x",
        metricLabel: "Lead Quality",
        href: "/portfolio/behavioral-lead-scoring",
        pillars: ["Predictive Infrastructure", "Automated Qualification"],
    },
];

const caseStudies = [
    {
        title: "Sovereign Buyer Personas",
        description:
            "Making complex markets simple. A framework for building personas that drive real targeting, messaging, and content decisions.",
        metric: "3x",
        metricLabel: "Conversion Lift",
        href: "/portfolio/sovereign-personas",
        pillars: ["Human Strategy", "Predictive Infrastructure"],
    },
    {
        title: "10-Touch Sales Play",
        description:
            "Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings.",
        metric: "42%",
        metricLabel: "Meeting Rate",
        href: "/portfolio/10-touch-sales-play",
        pillars: ["Human Strategy", "Predictive Infrastructure"],
    },
    {
        title: "120-Day Content Journey",
        description:
            "How we engineered $4M in quarterly pipeline at Cylance. A 120-day content system that turned awareness into closed deals.",
        metric: "$4M",
        metricLabel: "Quarterly Pipeline",
        href: "/portfolio/120-day-content-journey",
        pillars: ["Human Strategy", "Scale Without Headcount"],
    },
    {
        title: "B2B Marketing Framework",
        description:
            "The messaging infrastructure for teams who can't afford to build on quicksand. A 7-layer framework that creates B2B SaaS positioning from scratch.",
        metric: "21",
        metricLabel: "Prompts",
        href: "/portfolio/b2b-marketing-framework",
        pillars: ["Human Strategy"],
    },
    {
        title: "It's Good to Be Pitched",
        description:
            "A 30-second TV spot storyboard exploring the luxury of choice. An interactive demo of AI-assisted creative production.",
        metric: "8",
        metricLabel: "Storyboard Frames",
        href: "/portfolio/its-good-to-be-pitched",
        pillars: ["Human Strategy"],
    },
];

export default function HomeClient() {
    return (
        <>
            {/* Hero Section */}
            <section className="min-h-[85vh] flex items-center relative overflow-hidden py-20 pb-0">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-ash via-ash to-electric/5" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231D3557' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="container-narrow relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-6 mb-20">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Eyebrow */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-electric font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
                        >
                            Fractional CMO for Founders Who Need Pipeline—Not Process
                        </motion.p>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-[3.5rem] font-bold text-charcoal leading-[1.1] mb-6"
                        >
                            Demand generation as engineering: <span className="text-gradient">AI-powered playbooks</span>, <span className="text-gradient">predictive outcomes</span>, zero guesswork.
                        </motion.h1>

                        {/* Subhead */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl lg:text-2xl text-charcoal font-medium max-w-3xl mx-auto leading-relaxed mb-10"
                        >
                            Interactive demand generation playbooks. Built by a fractional CMO who&apos;s scaled three exits.
                        </motion.h2>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href="/portfolio" className="btn-primary" aria-label="See the Architecture">
                                See the Architecture
                                <svg
                                    className="w-5 h-5 ml-2"
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
                            <Link href="/contact" className="btn-secondary" aria-label="Show Me Your Numbers">
                                Show Me Your Numbers
                                <svg
                                    className="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </Link>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-slate/50"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Credibility Bar */}
            <CredibilityBar />

            {/* Interactive Tools ("Try something") */}
            <section className="section bg-ash dark:bg-background pb-0">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 text-center"
                    >
                        <span className="inline-block px-4 py-1.5 bg-ember/10 text-ember text-sm font-bold rounded-full uppercase tracking-wide mb-4">
                            Try the Demand Machine
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-4">
                            Don&apos;t just read about it. <span className="text-gradient">Launch it.</span>
                        </h2>
                        <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl mx-auto">
                            Interactive financial models and frameworks you can use right now to validate your growth strategy.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
                        {interactiveTools.map((item, index) => (
                            <PortfolioCard
                                key={item.href}
                                {...item}
                                index={index}
                                variant="interactive"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Demand Machine Teaser */}
            <section className="section bg-charcoal text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-ember/20 opacity-50" />
                <div className="container-narrow relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-bold rounded-full uppercase tracking-wide mb-6">
                            COMING Q3 2026
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            The Demand Machine
                        </h2>
                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                            The operating system for your revenue engine. A complete suite of
                            tools to plan, execute, and measure your go-to-market strategy.
                        </p>
                        <div className="inline-flex items-center gap-2 text-white/50 text-sm font-mono border border-white/20 px-4 py-2 rounded-lg bg-white/5">
                            <span className="w-2 h-2 bg-ember rounded-full animate-pulse" />
                            System Architecture In Progress
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 flex items-center gap-4"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground">
                            Recent Case Studies
                        </h2>
                        <div className="h-px flex-1 bg-charcoal/10 dark:bg-white/10" />
                        <Link href="/portfolio" className="text-electric font-medium hover:text-ember transition-colors flex items-center gap-1 group">
                            View All Work
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {caseStudies.map((item, index) => (
                            <PortfolioCard
                                key={item.href}
                                {...item}
                                index={index}
                                variant="case_study"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Let&apos;s build your growth engine.
                        </h2>
                        <p className="text-ash/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Let&apos;s talk about how AI-driven operations turn chaotic spend
                            into predictable pipeline.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-flex text-lg"
                        >
                            Start a conversation
                            <svg
                                className="w-5 h-5"
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
                    </motion.div>
                </div>
            </section>
        </>
    );
}
