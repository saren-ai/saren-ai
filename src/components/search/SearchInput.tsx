"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

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
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search anything..."
        className="flex-1 bg-transparent text-lg text-charcoal dark:text-ash placeholder:text-slate/60 outline-none border-none"
        aria-label="Search"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {query && (
        <button
          onClick={() => onChange("")}
          className="text-slate hover:text-ember transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={onClose}
        className="text-slate hover:text-ember transition-colors text-xs font-mono border border-border rounded px-1.5 py-0.5"
        aria-label="Close search"
      >
        esc
      </button>
    </div>
  );
}
