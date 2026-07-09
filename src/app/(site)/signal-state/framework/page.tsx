import { Metadata } from 'next'
import FrameworkClient from './FrameworkClient'

export const metadata: Metadata = {
  title: 'Signal-State Framework — Intent Signal Typology & Decay Model | Saren Sakurai',
  description:
    'The complete Signal-State Marketing framework: psychological research behind expressed intent, signal typology, decay model, and response architecture for B2B targeting.',
  alternates: { canonical: 'https://saren.ai/signal-state/framework' },
  openGraph: {
    title: 'Signal-State Framework — Intent Signal Typology & Decay Model | Saren Sakurai',
    description:
      'The complete Signal-State Marketing framework: psychological research behind expressed intent, signal typology, decay model, and response architecture for B2B targeting.',
    url: 'https://saren.ai/signal-state/framework',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal-State Framework — Intent Signal Typology & Decay Model',
    description:
      'Psychological research, signal typology, decay model, and response architecture for AI-enabled B2B targeting.',
  },
}

export default function FrameworkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/signal-state/framework/#webpage",
            "url": "https://saren.ai/signal-state/framework",
            "name": "Signal-State Framework — Saren Sakurai",
            "description": "The full Signal-State Marketing framework. Psychological research, signal typology, decay model, and response architecture.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
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
              { "@type": "ListItem", "position": 2, "name": "Signal-State Marketing", "item": "https://saren.ai/signal-state" },
              { "@type": "ListItem", "position": 3, "name": "Framework", "item": "https://saren.ai/signal-state/framework" }
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
            "@id": "https://saren.ai/signal-state/framework/#article",
            "headline": "The Signal-State Marketing Framework",
            "description": "The full Signal-State Marketing framework — covering psychological foundations of expressed intent, signal typology (explicit, implicit, behavioral, contextual), signal decay model, and complete response architecture for AI-enabled B2B targeting.",
            "url": "https://saren.ai/signal-state/framework",
            "author": { "@id": "https://saren.ai/#person" },
            "publisher": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["Intent-based marketing", "Signal-State Marketing", "B2B demand generation", "AI targeting"],
            "keywords": "Signal-State Marketing, expressed intent, intent targeting, signal decay, B2B marketing framework, AI-enabled marketing",
            "inLanguage": "en-US",
            "datePublished": "2026-02-15T00:00:00Z",
            "dateModified": "2026-04-01T00:00:00Z",
            "articleSection": "Marketing Frameworks"
          })
        }}
      />
      <FrameworkClient />
    </>
  )
}
