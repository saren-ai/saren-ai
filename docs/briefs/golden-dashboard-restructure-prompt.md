# Golden Dashboard Restructure — Cursor Prompt

> **Model recommendation:** Use Opus 4.5 for this task. The multi-file coordination, math corrections, and "preserve existing behavior" constraints benefit from Opus-level reasoning.

---

## Context

You're refactoring an interactive B2B marketing funnel simulator built in Next.js 14+ with TypeScript, Tailwind CSS, and Framer Motion. The current implementation uses a 2-row horizontal layout (Marketing Funnel → Sales Funnel). We're restructuring to a 4-row vertical "serpentine" layout that more accurately represents the actual lead journey, with corrected conversion rate math based on industry benchmark data.

### Current file structure
```
/lib/golden-dashboard.ts          — Data model, computation engine, metric metadata
/components/golden-dashboard/
  ├── DashboardFlow.tsx           — Main layout component
  ├── MetricCard.tsx              — Individual metric cards
  ├── FunnelControls.tsx          — Calculator mode controls
  ├── InsightNarrative.tsx        — Dynamic insight panel
  ├── MetricDrawer.tsx            — Click-to-expand deep content
  ├── StageConnector.tsx          — Conversion rate connectors
  └── Tooltip.tsx                 — Hover tooltips
```

### Design system (Fire Horse 2026)
```css
--color-ember: #E34234;      /* Primary metric values, alerts, CTA */
--color-electric: #457B9D;   /* Marketing stages, active states, conversion rates */
--color-copper: #C17D3A;     /* Sales stages, accents */
--color-charcoal: #1D3557;   /* Dark text (light mode) */
--color-ash: #F1FAEE;        /* Light backgrounds (light mode) */
```

### Current tech stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- "use client" directives for interactive components

---

## Part 1: Fix the data model conversion rates

### The problem

The current model conflates MQL→Opportunity as a single conversion step. The correct B2B SaaS funnel has **distinct stages** with separate conversion rates:

```
Current (incorrect):
MQL ──────────────────────────────► Opportunity ──► Closed-Won
         (one conversion rate)

Correct:
MQL ──► SQL ──► Opportunity ──► Closed-Won
    38%     43%           20-38%
```

### Benchmark conversion rates (source: FirstPageSage industry averages)

| Stage Transition | Benchmark Rate | Notes |
|------------------|----------------|-------|
| Visitor → Lead | 1.65% | Currently ~6.6% (Click→Lead), reasonable |
| Lead → MQL | 42.47% | Currently ~39%, keep as-is |
| MQL → SQL | **38.00%** | **NEW — not currently in model** |
| SQL → Opportunity | **42.88%** | **NEW — currently conflated with above** |
| Opportunity → Close | 38.24% | Currently ~20%, conservative is fine |

### Required changes to `/lib/golden-dashboard.ts`

#### 1. Update the Assumptions interface

Add new conversion rate fields:

```typescript
interface Assumptions {
  // ... existing fields ...
  
  // ADD these new fields:
  mqlToSql: number;      // default: 0.38 (38%)
  sqlToOpp: number;      // default: 0.43 (43%)
  
  // RENAME if exists:
  // mqlToOpp → remove or deprecate (this was conflating two steps)
}
```

#### 2. Update baseline assumptions

```typescript
const baselineAssumptions: Assumptions = {
  // ... existing ...
  mqlToSql: 0.38,        // 38% of MQLs accepted by sales as SQLs
  sqlToOpp: 0.43,        // 43% of SQLs convert to real opportunities
  oppToWon: 0.20,        // 20% win rate (keep conservative)
};
```

#### 3. Add SQL stage to the model

Update `computeModel()` function:

```typescript
function computeModel(assumptions: Assumptions) {
  // ... existing calculations for impressions, clicks, leads, mqls ...
  
  // ADD SQL calculation:
  const sqls = Math.round(mqls * assumptions.mqlToSql);
  const costPerSql = totalSpend / sqls;
  
  // UPDATE Opportunity calculation:
  const opportunities = Math.round(sqls * assumptions.sqlToOpp);  // was: mqls * mqlToOpp
  const costPerOpp = totalSpend / opportunities;
  
  // Closed-Won stays the same logic:
  const closedWon = Math.round(opportunities * assumptions.oppToWon);
  const cac = totalSpend / closedWon;
  
  return {
    // ... existing metrics ...
    sqls,
    costPerSql,
    mqlToSqlRate: assumptions.mqlToSql,
    sqlToOppRate: assumptions.sqlToOpp,
    // ... rest of metrics ...
  };
}
```

