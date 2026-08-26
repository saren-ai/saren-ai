import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph } from "@/lib/schema";

const HybridScoringClient = dynamic(() => import("./HybridScoringClient"), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-slate">Loading calculator…</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Lead Scoring in 2026: The Hybrid Architecture That Works — saren.ai",
  description:
    "An interactive hybrid scoring model + a practitioner's framework for upgrading HubSpot lead scoring post the August 2025 overhaul. Free print-to-PDF setup blueprint.",
  alternates: { canonical: "https://saren.ai/playbooks/hybrid-lead-scoring" },
  openGraph: {
    title: "Lead Scoring in 2026: The Hybrid Architecture That Works — saren.ai",
    description:
      "An interactive hybrid scoring model + a practitioner's framework for upgrading HubSpot lead scoring post the August 2025 overhaul. Free print-to-PDF setup blueprint.",
    images: ["/images/portfolio/portfolio-lead-scoring.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Scoring in 2026: The Hybrid Architecture That Works",
    description:
      "An interactive hybrid scoring model + a practitioner's framework for upgrading HubSpot lead scoring post the August 2025 overhaul. Free print-to-PDF setup blueprint.",
    images: ["/images/portfolio/portfolio-lead-scoring.png"],
  },
};

const PATH = "/playbooks/hybrid-lead-scoring";
const trail = [
  { href: "/", label: "Home" },
  { href: "/playbooks", label: "Playbooks" },
  { label: "Hybrid Lead Scoring" },
];

// This page previously had no WebPage node at all (Article + BreadcrumbList
// only) — buildGraph adds one as standard behavior, fixing that gap.
const graph = buildGraph({
  path: PATH,
  name: "Lead Scoring in 2026: The Hybrid Architecture That Works",
  description: "An interactive hybrid scoring model and practitioner's framework for upgrading HubSpot lead scoring after the August 2025 overhaul.",
  dateModified: "2026-05-24T00:00:00Z",
  breadcrumb: trail,
  article: {
    headline: "Lead Scoring in 2026: The Hybrid Architecture That Works",
    datePublished: "2026-05-24T00:00:00Z",
    dateModified: "2026-05-24T00:00:00Z",
    image: "https://saren.ai/images/portfolio/portfolio-lead-scoring.png",
    about: ["Lead scoring", "HubSpot", "B2B marketing", "Revenue operations", "AI predictive scoring"],
  },
});

export default function HybridLeadScoringPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="container-narrow pt-6">
        <Breadcrumb trail={trail} />
      </div>
      <HybridScoringClient />
    </>
  );
}
