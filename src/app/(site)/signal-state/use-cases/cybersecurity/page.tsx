import { Metadata } from 'next'
import CybersecurityClient from './CybersecurityClient'

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

export default function CybersecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/signal-state/use-cases/cybersecurity/#webpage",
            "url": "https://saren.ai/signal-state/use-cases/cybersecurity",
            "name": "Cybersecurity Use Case — Signal-State Marketing",
            "description": "Finding organizational vulnerability before the attack. A Signal-State use case for B2B cybersecurity.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateCreated": "2026-02-20",
            "dateModified": "2026-04-01T00:00:00Z"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
              { "@type": "ListItem", "position": 2, "name": "Signal-State Marketing", "item": "https://saren.ai/signal-state" },
              { "@type": "ListItem", "position": 3, "name": "Use Cases", "item": "https://saren.ai/signal-state/use-cases" },
              { "@type": "ListItem", "position": 4, "name": "Cybersecurity", "item": "https://saren.ai/signal-state/use-cases/cybersecurity" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "https://saren.ai/signal-state/use-cases/cybersecurity/#article",
            "headline": "Signal-State Marketing for B2B Cybersecurity",
            "description": "How Signal-State Marketing identifies organizational vulnerability signals before a cyberattack occurs — finding buyers who have publicly signaled exposure and reaching them with relevant cybersecurity solutions before any competitor does.",
            "url": "https://saren.ai/signal-state/use-cases/cybersecurity",
            "author": { "@id": "https://saren.ai/#person" },
            "publisher": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["B2B cybersecurity marketing", "Intent-based marketing", "Signal-State Marketing", "Ransomware vulnerability"],
            "keywords": "cybersecurity marketing, intent targeting, vulnerability signals, B2B security, Signal-State Marketing, expressed intent",
            "inLanguage": "en-US",
            "datePublished": "2026-02-20T00:00:00Z",
            "dateModified": "2026-04-01T00:00:00Z",
            "articleSection": "Signal-State Use Cases"
          })
        }}
      />
      <CybersecurityClient />
    </>
  )
}
