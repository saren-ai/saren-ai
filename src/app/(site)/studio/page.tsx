import type { Metadata } from "next";
import { featureArticles } from "@/lib/feature";
import FeatureCard from "@/components/feature/FeatureCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph } from "@/lib/schema";

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

const PATH = "/studio";

const trail = [{ href: "/", label: "Home" }, { label: "Studio" }];

const graph = buildGraph({
  path: PATH,
  pageType: "CollectionPage",
  name: "Studio | Saren.ai",
  description: "Saren's creative studio — the AI for Liberal Arts Majors series and editorial on personal projects.",
  dateModified: "2026-05-08T00:00:00Z",
  breadcrumb: trail,
});

export default function FeaturePage() {
  return (
    <>
      <JsonLd schema={graph} />
      <section className="section">
        <div className="container-narrow">
          <Breadcrumb trail={trail} className="mb-8" />
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
