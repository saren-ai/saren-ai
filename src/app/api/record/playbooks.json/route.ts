import { NextResponse } from 'next/server';
import { getActivePlaybooks, getPlaybookWithContent } from '@/lib/playbooks';
import { PAID_TIERS } from '@/lib/playbook-tiers';
import { pageUrl } from '@/lib/schema';

export const dynamic = 'force-static';

interface PlaybookPublicRecord {
  playbook_id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  paid: boolean;
  url: string;
  /** Only present for free playbooks — paid content stays gated, same rule as /api/mcp's get_playbook. */
  steps?: { step: number; title: string; content: string }[];
}

/**
 * Structured export Surface 2 (Astro/Cloudflare) and Surface 3 (MCP) read instead of
 * each owning their own copy. Runs once at build time (force-static), so the fs reads
 * in getPlaybookWithContent happen on Vercel where Node is available — the output is a
 * static JSON blob, so no runtime filesystem access is needed by any downstream consumer.
 */
export async function GET() {
  const playbooks = await getActivePlaybooks();

  const records: PlaybookPublicRecord[] = await Promise.all(
    playbooks.map(async (playbook): Promise<PlaybookPublicRecord> => {
      const paidTier = PAID_TIERS[playbook.playbook_id];
      const base: PlaybookPublicRecord = {
        playbook_id: playbook.playbook_id,
        title: playbook.title,
        description: playbook.description,
        category: playbook.category,
        tags: playbook.tags,
        paid: Boolean(paidTier),
        url: pageUrl(`/playbooks/${playbook.playbook_id}`),
      };

      if (paidTier) {
        // Never fetch/expose step content for paid playbooks — metadata + link only.
        return base;
      }

      const withContent = await getPlaybookWithContent(playbook.playbook_id);
      return {
        ...base,
        steps: (withContent?.steps ?? []).map((s) => ({
          step: s.step,
          title: s.title,
          content: s.content ?? '',
        })),
      };
    }),
  );

  return NextResponse.json(records);
}
