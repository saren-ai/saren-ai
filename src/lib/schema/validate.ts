import type { JsonLdGraph } from "./graph";

function typeKey(type: unknown): string {
  return Array.isArray(type) ? [...type].sort().join(",") : String(type);
}

/**
 * Pure structural validation of a single page's JSON-LD graph — no network calls.
 * Shared by the unit tests and the post-build HTML validator so both layers agree
 * on what "well-linked" means.
 */
export function validateGraph(graph: unknown): string[] {
  const errors: string[] = [];

  if (!graph || typeof graph !== "object") {
    return ["graph is not an object"];
  }
  const g = graph as Partial<JsonLdGraph>;

  if (g["@context"] !== "https://schema.org") {
    errors.push(`missing/invalid @context (got ${JSON.stringify(g["@context"])})`);
  }
  if (!Array.isArray(g["@graph"])) {
    errors.push("missing @graph array");
    return errors;
  }

  const defined = new Map<string, string>();
  const referenced = new Set<string>();

  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== "object") return;

    const obj = node as Record<string, unknown>;
    const keys = Object.keys(obj);

    if ("@id" in obj) {
      const id = String(obj["@id"]);
      if ("@type" in obj) {
        const tKey = typeKey(obj["@type"]);
        if (defined.has(id) && defined.get(id) !== tKey) {
          errors.push(`@id ${id} defined twice with conflicting @type (${defined.get(id)} vs ${tKey})`);
        }
        defined.set(id, tKey);
      } else if (keys.length === 1) {
        referenced.add(id);
      }
    }

    for (const key of keys) {
      if (key === "@id" || key === "@type") continue;
      walk(obj[key]);
    }
  };

  walk(g["@graph"]);

  for (const id of referenced) {
    if (!defined.has(id)) {
      errors.push(`dangling reference: ${id} is referenced but never defined in this graph`);
    }
  }

  for (const node of g["@graph"] as Record<string, unknown>[]) {
    const type = node["@type"];
    const isBreadcrumb = type === "BreadcrumbList" || (Array.isArray(type) && type.includes("BreadcrumbList"));
    if (isBreadcrumb && !node["@id"]) {
      errors.push("BreadcrumbList node is missing @id");
    }
  }

  return errors;
}
