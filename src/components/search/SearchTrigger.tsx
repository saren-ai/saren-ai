"use client";

import { Search } from "lucide-react";
import { useSearch } from "./SearchContext";

export default function SearchTrigger() {
  const { open } = useSearch();

  return (
    <button
      onClick={open}
      className="flex items-center gap-2 text-foreground/60 hover:text-ember transition-colors p-2 rounded-full hover:bg-charcoal/[0.05] dark:hover:bg-white/[0.06]"
      aria-label="Open search"
    >
      <Search className="w-[18px] h-[18px]" />
      <span className="hidden md:flex items-center gap-1 text-xs font-mono text-foreground-muted border border-border rounded px-1.5 py-0.5">
        ⌘K
      </span>
    </button>
  );
}
