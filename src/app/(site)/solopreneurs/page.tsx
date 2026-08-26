import type { Metadata } from "next";
import SolopreneursClient from "./SolopreneursClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Solo Founders & Fractional CMOs" }];

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
      <JsonLd
        schema={buildGraph({
          path: "/solopreneurs",
          name: "For Solo Founders & Fractional CMOs | saren.ai",
          description: "Pipeline automation, systems that multiply solo output, and self-managed workflows for solopreneurs and fractional CMOs.",
          breadcrumb: trail,
        })}
      />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <SolopreneursClient />
    </PagefindBoundary>
  );
}
