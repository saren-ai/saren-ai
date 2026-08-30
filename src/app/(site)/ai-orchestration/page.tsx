import type { Metadata } from "next";
import AIOrchestrationClient from "./AIOrchestrationClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph, ID, serviceId } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "AI Orchestration" }];

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

// Was root-scoped (#ai-orchestration-service) despite being defined on a subpage —
// path-scoped to match the site's @id convention.
const aiOrchestrationService = {
    "@type": "Service",
    "@id": serviceId("/ai-orchestration"),
    name: "AI Orchestration Consulting",
    description: "Designing AI systems where humans stay in the loop. Signal-State, behavioral targeting, and agentic pipelines built on one principle: machines handle scale, humans handle meaning.",
    provider: { "@id": ID.person },
    serviceType: "AI Operations Consulting",
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
        "@type": "BusinessAudience",
        audienceType: "B2B SaaS companies",
        numberOfEmployees: {
            "@type": "QuantitativeValue",
            minValue: 10,
            maxValue: 500,
        },
    },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Orchestration Services",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Signal Intelligence",
                    description: "Multi-platform agent pipelines that detect expressed intent signals in real time. Scored, prioritized, and surfaced — not dumped in a spreadsheet.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Behavioral Scoring",
                    description: "Lead scoring models built on buyer motion — engagement depth, content type, timing patterns — not job title and company size.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Agentic Outreach",
                    description: "Outreach pipelines that draft resonant messages from signal context — and always route through a human review gate before touching a real person.",
                },
            },
        ],
    },
};

export default function AIOrchestrationPage() {
    return (
        <PagefindBoundary section="Services">
            <JsonLd
                schema={buildGraph({
                    path: "/ai-orchestration",
                    name: "AI Orchestration | Saren.ai",
                    description: "Designing AI systems where humans stay in the loop. Signal-State, behavioral targeting, and agentic pipelines built on one principle: machines handle scale, humans handle meaning.",
                    dateModified: "2026-03-27T00:00:00Z",
                    breadcrumb: trail,
                    article: {
                        headline: "Machines handle scale. Humans handle meaning.",
                        datePublished: "2026-03-27T00:00:00Z",
                        dateModified: "2026-03-27T00:00:00Z",
                        image: "https://saren.ai/images/og/ai-operations.png",
                        about: ["AI orchestration", "Signal-State Marketing", "B2B AI strategy"],
                    },
                    extra: [aiOrchestrationService],
                })}
            />
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>
            <AIOrchestrationClient />
        </PagefindBoundary>
    );
}
