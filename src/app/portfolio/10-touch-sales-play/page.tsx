import type { Metadata } from "next";
import SalesPlayClient from "./SalesPlayClient";

export const metadata: Metadata = {
  title: "10-Touch Sales Play | Saren.ai",
  description:
    "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
  openGraph: {
    title: "10-Touch Sales Play | Saren.ai",
    description:
      "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
    images: ["/images/og/portfolio-10-touch.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "10-Touch Sales Play | Saren.ai",
    description:
      "Turn cold outreach into executive conversations. A value-first sequence designed for complex B2B sales cycles.",
    images: ["/images/og/portfolio-10-touch.png"],
  },
};

export default function SalesPlayPage() {
  return <SalesPlayClient />;
}
