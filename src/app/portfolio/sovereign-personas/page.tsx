import type { Metadata } from "next";
import SovereignPersonasClient from "./SovereignPersonasClient";

export const metadata: Metadata = {
  title: "Sovereign Personas | Saren.ai",
  description:
    "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
  alternates: { canonical: "https://saren.ai/portfolio/sovereign-personas" },
  openGraph: {
    title: "Sovereign Personas | Saren.ai",
    description:
      "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
    images: ["/images/og/portfolio-sovereign-personas.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign Personas | Saren.ai",
    description:
      "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
    images: ["/images/og/portfolio-sovereign-personas.png"],
  },
};

export default function SovereignPersonasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/portfolio/sovereign-personas/#webpage",
            "url": "https://saren.ai/portfolio/sovereign-personas",
            "name": "Sovereign Personas | Saren.ai",
            "description": "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
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
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saren.ai/portfolio" },
              { "@type": "ListItem", "position": 3, "name": "Sovereign Personas", "item": "https://saren.ai/portfolio/sovereign-personas" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": "https://saren.ai/portfolio/sovereign-personas/#work",
            "name": "Sovereign Personas",
            "description": "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
            "url": "https://saren.ai/portfolio/sovereign-personas",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["B2B persona development", "AI infrastructure market segmentation", "ICP strategy"],
            "keywords": "buyer personas, ICP, sovereign infrastructure, B2B segmentation, enterprise sales",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-03",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <SovereignPersonasClient />
    </>
  );
}
