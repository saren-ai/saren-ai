import { describe, it, expect } from 'vitest'
import {
  calculateFitScore,
  calculateEngagementScore,
  determineBuyerState,
  computeScoring,
  formatScore,
  getStateColor,
  factorIdToProfileKey,
  fitScoreFactors,
  engagementActions,
  type BuyerProfile,
  type BuyerState,
} from '../behavioral-scoring'

// ============ Helpers ============

function makeProfile(overrides?: Partial<BuyerProfile>): BuyerProfile {
  return {
    companySize: '1001-5000',
    industry: 'SaaS / Technology',
    role: 'VP / C-level',
    geography: 'North America',
    engagementHistory: [],
    ...overrides,
  }
}

function makeHistory(actionIds: string[]): { actionId: string; timestamp: number }[] {
  return actionIds.map((actionId, i) => ({ actionId, timestamp: Date.now() + i }))
}

// ============ factorIdToProfileKey mapping ============

describe('factorIdToProfileKey', () => {
  it('maps all fit score factor IDs to profile keys', () => {
    fitScoreFactors.forEach((factor) => {
      expect(factorIdToProfileKey[factor.id]).toBeDefined()
    })
  })

  it('contains exactly 4 mappings', () => {
    expect(Object.keys(factorIdToProfileKey)).toHaveLength(4)
  })

  it('maps to correct BuyerProfile keys', () => {
    expect(factorIdToProfileKey['company-size']).toBe('companySize')
    expect(factorIdToProfileKey['industry']).toBe('industry')
    expect(factorIdToProfileKey['role']).toBe('role')
    expect(factorIdToProfileKey['geography']).toBe('geography')
  })
})

// ============ calculateFitScore ============

describe('calculateFitScore', () => {
  it('returns max score for ideal profile', () => {
    const profile = makeProfile()
    const result = calculateFitScore(profile)
    // 15 (company-size 1001-5000) + 10 (SaaS) + 15 (VP/C-level) + 10 (North America) = 50
    expect(result.total).toBe(50)
  })

  it('returns zero for completely non-matching profile', () => {
    const profile = makeProfile({
      companySize: '1-50',
      industry: 'Other',
      role: 'Unknown',
      geography: 'Other',
    })
    const result = calculateFitScore(profile)
    // 0 + 0 + 0 + 5 = 5 (geography "Other" = 5 points)
    expect(result.total).toBe(5)
  })

  it('returns zero for empty strings (no matching criteria)', () => {
    const profile = makeProfile({
      companySize: '',
      industry: '',
      role: '',
      geography: '',
    })
    const result = calculateFitScore(profile)
    expect(result.total).toBe(0)
  })

  it('provides breakdown for each factor', () => {
    const result = calculateFitScore(makeProfile())
    expect(result.breakdown).toHaveLength(4)
    expect(result.breakdown.map((b) => b.factor)).toEqual([
      'Company Size',
      'Industry / Vertical',
      'Job Title / Role',
      'Geographic Market',
    ])
  })

  it('scores mid-tier profile correctly', () => {
    const profile = makeProfile({
      companySize: '201-1000',
      industry: 'Healthcare',
      role: 'Manager',
      geography: 'APAC',
    })
    const result = calculateFitScore(profile)
    // 10 + 7 + 8 + 7 = 32
    expect(result.total).toBe(32)
  })

  it('scores 5000+ company size as 12 (not max)', () => {
    const profile = makeProfile({ companySize: '5000+' })
    const sizeBreakdown = calculateFitScore(profile).breakdown.find(
      (b) => b.factor === 'Company Size'
    )
    expect(sizeBreakdown!.points).toBe(12)
  })
})

// ============ calculateEngagementScore ============

describe('calculateEngagementScore', () => {
  it('returns zero for empty engagement history', () => {
    const result = calculateEngagementScore(makeProfile())
    expect(result.total).toBe(0)
    expect(result.breakdown).toHaveLength(0)
  })

  it('calculates points for a single action', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory(['email-open']),
    })
    const result = calculateEngagementScore(profile)
    expect(result.total).toBe(1)
  })

  it('sums repeatable actions correctly', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory([
        'email-open', 'email-open', 'email-open',
      ]),
    })
    const result = calculateEngagementScore(profile)
    expect(result.total).toBe(3) // 1 * 3
  })

  it('caps engagement score at 50', () => {
    // Generate enough actions to exceed 50
    const actions: string[] = []
    for (let i = 0; i < 20; i++) {
      actions.push('webinar-attended') // 10 points each, repeatable
    }
    const profile = makeProfile({
      engagementHistory: makeHistory(actions),
    })
    const result = calculateEngagementScore(profile)
    expect(result.total).toBe(50)
  })

  it('counts non-repeatable actions only once', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory([
        'demo-requested', 'demo-requested', 'demo-requested',
      ]),
    })
    const result = calculateEngagementScore(profile)
    // demo-requested = 15 points, non-repeatable, counted once
    expect(result.total).toBe(15)
    expect(result.breakdown[0].count).toBe(1)
  })

  it('counts non-repeatable pricing-viewed only once', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory([
        'pricing-viewed', 'pricing-viewed',
      ]),
    })
    const result = calculateEngagementScore(profile)
    expect(result.total).toBe(8)
  })

  it('counts non-repeatable contact-submitted only once', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory([
        'contact-submitted', 'contact-submitted', 'contact-submitted',
      ]),
    })
    const result = calculateEngagementScore(profile)
    expect(result.total).toBe(12)
    expect(result.breakdown[0].count).toBe(1)
  })

  it('handles mixed repeatable and non-repeatable actions', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory([
        'email-click', 'email-click',  // 3 * 2 = 6
        'demo-requested',              // 15 * 1 = 15
      ]),
    })
    const result = calculateEngagementScore(profile)
    expect(result.total).toBe(21)
  })

  it('ignores unknown action IDs', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory(['nonexistent-action']),
    })
    const result = calculateEngagementScore(profile)
    expect(result.total).toBe(0)
  })
})

