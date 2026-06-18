import type { Metadata } from "next";
import SolopreneursClient from "./SolopreneursClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "For Solo Founders & Fractional CMOs | saren.ai",
  description:
    "Pipeline automation, systems that multiply solo output, and self-managed workflows for solopreneurs, fractional CMOs, and independents who are the whole marketing department.",
  alternates: { canonical: "https://saren.ai/solopreneurs" },
  openGraph: {
    title: "For Solo Founders & Fractional CMOs | saren.ai",
    description:
      "Pipeline automation, systems that multiply solo output, and self-managed workflows for solopreneurs, fractional CMOs, and independents who are the whole marketing department.",
    type: "website",
  },
};

export default function SolopreneursPage() {
  return (
    <PagefindBoundary section="Solutions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/solopreneurs/#webpage",
            url: "https://saren.ai/solopreneurs",
            name: "For Solo Founders & Fractional CMOs | saren.ai",
            description:
              "Pipeline automation, systems that multiply solo output, and self-managed workflows for solopreneurs and fractional CMOs.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            inLanguage: "en-US",
          }),
        }}
      />
      <SolopreneursClient />
    </PagefindBoundary>
  );
}
