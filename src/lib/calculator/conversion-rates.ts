// SaaS Revenue Calculator - Benchmark Data
// Source: FirstPageSage (https://firstpagesage.com/seo-blog/average-saas-conversion-rates/)

import type {
  IndustryRates,
  ConversionRates,
  CACData,
  TrafficSourceRate,
  FreeTrialRate,
  CACByChannel,
  AdPlatformBenchmark,
} from "./types";

// Default conversion rates (General SaaS average)
export const DEFAULT_CONVERSION_RATES: ConversionRates = {
  visitorToLead: 0.0165,
  leadToMQL: 0.4247,
  mqlToSQL: 0.38,
  sqlToOpportunity: 0.4288,
  opportunityToClose: 0.3824,
};

// Industry-specific conversion rates
export const INDUSTRY_CONVERSION_RATES: IndustryRates[] = [
  {
    industry: "Adtech",
    visitorToLead: 0.014,
    leadToMQL: 0.39,
    mqlToSQL: 0.35,
    sqlToOpportunity: 0.4,
    opportunityToClose: 0.37,
  },
  {
    industry: "Automotive SaaS",
    visitorToLead: 0.019,
    leadToMQL: 0.37,
    mqlToSQL: 0.39,
    sqlToOpportunity: 0.44,
    opportunityToClose: 0.36,
  },
  {
    industry: "CRMs",
    visitorToLead: 0.02,
    leadToMQL: 0.36,
    mqlToSQL: 0.42,
    sqlToOpportunity: 0.48,
    opportunityToClose: 0.38,
  },
  {
    industry: "Chemical / Pharmaceutical",
    visitorToLead: 0.023,
    leadToMQL: 0.47,
    mqlToSQL: 0.46,
    sqlToOpportunity: 0.41,
    opportunityToClose: 0.39,
  },
  {
    industry: "Cybersecurity",
    visitorToLead: 0.016,
    leadToMQL: 0.44,
    mqlToSQL: 0.38,
    sqlToOpportunity: 0.4,
    opportunityToClose: 0.39,
  },
  {
    industry: "Design",
    visitorToLead: 0.009,
    leadToMQL: 0.4,
    mqlToSQL: 0.34,
    sqlToOpportunity: 0.45,
    opportunityToClose: 0.38,
  },
  {
    industry: "Edtech",
    visitorToLead: 0.014,
    leadToMQL: 0.46,
    mqlToSQL: 0.35,
    sqlToOpportunity: 0.39,
    opportunityToClose: 0.4,
  },
  {
    industry: "Entertainment",
    visitorToLead: 0.016,
    leadToMQL: 0.41,
    mqlToSQL: 0.39,
    sqlToOpportunity: 0.47,
    opportunityToClose: 0.43,
  },
  {
    industry: "Fintech",
    visitorToLead: 0.017,
    leadToMQL: 0.38,
    mqlToSQL: 0.42,
    sqlToOpportunity: 0.48,
    opportunityToClose: 0.39,
  },
  {
    industry: "Hospitality",
    visitorToLead: 0.016,
    leadToMQL: 0.45,
    mqlToSQL: 0.38,
    sqlToOpportunity: 0.38,
    opportunityToClose: 0.38,
  },
  {
    industry: "Industrial & IOT",
    visitorToLead: 0.021,
    leadToMQL: 0.47,
    mqlToSQL: 0.39,
    sqlToOpportunity: 0.42,
    opportunityToClose: 0.39,
  },
  {
    industry: "Insurance",
    visitorToLead: 0.016,
    leadToMQL: 0.4,
    mqlToSQL: 0.28,
    sqlToOpportunity: 0.41,
    opportunityToClose: 0.37,
  },
  {
    industry: "Legaltech",
    visitorToLead: 0.013,
    leadToMQL: 0.41,
    mqlToSQL: 0.4,
    sqlToOpportunity: 0.47,
    opportunityToClose: 0.42,
  },
  {
    industry: "Medtech",
    visitorToLead: 0.018,
    leadToMQL: 0.48,
    mqlToSQL: 0.43,
    sqlToOpportunity: 0.41,
    opportunityToClose: 0.35,
  },
  {
    industry: "Project Management",
    visitorToLead: 0.018,
    leadToMQL: 0.46,
    mqlToSQL: 0.37,
    sqlToOpportunity: 0.42,
    opportunityToClose: 0.35,
  },
  {
    industry: "Retail / eCommerce",
    visitorToLead: 0.021,
    leadToMQL: 0.41,
    mqlToSQL: 0.36,
    sqlToOpportunity: 0.45,
    opportunityToClose: 0.39,
  },
  {
    industry: "Telecom",
    visitorToLead: 0.009,
    leadToMQL: 0.46,
    mqlToSQL: 0.35,
    sqlToOpportunity: 0.41,
    opportunityToClose: 0.36,
  },
  {
    industry: "Average / General SaaS",
    visitorToLead: 0.0165,
    leadToMQL: 0.4247,
    mqlToSQL: 0.38,
    sqlToOpportunity: 0.4288,
    opportunityToClose: 0.3824,
  },
];

