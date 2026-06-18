import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ObliqueClient = dynamic(() => import("./ObliqueClient"), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-slate">Loading...</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Oblique Techniques | Saren.ai",
  description:
    "Creative constraint-based Claude Skills for people who think the default output is the problem. Part of AI for Liberal Arts Majors.",
  alternates: { canonical: "https://saren.ai/studio/oblique-techniques" },
  openGraph: {
    title: "Oblique Techniques | Saren.ai",
    description:
      "Creative constraint-based Claude Skills for people who think the default output is the problem. Part of AI for Liberal Arts Majors.",
    images: ["/images/feature/oblique-techniques-hero.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oblique Techniques | Saren.ai",
    description:
      "Creative constraint-based Claude Skills for people who think the default output is the problem.",
    images: ["/images/feature/oblique-techniques-hero.png"],
  },
};

export default function ObliqueTechniquesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/studio/oblique-techniques/#webpage",
            url: "https://saren.ai/studio/oblique-techniques",
            name: "Oblique Techniques | Saren.ai",
            description:
              "Creative constraint-based Claude Skills for people who think the default output is the problem. Part of AI for Liberal Arts Majors.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: { "@id": "https://saren.ai/#person" },
            author: { "@id": "https://saren.ai/#person" },
            inLanguage: "en-US",
            dateModified: "2026-06-17",
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
                name: "Oblique Techniques",
                item: "https://saren.ai/studio/oblique-techniques",
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
            "@type": ["CreativeWork", "SoftwareSourceCode"],
            "@id": "https://saren.ai/studio/oblique-techniques/#work",
            name: "Oblique Techniques",
            description:
              "Creative constraint-based Claude Skills for people who think the default output is the problem. Part of AI for Liberal Arts Majors.",
            url: "https://saren.ai/studio/oblique-techniques",
            author: { "@id": "https://saren.ai/#person" },
            creator: { "@id": "https://saren.ai/#person" },
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: [
              "Creative constraints",
              "AI for liberal arts",
              "Claude Skills",
              "Avant-garde writing techniques",
              "Surrealism",
              "Oulipo",
              "Fluxus",
            ],
            image: {
              "@type": "ImageObject",
              url: "https://saren.ai/images/feature/oblique-techniques-hero.png",
              width: 1200,
              height: 630,
            },
            keywords:
              "Claude Skills, creative constraints, Oulipo, surrealism, Fluxus, liberal arts AI, creative writing, avant-garde techniques",
            genre: "Educational software",
            inLanguage: "en-US",
            datePublished: "2026-06-17",
            dateCreated: "2026-06-17",
            dateModified: "2026-06-17",
            codeRepository: "https://github.com/saren-ai/oblique-techniques",
            programmingLanguage: "Markdown",
          }),
        }}
      />
      <ObliqueClient />
    </>
  );
}
