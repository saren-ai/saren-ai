import { ID, SITE_URL, pageUrl, webPageId, articleId, breadcrumbId, howToId, definedTermSetId } from "./ids";
import type { ArticleInput, FAQItem, PageType, SchemaNode, TrailItem } from "./types";

export interface HowToStepInput {
  name: string;
  text: string;
}

export interface HowToInput {
  name: string;
  description: string;
  steps: HowToStepInput[];
}

export interface DefinedTermInput {
  term: string;
  definition: string;
}

export interface DefinedTermSetInput {
  name: string;
  description: string;
  terms: DefinedTermInput[];
}

/** Full Person node — career detail. Only pages that render this content should use it. */
export function personNode(detail: "full" | "lean" = "lean"): SchemaNode {
  const base: SchemaNode = {
    "@type": "Person",
    "@id": ID.person,
    name: "Saren Sakurai",
    url: SITE_URL,
    image: "https://saren.ai/profile/saren-profile_2026.png",
    jobTitle: "Fractional Marketing Lead & AI Operations Consultant",
    worksFor: { "@id": ID.organization },
    sameAs: [
      "https://www.linkedin.com/in/saren/",
      "https://bsky.app/profile/saren.bsky.social",
      "https://www.instagram.com/saren/",
      "https://mastodon.social/@saren",
      "https://sarensakurai.com",
    ],
  };

  if (detail === "lean") return base;

  return {
    ...base,
    description:
      "Fractional Marketing Lead and AI Operations Consultant specializing in B2B SaaS go-to-market strategy, demand generation, and AI-powered marketing operations. Formerly Senior Director of Marketing at BlackBerry, following Cylance's $1.4B acquisition. Principal at Identogram LLC.",
    hasOccupation: {
      "@type": "Occupation",
      name: "Fractional Marketing Lead",
      occupationLocation: {
        "@type": "City",
        name: "Orange County, California",
      },
      skills: [
        { "@type": "DefinedTerm", name: "B2B SaaS go-to-market strategy" },
        { "@type": "DefinedTerm", name: "AI-native marketing operations" },
        { "@type": "DefinedTerm", name: "Demand generation engineering" },
        { "@type": "DefinedTerm", name: "Account-based marketing (ABM)" },
        { "@type": "DefinedTerm", name: "Intent data strategy and activation" },
        { "@type": "DefinedTerm", name: "Multi-agent workflow orchestration" },
        { "@type": "DefinedTerm", name: "Agentic GTM systems" },
        { "@type": "DefinedTerm", name: "HubSpot technical architecture" },
        { "@type": "DefinedTerm", name: "Full-funnel attribution modeling" },
        { "@type": "DefinedTerm", name: "Predictive lead scoring" },
      ],
    },
    alumniOf: [
      {
        "@type": "Organization",
        name: "Cylance",
        url: "https://www.cylance.com",
        description: "AI-driven endpoint security company acquired by BlackBerry for $1.4 billion in 2019",
      },
      {
        "@type": "Organization",
        name: "BlackBerry",
        url: "https://www.blackberry.com",
        description: "Enterprise cybersecurity and endpoint security",
      },
      {
        "@type": "Organization",
        name: "AKQA",
        url: "https://www.akqa.com",
        description: "Global digital innovation and design agency",
      },
      {
        "@type": "Organization",
        name: "JUXT Interactive",
        description: "Digital experience and interactive agency",
      },
      {
        "@type": "Organization",
        name: "Perficient",
        url: "https://www.perficient.com",
        description: "Global digital transformation consulting firm",
      },
    ],
    knowsAbout: [
      "AI-native marketing operations",
      "demand generation engineering",
      "answer engine optimization (AEO)",
      "Model Context Protocol (MCP) for marketing automation",
      "multi-agent workflow orchestration for B2B sales",
      "agentic GTM systems",
      "B2B SaaS go-to-market strategy",
      "account-based marketing (ABM)",
      "intent data strategy and activation",
      "signal-led B2B pipeline development",
      "HubSpot technical architecture and automation",
      "predictive lead scoring models",
      "full-funnel attribution modeling",
      "AI-augmented sales development and SDR automation",
      "cybersecurity marketing and demand generation",
      "buyer journey orchestration",
      "programmatic outbound sequences",
      "fractional marketing lead services for Series A startups",
      "revenue operations (RevOps)",
      "Bombora intent data activation",
      "funnel architecture design",
      "customer acquisition cost (CAC) optimization",
      "pipeline velocity optimization",
      "AI content strategy for B2B SaaS",
      "Claude Code and LLM workflow automation",
    ],
  };
}

