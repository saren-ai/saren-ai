import { Metadata } from 'next'
import ArchitecturePageContent from './ArchitecturePageContent'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph, workId, pageUrl } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Signal-State Architecture — Interactive Platform Diagram | Saren Sakurai',
  description:
    'Interactive architecture diagram for the Signal-State Marketing platform. Explore how AI signal detection, intent scoring, and response orchestration connect end-to-end.',
  alternates: { canonical: 'https://saren.ai/signal-state/architecture' },
  openGraph: {
    title: 'Signal-State Architecture — Interactive Platform Diagram | Saren Sakurai',
    description:
      'Interactive architecture diagram for the Signal-State Marketing platform. Explore how AI signal detection, intent scoring, and response orchestration connect end-to-end.',
    url: 'https://saren.ai/signal-state/architecture',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal-State Architecture — Interactive Platform Diagram',
    description:
      'Explore how AI signal detection, intent scoring, and response orchestration connect in the Signal-State Marketing platform.',
  },
}

const PATH = '/signal-state/architecture'

// Matches the visible breadcrumb rendered by ArchitecturePageContent (Breadcrumb
// back/current API — "← Signal-State · Architecture"); no separate "Home" segment.
const trail = [{ href: '/signal-state', label: 'Signal-State' }, { label: 'Architecture' }]

const work = {
  '@type': 'CreativeWork',
  '@id': workId(PATH),
  name: 'Signal-State Marketing Platform Architecture',
  description:
    'Interactive system architecture diagram for the Signal-State Marketing platform, illustrating data flow from signal ingestion through AI classification, scoring, response routing, and outreach delivery.',
  url: pageUrl(PATH),
  author: { '@id': 'https://saren.ai/#person' },
  creator: { '@id': 'https://saren.ai/#person' },
  isPartOf: { '@id': 'https://saren.ai/#website' },
  about: ['System architecture', 'Signal-State Marketing', 'AI marketing platform', 'Intent targeting'],
  keywords: 'Signal-State architecture, AI marketing platform, intent targeting system, signal scoring, marketing automation',
  inLanguage: 'en-US',
  dateCreated: '2026-02-15',
  dateModified: '2026-04-01T00:00:00Z',
}

const graph = buildGraph({
  path: PATH,
  name: 'Signal-State Architecture — Saren Sakurai',
  description: 'Interactive architecture diagram for the Signal-State Marketing platform. Click any node to expand details.',
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
  extra: [work],
})

export default function ArchitecturePage() {
  return (
    <>
      <JsonLd schema={graph} />
      <ArchitecturePageContent />
    </>
  )
}