// Full CAC by company scale and industry (28 industries from CSV)
export const CAC_BY_SCALE: CACData[] = [
  { industry: "Agtech", consumer: 243, smb: 612, middleMarket: 1823, enterprise: 6948 },
  { industry: "Adtech", consumer: null, smb: 560, middleMarket: 2208, enterprise: 8548 },
  { industry: "Automotive", consumer: 141, smb: 378, middleMarket: 2655, enterprise: 6419 },
  { industry: "Aviation & Defense", consumer: 290, smb: 509, middleMarket: 3570, enterprise: 7990 },
  { industry: "Building Management & IoT", consumer: 206, smb: 574, middleMarket: 2109, enterprise: 7305 },
  { industry: "Business Services", consumer: 228, smb: 585, middleMarket: 4438, enterprise: 7247 },
  { industry: "Chemical / Pharmaceutical", consumer: 275, smb: 816, middleMarket: 3565, enterprise: 6018 },
  { industry: "Cleantech", consumer: null, smb: 674, middleMarket: 2368, enterprise: 7321 },
  { industry: "Construction", consumer: 165, smb: 610, middleMarket: 4419, enterprise: 7920 },
  { industry: "Design", consumer: 274, smb: 658, middleMarket: 1501, enterprise: 5866 },
  { industry: "eCommerce", consumer: 64, smb: 274, middleMarket: 1406, enterprise: 2190 },
  { industry: "Education", consumer: 264, smb: 806, middleMarket: 2814, enterprise: 6659 },
  { industry: "Entertainment", consumer: 178, smb: 473, middleMarket: 2890, enterprise: 5216 },
  { industry: "Engineering", consumer: null, smb: 551, middleMarket: 2383, enterprise: 5906 },
  { industry: "Fintech", consumer: 202, smb: 1450, middleMarket: 4903, enterprise: 14772 },
  { industry: "Hospitality", consumer: 355, smb: 907, middleMarket: 3724, enterprise: 9448 },
  { industry: "Industrial", consumer: null, smb: 542, middleMarket: 3614, enterprise: 7290 },
  { industry: "Insurance", consumer: 519, smb: 1280, middleMarket: 4446, enterprise: 11228 },
  { industry: "Legaltech", consumer: 161, smb: 299, middleMarket: 2630, enterprise: 6441 },
  { industry: "Oil & Gas", consumer: 91, smb: 355, middleMarket: 3401, enterprise: 7885 },
  { industry: "Medtech", consumer: 320, smb: 921, middleMarket: 4326, enterprise: 11021 },
  { industry: "Project Management", consumer: 227, smb: 891, middleMarket: 2925, enterprise: 7430 },
  { industry: "Proptech", consumer: 184, smb: 518, middleMarket: 3004, enterprise: 8650 },
  { industry: "Retail", consumer: 76, smb: 303, middleMarket: 2980, enterprise: 9018 },
  { industry: "Security", consumer: 174, smb: 805, middleMarket: 5287, enterprise: 10221 },
  { industry: "Staffing & HR", consumer: null, smb: 410, middleMarket: 1912, enterprise: 6754 },
  { industry: "Telecommunications", consumer: 91, smb: 694, middleMarket: 5266, enterprise: 10980 },
  { industry: "Transportation & Logistics", consumer: 175, smb: 483, middleMarket: 3920, enterprise: 8005 },
  { industry: "AVERAGE", consumer: 215, smb: 656, middleMarket: 3352, enterprise: 7951 },
];

