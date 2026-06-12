# 2026-06-12 — Full Site Audit & Remediation

Four-subagent audit (security · UX/content · navigation · link integrity) followed by
a same-session remediation pass. Four commits: `319d86b` (security), `a107ffd` (broken
links/assets), `cd606cc` (content/resume), `bf23496` (nav/cross-links). **Committed
locally, not pushed** — push deploys via Vercel.

---

## Security

| Finding | Action |
|---|---|
| `/api/upload-video` — unauthenticated public upload to Vercel Blob, no size/type limits | **Deleted.** Unused; `scripts/upload-videos.ts` uploads directly |
| Next 16.1.6 — middleware-bypass + Server Actions CSRF CVEs (the `/studio` gate lives in middleware) | Upgraded to **16.2.9**. Remaining 3 npm-audit moderates are postcss bundled inside Next — no sane fix; accepted |
| `images.remotePatterns: hostname "**"` — made `/_next/image` an open proxy | Removed entirely; no remote images in use. Add specific hosts if ever needed |
| Migration 003 (auth lockdown) applied in prod? | **Verified live**: anon key gets 401 on all CRM tables + `v_pipeline`; service role sees data (168 contacts). Locked down ✓ |

Audit found solid: Stripe signature verification, two-token entitlement design
(unforgeable `dlx_` cookie + 60s signed URLs), service-role key never in client code,
`getUser()` (not `getSession()`) in proxy, no secrets in source/history.

**Accepted risks (documented, not fixed):**
- `send-otp` rate limiter is in-memory per-lambda — acceptable because OTPs only go to 3 allowlisted emails.
- `indexnow` endpoint fails open when `CRON_SECRET` unset — only submits hardcoded public URLs.
- CSP `unsafe-inline`/`unsafe-eval` — required by Next + GTM + Sentry; nonce migration out of scope.

## Broken links — root cause: redirects shadow public/ files

`redirects()` in `next.config.ts` runs **before** public-file serving. The
`/portfolio/:slug*` catch-all was 308→404ing **every asset** under
`public/portfolio/` — persona PDFs, all case-study/playbook OG images, on-page
storyboard images (verified live). Fix:

- `public/portfolio/` → `public/images/portfolio/` (OG images, storyboards, dashboard screenshots)
- persona PDFs + thumbnails → `public/downloads/personas/`
- All ~30 references updated incl. JSON-LD `image` URLs
- `hybrid-lead-scoring` JSON-LD `@id`/`url`/breadcrumb still pointed at the old `/portfolio/` page route — fixed to `/playbooks/`

**Rule going forward: never store static assets under a path prefix that has a catch-all redirect.**

Also: six `/downloads` links → `/playbooks`; `/downloads` removed from sitemap,
`/resume` added (priority 0.9); dead `src/app/downloads/page.tsx` and
`src/app/about/brand/` deleted (both intercepted by their own redirects).

## Content & credibility

- **About timeline now mirrors the June 2026 resume exactly** (resume = canonical):
  Cylance title corrected to "Director of Marketing", CloudKitchens added, Trigger
  removed, Perficient/JUXT/AKQA spine matches. "Coming soon" metric pills removed.
- Resume 300% MQL attribution corrected to SEO + intent-data (matches v03 source).
- Resume page: PDF download button added, section labels converted `<p>` → `<h2>`
  (proper document outline for AEO), closing cross-links to case studies/about.
- Hero CTA now points to `/resume` (page is the SEO/AEO asset; PDF lives on it).
- Banned-word cleanup: "Unlock"→"Get" (BuyButton), "leverage" purged from hero/menu/
  solopreneurs metadata, "Deep dive"→"Full breakdown", "What We'd"→"What I'd".
- "Wethos AI" spelling unified; client teaser alt text uses brand names;
  "View all 26 brands" count fix; emoji → Lucide icons on About.
- Contact hero photo hidden `< sm` (headline squeeze fix).

## Navigation

- **`src/app/not-found.tsx` added** — branded 404 with recovery links (heavy
  Medium-era redirect surface made the default 404 a real cost).
- Footer: + Work With Me, Fractional Marketing Lead, AI Orchestration, Signal State,
  Resume; `/feature` orphan resolved; Concert Log added; empty legal container removed.
- Header: active-section states via `usePathname` + `aria-current`; desktop mega menu
  CTA now "View All Case Studies" → `/case-studies` (was Client Brands).
- robots.txt consolidated to a single `User-agent: *` group (strict parsers only
  honor the first group).
- Dead code removed: `HalcyonTab.tsx`, `TopBanner` import, legacy mega-menu aliases.

## Cross-linking pass

- Case studies → `/ai-orchestration` (shared `ConsultingCTA` + intent-data closing CTA)
- intent-data → hybrid-lead-scoring tool; executive-dashboard → roi-simulator
- Persona pages (smb/solopreneurs/thinkers) → case studies + `/fractional-marketing-lead`
- signal-state + framework → `/ai-orchestration`
- 120-day-content-journey ↔ `/about/work/cylance`

## Electric Blue fully retired

All `shadow-electric`/`ring-electric` classes (compiled to nothing — token never
registered), golden-dashboard `color="electric"` props, and two **real rendered
colors**: the homepage `WaveformHero` canvas mid-gradient was literally `#2F6D8E`
(the banned hex) and the framework `BentoCard` L3 was cyan — both now lavender.
**Visible changes; eyeball the homepage hero and /signal-state framework page.**

## Decisions made

1. **Resume is canonical** for all career history; About mirrors it.
2. Hero links the `/resume` page, not the PDF; PDF download lives on the page.
3. `/downloads` route fully retired (page deleted; `/downloads/success` kept for
   legacy purchase links; `public/downloads/` still serves static files).
4. Contact page SEO h1 left as-is (deliberate SEO-repair artifact).
5. Homepage "Featured Downloads" (3 Coming Soon products) left as-is — content
   strategy decision, not a fix.
6. No legal pages invented; empty footer container removed instead.

## Next steps (carried to ROADMAP)

- [ ] **Push + verify in prod**: persona PDFs download, OG images render (re-scrape
      LinkedIn/X debuggers — social caches hold the old 308 URLs), hero waveform color.
- [ ] **Pagefind only indexed 1 page** at build time — `await headers()` in
      `layout.tsx` forces all routes dynamic, so there's no static HTML to index.
      Site search is effectively empty. Investigate (likely predates this session).
- [ ] Privacy policy + Terms pages (site runs Stripe checkout).
- [ ] Decide fate of homepage "Featured Downloads" Coming Soon section.
- [ ] Verify `/downloads/Saren-Sakurai-Resume.pdf` content matches resume v03.
- [ ] About page dark-mode consistency pass (hero→timeline sections rely on global
      overrides; "My Stack" onward declares `dark:` properly).
- [ ] Mobile mega-menu promo CTAs don't render — `/fractional-marketing-lead`
      reachable on mobile only via footer now; consider a mobile menu entry.
