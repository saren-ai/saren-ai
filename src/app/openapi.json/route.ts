import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const BASE_URL = 'https://saren.ai';

/**
 * Documents the public, machine-facing surface only — the /api/record/*.json exports
 * built for Surface 2/3 consumption. Internal/transactional routes (checkout, webhooks,
 * admin auth) are intentionally not listed here; this isn't a general integration API,
 * it's the record layer described in ROADMAP.md's Three-Surface Plan.
 */
const SPEC = {
  openapi: '3.1.0',
  info: {
    title: 'Saren.ai Record API',
    description:
      "Read-only, machine-facing exports of Saren Sakurai's public content — case studies and playbooks — served as structured JSON. This is the record layer the site's MCP server and any future agent/crawler surface read from, kept in sync with the human-facing pages by construction (single source, not a hand-maintained mirror).",
    version: '1.0.0',
    contact: { name: 'Saren Sakurai', url: `${BASE_URL}/contact` },
  },
  servers: [{ url: BASE_URL }],
  paths: {
    '/api/record/case-studies.json': {
      get: {
        operationId: 'listCaseStudies',
        summary: 'List case study summary records',
        description:
          'Thin summary records for all published case studies — title, tagline, category, highlights, and a link to the full human-readable page. Does not include full case-study body content.',
        responses: {
          '200': {
            description: 'Array of case study records',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/CaseStudyRecord' },
                },
              },
            },
          },
        },
      },
    },
    '/api/record/playbooks.json': {
      get: {
        operationId: 'listPlaybooks',
        summary: 'List active playbooks, with full content for free playbooks',
        description:
          'Metadata for every active playbook. Free playbooks include full step-by-step content inline. Paid playbooks return metadata and a purchase link only — never gated content, matching the access rules enforced on the site itself.',
        responses: {
          '200': {
            description: 'Array of playbook records',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/PlaybookRecord' },
                },
              },
            },
          },
        },
      },
    },
    '/llms.txt': {
      get: {
        operationId: 'getLlmsTxt',
        summary: "Human-readable summary of Saren Sakurai's site, services, and content",
        description:
          'A single markdown document summarizing capabilities, results, services, case studies, playbooks, and about pages — intended as a fast-context primer for an LLM or agent, not a substitute for the structured JSON endpoints above.',
        responses: {
          '200': {
            description: 'Markdown document',
            content: { 'text/plain': { schema: { type: 'string' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CaseStudyRecord: {
        type: 'object',
        required: ['id', 'name', 'tagline', 'category', 'highlights', 'url'],
        properties: {
          id: { type: 'string', description: 'Slug, e.g. "sovereign-personas"' },
          name: { type: 'string' },
          tagline: { type: 'string' },
          category: { type: 'string', enum: ['SMB', 'Solopreneurs', 'Thinkers'] },
          highlights: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
          url: { type: 'string', format: 'uri' },
        },
      },
      PlaybookRecord: {
        type: 'object',
        required: ['playbook_id', 'title', 'description', 'category', 'tags', 'paid', 'url'],
        properties: {
          playbook_id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          category: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          paid: { type: 'boolean', description: 'If true, steps is omitted — see /playbooks/{playbook_id} to purchase' },
          url: { type: 'string', format: 'uri' },
          steps: {
            type: 'array',
            description: 'Present only when paid is false',
            items: {
              type: 'object',
              required: ['step', 'title', 'content'],
              properties: {
                step: { type: 'integer' },
                title: { type: 'string' },
                content: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
} as const;

export async function GET() {
  return NextResponse.json(SPEC);
}
