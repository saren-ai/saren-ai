"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  query: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function SearchInput({ query, onChange, onClose }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 px-6 md:px-8 pb-4 md:pb-5">
      <div
        className="flex flex-1 items-center gap-3 min-w-0 rounded-full
          border border-charcoal/[0.08] dark:border-white/[0.08]
          bg-ash/70 dark:bg-charcoal/20
          px-5 py-3 md:px-6 md:py-3.5
          shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-none
          transition-[border-color,box-shadow]
          focus-within:border-lavender
          focus-within:ring-2 focus-within:ring-lavender/25 focus-within:ring-offset-0"
      >
        <Search className="w-6 h-6 md:w-7 md:h-7 text-slate shrink-0" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search anything..."
          className="search-pill-input flex-1 min-w-0 bg-transparent text-xl md:text-2xl font-medium text-charcoal dark:text-ash placeholder:text-slate/50 placeholder:font-normal border-none leading-snug outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
          style={{ fontFamily: "var(--font-body)" }}
          aria-label="Search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {query && (
          <button
            onClick={() => onChange("")}
            className="text-slate hover:text-lavender transition-colors shrink-0 p-1 rounded-full hover:bg-charcoal/[0.05] dark:hover:bg-white/[0.06]"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-slate hover:text-lavender transition-colors text-sm font-mono border border-charcoal/[0.08] dark:border-white/[0.08] rounded-full px-3 py-1.5 shrink-0"
        aria-label="Close search"
      >
        esc
      </button>
    </div>
  );
}
