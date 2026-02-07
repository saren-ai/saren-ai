import type { Metadata } from "next";
import Link from "next/link";
import { SaasCalculator } from "@/components/calculator/SaasCalculator";
import { Calculator, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "SaaS Funnel Calculator | Saren.ai",
  description:
    "Calculate your true SaaS marketing ROI. Bidirectional funnel calculator shows exactly what budget you need to hit revenue goals—or what revenue you can expect from your budget.",
  openGraph: {
    title: "SaaS Funnel ROI Calculator",
    description:
      "Stop guessing. Start budgeting like revenue depends on it.",
  },
};

export default function CalculatorPage() {
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
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-ash transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ember">Funnel Calculator</li>
              </ol>
            </nav>

            <div className="flex items-start gap-4 mb-6">
              <Calculator className="w-12 h-12 text-ember flex-shrink-0" />
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  The only ROI calculator that shows you the math investors already know.
                </h1>
                <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
                  Most CMOs get a budget and a revenue target. Rarely do they match.
                  This tool shows you exactly why&mdash;and what it actually takes to close the gap.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-ember/10 border border-ember/30 rounded-lg px-4 py-2 text-sm text-ash">
              <span className="font-semibold">Input budget OR revenue goal. See the gap.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-6xl mx-auto">
            <SaasCalculator />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-charcoal/5 dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-6">
              How It Works
            </h2>
            <div className="prose prose-lg text-slate dark:text-foreground-muted leading-relaxed space-y-4">
              <p>
                Most planning processes start with last year&apos;s numbers and add
                10-20%. That&apos;s not a plan&mdash;that&apos;s a guess.
              </p>
              <p>
                This calculator uses a <strong>bidirectional funnel methodology</strong>:
              </p>
              <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-lg p-6 my-6">
                <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-3">
                  Two Directions, One Truth
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-charcoal dark:text-foreground">
                      Budget &rarr; Revenue
                    </h4>
                    <ol className="space-y-1 list-decimal list-inside text-slate dark:text-foreground-muted">
                      <li>Start with your ad spend</li>
                      <li>Estimate visitors from cost-per-visit</li>
                      <li>Apply conversion rates forward through the funnel</li>
                      <li>Result: Projected revenue from that budget</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-charcoal dark:text-foreground">
                      Revenue Goal &rarr; Budget
                    </h4>
                    <ol className="space-y-1 list-decimal list-inside text-slate dark:text-foreground-muted">
                      <li>Start with your revenue target</li>
                      <li>Divide by deal size for deals needed</li>
                      <li>Apply conversion rates backward through the funnel</li>
                      <li>Result: Required budget to hit that target</li>
                    </ol>
                  </div>
                </div>
              </div>
              <p>
                Either direction reveals the same uncomfortable truth: the gap between
                ambition and resourcing. Every conversion rate is editable so you can
                model scenarios with your actual data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Data */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-6">
              About the Data
            </h2>
            <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-lg p-6">
              <p className="text-slate dark:text-foreground-muted mb-4">
                All benchmark data is sourced from FirstPageSage&apos;s comprehensive
                analysis of SaaS conversion rates and CAC by industry, supplemented
                with B2B SaaS ad platform benchmarks:
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://firstpagesage.com/seo-blog/average-saas-conversion-rates/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-electric hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Average SaaS Conversion Rates by Industry
                  </a>
                </li>
                <li>
                  <a
                    href="https://firstpagesage.com/marketing/cac-by-channel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-electric hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Customer Acquisition Cost (CAC) by Channel
                  </a>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-charcoal/5 dark:bg-background-secondary rounded text-xs text-slate dark:text-foreground-muted">
                <strong className="text-charcoal dark:text-foreground">Coverage:</strong>{" "}
                18 industry conversion rate profiles, 28 industries for CAC by scale,
                4 ad platforms (LinkedIn, Google Search, Google Display, Meta),
                13 traffic sources, and 16 industries for PLG/freemium benchmarks.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interpretation Guide */}
      <section className="section bg-charcoal/5 dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-6">
              Interpreting Your Results
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "If the numbers look impossible",
                  content:
                    "You have three options: (1) Lower your revenue goal, (2) Increase average deal size by moving upmarket, or (3) Improve conversion rates through better positioning, content, and sales process.",
                },
                {
                  title: "If the budget seems too high",
                  content:
                    "CAC varies dramatically by company scale and channel mix. Enterprise CAC is typically 3-5x higher than SMB. Consider which customer segment you're actually targeting and adjust your expectations accordingly.",
                },
                {
                  title: "If your actual rates differ from benchmarks",
                  content:
                    "Good! Click the conversion rates in the funnel to enter your actual numbers. A 5-10% improvement in any single rate compounds through the entire funnel.",
                },
                {
                  title: "If ROI is below 2x",
                  content:
                    "Your unit economics need work before you scale spend. Check the Optimization Levers section for the highest-impact improvements, or explore the PLG alternative pathways.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate dark:text-foreground-muted">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need help building your annual plan?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            This calculator shows you the math. I help you build the systems,
            content, and demand architecture to actually hit these numbers.
          </p>
          <Link href="/contact" className="btn-primary inline-flex text-lg">
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