#### 4. Add SQL to metric metadata

Add tooltip content, drawer content, benchmarks, and health thresholds for the SQL stage matching the pattern of existing stages.

#### 5. Validation check

With $100K spend and these rates, the model should produce:
- ~35K clicks
- ~2.3K leads  
- ~900 MQLs
- **~340 SQLs** (new)
- **~145 Opportunities** (corrected down from 225)
- ~29 Closed-Won (may differ from current 10 based on rate adjustments)

If the numbers are wildly different, check the cascade math.

---

## Part 2: Restructure layout to 4-row serpentine flow

### New desktop layout (≥1024px)

```
                         ROW 1 (centered, single card)
                        ┌─────────────────┐
                        │  Total Ad Spend │
                        │     $100.0K     │
                        └────────┬────────┘
                                 │
             ╭───────────────────┴───────────────────╮
             ▼                   ▼                   ▼

                    ROW 2 (3 cards, left-to-right)
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │ Impressions │───▶│   Clicks    │───▶│    Leads    │
    │    1.7M     │    │   35.0K     │    │    2.3K     │
    └─────────────┘    └─────────────┘    └─────┬───────┘
                                                │
                            S-CURVE ────────────╯
                            (exits right → curves under → enters left)
                                                │
                    ROW 3 (Lead Scoring zone)   ▼
    ┌──────────────────────────────────────────────────────────┐
    │  LEAD SCORING (clickable title → /lead-scoring)          │
    │                                                          │
    │  ┌───────────┐       ┌────────────┐       ┌──────────┐  │
    │  │    Fit    │   +   │ Engagement │   →   │   MQLs   │  │
    │  │  (0-50)   │       │   (0-50)   │       │   901    │  │
    │  │   info    │       │    info    │       │ computed │  │
    │  └───────────┘       └────────────┘       └────┬─────┘  │
    │                                                │        │
    └────────────────────────────────────────────────┼────────┘
                                                     │
                            S-CURVE ─────────────────╯
                            (exits right → curves under → enters left)
                                                     │
                    ROW 4 (3 cards, left-to-right)   ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │     SQL     │───▶│Opportunities│───▶│ Closed-Won  │
    │(Sales Mtg)  │    │ (Pipeline)  │    │     ~29     │
    │    ~340     │    │    ~145     │    │             │
    └─────────────┘    └─────────────┘    └─────────────┘


                    FUNNEL SUMMARY (bottom, full width)
    ┌──────────────────────────────────────────────────────────┐
    │   $100.0K       ~29         ~$3.4K        0.0008%        │
    │   Total Spend   Deals Won   CAC           Full-Funnel    │
    └──────────────────────────────────────────────────────────┘
```

### Layout implementation in DashboardFlow.tsx

```tsx
<div className="flex flex-col items-center gap-8">
  
  {/* ROW 1: Total Ad Spend - centered */}
  <div className="flex justify-center">
    <MetricCard metric="totalSpend" ... />
  </div>
  
  {/* Connector: Spend → Row 2 (simple branching lines) */}
  <BranchConnector from="spend" to={["impressions", "clicks", "leads"]} />
  
  {/* ROW 2: Impressions → Clicks → Leads */}
  <div className="flex justify-center gap-4">
    <MetricCard metric="impressions" ... />
    <HorizontalConnector rate={ctr} />
    <MetricCard metric="clicks" ... />
    <HorizontalConnector rate={clickToLead} />
    <MetricCard metric="leads" ... />
  </div>
  
  {/* S-Curve Connector: Leads → Lead Scoring row */}
  <SerpentineConnector 
    fromPosition="right" 
    toPosition="left" 
    rate={leadToMql} 
    direction="rightToLeft"
  />
  
  {/* ROW 3: Lead Scoring Container */}
  <LeadScoringContainer mqls={model.mqls} mqlMetric={...} />
  
  {/* S-Curve Connector: MQLs → Sales row */}
  <SerpentineConnector 
    fromPosition="right" 
    toPosition="left" 
    rate={mqlToSql} 
    direction="rightToLeft"
  />
  
  {/* ROW 4: SQL → Opportunities → Closed-Won */}
  <div className="flex justify-center gap-4">
    <MetricCard metric="sqls" ... />
    <HorizontalConnector rate={sqlToOpp} />
    <MetricCard metric="opportunities" ... />
    <HorizontalConnector rate={oppToWon} />
    <MetricCard metric="closedWon" ... />
  </div>
  
  {/* Funnel Summary */}
  <FunnelSummary ... />
  
</div>
```

