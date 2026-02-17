# Changelog: Demand Machine Overview Refactor

**Date:** February 16, 2026
**Author:** Saren.ai (Assistant)

## Overview

Refactored the `/demand-machine` overview page to implement a "Vertical Blade" layout, replacing the previous grid of cards. This new layout features large, interactive marquee components for each step of the Demand Machine process, arranged in a zig-zag visual pattern.

## Key Changes

### 1. Overview Page (`/demand-machine/page.tsx`)
- **Layout:** Switched from `grid-cols-2` cards to a vertical stack of sections (`space-y-32`).
- **Zig-Zag Pattern:** Alternating layout for visual interest:
    - Step 1: Visual (Left) - Text (Right)
    - Step 2: Text (Left) - Visual (Right)
    - Step 3: Visual (Left) - Text (Right)
    - Step 4: Text (Left) - Visual (Right)
- **Visuals:** Replaced static icons/cards with dynamic Marquee components.

### 2. New Components
Created four distinct marquee components to visualize the data flow at each stage:
- **`DiagnosticQuestionsMarquee`**: Displays 36 interview questions.
    - *Style:* 3 Rows, Slower speed, Electric (Blue) theme.
- **`BDPVariablesMarquee`**: Displays 153 BDP variables.
    - *Style:* 6 Rows, Variable speeds, Ember (Orange) theme.
- **`MessagingPromptsMarquee`**: Displays 23 messaging prompt titles.
    - *Style:* 4 Rows, Ember theme.
- **`FoundationalDocsMarquee`**: Displays 21 foundational document titles + descriptions.
    - *Style:* 5 Rows, Electric theme.

### 3. Data & Utilities
- **`src/data/bdp-variables.ts`**: Extracted variable data from the original component.
- **`src/data/interview-questions.ts`**: Utilized existing data.
- **`src/data/marketing-framework.ts`**: Utilized existing data for prompt titles.

### 4. Navigation
- **Mega Menu (`src/lib/mega-menu-content.ts`):**
    - Updated "Start the Machine" CTA in the Demand Machine menu.
    - **New Link:** `/demand-machine` (Overview Page).
    - **New Label:** "See How It Works".

## Files Modified
- `src/app/demand-machine/page.tsx`
- `src/components/demand-machine/*` (New components)
- `src/lib/mega-menu-content.ts`
- `CLAUDE.md`
