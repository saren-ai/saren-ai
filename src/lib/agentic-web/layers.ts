export interface LayerDefinition {
  slug: "human-experience" | "machine-readability" | "agent-access";
  num: string;
  name: string;
  href: string;
  reader: string;
  readerDetail: string;
  whatThisIs: string;
  goodLooksLike: string[];
  costOfMissing: string;
  howIWorkOnIt: string[];
  serviceLink: { href: string; label: string };
}

export const LAYERS: LayerDefinition[] = [
  {
    slug: "human-experience",
    num: "01",
    name: "Human Experience",
    href: "/agentic-web/human-experience",
    reader: "A person",
    readerDetail:
      "A buyer doing research, deciding whether to reach out, deciding whether to trust the business with money or time.",
    whatThisIs:
      "The part of a site a person actually reads and decides from: positioning, narrative, interface. It's the layer every website has always been built for, and the one most teams already know how to judge, which is exactly why it's easy to assume it's already handled.",
    goodLooksLike: [
      "A stranger can restate what the business does after reading the homepage for seven seconds.",
      "The value proposition doesn't require industry jargon to parse.",
      "Navigation reflects how a buyer thinks about the problem, not how the org chart is structured.",
      "Proof sits next to the claim it backs up, not buried in a separate section three scrolls away.",
      "The copy reads like it was written by someone who did the work, not someone describing it secondhand.",
    ],
    costOfMissing:
      "A buyer who can't tell what the business does in the first few seconds doesn't dig deeper to find out. They leave, and the sale never opens, whether or not the content further down the page was actually good.",
    howIWorkOnIt: [
      "This is copy, structure, and information architecture work, the same discipline that's always separated a site that converts from one that just exists. The difference now is that the same narrative has to survive being read by a model, which is a harder bar than reading well to a person alone.",
      "In practice this means rewriting the pitch until it holds up out loud, restructuring navigation around the buyer's actual decision path, and making sure proof is positioned where the claim it supports gets made, not filed away as an afterthought.",
    ],
    serviceLink: { href: "/services/build", label: "See the fixed-scope build" },
  },
  {
    slug: "machine-readability",
    num: "02",
    name: "Machine Readability",
    href: "/agentic-web/machine-readability",
    reader: "A retrieval model",
    readerDetail:
      "A model reading the site once, on a buyer's behalf, deciding what the business is and whether to repeat that description as fact.",
    whatThisIs:
      "Entity definition, schema, named frameworks, structured argument, citable claims. This is the layer that determines whether a model reading the site walks away with an accurate, stable, restatable answer to \"what does this business do,\" or has to guess.",
    goodLooksLike: [
      "Every schema claim matches something actually visible on the rendered page, nothing marked up that isn't shown.",
      "One canonical description of the business, repeated verbatim across the pages and metadata that describe it.",
      "Named frameworks and proper nouns are used consistently, never varied for freshness.",
      "Headings are structured so a section answers the question it's phrased as.",
      "Claims are either checkable by the reader or attributed to a named source, never a vague \"studies show.\"",
      "One canonical entity, consistent sameAs links, so a model can confirm identity across sources.",
    ],
    costOfMissing:
      "A model that can't build a stable definition of the business either declines to answer or free-associates from whatever fragments it found. Either way, the business doesn't get cited as the answer, a competitor with a cleaner record does.",
    howIWorkOnIt: [
      "This is the layer where a marketing-ops background actually transfers directly: building a taxonomy that survives contact with a real system is the same skill whether the system is a sales team's lead router or a language model's retrieval index.",
      "In practice this means auditing schema against rendered HTML for drift, writing one canonical description sentence and enforcing it everywhere, and structuring arguments and headings so a model can extract them cleanly instead of paraphrasing them into something wrong.",
    ],
    serviceLink: { href: "/services/architecture-partner", label: "See the architecture retainer" },
  },
  {
    slug: "agent-access",
    num: "03",
    name: "Agent Access",
    href: "/agentic-web/agent-access",
    reader: "An agent with a task",
    readerDetail:
      "Not a person browsing and not a model summarizing, an agent that was told to do something and is trying to complete it on this site.",
    whatThisIs:
      "llms.txt, crawler and agent policy, feeds, MCP endpoints, machine-actionable paths. This is the layer that decides whether an agent that correctly understands the business can actually do anything once it arrives, or hits a wall built only for a mouse.",
    goodLooksLike: [
      "An llms.txt at the root, generated at build time, not hand-maintained and stale.",
      "A published, explicit policy for AI crawlers and agents, not silence that gets read as an accident.",
      "At least one machine-actionable path, a feed, an API, a structured content-negotiation route, that doesn't require rendering JavaScript to parse.",
      "Crawler and agent traffic is distinguishable in logs from human traffic, so the policy can be checked against what's actually happening.",
      "The policy states a deliberate choice, not a default the team never looked at.",
    ],
    costOfMissing:
      "An agent that understands the business perfectly still can't complete a task on the site: no price it can read, no availability it can check, no path forward that doesn't assume a human is holding the mouse. The business is legible and still unusable.",
    howIWorkOnIt: [
      "This layer barely existed as a discipline two years ago, so most of the work is building the first version of it rather than optimizing an existing one: crawler policy, structured feeds, and the machine-actionable paths that let an agent finish what it started.",
      "This site is the reference example, not a description of the idea: robots.txt here names retrieval crawlers explicitly rather than blanket-blocking or blanket-allowing everything with \"AI\" in the name, and every non-API page emits a markdown-negotiation header so an agent can request the plain-text version of a page instead of parsing rendered HTML.",
    ],
    serviceLink: { href: "/services/architecture-partner", label: "See the architecture retainer" },
  },
];

export function otherLayers(slug: LayerDefinition["slug"]): LayerDefinition[] {
  return LAYERS.filter((l) => l.slug !== slug);
}
