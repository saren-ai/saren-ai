// SaaS Revenue Calculator - Type Definitions (Enhanced for Bidirectional Calculator)

// ============ Core Funnel Types ============

export interface FunnelStage {
  id: string;
  name: string;
  description: string;
  benchmarkRange: string;
  value: number;
  monthlyValue: number;
}

export interface ConversionRates {
  visitorToLead: number;
  leadToMQL: number;
  mqlToSQL: number;
  sqlToOpportunity: number;
  opportunityToClose: number;
}

export interface IndustryRates extends ConversionRates {
  industry: string;
}

// ============ Benchmark Data Types ============

export interface CACData {
  industry: string;
  consumer: number | null;
  smb: number | null;
  middleMarket: number | null;
  enterprise: number | null;
}

export interface TrafficSourceRate {
  source: string;
  explanation: string;
  conversionRate: number;
}

export interface FreeTrialRate {
  industry: string;
  visitorToTrial: number;
  trialToPaid: number;
  visitorToFreemium: number;
  freemiumToPaid: number;
}

export interface CACByChannel {
  channel: string;
  b2b: number | null;
  b2c: number | null;
}

// ============ Ad Benchmark Types ============

export interface AdPlatformBenchmark {
  platform: string;
  cpm: { min: number; max: number; avg: number };
  ctr: { min: number; max: number; avg: number };
  cpc: { min: number; max: number; avg: number };
  notes: string;
}

// ============ Enhanced Calculator State ============

export type CustomerType = "consumer" | "smb" | "middleMarket" | "enterprise";
export type ChannelMix = "paid-led" | "product-led" | "hybrid";
export type CalculationDirection = "forward" | "reverse";

export interface CalculatorState {
  // User selections
  selectedIndustry: string;
  customerType: CustomerType;
  channelMix: ChannelMix;

  // Bidirectional inputs (only one active)
  direction: CalculationDirection;
  budget: number | null;
  revenueGoal: number | null;

  // Deal size
  avgDealSize: number;

  // Conversion rates (editable)
  conversionRates: ConversionRates;
  useCustomRates: boolean;
}

export interface FunnelResult {
  // Volumes
  webVisitors: number;
  leads: number;
  mqls: number;
  sqos: number;
  opportunities: number;
  closedWon: number;

  // Monthly variants
  monthlyVisitors: number;
  monthlyLeads: number;
  monthlyMQLs: number;
  monthlySQOs: number;
  monthlyOpportunities: number;
  monthlyClosedWon: number;

  // Costs (only present for forward calculation)
  totalSpend: number;
  costPerVisitor: number;
  cpl: number;
  cpql: number;
  cpsql: number;
  cpOpp: number;
  cac: number;

  // Revenue & ROI
  revenue: number;
  roi: number;

  // Gap analysis (present when both budget and goal set)
  gap?: {
    revenueGap: number;
    budgetGap: number;
    percentageOff: number;
  };
}

export interface FunnelStageData {
  id: string;
  label: string;
  volume: number;
  costPer: number;
  conversionRate: number | null; // null for first stage
  benchmarkRate?: { min: number; avg: number; max: number };
  editable: boolean;
}

// ============ Benchmark Lookup Types ============

export interface BenchmarkData {
  cac: { min: number; avg: number; max: number };
  conversionRates: ConversionRates;
  avgDealSize: number;
  costPerVisit: number;
}

export interface PercentileResult {
  value: number;
  percentile: number;
  label: "poor" | "below-average" | "average" | "above-average" | "excellent";
}

// ============ Display Types ============

export type ViewMode = "annual" | "monthly";
export type CompanyScale = "consumer" | "smb" | "middleMarket" | "enterprise";
