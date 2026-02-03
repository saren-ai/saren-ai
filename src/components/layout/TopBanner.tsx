"use client";

import { useState } from "react";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-ember via-copper to-ember text-white text-sm relative">
      <div className="container-narrow py-2 flex items-center justify-center gap-2 pr-8">
        <span className="hidden sm:inline">🚀</span>
        <p className="text-center">
          <span className="font-semibold">Build in Public:</span>{" "}
          <span className="opacity-90">
            This site was built with{" "}
            <span className="font-medium">Cursor</span>,{" "}
            <span className="font-medium">Claude Opus 4.5</span>,{" "}
            <span className="font-medium">GitHub</span> &{" "}
            <span className="font-medium">Vercel</span>
          </span>
        </p>
        <span className="hidden sm:inline">✨</span>
      </div>
      
      {/* Dismiss button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded transition-colors"
        aria-label="Dismiss banner"
      >
        <svg
          className="w-4 h-4"
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
