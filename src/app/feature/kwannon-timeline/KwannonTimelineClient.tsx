"use client";

import dynamic from "next/dynamic";

const HeroTimeline = dynamic(
  () => import("@/components/feature/kwannon-timeline/HeroTimeline"),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-slate">Loading timeline...</div>
      </div>
    ),
  }
);

export default function KwannonTimelineClient() {
  return (
    <article>
      <section className="section">
        <div className="container-narrow">
          <p className="text-xs font-mono text-slate uppercase tracking-widest mb-4">
            Feature · Comics
          </p>
          <p className="text-foreground-muted text-lg leading-relaxed max-w-2xl">
            A fan-made timeline of Kwannon and Betsy Braddock — the most
            narratively tangled bodies in X-Men history. Built from the 1989
            Acts of Vengeance arc through the 2019 Excalibur restoration.
          </p>
        </div>
      </section>

      <HeroTimeline />

      <section className="section">
        <div className="container-narrow">
          <p className="text-xs text-foreground-muted font-mono text-center">
            Issues, dates, and plot summaries sourced from Marvel Fandom.
          </p>
        </div>
      </section>
    </article>
  );
}
