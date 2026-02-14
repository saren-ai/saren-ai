import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "SaaS Revenue Calculator | Saren.ai",
  description:
    "Stop wondering where your revenue plan breaks. Input your goals and ACV to see exactly how much pipe you need.",
  openGraph: {
    title: "SaaS Revenue Calculator | Saren.ai",
    description:
      "Stop wondering where your revenue plan breaks. Input your goals and ACV to see exactly how much pipe you need.",
    images: ["/images/og/portfolio-calculator.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Revenue Calculator | Saren.ai",
    description:
      "Stop wondering where your revenue plan breaks. Input your goals and ACV to see exactly how much pipe you need.",
    images: ["/images/og/portfolio-calculator.png"],
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
