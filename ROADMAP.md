# saren.ai — Roadmap

Living document. Updated as priorities shift.

---

## Up next (post-IA restructure, 2026-06-17)

Session shipped in `docs/changelogs/2026-06-17-ia-nav-search-restructure.md`. Immediate follow-ups:

- [ ] **Oblique Techniques hero** — create `public/images/feature/oblique-techniques-hero.png` (1200×630 OG; spec in `public/images/feature/README.md`)
- [ ] Verify `public/downloads/Saren-Sakurai-Resume.pdf` matches resume v03 content
- [ ] Decide: homepage "Featured Downloads" section markets 3 Coming Soon products —
      collapse to teaser or move below Case Studies until they ship
- [ ] About page dark-mode consistency pass (hero→timeline rely on global overrides)
- [ ] Mobile mega-menu promos don't render; `/fractional-marketing-lead` is
      footer-only on mobile — consider a mobile menu entry

---

## Completed (2026-06-17) — IA, nav, search, Pagefind

- [x] **Admin app** `/studio` → `/desk` — `(desk)` route group, `src/components/desk/`, proxy gate, runbook rename
- [x] **Editorial** `/feature` → `/studio` — 301 redirects; AI for Liberal Arts hub, Oblique Techniques page
- [x] **Work hub** `/engage` → `/work` — 301, canonicals, sitemap, nav CTAs
- [x] **Primary nav** — Work · Playbooks · Studio · About Me (clickable labels + 3-col mega menus); audience pages → footer
- [x] **Route groups** — public marketing under `(site)/`; static root `layout.tsx`; Substack RSS via `unstable_cache` in `(site)/layout.tsx`
- [x] **Pagefind** — 74+ pages indexed (was 1); Psylocke timeline indexing/metadata pass
- [x] **Search UX** — pill modal, lavender chrome, suggested searches, result ranking, site hotkeys (`⌘K`, `/`+letter)
- [x] **Config** — Substack CDN in `images.remotePatterns`; Sora 2 catalog path fix; indexnow/llms.txt/sitemap updates

---

## Up next (post-audit, 2026-06-12)

Full audit + remediation: `docs/changelogs/2026-06-12-site-audit-remediation.md`. All immediate follow-ups from that session are done (prod verified, Pagefind fixed in 2026-06-17 session, legal pages shipped). Open items moved to **Up next (post-IA restructure)** above.

---

## Completed (2026-06-12) — Site audit & remediation

- [x] Security: deleted unauthenticated `/api/upload-video`; Next 16.1.6 → 16.2.9
      (middleware-bypass CVEs); removed wildcard `images.remotePatterns`
- [x] Verified Supabase migration 003 lockdown live in prod (anon → 401 on all CRM tables)
- [x] Fixed redirect-shadowed static assets: `public/portfolio/*` was 308→404 for ALL
      OG images, persona PDFs, storyboards → moved to `public/images/portfolio/` +
      `public/downloads/personas/`; fixed hybrid-lead-scoring JSON-LD page URLs
- [x] `/downloads` retired: links → `/playbooks`, page deleted, sitemap cleaned
- [x] `/resume` page shipped + unified (hero CTA → page, PDF button on page, sitemap 0.9,
      footer, mega menu); section labels `<p>` → `<h2>`
- [x] About timeline reconciled with resume (canonical): Cylance title, CloudKitchens
      added, Trigger removed, agency-era spine matches; "Coming soon" pills removed
- [x] Custom 404 page; footer IA refresh; header active states; robots.txt single group
- [x] Cross-linking pass: case studies ↔ ai-orchestration ↔ tools; persona pages →
      proof + engagement model; signal-state → service page; 120-day ↔ Cylance page
- [x] Electric Blue fully retired (incl. two real rendered colors: WaveformHero canvas,
      BentoCard L3); banned-word copy cleanup; Wethos AI spelling unified
- [x] Decide: should `/smb`, `/solopreneurs`, `/thinkers`, `/work`, `/about/concerts` be
      in `sitemap.ts`? → Resolved: all present in sitemap as of 2026-06-12; `/engage` 301s to `/work`

---

## In progress — Commerce (next session)

- [ ] **RSC gate** — `/playbooks/[id]/page.tsx` reads `dlx_{id}` cookie, validates `cookie_token` + `expires_at` against `entitlements`, renders gated JSX server-side only
- [ ] **Download endpoint** — update `/api/download/[token]` to query `entitlements` table, enforce `expires_at`, increment `download_count` (analytics only)
- [ ] **Gen X playbook landing page** — copy, layout, free preview section, buy button UI on `/playbooks/genx-executive-ai-playbook`
- [ ] **Buy button** — nothing triggers checkout on `/playbooks/[id]` yet; ships with RSC gate

---

## Completed (2026-05-28) — Commerce & Paid Playbooks

