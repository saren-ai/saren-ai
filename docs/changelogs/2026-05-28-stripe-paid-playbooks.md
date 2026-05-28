# 2026-05-28 — Stripe Integration & Paid Playbook Tier

## What shipped

### Phase 1 — /downloads page (legacy, live)
- Live `/downloads` route with 4 products (GTM Execution Kit $499, Fractional CMO Dashboard $99, Content Hook Bundle $49, Gen X Executive AI Playbook $59)
- Buy Now buttons → `POST /api/checkout` → Stripe hosted checkout → `/downloads/success`
- `purchases` table in Supabase with token-based download delivery (5 downloads, 30-day expiry)
- `/api/download/[token]` generates 60s signed Supabase Storage URLs
- `genx_executive_ai_playbook.zip` uploaded to Supabase Storage `downloads` bucket

### Phase 2 — Paid playbook tier (write path done, gate pending)
Complete rewrite of the commerce layer to embed paid tiers into `/playbooks/[id]` rather than a separate store route. Architecture per brief:

**Entitlements table** (`scripts/entitlements-migration.sql`):
- Two separate tokens: `cookie_token` (gates page rendering) and `download_token` (gates file delivery)
- `expires_at` is the server-side validity boundary — cookie `Max-Age` is client convenience only
- `download_count` is analytics only, never an enforcement cap
- Idempotency keyed on `session_id` (Stripe session), not `playbook_id`

**Purchase chain**:
1. Buy click → `POST /api/checkout` with `{ playbookId }` → Stripe hosted checkout (uses pre-created `priceId`, not inline `price_data`)
2. `checkout.session.completed` webhook → INSERT into `entitlements` (idempotent upsert)
3. Success redirect → `GET /playbooks/[id]/success?session_id=...` (Route Handler)
4. Success handler: verifies `payment_status === 'paid'` with Stripe, dual-writes entitlement (idempotent), sets `dlx_{playbook_id}` HttpOnly cookie, redirects to `/playbooks/{id}`

**Key architectural decisions**:
- Server-side gate only — no client-side blur/display:none. Gated JSX never ships to unauthenticated browsers.
- Webhook raw body: `req.text()` not `req.json()` (Stripe signature verification footgun on Vercel)
- Multi-device is a consciously accepted limitation for v1. Success URL contains `session_id` and re-sets the cookie — it's a forwardable bearer token with blast radius capped by `expires_at`. Success page copy: "Bought on another device? Re-open this page there to restore access."
- Magic-link email re-entry deferred; data model already supports it (look up by email, re-set cookie)

**New files**:
- `src/lib/stripe.ts` — lazy Stripe singleton (avoids build-time instantiation with empty key)
- `src/lib/playbook-tiers.ts` — `PAID_TIERS` map of `playbook_id → { priceId, storageKey }`
- `src/lib/supabase/admin.ts` — service role Supabase client for server-side writes
- `src/lib/products.ts` — products config for legacy `/downloads` page
- `src/app/api/checkout/route.ts` — handles both `playbookId` (new) and `productId` (legacy) flows
- `src/app/api/webhooks/stripe/route.ts` — writes entitlements on `checkout.session.completed`
- `src/app/playbooks/[id]/success/route.ts` — cookie-setting success handler
- `src/app/downloads/` — full downloads page + success page (legacy flow)
- `scripts/stripe-downloads-migration.sql` — `purchases` table + storage bucket + policy
- `scripts/entitlements-migration.sql` — `entitlements` table

**New env vars** (in `.env.local` and Vercel):
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

**Stripe configuration**:
- Webhook endpoint: `https://saren.ai/api/webhooks/stripe` listening on `checkout.session.completed`
- Gen X Executive AI Playbook: `prod_UbAF1BVS2BjjzM` / `price_1TbxuzCf1qdA5NGTt5gFpBSh` ($59)

## What's NOT done yet (next session)

- **RSC gate** — `/playbooks/[id]/page.tsx` needs to read `dlx_{id}` cookie, validate `cookie_token` + `expires_at` against `entitlements` table, and conditionally render gated JSX server-side
- **Download endpoint** — `/api/download/[download_token]` needs to be updated to query `entitlements` table (currently queries `purchases`)
- **Gen X playbook landing page** — catalog entry exists with empty steps array; needs copy, layout, free preview section, and buy button UI
- **Buy button UI** — nothing on `/playbooks/[id]` triggers checkout yet; gate and button ship together
- **Legacy products file paths** — `gtm-execution-kit`, `fractional-cmo-dashboard`, `content-hook-bundle` all have `filePath: null` in `products.ts`; files not yet uploaded to Supabase Storage

## Supabase tables now in use

| Table | Purpose |
|---|---|
| `purchases` | Legacy `/downloads` flow — token-based delivery, 5-download cap |
| `entitlements` | Paid playbook tier — two tokens, expires_at gate, analytics-only download count |
| `contacts` + related | Hustle & Flow CRM (unrelated) |
