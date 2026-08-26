import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, ID, serviceId } from "@/lib/schema";

const TITLE = "Saren Sakurai | AI-native website architecture";
const DESCRIPTION =
  "Your site's job used to be getting found and read by a person. Now the first contact is an agent. I build AI-native websites: legible to models, usable by agents, and still built to sell.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://saren.ai" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og/home.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og/home.png"],
  },
};

const architecturePracticeService = {
  "@type": "ProfessionalService",
  "@id": serviceId("/services/architecture-partner"),
  name: "AI-Native Website Architecture",
  description:
    "Ongoing ownership of a company's machine-readable and agent-access layers, as standards, crawlers, and model behavior change. Entry points are a fixed-scope AI-native build and an agentic readiness audit.",
  provider: { "@id": ID.person },
  serviceType: ["AI-Native Website Architecture", "Machine Readability", "Agent Access", "Answer Engine Optimization"],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "B2B companies whose buyers now research and transact through AI agents",
  },
  url: "https://saren.ai/agentic-web",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI-Native Website Architecture Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Architecture Partner",
          description: "Retained ownership of Machine Readability and Agent Access, as the standards and models they're built against keep changing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Native Website Build",
          description: "Fixed-scope build of a site across all three layers: Human Experience, Machine Readability, Agent Access.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agentic Readiness Audit",
          description: "A fixed-scope diagnostic of a site across the three layers, with a checkable scope published in advance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fractional Marketing Lead",
          description: "Strategic marketing leadership (10-20 hours/week) applying the same systems thinking to the whole GTM function.",
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
          name: TITLE,
          description: DESCRIPTION,
          image: "https://saren.ai/images/og/home.png",
          dateModified: "2026-08-26T00:00:00Z",
          extra: [architecturePracticeService],
        })}
      />
      <HomeClient />
    </>
  );
}
