import type { Metadata } from "next";
import SalesPlayClient from "./SalesPlayClient";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId, pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: "10-Touch Sales Play | Saren.ai",
  description:
    "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
  alternates: { canonical: "https://saren.ai/case-studies/10-touch-sales-play" },
  openGraph: {
    title: "10-Touch Sales Play | Saren.ai",
    description:
      "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
    images: ["/images/portfolio/portfolio-10-touch.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "10-Touch Sales Play | Saren.ai",
    description:
      "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
    images: ["/images/portfolio/portfolio-10-touch.png"],
  },
};

const PATH = "/case-studies/10-touch-sales-play";

const trail = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { label: "10-Touch Sales Play" },
];

const work = {
  "@type": "CreativeWork",
  "@id": workId(PATH),
  "name": "10-Touch Sales Play",
  "description": "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
  "url": pageUrl(PATH),
  "author": { "@id": "https://saren.ai/#person" },
  "creator": { "@id": "https://saren.ai/#person" },
  "isPartOf": { "@id": "https://saren.ai/#website" },
  "about": ["B2B sales sequences", "Cold outreach strategy", "Sales and marketing alignment"],
  "keywords": "10-touch sales play, cold outreach, B2B sales, sales sequences, executive engagement",
  "image": {
    "@type": "ImageObject",
    "url": "https://saren.ai/images/portfolio/portfolio-10-touch.png",
    "width": 1200,
    "height": 630
  },
  "teaches": "B2B sales and marketing alignment",
  "educationalUse": "Sales enablement",
  "inLanguage": "en-US",
  "dateCreated": "2026-02-03",
  "dateModified": "2026-03-27T00:00:00Z"
};

const graph = buildGraph({
  path: PATH,
  name: "10-Touch Sales Play | Saren.ai",
  description: "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
  dateModified: "2026-03-27T00:00:00Z",
  breadcrumb: trail,
  article: {
    headline: "10-Touch Sales Play",
    datePublished: "2026-02-03T00:00:00Z",
    dateModified: "2026-05-28T00:00:00Z",
    image: "https://saren.ai/images/portfolio/portfolio-10-touch.png",
    about: ["cold outbound", "B2B sales sequences", "executive engagement"],
  },
  extra: [work],
});

export default function SalesPlayPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <SalesPlayClient />
    </>
  );
}
