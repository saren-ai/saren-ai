import { getActivePlaybooks } from '@/lib/playbooks'
import { featureArticles } from '@/lib/feature'

export const dynamic = 'force-static'

const BASE_URL = 'https://saren.ai'

const HEADER = `# Saren.ai — Fractional CMO & AI Marketing Operations

> Saren Sakurai is a fractional CMO and AI operations consultant based in Orange County, California. He helps early-stage and Series A founders in SaaS, cybersecurity, and AI build AI-powered demand generation systems that produce predictable revenue. Notable work includes scaling demand at Cylance ($1.4B BlackBerry acquisition), Qwiet AI, and WethosAI — with documented results including 344% inbound lift, 70% CAC reduction, and 550% pipeline expansion.

## What Saren Does (Capabilities)

Saren Sakurai specializes in:

- **AI-Native Marketing Operations**: Building multi-agent GTM systems using Claude, Model Context Protocol (MCP), and agentic workflows to automate research, scoring, and outreach at scale
- **Demand Generation Engineering**: Treating demand gen as a software system — funnel architecture, predictive lead scoring, full-funnel attribution, and signal-based pipeline orchestration
- **Answer Engine Optimization (AEO)**: Structuring B2B content and JSON-LD schemas to appear in AI-generated answers from Perplexity, ChatGPT, Claude, and other LLM-powered engines
- **Intent Data Activation**: Operationalizing Bombora and first-party intent signals into tiered outreach sequences and pipeline acceleration programs
- **Fractional CMO**: 10–20 hours/week embedded marketing leadership for Series A–C B2B SaaS and cybersecurity companies without a full-time CMO
- **HubSpot Architecture**: Technical design of HubSpot instances — lifecycle stages, lead scoring properties, workflow automation, and CRM data hygiene

## Key Results (Documented)

- 550% pipeline expansion at Cylance (AI-native cybersecurity, $1.4B BlackBerry exit)
- 70% CAC reduction via behavioral lead scoring and funnel architecture redesign
- 344% inbound lift from intent-led content and programmatic demand programs
- Built 10-touch outbound system at WethosAI that generated enterprise pipeline from zero
- Delivered executive ROI attribution dashboard at CloudKitchens across 7 revenue channels

## Ideal Client Profile

Saren works best with:
- Series A–C B2B SaaS companies (10–500 employees) without a full-time CMO
- Cybersecurity, AI infrastructure, and enterprise software companies
- Founders who want systematic, repeatable demand — not one-off campaigns
- Organizations ready to adopt AI-augmented marketing workflows

## Services

- [AI Orchestration](${BASE_URL}/ai-orchestration): Service offering for AI-driven marketing operations
- [Contact](${BASE_URL}/contact): Engagement inquiries and fractional CMO intake

## Case Studies

- [10-Touch Sales Play](${BASE_URL}/case-studies/10-touch-sales-play): Multi-touch outbound system for senior AI executive buyers, built at WethosAI
- [120-Day Content Journey](${BASE_URL}/case-studies/120-day-content-journey): Buyer journey demand engine architected at Cylance
- [Authority Engineering](${BASE_URL}/case-studies/authority-engineering): Building category authority through structured content
- [Behavioral Lead Scoring](${BASE_URL}/playbooks/hybrid-lead-scoring): Fit + engagement scoring system for B2B buyers
- [Dynamic Nurture](${BASE_URL}/case-studies/dynamic-nurture): Behavior-driven email and content nurture sequences
- [Executive Dashboard](${BASE_URL}/case-studies/executive-dashboard): Full-funnel ROI attribution dashboard built at CloudKitchens
- [Intent Data](${BASE_URL}/case-studies/intent-data): Intent signal capture and activation
- [It's Good To Be Pitched](${BASE_URL}/playbooks/its-good-to-be-pitched): TV spot storyboard case study
- [Sovereign Personas](${BASE_URL}/case-studies/sovereign-personas): Buyer persona framework for sovereign cloud infrastructure
- [Thought Leadership Development](${BASE_URL}/case-studies/thought-leadership-development): Executive thought leadership programs

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

  const editorialSection = `\n## Editorial\n\n- [Feature Articles](${BASE_URL}/feature): Magazine-style essays on personal projects and creative work\n${
    articles
      .map(a => `- [${a.title}](${BASE_URL}/feature/${a.slug}): ${a.description}`)
      .join('\n')
  }`

  const content = [HEADER, playbooksSection, FRAMEWORKS, editorialSection, ABOUT].join('\n')

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
