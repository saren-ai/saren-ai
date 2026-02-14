import type { Metadata } from "next";
import SovereignPersonasClient from "./SovereignPersonasClient";

export const metadata: Metadata = {
  title: "Sovereign Personas | Saren.ai",
  description:
    "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
  openGraph: {
    title: "Sovereign Personas | Saren.ai",
    description:
      "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
    images: ["/images/og/portfolio-sovereign-personas.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign Personas | Saren.ai",
    description:
      "Buyer personas for sovereign infrastructure deals. Why 'CTO' isn't enough when you're selling national resilience.",
    images: ["/images/og/portfolio-sovereign-personas.png"],
  },
};

export default function SovereignPersonasPage() {
  return <SovereignPersonasClient />;
}
