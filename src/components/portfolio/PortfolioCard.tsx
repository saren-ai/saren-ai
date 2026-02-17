"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PortfolioCardProps {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  href: string;
  index: number;
  pillars: string[];
  variant?: "interactive" | "case_study";
}

export default function PortfolioCard({
  title,
  description,
  metric,
  metricLabel,
  href,
  index,
  pillars,
  variant = "case_study",
}: PortfolioCardProps) {
  const isInteractive = variant === "interactive";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      className="h-full"
    >
      <Link href={href} className="block group h-full">
        <article className="card p-6 md:p-8 h-full flex flex-col relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-6 right-6 z-10">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider ${isInteractive ? "bg-ember" : "bg-electric"
                }`}
            >
              {isInteractive ? "Interactive" : "Case Study"}
            </span>
          </div>

          {/* Pillar Badges */}
          <div className="flex flex-wrap gap-2 mb-4 pr-24">
            {pillars.map((pillar) => {
              let badgeStyle = "bg-slate/10 text-slate border-slate/20";
              if (pillar === "Predictive Infrastructure") {
                badgeStyle = "bg-electric/10 text-electric border-electric/20";
              } else if (pillar === "Human Strategy") {
                badgeStyle = "bg-copper/10 text-copper border-copper/20";
              } else if (pillar === "Scale Without Headcount") {
                badgeStyle = "bg-ember/10 text-ember border-ember/20";
              }

              return (
                <span
                  key={pillar}
                  className={`text-xs font-medium px-2 py-0.5 rounded border ${badgeStyle}`}
                >
                  {pillar}
                </span>
              );
            })}
          </div>

          {/* Title - Primary Element */}
          <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4 group-hover:text-ember transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate mb-6 leading-relaxed">{description}</p>

          {/* Metric Highlight - Secondary */}
          <div className="mt-auto mb-4 p-4 bg-ash/50 rounded-lg border border-charcoal/5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-charcoal">{metric}</span>
              <span className="text-sm text-slate font-medium uppercase tracking-wide">
                {metricLabel}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-2 flex items-center gap-2 text-electric font-medium group-hover:text-ember transition-colors">
            <span>{isInteractive ? "Launch tool" : "Read case study"}</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
          </div>

          {/* Hover Accent */}
          <div
            className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${isInteractive
                ? "from-ember to-copper"
                : "from-electric to-charcoal"
              } transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-lg`}
          />
        </article>
      </Link>
    </motion.div>
  );
}
