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
      className={`w-full text-left px-6 md:px-8 py-3 flex flex-col gap-1 border-l-[3px] transition-colors ${
        isActive
          ? "border-lavender bg-lavender/10"
          : "border-transparent hover:border-lavender hover:bg-lavender/10"
      }`}
    >
      <span className="text-lg md:text-xl font-semibold text-charcoal dark:text-ash line-clamp-1">
        {result.meta.title ?? path}
      </span>
      <span className="text-sm font-mono text-slate">{path}</span>
      {result.excerpt && (
        <span
          className="text-sm text-foreground-muted line-clamp-2 [&_mark]:bg-lavender/20 [&_mark]:text-lavender [&_mark]:rounded [&_mark]:px-0.5"
          dangerouslySetInnerHTML={{ __html: result.excerpt }}
        />
      )}
    </button>
  );
}
