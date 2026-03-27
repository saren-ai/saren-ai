# New Case Study

Scaffold a new portfolio case study page with all required files and registrations.

## Arguments
- `$ARGUMENTS` — the slug for the new case study (e.g., `lead-scoring-revamp`)

## Steps

1. Create the page file: `src/app/portfolio/$ARGUMENTS/page.tsx`
   - Add `"use client"` directive
   - Use `.section > .container-narrow` layout wrapper
   - Add standard framer-motion viewport animations
   - Import components from step 2

2. Create component directory: `src/components/$ARGUMENTS/`
   - Scaffold section components as needed

3. Create data file: `src/lib/$ARGUMENTS.ts`
   - Export typed data arrays/objects for the case study content

4. Register in portfolio grid — update the portfolio page to include the new study

5. Register in mega menu — add entry to `src/lib/mega-menu-content.ts`

6. Run `npm run build` to verify everything compiles

7. Report the new files created and any remaining TODOs
