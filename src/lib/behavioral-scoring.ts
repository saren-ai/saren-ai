// Behavioral Lead Scoring System - Data Model & Logic

export type BuyerState =
  | "unknown-unknown"
  | "known-unknown"
  | "known-lead"
  | "mql"
  | "sql";

export interface BuyerStateConfig {
  id: BuyerState;
  label: string;
  description: string;
  scoreRange: string;
  typicalBehaviors: string[];
  systemResponse: string;
  nextStep: string;
}

export const buyerStates: BuyerStateConfig[] = [
  {
    id: "unknown-unknown",
    label: "Unknown Unknown",
    description: "Anonymous visitor with no identity captured",
    scoreRange: "N/A",
    typicalBehaviors: [
      "Page views",
      "Content consumption",
      "Search patterns",
      "Time on site",
    ],
    systemResponse:
      "System observes behavioral patterns to inform content personalization",
    nextStep: "Identity capture through form fill or enrichment",
  },
  {
    id: "known-unknown",
    label: "Known Unknown",
    description: "Identified via enrichment, fit score calculated",
    scoreRange: "0–50 (fit only)",
    typicalBehaviors: [
      "Reverse IP lookup",
      "Email discovery",
      "Firmographic match",
      "Not yet engaged",
    ],
    systemResponse:
      "Fit score calculated, eligible for targeted nurture sequences",
    nextStep: "First engagement to activate engagement scoring",
  },
  {
    id: "known-lead",
    label: "Known Lead",
    description: "Contactable identity with engagement beginning",
    scoreRange: "50–59",
    typicalBehaviors: [
      "Email opens",
      "Link clicks",
      "Multiple page visits",
      "Content downloads",
    ],
    systemResponse:
      "Entered into nurture workflows, engagement tracking active",
    nextStep:
      "Continued engagement to reach MQL threshold (typically 60–70 score)",
  },
  {
    id: "mql",
    label: "Marketing-Qualified Lead",
    description: "Sufficient behavioral evidence of intent",
    scoreRange: "60–74",
    typicalBehaviors: [
      "High-intent page views",
      "Webinar attendance",
      "Multiple content pieces",
      "Pricing page visits",
    ],
    systemResponse:
      "Advanced nurture, sales alerts, continued marketing ownership",
    nextStep: "Reach 75+ threshold for sales review",
  },
  {
    id: "sql",
    label: "Sales-Qualified Lead",
    description: "Human review by sales, ready for outbound or meeting",
    scoreRange: "75–100",
    typicalBehaviors: [
      "Demo requests",
      "Contact form submissions",
      "Deep product exploration",
      "Multiple decision-makers engaged",
    ],
    systemResponse:
      "Sales notified, enters outbound sequence or meeting scheduling workflow",
    nextStep: "Human conversation and opportunity creation",
  },
];

export interface FitScoreFactor {
  id: string;
  label: string;
  description: string;
  weight: number; // max points this factor contributes to fit score (out of 50)
  criteria: { value: string; points: number }[];
}

export const fitScoreFactors: FitScoreFactor[] = [
  {
    id: "company-size",
    label: "Company Size",
    description: "Employee count aligned with ICP",
    weight: 15,
    criteria: [
      { value: "1-50", points: 0 },
      { value: "51-200", points: 5 },
      { value: "201-1000", points: 10 },
      { value: "1001-5000", points: 15 },
      { value: "5000+", points: 12 },
    ],
  },
  {
    id: "industry",
    label: "Industry / Vertical",
    description: "Target market alignment",
    weight: 10,
    criteria: [
      { value: "SaaS / Technology", points: 10 },
      { value: "Financial Services", points: 8 },
      { value: "Healthcare", points: 7 },
      { value: "Manufacturing", points: 5 },
      { value: "Other", points: 0 },
    ],
  },
  {
    id: "role",
    label: "Job Title / Role",
    description: "Buying authority proxy",
    weight: 15,
    criteria: [
      { value: "VP / C-level", points: 15 },
      { value: "Director", points: 12 },
      { value: "Manager", points: 8 },
      { value: "Individual Contributor", points: 3 },
      { value: "Unknown", points: 0 },
    ],
  },
  {
    id: "geography",
    label: "Geographic Market",
    description: "Serviceable market eligibility",
    weight: 10,
    criteria: [
      { value: "North America", points: 10 },
      { value: "Western Europe", points: 9 },
      { value: "APAC", points: 7 },
      { value: "Other", points: 5 },
    ],
  },
];

export interface EngagementAction {
  id: string;
  label: string;
  description: string;
  points: number;
  category: "low" | "medium" | "high";
  repeatable: boolean;
}

