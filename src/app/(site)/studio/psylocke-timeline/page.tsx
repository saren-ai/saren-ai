import type { Metadata } from "next";
import KwannonTimelineClient from "./KwannonTimelineClient";

export const metadata: Metadata = {
  title: "Psylocke Timeline | Saren.ai",
  description:
    "A fan-made interactive timeline of Kwannon (Psylocke) and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
  alternates: { canonical: "https://saren.ai/studio/psylocke-timeline" },
  openGraph: {
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of Kwannon (Psylocke) and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
    images: ["/images/portfolio/portfolio-psylocke.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of Kwannon (Psylocke) and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
    images: ["/images/portfolio/portfolio-psylocke.png"],
  },
};

export default function KwannonTimelinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/studio/psylocke-timeline/#webpage",
            url: "https://saren.ai/studio/psylocke-timeline",
            name: "Kwannon Timeline | Saren.ai",
            description:
              "A fan-made interactive timeline of Kwannon and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: { "@id": "https://saren.ai/#person" },
            author: { "@id": "https://saren.ai/#person" },
            inLanguage: "en-US",
            dateModified: "2026-05-08",
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
                name: "Studio",
                item: "https://saren.ai/studio",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Kwannon timeline",
                item: "https://saren.ai/studio/psylocke-timeline",
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
            "@type": ["CreativeWork", "Article"],
            "@id": "https://saren.ai/studio/psylocke-timeline/#work",
            name: "Kwannon Timeline",
            description:
              "A fan-made interactive timeline of Kwannon and Betsy Braddock — the most narratively tangled bodies in X-Men history. 1989–2019.",
            url: "https://saren.ai/studio/psylocke-timeline",
            author: { "@id": "https://saren.ai/#person" },
            creator: { "@id": "https://saren.ai/#person" },
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: [
              "Comics history",
              "Kwannon character analysis",
              "Japanese cultural representation in comics",
            ],
            image: {
              "@type": "ImageObject",
              url: "https://saren.ai/images/portfolio/portfolio-psylocke.png",
              width: 1200,
              height: 630,
            },
            keywords:
              "Kwannon, Psylocke, X-Men, comics timeline, Japanese cultural representation, Marvel, interactive timeline",
            genre: "Cultural analysis",
            inLanguage: "en-US",
            datePublished: "2026-02-09",
            dateCreated: "2026-02-09",
            dateModified: "2026-05-08",
          }),
        }}
      />
      <KwannonTimelineClient />
    </>
  );
}