// Traffic source conversion rates
export const TRAFFIC_SOURCE_RATES: TrafficSourceRate[] = [
  { source: "SEO", explanation: "Organic traffic funneled through a comprehensive keyword-oriented digital marketing strategy.", conversionRate: 0.041 },
  { source: "SEM/PPC", explanation: "Paid leads derived from paid Google ads used to generate short-term results. Typically colder than organic leads.", conversionRate: 0.027 },
  { source: "Email", explanation: "Email marketing typically targets warmer leads who have already left their information with the company for further contact.", conversionRate: 0.03 },
  { source: "Direct", explanation: "Direct leads refer to visitors who have directly typed your URL into the Google search bar.", conversionRate: 0.037 },
  { source: "Referral", explanation: "A trusted resource recommended these visitors to your website/company for further research.", conversionRate: 0.033 },
  { source: "Social Media (Organic)", explanation: "These leads have likely interacted with your brand before on various social media platforms.", conversionRate: 0.031 },
  { source: "Social Media (Paid)", explanation: "Paid social leads are typically a bit colder than organic leads, responding to targeted advertisements.", conversionRate: 0.024 },
  { source: "PR", explanation: "Leads coming in through PR have seen your work with previous clients.", conversionRate: 0.018 },
  { source: "ABM", explanation: "Leads generated by a targeted ABM campaign have been extensively warmed up.", conversionRate: 0.029 },
  { source: "Video Marketing", explanation: "Video marketing is typically suited for more educational content, making leads colder.", conversionRate: 0.024 },
  { source: "Public Speaking", explanation: "Warm leads through face-to-face interactions that encourage engagement and build trust.", conversionRate: 0.035 },
  { source: "Trade Shows", explanation: "Face-to-face interactions at industry events.", conversionRate: 0.028 },
  { source: "Webinars", explanation: "Interactive educational content that builds trust.", conversionRate: 0.032 },
];

// CAC by marketing channel
export const CAC_BY_CHANNEL: {
  organic: CACByChannel[];
  inorganic: CACByChannel[];
} = {
  organic: [
    { channel: "Thought Leadership SEO", b2b: 647, b2c: 298 },
    { channel: "Email Marketing", b2b: 510, b2c: 287 },
    { channel: "Social Media Marketing", b2b: 658, b2c: 212 },
    { channel: "Content Marketing", b2b: 1254, b2c: 890 },
    { channel: "Basic SEO", b2b: 1786, b2c: 1201 },
    { channel: "Podcasts", b2b: 1472, b2c: 363 },
    { channel: "Webinars", b2b: 603, b2c: 251 },
    { channel: "Video Marketing", b2b: 815, b2c: 301 },
  ],
  inorganic: [
    { channel: "PPC / SEM", b2b: 802, b2c: 290 },
    { channel: "PR", b2b: 1720, b2c: 379 },
    { channel: "ABM", b2b: 4664, b2c: null },
    { channel: "SDRs", b2b: 1980, b2c: null },
    { channel: "LinkedIn Ads", b2b: 982, b2c: null },
    { channel: "Facebook Ads", b2b: null, b2c: 230 },
  ],
};

