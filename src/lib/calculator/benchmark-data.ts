// Benchmark Data Library - Smart lookups across datasets

import type {
  CustomerType,
  ChannelMix,
  ConversionRates,
  BenchmarkData,
  PercentileResult,
  FunnelStageData,
} from "./types";
import {
  CAC_BY_SCALE,
  INDUSTRY_CONVERSION_RATES,
  DEFAULT_CONVERSION_RATES,
  AD_PLATFORM_BENCHMARKS,
  CAC_BY_CHANNEL,
} from "./conversion-rates";

// ============ Benchmark Lookups ============

/**
 * Get combined benchmark data for a given industry and customer type.
 * Cross-references CAC, conversion rates, and cost-per-visit data.
 */
export function getBenchmark(
  industry: string,
  customerType: CustomerType
): BenchmarkData {
  // Get conversion rates for industry
  const industryRates = INDUSTRY_CONVERSION_RATES.find(
    (i) => i.industry === industry
  );
  const rates = industryRates || DEFAULT_CONVERSION_RATES;

  // Get CAC data - try exact match, then fuzzy match, then average
  const cacData = findCACForIndustry(industry);
  const cacValue = cacData[customerType];
  const avgCac = CAC_BY_SCALE.find((c) => c.industry === "AVERAGE")!;

  // Calculate CAC range from all industries for this customer type
  const allCacValues = CAC_BY_SCALE
    .filter((c) => c.industry !== "AVERAGE" && c[customerType] !== null)
    .map((c) => c[customerType] as number);
  const cacMin = Math.min(...allCacValues);
  const cacMax = Math.max(...allCacValues);
  const cacAvg = cacValue ?? avgCac[customerType] ?? 656;

  // Estimate cost per visit based on channel mix
  const costPerVisit = estimateCostPerVisit("paid-led");

  return {
    cac: { min: cacMin, avg: cacAvg, max: cacMax },
    conversionRates: rates,
    avgDealSize: 40000,
    costPerVisit,
  };
}

/**
 * Get benchmark conversion rate ranges for a specific funnel stage.
 * Uses all industry data to compute min/avg/max ranges.
 */
export function getStageBenchmark(
  stageKey: keyof ConversionRates
): { min: number; avg: number; max: number } {
  const values = INDUSTRY_CONVERSION_RATES.map((i) => i[stageKey]);
  return {
    min: Math.min(...values),
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    max: Math.max(...values),
  };
}

/**
 * Get all stage benchmarks at once.
 */
export function getAllStageBenchmarks(): Record<
  keyof ConversionRates,
  { min: number; avg: number; max: number }
> {
  const stages: (keyof ConversionRates)[] = [
    "visitorToLead",
    "leadToMQL",
    "mqlToSQL",
    "sqlToOpportunity",
    "opportunityToClose",
  ];
  const result = {} as Record<keyof ConversionRates, { min: number; avg: number; max: number }>;
  stages.forEach((stage) => {
    result[stage] = getStageBenchmark(stage);
  });
  return result;
}

/**
 * Calculate where a user's value falls relative to a benchmark range.
 * Returns a percentile estimate (0-100) and a label.
 */
export function getPercentileRank(
  value: number,
  benchmark: { min: number; avg: number; max: number }
): PercentileResult {
  const range = benchmark.max - benchmark.min;
  if (range === 0) {
    return { value, percentile: 50, label: "average" };
  }

  // Linear interpolation to estimate percentile
  const position = (value - benchmark.min) / range;
  const percentile = Math.max(0, Math.min(100, Math.round(position * 100)));

  let label: PercentileResult["label"];
  if (percentile < 20) label = "poor";
  else if (percentile < 40) label = "below-average";
  else if (percentile < 60) label = "average";
  else if (percentile < 80) label = "above-average";
  else label = "excellent";

  return { value, percentile, label };
}

/**
 * For conversion rates, higher is better, so percentile should reflect that.
 */
export function getConversionPercentile(
  value: number,
  benchmark: { min: number; avg: number; max: number }
): PercentileResult {
  return getPercentileRank(value, benchmark);
}

/**
 * For CAC, lower is better, so we invert the percentile.
 */
export function getCACPercentile(
  value: number,
  benchmark: { min: number; avg: number; max: number }
): PercentileResult {
  const result = getPercentileRank(value, benchmark);
  // Invert: high CAC = bad percentile
  result.percentile = 100 - result.percentile;
  if (result.percentile > 80) result.label = "excellent";
  else if (result.percentile > 60) result.label = "above-average";
  else if (result.percentile > 40) result.label = "average";
  else if (result.percentile > 20) result.label = "below-average";
  else result.label = "poor";
  return result;
}

// ============ Cost Estimation ============

/**
 * Estimate average cost-per-visit based on channel mix.
 * Uses ad platform benchmark data for paid channels,
 * and organic CAC data to estimate organic cost per visit.
 */
export function estimateCostPerVisit(channelMix: ChannelMix): number {
  // Weighted average CPC across ad platforms (B2B SaaS benchmarks)
  const paidCPC = AD_PLATFORM_BENCHMARKS.reduce(
    (sum, p) => sum + p.cpc.avg,
    0
  ) / AD_PLATFORM_BENCHMARKS.length;

  // Average organic CAC channels typically produce visitors at much lower cost
  const organicCostPerVisit = 0.5; // Very low - SEO/content visitors

  switch (channelMix) {
    case "paid-led":
      // 80% paid, 20% organic
      return paidCPC * 0.8 + organicCostPerVisit * 0.2;
    case "product-led":
      // 20% paid, 80% organic
      return paidCPC * 0.2 + organicCostPerVisit * 0.8;
    case "hybrid":
      // 50% paid, 50% organic
      return paidCPC * 0.5 + organicCostPerVisit * 0.5;
    default:
      return paidCPC * 0.5 + organicCostPerVisit * 0.5;
  }
}

