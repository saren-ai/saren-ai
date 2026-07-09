import { Metadata } from 'next'
import SignalStateClient from '@/components/signal-state/SignalStateClient'

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

export default function SignalStatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/signal-state/#webpage",
            "url": "https://saren.ai/signal-state",
            "name": "Signal-State Marketing — Saren Sakurai",
            "description": "AI-enabled expressed intent targeting. We find people the moment they say they have a problem and reach them before anyone else does.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": { "@id": "https://saren.ai/#person" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateCreated": "2026-02-15",
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
              { "@type": "ListItem", "position": 2, "name": "Signal-State Marketing", "item": "https://saren.ai/signal-state" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://saren.ai/signal-state/#service",
            "name": "Signal-State Marketing",
            "description": "AI-enabled expressed intent targeting that identifies buyers the moment they publicly signal a problem — and reaches them with the right message before any competitor does.",
            "url": "https://saren.ai/signal-state",
            "provider": { "@id": "https://saren.ai/#person" },
            "serviceType": "B2B Marketing Strategy",
            "areaServed": "United States",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Signal-State Marketing Engagements",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Signal Library Build" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Intent Architecture & Response Design" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Use Case Deployment" } }
              ]
            },
            "inLanguage": "en-US"
          })
        }}
      />
      <SignalStateClient />
    </>
  )
}
