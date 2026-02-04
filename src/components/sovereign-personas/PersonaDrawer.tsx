"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { PersonaCard } from "@/lib/sovereign-personas";

interface PersonaDrawerProps {
  persona: PersonaCard | null;
  onClose: () => void;
}

export default function PersonaDrawer({ persona, onClose }: PersonaDrawerProps) {
  if (!persona) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 dark:bg-black/80 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-background dark:bg-card-bg shadow-2xl z-50 overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-border rounded-lg transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-6 h-6 text-foreground-muted" />
            </button>
          </div>

          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden rounded-lg mb-6 border border-border">
            <Image
              src={persona.thumbSrc}
              alt={`${persona.title} persona`}
              fill
              className="object-cover"
              sizes="600px"
            />
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {persona.title}
            </h2>
            <p className="text-foreground-muted">{persona.subtitle}</p>
          </div>

          {/* Mandate */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-ember rounded-full" />
              Mandate
            </h3>
            <p className="text-foreground leading-relaxed">{persona.mandate}</p>
          </div>

          {/* Messaging Altitude */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-electric rounded-full" />
              Messaging Altitude
            </h3>
            <p className="text-foreground leading-relaxed">
              {persona.messagingAltitude}
            </p>
          </div>

          {/* How to Win */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-copper rounded-full" />
              How to Win with This Persona
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-ember uppercase tracking-wide mb-2">
                  What They Trust
                </h4>
                <ul className="space-y-2">
                  {persona.trusts.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="text-ember mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate uppercase tracking-wide mb-2">
                  What They Dismiss
                </h4>
                <ul className="space-y-2">
                  {persona.dismisses.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-foreground-muted"
                    >
                      <span className="text-foreground-muted mt-1">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Best Content Types */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-electric rounded-full" />
              Best Content Types
            </h3>
            <ul className="grid gap-2">
              {persona.bestContent.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-card-bg dark:bg-background-secondary rounded-lg border border-border"
                >
                  <svg
                    className="w-5 h-5 text-ember flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Anti-Patterns */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-ember rounded-full" />
              What Not to Do
            </h3>
            <ul className="space-y-2">
              {persona.antiPatterns.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-foreground-muted"
                >
                  <span className="text-ember font-bold mt-0.5">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA - Download PDF */}
          <div className="pt-6 border-t border-border">
            <a
              href={persona.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-ember hover:bg-ember/90 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-6 h-6"
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
              Download Full Persona PDF
            </a>
            <p className="text-center text-sm text-foreground-muted mt-3">
              Complete persona with frameworks and examples
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
