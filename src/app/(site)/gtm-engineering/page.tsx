import type { Metadata } from "next";
import GTMEngineeringClient from "./GTMEngineeringClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
    title: "GTM Engineering | Saren.ai",
    description: "GTM Engineering replaces campaign-centric demand generation with a systems-thinking approach to pipeline — instrumented layers of data, scoring, content, spend, AI, and channel engineered into one measurable demand engine.",
    alternates: { canonical: "https://saren.ai/gtm-engineering" },
    openGraph: {
        title: "GTM Engineering | Saren.ai",
        description: "Stop running campaigns. Engineer the system that produces pipeline.",
        images: ["/images/og/home.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "GTM Engineering | Saren.ai",
        description: "Stop running campaigns. Engineer the system that produces pipeline.",
        images: ["/images/og/home.png"],
    },
};

export default function GTMEngineeringPage() {
    return (
        <PagefindBoundary section="Services">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "@id": "https://saren.ai/gtm-engineering/#webpage",
                        "url": "https://saren.ai/gtm-engineering",
                        "name": "GTM Engineering | Saren.ai",
                        "description": "GTM Engineering replaces campaign-centric demand generation with a systems-thinking approach to pipeline — instrumented layers of data, scoring, content, spend, AI, and channel engineered into one measurable demand engine.",
                        "isPartOf": { "@id": "https://saren.ai/#website" },
                        "about": { "@id": "https://saren.ai/#person" },
                        "author": { "@id": "https://saren.ai/#person" },
                        "inLanguage": "en-US",
                        "dateModified": "2026-06-19T00:00:00Z"
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "@id": "https://saren.ai/gtm-engineering/#article",
                        "headline": "GTM Engineering: demand as an engineered system, not a campaign calendar",
                        "description": "A seven-layer model for engineering B2B demand — signal intelligence, behavioral scoring, dynamic routing, a content strategy matrix, managed paid spend, instrumented measurement, and AI orchestration — built and proven across cybersecurity and B2B SaaS.",
                        "url": "https://saren.ai/gtm-engineering",
                        "mainEntityOfPage": { "@id": "https://saren.ai/gtm-engineering/#webpage" },
                        "author": { "@id": "https://saren.ai/#person" },
                        "publisher": { "@id": "https://identogram.com/#organization" },
                        "image": "https://saren.ai/images/og/home.png",
                        "about": ["GTM Engineering", "demand generation systems", "B2B demand engineering", "marketing operations", "AI orchestration"],
                        "keywords": "GTM engineering, demand engineering, demand generation systems, lead scoring, content strategy matrix, paid media optimization, marketing attribution, AI orchestration, B2B cybersecurity marketing",
                        "inLanguage": "en-US",
                        "datePublished": "2026-06-19T00:00:00Z",
                        "dateModified": "2026-06-19T00:00:00Z"
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
                            { "@type": "ListItem", "position": 2, "name": "GTM Engineering", "item": "https://saren.ai/gtm-engineering" }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "How is GTM Engineering different from demand generation?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Demand generation asks what campaign to run next. GTM Engineering asks how every input — data, media, content, scoring, AI, channel — connects into one measurable system. Campaigns are an output of that system, not the strategy itself." }
                            },
                            {
                                "@type": "Question",
                                "name": "Isn't this just marketing ops with a new name?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Marketing ops keeps the stack running. GTM Engineering designs the demand strategy and owns the infrastructure it runs on, so strategy and systems stop being separate jobs. The two only compound when one person owns both." }
                            },
                            {
                                "@type": "Question",
                                "name": "Do I need to rip out my current stack?",
                                "acceptedAnswer": { "@type": "Answer", "text": "No. The stack is evaluated with a bias toward capability, simplicity, and measurable impact, then evolved. Most engagements start by connecting layers you already own rather than buying new ones." }
                            },
                            {
                                "@type": "Question",
                                "name": "Where does AI actually fit in GTM Engineering?",
                                "acceptedAnswer": { "@type": "Answer", "text": "As an instrumented layer with a human review gate — signal detection, scoring, and drafting at scale, with judgment kept in human hands. Orchestration that catches drift before it compounds, not automation that runs wrong at scale." }
                            },
                            {
                                "@type": "Question",
                                "name": "Can GTM Engineering be delivered as a fractional engagement?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Yes. The system is the same whether built by an embedded fractional leader or a full-time owner — what matters is that one person holds strategy and infrastructure together." }
                            }
                        ]
                    })
                }}
            />
            <GTMEngineeringClient />
        </PagefindBoundary>
    );
}
