"use client";

import FAQ from "@/components/ui/FAQ";
import CodeBlock from "@/components/ui/CodeBlock";
import CaseStudyHero from "@/components/case-studies/CaseStudyHero";
import OutcomeMetrics from "@/components/case-studies/OutcomeMetrics";
import ConsultingCTA from "@/components/case-studies/ConsultingCTA";
import RelatedWork from "@/components/case-studies/RelatedWork";
import { Mail, Phone, Video, Calendar } from "lucide-react";

export default function SalesPlayClient() {
    return (
        <article>
            {/* Hero */}
            <CaseStudyHero
                title="10-Touch Sales Play"
                subtitle="Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings."
                role="Sales Engineering"
                date="2023-2024"
                tags={["Outbound", "SDR Playbook", "Messaging"]}
            />

            {/* Metrics */}
            <OutcomeMetrics
                metrics={[
                    { value: "42%", label: "Meeting Rate", context: "Cold outbound to VP+" },
                    { value: "25", label: "Days", context: "Sequence duration" },
                    { value: "10", label: "Touchpoints", context: "Across 3 channels" },
                ]}
            />

            {/* The Problem */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            The Problem with Cold Outreach
                        </h2>
                        <div className="prose prose-lg text-foreground-muted leading-relaxed">
                            <p>
                                Most SDR teams burn through TAM with generic "just bumping this"
                                emails. The conversion rates exist, but they're built on volume,
                                not strategy.
                            </p>
                            <p>
                                When you're targeting executives at enterprise accounts, you
                                can't afford to burn bridges. You need a sequence that earns the
                                right to ask for time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Philosophy */}
            <section className="section bg-ash dark:bg-background-secondary">
                <div className="container-narrow">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Mail className="w-6 h-6 text-electric" />,
                                    title: "Value First",
                                    desc: "Every touch must provide value before asking for anything.",
                                },
                                {
                                    icon: <Video className="w-6 h-6 text-ember" />,
                                    title: "Multi-Channel",
                                    desc: "Be where they are. Email, LinkedIn, Phone, Video.",
                                },
                                {
                                    icon: <Calendar className="w-6 h-6 text-copper" />,
                                    title: "Patience Pays",
                                    desc: "25 days allows for trust-building, not just pestering.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-card-bg dark:bg-background border border-border p-6 rounded-lg"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-foreground-muted">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Example */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Sample Email Structure
                        </h2>
                        <p className="text-foreground-muted mb-8">
                            The "Day 13" email—a value-led touch that references recent news
                            without being salesy.
                        </p>
                        <CodeBlock
                            language="markdown"
                            code={`Subject: {FirstName}, saw the news about {CompanyNews}

Hi {FirstName},

Saw the announcement regarding {CompanyNews}—congrats to the team.

Typically when companies in {Industry} make this move, the next challenge becomes {SpecificProblem}.

We recently helped {Competitor} solve this by {Solution}, which led to {Result}.

Thought this case study might be relevant as you navigate the next quarter:
[Link to Case Study]

No ask today, just thought this might be helpful context.

Best,
{MyName}`}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "Why 25 days?",
                        answer:
                            "Executive attention is scarce. A 25-day sequence shows persistence without desperation. It gives them time to digest your content and recognize your name before you push for the meeting.",
                    },
                    {
                        question: "Does this work for all industries?",
                        answer:
                            "It works best for complex B2B sales where the ACV justifies the effort. If you're selling a transactional $50/mo tool, this is overkill. If you're selling $50k+ outcomes, this is the baseline.",
                    },
                    {
                        question: "How much personalization is required?",
                        answer:
                            "The 10-20-70 rule: 10% on the individual (LinkedIn bio), 20% on the company (news, 10-K), 70% on the persona pain points. You don't need to write a novel, just show you've done your homework.",
                    },
                ]}
            />

            {/* CTA */}
            <ConsultingCTA />

            {/* Related Work */}
            <RelatedWork currentHref="/portfolio/10-touch-sales-play" />
        </article>
    );
}
