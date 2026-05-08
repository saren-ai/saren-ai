"use client";

import { PagefindResultData } from "./PagefindProvider";

interface SearchResultItemProps {
  result: PagefindResultData;
  isActive: boolean;
  onSelect: (url: string) => void;
}

export default function SearchResultItem({ result, isActive, onSelect }: SearchResultItemProps) {
  const path = result.url.replace(/^https?:\/\/[^/]+/, "").replace(/\.html$/, "");

  return (
    <button
      onClick={() => onSelect(path)}
      className={`w-full text-left px-4 py-3 flex flex-col gap-1 border-l-[3px] transition-colors ${
        isActive
          ? "border-ember bg-lavender/10"
          : "border-transparent hover:border-ember hover:bg-lavender/10"
      }`}
    >
      <span className="text-sm font-semibold text-charcoal dark:text-ash line-clamp-1">
        {result.meta.title ?? path}
      </span>
      <span className="text-xs font-mono text-slate">{path}</span>
      {result.excerpt && (
        <span
          className="text-xs text-foreground-muted line-clamp-2 [&_mark]:bg-ember/20 [&_mark]:text-ember [&_mark]:rounded [&_mark]:px-0.5"
          dangerouslySetInnerHTML={{ __html: result.excerpt }}
        />
      )}
    </button>
  );
}
