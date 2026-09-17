import { NextResponse } from 'next/server';
import { getActivePlaybooks, getPlaybookWithContent } from '@/lib/playbooks';
import { pageUrl } from '@/lib/schema';

export const dynamic = 'force-static';

interface PlaybookPublicRecord {
  playbook_id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  steps: { step: number; title: string; content: string }[];
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
      const withContent = await getPlaybookWithContent(playbook.playbook_id);
      return {
        playbook_id: playbook.playbook_id,
        title: playbook.title,
        description: playbook.description,
        category: playbook.category,
        tags: playbook.tags,
        url: pageUrl(`/playbooks/${playbook.playbook_id}`),
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
