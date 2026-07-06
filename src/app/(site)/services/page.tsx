import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Services | saren.ai",
  description:
    "How I work with teams: GTM Systems Audit, Fractional Marketing Lead, Project Engagement, and Advisory & Positioning.",
  alternates: { canonical: "https://saren.ai/services" },
  openGraph: {
    title: "Services | saren.ai",
    description:
      "How I work with teams: GTM Systems Audit, Fractional Marketing Lead, Project Engagement, and Advisory & Positioning.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <PagefindBoundary section="Services">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://saren.ai/services/#webpage",
            url: "https://saren.ai/services",
            name: "Services | saren.ai",
            description:
              "How I work with teams: GTM Systems Audit, Fractional Marketing Lead, Project Engagement, and Advisory & Positioning.",
            isPartOf: { "@id": "https://saren.ai/#website" },
            provider: { "@id": "https://saren.ai/#person" },
            inLanguage: "en-US",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Engagement Types",
              itemListElement: [
                {
                  "@type": "Offer",
                  price: "2500",
                  priceCurrency: "USD",
                  itemOffered: {
                    "@type": "Service",
                    name: "GTM Systems Audit",
                    description:
                      "Fixed-price, 2-week teardown of your funnel, stack, and spend.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Fractional Marketing Lead",
                    description:
                      "Strategic marketing leadership 10–20 hours/week, system building, demand gen architecture.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Project Engagement",
                    description:
                      "Scoped deliverables for a specific initiative.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Advisory & Positioning",
                    description:
                      "Thought leadership architecture and personal brand strategy.",
                  },
                },
              ],
            },
          }),
        }}
      />
      <ServicesClient />
    </PagefindBoundary>
  );
}
