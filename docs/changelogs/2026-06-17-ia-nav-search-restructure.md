# 2026-06-17 — IA restructure, nav refresh, search overhaul, Pagefind fix

Major information-architecture session: freed `/studio` for public editorial content by
moving the Hustle & Flow admin app to `/desk`, renamed the work hub and editorial
sections, rebuilt primary navigation, fixed site-wide search indexing, and shipped a
redesigned search modal.

---

## Naming & route decisions

| Before | After | Notes |
|---|---|---|
| `/studio/*` (admin) | `/desk/*` | Hustle & Flow prospecting cockpit. Route group `(desk)`, components `src/components/desk/`, API `src/app/api/desk/send-otp`. Gated in `src/proxy.ts`. |
| `/feature/*` (editorial) | `/studio/*` | Public creative/editorial section. 301 redirects in `next.config.ts`. Internal lib/components still named `feature` (content type). |
| `/engage` | `/work` | Primary “Work With Me” hub. 301 kept. `EngageClient` → `WorkClient`. |
| Public pages at `src/app/*` | `src/app/(site)/*` | Marketing chrome (Header, Footer, search) lives in `(site)/layout.tsx` so root layout stays static. |

**Why `/desk`:** The admin pipeline app had claimed `/studio` since the May 2026 refactor.
Public editorial deserved the friendlier brand name; admin tooling gets a utilitarian path
that won't compete for nav/SEO attention.

**Why `(site)` route group:** Root `layout.tsx` previously called `await headers()` for
Substack RSS in the header. That forced **dynamic rendering for every route**, which
broke Pagefind (postbuild indexed only 1 HTML shell). Fix: static root layout; Substack
feed cached via `unstable_cache` in `(site)/layout.tsx`.

---

## Navigation (2026-06-17)

Primary nav is now **four items**, each a clickable link **and** a 3-column mega menu
with a promo column:

1. **Work** → `/work` — engagement models, fractional CMO, AI orchestration, audiences
2. **Playbooks** → `/playbooks` — prompt library + interactive tools
3. **Studio** → `/studio` — editorial / creative work (AI for Liberal Arts series, Oblique Techniques, Psylocke timeline)
4. **About Me** → `/about` — profile, resume, expertise, clients

**Moved to footer only:** `/smb`, `/solopreneurs`, `/thinkers` (audience pages remain
live and in sitemap; no longer in primary nav).

Config: `src/lib/mega-menu-content.ts`, `src/components/layout/Header.tsx`,
`src/components/layout/Footer.tsx`.

---

## New Studio content

| Route | Purpose |
|---|---|
| `/studio/ai-for-liberal-arts` | Series hub for “AI for Liberal Arts Majors” |
| `/studio/oblique-techniques` | Claude Skills promo — “Prompt Against the Machine”; GitHub card thumbnails |
| `/studio/psylocke-timeline` | Moved from `/feature`; Pagefind indexing fixes (hero copy, static import, metadata) |

Registry: `src/lib/feature.ts`. Hero asset placeholder documented in
`public/images/feature/README.md` (`oblique-techniques-hero.png` still needed).

---

## Search (Phase 1 enhancements)

**Modal UX** (`src/components/search/`):

- Overlay positioned at ~33dvh; pill-shaped input container with lavender `focus-within` ring (input itself has no outline — see `.search-pill-input` in `globals.css`)
- Larger Sora typography; suggested searches; lavender UI chrome (not ember)
- Site hotkeys: `⌘K` opens search; `/` then `W`/`P`/`S`/`A`/`H` jump to Work / Playbooks / Studio / About / Home (`SiteHotkeys.tsx`, `useSiteHotkeys.ts`; replaced `useSearchHotkey.ts`)

**Ranking** (`src/lib/search-rank.ts` + tests):

- Fetches 24 Pagefind hits, ranks by title/body match quality, displays top 12
- “Best match” vs “Also mentioned on” grouping in results UI

**Indexing fix:**

- Postbuild Pagefind: **74+ pages** indexed (was 1)
- Test locally: `npm run build && npm run start` — dev server has no index

See also: `docs/search-phase-2.md` (Ask mode still planned).

---

## Config & infra

- **`next.config.ts`:** `/feature` → `/studio`, `/engage` → `/work` redirects; Substack CDN hosts in `images.remotePatterns` (`substackcdn.com`, S3)
- **`src/proxy.ts`:** Admin gate paths updated to `/desk`
- **`src/app/sitemap.ts`**, **`llms.txt`**, **`indexnow`:** `/work` and `/studio` URLs
- **`playbook-prompts/prompt_catalog.json`:** Sora 2 asset path corrections (build blocker fix)

---

## Desk runbook

Renamed `docs/studio-runbook.md` → `docs/desk-runbook.md`. All in-app copy and auth
callback redirects point at `/desk`.

---

## Verification

```bash
npm run build    # must pass; Pagefind index generated in postbuild
npm run lint
npm run start    # search + static pages — not npm run dev
```

Spot-check after deploy:

- `/desk/login` — admin gate (not indexed)
- `/studio`, `/work` — 200; old `/feature`, `/engage` 301
- `⌘K` search returns multi-page results
- Substack promo image in header loads

---

*Session end: 2026-06-18. Committed and pushed to `main` → Vercel auto-deploy.*
