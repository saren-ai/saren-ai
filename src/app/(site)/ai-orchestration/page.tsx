import type { Metadata } from "next";
import AIOrchestrationClient from "./AIOrchestrationClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
    title: "AI Orchestration | Saren.ai",
    description: "Designing AI systems where humans stay in the loop. Signal-State, behavioral targeting, and agentic pipelines built on one principle: machines handle scale, humans handle meaning.",
    alternates: { canonical: "https://saren.ai/ai-orchestration" },
    openGraph: {
        title: "AI Orchestration | Saren.ai",
        description: "Designing AI systems where humans stay in the loop. Signal-State, behavioral targeting, and agentic pipelines built on one principle: machines handle scale, humans handle meaning.",
        images: ["/images/og/ai-operations.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Orchestration | Saren.ai",
        description: "Designing AI systems where humans stay in the loop.",
        images: ["/images/og/ai-operations.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://saren.ai/ai-orchestration/#article",
    "headline": "AI Orchestration: Machines Handle Scale. Humans Handle Meaning.",
    "description": "Designing AI systems where humans stay in the loop — Signal-State, behavioral targeting, and agentic pipelines that amplify human judgment rather than replace it.",
    "url": "https://saren.ai/ai-orchestration",
    "image": {
        "@type": "ImageObject",
        "url": "https://saren.ai/images/og/ai-operations.png",
        "width": 1200,
        "height": 630
    },
    "author": { "@id": "https://saren.ai/#person" },
    "publisher": { "@id": "https://saren.ai/#person" },
    "mainEntityOfPage": { "@id": "https://saren.ai/ai-orchestration/#webpage" },
    "datePublished": "2026-03-27",
    "dateModified": "2026-03-27",
    "inLanguage": "en-US",
    "about": ["AI orchestration", "Signal-State Marketing", "B2B AI strategy"],
    "keywords": "AI orchestration, Signal-State Marketing, agentic pipelines, behavioral targeting, human-in-the-loop AI, B2B demand generation",
    "articleSection": "AI Strategy"
};

export default function AIOrchestrationPage() {
    return (
        <PagefindBoundary section="Services">
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
                        "@id": "https://saren.ai/ai-orchestration/#webpage",
                        "url": "https://saren.ai/ai-orchestration",
                        "name": "AI Orchestration | Saren.ai",
                        "description": "Designing AI systems where humans stay in the loop. Signal-State, behavioral targeting, and agentic pipelines built on one principle: machines handle scale, humans handle meaning.",
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
                            { "@type": "ListItem", "position": 2, "name": "AI Orchestration", "item": "https://saren.ai/ai-orchestration" }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "@id": "https://saren.ai/#ai-orchestration-service",
                        "name": "AI Orchestration Consulting",
                        "description": "Designing AI systems where humans stay in the loop. Signal-State, behavioral targeting, and agentic pipelines built on one principle: machines handle scale, humans handle meaning.",
                        "provider": { "@id": "https://saren.ai/#person" },
                        "serviceType": "AI Operations Consulting",
                        "areaServed": { "@type": "Country", "name": "United States" },
                        "audience": {
                            "@type": "BusinessAudience",
                            "audienceType": "B2B SaaS companies",
                            "numberOfEmployees": {
                                "@type": "QuantitativeValue",
                                "minValue": 10,
                                "maxValue": 500
                            }
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "AI Orchestration Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Signal Intelligence",
                                        "description": "Multi-platform agent pipelines that detect expressed intent signals in real time. Scored, prioritized, and surfaced — not dumped in a spreadsheet."
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Behavioral Scoring",
                                        "description": "Lead scoring models built on buyer motion — engagement depth, content type, timing patterns — not job title and company size."
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Agentic Outreach",
                                        "description": "Outreach pipelines that draft resonant messages from signal context — and always route through a human review gate before touching a real person."
                                    }
                                }
                            ]
                        }
                    })
                }}
            />
            <AIOrchestrationClient />
        </PagefindBoundary>
    );
}
