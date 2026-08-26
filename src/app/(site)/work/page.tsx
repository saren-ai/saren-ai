import type { Metadata } from "next";
import WorkClient from "./WorkClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Work With Me" }];

export const metadata: Metadata = {
  title: "Work With Me | saren.ai",
  description:
    "Ready to build a real marketing engine? Schedule a call or send a message to discuss fractional marketing lead engagements, demand gen architecture, or AI operations.",
  alternates: { canonical: "https://saren.ai/work" },
  openGraph: {
    title: "Work With Me | saren.ai",
    description:
      "Ready to build a real marketing engine? Schedule a call or send a message to discuss fractional marketing lead engagements, demand gen architecture, or AI operations.",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <PagefindBoundary section="Work">
      <JsonLd
        schema={buildGraph({
          path: "/work",
          pageType: "ContactPage",
          name: "Work With Me | saren.ai",
          description:
            "Schedule a call or send a message to discuss fractional marketing lead engagements, demand gen architecture, or AI operations.",
          breadcrumb: trail,
        })}
      />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <WorkClient />
    </PagefindBoundary>
  );
}
