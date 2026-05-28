import type { Metadata } from "next";
import IntentDataClient from "./IntentDataClient";

export const metadata: Metadata = {
  title: "Intent Data as Funnel Intelligence | Saren Sakurai",
  description:
    "A methodology showcase: mapping Bombora intent signals across ~100 Cylance close/won enterprise accounts from 18 months pre-close to purchase — and building a just-in-time content engine from the data.",
  alternates: { canonical: "https://saren.ai/case-studies/intent-data" },
};

export default function IntentDataPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/case-studies/intent-data/#webpage",
            "url": "https://saren.ai/case-studies/intent-data",
            "name": "Intent Data as Funnel Intelligence | Saren Sakurai",
            "description": "A methodology showcase: mapping Bombora intent signals across ~100 Cylance close/won enterprise accounts from 18 months pre-close to purchase — and building a just-in-time content engine from the data.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateCreated": "2026-01-20",
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
              { "@type": "ListItem", "position": 3, "name": "Intent Data as Funnel Intelligence", "item": "https://saren.ai/case-studies/intent-data" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": "https://saren.ai/case-studies/intent-data/#work",
            "name": "Intent Data as Funnel Intelligence",
            "description": "A methodology for mapping Bombora intent signals across ~100 Cylance close/won enterprise accounts from 18 months pre-close to purchase, revealing a predictable 6-phase buyer journey and enabling a just-in-time content engine keyed to purchase-proximity.",
            "url": "https://saren.ai/case-studies/intent-data",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["Intent data", "Demand generation", "B2B cybersecurity marketing", "Bombora", "Content strategy"],
            "keywords": "intent data, Bombora, funnel intelligence, B2B cybersecurity, demand generation, content engine, buyer journey, Cylance",
            "teaches": "Using third-party intent data to map the B2B buyer journey and build a content engine keyed to purchase proximity",
            "inLanguage": "en-US",
            "dateCreated": "2026-01-20",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "@id": "https://saren.ai/case-studies/intent-data/#howto",
            "name": "6-Phase Buyer Journey: Intent Signal Timeline",
            "description": "How Bombora intent topics shift across 6 time windows in the 18 months preceding enterprise cybersecurity purchases — from early posture research to final vendor selection.",
            "author": { "@id": "https://saren.ai/#person" },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "15–18 Months Pre-Close: Early Posture Research",
                "text": "Buyers assess whether their current stack is adequate. Thought leadership and compliance topics dominate. No active vendor evaluation yet."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "12–15 Months Pre-Close: Threat Awareness Doubles",
                "text": "Security Breaches enters the top 10 with the highest lift (+147%) of any topic in this period. Buyers read about breaches through a solutions lens."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "9–12 Months Pre-Close: The Inflection Point",
                "text": "Threat topics surge. Cyberwarfare jumps from #13 to #3. Ransomware enters the top 15. Symantec appears for the first time — vendor research begins."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "6–9 Months Pre-Close: Peak Anxiety",
                "text": "Cyberwarfare hits 306 surges — the highest volume of any topic across all periods. Buyers consume threat content voraciously. Legacy vendor evaluation is active."
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "3–6 Months Pre-Close: Active Evaluation Begins",
                "text": "Buyers shift from 'what's the threat?' to 'what stops it?' Security Tools, Malware Detection, and Fraud Detection signal tool-shopping and internal business case building."
              },
              {
                "@type": "HowToStep",
                "position": 6,
                "name": "0–3 Months Pre-Close: Final Vendor Selection",
                "text": "Security Intelligence (+127% lift) and Security Threats (+125% lift) are the sharpest purchase-intent signals. Decision friction is what kills deals at this stage."
              }
            ]
          })
        }}
      />
      <IntentDataClient />
    </>
  );
}
