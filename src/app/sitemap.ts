import { MetadataRoute } from 'next'

const BASE_URL = 'https://saren.ai'

// lastModified = last substantive commit touching the route's page file
// (git log -1 --format=%cs -- <file>, captured 2026-06-09). Update entries
// when a page meaningfully changes — never stamp the whole map with "now".
// Money pages carry priority 0.9; homepage 1.0; everything else 0.7.

interface RouteEntry {
  lastModified?: string
  priority?: number
}

const routes: Record<string, RouteEntry> = {
  '/': { lastModified: '2026-06-09', priority: 1.0 },

  // Core pages
  '/about': { lastModified: '2026-05-08' },
  '/about/clients': { lastModified: '2026-05-08' },
  '/about/concerts': { lastModified: '2026-05-08' },
  '/about/expertise': { lastModified: '2026-05-22' },
  '/about/work/cylance': { lastModified: '2026-06-04' },
  '/aeo-playbook': { lastModified: '2026-07-06', priority: 0.9 },
  '/ai-orchestration': { lastModified: '2026-06-09', priority: 0.9 },
  '/brand': { lastModified: '2026-05-08' },
  '/contact': { lastModified: '2026-06-09', priority: 0.9 },
  '/gtm-engineering': { lastModified: '2026-06-19', priority: 0.9 },
  '/work': { lastModified: '2026-07-05' },
  '/services': { lastModified: '2026-07-05', priority: 0.9 },
  '/oc': { lastModified: '2026-07-05', priority: 0.8 },
  '/privacy': { lastModified: '2026-06-12', priority: 0.3 },
  '/resume': { lastModified: '2026-06-12', priority: 0.9 },
  '/terms': { lastModified: '2026-06-12', priority: 0.3 },
  '/studio': { lastModified: '2026-06-17' },
  '/studio/ai-for-liberal-arts': { lastModified: '2026-06-17' },
  '/studio/oblique-techniques': { lastModified: '2026-06-17' },
  '/studio/psylocke-timeline': { lastModified: '2026-05-08' },

  // Services
  '/fractional-marketing-lead': { lastModified: '2026-06-09', priority: 0.9 },
  '/fractional-marketing-lead/cost': { lastModified: '2026-06-09', priority: 0.9 },

  // Audience pages
  '/smb': { lastModified: '2026-05-27' },
  '/solopreneurs': { lastModified: '2026-06-09' },
  '/thinkers': { lastModified: '2026-05-27' },

  // Case studies
  '/case-studies': { lastModified: '2026-05-28', priority: 0.9 },
  '/case-studies/10-touch-sales-play': { lastModified: '2026-05-28' },
  '/case-studies/120-day-content-journey': { lastModified: '2026-05-28' },
  '/case-studies/authority-engineering': { lastModified: '2026-05-28' },
  '/case-studies/dynamic-nurture': { lastModified: '2026-05-28' },
  '/case-studies/executive-dashboard': { lastModified: '2026-06-09' },
  '/case-studies/intent-data': { lastModified: '2026-06-08' },
  '/case-studies/sovereign-personas': { lastModified: '2026-05-28' },
  '/case-studies/thought-leadership-development': { lastModified: '2026-06-09' },

  // Playbooks — interactive tools
  '/playbooks': { lastModified: '2026-05-31', priority: 0.9 },
  '/playbooks/b2b-marketing-framework': { lastModified: '2026-05-28' },
  '/playbooks/gtm-budget-calculator': { lastModified: '2026-05-28' },
  '/playbooks/hybrid-lead-scoring': { lastModified: '2026-06-09' },
  '/playbooks/its-good-to-be-pitched': { lastModified: '2026-05-28' },
  '/playbooks/roi-simulator': { lastModified: '2026-05-28' },

  // Playbooks — catalog entries (dates follow prompt_catalog.json)
  '/playbooks/brand-style-guide-page-builder': { lastModified: '2026-05-28' },
  '/playbooks/cmo-content-marketing-pipeline': { lastModified: '2026-05-28' },
  '/playbooks/cmo-gtm-playbook': { lastModified: '2026-05-28' },
  '/playbooks/daily-executive-gsd-stack': { lastModified: '2026-05-28' },
  '/playbooks/digital-dominance-marketing-system': { lastModified: '2026-05-28' },
  '/playbooks/genx-executive-ai-playbook': { lastModified: '2026-05-28' },
  '/playbooks/learning-mastery-sequence': { lastModified: '2026-05-28' },
  '/playbooks/linkedin-prospect-dashboard': { lastModified: '2026-05-28' },
  '/playbooks/mckinsey-strategy-suite': { lastModified: '2026-05-28' },
  '/playbooks/personal-bio-brand-builder': { lastModified: '2026-05-28' },
  '/playbooks/research-intelligence-pipeline': { lastModified: '2026-05-28' },
  '/playbooks/self-discovery-mindset-journey': { lastModified: '2026-05-28' },
  '/playbooks/sora2-samurai-creative-series': { lastModified: '2026-05-28' },
  '/playbooks/viral-content-hook-trilogy': { lastModified: '2026-05-28' },

  // B2B marketing framework prompt pages
  '/playbooks/b2b-marketing-framework/brand-promise': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/brand-voice-tone': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/campaign-brief': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/case-study-framework': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/channel-strategy': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/content-formats-repurposing': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/elevator-pitch': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/hooks-taglines': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/ideal-customer-profile-icp': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/marketing-dashboard': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/marketing-kpis-metrics': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/message-map': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/mission-vision-values': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/nurture-sequence-strategy': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/objection-handling-scripts': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/positioning-statement': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/quarterly-business-review': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/sales-enablement-plan': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/sales-playbook-outline': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/strategic-messaging-pillars': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/target-market-competitive-landscape': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/unique-value-proposition-uvp': { lastModified: '2026-05-28' },
  '/playbooks/b2b-marketing-framework/website-copy-home-landing': { lastModified: '2026-05-28' },

  // Signal-State framework
  '/signal-state': { lastModified: '2026-05-28' },
  '/signal-state/architecture': { lastModified: '2026-05-28' },
  '/signal-state/framework': { lastModified: '2026-05-28' },
  '/signal-state/signal-library': { lastModified: '2026-05-28' },
  '/signal-state/use-cases': { lastModified: '2026-05-28' },
  '/signal-state/use-cases/cybersecurity': { lastModified: '2026-05-31' },
  '/signal-state/use-cases/independent-creative': { lastModified: '2026-05-31' },
  '/signal-state/use-cases/org-alignment': { lastModified: '2026-05-31' },
}

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(routes).map(([route, entry]) => ({
    url: `${BASE_URL}${route}`,
    ...(entry.lastModified && { lastModified: entry.lastModified }),
    changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: entry.priority ?? 0.7,
  }))
}
