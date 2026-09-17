import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { isRateLimited } from '@/lib/rate-limit';
import { getActivePlaybooks, getPlaybookWithContent } from '@/lib/playbooks';

export const runtime = 'nodejs';

const SITE_URL = 'https://saren.ai';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'list_playbooks',
      {
        title: 'List Playbooks',
        description:
          "List Saren Sakurai's active playbooks (prompt sequences and interactive tools for GTM/AI-ops).",
        inputSchema: z.object({
          category: z.string().optional().describe('Filter by category (exact match)'),
        }),
      },
      async ({ category }) => {
        const playbooks = await getActivePlaybooks();
        const filtered = category ? playbooks.filter((p) => p.category === category) : playbooks;
        const text = filtered
          .map(
            (p) =>
              `- ${p.playbook_id}: ${p.title} [${p.category}]\n  ${p.description}\n  ${SITE_URL}/playbooks/${p.playbook_id}`,
          )
          .join('\n');
        return { content: [{ type: 'text', text: text || 'No playbooks match that category.' }] };
      },
    );

    server.registerTool(
      'get_playbook',
      {
        title: 'Get Playbook',
        description:
          'Fetch a single playbook by id — returns full step-by-step content.',
        inputSchema: z.object({
          playbook_id: z.string().min(1).describe('The playbook_id from list_playbooks'),
        }),
      },
      async ({ playbook_id }) => {
        const playbook = await getPlaybookWithContent(playbook_id);
        if (!playbook) {
          return { content: [{ type: 'text', text: `No playbook found with id "${playbook_id}".` }] };
        }

        const url = `${SITE_URL}/playbooks/${playbook.playbook_id}`;
        const steps = playbook.steps
          .map((s) => `### Step ${s.step}: ${s.title}\n${s.note ?? ''}\n\n${s.content ?? ''}`)
          .join('\n\n');
        const text = `# ${playbook.title}\n${playbook.description}\n\n${steps}\n\n${url}`;
        return { content: [{ type: 'text', text }] };
      },
    );
  },
  {
    serverInfo: { name: 'saren-ai', version: '1.0.0' },
  },
);

async function rateLimitedHandler(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
  return handler(req);
}

export { rateLimitedHandler as GET, rateLimitedHandler as POST };
