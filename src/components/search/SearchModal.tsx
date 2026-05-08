"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearch } from "./SearchContext";
import { useSearchHotkey } from "./useSearchHotkey";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

export default function SearchModal() {
  const { isOpen, open, close } = useSearch();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"search" | "ask">("search");

  useSearchHotkey(open, close);

  function handleClose() {
    close();
    setQuery("");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-charcoal/60 dark:bg-offblack/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed z-[201] inset-x-0 top-0 md:top-[10vh] md:mx-auto md:max-w-[640px] md:max-h-[70vh] bg-ash dark:bg-offblack border border-slate/20 md:rounded-xl shadow-2xl flex flex-col overflow-hidden"
            style={{ minHeight: "min(70vh, 100dvh)" }}
          >
            {/* Mode switcher */}
            <div className="flex items-center gap-1 px-4 pt-3 pb-2">
              <button
                onClick={() => setMode("search")}
                className={`text-xs font-mono px-3 py-1 rounded-full transition-colors ${
                  mode === "search"
                    ? "bg-ember text-white"
                    : "text-slate hover:text-foreground"
                }`}
              >
                Search
              </button>
              <button
                disabled
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full text-slate/50 cursor-not-allowed"
                title="Coming Q2 2026"
              >
                Ask
                <span className="text-[10px] font-mono bg-slate/20 text-slate px-1 py-0.5 rounded">
                  Q2 2026
                </span>
              </button>
            </div>

            <SearchInput query={query} onChange={setQuery} onClose={handleClose} />

            <SearchResults
              query={query}
              onClose={handleClose}
              onSuggest={(term) => setQuery(term)}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
