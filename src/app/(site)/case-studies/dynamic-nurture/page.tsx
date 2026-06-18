import type { Metadata } from "next";
import DynamicNurtureClient from "./DynamicNurtureClient";

export const metadata: Metadata = {
  title: "Dynamic B2B Email Nurture — Score-Gated Personalization | Saren.ai",
  description:
    "A score-gated nurture system that delivers different content to the right person at the right funnel stage — automatically. 9 content variants across 3 segments and 3 stages. Built on HubSpot.",
  alternates: { canonical: "https://saren.ai/case-studies/dynamic-nurture" },
  openGraph: {
    title: "Dynamic B2B Email Nurture — Score-Gated Personalization | Saren.ai",
    description:
      "A score-gated nurture system with 9 content variants across 3 segments and 3 funnel stages. Sales handoff triggers at 75 behavioral points. Built on HubSpot.",
    url: "https://saren.ai/case-studies/dynamic-nurture",
    siteName: "Saren.ai",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic B2B Email Nurture — Score-Gated Personalization | Saren.ai",
    description:
      "9 content variants, 3 segments, 3 funnel stages. Score-gated nurture with sales handoff triggers at 75 behavioral points.",
  },
};

export default function DynamicNurturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/case-studies/dynamic-nurture/#webpage",
            "url": "https://saren.ai/case-studies/dynamic-nurture",
            "name": "Dynamic Email Nurture | Saren Sakurai",
            "description": "A system that delivers different content to the right person at the right stage — automatically. The matrix, routing logic, and scoring model behind a fully personalized B2B nurture engine.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateCreated": "2026-01-15",
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
              { "@type": "ListItem", "position": 3, "name": "Dynamic Email Nurture", "item": "https://saren.ai/case-studies/dynamic-nurture" }
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
            "@id": "https://saren.ai/case-studies/dynamic-nurture/#work",
            "name": "Dynamic Email Nurture",
            "description": "A fully personalized B2B email nurture engine that routes the right content to the right person at the right stage — automatically. Built on a 3×3 segment-stage matrix (Enterprise, SMB, Individual × Awareness, Consideration, Decision) with scoring-driven routing logic.",
            "url": "https://saren.ai/case-studies/dynamic-nurture",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["Email nurture", "Marketing automation", "Demand generation", "Lead scoring"],
            "keywords": "email nurture, marketing automation, demand generation, lead scoring, B2B email, nurture matrix, personalization, HubSpot",
            "teaches": "Building a segment-stage email nurture matrix with behavioral routing logic",
            "inLanguage": "en-US",
            "dateCreated": "2026-01-15",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://saren.ai/case-studies/dynamic-nurture/#article",
            "headline": "Dynamic email nurture: score-gated personalization on HubSpot",
            "description": "A score-gated nurture system that delivers different content to the right person at the right funnel stage — automatically. 9 content variants across 3 segments and 3 stages. Built on HubSpot.",
            "url": "https://saren.ai/case-studies/dynamic-nurture",
            "mainEntityOfPage": { "@id": "https://saren.ai/case-studies/dynamic-nurture/#webpage" },
            "author": { "@id": "https://saren.ai/#person" },
            "publisher": { "@id": "https://identogram.com/#organization" },
            "image": "https://saren.ai/images/og/home.png",
            "about": ["email nurture", "marketing automation", "lead scoring"],
            "inLanguage": "en-US",
            "datePublished": "2026-03-27",
            "dateModified": "2026-05-28"
          })
        }}
      />
      <DynamicNurtureClient />
    </>
  );
}
