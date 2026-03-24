# saren.ai — Roadmap

Living document. Updated as priorities shift.

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
- [ ] Consider converting `/about/stack` page from full client component to server + dynamic client split

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

- Auto-responder email for contact form submissions (commented-out code exists)
- HubSpot chat integration (TODO in ContactClient)
- Dark mode color audit against WCAG AAA
- Component storybook
- Analytics dashboard for portfolio tool engagement
- A/B test hero copy / CTA variants

---

*Last updated: 2026-03-17*