---

## Part 3: S-curve (serpentine) connector component

Create a new component: `/components/golden-dashboard/SerpentineConnector.tsx`

### Visual behavior

The connector creates a smooth S-curve that:
1. Exits the source row from the **right edge** of the rightmost card
2. Curves **downward** in a smooth arc
3. Sweeps **horizontally to the left**, passing under/between rows
4. Curves **upward** slightly and enters the target row from the **left edge** of the leftmost card

The shape resembles a backwards "S" rotated 90° clockwise (or a "∫" integral symbol laid on its side).

### SVG implementation

```tsx
interface SerpentineConnectorProps {
  rate: number;           // Conversion rate to display (0-1)
  rateLabel: string;      // e.g., "Lead→MQL"
  className?: string;
}

export function SerpentineConnector({ rate, rateLabel, className }: SerpentineConnectorProps) {
  // These values should be calculated based on actual card positions
  // or use relative/percentage-based positioning
  
  const pathD = `
    M 0 0
    C 40 0, 60 30, 60 50
    L 60 70
    C 60 90, 40 120, 0 120
  `;
  
  return (
    <div className={cn("relative w-full h-24", className)}>
      <svg 
        className="absolute inset-0 w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* The S-curve path */}
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="6 4"
          className="text-electric dark:text-electric/70"
        />
        
        {/* Animated flow dots (optional) */}
        <circle r={3} className="text-electric fill-current">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={pathD}
          />
        </circle>
      </svg>
      
      {/* Conversion rate pill - positioned at curve midpoint */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <ConversionPill rate={rate} label={rateLabel} />
      </div>
    </div>
  );
}
```

### Conversion pill styling

Match existing pill styling:
- Rounded full (pill shape)
- Small text (text-xs)
- Background varies by health status:
  - Healthy (>20%): green tint
  - Moderate (10-20%): yellow/amber tint  
  - Needs attention (<10%): red tint
- Shows percentage and label: "38.0% MQL→SQL"

### Path calculation notes

The actual path coordinates need to be responsive. Options:
1. **Fixed pixel values** that work at desktop width, simplified on mobile
2. **ViewBox-based** SVG that scales proportionally
3. **JavaScript-calculated** paths based on actual DOM element positions (most accurate but complex)

Recommend starting with option 2 (viewBox) for maintainability.

---

## Part 4: Lead Scoring container (Row 3)

Create a new component: `/components/golden-dashboard/LeadScoringContainer.tsx`

### Purpose

This row is visually distinct—it represents the "handoff zone" between marketing and sales where lead scoring happens. It's **informational** (explaining that scoring occurs) while also showing the computed MQL output.

### Component structure

