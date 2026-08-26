import { Metadata } from 'next'
import UseCasesClient from './UseCasesClient'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Signal-State Use Cases — Cybersecurity, B2B SaaS & Creatives | Saren Sakurai',
  description:
    'Three Signal-State scenarios: cybersecurity vendors targeting ransomware-vulnerable accounts, B2B SaaS teams targeting org-dysfunction signals, and creatives targeting struggling practitioners.',
  alternates: { canonical: 'https://saren.ai/signal-state/use-cases' },
  openGraph: {
    title: 'Signal-State Use Cases — Cybersecurity, B2B SaaS & Creatives | Saren Sakurai',
    description:
      'Three Signal-State scenarios: cybersecurity vendors targeting ransomware-vulnerable accounts, B2B SaaS teams targeting org-dysfunction signals, and creatives targeting struggling practitioners.',
    url: 'https://saren.ai/signal-state/use-cases',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal-State Use Cases — Cybersecurity, B2B SaaS & Creatives',
    description:
      'Three real-world Signal-State scenarios across cybersecurity, B2B SaaS, and independent creatives.',
  },
}

const PATH = '/signal-state/use-cases'

// Matches the visible breadcrumb rendered by UseCasesClient (Breadcrumb back/current
// API — "← Signal-State · Use Cases"); no separate "Home" segment.
const trail = [{ href: '/signal-state', label: 'Signal-State' }, { label: 'Use Cases' }]

// Note: the previous hand-written JSON-LD nested a `hasPart` array of three stub
// WebPage objects (cybersecurity/org-alignment/independent-creative) with no `@id`,
// so it never linked to anything — the real `#webpage` nodes for those pages live in
// their own per-page graphs. Dropped rather than reproduced broken.
const graph = buildGraph({
  path: PATH,
  pageType: 'CollectionPage',
  name: 'Signal-State Use Cases — Saren Sakurai',
  description: 'Three scenarios. One framework. See Signal-State Marketing applied to cybersecurity, organizational alignment, and independent creatives.',
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
})

export default function UseCasesPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <UseCasesClient />
    </>
  )
}
