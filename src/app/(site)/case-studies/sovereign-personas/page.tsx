import type { Metadata } from "next";
import SovereignPersonasClient from "./SovereignPersonasClient";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId, pageUrl } from "@/lib/schema";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Sovereign Personas | Saren.ai",
  description:
    "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
  alternates: { canonical: "https://saren.ai/case-studies/sovereign-personas" },
  openGraph: {
    title: "Sovereign Personas | Saren.ai",
    description:
      "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
    images: ["/images/portfolio/portfolio-sovereign-personas.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign Personas | Saren.ai",
    description:
      "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
    images: ["/images/portfolio/portfolio-sovereign-personas.png"],
  },
};

const PATH = "/case-studies/sovereign-personas";

const trail = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { label: "Sovereign Personas" },
];

const work = {
  "@type": "CreativeWork",
  "@id": workId(PATH),
  "name": "Sovereign Personas",
  "description": "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
  "url": pageUrl(PATH),
  "author": { "@id": "https://saren.ai/#person" },
  "creator": { "@id": "https://saren.ai/#person" },
  "isPartOf": { "@id": "https://saren.ai/#website" },
  "about": ["B2B persona development", "AI infrastructure market segmentation", "ICP strategy"],
  "image": {
    "@type": "ImageObject",
    "url": "https://saren.ai/images/portfolio/portfolio-sovereign-personas.png",
    "width": 1200,
    "height": 630
  },
  "keywords": "buyer personas, ICP, sovereign infrastructure, B2B segmentation, enterprise sales",
  "inLanguage": "en-US",
  "dateCreated": "2026-02-03",
  "dateModified": "2026-03-27T00:00:00Z"
};

const graph = buildGraph({
  path: PATH,
  name: "Sovereign Personas | Saren.ai",
  description: "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
  dateModified: "2026-03-27T00:00:00Z",
  breadcrumb: trail,
  article: {
    headline: "Sovereign buyer personas: committee buying logic for national-resilience deals",
    datePublished: "2026-02-03T00:00:00Z",
    dateModified: "2026-05-28T00:00:00Z",
    image: "https://saren.ai/images/portfolio/portfolio-sovereign-personas.png",
    about: ["buyer personas", "enterprise sales", "sovereign infrastructure"],
  },
  faq: FAQS.sovereignPersonas,
  extra: [work],
});

export default function SovereignPersonasPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <SovereignPersonasClient />
    </>
  );
}
