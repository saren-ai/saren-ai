# SaaS conversion rate calculator: Cursor build brief

## Overview

Build an interactive "code experience" portfolio page at `saren.ai/calculator` featuring a SaaS Revenue Goal Calculator. This calculator helps marketing leaders reverse-engineer their funnel metrics from a revenue goal, demonstrating Saren's expertise in annual marketing planning.

The calculator works **backwards** from revenue: set your goal and average deal size, and it calculates required metrics at each funnel stage using industry-standard conversion rates.

---

## Tech stack (match existing site)

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Fire Horse 2026 design system
- **Animations:** Framer Motion
- **Types:** TypeScript (all data models in `/lib/`)
- **Components:** Client/server separation with `"use client"` directives
- **Icons:** lucide-react

### Fire Horse 2026 color palette
```css
--ember-red: #E63946;
--electric-blue: #1D3557;
--copper: #D4A574;
--charcoal: #2B2D42;
--ash: #8D99AE;
--cream: #F1FAEE;
```

---

## Page structure

```
/app/calculator/page.tsx          # Page wrapper (server component)
/components/calculator/           # All calculator components
  SaasCalculator.tsx              # Main orchestrator
  FunnelDisplay.tsx               # Visual funnel with stages
  MetricsRow.tsx                  # Calculated metrics display
  IndustrySelector.tsx            # Dropdown for industry selection
  InputFields.tsx                 # Revenue goal + ADS inputs
  CacComparison.tsx               # CAC by company scale
  ConversionRateEditor.tsx        # Optional: tweak individual rates
  ExportButton.tsx                # Export to CSV/PDF
/lib/calculator/
  conversion-rates.ts             # All industry benchmark data
  funnel-calculations.ts          # Math logic
  types.ts                        # TypeScript interfaces
```

---

## Core calculator logic

### Funnel stages (left to right in UX, calculated right to left)

| Stage | Description |
|-------|-------------|
| Web Visitors | Traffic needed to hit lead targets |
| Lead | Visitors who convert (form fill, etc.) |
| MQL | Marketing Qualified Leads |
| SQO/SQL | Sales Qualified Opportunities |
| Opportunity | Active deals in pipeline |
| Close/Won | Deals that close |

### Default conversion rates (editable per industry)

```typescript
const DEFAULT_CONVERSION_RATES = {
  visitorToLead: 0.02,        // 2%
  leadToMQL: 0.30,            // 30%
  mqlToSQL: 0.20,             // 20%
  sqlToOpportunity: 0.50,     // 50%
  opportunityToClose: 0.25,   // 25%
};
```

### Calculation flow (reverse funnel)

```typescript
// Inputs
const revenueGoal = 1_000_000;  // User input
const avgDealSize = 20_000;     // User input (prompt: "Get from HubSpot/Salesforce")

// Calculated (work backwards)
const closedWon = revenueGoal / avgDealSize;                    // 50
const opportunities = closedWon / rates.opportunityToClose;     // 200
const sqos = opportunities / rates.sqlToOpportunity;            // 400
const mqls = sqos / rates.mqlToSQL;                             // 1,333
const leads = mqls / rates.leadToMQL;                           // 66,667
const webVisitors = leads / rates.visitorToLead;                // 3,333,333

// Monthly breakdown
const monthlyLeads = leads / 12;                                // 5,556
const monthlyMQLs = mqls / 12;                                  // 111
const monthlyVisitors = webVisitors / 12;                       // 277,778
```

---

## Data models (create in `/lib/calculator/`)

### types.ts

```typescript
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

export interface IndustryRates {
  industry: string;
  visitorToLead: number;
  leadToMQL: number;
  mqlToSQL: number;
  sqlToOpportunity: number;
  opportunityToClose: number;
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

export interface CalculatorState {
  revenueGoal: number;
  avgDealSize: number;
  selectedIndustry: string;
  customRates: ConversionRates;
  useCustomRates: boolean;
}
```

### conversion-rates.ts

