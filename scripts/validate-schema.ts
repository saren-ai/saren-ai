/**
 * Usage: npx tsx scripts/validate-schema.ts
 *
 * Walks the prerendered HTML in .next/server/app (the same directory Pagefind
 * already consumes) and, for every page, checks:
 *   1. at most one <script type="application/ld+json"> block
 *   2. it parses and validateGraph() reports zero errors
 *   3. every Question.name, BreadcrumbList item name, and Article headline in
 *      the graph appears as visible text in that page's rendered HTML
 *
 * Exits non-zero on any failure. Run after `npm run build`.
 *
 * Caveat: only prerendered routes land in .next/server/app — force-dynamic
 * pages (about/concerts) and DB-backed dynamic routes (playbooks/[id]) aren't
 * covered here. Those are covered by the unit tests in src/lib/schema/__tests__/.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { validateGraph } from "../src/lib/schema/validate";

const BUILD_DIR = path.resolve(__dirname, "../.next/server/app");

function findHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...findHtmlFiles(full));
    } else if (entry.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function extractJsonLdBlocks(html: string): string[] {
  const blocks: string[] = [];
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    blocks.push(match[1]);
  }
  return blocks;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function visibleText(html: string): string {
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ");
  const withoutTags = withoutScripts.replace(/<[^>]+>/g, " ");
  return decodeEntities(withoutTags).replace(/\s+/g, " ").trim();
}

function collectNodes(graph: unknown): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];
  const walk = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node && typeof node === "object") {
      nodes.push(node as Record<string, unknown>);
      for (const value of Object.values(node as Record<string, unknown>)) {
        walk(value);
      }
    }
  };
  walk(graph);
  return nodes;
}

function checkVisibility(graph: unknown, pageText: string): string[] {
  const errors: string[] = [];
  for (const node of collectNodes(graph)) {
    const type = node["@type"];
    const isQuestion = type === "Question";
    const isListItem = type === "ListItem";
    const isArticle = type === "Article" || (Array.isArray(type) && type.includes("Article"));

    if (isQuestion && typeof node.name === "string" && !pageText.includes(node.name)) {
      errors.push(`Question not visible on page: "${node.name}"`);
    }
    if (isListItem && typeof node.name === "string" && !pageText.includes(node.name)) {
      errors.push(`BreadcrumbList item not visible on page: "${node.name}"`);
    }
    if (isArticle && typeof node.headline === "string" && !pageText.includes(node.headline)) {
      errors.push(`Article headline not visible on page: "${node.headline}"`);
    }
  }
  return errors;
}

function main() {
  let files: string[];
  try {
    files = findHtmlFiles(BUILD_DIR);
  } catch {
    console.error(`Build output not found at ${BUILD_DIR} — run "npm run build" first.`);
    process.exit(1);
  }

  let failures = 0;
  let pagesWithGraphs = 0;

  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const blocks = extractJsonLdBlocks(html);
    const relPath = path.relative(BUILD_DIR, file);

    if (blocks.length === 0) continue; // noindex routes legitimately emit none
    pagesWithGraphs++;

    if (blocks.length > 1) {
      console.error(`✗ ${relPath}: ${blocks.length} application/ld+json blocks found, expected at most 1`);
      failures++;
      continue;
    }

    let graph: unknown;
    try {
      graph = JSON.parse(blocks[0]);
    } catch (e) {
      console.error(`✗ ${relPath}: JSON-LD block failed to parse — ${(e as Error).message}`);
      failures++;
      continue;
    }

    const graphErrors = validateGraph(graph);
    if (graphErrors.length > 0) {
      console.error(`✗ ${relPath}:`);
      graphErrors.forEach((e) => console.error(`    ${e}`));
      failures++;
      continue;
    }

    const pageText = visibleText(html);
    const visibilityErrors = checkVisibility(graph, pageText);
    if (visibilityErrors.length > 0) {
      console.error(`✗ ${relPath}:`);
      visibilityErrors.forEach((e) => console.error(`    ${e}`));
      failures++;
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} page(s) failed schema validation (${pagesWithGraphs} checked).`);
    process.exit(1);
  }

  console.log(`✓ ${pagesWithGraphs} page(s) passed schema validation.`);
}

main();
