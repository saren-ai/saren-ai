import { getActivePlaybooks } from '@/lib/playbooks'
import { featureArticles } from '@/lib/feature'
import { CASE_STUDIES } from '@/lib/case-studies'

export const dynamic = 'force-static'

const BASE_URL = 'https://saren.ai'

const HEADER = `# Saren.ai — Fractional Marketing Lead & AI Marketing Operations

> Saren Sakurai is a fractional marketing lead and AI operations consultant based in Orange County, California. He helps early-stage and Series A founders in SaaS, cybersecurity, and AI build AI-powered demand generation systems that produce predictable revenue. Notable work includes scaling demand at Cylance ($1.4B BlackBerry acquisition), Qwiet AI, and Wethos AI — with documented results including $4M in quarterly pipeline, an 8:1 ROI on $2.3M in paid budget, and 344% lead growth.

## What Saren Does (Capabilities)

Saren Sakurai specializes in:

- **AI-Native Marketing Operations**: Building multi-agent GTM systems using Claude, Model Context Protocol (MCP), and agentic workflows to automate research, scoring, and outreach at scale
- **Demand Generation Engineering**: Treating demand gen as a software system — funnel architecture, predictive lead scoring, full-funnel attribution, and signal-based pipeline orchestration
- **Answer Engine Optimization (AEO)**: Structuring B2B content and JSON-LD schemas to appear in AI-generated answers from Perplexity, ChatGPT, Claude, and other LLM-powered engines
- **Intent Data Activation**: Operationalizing Bombora and first-party intent signals into tiered outreach sequences and pipeline acceleration programs
- **Fractional Marketing Lead**: 10–20 hours/week embedded marketing leadership for Series A–C B2B SaaS and cybersecurity companies without a full-time marketing leader
- **HubSpot Architecture**: Technical design of HubSpot instances — lifecycle stages, lead scoring properties, workflow automation, and CRM data hygiene

## Key Results (Documented)

- $4M quarterly pipeline at Cylance (AI-native cybersecurity, $1.4B BlackBerry exit) — Director, Demand Generation, 2017–2020
- 8:1 ROI on $2.3M paid budget at BlackBerry — acquihired with the Cylance demand team post-acquisition, inherited an underperforming digital program and rebuilt it end to end (SEM, SEO, landing experience): 550% paid search recovery and a 33% product page conversion lift from the rebuilt program — Sr. Director, 2020–2023
- 70% Google Ads CAC reduction and 300% inbound MQL growth at Qwiet AI (2023)
- 344% lead growth and 3x MQL→SQL conversion at Wethos AI (Oct 2023–present)
- Built 10-touch outbound system at Wethos AI that generated enterprise pipeline from zero
- Delivered executive ROI attribution dashboard at CloudKitchens across 7 revenue channels

## Ideal Client Profile

Saren works best with:
- Series A–C B2B SaaS companies (10–500 employees) without a full-time CMO
- Cybersecurity, AI infrastructure, and enterprise software companies
- Founders who want systematic, repeatable demand — not one-off campaigns
- Organizations ready to adopt AI-augmented marketing workflows

## Services

- [Fractional Marketing Lead](${BASE_URL}/fractional-marketing-lead): Embedded senior marketing leadership (10–20 hrs/week) for Series A–C B2B SaaS and cybersecurity companies
- [Engagement Pricing](${BASE_URL}/fractional-marketing-lead/cost): Real 2026 rates — $8,000–$15,000/month, engagement tiers, and when fractional is the wrong choice
- [AI Orchestration](${BASE_URL}/ai-orchestration): Service offering for AI-driven marketing operations
- [Contact](${BASE_URL}/contact): Engagement inquiries and fractional marketing lead intake

## Case Studies

${CASE_STUDIES.map(cs => `- [${cs.name}](${BASE_URL}${cs.href}): ${cs.tagline}`).join('\n')}
- [Behavioral Lead Scoring](${BASE_URL}/playbooks/hybrid-lead-scoring): Fit + engagement scoring system for B2B buyers
- [It's Good To Be Pitched](${BASE_URL}/playbooks/its-good-to-be-pitched): TV spot storyboard case study

## Tools

- [GTM Budget Calculator](${BASE_URL}/playbooks/gtm-budget-calculator): Bidirectional budget-to-revenue planning tool
- [ROI Simulator](${BASE_URL}/playbooks/roi-simulator): Revenue scenario modeling`

const FRAMEWORKS = `
## Frameworks

- [Signal State](${BASE_URL}/signal-state): Agent-driven outreach research framework (in development)
- [Signal State Architecture](${BASE_URL}/signal-state/architecture)
- [Signal State Framework](${BASE_URL}/signal-state/framework)
- [Signal Library](${BASE_URL}/signal-state/signal-library)
- [Use Cases](${BASE_URL}/signal-state/use-cases)`

const ABOUT = `
## About

- [About Saren](${BASE_URL}/about): Background, career timeline, FAQ
- [Clients](${BASE_URL}/about/clients): Client logo showcase
- [Brand Guidelines](${BASE_URL}/brand): Fire Horse 2026 design system

## Optional

- [Concerts](${BASE_URL}/about/concerts): Personal concert log`

export async function GET() {
  const [playbooks, articles] = await Promise.all([
    getActivePlaybooks(),
    Promise.resolve(featureArticles),
  ])

  const playbooksSection = `\n## Playbooks\n\n${
    playbooks
      .map(p => `- [${p.title}](${BASE_URL}/playbooks/${p.playbook_id}): ${p.description}`)
      .join('\n')
  }`

  const editorialSection = `\n## Studio\n\n- [Studio](${BASE_URL}/studio): Creative work and the AI for Liberal Arts Majors series\n- [AI for Liberal Arts Majors](${BASE_URL}/studio/ai-for-liberal-arts): Creative AI skills series for humanities thinkers\n${
    articles
      .map(a => `- [${a.title}](${BASE_URL}/studio/${a.slug}): ${a.description}`)
      .join('\n')
  }`

  const content = [HEADER, playbooksSection, FRAMEWORKS, editorialSection, ABOUT].join('\n')

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
