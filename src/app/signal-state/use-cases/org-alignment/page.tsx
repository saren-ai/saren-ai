import { Metadata } from 'next'
import OrgAlignmentClient from './OrgAlignmentClient'

export const metadata: Metadata = {
  title: 'Organizational Alignment Use Case — Signal-State Marketing',
  description:
    'Reading the signals leadership can\'t see from inside. A Signal-State use case for organizational alignment consulting.',
}

export default function OrgAlignmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/signal-state/use-cases/org-alignment/#webpage",
            "url": "https://saren.ai/signal-state/use-cases/org-alignment",
            "name": "Organizational Alignment Use Case — Signal-State Marketing",
            "description": "Reading the signals leadership can't see from inside. A Signal-State use case for organizational alignment consulting.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateCreated": "2026-02-20",
            "dateModified": "2026-04-01"
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
              { "@type": "ListItem", "position": 4, "name": "Organizational Alignment", "item": "https://saren.ai/signal-state/use-cases/org-alignment" }
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
            "@id": "https://saren.ai/signal-state/use-cases/org-alignment/#article",
            "headline": "Signal-State Marketing for Organizational Alignment Consulting",
            "description": "How Signal-State Marketing reads the dysfunction signals that leadership can't see from inside — identifying organizations publicly signaling misalignment, leadership conflict, or change-management strain before they start searching for consultants.",
            "url": "https://saren.ai/signal-state/use-cases/org-alignment",
            "author": { "@id": "https://saren.ai/#person" },
            "publisher": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["Organizational alignment consulting", "Intent-based marketing", "Signal-State Marketing", "B2B consulting"],
            "keywords": "organizational alignment, consulting marketing, dysfunction signals, leadership conflict, Signal-State Marketing, expressed intent, B2B consulting",
            "inLanguage": "en-US",
            "datePublished": "2026-02-20",
            "dateModified": "2026-04-01",
            "articleSection": "Signal-State Use Cases"
          })
        }}
      />
      <OrgAlignmentClient />
    </>
  )
}
