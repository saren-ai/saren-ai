// SaaS Revenue Calculator - Calculation Logic (Enhanced Bidirectional Engine)

import type {
  FunnelResult,
  ConversionRates,
  CompanyScale,
  CalculatorState,
  CustomerType,
} from "./types";
import { estimateCostPerVisit } from "./benchmark-data";

// ============ Safe rate helper ============

const safeRate = (rate: number) =>
  rate <= 0 || !Number.isFinite(rate) ? 0.001 : rate;
const safeDivide = (a: number, b: number) => (b === 0 ? 0 : a / b);

// ============ Core Bidirectional Engine ============

/**
 * Main calculation entry point.
 * Determines direction and calculates the full funnel.
 */
export function calculateBidirectionalFunnel(
  config: CalculatorState
): FunnelResult {
  const costPerVisit = estimateCostPerVisit(config.channelMix);

  if (config.direction === "forward" && config.budget !== null) {
    return calculateForward(config, costPerVisit);
  } else if (config.revenueGoal !== null) {
    return calculateReverse(config, costPerVisit);
  }

  // Fallback: return empty result
  return createEmptyResult();
}

/**
 * Forward calculation: Budget → Revenue
 * Start with budget, work through funnel to predict revenue.
 */
function calculateForward(
  config: CalculatorState,
  costPerVisit: number
): FunnelResult {
  const { budget, conversionRates, avgDealSize } = config;
  const spend = budget ?? 0;

  // Budget → Web visitors (using cost-per-visit estimate)
  const webVisitors = Math.round(safeDivide(spend, costPerVisit));

  // Work forward through funnel
  const leads = Math.round(webVisitors * safeRate(conversionRates.visitorToLead));
  const mqls = Math.round(leads * safeRate(conversionRates.leadToMQL));
  const sqos = Math.round(mqls * safeRate(conversionRates.mqlToSQL));
  const opportunities = Math.round(sqos * safeRate(conversionRates.sqlToOpportunity));
  const closedWon = Math.round(opportunities * safeRate(conversionRates.opportunityToClose));

  // Calculate costs per stage
  const cpl = safeDivide(spend, leads);
  const cpql = safeDivide(spend, mqls);
  const cpsql = safeDivide(spend, sqos);
  const cpOpp = safeDivide(spend, opportunities);
  const cac = safeDivide(spend, closedWon);

  // Calculate revenue
  const revenue = closedWon * (avgDealSize || 1);
  const roi = safeDivide(revenue, spend);

  // Gap analysis if revenue goal is also set
  let gap: FunnelResult["gap"];
  if (config.revenueGoal && config.revenueGoal > 0) {
    gap = {
      revenueGap: config.revenueGoal - revenue,
      budgetGap: 0,
      percentageOff: safeDivide(config.revenueGoal - revenue, config.revenueGoal) * 100,
    };
  }

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
    totalSpend: spend,
    costPerVisitor: costPerVisit,
    cpl,
    cpql,
    cpsql,
    cpOpp,
    cac,
    revenue,
    roi,
    gap,
  };
}

/**
 * Reverse calculation: Revenue Goal → Required Budget
 * Start with revenue goal, work backwards to determine required visitors,
 * then compute the budget needed to acquire them.
 */
function calculateReverse(
  config: CalculatorState,
  costPerVisit: number
): FunnelResult {
  const { revenueGoal, conversionRates, avgDealSize } = config;
  const goal = revenueGoal ?? 0;

  // Work backwards from revenue
  const closedWon = Math.ceil(safeDivide(goal, avgDealSize || 1));
  const opportunities = Math.ceil(safeDivide(closedWon, safeRate(conversionRates.opportunityToClose)));
  const sqos = Math.ceil(safeDivide(opportunities, safeRate(conversionRates.sqlToOpportunity)));
  const mqls = Math.ceil(safeDivide(sqos, safeRate(conversionRates.mqlToSQL)));
  const leads = Math.ceil(safeDivide(mqls, safeRate(conversionRates.leadToMQL)));
  const webVisitors = Math.ceil(safeDivide(leads, safeRate(conversionRates.visitorToLead)));

  // Calculate required budget
  const totalSpend = webVisitors * costPerVisit;

  // Calculate costs per stage
  const cpl = safeDivide(totalSpend, leads);
  const cpql = safeDivide(totalSpend, mqls);
  const cpsql = safeDivide(totalSpend, sqos);
  const cpOpp = safeDivide(totalSpend, opportunities);
  const cac = safeDivide(totalSpend, closedWon);

  const roi = safeDivide(goal, totalSpend);

  // Gap analysis if budget is also set
  let gap: FunnelResult["gap"];
  if (config.budget && config.budget > 0) {
    gap = {
      revenueGap: 0,
      budgetGap: totalSpend - config.budget,
      percentageOff: safeDivide(totalSpend - config.budget, totalSpend) * 100,
    };
  }

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
    totalSpend,
    costPerVisitor: costPerVisit,
    cpl,
    cpql,
    cpsql,
    cpOpp,
    cac,
    revenue: goal,
    roi,
    gap,
  };
}

function createEmptyResult(): FunnelResult {
  return {
    webVisitors: 0, leads: 0, mqls: 0, sqos: 0, opportunities: 0, closedWon: 0,
    monthlyVisitors: 0, monthlyLeads: 0, monthlyMQLs: 0, monthlySQOs: 0,
    monthlyOpportunities: 0, monthlyClosedWon: 0,
    totalSpend: 0, costPerVisitor: 0, cpl: 0, cpql: 0, cpsql: 0, cpOpp: 0, cac: 0,
    revenue: 0, roi: 0,
  };
}

