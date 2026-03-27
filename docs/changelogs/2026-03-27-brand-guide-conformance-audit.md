# 2026-03-27 — Brand Guide, Margin Standardization & Full Conformance Audit

## New Pages & Features

- **`/brand` (Brand Style Guide)** — Living design system reference with 8 sections: color tokens with programmatic WCAG contrast ratios, typography scale, spacing/layout documentation, button/element catalog, taxonomy, iconography inventory (59 Lucide icons), animation patterns, and page margin visual diagram. Hero uses `.hero-card` with Fire Horse 2026 branding.
- **Skill download infrastructure** — Added `skill?: string` field to Playbook/Prompt interfaces, created `DownloadSkillButton` component, wired into playbook detail pages. Skills stored in `public/skills/`.
- **Brand Style Guide Page Builder playbook** — Added to Creative category in `playbook-prompts/` with downloadable Claude Code skill.

## Margin Standardization

- **Hero card** (`globals.css`): Changed from fixed pixel margins to responsive percentage-based width: `90% → 85% → 80%`, max 1200px, matching nav and content containers.
- **Header nav pill** (`Header.tsx`): Updated to `w-[90%] sm:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto` to match hero card width system.

## Full Brand Conformance Audit (40+ files)

### Color Violations (196+ fixes)
Replaced all `neutral-*`, `zinc-*`, `gray-*`, `blue-*`, and raw hex values with design system tokens (`text-charcoal`, `text-slate`, `text-electric`, `text-ember`, `bg-ash`, `bg-offblack`, `border-charcoal/10`, etc.).

**Files:** AlternativePathways, BidirectionalInputs, FunnelDisplay, IndustryComparison, OptimizationSuggestions, PerformanceDashboard, DashboardFlow, LeadScoringContainer, StageConnector, HeroBentoEngine, BentoCard, CodeWindow, PromptDetailView, PromptModal, BentoGrid, SitemapVisualizer, FrameworkExplorer, HeroBentoDashboard, InteractiveTimeline, ProcessNavigator (x2), ArchitectureDiagram, FrameworkClient, OrgAlignmentClient, CybersecurityClient, IndependentCreativeClient, IntentDataClient, DynamicNurtureClient, authority-engineering/page, PortfolioPageContent, CalculatorClient, ContentJourneyClient, ItsGoodToBePitchedClient, focus-rail, CodeBlock, navigation-menu, SignalStateClient, AboutClient, ClientsPageContent, HalcyonClient, FaqClient, HomeClient, PersonaDrawer, PersonaCard, RelatedWork, OutcomeMetrics, PortfolioCard, CaseStudyHero, ContactClient

### Button Violations (9 fixes)
Replaced inline Tailwind button styles with `.btn-primary`, `.btn-secondary`, `.btn-secondary-dark` classes. Fixed dark-section CTAs using wrong variant.

### Layout Violations (5 fixes)
- Replaced undefined `container-wide` class with `container-narrow` in ClientsPageContent, HeroTimeline, HeroStoryboard
- Removed redundant `max-w-[1200px] mx-auto px-4 md:px-6` from HomeClient (already handled by `container-narrow`)
- Replaced `container px-4 md:px-6` with `container-narrow` in HeroCalculator

### Inline SVG Violations (9 fixes)
Replaced inline SVG icons with Lucide React equivalents: `Check` (ROI simulator), `Mail`/`Clock` (ContactClient), `ArrowRight` (playbooks page).

### Stagger Delay Violations (18 fixes)
Normalized animation stagger delays to `index * 0.05` pattern across grids and lists.

### Exceptions (intentional)
- LinkedIn brand color `#0077B5` — brand compliance requirement
- macOS traffic light colors (`#FF5F56`, `#FFBD2E`, `#27C93F`) — platform-accurate UI mockup

## Mega Menu
- Added "Brand Guide" link to About section in `src/lib/mega-menu-content.ts`

## Build
`npm run build` passes with no new errors. Pre-existing ENOENT warnings on Sora 2 prompt files remain (unrelated).
