import type { Metadata } from "next";
import AIOrchestrationClient from "./AIOrchestrationClient";

export const metadata: Metadata = {
    title: "AI Orchestration | Saren.ai",
    description: "Designing AI systems where humans stay in the loop. Signal-State, behavioral targeting, and agentic pipelines built on one principle: machines handle scale, humans handle meaning.",
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
    "headline": "AI Orchestration: Machines Handle Scale. Humans Handle Meaning.",
    "description": "Designing AI systems where humans stay in the loop — Signal-State, behavioral targeting, and agentic pipelines that amplify human judgment rather than replace it.",
    "author": {
        "@type": "Person",
        "name": "Saren Sakurai",
        "url": "https://saren.ai/about"
    },
    "datePublished": "2026-03-27",
    "publisher": {
        "@type": "Organization",
        "name": "Saren.ai",
        "url": "https://saren.ai"
    }
};

export default function AIOrchestrationPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AIOrchestrationClient />
        </>
    );
}
