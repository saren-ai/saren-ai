"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-charcoal/[0.06] dark:bg-charcoal border-b border-charcoal/10 dark:border-white/5 relative">
      <div className="container-narrow min-h-[40px] flex items-center justify-center gap-2 pr-10 px-4 py-2">
        <span className="hidden sm:inline text-base">🚧</span>
        <p className="text-center text-xs sm:text-sm">
          <span className="font-bold text-charcoal dark:text-white">Building in Public:</span>{" "}
          <span className="text-charcoal/60 dark:text-white/70">
            I&apos;m currently building this site with AI-native tools.{" "}
          </span>
          <Link
            href="/about#stack"
            className="underline underline-offset-2 font-semibold transition-colors text-charcoal/80 dark:text-white/80 hover:text-charcoal/60 dark:hover:text-white/60"
          >
            See the full stack →
          </Link>
        </p>
        <span className="hidden sm:inline text-base">🔨</span>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-charcoal/10 dark:hover:bg-white/20 rounded transition-colors text-charcoal dark:text-white"
        aria-label="Dismiss banner"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
