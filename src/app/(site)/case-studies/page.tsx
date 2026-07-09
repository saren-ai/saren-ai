import type { Metadata } from "next";
import CaseStudiesPageContent from "./CaseStudiesPageContent";

export const metadata: Metadata = {
  title: "B2B Case Studies — Pipeline Programs, Demand Gen & Outbound | Saren.ai",
  description:
    "Real B2B case studies: $4M quarterly pipeline at Cylance, 42% meeting rate on cold outbound, intent data programs, and dynamic nurture systems. Proof over promises.",
  alternates: { canonical: "https://saren.ai/case-studies" },
  openGraph: {
    title: "B2B Case Studies — Pipeline Programs, Demand Gen & Outbound | Saren.ai",
    description:
      "Real B2B case studies: $4M quarterly pipeline at Cylance, 42% meeting rate on cold outbound, intent data programs, and dynamic nurture systems. Proof over promises.",
    url: "https://saren.ai/case-studies",
    siteName: "Saren.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Case Studies — Pipeline Programs, Demand Gen & Outbound | Saren.ai",
    description:
      "$4M quarterly pipeline at Cylance, 42% meeting rate on cold outbound, intent data programs, and dynamic nurture systems.",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/case-studies/#webpage",
            "url": "https://saren.ai/case-studies",
            "name": "Case Studies | Saren.ai",
            "description": "Enterprise B2B case studies demonstrating pipeline programs, demand generation architecture, and sales systems.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-05-28T00:00:00Z"
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
              { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://saren.ai/case-studies" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://saren.ai/case-studies/#list",
            "name": "Case Studies — Saren Sakurai",
            "description": "B2B pipeline programs, demand generation architectures, and outbound systems built from real enterprise engagements.",
            "numberOfItems": 8,
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "url": "https://saren.ai/case-studies/120-day-content-journey",        "name": "120-Day Content Journey" },
              { "@type": "ListItem", "position": 2, "url": "https://saren.ai/case-studies/10-touch-sales-play",            "name": "10-Touch Sales Play" },
              { "@type": "ListItem", "position": 3, "url": "https://saren.ai/case-studies/intent-data",                    "name": "Intent Data as Funnel Intelligence" },
              { "@type": "ListItem", "position": 4, "url": "https://saren.ai/case-studies/dynamic-nurture",                "name": "Dynamic Email Nurture" },
              { "@type": "ListItem", "position": 5, "url": "https://saren.ai/case-studies/executive-dashboard",            "name": "Demand Gen Command Center" },
              { "@type": "ListItem", "position": 6, "url": "https://saren.ai/case-studies/sovereign-personas",             "name": "Sovereign Buyer Personas" },
              { "@type": "ListItem", "position": 7, "url": "https://saren.ai/case-studies/authority-engineering",          "name": "Authority Engineering Process" },
              { "@type": "ListItem", "position": 8, "url": "https://saren.ai/case-studies/thought-leadership-development", "name": "Thought Leadership Development" }
            ]
          })
        }}
      />
      <CaseStudiesPageContent />
    </>
  );
}
