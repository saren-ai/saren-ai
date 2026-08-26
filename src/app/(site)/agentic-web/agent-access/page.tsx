import type { Metadata } from "next";
import LayerPageClient from "@/components/agentic-web/LayerPageClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";
import { LAYERS } from "@/lib/agentic-web/layers";

const layer = LAYERS.find((l) => l.slug === "agent-access")!;

const trail = [
    { href: "/", label: "Home" },
    { href: "/agentic-web", label: "The Agentic Web" },
    { label: "Agent Access" },
];

const DESCRIPTION =
    "Layer 03 of the agentic web: llms.txt, crawler and agent policy, and the machine-actionable paths that let an agent with a task actually complete it.";

export const metadata: Metadata = {
    title: "Agent Access | The agentic web | Saren Sakurai",
    description: DESCRIPTION,
    alternates: { canonical: "https://saren.ai/agentic-web/agent-access" },
    openGraph: {
        title: "Agent Access | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Agent Access | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
    },
};

export default function AgentAccessPage() {
    const graph = buildGraph({
        path: "/agentic-web/agent-access",
        pageType: "TechArticle",
        name: "Agent Access | The agentic web | Saren Sakurai",
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
