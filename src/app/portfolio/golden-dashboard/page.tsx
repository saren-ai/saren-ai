import type { Metadata } from "next";
import Link from "next/link";
import DashboardFlow from "@/components/golden-dashboard/DashboardFlow";

export const metadata: Metadata = {
  title: "The Golden Dashboard: Seeing ROI Across the Full Demand Funnel",
  description:
    "An interactive analytics framework that answers the hardest question in marketing: which channel spend creates real business outcomes?",
  openGraph: {
    title: "The Golden Dashboard | Saren.ai",
    description:
      "An interactive analytics framework for full-funnel marketing attribution.",
    images: ["/portfolio/golden-dashboard-og.png"],
  },
};

export default function GoldenDashboardPage() {
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
                    href="/portfolio/golden-dashboard"
                    className="hover:text-ash transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ember">Golden Dashboard</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Golden Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
              Seeing ROI across the full demand funnel—a single analytics view
              designed to answer the hardest question in marketing.
            </p>
          </div>
        </div>
      </section>

      {/* The Interactive Deliverable */}
      <section className="section bg-gradient-to-br from-charcoal/5 to-electric/5">
        <div className="container-narrow">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-ember/10 text-ember text-sm font-semibold rounded-full mb-4">
              Interactive Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Try It Yourself
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              This isn't just a screenshot—it's a live decision model. Click Calculator Mode to simulate scenarios, hover for insights, click any stage for deep consulting playbooks.
            </p>
          </div>

          <DashboardFlow />
        </div>
      </section>

      {/* The Problem */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              The Problem
            </h2>
            <div className="prose prose-lg text-slate leading-relaxed">
              <p>
                Every startup says they want &quot;better attribution.&quot; What they
                usually mean is: <em>tell me which spend actually turns into
                revenue.</em>
              </p>
              <p>
                When I worked with CloudKitchens as a Demand Generation
                consultant, we built what I call the Golden Dashboard—a single
                analytics view designed to answer the hardest question in
                marketing:
              </p>
              <blockquote className="border-l-4 border-ember pl-6 my-8 text-charcoal font-medium italic">
                &quot;Which channel spend is creating real business outcomes, and
                where are we leaking value?&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="section bg-charcoal/5">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              The Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-ash p-6 rounded-lg border border-charcoal/10">
                <div className="w-12 h-12 bg-ember/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-ember"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Full-Funnel View
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Not just clicks or leads—every stage from impression to
                  closed-won deal, with costs normalized at each step.
                </p>
              </div>

              <div className="bg-ash p-6 rounded-lg border border-charcoal/10">
                <div className="w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-electric"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Cost Normalization
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  CPM, CPC, CPL, CPQL, CPO—all in one view so you can see
                  exactly where your budget is going.
                </p>
              </div>

              <div className="bg-ash p-6 rounded-lg border border-charcoal/10">
                <div className="w-12 h-12 bg-copper/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-copper"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Conversion Rates
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Stage-to-stage conversion rates that expose friction points
                  and bottlenecks in your funnel.
                </p>
              </div>

              <div className="bg-ash p-6 rounded-lg border border-charcoal/10">
                <div className="w-12 h-12 bg-charcoal/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-charcoal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Executive-Ready
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Designed for decision-making, not just analysts. Clear,
                  scannable, actionable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Outcome */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              The Outcome
            </h2>
            <ul className="space-y-4">
              {[
                "Aligned marketing, sales, and finance around one source of truth",
                "Exposed hidden inefficiencies that were costing tens of thousands monthly",
                "Enabled confident budget decisions under pressure",
                "Replaced guesswork with insight—every dollar tracked to outcome",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-ember/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-ember"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-lg text-charcoal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want a dashboard like this for your business?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            I can build custom analytics frameworks that give you clarity on
            what&apos;s working and what&apos;s not—no more guesswork.
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

      {/* More Portfolio */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <h3 className="text-2xl font-bold text-charcoal mb-8 text-center">
            Explore More Work
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Sovereign Personas",
                desc: "Making complex markets legible",
                href: "/portfolio/sovereign-personas",
              },
              {
                title: "10-Touch Sales Play",
                desc: "Cold outreach to executive conversations",
                href: "/portfolio/10-touch-sales-play",
              },
              {
                title: "120-Day Content Journey",
                desc: "Engineering demand at scale",
                href: "/portfolio/120-day-content-journey",
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
