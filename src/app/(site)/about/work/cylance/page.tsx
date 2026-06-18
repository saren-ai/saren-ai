import type { Metadata } from "next";
import CylanceClient from "./CylanceClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Cylance | Saren.ai",
  description:
    "How I built Cylance's demand generation engine from scratch — a $1M+ site rebuild, intent-driven content funnel, SiriusDecisions framework rollout, and $4M in quarterly pipeline.",
  alternates: { canonical: "https://saren.ai/about/work/cylance" },
  openGraph: {
    title: "Cylance | Saren.ai",
    description:
      "$4M in quarterly pipeline: the AEM rebuild, the intent funnel, and the SiriusDecisions overhaul that scaled Cylance from startup to $400M+.",
  },
};

export default function CylancePage() {
  return (
    <PagefindBoundary section="About">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://saren.ai/about/work/cylance/#article",
            url: "https://saren.ai/about/work/cylance",
            headline: "Cylance — Director of Demand Generation",
            description:
              "How Saren Sakurai built the demand generation engine at Cylance — $4M in quarterly pipeline through an AEM site rebuild, intent-driven content funnel, and SiriusDecisions framework rollout.",
            author: { "@id": "https://saren.ai/#person" },
            isPartOf: { "@id": "https://saren.ai/#website" },
            inLanguage: "en-US",
            dateModified: "2026-06-03",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://saren.ai" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://saren.ai/about" },
              { "@type": "ListItem", position: 3, name: "Cylance", item: "https://saren.ai/about/work/cylance" },
            ],
          }),
        }}
      />
      <CylanceClient />
    </PagefindBoundary>
  );
}
