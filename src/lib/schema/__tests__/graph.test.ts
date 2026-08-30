import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { buildGraph } from "../graph";
import { validateGraph } from "../validate";
import { ID, breadcrumbId, webPageId, articleId } from "../ids";
import type { PageGraphInput } from "../types";

function makeInput(overrides?: Partial<PageGraphInput>): PageGraphInput {
  return {
    path: "/example",
    name: "Example Page",
    description: "An example page for testing.",
    ...overrides,
  };
}

describe("buildGraph", () => {
  it("produces exactly one @context and an array @graph", () => {
    const graph = buildGraph(makeInput());
    expect(graph["@context"]).toBe("https://schema.org");
    expect(Array.isArray(graph["@graph"])).toBe(true);
  });

  it("gives every top-level node an @id", () => {
    const graph = buildGraph(
      makeInput({
        breadcrumb: [{ href: "/", label: "Home" }, { label: "Example" }],
        article: { headline: "Example headline", datePublished: "2026-01-01T00:00:00Z" },
      })
    );
    for (const node of graph["@graph"]) {
      expect(node["@id"], JSON.stringify(node)).toBeTruthy();
    }
  });

  it("has no dangling references and no duplicate conflicting @ids", () => {
    const graph = buildGraph(
      makeInput({
        breadcrumb: [{ href: "/", label: "Home" }, { label: "Example" }],
        article: { headline: "Example headline", datePublished: "2026-01-01T00:00:00Z" },
        faq: [{ question: "Q1?", answer: "A1." }],
      })
    );
    expect(validateGraph(graph)).toEqual([]);
  });

  it("gives BreadcrumbList a stable @id and links it from the page node", () => {
    const graph = buildGraph(makeInput({ breadcrumb: [{ href: "/", label: "Home" }, { label: "Example" }] }));
    const breadcrumb = graph["@graph"].find((n) => n["@type"] === "BreadcrumbList");
    const webPage = graph["@graph"].find((n) => n["@id"] === webPageId("/example"));
    expect(breadcrumb?.["@id"]).toBe(breadcrumbId("/example"));
    expect(webPage?.breadcrumb).toEqual({ "@id": breadcrumbId("/example") });
  });

  it("links Article to its WebPage, Person, and Organization", () => {
    const graph = buildGraph(
      makeInput({ article: { headline: "Example headline", datePublished: "2026-01-01T00:00:00Z" } })
    );
    const article = graph["@graph"].find((n) => n["@id"] === articleId("/example"));
    expect(article?.mainEntityOfPage).toEqual({ "@id": webPageId("/example") });
    expect(article?.author).toEqual({ "@id": ID.person });
    expect(article?.publisher).toEqual({ "@id": ID.organization });
  });

  it("includes a LocalBusiness GeoCircle centered on Irvine with a 10mi radius by default", () => {
    const graph = buildGraph(makeInput());
    const localBusiness = graph["@graph"].find((n) => n["@id"] === ID.localBusiness);
    expect(localBusiness).toBeDefined();
    const areaServed = localBusiness?.areaServed as Record<string, unknown>;
    expect(areaServed.geoRadius).toBe("16093");
    const midpoint = areaServed.geoMidpoint as Record<string, number>;
    expect(midpoint.latitude).toBeCloseTo(33.6846, 3);
    expect(midpoint.longitude).toBeCloseTo(-117.8265, 3);
  });

  it("omits LocalBusiness when includeLocalBusiness is false", () => {
    const graph = buildGraph(makeInput({ includeLocalBusiness: false }));
    expect(graph["@graph"].some((n) => n["@id"] === ID.localBusiness)).toBe(false);
  });

  it("lean identity omits knowsAbout and alumniOf; full identity includes them", () => {
    const lean = buildGraph(makeInput({ identity: "lean" }));
    const full = buildGraph(makeInput({ identity: "full" }));
    const leanPerson = lean["@graph"].find((n) => n["@id"] === ID.person);
    const fullPerson = full["@graph"].find((n) => n["@id"] === ID.person);
    expect(leanPerson?.knowsAbout).toBeUndefined();
    expect(leanPerson?.alumniOf).toBeUndefined();
    expect(Array.isArray(fullPerson?.knowsAbout)).toBe(true);
    expect(Array.isArray(fullPerson?.alumniOf)).toBe(true);
  });

  it("upgrades the page node to an FAQPage and embeds Question/Answer when faq items are given", () => {
    const graph = buildGraph(makeInput({ faq: [{ question: "Q1?", answer: "A1." }] }));
    const webPage = graph["@graph"].find((n) => n["@id"] === webPageId("/example"));
    expect(webPage?.["@type"]).toEqual(["WebPage", "FAQPage"]);
    expect(webPage?.mainEntity).toEqual([
      { "@type": "Question", name: "Q1?", acceptedAnswer: { "@type": "Answer", text: "A1." } },
    ]);
  });
});

describe("validateGraph", () => {
  it("flags a dangling reference", () => {
    const errors = validateGraph({
      "@context": "https://schema.org",
      "@graph": [{ "@type": "Article", "@id": "https://saren.ai/x/#article", author: { "@id": "https://saren.ai/#ghost" } }],
    });
    expect(errors.some((e) => e.includes("https://saren.ai/#ghost"))).toBe(true);
  });

  it("flags a BreadcrumbList missing its own @id", () => {
    const errors = validateGraph({
      "@context": "https://schema.org",
      "@graph": [{ "@type": "BreadcrumbList", itemListElement: [] }],
    });
    expect(errors.some((e) => e.includes("BreadcrumbList"))).toBe(true);
  });

  it("flags the same @id defined twice with conflicting @type", () => {
    const errors = validateGraph({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Person", "@id": "https://saren.ai/#x" },
        { "@type": "Organization", "@id": "https://saren.ai/#x" },
      ],
    });
    expect(errors.some((e) => e.includes("conflicting @type"))).toBe(true);
  });

  it("passes a well-formed graph with zero errors", () => {
    expect(validateGraph(buildGraph(makeInput()))).toEqual([]);
  });
});

describe("JsonLd emission guard", () => {
  it("emits application/ld+json from no file except src/components/seo/JsonLd.tsx", () => {
    const root = path.resolve(__dirname, "../../../..");
    const srcDir = path.join(root, "src");
    const offenders: string[] = [];

    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = statSync(full);
        if (stat.isDirectory()) {
          walk(full);
          continue;
        }
        if (!/\.(tsx|ts)$/.test(entry)) continue;
        if (full.endsWith(path.join("src", "components", "seo", "JsonLd.tsx"))) continue;
        // This test greps for the literal emission string, so it would match
        // itself — skip test files.
        if (full.includes(path.join("__tests__", ""))) continue;
        const contents = readFileSync(full, "utf8");
        if (contents.includes("application/ld+json")) {
          offenders.push(path.relative(root, full));
        }
      }
    };

    walk(srcDir);
    expect(offenders).toEqual([]);
  });
});
