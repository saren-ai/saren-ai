import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FAQ from "@/components/ui/FAQ";
import { FAQS } from "@/data/faqs";
import { TestimonialGrid } from "@/components/ui/Testimonial";
import { TESTIMONIALS } from "@/data/testimonials";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph } from "@/lib/schema";

const trail = [
  { href: "/", label: "Home" },
  { href: "/fractional-marketing-lead", label: "Fractional Marketing Lead" },
  { label: "Cost" },
];

export const metadata: Metadata = {
  title: "Fractional Marketing Lead Cost — Real 2026 Rates | Saren.ai",
  description:
    "Fractional marketing lead pricing in 2026: real rates ($8K–$15K/mo), engagement structures, and when you shouldn't hire one. What a fractional CMO costs, from a practitioner with 20+ years in B2B SaaS.",
  alternates: { canonical: "https://saren.ai/fractional-marketing-lead/cost" },
  openGraph: {
    title: "Fractional Marketing Lead Cost — Real 2026 Rates | Saren.ai",
    description:
      "Real rates ($8K–$15K/mo), engagement structures, and when you shouldn't hire one. What a fractional CMO costs, from a practitioner with 20+ years in B2B SaaS.",
    url: "https://saren.ai/fractional-marketing-lead/cost",
    images: ["/images/og/home.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional Marketing Lead Cost — Real 2026 Rates | Saren.ai",
    description:
      "Real rates ($8K–$15K/mo), engagement structures, and when you shouldn't hire one.",
    images: ["/images/og/home.png"],
  },
};

const tiers = [
  {
    name: "Fractional marketing lead",
    price: "$8,000–$15,000/month",
    hours: "10–20 hours/week",
    duration: "6–12 months (starts with a 3-month sprint)",
    bestFor: "Series A–C B2B SaaS without a full-time marketing leader",
    includes:
      "GTM strategy, demand gen architecture, AI operations, team coaching, and full system handoff",
  },
  {
    name: "Project engagement",
    price: "Scoped fixed fee",
    hours: "Defined by deliverable",
    duration: "4–12 weeks",
    bestFor: "Teams with one clear initiative — attribution dashboard, scoring model, GTM strategy for a launch",
    includes: "A defined deliverable, documented and handed off",
  },
  {
    name: "Advisory & positioning",
    price: "Custom",
    hours: "A few hours/month",
    duration: "Ongoing",
    bestFor: "SMEs, consultants, and founders who need strategic direction, not execution",
    includes: "Positioning, thought-leadership architecture, and hiring guidance",
  },
];

const wrongChoice = [
  {
    title: "You're pre-product-market fit",
    body: "Marketing leadership can't fix a product buyers don't want yet. Spend the money on customer conversations instead — you'll get more signal for a fraction of the cost.",
  },
  {
    title: "You need a body in the building",
    body: "If the role requires daily executive presence — board meetings, all-hands, constant founder access — hire full-time. Fractional works on systems and leverage, not hallway availability.",
  },
  {
    title: "You want execution hands, not leadership",
    body: "If the strategy is set and you just need campaigns shipped, an agency or contractor is cheaper. I build and fix systems; I'm expensive overkill as a pair of hands.",
  },
  {
    title: "You're looking for a one-off campaign or a quick audit",
    body: "Real diagnosis takes a quarter. Anything shorter produces a slide deck, and slide decks don't generate pipeline.",
  },
];

export default function FractionalMarketingLeadCostPage() {
  const graph = buildGraph({
    path: "/fractional-marketing-lead/cost",
    pageType: "WebPage",
    name: "Fractional Marketing Lead Cost — Real 2026 Rates | Saren.ai",
    description:
      "Fractional marketing lead pricing in 2026: real rates ($8K–$15K/mo), engagement structures, and when you shouldn't hire one.",
    dateModified: "2026-06-09T00:00:00Z",
    breadcrumb: trail,
    faq: FAQS.fractionalMarketingLeadCost,
  });

  return (
    <PagefindBoundary section="Services">
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>

      <article>
        {/* Answer-first hero */}
        <section className="section bg-ash dark:bg-background">
          <div className="container-narrow">
            <p className="text-lavender font-mono text-sm uppercase tracking-wider mb-4 pt-8">
              <Link href="/fractional-marketing-lead" className="hover:text-ember transition-colors">
                Fractional marketing lead
              </Link>{" "}
              / cost
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground leading-[1.15] mb-6 max-w-3xl">
              How much does a fractional marketing lead cost in 2026?
            </h1>
            {/* Answer-first paragraph — plain <p>, extractability is the point */}
            <p className="text-lg md:text-xl text-charcoal dark:text-foreground leading-relaxed max-w-3xl mb-4">
              Typical engagements run <strong>$8,000–$15,000 per month</strong> for
              10–20 hours per week, usually over 6–12 months. That&apos;s roughly
              one-third the fully-loaded cost of a full-time CMO ($350K–$450K+ with
              equity). Here&apos;s how I structure engagements and when fractional
              is the wrong choice.
            </p>
            <p className="text-slate dark:text-foreground-muted max-w-3xl">
              These are my actual rates, not industry averages. I publish them
              because pricing conversations go faster when nobody is guessing.
            </p>
          </div>
        </section>

        {/* Tiers */}
        <section className="section bg-white dark:bg-card">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-10">
              Engagement tiers
            </h2>
            <div className="space-y-8 mb-12">
              {tiers.map((tier) => (
                <div key={tier.name} className="p-6 md:p-8 bg-ash dark:bg-background rounded-lg border border-border">
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal dark:text-foreground mb-1">
                    {tier.name} — <span className="font-mono text-ember">{tier.price}</span>
                  </h3>
                  <p className="text-sm text-slate dark:text-foreground-muted mb-4 font-mono">
                    {tier.hours} · {tier.duration}
                  </p>
                  <p className="text-slate dark:text-foreground-muted leading-relaxed mb-2">
                    <strong className="text-charcoal dark:text-foreground">Best for:</strong> {tier.bestFor}
                  </p>
                  <p className="text-slate dark:text-foreground-muted leading-relaxed">
                    <strong className="text-charcoal dark:text-foreground">Includes:</strong> {tier.includes}
                  </p>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground mb-6">
              Cost comparison: fractional vs. the alternatives
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="py-3 pr-4 text-sm font-semibold text-charcoal dark:text-foreground">Option</th>
                    <th className="py-3 pr-4 text-sm font-semibold text-charcoal dark:text-foreground">Annual cost</th>
                    <th className="py-3 pr-4 text-sm font-semibold text-charcoal dark:text-foreground">What you get</th>
                    <th className="py-3 text-sm font-semibold text-charcoal dark:text-foreground">What you don&apos;t</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate dark:text-foreground-muted">
                  <tr className="border-b border-border">
                    <td className="py-4 pr-4 font-semibold text-charcoal dark:text-foreground">Fractional marketing lead</td>
                    <td className="py-4 pr-4 font-mono">$96K–$180K</td>
                    <td className="py-4 pr-4">Senior leadership, systems built to outlast the engagement, no equity or severance</td>
                    <td className="py-4">Daily physical presence; 40 hours a week</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 pr-4 font-semibold text-charcoal dark:text-foreground">Full-time CMO</td>
                    <td className="py-4 pr-4 font-mono">$350K–$450K+</td>
                    <td className="py-4 pr-4">Full-time executive attention, board presence, team ownership</td>
                    <td className="py-4">Hard to justify before ~$10M ARR; equity and severance risk if it doesn&apos;t work</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 pr-4 font-semibold text-charcoal dark:text-foreground">Marketing agency</td>
                    <td className="py-4 pr-4 font-mono">$60K–$240K</td>
                    <td className="py-4 pr-4">Execution capacity across channels</td>
                    <td className="py-4">Strategy and diagnosis — someone still has to tell them what to do</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate dark:text-foreground-muted max-w-3xl">
              The honest version: most companies at $1M–$10M ARR need the first row,
              pair it with focused contractors, and graduate to the second row when
              the team passes 8–10 marketers.
            </p>
          </div>
        </section>

        {/* When fractional is the wrong choice */}
        <section className="section bg-ash dark:bg-background">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              When fractional is the wrong choice
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl mb-10">
              A fractional engagement is a sharp tool for a specific situation. These
              are the cases where I&apos;ll tell you to spend your money elsewhere.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wrongChoice.map((item) => (
                <div key={item.title} className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-slate dark:text-foreground-muted leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — visible Q&A + FAQPage JSON-LD, built from the same src/data/faqs.ts array */}
        <FAQ
          title="Pricing questions"
          description="Direct answers about engagement cost and structure"
          items={FAQS.fractionalMarketingLeadCost}
        />

        {/* Testimonials — renders nothing until real quotes exist in src/data/testimonials.ts */}
        <TestimonialGrid items={TESTIMONIALS} />

        {/* Twin CTA */}
        <section className="section gradient-dark text-ash">
          <div className="container-narrow text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to talk specifics?
            </h2>
            <p className="text-ash/80 text-lg max-w-xl mx-auto mb-8">
              Tell me what&apos;s working and what isn&apos;t. I&apos;ll tell you
              honestly whether fractional is the right spend — and if it isn&apos;t,
              what is.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/work" className="btn-primary">
                Work with me <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Link>
              <Link href="/playbooks" className="btn-secondary-dark">
                Browse the free playbooks
              </Link>
            </div>
          </div>
        </section>
      </article>
    </PagefindBoundary>
  );
}
