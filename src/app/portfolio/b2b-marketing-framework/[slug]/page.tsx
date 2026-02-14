import { FRAMEWORK_PROMPTS } from "@/data/marketing-framework";
import PromptDetailView from "@/components/framework/PromptDetailView";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

    return (
        <PromptDetailView
            prompt={prompt}
            prevPrompt={prevPrompt}
            nextPrompt={nextPrompt}
        />
    );
}
