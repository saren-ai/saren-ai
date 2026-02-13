export interface ComparisonRow {
    category: string;
    oldWorld: string[];
    aiNative: string[];
}

export interface ComparisonTableData {
    id: string;
    title: string;
    description: string;
    rows: ComparisonRow[];
}

export const COMPARISON_TABLES: Record<string, ComparisonTableData> = {
    'lead-scoring': {
        id: 'lead-scoring',
        title: 'Lead Scoring Evolution',
        description: 'How AI transforms lead qualification from guesswork to prediction',
        rows: [
            {
                category: 'Methodology',
                oldWorld: [
                    'Manual rules based on job title and company size',
                    'Updated quarterly by marketing ops',
                    'Same scoring for all industries'
                ],
                aiNative: [
                    'AI scores based on behavioral signals in real-time',
                    'Adapts continuously as patterns change',
                    'Industry-specific models trained on your data'
                ]
            },
            {
                category: 'Accuracy',
                oldWorld: [
                    'Misses 60% of high-intent buyers',
                    '40% of "qualified" leads are false positives',
                    'No predictive capability'
                ],
                aiNative: [
                    'Predicts conversion likelihood with 85% accuracy',
                    'False positive rate under 10%',
                    'Forecasts deal size and close probability'
                ]
            },
            {
                category: 'Speed',
                oldWorld: [
                    'Leads scored in batches (daily or weekly)',
                    'High-intent buyers wait in queue',
                    'Manual review bottlenecks'
                ],
                aiNative: [
                    'Scores updated every time lead engages',
                    'Hot leads routed to sales within minutes',
                    'Automated routing, zero manual review'
                ]
            },
            {
                category: 'Maintenance',
                oldWorld: [
                    'Requires dedicated marketing ops analyst',
                    'Rules break when market shifts',
                    'Cannot handle multi-touch attribution'
                ],
                aiNative: [
                    'Self-optimizing models require minimal oversight',
                    'Automatically adapts to market changes',
                    'Native multi-touch attribution built in'
                ]
            }
        ]
    },

    'attribution': {
        id: 'attribution',
        title: 'Attribution Evolution',
        description: 'From backward-looking reports to predictive analytics',
        rows: [
            {
                category: 'Reporting Speed',
                oldWorld: [
                    'Takes 2-3 weeks to generate reports',
                    'Data pulled manually from multiple tools',
                    'Snapshot in time, outdated on arrival'
                ],
                aiNative: [
                    'Real-time dashboards update automatically',
                    'All data sources integrated',
                    'Live view of current performance'
                ]
            },
            {
                category: 'Insights',
                oldWorld: [
                    'Reports what happened (backward-looking)',
                    'Shows correlation, not causation',
                    'No predictive capability'
                ],
                aiNative: [
                    'Predicts what will work (forward-looking)',
                    'Identifies causal relationships',
                    'Recommends optimal channel mix'
                ]
            },
            {
                category: 'Granularity',
                oldWorld: [
                    'Channel-level only (LinkedIn, Google, etc.)',
                    'Cannot track multi-touch journeys',
                    'Misses 70% of touchpoints'
                ],
                aiNative: [
                    'Touchpoint-level (specific ad, email, page)',
                    'Full journey mapping across all channels',
                    'Captures 95%+ of touchpoints'
                ]
            }
        ]
    },

    'campaigns': {
        id: 'campaigns',
        title: 'Campaign Optimization',
        description: 'How AI turns static campaigns into self-optimizing systems',
        rows: [
            {
                category: 'Optimization Cycle',
                oldWorld: [
                    'Humans A/B test manually',
                    'Takes 4-6 weeks to see statistically significant results',
                    'Optimization freezes between campaign cycles'
                ],
                aiNative: [
                    'AI tests hundreds of variants simultaneously',
                    'Statistical significance in days, not weeks',
                    'Optimizes 24/7/365, never stops'
                ]
            },
            {
                category: 'Budget Allocation',
                oldWorld: [
                    'Set monthly budgets per channel',
                    'Reallocation requires manual approval',
                    'Cannot respond to real-time performance'
                ],
                aiNative: [
                    'AI reallocates spend hourly based on performance',
                    'Automated within predefined guardrails',
                    'Responds instantly to conversion velocity'
                ]
            },
            {
                category: 'Creative Testing',
                oldWorld: [
                    '2-3 creative variants per campaign',
                    'Designer bottleneck for new variants',
                    'Limited multivariate testing'
                ],
                aiNative: [
                    'AI generates and tests 50+ variants',
                    'Automated creative optimization',
                    'Full multivariate testing at scale'
                ]
            }
        ]
    },

    'scaling': {
        id: 'scaling',
        title: 'Scaling Demand Gen',
        description: 'From linear headcount growth to exponential AI leverage',
        rows: [
            {
                category: 'Team Size',
                oldWorld: [
                    '1 demand gen manager per $1M pipeline',
                    '2-3 SDRs per AE',
                    '1 analyst per 5 campaign managers'
                ],
                aiNative: [
                    '1 fractional CMO + AI systems = 10-person output',
                    'AI handles SDR functions (scoring, routing, nurture)',
                    'Self-service dashboards eliminate analyst bottleneck'
                ]
            },
            {
                category: 'Cost Structure',
                oldWorld: [
                    'Headcount scales linearly with revenue',
                    'Average loaded cost: $120K per marketing FTE',
                    'Must hire before you can scale'
                ],
                aiNative: [
                    'AI costs scale sub-linearly',
                    'Fractional CMO + AI tools: $15-20K/month all-in',
                    'Scale infrastructure first, hire later'
                ]
            },
            {
                category: 'Speed to Market',
                oldWorld: [
                    '6-9 months to hire experienced demand gen talent',
                    '3-6 months ramp time per new hire',
                    'Lost opportunity cost during hiring'
                ],
                aiNative: [
                    'AI systems deployed in 2-4 weeks',
                    'Immediate productivity, no ramp time',
                    'Capture opportunity while competitors hire'
                ]
            }
        ]
    }
};
