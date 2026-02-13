import type { Metadata } from "next";
import Link from "next/link";
import HeroBentoEngine from "@/components/golden-dashboard/hero/HeroBentoEngine";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Paid Media ROI Simulator: Forecast Outcomes Before You Spend",
  description:
    "An interactive financial model for performance marketers. Simulate the revenue impact of your ad spend using real unit economics.",
  openGraph: {
    title: "Paid Media ROI Simulator | Saren.ai",
    description:
      "Stop guessing. Simulate the revenue impact of your ad spend using real unit economics.",
    images: ["/portfolio/roi-simulator-og.png"],
  },
};

export default function GoldenDashboardPage() {
  return (
    <article>
      {/* New Hero Engine */}
      <HeroBentoEngine />

      {/* The Problem */}
      <section className="section bg-background-secondary text-foreground">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Problem: The Black Box of Ad Spend
            </h2>
            <div className="prose prose-lg text-foreground-muted leading-relaxed">
              <p>
                Every performance marketer knows the feeling: you have a budget to deploy, but you're flying blind on the downstream impact.
                You know your Cost Per Click (CPC), but how does that translate to <strong>Revenue</strong>?
              </p>
              <p>
                Most dashboards look backward—telling you what happened last month. I built this <strong>ROI Simulator</strong> to look forward.
                It uses your unit economics to answer the critical question before you spend a single dollar:
              </p>
              <blockquote className="border-l-4 border-ember pl-6 my-8 text-foreground font-medium italic">
                &quot;If I spend $50k this month at a $2.50 CPC, what is my projected ROI?&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* The Methodology */}
      <section className="section bg-foreground/5">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Methodology
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background-secondary p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-ember/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Live Simulation
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Stop guessing. Adjust your budget, CPC, and conversion targets in real-time to see how they impact your bottom line.
                </p>
              </div>

              <div className="bg-background-secondary p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-electric" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Full-Funnel Math
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  The model connects the dots from Top-of-Funnel (Impressions) to Bottom-of-Funnel (Revenue) using standard conversion rates.
                </p>
              </div>

              <div className="bg-background-secondary p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-copper/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Unit Economics Customization
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Define your own efficiency targets (CPL, Target CPC) to see what it takes to make the math work.
                </p>
              </div>

              <div className="bg-background-secondary p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Executive-Ready
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Designed for the boardroom. Translate complex ad metrics into the language of finance: ROI and ROAS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Use Cases
            </h2>
            <ul className="space-y-4">
              {[
                "Budget Allocation: Determine the optimal spend to hit specific revenue targets.",
                "Scenario Planning: Test 'What If' scenarios for changing market conditions (e.g., rising CPCs).",
                "Forecasting: Communicate marketing efficiency with financial precision.",
                "Gap Analysis: Identify where your current performance deviates from the 'Golden Path'.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-ember/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-electric-foreground">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Need a custom simulator for your business?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            I build custom financial models and analytics tools that help B2B marketing teams forecast with confidence.
          </p>
          <Link href="/contact" className="btn-primary inline-flex text-lg">
            Let&apos;s talk
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={[
          {
            question: "Is this tool for SEO or Organic traffic?",
            answer: "No. This simulator is specifically designed for Paid Media (Performance Marketing) where you have direct control over levers like Budget and Max CPC. Organic channels require a different set of inputs and lag assumptions."
          },
          {
            question: "How accurate are the projections?",
            answer: "The projections are as accurate as the inputs you provide. The model uses standard funnel math. If you input your historical conversion rates (e.g., Lead-to-MQL), the revenue projection will be mathematically consistent with your budget."
          },
          {
            question: "What is 'ACV'?",
            answer: "ACV stands for Annual Contract Value. In B2B SaaS, this is the average revenue you generate from a single closed deal over one year. We use a default of $25k for this simulation, but custom versions can make this dynamic."
          },
          {
            question: "Can I export these scenarios?",
            answer: "Yes! Use the 'Share Scenario' button in the top right to generate a unique link. You can send this to your team or CFO to show them exactly what budget you need to hit your targets."
          },
          {
            question: "Do you build this for Hubspot or Salesforce?",
            answer: "Yes. I build custom integrations that pull your live data from CRMs and Ad Platforms into unified views like this, so you're not just simulating—you're tracking actuals against forecast."
          }
        ]}
      />

      {/* More Portfolio */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <h3 className="text-2xl font-bold text-charcoal mb-8 text-center">
            Explore More Work
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "B2B Marketing Framework",
                desc: "7-layer prompt system for messaging infrastructure",
                href: "/portfolio/b2b-marketing-framework",
              },
              {
                title: "120-Day Content Journey",
                desc: "Engineering demand at scale",
                href: "/portfolio/120-day-content-journey",
              },
              {
                title: "Sovereign Personas",
                desc: "Making complex markets legible",
                href: "/portfolio/sovereign-personas",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block p-6 bg-charcoal/5 rounded-lg hover:bg-electric/10 transition-colors group"
              >
                <h4 className="font-semibold text-charcoal group-hover:text-ember transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="text-slate text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
