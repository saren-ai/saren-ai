import type { Metadata } from "next";
import BrandClient from "./BrandClient";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import { buildGraph, ID, workId, pageUrl } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Brand Guide" }];

export const metadata: Metadata = {
  title: "Brand Guide — Fire Horse 2026",
  description: "Living brand style guide for saren.ai. Colors, typography, accessibility audit, components, and animation patterns.",
  alternates: { canonical: "https://saren.ai/brand" },
};

const brandWork = {
  "@type": "CreativeWork",
  "@id": workId("/brand"),
  name: "Fire Horse 2026 — Living Brand Guide",
  description:
    "The living visual identity specification for saren.ai: token-mapped color palette with WCAG contrast ratios, Sora and JetBrains Mono type system, button and card component standards, dark-mode rules, and Framer Motion animation catalog.",
  url: pageUrl("/brand"),
  author: { "@id": ID.person },
  creator: { "@id": ID.person },
  isPartOf: { "@id": ID.website },
  about: ["Design systems", "Visual identity", "Brand guidelines", "Accessibility"],
  keywords: "brand guide, design system, Fire Horse 2026, color tokens, WCAG, typography, dark mode, Tailwind v4",
  inLanguage: "en-US",
  dateCreated: "2026-01-01",
  dateModified: "2026-04-01T00:00:00Z",
};

export default function BrandPage() {
  return (
    <PagefindBoundary section="About">
      <JsonLd
        schema={buildGraph({
          path: "/brand",
          name: "Brand Guide — Fire Horse 2026",
          description: "Living brand style guide for saren.ai. Colors, typography, accessibility audit, components, and animation patterns.",
          dateModified: "2026-04-01T00:00:00Z",
          breadcrumb: trail,
          extra: [brandWork],
        })}
      />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <BrandClient />
    </PagefindBoundary>
  );
}
