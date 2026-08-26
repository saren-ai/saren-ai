/**
 * Ingest an Obsidian vault into the vault-chat Supabase pgvector store.
 * Usage: npx tsx scripts/ingest-vault.ts [vaultPath]
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

try {
  process.loadEnvFile('.env.local');
} catch {
  // no .env.local on disk — fall back to already-exported env vars
}

const VAULT_PATH = process.argv[2] || process.env.VAULT_PATH || '/Users/saren/@marketing';
const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const SUPABASE_URL = process.env.VAULTCHAT_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.VAULTCHAT_SUPABASE_SERVICE_ROLE_KEY;

if (!VOYAGE_API_KEY) {
  throw new Error('Missing VOYAGE_API_KEY');
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing VAULTCHAT_SUPABASE_URL / VAULTCHAT_SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const EMBEDDING_MODEL = 'voyage-4-lite';
const MAX_CHUNK_CHARS = 4000; // ~1000 tokens
const EMBED_BATCH_SIZE = 32;

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const lowerName = entry.name.toLowerCase();
    if (entry.name.startsWith('.') || lowerName.includes('template')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && lowerName.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

function sanitizeObsidianSyntax(raw: string): string {
  let text = raw;
  text = text.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, alias) => (alias ?? target).trim());
  text = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, alias) => (alias ?? target).trim());
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, (_m, alt) => alt.trim());
  return text;
}

interface Chunk {
  chunkIndex: number;
  heading: string | null;
  content: string;
}

function splitByParagraphs(text: string, maxChars: number): string[] {
  const paragraphs = text.split(/\n{2,}/);
  const parts: string[] = [];
  let current = '';
  for (const para of paragraphs) {
    if (current && (current.length + para.length + 2) > maxChars) {
      parts.push(current.trim());
      current = '';
    }
    current = current ? `${current}\n\n${para}` : para;
    while (current.length > maxChars) {
      parts.push(current.slice(0, maxChars).trim());
      current = current.slice(maxChars);
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function chunkMarkdown(body: string, maxChars = MAX_CHUNK_CHARS): Chunk[] {
  const sections: { heading: string | null; lines: string[] }[] = [{ heading: null, lines: [] }];
  for (const line of body.split('\n')) {
    const headingMatch = /^(##|###)\s+(.*)/.exec(line);
    if (headingMatch) {
      sections.push({ heading: headingMatch[2].trim(), lines: [line] });
    } else {
      sections[sections.length - 1].lines.push(line);
    }
  }

  const chunks: Chunk[] = [];
  let chunkIndex = 0;
  for (const section of sections) {
    const sectionText = section.lines.join('\n').trim();
    if (!sectionText) continue;
    if (sectionText.length <= maxChars) {
      chunks.push({ chunkIndex: chunkIndex++, heading: section.heading, content: sectionText });
    } else {
      for (const part of splitByParagraphs(sectionText, maxChars)) {
        chunks.push({ chunkIndex: chunkIndex++, heading: section.heading, content: part });
      }
    }
  }
  return chunks;
}

async function embedBatch(texts: string[], retries = 5): Promise<number[][]> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VOYAGE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: EMBEDDING_MODEL, input: texts, input_type: 'document' }),
    });

    if (res.status === 429 || res.status >= 500) {
      const backoffMs = Math.min(30_000, 1000 * 2 ** attempt);
      console.warn(`  [rate-limit] status ${res.status}, retrying in ${backoffMs}ms (attempt ${attempt + 1}/${retries})`);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      continue;
    }
    if (!res.ok) {
      throw new Error(`Voyage embeddings request failed: ${res.status} ${await res.text()}`);
    }
    const json = await res.json();
    return json.data.map((d: { embedding: number[] }) => d.embedding);
  }
  throw new Error('Voyage embeddings request failed after retries');
}

async function ingestFile(vaultPath: string, absPath: string) {
  const relPath = path.relative(vaultPath, absPath);
  const raw = fs.readFileSync(absPath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);
  const sanitized = sanitizeObsidianSyntax(content);
  const chunks = chunkMarkdown(sanitized);

  if (chunks.length === 0) {
    console.log(`[skip] Empty after sanitization: /${relPath}`);
    return;
  }

  const embeddings: number[][] = [];
  for (let i = 0; i < chunks.length; i += EMBED_BATCH_SIZE) {
    const batch = chunks.slice(i, i + EMBED_BATCH_SIZE);
    embeddings.push(...(await embedBatch(batch.map((c) => c.content))));
  }

  const rows = chunks.map((chunk, i) => ({
    file_path: relPath,
    chunk_index: chunk.chunkIndex,
    frontmatter,
    content: chunk.heading ? `${chunk.heading}\n\n${chunk.content}` : chunk.content,
    embedding: embeddings[i],
  }));

  const { error: upsertError } = await supabase
    .from('vault_documents')
    .upsert(rows, { onConflict: 'file_path,chunk_index' });
  if (upsertError) throw upsertError;

  const { error: deleteError } = await supabase
    .from('vault_documents')
    .delete()
    .eq('file_path', relPath)
    .gte('chunk_index', chunks.length);
  if (deleteError) throw deleteError;

  console.log(`[✓] Chunked and embedded: /${relPath} (${chunks.length} chunks)`);
}

async function main() {
  if (!fs.existsSync(VAULT_PATH)) {
    throw new Error(`Vault path not found: ${VAULT_PATH}`);
  }
  const files = walk(VAULT_PATH);
  console.log(`Found ${files.length} markdown files in ${VAULT_PATH}`);

  let ok = 0;
  let failed = 0;
  for (const file of files) {
    try {
      await ingestFile(VAULT_PATH, file);
      ok++;
    } catch (err) {
      failed++;
      console.error(`[✗] Failed: /${path.relative(VAULT_PATH, file)} — ${(err as Error).message}`);
    }
  }
  console.log(`\nDone. ${ok} succeeded, ${failed} failed.`);
}

main();
