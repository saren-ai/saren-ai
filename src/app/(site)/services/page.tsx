import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph, ID, serviceId } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Services" }];

export const metadata: Metadata = {
  title: "Services | saren.ai",
  description: "How I work with teams: GTM Systems Audit, Fractional Marketing Lead, Project Engagement, and Advisory & Positioning.",
  alternates: { canonical: "https://saren.ai/services" },
  openGraph: {
    title: "Services | saren.ai",
    description: "How I work with teams: GTM Systems Audit, Fractional Marketing Lead, Project Engagement, and Advisory & Positioning.",
    type: "website",
  },
};

// Previously this Service node illegitimately squatted the page's own #webpage @id
// (there was no real WebPage node on this page). buildGraph now creates the real
// WebPage node; this Service gets its own proper @id.
const servicesNode = {
  "@type": "Service",
  "@id": serviceId("/services"),
  name: "Services | saren.ai",
  description: "How I work with teams: GTM Systems Audit, Fractional Marketing Lead, Project Engagement, and Advisory & Positioning.",
  provider: { "@id": ID.person },
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
          description: "Fixed-price, 2-week teardown of your funnel, stack, and spend.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fractional Marketing Lead",
          description: "Strategic marketing leadership 10–20 hours/week, system building, demand gen architecture.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Project Engagement",
          description: "Scoped deliverables for a specific initiative.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Advisory & Positioning",
          description: "Thought leadership architecture and personal brand strategy.",
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <PagefindBoundary section="Services">
      <JsonLd
        schema={buildGraph({
          path: "/services",
          name: "Services | saren.ai",
          description: "How I work with teams: GTM Systems Audit, Fractional Marketing Lead, Project Engagement, and Advisory & Positioning.",
          breadcrumb: trail,
          extra: [servicesNode],
        })}
      />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <ServicesClient />
    </PagefindBoundary>
  );
}
