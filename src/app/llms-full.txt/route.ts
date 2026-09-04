import { AGENTIC_WEB_DEFINITION } from '@/lib/agentic-web/definition'
import { LAYERS } from '@/lib/agentic-web/layers'
import { GLOSSARY } from '@/lib/agentic-web/glossary'
import { FAQS } from '@/data/faqs'

export const dynamic = 'force-static'

const BASE_URL = 'https://saren.ai'

/**
 * /llms-full.txt — the full text of the agentic-web pillar, for models that want
 * the whole argument in one fetch instead of crawling six routes.
 *
 * Generated from the same modules the pages render from (`definition.ts`,
 * `layers.ts`, `glossary.ts`, `faqs.ts`), so it cannot drift from what a reader
 * sees. Never hand-maintain this file — add prose to those modules instead.
 */

function layerSection(layer: (typeof LAYERS)[number]): string {
  return [
    `## Layer ${layer.num} — ${layer.name}`,
    ``,
    `URL: ${BASE_URL}${layer.href}`,
    `Reader: ${layer.reader}. ${layer.readerDetail}`,
    ``,
    `### What this is`,
    ``,
    layer.whatThisIs,
    ``,
    `### What good looks like`,
    ``,
    layer.goodLooksLike.map(item => `- ${item}`).join('\n'),
    ``,
    `### The cost of missing it`,
    ``,
    layer.costOfMissing,
    ``,
    `### How I work on it`,
    ``,
    layer.howIWorkOnIt.join('\n\n'),
  ].join('\n')
}

export async function GET() {
  const header = [
    `# Saren.ai — the agentic web, in full`,
    ``,
    `> ${AGENTIC_WEB_DEFINITION}`,
    ``,
    `This is the complete text of the agentic-web pillar at ${BASE_URL}/agentic-web,`,
    `including all three layers and the glossary. For the site index, see ${BASE_URL}/llms.txt.`,
    `Every page here is also available as Markdown by appending ?format=md to its URL.`,
  ].join('\n')

  const layers = LAYERS.map(layerSection).join('\n\n---\n\n')

  const glossary = [
    `## Glossary`,
    ``,
    `Source: ${BASE_URL}/agentic-web/glossary`,
    ``,
    GLOSSARY.map(entry =>
      [`### ${entry.term}`, ``, entry.definition, ``, `In practice: ${entry.inPractice}`].join('\n'),
    ).join('\n\n'),
  ].join('\n')

  const faq = [
    `## Frequently asked`,
    ``,
    FAQS.home.map(item => [`### ${item.question}`, ``, item.answer].join('\n')).join('\n\n'),
  ].join('\n')

  const content = [header, layers, glossary, faq].join('\n\n---\n\n') + '\n'

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
