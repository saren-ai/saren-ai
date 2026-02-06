// SaaS Revenue Calculator - Calculation Logic

import type { FunnelResult, ConversionRates, CompanyScale } from "./types";

/**
 * Calculate funnel metrics working backwards from revenue goal
 * @param revenueGoal - Annual revenue target
 * @param avgDealSize - Average contract value
 * @param rates - Conversion rates at each stage
 * @returns Complete funnel with annual and monthly values
 */
export function calculateFunnel(
  revenueGoal: number,
  avgDealSize: number,
  rates: ConversionRates
): FunnelResult {
  // Guard against divide-by-zero: clamp zero rates to a small minimum
  const safeRate = (rate: number) => (rate <= 0 || !Number.isFinite(rate)) ? 0.001 : rate;

  // Work backwards from revenue
  const closedWon = Math.ceil(revenueGoal / (avgDealSize || 1));
  const opportunities = Math.ceil(closedWon / safeRate(rates.opportunityToClose));
  const sqos = Math.ceil(opportunities / safeRate(rates.sqlToOpportunity));
  const mqls = Math.ceil(sqos / safeRate(rates.mqlToSQL));
  const leads = Math.ceil(mqls / safeRate(rates.leadToMQL));
  const webVisitors = Math.ceil(leads / safeRate(rates.visitorToLead));

  return {
    webVisitors,
    leads,
    mqls,
    sqos,
    opportunities,
    closedWon,
    monthlyVisitors: Math.ceil(webVisitors / 12),
    monthlyLeads: Math.ceil(leads / 12),
    monthlyMQLs: Math.ceil(mqls / 12),
    monthlySQOs: Math.ceil(sqos / 12),
    monthlyOpportunities: Math.ceil(opportunities / 12),
    monthlyClosedWon: Math.ceil(closedWon / 12),
  };
}

/**
 * Calculate required marketing budget based on CAC
 * @param closedWonDeals - Number of deals needed
 * @param cacRate - Cost to acquire one customer
 * @param revenueGoal - For calculating % of revenue
 * @returns Budget required and percentage of goal
 */
export function calculateCAC(
  closedWonDeals: number,
  cacRate: number,
  revenueGoal: number
): { budget: number; percentOfGoal: number } {
  const budget = closedWonDeals * cacRate;
  const percentOfGoal = (budget / revenueGoal) * 100;
  return { budget, percentOfGoal };
}

/**
 * Format number with commas and appropriate precision
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format currency with dollar sign
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage with specified precision
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Get conversion rate between two adjacent stages
 */
export function getConversionRate(
  fromStage: string,
  toStage: string,
  rates: ConversionRates
): number {
  const rateMap: { [key: string]: number } = {
    "webVisitors-leads": rates.visitorToLead,
    "leads-mqls": rates.leadToMQL,
    "mqls-sqos": rates.mqlToSQL,
    "sqos-opportunities": rates.sqlToOpportunity,
    "opportunities-closedWon": rates.opportunityToClose,
  };

  return rateMap[`${fromStage}-${toStage}`] || 0;
}

/**
 * Validate calculator inputs
 */
export function validateInputs(revenueGoal: number, avgDealSize: number): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (revenueGoal <= 0) {
    errors.push("Revenue goal must be greater than 0");
  }
  if (revenueGoal > 1_000_000_000) {
    errors.push("Revenue goal must be less than $1B");
  }
  if (avgDealSize <= 0) {
    errors.push("Average deal size must be greater than 0");
  }
  if (avgDealSize > revenueGoal) {
    errors.push("Average deal size cannot exceed revenue goal");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get label for company scale
 */
export function getScaleLabel(scale: CompanyScale): string {
  const labels: { [key in CompanyScale]: string } = {
    consumer: "Consumer",
    smb: "SMB",
    middleMarket: "Mid-Market",
    enterprise: "Enterprise",
  };
  return labels[scale];
}