// ============ Legacy API (backwards-compatible) ============

/**
 * Calculate funnel metrics working backwards from revenue goal.
 * @deprecated Use calculateBidirectionalFunnel instead.
 */
export function calculateFunnel(
  revenueGoal: number,
  avgDealSize: number,
  rates: ConversionRates
): FunnelResult {
  const closedWon = Math.ceil(revenueGoal / (avgDealSize || 1));
  const opportunities = Math.ceil(closedWon / safeRate(rates.opportunityToClose));
  const sqos = Math.ceil(opportunities / safeRate(rates.sqlToOpportunity));
  const mqls = Math.ceil(sqos / safeRate(rates.mqlToSQL));
  const leads = Math.ceil(mqls / safeRate(rates.leadToMQL));
  const webVisitors = Math.ceil(leads / safeRate(rates.visitorToLead));

  const costPerVisit = estimateCostPerVisit("hybrid");
  const totalSpend = webVisitors * costPerVisit;

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
    totalSpend,
    costPerVisitor: costPerVisit,
    cpl: safeDivide(totalSpend, leads),
    cpql: safeDivide(totalSpend, mqls),
    cpsql: safeDivide(totalSpend, sqos),
    cpOpp: safeDivide(totalSpend, opportunities),
    cac: safeDivide(totalSpend, closedWon),
    revenue: revenueGoal,
    roi: safeDivide(revenueGoal, totalSpend),
  };
}

// ============ Optimization Engine ============

/**
 * Generate optimization suggestions based on funnel performance vs benchmarks.
 */
export function generateOptimizationSuggestions(
  rates: ConversionRates,
  benchmarks: Record<keyof ConversionRates, { min: number; avg: number; max: number }>,
  funnel: FunnelResult,
  cacBenchmarkAvg: number
): {
  type: string;
  stage: string;
  current: number;
  target: number;
  impact: string;
  savingsEstimate: number;
}[] {
  const suggestions: {
    type: string;
    stage: string;
    current: number;
    target: number;
    impact: string;
    savingsEstimate: number;
  }[] = [];

  const stageNames: Record<keyof ConversionRates, string> = {
    visitorToLead: "Visitor → Lead",
    leadToMQL: "Lead → MQL",
    mqlToSQL: "MQL → SQL",
    sqlToOpportunity: "SQL → Opportunity",
    opportunityToClose: "Opportunity → Close",
  };

  // Find stages performing below benchmark average
  (Object.keys(stageNames) as (keyof ConversionRates)[]).forEach((key) => {
    const current = rates[key];
    const benchmark = benchmarks[key];
    const gap = benchmark.avg - current;

    if (gap > 0.01) {
      // More than 1% below benchmark average
      const improvement = Math.min(gap, 0.05); // Cap suggestion at 5% improvement
      const newRate = current + improvement;

      // Estimate impact: improved conversion compounds through the funnel
      const currentOverallConversion =
        rates.visitorToLead *
        rates.leadToMQL *
        rates.mqlToSQL *
        rates.sqlToOpportunity *
        rates.opportunityToClose;

      const improvedRates = { ...rates, [key]: newRate };
      const improvedOverallConversion =
        improvedRates.visitorToLead *
        improvedRates.leadToMQL *
        improvedRates.mqlToSQL *
        improvedRates.sqlToOpportunity *
        improvedRates.opportunityToClose;

      const conversionImprovement =
        ((improvedOverallConversion - currentOverallConversion) / currentOverallConversion) * 100;

      const savingsEstimate = funnel.totalSpend * (conversionImprovement / 100);

      suggestions.push({
        type: "improve-conversion",
        stage: stageNames[key],
        current,
        target: newRate,
        impact: `${conversionImprovement.toFixed(1)}% more closed deals`,
        savingsEstimate: Math.round(savingsEstimate),
      });
    }
  });

  // If CAC is more than 2x benchmark, suggest channel diversification
  if (funnel.cac > cacBenchmarkAvg * 2) {
    suggestions.push({
      type: "add-channel",
      stage: "Channel Mix",
      current: funnel.cac,
      target: cacBenchmarkAvg * 1.5,
      impact: "Adding organic channels can reduce blended CAC significantly",
      savingsEstimate: Math.round((funnel.cac - cacBenchmarkAvg * 1.5) * funnel.closedWon),
    });
  }

  // Sort by savings potential (highest first)
  suggestions.sort((a, b) => b.savingsEstimate - a.savingsEstimate);

  return suggestions.slice(0, 3);
}

// ============ Formatting Utilities ============

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      notation: "compact",
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString();
}

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

export function validateInputs(revenueGoal: number, avgDealSize: number): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (revenueGoal <= 0) errors.push("Revenue goal must be greater than 0");
  if (revenueGoal > 1_000_000_000) errors.push("Revenue goal must be less than $1B");
  if (avgDealSize <= 0) errors.push("Average deal size must be greater than 0");
  if (avgDealSize > revenueGoal) errors.push("Average deal size cannot exceed revenue goal");
  return { valid: errors.length === 0, errors };
}

export function getScaleLabel(scale: CompanyScale): string {
  const labels: { [key in CompanyScale]: string } = {
    consumer: "Consumer",
    smb: "SMB",
    middleMarket: "Mid-Market",
    enterprise: "Enterprise",
  };
  return labels[scale];
}

/**
 * Calculate required marketing budget based on CAC
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
