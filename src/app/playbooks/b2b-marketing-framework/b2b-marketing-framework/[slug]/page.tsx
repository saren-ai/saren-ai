import { FRAMEWORK_PROMPTS } from "@/data/marketing-framework";
import PromptDetailView from "@/components/framework/PromptDetailView";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

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

    const url = `https://saren.ai/playbooks/b2b-marketing-framework/${prompt.slug}`;

    return (
        <>
            <JsonLd schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": `${url}/#webpage`,
                "url": url,
                "name": `${prompt.title} | B2B Marketing Framework`,
                "description": prompt.hook,
                "isPartOf": { "@id": "https://saren.ai/#website" },
                "author": { "@id": "https://saren.ai/#person" },
                "inLanguage": "en-US",
                "dateModified": "2026-04-01"
            }} />
            <JsonLd schema={{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
                    { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saren.ai/portfolio" },
                    { "@type": "ListItem", "position": 3, "name": "B2B Marketing Framework", "item": "https://saren.ai/playbooks/b2b-marketing-framework" },
                    { "@type": "ListItem", "position": 4, "name": prompt.title, "item": url }
                ]
            }} />
            <JsonLd schema={{
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                "@id": `${url}/#work`,
                "name": prompt.title,
                "description": prompt.hook,
                "url": url,
                "author": { "@id": "https://saren.ai/#person" },
                "creator": { "@id": "https://saren.ai/#person" },
                "isPartOf": {
                    "@type": "CreativeWork",
                    "@id": "https://saren.ai/playbooks/b2b-marketing-framework/#work",
                    "name": "B2B Marketing Framework: 23-Step Buyer Journey System"
                },
                "about": ["B2B SaaS go-to-market strategy", "Messaging frameworks", prompt.level],
                "keywords": `B2B marketing, ${prompt.level.toLowerCase()}, ${prompt.title.toLowerCase()}, go-to-market, messaging framework, SaaS`,
                "teaches": prompt.hook,
                "educationalUse": "Professional development",
                "inLanguage": "en-US",
                "dateCreated": "2026-02-03",
                "dateModified": "2026-04-01"
            }} />
            <PromptDetailView
                prompt={prompt}
                prevPrompt={prevPrompt}
                nextPrompt={nextPrompt}
            />
        </>
    );
}
