import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PsylockeTimelineClient = dynamic(
  () => import("./PsylockeTimelineClient"),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-slate">Loading...</div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Psylocke Timeline | Saren.ai",
  description:
    "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
  alternates: { canonical: "https://saren.ai/portfolio/psylocke-timeline" },
  openGraph: {
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
    images: ["/images/og/portfolio-psylocke.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
    images: ["/images/og/portfolio-psylocke.png"],
  },
};

export default function PsylockeTimelinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/portfolio/psylocke-timeline/#webpage",
            "url": "https://saren.ai/portfolio/psylocke-timeline",
            "name": "Psylocke Timeline | Saren.ai",
            "description": "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
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
              { "@type": "ListItem", "position": 3, "name": "Psylocke Timeline", "item": "https://saren.ai/portfolio/psylocke-timeline" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["CreativeWork", "Article"],
            "@id": "https://saren.ai/portfolio/psylocke-timeline/#work",
            "name": "Psylocke Timeline",
            "description": "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
            "url": "https://saren.ai/portfolio/psylocke-timeline",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["Comics history", "Psylocke character analysis", "Japanese cultural representation in comics"],
            "keywords": "Psylocke, X-Men, comics timeline, Japanese cultural representation, Marvel, interactive timeline, Framer Motion",
            "genre": "Cultural analysis",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-09",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <PsylockeTimelineClient />
    </>
  );
}
