"use client";

import { useState } from "react";
import Link from "next/link";
import { BehaviorJourneyTimeline } from "@/components/behavioral-scoring/BehaviorJourneyTimeline";
import { EngagementSimulator } from "@/components/behavioral-scoring/EngagementSimulator";
import { FitScoreBreakdown } from "@/components/behavioral-scoring/FitScoreBreakdown";
import { ScoreVisualizer } from "@/components/behavioral-scoring/ScoreVisualizer";
import {
  computeScoring,
  type BuyerProfile,
} from "@/lib/behavioral-scoring";
import { RotateCcw, Activity } from "lucide-react";

export default function BehavioralLeadScoringPage() {
  const [profile, setProfile] = useState<BuyerProfile>({
    companySize: "201-1000",
    industry: "SaaS / Technology",
    role: "Director",
    geography: "North America",
    engagementHistory: [],
  });

  const scoring = computeScoring(profile);

  const handleProfileChange = (updates: Partial<BuyerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const handleActionTrigger = (actionId: string) => {
    setProfile((prev) => ({
      ...prev,
      engagementHistory: [
        ...prev.engagementHistory,
        { actionId, timestamp: Date.now() },
      ],
    }));
  };

  const handleReset = () => {
    setProfile({
      companySize: "201-1000",
      industry: "SaaS / Technology",
      role: "Director",
      geography: "North America",
      engagementHistory: [],
    });
  };

  // Count action occurrences
  const actionCounts = profile.engagementHistory.reduce(
    (acc, entry) => {
      acc[entry.actionId] = (acc[entry.actionId] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

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
                <li className="text-ember">Behavioral Lead Scoring</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Behavioral Lead Scoring System
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed mb-4">
              Making buyer motion legible across the journey
            </p>
            <p className="text-lg text-ash/70 leading-relaxed">
              Complex behavior-driven systems should be intuitive enough for
              humans to act on with confidence. This page demonstrates how
              behavioral scoring connects buyer behavior, content engagement,
              lifecycle progression, and sales readiness into a single,
              explainable system.
            </p>
          </div>
        </div>
      </section>

      {/* Core Mental Model */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-8 text-center">
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
                  className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-6"
                >
                  <div className="text-3xl font-bold text-ember mb-2">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-slate dark:text-foreground-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="section bg-charcoal/5 dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-6 h-6 text-ember" />
                  <h2 className="text-3xl font-bold text-charcoal dark:text-foreground">
                    Interactive Scoring Simulator
                  </h2>
                </div>
                <p className="text-slate dark:text-foreground-muted">
                  Adjust fit factors and trigger engagement actions to see how
                  the scoring system responds
                </p>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border border-charcoal/20 dark:border-ember/20 rounded-lg text-sm font-medium text-charcoal dark:text-foreground hover:bg-white dark:hover:bg-card-bg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Score Visualizer */}
            <div className="mb-8">
              <ScoreVisualizer scoring={scoring} />
            </div>

            {/* Journey Timeline */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-charcoal dark:text-foreground mb-6">
                Buyer Journey Progression
              </h3>
              <BehaviorJourneyTimeline
                currentState={scoring.buyerState}
                totalScore={scoring.totalScore}
              />
            </div>

            {/* Two Column Layout for Fit and Engagement */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Fit Score Breakdown */}
              <div>
                <FitScoreBreakdown
                  profile={profile}
                  fitScore={scoring.fitScore}
                  fitBreakdown={scoring.fitBreakdown}
                  onProfileChange={handleProfileChange}
                />
              </div>

              {/* Engagement Simulator */}
              <div>
                <EngagementSimulator
                  onActionTrigger={handleActionTrigger}
                  actionCounts={actionCounts}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How This Connects to Content Journey */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-6">
              The Content-Behavior Connection
            </h2>
            <div className="prose prose-lg text-slate dark:text-foreground-muted leading-relaxed">
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
              <div className="bg-gradient-to-r from-electric/10 to-copper/10 dark:from-background-secondary dark:to-background-secondary border-l-4 border-electric rounded-r-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-3">
                  Why This Matters
                </h3>
                <ul className="space-y-2 text-charcoal dark:text-foreground-muted">
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
      <section className="section bg-charcoal/5 dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-6">
              System Architecture
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-3">
                  Scoring Model
                </h3>
                <ul className="space-y-2 text-slate dark:text-foreground-muted">
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

              <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-3">
                  Tools & Integration
                </h3>
                <p className="text-slate dark:text-foreground-muted mb-4">
                  This system is typically implemented using:
                </p>
                <ul className="space-y-2 text-slate dark:text-foreground-muted">
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

              <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-charcoal dark:text-foreground mb-3">
                  What Makes This Work
                </h3>
                <p className="text-slate dark:text-foreground-muted">
                  Simplicity is the result of deep understanding. This system
                  works because it:
                </p>
                <ul className="space-y-2 text-slate dark:text-foreground-muted mt-3">
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
