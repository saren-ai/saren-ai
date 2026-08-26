import type { Metadata } from "next";
import CaseStudiesPageContent from "./CaseStudiesPageContent";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, listId, pageUrl } from "@/lib/schema";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "B2B Case Studies — Pipeline Programs, Demand Gen & Outbound | Saren.ai",
  description:
    "Real B2B case studies: $4M quarterly pipeline at Cylance, 42% meeting rate on cold outbound, intent data programs, and dynamic nurture systems. Proof over promises.",
  alternates: { canonical: "https://saren.ai/case-studies" },
  openGraph: {
    title: "B2B Case Studies — Pipeline Programs, Demand Gen & Outbound | Saren.ai",
    description:
      "Real B2B case studies: $4M quarterly pipeline at Cylance, 42% meeting rate on cold outbound, intent data programs, and dynamic nurture systems. Proof over promises.",
    url: "https://saren.ai/case-studies",
    siteName: "Saren.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Case Studies — Pipeline Programs, Demand Gen & Outbound | Saren.ai",
    description:
      "$4M quarterly pipeline at Cylance, 42% meeting rate on cold outbound, intent data programs, and dynamic nurture systems.",
  },
};

const trail = [{ href: "/", label: "Home" }, { label: "Case Studies" }];

const itemList = {
  "@type": "ItemList",
  "@id": listId("/case-studies"),
  "name": "Case Studies — Saren Sakurai",
  "description": "B2B pipeline programs, demand generation architectures, and outbound systems built from real enterprise engagements.",
  "numberOfItems": CASE_STUDIES.length,
  "itemListElement": CASE_STUDIES.map((cs, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "url": pageUrl(cs.href),
    "name": cs.name,
  })),
};

const graph = buildGraph({
  path: "/case-studies",
  pageType: "CollectionPage",
  name: "Case Studies | Saren.ai",
  description: "Enterprise B2B case studies demonstrating pipeline programs, demand generation architecture, and sales systems.",
  dateModified: "2026-05-28T00:00:00Z",
  breadcrumb: trail,
  extra: [itemList],
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <CaseStudiesPageContent />
    </>
  );
}
