"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearch } from "./SearchContext";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const PANEL_EASE = [0.23, 1, 0.32, 1] as const;

/** ~⅓ from top of viewport — above center, room to expand downward */
const PANEL_TOP = "top-[33dvh]";

export default function SearchModal() {
  const { isOpen, open, close } = useSearch();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"search" | "ask">("search");
  const [resultCount, setResultCount] = useState(0);

  const hasQuery = query.trim().length > 0;
  const isLarge = hasQuery && resultCount > 0;

  function handleClose() {
    close();
    setQuery("");
    setResultCount(0);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-charcoal/40 dark:bg-offblack/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="panel"
            layout
            initial={{ opacity: 0, y: -24, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              borderRadius: isLarge ? 20 : 32,
            }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: PANEL_EASE }}
            className={`fixed z-[201] ${PANEL_TOP} left-1/2 -translate-x-1/2
              w-[92%] sm:w-[88%] lg:w-[84%] max-w-[1400px]
              bg-white/95 dark:bg-card/85 backdrop-blur-xl
              border border-charcoal/[0.08] dark:border-white/[0.08]
              shadow-[0_8px_32px_-8px_rgba(0,0,0,0.10),0_4px_8px_-4px_rgba(0,0,0,0.06)]
              dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.55),0_4px_8px_-4px_rgba(0,0,0,0.4)]
              flex flex-col overflow-hidden`}
          >
            <div className="flex items-center gap-1.5 px-6 md:px-8 pt-4 pb-1">
              <button
                onClick={() => setMode("search")}
                className={`text-sm font-mono px-4 py-1.5 rounded-full transition-colors ${
                  mode === "search"
                    ? "bg-lavender/15 text-lavender font-semibold"
                    : "text-slate hover:text-foreground"
                }`}
              >
                Search
              </button>
              <button
                disabled
                className="flex items-center gap-1.5 text-sm font-mono px-4 py-1.5 rounded-full text-slate/50 cursor-not-allowed"
                title="Coming Q2 2026"
              >
                Ask
                <span className="text-[10px] font-mono bg-slate/20 text-slate px-1 py-0.5 rounded">
                  Q2 2026
                </span>
              </button>
            </div>

            <SearchInput query={query} onChange={setQuery} onClose={handleClose} />

            <motion.div
              layout
              className="border-t border-charcoal/[0.08] dark:border-white/[0.08]"
            >
              <div
                className={`overflow-y-auto transition-[max-height] duration-300 ease-out ${
                  isLarge ? "max-h-[min(calc(67dvh-14rem),560px)]" : "max-h-[280px]"
                }`}
              >
                <SearchResults
                  query={query}
                  onClose={handleClose}
                  onSuggest={(term) => setQuery(term)}
                  onResultCountChange={setResultCount}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
