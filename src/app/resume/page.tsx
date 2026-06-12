import type { Metadata } from 'next'
import ResumeClient from './ResumeClient'

export const metadata: Metadata = {
  title: 'Resume — Saren Sakurai',
  description:
    'Demand Generation & Marketing Systems Leader with 20+ years in B2B tech. AI-native marketing ops, pipeline architecture, and turnaround execution.',
  alternates: {
    canonical: 'https://saren.ai/resume',
  },
  openGraph: {
    title: 'Resume — Saren Sakurai',
    description:
      'Demand Generation & Marketing Systems Leader with 20+ years in B2B tech. AI-native marketing ops, pipeline architecture, and turnaround execution.',
    url: 'https://saren.ai/resume',
  },
}

export default function ResumePage() {
  return <ResumeClient />
}
