import { createClient } from '@supabase/supabase-js';

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY;
const SUPABASE_URL = process.env.VAULTCHAT_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VAULTCHAT_SUPABASE_ANON_KEY;

const EMBEDDING_MODEL = 'voyage-4-lite';
// Voyage cosine similarities run lower than OpenAI's — 0.78 (the PRD's OpenAI-calibrated
// value) filtered out every real match. Empirically, relevant chunks score ~0.45-0.65,
// unrelated queries top out ~0.31.
export const DEFAULT_MATCH_THRESHOLD = 0.4;
export const DEFAULT_MATCH_COUNT = 10;

export interface VaultMatch {
  content: string;
  file_path: string;
  similarity: number;
}

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing VAULTCHAT_SUPABASE_URL / VAULTCHAT_SUPABASE_ANON_KEY');
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function embedQuery(text: string): Promise<number[]> {
  if (!VOYAGE_API_KEY) {
    throw new Error('Missing VOYAGE_API_KEY');
  }
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: [text], input_type: 'query' }),
  });
  if (!res.ok) {
    throw new Error(`Voyage embeddings request failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.data[0].embedding;
}

export async function searchVault(
  query: string,
  { matchThreshold = DEFAULT_MATCH_THRESHOLD, matchCount = DEFAULT_MATCH_COUNT } = {},
): Promise<VaultMatch[]> {
  if (!query.trim()) return [];
  const embedding = await embedQuery(query);
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
  });
  if (error) throw error;
  return data as VaultMatch[];
}
