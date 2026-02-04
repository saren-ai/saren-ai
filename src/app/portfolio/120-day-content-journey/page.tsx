import type { Metadata } from "next";
import Link from "next/link";
import JourneyMatrix from "@/components/content-journey/JourneyMatrix";
import { enterpriseMatrix } from "@/lib/content-journey";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "120-Day Content Journey: Engineering Demand at Scale",
  description:
    "A buyer-led content system that moves enterprise deals from panic to purchase—without spraying content. Interactive demand architecture map.",
  openGraph: {
    title: "120-Day Content Journey | Saren.ai",
    description:
      "An interactive buyer journey matrix showing how content reduces friction across the buying cycle.",
    images: ["/portfolio/content-journey-og.png"],
  },
};

export default function ContentJourneyPage() {
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
                <li className="text-ember">120-Day Content Journey</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The 120-Day Content Journey
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
              A buyer-led content system that moves enterprise deals from panic to purchase—without spraying content.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Matrix */}
      <section className="section bg-gradient-to-br from-charcoal/5 to-electric/5">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-ember/10 text-ember text-sm font-semibold rounded-full mb-4">
              Interactive Demand Architecture Map
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore the Matrix
            </h2>
            <p className="text-foreground-muted text-lg max-w-3xl mx-auto mb-6">
              This isn't a content calendar—it's a go-to-market operating system that aligns content, sales, and scoring to how buyers actually move from anxiety to confidence.
            </p>
            
            {/* How to Read This */}
            <div className="bg-card-bg border border-border rounded-lg p-6 max-w-3xl mx-auto text-left mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">How to Read This Matrix</h3>
              <ul className="space-y-2 text-foreground-muted">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-electric/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-electric text-xs">1</span>
                  </span>
                  <span>Each <strong className="text-foreground">column</strong> is a buyer stage—from problem identification through renewal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-electric/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-electric text-xs">2</span>
                  </span>
                  <span>Each <strong className="text-foreground">row</strong> is a planning layer (tasks, personas, KPIs, content, scoring, emotional state)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-electric/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-electric text-xs">3</span>
                  </span>
                  <span><strong className="text-foreground">Hover</strong> for quick definitions • <strong className="text-foreground">Click</strong> for deep consulting insights</span>
                </li>
              </ul>
            </div>
          </div>

          <JourneyMatrix data={enterpriseMatrix} />
        </div>
      </section>

      {/* Notion Template CTA */}
      <section className="section bg-gradient-to-br from-copper/10 to-ember/10 border-y-2 border-copper/30">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-copper/20 text-copper rounded-full text-sm font-semibold mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Template Available
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Get the Notion Template
                </h2>
                <p className="text-foreground-muted text-lg mb-6">
                  Use this exact matrix to plan your own content journey. Fully editable Notion template with all 10 stages, 12 planning layers, and built-in scoring framework.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Pre-filled with best-practice content strategies",
                    "Customizable for your buyer journey",
                    "Includes scoring methodology and KPI frameworks",
                    "Instant access + lifetime updates",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <span className="flex-shrink-0 w-5 h-5 bg-copper/20 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex-shrink-0">
                <a
                  href="https://saren.notion.site/120-Day-Content-Journey-Template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-copper hover:bg-copper/90 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Get Template
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="text-xs text-foreground-muted text-center mt-3">
                  Instant access • No signup required
                </p>
              </div>
            </div>
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

      {/* FAQ */}
      <FAQ
        items={[
          {
            question: "Why 120 days? Is that a hard requirement?",
            answer: "The 120-day timeframe comes from observing typical enterprise B2B buying cycles. Most complex sales take 90-150 days from first touch to close. The framework is flexible—you can compress it for SMB (60-90 days) or extend it for large enterprise (180+ days). The key is mapping content to buyer stages, not calendar days."
          },
          {
            question: "How is this different from a content calendar?",
            answer: "A content calendar tells you when to publish. This framework tells you what to publish, for whom, and why. It's a go-to-market operating system that aligns content, sales enablement, and lead scoring to how buyers actually progress. Think of it as the strategy layer that sits above your content calendar."
          },
          {
            question: "Can this work for product-led growth (PLG) companies?",
            answer: "Yes, but the stages shift. Instead of 'Sales Meetings,' you'd have 'Trial Activation' and 'Upgrade Consideration.' The principle remains: map content to the buyer's actual journey, score behavior based on intent, and create content that reduces emotional friction. I've adapted this framework for PLG companies at both early stage (Cylance) and growth stage."
          },
          {
            question: "What's the difference between 'User Thoughts' and 'User Feelings' rows?",
            answer: "User Thoughts are cognitive (what they're trying to figure out). User Feelings are emotional (how they feel about the decision). Great content addresses both. For example, at the 'Shortlist' stage, a buyer is thinking 'Which vendor is best?' (cognitive) but feeling 'pressured' and 'analytical' (emotional). Your content needs to provide comparison data (cognitive) while reducing decision anxiety (emotional)."
          },
          {
            question: "How do I implement the content scoring system?",
            answer: "Content scoring translates behavior into intent signals. Start simple: assign point values to actions based on buying stage. Early-stage actions (blog reads) = low points. Late-stage actions (pricing page views, business case downloads) = high points. Feed these scores into your MAP or CRM. Most companies start with 4 categories: Passive, Active, Commercial, Sales-Ready. The Notion template includes a starter scoring framework."
          },
          {
            question: "Did you really generate $4M in pipeline with this at Cylance?",
            answer: "Yes. That was quarterly pipeline generated from content-influenced deals during my engagement. The key was ruthless focus: we killed 60% of existing content programs and doubled down on what actually moved buyers through stages. We also instrumented everything—every click, download, and revisit was scored and routed. The framework works, but execution matters more than theory."
          }
        ]}
      />

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
