import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId, pageUrl } from "@/lib/schema";

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

const PATH = "/studio/oblique-techniques";

const trail = [{ href: "/", label: "Home" }, { href: "/studio", label: "Studio" }, { label: "Oblique Techniques" }];

const work = {
  "@type": ["CreativeWork", "SoftwareSourceCode"],
  "@id": workId(PATH),
  name: "Oblique Techniques",
  description:
    "Creative constraint-based Claude Skills for people who think the default output is the problem. Part of AI for Liberal Arts Majors.",
  url: pageUrl(PATH),
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
  keywords: "Claude Skills, creative constraints, Oulipo, surrealism, Fluxus, liberal arts AI, creative writing, avant-garde techniques",
  genre: "Educational software",
  inLanguage: "en-US",
  datePublished: "2026-06-17T00:00:00Z",
  dateCreated: "2026-06-17",
  dateModified: "2026-06-17T00:00:00Z",
  codeRepository: "https://github.com/saren-ai/oblique-techniques",
  programmingLanguage: "Markdown",
};

const graph = buildGraph({
  path: PATH,
  name: "Oblique Techniques | Saren.ai",
  description:
    "Creative constraint-based Claude Skills for people who think the default output is the problem. Part of AI for Liberal Arts Majors.",
  dateModified: "2026-06-17T00:00:00Z",
  breadcrumb: trail,
  extra: [work],
});

export default function ObliqueTechniquesPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="container-narrow pt-6">
        <Breadcrumb trail={trail} />
      </div>
      <ObliqueClient />
    </>
  );
}
