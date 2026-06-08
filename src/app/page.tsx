import type { Metadata } from "next";
import HomeClient from "./HomeClient";


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
            "inLanguage": "en-US",
            "potentialAction": {
              "@type": "ContactAction",
              "target": "https://saren.ai/contact",
              "name": "Inquire about fractional CMO or AI marketing operations services"
            }
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
            "@type": "ProfessionalService",
            "@id": "https://saren.ai/#fractional-cmo-service",
            "name": "Fractional CMO & AI-Native Demand Generation",
            "description": "Full-funnel demand generation infrastructure for B2B SaaS and cybersecurity companies. AI-powered lead scoring, intent signal activation, multi-agent marketing workflows, and pipeline attribution systems that produce predictable revenue.",
            "provider": { "@id": "https://saren.ai/#person" },
            "serviceType": ["Fractional CMO", "Demand Generation", "AI Marketing Operations"],
            "areaServed": [
              { "@type": "Country", "name": "United States" },
              { "@type": "Country", "name": "Canada" }
            ],
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": "B2B SaaS and cybersecurity companies (Series A–C, 10–500 employees)",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 10,
                "maxValue": 500
              }
            },
            "url": "https://saren.ai/contact",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Fractional CMO & AI GTM Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Fractional CMO",
                    "description": "Strategic marketing leadership (10–20 hours/week) for system building, demand generation, and team development in early-stage B2B SaaS and cybersecurity."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI-Native Demand Generation Architecture",
                    "description": "Building agentic GTM systems: multi-step intent signal pipelines, AI-augmented SDR workflows, full-funnel attribution, and predictive lead scoring models."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Answer Engine Optimization (AEO)",
                    "description": "Structuring B2B website content and JSON-LD schemas to appear in AI-generated answers from Perplexity, ChatGPT, Claude, and other LLM-powered search engines."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Marketing Operations Audit",
                    "description": "Diagnosing pipeline leaks, CAC inefficiencies, and automation gaps — with a documented playbook for remediation."
                  }
                }
              ]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": "https://saren.ai/#profilepage",
            "url": "https://saren.ai",
            "name": "Saren Sakurai | Fractional CMO & AI Operations Consultant",
            "description": "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
            "mainEntity": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "image": "https://saren.ai/og-image.png",
            "inLanguage": "en-US",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <HomeClient />
    </>
  );
}
