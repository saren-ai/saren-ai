export type Product = {
  id: string;
  name: string;
  tagline: string;
  priceCents: number;
  tag: "SMB" | "Solopreneurs" | "Thinkers";
  persona: string;
  accentColor: "ember" | "lavender" | "copper";
  items: string[];
  filePath: string | null; // path in Supabase Storage 'downloads' bucket — set when file is uploaded
  published?: boolean;     // false = hidden from storefront until ready
};

export const PRODUCTS: Product[] = [
  {
    id: "gtm-execution-kit",
    name: "The Complete Mid-Market GTM Execution Kit",
    tagline:
      "Strategy → System → Pipeline. Everything a growth-stage team needs to build their first real marketing engine.",
    priceCents: 49900,
    tag: "SMB",
    persona: "/smb",
    accentColor: "ember",
    items: [
      "GTM strategy templates, ICP worksheets, and positioning frameworks",
      "Demand gen architecture blueprints with attribution setup",
      "Sales-marketing alignment operating model and SLA templates",
      "AI prompt sequences for pipeline acceleration",
    ],
    filePath: null,
    published: false,
  },
  {
    id: "fractional-cmo-dashboard",
    name: "The Fractional CMO Pipeline Dashboard",
    tagline:
      "An operating system for solo operators who need pipeline running without being the bottleneck.",
    priceCents: 9900,
    tag: "Solopreneurs",
    persona: "/solopreneurs",
    accentColor: "lavender",
    items: [
      "Weekly pipeline tracking template with automated status logic",
      "Outreach cadence framework for consistent solo prospecting",
      "Client onboarding and offboarding operating checklist",
      "AI prompts for proposal writing and status reporting",
    ],
    filePath: null,
    published: false,
  },
  {
    id: "genx-executive-ai-playbook",
    name: "The Gen X Executive AI Playbook",
    tagline:
      "20 deep-thinking prompts for Generation X executives who want to lead through AI — not be replaced by it.",
    priceCents: 5900,
    tag: "Thinkers",
    persona: "/thinkers",
    accentColor: "copper",
    items: [
      "20 executive-grade AI prompts spanning strategy, leadership, and decision-making",
      "Prompts designed for senior context — not generic productivity hacks",
      "Works in Claude, ChatGPT, or any major AI tool",
      "Includes README and Getting Started guide for immediate deployment",
    ],
    filePath: "genx_executive_ai_playbook.zip",
  },
  {
    id: "content-hook-bundle",
    name: "The Content Hook Mastery Bundle",
    tagline:
      "Three proven hook frameworks and a 30-day architecture to build compounding authority as a subject matter expert.",
    priceCents: 4900,
    tag: "Thinkers",
    persona: "/thinkers",
    accentColor: "copper",
    items: [
      "Viral Content Hook Trilogy with worked examples",
      "30-day content architecture template for compounding authority",
      "Personal brand narrative builder with AI prompt sequences",
      "LinkedIn engagement playbook for subject matter experts",
    ],
    filePath: null,
    published: false,
  },
];

export const PUBLISHED_PRODUCTS = PRODUCTS.filter((p) => p.published !== false);

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
