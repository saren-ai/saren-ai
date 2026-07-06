# Brief 02 — saren.ai `/oc` one-pager

**For:** Claude Code, working in the saren.ai repo (Next.js)
**Depends on:** Brief 01 (uses the same identity line and Audit offer; ship after or alongside)
**Goal:** Post-handshake landing page for Orange County networking. Saren meets a founder/CEO/CRO at an incubator event, follows up with one link (or QR on a card). The page closes the loop in under a minute: who he is → proof → book. This page does the job the homepage can't — zero navigation decisions, one action.

---

## 1. Page spec

- Route: `/oc`
- Indexed: yes (it doubles as local-SEO surface for "GTM consultant Orange County")
- Nav: **minimal header** — logo → home, single `[Book a Call]` button. No full nav; the page is a corridor, not a lobby.
- Footer: slim variant — LinkedIn, email, © line. No Personal Vault, no link farm.
- Length: one viewport of copy + proof bar + inline Calendly. Nothing below the embed.
- Must render fast on mobile — this gets opened from a conference-floor follow-up text.
- Title tag: `Saren Sakurai | GTM Engineer, Orange County`
- Meta description: `Orange County GTM engineer. Fixed-price GTM audits and fractional marketing leadership for OC startups and revenue teams. Book 30 minutes.`
- OG image: reuse home OG for now.

## 2. Copy (verbatim)

### Hero

- Eyebrow: `Orange County, CA`
- H1: `Good meeting you.`
- Body:

  > I'm Saren — a GTM Engineer based here in OC. I build the demand system that turns marketing spend into repeatable pipeline: signal, scoring, content, and AI wired into one engine. 20+ years, AKQA to Cylance ($1.4B exit), now working with OC startups and revenue teams in person.

### Proof bar

Same four stats as homepage (BlackBerry 8:1 · Qwiet AI 70% CAC · Cylance $4M · Wethos 344%). Reuse the component.

### Offer block

H2: `Where most OC conversations start`

Two cards only:

1. **GTM Systems Audit** — `Fixed price · 2 weeks` — "A teardown of your funnel, stack, and spend. You get a scored gap map and a build sequence — run it yourself or hire me to run it. Built for seed-stage and incubator cohorts." Price: `[PRICE — same as Brief 01]`
2. **Fractional Marketing Lead** — `10–20 hrs/week` — "Ongoing system building and GTM execution for teams past $1M ARR that need senior leadership without the full-time hire."

One line below cards: `Incubators & accelerators: I also run GTM workshops and office hours for cohorts — ask.` ← this is the referral hook for program directors; do not cut.

### Booking

H2: `30 minutes, no pitch deck`

> Tell me what's working and what isn't. I read whatever you send beforehand, so we skip background and get straight to the system.

**Calendly embedded inline** (calendly.com/sarenai). Below embed, one fallback line: `Prefer email? saren@saren.ai` (use the existing email-protection pattern).

## 3. Acceptance checklist

- [ ] Zero nav decisions: only exits are logo→home and Book a Call→embed anchor
- [ ] Calendly inline, loads without layout shift
- [ ] Whole page readable in <60s on mobile; no section below the embed
- [ ] Incubator/accelerator line present in offer block
- [ ] QR-test: page usable when arrived at cold with no context
- [ ] `/oc` added to sitemap