```typescript
// Industry-specific conversion rates
export const INDUSTRY_CONVERSION_RATES: IndustryRates[] = [
  { industry: "Adtech", visitorToLead: 0.014, leadToMQL: 0.39, mqlToSQL: 0.35, sqlToOpportunity: 0.40, opportunityToClose: 0.37 },
  { industry: "Automotive SaaS", visitorToLead: 0.019, leadToMQL: 0.37, mqlToSQL: 0.39, sqlToOpportunity: 0.44, opportunityToClose: 0.36 },
  { industry: "CRMs", visitorToLead: 0.020, leadToMQL: 0.36, mqlToSQL: 0.42, sqlToOpportunity: 0.48, opportunityToClose: 0.38 },
  { industry: "Chemical / Pharmaceutical", visitorToLead: 0.023, leadToMQL: 0.47, mqlToSQL: 0.46, sqlToOpportunity: 0.41, opportunityToClose: 0.39 },
  { industry: "Cybersecurity", visitorToLead: 0.016, leadToMQL: 0.44, mqlToSQL: 0.38, sqlToOpportunity: 0.40, opportunityToClose: 0.39 },
  { industry: "Design", visitorToLead: 0.009, leadToMQL: 0.40, mqlToSQL: 0.34, sqlToOpportunity: 0.45, opportunityToClose: 0.38 },
  { industry: "Edtech", visitorToLead: 0.014, leadToMQL: 0.46, mqlToSQL: 0.35, sqlToOpportunity: 0.39, opportunityToClose: 0.40 },
  { industry: "Entertainment", visitorToLead: 0.016, leadToMQL: 0.41, mqlToSQL: 0.39, sqlToOpportunity: 0.47, opportunityToClose: 0.43 },
  { industry: "Fintech", visitorToLead: 0.017, leadToMQL: 0.38, mqlToSQL: 0.42, sqlToOpportunity: 0.48, opportunityToClose: 0.39 },
  { industry: "Hospitality", visitorToLead: 0.016, leadToMQL: 0.45, mqlToSQL: 0.38, sqlToOpportunity: 0.38, opportunityToClose: 0.38 },
  { industry: "Industrial & IOT", visitorToLead: 0.021, leadToMQL: 0.47, mqlToSQL: 0.39, sqlToOpportunity: 0.42, opportunityToClose: 0.39 },
  { industry: "Insurance", visitorToLead: 0.016, leadToMQL: 0.40, mqlToSQL: 0.28, sqlToOpportunity: 0.41, opportunityToClose: 0.37 },
  { industry: "Legaltech", visitorToLead: 0.013, leadToMQL: 0.41, mqlToSQL: 0.40, sqlToOpportunity: 0.47, opportunityToClose: 0.42 },
  { industry: "Medtech", visitorToLead: 0.018, leadToMQL: 0.48, mqlToSQL: 0.43, sqlToOpportunity: 0.41, opportunityToClose: 0.35 },
  { industry: "Project Management", visitorToLead: 0.018, leadToMQL: 0.46, mqlToSQL: 0.37, sqlToOpportunity: 0.42, opportunityToClose: 0.35 },
  { industry: "Retail / eCommerce", visitorToLead: 0.021, leadToMQL: 0.41, mqlToSQL: 0.36, sqlToOpportunity: 0.45, opportunityToClose: 0.39 },
  { industry: "Telecom", visitorToLead: 0.009, leadToMQL: 0.46, mqlToSQL: 0.35, sqlToOpportunity: 0.41, opportunityToClose: 0.36 },
  { industry: "Average / General SaaS", visitorToLead: 0.0165, leadToMQL: 0.4247, mqlToSQL: 0.38, sqlToOpportunity: 0.4288, opportunityToClose: 0.3824 },
];

// CAC by company scale and industry
export const CAC_BY_SCALE: CACData[] = [
  { industry: "Agtech", consumer: 243, smb: 612, middleMarket: 1823, enterprise: 6948 },
  { industry: "Adtech", consumer: null, smb: 560, middleMarket: 2208, enterprise: 8548 },
  { industry: "Automotive", consumer: 141, smb: 378, middleMarket: 2655, enterprise: 6419 },
  { industry: "Business Services", consumer: 228, smb: 585, middleMarket: 4438, enterprise: 7247 },
  { industry: "eCommerce", consumer: 64, smb: 274, middleMarket: 1406, enterprise: 2190 },
  { industry: "Education", consumer: 264, smb: 806, middleMarket: 2814, enterprise: 6659 },
  { industry: "Fintech", consumer: 202, smb: 1450, middleMarket: 4903, enterprise: 14772 },
  { industry: "Insurance", consumer: 519, smb: 1280, middleMarket: 4446, enterprise: 11228 },
  { industry: "Legaltech", consumer: 161, smb: 299, middleMarket: 2630, enterprise: 6441 },
  { industry: "Medtech", consumer: 320, smb: 921, middleMarket: 4326, enterprise: 11021 },
  { industry: "Security", consumer: 174, smb: 805, middleMarket: 5287, enterprise: 10221 },
  // ... include all industries from CSV
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
export const CAC_BY_CHANNEL = {
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

// Free trial / freemium rates by industry
export const FREE_TRIAL_RATES = [
  { industry: "Advertising / AdTech", visitorToTrial: 0.091, trialToPaid: 0.243, visitorToFreemium: 0.139, freemiumToPaid: 0.036 },
  { industry: "CRM", visitorToTrial: 0.097, trialToPaid: 0.290, visitorToFreemium: 0.128, freemiumToPaid: 0.034 },
  { industry: "Cybersecurity", visitorToTrial: 0.074, trialToPaid: 0.219, visitorToFreemium: 0.119, freemiumToPaid: 0.033 },
  { industry: "Fintech", visitorToTrial: 0.090, trialToPaid: 0.194, visitorToFreemium: 0.135, freemiumToPaid: 0.037 },
  { industry: "Healthcare / Medtech", visitorToTrial: 0.123, trialToPaid: 0.215, visitorToFreemium: 0.153, freemiumToPaid: 0.040 },
  { industry: "IoT", visitorToTrial: 0.126, trialToPaid: 0.252, visitorToFreemium: 0.155, freemiumToPaid: 0.041 },
  // ... include all from CSV
];
```

