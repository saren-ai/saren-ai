import type { Metadata } from 'next'
import HalcyonClient from './HalcyonClient'

export const metadata: Metadata = {
  title: 'Saren Sakurai × Halcyon AI — VP of Demand Generation',
  description:
    'Why Saren Sakurai is the demand generation leader Halcyon needs to build pipeline at scale in the enterprise cybersecurity market.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Saren Sakurai × Halcyon AI',
    description: 'Why Saren is the VP of Demand Generation Halcyon needs.',
    type: 'profile',
    images: [{ url: '/images/og/home.png', width: 1200, height: 630 }],
  },
}

export default function HalcyonPage() {
  return <HalcyonClient />
}
