import ConcertsClient from "./ConcertsClient";
import { Metadata } from "next";
import { getAllConcerts } from "@/lib/db";
import JsonLd from "@/components/seo/JsonLd";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
    title: "I Saw All Sub-Cultural Bands | Saren",
    description: "A chronological calendar of concerts attended by Saren Sakurai — from post-hardcore and noise rock to ambient and jazz.",
    alternates: { canonical: "https://saren.ai/about/concerts" },
};

// Next.js dynamic rendering because of database reading from filesystem
export const dynamic = 'force-dynamic';

const MONTH_NUM: Record<string, string> = {
    JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
    JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

export default function ConcertsPage() {
    const concerts = getAllConcerts();

    const eventItems = concerts.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
            "@type": "Event",
            "name": `${c.artist} at ${c.venue}`,
            "startDate": `${c.date_year}-${MONTH_NUM[c.date_month] ?? "01"}-${String(c.date_day).padStart(2, "0")}`,
            "location": {
                "@type": "Place",
                "name": c.venue,
                "address": c.location,
            },
            "performer": {
                "@type": "MusicGroup",
                "name": c.artist,
            },
            "organizer": { "@id": "https://saren.ai/#person" },
        },
    }));

    return (
        <PagefindBoundary section="About">
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
            <JsonLd schema={{
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Concerts Attended by Saren Sakurai",
                "description": "A chronological list of concerts attended from 1982 to 2008.",
                "numberOfItems": concerts.length,
                "itemListElement": eventItems,
            }} />
            <ConcertsClient concerts={concerts} />
        </PagefindBoundary>
    );
}
