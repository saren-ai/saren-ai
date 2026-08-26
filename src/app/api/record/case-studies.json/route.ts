import { NextResponse } from 'next/server';
import { CASE_STUDIES, toPublicRecord } from '@/lib/case-studies';

export const dynamic = 'force-static';

/**
 * Structured export Surface 2 (Astro/Cloudflare) and Surface 3 (MCP) read instead of
 * each owning their own copy. Thin record only — id/name/tagline/category/highlights/url,
 * no full case-study body (6 of 8 are bespoke interactive builds, not prose; see
 * ROADMAP.md's "The foundational call" for why full-body extraction is out of scope).
 */
export async function GET() {
  return NextResponse.json(CASE_STUDIES.map(toPublicRecord));
}
