# Changelog — The Gen X Executive's AI Playbook

## v2.0 — 2026-07-14

Prompt-engineering refresh. Business topics and frameworks are unchanged; every prompt was rewritten for current best-practice prompting technique.

- Standardized all 20 prompt files to the same structure (What this does / How to use / The Prompt / Pro tips / Example use case) — several originals were missing sections or had unformatted prompt text.
- Added an explicit uncertainty-handling instruction to every prompt ("state assumptions rather than fabricating specifics when input is insufficient").
- Added an explicit self-check step to every prompt before it produces final output.
- Made the reasoning/scratchpad step consistent across all 20 prompts (previously present in some, absent in others).
- Fixed `_GETTING_STARTED.md`, which was missing Step 1 and Step 3 and ended abruptly.
- Removed unverifiable statistic citations attributed to named research institutions (e.g. "(BCG, 2025)", "(MIT, 2025)") from `_README.md` — these attributions could not be sourced and posed a credibility/liability risk.
- Established this directory as the source-of-truth for the product content (previously it existed only as a zip in Supabase Storage with no repo trace).

## v1.0 — 2026-05-28

Initial release. 20 prompts across 4 categories (Meeting Intelligence, Executive Communications, Decision Support & Scenario Planning, Prioritization & Focus Management), uploaded directly to Supabase Storage as `genx_executive_ai_playbook.zip`.
