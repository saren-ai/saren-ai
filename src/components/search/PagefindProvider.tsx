"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PagefindAPI {
  search: (query: string) => Promise<PagefindResults>;
  options: (opts: Record<string, unknown>) => Promise<void>;
}

interface PagefindResults {
  results: PagefindResult[];
}

export interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

export interface PagefindResultData {
  url: string;
  meta: {
    title?: string;
    section?: string;
  };
  excerpt: string;
  content: string;
}

const PagefindContext = createContext<PagefindAPI | null>(null);

export function usePagefind() {
  return useContext(PagefindContext);
}

export function PagefindProvider({ children }: { children: React.ReactNode }) {
  const [pagefind, setPagefind] = useState<PagefindAPI | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // @ts-expect-error — runtime ES module, not bundled
        const pf = await import(/* webpackIgnore: true */ "/_pagefind/pagefind.js");
        await pf.options({ excerptLength: 30 });
        setPagefind(pf);
      } catch {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Pagefind] index not found — run `npm run build && npm run start` to test search."
          );
        }
      }
    })();
  }, []);

  return (
    <PagefindContext.Provider value={pagefind}>{children}</PagefindContext.Provider>
  );
}
