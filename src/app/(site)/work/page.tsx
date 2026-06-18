import type { Metadata } from "next";
import WorkClient from "./WorkClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Work With Me | saren.ai",
  description:
    "Ready to build a real marketing engine? Schedule a call or send a message to discuss fractional marketing lead engagements, demand gen architecture, or AI operations.",
  alternates: { canonical: "https://saren.ai/work" },
  openGraph: {
    title: "Work With Me | saren.ai",
    description:
      "Ready to build a real marketing engine? Schedule a call or send a message to discuss fractional marketing lead engagements, demand gen architecture, or AI operations.",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <PagefindBoundary section="Work">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://saren.ai/work/#webpage",
            url: "https://saren.ai/work",
            name: "Work With Me | saren.ai",
            description:
              "Schedule a call or send a message to discuss fractional marketing lead engagements, demand gen architecture, or AI operations.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: { "@id": "https://saren.ai/#person" },
            inLanguage: "en-US",
          }),
        }}
      />
      <WorkClient />
    </PagefindBoundary>
  );
}
