import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "About Saren Sakurai | Marketing for the Messy Middle",
  description:
    "I build growth engines at the intersection of cultural storytelling and systems design. Fractional CMO for Series A startups.",
  alternates: { canonical: "https://saren.ai/about" },
  openGraph: {
    title: "About Saren Sakurai | Marketing for the Messy Middle",
    description:
      "I build growth engines at the intersection of cultural storytelling and systems design. Fractional CMO for Series A startups.",
    images: ["/images/og/about.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Saren Sakurai | Marketing for the Messy Middle",
    description:
      "I build growth engines at the intersection of cultural storytelling and systems design. Fractional CMO for Series A startups.",
    images: ["/images/og/about.png"],
  },
};

export default function AboutPage() {
  return (
    <PagefindBoundary section="About">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://saren.ai/about/#webpage",
            "url": "https://saren.ai/about",
            "name": "About Saren Sakurai | Marketing for the Messy Middle",
            "description": "I build growth engines at the intersection of cultural storytelling and systems design. Fractional CMO for Series A startups.",
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
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://saren.ai/about" }
            ]
          })
        }}
      />
      <AboutClient />
    </PagefindBoundary>
  );
}
