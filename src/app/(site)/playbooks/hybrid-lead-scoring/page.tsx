import type { Metadata } from "next";
import dynamic from "next/dynamic";

const HybridScoringClient = dynamic(() => import("./HybridScoringClient"), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-slate">Loading calculator…</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Lead Scoring in 2026: The Hybrid Architecture That Works — saren.ai",
  description:
    "An interactive hybrid scoring model + a practitioner's framework for upgrading HubSpot lead scoring post the August 2025 overhaul. Free print-to-PDF setup blueprint.",
  alternates: { canonical: "https://saren.ai/playbooks/hybrid-lead-scoring" },
  openGraph: {
    title: "Lead Scoring in 2026: The Hybrid Architecture That Works — saren.ai",
    description:
      "An interactive hybrid scoring model + a practitioner's framework for upgrading HubSpot lead scoring post the August 2025 overhaul. Free print-to-PDF setup blueprint.",
    images: ["/images/portfolio/portfolio-lead-scoring.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Scoring in 2026: The Hybrid Architecture That Works",
    description:
      "An interactive hybrid scoring model + a practitioner's framework for upgrading HubSpot lead scoring post the August 2025 overhaul. Free print-to-PDF setup blueprint.",
    images: ["/images/portfolio/portfolio-lead-scoring.png"],
  },
};

export default function HybridLeadScoringPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://saren.ai/playbooks/hybrid-lead-scoring/#article",
    name: "Lead Scoring in 2026: The Hybrid Architecture That Works",
    headline: "Lead Scoring in 2026: The Hybrid Architecture That Works",
    description:
      "An interactive hybrid scoring model and practitioner's framework for upgrading HubSpot lead scoring after the August 2025 overhaul.",
    url: "https://saren.ai/playbooks/hybrid-lead-scoring",
    author: {
      "@type": "Person",
      "@id": "https://saren.ai/#person",
      name: "Saren Peetz",
      url: "https://saren.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Identogram LLC",
      url: "https://saren.ai",
    },
    datePublished: "2026-05-24T00:00:00Z",
    dateModified: "2026-05-24T00:00:00Z",
    isPartOf: { "@id": "https://saren.ai/#website" },
    image: {
      "@type": "ImageObject",
      url: "https://saren.ai/images/portfolio/portfolio-lead-scoring.png",
      width: 1200,
      height: 630,
    },
    inLanguage: "en-US",
    about: [
      "Lead scoring",
      "HubSpot",
      "B2B marketing",
      "Revenue operations",
      "AI predictive scoring",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saren.ai" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://saren.ai/portfolio" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hybrid Lead Scoring",
        item: "https://saren.ai/playbooks/hybrid-lead-scoring",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HybridScoringClient />
    </>
  );
}
