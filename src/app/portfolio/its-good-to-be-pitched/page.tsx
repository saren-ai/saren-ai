import type { Metadata } from "next";
import ItsGoodToBePitchedClient from "./ItsGoodToBePitchedClient";

export const metadata: Metadata = {
  title: "It's Good to be Pitched | Saren.ai",
  description:
    "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
  alternates: { canonical: "https://saren.ai/portfolio/its-good-to-be-pitched" },
  openGraph: {
    title: "It's Good to be Pitched | Saren.ai",
    description:
      "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
    images: ["/images/og/portfolio-pitched.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "It's Good to be Pitched | Saren.ai",
    description:
      "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
    images: ["/images/og/portfolio-pitched.png"],
  },
};

export default function ItsGoodToBePitchedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/portfolio/its-good-to-be-pitched/#webpage",
            "url": "https://saren.ai/portfolio/its-good-to-be-pitched",
            "name": "It's Good to be Pitched | Saren.ai",
            "description": "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
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
              { "@type": "ListItem", "position": 3, "name": "It's Good to be Pitched", "item": "https://saren.ai/portfolio/its-good-to-be-pitched" }
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
            "@id": "https://saren.ai/portfolio/its-good-to-be-pitched/#work",
            "name": "It's Good to be Pitched",
            "description": "An agency concept that sells the feeling of being the client. Storyboarded with AI, structured by human strategy.",
            "url": "https://saren.ai/portfolio/its-good-to-be-pitched",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["B2B pitch strategy", "Sales enablement", "Storytelling for sales"],
            "keywords": "pitch strategy, sales storytelling, agency concept, AI storyboarding, B2B sales enablement",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-03",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <ItsGoodToBePitchedClient />
    </>
  );
}
