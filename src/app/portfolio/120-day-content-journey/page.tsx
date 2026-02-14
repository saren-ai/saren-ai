import type { Metadata } from "next";
import ContentJourneyClient from "./ContentJourneyClient";

export const metadata: Metadata = {
  title: "120-Day Content Journey | Saren.ai",
  description:
    "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
  openGraph: {
    title: "120-Day Content Journey | Saren.ai",
    description:
      "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
    images: ["/images/og/portfolio-content-journey.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "120-Day Content Journey | Saren.ai",
    description:
      "Engineering demand at scale. A system that maps content to buyer psychology across the entire decision lifecycle.",
    images: ["/images/og/portfolio-content-journey.png"],
  },
};

export default function ContentJourneyPage() {
  return <ContentJourneyClient />;
}
