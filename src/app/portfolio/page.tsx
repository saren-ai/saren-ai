import type { Metadata } from "next";
import PortfolioPageContent from "./PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio | Saren.ai",
  description:
    "Interactive case studies and frameworks demonstrating strategic marketing, demand generation, and AI-assisted creative production.",
  alternates: { canonical: "https://saren.ai/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/portfolio/#webpage",
            "url": "https://saren.ai/portfolio",
            "name": "Portfolio | Saren.ai",
            "description": "Interactive case studies and frameworks demonstrating strategic marketing, demand generation, and AI-assisted creative production.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saren.ai/portfolio" }
            ]
          })
        }}
      />
      <PortfolioPageContent />
    </>
  );
}
