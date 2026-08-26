import { Metadata } from 'next'
import SignalLibraryClient from './SignalLibraryClient'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph, pageUrl } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Signal Library — B2B Intent Signal Patterns for AI Targeting | Saren Sakurai',
  description:
    'Catalogued expressed-intent signal patterns for AI agent targeting. Covers cybersecurity vulnerability, organizational dysfunction, and creative struggle signals across B2B verticals.',
  alternates: { canonical: 'https://saren.ai/signal-state/signal-library' },
  openGraph: {
    title: 'Signal Library — B2B Intent Signal Patterns for AI Targeting | Saren Sakurai',
    description:
      'Catalogued expressed-intent signal patterns for AI agent targeting across cybersecurity, organizational dysfunction, and creative struggle verticals.',
    url: 'https://saren.ai/signal-state/signal-library',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal Library — B2B Intent Signal Patterns for AI Targeting',
    description:
      'Catalogued expressed-intent signal patterns for AI agent targeting across cybersecurity, organizational dysfunction, and creative struggle verticals.',
  },
}

const PATH = '/signal-state/signal-library'

// Matches the visible breadcrumb rendered by SignalLibraryClient (Breadcrumb
// back/current API — "← Signal-State · Signal Library"); no separate "Home" segment.
const trail = [{ href: '/signal-state', label: 'Signal-State' }, { label: 'Signal Library' }]

const definedTermSet = {
  '@type': 'DefinedTermSet',
  '@id': `${pageUrl(PATH)}/#terms`,
  name: 'Signal-State Signal Library',
  description:
    'A catalogued reference of expressed-intent signal patterns used in Signal-State Marketing: ransomware vulnerability signals, organizational dysfunction signals, and independent creative struggle signals.',
  url: pageUrl(PATH),
  author: { '@id': 'https://saren.ai/#person' },
  inLanguage: 'en-US',
  keywords: 'intent signals, expressed intent, ransomware vulnerability, organizational dysfunction, creative struggle, B2B targeting signals',
}

const graph = buildGraph({
  path: PATH,
  pageType: 'CollectionPage',
  name: 'Signal Library — Signal-State Marketing',
  description: 'Catalogued signal patterns for AI agent targeting. Ransomware vulnerability, organizational dysfunction, and creative struggle signals.',
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
  extra: [definedTermSet],
})

export default function SignalLibraryPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <SignalLibraryClient />
    </>
  )
}
