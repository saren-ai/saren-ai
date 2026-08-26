import { z } from "zod";
import { pageUrl } from "@/lib/schema";

export const CaseStudyTagSchema = z.enum(["SMB", "Solopreneurs", "Thinkers"]);
export const CaseStudyAccentSchema = z.enum(["ember", "lavender", "copper"]);

export const CaseStudyRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  tag: CaseStudyTagSchema,
  accentColor: CaseStudyAccentSchema,
  items: z.array(z.string()).length(4),
  href: z.string(),
});

export type CaseStudyTag = z.infer<typeof CaseStudyTagSchema>;
export type CaseStudyAccent = z.infer<typeof CaseStudyAccentSchema>;
export type CaseStudyRecord = z.infer<typeof CaseStudyRecordSchema>;

/**
 * Single source of truth for the 8 /case-studies/* pages' index-card and list
 * metadata. Previously duplicated by hand across CaseStudiesPageContent.tsx,
 * case-studies/page.tsx's ItemList JSON-LD, and llms.txt/route.ts.
 */
export const CASE_STUDIES: CaseStudyRecord[] = CaseStudyRecordSchema.array().parse([
  {
    id: "120-day-content-journey",
    name: "120-Day Content Journey",
    tagline: "How I engineered $4M in quarterly pipeline at Cylance.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "$4M pipeline generated in a single quarter",
      "Full editorial calendar with demand gen integration",
      "Stage-specific content mapped from awareness to close",
      "Reusable across B2B SaaS verticals",
    ],
    href: "/case-studies/120-day-content-journey",
  },
  {
    id: "dynamic-nurture",
    name: "Dynamic Email Nurture",
    tagline: "A score-gated system that personalizes email by segment and funnel stage.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "9 content variants covering full audience × funnel matrix",
      "Continuous re-scoring after every touchpoint",
      "Sales handoff triggers at 75 behavioral points",
      "Segment-aware subject line and CTA logic",
    ],
    href: "/case-studies/dynamic-nurture",
  },
  {
    id: "intent-data",
    name: "Intent Data as Funnel Intelligence",
    tagline: "Bombora signals mapped to buyer behavior 18 months pre-close.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "Analyzed 100+ close/won accounts for pre-purchase signal patterns",
      "Just-in-time content model triggered by intent spikes",
      "18-month signal horizon for account-based targeting",
      "Measurably improved mid-funnel conversion",
    ],
    href: "/case-studies/intent-data",
  },
  {
    id: "executive-dashboard",
    name: "Demand Gen Command Center",
    tagline: "HubSpot, Apollo, LinkedIn Ads, GA4, and Pendo wired into one live view.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "Real-time pipeline visibility across all active channels",
      "AI-generated executive summaries and anomaly flags",
      "Built with Claude Code in under two days",
      "Full API query transparency — no black boxes",
    ],
    href: "/case-studies/executive-dashboard",
  },
  {
    id: "sovereign-personas",
    name: "Sovereign Buyer Personas",
    tagline: "A framework for building personas that drive targeting, messaging, and content.",
    tag: "SMB",
    accentColor: "ember",
    items: [
      "3x conversion lift when applied to paid and content",
      "Failure-aware architecture — not just job titles and firmographics",
      "ICP segmentation by trigger event, not company size",
      "Includes alignment template for sales and marketing",
    ],
    href: "/case-studies/sovereign-personas",
  },
  {
    id: "10-touch-sales-play",
    name: "10-Touch Sales Play",
    tagline: "Turning cold outreach into executive conversations at a 42% meeting rate.",
    tag: "Solopreneurs",
    accentColor: "lavender",
    items: [
      "42% meeting rate across cold outreach programs",
      "Multi-channel cadence: email, LinkedIn, phone, and video",
      "Sequence templates for all 10 touches",
      "Personalization framework that scales without deep research",
    ],
    href: "/case-studies/10-touch-sales-play",
  },
]);

/** Thin machine-facing record — drops UI-only fields (accentColor) for Surface 2/3 consumers. */
export interface CaseStudyPublicRecord {
  id: string;
  name: string;
  tagline: string;
  category: CaseStudyTag;
  highlights: string[];
  url: string;
}

export function toPublicRecord(cs: CaseStudyRecord): CaseStudyPublicRecord {
  return {
    id: cs.id,
    name: cs.name,
    tagline: cs.tagline,
    category: cs.tag,
    highlights: cs.items,
    url: pageUrl(cs.href),
  };
}
