# Saren.ai Search — Phase 1 (Pagefind)

## Context

Implementing site-wide search using Pagefind, a static search library that indexes built HTML at build time. Zero infrastructure, zero ongoing cost, ~30KB client payload. The search modal will become the foundation for Phase 2 (semantic/chat search via RAG) in Q2 2026.

This phase ships keyword search only. Phase 2 lives in a separate document and should not be implemented now — but the architecture must leave clean hooks for it.

Work through tasks sequentially. Run `npm run build` after each major task to confirm nothing breaks. Stop and ask if any decision feels ambiguous.

---

## Task 1: Install and configure Pagefind

1. Install: `npm install --save-dev pagefind`
2. Add postbuild script to `package.json`. Pagefind must run AFTER `next-sitemap` (which currently owns postbuild from the IA cleanup phase). Chain them:
```json
"scripts": {
"postbuild": "next-sitemap && pagefind --site .next/server/app --output-path public/_pagefind"
}
3. Verify build output: after `npm run build`, confirm `public/_pagefind/` exists with `pagefind.js`, index files, and fragment files.
4. Add `public/_pagefind/` to `.gitignore` — generated artifact, not source.

---

## Task 2: Configure indexable content

Pagefind indexes everything in the built HTML by default. We need to exclude noise (nav, footer, decorative elements) and exclude the Halcyon archive entirely.

1. In `src/components/layout/Header.tsx`, add `data-pagefind-ignore` to the root nav element.
2. In `src/components/layout/Footer.tsx`, add `data-pagefind-ignore` to the root footer element.
3. In `src/components/layout/MegaMenu.tsx`, add `data-pagefind-ignore` to the root.
4. In `src/app/halcyon/layout.tsx` (create if it doesn't exist), wrap children in a `<div data-pagefind-ignore>` so the entire Halcyon section is excluded from search results — matches the `next-sitemap` exclusion logic from the IA cleanup.
5. For interactive tool pages where the *prose intro* should be indexed but the interactive component shouldn't, add `data-pagefind-ignore` to the interactive component wrapper. Specifically check:
   - `/portfolio/gtm-budget-calculator` — index intro copy, ignore the calculator UI
   - `/portfolio/roi-simulator` — index intro copy, ignore the simulator UI
   - `/portfolio/sovereign-personas` — index intro copy, ignore the persona builder UI
   - `/feature/kwannon-timeline` — index editorial wrapper, ignore the interactive timeline component

---

## Task 3: Configure section metadata for grouped results

Pagefind supports custom metadata via `data-pagefind-meta` attributes. This lets us group results by section in the UI.

For each route group, add a `data-pagefind-meta="section:VALUE"` attribute to the page's main content wrapper:

| Route pattern | Section value |
|---|---|
| `/portfolio/*` | `Case Studies` |
| `/playbooks/*` | `Playbooks` |
| `/feature/*` | `Features` |
| `/signal-state/*` | `Signal State` |
| `/about/*`, `/about` | `About` |
| `/brand` | `About` |
| `/ai-orchestration` | `Services` |
| `/contact` | `About` |

Implementation approach: create a small server component `<PagefindBoundary section="...">` in `src/components/search/PagefindBoundary.tsx` that wraps the page content and emits the meta attribute. Use it in each route's `page.tsx`. Don't try to do this with middleware or layouts alone — explicit is better than clever.

Also add weighted indexing for headings:
- `<h1>` gets default weight (1.0)
- `<h2>` gets weight 0.7 via `data-pagefind-weight="0.7"`
- Page titles get a `data-pagefind-meta="title:..."` attribute for clean result display

---

## Task 4: Build the search modal UI

Create the search modal as the foundation for Phase 2. The architecture must support a future "mode switch" (keyword vs. chat) even though only keyword exists today.

File structure:
src/components/search/
├── SearchModal.tsx          # The modal shell, mode switcher (keyword only for now)
├── SearchInput.tsx          # The input field
├── SearchResults.tsx        # Result list, grouped by section
├── SearchResultItem.tsx     # Individual result card
├── PagefindProvider.tsx     # Loads pagefind.js dynamically, exposes search API via context
├── PagefindBoundary.tsx     # Server component for marking section metadata (Task 3)
└── useSearchHotkey.ts       # Cmd+K / Ctrl+K listener hook
Behavior requirements:

1. **Trigger:** `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux) opens the modal from anywhere on the site. ESC closes.
2. **Visual trigger:** Add a search button to the header that shows the keyboard shortcut hint (à la Linear, Vercel). Clicking it opens the same modal.
3. **Modal shell:** Centered overlay, backdrop blur, max-width ~640px, max-height ~70vh. Uses Fire Horse 2026 tokens — `bg-ash` background in light mode, `bg-offblack` in dark, ember red accent on focused result.
4. **Input:** Autofocuses on open. Sora font, generous size (text-lg). Placeholder: "Search case studies, playbooks, features…"
5. **Mode switcher:** A small tab/segmented control above results showing two options: "Search" (active) and "Ask" (disabled, with a small "Coming Q2 2026" badge). The disabled state matters — it signals the roadmap to visitors AND forces our component architecture to support mode switching from day one. Don't hide it; show it disabled.
6. **Results:** Debounced 150ms. Grouped by section (use the metadata from Task 3). Each group shows the section name as a small uppercase label (JetBrains Mono, slate gray) followed by up to 5 results.
7. **Result item:** Title (Sora bold), URL path in JetBrains Mono small text, excerpt with matched terms highlighted (Pagefind returns this automatically — use the `excerpt` field with `<mark>` tags).
8. **Empty state:** When no query, show three suggested prompts as clickable chips: "demand generation", "Cylance", "fractional CMO". These pre-fill the input. This is a UX convention from frontier chat models we're borrowing early so users develop the pattern.
9. **No results state:** "No matches for 'query'. Try fewer keywords." with a link to `/portfolio` as fallback.
10. **Keyboard nav:** Arrow keys move between results, Enter navigates, Cmd+Enter opens in new tab.
11. **Mobile:** Full-screen takeover instead of modal. Same component, different layout below `md:` breakpoint.

---

## Task 5: PagefindProvider implementation notes

Pagefind ships as an ES module loaded at runtime, not bundled. The provider handles this cleanly:

```tsx
// PagefindProvider.tsx — sketch, not final
"use client";

const PagefindContext = createContext<{ search: (q: string) => Promise<Results> } | null>(null);

export function PagefindProvider({ children }) {
  const [pagefind, setPagefind] = useState(null);

  useEffect(() => {
    async function load() {
      // @ts-expect-error - pagefind is loaded at runtime from /public
      const pf = await import(/* webpackIgnore: true */ "/_pagefind/pagefind.js");
      await pf.options({ excerptLength: 30 });
      setPagefind(pf);
    }
    load();
  }, []);

  // expose search method via context...
}
```

Key constraints:
- The `@ts-expect-error` and `webpackIgnore` are required — Pagefind must NOT be bundled. It loads from `/public/_pagefind/` at runtime.
- In dev mode (`npm run dev`), Pagefind doesn't exist because it only runs at build time. The provider should gracefully no-op in dev with a console warning. Don't crash the dev server.
- For local testing of search itself, run `npm run build && npm run start` instead of `npm run dev`.

---

## Task 6: Add search to the global layout

1. Wrap the app in `<PagefindProvider>` in `src/app/layout.tsx`, inside the existing `<ThemeProvider>`.
2. Mount `<SearchModal>` once at the layout level so it's available globally.
3. Add the `<SearchTrigger>` button to `Header.tsx`, positioned to the left of the theme toggle. Use the Lucide `Search` icon plus a subtle `⌘K` hint pill (hidden below `md:` breakpoint).

---

## Task 7: Style and polish

Match Fire Horse 2026 strictly. No new colors, no new utility classes.

- Modal backdrop: `bg-charcoal/60 backdrop-blur-sm` (light), `bg-offblack/80 backdrop-blur-sm` (dark)
- Modal panel: `bg-ash` / `bg-offblack`, `border` `border-slate/20`, `rounded-xl`, `shadow-2xl`
- Input: borderless, `text-charcoal dark:text-ash`, large size, no focus ring (the modal IS the focus indicator)
- Section headers: `text-xs uppercase tracking-wider font-mono text-slate`
- Result item hover/focus: `bg-electric/10` with ember red left border (4px)
- Highlighted matches: `bg-ember/20 text-ember dark:text-ember rounded px-0.5`
- Mode switcher: segmented control, ember red active state, slate text on disabled "Ask" option

Animations via Framer Motion:
- Modal entrance: `opacity 0→1, scale 0.95→1`, 180ms ease-out
- Result list: stagger children at 20ms each on initial mount only
- Mode switch (when Phase 2 lands): `AnimatePresence mode="wait"` between modes

---

## Task 8: Update CLAUDE.md

After search ships, update the IA reference doc:

1. In **Tech Stack**, add: `Pagefind | Static search index | latest | Generated at build time, served from /public/_pagefind/`
2. In **Project Structure → Components**, add the `search/` directory with file count.
3. In **Project Structure → Libraries**, no new library files needed (Pagefind is dev-dep + runtime fetch).
4. In **Common Tasks**, add a new section:
```markdown
   ### Adding searchable content
   
   New routes are indexed automatically at build time. To control indexing:
   - Add `data-pagefind-ignore` to elements that should NOT be searched
   - Add `<PagefindBoundary section="...">` wrapper to set the section grouping
   - Headings (h1, h2, h3) are weighted automatically
   - Halcyon and /api/* are excluded globally
   
   To test search locally: `npm run build && npm run start` (not `npm run dev` — the index doesn't exist in dev).
```
5. Add a new top-level section after **Deployment**:
```markdown
   ## Search
   
   Site-wide search uses Pagefind, generated at build time. The modal lives in 
   `src/components/search/` and is triggered by Cmd+K or the header search button.
   
   The architecture is designed to support a second "Ask" mode in Phase 2 (semantic 
   search + chat UX via RAG). The mode switcher already exists in the UI as a 
   disabled state. See `docs/search-phase-2.md` for the Phase 2 spec.
```

---

## Task 9: Create Phase 2 planning document

Create `docs/search-phase-2.md` with the following content. This is a forward-looking spec that captures decisions we've made about Phase 2 so they're not lost:

```markdown
# Search Phase 2 — Semantic + Chat UX

**Status:** Planned for Q2 2026  
**Depends on:** Phase 1 (Pagefind) shipped and validated  
**Prerequisite:** 4–6 weeks of Phase 1 query logs to inform corpus tuning

## Goals

Add a second mode to the existing search modal: "Ask." Users can ask 
natural-language questions and receive synthesized answers with citations 
back to source pages.

## Architecture (planned)

- **Embeddings:** voyage-3 or OpenAI text-embedding-3-small for content + queries
- **Vector store:** Vercel Postgres + pgvector
- **LLM:** Claude (Sonnet for cost, Opus for the eventual conversational homepage)
- **Streaming:** Server-sent events for token-by-token response
- **Citations:** Inline links to source pages, every claim grounded
- **Indexing trigger:** Postbuild step parallel to Pagefind — embed all MDX 
  and case study content, upsert into pgvector

## UX requirements

- Same modal, mode toggle activates "Ask"
- Streaming response with visible cursor
- Inline citations as superscript links
- Three suggested follow-up prompts after each response
- Hard refusal patterns for pricing, current availability, engagement capacity 
  (route to /contact)
- Persistent context within session, no cross-session memory
- Visible "Browse instead" link at all times

## What NOT to build in Phase 2

- Homepage hero chat (that's Phase 3)
- Multi-turn agent loops or tool use
- HubSpot integration / live chat handoff (that's a separate effort)
- Anonymous user query analytics beyond aggregate counts

## Decision log (from Phase 1 planning)

- Mode switcher visible-but-disabled in Phase 1 to set user expectation early
- Modal-based, not hero-based, until query data validates the chat pattern
- Section metadata from Phase 1 reused as filter facets in Phase 2
- Halcyon excluded from both modes consistently
```

---

## Task 10: Verification

1. Run `npm run build`. Confirm `public/_pagefind/` is generated and contains index files.
2. Run `npm run start`. Open the site at the production URL.
3. Test cases:
   - Cmd+K opens modal, ESC closes
   - Header search button opens same modal
   - Type "Cylance" — confirm results appear, grouped by section, with highlighted matches
   - Type "calculator" — confirm `/portfolio/gtm-budget-calculator` ranks high
   - Type "kwannon" — confirm `/feature/kwannon-timeline` returns
   - Type "halcyon" — confirm zero results (excluded)
   - Click a result — confirm navigation to correct page
   - Arrow keys navigate, Enter opens
   - Mobile breakpoint: confirm full-screen takeover works
   - Mode switcher: confirm "Ask" tab is visible but disabled with the Q2 2026 badge
4. Lighthouse check: confirm search modal doesn't regress performance scores. Pagefind should add <50KB to total page weight on first search interaction.
5. Output a summary: what shipped, what's tested, what manual SEO/deploy steps remain.

---

## Constraints

- Match Fire Horse 2026 design system. Zero new tokens.
- Use Framer Motion for all animations (already in stack).
- Lucide icons only.
- Server components where possible; `"use client"` only where state requires it.
- The mode switcher MUST exist as disabled UI in Phase 1. Don't skip it and "add it later" — the visible roadmap signals to users matter, and the architecture pressure of building it now makes Phase 2 trivial later.
- Pause and ask before any decision not explicitly covered. Do not invent solutions to ambiguous cases.