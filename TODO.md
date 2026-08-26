# TODO — Three-Surface Proof of Concept

Immediate, concrete next actions for turning saren.ai into the Human / Machine / Agent
three-surface demo (see `ROADMAP.md` → "The Three-Surface Plan" for the full picture).
Ordered roughly by sequence — verification closes out before new build starts.

## Verify the current site (Surface 1 — Human / Record)

- [ ] Re-run `npx is-agentic saren.ai` once its report cache clears (it serves a cached
      report rather than forcing a fresh scan) to confirm the 2026-08-25 Cloudflare
      `ai_bots_protection` fix actually lifted the WAF block under real conditions
- [ ] Check Cloudflare Security Analytics on the saren.ai zone for real ClaudeBot/GPTBot/
      PerplexityBot hits in the days after 2026-08-25 — confirms crawlers are actually
      finding the site again, not just theoretically unblocked
- [ ] Re-verify JSON-LD, sitemap, metadata, and Organization schema checks pass now that
      the WAF isn't intercepting the scanner — most of the 12 "recommended" failures from
      the 2026-08-25 `is-agentic` scan were almost certainly false negatives caused by the
      block itself, not real gaps (the site already has all of these per `AGENTS.md`)

## Close the genuine gaps the scan found

- [x] Markdown content negotiation — **discovered already built and already deployed**
      (`src/proxy.ts` + `src/lib/agent-markdown.ts`, not documented anywhere before
      2026-08-26) but broken in production: every `Accept: text/markdown` request
      returned Cloudflare's "Just a moment..." challenge page, 100% reproducible,
      because `serveMarkdown()` re-fetched the page through the public `saren.ai`
      domain (through Cloudflare) instead of calling the app directly. Fixed by
      fetching via `process.env.VERCEL_URL` (Vercel's direct deployment host, bypasses
      Cloudflare) instead of the public origin, falling back to the request's own
      origin in local dev. Also added the missing `Vary: Accept` header (previously
      only `accept-encoding`), closing the `is-agentic` compliance gap for real.
      **Not yet verified live** — `VERCEL_URL` only exists on an actual Vercel
      deployment, and this checkout's dev server can't run locally (`#`-path bug).
      Confirm post-deploy: `curl https://saren.ai/case-studies/sovereign-personas -H
      "Accept: text/markdown"` should return real converted markdown, not the
      challenge page; also watch for Vercel Deployment Protection potentially gating
      the `VERCEL_URL` host itself, which would be a different failure mode needing a
      separate fix (a protection-bypass token).
- [x] `src/app/openapi.json/route.ts` — OpenAPI 3.1 spec covering the two
      `/api/record/*.json` exports and `/llms.txt`. Deliberately scoped to the
      public/machine-facing surface only — checkout, webhooks, and admin auth routes
      are intentionally not documented here, this isn't a general integration API
- [x] `/about` and `/contact` sanity-checked (2026-08-26) — both pages' source content
      runs well past 500 chars (about ~16.5k stripped-tag chars across `page.tsx` +
      `AboutClient.tsx`, ~4k for contact). Not a rigorous SSR-output check, but high
      confidence this was a false negative from the WAF block, not a real gap — the
      scan couldn't even reach the homepage, let alone /about or /contact

## Build the content layer (prerequisite for everything below) — Phase 1 done 2026-08-26

Decided 2026-08-25 — see `ROADMAP.md` → "The foundational call." Corrected after
exploration (2026-08-26): this isn't MDX/frontmatter — nothing here is prose that
needs an authoring format. It's Zod-validated TS data modules, matching the repo's
existing convention (`faqs.ts`, `testimonials.ts`, `portfolio-data.ts`, etc.).

- [x] `src/lib/case-studies.ts` — `CaseStudyRecordSchema` (Zod) + `CASE_STUDIES`,
      single source for all 8 case studies, replacing 3 of the 4 lists that had drifted
      independently (`CaseStudiesPageContent.tsx`'s inline array, `case-studies/page.tsx`'s
      hand-written `ItemList` JSON-LD, `llms.txt/route.ts`'s hardcoded case-studies
      section — all three now generate from `CASE_STUDIES`)
