import type { Metadata } from "next";
import { featureArticles } from "@/lib/feature";
import FeatureCard from "@/components/feature/FeatureCard";

export const metadata: Metadata = {
  title: "Studio | Saren.ai",
  description:
    "Saren's creative studio — the AI for Liberal Arts Majors series, interactive timelines, and magazine-style editorial on personal projects.",
  alternates: { canonical: "https://saren.ai/studio" },
  openGraph: {
    title: "Studio | Saren.ai",
    description:
      "Saren's creative studio — the AI for Liberal Arts Majors series and editorial on personal projects.",
    url: "https://saren.ai/studio",
    siteName: "Saren.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio | Saren.ai",
    description:
      "Saren's creative studio — the AI for Liberal Arts Majors series and editorial on personal projects.",
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
            "@id": "https://saren.ai/studio/#webpage",
            url: "https://saren.ai/studio",
            name: "Studio | Saren.ai",
            description:
              "Saren's creative studio — the AI for Liberal Arts Majors series and editorial on personal projects.",
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
                name: "Studio",
                item: "https://saren.ai/studio",
              },
            ],
          }),
        }}
      />

      <section className="section">
        <div className="container-narrow">
          <header className="mb-12">
            <p className="text-xs font-mono text-slate uppercase tracking-widest mb-3">
              The Studio
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Studio
            </h1>
            <p className="text-foreground-muted text-lg max-w-xl">
              Creative work and personal projects — home of the AI for Liberal
              Arts Majors series. Built for the love of it, not the brief.
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
