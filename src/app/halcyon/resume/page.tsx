import type { Metadata } from 'next'
import ResumeClient from './ResumeClient'

export const metadata: Metadata = {
  title: 'Saren Sakurai — Resume · VP Demand Generation',
  description:
    '20+ years building demand gen infrastructure in AI-native cybersecurity. Cylance, BlackBerry, WethosAI. Targeting VP of Demand Generation at Halcyon.',
  robots: { index: false, follow: false },
}

export default function ResumePage() {
  return <ResumeClient />
}