---

## MVP features (Phase 1)

### Calculator core
1. **Revenue goal input** - Currency formatted number input
2. **Average deal size input** - With helper text: "Pull from your CRM"
3. **Industry selector** - Dropdown that auto-fills conversion rates
4. **Auto-calculated funnel** - All stage values computed in real-time
5. **Annual/Monthly toggle** - Switch between views

### Visual display
1. **Horizontal funnel visualization** - Stages flow left-to-right with conversion rates shown between stages
2. **Animated transitions** - Values animate when inputs change
3. **Number formatting** - Comma separators, appropriate decimal places

### UX polish
1. **Input validation** - Sensible min/max, no negative numbers
2. **Loading states** - Smooth transitions
3. **Mobile responsive** - Stack funnel vertically on small screens

---

## Phase 2 enhancements

### CAC comparison panel
- Show budget required based on company scale (Consumer/SMB/Mid-Market/Enterprise)
- Calculate `Budget = CAC × Closed Won Deals`
- Show "% of Revenue Goal" to contextualize budget

### Custom rate editing
- Toggle to enable custom conversion rates
- Sliders or inputs for each stage conversion
- "Reset to industry default" button

### Export functionality
- Download as CSV
- Generate shareable link with state encoded

---

## Phase 3 enhancements

### Additional data layers (expandable sections)

1. **Traffic source breakdown**
   - Show how traffic sources affect lead quality
   - Calculate visitors needed by channel

2. **CAC by channel comparison**
   - Organic vs inorganic
   - B2B vs B2C where applicable

3. **Free trial / freemium path**
   - Alternative funnel for PLG companies
   - Show required trial signups instead of leads

### Benchmark tooltips
- Hover on any conversion rate to see:
  - Industry average
  - Top performer benchmark
  - What "good" looks like

---

## Component specifications

### SaasCalculator.tsx (main orchestrator)

```typescript
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
// ... other imports

export function SaasCalculator() {
  const [state, setState] = useState<CalculatorState>({
    revenueGoal: 1_000_000,
    avgDealSize: 20_000,
    selectedIndustry: "Average / General SaaS",
    customRates: DEFAULT_CONVERSION_RATES,
    useCustomRates: false,
  });
  
  const [viewMode, setViewMode] = useState<"annual" | "monthly">("annual");
  
  // Get rates based on industry or custom
  const rates = useMemo(() => {
    if (state.useCustomRates) return state.customRates;
    return INDUSTRY_CONVERSION_RATES.find(i => i.industry === state.selectedIndustry) 
      ?? DEFAULT_CONVERSION_RATES;
  }, [state]);
  
  // Calculate funnel
  const funnel = useMemo(() => calculateFunnel(
    state.revenueGoal,
    state.avgDealSize,
    rates
  ), [state.revenueGoal, state.avgDealSize, rates]);
  
  return (
    <div className="space-y-8">
      <InputFields state={state} onChange={setState} />
      <IndustrySelector 
        value={state.selectedIndustry} 
        onChange={(industry) => setState(s => ({...s, selectedIndustry: industry}))}
      />
      <FunnelDisplay funnel={funnel} viewMode={viewMode} />
      <CacComparison closedWonDeals={funnel.closedWon} />
    </div>
  );
}
```

