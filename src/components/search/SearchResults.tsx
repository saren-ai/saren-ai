"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePagefind, PagefindResultData } from "./PagefindProvider";
import SearchResultItem from "./SearchResultItem";
import { partitionSearchResults } from "@/lib/search-rank";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
  onSuggest: (term: string) => void;
  onResultCountChange?: (count: number) => void;
}

const SUGGESTIONS = [
  "demand generation",
  "Cylance",
  "fractional marketing lead",
  "AI orchestration",
  "Oblique Techniques",
];

const RESULT_FETCH_LIMIT = 24;
const RESULT_DISPLAY_LIMIT = 12;

export default function SearchResults({
  query,
  onClose,
  onSuggest,
  onResultCountChange,
}: SearchResultsProps) {
  const pagefind = usePagefind();
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      onResultCountChange?.(0);
      return;
    }
    if (!pagefind) return;

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await pagefind.search(query);
        const data = await Promise.all(
          res.results.slice(0, RESULT_FETCH_LIMIT).map((r) => r.data())
        );
        const { primary, mentions } = partitionSearchResults(data, query);
        const ranked = [...primary, ...mentions].slice(0, RESULT_DISPLAY_LIMIT);
        setResults(ranked);
        setActiveIndex(0);
        onResultCountChange?.(ranked.length);
      } catch {
        setResults([]);
        onResultCountChange?.(0);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, pagefind, onResultCountChange]);

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

  if (!query.trim()) {
    return (
      <div className="px-6 md:px-8 py-5 min-h-[180px]">
        <p className="text-sm uppercase tracking-wider font-mono text-slate mb-3">
          Suggested searches
        </p>
        <div className="flex flex-wrap gap-2.5 mb-4">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSuggest(s)}
              className="text-base md:text-lg px-4 py-2 rounded-full border border-charcoal/[0.08] dark:border-white/[0.08] text-foreground-muted hover:border-lavender hover:text-lavender transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate/70 font-mono mb-1">
          Start typing — matches appear here as you go
        </p>
        <p className="text-xs text-slate/50 font-mono">
          Shortcuts: /K search · /W work · /P playbooks · /S studio · /A about · /H home
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-6 md:px-8 py-5 min-h-[180px]" aria-busy="true" aria-label="Searching">
        <p className="text-sm uppercase tracking-wider font-mono text-slate mb-3">
          Searching for &ldquo;{query}&rdquo;
        </p>
        <div className="space-y-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-12 rounded-xl bg-charcoal/[0.04] dark:bg-white/[0.04] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="px-6 md:px-8 py-5 min-h-[180px]">
        <p className="text-lg text-foreground-muted mb-3">
          No matches for &ldquo;{query}&rdquo;. Try fewer keywords.
        </p>
        <Link
          href="/case-studies"
          onClick={onClose}
          className="text-base text-lavender hover:underline"
        >
          Browse all case studies →
        </Link>
      </div>
    );
  }

  const { primary, mentions } = partitionSearchResults(results, query);
  const flatIndex = (item: PagefindResultData) => results.indexOf(item);

  function renderGroup(label: string, items: PagefindResultData[]) {
    if (!items.length) return null;
    return (
      <div key={label}>
        <p className="px-6 md:px-8 py-2.5 text-sm uppercase tracking-wider font-mono text-slate">
          {label}
        </p>
        {items.map((item) => (
          <SearchResultItem
            key={item.url}
            result={item}
            isActive={flatIndex(item) === activeIndex}
            onSelect={handleSelect}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="py-1">
      {primary.length > 0 &&
        renderGroup(primary.length === 1 ? "Best match" : "Best matches", primary)}
      {mentions.length > 0 &&
        renderGroup(primary.length > 0 ? "Also mentioned on" : "Results", mentions)}
    </div>
  );
}
