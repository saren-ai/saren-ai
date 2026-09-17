import { timingSafeEqual } from "node:crypto";

// Constant-time string comparison for Node runtimes (bearer tokens, webhook
// signatures). Never compare secrets with `!==` — see AGENTS.md Security Conventions.
// Edge runtime routes must use safe-compare-edge.ts instead — this file imports
// node:crypto, which the edge bundler refuses to ship.
export function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
