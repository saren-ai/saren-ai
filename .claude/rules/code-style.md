# Code Style Rules

## Directives
- Always add `"use client"` unless the component is purely layout/metadata
- Always use `<Image>` from `next/image` — never raw `<img>` tags

## Imports
- Use the `@/*` path alias (maps to `./src/*`) for all project imports
- Import order: React/Next → third-party → project aliases → relative

## Dependencies
- No new dependencies without explicit discussion — keep the bundle lean
- No external carousel/slider libraries — use framer-motion + React state
- No external state libraries — React hooks + Context only

## localStorage
- `"theme"` — dark mode preference
- `"saren-tier-list-votes"` — tier list user votes
- No other localStorage keys without discussion

## TypeScript
- Strict mode enabled — no `any` types without justification
- Prefer interfaces for object shapes, types for unions/intersections
- Export types from `src/lib/` alongside business logic
