import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
  alternates: { canonical: "https://saren.ai/portfolio/gtm-budget-calculator" },
  openGraph: {
    title: "GTM Budget Calculator | Saren.ai",
    description:
      "An interactive go-to-market budget planning tool for B2B SaaS teams. Model budget allocation across channels, plan spend by stage, and scenario-test your GTM investment before committing.",
    images: ["/images/og/portfolio-calculator.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTM Budget Calculator | Saren.ai",
    description:
      "An interactive go-to-market budget planning tool for B2B SaaS teams. Model budget allocation across channels, plan spend by stage, and scenario-test your GTM investment before committing.",
    images: ["/images/og/portfolio-calculator.png"],
  },
};

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/portfolio/gtm-budget-calculator/#webpage",
            "url": "https://saren.ai/portfolio/gtm-budget-calculator",
            "name": "GTM Budget Calculator | Saren.ai",
            "description": "An interactive go-to-market budget planning tool for B2B SaaS teams. Model budget allocation across channels, plan spend by stage, and scenario-test your GTM investment before committing.",
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
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saren.ai/portfolio" },
              { "@type": "ListItem", "position": 3, "name": "GTM Budget Calculator", "item": "https://saren.ai/portfolio/gtm-budget-calculator" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["CreativeWork", "SoftwareApplication"],
            "@id": "https://saren.ai/portfolio/gtm-budget-calculator/#work",
            "name": "GTM Budget Calculator",
            "description": "Interactive go-to-market budget planning tool for B2B SaaS teams",
            "url": "https://saren.ai/portfolio/gtm-budget-calculator",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["GTM budget planning", "Go-to-market strategy", "B2B SaaS metrics"],
            "keywords": "GTM budget calculator, go-to-market planning, budget allocation, B2B SaaS, revenue planning",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-04",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <CalculatorClient />
    </>
  );
}
