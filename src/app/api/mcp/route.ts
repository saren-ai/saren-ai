import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { searchVault } from '@/lib/vault-search';
import { isRateLimited } from '@/lib/rate-limit';
import { getActivePlaybooks, getPlaybookWithContent } from '@/lib/playbooks';
import { PAID_TIERS } from '@/lib/playbook-tiers';

export const runtime = 'nodejs';

const SITE_URL = 'https://saren.ai';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'search_saren_content',
      {
        title: 'Search Saren.ai Content',
        description:
          "Semantic search over Saren Sakurai's playbooks, case studies, and marketing/AI-ops writing. Returns the most relevant passages with their source file path.",
        inputSchema: z.object({
          query: z.string().min(1).describe('Natural-language question or topic to search for'),
          limit: z.number().int().min(1).max(10).optional().describe('Max passages to return (default 5)'),
        }),
      },
      async ({ query, limit = 5 }) => {
        const matches = await searchVault(query, { matchCount: limit });
        if (matches.length === 0) {
          return { content: [{ type: 'text', text: 'No relevant content found for that query.' }] };
        }
        const text = matches
          .map((m, i) => `[${i + 1}] ${m.file_path} (similarity ${m.similarity.toFixed(2)})\n${m.content}`)
          .join('\n\n---\n\n');
        return { content: [{ type: 'text', text }] };
      },
    );

    server.registerTool(
      'list_playbooks',
      {
        title: 'List Playbooks',
        description:
          "List Saren Sakurai's active playbooks (prompt sequences and interactive tools for GTM/AI-ops). Each entry notes whether it's free or a paid download.",
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
              `- ${p.playbook_id}: ${p.title} [${p.category}]${PAID_TIERS[p.playbook_id] ? ' (paid)' : ' (free)'}\n  ${p.description}\n  ${SITE_URL}/playbooks/${p.playbook_id}`,
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
          'Fetch a single playbook by id. Free playbooks return full step-by-step content. Paid playbooks return metadata and a purchase link only — full content is gated behind checkout on the site, same as for an anonymous visitor.',
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
        if (PAID_TIERS[playbook.playbook_id]) {
          const text = `${playbook.title}\n${playbook.description}\n\nThis is a paid playbook (${playbook.steps.length} steps). Full content is gated behind checkout: ${url}`;
          return { content: [{ type: 'text', text }] };
        }

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
