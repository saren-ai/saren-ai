import type { Metadata } from 'next'
import FaqClient from './FaqClient'

export const metadata: Metadata = {
  title: 'Hiring Committee FAQ — Saren Sakurai × Halcyon AI',
  description: 'Answers to the 10 questions the Halcyon hiring committee will ask about Saren Sakurai as VP of Demand Generation.',
  robots: { index: false, follow: false },
}

export default function HalcyonFaqPage() {
  return <FaqClient />
}
