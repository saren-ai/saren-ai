import type { Metadata } from "next";
import BrandClient from "./BrandClient";
import JsonLd from "@/components/seo/JsonLd";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Brand Guide — Fire Horse 2026",
  description:
    "Living brand style guide for saren.ai. Colors, typography, accessibility audit, components, and animation patterns.",
  alternates: { canonical: "https://saren.ai/brand" },
};

export default function BrandPage() {
  return (
    <PagefindBoundary section="About">
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://saren.ai/brand/#webpage",
        "url": "https://saren.ai/brand",
        "name": "Brand Guide — Fire Horse 2026",
        "description": "Living brand style guide for saren.ai. Colors, typography, accessibility audit, components, and animation patterns.",
        "isPartOf": { "@id": "https://saren.ai/#website" },
        "author": { "@id": "https://saren.ai/#person" },
        "inLanguage": "en-US",
        "dateModified": "2026-04-01T00:00:00Z"
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": "https://saren.ai/brand/#work",
        "name": "Fire Horse 2026 — Living Brand Guide",
        "description": "The living visual identity specification for saren.ai: token-mapped color palette with WCAG contrast ratios, Sora and JetBrains Mono type system, button and card component standards, dark-mode rules, and Framer Motion animation catalog.",
        "url": "https://saren.ai/brand",
        "author": { "@id": "https://saren.ai/#person" },
        "creator": { "@id": "https://saren.ai/#person" },
        "isPartOf": { "@id": "https://saren.ai/#website" },
        "about": ["Design systems", "Visual identity", "Brand guidelines", "Accessibility"],
        "keywords": "brand guide, design system, Fire Horse 2026, color tokens, WCAG, typography, dark mode, Tailwind v4",
        "inLanguage": "en-US",
        "dateCreated": "2026-01-01",
        "dateModified": "2026-04-01T00:00:00Z"
      }} />
      <BrandClient />
    </PagefindBoundary>
  );
}
