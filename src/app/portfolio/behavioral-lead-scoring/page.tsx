import type { Metadata } from "next";
import dynamic from "next/dynamic";

const BehavioralScoringClient = dynamic(
  () => import("./BehavioralScoringClient"),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-slate">Loading...</div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Behavioral Lead Scoring | Saren.ai",
  description:
    "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
  alternates: { canonical: "https://saren.ai/portfolio/behavioral-lead-scoring" },
  openGraph: {
    title: "Behavioral Lead Scoring | Saren.ai",
    description:
      "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
    images: ["/images/og/portfolio-lead-scoring.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Behavioral Lead Scoring | Saren.ai",
    description:
      "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
    images: ["/images/og/portfolio-lead-scoring.png"],
  },
};

export default function BehavioralLeadScoringPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/portfolio/behavioral-lead-scoring/#webpage",
            "url": "https://saren.ai/portfolio/behavioral-lead-scoring",
            "name": "Behavioral Lead Scoring | Saren.ai",
            "description": "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
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
              { "@type": "ListItem", "position": 3, "name": "Behavioral Lead Scoring", "item": "https://saren.ai/portfolio/behavioral-lead-scoring" }
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
            "@id": "https://saren.ai/portfolio/behavioral-lead-scoring/#work",
            "name": "Behavioral Lead Scoring",
            "description": "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
            "url": "https://saren.ai/portfolio/behavioral-lead-scoring",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["Behavioral lead scoring", "Demand generation", "HubSpot marketing ops"],
            "keywords": "lead scoring, behavioral scoring, MQL, buyer intent, HubSpot, demand generation, marketing operations",
            "teaches": "Lead scoring and marketing operations",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-04",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "@id": "https://saren.ai/portfolio/behavioral-lead-scoring/#howto",
            "name": "Behavioral Lead Scoring Feedback Loop",
            "description": "A 4-step feedback loop for quantifying buyer intent by separating fit from engagement to produce cleaner MQLs.",
            "author": { "@id": "https://saren.ai/#person" },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Content creates motion",
                "text": "Demand architecture generates buyer engagement opportunities."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Behavior reveals intent",
                "text": "Engagement patterns signal interest and readiness."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Scoring measures momentum",
                "text": "Quantifiable evidence of fit and engagement builds confidence."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Humans decide when to act",
                "text": "Systems inform judgment; people make the call."
              }
            ]
          })
        }}
      />
      <BehavioralScoringClient />
    </>
  );
}
