import type { Metadata } from "next";
import DynamicNurtureClient from "./DynamicNurtureClient";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId, pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dynamic B2B Email Nurture — Score-Gated Personalization | Saren.ai",
  description:
    "A score-gated nurture system that delivers different content to the right person at the right funnel stage — automatically. 9 content variants across 3 segments and 3 stages. Built on HubSpot.",
  alternates: { canonical: "https://saren.ai/case-studies/dynamic-nurture" },
  openGraph: {
    title: "Dynamic B2B Email Nurture — Score-Gated Personalization | Saren.ai",
    description:
      "A score-gated nurture system with 9 content variants across 3 segments and 3 funnel stages. Sales handoff triggers at 75 behavioral points. Built on HubSpot.",
    url: "https://saren.ai/case-studies/dynamic-nurture",
    siteName: "Saren.ai",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic B2B Email Nurture — Score-Gated Personalization | Saren.ai",
    description:
      "9 content variants, 3 segments, 3 funnel stages. Score-gated nurture with sales handoff triggers at 75 behavioral points.",
  },
};

const PATH = "/case-studies/dynamic-nurture";

// Must match the visible trail rendered by <Breadcrumb> in DynamicNurtureClient.tsx.
const trail = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { label: "Dynamic Email Nurture" },
];

const work = {
  "@type": "CreativeWork",
  "@id": workId(PATH),
  "name": "Dynamic Email Nurture",
  "description": "A fully personalized B2B email nurture engine that routes the right content to the right person at the right stage — automatically. Built on a 3×3 segment-stage matrix (Enterprise, SMB, Individual × Awareness, Consideration, Decision) with scoring-driven routing logic.",
  "url": pageUrl(PATH),
  "author": { "@id": "https://saren.ai/#person" },
  "creator": { "@id": "https://saren.ai/#person" },
  "isPartOf": { "@id": "https://saren.ai/#website" },
  "about": ["Email nurture", "Marketing automation", "Demand generation", "Lead scoring"],
  "keywords": "email nurture, marketing automation, demand generation, lead scoring, B2B email, nurture matrix, personalization, HubSpot",
  "teaches": "Building a segment-stage email nurture matrix with behavioral routing logic",
  "inLanguage": "en-US",
  "dateCreated": "2026-01-15",
  "dateModified": "2026-03-27T00:00:00Z"
};

const graph = buildGraph({
  path: PATH,
  name: "Dynamic Email Nurture | Saren Sakurai",
  description: "A system that delivers different content to the right person at the right stage — automatically. The matrix, routing logic, and scoring model behind a fully personalized B2B nurture engine.",
  dateModified: "2026-03-27T00:00:00Z",
  breadcrumb: trail,
  article: {
    headline: "Email That Knows Who You Are",
    datePublished: "2026-03-27T00:00:00Z",
    dateModified: "2026-05-28T00:00:00Z",
    image: "https://saren.ai/images/og/home.png",
    about: ["email nurture", "marketing automation", "lead scoring"],
  },
  extra: [work],
});

export default function DynamicNurturePage() {
  return (
    <>
      <JsonLd schema={graph} />
      <DynamicNurtureClient />
    </>
  );
}
