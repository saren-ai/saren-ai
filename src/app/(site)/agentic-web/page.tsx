import type { Metadata } from "next";
import AgenticWebClient from "./AgenticWebClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";
import { FAQS } from "@/data/faqs";
import { AGENTIC_WEB_DEFINITION as DEFINITION } from "@/lib/agentic-web/definition";

const trail = [{ href: "/", label: "Home" }, { label: "The Agentic Web" }];

export const metadata: Metadata = {
    title: "The agentic web | Saren Sakurai",
    description: DEFINITION,
    alternates: { canonical: "https://saren.ai/agentic-web" },
    openGraph: {
        title: "The agentic web | Saren Sakurai",
        description: DEFINITION,
        images: ["/images/og/home.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "The agentic web | Saren Sakurai",
        description: DEFINITION,
        images: ["/images/og/home.png"],
    },
};

export default function AgenticWebPage() {
    const graph = buildGraph({
        path: "/agentic-web",
        pageType: "TechArticle",
        name: "The agentic web | Saren Sakurai",
        description: DEFINITION,
        dateModified: "2026-08-26T00:00:00Z",
        breadcrumb: trail,
        faq: FAQS.agenticWeb,
    });

    return (
        <PagefindBoundary section="The Agentic Web">
            <JsonLd schema={graph} />
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>
            <AgenticWebClient />
        </PagefindBoundary>
    );
}