### FunnelDisplay.tsx

Visual funnel with these elements:
- Stage boxes showing name + value
- Connecting arrows with conversion rate percentages
- Color gradient from red (visitors) to green (closed/won)
- Framer Motion animations on value changes

```typescript
const stageColors = {
  webVisitors: "bg-ember-red/20 border-ember-red",
  leads: "bg-orange-500/20 border-orange-500",
  mqls: "bg-yellow-500/20 border-yellow-500",
  sqos: "bg-lime-500/20 border-lime-500",
  opportunities: "bg-emerald-500/20 border-emerald-500",
  closedWon: "bg-green-600/20 border-green-600",
};
```

### funnel-calculations.ts

```typescript
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
}

export function calculateFunnel(
  revenueGoal: number,
  avgDealSize: number,
  rates: ConversionRates
): FunnelResult {
  const closedWon = Math.ceil(revenueGoal / avgDealSize);
  const opportunities = Math.ceil(closedWon / rates.opportunityToClose);
  const sqos = Math.ceil(opportunities / rates.sqlToOpportunity);
  const mqls = Math.ceil(sqos / rates.mqlToSQL);
  const leads = Math.ceil(mqls / rates.leadToMQL);
  const webVisitors = Math.ceil(leads / rates.visitorToLead);
  
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
  };
}

export function calculateCAC(
  closedWonDeals: number,
  cacRate: number
): { budget: number; percentOfGoal: number } {
  const budget = closedWonDeals * cacRate;
  // percentOfGoal calculated in component with access to revenueGoal
  return { budget, percentOfGoal: 0 };
}
```

---

## Styling guidance

### Inputs
```css
/* Fire Horse 2026 input styling */
.calculator-input {
  @apply bg-charcoal/50 border border-ash/30 rounded-lg px-4 py-3;
  @apply text-cream placeholder:text-ash/50;
  @apply focus:border-ember-red focus:ring-1 focus:ring-ember-red/50;
  @apply transition-colors duration-200;
}
```

### Funnel stage boxes
```css
.funnel-stage {
  @apply rounded-xl p-4 border-2;
  @apply backdrop-blur-sm;
  @apply transition-all duration-300;
}

.funnel-value {
  @apply text-3xl font-bold tabular-nums;
  @apply tracking-tight;
}
```

### Conversion arrows
- Use SVG arrows between stages
- Show percentage in a pill badge on the arrow
- Subtle pulse animation on the connecting lines

---

## Page content (below calculator)

### Header section
```markdown
# How many leads do you actually need?

Every marketing leader faces the same question during annual planning: 
"What's our target?" This calculator works backwards from your revenue 
goal to show exactly what it takes to get there.

Set your goal. See your reality.
```

### Supporting sections

1. **How it works** - Brief explanation of reverse-funnel methodology
2. **About the data** - Source attribution (FirstPageSage benchmarks)
3. **Interpretation guide** - What the numbers mean for planning
4. **CTA** - "Need help building your annual plan? Let's talk."

---

## File delivery checklist

After build, ensure these files exist:

```
/app/calculator/page.tsx
/app/calculator/layout.tsx (optional, for page-specific metadata)
/components/calculator/SaasCalculator.tsx
/components/calculator/FunnelDisplay.tsx
/components/calculator/MetricsRow.tsx
/components/calculator/IndustrySelector.tsx
/components/calculator/InputFields.tsx
/components/calculator/CacComparison.tsx
/components/calculator/ConversionArrow.tsx
/lib/calculator/types.ts
/lib/calculator/conversion-rates.ts
/lib/calculator/funnel-calculations.ts
```

---

## Data attribution

All benchmark data sourced from FirstPageSage:
- https://firstpagesage.com/seo-blog/average-saas-conversion-rates/
- https://firstpagesage.com/marketing/cac-by-channel/

Include footer attribution on the calculator page.

---

## Notes for Cursor

1. **Start with types** - Build `/lib/calculator/types.ts` first
2. **Data models next** - Populate `/lib/calculator/conversion-rates.ts` with all CSV data
3. **Logic layer** - Build calculation functions with tests
4. **Components last** - UI comes after the data layer is solid
5. **Mobile-first** - Build responsive from the start
6. **Animate thoughtfully** - Use Framer Motion for number changes, not just for show

This calculator should feel like a tool a VP of Marketing would actually bookmark. Make it fast, make it useful, make it beautiful.
