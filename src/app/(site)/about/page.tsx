import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "About" }];

export const metadata: Metadata = {
  title: "About Saren Sakurai | Marketing for the Messy Middle",
  description:
    "I build growth engines at the intersection of cultural storytelling and systems design. Fractional Marketing Lead for Series A startups.",
  alternates: { canonical: "https://saren.ai/about" },
  openGraph: {
    title: "About Saren Sakurai | Marketing for the Messy Middle",
    description:
      "I build growth engines at the intersection of cultural storytelling and systems design. Fractional Marketing Lead for Series A startups.",
    images: ["/images/og/about.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Saren Sakurai | Marketing for the Messy Middle",
    description:
      "I build growth engines at the intersection of cultural storytelling and systems design. Fractional Marketing Lead for Series A startups.",
    images: ["/images/og/about.png"],
  },
};

export default function AboutPage() {
  const graph = buildGraph({
    path: "/about",
    pageType: "AboutPage",
    name: "About Saren Sakurai | Marketing for the Messy Middle",
    description:
      "I build growth engines at the intersection of cultural storytelling and systems design. Fractional Marketing Lead for Series A startups.",
    dateModified: "2026-03-27T00:00:00Z",
    identity: "full",
    breadcrumb: trail,
  });

  return (
    <PagefindBoundary section="About">
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <AboutClient />
    </PagefindBoundary>
  );
}
