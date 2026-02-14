import type { Metadata } from "next";
import PsylockeTimelineClient from "./PsylockeTimelineClient";

export const metadata: Metadata = {
  title: "Psylocke Timeline | Saren.ai",
  description:
    "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
  openGraph: {
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
    images: ["/images/og/portfolio-psylocke.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psylocke Timeline | Saren.ai",
    description:
      "A fan-made interactive timeline of the X-Men's most convoluted character. Built with Framer Motion and nerd obsession.",
    images: ["/images/og/portfolio-psylocke.png"],
  },
};

export default function PsylockeTimelinePage() {
  return <PsylockeTimelineClient />;
}
