"use client";

import Link from "next/link";
import HeroBehavioralScoring from "@/components/behavioral-scoring/HeroBehavioralScoring";

export default function BehavioralLeadScoringPage() {
  return (
    <article>
      {/* Hero with Interactive Simulator */}
      <HeroBehavioralScoring />

      {/* Core Mental Model */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              The Feedback Loop
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                {
                  label: "Content creates motion",
                  description:
                    "Demand architecture generates buyer engagement opportunities",
                },
                {
                  label: "Behavior reveals intent",
                  description:
                    "Engagement patterns signal interest and readiness",
                },
                {
                  label: "Scoring measures momentum",
                  description:
                    "Quantifiable evidence of fit and engagement builds confidence",
                },
                {
                  label: "Humans decide when to act",
                  description:
                    "Systems inform judgment; people make the call",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card-bg border border-border rounded-xl p-6"
                >
                  <div className="text-3xl font-bold text-ember mb-2">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How This Connects to Content Journey */}
      <section className="section bg-ash dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Content-Behavior Connection
            </h2>
            <div className="prose prose-lg text-foreground-muted leading-relaxed">
              <p>
                This scoring system doesn't exist in isolation. It's the
                interpretation layer that sits downstream from your{" "}
                <Link
                  href="/portfolio/120-day-content-journey"
                  className="text-electric hover:underline"
                >
                  demand architecture
                </Link>
                .
              </p>
              <p>
                Content creates the opportunity for engagement. Behavior reveals
                buyer intent. Scoring quantifies that evidence. And humans
                decide when the evidence is sufficient to act.
              </p>
              <div className="bg-gradient-to-r from-electric/10 to-copper/10 dark:from-background dark:to-background border-l-4 border-electric rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Why This Matters
                </h3>
                <ul className="space-y-2 text-foreground-muted">
                  <li>
                    <strong>Sales trusts MQLs</strong> because scoring is
                    legible and evidence-based
                  </li>
                  <li>
                    <strong>Marketing understands impact</strong> because
                    content engagement directly influences readiness
                  </li>
                  <li>
                    <strong>Leadership sees the system</strong>, not just
                    individual tactics in isolation
                  </li>
                  <li>
                    <strong>Humans remain central</strong> to interpretation and
                    judgment where it matters most
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              System Architecture
            </h2>
            <div className="space-y-6">
              <div className="bg-card-bg border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Scoring Model
                </h3>
                <ul className="space-y-2 text-foreground-muted">
                  <li>• Total score range: 0–100</li>
                  <li>
                    • Fit score (0–50): Identity-based, mostly static once
                    captured
                  </li>
                  <li>
                    • Engagement score (0–50): Behavior-based, accumulates over
                    time
                  </li>
                  <li>• MQL threshold: 60 points (marketing ownership)</li>
                  <li>• SQL threshold: 75 points (sales review triggered)</li>
                </ul>
              </div>

              <div className="bg-card-bg border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Tools & Integration
                </h3>
                <p className="text-foreground-muted mb-4">
                  This system is typically implemented using:
                </p>
                <ul className="space-y-2 text-foreground-muted">
                  <li>• HubSpot (CRM, scoring engine, workflow automation)</li>
                  <li>
                    • Enrichment platforms (Apollo, ZoomInfo) for identity &
                    firmographics
                  </li>
                  <li>
                    • Automated lifecycle transitions with human review gates
                  </li>
                  <li>
                    • Sales alert system for threshold-crossing leads
                  </li>
                </ul>
              </div>

              <div className="bg-card-bg border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  What Makes This Work
                </h3>
                <p className="text-foreground-muted">
                  Simplicity is the result of deep understanding. This system
                  works because it:
                </p>
                <ul className="space-y-2 text-foreground-muted mt-3">
                  <li>• Separates identity (fit) from behavior (engagement)</li>
                  <li>
                    • Makes scoring criteria explicit and adjustable, not
                    black-box
                  </li>
                  <li>
                    • Preserves human judgment at the critical handoff to sales
                  </li>
                  <li>
                    • Creates feedback loops so marketing learns what sales
                    values
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to make buyer motion legible?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Let's design a behavioral scoring system that turns messy human
            behavior into clear, confident decisions—customized for your market,
            your buyers, and your sales team.
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
