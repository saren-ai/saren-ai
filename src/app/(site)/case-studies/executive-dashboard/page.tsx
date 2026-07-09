import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ExecutiveDashboardClient = dynamic(
  () => import("./ExecutiveDashboardClient"),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-slate">Loading...</div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Demand Generation Command Center | Saren.ai",
  description:
    "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
  alternates: { canonical: "https://saren.ai/case-studies/executive-dashboard" },
  openGraph: {
    title: "Demand Generation Command Center | Saren.ai",
    description:
      "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
    images: ["/images/portfolio/executive-dashboard/demand-dash_bigview.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demand Generation Command Center | Saren.ai",
    description:
      "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
  },
};

export default function ExecutiveDashboardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/case-studies/executive-dashboard/#webpage",
            url: "https://saren.ai/case-studies/executive-dashboard",
            name: "Demand Generation Command Center | Saren.ai",
            description:
              "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: { "@id": "https://saren.ai/#person" },
            author: { "@id": "https://saren.ai/#person" },
            inLanguage: "en-US",
            dateModified: "2026-04-01T00:00:00Z",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://saren.ai",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Portfolio",
                item: "https://saren.ai/portfolio",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Demand Generation Command Center",
                item: "https://saren.ai/case-studies/executive-dashboard",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id":
              "https://saren.ai/case-studies/executive-dashboard/#work",
            name: "Demand Generation Command Center",
            description:
              "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
            url: "https://saren.ai/case-studies/executive-dashboard",
            author: { "@id": "https://saren.ai/#person" },
            creator: { "@id": "https://saren.ai/#person" },
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: [
              "Demand generation",
              "Executive dashboard",
              "AI-assisted development",
              "HubSpot API",
            ],
            keywords:
              "demand generation, executive dashboard, HubSpot, Apollo, LinkedIn Ads, GA4, Pendo, Claude Code, AI operations, marketing ops",
            inLanguage: "en-US",
            dateCreated: "2026-04-01",
            dateModified: "2026-04-01T00:00:00Z",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://saren.ai/case-studies/executive-dashboard/#article",
            "headline": "Demand gen command center: an AI-built executive dashboard across 5 live APIs",
            "description": "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
            "url": "https://saren.ai/case-studies/executive-dashboard",
            "mainEntityOfPage": { "@id": "https://saren.ai/case-studies/executive-dashboard/#webpage" },
            "author": { "@id": "https://saren.ai/#person" },
            "publisher": { "@id": "https://identogram.com/#organization" },
            "image": "https://saren.ai/images/portfolio/executive-dashboard/demand-dash_bigview.jpg",
            "about": ["marketing attribution", "executive reporting", "AI-assisted development"],
            "inLanguage": "en-US",
            "datePublished": "2026-04-14T00:00:00Z",
            "dateModified": "2026-05-28T00:00:00Z"
          })
        }}
      />
      <ExecutiveDashboardClient />
    </>
  );
}
