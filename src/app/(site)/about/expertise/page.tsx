import type { Metadata } from "next";
import ExpertiseClient from "./ExpertiseClient";
import JsonLd from "@/components/seo/JsonLd";
import PagefindBoundary from "@/components/search/PagefindBoundary";

const DESCRIPTION =
  "An interactive index of my Obsidian research vault: 650+ cataloged references across 63 research threads, from 2003 to 2026 — the raw material behind every framework and playbook on this site.";

export const metadata: Metadata = {
  title: "The Marketing Brain — 20 Years of Research, Linked | Saren",
  description: DESCRIPTION,
  alternates: { canonical: "https://saren.ai/about/expertise" },
  openGraph: {
    title: "The Marketing Brain — 20 Years of Research, Linked | Saren",
    description: DESCRIPTION,
    images: ["/images/og/about.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Marketing Brain — 20 Years of Research, Linked | Saren",
    description: DESCRIPTION,
    images: ["/images/og/about.png"],
  },
};

export default function ExpertisePage() {
  return (
    <PagefindBoundary section="About">
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://saren.ai/about/expertise/#webpage",
          "url": "https://saren.ai/about/expertise",
          "name": "The Marketing Brain — 20 Years of Research, Linked | Saren",
          "description": DESCRIPTION,
          "isPartOf": { "@id": "https://saren.ai/#website" },
          "about": { "@id": "https://saren.ai/#person" },
          "author": { "@id": "https://saren.ai/#person" },
          "inLanguage": "en-US",
          "dateModified": "2026-07-02",
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://saren.ai/about" },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Marketing Brain",
              "item": "https://saren.ai/about/expertise",
            },
          ],
        }}
      />
      <ExpertiseClient />
    </PagefindBoundary>
  );
}
