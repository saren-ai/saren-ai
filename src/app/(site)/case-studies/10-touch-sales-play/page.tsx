import type { Metadata } from "next";
import SalesPlayClient from "./SalesPlayClient";

export const metadata: Metadata = {
  title: "10-Touch Sales Play | Saren.ai",
  description:
    "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
  alternates: { canonical: "https://saren.ai/case-studies/10-touch-sales-play" },
  openGraph: {
    title: "10-Touch Sales Play | Saren.ai",
    description:
      "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
    images: ["/images/portfolio/portfolio-10-touch.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "10-Touch Sales Play | Saren.ai",
    description:
      "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
    images: ["/images/portfolio/portfolio-10-touch.png"],
  },
};

export default function SalesPlayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/case-studies/10-touch-sales-play/#webpage",
            "url": "https://saren.ai/case-studies/10-touch-sales-play",
            "name": "10-Touch Sales Play | Saren.ai",
            "description": "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-03-27T00:00:00Z"
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
              { "@type": "ListItem", "position": 3, "name": "10-Touch Sales Play", "item": "https://saren.ai/case-studies/10-touch-sales-play" }
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
            "@id": "https://saren.ai/case-studies/10-touch-sales-play/#work",
            "name": "10-Touch Sales Play",
            "description": "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
            "url": "https://saren.ai/case-studies/10-touch-sales-play",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["B2B sales sequences", "Cold outreach strategy", "Sales and marketing alignment"],
            "keywords": "10-touch sales play, cold outreach, B2B sales, sales sequences, executive engagement",
            "image": {
              "@type": "ImageObject",
              "url": "https://saren.ai/images/portfolio/portfolio-10-touch.png",
              "width": 1200,
              "height": 630
            },
            "teaches": "B2B sales and marketing alignment",
            "educationalUse": "Sales enablement",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-03",
            "dateModified": "2026-03-27T00:00:00Z"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://saren.ai/case-studies/10-touch-sales-play/#article",
            "headline": "10-touch sales play: 42% meeting rate on cold outbound",
            "description": "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
            "url": "https://saren.ai/case-studies/10-touch-sales-play",
            "mainEntityOfPage": { "@id": "https://saren.ai/case-studies/10-touch-sales-play/#webpage" },
            "author": { "@id": "https://saren.ai/#person" },
            "publisher": { "@id": "https://identogram.com/#organization" },
            "image": "https://saren.ai/images/portfolio/portfolio-10-touch.png",
            "about": ["cold outbound", "B2B sales sequences", "executive engagement"],
            "inLanguage": "en-US",
            "datePublished": "2026-02-03T00:00:00Z",
            "dateModified": "2026-05-28T00:00:00Z"
          })
        }}
      />
      <SalesPlayClient />
    </>
  );
}
