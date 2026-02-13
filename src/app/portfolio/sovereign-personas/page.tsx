"use client";

import HeroPersonas from "@/components/sovereign-personas/HeroPersonas";
import FAQ from "@/components/ui/FAQ";
import { useCases } from "@/lib/sovereign-personas";
import Link from "next/link";

export default function SovereignPersonasPage() {
  return (
    <article>
      {/* Hero with Interactive Gallery */}
      <HeroPersonas />

      {/* The Sovereign Buying System */}
      <section className="section bg-ash dark:bg-background pt-0 md:pt-16">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Sovereign Buying System
            </h2>
            <div className="prose prose-lg text-foreground-muted leading-relaxed mb-8">
              <p>
                Sovereign infrastructure deals aren&apos;t enterprise IT
                purchases. Decisions are justified publicly, timelines stretch
                7–16 months, and buying committees navigate political risk
                alongside technical requirements.
              </p>
              <p>
                Generic personas (&quot;CIO/CTO&quot;) collapse under this
                complexity. You need personas built around power dynamics,
                career risk, and the language altitude required at each level.
              </p>
            </div>

            {/* Key Dimensions */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-card-bg dark:bg-background-secondary rounded-lg border border-border">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  The Minister
                </h3>
                <p className="text-sm text-foreground-muted">
                  Strategic and geopolitical—not technical-first. Messaging
                  focuses on legacy, sovereignty, and national outcomes.
                </p>
              </div>

              <div className="p-6 bg-card-bg dark:bg-background-secondary rounded-lg border border-border">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  The Architect
                </h3>
                <p className="text-sm text-foreground-muted">
                  Credibility earned through frameworks, peer references, and
                  clear trade-offs. No hype, just implementation realism.
                </p>
              </div>

              <div className="p-6 bg-card-bg dark:bg-background-secondary rounded-lg border border-border">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  The Operator
                </h3>
                <p className="text-sm text-foreground-muted">
                  Value demonstrated through ROI and live workloads. Connect
                  sovereignty to operational excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How These Personas Get Used */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How These Personas Get Used
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              Strategic personas aren&apos;t decorative—they&apos;re operational
              tools that drive messaging, content, sales, and deal orchestration.
            </p>

            <div className="grid gap-6">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-card-bg dark:bg-background-secondary rounded-lg border border-border"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-ember/10 rounded-full flex items-center justify-center">
                    <span className="text-ember font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-foreground-muted">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Substack Blog Post CTA */}
      <section className="section bg-gradient-to-br from-copper/10 to-ember/10 border-y-2 border-copper/30">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-copper/20 text-copper rounded-full text-sm font-semibold mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  How to Build This
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Build Your Own Personas with Notebook LLM
                </h2>
                <p className="text-foreground-muted text-lg mb-6">
                  Learn how to set up a Notebook LLM project to create strategic buyer personas like these. Step-by-step guide with prompts, frameworks, and real examples.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Complete setup walkthrough for Notebook LLM",
                    "Persona research prompts and interview frameworks",
                    "How to structure mandate, risks, and trust signals",
                    "Real examples from sovereign infrastructure deals",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <span className="flex-shrink-0 w-5 h-5 bg-copper/20 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-copper" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://sarenai.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ember to-copper hover:from-ember/90 hover:to-copper/90 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Read on Substack
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <p className="text-center text-sm text-foreground-muted mt-3">
                  Free guide + templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Frequently Asked Questions"
        items={[
          {
            question: "Why do sovereign infrastructure deals need different personas than enterprise IT?",
            answer: "Sovereign deals involve public justification, geopolitical scrutiny, and 7–16 month approval journeys across buying committees. Generic 'CIO/CTO' personas collapse under this complexity—you need personas built around power dynamics, career risk, and the language altitude required at each level (policy/architecture/operations)."
          },
          {
            question: "How are these personas actually used in practice?",
            answer: "These personas drive five key workstreams: (1) Messaging architecture tailored by altitude, (2) Content strategy matched to trust signals, (3) Sales enablement for committee navigation, (4) Executive briefings addressing persona-specific concerns, and (5) Long-cycle deal orchestration mapping the 7–16 month approval journey."
          },
          {
            question: "What makes the Minister persona different from typical 'executive buyer' personas?",
            answer: "The Minister cares about legacy outcomes—AI competitiveness, sovereignty, GDP impact—not speeds and feeds. They face political fallout, geopolitical scrutiny, and public accountability. Messaging must be strategic and geopolitical, never technical-first. They trust policy briefs, peer nation examples, and top-tier validation—and dismiss vendor bravado."
          },
          {
            question: "Why is the Architect persona described as the 'quiet scapegoat'?",
            answer: "The Architect translates political ambition into executable architecture but bears technical risk if the recommendation fails. They're caught between political pressure and technical reality. They trust evaluation frameworks, peer references, and implementation realism—and dismiss hype. Winning requires acknowledging complexity, not oversimplifying it."
          },
          {
            question: "How do you sell to the Sovereign Cloud Chief when they're competing with hyperscalers?",
            answer: "The Operator owns P&L, GPU utilization, and customer satisfaction. They need ROI in 12–18 months, live workload proof, and low-disruption migration plans. Messaging must connect sovereignty to operational excellence and competitive advantage. Sovereignty talk without operational proof gets dismissed immediately."
          },
          {
            question: "Can I use this persona framework for non-sovereign infrastructure deals?",
            answer: "The framework—building personas around mandate, risk, trust signals, and language altitude—applies to any complex B2B buying committee. The specific sovereign context (geopolitical risk, public justification, national outcomes) is unique, but the methodology works for enterprise infrastructure, defense, healthcare systems, or any multi-stakeholder deal."
          },
          {
            question: "Do you build these personas for clients, or teach teams to build them?",
            answer: "Both. For fractional engagements, I typically build the initial persona set through stakeholder interviews and deal forensics, then train the team to maintain and evolve them. The goal is to leave you with both the artifacts and the capability to update personas as your market evolves."
          }
        ]}
      />

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build personas that work?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Stop guessing at who your buyers are. Let&apos;s build a persona
            framework that drives real marketing and sales results.
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
      <section className="section bg-ash dark:bg-background-secondary">
        <div className="container-narrow">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Explore More Work
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Paid Media ROI Simulator",
                desc: "Forecasting outcomes before you spend",
                href: "/portfolio/roi-simulator",
              },
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
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block p-6 bg-card-bg border border-border rounded-lg hover:bg-electric/10 transition-colors group"
              >
                <h4 className="font-semibold text-foreground group-hover:text-ember transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="text-foreground-muted text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
