"use client";

import { useState } from "react";
import Image from "next/image";
import type { PersonaCard as PersonaCardType } from "@/lib/sovereign-personas";

interface PersonaCardProps {
  persona: PersonaCardType;
  onShowDetails: (persona: PersonaCardType) => void;
}

export default function PersonaCard({ persona, onShowDetails }: PersonaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-card-bg dark:bg-background-secondary rounded-lg border border-border overflow-hidden transition-all hover:shadow-xl hover:border-ember/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-charcoal/10 dark:bg-background">
        <Image
          src={persona.thumbSrc}
          alt={`${persona.title} persona`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-ash space-y-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-ember mb-1">
                Mandate
              </h4>
              <p className="text-sm leading-relaxed">{persona.mandate}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-electric mb-1">
                Primary Risks
              </h4>
              <ul className="text-sm space-y-0.5">
                {persona.risks.slice(0, 2).map((risk, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-ember mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {persona.title}
        </h3>
        <p className="text-foreground-muted text-sm mb-6">{persona.subtitle}</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-1">
              Trusts
            </h4>
            <p className="text-sm text-foreground">{persona.trusts.length} key signals</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-1">
              Dismisses
            </h4>
            <p className="text-sm text-foreground">{persona.dismisses.length} red flags</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href={persona.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-ember hover:bg-ember/90 text-white rounded-lg font-semibold transition-colors"
          >
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Open Persona PDF
          </a>
          <button
            onClick={() => onShowDetails(persona)}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-card-bg dark:bg-background border-2 border-border hover:border-electric text-foreground rounded-lg font-semibold transition-colors"
          >
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            Messaging Implications
          </button>
        </div>
      </div>
    </div>
  );
}
