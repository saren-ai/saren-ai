/**
 * Golden Dashboard: Data Model & Computation Engine
 * Single source of truth for all funnel calculations
 * 
 * REFACTORED: Added SQL stage between MQL and Opportunity
 * Conversion rates now match FirstPageSage B2B SaaS benchmarks
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Assumptions {
  spend: number;
  cpm: number;
  ctr: number; // 0..1
  clickToLead: number; // 0..1
  leadToMql: number; // 0..1
  mqlToSql: number; // 0..1 - NEW: MQL to Sales Qualified Lead
  sqlToOpp: number; // 0..1 - NEW: SQL to Opportunity
  oppToClose: number; // 0..1 - RENAMED from meetingToClose
}

export type StageId =
  | "spend"
  | "impressions"
  | "clicks"
  | "leads"
  | "mqls"
  | "sqls" // NEW stage
  | "opps"
  | "closed_won";

export type MetricId =
  | "cpm"
  | "ctr"
  | "cpc"
  | "clickToLead"
  | "cpl"
  | "leadToMql"
  | "cpmql"
  | "mqlToSql" // NEW
  | "cpsql" // NEW
  | "sqlToOpp" // NEW
  | "cpopp"
  | "oppToClose" // RENAMED
  | "cpcw";

export interface Bench {
  low: number;
  typical: number;
  high: number;
  citationUrl?: string;
}

export interface MetricMeta {
  id: MetricId | StageId;
  label: string;
  sublabel?: string; // NEW: optional sublabel for cards
  definition: string;
  formula: string;
  whyItMatters: string;
  levers: string[];
  failureModes: string[];
  playbook: string[];
  bench?: Bench;
}

export interface ComputedModel {
  stages: {
    impressions: number;
    clicks: number;
    leads: number;
    mqls: number;
    sqls: number; // NEW
    opps: number;
    closed_won: number;
  };
  unitCosts: {
    cpc: number | null;
    cpl: number | null;
    cpmql: number | null;
    cpsql: number | null; // NEW
    cpopp: number | null;
    cpcw: number | null;
  };
  conversionRates: {
    ctr: number;
    clickToLead: number;
    leadToMql: number;
    mqlToSql: number; // NEW
    sqlToOpp: number; // NEW
    oppToClose: number; // RENAMED
  };
}

// ============================================================================
// DEFAULT ASSUMPTIONS (FirstPageSage B2B SaaS Benchmarks)
// ============================================================================

export const defaultAssumptions: Assumptions = {
  spend: 100000,
  cpm: 60,
  ctr: 0.021, // 2.1%
  clickToLead: 0.066, // 6.6%
  leadToMql: 0.42, // 42.47% (rounded) - Lead to MQL
  mqlToSql: 0.38, // 38% - MQL to SQL (sales accepted)
  sqlToOpp: 0.43, // 43% - SQL to Opportunity
  oppToClose: 0.20, // 20% - Opportunity to Close (win rate)
};

// ============================================================================
// COMPUTE MODEL (Single Source of Truth)
// ============================================================================

function safeDiv(num: number, den: number): number | null {
  return den > 0 ? num / den : null;
}

function clamp(value: number, min: number = 0, max: number = 1): number {
  return Math.max(min, Math.min(max, value));
}

export function computeModel(assumptions: Assumptions): ComputedModel {
  // Clamp all rates to [0, 1]
  const a = {
    ...assumptions,
    ctr: clamp(assumptions.ctr),
    clickToLead: clamp(assumptions.clickToLead),
    leadToMql: clamp(assumptions.leadToMql),
    mqlToSql: clamp(assumptions.mqlToSql),
    sqlToOpp: clamp(assumptions.sqlToOpp),
    oppToClose: clamp(assumptions.oppToClose),
  };

  // Compute volumes (cascade through funnel)
  const impressions = a.spend / (a.cpm / 1000);
  const clicks = impressions * a.ctr;
  const leads = clicks * a.clickToLead;
  const mqls = leads * a.leadToMql;
  const sqls = mqls * a.mqlToSql; // NEW: SQLs from MQLs
  const opps = sqls * a.sqlToOpp; // UPDATED: Opps from SQLs (not MQLs)
  const closed_won = opps * a.oppToClose; // UPDATED: Closes from Opps directly

  // Compute unit costs
  const cpc = safeDiv(a.spend, clicks);
  const cpl = safeDiv(a.spend, leads);
  const cpmql = safeDiv(a.spend, mqls);
  const cpsql = safeDiv(a.spend, sqls); // NEW
  const cpopp = safeDiv(a.spend, opps);
  const cpcw = safeDiv(a.spend, closed_won);

  // Debug logging for validation (remove in production)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("Golden Dashboard Model Computation:", {
      spend: a.spend,
      impressions: Math.round(impressions),
      clicks: Math.round(clicks),
      leads: Math.round(leads),
      mqls: Math.round(mqls),
      sqls: Math.round(sqls),
      opps: Math.round(opps),
      closed_won: Math.round(closed_won),
      cac: cpcw ? Math.round(cpcw) : null,
    });
  }

  return {
    stages: {
      impressions,
      clicks,
      leads,
      mqls,
      sqls,
      opps,
      closed_won,
    },
    unitCosts: {
      cpc,
      cpl,
      cpmql,
      cpsql,
      cpopp,
      cpcw,
    },
    conversionRates: {
      ctr: a.ctr,
      clickToLead: a.clickToLead,
      leadToMql: a.leadToMql,
      mqlToSql: a.mqlToSql,
      sqlToOpp: a.sqlToOpp,
      oppToClose: a.oppToClose,
    },
  };
}

// ============================================================================
// PRESETS (Updated with new conversion stages)
// ============================================================================

export const presets = {
  earlyStageSaaS: {
    name: "Early-Stage SaaS",
    description: "Low brand awareness, higher acquisition costs",
    assumptions: {
      spend: 50000,
      cpm: 75,
      ctr: 0.015, // 1.5%
      clickToLead: 0.055, // 5.5%
      leadToMql: 0.35, // 35%
      mqlToSql: 0.30, // 30% - Lower: less sales capacity
      sqlToOpp: 0.35, // 35% - Lower: still refining ICP
      oppToClose: 0.25, // 25% - Conservative win rate
    },
  },
  midMarket: {
    name: "Mid-Market Demand Capture",
    description: "Balanced funnel, established brand",
    assumptions: defaultAssumptions,
  },
  enterprise: {
    name: "Enterprise",
    description: "Higher CPM, lower conversion, longer cycles",
    assumptions: {
      spend: 200000,
      cpm: 90,
      ctr: 0.018, // 1.8%
      clickToLead: 0.048, // 4.8%
      leadToMql: 0.38, // 38%
      mqlToSql: 0.45, // 45% - Higher: better targeting
      sqlToOpp: 0.50, // 50% - Higher: mature sales process
      oppToClose: 0.30, // 30% - Reasonable enterprise win rate
    },
  },
};

// ============================================================================
// METRIC METADATA (Content for tooltips & drawers)
// ============================================================================

export const metricMetadata: Record<string, MetricMeta> = {
  spend: {
    id: "spend",
    label: "Total Ad Spend",
    definition: "The total budget invested in paid advertising across all channels.",
    formula: "Input (starting point)",
    whyItMatters: "This is your input cost that flows through the entire funnel.",
    levers: ["Budget allocation", "Channel mix", "Timing & pacing"],
    failureModes: [
      "Spending too fast without learning",
      "Spreading budget too thin across channels",
      "Not reserving budget for high-performers",
    ],
    playbook: [
      "Start with concentrated budget in 1-2 channels",
      "Test incrementally, measure rigorously",
      "Reallocate based on cost-per-pipeline stage",
    ],
  },
  impressions: {
    id: "impressions",
    label: "Impressions",
    definition: "Total number of times your ads were displayed.",
    formula: "spend / (cpm / 1000)",
    whyItMatters: "Measures reach—how many eyeballs saw your message.",
    levers: ["CPM (bid strategy)", "Audience size", "Creative frequency"],
    failureModes: [
      "High impressions, low clicks = weak creative or targeting",
      "Low impressions = overly narrow targeting or low budget",
    ],
    playbook: [
      "Balance reach and relevance",
      "Test broader audiences with compelling creative",
      "Monitor impression share to identify budget constraints",
    ],
    bench: {
      low: 40,
      typical: 60,
      high: 100,
      citationUrl: "https://www.wordstream.com/blog/ws/2021/08/02/cpm-rates",
    },
  },
  ctr: {
    id: "ctr",
    label: "Click-Through Rate (CTR)",
    definition: "Percentage of impressions that resulted in clicks.",
    formula: "clicks / impressions",
    whyItMatters: "Measures ad creative effectiveness and audience relevance.",
    levers: ["Ad creative", "Headline copy", "Targeting", "Offer clarity"],
    failureModes: [
      "Low CTR (<1%) = poor message-market fit",
      "High CTR but low downstream CVR = bait-and-switch problem",
    ],
    playbook: [
      "A/B test headlines and creative",
      "Match ad promise to landing page",
      "Use outcome-focused messaging (not feature lists)",
    ],
    bench: {
      low: 0.01, // 1%
      typical: 0.021, // 2.1%
      high: 0.04, // 4%
      citationUrl: "https://firstpagesage.com/reports/clickthrough-rates-ctrs-by-industry/",
    },
  },
  clicks: {
    id: "clicks",
    label: "Clicks",
    definition: "Total number of ad clicks to your landing page.",
    formula: "impressions × CTR",
    whyItMatters: "First engagement signal—they're interested enough to learn more.",
    levers: ["CTR improvement", "Impression volume", "Ad creative"],
    failureModes: [
      "Low click volume = insufficient reach or weak creative",
      "Click fraud or bot traffic inflating numbers",
    ],
    playbook: [
      "Monitor click quality (time on site, bounce rate)",
      "Implement fraud detection for high-volume campaigns",
      "Optimize for qualified clicks, not just volume",
    ],
  },
  clickToLead: {
    id: "clickToLead",
    label: "Click-to-Lead CVR",
    definition: "Percentage of clicks that convert to leads (form fills).",
    formula: "leads / clicks",
    whyItMatters: "Measures landing page effectiveness and offer strength.",
    levers: [
      "Message match (ad → page)",
      "Offer quality",
      "Page speed",
      "Form friction",
      "Social proof",
    ],
    failureModes: [
      "High CTR + low CVR = mismatch between ad and landing page",
      "Low form completion rate = too many fields or weak trust signals",
    ],
    playbook: [
      "Audit message match: ad copy → headline → form",
      "Reduce form fields to minimum viable",
      "Add proof (testimonials, logos, case studies)",
      "A/B test offers (guide vs demo vs trial)",
    ],
    bench: {
      low: 0.04, // 4%
      typical: 0.066, // 6.6%
      high: 0.12, // 12%
      citationUrl: "https://unbounce.com/conversion-rate-optimization/b2b-conversion-rates/",
    },
  },
  leads: {
    id: "leads",
    label: "Leads",
    definition: "Total contacts who submitted a form or inquiry.",
    formula: "clicks × clickToLead",
    whyItMatters: "Raw lead volume—the top of your sales funnel.",
    levers: ["Click volume", "Landing page CVR", "Offer quality"],
    failureModes: [
      "High lead volume but low quality = weak qualification",
      "Low lead volume = insufficient traffic or poor conversion",
    ],
    playbook: [
      "Balance volume and quality with progressive profiling",
      "Implement lead scoring to prioritize follow-up",
      "Use content offers to attract the right fit",
    ],
  },
  leadToMql: {
    id: "leadToMql",
    label: "Lead-to-MQL Rate",
    definition: "Percentage of leads that meet marketing-qualified criteria.",
    formula: "MQLs / leads",
    whyItMatters: "Measures targeting quality and lead fit.",
    levers: [
      "ICP definition",
      "Targeting precision",
      "Scoring criteria",
      "Nurture programs",
    ],
    failureModes: [
      "Low MQL rate (<30%) = poor targeting or weak qualification",
      "High MQL rate but low SQL rate = misaligned sales criteria",
    ],
    playbook: [
      "Align marketing and sales on MQL definition",
      "Use firmographic + behavioral scoring",
      "Implement lead routing based on fit + intent",
    ],
    bench: {
      low: 0.30, // 30%
      typical: 0.42, // 42%
      high: 0.55, // 55%
      citationUrl: "https://firstpagesage.com/reports/lead-to-mql-conversion-rate-benchmarks-by-industry-channel-fc/",
    },
  },
  mqls: {
    id: "mqls",
    label: "Marketing Qualified Leads (MQLs)",
    definition: "Leads that meet your ideal customer profile and intent criteria.",
    formula: "leads × leadToMql",
    whyItMatters: "First quality filter—these are worth sales time.",
    levers: ["Lead quality", "Scoring accuracy", "Nurture effectiveness"],
    failureModes: [
      "MQLs rejected by sales = misaligned definitions",
      "Long time-to-contact = leads go cold",
    ],
    playbook: [
      "Weekly MQL review with sales",
      "SLA for sales follow-up (24-48 hours)",
      "Track MQL → SQL conversion by source",
    ],
  },
  // NEW: MQL to SQL conversion rate
  mqlToSql: {
    id: "mqlToSql",
    label: "MQL-to-SQL Rate",
    definition: "Percentage of MQLs accepted by sales as Sales Qualified Leads.",
    formula: "SQLs / MQLs",
    whyItMatters: "Critical handoff—shows sales-marketing alignment on lead quality.",
    levers: [
      "MQL quality and fit scoring",
      "Sales follow-up speed and rigor",
      "Qualification criteria alignment",
      "SDR/BDR effectiveness",
    ],
    failureModes: [
      "Low rate (<25%) = marketing-sales misalignment on definitions",
      "Sales cherry-picking = need better lead distribution",
      "Long response time = leads going cold before qualification",
    ],
    playbook: [
      "Establish joint marketing-sales lead review cadence",
      "Define clear SQL criteria (BANT, MEDDIC, etc.)",
      "Track rejection reasons to improve MQL quality",
      "Implement automated lead routing + task assignment",
    ],
    bench: {
      low: 0.25, // 25%
      typical: 0.38, // 38%
      high: 0.51, // 51%
      citationUrl: "https://firstpagesage.com/reports/sales-funnel-conversion-rate-benchmarks/",
    },
  },
  // NEW: SQL stage
  sqls: {
    id: "sqls",
    label: "Sales Qualified Leads (SQLs)",
    sublabel: "(Sales Meetings)",
    definition: "MQLs that have been accepted by sales after qualification call or discovery meeting.",
    formula: "MQLs × mqlToSql",
    whyItMatters: "Real sales engagement—these prospects have budget, authority, need, and timeline.",
    levers: ["MQL quality", "Sales follow-up speed", "Discovery call effectiveness"],
    failureModes: [
      "SQLs not converting to pipeline = weak discovery process",
      "High volume but low quality = overly lenient qualification",
      "Long time-in-stage = deal velocity issues",
    ],
    playbook: [
      "Standardize SQL qualification criteria (BANT, MEDDIC)",
      "Track time-to-SQL from MQL creation",
      "Review SQL-to-Opp conversion weekly with sales",
      "Implement discovery call frameworks and coaching",
    ],
    bench: {
      low: 0.25, // 25%
      typical: 0.38, // 38%
      high: 0.51, // 51%
      citationUrl: "https://firstpagesage.com/reports/sales-funnel-conversion-rate-benchmarks/",
    },
  },
  // NEW: SQL to Opportunity conversion rate
  sqlToOpp: {
    id: "sqlToOpp",
    label: "SQL-to-Opportunity Rate",
    definition: "Percentage of SQLs that convert to qualified pipeline opportunities.",
    formula: "Opportunities / SQLs",
    whyItMatters: "Measures sales team's ability to convert qualified conversations into real pipeline.",
    levers: [
      "Discovery call quality",
      "Value proposition clarity",
      "Competitive positioning",
      "Proposal timing and quality",
    ],
    failureModes: [
      "Low rate (<35%) = poor discovery or weak value prop",
      "High rate but low close rate = inflated pipeline",
      "Deals stalling = need champion or clearer next steps",
    ],
    playbook: [
      "Implement structured discovery frameworks",
      "Create mutual action plans with prospects",
      "Define clear opportunity creation criteria",
      "Review pipeline quality weekly (not just quantity)",
    ],
    bench: {
      low: 0.30, // 30%
      typical: 0.43, // 43%
      high: 0.55, // 55%
      citationUrl: "https://firstpagesage.com/reports/sales-funnel-conversion-rate-benchmarks/",
    },
  },
  opps: {
    id: "opps",
    label: "Opportunities",
    sublabel: "(Pipeline)",
    definition: "Qualified deals with estimated value entered into sales pipeline.",
    formula: "SQLs × sqlToOpp",
    whyItMatters: "Real pipeline—the bridge between marketing activity and revenue.",
    levers: ["SQL volume and quality", "Discovery effectiveness", "Pipeline hygiene"],
    failureModes: [
      "Opps stall in pipeline = weak qualification or no champion",
      "High opp count but low close rate = pipeline inflation",
      "Long sales cycles = need better qualification earlier",
    ],
    playbook: [
      "Track opportunity aging and velocity by stage",
      "Implement rigorous disqualification criteria",
      "Review lost-opp reasons monthly for patterns",
      "Focus on pipeline quality over quantity",
    ],
  },
  // RENAMED: Opportunity to Close (was meetingToClose)
  oppToClose: {
    id: "oppToClose",
    label: "Opportunity-to-Close Rate (Win Rate)",
    definition: "Percentage of pipeline opportunities that result in closed-won deals.",
    formula: "closed_won / opportunities",
    whyItMatters: "Ultimate sales effectiveness metric—converts pipeline to revenue.",
    levers: [
      "Discovery and qualification rigor",
      "Proposal quality and timing",
      "Pricing and packaging fit",
      "Competitive positioning",
      "Champion development",
    ],
    failureModes: [
      "Low rate (<25%) = poor qualification or weak value prop",
      "Long sales cycles = need better champions or clearer decision process",
      "High rate of 'no decision' = prospects not feeling urgency",
    ],
    playbook: [
      "Win/loss analysis (monthly)",
      "Improve proposal quality and speed",
      "Develop competitive battle cards for AEs",
      "Implement deal reviews for stalled opportunities",
      "Create mutual close plans with champions",
    ],
    bench: {
      low: 0.20, // 20%
      typical: 0.38, // 38%
      high: 0.50, // 50%
      citationUrl: "https://firstpagesage.com/reports/sales-funnel-conversion-rate-benchmarks/",
    },
  },
  closed_won: {
    id: "closed_won",
    label: "Closed-Won Deals",
    definition: "Customers acquired through paid marketing efforts.",
    formula: "opportunities × oppToClose",
    whyItMatters: "Revenue impact—the ultimate goal of the entire funnel.",
    levers: ["Win rate improvement", "Pipeline volume", "Full-funnel optimization"],
    failureModes: [
      "Low deal count = insufficient top-of-funnel volume",
      "High CAC relative to LTV = unit economics problem",
      "Long time-to-close = cash flow and forecasting issues",
    ],
    playbook: [
      "Track CAC:LTV ratio (target >3:1)",
      "Cohort analysis to measure retention",
      "Optimize the biggest bottleneck in the funnel",
      "Focus on deal velocity, not just volume",
    ],
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function formatNumber(num: number | null, decimals: number = 0): string {
  if (num === null) return "—";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toFixed(decimals);
}

export function formatCurrency(num: number | null, decimals: number = 0): string {
  if (num === null) return "—";
  return `$${formatNumber(num, decimals)}`;
}

export function formatPercent(num: number, decimals: number = 1): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

export function calculateDelta(current: number, baseline: number): number {
  if (baseline === 0) return 0;
  return ((current - baseline) / baseline) * 100;
}

// ============================================================================
// VALIDATION: Expected outputs with $100K spend and default assumptions
// ============================================================================
// 
// With defaultAssumptions:
// - Impressions: 100000 / (60/1000) = 1,666,667
// - Clicks: 1,666,667 × 0.021 = 35,000
// - Leads: 35,000 × 0.066 = 2,310
// - MQLs: 2,310 × 0.42 = 970
// - SQLs: 970 × 0.38 = 369
// - Opps: 369 × 0.43 = 159
// - Closed-Won: 159 × 0.38 = 60
// - CAC: $100,000 / 60 = ~$1,667
//
// This produces realistic B2B SaaS metrics with proper funnel decay.
