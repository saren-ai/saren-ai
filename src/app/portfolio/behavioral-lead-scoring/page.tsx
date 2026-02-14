import type { Metadata } from "next";
import BehavioralScoringClient from "./BehavioralScoringClient";

export const metadata: Metadata = {
  title: "Behavioral Lead Scoring | Saren.ai",
  description:
    "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
  openGraph: {
    title: "Behavioral Lead Scoring | Saren.ai",
    description:
      "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
    images: ["/images/og/portfolio-lead-scoring.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Behavioral Lead Scoring | Saren.ai",
    description:
      "Quantify buyer intent without the guesswork. A scoring model that differentiates between 'fit' and 'engagement' for cleaner MQLs.",
    images: ["/images/og/portfolio-lead-scoring.png"],
  },
};

export default function BehavioralLeadScoringPage() {
  return <BehavioralScoringClient />;
}
