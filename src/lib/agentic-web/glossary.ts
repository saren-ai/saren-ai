export interface GlossaryEntry {
  term: string;
  definition: string;
  inPractice: string;
  href: string;
  linkLabel: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "Agentic web",
    definition:
      "The layer of the web built for agents with a task, not just people reading a screen, layered on top of the web that already exists.",
    inPractice:
      "A site that's part of the agentic web can be read accurately by a model and acted on by an agent, not only browsed by a person.",
    href: "/agentic-web",
    linkLabel: "The pillar page",
  },
  {
    term: "AI-native website",
    definition:
      "A site designed from the start to be read and acted on by models and agents, not one retrofitted with a plugin after the fact.",
    inPractice:
      "The descriptive term used in page titles and headings across this site, as opposed to the category noun \"agentic web.\"",
    href: "/agentic-web",
    linkLabel: "The pillar page",
  },
  {
    term: "AEO (answer engine optimization)",
    definition:
      "Structuring content and reputation so AI systems extract, trust, and cite a brand as the answer to a buyer's question.",
    inPractice:
      "AEO covers the reading half of the problem, getting cited. It stops short of whether an agent can act once it arrives.",
    href: "/aeo-playbook",
    linkLabel: "The AEO playbook",
  },
  {
    term: "GEO (generative engine optimization)",
    definition:
      "A near-synonym for AEO, used more often outside B2B marketing circles for the same practice of optimizing for AI-generated answers.",
    inPractice:
      "Used here as a bridge term. Someone searching \"GEO agency\" and someone searching \"AEO agency\" are looking for the same thing.",
    href: "/agentic-web",
    linkLabel: "The pillar page",
  },
  {
    term: "llms.txt",
    definition:
      "A plain-text index at a domain's root that tells a model what the site contains and where to find it, doing for models what robots.txt does for crawlers.",
    inPractice:
      "One piece of Agent Access, not the whole layer. This site publishes one, generated at build time rather than hand-maintained.",
    href: "/agentic-web/agent-access",
    linkLabel: "Layer 03: Agent Access",
  },
  {
    term: "MCP (Model Context Protocol)",
    definition:
      "An open protocol that lets an AI model call external tools and data sources through a standard interface, instead of a custom integration per model.",
    inPractice:
      "The mechanism an agent can use to actually transact with a site, rather than just read about it.",
    href: "/agentic-web/agent-access",
    linkLabel: "Layer 03: Agent Access",
  },
  {
    term: "Entity",
    definition:
      "A distinct, identifiable thing (a person, an organization, a product) that a model or search system tracks consistently across sources.",
    inPractice:
      "One canonical description, repeated verbatim across a site's pages and metadata, is what lets a model treat the business as one stable entity instead of several fragments.",
    href: "/agentic-web/machine-readability",
    linkLabel: "Layer 02: Machine Readability",
  },
  {
    term: "Citation share",
    definition:
      "The share of AI-generated answers on a given topic that name a specific brand as the source, the answer-engine equivalent of search share of voice.",
    inPractice:
      "Citation alone is a reading-layer metric. A cited brand that can't be transacted with still loses to an executable competitor once agents can buy.",
    href: "/agentic-web/authority-engineering",
    linkLabel: "Authority engineering",
  },
  {
    term: "RAG (retrieval-augmented generation)",
    definition:
      "A model architecture where a system retrieves relevant documents at answer time and generates a response grounded in them, instead of answering purely from training data.",
    inPractice:
      "This is why retrieval is optimizable on a business timeline and training data isn't: RAG happens live, against whatever a site currently publishes.",
    href: "/agentic-web/machine-readability",
    linkLabel: "Layer 02: Machine Readability",
  },
  {
    term: "Answer engine",
    definition:
      "A system, ChatGPT, Perplexity, Google AI Overviews, that answers a query directly instead of returning a list of links to click through.",
    inPractice:
      "The fourth retrieval regime in the through-line: directories, then search engines, then social graphs, now answer engines.",
    href: "/agentic-web",
    linkLabel: "The pillar page",
  },
  {
    term: "Agent",
    definition:
      "Software given a task and the ability to take multi-step action toward it, as distinct from a model that only answers a single prompt.",
    inPractice:
      "The named reader of Layer 03. A model can describe a business accurately and an agent can still fail to complete a task on its site.",
    href: "/agentic-web/agent-access",
    linkLabel: "Layer 03: Agent Access",
  },
  {
    term: "Structured data (Schema.org)",
    definition:
      "Machine-readable markup, usually JSON-LD, that describes what's on a page in a vocabulary models and search systems already share.",
    inPractice:
      "Markup that describes content the visible page doesn't actually show is the most common failure in this discipline, not a rare one.",
    href: "/agentic-web/machine-readability",
    linkLabel: "Layer 02: Machine Readability",
  },
  {
    term: "Retrieval",
    definition:
      "The act of a system fetching and reading content at answer time, as opposed to relying only on what a model memorized during training.",
    inPractice:
      "Retrieval behaves like search: it rewards clean structure and a corroborated reputation, applied to a new kind of reader.",
    href: "/agentic-web",
    linkLabel: "The pillar page",
  },
  {
    term: "Content-Signal",
    definition:
      "A set of directives, published in robots.txt, that let a site state its policy toward AI crawlers, training, retrieval, and use, by name rather than by blanket allow or block.",
    inPractice:
      "This site's robots.txt names retrieval crawlers explicitly rather than lumping every crawler with \"AI\" in the name into one bucket.",
    href: "/agentic-web/agent-access",
    linkLabel: "Layer 03: Agent Access",
  },
  {
    term: "Machine readability",
    definition:
      "Layer 02 of the agentic web: entity definition, schema, named frameworks, structured argument, and citable claims, built for a retrieval model to read.",
    inPractice:
      "The layer that fails silently: a site can look complete to a person and still hand a model contradictory or absent structure.",
    href: "/agentic-web/machine-readability",
    linkLabel: "Layer 02: Machine Readability",
  },
  {
    term: "Crawler policy",
    definition:
      "A site's stated, deliberate rules for which automated systems may access it and for what purpose, training versus retrieval versus general use.",
    inPractice:
      "Blocking a training crawler and blocking a retrieval crawler are different decisions with different consequences. Most sites that think they've \"protected their content\" only made the first choice, by accident.",
    href: "/agentic-web/agent-access",
    linkLabel: "Layer 03: Agent Access",
  },
  {
    term: "Markdown negotiation",
    definition:
      "A server responding to a request for a page's plain-text, markdown version (via an RFC 8288 alternate link or a query parameter) instead of forcing every reader through rendered HTML.",
    inPractice:
      "Every non-API page on this site emits an alternate markdown link, so an agent can request the plain-text version directly.",
    href: "/agentic-web/agent-access",
    linkLabel: "Layer 03: Agent Access",
  },
  {
    term: "Zero-click",
    definition:
      "A search or answer-engine result that resolves the buyer's question without a click through to the source site.",
    inPractice:
      "Zero-click makes citation the new visibility metric, but citation without a way to act on it is still a dead end for an agent.",
    href: "/agentic-web/authority-engineering",
    linkLabel: "Authority engineering",
  },
];
