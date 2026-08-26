import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Contact" }];

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
      <JsonLd
        schema={buildGraph({
          path: "/contact",
          pageType: "ContactPage",
          name: "Contact Saren | Start Your Growth Engine",
          description: "Ready to turn chaotic spend into predictable pipeline? Let's talk about fractional leadership or demand gen architecture.",
          dateModified: "2026-03-27T00:00:00Z",
          breadcrumb: trail,
        })}
      />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <ContactClient />
    </PagefindBoundary>
  );
}