- [x] Stripe integration — `stripe` package, live keys, webhook on `checkout.session.completed`
- [x] `/downloads` page — 4 products, Buy Now buttons, Stripe hosted checkout, `purchases` table, token-based delivery via Supabase Storage signed URLs
- [x] Supabase Storage `downloads` bucket — private, service role only
- [x] Paid playbook tier write path — `entitlements` table (two tokens: `cookie_token` gates page, `download_token` gates file), checkout route, webhook (raw body), success handler (sets HttpOnly `dlx_{id}` cookie, dual-write idempotency keyed on `session_id`)
- [x] Gen X Executive AI Playbook — Stripe product/price created (`price_1TbxuzCf1qdA5NGTt5gFpBSh`, $59), file uploaded to Supabase Storage, catalog entry added

---

## Completed (2026-03-17)

- [x] Code quality audit — type safety, unused imports, HTML sanitization
- [x] Sentry error tracking — client, server, edge configs + global error boundary
- [x] Vitest test suite — 88 tests across calculator math and behavioral scoring
- [x] Dynamic imports — calculator, ROI simulator, psylocke timeline, behavioral scoring
- [x] Bundle analyzer — `ANALYZE=true npm run build` to inspect chunks
- [x] ESLint cleanup — 88 → 3 errors, .vercel/scripts ignored, 51 entity fixes
- [x] Type safety — removed all `as any` except justified RSS parser cast
- [x] Cascading render fix — EngineOutcomes useState → useRef for prevRevenue

---

## Up next

### Commerce (deferred v1 scope)
- [ ] Magic-link email re-entry for multi-device access (data model already supports it — look up entitlement by email, re-set cookie)
- [ ] Upload files for legacy `/downloads` products (`gtm-execution-kit`, `fractional-cmo-dashboard`, `content-hook-bundle` — all have `filePath: null`)
- [x] Deprecate `/downloads` page — done 2026-06-12 (page deleted, route 301s to `/playbooks`, `/downloads/success` kept for legacy purchase links)

### Resilience & observability
- [ ] Configure Sentry DSN in Vercel env vars (needs Sentry account setup)
- [ ] Uptime monitoring (Vercel's built-in or Checkly) for critical paths
- [ ] Structured logging for API routes (replace remaining console.error)

### Testing expansion
- [ ] E2E smoke test for contact form submission (Playwright)
- [ ] Component tests for interactive tools (calculator inputs, tier list drag)
- [ ] Visual regression tests for key pages

### Performance
- [ ] Run `ANALYZE=true npm run build` and audit largest chunks
- [ ] Audit public/ assets — compress profile images (1080x1920 PNGs → WebP)
- [ ] Review Framer Motion impact on INP (Interaction to Next Paint)
- [ ] Consider converting `/about/stack` from full client component to server + dynamic client split

### SEO & content
- [x] Fix stale canonicals across all pages (2026-05-28)
- [x] Add canonical + OG + Twitter card to signal-state use-case sub-pages (2026-05-31)
- [x] Fix redirect ordering bug in `next.config.ts` (specific before catch-alls) (2026-05-31)
- [x] Redirect old Medium publication URLs (saren.ai was a Medium custom domain pre-2026) (2026-05-31)
- [x] Decide: should `/smb`, `/solopreneurs`, `/thinkers`, `/work`, `/about/concerts` be in `sitemap.ts`? → All in sitemap (resolved by 2026-06-12; `/engage` → `/work` 2026-06-17).
- [ ] Investigate "Crawled — currently not indexed" pages (14 pages) via Search Console export — likely thin content on some `/playbooks/[id]` pages.
- [ ] OG images: most pages reference `/og/playbooks-{id}.jpg` etc. that don't exist in `public/` — generate or update to a real fallback image.

### Data integrity
- [ ] Evaluate SQLite persistence on Vercel serverless (ephemeral risk)
- [ ] Consider Turso or Vercel Postgres if contact form DB matters beyond email
- [ ] Add environment variable validation on startup (fail fast if RESEND_API_KEY missing)

### DX & maintenance
- [ ] Audit `class-variance-authority` usage — adopt more broadly or remove
- [ ] Clean up `psylocke-backstory/` in public/ if not serving live pages
- [ ] Move `playbook-prompts/` to separate content repo if it keeps growing (31 MB)
- [ ] Address 3 remaining `setState in effect` lint errors (mount-only patterns — low priority)

---

## Ideas (unscheduled)

- Additional paid playbooks using the same entitlement infrastructure
- Auto-responder email for contact form submissions (commented-out code exists)
- HubSpot chat integration (TODO in ContactClient)
- Dark mode color audit against WCAG AAA
- Component storybook
- Analytics dashboard for playbook/tool engagement
- A/B test hero copy / CTA variants

---

*Last updated: 2026-06-18*
