import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PsylockeTimelineClient = dynamic(
  () => import("./PsylockeTimelineClient"),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-slate">Loading...</div>
      </div>
    ),
  }
);

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
