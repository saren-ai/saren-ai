import type { Metadata } from "next";
import ExpertiseClient from "./ExpertiseClient";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import { buildGraph } from "@/lib/schema";

const DESCRIPTION =
  "An interactive index of my Obsidian research vault: 650+ cataloged references across 63 research threads, from 2003 to 2026 — the raw material behind every framework and playbook on this site.";

const trail = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { label: "Marketing Brain" },
];

export const metadata: Metadata = {
  title: "The Marketing Brain — 20 Years of Research, Linked | Saren",
  description: DESCRIPTION,
  alternates: { canonical: "https://saren.ai/about/expertise" },
  openGraph: {
    title: "The Marketing Brain — 20 Years of Research, Linked | Saren",
    description: DESCRIPTION,
    images: ["/images/og/about.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Marketing Brain — 20 Years of Research, Linked | Saren",
    description: DESCRIPTION,
    images: ["/images/og/about.png"],
  },
};

export default function ExpertisePage() {
  const graph = buildGraph({
    path: "/about/expertise",
    pageType: "AboutPage",
    name: "The Marketing Brain — 20 Years of Research, Linked | Saren",
    description: DESCRIPTION,
    dateModified: "2026-07-02T00:00:00Z",
    identity: "full",
    breadcrumb: trail,
  });

  return (
    <PagefindBoundary section="About">
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <ExpertiseClient />
    </PagefindBoundary>
  );
}
