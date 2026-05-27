import type { Metadata } from "next";
import ThinkersClient from "./ThinkersClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "For Subject Matter Experts & Authority Builders | saren.ai",
  description:
    "Authority engineering, content architecture, and monetization frameworks for subject matter experts, thought leaders, and knowledge practitioners.",
  alternates: { canonical: "https://saren.ai/thinkers" },
  openGraph: {
    title: "For Subject Matter Experts & Authority Builders | saren.ai",
    description:
      "Authority engineering, content architecture, and monetization frameworks for subject matter experts, thought leaders, and knowledge practitioners.",
    type: "website",
  },
};

export default function ThinkersPage() {
  return (
    <PagefindBoundary section="Solutions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/thinkers/#webpage",
            url: "https://saren.ai/thinkers",
            name: "For Subject Matter Experts & Authority Builders | saren.ai",
            description:
              "Authority engineering, content architecture, and monetization frameworks for subject matter experts and thought leaders.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            inLanguage: "en-US",
          }),
        }}
      />
      <ThinkersClient />
    </PagefindBoundary>
  );
}
