import type { Metadata } from "next";
import SMBClient from "./SMBClient";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Founders & Mid-Market" }];

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
      <JsonLd
        schema={buildGraph({
          path: "/smb",
          name: "For Founders & Mid-Market Teams | saren.ai",
          description: "GTM systems, demand gen architecture, and AI-powered marketing operations for growth-stage companies.",
          breadcrumb: trail,
        })}
      />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <SMBClient />
    </PagefindBoundary>
  );
}
