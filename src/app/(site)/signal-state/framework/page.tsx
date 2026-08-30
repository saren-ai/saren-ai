import { Metadata } from 'next'
import FrameworkClient from './FrameworkClient'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Signal-State Framework — Intent Signal Typology & Decay Model | Saren Sakurai',
  description:
    'The complete Signal-State Marketing framework: psychological research behind expressed intent, signal typology, decay model, and response architecture for B2B targeting.',
  alternates: { canonical: 'https://saren.ai/signal-state/framework' },
  openGraph: {
    title: 'Signal-State Framework — Intent Signal Typology & Decay Model | Saren Sakurai',
    description:
      'The complete Signal-State Marketing framework: psychological research behind expressed intent, signal typology, decay model, and response architecture for B2B targeting.',
    url: 'https://saren.ai/signal-state/framework',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal-State Framework — Intent Signal Typology & Decay Model',
    description:
      'Psychological research, signal typology, decay model, and response architecture for AI-enabled B2B targeting.',
  },
}

const PATH = '/signal-state/framework'

// Matches the visible breadcrumb rendered by FrameworkClient (Breadcrumb back/current
// API — "← Signal-State · Framework"), which does not show a separate "Home" segment.
const trail = [{ href: '/signal-state', label: 'Signal-State' }, { label: 'Framework' }]

const graph = buildGraph({
  path: PATH,
  name: 'Signal-State Framework — Saren Sakurai',
  description:
    'The full Signal-State Marketing framework. Psychological research, signal typology, decay model, and response architecture.',
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
  article: {
    headline: 'The Full Framework',
    datePublished: '2026-02-15T00:00:00Z',
    dateModified: '2026-04-01T00:00:00Z',
  },
})

export default function FrameworkPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <FrameworkClient />
    </>
  )
}
