import type { Metadata } from "next";
import AEOPlaybookClient from "./AEOPlaybookClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph, serviceId, ID } from "@/lib/schema";
import { FAQS } from "@/data/faqs";

const trail = [{ href: "/", label: "Home" }, { label: "My AEO Playbook" }];

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
    const graph = buildGraph({
        path: "/aeo-playbook",
        pageType: "WebPage",
        name: "My AEO Playbook — How B2B Brands Win the AI Shortlist | Saren",
        description:
            "What is answer engine optimization and why does it decide B2B deals before the first sales call? A practical AEO playbook for B2B SaaS.",
        dateModified: "2026-07-06T00:00:00Z",
        breadcrumb: trail,
        article: {
            headline: "The deal is decided before the first call",
            datePublished: "2026-07-06T00:00:00Z",
            about: ["answer engine optimization", "AEO", "B2B buyer journey", "AI search", "citation optimization"],
        },
        faq: FAQS.aeoPlaybook,
        extra: [
            {
                "@type": "Service",
                "@id": serviceId("/aeo-playbook"),
                name: "Answer Engine Optimization Consulting",
                description:
                    "Structuring B2B content, schema, and reputation so AI systems extract, trust, and cite the brand as the answer to buyer questions — before the first sales call happens.",
                provider: { "@id": ID.person },
                serviceType: "Answer Engine Optimization",
                areaServed: { "@type": "Country", name: "United States" },
                audience: {
                    "@type": "BusinessAudience",
                    audienceType: "B2B SaaS and services companies",
                    numberOfEmployees: {
                        "@type": "QuantitativeValue",
                        minValue: 200,
                        maxValue: 5000,
                    },
                },
            },
        ],
    });

    return (
        <PagefindBoundary section="Services">
            <JsonLd schema={graph} />
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>
            <AEOPlaybookClient />
        </PagefindBoundary>
    );
}
