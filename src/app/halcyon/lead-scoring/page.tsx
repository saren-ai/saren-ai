import type { Metadata } from 'next'
import LeadScoringClient from './LeadScoringClient'

export const metadata: Metadata = {
  title: 'Halcyon Lead Scoring Calculator — Saren Sakurai × Halcyon AI',
  description: 'Interactive ICP lead scoring tool: Fit Score + Engagement Score = actionable pipeline tiering for Halcyon AI demand generation.',
  robots: { index: false, follow: false },
}

export default function HalcyonLeadScoringPage() {
  return <LeadScoringClient />
}
