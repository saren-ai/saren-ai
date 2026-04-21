import { Metadata } from 'next'
import SignalLibraryClient from './SignalLibraryClient'

export const metadata: Metadata = {
  title: 'Signal Library — Signal-State Marketing',
  description:
    'Catalogued signal patterns for AI agent targeting. Ransomware vulnerability, organizational dysfunction, and creative struggle signals.',
}

export default function SignalLibraryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/signal-state/signal-library/#webpage",
            "url": "https://saren.ai/signal-state/signal-library",
            "name": "Signal Library — Signal-State Marketing",
            "description": "Catalogued signal patterns for AI agent targeting. Ransomware vulnerability, organizational dysfunction, and creative struggle signals.",
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
              { "@type": "ListItem", "position": 3, "name": "Signal Library", "item": "https://saren.ai/signal-state/signal-library" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "@id": "https://saren.ai/signal-state/signal-library/#terms",
            "name": "Signal-State Signal Library",
            "description": "A catalogued reference of expressed-intent signal patterns used in Signal-State Marketing: ransomware vulnerability signals, organizational dysfunction signals, and independent creative struggle signals.",
            "url": "https://saren.ai/signal-state/signal-library",
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "keywords": "intent signals, expressed intent, ransomware vulnerability, organizational dysfunction, creative struggle, B2B targeting signals"
          })
        }}
      />
      <SignalLibraryClient />
    </>
  )
}
