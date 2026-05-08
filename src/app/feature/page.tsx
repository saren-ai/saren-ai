import type { Metadata } from "next";
import { featureArticles } from "@/lib/feature";
import FeatureCard from "@/components/feature/FeatureCard";

export const metadata: Metadata = {
  title: "Feature | Saren.ai",
  description:
    "Magazine-style editorial on personal projects and creative obsessions — from interactive timelines to cultural deep-dives.",
  alternates: { canonical: "https://saren.ai/feature" },
  openGraph: {
    title: "Feature | Saren.ai",
    description:
      "Magazine-style editorial on personal projects and creative obsessions.",
    url: "https://saren.ai/feature",
    siteName: "Saren.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feature | Saren.ai",
    description:
      "Magazine-style editorial on personal projects and creative obsessions.",
  },
};

export default function FeaturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/feature/#webpage",
            url: "https://saren.ai/feature",
            name: "Feature | Saren.ai",
            description:
              "Magazine-style editorial on personal projects and creative obsessions.",
            isPartOf: { "@id": "https://saren.ai/#website" },
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
                name: "Feature",
                item: "https://saren.ai/feature",
              },
            ],
          }),
        }}
      />

      <section className="section">
        <div className="container-narrow">
          <header className="mb-12">
            <p className="text-xs font-mono text-slate uppercase tracking-widest mb-3">
              Editorial
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Feature
            </h1>
            <p className="text-foreground-muted text-lg max-w-xl">
              Personal projects and creative work — built for the love of it,
              not the brief.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureArticles.map((article, index) => (
              <FeatureCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
