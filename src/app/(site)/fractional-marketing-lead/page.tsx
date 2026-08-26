import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PagefindBoundary from "@/components/search/PagefindBoundary";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { buildGraph, serviceId, ID } from "@/lib/schema";

const trail = [{ href: "/", label: "Home" }, { label: "Fractional Marketing Lead" }];

export const metadata: Metadata = {
  title: "Fractional Marketing Lead for B2B SaaS | Saren.ai",
  description:
    "Embedded senior marketing leadership, 10–20 hours/week, for Series A–C B2B SaaS and cybersecurity companies. Strategy, demand gen architecture, and AI operations — without the full-time executive cost. Also known as a fractional CMO engagement.",
  alternates: { canonical: "https://saren.ai/fractional-marketing-lead" },
  openGraph: {
    title: "Fractional Marketing Lead for B2B SaaS | Saren.ai",
    description:
      "Embedded senior marketing leadership, 10–20 hours/week, for Series A–C B2B SaaS and cybersecurity companies. Also known as a fractional CMO engagement.",
    url: "https://saren.ai/fractional-marketing-lead",
    images: ["/images/og/home.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional Marketing Lead for B2B SaaS | Saren.ai",
    description:
      "Embedded senior marketing leadership, 10–20 hours/week, for Series A–C B2B SaaS and cybersecurity companies.",
    images: ["/images/og/home.png"],
  },
};

const proofPoints = [
  { metric: "$4M", label: "Quarterly pipeline at Cylance", href: "/case-studies/120-day-content-journey" },
  { metric: "8:1", label: "ROI on $2.3M paid budget at BlackBerry", href: "/about" },
  { metric: "70%", label: "Google Ads CAC reduction at Qwiet AI", href: "/about/clients" },
  { metric: "344%", label: "Lead growth at Wethos AI", href: "/case-studies/10-touch-sales-play" },
];

const coverage = [
  {
    title: "GTM strategy & positioning",
    body: "Messaging, segmentation, and channel strategy grounded in how your buyers actually move — not borrowed playbooks.",
  },
  {
    title: "Demand generation architecture",
    body: "Funnel design, lead scoring, attribution, and intent data activation built as a system your team can run after I leave.",
  },
  {
    title: "AI-native marketing operations",
    body: "Multi-agent workflows for research, scoring, and outreach — machines handle the scale, humans keep the judgment calls.",
  },
  {
    title: "Team development & handoff",
    body: "I build the system, document it, and coach your in-house team or agency to operate it. The goal is independence, not dependence.",
  },
];

export default function FractionalMarketingLeadPage() {
  const graph = buildGraph({
    path: "/fractional-marketing-lead",
    pageType: "WebPage",
    name: "Fractional Marketing Lead for B2B SaaS | Saren.ai",
    description:
      "Embedded senior marketing leadership, 10–20 hours/week, for Series A–C B2B SaaS and cybersecurity companies.",
    dateModified: "2026-06-09T00:00:00Z",
    breadcrumb: trail,
    extra: [
      {
        "@type": "Service",
        "@id": serviceId("/fractional-marketing-lead"),
        name: "Fractional Marketing Lead",
        serviceType: ["Fractional Marketing Lead", "Marketing Leadership", "Demand Generation"],
        description:
          "Embedded senior marketing leadership, 10–20 hours/week, for Series A–C B2B SaaS and cybersecurity companies — GTM strategy, demand generation architecture, AI-native marketing operations, and team development.",
        provider: { "@id": ID.person },
        url: "https://saren.ai/fractional-marketing-lead",
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
        ],
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Series A–C B2B SaaS and cybersecurity companies (10–500 employees)",
        },
        offers: {
          "@type": "Offer",
          url: "https://saren.ai/fractional-marketing-lead/cost",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: 8000,
            maxPrice: 15000,
            unitText: "MONTH",
          },
        },
      },
    ],
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
        {/* Hero */}
        <section className="hero-card section gradient-dark text-ash">
          <div className="container-narrow">
            <p className="text-lavender font-mono text-sm uppercase tracking-wider mb-4">
              Services
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 max-w-3xl">
              Fractional marketing lead for B2B SaaS
            </h1>
            {/* Entity sentence — plain <p>: answer engines extract visible prose */}
            <p className="text-lg md:text-xl text-ash/80 leading-relaxed max-w-2xl mb-4">
              I&apos;m Saren Sakurai. I join Series A–C B2B SaaS and cybersecurity
              companies as their senior marketing leader for 10–20 hours a week —
              building the strategy, demand generation system, and AI operations a
              full-time hire would, at roughly a third of the cost.
            </p>
            <p className="text-lg text-ash/70 leading-relaxed max-w-2xl mb-8">
              Typical engagements run $8,000–$15,000 per month over 6–12 months.
              Full pricing detail is published on the{" "}
              <Link href="/fractional-marketing-lead/cost" className="text-lavender underline underline-offset-4">
                cost page
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/work" className="btn-primary">
                Work with me <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Link>
              <Link href="/fractional-marketing-lead/cost" className="btn-secondary-dark">
                See engagement pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="section bg-ash dark:bg-background">
          <div className="container-narrow">
            <p className="text-sm text-slate dark:text-foreground-muted font-mono uppercase tracking-wider mb-8">
              Documented results
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {proofPoints.map((point) => (
                <Link
                  key={point.metric}
                  href={point.href}
                  className="group block p-5 bg-card rounded-lg border border-border hover:border-ember/40 transition-colors"
                >
                  <div className="text-3xl font-bold font-mono text-ember mb-1">
                    {point.metric}
                  </div>
                  <div className="text-xs text-slate dark:text-foreground-muted leading-snug group-hover:text-ember transition-colors">
                    {point.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What the engagement covers */}
        <section className="section bg-white dark:bg-card">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              What a fractional marketing lead engagement covers
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl mb-10">
              The same scope a VP of Marketing or CMO would own — strategy through
              systems — structured for companies that don&apos;t need (or can&apos;t
              justify) the full-time executive yet.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverage.map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-ash dark:bg-background rounded-lg border border-border"
                >
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate dark:text-foreground-muted leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it runs */}
        <section className="section bg-ash dark:bg-background">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-10">
              How engagements run
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-lg border border-border">
                <div className="font-mono text-ember font-bold mb-2">Months 1–3</div>
                <h3 className="font-bold text-charcoal dark:text-foreground mb-2">Diagnose & build</h3>
                <p className="text-sm text-slate dark:text-foreground-muted leading-relaxed">
                  Audit the funnel, fix positioning, and stand up the first systems —
                  scoring, attribution, outbound architecture.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <div className="font-mono text-ember font-bold mb-2">Months 4–9</div>
                <h3 className="font-bold text-charcoal dark:text-foreground mb-2">Execute & scale</h3>
                <p className="text-sm text-slate dark:text-foreground-muted leading-relaxed">
                  Run the demand engine, expand the channels that work, and wire AI
                  operations into the workflows your team already uses.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <div className="font-mono text-ember font-bold mb-2">Months 10–12</div>
                <h3 className="font-bold text-charcoal dark:text-foreground mb-2">Hand off</h3>
                <p className="text-sm text-slate dark:text-foreground-muted leading-relaxed">
                  Document everything, coach the in-house team or agency, and step
                  back to advisory — or help hire the full-time leader.
                </p>
              </div>
            </div>
            <p className="text-slate dark:text-foreground-muted mt-8 max-w-2xl">
              Proof of the work itself lives in the{" "}
              <Link href="/case-studies" className="text-lavender underline underline-offset-4">
                case studies
              </Link>{" "}
              — pipeline programs, scoring models, and attribution systems built for
              enterprise B2B.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section gradient-dark text-ash">
          <div className="container-narrow text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sound like the right fit?
            </h2>
            <p className="text-ash/80 text-lg max-w-xl mx-auto mb-8">
              I keep 1–2 fractional slots open at a time. The fastest way to find
              out is a 30-minute call — no pitch, just a real conversation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/work" className="btn-primary">
                Work with me <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Link>
              <Link href="/fractional-marketing-lead/cost" className="btn-secondary-dark">
                See pricing first
              </Link>
            </div>
          </div>
        </section>
      </article>
    </PagefindBoundary>
  );
}
