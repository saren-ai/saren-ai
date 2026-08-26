import type { Metadata } from "next";
import CylanceClient from "./CylanceClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { label: "Cylance" }];

export const metadata: Metadata = {
  title: "Cylance | Saren.ai",
  description:
    "How I built Cylance's demand generation engine from scratch — a $1M+ site rebuild, intent-driven content funnel, SiriusDecisions framework rollout, and $4M in quarterly pipeline.",
  alternates: { canonical: "https://saren.ai/about/work/cylance" },
  openGraph: {
    title: "Cylance | Saren.ai",
    description:
      "$4M in quarterly pipeline: the AEM rebuild, the intent funnel, and the SiriusDecisions overhaul that scaled Cylance from startup to $400M+.",
  },
};

export default function CylancePage() {
  const graph = buildGraph({
    path: "/about/work/cylance",
    pageType: "WebPage",
    name: "Cylance | Saren.ai",
    description:
      "How I built Cylance's demand generation engine from scratch — a $1M+ site rebuild, intent-driven content funnel, SiriusDecisions framework rollout, and $4M in quarterly pipeline.",
    dateModified: "2026-06-03T00:00:00Z",
    breadcrumb: trail,
    article: {
      headline: "Cylance — Director of Demand Generation",
      datePublished: "2026-06-03T00:00:00Z",
    },
  });

  return (
    <PagefindBoundary section="About">
      <JsonLd schema={graph} />
      <CylanceClient />
    </PagefindBoundary>
  );
}