export const engagementActions: EngagementAction[] = [
  {
    id: "email-open",
    label: "Email Opened",
    description: "Basic awareness signal",
    points: 1,
    category: "low",
    repeatable: true,
  },
  {
    id: "email-click",
    label: "Link Clicked",
    description: "Active engagement with content",
    points: 3,
    category: "low",
    repeatable: true,
  },
  {
    id: "website-visit",
    label: "Website Revisit",
    description: "Returning visitor, building familiarity",
    points: 2,
    category: "low",
    repeatable: true,
  },
  {
    id: "content-download",
    label: "Content Downloaded",
    description: "White paper, guide, or resource",
    points: 5,
    category: "medium",
    repeatable: true,
  },
  {
    id: "webinar-registered",
    label: "Webinar Registered",
    description: "Time commitment, education signal",
    points: 7,
    category: "medium",
    repeatable: true,
  },
  {
    id: "webinar-attended",
    label: "Webinar Attended",
    description: "Followed through on commitment",
    points: 10,
    category: "high",
    repeatable: true,
  },
  {
    id: "pricing-viewed",
    label: "Pricing Page Viewed",
    description: "High-intent evaluation signal",
    points: 8,
    category: "high",
    repeatable: false,
  },
  {
    id: "demo-requested",
    label: "Demo Requested",
    description: "Explicit intent to evaluate",
    points: 15,
    category: "high",
    repeatable: false,
  },
  {
    id: "contact-submitted",
    label: "Contact Form Submitted",
    description: "Direct inquiry, immediate follow-up",
    points: 12,
    category: "high",
    repeatable: false,
  },
];

export interface BuyerProfile {
  // Fit scoring inputs
  companySize: string;
  industry: string;
  role: string;
  geography: string;
  // Engagement tracking
  engagementHistory: { actionId: string; timestamp: number }[];
}

export interface ScoringResult {
  fitScore: number;
  engagementScore: number;
  totalScore: number;
  buyerState: BuyerState;
  fitBreakdown: { factor: string; points: number }[];
  engagementBreakdown: { action: string; points: number; count: number }[];
  threshold: {
    current: number;
    mqlThreshold: number;
    sqlThreshold: number;
    toMQL: number;
    toSQL: number;
  };
}

export function calculateFitScore(profile: BuyerProfile): {
  total: number;
  breakdown: { factor: string; points: number }[];
} {
  const breakdown: { factor: string; points: number }[] = [];

  fitScoreFactors.forEach((factor) => {
    let points = 0;
    const criterion = factor.criteria.find(
      (c) => c.value === (profile as any)[factor.id.replace(/-/g, "")]
    );
    if (criterion) {
      points = criterion.points;
    }
    breakdown.push({ factor: factor.label, points });
  });

  const total = breakdown.reduce((sum, item) => sum + item.points, 0);
  return { total, breakdown };
}

export function calculateEngagementScore(profile: BuyerProfile): {
  total: number;
  breakdown: { action: string; points: number; count: number }[];
} {
  const actionCounts: { [key: string]: number } = {};
  const breakdown: { action: string; points: number; count: number }[] = [];

  // Count actions
  profile.engagementHistory.forEach((entry) => {
    actionCounts[entry.actionId] = (actionCounts[entry.actionId] || 0) + 1;
  });

  // Calculate points per action
  Object.keys(actionCounts).forEach((actionId) => {
    const action = engagementActions.find((a) => a.id === actionId);
    if (action) {
      const count = actionCounts[actionId];
      const effectiveCount = action.repeatable ? count : 1;
      const points = action.points * effectiveCount;
      breakdown.push({ action: action.label, points, count: effectiveCount });
    }
  });

  const total = Math.min(
    50,
    breakdown.reduce((sum, item) => sum + item.points, 0)
  );
  return { total, breakdown };
}

export function determineBuyerState(
  fitScore: number,
  engagementScore: number,
  hasIdentity: boolean
): BuyerState {
  if (!hasIdentity) return "unknown-unknown";
  if (engagementScore === 0) return "known-unknown";

  const totalScore = fitScore + engagementScore;
  if (totalScore >= 75) return "sql";
  if (totalScore >= 60) return "mql";
  return "known-lead";
}

export function computeScoring(profile: BuyerProfile): ScoringResult {
  const hasIdentity =
    profile.companySize !== "" &&
    profile.industry !== "" &&
    profile.role !== "" &&
    profile.geography !== "";

  const fitResult = calculateFitScore(profile);
  const engagementResult = calculateEngagementScore(profile);
  const totalScore = fitResult.total + engagementResult.total;
  const buyerState = determineBuyerState(
    fitResult.total,
    engagementResult.total,
    hasIdentity
  );

  return {
    fitScore: fitResult.total,
    engagementScore: engagementResult.total,
    totalScore,
    buyerState,
    fitBreakdown: fitResult.breakdown,
    engagementBreakdown: engagementResult.breakdown,
    threshold: {
      current: totalScore,
      mqlThreshold: 60,
      sqlThreshold: 75,
      toMQL: Math.max(0, 60 - totalScore),
      toSQL: Math.max(0, 75 - totalScore),
    },
  };
}

// Utility for formatting
export function formatScore(score: number): string {
  return score.toString();
}

export function getStateColor(state: BuyerState): string {
  switch (state) {
    case "unknown-unknown":
      return "slate";
    case "known-unknown":
      return "electric";
    case "known-lead":
      return "copper";
    case "mql":
      return "amber-500";
    case "sql":
      return "ember";
  }
}
