import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Sparkles } from "lucide-react";

const TITLE = "AI for Liberal Arts Majors | Saren.ai";
const DESCRIPTION =
  "A series of creative, constraint-based Claude Skills for humanities thinkers — writers, artists, and critics who want to use AI on their own terms, not the engineer's.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://saren.ai/studio/ai-for-liberal-arts" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://saren.ai/studio/ai-for-liberal-arts",
    siteName: "Saren.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

interface SeriesEntry {
  title: string;
  status: "live" | "coming";
  description: string;
  href?: string;
  tag: string;
}

const entries: SeriesEntry[] = [
  {
    title: "Oblique Techniques",
    status: "live",
    tag: "Claude Skills",
    description:
      "Prompt Against the Machine. A collection of constraint-based stratagems — cut-up, n+7, exquisite corpse — drawn from Surrealism, Oulipo, and Fluxus. For people who think the default output is the problem, not the solution.",
    href: "/studio/oblique-techniques",
  },
  {
    title: "More coming",
    status: "coming",
    tag: "In the studio",
    description:
      "The series grows. Each installment turns a humanities tradition into something you can actually run — and bend.",
  },
];

export default function AiForLiberalArtsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/studio/ai-for-liberal-arts/#webpage",
            url: "https://saren.ai/studio/ai-for-liberal-arts",
            name: TITLE,
            description: DESCRIPTION,
            isPartOf: { "@id": "https://saren.ai/#website" },
            about: { "@id": "https://saren.ai/#person" },
            author: { "@id": "https://saren.ai/#person" },
            inLanguage: "en-US",
            dateModified: "2026-06-17T00:00:00Z",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://saren.ai" },
              { "@type": "ListItem", position: 2, name: "Studio", item: "https://saren.ai/studio" },
              {
                "@type": "ListItem",
                position: 3,
                name: "AI for Liberal Arts Majors",
                item: "https://saren.ai/studio/ai-for-liberal-arts",
              },
            ],
          }),
        }}
      />

      <section className="section">
        <div className="container-narrow">
          <header className="mb-12 max-w-2xl">
            <p className="text-xs font-mono text-ember uppercase tracking-widest mb-3">
              A Saren.ai Series
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight">
              AI for Liberal Arts Majors
            </h1>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Most AI advice is written for engineers and growth marketers. This
              series is for everyone else — the writers, artists, critics, and
              close readers who were told the machine wasn&apos;t built for
              them. It was. You just have to use it sideways.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="card p-6">
              <h2 className="text-base font-bold text-foreground mb-2">
                Constraint over output
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
                The default answer is the average of everything ever written.
                These skills hand the model a rule it wasn&apos;t built for.
              </p>
            </div>
            <div className="card p-6">
              <h2 className="text-base font-bold text-foreground mb-2">
                Traditions, not tricks
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Surrealism, Oulipo, Fluxus, fable, rhetoric — a century of
                humanities practice, turned into things you can run.
              </p>
            </div>
            <div className="card p-6">
              <h2 className="text-base font-bold text-foreground mb-2">
                You make the meaning
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
                The model runs the machine. You&apos;re still the one deciding
                what&apos;s worth keeping.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-gold" />
            <h2 className="text-2xl font-bold text-foreground">
              In the series
            </h2>
          </div>

          <div className="space-y-4">
            {entries.map((entry) => {
              const inner = (
                <div
                  className={`card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 h-full ${
                    entry.status === "coming" ? "opacity-60" : "group"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate">
                        {entry.tag}
                      </span>
                      {entry.status === "coming" && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate border border-border rounded-full px-2 py-0.5">
                          Soon
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-2xl font-bold text-foreground mb-2 ${
                        entry.status === "live"
                          ? "group-hover:text-ember transition-colors"
                          : ""
                      }`}
                    >
                      {entry.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                  {entry.status === "live" && (
                    <span className="shrink-0 text-ember font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              );

              return entry.href ? (
                <Link key={entry.title} href={entry.href} className="block">
                  {inner}
                </Link>
              ) : (
                <div key={entry.title}>{inner}</div>
              );
            })}
          </div>

          <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Skills for Liberal Arts Majors
              </h2>
              <p className="text-foreground-muted text-sm">
                Open-source, MIT-licensed, and built in the open.
              </p>
            </div>
            <Link
              href="https://github.com/saren-ai/oblique-techniques"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 text-sm py-3"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
