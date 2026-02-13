"use client";

import FAQ from "@/components/ui/FAQ";
import Link from "next/link";
import { Mail, Phone, Video, Calendar, ArrowRight } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import HeroSalesPlay from "@/components/sales-play/HeroSalesPlay";

export default function SalesPlayPage() {
  return (
    <article>
      {/* New Hero with Interactive Calendar */}
      <HeroSalesPlay />

      {/* The Problem */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Problem with Cold Outreach
            </h2>
            <div className="prose prose-lg text-foreground-muted leading-relaxed">
              <p>
                Most SDR teams burn through TAM with generic "just bumping this"
                emails. The conversion rates exist, but they're built on volume,
                not strategy.
              </p>
              <p>
                When you're targeting executives at enterprise accounts, you
                can't afford to burn bridges. You need a sequence that earns the
                right to ask for time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="section bg-ash dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mail className="w-6 h-6 text-electric" />,
                  title: "Value First",
                  desc: "Every touch must provide value before asking for anything.",
                },
                {
                  icon: <Video className="w-6 h-6 text-ember" />,
                  title: "Multi-Channel",
                  desc: "Be where they are. Email, LinkedIn, Phone, Video.",
                },
                {
                  icon: <Calendar className="w-6 h-6 text-copper" />,
                  title: "Patience Pays",
                  desc: "25 days allows for trust-building, not just pestering.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-card-bg dark:bg-background border border-border p-6 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sample Email Structure
            </h2>
            <p className="text-foreground-muted mb-8">
              The "Day 13" email—a value-led touch that references recent news
              without being salesy.
            </p>
            <CodeBlock
              language="markdown"
              code={`Subject: {FirstName}, saw the news about {CompanyNews}

Hi {FirstName},

Saw the announcement regarding {CompanyNews}—congrats to the team.

Typically when companies in {Industry} make this move, the next challenge becomes {SpecificProblem}.

We recently helped {Competitor} solve this by {Solution}, which led to {Result}.

Thought this case study might be relevant as you navigate the next quarter:
[Link to Case Study]

No ask today, just thought this might be helpful context.

Best,
{MyName}`}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        items={[
          {
            question: "Why 25 days?",
            answer:
              "Executive attention is scarce. A 25-day sequence shows persistence without desperation. It gives them time to digest your content and recognize your name before you push for the meeting.",
          },
          {
            question: "Does this work for all industries?",
            answer:
              "It works best for complex B2B sales where the ACV justifies the effort. If you're selling a transactional $50/mo tool, this is overkill. If you're selling $50k+ outcomes, this is the baseline.",
          },
          {
            question: "How much personalization is required?",
            answer:
              "The 10-20-70 rule: 10% on the individual (LinkedIn bio), 20% on the company (news, 10-K), 70% on the persona pain points. You don't need to write a novel, just show you've done your homework.",
          },
        ]}
      />

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to upgrade your outreach?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Stop spamming and start selling. building a sequence that respects
            your prospect's intelligence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric/90 text-white rounded-lg font-semibold transition-colors"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
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