// ============ determineBuyerState ============

describe('determineBuyerState', () => {
  it('returns unknown-unknown when no identity', () => {
    expect(determineBuyerState(50, 30, false)).toBe('unknown-unknown')
  })

  it('returns known-unknown when identity but zero engagement', () => {
    expect(determineBuyerState(30, 0, true)).toBe('known-unknown')
  })

  it('returns known-lead when total < 60', () => {
    expect(determineBuyerState(30, 10, true)).toBe('known-lead')
  })

  it('returns mql when total >= 60 and < 75', () => {
    expect(determineBuyerState(40, 20, true)).toBe('mql')
  })

  it('returns sql when total >= 75', () => {
    expect(determineBuyerState(50, 25, true)).toBe('sql')
  })

  it('returns mql at exact boundary of 60', () => {
    expect(determineBuyerState(40, 20, true)).toBe('mql')
  })

  it('returns sql at exact boundary of 75', () => {
    expect(determineBuyerState(50, 25, true)).toBe('sql')
  })

  it('returns known-lead at 59', () => {
    expect(determineBuyerState(30, 29, true)).toBe('known-lead')
  })

  it('prioritizes no-identity over high scores', () => {
    expect(determineBuyerState(50, 50, false)).toBe('unknown-unknown')
  })
})

// ============ computeScoring (end-to-end) ============

describe('computeScoring', () => {
  it('returns full scoring result for ideal profile with engagement', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory([
        'webinar-attended',
        'pricing-viewed',
        'demo-requested',
      ]),
    })
    const result = computeScoring(profile)

    expect(result.fitScore).toBe(50)
    expect(result.engagementScore).toBe(33) // 10 + 8 + 15
    expect(result.totalScore).toBe(83)
    expect(result.buyerState).toBe('sql')
    expect(result.fitBreakdown).toHaveLength(4)
    expect(result.engagementBreakdown.length).toBeGreaterThan(0)
    expect(result.threshold.mqlThreshold).toBe(60)
    expect(result.threshold.sqlThreshold).toBe(75)
    expect(result.threshold.toMQL).toBe(0)
    expect(result.threshold.toSQL).toBe(0)
  })

  it('identifies as unknown-unknown when profile fields are empty', () => {
    const profile = makeProfile({
      companySize: '',
      industry: '',
      role: '',
      geography: '',
    })
    const result = computeScoring(profile)
    expect(result.buyerState).toBe('unknown-unknown')
  })

  it('calculates threshold distances correctly', () => {
    const profile = makeProfile({
      companySize: '1-50',
      industry: 'Other',
      role: 'Unknown',
      geography: 'Other',
      engagementHistory: makeHistory(['email-open']),
    })
    const result = computeScoring(profile)
    // fitScore = 5, engagementScore = 1, total = 6
    expect(result.threshold.toMQL).toBe(54) // 60 - 6
    expect(result.threshold.toSQL).toBe(69) // 75 - 6
  })

  it('toMQL and toSQL are zero when score exceeds thresholds', () => {
    const profile = makeProfile({
      engagementHistory: makeHistory([
        'demo-requested', 'webinar-attended', 'webinar-attended', 'webinar-attended',
      ]),
    })
    const result = computeScoring(profile)
    expect(result.threshold.toMQL).toBe(0)
    expect(result.threshold.toSQL).toBe(0)
  })

  it('returns known-unknown for complete profile with no engagement', () => {
    const result = computeScoring(makeProfile())
    expect(result.buyerState).toBe('known-unknown')
    expect(result.engagementScore).toBe(0)
  })
})

// ============ Utility functions ============

describe('formatScore', () => {
  it('converts number to string', () => {
    expect(formatScore(42)).toBe('42')
    expect(formatScore(0)).toBe('0')
    expect(formatScore(100)).toBe('100')
  })
})

describe('getStateColor', () => {
  it('returns correct color for each state', () => {
    const expected: Record<BuyerState, string> = {
      'unknown-unknown': 'slate',
      'known-unknown': 'electric',
      'known-lead': 'copper',
      'mql': 'amber-500',
      'sql': 'ember',
    }
    for (const [state, color] of Object.entries(expected)) {
      expect(getStateColor(state as BuyerState)).toBe(color)
    }
  })
})

// ============ Data integrity checks ============

describe('engagementActions data', () => {
  it('has unique IDs', () => {
    const ids = engagementActions.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all have positive points', () => {
    engagementActions.forEach((a) => {
      expect(a.points).toBeGreaterThan(0)
    })
  })

  it('non-repeatable actions are all high-intent', () => {
    const nonRepeatable = engagementActions.filter((a) => !a.repeatable)
    nonRepeatable.forEach((a) => {
      expect(a.category).toBe('high')
    })
  })
})

describe('fitScoreFactors data', () => {
  it('max possible fit score is 50', () => {
    const maxScore = fitScoreFactors.reduce((sum, f) => sum + f.weight, 0)
    expect(maxScore).toBe(50)
  })

  it('each factor has at least one criterion', () => {
    fitScoreFactors.forEach((f) => {
      expect(f.criteria.length).toBeGreaterThan(0)
    })
  })

  it('no criterion exceeds its factor weight', () => {
    fitScoreFactors.forEach((f) => {
      f.criteria.forEach((c) => {
        expect(c.points).toBeLessThanOrEqual(f.weight)
      })
    })
  })
})
