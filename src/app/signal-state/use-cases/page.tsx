import { Metadata } from 'next'
import UseCasesClient from './UseCasesClient'

export const metadata: Metadata = {
  title: 'Signal-State Use Cases — Saren Sakurai',
  description:
    'Three scenarios. One framework. See Signal-State Marketing applied to cybersecurity, organizational alignment, and independent creatives.',
}

export default function UseCasesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/signal-state/use-cases/#webpage",
            "url": "https://saren.ai/signal-state/use-cases",
            "name": "Signal-State Use Cases — Saren Sakurai",
            "description": "Three scenarios. One framework. See Signal-State Marketing applied to cybersecurity, organizational alignment, and independent creatives.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-04-01",
            "hasPart": [
              {
                "@type": "WebPage",
                "url": "https://saren.ai/signal-state/use-cases/cybersecurity",
                "name": "Cybersecurity Use Case — Signal-State Marketing"
              },
              {
                "@type": "WebPage",
                "url": "https://saren.ai/signal-state/use-cases/org-alignment",
                "name": "Organizational Alignment Use Case — Signal-State Marketing"
              },
              {
                "@type": "WebPage",
                "url": "https://saren.ai/signal-state/use-cases/independent-creative",
                "name": "Independent Creative Use Case — Signal-State Marketing"
              }
            ]
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
              { "@type": "ListItem", "position": 3, "name": "Use Cases", "item": "https://saren.ai/signal-state/use-cases" }
            ]
          })
        }}
      />
      <UseCasesClient />
    </>
  )
}
