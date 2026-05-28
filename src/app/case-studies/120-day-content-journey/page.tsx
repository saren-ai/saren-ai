import type { Metadata } from "next";
import ContentJourneyClient from "./ContentJourneyClient";

export const metadata: Metadata = {
  title: "120-Day Content Journey | Saren.ai",
  description:
    "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
  alternates: { canonical: "https://saren.ai/case-studies/120-day-content-journey" },
  openGraph: {
    title: "120-Day Content Journey | Saren.ai",
    description:
      "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
    images: ["/portfolio/portfolio-content-journey.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "120-Day Content Journey | Saren.ai",
    description:
      "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
    images: ["/portfolio/portfolio-content-journey.png"],
  },
};

export default function ContentJourneyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/case-studies/120-day-content-journey/#webpage",
            "url": "https://saren.ai/case-studies/120-day-content-journey",
            "name": "120-Day Content Journey | Saren.ai",
            "description": "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
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
              { "@type": "ListItem", "position": 3, "name": "120-Day Content Journey", "item": "https://saren.ai/case-studies/120-day-content-journey" }
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
            "@id": "https://saren.ai/case-studies/120-day-content-journey/#work",
            "name": "120-Day Content Journey",
            "description": "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
            "url": "https://saren.ai/case-studies/120-day-content-journey",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["B2B content marketing", "Demand generation", "Buyer journey mapping"],
            "keywords": "content marketing, buyer journey, demand generation, B2B SaaS, content strategy, 120-day plan",
            "image": {
              "@type": "ImageObject",
              "url": "https://saren.ai/portfolio/portfolio-content-journey.png",
              "width": 1200,
              "height": 630
            },
            "teaches": "B2B SaaS content marketing strategy",
            "timeRequired": "P120D",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-03",
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
            "@id": "https://saren.ai/case-studies/120-day-content-journey/#howto",
            "name": "120-Day Content Journey Framework",
            "description": "A 3-phase content system that maps content to buyer psychology across the entire decision lifecycle to engineer demand at scale.",
            "author": { "@id": "https://saren.ai/#person" },
            "totalTime": "P120D",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Problem Awareness",
                "text": "Validate their pain. Show them they aren't crazy for struggling."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Solution Education",
                "text": "Teach them how to solve it. Methodology before product."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Vendor Selection",
                "text": "Prove you are the best partner to execute that methodology."
              }
            ]
          })
        }}
      />
      <ContentJourneyClient />
    </>
  );
}