```tsx
interface LeadScoringContainerProps {
  mqls: number;
  mqlMetricData: MetricData;  // For the MQL card
  onMqlClick: () => void;     // Opens drawer
}

export function LeadScoringContainer({ mqls, mqlMetricData, onMqlClick }: LeadScoringContainerProps) {
  return (
    <div className={cn(
      "w-full max-w-4xl rounded-xl p-6",
      "bg-electric/5 border border-electric/20",      // Light mode
      "dark:bg-electric/10 dark:border-electric/30"   // Dark mode
    )}>
      
      {/* Section title - linked */}
      <Link 
        href="/lead-scoring"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-electric hover:underline mb-4"
      >
        Lead Scoring
        <ExternalLink className="w-3 h-3" />
      </Link>
      
      {/* Content row */}
      <div className="flex items-center justify-center gap-4">
        
        {/* Fit card - informational */}
        <InfoCard 
          title="Fit"
          subtitle="0-50 pts"
          description="Title, company size, region, industry"
          icon={<TargetIcon />}
        />
        
        {/* Plus sign */}
        <span className="text-2xl text-muted-foreground">+</span>
        
        {/* Engagement card - informational */}
        <InfoCard
          title="Engagement" 
          subtitle="0-50 pts"
          description="Email opens, content downloads, webinar attendance"
          icon={<ActivityIcon />}
        />
        
        {/* Arrow */}
        <ArrowRight className="w-6 h-6 text-muted-foreground" />
        
        {/* MQL card - computed, interactive */}
        <MetricCard
          metric="mqls"
          value={mqls}
          data={mqlMetricData}
          onClick={onMqlClick}
          variant="highlighted"  // Slightly emphasized styling
        />
        
      </div>
      
      {/* Threshold note */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Leads scoring 75+ points qualify as MQLs
      </p>
      
    </div>
  );
}
```

### InfoCard subcomponent

A smaller, muted card for the Fit and Engagement boxes:

```tsx
interface InfoCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ReactNode;
}

function InfoCard({ title, subtitle, description, icon }: InfoCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center p-4 rounded-lg w-32",
      "bg-background/50 border border-border/50"
    )}>
      {icon && <div className="text-muted-foreground mb-2">{icon}</div>}
      <span className="font-medium text-sm">{title}</span>
      <span className="text-xs text-muted-foreground">{subtitle}</span>
      {/* Tooltip on hover with description */}
    </div>
  );
}
```

### Styling notes

- Container background: subtle Electric blue wash (`bg-electric/5` or 5-8% opacity)
- Border: 1px Electric blue at 20-30% opacity
- Rounded corners: `rounded-xl` (12px)
- Padding: 24px (`p-6`)
- The whole container should feel like a "zone" or "phase" distinct from the metric cards

---

## Part 5: Row 4 card updates

### Card 1: SQL (Sales Meeting)

Update the metric card configuration:

```typescript
// In golden-dashboard.ts metadata
sql: {
  id: 'sql',
  label: 'SQL',
  sublabel: '(Sales Meeting)',
  description: 'Sales Qualified Leads - MQLs accepted by sales for discovery calls',
  formula: 'MQLs × MQL-to-SQL Rate',
  valueKey: 'sqls',
  costKey: 'costPerSql',
  rateKey: 'mqlToSqlRate',
  rateLabel: 'MQL→SQL',
  category: 'sales',  // Uses copper accent color
  healthThresholds: {
    healthy: 0.35,    // >35% is good
    moderate: 0.25,   // 25-35% is moderate
    // <25% needs attention
  },
  benchmarks: {
    low: 0.25,
    typical: 0.38,
    high: 0.51,
    source: 'FirstPageSage B2B SaaS Benchmarks'
  },
  // ... drawer content, levers, failure modes, etc.
}
```

### Card 2: Opportunities (Pipeline)

```typescript
opportunities: {
  id: 'opportunities',
  label: 'Opportunities',
  sublabel: '(Pipeline)',
  description: 'Qualified deals with estimated value in sales pipeline',
  formula: 'SQLs × SQL-to-Opp Rate',
  valueKey: 'opportunities',
  costKey: 'costPerOpp',
  rateKey: 'sqlToOppRate',
  rateLabel: 'SQL→Opp',
  category: 'sales',
  // Consider adding pipeline value: opportunities × ADS
  // ... rest of metadata
}
```

### Card 3: Closed-Won

Keep mostly as-is, but verify it's receiving the correct `opportunities` count in its formula (not the old conflated number).

---

## Part 6: Calculator mode (FunnelControls) updates

### Add new sliders

