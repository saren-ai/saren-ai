import type { Metadata } from "next";
import EngageClient from "./EngageClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Work With Me | saren.ai",
  description:
    "Ready to build a real marketing engine? Schedule a call or send a message to discuss fractional CMO engagements, demand gen architecture, or AI operations.",
  alternates: { canonical: "https://saren.ai/engage" },
  openGraph: {
    title: "Work With Me | saren.ai",
    description:
      "Ready to build a real marketing engine? Schedule a call or send a message to discuss fractional CMO engagements, demand gen architecture, or AI operations.",
    type: "website",
  },
};

export default function EngagePage() {
  return (
    <PagefindBoundary section="About">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://saren.ai/engage/#webpage",
            url: "https://saren.ai/engage",
            name: "Work With Me | saren.ai",
            description:
              "Schedule a call or send a message to discuss fractional CMO engagements, demand gen architecture, or AI operations.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: { "@id": "https://saren.ai/#person" },
            inLanguage: "en-US",
          }),
        }}
      />
      <EngageClient />
    </PagefindBoundary>
  );
}
