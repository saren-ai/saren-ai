import type { Metadata } from "next";
import ClientsPageContent from "./ClientsPageContent";

export const metadata: Metadata = {
  title: "Client Brands | Saren.ai",
  description:
    "Trusted by leading B2B technology companies and Fortune 500 consumer brands. From cybersecurity unicorns to household names.",
  alternates: { canonical: "https://saren.ai/about/clients" },
  openGraph: {
    title: "Client Brands | Saren.ai",
    description:
      "26+ brands across B2B tech and consumer marketing—from startups to Fortune 500.",
  },
};

export default function ClientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/about/clients/#webpage",
            "url": "https://saren.ai/about/clients",
            "name": "Client Brands | Saren.ai",
            "description": "Trusted by leading B2B technology companies and Fortune 500 consumer brands. From cybersecurity unicorns to household names.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
              { "@type": "ListItem", "position": 2, "name": "About", "item": "https://saren.ai/about" },
              { "@type": "ListItem", "position": 3, "name": "Client Brands", "item": "https://saren.ai/about/clients" }
            ]
          })
        }}
      />
      <ClientsPageContent />
    </>
  );
}
