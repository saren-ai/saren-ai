import type { Metadata } from "next";
import ThinkersClient from "./ThinkersClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Subject Matter Experts" }];

export const metadata: Metadata = {
  title: "For Subject Matter Experts & Authority Builders | saren.ai",
  description:
    "Authority engineering, content architecture, and monetization frameworks for subject matter experts, thought leaders, and knowledge practitioners.",
  alternates: { canonical: "https://saren.ai/thinkers" },
  openGraph: {
    title: "For Subject Matter Experts & Authority Builders | saren.ai",
    description:
      "Authority engineering, content architecture, and monetization frameworks for subject matter experts, thought leaders, and knowledge practitioners.",
    type: "website",
  },
};

export default function ThinkersPage() {
  return (
    <PagefindBoundary section="Solutions">
      <JsonLd
        schema={buildGraph({
          path: "/thinkers",
          name: "For Subject Matter Experts & Authority Builders | saren.ai",
          description: "Authority engineering, content architecture, and monetization frameworks for subject matter experts and thought leaders.",
          breadcrumb: trail,
        })}
      />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <ThinkersClient />
    </PagefindBoundary>
  );
}
