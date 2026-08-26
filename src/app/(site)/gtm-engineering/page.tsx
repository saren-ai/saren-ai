import type { Metadata } from "next";
import GTMEngineeringClient from "./GTMEngineeringClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";
import { FAQS } from "@/data/faqs";

const trail = [{ href: "/", label: "Home" }, { label: "GTM Engineering" }];

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
    const graph = buildGraph({
        path: "/gtm-engineering",
        pageType: "WebPage",
        name: "GTM Engineering | Saren.ai",
        description:
            "GTM Engineering replaces campaign-centric demand generation with a systems-thinking approach to pipeline — instrumented layers of data, scoring, content, spend, AI, and channel engineered into one measurable demand engine.",
        dateModified: "2026-06-19T00:00:00Z",
        breadcrumb: trail,
        article: {
            headline: "GTM Engineering: demand as an engineered system, not a campaign calendar",
            datePublished: "2026-06-19T00:00:00Z",
            about: ["GTM Engineering", "demand generation systems", "B2B demand engineering", "marketing operations", "AI orchestration"],
        },
        faq: FAQS.gtmEngineering,
    });

    return (
        <PagefindBoundary section="Services">
            <JsonLd schema={graph} />
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>
            <GTMEngineeringClient />
        </PagefindBoundary>
    );
}