- [x] `src/app/api/record/playbooks.json/route.ts` — JSON export of `getActivePlaybooks()`
      + `PAID_TIERS`, with full step content included for free playbooks only (fetched
      once at build time via the existing `getPlaybookWithContent()`, so the *output* is
      a static blob — no runtime `fs` access needed by any downstream consumer)
- [x] `src/app/api/record/case-studies.json/route.ts` — same pattern as playbooks,
      serves `CASE_STUDIES.map(toPublicRecord)` (id/name/tagline/category/highlights/url,
      no full body — matches the "thin record only" scope). Content layer phase is now
      complete: both JSON exports exist, ready for Surface 3 to consume.
- [ ] Full case-study body extraction — explicitly **not** happening. 6 of 8 case
      studies are bespoke interactive builds (persona gallery, tabbed data explorer,
      bento dashboard, hand-drawn diagram, 2 long-form essays), not prose — rewriting
      them into a shared content format would be a high-risk six-app rewrite for no
      benefit, given Surface 3 only needs thin records
- [ ] Playbook step content still lives behind `fs.readFile` in `playbooks.ts` itself —
      unchanged, still fine for Vercel/Node. Only the *export* (above) is
      filesystem-free; if `/api/mcp` moves to a literal Worker later, it should read
      from the export, not from `playbooks.ts` directly
- [ ] JSON-LD regeneration from structured data: done for case studies' `ItemList` only.
      Each case study's own `page.tsx` metadata/`work`/`article` fields are still
      hand-authored per page — left alone deliberately, since meta descriptions may
      intentionally differ from index taglines
- [x] `sora2-samurai-creative-series` playbook removed entirely (2026-08-26, Saren's
      call — it was a test, not a supported playbook). Deleted from
      `prompt_catalog.json` (the playbook entry, its 4 `prompts.active` entries, and
      corrected the now-stale `meta` counts), removed its source files/folders under
      `playbook-prompts/`, and dropped its `sitemap.ts` entry. This also resolves the
      broken-file-path finding below it used to report on.
- **Found, not fixed (pre-existing, out of scope):** `portfolio-data.ts`'s
  `portfolioItems` is a *different*, broader list (5 of the 8 case studies plus 4
  interactive tools plus 2 `/playbooks/*` pages), used only by `RelatedWork`
  cross-linking — not a clean subset of `CASE_STUDIES`, left untouched.
- **Environment note:** `npm run dev` also hits the documented `#`-in-path issue (a
  Turbopack/Tailwind CSS load failure, `ERR_INVALID_ARG_VALUE` on a null-byte-mangled
  path), not just `build`/`test` as previously documented — verified 2026-08-26 while
  trying to smoke-test this phase live. `AGENTS.md`'s environment-limitation note should
  be updated to say "dev/build/test" instead of "build/test."

## Surface 2 — retired 2026-08-26

Was briefly `records.saren.ai` (Astro on Cloudflare Workers, repo
`saren-ai/records-saren-ai`, scaffolded and pushed, build green on CI, deploy never
completed). Retired the same day: the content it served (Gen X concert history, comic
tracking) belongs to much richer, independent systems — `@j-comics` and
`@Brain/genx-canon` — being planned on their own, not as saren.ai subdomains. Nothing
left to track here.

## Surface 3 — port `/api/mcp` to a Cloudflare Worker, expand its tools

- [ ] Swap the `fs`-based playbook loader for the JSON export / HTTP calls (Workers-
      compatible); confirm Supabase + Voyage calls work fine from a Worker (they're
      just HTTP)
- [ ] Add transactional tools beyond the existing 3 read-only ones: check playbook
      availability, get current pricing, start a contact/booking flow
- [ ] Design each new tool's input/output schema to map cleanly onto ACP/AP2/UCP
      "offer"/"availability" concepts, so future standardization is a schema alignment,
      not a rewrite
- [ ] Needs the Cloudflare token's DNS:Edit permission (deferred 2026-08-25) once
      `mcp.saren.ai` is actually being wired up

---

*Scope: this file tracks only the three-surface proof-of-concept initiative. General
site backlog (commerce, performance, testing, etc.) stays in `ROADMAP.md`.*
