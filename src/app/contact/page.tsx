import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";

export const metadata: Metadata = {
  title: "Contact Saren | Start Your Growth Engine",
  description:
    "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
  alternates: { canonical: "https://saren.ai/contact" },
  openGraph: {
    title: "Contact Saren | Start Your Growth Engine",
    description:
      "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
    images: ["/images/og/contact.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Saren | Start Your Growth Engine",
    description:
      "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
    images: ["/images/og/contact.png"],
  },
};

export default function ContactPage() {
  return (
    <PagefindBoundary section="About">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://saren.ai/contact/#webpage",
            "url": "https://saren.ai/contact",
            "name": "Contact Saren | Start Your Growth Engine",
            "description": "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
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
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://saren.ai/contact" }
            ]
          })
        }}
      />
      <ContactClient />
    </PagefindBoundary>
  );
}
