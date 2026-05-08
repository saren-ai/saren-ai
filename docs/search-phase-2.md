# Search Phase 2 — Semantic + Chat UX

**Status:** Planned for Q2 2026  
**Depends on:** Phase 1 (Pagefind) shipped and validated  
**Prerequisite:** 4–6 weeks of Phase 1 query logs to inform corpus tuning

## Goals

Add a second mode to the existing search modal: "Ask." Users can ask 
natural-language questions and receive synthesized answers with citations 
back to source pages.

## Architecture (planned)

- **Embeddings:** voyage-3 or OpenAI text-embedding-3-small for content + queries
- **Vector store:** Vercel Postgres + pgvector
- **LLM:** Claude (Sonnet for cost, Opus for the eventual conversational homepage)
- **Streaming:** Server-sent events for token-by-token response
- **Citations:** Inline links to source pages, every claim grounded
- **Indexing trigger:** Postbuild step parallel to Pagefind — embed all MDX 
  and case study content, upsert into pgvector

## UX requirements

- Same modal, mode toggle activates "Ask"
- Streaming response with visible cursor
- Inline citations as superscript links
- Three suggested follow-up prompts after each response
- Hard refusal patterns for pricing, current availability, engagement capacity 
  (route to /contact)
- Persistent context within session, no cross-session memory
- Visible "Browse instead" link at all times

## What NOT to build in Phase 2

- Homepage hero chat (that's Phase 3)
- Multi-turn agent loops or tool use
- HubSpot integration / live chat handoff (that's a separate effort)
- Anonymous user query analytics beyond aggregate counts

## Decision log (from Phase 1 planning)

- Mode switcher visible-but-disabled in Phase 1 to set user expectation early
- Modal-based, not hero-based, until query data validates the chat pattern
- Section metadata from Phase 1 reused as filter facets in Phase 2
- Halcyon excluded from both modes consistently
