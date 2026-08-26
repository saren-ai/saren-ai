import { anthropic } from '@ai-sdk/anthropic';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';
import { searchVault, type VaultMatch } from '@/lib/vault-search';
import { isRateLimited } from '@/lib/rate-limit';

function latestUserText(messages: UIMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) return '';
  return lastUser.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('\n');
}

function buildSystemPrompt(matches: VaultMatch[]): string {
  const context = matches
    .map((match, i) => `[${i + 1}] Source: ${match.file_path}\n${match.content}`)
    .join('\n\n---\n\n');

  return `You are an assistant answering questions based strictly on the provided context from the user's Obsidian vault. If the answer is not in the context, say so. Cite the file path of your source.

Context:
${context || '(no matching context found)'}`;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const query = latestUserText(messages);

  const matches = query ? await searchVault(query) : [];

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: buildSystemPrompt(matches),
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