// Free trial / freemium rates by industry (expanded from CSV)
export const FREE_TRIAL_RATES: FreeTrialRate[] = [
  { industry: "Advertising / AdTech", visitorToTrial: 0.091, trialToPaid: 0.243, visitorToFreemium: 0.139, freemiumToPaid: 0.036 },
  { industry: "Agriculture / Agtech", visitorToTrial: 0.088, trialToPaid: 0.215, visitorToFreemium: 0.119, freemiumToPaid: 0.045 },
  { industry: "Communications", visitorToTrial: 0.083, trialToPaid: 0.234, visitorToFreemium: 0.121, freemiumToPaid: 0.035 },
  { industry: "CRM", visitorToTrial: 0.097, trialToPaid: 0.29, visitorToFreemium: 0.128, freemiumToPaid: 0.034 },
  { industry: "Cybersecurity", visitorToTrial: 0.074, trialToPaid: 0.219, visitorToFreemium: 0.119, freemiumToPaid: 0.033 },
  { industry: "Education / Edtech", visitorToTrial: 0.103, trialToPaid: 0.248, visitorToFreemium: 0.139, freemiumToPaid: 0.026 },
  { industry: "Enterprise", visitorToTrial: 0.055, trialToPaid: 0.186, visitorToFreemium: 0.118, freemiumToPaid: 0.034 },
  { industry: "ERP", visitorToTrial: 0.094, trialToPaid: 0.237, visitorToFreemium: 0.14, freemiumToPaid: 0.048 },
  { industry: "Environmental / CleanTech", visitorToTrial: 0.111, trialToPaid: 0.229, visitorToFreemium: 0.129, freemiumToPaid: 0.035 },
  { industry: "Fintech", visitorToTrial: 0.09, trialToPaid: 0.194, visitorToFreemium: 0.135, freemiumToPaid: 0.037 },
  { industry: "Healthcare / Medtech", visitorToTrial: 0.123, trialToPaid: 0.215, visitorToFreemium: 0.153, freemiumToPaid: 0.04 },
  { industry: "HR", visitorToTrial: 0.081, trialToPaid: 0.227, visitorToFreemium: 0.131, freemiumToPaid: 0.036 },
  { industry: "IoT", visitorToTrial: 0.126, trialToPaid: 0.252, visitorToFreemium: 0.155, freemiumToPaid: 0.041 },
  { industry: "Legal / Legaltech", visitorToTrial: 0.097, trialToPaid: 0.231, visitorToFreemium: 0.138, freemiumToPaid: 0.057 },
  { industry: "Real Estate / Proptech", visitorToTrial: 0.071, trialToPaid: 0.227, visitorToFreemium: 0.122, freemiumToPaid: 0.034 },
  { industry: "Regtech", visitorToTrial: 0.117, trialToPaid: 0.236, visitorToFreemium: 0.142, freemiumToPaid: 0.058 },
  { industry: "Project Management", visitorToTrial: 0.109, trialToPaid: 0.238, visitorToFreemium: 0.144, freemiumToPaid: 0.039 },
  { industry: "Sales Enablement", visitorToTrial: 0.088, trialToPaid: 0.207, visitorToFreemium: 0.131, freemiumToPaid: 0.035 },
];

// B2B SaaS Ad Platform Benchmarks
export const AD_PLATFORM_BENCHMARKS: AdPlatformBenchmark[] = [
  {
    platform: "LinkedIn Ads",
    cpm: { min: 55, max: 95, avg: 75 },
    ctr: { min: 0.0045, max: 0.0065, avg: 0.0052 },
    cpc: { min: 7, max: 15, avg: 11 },
    notes: "Prices spike for C-Suite/Seniority targeting.",
  },
  {
    platform: "Google Search",
    cpm: { min: 45, max: 60, avg: 52.5 },
    ctr: { min: 0.024, max: 0.045, avg: 0.035 },
    cpc: { min: 8, max: 18, avg: 13 },
    notes: "B2B CTR is lower due to complex queries.",
  },
  {
    platform: "Google Display",
    cpm: { min: 2.5, max: 6, avg: 4.25 },
    ctr: { min: 0.0045, max: 0.009, avg: 0.0065 },
    cpc: { min: 0.5, max: 2, avg: 1.25 },
    notes: "Good for retargeting, not cold acquisition.",
  },
  {
    platform: "Meta (FB/IG)",
    cpm: { min: 20, max: 45, avg: 32.5 },
    ctr: { min: 0.0075, max: 0.0105, avg: 0.009 },
    cpc: { min: 3, max: 8, avg: 5.5 },
    notes: "B2B lead gen objectives carry a major premium.",
  },
];

// Channel-specific conversion rates (by marketing channel)
export const CHANNEL_CONVERSION_RATES: {
  channel: string;
  visitorToLead: number;
  leadToMQL: number;
  mqlToSQL: number;
  sqlToOpportunity: number;
  opportunityToClose: number;
}[] = [
  { channel: "SEO", visitorToLead: 0.021, leadToMQL: 0.41, mqlToSQL: 0.51, sqlToOpportunity: 0.49, opportunityToClose: 0.36 },
  { channel: "PPC", visitorToLead: 0.007, leadToMQL: 0.36, mqlToSQL: 0.26, sqlToOpportunity: 0.38, opportunityToClose: 0.35 },
  { channel: "LinkedIn", visitorToLead: 0.022, leadToMQL: 0.38, mqlToSQL: 0.30, sqlToOpportunity: 0.41, opportunityToClose: 0.39 },
  { channel: "Email", visitorToLead: 0.013, leadToMQL: 0.43, mqlToSQL: 0.46, sqlToOpportunity: 0.48, opportunityToClose: 0.32 },
  { channel: "Webinar", visitorToLead: 0.009, leadToMQL: 0.44, mqlToSQL: 0.39, sqlToOpportunity: 0.42, opportunityToClose: 0.40 },
];
