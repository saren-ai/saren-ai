import { FRAMEWORK_PROMPTS } from "@/data/marketing-framework";
import PromptDetailView from "@/components/framework/PromptDetailView";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph, workId } from "@/lib/schema";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return FRAMEWORK_PROMPTS.map((prompt) => ({
        slug: prompt.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const prompt = FRAMEWORK_PROMPTS.find((p) => p.slug === slug);

    if (!prompt) {
        return {
            title: "Prompt Not Found",
        };
    }

    return {
        title: `${prompt.title} | B2B Marketing Framework`,
        description: prompt.hook,
        alternates: { canonical: `https://saren.ai/playbooks/b2b-marketing-framework/${prompt.slug}` },
    };
}

export default async function FrameworkPromptPage({ params }: PageProps) {
    const { slug } = await params;
    const promptIndex = FRAMEWORK_PROMPTS.findIndex((p) => p.slug === slug);
    const prompt = FRAMEWORK_PROMPTS[promptIndex];

    if (!prompt) {
        notFound();
    }

    const prevPrompt = promptIndex > 0 ? FRAMEWORK_PROMPTS[promptIndex - 1] : undefined;
    const nextPrompt = promptIndex < FRAMEWORK_PROMPTS.length - 1 ? FRAMEWORK_PROMPTS[promptIndex + 1] : undefined;

    const path = `/playbooks/b2b-marketing-framework/${prompt.slug}`;
    const url = `https://saren.ai${path}`;
    const trail = [
        { href: "/", label: "Home" },
        { href: "/playbooks", label: "Playbooks" },
        { href: "/playbooks/b2b-marketing-framework", label: "B2B Marketing Framework" },
        { label: prompt.title },
    ];

    const work = {
        "@type": "CreativeWork",
        "@id": workId(path),
        name: prompt.title,
        description: prompt.hook,
        url,
        author: { "@id": "https://saren.ai/#person" },
        creator: { "@id": "https://saren.ai/#person" },
        // References the CreativeWork the parent page now defines for real.
        isPartOf: { "@id": workId("/playbooks/b2b-marketing-framework") },
        about: ["B2B SaaS go-to-market strategy", "Messaging frameworks", prompt.level],
        keywords: `B2B marketing, ${prompt.level.toLowerCase()}, ${prompt.title.toLowerCase()}, go-to-market, messaging framework, SaaS`,
        teaches: prompt.hook,
        educationalUse: "Professional development",
        inLanguage: "en-US",
        dateCreated: "2026-02-03",
        dateModified: "2026-04-01T00:00:00Z",
    };

    const graph = buildGraph({
        path,
        name: `${prompt.title} | B2B Marketing Framework`,
        description: prompt.hook,
        dateModified: "2026-04-01T00:00:00Z",
        breadcrumb: trail,
        extra: [work],
    });

    return (
        <>
            <JsonLd schema={graph} />
            <div className="container-narrow pt-6">
                <Breadcrumb trail={trail} />
            </div>
            <PromptDetailView
                prompt={prompt}
                prevPrompt={prevPrompt}
                nextPrompt={nextPrompt}
            />
        </>
    );
}
