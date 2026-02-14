import type { Metadata } from "next";
import AIOperationsClient from "./AIOperationsClient";

export const metadata: Metadata = {
    title: "AI Interactions & Operations | Saren.ai",
    description:
        " Operationalizing AI for marketing teams. Moving beyond 'chatbots' to true agentic workflows and automated revenue operations.",
    openGraph: {
        title: "AI Interactions & Operations | Saren.ai",
        description:
            " Operationalizing AI for marketing teams. Moving beyond 'chatbots' to true agentic workflows and automated revenue operations.",
        images: ["/images/og/ai-operations.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Interactions & Operations | Saren.ai",
        description:
            " Operationalizing AI for marketing teams. Moving beyond 'chatbots' to true agentic workflows and automated revenue operations.",
        images: ["/images/og/ai-operations.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why AI Turns Marketing Into Engineering",
    "description": "AI-native demand generation explained: predictive infrastructure, human strategy, and scale without headcount.",
    "author": {
        "@type": "Person",
        "name": "Saren Sakurai",
        "url": "https://saren.ai/about"
    },
    "datePublished": "2026-02-12",
    "publisher": {
        "@type": "Organization",
        "name": "Saren.ai",
        "url": "https://saren.ai"
    }
};

export default function AIOperationsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AIOperationsClient />
        </>
    );
}
