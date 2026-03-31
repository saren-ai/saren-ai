import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import HalcyonTab from "@/components/layout/HalcyonTab";

export const metadata: Metadata = {
  title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
  description:
    "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
  alternates: { canonical: "https://saren.ai" },
  openGraph: {
    title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
    description:
      "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
    images: ["/images/og/home.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
    description:
      "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
    images: ["/images/og/home.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://saren.ai/#website",
            "url": "https://saren.ai",
            "name": "saren.ai",
            "description": "Fractional CMO and AI Operations Consultant — B2B SaaS go-to-market strategy, demand generation, and AI-powered marketing systems.",
            "publisher": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/#webpage",
            "url": "https://saren.ai",
            "name": "Saren Sakurai | Fractional CMO & AI Operations Consultant",
            "description": "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
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
            "@type": "Service",
            "@id": "https://saren.ai/#fractional-cmo-service",
            "name": "Fractional CMO & Demand Generation Consulting",
            "description": "Full-funnel demand generation infrastructure for complex B2B and cybersecurity companies — frameworks, scoring models, attribution, and AI-augmented marketing operations.",
            "provider": { "@id": "https://saren.ai/#person" },
            "serviceType": "Fractional CMO",
            "areaServed": { "@type": "Country", "name": "United States" },
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": "B2B SaaS companies",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 10,
                "maxValue": 500
              }
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Fractional CMO & AI GTM Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Fractional CMO",
                    "description": "Strategic marketing leadership (10–20 hours/week) for system building, demand generation, and team development."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Demand Generation Architecture",
                    "description": "Building AI-driven growth engines for early-stage and Series A startups — from pipeline frameworks to full-funnel attribution systems."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI-Augmented Marketing Operations",
                    "description": "Scoring models, attribution frameworks, and signal-based outreach pipelines that turn chaotic spend into predictable pipeline."
                  }
                }
              ]
            }
          })
        }}
      />
      <HomeClient />
      <HalcyonTab />
    </>
  );
}
