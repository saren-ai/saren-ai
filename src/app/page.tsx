import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
  description:
    "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
  openGraph: {
    title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
    description:
      "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
    images: ["/images/og/home.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
    description:
      "Demand generation as engineering. Building AI-driven growth engines for early-stage and Series A startups.",
    images: ["/images/og/home.png"],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
