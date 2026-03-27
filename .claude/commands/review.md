# Pre-commit Review

Run the full pre-commit checklist before finishing a session or opening a PR.

## Steps

1. Run `npm run build` — fail fast if it doesn't compile
2. Run `npm run lint` — fix any warnings or errors
3. Run `git status` — check for:
   - Stray files at project root (scripts, images, data files)
   - Unintended untracked files
   - Database files (.db, .db-shm, .db-wal)
   - .DS_Store or editor config files
4. Run `git diff --stat` — summarize what changed
5. Review changes against the design system:
   - All interactive components use `"use client"`
   - Images use `<Image>` from next/image, never `<img>`
   - Imports use `@/*` path alias
   - Animations follow the standard framer-motion pattern
   - Layout uses `.section > .container-narrow`
   - Colors use design system tokens, not raw hex
6. If temporary/debug files were created during the session, clean them up
7. Report a summary of findings and any issues to fix
