import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "120-Day Content Journey: Engineering Demand at Scale",
  description:
    "A content system designed to move buyers from awareness through purchase consideration—the framework we used at Cylance.",
};

export default function ContentJourneyPage() {
  return (
    <article className="pt-20">
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
                <li className="text-ember">120-Day Content Journey</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              120-Day Content Journey
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
              How we engineered demand at Cylance—a content system that moves
              buyers from awareness through purchase consideration.
            </p>
          </div>
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
                Content marketing at most companies is random acts of content.
                Blog posts when someone has time. Whitepapers because a
                competitor has one. Social posts that stop and start based on
                bandwidth.
              </p>
              <p>
                The result? Inconsistent engagement, wasted effort, and no clear
                line from content to revenue.
              </p>
              <blockquote className="border-l-4 border-ember pl-6 my-8 text-charcoal font-medium italic">
                &quot;Content isn&apos;t king. Consistent, strategic content
                that moves buyers through a journey is king.&quot;
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
            <p className="text-slate text-lg mb-8">
              The 120-Day Content Journey is a structured framework that maps
              content to the buyer&apos;s actual decision process:
            </p>

            {/* Journey Phases */}
            <div className="space-y-6">
              {[
                {
                  phase: "Days 1-30",
                  name: "Problem Awareness",
                  color: "bg-ember",
                  description:
                    "Content that helps buyers recognize and articulate their problem",
                  content: [
                    "Trend reports and industry analysis",
                    "Problem-focused blog posts",
                    "Social proof of problem severity",
                  ],
                },
                {
                  phase: "Days 31-60",
                  name: "Solution Education",
                  color: "bg-electric",
                  description:
                    "Content that educates on solution categories and approaches",
                  content: [
                    "Comparison guides",
                    "How-to content and frameworks",
                    "Expert interviews and webinars",
                  ],
                },
                {
                  phase: "Days 61-90",
                  name: "Vendor Evaluation",
                  color: "bg-copper",
                  description:
                    "Content that positions your solution and builds trust",
                  content: [
                    "Case studies with metrics",
                    "Product-focused content",
                    "ROI calculators and tools",
                  ],
                },
                {
                  phase: "Days 91-120",
                  name: "Decision Support",
                  color: "bg-charcoal",
                  description:
                    "Content that helps buyers build internal consensus",
                  content: [
                    "Business case templates",
                    "Implementation guides",
                    "Executive briefings",
                  ],
                },
              ].map((phase, index) => (
                <div
                  key={index}
                  className="bg-ash p-6 rounded-xl border border-charcoal/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                    <span className="font-mono text-sm text-slate">
                      {phase.phase}
                    </span>
                    <span className="text-xl font-bold text-charcoal">
                      {phase.name}
                    </span>
                  </div>
                  <p className="text-slate mb-4">{phase.description}</p>
                  <ul className="grid md:grid-cols-3 gap-2">
                    {phase.content.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-charcoal bg-charcoal/5 px-3 py-2 rounded"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { value: "$4M", label: "Quarterly Pipeline" },
                { value: "550%", label: "Pipeline Growth" },
                { value: "3.5x", label: "Content ROI" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl border border-charcoal/10"
                >
                  <div className="metric-value">{stat.value}</div>
                  <div className="metric-label mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-4">
              {[
                "Predictable content pipeline aligned with buyer journey",
                "Clear attribution from content to pipeline to revenue",
                "Scalable system that grew with the team",
                "Reduced time-to-value for new content initiatives",
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
            Ready to build your content engine?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Stop creating random acts of content. Let&apos;s build a system that
            turns content investment into pipeline.
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
