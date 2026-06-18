# saren.ai

Portfolio and consulting site for [Saren Sakurai](https://saren.ai) — fractional CMO, AI ops practitioner, and vibe coder.

Built entirely with Claude Code. Not as a gimmick — as a working proof of concept that the right human + AI pairing produces better software faster than either does alone.

**Live:** https://saren.ai

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 — App Router, RSC-first |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 — CSS-based config, no `tailwind.config.js` |
| Animation | Framer Motion 12 |
| Content | MDX + Pagefind (static search, built at compile time) |
| Commerce | Stripe hosted checkout + HttpOnly cookie entitlement pattern |
| Database | Supabase (Postgres + Storage) |
| Deployment | Vercel — GitHub integration, automatic on push to `main` |

No global state libraries. No external carousel libs. Server components by default; `"use client"` only when you actually need it.

---

## Design System — Fire Horse 2026

Six tokens. Never raw hex in `className`.

| Token | Value | Role |
|---|---|---|
| Ember Red | `#C43322` | Primary action, execution fire |
| Lavender | `#7C5AA3` | Links, strategy, insight |
| Copper | `#C17D3A` | Warmth — large/bold only |
| Charcoal | `#1D1D1F` | Dominant text |
| Slate | `#5B6470` | Body, metadata |
| Ash | `#F5F5F7` | Page background |

Two typefaces: **Sora** for headings and body, **JetBrains Mono** for numbers and code. No exceptions.

Both light and dark mode are live and fully togglable. The `dark:` variant is bound to the `.dark` class (not `prefers-color-scheme`) via a custom Tailwind v4 variant — this prevents the `.dark` CSS variable state and Tailwind utility classes from disagreeing.

Full spec in `src/app/globals.css` and `docs/DESIGN.md`.

---

## IA

Content classification is enforced at the route level:

- `/work` — engagement hub (“Work With Me”; formerly `/engage`, 301 redirect)
- `/case-studies/*` — static B2B proof narratives. No interactive widgets.
- `/playbooks/*` — prompt sequences, interactive tools, paid downloads. The index page toggles between Playbooks and Interactive Tools via `?type=tools`.
- `/studio/*` — creative/editorial work (formerly `/feature`, 301 redirect). Primary nav item **Studio**.
- `/desk/*` — admin-only Hustle & Flow prospecting cockpit (formerly `/studio`, noindex). Not public marketing.
- `/signal-state/*` — Signal-State framework workspace (in development).

**Primary nav (2026-06-17):** Work · Playbooks · Studio · About Me — each opens a 3-column mega menu. Audience pages (`/smb`, `/solopreneurs`, `/thinkers`) live in the footer.

The rule: **interactive feature on the page OR paid download → `/playbooks/`. Static narrative → `/case-studies/`. Editorial/creative → `/studio/`.**

Agent-oriented docs: `AGENTS.md` (source of truth for routes, tasks, and conventions).

---

## Local Development

```bash
npm install
npm run dev      # Turbopack dev server → localhost:3000
npm run build    # Production build (also generates Pagefind index)
npm run lint     # ESLint
```

The search index is only generated at build time (`postbuild` → `public/_pagefind`). `npm run dev` won't have it — run `npm run build && npm run start` to test search locally.

**Search shortcuts:** `⌘K` opens the modal; `/` then `W` / `P` / `S` / `A` / `H` jumps to Work / Playbooks / Studio / About / Home.

---

## How This Site Is Built

This site is developed with [Claude Code](https://claude.ai/code) — Anthropic's CLI for AI-assisted engineering. Every significant feature was designed and implemented in pair with Claude: architecture decisions, component extraction, SEO instrumentation, the commerce layer.

The workflow is:
1. Define the problem in plain English, with constraints.
2. Let Claude draft the implementation.
3. Push back on anything that adds abstraction before it's earned.
4. Ship.

This isn't "AI wrote my code." It's a working method where the human holds the taste and the machine holds the syntax. The site you're looking at is the artifact.

---

## Philosophy

**IA before UI.** Getting the information architecture right before touching components saves more time than any component optimization. Routes are contracts.

**Server-first, client-when-earned.** RSC by default. `"use client"` only when you need hooks, event handlers, or browser APIs — not as a reflexive escape hatch.

**Design systems as constraints, not preferences.** Six colors and two typefaces isn't limiting — it's load-bearing. Every design decision that doesn't need to be made is time spent on something that matters.

**No abstraction before the second use case.** Three similar lines of code is better than a premature helper. Extract when you feel the pain, not when you predict it.

---

© 2026 Saren Sakurai. All rights reserved.
