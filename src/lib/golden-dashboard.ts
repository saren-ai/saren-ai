/**
 * Golden Dashboard: Data Model & Computation Engine
 * Single source of truth for all funnel calculations
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
  mqlToOpp: number; // 0..1
  oppToMeeting: number; // 0..1
  meetingToClose: number; // 0..1
}

export type StageId =
  | "spend"
  | "impressions"
  | "clicks"
  | "leads"
  | "mqls"
  | "opps"
  | "sales_meetings"
  | "closed_won";

export type MetricId =
  | "cpm"
  | "ctr"
  | "cpc"
  | "clickToLead"
  | "cpl"
  | "leadToMql"
  | "cpmql"
  | "mqlToOpp"
  | "cpopp"
  | "oppToMeeting"
  | "cpmeeting"
  | "meetingToClose"
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
    opps: number;
    sales_meetings: number;
    closed_won: number;
  };
  unitCosts: {
    cpc: number | null;
    cpl: number | null;
    cpmql: number | null;
    cpopp: number | null;
    cpmeeting: number | null;
    cpcw: number | null;
  };
  conversionRates: {
    ctr: number;
    clickToLead: number;
    leadToMql: number;
    mqlToOpp: number;
    oppToMeeting: number;
    meetingToClose: number;
  };
}

// ============================================================================
// DEFAULT ASSUMPTIONS
// ============================================================================

export const defaultAssumptions: Assumptions = {
  spend: 100000,
  cpm: 60,
  ctr: 0.021, // 2.1%
  clickToLead: 0.066, // 6.6%
  leadToMql: 0.39, // 39%
  mqlToOpp: 0.25, // 25%
  oppToMeeting: 0.22, // 22%
  meetingToClose: 0.20, // 20%
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
    mqlToOpp: clamp(assumptions.mqlToOpp),
    oppToMeeting: clamp(assumptions.oppToMeeting),
    meetingToClose: clamp(assumptions.meetingToClose),
  };

  // Compute volumes
  const impressions = a.spend / (a.cpm / 1000);
  const clicks = impressions * a.ctr;
  const leads = clicks * a.clickToLead;
  const mqls = leads * a.leadToMql;
  const opps = mqls * a.mqlToOpp;
  const sales_meetings = opps * a.oppToMeeting;
  const closed_won = sales_meetings * a.meetingToClose;

  // Compute unit costs
  const cpc = safeDiv(a.spend, clicks);
  const cpl = safeDiv(a.spend, leads);
  const cpmql = safeDiv(a.spend, mqls);
  const cpopp = safeDiv(a.spend, opps);
  const cpmeeting = safeDiv(a.spend, sales_meetings);
  const cpcw = safeDiv(a.spend, closed_won);

  return {
    stages: {
      impressions,
      clicks,
      leads,
      mqls,
      opps,
      sales_meetings,
      closed_won,
    },
    unitCosts: {
      cpc,
      cpl,
      cpmql,
      cpopp,
      cpmeeting,
      cpcw,
    },
    conversionRates: {
      ctr: a.ctr,
      clickToLead: a.clickToLead,
      leadToMql: a.leadToMql,
      mqlToOpp: a.mqlToOpp,
      oppToMeeting: a.oppToMeeting,
      meetingToClose: a.meetingToClose,
    },
  };
}

// ============================================================================
// PRESETS
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
      leadToMql: 0.30, // 30%
      mqlToOpp: 0.20, // 20%
      oppToMeeting: 0.18, // 18%
      meetingToClose: 0.15, // 15%
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
      leadToMql: 0.35, // 35%
      mqlToOpp: 0.28, // 28%
      oppToMeeting: 0.25, // 25%
      meetingToClose: 0.12, // 12%
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
    formula: "impressions * ctr",
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
    formula: "clicks * clickToLead",
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
    formula: "mqls / leads",
    whyItMatters: "Measures targeting quality and lead fit.",
    levers: [
      "ICP definition",
      "Targeting precision",
      "Scoring criteria",
      "Nurture programs",
    ],
    failureModes: [
      "Low MQL rate (<30%) = poor targeting or weak qualification",
      "High MQL rate but low Opp rate = misaligned sales criteria",
    ],
    playbook: [
      "Align marketing and sales on MQL definition",
      "Use firmographic + behavioral scoring",
      "Implement lead routing based on fit + intent",
    ],
    bench: {
      low: 0.25, // 25%
      typical: 0.39, // 39%
      high: 0.55, // 55%
      citationUrl: "https://firstpagesage.com/reports/lead-to-mql-conversion-rate-benchmarks-by-industry-channel-fc/",
    },
  },
  mqls: {
    id: "mqls",
    label: "Marketing Qualified Leads (MQLs)",
    definition: "Leads that meet your ideal customer profile and intent criteria.",
    formula: "leads * leadToMql",
    whyItMatters: "First quality filter—these are worth sales time.",
    levers: ["Lead quality", "Scoring accuracy", "Nurture effectiveness"],
    failureModes: [
      "MQLs rejected by sales = misaligned definitions",
      "Long time-to-contact = leads go cold",
    ],
    playbook: [
      "Weekly MQL review with sales",
      "SLA for sales follow-up (24-48 hours)",
      "Track MQL → Opp conversion by source",
    ],
  },
  mqlToOpp: {
    id: "mqlToOpp",
    label: "MQL-to-Opportunity Rate",
    definition: "Percentage of MQLs accepted by sales as real opportunities.",
    formula: "opportunities / mqls",
    whyItMatters: "Critical handoff—shows sales-marketing alignment.",
    levers: [
      "Lead quality",
      "Sales follow-up speed",
      "Qualification rigor",
      "SDR effectiveness",
    ],
    failureModes: [
      "Low rate (<20%) = quality problem or poor follow-up",
      "Sales cherry-picking = need better lead distribution",
    ],
    playbook: [
      "Joint marketing-sales lead review",
      "Track conversion by source, persona, offer",
      "Implement automated lead routing + task assignment",
    ],
  },
  opps: {
    id: "opps",
    label: "Opportunities",
    definition: "Sales-accepted opportunities entered into pipeline.",
    formula: "mqls * mqlToOpp",
    whyItMatters: "Real pipeline—marketing's ultimate deliverable.",
    levers: ["MQL volume", "MQL quality", "SDR effectiveness"],
    failureModes: [
      "Opps stall in pipeline = weak qualification",
      "Low meeting conversion = poor opp definition",
    ],
    playbook: [
      "Track opportunity aging and velocity",
      "Implement disqualification criteria",
      "Review lost-opp reasons monthly",
    ],
  },
  oppToMeeting: {
    id: "oppToMeeting",
    label: "Opportunity-to-Meeting Rate",
    definition: "Percentage of opportunities that result in a first sales meeting.",
    formula: "sales_meetings / opportunities",
    whyItMatters: "Measures SDR effectiveness and prospect engagement.",
    levers: [
      "Outreach cadence",
      "Meeting scheduling process",
      "Value proposition clarity",
    ],
    failureModes: [
      "Low rate (<20%) = weak qualification or poor outreach",
      "High no-show rate = need confirmation sequences",
    ],
    playbook: [
      "Optimize SDR sequences (email, call, LinkedIn)",
      "Use calendar links + automated reminders",
      "Pre-meeting content to warm up prospect",
    ],
  },
  sales_meetings: {
    id: "sales_meetings",
    label: "Sales Meetings",
    definition: "First meetings (demos, discovery calls) completed.",
    formula: "opportunities * oppToMeeting",
    whyItMatters: "The handoff from marketing-to-sales is complete.",
    levers: ["Meeting quality", "AE preparation", "Discovery process"],
    failureModes: [
      "High meeting count, low close rate = weak discovery",
      "Long time-to-close = deal complexity or poor qualification",
    ],
    playbook: [
      "Standardize discovery framework (MEDDIC, BANT)",
      "Track meeting-to-proposal and proposal-to-close rates",
      "Implement post-meeting surveys to improve process",
    ],
  },
  meetingToClose: {
    id: "meetingToClose",
    label: "Meeting-to-Close Rate (Win Rate)",
    definition: "Percentage of meetings that result in closed-won deals.",
    formula: "closed_won / sales_meetings",
    whyItMatters: "Ultimate sales effectiveness metric.",
    levers: [
      "Discovery quality",
      "Proposal relevance",
      "Pricing fit",
      "Competitive positioning",
    ],
    failureModes: [
      "Low rate (<15%) = poor qualification or weak value prop",
      "Long sales cycles = need better champions",
    ],
    playbook: [
      "Win/loss analysis (monthly)",
      "Improve proposal quality and speed",
      "Competitive battle cards for AEs",
    ],
    bench: {
      low: 0.15, // 15%
      typical: 0.20, // 20%
      high: 0.30, // 30%
      citationUrl: "https://www.hibob.com/blog/sales-funnel-conversion-rate/",
    },
  },
  closed_won: {
    id: "closed_won",
    label: "Closed-Won Deals",
    definition: "Customers acquired through paid marketing efforts.",
    formula: "sales_meetings * meetingToClose",
    whyItMatters: "Revenue impact—the ultimate goal.",
    levers: ["Win rate", "Meeting volume", "Full-funnel optimization"],
    failureModes: [
      "Low deal count = insufficient top-of-funnel volume",
      "High CAC relative to LTV = unit economics problem",
    ],
    playbook: [
      "Track CAC:LTV ratio (target >3:1)",
      "Cohort analysis to measure retention",
      "Optimize the biggest bottleneck in the funnel",
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