export function organizationNode(): SchemaNode {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ID.organization,
    name: "Identogram LLC",
    url: "https://identogram.com",
    founder: { "@id": ID.person },
    employee: { "@id": ID.person },
    description:
      "B2B marketing consultancy specializing in AI-native demand generation, multi-agent GTM systems, and fractional marketing lead services for SaaS and cybersecurity companies.",
    knowsAbout: [
      "AI-native marketing operations",
      "fractional marketing lead services",
      "B2B SaaS demand generation",
      "answer engine optimization (AEO)",
      "multi-agent workflow orchestration",
      "cybersecurity marketing",
      "AI-augmented GTM strategy",
      "HubSpot technical architecture",
      "intent data activation",
      "programmatic outbound sequences",
      "signal-led pipeline development",
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    serviceType: ["Fractional Marketing Lead", "Marketing Operations Consulting", "AI GTM Strategy"],
  };
}

export function webSiteNode(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE_URL,
    name: "saren.ai",
    description:
      "Fractional Marketing Lead and AI Operations Consultant — B2B SaaS go-to-market strategy, demand generation, and AI-powered marketing systems.",
    publisher: { "@id": ID.person },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ContactAction",
      target: "https://saren.ai/contact",
      name: "Inquire about fractional marketing lead or AI marketing operations services",
    },
  };
}

/**
 * Service-area business — no street address or phone (neither is visible on the
 * site). Backed by "Irvine, California" + service-radius text in the sitewide footer
 * and on /contact. 10mi radius = 16093m.
 */
export function localBusinessNode(): SchemaNode {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": ID.localBusiness,
    name: "Identogram LLC",
    url: SITE_URL,
    parentOrganization: { "@id": ID.organization },
    founder: { "@id": ID.person },
    description:
      "Fractional marketing lead and AI-native GTM consulting, based in Irvine, California and serving Orange County.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Irvine",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 33.6846,
        longitude: -117.8265,
      },
      geoRadius: "16093",
    },
  };
}

export function breadcrumbNode(trail: TrailItem[], path: string): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? pageUrl(item.href) : pageUrl(path),
    })),
  };
}

export function articleNode(input: ArticleInput, path: string): SchemaNode {
  return {
    "@type": "Article",
    "@id": articleId(path),
    headline: input.headline,
    url: pageUrl(path),
    mainEntityOfPage: { "@id": webPageId(path) },
    author: { "@id": ID.person },
    publisher: { "@id": ID.organization },
    image: input.image ?? "https://saren.ai/images/og/home.png",
    ...(input.about ? { about: input.about } : {}),
    inLanguage: "en-US",
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
  };
}

function faqQuestions(items: FAQItem[]): SchemaNode[] {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));
}

export function webPageNode(
  input: {
    path: string;
    pageType?: PageType;
    name: string;
    description: string;
    dateModified?: string;
    hasBreadcrumb: boolean;
    hasArticle: boolean;
    faq?: FAQItem[];
  }
): SchemaNode {
  const type = input.pageType ?? "WebPage";
  const node: SchemaNode = {
    "@type": input.faq?.length ? [type, "FAQPage"] : type,
    "@id": webPageId(input.path),
    url: pageUrl(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.person },
    author: { "@id": ID.person },
    inLanguage: "en-US",
  };

  if (input.dateModified) node.dateModified = input.dateModified;
  if (input.hasBreadcrumb) node.breadcrumb = { "@id": breadcrumbId(input.path) };

  if (input.faq?.length) {
    node.mainEntity = faqQuestions(input.faq);
  } else if (input.hasArticle) {
    node.mainEntity = { "@id": articleId(input.path) };
  } else if (type === "ProfilePage") {
    node.mainEntity = { "@id": ID.person };
  }

  return node;
}

export function howToNode(input: HowToInput, path: string): SchemaNode {
  return {
    "@type": "HowTo",
    "@id": howToId(path),
    name: input.name,
    description: input.description,
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function definedTermSetNode(input: DefinedTermSetInput, path: string): SchemaNode {
  const setId = definedTermSetId(path);
  return {
    "@type": "DefinedTermSet",
    "@id": setId,
    name: input.name,
    description: input.description,
    hasDefinedTerm: input.terms.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      description: entry.definition,
      inDefinedTermSet: { "@id": setId },
    })),
  };
}
