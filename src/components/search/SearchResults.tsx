"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePagefind, PagefindResultData } from "./PagefindProvider";
import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
  onSuggest: (term: string) => void;
}

const SUGGESTIONS = ["demand generation", "Cylance", "fractional CMO"];

export default function SearchResults({ query, onClose, onSuggest }: SearchResultsProps) {
  const pagefind = usePagefind();
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    if (!pagefind) return;

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await pagefind.search(query);
        const data = await Promise.all(res.results.slice(0, 12).map((r) => r.data()));
        setResults(data);
        setActiveIndex(0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, pagefind]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!results.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const result = results[activeIndex];
        if (!result) return;
        const path = result.url.replace(/^https?:\/\/[^/]+/, "").replace(/\.html$/, "");
        if (e.metaKey || e.ctrlKey) {
          window.open(path, "_blank");
        } else {
          window.location.href = path;
          onClose();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [results, activeIndex, onClose]);

  function handleSelect(path: string) {
    window.location.href = path;
    onClose();
  }

  // Group results by section
  const grouped: Record<string, PagefindResultData[]> = {};
  for (const r of results) {
    const section = r.meta.section ?? "Other";
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(r);
  }

  if (!query.trim()) {
    return (
      <div className="px-4 py-6">
        <p className="text-xs uppercase tracking-wider font-mono text-slate mb-3">Suggested</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSuggest(s)}
              className="text-sm px-3 py-1.5 rounded-full border border-border text-foreground-muted hover:border-ember hover:text-ember transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-4 py-6 text-sm text-slate font-mono">Searching...</div>
    );
  }

  if (!results.length) {
    return (
      <div className="px-4 py-6">
        <p className="text-sm text-foreground-muted mb-3">
          No matches for &ldquo;{query}&rdquo;. Try fewer keywords.
        </p>
        <Link
          href="/case-studies"
          onClick={onClose}
          className="text-sm text-ember hover:underline"
        >
          Browse all portfolio work →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex-1 py-2">
      {Object.entries(grouped).map(([section, items]) => (
        <div key={section}>
          <p className="px-4 py-2 text-xs uppercase tracking-wider font-mono text-slate">
            {section}
          </p>
          {items.map((item) => (
            <SearchResultItem
              key={item.url}
              result={item}
              isActive={results.indexOf(item) === activeIndex}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
