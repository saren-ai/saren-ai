"use client";

import { Search } from "lucide-react";
import { useSearch } from "./SearchContext";

function HotkeyBadge({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="text-[10px] font-mono text-foreground-muted border border-charcoal/[0.08] dark:border-white/[0.08] rounded px-1.5 py-0.5 leading-none">
      {children}
    </kbd>
  );
}

export default function SearchTrigger() {
  const { open } = useSearch();

  return (
    <button
      onClick={open}
      className="flex items-center gap-2 text-foreground/60 hover:text-lavender transition-colors p-2 rounded-full hover:bg-charcoal/[0.05] dark:hover:bg-white/[0.06]"
      aria-label="Open search (/K or Command K)"
    >
      <Search className="w-[18px] h-[18px]" />
      <span className="hidden md:flex items-center gap-1.5">
        <HotkeyBadge>/K</HotkeyBadge>
        <span className="text-foreground-muted/30 text-[10px]" aria-hidden>
          ·
        </span>
        <HotkeyBadge>⌘K</HotkeyBadge>
      </span>
    </button>
  );
}
