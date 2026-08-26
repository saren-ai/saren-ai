import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, ID, serviceId } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Saren Sakurai | GTM Engineer — Fractional Marketing Lead & AI Operations",
  description:
    "GTM Engineer in Orange County, CA. I build AI-driven demand systems that turn marketing spend into repeatable pipeline for B2B SaaS and cybersecurity teams.",
  alternates: { canonical: "https://saren.ai" },
  openGraph: {
    title: "Saren Sakurai | GTM Engineer — Fractional Marketing Lead & AI Operations",
    description:
      "GTM Engineer in Orange County, CA. I build AI-driven demand systems that turn marketing spend into repeatable pipeline for B2B SaaS and cybersecurity teams.",
    images: ["/images/og/home.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saren Sakurai | GTM Engineer — Fractional Marketing Lead & AI Operations",
    description:
      "GTM Engineer in Orange County, CA. I build AI-driven demand systems that turn marketing spend into repeatable pipeline for B2B SaaS and cybersecurity teams.",
    images: ["/images/og/home.png"],
  },
};

// Same entity as fractional-marketing-lead/page.tsx's Service node — shared @id so
// Google/answer engines merge the two descriptions of one offering.
const fractionalMarketingLeadService = {
  "@type": "ProfessionalService",
  "@id": serviceId("/fractional-marketing-lead"),
  name: "Fractional Marketing Lead & AI-Native Demand Generation",
  description:
    "Full-funnel demand generation infrastructure for B2B SaaS and cybersecurity companies. AI-powered lead scoring, intent signal activation, multi-agent marketing workflows, and pipeline attribution systems that produce predictable revenue.",
  provider: { "@id": ID.person },
  serviceType: ["Fractional Marketing Lead", "Demand Generation", "AI Marketing Operations"],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "B2B SaaS and cybersecurity companies (Series A–C, 10–500 employees)",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 500,
    },
  },
  url: "https://saren.ai/contact",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fractional Marketing Lead & AI GTM Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fractional Marketing Lead",
          description:
            "Strategic marketing leadership (10–20 hours/week) for system building, demand generation, and team development in early-stage B2B SaaS and cybersecurity.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Native Demand Generation Architecture",
          description:
            "Building agentic GTM systems: multi-step intent signal pipelines, AI-augmented SDR workflows, full-funnel attribution, and predictive lead scoring models.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Answer Engine Optimization (AEO)",
          description:
            "Structuring B2B website content and JSON-LD schemas to appear in AI-generated answers from Perplexity, ChatGPT, Claude, and other LLM-powered search engines.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marketing Operations Audit",
          description: "Diagnosing pipeline leaks, CAC inefficiencies, and automation gaps — with a documented playbook for remediation.",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={buildGraph({
          path: "/",
          pageType: "ProfilePage",
          identity: "full",
          name: "Saren Sakurai | GTM Engineer — Fractional Marketing Lead & AI Operations",
          description:
            "GTM Engineer in Orange County, CA. I build AI-driven demand systems that turn marketing spend into repeatable pipeline for B2B SaaS and cybersecurity teams.",
          image: "https://saren.ai/images/og/home.png",
          dateModified: "2026-07-05T00:00:00Z",
          extra: [fractionalMarketingLeadService],
        })}
      />
      <HomeClient />
    </>
  );
}