/**
 * Get the blended B2B CAC for organic vs inorganic channels.
 */
export function getBlendedChannelCAC(channelMix: ChannelMix): {
  organic: number;
  inorganic: number;
  blended: number;
} {
  const organicChannels = CAC_BY_CHANNEL.organic
    .filter((c) => c.b2b !== null)
    .map((c) => c.b2b as number);
  const inorganicChannels = CAC_BY_CHANNEL.inorganic
    .filter((c) => c.b2b !== null)
    .map((c) => c.b2b as number);

  const organicAvg =
    organicChannels.reduce((a, b) => a + b, 0) / organicChannels.length;
  const inorganicAvg =
    inorganicChannels.reduce((a, b) => a + b, 0) / inorganicChannels.length;

  let blended: number;
  switch (channelMix) {
    case "paid-led":
      blended = organicAvg * 0.2 + inorganicAvg * 0.8;
      break;
    case "product-led":
      blended = organicAvg * 0.8 + inorganicAvg * 0.2;
      break;
    case "hybrid":
    default:
      blended = organicAvg * 0.5 + inorganicAvg * 0.5;
      break;
  }

  return { organic: organicAvg, inorganic: inorganicAvg, blended };
}

// ============ Helpers ============

/**
 * Fuzzy match industry name to CAC data.
 * Handles mismatches between industry names in different datasets.
 */
function findCACForIndustry(industry: string) {
  const lower = industry.toLowerCase();

  // Try exact match first
  let match = CAC_BY_SCALE.find(
    (c) => c.industry.toLowerCase() === lower
  );
  if (match) return match;

  // Fuzzy match mapping
  const fuzzyMap: Record<string, string> = {
    "average / general saas": "AVERAGE",
    "general saas": "AVERAGE",
    "saas": "AVERAGE",
    "crms": "AVERAGE",
    "automotive saas": "Automotive",
    "chemical / pharmaceutical": "Chemical / Pharmaceutical",
    "cybersecurity": "Security",
    "edtech": "Education",
    "entertainment": "Entertainment",
    "fintech": "Fintech",
    "hospitality": "Hospitality",
    "industrial & iot": "Industrial",
    "insurance": "Insurance",
    "legaltech": "Legaltech",
    "medtech": "Medtech",
    "project management": "Project Management",
    "retail / ecommerce": "Retail",
    "telecom": "Telecommunications",
    "design": "Design",
    "adtech": "Adtech",
  };

  const mapped = fuzzyMap[lower];
  if (mapped) {
    match = CAC_BY_SCALE.find(
      (c) => c.industry.toLowerCase() === mapped.toLowerCase()
    );
    if (match) return match;
  }

  // Partial match
  match = CAC_BY_SCALE.find(
    (c) => c.industry.toLowerCase().includes(lower) || lower.includes(c.industry.toLowerCase())
  );
  if (match) return match;

  // Default to AVERAGE
  return CAC_BY_SCALE.find((c) => c.industry === "AVERAGE")!;
}

/**
 * Build FunnelStageData array from funnel result for visualization.
 */
export function buildFunnelStages(
  funnel: {
    webVisitors: number;
    leads: number;
    mqls: number;
    sqos: number;
    opportunities: number;
    closedWon: number;
    totalSpend: number;
    costPerVisitor: number;
    cpl: number;
    cpql: number;
    cpsql: number;
    cpOpp: number;
    cac: number;
  },
  rates: ConversionRates
): FunnelStageData[] {
  const benchmarks = getAllStageBenchmarks();

  return [
    {
      id: "webVisitors",
      label: "Web Visitors",
      volume: funnel.webVisitors,
      costPer: funnel.costPerVisitor,
      conversionRate: null,
      editable: false,
    },
    {
      id: "leads",
      label: "Leads",
      volume: funnel.leads,
      costPer: funnel.cpl,
      conversionRate: rates.visitorToLead,
      benchmarkRate: benchmarks.visitorToLead,
      editable: true,
    },
    {
      id: "mqls",
      label: "MQLs",
      volume: funnel.mqls,
      costPer: funnel.cpql,
      conversionRate: rates.leadToMQL,
      benchmarkRate: benchmarks.leadToMQL,
      editable: true,
    },
    {
      id: "sqos",
      label: "SQLs",
      volume: funnel.sqos,
      costPer: funnel.cpsql,
      conversionRate: rates.mqlToSQL,
      benchmarkRate: benchmarks.mqlToSQL,
      editable: true,
    },
    {
      id: "opportunities",
      label: "Opportunities",
      volume: funnel.opportunities,
      costPer: funnel.cpOpp,
      conversionRate: rates.sqlToOpportunity,
      benchmarkRate: benchmarks.sqlToOpportunity,
      editable: true,
    },
    {
      id: "closedWon",
      label: "Closed/Won",
      volume: funnel.closedWon,
      costPer: funnel.cac,
      conversionRate: rates.opportunityToClose,
      benchmarkRate: benchmarks.opportunityToClose,
      editable: true,
    },
  ];
}
