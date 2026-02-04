// SaaS Revenue Calculator - Type Definitions

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

export interface CalculatorState {
  revenueGoal: number;
  avgDealSize: number;
  selectedIndustry: string;
  customRates: ConversionRates;
  useCustomRates: boolean;
}

export interface FunnelResult {
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
}

export type ViewMode = "annual" | "monthly";
export type CompanyScale = "consumer" | "smb" | "middleMarket" | "enterprise";
