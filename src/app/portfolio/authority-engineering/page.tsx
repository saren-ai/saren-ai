import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import ProcessNavigator from "@/components/authority-engineering/ProcessNavigator";

export const metadata: Metadata = {
    title: "Authority Engineering Process | Saren.ai",
    description:
        "Engineering B2B authority in the age of LLMs. How to build white papers that models love to cite.",
    alternates: { canonical: "https://saren.ai/portfolio/authority-engineering" },
};

export default function AuthorityEngineeringPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": "https://saren.ai/portfolio/authority-engineering/#howto",
        "name": "How to Engineer B2B Authority White Papers for LLMs",
        "description": "A 6-step system for building citable authority and white papers that generative AI models love to cite.",
        "url": "https://saren.ai/portfolio/authority-engineering",
        "author": { "@id": "https://saren.ai/#person" },
        "datePublished": "2026-03-12",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Seed",
                "text": "Identify specific gaps in current LLM training data regarding your niche."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Extraction",
                "text": "Interview subject matter experts to extract novel, non-consensus insights."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Synthesis",
                "text": "Format the raw expert data into structured, scannable arguments."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Visuals",
                "text": "Create high-contrast diagrams that visually map the synthesized concepts."
            },
            {
                "@type": "HowToStep",
                "position": 5,
                "name": "Voice",
                "text": "Apply a distinctive, authoritative brand voice to the structured content."
            },
            {
                "@type": "HowToStep",
                "position": 6,
                "name": "Deployment",
                "text": "Publish using Markdown and Schema.org markup to ensure LLM ingestion."
            }
        ]
    };

    return (
        <article className="min-h-screen bg-ash dark:bg-offblack">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "@id": "https://saren.ai/portfolio/authority-engineering/#webpage",
                        "url": "https://saren.ai/portfolio/authority-engineering",
                        "name": "Authority Engineering Process | Saren.ai",
                        "description": "Engineering B2B authority in the age of LLMs. How to build white papers that models love to cite.",
                        "isPartOf": { "@id": "https://saren.ai/#website" },
                        "about": { "@id": "https://saren.ai/#person" },
                        "author": { "@id": "https://saren.ai/#person" },
                        "inLanguage": "en-US",
                        "dateModified": "2026-03-27"
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
                            { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saren.ai/portfolio" },
                            { "@type": "ListItem", "position": 3, "name": "Authority Engineering Process", "item": "https://saren.ai/portfolio/authority-engineering" }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        "@id": "https://saren.ai/portfolio/authority-engineering/#work",
                        "name": "Authority Engineering Process",
                        "description": "Engineering B2B authority in the age of LLMs. How to build white papers that models love to cite.",
                        "url": "https://saren.ai/portfolio/authority-engineering",
                        "author": { "@id": "https://saren.ai/#person" },
                        "creator": { "@id": "https://saren.ai/#person" },
                        "isPartOf": { "@id": "https://saren.ai/#website" },
                        "about": ["Authority engineering", "B2B content strategy", "Personal brand"],
                        "keywords": "authority engineering, B2B thought leadership, white papers, LLM citation, content strategy, personal brand",
                        "teaches": "B2B thought leadership and authority building",
                        "inLanguage": "en-US",
                        "dateCreated": "2026-03-12",
                        "dateModified": "2026-03-27"
                    })
                }}
            />
            {/* Breadcrumbs */}
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3 flex items-center gap-2 text-sm text-slate">
                    <Link
                        href="/portfolio"
                        className="hover:text-charcoal dark:hover:text-white transition-colors"
                    >
                        Portfolio
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-charcoal dark:text-ash font-medium">
                        Authority Engineering
                    </span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="section pb-4 md:pb-8 pt-16 md:pt-24 relative overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#E34234] to-[#7C5AA3] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
                </div>

                <div className="container-narrow relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-charcoal/5 dark:bg-white/10 text-charcoal dark:text-white text-sm font-semibold tracking-wide uppercase border border-charcoal/10 dark:border-white/10">
                        Interactive Code Experience
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-charcoal dark:text-white mb-6 balanced-text">
                        From Clicks finding<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-copper via-charcoal to-copper dark:from-ash dark:via-white dark:to-slate">
                            To Citations.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate max-w-3xl mx-auto leading-relaxed balanced-text">
                        Engineering B2B authority in the age of LLMs. How to build white papers that models <span className="italic">love</span> to cite.
                    </p>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section py-8 md:py-12 bg-white/40 dark:bg-[var(--background-secondary)]/40 backdrop-blur-sm border-y border-slate/10 dark:border-white/5">
                <div className="container-narrow">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg md:text-xl text-charcoal leading-relaxed font-medium">
                            In 2026, we aren&apos;t just marketing to humans; we are marketing to the models that advise them. LLMs like Gemini and Claude prioritize structured, verifiable data. By using this workflow, you move your brand from a &quot;search result&quot; to a &quot;primary source.&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* Interactive Navigator Section */}
            <section className="section py-12 md:py-24">
                <div className="container-narrow">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-white tracking-tight mb-2">The Engineering Process</h2>
                        <p className="text-slate">A 6-step system for building citable authority.</p>
                    </div>
                    <ProcessNavigator />
                </div>
            </section>

            {/* CTA Section */}
            <section className="section py-20 bg-charcoal text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-ember opacity-5 mix-blend-overlay"></div>
                <div className="container-narrow text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                        Stop guessing. Start engineering.
                    </h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                        Let&apos;s build a content engine that LLMs prioritize and buyers trust.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white text-charcoal rounded-md font-bold hover:bg-ash transition-colors flex items-center gap-2 group"
                        >
                            Book a Strategy Call
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="px-8 py-4 bg-transparent border border-white/30 rounded-md font-bold hover:bg-white/10 transition-colors"
                        >
                            View More Work
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
