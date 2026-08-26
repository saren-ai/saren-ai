import type { Metadata } from "next";
import LayerPageClient from "@/components/agentic-web/LayerPageClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";
import { LAYERS } from "@/lib/agentic-web/layers";

const layer = LAYERS.find((l) => l.slug === "human-experience")!;

const trail = [
    { href: "/", label: "Home" },
    { href: "/agentic-web", label: "The Agentic Web" },
    { label: "Human Experience" },
];

const DESCRIPTION =
    "Layer 01 of the agentic web: the part of a site a person actually reads and decides from. What good looks like, what it costs when it's missing, and how it gets fixed.";

export const metadata: Metadata = {
    title: "Human Experience | The agentic web | Saren Sakurai",
    description: DESCRIPTION,
    alternates: { canonical: "https://saren.ai/agentic-web/human-experience" },
    openGraph: {
        title: "Human Experience | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Human Experience | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
    },
};

export default function HumanExperiencePage() {
    const graph = buildGraph({
        path: "/agentic-web/human-experience",
        pageType: "TechArticle",
        name: "Human Experience | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        dateModified: "2026-08-26T00:00:00Z",
        breadcrumb: trail,
    });

    return (
        <PagefindBoundary section="The Agentic Web">
            <JsonLd schema={graph} />
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>
            <LayerPageClient layer={layer} />
        </PagefindBoundary>
    );
}
