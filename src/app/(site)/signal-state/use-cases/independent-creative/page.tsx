import { Metadata } from 'next'
import IndependentCreativeClient from './IndependentCreativeClient'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Independent Creative Use Case — Signal-State Marketing | Saren Sakurai',
  description:
    'The moment a solo operator names the capability gap. A Signal-State use case for AI tools targeting independent creatives and solo operators.',
  alternates: { canonical: 'https://saren.ai/signal-state/use-cases/independent-creative' },
  openGraph: {
    title: 'Independent Creative Use Case — Signal-State Marketing | Saren Sakurai',
    description:
      'The moment a solo operator names the capability gap. A Signal-State use case for AI tools targeting independent creatives and solo operators.',
    url: 'https://saren.ai/signal-state/use-cases/independent-creative',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Independent Creative Use Case — Signal-State Marketing | Saren Sakurai',
    description:
      'The moment a solo operator names the capability gap. A Signal-State use case for AI tools for independent creatives.',
  },
}

const PATH = '/signal-state/use-cases/independent-creative'

const trail = [
  { href: '/', label: 'Home' },
  { href: '/signal-state', label: 'Signal-State Marketing' },
  { href: '/signal-state/use-cases', label: 'Use Cases' },
  { label: 'Independent Creative' },
]

const graph = buildGraph({
  path: PATH,
  name: 'Independent Creative Use Case — Signal-State Marketing',
  description: 'The moment a solo operator names the capability gap. A Signal-State use case for AI tools for independent creatives.',
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
  article: {
    headline: 'Signal-State Marketing for AI Tools Targeting Independent Creatives',
    datePublished: '2026-02-20T00:00:00Z',
    dateModified: '2026-04-01T00:00:00Z',
    about: ['AI tools marketing', 'Independent creatives', 'Signal-State Marketing', 'Solo operators', 'Expressed intent'],
  },
})

export default function IndependentCreativePage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <IndependentCreativeClient />
    </>
  )
}
