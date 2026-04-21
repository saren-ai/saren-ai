import ConcertsClient from "./ConcertsClient";
import { Metadata } from "next";
import { getAllConcerts } from "@/lib/db";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "I Saw All Sub-Cultural Bands | Saren",
    description: "A chronological calendar of concerts attended by Saren Sakurai — from post-hardcore and noise rock to ambient and jazz.",
    alternates: { canonical: "https://saren.ai/about/concerts" },
};

// Next.js dynamic rendering because of database reading from filesystem
export const dynamic = 'force-dynamic';

export default function ConcertsPage() {
    const concerts = getAllConcerts();

    return (
        <>
            <JsonLd schema={{
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "@id": "https://saren.ai/about/concerts/#webpage",
                "url": "https://saren.ai/about/concerts",
                "name": "I Saw All Sub-Cultural Bands | Saren",
                "description": "A chronological calendar of concerts attended by Saren Sakurai — from post-hardcore and noise rock to ambient and jazz.",
                "isPartOf": { "@id": "https://saren.ai/#website" },
                "about": { "@id": "https://saren.ai/#person" },
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
                    { "@type": "ListItem", "position": 3, "name": "Concerts", "item": "https://saren.ai/about/concerts" }
                ]
            }} />
            <ConcertsClient concerts={concerts} />
        </>
    );
}
