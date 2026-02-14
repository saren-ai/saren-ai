"use client";

import HeroTimeline from "@/components/psylocke-timeline/HeroTimeline";
import Link from "next/link";

export default function PsylockeTimelineClient() {
    return (
        <article>
            {/* Hero with Interactive Timeline */}
            <HeroTimeline />

            {/* CTA */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Like what you see?
                    </h2>
                    <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
                        This interactive timeline was built with Next.js, Framer Motion, and
                        a love for long-form comic narratives. If you need someone who
                        obsesses over details like this for your product — let&apos;s talk.
                    </p>
                    <Link
                        href="/contact"
                        className="btn-primary inline-flex items-center gap-2 text-lg"
                    >
                        Get in Touch
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
                </div>
            </section>

            {/* Explore More Work */}
            <section className="section bg-ash dark:bg-background-secondary">
                <div className="container-narrow">
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                        Explore More Work
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                href: "/portfolio/its-good-to-be-pitched",
                                title: "It's Good to Be Pitched",
                                desc: "AI-assisted storyboard for a 30-second TV spot",
                            },
                            {
                                href: "/portfolio/roi-simulator",
                                title: "Paid Media ROI Simulator",
                                desc: "Interactive financial modeling for ad spend",
                            },
                            {
                                href: "/portfolio/calculator",
                                title: "SaaS Revenue Calculator",
                                desc: "Reverse-engineer funnel metrics from revenue goals",
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
