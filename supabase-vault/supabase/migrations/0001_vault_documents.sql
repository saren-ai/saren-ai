create extension if not exists vector;

create table if not exists vault_documents (
  id uuid primary key default gen_random_uuid(),
  file_path text not null,
  chunk_index integer not null,
  frontmatter jsonb not null default '{}'::jsonb,
  content text not null,
  embedding vector(1024) not null,
  created_at timestamptz not null default now(),
  unique (file_path, chunk_index)
);

create index vault_documents_embedding_idx
  on vault_documents using hnsw (embedding vector_cosine_ops);

alter table vault_documents enable row level security;

create policy "Public read access"
  on vault_documents for select
  to anon, authenticated
  using (true);

create policy "Service role full access"
  on vault_documents for all
  to service_role
  using (true)
  with check (true);

create or replace function match_documents(
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  file_path text,
  frontmatter jsonb,
  content text,
  similarity float
)
language sql stable
as $$
  select
    vault_documents.id,
    vault_documents.file_path,
    vault_documents.frontmatter,
    vault_documents.content,
    1 - (vault_documents.embedding <=> query_embedding) as similarity
  from vault_documents
  where 1 - (vault_documents.embedding <=> query_embedding) > match_threshold
  order by vault_documents.embedding <=> query_embedding
  limit match_count;
$$;

grant execute on function match_documents(vector(1024), float, int) to anon, authenticated;
