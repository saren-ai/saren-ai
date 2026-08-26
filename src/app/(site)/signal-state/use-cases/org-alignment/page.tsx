import { Metadata } from 'next'
import OrgAlignmentClient from './OrgAlignmentClient'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Organizational Alignment Use Case — Signal-State Marketing | Saren Sakurai',
  description:
    'Reading the signals leadership can\'t see from inside. A Signal-State use case for organizational alignment consulting — identifying dysfunction signals before the RFP.',
  alternates: { canonical: 'https://saren.ai/signal-state/use-cases/org-alignment' },
  openGraph: {
    title: 'Organizational Alignment Use Case — Signal-State Marketing | Saren Sakurai',
    description:
      'Reading the signals leadership can\'t see from inside. A Signal-State use case for organizational alignment consulting — identifying dysfunction signals before the RFP.',
    url: 'https://saren.ai/signal-state/use-cases/org-alignment',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organizational Alignment Use Case — Signal-State Marketing | Saren Sakurai',
    description:
      'Reading the signals leadership can\'t see from inside. A Signal-State use case for organizational alignment consulting.',
  },
}

const PATH = '/signal-state/use-cases/org-alignment'

const trail = [
  { href: '/', label: 'Home' },
  { href: '/signal-state', label: 'Signal-State Marketing' },
  { href: '/signal-state/use-cases', label: 'Use Cases' },
  { label: 'Organizational Alignment' },
]

const graph = buildGraph({
  path: PATH,
  name: 'Organizational Alignment Use Case — Signal-State Marketing',
  description: "Reading the signals leadership can't see from inside. A Signal-State use case for organizational alignment consulting.",
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
  article: {
    headline: 'Signal-State Marketing for Organizational Alignment Consulting',
    datePublished: '2026-02-20T00:00:00Z',
    dateModified: '2026-04-01T00:00:00Z',
    about: ['Organizational alignment consulting', 'Intent-based marketing', 'Signal-State Marketing', 'B2B consulting'],
  },
})

export default function OrgAlignmentPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <OrgAlignmentClient />
    </>
  )
}
