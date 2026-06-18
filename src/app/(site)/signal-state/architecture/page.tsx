import { Metadata } from 'next'
import ArchitecturePageContent from './ArchitecturePageContent'

export const metadata: Metadata = {
  title: 'Signal-State Architecture — Interactive Platform Diagram | Saren Sakurai',
  description:
    'Interactive architecture diagram for the Signal-State Marketing platform. Explore how AI signal detection, intent scoring, and response orchestration connect end-to-end.',
  alternates: { canonical: 'https://saren.ai/signal-state/architecture' },
  openGraph: {
    title: 'Signal-State Architecture — Interactive Platform Diagram | Saren Sakurai',
    description:
      'Interactive architecture diagram for the Signal-State Marketing platform. Explore how AI signal detection, intent scoring, and response orchestration connect end-to-end.',
    url: 'https://saren.ai/signal-state/architecture',
    siteName: 'Saren.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signal-State Architecture — Interactive Platform Diagram',
    description:
      'Explore how AI signal detection, intent scoring, and response orchestration connect in the Signal-State Marketing platform.',
  },
}

export default function ArchitecturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://saren.ai/signal-state/architecture/#webpage",
            "url": "https://saren.ai/signal-state/architecture",
            "name": "Signal-State Architecture — Saren Sakurai",
            "description": "Interactive architecture diagram for the Signal-State Marketing platform. Click any node to expand details.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateCreated": "2026-02-15",
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
              { "@type": "ListItem", "position": 3, "name": "Architecture", "item": "https://saren.ai/signal-state/architecture" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": "https://saren.ai/signal-state/architecture/#work",
            "name": "Signal-State Marketing Platform Architecture",
            "description": "Interactive system architecture diagram for the Signal-State Marketing platform, illustrating data flow from signal ingestion through AI classification, scoring, response routing, and outreach delivery.",
            "url": "https://saren.ai/signal-state/architecture",
            "author": { "@id": "https://saren.ai/#person" },
            "creator": { "@id": "https://saren.ai/#person" },
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "about": ["System architecture", "Signal-State Marketing", "AI marketing platform", "Intent targeting"],
            "keywords": "Signal-State architecture, AI marketing platform, intent targeting system, signal scoring, marketing automation",
            "inLanguage": "en-US",
            "dateCreated": "2026-02-15",
            "dateModified": "2026-04-01"
          })
        }}
      />
      <ArchitecturePageContent />
    </>
  )
}
