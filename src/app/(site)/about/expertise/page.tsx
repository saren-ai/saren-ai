import type { Metadata } from "next";
import ExpertiseClient from "./ExpertiseClient";
import JsonLd from "@/components/seo/JsonLd";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Subject Matter Expertise Timeline | Saren",
  description:
    "An interactive visualizer tracing two decades of digital marketing trends and subject matter expertise across 420 research and project library files (2003–2024).",
  alternates: { canonical: "https://saren.ai/about/expertise" },
  openGraph: {
    title: "Subject Matter Expertise Timeline | Saren",
    description:
      "An interactive visualizer tracing two decades of digital marketing trends and subject matter expertise across 420 research and project library files (2003–2024).",
    images: ["/images/og/about.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subject Matter Expertise Timeline | Saren",
    description:
      "An interactive visualizer tracing two decades of digital marketing trends and subject matter expertise across 420 research and project library files (2003–2024).",
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
          "name": "Subject Matter Expertise Timeline | Saren",
          "description":
            "An interactive visualizer tracing two decades of digital marketing trends and subject matter expertise across 420 research and project library files (2003–2024).",
          "isPartOf": { "@id": "https://saren.ai/#website" },
          "about": { "@id": "https://saren.ai/#person" },
          "author": { "@id": "https://saren.ai/#person" },
          "inLanguage": "en-US",
          "dateModified": "2026-05-21",
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
              "name": "Expertise Timeline",
              "item": "https://saren.ai/about/expertise",
            },
          ],
        }}
      />
      <ExpertiseClient />
    </PagefindBoundary>
  );
}
