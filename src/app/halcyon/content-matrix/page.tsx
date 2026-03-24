import type { Metadata } from 'next'
import ContentMatrixClient from './ContentMatrixClient'

export const metadata: Metadata = {
  title: 'Halcyon Content Matrix — Saren Sakurai × Halcyon AI',
  description: 'Full-funnel content strategy for Halcyon AI: 4 buying personas × 4 buying stages with recommended assets, KPIs, and activation guidance.',
  robots: { index: false, follow: false },
}

export default function HalcyonContentMatrixPage() {
  return <ContentMatrixClient />
}
