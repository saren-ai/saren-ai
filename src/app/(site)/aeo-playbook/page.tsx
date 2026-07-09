import type { Metadata } from "next";
import AEOPlaybookClient from "./AEOPlaybookClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
    title: "My AEO Playbook — How B2B Brands Win the AI Shortlist | Saren",
    description: "What is answer engine optimization and why does it decide B2B deals before the first sales call? A practical AEO playbook for B2B SaaS.",
    alternates: { canonical: "https://saren.ai/aeo-playbook" },
    openGraph: {
        title: "My AEO Playbook — How B2B Brands Win the AI Shortlist | Saren",
        description: "The deal is decided before the first call. Here's the playbook for winning the AI shortlist.",
        images: ["/images/og/home.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "My AEO Playbook — How B2B Brands Win the AI Shortlist | Saren",
        description: "The deal is decided before the first call. Here's the playbook for winning the AI shortlist.",
        images: ["/images/og/home.png"],
    },
};

export default function AEOPlaybookPage() {
    return (
        <PagefindBoundary section="Services">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "@id": "https://saren.ai/aeo-playbook/#webpage",
                        "url": "https://saren.ai/aeo-playbook",
                        "name": "My AEO Playbook — How B2B Brands Win the AI Shortlist | Saren",
                        "description": "What is answer engine optimization and why does it decide B2B deals before the first sales call? A practical AEO playbook for B2B SaaS.",
                        "isPartOf": { "@id": "https://saren.ai/#website" },
                        "about": { "@id": "https://saren.ai/#person" },
                        "author": { "@id": "https://saren.ai/#person" },
                        "inLanguage": "en-US",
                        "dateModified": "2026-07-06T00:00:00Z"
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "@id": "https://saren.ai/aeo-playbook/#article",
                        "headline": "The deal is decided before the first call",
                        "description": "A practical AEO playbook covering the dual-surface model, the four-phase engagement, and why B2B deals are decided in an anonymous, LLM-mediated research phase.",
                        "url": "https://saren.ai/aeo-playbook",
                        "mainEntityOfPage": { "@id": "https://saren.ai/aeo-playbook/#webpage" },
                        "author": { "@id": "https://saren.ai/#person" },
                        "publisher": { "@id": "https://saren.ai/#person" },
                        "image": "https://saren.ai/images/og/home.png",
                        "about": ["answer engine optimization", "AEO", "B2B buyer journey", "AI search", "citation optimization"],
                        "keywords": "answer engine optimization, AEO, AI shortlist, B2B buyer journey, LLM citations, generative engine optimization, AI Overviews, ChatGPT search, Perplexity",
                        "inLanguage": "en-US",
                        "datePublished": "2026-07-06T00:00:00Z",
                        "dateModified": "2026-07-06T00:00:00Z"
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
                            { "@type": "ListItem", "position": 2, "name": "My AEO Playbook", "item": "https://saren.ai/aeo-playbook" }
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
                                "name": "Is AEO different from SEO?",
                                "acceptedAnswer": { "@type": "Answer", "text": "They're complementary, not competing. AEO is the citation layer built on top of technical SEO — weak SEO means there's nothing for an answer engine to extract and cite in the first place." }
                            },
                            {
                                "@type": "Question",
                                "name": "How long until results?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Faster than traditional SEO for restructured existing pages, because engines re-crawl and swap cited sources continuously rather than waiting for a ranking refresh. Off-site authority — reviews, forums, community mentions — compounds over quarters, not weeks." }
                            },
                            {
                                "@type": "Question",
                                "name": "How do you measure AEO?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Citation frequency, AI-agent referral traffic, and share of answer against named competitors. Rankings alone no longer describe buyer reality." }
                            },
                            {
                                "@type": "Question",
                                "name": "Does this replace demand gen?",
                                "acceptedAnswer": { "@type": "Answer", "text": "No — it determines whether demand gen has a shortlist to land on. 95% of deals already have a winning vendor on the Day One shortlist before outreach starts." }
                            },
                            {
                                "@type": "Question",
                                "name": "What does an engagement look like?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Four phases over 90 days — audit, restructure, seed, measure — followed by ongoing measurement. The operational detail is what we walk through on an intro call." }
                            }
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
                        "@id": "https://saren.ai/#aeo-playbook-service",
                        "name": "Answer Engine Optimization Consulting",
                        "description": "Structuring B2B content, schema, and reputation so AI systems extract, trust, and cite the brand as the answer to buyer questions — before the first sales call happens.",
                        "provider": { "@id": "https://saren.ai/#person" },
                        "serviceType": "Answer Engine Optimization",
                        "areaServed": { "@type": "Country", "name": "United States" },
                        "audience": {
                            "@type": "BusinessAudience",
                            "audienceType": "B2B SaaS and services companies",
                            "numberOfEmployees": {
                                "@type": "QuantitativeValue",
                                "minValue": 200,
                                "maxValue": 5000
                            }
                        }
                    })
                }}
            />
            <AEOPlaybookClient />
        </PagefindBoundary>
    );
}
