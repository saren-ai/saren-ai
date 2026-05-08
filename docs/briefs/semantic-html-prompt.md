@Semantic HTML prompt for websites 


## FULL PROMPT

Audit this repository for non-semantic <div> elements that should be semantic HTML5 landmarks or sectioning elements. Work in two phases — do not modify files until Phase 1 is approved.

PHASE 1 — AUDIT (read-only)
1. Enumerate every component, page, and layout file (.tsx/.jsx/.astro/.vue/.html as applicable). For each file, list candidate <div>s that appear to serve a semantic role based on: their class names (e.g., "header", "nav", "sidebar", "footer", "hero"), their position in the tree, their children (nav links → <nav>, article content → <article>), and nearby ARIA roles.
2. For each candidate, propose the replacement tag and state the reason in one line. Use this decision framework:
   - <main> → the primary content region of a page. Exactly one per rendered page. Belongs in layout or page files, NEVER in a reusable component that could be used more than once per page.
   - <header> → introductory content for a page OR for an <article>/<section>. Site headers go at the top-level layout; article headers go inside <article>.
   - <nav> → major navigation blocks only (primary nav, footer nav, in-page TOC). Do NOT wrap every group of links — breadcrumbs yes, a row of social icons no.
   - <footer> → same scoping rule as <header>. Site footer at layout level; article footer inside <article>.
   - <article> → self-contained, independently distributable content (blog post, case study, product card in a feed). Not every card is an <article> — only if it stands alone.
   - <section> → thematic grouping with a heading. If there's no heading (visible or sr-only), it probably shouldn't be a <section>.
   - <aside> → tangentially related content (sidebars, pull quotes, related links). Not a generic "right column."
3. Explicitly list <div>s you are LEAVING ALONE and why. Divs used purely for layout (flex wrappers, grid cells, spacing, animation targets, click-outside handlers) should stay divs. Semantic tags are for meaning, not structure.
4. Flag conflicts: duplicate <main> candidates, <header> inside <header>, <nav> inside <nav>, missing heading hierarchy inside proposed <section>s.
5. Output as a table: file | line | current | proposed | reason | confidence (high/med/low).

Wait for approval before Phase 2. I will override low-confidence items or ones I disagree with.

PHASE 2 — IMPLEMENT
6. Apply only the approved changes. Preserve every className, id, data-*, aria-*, ref, event handler, and child element exactly as-is. The only thing changing is the tag name.
7. If a <div> has role="main" / role="navigation" / role="banner" / role="contentinfo" and you're changing it to the equivalent semantic tag, REMOVE the now-redundant role attribute (it's an a11y anti-pattern to double up).
8. Make changes idempotent — if a file already uses the correct semantic tag, skip it silently.
9. Do not touch: styled-component/emotion template tags (changing `styled.div` to `styled.header` is a separate, riskier refactor — list these as follow-ups instead), third-party component internals, or generated files.
10. One commit per logical group of files, conventional commit format: `a11y: use semantic landmarks in <area>`.

VERIFY
11. After changes, grep for: multiple <main> in a single rendered page path, <header>/<footer>/<nav>/<aside> nesting issues, and any CSS selectors in the codebase that target `div.<classname>` for classes that just moved to a semantic tag — those selectors will silently stop matching. Report all three.
12. List any className-based CSS rules that may need updating (e.g., `div.site-header { ... }` → `.site-header { ... }`).

FINAL REPORT
- Files changed, tags applied
- Divs intentionally left alone (brief sample + rationale)
- CSS selectors that need follow-up
- Accessibility landmarks now present per page type (home, article, product, etc.)
- Anything skipped or deferred

Do not change visible output, styles, or behavior. If a proposed change would alter rendering, skip it and flag.