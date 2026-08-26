import type { Metadata } from "next";
import LayerPageClient from "@/components/agentic-web/LayerPageClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";
import { LAYERS } from "@/lib/agentic-web/layers";

const layer = LAYERS.find((l) => l.slug === "machine-readability")!;

const trail = [
    { href: "/", label: "Home" },
    { href: "/agentic-web", label: "The Agentic Web" },
    { label: "Machine Readability" },
];

const DESCRIPTION =
    "Layer 02 of the agentic web: entity definition, schema, and structured argument, built so a retrieval model can extract a stable, accurate answer.";

export const metadata: Metadata = {
    title: "Machine Readability | The agentic web | Saren Sakurai",
    description: DESCRIPTION,
    alternates: { canonical: "https://saren.ai/agentic-web/machine-readability" },
    openGraph: {
        title: "Machine Readability | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Machine Readability | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
    },
};

export default function MachineReadabilityPage() {
    const graph = buildGraph({
        path: "/agentic-web/machine-readability",
        pageType: "TechArticle",
        name: "Machine Readability | The agentic web | Saren Sakurai",
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
