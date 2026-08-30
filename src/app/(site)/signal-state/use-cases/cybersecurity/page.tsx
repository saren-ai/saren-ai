import { Metadata } from 'next'
import CybersecurityClient from './CybersecurityClient'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import { buildGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cybersecurity Use Case — Signal-State Marketing | Saren Sakurai',
  description:
    'Finding organizational vulnerability before the attack. A Signal-State use case for B2B cybersecurity — identifying ransomware exposure signals before the breach.',
  alternates: { canonical: 'https://saren.ai/signal-state/use-cases/cybersecurity' },
  openGraph: {
    title: 'Cybersecurity Use Case — Signal-State Marketing | Saren Sakurai',
    description:
      'Finding organizational vulnerability before the attack. A Signal-State use case for B2B cybersecurity — identifying ransomware exposure signals before the breach.',
    url: 'https://saren.ai/signal-state/use-cases/cybersecurity',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Use Case — Signal-State Marketing | Saren Sakurai',
    description:
      'Finding organizational vulnerability before the attack. A Signal-State use case for B2B cybersecurity.',
  },
}

const PATH = '/signal-state/use-cases/cybersecurity'

const trail = [
  { href: '/', label: 'Home' },
  { href: '/signal-state', label: 'Signal-State Marketing' },
  { href: '/signal-state/use-cases', label: 'Use Cases' },
  { label: 'Cybersecurity' },
]

const graph = buildGraph({
  path: PATH,
  name: 'Cybersecurity Use Case — Signal-State Marketing',
  description: 'Finding organizational vulnerability before the attack. A Signal-State use case for B2B cybersecurity.',
  dateModified: '2026-04-01T00:00:00Z',
  breadcrumb: trail,
  article: {
    headline: 'Cybersecurity / Ransomware Vulnerability',
    datePublished: '2026-02-20T00:00:00Z',
    dateModified: '2026-04-01T00:00:00Z',
    about: ['B2B cybersecurity marketing', 'Intent-based marketing', 'Signal-State Marketing', 'Ransomware vulnerability'],
  },
})

export default function CybersecurityPage() {
  return (
    <>
      <JsonLd schema={graph} />
      <div className="border-b border-slate/10 dark:border-white/5">
        <div className="container-narrow py-3">
          <Breadcrumb trail={trail} />
        </div>
      </div>
      <CybersecurityClient />
    </>
  )
}
