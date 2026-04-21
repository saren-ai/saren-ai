import { Metadata } from "next";
import BrandClient from "./BrandClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Brand Style Guide | Saren.ai",
    description: "The visual language of Saren.ai. Fire Horse 2026 design system — colors, typography, components, and animation patterns.",
    alternates: { canonical: "https://saren.ai/about/brand" },
};

export default function BrandPage() {
    return (
        <>
            <JsonLd schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://saren.ai/about/brand/#webpage",
                "url": "https://saren.ai/about/brand",
                "name": "Brand Style Guide | Saren.ai",
                "description": "The visual language of Saren.ai. Fire Horse 2026 design system — colors, typography, components, and animation patterns.",
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
                    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://saren.ai/about" },
                    { "@type": "ListItem", "position": 3, "name": "Brand Style Guide", "item": "https://saren.ai/about/brand" }
                ]
            }} />
            <JsonLd schema={{
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                "@id": "https://saren.ai/about/brand/#work",
                "name": "Fire Horse 2026 Design System",
                "description": "The complete visual language for Saren.ai — token-based color system with WCAG AA compliance, Sora and JetBrains Mono typography, component library, and Framer Motion animation patterns.",
                "url": "https://saren.ai/about/brand",
                "author": { "@id": "https://saren.ai/#person" },
                "creator": { "@id": "https://saren.ai/#person" },
                "isPartOf": { "@id": "https://saren.ai/#website" },
                "about": ["Design systems", "Brand identity", "UI component library", "WCAG accessibility"],
                "keywords": "design system, brand identity, Fire Horse, color tokens, typography, WCAG accessibility, Tailwind v4",
                "inLanguage": "en-US",
                "dateCreated": "2026-02-01",
                "dateModified": "2026-04-01"
            }} />
            <BrandClient />
        </>
    );
}
