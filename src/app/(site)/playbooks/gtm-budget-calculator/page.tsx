import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph, workId } from "@/lib/schema";

const CalculatorClient = dynamic(() => import("./CalculatorClient"), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-slate">Loading...</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "GTM Budget Calculator | Saren.ai",
  description:
    "An interactive go-to-market budget planning tool for B2B SaaS teams. Model budget allocation across channels, plan spend by stage, and scenario-test your GTM investment before committing.",
  alternates: { canonical: "https://saren.ai/playbooks/gtm-budget-calculator" },
  openGraph: {
    title: "GTM Budget Calculator | Saren.ai",
    description:
      "An interactive go-to-market budget planning tool for B2B SaaS teams. Model budget allocation across channels, plan spend by stage, and scenario-test your GTM investment before committing.",
    images: ["/images/portfolio/portfolio-calculator.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTM Budget Calculator | Saren.ai",
    description:
      "An interactive go-to-market budget planning tool for B2B SaaS teams. Model budget allocation across channels, plan spend by stage, and scenario-test your GTM investment before committing.",
    images: ["/images/portfolio/portfolio-calculator.png"],
  },
};

const PATH = "/playbooks/gtm-budget-calculator";
const trail = [
  { href: "/", label: "Home" },
  { href: "/playbooks", label: "Playbooks" },
  { label: "GTM Budget Calculator" },
];

const graph = buildGraph({
  path: PATH,
  name: "GTM Budget Calculator | Saren.ai",
  description: "An interactive go-to-market budget planning tool for B2B SaaS teams. Model budget allocation across channels, plan spend by stage, and scenario-test your GTM investment before committing.",
  dateModified: "2026-03-27T00:00:00Z",
  breadcrumb: trail,
  extra: [
    {
      "@type": ["CreativeWork", "SoftwareApplication"],
      "@id": workId(PATH),
      "name": "GTM Budget Calculator",
      "description": "Interactive go-to-market budget planning tool for B2B SaaS teams",
      "url": `https://saren.ai${PATH}`,
      "author": { "@id": "https://saren.ai/#person" },
      "creator": { "@id": "https://saren.ai/#person" },
      "isPartOf": { "@id": "https://saren.ai/#website" },
      "about": ["GTM budget planning", "Go-to-market strategy", "B2B SaaS metrics"],
      "keywords": "GTM budget calculator, go-to-market planning, budget allocation, B2B SaaS, revenue planning",
      "image": {
        "@type": "ImageObject",
        "url": "https://saren.ai/images/portfolio/portfolio-calculator.png",
        "width": 1200,
        "height": 630
      },
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "inLanguage": "en-US",
      "dateCreated": "2026-02-04",
      "dateModified": "2026-03-27T00:00:00Z"
    },
  ],
});

export default function CalculatorPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="container-narrow pt-6">
        <Breadcrumb trail={trail} />
      </div>
      <CalculatorClient />
    </>
  );
}
