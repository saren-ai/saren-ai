"use client";

import Link from "next/link";
import FAQ from "@/components/ui/FAQ";
import { ArrowRight, FileText, Target, BarChart, Users } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import HeroContentJourney from "@/components/content-journey/HeroContentJourney";

export default function ContentJourneyClient() {
    return (
        <article>
            {/* New Hero with Interactive Matrix */}
            <HeroContentJourney />

            {/* The Problem */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            The Problem with Random Acts of Content
                        </h2>
                        <div className="prose prose-lg text-foreground-muted leading-relaxed">
                            <p>
                                Most marketing teams create content based on what they think is cool, not what the buyer needs. This leads to "random acts of content"—blog posts, webinars, and whitepapers that don't connect to a larger strategy.
                            </p>
                            <p>
                                To engineer demand, you need to map content to the buyer's psychological state at each stage of the journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Solution */}
            <section className="section bg-ash dark:bg-background-secondary">
                <div className="container-narrow">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Target className="w-6 h-6 text-electric" />,
                                    title: "Problem Awareness",
                                    desc: "Validate their pain. Show them they aren't crazy for struggling."
                                },
                                {
                                    icon: <FileText className="w-6 h-6 text-ember" />,
                                    title: "Solution Education",
                                    desc: "Teach them how to solve it. Methodology before product."
                                },
                                {
                                    icon: <BarChart className="w-6 h-6 text-copper" />,
                                    title: "Vendor Selection",
                                    desc: "Prove you are the best partner to execute that methodology."
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-card-bg dark:bg-background border border-border p-6 rounded-lg">
                                    <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                                    <p className="text-sm text-foreground-muted">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Example / Detailed Breakdown */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Sample Content Asset
                        </h2>
                        <p className="text-foreground-muted mb-8">
                            A "Problem Awareness" LinkedIn post structure that validates pain without pitching product.
                        </p>
                        <CodeBlock
                            language="markdown"
                            code={`The hardest part of [Job Function] isn't [Task A].
It's [Hidden Pain Point B].

Most people think success looks like:
- Metric 1
- Metric 2
- Metric 3

But in reality, you're judged on:
- [Political Reality 1]
- [Internal Struggle 2]

If you're feeling [Emotion], you aren't doing it wrong.
The playbook just changed.

Here's how top 1% [Role] are adapting:
1. Step 1...
2. Step 2...
3. Step 3...

No tool can fix this. It's a mindset shift.`}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "Do I need all 120 days?",
                        answer: "The timeline is symbolic of a quarter. You can compress it to 30 days for a sprint or expand it to 6 months for enterprise deals. The physics of the journey remain the same."
                    },
                    {
                        question: "What if we don't have a content team?",
                        answer: "You don't need a team. You need a subject matter expert and a writer (or a very good AI workflow). Quality of insight > quantity of production."
                    },
                    {
                        question: "How do we measure this?",
                        answer: "Early stage: Consumption and Qualitative Feedback (comments, DMs). Mid stage: Website engagement and retargeting pool growth. Late stage: Demo requests and pipeline influence."
                    }
                ]}
            />

            {/* CTA */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to build your content engine?
                    </h2>
                    <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
                        Let's move beyond random acts of content and build a system that generates revenue.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric/90 text-white rounded-lg font-semibold transition-colors"
                        >
                            Start a Project
                            <ArrowRight className="w-5 h-5" />
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
                                title: "10-Touch Sales Play",
                                desc: "Turning cold outreach into executive conversations",
                                href: "/portfolio/10-touch-sales-play",
                            },
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
