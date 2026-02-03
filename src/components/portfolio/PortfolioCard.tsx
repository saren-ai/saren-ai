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
}

export default function PortfolioCard({
  title,
  description,
  metric,
  metricLabel,
  href,
  index,
}: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href} className="block group">
        <article className="card p-6 md:p-8 h-full flex flex-col">
          {/* Metric Highlight */}
          <div className="mb-4">
            <span className="metric-value text-2xl md:text-3xl">{metric}</span>
            <span className="metric-label block mt-1">{metricLabel}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-2 group-hover:text-ember transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate flex-1 leading-relaxed">{description}</p>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-2 text-electric font-medium group-hover:text-ember transition-colors">
            <span>View case study</span>
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
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-ember to-copper transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-lg" />
        </article>
      </Link>
    </motion.div>
  );
}
