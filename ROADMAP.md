# saren.ai — Roadmap

Living document. Updated as priorities shift.

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
- [ ] Consider deprecating `/downloads` page once paid playbook tier is the canonical commerce surface

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
- [ ] Add RSS autodiscovery link for `/thinking` feed
- [ ] Add structured data (Article schema) to `/thinking` posts
- [ ] Review and update all page-level metadata descriptions

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
- Analytics dashboard for portfolio tool engagement
- A/B test hero copy / CTA variants

---

*Last updated: 2026-05-28*
