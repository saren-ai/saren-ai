import type { Metadata } from "next";
import AuthorityEngineeringClient from "./AuthorityEngineeringClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph, howToNode } from "@/lib/schema";

const trail = [
    { href: "/", label: "Home" },
    { href: "/agentic-web", label: "The Agentic Web" },
    { label: "Authority Engineering" },
];

const DESCRIPTION =
    "How to build B2B authority content that a retrieval model actually cites, not just a search engine ranks. A 6-step process, applied as Machine Readability method.";

export const metadata: Metadata = {
    title: "Authority engineering | The agentic web | Saren Sakurai",
    description: DESCRIPTION,
    alternates: { canonical: "https://saren.ai/agentic-web/authority-engineering" },
    openGraph: {
        title: "Authority engineering | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Authority engineering | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
    },
};

const howTo = howToNode(
    {
        name: "Authority engineering: from clicks to citations",
        description: "A 6-step system for building B2B authority content that a retrieval model can cite as a primary source.",
        steps: [
            { name: "The Research Seed", text: "Initialize a research session with instructions referencing 30+ elite consultancies and research houses. This crafts a prompt that moves past surface-level queries into deep industry analysis." },
            { name: "Deep Extraction", text: "Run that prompt in a deep-research mode. Gather the full write-up and the primary source documents it cites into one working folder." },
            { name: "Structural Synthesis", text: "Organize the research into the skeletal structure of the piece and identify the three core claims the argument actually rests on." },
            { name: "Visual IQ", text: "Turn the crucial data into structured tables or diagrams, kept visually consistent across every chart in the piece." },
            { name: "Voice Refinement", text: "Refine the draft against a fixed voice guide so the tone is consistent and every claim carries a citation back to a real source." },
            { name: "High-Fidelity Deployment", text: "Publish with clean markup and Schema.org data so the structure a model needs is actually in the page, not just implied by the prose." },
        ],
    },
    "/agentic-web/authority-engineering"
);

export default function AuthorityEngineeringPage() {
    const graph = buildGraph({
        path: "/agentic-web/authority-engineering",
        pageType: "TechArticle",
        name: "Authority engineering | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        dateModified: "2026-08-26T00:00:00Z",
        breadcrumb: trail,
        extra: [howTo],
    });

    return (
        <PagefindBoundary section="The Agentic Web">
            <JsonLd schema={graph} />
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>
            <AuthorityEngineeringClient />
        </PagefindBoundary>
    );
}
