# Changelog: 2026-02-13 - Portfolio Page Refactoring

## Overview
Refactored 8 portfolio pages to standardize the user experience. The primary goal was to combine the "hero" section (title, subhead, context) with the interactive "code experience" module (calculator, simulator, timeline, etc.) into a single, unified component. This pattern mirrors the `HeroBentoEngine` design.

## Changes by Page

### 1. 10-Touch Sales Play
- **Route:** `/portfolio/10-touch-sales-play`
- **Changes:**
  - Created `src/components/sales-play/SalesPlayCalendar.tsx` to encapsulate the calendar grid logic.
  - Created `src/components/sales-play/HeroSalesPlay.tsx` to combine the hero text with the calendar.
  - Updated page to use `HeroSalesPlay`.

### 2. 120-Day Content Journey
- **Route:** `/portfolio/120-day-content-journey`
- **Changes:**
  - Created `src/components/content-journey/HeroContentJourney.tsx`.
  - Integrated `JourneyMatrix` directly into the hero component.
  - Updated page to use `HeroContentJourney`.
  - Fixed data import issue in `HeroContentJourney`.

### 3. B2B Marketing Framework
- **Route:** `/portfolio/b2b-marketing-framework`
- **Changes:**
  - Updated `src/components/framework/HeroBentoDashboard.tsx`.
  - Refined styling to match the unified grid/gradient ambience of other hero components.

### 4. Behavioral Lead Scoring
- **Route:** `/portfolio/behavioral-lead-scoring`
- **Changes:**
  - Created `src/components/behavioral-scoring/BehavioralSimulator.tsx` (extracted logic from page).
  - Created `src/components/behavioral-scoring/HeroBehavioralScoring.tsx`.
  - Updated page to use the new modular components.

### 5. SaaS Revenue Calculator
- **Route:** `/portfolio/calculator`
- **Changes:**
  - Created `src/components/calculator/HeroCalculator.tsx`.
  - Embedded `SaasCalculator` into the hero.
  - Updated page to use `HeroCalculator`.

### 6. It's Good to Be Pitched
- **Route:** `/portfolio/its-good-to-be-pitched`
- **Changes:**
  - Created `src/components/storyboard/HeroStoryboard.tsx`.
  - Embedded `StoryboardViewer` into the hero.
  - Updated page to use `HeroStoryboard`.

### 7. Sovereign Personas
- **Route:** `/portfolio/sovereign-personas`
- **Changes:**
  - Created `src/components/sovereign-personas/HeroPersonas.tsx`.
  - Embedded `PersonaGallery` into the hero.
  - Updated page to use `HeroPersonas`.

### 8. Psylocke Timeline
- **Route:** `/portfolio/psylocke-timeline`
- **Changes:**
  - Created `src/components/psylocke-timeline/HeroTimeline.tsx`.
  - Embedded `Timeline` into the hero.
  - Updated page to use `HeroTimeline`.

## Technical Notes
- verified `npm run build` passes.
- All new components use the design system tokens (electric, ember, ash, charcoal).
- Standardized imports and consolidated logic where appropriate.
