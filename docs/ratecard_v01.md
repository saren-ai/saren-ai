# Brief: password-protected rate card at /ratecard

## Objective
Add a page at saren.ai/ratecard that serves the Fire Horse rate card behind a
single shared passphrase. No user accounts.

## Stack
Confirm from the repo before building. Assuming Next.js (App Router) on Vercel.
If it's a different setup, adapt — but keep the core principle intact: the
password is verified server-side and never reaches the client.

## Protection (server-side only)
- Gate /ratecard with middleware (middleware.ts).
- Env vars (Vercel project env, never committed):
  - RATECARD_PASSWORD — the shared passphrase
  - RATECARD_TOKEN — an unrelated random secret used as the cookie value
- Flow:
  1. Request to /ratecard → middleware checks for cookie `ratecard_auth`.
  2. If cookie value !== RATECARD_TOKEN → rewrite to /ratecard/unlock.
  3. Unlock form POSTs to a route handler (app/api/ratecard-unlock/route.ts).
  4. Handler compares submitted passphrase to RATECARD_PASSWORD using a
     timing-safe comparison.
  5. On match → set cookie `ratecard_auth` = RATECARD_TOKEN, httpOnly +
     secure + sameSite=lax, maxAge ~30 days → redirect to /ratecard.
- Never store the password itself in the cookie, and never check it in browser JS.
- Middleware only ever compares the cookie to RATECARD_TOKEN. The password is
  touched once, in the route handler.

## Content
- Port saren-rate-card.html (design source of truth) faithfully into
  app/ratecard/page.tsx: dark sumi hero, washi body, vermilion→lavender tier
  rail, 七狐 seal, Fraunces + Space Grotesk.
- Fonts via next/font or the repo's existing font setup. Preserve the
  responsive and print styles already in the file.

## Unlock page (on-brand, not a browser dialog)
- Sumi (#16110F) background, vermilion (#E34234) accent, 七狐 seal.
- One passphrase field + "Unlock" button.
- Wrong passphrase → inline error in the brand voice ("That's not it."), no
  browser alert, no full reload jank.

## Acceptance criteria
- /ratecard with no/invalid cookie shows the unlock page, never the rate card.
- Correct passphrase unlocks; refresh stays unlocked for the cookie lifetime.
- Password appears nowhere in the client bundle or any response body.
- Renders on mobile; prints cleanly.

## Out of scope
No accounts, no database, no Supabase. One shared passphrase for everyone.