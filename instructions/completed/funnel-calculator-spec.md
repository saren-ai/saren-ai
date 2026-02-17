# Interactive Sales Funnel Calculator – Development Spec

**Project:** Saren.ai Enhancement  
**Component:** Interactive Sales Funnel Calculator (Enhancement of existing `/portfolio/calculator`)  
**Framework:** Next.js 16.1.6 (App Router), React 19.2.3, TypeScript 5  
**Date:** February 2026  
**Designer:** Saren Sakurai  

---

## Executive Summary

Transform the existing SaaS Revenue Calculator (`/portfolio/calculator`) into a bidirectional ROI calculator that forces stakeholders to confront the mathematical reality of demand generation. This isn't a vanity metric dashboard—it's a conversation ender for the "do more with less" crowd.

**Core Innovation:** Users can input **either** budget (left) or revenue goal (right), and the system calculates all funnel stages in between, revealing the exact gap between ambition and resourcing.

---

## Strategic Context

### The Problem This Solves
Most executives receive:
1. A fixed marketing budget ($X)
2. An ambitious revenue target ($Y)
3. Zero acknowledgment that the two rarely align mathematically

This calculator makes the disconnect impossible to ignore.

### Target Users
- **CFOs/Finance:** Need to see ROI math before approving budgets
- **CEOs/Founders:** Want to understand what revenue is actually achievable
- **CMOs/RevOps:** Need ammunition to defend budget requests
- **Sales Leaders:** Want to understand lead volume requirements

