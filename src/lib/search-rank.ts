import type { PagefindResultData } from "@/components/search/PagefindProvider";

export type SearchMatchTier = "primary" | "mention";

export function pathFromSearchResult(result: PagefindResultData): string {
  return result.url.replace(/^https?:\/\/[^/]+/, "").replace(/\.html$/, "");
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function queryTokens(query: string): string[] {
  return normalize(query).split(" ").filter(Boolean);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ");
}

/** Higher = more likely the dedicated page for this query, not a passing reference. */
export function scoreSearchResult(result: PagefindResultData, query: string): number {
  const path = pathFromSearchResult(result);
  const title = result.meta.title ?? path;
  const q = normalize(query);
  const titleN = normalize(title);
  const pathN = normalize(path.replace(/\//g, " "));
  const slug = path.split("/").filter(Boolean).pop() ?? "";
  const slugN = normalize(slug.replace(/-/g, " "));
  const slugCompact = slug.toLowerCase().replace(/-/g, "");
  const qCompact = q.replace(/\s+/g, "");
  const tokens = queryTokens(query);
  const excerptN = normalize(stripHtml(result.excerpt ?? ""));

  let score = 0;

  if (titleN === q) score += 1000;
  else if (titleN.includes(q)) score += 850;

  if (slugN === q || slugCompact === qCompact) score += 950;
  else if (tokens.length > 0 && tokens.every((t) => slug.includes(t))) score += 750;

  if (path.toLowerCase().includes(q.replace(/\s+/g, "-"))) score += 650;

  if (tokens.length > 0 && tokens.every((t) => titleN.includes(t))) score += 550;
  if (tokens.length > 0 && tokens.every((t) => pathN.includes(t))) score += 450;

  score += tokens.filter((t) => titleN.includes(t)).length * 40;
  score += tokens.filter((t) => excerptN.includes(t)).length * 8;

  // Dedicated pages beat index/hub pages when content matches similarly
  const depth = path.split("/").filter(Boolean).length;
  score += Math.max(0, 6 - depth) * 5;

  return score;
}

export function searchMatchTier(
  result: PagefindResultData,
  query: string,
  score: number
): SearchMatchTier {
  const path = pathFromSearchResult(result);
  const titleN = normalize(result.meta.title ?? path);
  const q = normalize(query);
  const tokens = queryTokens(query);
  const slug = path.split("/").filter(Boolean).pop() ?? "";
  const slugN = normalize(slug.replace(/-/g, " "));
  const slugCompact = slug.toLowerCase().replace(/-/g, "");
  const qCompact = q.replace(/\s+/g, "");

  const titleIsQuery = titleN === q || titleN.includes(q);
  const slugIsQuery =
    slugN === q || slugCompact === qCompact || tokens.every((t) => slug.includes(t));
  const titleHasAllTokens =
    tokens.length > 0 && tokens.every((t) => titleN.includes(t));

  if (titleIsQuery && (slugIsQuery || score >= 800)) return "primary";
  if (slugIsQuery && score >= 700) return "primary";
  if (titleHasAllTokens && score >= 550) return "primary";

  return "mention";
}

export function rankSearchResults(
  results: PagefindResultData[],
  query: string
): PagefindResultData[] {
  return [...results].sort((a, b) => {
    const scoreDiff = scoreSearchResult(b, query) - scoreSearchResult(a, query);
    if (scoreDiff !== 0) return scoreDiff;
    return pathFromSearchResult(a).localeCompare(pathFromSearchResult(b));
  });
}

export function partitionSearchResults(
  results: PagefindResultData[],
  query: string
): { primary: PagefindResultData[]; mentions: PagefindResultData[] } {
  const ranked = rankSearchResults(results, query);
  const primary: PagefindResultData[] = [];
  const mentions: PagefindResultData[] = [];

  for (const result of ranked) {
    const score = scoreSearchResult(result, query);
    const tier = searchMatchTier(result, query, score);
    if (tier === "primary") primary.push(result);
    else mentions.push(result);
  }

  return { primary, mentions };
}
