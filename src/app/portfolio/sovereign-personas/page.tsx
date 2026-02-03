import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sovereign Buyer Personas: Making Complex Markets Legible",
  description:
    "A framework for building buyer personas that actually drive targeting, messaging, and content decisions.",
};

export default function SovereignPersonasPage() {
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
                <li className="text-ember">Sovereign Personas</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Sovereign Buyer Personas
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
              Making complex markets legible—a framework for personas that
              actually drive targeting, messaging, and content decisions.
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
                Most buyer personas are useless. They&apos;re demographic
                profiles dressed up with stock photos and fictional names like
                &quot;Marketing Mary.&quot; They tell you someone is 35-45,
                lives in a suburb, and &quot;cares about ROI.&quot;
              </p>
              <p>
                That&apos;s not a persona—it&apos;s a horoscope. Vague enough to
                apply to anyone, specific enough to be useless.
              </p>
              <blockquote className="border-l-4 border-ember pl-6 my-8 text-charcoal font-medium italic">
                &quot;The goal isn&apos;t to describe who your buyers are.
                It&apos;s to understand what makes them buy.&quot;
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
              Sovereign personas are built around buying triggers, not
              demographics. They answer the questions that actually matter for
              marketing and sales:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "What triggers the buying journey?",
                  description:
                    "The specific events, pressures, or realizations that move someone from passive to active.",
                },
                {
                  title: "What are their active objections?",
                  description:
                    "Not just concerns—the specific reasons they'll use to say no or delay.",
                },
                {
                  title: "Who else influences the decision?",
                  description:
                    "The buying committee map: who has veto power, who controls budget, who evaluates.",
                },
                {
                  title: "What does success look like to them?",
                  description:
                    "Their personal and professional definition of a win—not your product's features.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-ash p-6 rounded-lg border border-charcoal/10"
                >
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {item.description}
                  </p>
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
            <ul className="space-y-4">
              {[
                "3x improvement in ad targeting efficiency",
                "Messaging that resonates with actual buying triggers",
                "Sales conversations that address real objections upfront",
                "Content strategy built around the journey, not the funnel",
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

      {/* Placeholder for Interactive */}
      <section className="section bg-electric/5">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-electric/10 text-electric text-sm font-semibold rounded-full mb-4">
              Coming Soon
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
              Interactive Persona Builder
            </h2>
            <p className="text-slate">
              An interactive tool to build your own sovereign personas is in
              development. For now, let&apos;s work together to create personas
              that drive results.
            </p>
            {/* TODO: Add interactive persona builder component */}
          </div>
        </div>
      </section>

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
    </article>
  );
}