### Success Metrics
- 40%+ of visitors edit at least one conversion rate (they're modeling scenarios)
- 25%+ download the PDF analysis
- 10%+ book a consultation call
- Average session time >90 seconds

---

## Technical Architecture

### File Structure
```
src/
├── app/
│   └── portfolio/
│       └── calculator/
│           └── page.tsx (ENHANCE EXISTING)
├── components/
│   └── calculator/
│       ├── SaasCalculator.tsx (ENHANCE)
│       ├── ConfigurationPanel.tsx (NEW)
│       ├── BidirectionalInputs.tsx (NEW)
│       ├── FunnelVisualization.tsx (NEW)
│       ├── FunnelStage.tsx (NEW)
│       ├── PerformanceDashboard.tsx (NEW)
│       ├── IndustryComparison.tsx (NEW)
│       ├── OptimizationSuggestions.tsx (NEW)
│       ├── AlternativePathways.tsx (NEW)
│       └── ExportControls.tsx (NEW)
├── lib/
│   └── calculator/
│       ├── benchmark-data.ts (NEW)
│       ├── funnel-engine.ts (ENHANCE)
│       └── pdf-generator.ts (NEW)
└── data/ (NEW)
    └── benchmarks/
        ├── cac-by-industry.json
        ├── funnel-conversion-rates.json
        ├── traffic-to-lead.json
        ├── freemium-conversion.json
        └── channel-cac.json
```

### Data Layer Strategy

**CSV → JSON Conversion**  
Convert all uploaded CSV files to static JSON at build time:

```typescript
// src/data/benchmarks/cac-by-industry.json
{
  "Consumer": { "min": 200, "avg": 215, "max": 250 },
  "SMB": { "min": 600, "avg": 655, "max": 750 },
  "Middle Market": { "min": 3000, "avg": 3352, "max": 3800 },
  "Enterprise": { "min": 7500, "avg": 7951, "max": 8500 }
}

// src/data/benchmarks/funnel-conversion-rates.json
{
  "SaaS": {
    "benchmark": {
      "trafficToLead": 0.02,
      "leadToMQL": 0.30,
      "mqlToSQL": 0.20,
      "sqlToOpp": 0.50,
      "oppToWon": 0.25
    },
    "topPerformer": {
      "trafficToLead": 0.05,
      "leadToMQL": 0.35,
      "mqlToSQL": 0.26,
      "sqlToOpp": 0.62,
      "oppToWon": 0.30
    }
  }
}
```

**Benchmark Data Library**  
```typescript
// src/lib/calculator/benchmark-data.ts

export interface BenchmarkData {
  cac: { min: number; avg: number; max: number }
  conversionRates: ConversionRates
  avgDealSize: number
  salesCycleMonths: number
}

export const getBenchmark = (
  industry: string,
  customerType: CustomerType
): BenchmarkData => {
  // Smart lookup across multiple datasets
  // Returns combined benchmark object
}

export const getPercentileRank = (
  value: number,
  benchmark: { min: number; avg: number; max: number }
): number => {
  // Calculate where user's value falls vs benchmark
}
```

---

## Component Architecture

### 1. Configuration Panel (Top Section)

**Component:** `ConfigurationPanel.tsx`

```typescript
interface ConfigurationPanelProps {
  selectedIndustry: string
  selectedCustomerType: CustomerType
  selectedChannel: ChannelMix
  onIndustryChange: (industry: string) => void
  onCustomerTypeChange: (type: CustomerType) => void
  onChannelChange: (mix: ChannelMix) => void
}

type CustomerType = 'Consumer' | 'SMB' | 'Middle Market' | 'Enterprise'
type ChannelMix = 'Paid-Led' | 'Product-Led' | 'Hybrid'
```

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Calculate your funnel by:                                  │
│                                                              │
│  Industry: [Dropdown: 32 options from traffic-to-lead data] │
│                                                              │
│  Customer Type:                                              │
│  [○ Consumer] [● SMB] [○ Mid-Market] [○ Enterprise]        │
│                                                              │
│  Go-to-Market Motion:                                        │
│  [○ Paid-Led] [● Product-Led] [○ Hybrid]                   │
└─────────────────────────────────────────────────────────────┘
```

**Behavior:**
- Changes here trigger immediate recalculation of all funnel metrics
- Show tooltip on hover explaining how each selection impacts assumptions
- Default: SMB + SaaS + Paid-Led (most common Saren.ai client)

**Styling:**
- Use Fire Horse 2026 palette
- Radio buttons: Ember Red when selected
- Dropdown: Charcoal background, Ash White text
- Subtle Electric Blue glow on focus states

---

### 2. Bidirectional Input Controls

**Component:** `BidirectionalInputs.tsx`

```typescript
interface BidirectionalInputsProps {
  budget: number | null
  revenueGoal: number | null
  onBudgetChange: (value: number) => void
  onRevenueGoalChange: (value: number) => void
  calculatedRevenue?: number
  calculatedBudget?: number
}
```

**Visual Layout:**
```
┌────────────────────┐                          ┌────────────────────┐
│  💰 Total Ad Spend │                          │  🎯 Revenue Goal   │
│  [$__________]     │  ←─── OR ────→          │  [$__________]     │
│                    │                          │                    │
│  Calculated:       │                          │  Required:         │
│  Revenue: $XXX,XXX │                          │  Budget: $XXX,XXX  │
└────────────────────┘                          └────────────────────┘
```

**Behavior:**
- Only ONE input can be active at a time
- When user types in Budget → auto-calculate Revenue Goal
- When user types in Revenue Goal → auto-calculate Required Budget
- Show "lock" icon on the input being calculated
- Animate the calculated value with count-up effect (Framer Motion)

**Validation:**
- Min budget: $1,000
- Max budget: $10,000,000
- Show warning if budget < $5,000 ("Minimum viable budget for B2B SaaS")
- Show warning if calculated CAC > 3x industry benchmark

---

### 3. Funnel Visualization (The Main Show)

**Component:** `FunnelVisualization.tsx`

This is the centerpiece—a horizontal flow showing every stage from spend to closed-won.

```typescript
interface FunnelVisualizationProps {
  stages: FunnelStage[]
  editMode: boolean
  onConversionRateEdit: (stageId: string, newRate: number) => void
}

interface FunnelStage {
  id: string
  label: string
  volume: number
  costPer: number
  conversionRate?: number // null for first stage
  benchmarkRate?: { min: number; avg: number; max: number }
  editable: boolean
}
```

**Visual Structure:**
```
[Ad Spend]──1.7%──>[Impressions]──21.7%──>[Clicks]──2%──>[Leads]──30%──>[MQLs]──20%──>[SQLs]──50%──>[Opps]──25%──>[Wins]
  $161.9K          2.8M           48.6K         5,066        1,125        1,026         225         12

    ↓                ↓               ↓             ↓            ↓            ↓             ↓           ↓
 
 CW:$49.0        CPM:$58        CPC:$3.33     CPL:$32      CPQL:$144    CPSQL:$158    CPOpp:$720   CAC:$13,491
```

**Stage Component:** `FunnelStage.tsx`

```typescript
interface FunnelStageProps {
  stage: FunnelStage
  nextStage?: FunnelStage
  onEdit?: (newRate: number) => void
  benchmark?: { min: number; avg: number; max: number }
}
```

**Each Stage Displays:**
- **Top:** Volume (large, bold, e.g., "5,066")
- **Bottom:** Cost-per metric (smaller, gray, e.g., "CPL: $32")
- **Connector Arrow:** Conversion rate (e.g., "2%")
  - Color-coded: Green (above benchmark), Yellow (at benchmark), Red (below)
  - Editable on click if `editable: true`

**Interaction Behavior:**
1. **Hover on conversion rate:**
   - Show tooltip: "Lead→MQL: 30% (Industry avg: 25-35%)"
   - Show edit icon if editable
   
2. **Click conversion rate:**
   - Inline input appears
   - Shows benchmark range below input
   - ESC to cancel, Enter to save
   - Triggers recalculation on save

3. **Visual feedback:**
   - Animate stage volumes when they change (count-up effect)
   - Pulse the stages that were affected by the edit
   - Scroll into view if stage is off-screen

**Responsive Behavior:**
- Desktop: Horizontal scroll if needed (sticky left/right controls)
- Tablet: Horizontal scroll
- Mobile: Vertical stack (stages collapse into accordion)

---

### 4. Performance Dashboard

**Component:** `PerformanceDashboard.tsx`

Three key metrics displayed as prominent cards below the funnel.

```typescript
interface PerformanceDashboardProps {
  roi: number
  blendedCAC: number
  gap: number | null // null if no goal set
  benchmarkCAC: { min: number; avg: number; max: number }
}
```

**Visual Layout:**
```
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ 📊 ROI Multiple      │  │ 💸 Blended CAC       │  │ ⚠️ Investment Gap    │
│                      │  │                      │  │                      │
│      5.5x            │  │     $13,491          │  │    $47,200 short     │
│                      │  │                      │  │                      │
│ For every $1 spent,  │  │ Industry avg: $655   │  │ To hit your $1M goal,│
│ you generate $5.50   │  │                      │  │ you need $186K total.│
│ in pipeline.         │  │ ⚠️ 20.5x above avg   │  │                      │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

**Styling Rules:**
- **ROI > 3x:** Green background (success)
- **ROI 2-3x:** Yellow background (caution)
- **ROI < 2x:** Red background (danger)

- **CAC < 2x benchmark:** Green
- **CAC 2-3x benchmark:** Yellow
- **CAC > 3x benchmark:** Red + warning icon

- **Gap = 0:** Green "On Target" message
- **Gap < 20%:** Yellow "Close" message
- **Gap > 20%:** Red "Significant Gap" message

---

### 5. Industry Comparison Panel

**Component:** `IndustryComparison.tsx`

```typescript
interface IndustryComparisonProps {
  userMetrics: {
    cac: number
    trafficToLead: number
    overallConversion: number
  }
  benchmarks: {
    cac: { min: number; avg: number; max: number }
    trafficToLead: { min: number; avg: number; max: number }
    overallConversion: { p25: number; p50: number; p75: number }
  }
  industry: string
  customerType: CustomerType
}
```

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ 📊 How You Stack Up (SMB SaaS Benchmarks)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Your CAC:        $13,491  │ Industry Avg: $655              │
│ ████████████████████████████████░░░░░░ 95th percentile      │
│                                                              │
│ Traffic→Lead:      2.0%   │ Industry Avg: 2.5%              │
│ ████████████░░░░░░░░░░░░░░░░░░░░░░░ 42nd percentile         │
│                                                              │
│ Overall CVR:     0.0006%  │ Top Quartile: 0.0012%           │
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ 35th percentile         │
└─────────────────────────────────────────────────────────────┘
```

**Behavior:**
- Progress bars show percentile ranking visually
- Color-code: 
  - <25th percentile: Red
  - 25-50th: Yellow
  - 50-75th: Light green
  - >75th: Electric Blue (you're outperforming)

---

### 6. Optimization Suggestions

**Component:** `OptimizationSuggestions.tsx`

AI-generated insights based on where the user's funnel is weakest.

```typescript
interface OptimizationSuggestionsProps {
  stages: FunnelStage[]
  benchmarks: Record<string, { min: number; avg: number; max: number }>
  currentGap: number
}
```

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ 💡 Optimization Levers (Based on Your Funnel)               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. Improve MQL→SQL conversion by 10% (20% → 22%)           │
│    → Saves $28,000 in ad spend                              │
│    → Reduces CAC from $13,491 to $11,200                    │
│                                                              │
│ 2. Add organic content channel (SEO/PLG)                    │
│    → Could reduce blended CAC by 22%                        │
│    → See "Alternative Pathways" below                       │
│                                                              │
│ 3. Focus on higher-value deals                              │
│    → Increase ADS from $40K to $60K                         │
│    → Improves CAC:LTV ratio by 50%                          │
└─────────────────────────────────────────────────────────────┘
```

**Logic:**
```typescript
const generateSuggestions = (stages: FunnelStage[], benchmarks: Benchmarks) => {
  const suggestions = []
  
  // Find worst-performing stage
  stages.forEach(stage => {
    const gap = stage.conversionRate - benchmarks[stage.id].avg
    if (gap < -0.05) { // More than 5% below benchmark
      suggestions.push({
        type: 'improve-conversion',
        stage: stage.label,
        current: stage.conversionRate,
        target: benchmarks[stage.id].avg,
        impact: calculateImpact(stage, benchmarks[stage.id].avg)
      })
    }
  })
  
  // If CAC > 2x benchmark, suggest channel diversification
  if (blendedCAC > benchmarks.cac.avg * 2) {
    suggestions.push({
      type: 'add-channel',
      message: 'Add organic content channel (SEO/PLG)',
      impact: 'Could reduce blended CAC by 22%'
    })
  }
  
  return suggestions.slice(0, 3) // Top 3 only
}
```

---

### 7. Alternative Pathways

**Component:** `AlternativePathways.tsx`

Shows the Product-Led Growth (PLG) alternative using freemium/free trial data.

```typescript
interface AlternativePathwaysProps {
  industry: string
  currentCAC: number
  freeTrialConversion: {
    visitorToTrial: number
    trialToPaid: number
  }
  freemiumConversion: {
    visitorToFreemium: number
    freemiumToPaid: number
  }
}
```

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🆓 The Product-Led Growth Alternative                       │
├─────────────────────────────────────────────────────────────┤
│ Instead of $161K in ads, what if you invested in:           │
│                                                              │
│ Free Trial Path:                                             │
│ ├─ Visitor → Free Trial: 3.2%                               │
│ ├─ Trial → Paid: 18%                                        │
│ └─ Blended CAC: $2,100 (vs $13,491 paid)                   │
│                                                              │
│ Freemium Path:                                               │
│ ├─ Visitor → Freemium: 8.5%                                 │
│ ├─ Freemium → Paid: 4%                                      │
│ └─ Blended CAC: $890 (vs $13,491 paid)                     │
│                                                              │
│ 💡 Trade-off: Lower CAC, but longer sales cycle (6-9 mo)   │
└─────────────────────────────────────────────────────────────┘
```

**Data Source:**
Pull from `free_trial_freemium_conversion_by_industry.csv` based on selected industry.

---

### 8. Export Controls

**Component:** `ExportControls.tsx`

```typescript
interface ExportControlsProps {
  funnelData: FunnelData
  config: CalculatorConfig
  onExportPDF: () => void
  onBookCall: () => void
}
```

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ These numbers don't lie. But they do tell stories.          │
│                                                              │
│ [📄 Download Full Analysis] [📅 Book a Funnel Audit Call]  │
└─────────────────────────────────────────────────────────────┘
```

**PDF Export Functionality:**
```typescript
// src/lib/calculator/pdf-generator.ts

export const generateFunnelAnalysisPDF = async (
  funnelData: FunnelData,
  config: CalculatorConfig
): Promise<Blob> => {
  // Use jsPDF or react-pdf
  // Include:
  // - User's funnel visualization
  // - Performance metrics
  // - Industry comparison
  // - Optimization suggestions
  // - Saren.ai branding + CTA
  
  return pdfBlob
}
```

**Book Call:**
- Link to Calendly or HubSpot scheduling page
- Pre-fill form data with funnel assumptions

---

## State Management

### Calculator State

```typescript
// src/lib/calculator/types.ts

export interface CalculatorConfig {
  // User selections
  industry: string
  customerType: CustomerType
  channelMix: ChannelMix
  
  // Inputs (only one active)
  budget: number | null
  revenueGoal: number | null
  
  // Editable assumptions
  conversionRates: {
    ctr: number           // Impressions → Clicks
    trafficToLead: number // Clicks → Leads
    leadToMQL: number     // Leads → MQLs
    mqlToSQL: number      // MQLs → SQLs
    sqlToOpp: number      // SQLs → Opportunities
    oppToWon: number      // Opportunities → Closed-Won
  }
  
  avgDealSize: number
  salesCycleMonths: number
  
  // Channel allocation (for CAC calc)
  channelAllocation: {
    paidSearch: number  // %
    paidSocial: number  // %
    content: number     // %
    other: number       // %
  }
}

export interface FunnelData {
  // Calculated volumes
  impressions: number
  clicks: number
  leads: number
  mqls: number
  sqls: number
  opportunities: number
  closedWon: number
  
  // Calculated costs
  totalSpend: number
  cpm: number
  cpc: number
  cpl: number
  cpql: number
  cpsql: number
  cpOpp: number
  cac: number
  
  // Calculated outputs
  revenue: number
  roi: number
  
  // Benchmarks
  benchmarks: BenchmarkData
  
  // Gap analysis (if goal set)
  gap?: {
    revenueGap: number
    budgetGap: number
    percentageOff: number
  }
}
```

### React State Hook

```typescript
// src/lib/calculator/use-funnel-calculator.ts

export const useFunnelCalculator = () => {
  const [config, setConfig] = useState<CalculatorConfig>(DEFAULT_CONFIG)
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Recalculate whenever config changes
  useEffect(() => {
    setIsCalculating(true)
    const data = calculateFunnel(config)
    setFunnelData(data)
    setIsCalculating(false)
  }, [config])
  
  const updateConfig = (updates: Partial<CalculatorConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }
  
  const updateConversionRate = (stage: string, rate: number) => {
    setConfig(prev => ({
      ...prev,
      conversionRates: {
        ...prev.conversionRates,
        [stage]: rate
      }
    }))
  }
  
  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG)
  }
  
  return {
    config,
    funnelData,
    isCalculating,
    updateConfig,
    updateConversionRate,
    resetToDefaults
  }
}
```

---

## Calculation Engine

### Core Algorithm

```typescript
// src/lib/calculator/funnel-engine.ts

export const calculateFunnel = (config: CalculatorConfig): FunnelData => {
  const benchmarks = getBenchmark(config.industry, config.customerType)
  
  // Determine direction: forward (budget → revenue) or reverse (goal → budget)
  const isForwardCalc = config.budget !== null
  
  if (isForwardCalc) {
    return calculateForward(config, benchmarks)
  } else {
    return calculateReverse(config, benchmarks)
  }
}

const calculateForward = (
  config: CalculatorConfig,
  benchmarks: BenchmarkData
): FunnelData => {
  const { budget, conversionRates, avgDealSize } = config
  
  // Estimate CPM based on channel mix (pulled from channel CAC data)
  const cpm = estimateCPM(config.channelAllocation)
  
  // Work forward through funnel
  const impressions = (budget! / cpm) * 1000
  const clicks = impressions * conversionRates.ctr
  const leads = clicks * conversionRates.trafficToLead
  const mqls = leads * conversionRates.leadToMQL
  const sqls = mqls * conversionRates.mqlToSQL
  const opportunities = sqls * conversionRates.sqlToOpp
  const closedWon = opportunities * conversionRates.oppToWon
  
  // Calculate costs
  const cpc = budget! / clicks
  const cpl = budget! / leads
  const cpql = budget! / mqls
  const cpsql = budget! / sqls
  const cpOpp = budget! / opportunities
  const cac = budget! / closedWon
  
  // Calculate revenue
  const revenue = closedWon * avgDealSize
  const roi = revenue / budget!
  
  return {
    impressions,
    clicks,
    leads,
    mqls,
    sqls,
    opportunities,
    closedWon,
    totalSpend: budget!,
    cpm,
    cpc,
    cpl,
    cpql,
    cpsql,
    cpOpp,
    cac,
    revenue,
    roi,
    benchmarks
  }
}

const calculateReverse = (
  config: CalculatorConfig,
  benchmarks: BenchmarkData
): FunnelData => {
  const { revenueGoal, conversionRates, avgDealSize } = config
  
  // Work backward from goal
  const closedWon = revenueGoal! / avgDealSize
  const opportunities = closedWon / conversionRates.oppToWon
  const sqls = opportunities / conversionRates.sqlToOpp
  const mqls = sqls / conversionRates.mqlToSQL
  const leads = mqls / conversionRates.leadToMQL
  const clicks = leads / conversionRates.trafficToLead
  const impressions = clicks / conversionRates.ctr
  
  // Estimate required budget
  const cpm = estimateCPM(config.channelAllocation)
  const totalSpend = (impressions / 1000) * cpm
  
  // Calculate costs
  const cpc = totalSpend / clicks
  const cpl = totalSpend / leads
  const cpql = totalSpend / mqls
  const cpsql = totalSpend / sqls
  const cpOpp = totalSpend / opportunities
  const cac = totalSpend / closedWon
  
  const roi = revenueGoal! / totalSpend
  
  // Calculate gap
  const gap = {
    revenueGap: 0,
    budgetGap: totalSpend - (config.budget || 0),
    percentageOff: ((totalSpend - (config.budget || 0)) / totalSpend) * 100
  }
  
  return {
    impressions,
    clicks,
    leads,
    mqls,
    sqls,
    opportunities,
    closedWon,
    totalSpend,
    cpm,
    cpc,
    cpl,
    cpql,
    cpsql,
    cpOpp,
    cac,
    revenue: revenueGoal!,
    roi,
    benchmarks,
    gap
  }
}

const estimateCPM = (channelAllocation: ChannelAllocation): number => {
  // Weighted average based on channel mix
  const cpmRates = {
    paidSearch: 45,   // Google Ads
    paidSocial: 35,   // LinkedIn Ads
    content: 15,      // Content syndication
    other: 25
  }
  
  return Object.keys(channelAllocation).reduce((acc, channel) => {
    const weight = channelAllocation[channel] / 100
    return acc + (cpmRates[channel] * weight)
  }, 0)
}
```

---

## Styling & Animation

### Fire Horse 2026 Palette Application

```css
/* src/app/globals.css - ensure these exist */
:root {
  --ember-red: #FF4500;
  --charcoal-black: #1A1A1A;
  --ash-white: #F5F5F5;
  --electric-blue: #00A8E8;
  --copper: #B87333;
}
```

### Component-Specific Styles

```typescript
// Tailwind classes for key components

// Configuration Panel
<div className="bg-charcoal-black/5 dark:bg-charcoal-black/20 rounded-lg p-6 border border-charcoal-black/10">

// Radio buttons (selected)
<button className="bg-ember-red text-ash-white">

// Input fields
<input className="bg-ash-white dark:bg-charcoal-black border-2 border-charcoal-black/20 focus:border-electric-blue">

// Performance cards
<div className="bg-gradient-to-br from-ember-red/10 to-ember-red/5 border-l-4 border-ember-red">

// Stage connectors (color-coded by performance)
<div className={`
  ${performanceVsBenchmark > 0 ? 'text-green-500' : ''}
  ${performanceVsBenchmark === 0 ? 'text-yellow-500' : ''}
  ${performanceVsBenchmark < 0 ? 'text-ember-red' : ''}
`}>
```

### Animations (Framer Motion)

```typescript
// Number count-up effect
import { motion, useSpring, useTransform } from 'framer-motion'

const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(value, { duration: 1000 })
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString())
  
  return <motion.span>{display}</motion.span>
}

// Stage pulse on edit
<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 0.3 }}
>
  {/* Stage content */}
</motion.div>

// Connector arrow slide-in
<motion.div
  initial={{ scaleX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="origin-left"
>
  {/* Arrow */}
</motion.div>
```

---

## Responsive Design

### Breakpoints
- Mobile: < 640px (stack vertically)
- Tablet: 640px - 1024px (horizontal scroll)
- Desktop: > 1024px (full layout)

### Mobile Adaptations

```typescript
// FunnelVisualization mobile view
{isMobile ? (
  <div className="space-y-4">
    {stages.map(stage => (
      <Accordion key={stage.id}>
        <AccordionTrigger>
          <div className="flex justify-between w-full">
            <span>{stage.label}</span>
            <span className="font-bold">{stage.volume.toLocaleString()}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Cost per: ${stage.costPer.toLocaleString()}</p>
            <p>Conversion: {stage.conversionRate}%</p>
            {stage.editable && (
              <button onClick={() => onEdit(stage.id)}>Edit</button>
            )}
          </div>
        </AccordionContent>
      </Accordion>
    ))}
  </div>
) : (
  <HorizontalFunnelFlow stages={stages} />
)}
```

---

## SEO & Metadata

### Page Metadata

```typescript
// src/app/portfolio/calculator/page.tsx

export const metadata: Metadata = {
  title: 'SaaS Funnel Calculator | Saren.ai',
  description: 'Calculate your true SaaS marketing ROI. Bidirectional funnel calculator shows exactly what budget you need to hit revenue goals—or what revenue you can expect from your budget.',
  openGraph: {
    title: 'SaaS Funnel ROI Calculator',
    description: 'Stop guessing. Start budgeting like revenue depends on it.',
    images: ['/og-calculator.png'],
  }
}
```

### Structured Data

```typescript
// Add to page
const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SaaS Funnel ROI Calculator",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "Saren Sakurai"
  }
}
```

---

## Testing Requirements

### Unit Tests
- [ ] `calculateForward` produces correct volumes
- [ ] `calculateReverse` produces correct budget
- [ ] Conversion rate edits trigger recalculation
- [ ] Benchmark lookups return correct data
- [ ] PDF generation includes all sections

### Integration Tests
- [ ] Changing industry updates all benchmarks
- [ ] Changing customer type updates CAC ranges
- [ ] Budget input disables goal input
- [ ] Goal input disables budget input
- [ ] Export PDF downloads successfully

### E2E Tests
- [ ] User can complete full calculation flow
- [ ] Mobile accordion navigation works
- [ ] Conversion rate inline editing works
- [ ] Performance cards display correct colors
- [ ] Alternative pathways show PLG data

---

## Performance Targets

- **Initial Load:** < 2s
- **Calculation Time:** < 100ms
- **Animation Frame Rate:** 60fps
- **Lighthouse Score:** > 95

### Optimization Strategies
- Memoize funnel calculations
- Debounce input changes (300ms)
- Lazy load alternative pathways component
- Preload benchmark data at build time

---

## Accessibility

### WCAG 2.1 AA Compliance
- [ ] All inputs have labels
- [ ] Color contrast ratios > 4.5:1
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces calculation results
- [ ] Focus indicators visible

### Keyboard Shortcuts
- `Tab`: Navigate between inputs
- `Enter`: Confirm conversion rate edit
- `Esc`: Cancel conversion rate edit
- `Cmd/Ctrl + E`: Export PDF
- `Cmd/Ctrl + R`: Reset to defaults

---

## Copy & Messaging

### Hero Section (Above Calculator)
**Headline:**  
"The only ROI calculator that shows you the math investors already know."

**Subhead:**  
*Most CMOs get a budget and a revenue target. Rarely do they match. This tool shows you exactly why—and what it actually takes to close the gap.*

### Configuration Panel
**Section Intro:**  
"Pick your reality:"

### Results Section
**When Gap Exists:**  
"⚠️ **Reality Check:** Your current budget of $X supports $Y in revenue. To hit your $Z goal, you need $A more in marketing investment."

**When On Target:**  
"✓ **On Track:** Your budget aligns with your revenue goal. Focus on optimizing conversion rates to improve ROI."

### CTA Section
**Headline:**  
"These numbers don't lie. But they do tell stories."

**Buttons:**  
- Primary: "Download My Full Funnel Analysis"
- Secondary: "Book a Strategy Call"

---

## Analytics & Tracking

### Events to Track
```typescript
// Track with your analytics provider (e.g., Plausible, Mixpanel)

analytics.track('Calculator: Industry Selected', { industry })
analytics.track('Calculator: Customer Type Changed', { type })
analytics.track('Calculator: Budget Entered', { amount })
analytics.track('Calculator: Goal Entered', { amount })
analytics.track('Calculator: Conversion Rate Edited', { stage, oldRate, newRate })
analytics.track('Calculator: PDF Downloaded')
analytics.track('Calculator: Call Booked')
analytics.track('Calculator: Session Duration', { seconds })
```

### Key Metrics Dashboard
- Total calculations run
- Average session duration
- Most edited conversion rates
- PDF download conversion rate
- Call booking conversion rate
- Industry distribution
- Customer type distribution

---

## Launch Checklist

### Pre-Launch
- [ ] Convert all CSVs to JSON
- [ ] Implement benchmark data library
- [ ] Build all components
- [ ] Write calculation engine
- [ ] Add animations
- [ ] Test on mobile/tablet/desktop
- [ ] Run accessibility audit
- [ ] Set up analytics tracking
- [ ] Create PDF export template
- [ ] Write OG image

### Launch
- [ ] Deploy to Vercel
- [ ] Test in production
- [ ] Monitor analytics
- [ ] Share on LinkedIn
- [ ] Add to portfolio mega menu
- [ ] Update sitemap

### Post-Launch
- [ ] Monitor user behavior
- [ ] A/B test messaging
- [ ] Collect user feedback
- [ ] Iterate on suggestions algorithm
- [ ] Add more industries
- [ ] Build API version for partners

---

## Future Enhancements (V2)

1. **Scenario Comparison**
   - Save multiple scenarios
   - Side-by-side comparison view
   - "What-if" simulation mode

2. **Team Collaboration**
   - Shareable links with locked assumptions
   - Comments on conversion rates
   - Approval workflows

3. **Time Series**
   - Show funnel evolution over 12 months
   - Ramp models for new channels
   - Seasonality adjustments

4. **Channel Deep Dives**
   - Individual channel ROI calculators
   - Multi-touch attribution models
   - Channel mix optimizer

5. **Integration API**
   - Connect to HubSpot/Salesforce
   - Pull actual funnel data
   - Real-time vs. projected comparison

---

## Technical Dependencies

### New Packages to Install
```bash
npm install jspdf react-pdf @react-pdf/renderer
npm install recharts # for potential chart visualizations
npm install react-hook-form # for form validation
```

### Existing Packages Used
- `framer-motion` (already installed)
- `@dnd-kit/*` (already installed, if we add drag-to-reorder stages)
- `lucide-react` (icons)

---

## File Checklist

### New Files to Create
```
✓ src/data/benchmarks/cac-by-industry.json
✓ src/data/benchmarks/funnel-conversion-rates.json
✓ src/data/benchmarks/traffic-to-lead.json
✓ src/data/benchmarks/freemium-conversion.json
✓ src/data/benchmarks/channel-cac.json

✓ src/lib/calculator/benchmark-data.ts
✓ src/lib/calculator/funnel-engine.ts
✓ src/lib/calculator/pdf-generator.ts
✓ src/lib/calculator/use-funnel-calculator.ts

✓ src/components/calculator/ConfigurationPanel.tsx
✓ src/components/calculator/BidirectionalInputs.tsx
✓ src/components/calculator/FunnelVisualization.tsx
✓ src/components/calculator/FunnelStage.tsx
✓ src/components/calculator/PerformanceDashboard.tsx
✓ src/components/calculator/IndustryComparison.tsx
✓ src/components/calculator/OptimizationSuggestions.tsx
✓ src/components/calculator/AlternativePathways.tsx
✓ src/components/calculator/ExportControls.tsx
```

### Files to Modify
```
✓ src/app/portfolio/calculator/page.tsx
✓ src/components/calculator/SaasCalculator.tsx (enhance)
✓ src/lib/calculator/types.ts (expand)
```

---

## Implementation Priority

### Phase 1: Core (Week 1)
1. Convert CSVs → JSON
2. Build benchmark data library
3. Implement calculation engine
4. Create bidirectional inputs
5. Build funnel visualization (desktop only)

### Phase 2: Intelligence (Week 2)
6. Add performance dashboard
7. Build industry comparison
8. Implement optimization suggestions
9. Add alternative pathways

### Phase 3: Polish (Week 3)
10. Add animations
11. Mobile responsive layout
12. PDF export
13. Analytics tracking
14. Accessibility audit

---

## Success Criteria

**Qualitative:**
- Executives say "this is the clearest explanation of marketing ROI I've ever seen"
- Sales team uses it in pitches
- Gets shared on LinkedIn by users

**Quantitative:**
- 40%+ interaction rate (edit conversion rates)
- 25%+ PDF download rate
- 10%+ call booking rate
- 90+ second average session
- <2% bounce rate

---

## Support & Maintenance

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Last 2 versions

### Known Limitations
- CSV data is static (updated manually)
- No real-time data integration (V1)
- Limited to 32 industries
- Assumes standard SaaS funnel (may not fit all businesses)

---

## Questions for Saren

1. **Data Updates:** How often do you want to refresh the benchmark CSVs? Manual or automated?

2. **PDF Branding:** Should the PDF export include your full branding guide or minimal logo?

3. **Call Booking:** Do you have a preferred calendar tool (Calendly, HubSpot, etc.)?

4. **Analytics:** Plausible, Mixpanel, or something else?

5. **Gating:** Should PDF download require email capture? Or fully open?

6. **Industry List:** Do you want all 32 industries from the traffic-to-lead data, or curate to ~10 most relevant?

7. **Channel Mix:** Should channel allocation be editable by users, or auto-set based on customer type?

8. **Mobile Priority:** What % of your traffic is mobile? Should we optimize for mobile-first or desktop-first?

---

## Appendix: Data Files Reference

### Required CSVs to Convert
1. `cac_by_industry_and_customer_type.csv` → Extract Consumer/SMB/Mid-Market/Enterprise CAC ranges
2. `funnel_conversion_rates_by_channel.csv` → Extract channel-specific conversion benchmarks
3. `traffic_to_lead_by_industry.csv` → Extract 32 industry conversion rates
4. `free_trial_freemium_conversion_by_industry.csv` → Extract PLG pathway data
5. `cac_by_marketing_channel.csv` → Extract B2B/B2C CAC by channel for CPM estimation
6. `saas_funnel_stages_benchmarks.csv` → Extract the core 2% → 30% → 20% → 50% → 25% progression

---

**END OF SPEC**

---

**Implementation Notes for Claude Code:**

This spec is written to be copy/pasted directly into Claude Code (Cursor). Key principles:

1. **Incremental Development:** Build Phase 1 first, test, then move to Phase 2
2. **Component Isolation:** Each component should work standalone before integration
3. **Type Safety:** All TypeScript interfaces are defined upfront
4. **Benchmark Data First:** Start by converting CSVs to JSON so calculations can reference real data
5. **Mobile Responsive:** Use Tailwind responsive classes (`sm:`, `md:`, `lg:`) throughout

**Ready to Build:** This spec contains everything needed to implement V1 of the calculator. No additional context required.
