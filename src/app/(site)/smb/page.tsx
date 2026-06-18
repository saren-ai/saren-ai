import type { Metadata } from "next";
import SMBClient from "./SMBClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "For Founders & Mid-Market Teams | saren.ai",
  description:
    "GTM systems, demand gen architecture, and AI-powered marketing operations for growth-stage companies that have budget but need infrastructure to scale it.",
  alternates: { canonical: "https://saren.ai/smb" },
  openGraph: {
    title: "For Founders & Mid-Market Teams | saren.ai",
    description:
      "GTM systems, demand gen architecture, and AI-powered marketing operations for growth-stage companies that have budget but need infrastructure to scale it.",
    type: "website",
  },
};

export default function SMBPage() {
  return (
    <PagefindBoundary section="Solutions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/smb/#webpage",
            url: "https://saren.ai/smb",
            name: "For Founders & Mid-Market Teams | saren.ai",
            description:
              "GTM systems, demand gen architecture, and AI-powered marketing operations for growth-stage companies.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            inLanguage: "en-US",
          }),
        }}
      />
      <SMBClient />
    </PagefindBoundary>
  );
}
