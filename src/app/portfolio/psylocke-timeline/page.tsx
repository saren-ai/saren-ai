import type { Metadata } from "next";
import Link from "next/link";
import Timeline from "@/components/psylocke-timeline/Timeline";

export const metadata: Metadata = {
  title: "Psylocke Backstory Timeline — 30 Years of Body & Identity",
  description:
    "An interactive horizontal timeline tracing Psylocke's body-swap storyline across 27 key comic issues from Uncanny X-Men to Excalibur (1989–2019).",
  openGraph: {
    title: "Psylocke Backstory Timeline | Saren.ai",
    description:
      "Interactive visual timeline of Psylocke's key comic appearances from 1989 to 2019.",
  },
};

export default function PsylockeTimelinePage() {
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
                <li className="text-ember">Psylocke Timeline</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Psylocke Backstory Timeline
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
              30 years of body-swaps, psychic warfare, and identity
              reclamation — tracing Betsy Braddock and Kwannon across 27 key
              comic issues from 1989 to 2019.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="section bg-gradient-to-br from-charcoal/5 to-electric/5">
        <div className="container-narrow">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-ember/10 text-ember text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Interactive Timeline
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              The Complete Arc
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Click any comic cover to explore the issue details. The timeline
              reads left to right, from the most recent issue back to where the
              story began.
            </p>
          </div>

          <Timeline />
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Like what you see?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            This interactive timeline was built with Next.js, Framer Motion, and
            a love for long-form comic narratives. If you need someone who
            obsesses over details like this for your product — let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            Get in Touch
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

      {/* Explore More Work */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <h3 className="text-2xl font-bold text-charcoal mb-8 text-center">
            Explore More Work
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                href: "/portfolio/its-good-to-be-pitched",
                title: "It's Good to Be Pitched",
                desc: "AI-assisted storyboard for a 30-second TV spot",
              },
              {
                href: "/portfolio/roi-simulator",
                title: "Paid Media ROI Simulator",
                desc: "Interactive financial modeling for ad spend",
              },
              {
                href: "/portfolio/calculator",
                title: "SaaS Revenue Calculator",
                desc: "Reverse-engineer funnel metrics from revenue goals",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block p-6 bg-charcoal/5 rounded-lg hover:bg-electric/10 transition-colors group"
              >
                <h4 className="font-semibold text-charcoal group-hover:text-ember transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="text-slate text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
