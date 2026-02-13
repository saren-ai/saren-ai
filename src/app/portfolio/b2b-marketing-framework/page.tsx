
import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/ui/FAQ";
import { ExternalLink } from "lucide-react";
import HeroBentoDashboard from "@/components/framework/HeroBentoDashboard";

export const metadata: Metadata = {
  title: "B2B Marketing Framework: 7-Layer Prompt System",
  description:
    "A step-by-step prompt system that produces the core messaging documents your B2B SaaS needs before scaling campaigns. 21 prompts across 7 layers.",
  openGraph: {
    title: "B2B Marketing Framework | Saren.ai",
    description:
      "7-layer prompt matrix for building B2B SaaS messaging infrastructure from scratch.",
    images: ["/portfolio/marketing-framework-og.png"],
  },
};

export default function MarketingFrameworkPage() {
  return (
    <article>
      {/* Hero Dashboard & Grid */}
      <HeroBentoDashboard />

      {/* How to Use */}
      <section className="section bg-ash dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How to Use This Framework
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Gather raw inputs",
                  description: "Customer call recordings, win/loss notes, competitive research, team interviews. Don't start with a blank page."
                },
                {
                  step: "2",
                  title: "Run prompts with real constraints",
                  description: "Answer the questions honestly. Generic inputs produce generic outputs. The framework is only as good as your constraints."
                },
                {
                  step: "3",
                  title: "Synthesize into a messaging system",
                  description: "Don't let these become a doc graveyard. Build a single source of truth that lives in Notion, Confluence, or a Google Doc."
                },
                {
                  step: "4",
                  title: "Activate across channels",
                  description: "Deploy to website, pitch decks, sales enablement, ad campaigns. The system should show up everywhere your company speaks."
                },
                {
                  step: "5",
                  title: "Measure and iterate (L7)",
                  description: "Use the performance framework and review protocol to keep it fresh without starting over every quarter."
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-electric/10 rounded-lg flex items-center justify-center">
                      <span className="text-electric font-bold text-xl">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-foreground-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={[
          {
            question: "What is this framework, in plain English?",
            answer: "It's a step-by-step system of prompts that produces the core documents your B2B marketing needs before you scale campaigns. Think positioning statements, message maps, brand voice guidelines, enablement materials—the stuff that prevents brand chaos when you start hiring."
          },
          {
            question: "Who is this for?",
            answer: "Founders without a CMO who need marketing infrastructure. Early marketing hires starting from zero. Consultants building GTM foundations for clients. Anyone tired of random acts of content that don't compound."
          },
          {
            question: "How long does it take to complete?",
            answer: "Plan 60–90 minutes per prompt if you're doing it seriously. That's 21–32 hours total if you do all 21 prompts. But you don't have to do them all at once—most teams do 2-3 per week. The speed comes from structure, not shortcuts."
          },
          {
            question: "Can I skip layers and jump straight to messaging?",
            answer: "You can, but you'll usually get generic outputs. L1–L3 (foundations, identity, positioning) create the raw truth that makes L4 (messaging) specific and differentiated. Skip them and you'll sound like everyone else."
          },
          {
            question: "What do I actually get at the end?",
            answer: "A usable messaging platform: positioning statements, core messaging pillars, message map, elevator pitch, boilerplate copy, brand guidelines, enablement materials, and a measurement/iteration loop. Everything you need before scaling campaigns or hiring a team."
          },
          {
            question: "Do I need a specific AI tool to use this?",
            answer: "No—any LLM works (Claude, ChatGPT, Gemini, etc.). The quality depends on your inputs, constraints, and willingness to be specific. The prompts are designed to pull out what makes your company different, but you have to show up with the raw material."
          },
          {
            question: "How do I keep this from becoming a doc graveyard?",
            answer: "Treat it like an operating system, not a one-time project. Activate it in your website, pitch deck, sales enablement. Make it the source of truth for how your company communicates. Then use L7 (measurement & iteration) to keep it fresh without starting over every quarter."
          }
        ]}
      />

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build your messaging foundation?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Stop winging it with random campaigns. Start with structure that compounds.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/saren-ai/b2b-marketing-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric/90 text-white rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Get the Framework
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ash/10 hover:bg-ash/20 text-ash border-2 border-ash/30 rounded-lg font-semibold transition-colors"
            >
              Hire me to build it for you
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
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
