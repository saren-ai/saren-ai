import type { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph, definedTermSetNode } from "@/lib/schema";
import { GLOSSARY } from "@/lib/agentic-web/glossary";

const trail = [
    { href: "/", label: "Home" },
    { href: "/agentic-web", label: "The Agentic Web" },
    { label: "Glossary" },
];

const DESCRIPTION =
    "Agentic web, AEO, GEO, llms.txt, MCP, entity, citation share, RAG, and more, defined in one place and linked to where each term applies on this site.";

export const metadata: Metadata = {
    title: "Glossary | The agentic web | Saren Sakurai",
    description: DESCRIPTION,
    alternates: { canonical: "https://saren.ai/agentic-web/glossary" },
    openGraph: {
        title: "Glossary | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Glossary | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        images: ["/images/og/home.png"],
    },
};

const termSet = definedTermSetNode(
    {
        name: "The agentic web glossary",
        description: DESCRIPTION,
        terms: GLOSSARY.map((g) => ({ term: g.term, definition: g.definition })),
    },
    "/agentic-web/glossary"
);

export default function GlossaryPage() {
    const graph = buildGraph({
        path: "/agentic-web/glossary",
        pageType: "CollectionPage",
        name: "Glossary | The agentic web | Saren Sakurai",
        description: DESCRIPTION,
        dateModified: "2026-08-26T00:00:00Z",
        breadcrumb: trail,
        extra: [termSet],
    });

    return (
        <PagefindBoundary section="The Agentic Web">
            <JsonLd schema={graph} />
            <div className="border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>
            <GlossaryClient />
        </PagefindBoundary>
    );
}
