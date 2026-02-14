"use client";

import HeroStoryboard from "@/components/storyboard/HeroStoryboard";
import FAQ from "@/components/ui/FAQ";
import { processPhases, applications } from "@/lib/storyboard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ItsGoodToBePitchedClient() {
    return (
        <article>
            {/* Hero with Interactive Storyboard */}
            <HeroStoryboard />

            {/* Overview */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-foreground leading-relaxed mb-6">
                            Most agencies sell &quot;the best creative.&quot; This concept
                            sells something simpler: the <em>feeling</em> you get when
                            you&apos;re pitched great ideas. The story follows a marketing
                            exec through three pitches, then lands on the satisfaction of
                            choosing the perfect fit.
                        </p>
                        <p className="text-sm text-foreground-muted">
                            <strong>Client context:</strong> Juxt Interactive — agency
                            concept / portfolio piece
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Insight */}
            <section className="section bg-ash dark:bg-background-secondary">
                <div className="container-narrow">
                    <blockquote className="max-w-3xl mx-auto text-center">
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                            &quot;The experience of being pitched great creative ideas is
                            itself valuable and enjoyable.&quot;
                        </p>
                        <p className="text-lg text-foreground-muted">
                            Agencies aren&apos;t just vendors—they&apos;re providers of a
                            premium &quot;creative showcase&quot; experience.
                        </p>
                    </blockquote>
                </div>
            </section>

            {/* The Brief */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            The Brief
                        </h2>
                        <div className="prose prose-lg text-foreground-muted leading-relaxed">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-ember/10 rounded-full flex items-center justify-center mt-1">
                                        <svg
                                            className="w-3 h-3 text-ember"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <span>
                                        Create a commercial concept in a single session
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-ember/10 rounded-full flex items-center justify-center mt-1">
                                        <svg
                                            className="w-3 h-3 text-ember"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <span>
                                        Protagonist: Asian woman executive with black-framed glasses
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-ember/10 rounded-full flex items-center justify-center mt-1">
                                        <svg
                                            className="w-3 h-3 text-ember"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <span>
                                        Three different pitch styles; the joy is having three strong
                                        options
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section bg-charcoal/5 dark:bg-background-secondary">
                <div className="container-narrow">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                        Process
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {processPhases.map((phase) => (
                            <div
                                key={phase.number}
                                className="bg-card-bg dark:bg-background border border-border rounded-lg p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-ember/10 rounded-lg flex items-center justify-center">
                                        <span className="text-lg font-bold text-ember">
                                            {phase.number}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {phase.title}
                                    </h3>
                                </div>
                                <p className="text-foreground-muted mb-4 leading-relaxed">
                                    {phase.description}
                                </p>
                                <div className="pt-4 border-t border-border">
                                    <p className="text-sm font-semibold text-electric mb-2">
                                        Tool: {phase.tool}
                                    </p>
                                    <p className="text-sm text-foreground-muted">
                                        <strong className="text-copper">What it solved:</strong>{" "}
                                        {phase.whatItSolved}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why the Structure Matters */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Why the Structure Matters
                        </h2>
                        <div className="prose prose-lg text-foreground-muted leading-relaxed mb-6">
                            <p>
                                JSON-per-shot wasn&apos;t just a technical choice—it was a
                                creative necessity. Each storyboard frame needed:
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                {
                                    title: "Character consistency",
                                    description:
                                        "Same protagonist details carried across all 8 frames",
                                },
                                {
                                    title: "Shot-to-shot continuity",
                                    description:
                                        "Mood and camera angles progress logically through the narrative",
                                },
                                {
                                    title: "Controllable progression",
                                    description:
                                        "Each frame builds on the previous without AI drift",
                                },
                                {
                                    title: "Production-ready specs",
                                    description:
                                        "Explicit camera angles and timing for real production use",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 bg-card-bg dark:bg-background-secondary rounded-lg border border-border"
                                >
                                    <span className="flex-shrink-0 w-6 h-6 bg-ember/10 rounded-full flex items-center justify-center mt-0.5">
                                        <svg
                                            className="w-4 h-4 text-ember"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-foreground-muted">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Results & Applications */}
            <section className="section bg-charcoal/5 dark:bg-background-secondary">
                <div className="container-narrow">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                        Results & Applications
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {applications.map((app, index) => (
                            <div
                                key={index}
                                className="bg-card-bg dark:bg-background border border-border rounded-lg p-6"
                            >
                                <div className="w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-electric"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {app.title}
                                </h3>
                                <p className="text-foreground-muted leading-relaxed">
                                    {app.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                title="Frequently Asked Questions"
                items={[
                    {
                        question: "What is this project?",
                        answer:
                            "A storyboarded 30-second TV spot concept built to sell the experience of being pitched—having three great options.",
                    },
                    {
                        question: "What's the insight behind it?",
                        answer:
                            "The pleasure isn't 'who wins.' The pleasure is the buyer's confidence when multiple ideas are genuinely strong.",
                    },
                    {
                        question: "Why use storyboard sketch style instead of photoreal images?",
                        answer:
                            "Sketch storyboards reduce uncanny valley and match how real pre-production work looks. They feel more authentic and production-ready than AI-generated photoreal images.",
                    },
                    {
                        question: "How did you maintain character consistency across frames?",
                        answer:
                            "By generating prompts per shot with explicit carryover details—same protagonist description and continuity notes across every frame. The JSON structure prevented AI drift.",
                    },
                    {
                        question: "What tools did you use?",
                        answer:
                            "Claude for concept and prompt structure; Nano Banana/Gemini for image generation; JSON to keep the system deterministic.",
                    },
                    {
                        question: "How would this concept translate to a final commercial?",
                        answer:
                            "The beats stay the same; the storyboards become a shot list, then production design, casting, and edit timing. This is a production-ready blueprint.",
                    },
                    {
                        question: "Can you apply this process to other narratives?",
                        answer:
                            "Yes—any short-form story benefits from beat structure plus consistency constraints. The methodology works for explainer videos, product demos, testimonials, and educational content.",
                    },
                ]}
            />

            {/* CTA */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to build narrative-driven creative?
                    </h2>
                    <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
                        Let&apos;s craft stories that sell experiences, not just products.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-ember hover:bg-ember/90 text-white rounded-lg font-semibold transition-colors"
                        >
                            Let&apos;s talk
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/portfolio/roi-simulator"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-card-bg dark:bg-background border-2 border-border hover:border-electric text-foreground rounded-lg font-semibold transition-all"
                        >
                            More portfolio work
                        </Link>
                    </div>
                </div>
            </section>

            {/* More Portfolio */}
            <section className="section bg-ash dark:bg-background-secondary">
                <div className="container-narrow">
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                        Explore More Work
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Paid Media ROI Simulator",
                                desc: "Forecasting outcomes before you spend",
                                href: "/portfolio/roi-simulator",
                            },
                            {
                                title: "Sovereign Personas",
                                desc: "Making complex markets legible",
                                href: "/portfolio/sovereign-personas",
                            },
                            {
                                title: "B2B Marketing Framework",
                                desc: "7-layer prompt system for messaging infrastructure",
                                href: "/portfolio/b2b-marketing-framework",
                            },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block p-6 bg-card-bg border border-border rounded-lg hover:bg-electric/10 transition-colors group"
                            >
                                <h4 className="font-semibold text-foreground group-hover:text-ember transition-colors mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-foreground-muted text-sm">{item.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}
