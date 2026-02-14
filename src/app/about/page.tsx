import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Saren Sakurai | Marketing for the Messy Middle",
  description:
    "I build growth engines at the intersection of cultural storytelling and systems design. Fractional CMO for Series A startups.",
  openGraph: {
    title: "About Saren Sakurai | Marketing for the Messy Middle",
    description:
      "I build growth engines at the intersection of cultural storytelling and systems design. Fractional CMO for Series A startups.",
    images: ["/images/og/about.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Saren Sakurai | Marketing for the Messy Middle",
    description:
      "I build growth engines at the intersection of cultural storytelling and systems design. Fractional CMO for Series A startups.",
    images: ["/images/og/about.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