```tsx
// In FunnelControls.tsx

// ADD these new controls:
<SliderControl
  label="MQL → SQL Rate"
  value={assumptions.mqlToSql}
  onChange={(v) => updateAssumption('mqlToSql', v)}
  min={0.1}
  max={0.6}
  step={0.01}
  format="percent"  // Shows as "38%"
/>

<SliderControl
  label="SQL → Opp Rate"  
  value={assumptions.sqlToOpp}
  onChange={(v) => updateAssumption('sqlToOpp', v)}
  min={0.2}
  max={0.7}
  step={0.01}
  format="percent"
/>
```

### Remove deprecated controls

If there's an "MQL → Opp" slider that conflated the two stages, remove it or replace it with the two new sliders above.

### Update preset scenarios

```typescript
const presets = {
  earlyStageSaas: {
    // ... existing ...
    mqlToSql: 0.30,   // Lower - less sales capacity
    sqlToOpp: 0.35,   // Lower - still refining ICP
  },
  midMarket: {
    // ... existing ...
    mqlToSql: 0.38,   // Benchmark average
    sqlToOpp: 0.43,   // Benchmark average
  },
  enterprise: {
    // ... existing ...
    mqlToSql: 0.45,   // Higher - better targeting
    sqlToOpp: 0.50,   // Higher - mature sales process
  },
};
```

---

## Part 7: Responsive behavior

### Tablet (768px - 1023px)

- Row 1: Centered single card (same as desktop)
- Row 2: 3 cards in row, reduce card width slightly
- Row 3: Fit and Engagement stack vertically on left, MQLs on right
- Row 4: 3 cards in row
- S-curves: Simplify to angled lines (45° connectors) rather than smooth curves

```tsx
// Responsive classes example
<div className={cn(
  "flex gap-4",
  "flex-row",           // Desktop: horizontal
  "md:flex-row",        // Tablet: still horizontal but tighter
  "sm:flex-col"         // Mobile: vertical stack
)}>
```

### Mobile (<768px)

- All cards stack vertically in a single column
- S-curves become simple vertical lines with small arrows
- Lead Scoring container:
  - Full width
  - Fit and Engagement cards stack above MQL
  - Consider making it collapsible (accordion) with just "Lead Scoring → MQLs: 901" visible when collapsed
- Row labels become more prominent to maintain context

```tsx
// Mobile: simplified vertical flow
<div className="flex flex-col items-center gap-4 sm:hidden">
  <MetricCard metric="spend" />
  <VerticalConnector />
  <MetricCard metric="impressions" />
  <VerticalConnector rate={ctr} />
  <MetricCard metric="clicks" />
  {/* ... etc ... */}
</div>
```

### Breakpoint summary

| Breakpoint | Layout | Connectors |
|------------|--------|------------|
| ≥1024px (lg) | 4-row serpentine, full S-curves | SVG bezier paths |
| 768-1023px (md) | 4-row, tighter spacing | Angled lines |
| <768px (sm) | Vertical stack | Simple vertical lines |

---

## Part 8: Preserve existing functionality

**Critical:** These features must continue working after the refactor:

- [ ] Hover tooltips on all metric cards
- [ ] Click-to-open drawers with deep content
- [ ] Delta pills showing % change vs baseline
- [ ] Health indicator dots (green/yellow/red)
- [ ] Calculator mode expand/collapse
- [ ] Preset scenario buttons
- [ ] Real-time computation on slider changes
- [ ] Benchmark visualization toggle
- [ ] Insight narrative panel with bottleneck detection
- [ ] Dark mode / light mode theming
- [ ] Keyboard accessibility (tab navigation, enter to activate)

---

## Implementation order

Execute in this sequence to minimize risk:

### Phase 1: Data model (do first, test in isolation)
1. Update `/lib/golden-dashboard.ts` with SQL stage and new conversion rates
2. Add console.log statements to verify math cascade
3. Test that computeModel() produces sensible numbers
4. **Checkpoint:** Numbers should flow MQL→SQL→Opp→Won correctly

### Phase 2: Layout structure (keep existing connectors temporarily)
1. Restructure `DashboardFlow.tsx` to 4-row layout
2. Use placeholder divs for connector positions
3. Get Row 3 container in place (even if unstyled)
4. **Checkpoint:** Cards appear in correct positions, old connectors may look broken

