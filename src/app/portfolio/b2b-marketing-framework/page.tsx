import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import FrameworkExplorer from "@/components/framework/FrameworkExplorer";
import CaseStudyHero from "@/components/case-studies/CaseStudyHero";
import ConsultingCTA from "@/components/case-studies/ConsultingCTA";
import RelatedWork from "@/components/case-studies/RelatedWork";

export const metadata: Metadata = {
  title: "B2B Marketing Framework: 23-Step Buyer Journey System",
  description:
    "A step-by-step prompt system that produces the core messaging documents your B2B SaaS needs before scaling campaigns. 23 prompts across the entire buyer journey.",
  alternates: { canonical: "https://saren.ai/portfolio/b2b-marketing-framework" },
  openGraph: {
    title: "B2B Marketing Framework | Saren.ai",
    description:
      "23-step prompt matrix for building B2B SaaS messaging infrastructure from scratch.",
    images: ["/portfolio/marketing-framework-og.png"],
  },
};

export default function MarketingFrameworkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/portfolio/b2b-marketing-framework/#webpage",
            "url": "https://saren.ai/portfolio/b2b-marketing-framework",
            "name": "B2B Marketing Framework: 23-Step Buyer Journey System",
            "description": "A step-by-step prompt system that produces the core messaging documents your B2B SaaS needs before scaling campaigns. 23 prompts across the entire buyer journey.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saren.ai/portfolio" },
              { "@type": "ListItem", "position": 3, "name": "B2B Marketing Framework", "item": "https://saren.ai/portfolio/b2b-marketing-framework" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": "https://saren.ai/portfolio/b2b-marketing-framework/#work",
            "name": "B2B Marketing Framework: 23-Step Buyer Journey System",
            "description": "A step-by-step prompt system that produces the core messaging documents your B2B SaaS needs before scaling campaigns. 23 prompts across the entire buyer journey.",
            "url": "https://saren.ai/portfolio/b2b-marketing-framework",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["B2B SaaS go-to-market strategy", "Messaging frameworks", "Prompt engineering for marketing"],
            "keywords": "B2B marketing framework, buyer journey, go-to-market strategy, messaging, prompt engineering, SaaS",
            "educationalUse": "Professional development",
            "teaches": "B2B SaaS go-to-market strategy",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-03",
            "dateModified": "2026-03-27"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "@id": "https://saren.ai/portfolio/b2b-marketing-framework/#howto",
            "name": "How to Use the B2B Marketing Framework",
            "description": "A 5-step process for building B2B SaaS messaging infrastructure using a structured prompt system.",
            "author": { "@id": "https://saren.ai/#person" },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Gather raw inputs",
                "text": "Customer call recordings, win/loss notes, competitive research, team interviews. Don't start with a blank page."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Run prompts with real constraints",
                "text": "Answer the questions honestly. Generic inputs produce generic outputs. The framework is only as good as your constraints."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Synthesize into a messaging system",
                "text": "Don't let these become a doc graveyard. Build a single source of truth that lives in Notion, Confluence, or a Google Doc."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Activate across channels",
                "text": "Deploy to website, pitch decks, sales enablement, ad campaigns. The system should show up everywhere your company speaks."
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Measure and iterate",
                "text": "Use the performance framework and review protocol to keep it fresh without starting over every quarter."
              }
            ]
          })
        }}
      />
    <article>
      {/* Hero */}
      <CaseStudyHero
        title="B2B Marketing Framework"
        subtitle="The messaging infrastructure for teams who can't afford to build on quicksand. A 7-layer framework that creates B2B SaaS positioning from scratch."
        role="Strategy & Messaging"
        date="2026"
        tags={["Messaging", "Positioning", "Framework"]}
        actions={[
          { label: "Start Framework", href: "/portfolio/b2b-marketing-framework/target-market-competitive-landscape", variant: "primary" },
          { label: "How to Use", href: "#how-to-use", variant: "secondary" }
        ]}
        metrics={[
          { value: "23", label: "Prompts", context: "Full buyer journey" },
          { value: "7", label: "Layers", context: "From raw data to channel" },
          { value: "1", label: "System", context: "Unified messaging source" },
        ]}
      />

      {/* Hero Explorer */}
      <FrameworkExplorer />

      {/* How to Use */}
      <section id="how-to-use" className="section bg-ash dark:bg-background-secondary pt-0 md:pt-16 mt-20 md:mt-0">
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
                  title: "Measure and iterate",
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
            answer: "Plan 60–90 minutes per prompt if you're doing it seriously. That's 30+ hours total if you do all 23 prompts. But you don't have to do them all at once—most teams do 2-3 per week. The speed comes from structure, not shortcuts."
          },
          {
            question: "Can I skip layers and jump straight to messaging?",
            answer: "You can, but you'll usually get generic outputs. Foundation and Differentiation create the raw truth that makes Decision assets specific and effective. Skip them and you'll sound like everyone else."
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
            answer: "Treat it like an operating system, not a one-time project. Activate it in your website, pitch deck, sales enablement. Make it the source of truth for how your company communicates. Then use the Review & Iteration prompts to keep it fresh."
          }
        ]}
      />

      {/* CTA */}
      <ConsultingCTA />

      {/* Related Work */}
      <RelatedWork currentHref="/portfolio/b2b-marketing-framework" />
    </article>
    </>
  );
}
