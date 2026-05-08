#JSON-LD Block Prompt for Websites

## ===FULL PROMPT===



Audit this repository for JSON-LD structured data coverage and quality. Work in two phases — do not write any files until Phase 1 is approved.

PHASE 1 — AUDIT (read-only)
1. Enumerate every user-facing route/page in this project (pages/, app/, routes/, content/, or framework equivalent). List the file path and the inferred page type for each.
2. For each page, report: (a) whether JSON-LD exists, (b) if so, which @type and which fields are populated, (c) which recommended fields are missing for that type.
3. Propose the correct Schema.org @type per page. Use this routing:
   - Homepage → Organization (for a company site) OR Person + ProfilePage (for a personal/executive site). Infer from context; state which and why.
   - Blog post / article → Article or BlogPosting
   - Product / pricing page → Product, SoftwareApplication, or Service — pick based on what the page actually sells
   - FAQ section → FAQPage (can be nested on another page, not a standalone type)
   - About / bio page → Person or AboutPage
   - Contact → ContactPage
   - Case study → Article with about → Organization, or CreativeWork
   Flag any page where the type is genuinely ambiguous and ask before proceeding.
4. Output the audit as a table: path | current state | proposed @type | fields to add | fields to enrich.

Wait for my approval before Phase 2.

PHASE 2 — IMPLEMENT
5. Add or enrich JSON-LD using the project's existing pattern. If there's a shared Head/metadata helper or layout component, use it. If not, create one — do not inline duplicate <script> tags across pages when a helper would centralize it.
6. Source every value from real page content (frontmatter, MDX exports, CMS data, component props, or rendered copy). If a recommended field has no real source, OMIT it — never placeholder, never invent. List omissions in the final report so I can fill them in later.
7. Make output idempotent: if JSON-LD for the page already exists, merge/update it rather than appending a second block.
8. Validate every generated JSON-LD object against Schema.org's required/recommended fields for its @type before writing. Reject any object that would fail Google Rich Results requirements for that type.
9. Keep changes atomic per page and use conventional commit messages (`seo: add Article JSON-LD to /blog/[slug]`).

FINAL REPORT
- Pages touched, with @type applied
- Fields populated vs. intentionally omitted (with reason)
- Any validation warnings
- Suggested follow-ups (missing OG images, missing dates in frontmatter, etc.)

Do not modify unrelated files. Do not change visible page copy.