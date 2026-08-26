import { Metadata } from 'next'
import SignalStateClient from '@/components/signal-state/SignalStateClient'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph, serviceId, pageUrl } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Signal-State Marketing — AI-Enabled Intent Targeting | Saren Sakurai',
  description:
    'Signal-State finds buyers the moment they express a problem — before competitors even know the window is open. AI-enabled expressed intent targeting for B2B sales teams.',
  alternates: { canonical: 'https://saren.ai/signal-state' },
  openGraph: {
    title: 'Signal-State Marketing — AI-Enabled Intent Targeting | Saren Sakurai',
    description:
      'Signal-State finds buyers the moment they express a problem — before competitors even know the window is open. AI-enabled expressed intent targeting for B2B sales teams.',
    url: 'https://saren.ai/signal-state',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal-State Marketing — AI-Enabled Intent Targeting',
    description:
      'Signal-State finds buyers the moment they express a problem — before competitors even know the window is open.',
  },
}

const PATH = '/signal-state'

const trail = [{ href: '/', label: 'Home' }, { label: 'Signal-State Marketing' }]

const service = {
  '@type': 'Service',
  '@id': serviceId(PATH),
  name: 'Signal-State Marketing',
  description:
    'AI-enabled expressed intent targeting that identifies buyers the moment they publicly signal a problem — and reaches them with the right message before any competitor does.',
  url: pageUrl(PATH),
  provider: { '@id': 'https://saren.ai/#person' },
  serviceType: 'B2B Marketing Strategy',
  areaServed: 'United States',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Signal-State Marketing Engagements',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Signal Library Build' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Intent Architecture & Response Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Use Case Deployment' } },
    ],
  },
  inLanguage: 'en-US',
}

const graph = buildGraph({
  path: PATH,
  name: 'Signal-State Marketing — Saren Sakurai',
  description:
    'AI-enabled expressed intent targeting. We find people the moment they say they have a problem and reach them before anyone else does.',
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
  extra: [service],
})

export default function SignalStatePage() {
  return (
    <>
      <JsonLd schema={graph} />
      <SignalStateClient />
    </>
  )
}
