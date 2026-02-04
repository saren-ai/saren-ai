import type { Metadata } from "next";
import Link from "next/link";
import { SaasCalculator } from "@/components/calculator/SaasCalculator";
import { Calculator, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "SaaS Revenue Goal Calculator | How Many Leads Do You Actually Need?",
  description:
    "Work backwards from your revenue goal to see exactly what it takes. Interactive calculator using industry conversion rate benchmarks to reverse-engineer your funnel.",
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
                <li className="text-ember">Revenue Calculator</li>
              </ol>
            </nav>

            <div className="flex items-start gap-4 mb-6">
              <Calculator className="w-12 h-12 text-ember flex-shrink-0" />
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  How many leads do you actually need?
                </h1>
                <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
                  Every marketing leader faces the same question during annual
                  planning: "What's our target?" This calculator works backwards
                  from your revenue goal to show exactly what it takes to get
                  there.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-ember/10 border border-ember/30 rounded-lg px-4 py-2 text-sm text-ash">
              <span className="font-semibold">Set your goal. See your reality.</span>
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
                Most planning processes start with last year's numbers and add
                10-20%. That's not a plan—that's a guess.
              </p>
              <p>
                This calculator uses a <strong>reverse-funnel methodology</strong>:
                you set your revenue goal and average deal size, and it works
                backwards through each conversion stage to show exactly what
                volume you need at every step.
              </p>
              <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-lg p-6 my-6">
                <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-3">
                  The Math
                </h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Start with your revenue goal</li>
                  <li>Divide by average deal size = Closed/Won deals needed</li>
                  <li>Apply industry conversion rates working backwards through the funnel</li>
                  <li>Result: Required volume at each stage (Opportunities → SQLs → MQLs → Leads → Visitors)</li>
                </ol>
              </div>
              <p>
                The conversion rates auto-adjust based on your industry,
                sourced from FirstPageSage's analysis of thousands of B2B SaaS
                companies.
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
                All benchmark data is sourced from FirstPageSage's comprehensive
                analysis of SaaS conversion rates and CAC by industry:
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
              <p className="text-xs text-slate dark:text-foreground-muted mt-4">
                Benchmarks are averages across hundreds of companies. Your
                actual conversion rates may vary based on product, market,
                positioning, and execution quality.
              </p>
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
                  title: "If you're missing conversion rate data",
                  content:
                    "Start tracking it now. You can't improve what you don't measure. At minimum, instrument: website visitors, leads (form fills), MQLs (marketing-qualified), SQLs (sales-accepted), opportunities (in-pipeline), and closed/won.",
                },
                {
                  title: "If your actual rates differ from benchmarks",
                  content:
                    "Good! That means you have a competitive advantage (or disadvantage). Use this calculator to understand where you're strong vs. where you need improvement. A 5-10% improvement in any single conversion rate compounds through the entire funnel.",
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
            Let's talk
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
