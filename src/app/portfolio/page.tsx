import type { Metadata } from "next";
import PortfolioPageContent from "./PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio | Saren.ai",
  description:
    "Interactive case studies and frameworks demonstrating strategic marketing, demand generation, and AI-assisted creative production.",
  alternates: { canonical: "https://saren.ai/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/portfolio/#webpage",
            "url": "https://saren.ai/portfolio",
            "name": "Portfolio | Saren.ai",
            "description": "Interactive case studies and frameworks demonstrating strategic marketing, demand generation, and AI-assisted creative production.",
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
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saren.ai/portfolio" }
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
            "@id": "https://saren.ai/portfolio/#list",
            "name": "Portfolio — Saren Sakurai",
            "description": "Interactive case studies, frameworks, and tools demonstrating B2B demand generation, AI operations, and strategic marketing.",
            "numberOfItems": 15,
            "itemListElement": [
              { "@type": "ListItem", "position": 1,  "url": "https://saren.ai/portfolio/roi-simulator",                "name": "Paid Media ROI Simulator" },
              { "@type": "ListItem", "position": 2,  "url": "https://saren.ai/portfolio/gtm-budget-calculator",        "name": "SaaS Revenue Calculator" },
              { "@type": "ListItem", "position": 3,  "url": "https://saren.ai/portfolio/behavioral-lead-scoring",      "name": "Behavioral Lead Scoring" },
              { "@type": "ListItem", "position": 4,  "url": "https://saren.ai/portfolio/executive-dashboard",          "name": "Demand Generation Command Center" },
              { "@type": "ListItem", "position": 5,  "url": "https://saren.ai/portfolio/sovereign-personas",           "name": "Sovereign Buyer Personas" },
              { "@type": "ListItem", "position": 6,  "url": "https://saren.ai/portfolio/10-touch-sales-play",          "name": "10-Touch Sales Play" },
              { "@type": "ListItem", "position": 7,  "url": "https://saren.ai/portfolio/120-day-content-journey",      "name": "120-Day Content Journey" },
              { "@type": "ListItem", "position": 8,  "url": "https://saren.ai/portfolio/dynamic-nurture",              "name": "Dynamic Email Nurture" },
              { "@type": "ListItem", "position": 9,  "url": "https://saren.ai/portfolio/intent-data",                  "name": "Intent Data as Funnel Intelligence" },
              { "@type": "ListItem", "position": 10, "url": "https://saren.ai/portfolio/b2b-marketing-framework",      "name": "B2B Marketing Framework" },
              { "@type": "ListItem", "position": 11, "url": "https://saren.ai/portfolio/its-good-to-be-pitched",       "name": "It's Good to Be Pitched" },
              { "@type": "ListItem", "position": 12, "url": "https://saren.ai/portfolio/authority-engineering",        "name": "Authority Engineering Process" },
              { "@type": "ListItem", "position": 13, "url": "https://saren.ai/portfolio/thought-leadership-development","name": "Thought Leadership Development" },
              { "@type": "ListItem", "position": 14, "url": "https://saren.ai/signal-state",                           "name": "Signal-State Marketing" }
            ]
          })
        }}
      />
      <PortfolioPageContent />
    </>
  );
}
