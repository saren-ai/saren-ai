import type { Metadata } from "next";
import DownloadsClient from "./DownloadsClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Downloads & Templates | saren.ai",
  description:
    "Digital downloads, frameworks, and operating templates for founders, fractional CMOs, and subject matter experts. Built from real enterprise engagements.",
  alternates: { canonical: "https://saren.ai/downloads" },
  openGraph: {
    title: "Downloads & Templates | saren.ai",
    description:
      "Digital downloads, frameworks, and operating templates for founders, fractional CMOs, and subject matter experts. Built from real enterprise engagements.",
    type: "website",
  },
};

export default function DownloadsPage() {
  return (
    <PagefindBoundary section="Downloads">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/downloads/#webpage",
            url: "https://saren.ai/downloads",
            name: "Downloads & Templates | saren.ai",
            description:
              "Digital downloads, frameworks, and operating templates built from real enterprise engagements.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            inLanguage: "en-US",
          }),
        }}
      />
      <DownloadsClient />
    </PagefindBoundary>
  );
}
