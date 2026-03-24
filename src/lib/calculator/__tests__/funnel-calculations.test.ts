import { describe, it, expect } from 'vitest'
import {
  calculateBidirectionalFunnel,
  calculateFunnel,
  formatNumber,
  formatCurrency,
  formatCurrencyFull,
  formatPercent,
  formatCompactNumber,
  getConversionRate,
  validateInputs,
  getScaleLabel,
  calculateCAC,
  generateOptimizationSuggestions,
} from '../funnel-calculations'
import type { CalculatorState, ConversionRates, FunnelResult } from '../types'

// ============ Helpers ============

const defaultRates: ConversionRates = {
  visitorToLead: 0.03,
  leadToMQL: 0.25,
  mqlToSQL: 0.3,
  sqlToOpportunity: 0.5,
  opportunityToClose: 0.25,
}

function makeForwardConfig(overrides?: Partial<CalculatorState>): CalculatorState {
  return {
    selectedIndustry: 'SaaS',
    customerType: 'smb',
    channelMix: 'hybrid',
    direction: 'forward',
    budget: 100_000,
    revenueGoal: null,
    avgDealSize: 10_000,
    conversionRates: defaultRates,
    useCustomRates: false,
    ...overrides,
  }
}

function makeReverseConfig(overrides?: Partial<CalculatorState>): CalculatorState {
  return {
    selectedIndustry: 'SaaS',
    customerType: 'smb',
    channelMix: 'hybrid',
    direction: 'reverse',
    budget: null,
    revenueGoal: 1_000_000,
    avgDealSize: 10_000,
    conversionRates: defaultRates,
    useCustomRates: false,
    ...overrides,
  }
}

// ============ calculateBidirectionalFunnel ============

describe('calculateBidirectionalFunnel', () => {
  describe('forward calculation (budget → revenue)', () => {
    it('produces positive funnel metrics from a valid budget', () => {
      const result = calculateBidirectionalFunnel(makeForwardConfig())
      expect(result.webVisitors).toBeGreaterThan(0)
      expect(result.leads).toBeGreaterThan(0)
      expect(result.mqls).toBeGreaterThan(0)
      expect(result.closedWon).toBeGreaterThanOrEqual(0)
      expect(result.totalSpend).toBe(100_000)
      expect(result.revenue).toBeGreaterThanOrEqual(0)
    })

    it('calculates revenue as closedWon * avgDealSize', () => {
      const result = calculateBidirectionalFunnel(makeForwardConfig())
      expect(result.revenue).toBe(result.closedWon * 10_000)
    })

    it('calculates monthly values as ceil(annual / 12)', () => {
      const result = calculateBidirectionalFunnel(makeForwardConfig())
      expect(result.monthlyVisitors).toBe(Math.ceil(result.webVisitors / 12))
      expect(result.monthlyLeads).toBe(Math.ceil(result.leads / 12))
      expect(result.monthlyMQLs).toBe(Math.ceil(result.mqls / 12))
      expect(result.monthlySQOs).toBe(Math.ceil(result.sqos / 12))
      expect(result.monthlyOpportunities).toBe(Math.ceil(result.opportunities / 12))
      expect(result.monthlyClosedWon).toBe(Math.ceil(result.closedWon / 12))
    })

    it('calculates ROI as revenue / spend', () => {
      const result = calculateBidirectionalFunnel(makeForwardConfig())
      if (result.totalSpend > 0) {
        expect(result.roi).toBeCloseTo(result.revenue / result.totalSpend, 5)
      }
    })

    it('includes gap analysis when revenueGoal is also set', () => {
      const result = calculateBidirectionalFunnel(
        makeForwardConfig({ revenueGoal: 5_000_000 })
      )
      expect(result.gap).toBeDefined()
      expect(result.gap!.revenueGap).toBe(5_000_000 - result.revenue)
    })

    it('has no gap when revenueGoal is null', () => {
      const result = calculateBidirectionalFunnel(makeForwardConfig())
      expect(result.gap).toBeUndefined()
    })

    it('handles zero budget gracefully', () => {
      const result = calculateBidirectionalFunnel(makeForwardConfig({ budget: 0 }))
      expect(result.webVisitors).toBe(0)
      expect(result.leads).toBe(0)
      expect(result.revenue).toBe(0)
    })

    it('handles very large budget without crashing', () => {
      const result = calculateBidirectionalFunnel(
        makeForwardConfig({ budget: 1_000_000_000 })
      )
      expect(result.webVisitors).toBeGreaterThan(0)
      expect(Number.isFinite(result.revenue)).toBe(true)
    })
  })

  describe('reverse calculation (revenue → budget)', () => {
    it('produces positive funnel metrics from a valid revenue goal', () => {
      const result = calculateBidirectionalFunnel(makeReverseConfig())
      expect(result.webVisitors).toBeGreaterThan(0)
      expect(result.leads).toBeGreaterThan(0)
      expect(result.closedWon).toBeGreaterThan(0)
      expect(result.totalSpend).toBeGreaterThan(0)
      expect(result.revenue).toBe(1_000_000)
    })

    it('calculates closedWon as ceil(revenueGoal / avgDealSize)', () => {
      const result = calculateBidirectionalFunnel(makeReverseConfig())
      expect(result.closedWon).toBe(Math.ceil(1_000_000 / 10_000))
    })

    it('includes gap analysis when budget is also set', () => {
      const result = calculateBidirectionalFunnel(
        makeReverseConfig({ budget: 50_000 })
      )
      expect(result.gap).toBeDefined()
      expect(result.gap!.budgetGap).toBe(result.totalSpend - 50_000)
    })

    it('handles zero revenue goal gracefully', () => {
      const result = calculateBidirectionalFunnel(
        makeReverseConfig({ revenueGoal: 0 })
      )
      expect(result.closedWon).toBe(0)
      expect(result.totalSpend).toBe(0)
    })

    it('handles very large revenue goal', () => {
      const result = calculateBidirectionalFunnel(
        makeReverseConfig({ revenueGoal: 1_000_000_000 })
      )
      expect(result.closedWon).toBeGreaterThan(0)
      expect(Number.isFinite(result.totalSpend)).toBe(true)
    })
  })

  describe('fallback to empty result', () => {
    it('returns empty result when direction is reverse but revenueGoal is null', () => {
      const result = calculateBidirectionalFunnel(
        makeReverseConfig({ revenueGoal: null })
      )
      expect(result.webVisitors).toBe(0)
      expect(result.revenue).toBe(0)
      expect(result.totalSpend).toBe(0)
    })
  })

  describe('channel mix affects cost per visitor', () => {
    it('paid-led produces higher spend than product-led for same revenue goal', () => {
      const paid = calculateBidirectionalFunnel(
        makeReverseConfig({ channelMix: 'paid-led' })
      )
      const productLed = calculateBidirectionalFunnel(
        makeReverseConfig({ channelMix: 'product-led' })
      )
      expect(paid.totalSpend).toBeGreaterThan(productLed.totalSpend)
    })
  })
})

