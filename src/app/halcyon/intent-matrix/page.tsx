import type { Metadata } from 'next'
import IntentMatrixClient from './IntentMatrixClient'

export const metadata: Metadata = {
  title: 'Halcyon Intent Activity Matrix — Saren Sakurai × Halcyon AI',
  description: 'Ransomware buyer intent signals mapped across a 18-month buying timeline. Filter by vertical to see how signal intensity shifts by industry.',
  robots: { index: false, follow: false },
}

export default function HalcyonIntentMatrixPage() {
  return <IntentMatrixClient />
}
