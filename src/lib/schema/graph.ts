import {
  articleNode,
  breadcrumbNode,
  localBusinessNode,
  organizationNode,
  personNode,
  webPageNode,
  webSiteNode,
} from "./nodes";
import type { PageGraphInput, SchemaNode } from "./types";

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": SchemaNode[];
}

/**
 * Assembles the single JSON-LD graph for one page. Every reference (author,
 * publisher, isPartOf, breadcrumb, mainEntity...) resolves to a node embedded in
 * this same graph, so the page is self-contained for a single-page fetch — not
 * dependent on a crawler having already seen another page's markup.
 */
export function buildGraph(input: PageGraphInput): JsonLdGraph {
  const nodes: SchemaNode[] = [
    personNode(input.identity ?? "lean"),
    organizationNode(),
    webSiteNode(),
  ];

  if (input.includeLocalBusiness !== false) {
    nodes.push(localBusinessNode());
  }

  const hasBreadcrumb = !!input.breadcrumb?.length;
  if (hasBreadcrumb) {
    nodes.push(breadcrumbNode(input.breadcrumb!, input.path));
  }

  const hasArticle = !!input.article;
  if (input.article) {
    nodes.push(articleNode(input.article, input.path));
  }

  nodes.push(
    webPageNode({
      path: input.path,
      pageType: input.pageType,
      name: input.name,
      description: input.description,
      dateModified: input.dateModified,
      hasBreadcrumb,
      hasArticle,
      faq: input.faq,
    })
  );

  if (input.extra?.length) {
    nodes.push(...input.extra);
  }

  return { "@context": "https://schema.org", "@graph": nodes };
}
