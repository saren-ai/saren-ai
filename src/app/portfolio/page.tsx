import type { Metadata } from "next";
import Link from "next/link";
import PortfolioCard from "@/components/portfolio/PortfolioCard";

export const metadata: Metadata = {
  title: "Portfolio | Saren.ai",
  description:
    "Interactive case studies and frameworks demonstrating strategic marketing, demand generation, and AI-assisted creative production.",
};

const portfolioItems = [
  {
    title: "The Golden Dashboard",
    description:
      "Seeing ROI across the full demand funnel. A single analytics view that answers the hardest question in marketing: which channel spend creates real business outcomes?",
    metric: "550%",
    metricLabel: "Pipeline Expansion",
    href: "/portfolio/golden-dashboard",
  },
  {
    title: "Sovereign Buyer Personas",
    description:
      "Making complex markets legible. A framework for building personas that actually drive targeting, messaging, and content decisions in sovereign infrastructure deals.",
    metric: "3x",
    metricLabel: "Conversion Lift",
    href: "/portfolio/sovereign-personas",
  },
  {
    title: "10-Touch Sales Play",
    description:
      "Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings.",
    metric: "42%",
    metricLabel: "Meeting Rate",
    href: "/portfolio/10-touch-sales-play",
  },
  {
    title: "120-Day Content Journey",
    description:
      "How we engineered demand at Cylance. A content system designed to move buyers from awareness through purchase consideration.",
    metric: "$4M",
    metricLabel: "Quarterly Pipeline",
    href: "/portfolio/120-day-content-journey",
  },
  {
    title: "B2B Marketing Framework",
    description:
      "A 7-layer prompt matrix for building B2B SaaS messaging infrastructure from scratch. The essential system for teams who can't afford to build on quicksand.",
    metric: "21",
    metricLabel: "Prompts",
    href: "/portfolio/b2b-marketing-framework",
  },
  {
    title: "It's Good to Be Pitched",
    description:
      "A 30-second TV spot storyboard about the pleasure of having three great options. Interactive narrative showing AI-assisted creative production.",
    metric: "8",
    metricLabel: "Storyboard Frames",
    href: "/portfolio/its-good-to-be-pitched",
  },
];

export default function PortfolioPage() {
  return (
    <article>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-ash/60">
                <li>
                  <Link href="/" className="hover:text-ash transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ember">Portfolio</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Work
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
              Interactive case studies that demonstrate strategy, systems, and
              results. Each project showcases a different aspect of demand
              generation, analytics, and AI-native creative production.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {portfolioItems.map((item, index) => (
              <PortfolioCard key={item.href} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build your growth engine?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Let&apos;s build the systems, analytics, and content strategy that
            turn vision into velocity.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ember hover:bg-ember/90 text-white rounded-lg font-semibold transition-colors text-lg"
          >
            Let&apos;s talk
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </article>
  );
}