// ============ Legacy calculateFunnel ============

describe('calculateFunnel (legacy)', () => {
  it('works backwards from revenue goal to web visitors', () => {
    const result = calculateFunnel(1_000_000, 10_000, defaultRates)
    expect(result.closedWon).toBe(100)
    expect(result.revenue).toBe(1_000_000)
    expect(result.webVisitors).toBeGreaterThan(result.leads)
    expect(result.leads).toBeGreaterThan(result.mqls)
  })

  it('handles avgDealSize of 0 by treating it as 1', () => {
    const result = calculateFunnel(1_000, 0, defaultRates)
    expect(result.closedWon).toBe(1_000)
  })

  it('calculates cost metrics correctly', () => {
    const result = calculateFunnel(500_000, 50_000, defaultRates)
    expect(result.cpl).toBeCloseTo(result.totalSpend / result.leads, 2)
    expect(result.cac).toBeCloseTo(result.totalSpend / result.closedWon, 2)
  })
})

// ============ Formatting Utilities ============

describe('formatNumber', () => {
  it('formats integers with commas', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('formats with decimal places', () => {
    expect(formatNumber(1234.5, 2)).toBe('1,234.50')
  })

  it('formats zero', () => {
    expect(formatNumber(0)).toBe('0')
  })
})

describe('formatCurrency', () => {
  it('formats values under $1M without compact notation', () => {
    expect(formatCurrency(5000)).toBe('$5,000')
  })

  it('formats values at or above $1M with compact notation', () => {
    const result = formatCurrency(1_500_000)
    expect(result).toContain('$')
    expect(result).toContain('M')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0')
  })
})

describe('formatCurrencyFull', () => {
  it('formats large values without compact notation', () => {
    expect(formatCurrencyFull(1_500_000)).toBe('$1,500,000')
  })
})

describe('formatPercent', () => {
  it('converts decimal to percent string', () => {
    expect(formatPercent(0.5)).toBe('50.0%')
  })

  it('respects decimals parameter', () => {
    expect(formatPercent(0.333, 2)).toBe('33.30%')
  })

  it('handles zero', () => {
    expect(formatPercent(0)).toBe('0.0%')
  })

  it('handles values over 1', () => {
    expect(formatPercent(1.5)).toBe('150.0%')
  })
})

describe('formatCompactNumber', () => {
  it('formats millions', () => {
    expect(formatCompactNumber(2_500_000)).toBe('2.5M')
  })

  it('formats thousands', () => {
    expect(formatCompactNumber(45_000)).toBe('45.0K')
  })

  it('formats small numbers as-is', () => {
    expect(formatCompactNumber(999)).toBe('999')
  })
})

// ============ getConversionRate ============

describe('getConversionRate', () => {
  it('returns correct rate for valid stage pairs', () => {
    expect(getConversionRate('webVisitors', 'leads', defaultRates)).toBe(0.03)
    expect(getConversionRate('leads', 'mqls', defaultRates)).toBe(0.25)
    expect(getConversionRate('mqls', 'sqos', defaultRates)).toBe(0.3)
    expect(getConversionRate('sqos', 'opportunities', defaultRates)).toBe(0.5)
    expect(getConversionRate('opportunities', 'closedWon', defaultRates)).toBe(0.25)
  })

  it('returns 0 for unknown stage pair', () => {
    expect(getConversionRate('foo', 'bar', defaultRates)).toBe(0)
  })
})

// ============ validateInputs ============

describe('validateInputs', () => {
  it('returns valid for correct inputs', () => {
    const result = validateInputs(1_000_000, 10_000)
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('rejects revenue goal <= 0', () => {
    const result = validateInputs(0, 10_000)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Revenue goal must be greater than 0')
  })

  it('rejects revenue goal > $1B', () => {
    const result = validateInputs(2_000_000_000, 10_000)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Revenue goal must be less than $1B')
  })

  it('rejects avgDealSize <= 0', () => {
    const result = validateInputs(1_000_000, 0)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Average deal size must be greater than 0')
  })

  it('rejects avgDealSize > revenueGoal', () => {
    const result = validateInputs(1_000, 5_000)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Average deal size cannot exceed revenue goal')
  })

  it('can return multiple errors at once', () => {
    const result = validateInputs(-1, -1)
    expect(result.errors.length).toBeGreaterThanOrEqual(2)
  })
})

// ============ getScaleLabel ============

describe('getScaleLabel', () => {
  it('returns correct labels for all scales', () => {
    expect(getScaleLabel('consumer')).toBe('Consumer')
    expect(getScaleLabel('smb')).toBe('SMB')
    expect(getScaleLabel('middleMarket')).toBe('Mid-Market')
    expect(getScaleLabel('enterprise')).toBe('Enterprise')
  })
})

// ============ calculateCAC ============

describe('calculateCAC', () => {
  it('calculates budget and percentOfGoal', () => {
    const result = calculateCAC(100, 500, 1_000_000)
    expect(result.budget).toBe(50_000)
    expect(result.percentOfGoal).toBe(5)
  })

  it('handles zero deals', () => {
    const result = calculateCAC(0, 500, 1_000_000)
    expect(result.budget).toBe(0)
    expect(result.percentOfGoal).toBe(0)
  })
})

// ============ generateOptimizationSuggestions ============

describe('generateOptimizationSuggestions', () => {
  const benchmarks: Record<keyof ConversionRates, { min: number; avg: number; max: number }> = {
    visitorToLead: { min: 0.01, avg: 0.05, max: 0.10 },
    leadToMQL: { min: 0.10, avg: 0.30, max: 0.50 },
    mqlToSQL: { min: 0.10, avg: 0.40, max: 0.60 },
    sqlToOpportunity: { min: 0.20, avg: 0.60, max: 0.80 },
    opportunityToClose: { min: 0.10, avg: 0.30, max: 0.50 },
  }

  const baseFunnel: FunnelResult = {
    webVisitors: 100_000, leads: 3000, mqls: 750, sqos: 225,
    opportunities: 113, closedWon: 28,
    monthlyVisitors: 8334, monthlyLeads: 250, monthlyMQLs: 63,
    monthlySQOs: 19, monthlyOpportunities: 10, monthlyClosedWon: 3,
    totalSpend: 200_000, costPerVisitor: 2, cpl: 67, cpql: 267,
    cpsql: 889, cpOpp: 1770, cac: 7143,
    revenue: 280_000, roi: 1.4,
  }

  it('returns suggestions for stages below benchmark average', () => {
    const suggestions = generateOptimizationSuggestions(
      defaultRates, benchmarks, baseFunnel, 5000
    )
    expect(suggestions.length).toBeGreaterThan(0)
    suggestions.forEach((s) => {
      expect(s.target).toBeGreaterThan(s.current)
      expect(s.savingsEstimate).toBeGreaterThanOrEqual(0)
    })
  })

  it('returns at most 3 suggestions', () => {
    const suggestions = generateOptimizationSuggestions(
      defaultRates, benchmarks, baseFunnel, 5000
    )
    expect(suggestions.length).toBeLessThanOrEqual(3)
  })

  it('sorted by savingsEstimate descending', () => {
    const suggestions = generateOptimizationSuggestions(
      defaultRates, benchmarks, baseFunnel, 5000
    )
    for (let i = 1; i < suggestions.length; i++) {
      expect(suggestions[i - 1].savingsEstimate).toBeGreaterThanOrEqual(
        suggestions[i].savingsEstimate
      )
    }
  })

  it('suggests channel diversification when CAC > 2x benchmark', () => {
    const suggestions = generateOptimizationSuggestions(
      defaultRates, benchmarks, baseFunnel, 2000
    )
    const channelSuggestion = suggestions.find((s) => s.type === 'add-channel')
    expect(channelSuggestion).toBeDefined()
  })

  it('returns no suggestions when all rates exceed benchmarks', () => {
    const excellentRates: ConversionRates = {
      visitorToLead: 0.10,
      leadToMQL: 0.50,
      mqlToSQL: 0.60,
      sqlToOpportunity: 0.80,
      opportunityToClose: 0.50,
    }
    const suggestions = generateOptimizationSuggestions(
      excellentRates, benchmarks, { ...baseFunnel, cac: 1000 }, 5000
    )
    expect(suggestions.length).toBe(0)
  })
})
