import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId, pageUrl } from "@/lib/schema";

const ExecutiveDashboardClient = dynamic(
  () => import("./ExecutiveDashboardClient"),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-slate">Loading...</div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Demand Generation Command Center | Saren.ai",
  description:
    "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
  alternates: { canonical: "https://saren.ai/case-studies/executive-dashboard" },
  openGraph: {
    title: "Demand Generation Command Center | Saren.ai",
    description:
      "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
    images: ["/images/portfolio/executive-dashboard/demand-dash_bigview.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demand Generation Command Center | Saren.ai",
    description:
      "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
  },
};

const PATH = "/case-studies/executive-dashboard";

// Must match the visible trail rendered by <Breadcrumb> in ExecutiveDashboardClient.tsx.
const trail = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { label: "Executive Dashboard" },
];

const work = {
  "@type": "CreativeWork",
  "@id": workId(PATH),
  name: "Demand Generation Command Center",
  description:
    "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
  url: pageUrl(PATH),
  author: { "@id": "https://saren.ai/#person" },
  creator: { "@id": "https://saren.ai/#person" },
  isPartOf: { "@id": "https://saren.ai/#website" },
  about: [
    "Demand generation",
    "Executive dashboard",
    "AI-assisted development",
    "HubSpot API",
  ],
  keywords:
    "demand generation, executive dashboard, HubSpot, Apollo, LinkedIn Ads, GA4, Pendo, Claude Code, AI operations, marketing ops",
  inLanguage: "en-US",
  dateCreated: "2026-04-01",
  dateModified: "2026-04-01T00:00:00Z",
};

const graph = buildGraph({
  path: PATH,
  name: "Demand Generation Command Center | Saren.ai",
  description:
    "An AI-built executive dashboard wiring HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo into one live view — built with Claude Code in under two days.",
  dateModified: "2026-04-01T00:00:00Z",
  breadcrumb: trail,
  article: {
    headline: "Demand Generation Command Center",
    datePublished: "2026-04-14T00:00:00Z",
    dateModified: "2026-05-28T00:00:00Z",
    image: "https://saren.ai/images/portfolio/executive-dashboard/demand-dash_bigview.jpg",
    about: ["marketing attribution", "executive reporting", "AI-assisted development"],
  },
  extra: [work],
});

export default function ExecutiveDashboardPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <ExecutiveDashboardClient />
    </>
  );
}
