import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CalculatorClient = dynamic(() => import("./CalculatorClient"), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-slate">Loading...</div>
    </div>
  ),
});

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
