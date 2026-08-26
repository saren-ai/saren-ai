import type { Metadata } from "next";
import ContentJourneyClient from "./ContentJourneyClient";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId, howToId, pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: "120-Day Content Journey | Saren.ai",
  description:
    "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
  alternates: { canonical: "https://saren.ai/case-studies/120-day-content-journey" },
  openGraph: {
    title: "120-Day Content Journey | Saren.ai",
    description:
      "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
    images: ["/images/portfolio/portfolio-content-journey.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "120-Day Content Journey | Saren.ai",
    description:
      "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
    images: ["/images/portfolio/portfolio-content-journey.png"],
  },
};

const PATH = "/case-studies/120-day-content-journey";

const trail = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { label: "120-Day Content Journey" },
];

const work = {
  "@type": "CreativeWork",
  "@id": workId(PATH),
  "name": "120-Day Content Journey",
  "description": "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
  "url": pageUrl(PATH),
  "author": { "@id": "https://saren.ai/#person" },
  "creator": { "@id": "https://saren.ai/#person" },
  "isPartOf": { "@id": "https://saren.ai/#website" },
  "about": ["B2B content marketing", "Demand generation", "Buyer journey mapping"],
  "keywords": "content marketing, buyer journey, demand generation, B2B SaaS, content strategy, 120-day plan",
  "image": {
    "@type": "ImageObject",
    "url": "https://saren.ai/images/portfolio/portfolio-content-journey.png",
    "width": 1200,
    "height": 630
  },
  "teaches": "B2B SaaS content marketing strategy",
  "timeRequired": "P120D",
  "inLanguage": "en-US",
  "dateCreated": "2026-02-03",
  "dateModified": "2026-03-27T00:00:00Z"
};

const howTo = {
  "@type": "HowTo",
  "@id": howToId(PATH),
  "name": "120-Day Content Journey Framework",
  "description": "A 3-phase content system that maps content to buyer psychology across the entire decision lifecycle to engineer demand at scale.",
  "author": { "@id": "https://saren.ai/#person" },
  "totalTime": "P120D",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Problem Awareness",
      "text": "Validate their pain. Show them they aren't crazy for struggling."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Solution Education",
      "text": "Teach them how to solve it. Methodology before product."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Vendor Selection",
      "text": "Prove you are the best partner to execute that methodology."
    }
  ]
};

const graph = buildGraph({
  path: PATH,
  name: "120-Day Content Journey | Saren.ai",
  description: "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
  dateModified: "2026-03-27T00:00:00Z",
  breadcrumb: trail,
  article: {
    headline: "120-day content journey: $4M quarterly pipeline at Cylance",
    datePublished: "2026-02-03T00:00:00Z",
    dateModified: "2026-05-28T00:00:00Z",
    image: "https://saren.ai/images/portfolio/portfolio-content-journey.png",
    about: ["content marketing", "B2B demand generation", "pipeline development"],
  },
  extra: [work, howTo],
});

export default function ContentJourneyPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <ContentJourneyClient />
    </>
  );
}
