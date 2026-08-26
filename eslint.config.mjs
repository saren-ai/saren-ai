import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".vercel/**",
    "scripts/**",
    "*.mjs",
    "src/data/seed-concerts.js",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Stale Claude Code worktrees
    ".claude/worktrees/**",
    // Pagefind-generated search index (not source code)
    "public/_pagefind/**",
    // Legacy prospecting tool & local supabase vault scripts
    "prospecting/**",
    "supabase-vault/**",
  ]),
]);

export default eslintConfig;
