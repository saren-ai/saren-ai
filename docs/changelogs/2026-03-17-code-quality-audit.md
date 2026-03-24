# Changelog: Code quality audit & comprehensive improvements

**Date:** March 17, 2026

## Overview

Full codebase audit, cleanup, and infrastructure improvements. Type safety fixes, error tracking, test suite, dynamic imports, ESLint cleanup, and bundle analysis tooling.

## Round 1: Type safety & security

### Type safety fixes

- **`src/app/contact/ContactClient.tsx`** — `catch (err: any)` → `catch (err: unknown)` with `instanceof Error` guard.
- **`src/lib/behavioral-scoring.ts`** — Created `factorIdToProfileKey` mapping to replace fragile `as any` + string manipulation pattern. Fixed latent bug where `"company-size"` was mapping to `"companysize"` instead of `"companySize"`.
- **`src/components/behavioral-scoring/FitScoreBreakdown.tsx`** — Same mapping fix for both read and write paths.
- **`src/components/framework/PromptDetailView.tsx`** — Removed unused `ExternalLink` import.

### Security: HTML injection prevention

- **`src/app/api/contact/route.ts`** — Added `esc()` helper to sanitize user input before embedding in notification email HTML. Replaced `console.error` with `Sentry.captureException()`.

## Round 2: Error tracking (Sentry)

- **`sentry.client.config.ts`** — Client-side init (tracesSampleRate 0.1, replaysOnErrorSampleRate 1.0)
- **`sentry.server.config.ts`** — Server-side init
- **`sentry.edge.config.ts`** — Edge runtime init
- **`src/app/global-error.tsx`** — Global error boundary with Sentry capture
- **`next.config.ts`** — Wrapped with `withSentryConfig()`
- **`src/app/api/contact/route.ts`** — All error paths now report to Sentry with context tags

**Env vars needed:** `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`

## Round 3: Test suite (Vitest)

- **`vitest.config.ts`** + **`src/test/setup.ts`** — Vitest config with jsdom, path aliases, testing-library matchers
- **`src/lib/calculator/__tests__/funnel-calculations.test.ts`** — 48 tests covering all calculation functions, edge cases, formatting utilities
- **`src/lib/__tests__/behavioral-scoring.test.ts`** — 40 tests covering fit scoring, engagement scoring, state transitions, data integrity
- **`package.json`** — Added `test` and `test:watch` scripts

**88 tests, all passing.**

## Round 4: Performance

### Dynamic imports

- **`src/app/portfolio/calculator/page.tsx`** — `CalculatorClient` dynamically imported with loading skeleton
- **`src/app/portfolio/roi-simulator/page.tsx`** — `HeroBentoEngine` dynamically imported
- **`src/app/portfolio/psylocke-timeline/page.tsx`** — `PsylockeTimelineClient` dynamically imported
- **`src/app/portfolio/behavioral-lead-scoring/page.tsx`** — `BehavioralScoringClient` dynamically imported

### Bundle analyzer

- **`next.config.ts`** — Added `@next/bundle-analyzer` (run with `ANALYZE=true npm run build`)

## Round 5: ESLint cleanup

### Config improvements

- **`eslint.config.mjs`** — Added `.vercel/**`, `scripts/**`, `*.mjs`, `src/data/seed-concerts.js` to ignore list

### Unescaped entity fixes (51 violations → 0)

Fixed `'` → `&apos;` and `"` → `&quot;` in JSX text across 14 files:
- `ClientsPageContent.tsx`, `AIOperationsClient.tsx`, `ProspectTable.tsx`, `SalesPlayClient.tsx`, `ContentJourneyClient.tsx`, `authority-engineering/page.tsx`, `BehavioralScoringClient.tsx`, `CalculatorClient.tsx`, `roi-simulator/page.tsx`, `EngagementSimulator.tsx`, `CellDrawer.tsx`, `HeroBentoDashboard.tsx`, `DashboardFlow.tsx`

### Other lint fixes

- **`BrandClient.tsx`** — Fixed JSX comment syntax (line 160)
- **`B2BFrameworkClient.tsx`** — `let` → `const` for `finalMarkdown`
- **`BentoCard.tsx`** — Fixed JSX comment in template literal
- **`PromptModal.tsx`** — Fixed JSX comment syntax
- **`ProspectTable.tsx`** — `let` → `const` for `sortableItems`
- **`input.tsx`** — Empty interface → type alias
- **`EngineOutcomes.tsx`** — Replaced `useState` + `setPrevRevenue` cascading render with `useRef` pattern
- **`GuidedLogicOverlay.tsx`** — Replaced `any` prop type with proper `TooltipCardProps` interface
- **`InteractiveTimeline.tsx`** — Typed `handleDragEnd` parameters (was `any, any`)
- **`EngineInputs.tsx`** — Typed `handleSliderDrag` parameters (was `any, any`)

### Remaining (3 acceptable patterns)

- ThemeProvider, HeroBentoEngine, B2BFrameworkClient — `setState` in mount-only effects for hydration from localStorage/URL params. Standard React pattern.

## Final state

- **Lint:** 88 → 3 errors (all mount-only setState, acceptable)
- **Tests:** 88 passing
- **Build:** Clean, all 65 routes
