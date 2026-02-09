import type { Metadata } from "next";
import PortfolioPageContent from "./PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio | Saren.ai",
  description:
    "Interactive case studies and frameworks demonstrating strategic marketing, demand generation, and AI-assisted creative production.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
