import { timingSafeEqual } from "node:crypto";

// Constant-time string comparison for bearer tokens and webhook signatures.
// Never compare secrets with `!==` — see AGENTS.md Security Conventions.
// Imports node:crypto — Node runtime only, will break an edge-runtime route.
export function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