### Phase 3: Lead Scoring container
1. Create `LeadScoringContainer.tsx`
2. Add InfoCard subcomponent for Fit/Engagement
3. Style the container with distinct background
4. Wire up MQL card with existing interactivity
5. **Checkpoint:** Row 3 looks correct, link works (even if target page 404s)

### Phase 4: Serpentine connectors
1. Create `SerpentineConnector.tsx`
2. Start with static SVG paths
3. Position conversion rate pills
4. Add animation if time permits
5. **Checkpoint:** Visual flow reads correctly top-to-bottom

### Phase 5: Calculator controls
1. Add mqlToSql and sqlToOpp sliders
2. Remove deprecated mqlToOpp control
3. Update preset values
4. Test that changes cascade correctly
5. **Checkpoint:** All sliders work, numbers update live

### Phase 6: Responsive polish
1. Test tablet breakpoint, adjust spacing
2. Test mobile breakpoint, simplify connectors
3. Ensure touch targets are adequate (44px minimum)
4. **Checkpoint:** Works on all device sizes

### Phase 7: QA and edge cases
1. Test all hover/click interactions
2. Verify dark mode styling
3. Check delta tracking still works
4. Test benchmark visualization
5. Run Lighthouse accessibility audit
6. **Checkpoint:** Feature parity with current implementation

---

## Files to create/modify

### Modify existing:
- `/lib/golden-dashboard.ts` — Data model, types, computeModel, metadata
- `/components/golden-dashboard/DashboardFlow.tsx` — Main layout restructure
- `/components/golden-dashboard/FunnelControls.tsx` — New sliders
- `/components/golden-dashboard/MetricCard.tsx` — May need "info" variant
- `/components/golden-dashboard/StageConnector.tsx` — May repurpose or deprecate

### Create new:
- `/components/golden-dashboard/SerpentineConnector.tsx` — S-curve SVG component
- `/components/golden-dashboard/LeadScoringContainer.tsx` — Row 3 wrapper
- `/components/golden-dashboard/InfoCard.tsx` — Small informational cards (optional, could be inline)

---

## Success criteria

- [ ] Funnel math is correct: MQLs → SQLs → Opps → Won with distinct conversion rates
- [ ] $100K spend produces ~25-35 closed deals (sanity check)
- [ ] 4-row vertical layout renders correctly on desktop
- [ ] S-curve connectors visually connect rows with conversion rate pills at midpoint
- [ ] Row 3 Lead Scoring container has distinct styling and linked title
- [ ] All existing interactivity preserved (tooltips, drawers, calculator, benchmarks)
- [ ] Responsive breakpoints work correctly (tablet, mobile)
- [ ] Dark mode and light mode both look correct
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Lighthouse accessibility score ≥90

---

## Reference: Current conversion rates in model

For comparison, here's what the current model appears to use (reverse-engineered from screenshots):

| Metric | Current Value | Note |
|--------|---------------|------|
| Spend | $100,000 | Baseline |
| CPM | $60 | |
| Impressions | 1.7M | Spend / CPM × 1000 |
| CTR | 2.1% | |
| Clicks | 35K | |
| Click→Lead | 6.6% | |
| Leads | 2.3K | |
| Lead→MQL | 39% | |
| MQLs | 901 | |
| MQL→Opp | 25% | ← This conflates MQL→SQL→Opp |
| Opportunities | 225 | ← This seems high if it's post-SQL |
| Opp→Meeting | 22% | |
| Sales Meetings | 50 | ← This is actually your SQL count |
| Win Rate | 20% | |
| Closed-Won | 10 | |

The refactored model should clarify that "Sales Meetings" = SQLs, and Opportunities come *after* SQLs, not before.

---

## Questions for clarification

If anything is unclear during implementation, ask before proceeding:

1. Should the S-curve animation be enabled by default, or behind a "reduce motion" preference?
2. For the Lead Scoring link, what should happen if user clicks it before that page exists? (404, or stay on current page with toast?)
3. Should the Funnel Summary at the bottom update to show SQL count as a new metric?
4. Any preference on the exact S-curve shape (tighter curves vs wider sweeping curves)?

---

*End of prompt. Good luck, and ping me if Cursor gets confused.*
