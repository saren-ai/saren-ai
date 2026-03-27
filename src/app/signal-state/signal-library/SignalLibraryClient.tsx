'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

interface SignalItem {
  text: string
  tool?: string
  tag?: string
}

interface SignalCategory {
  id: string
  title: string
  description: string
  tools?: string
  signals?: SignalItem[]
}

// ─── Ransomware Vulnerability Signal Data ────────────────────────────────────

const RANSOMWARE_CATEGORIES: SignalCategory[] = [
  {
    id: 'exposed-infra',
    title: '1. Exposed Infrastructure & Services',
    description: 'Signals visible via Shodan, Censys, Nmap, or similar passive recon tools.',
    tools: 'Shodan, Censys, FOFA, SSL Labs, MXToolbox, Subfinder, Amass',
    signals: [
      { text: 'RDP (port 3389) exposed to the public internet' },
      { text: 'SMB (port 445) facing externally — should never be open' },
      { text: 'Telnet, FTP, or other legacy protocols visible' },
      { text: 'Outdated VPN appliances with known CVEs (Pulse Secure, Fortinet, Citrix, SonicWall)', tool: 'Shodan' },
      { text: 'Web servers leaking version info in HTTP headers (Apache 2.2, IIS 7.x, etc.)' },
      { text: 'Unpatched public-facing CMS (WordPress, Drupal, Joomla)', tool: 'WPScan' },
      { text: 'Open database ports (3306 MySQL, 5432 Postgres, 27017 Mongo) visible externally' },
      { text: 'SNMP, Telnet, or management interfaces exposed on network edge devices' },
      { text: 'Misconfigured cloud storage (public S3 buckets, Azure Blob, GCP storage)' },
      { text: 'Subdomain sprawl — forgotten subdomains running old/unmaintained software' },
      { text: 'Staging or dev environments publicly accessible (often less patched than prod)' },
      { text: 'Self-signed or expired SSL certificates on public properties', tool: 'SSL Labs' },
      { text: 'Weak cipher suites or TLS 1.0/1.1 still enabled', tool: 'SSL Labs' },
      { text: 'Open LDAP or Active Directory endpoints' },
      { text: 'Publicly accessible admin panels (phpMyAdmin, Webmin, cPanel, etc.)' },
    ],
  },
  {
    id: 'email-domain',
    title: '2. Email & Domain Security Posture',
    description: 'Misconfigurations here signal organization-wide security hygiene failures.',
    tools: 'MXToolbox, dmarcian, EmailRep, Hunter.io, DNSdumpster',
    signals: [
      { text: 'Missing or broken SPF record' },
      { text: 'Missing DKIM configuration' },
      { text: 'Missing or unenforced DMARC (policy set to p=none)' },
      { text: 'No BIMI record (minor, but signals maturity level)' },
      { text: 'Domain registered through low-cost/low-oversight registrar with no lock' },
      { text: 'No domain monitoring or brand protection service apparent' },
      { text: 'Similar typosquat domains registered by third parties' },
      { text: 'Old MX records pointing to deprecated mail systems' },
      { text: 'Catch-all email config leaking address enumeration' },
      { text: 'Executive email addresses exposed in public sources (conference speaker bios, press releases)' },
    ],
  },
  {
    id: 'credential',
    title: '3. Credential & Breach Exposure',
    description: 'Past breaches often go unaddressed — especially in under-resourced orgs.',
    tools: 'HaveIBeenPwned, DeHashed, LeakIX, GitLeaks, TruffleHog, IntelligenceX, Flare.io',
    signals: [
      { text: 'Company domain appearing in HaveIBeenPwned breach database', tool: 'HIBP' },
      { text: 'Employee credentials (especially IT/admin staff) surfacing in combo lists or paste sites' },
      { text: 'Credentials for internal tools (VPNs, admin portals) found on dark web forums' },
      { text: 'Reused passwords across services visible in breach data' },
      { text: 'Executive or C-suite personal email accounts tied to work domains in breaches' },
      { text: 'GitHub repos (personal or org) leaking API keys, .env files, hardcoded credentials', tool: 'GitLeaks' },
      { text: 'Slack tokens, AWS keys, or DB strings found in public code commits', tool: 'TruffleHog' },
      { text: 'Pastebin / Ghostbin dumps referencing the company' },
    ],
  },
  {
    id: 'org-signals',
    title: '4. Organizational Signals (LinkedIn & Job Boards)',
    description: 'LinkedIn and job postings are underrated threat intelligence sources.',
    tools: 'LinkedIn (Sales Navigator), Indeed, Glassdoor, Wellfound, Levels.fyi',
    signals: [
      { text: 'No CISO, VP of Security, or equivalent in org chart', tag: 'Security Team Gaps' },
      { text: 'Security team is 1–2 people for a 500+ employee org', tag: 'Security Team Gaps' },
      { text: 'IT team appears to be generalists with no security specialization', tag: 'Security Team Gaps' },
      { text: 'No dedicated SOC, IR, or threat intelligence function visible', tag: 'Security Team Gaps' },
      { text: 'Security roles have high turnover (same position reposted repeatedly)', tag: 'Security Team Gaps' },
      { text: 'No security certifications visible among IT staff (CISSP, CISM, CEH, OSCP)', tag: 'Security Team Gaps' },
      { text: 'Postings reference end-of-life technologies: "Windows Server 2008/2012"', tag: 'Job Posting Signals' },
      { text: 'Postings indicate still on-prem for everything — no cloud migration planned', tag: 'Job Posting Signals' },
      { text: 'IT job descriptions are catch-all: "handle helpdesk AND network AND security AND compliance"', tag: 'Job Posting Signals' },
      { text: 'Security roles posted as entry-level or paying below market (signals deprioritization)', tag: 'Job Posting Signals' },
      { text: 'Postings for IR or security roles after a likely breach', tag: 'Job Posting Signals' },
      { text: 'Short average tenure in IT/security roles (< 18 months)', tag: 'Staffing Signals' },
      { text: 'CTO or CISO recently departed — leadership vacuum creates security gaps', tag: 'Staffing Signals' },
      { text: 'IT staff listed as contractors, not FTEs — less accountability and continuity', tag: 'Staffing Signals' },
    ],
  },
  {
    id: 'employee-osint',
    title: '5. Employee OSINT Signals',
    description: 'Employees are the attack surface. What they share publicly tells you a lot.',
    tools: 'LinkedIn, GitHub, Twitter/X, Reddit, Glassdoor, Google Dorks, Maltego, SpiderFoot',
    signals: [
      { text: 'IT/DevOps employees listing specific internal tools on LinkedIn (Cisco ASA, SolarWinds, specific SIEM)', tag: 'Technical Exposure' },
      { text: 'Developers with public GitHub repos that touch internal infrastructure', tag: 'Technical Exposure' },
      { text: 'Employees with .company.com emails visible in public commit history', tag: 'Technical Exposure' },
      { text: 'Stack Overflow / Reddit posts from employees asking about specific internal configs', tag: 'Technical Exposure' },
      { text: 'Employees sharing office photos that reveal screen contents, badge designs, floor layouts', tag: 'Social Engineering' },
      { text: 'New hire announcements that enumerate internal systems', tag: 'Social Engineering' },
      { text: 'Glassdoor reviews complaining about IT being "overwhelmed", "understaffed", "slow to respond"', tag: 'Culture Signals' },
      { text: 'No visible security culture artifacts (no mention of security in job descriptions across non-IT roles)', tag: 'Culture Signals' },
    ],
  },
  {
    id: 'vendor-supply',
    title: '6. Vendor & Supply Chain Signals',
    description: 'Third-party relationships expand attack surface — and most orgs don\'t monitor them.',
    tools: 'LinkedIn, job postings, vendor news monitoring',
    signals: [
      { text: 'Extensive use of small/unvetted SaaS vendors visible in job postings or LinkedIn profiles' },
      { text: 'IT managed by an MSP — MSPs are high-value targets that give lateral access to all clients' },
      { text: 'MSP used is small and unlikely to have robust security practices of its own' },
      { text: 'No visible third-party risk management program' },
      { text: 'Company listed as customer of a recently breached vendor' },
      { text: 'Public-facing integrations with known vulnerable platforms' },
    ],
  },
  {
    id: 'financial',
    title: '7. Financial & Operational Stress Signals',
    description: 'Financially stressed orgs defer security spend. Ransomware operators know this.',
    tools: 'Crunchbase, PitchBook, SEC EDGAR, local court records, LinkedIn, news alerts',
    signals: [
      { text: 'Recent layoffs, especially in IT' },
      { text: 'Public funding struggles, bankruptcy filings, or distressed financials' },
      { text: 'Active M&A — acquiring or being acquired creates network integration gaps' },
      { text: 'Aggressive cost-cutting messaging from leadership (public statements, press)' },
      { text: 'Moving to lower-cost IT infrastructure visible through job postings or LinkedIn' },
      { text: 'Non-profit, municipality, school district, or healthcare — structurally underfunded for security' },
    ],
  },
  {
    id: 'incident-history',
    title: '8. Incident History & Response Maturity',
    description: 'Past behavior predicts future exposure.',
    tools: 'News search, EDGAR, domain root checks, vendor directories',
    signals: [
      { text: 'Prior breach or ransomware event reported in news — many orgs get hit twice' },
      { text: 'No public incident response policy or security disclosure page' },
      { text: 'No bug bounty or responsible disclosure program' },
      { text: 'Security.txt missing from domain root (minor but a maturity signal)' },
      { text: 'No visible relationship with a MSSP, MDR provider, or IR retainer firm' },
      { text: 'No security certifications visible (SOC 2, ISO 27001, NIST CSF self-attestation)' },
      { text: 'Compliance-only security posture (HIPAA/PCI checkbox behavior vs. actual controls)' },
    ],
  },
]

// ─── Org Dysfunction Signal Data ─────────────────────────────────────────────

interface OrgCategory {
  id: string
  title: string
  description: string
  tools?: string
  signals?: SignalItem[]
  sectorRows?: Array<{ sector: string; patterns: string }>
}

const ORG_DYSFUNCTION_CATEGORIES: OrgCategory[] = [
  {
    id: 'od-employee-reviews',
    title: '1. Employee Review Signals',
    description: 'The most direct window into culture short of being inside it.',
    tools: 'Glassdoor, Blind, Indeed, Comparably, Levels.fyi, Teamblind',
    signals: [
      { text: 'Overall Glassdoor score below 3.2 for a company 200+ employees', tag: 'Quantitative' },
      { text: 'CEO approval rating below 60%', tag: 'Quantitative' },
      { text: 'Score trending downward over 12–18 months with no visible external crisis', tag: 'Quantitative' },
      { text: 'High variance in scores — 1s and 5s dominate, few 3s — signals internal factions', tag: 'Quantitative' },
      { text: 'Culture & Values sub-score significantly lower than Compensation sub-score', tag: 'Quantitative' },
      { text: 'Work/Life Balance score declining while headcount grows', tag: 'Quantitative' },
      { text: 'Recommend to a Friend percentage below 50%', tag: 'Quantitative' },
      { text: 'Recurring words: "siloed," "politics," "no accountability," "leadership doesn\'t listen," "good people keep leaving"', tag: 'Qualitative' },
      { text: '"Pros" section is always the same — free snacks, good benefits, nice office — no mention of meaningful work', tag: 'Qualitative' },
      { text: '"Great place to work if you keep your head down" — culturally damning', tag: 'Qualitative' },
      { text: '"Nothing changes despite constant feedback" — signals broken feedback loops', tag: 'Qualitative' },
      { text: 'Reviews mention specific leaders by name negatively across multiple independent posts', tag: 'Qualitative' },
      { text: 'Positive reviews feel templated or incentivized — suspiciously similar language, posted in clusters', tag: 'Qualitative' },
      { text: 'Leadership responses are defensive, absent, or copy-paste non-answers', tag: 'Qualitative' },
      { text: '"Lots of meetings, nothing gets decided" — execution paralysis', tag: 'Qualitative' },
      { text: 'Constant reorgs mentioned as a recurring complaint, not a one-time event', tag: 'Qualitative' },
      { text: '"Great vision, terrible execution" — strategy/execution gap signal', tag: 'Qualitative' },
      { text: 'Reviews on Blind (anonymous) are significantly harsher than Glassdoor — signals fear of retaliation', tag: 'Qualitative' },
    ],
  },
  {
    id: 'od-linkedin',
    title: '2. LinkedIn Signals',
    description: 'Tenure, structure, and movement patterns tell a detailed story.',
    tools: 'LinkedIn (Sales Navigator), LinkedIn Talent Insights, SignalHire, Revelio Labs',
    signals: [
      { text: 'Average tenure in mid-level roles under 18 months', tag: 'Turnover & Attrition' },
      { text: 'VP and Director titles cycling every 12–24 months', tag: 'Turnover & Attrition' },
      { text: 'Same roles reposted every 6–9 months with minor title tweaks', tag: 'Turnover & Attrition' },
      { text: 'Turnover concentrated in specific functions — usually closest to the dysfunction', tag: 'Turnover & Attrition' },
      { text: 'Alumni network disproportionately large relative to current headcount — years of churn', tag: 'Turnover & Attrition' },
      { text: 'High volume of "open to work" badges among recently departed employees', tag: 'Turnover & Attrition' },
      { text: 'Employees consistently leaving for competitors or to start their own thing', tag: 'Turnover & Attrition' },
      { text: 'Title inflation — 8 "Chiefs," 15 "VPs" in a 300-person company', tag: 'Org Structure' },
      { text: 'Excessive reporting layers — 6+ levels between CEO and front-line', tag: 'Org Structure' },
      { text: 'Contradictory or overlapping titles — two "Head of Product" equivalents, unclear ownership', tag: 'Org Structure' },
      { text: 'No visible career ladder — junior titles jump to senior with nothing between', tag: 'Org Structure' },
      { text: 'Contractor-heavy functions — signals inability to retain or unwillingness to commit', tag: 'Org Structure' },
      { text: 'Function appears centralized under one executive with no peers — single point of failure', tag: 'Org Structure' },
      { text: 'C-suite or VP hires that disappear quietly within 18 months', tag: 'Leadership Movement' },
      { text: 'Multiple interim or acting titles — Interim CMO, Acting CTO — seats can\'t stay filled', tag: 'Leadership Movement' },
      { text: 'Executives hired from outside who never make LinkedIn posts after joining', tag: 'Leadership Movement' },
      { text: 'Leadership team homogeneity — all from 2–3 same companies or schools — insularity signal', tag: 'Leadership Movement' },
      { text: 'Founder still controls all key decisions visibly — board/leadership team is decorative', tag: 'Leadership Movement' },
      { text: 'New hires announced with fanfare, then silently gone with no announcement', tag: 'Leadership Movement' },
      { text: 'Headcount grew fast then reversed sharply — whiplash hiring', tag: 'Growth Pattern' },
      { text: 'Hiring in non-core functions while product/engineering shrinks', tag: 'Growth Pattern' },
      { text: 'Sales headcount exceeds product/engineering headcount significantly — selling ahead of capability', tag: 'Growth Pattern' },
      { text: 'No recent hires in functions that would indicate strategic priority', tag: 'Growth Pattern' },
    ],
  },
  {
    id: 'od-job-postings',
    title: '3. Job Posting Signals',
    description: 'What and how they hire reveals how they think and what they\'re struggling with.',
    tools: 'LinkedIn Jobs, Indeed, Greenhouse (public), Lever (public), BuiltIn, Wellfound, Glassdoor Jobs',
    signals: [
      { text: 'Contradictory requirements — "startup mentality" + "strict process" + "work independently" + "collaborate constantly"', tag: 'Role Design' },
      { text: 'Impossible scope — one person expected to own strategy, execution, reporting, and tooling solo', tag: 'Role Design' },
      { text: 'Vague success metrics — no OKRs, KPIs, or outcomes defined for the role', tag: 'Role Design' },
      { text: 'JD written by committee — incoherent voice, laundry list of tools with no throughline', tag: 'Role Design' },
      { text: 'Overemphasis on "culture fit" without defining what that culture is', tag: 'Role Design' },
      { text: 'No mention of team structure, reporting relationships, or who you\'d work with', tag: 'Role Design' },
      { text: 'Wide compensation bands — signals they don\'t know what the role is worth', tag: 'Role Design' },
      { text: '"Chief of Staff to the Chief of Staff," hyper-specialized roles in a 200-person company', tag: 'Role Design' },
      { text: 'Same role reposted every few months — revolving door', tag: 'Org Pattern' },
      { text: 'Roles posted but never filled — headcount approved but dysfunctional hiring process blocks it', tag: 'Org Pattern' },
      { text: 'Multiple roles across functions all posted at once — recent mass departure event', tag: 'Org Pattern' },
      { text: 'Backfill roles for people who just joined 6 months ago — quick churn', tag: 'Org Pattern' },
      { text: 'Roles that replicate existing titles — duplication, unclear ownership', tag: 'Org Pattern' },
      { text: 'Security, compliance, or risk roles posted reactively after an incident or audit', tag: 'Org Pattern' },
      { text: 'Hiring heavily in one area while publicly saying another is the priority', tag: 'Strategic Priority' },
      { text: 'No hiring in areas they claim are strategic — roadmap vs. reality gap', tag: 'Strategic Priority' },
      { text: 'Hiring offshore or contract for functions that should be core competencies', tag: 'Strategic Priority' },
    ],
  },
  {
    id: 'od-press-pr',
    title: '4. Press, PR & Public Narrative Signals',
    description: 'What they say publicly vs. what\'s observable.',
    tools: 'Google News alerts, Crunchbase, PitchBook, PRNewswire, Business Wire, SEC EDGAR',
    signals: [
      { text: 'Rebrand or pivot every 18–24 months without clear narrative', tag: 'Strategic Incoherence' },
      { text: 'Mission statement changes that don\'t track any obvious strategic shift', tag: 'Strategic Incoherence' },
      { text: 'Multiple "transformation" announcements over 3–5 years — perpetual reinvention, no execution', tag: 'Strategic Incoherence' },
      { text: 'Press releases about strategic initiatives with no follow-up evidence of delivery', tag: 'Strategic Incoherence' },
      { text: 'Product announcements that don\'t ship or ship severely late', tag: 'Strategic Incoherence' },
      { text: 'Investor/analyst day targets that get quietly revised downward', tag: 'Strategic Incoherence' },
      { text: '"Best Place to Work" awards paired with Glassdoor scores that tell the opposite story', tag: 'Culture Washing' },
      { text: 'Executives speaking publicly on culture while internal reviews are in decline', tag: 'Culture Washing' },
      { text: 'Heavy DEI communications externally while internal representation data is absent or stagnant', tag: 'Culture Washing' },
      { text: 'Published company values that employees explicitly mock in reviews', tag: 'Culture Washing' },
      { text: 'Public layoff announcements framed as "investing in our future" or "strategic restructuring"', tag: 'Culture Washing' },
      { text: 'Executive exits framed as "pursuing other opportunities" in rapid succession', tag: 'Leadership Gaps' },
      { text: 'No external visibility for the CEO or leadership team — silence signals bunker mentality', tag: 'Leadership Gaps' },
      { text: 'Leadership over-indexed on media and speaking circuits vs. operational presence', tag: 'Leadership Gaps' },
      { text: 'Founder/CEO doing all the talking while leadership team is invisible', tag: 'Leadership Gaps' },
    ],
  },
  {
    id: 'od-financial',
    title: '5. Financial & Investor Signals',
    description: 'Capital behavior reflects leadership confidence and organizational health.',
    tools: 'Crunchbase, PitchBook, SEC EDGAR, Bloomberg, S&P Capital IQ, CB Insights',
    signals: [
      { text: 'Flat or declining revenue per employee over time — productivity falling' },
      { text: 'Burn rate increasing without proportional headcount or revenue growth' },
      { text: 'Multiple down rounds or flat rounds — investor confidence lost' },
      { text: 'High G&A spend relative to R&D and Sales — overhead-heavy, top-heavy org' },
      { text: 'Auditor changes, particularly to a lesser-known firm' },
      { text: 'Late or restated financial filings — internal chaos bleeding into governance' },
      { text: 'Activist investor presence — signals board-level dysfunction' },
      { text: 'Debt restructuring or covenant waivers — financial stress cascading into operational paralysis' },
      { text: 'Announced partnerships that produce no visible output — relationship theater' },
      { text: 'Revenue growth decelerating faster than peers in same market' },
      { text: 'Acqui-hire attempts or asset sales while publicly claiming growth mode' },
    ],
  },
  {
    id: 'od-product',
    title: '6. Product & Delivery Signals',
    description: 'Broken organizations ship broken products — or nothing.',
    tools: 'G2, Capterra, Trustpilot, App Store/Play Store reviews, ProductHunt, status.io pages, Changelog tracking',
    signals: [
      { text: 'Publicly promised roadmap features that never ship' },
      { text: 'Product changelog sparse or stops updating — dev velocity collapsed' },
      { text: 'App store reviews mention the same bugs for 12+ months without resolution' },
      { text: 'Public API or developer docs go stale — no one owns the outward-facing layer' },
      { text: 'Multiple product pivots without a clear customer feedback loop driving them' },
      { text: 'Status page incidents that are long, poorly communicated, or recurring' },
      { text: 'Customer support response time degradation visible in review trends' },
      { text: 'NPS or G2/Capterra scores declining while marketing spend increases' },
      { text: 'Feature releases are cosmetic — UI changes, rebrands — not functional improvements' },
      { text: 'Enterprise product behaves like a perpetual beta — signals no stable release discipline' },
    ],
  },
  {
    id: 'od-social',
    title: '7. Social & Content Signals',
    description: 'How they communicate externally reflects internal coherence — or the lack of it.',
    tools: 'LinkedIn Analytics (public engagement), SparkToro, SimilarWeb, Social Blade, Brandwatch',
    signals: [
      { text: 'Inconsistent brand voice across channels — no one owns or enforces it' },
      { text: 'Long gaps in content production followed by bursts — no sustainable rhythm or strategy' },
      { text: 'Executive thought leadership that\'s generic, ghostwritten, disconnected from company reality' },
      { text: 'Social media responses to criticism are defensive, delayed, or ignored' },
      { text: 'Thought leadership that\'s all assertion, no data — no internal knowledge infrastructure' },
      { text: 'Employee advocacy programs generating zero organic amplification — employees don\'t want to share' },
      { text: 'Event presence declining — pulling out of conferences, smaller booths, fewer sponsorships' },
      { text: 'Blog posts that announce initiatives, never follow up with results' },
      { text: 'Social following growing but engagement flat or declining — bought or passive audience' },
      { text: 'Corporate account posting about values while employees are publicly venting on the same platform' },
    ],
  },
  {
    id: 'od-customer',
    title: '8. Customer & Partner Signals',
    description: 'How the market experiences the org is a direct proxy for how it operates internally.',
    tools: 'G2, Capterra, Trustpilot, partner forums, community boards',
    signals: [
      { text: 'High-profile customer churns reported in press or observable through case study removal' },
      { text: 'References and case studies go stale — same customers cited for 3+ years' },
      { text: 'Partnerships announced with no visible co-marketing, integration, or follow-through' },
      { text: 'Channel/reseller complaints visible on partner forums or community boards' },
      { text: 'NPS or satisfaction scores self-reported with suspicious consistency (never changes)' },
      { text: 'Support ticket backlogs visible through community complaints or third-party forums' },
      { text: 'Enterprise customer reviews on G2 mention implementation problems, not just feature gaps' },
      { text: 'Pricing changes without communication — signals desperation or poor planning' },
      { text: 'Customer community or user group activity declining' },
    ],
  },
  {
    id: 'od-sector',
    title: '9. Sector-Specific Dysfunction Patterns',
    description: 'Some industries have structural dysfunction that compounds internal issues.',
    sectorRows: [
      { sector: 'Enterprise SaaS', patterns: 'Overhiring in sales ahead of product maturity; long implementation cycles masking churn' },
      { sector: 'Healthcare Systems', patterns: 'Regulatory-driven conservatism slowing innovation; IT fragmentation across acquired entities' },
      { sector: 'Financial Services', patterns: 'Risk committee paralysis; shadow IT proliferating due to slow central IT' },
      { sector: 'Manufacturing', patterns: 'IT/OT organizational split; generational leadership resistant to digital transformation' },
      { sector: 'Professional Services', patterns: 'Partner power structures blocking operational reform; billable hour incentives vs. efficiency' },
      { sector: 'Government / Public Sector', patterns: 'Procurement cycles that outlast the problem they\'re solving; no accountability for non-delivery' },
      { sector: 'Media / Publishing', patterns: 'Platform dependency creating strategic paralysis; cost-cutting destroying institutional knowledge' },
      { sector: 'Retail', patterns: 'Store-digital split creating competing P&Ls and misaligned incentives' },
      { sector: 'Higher Education', patterns: 'Faculty governance slowing administrative modernization; IT balkanized by department' },
    ],
  },
  {
    id: 'od-misalignment',
    title: '10. Misalignment-Specific Signals',
    description: 'Strategic or cross-functional misalignment vs. pure culture issues.',
    signals: [
      { text: 'Sales and Marketing using different language to describe the product publicly' },
      { text: 'Product roadmap not referenced in any sales or marketing material' },
      { text: 'CEO messaging contradicts what Sales is telling the market' },
      { text: 'PR announcements about features that Sales reps don\'t know about' },
      { text: 'Multiple "official" pricing pages with different numbers' },
      { text: 'Competing product lines or SKUs that appear to cannibalize each other' },
      { text: 'Partnership announcements that the partner\'s team doesn\'t seem to know about' },
      { text: 'Different teams claiming ownership of the same customer segment publicly' },
      { text: 'Employee LinkedIn posts that contradict company positioning' },
      { text: '"Strategy" docs surfacing through employee departures that don\'t match public narrative' },
    ],
  },
]

// ─── Creative Struggle Signal Data ───────────────────────────────────────────

interface CreativeCategory {
  id: string
  title: string
  description: string
  tools?: string
  signals?: SignalItem[]
  lists?: string[]
  queryLogic?: string
}

const CREATIVE_STRUGGLE_CATEGORIES: CreativeCategory[] = [
  {
    id: 'cs-linkedin',
    title: '1. LinkedIn Signals',
    description: 'Richest source for both personas. Explicit statements, profile structure, and transition patterns all readable.',
    tools: 'LinkedIn Sales Navigator, LinkedIn Talent Insights, PhantomBuster, Expandi',
    signals: [
      { text: '"Looking for a creative partner for a pitch"', tag: 'Explicit Pain' },
      { text: '"Anyone know a good freelance strategist?"', tag: 'Explicit Pain' },
      { text: '"Wish I had a strategist on this one"', tag: 'Explicit Pain' },
      { text: '"Does anyone else find the strategy/brief part the hardest?"', tag: 'Explicit Pain' },
      { text: '"I\'m a one-person shop and..."', tag: 'Explicit Pain' },
      { text: '"Pitching [Brand] next week and..." — solo pitch in progress', tag: 'Explicit Pain' },
      { text: '"Lost the pitch" + "needed stronger positioning"', tag: 'Explicit Pain' },
      { text: '"Thinking about going freelance" from senior agency creatives — pre-transition signal', tag: 'Explicit Pain' },
      { text: '"My decks look great but I struggle with the why"', tag: 'Explicit Pain' },
      { text: '"How do solo strategists handle the creative side?"', tag: 'Explicit Pain' },
      { text: 'Title: "Freelance Creative Director," "Independent Art Director," "Brand Consultant," "Independent Strategist"', tag: 'Profile Signal' },
      { text: '"Available for projects" or "Open to freelance" in headline', tag: 'Profile Signal' },
      { text: 'Portfolio links present but no strategic/case study language anywhere — Persona A', tag: 'Profile Signal' },
      { text: 'Skills list is 90% execution tools (Figma, After Effects, InDesign) with zero strategy vocabulary', tag: 'Profile Signal' },
      { text: 'Skills list is 90% strategy vocabulary with zero creative tool mentions — Persona B', tag: 'Profile Signal' },
      { text: 'Agency background 5–15 years, recently went independent', tag: 'Profile Signal' },
      { text: '"Collaborating with brands on..." language — solo operator trying to sound like an agency', tag: 'Profile Signal' },
      { text: 'Left an agency in the last 6 months — gap not yet fully felt but coming', tag: 'Transition Signal' },
      { text: 'Recently promoted to Creative Director — now expected to pitch, not just execute', tag: 'Transition Signal' },
      { text: '"Excited to announce I\'m starting my own studio/consultancy" — the moment the gap becomes real', tag: 'Transition Signal' },
      { text: 'Job history shows agency → agency → freelance trajectory', tag: 'Transition Signal' },
    ],
    queryLogic: `("freelance" OR "independent") AND ("creative director" OR "art director") AND ("brand" OR "pitch" OR "agency")

("strategist" OR "brand consultant") AND ("freelance" OR "independent") AND NOT ("agency" OR "firm")

("just went independent" OR "started my own" OR "one person shop") AND ("creative" OR "strategy" OR "brand")`,
  },
  {
    id: 'cs-twitter',
    title: '2. Twitter/X Signals',
    description: 'Where creatives and strategists vent in real time. High signal-to-noise for acute pain.',
    tools: 'Brandwatch, Audiense, SparkToro, TweetDeck, Followerwonk, Twint',
    signals: [
      { text: '"I can make it beautiful but I have no idea how to pitch the strategy"', tag: 'Persona A (Creative)' },
      { text: '"Does anyone else freeze when clients ask about the business case"', tag: 'Persona A (Creative)' },
      { text: '"Spent all week on a deck that looks amazing and lost because the brief was weak"', tag: 'Persona A (Creative)' },
      { text: '"Being a solo creative director is wild — you have to be everything"', tag: 'Persona A (Creative)' },
      { text: '"I need a strategist brain in a box"', tag: 'Persona A (Creative)' },
      { text: 'Threads about losing pitches where positioning is identified as the issue', tag: 'Persona A (Creative)' },
      { text: '"My decks are solid but they look like homework"', tag: 'Persona B (Strategist)' },
      { text: '"I need a designer but can\'t afford to bring someone in for every pitch"', tag: 'Persona B (Strategist)' },
      { text: '"Lost a pitch because the creative didn\'t match the thinking"', tag: 'Persona B (Strategist)' },
      { text: '"I\'ve been told my strategy is great but the presentation killed it"', tag: 'Persona B (Strategist)' },
      { text: '"How do solo strategists handle the creative side?"', tag: 'Persona B (Strategist)' },
      { text: '"Competing against agencies with a team of one"', tag: 'Universal Solo' },
      { text: '"The hardest part of freelance is doing everything yourself"', tag: 'Universal Solo' },
      { text: '"Pitch season is brutal when you\'re solo"', tag: 'Universal Solo' },
      { text: '"Is there a tool that can help with [strategy / design / decks] when you\'re solo?"', tag: 'Universal Solo' },
    ],
    queryLogic: `"solo creative" OR "one person agency" (pitch OR strategy OR deck)
"freelance strategist" (design OR creative OR deck)
"I need a strategist" (creative OR AD OR director)
"pitch deck" (solo OR freelance OR independent) (help OR struggle OR hard)
"going independent" (creative OR strategy OR agency) since:2024-01-01`,
  },
  {
    id: 'cs-reddit',
    title: '3. Reddit Signals',
    description: 'Unfiltered, anonymous, and often highly specific about pain. Best for message validation.',
    lists: [
      'r/advertising', 'r/freelance', 'r/graphic_design', 'r/brandstrategy',
      'r/marketing', 'r/agency', 'r/freelancedesigners', 'r/Entrepreneur', 'r/Copywriting',
    ],
    signals: [
      { text: '"How do you handle the strategy part of a pitch as a solo creative"' },
      { text: '"Freelance art director how do you write briefs"' },
      { text: '"Strategist without a design partner"' },
      { text: '"Pitch deck help" + freelance' },
      { text: '"Lost a pitch" + solo' },
      { text: '"One person agency" + challenges' },
      { text: '"How do you compete with full service agencies as a freelancer"' },
      { text: 'Posts asking for brief or strategy templates — actively trying to fake it' },
      { text: 'Posts asking for deck design help from people who self-identify as strategists' },
      { text: '"Is there an AI tool that can help with..." + strategy or creative' },
    ],
    queryLogic: `site:reddit.com/r/advertising "freelance" "pitch" "strategy"
site:reddit.com/r/freelance "creative director" "alone" "pitch"
site:reddit.com/r/brandstrategy "solo" "deck" "design"
site:reddit.com/r/graphic_design "strategy" "pitch" "don't know how"
site:reddit.com "one person agency" "pitch" "struggle"`,
  },
  {
    id: 'cs-portfolio',
    title: '4. Portfolio & Professional Platform Signals',
    description: 'What their public work presence reveals about the gap.',
    signals: [
      { text: '"Available for freelance" or "open to collaboration" in bio', tag: 'Behance / Dribbble' },
      { text: 'Case studies that are all visuals with zero strategic narrative — Persona A', tag: 'Behance / Dribbble' },
      { text: 'Portfolios with writing/strategy docs but no visual examples — Persona B', tag: 'Behance / Dribbble' },
      { text: 'Contact forms mentioning "looking for creative or strategy partners"', tag: 'Behance / Dribbble' },
      { text: 'Profiles offering both "creative direction" AND "brand strategy" as a solo service', tag: 'Upwork / Contra' },
      { text: 'Gig bundles: "I\'ll design your pitch deck AND the strategy" — explicit gap signal', tag: 'Upwork / Contra' },
      { text: 'Reviews: "great creative but needed more strategic depth" or vice versa', tag: 'Upwork / Contra' },
      { text: 'Client requests posted looking for "strategist + designer combo" — named gap', tag: 'Upwork / Contra' },
      { text: 'Profiles describing the service as "agency-quality, without agency overhead"', tag: 'Upwork / Contra' },
      { text: '"Available for freelance" + "creative director" on personal site', tag: 'Personal Sites' },
      { text: 'Case studies present but strategy/rationale sections are thin or absent', tag: 'Personal Sites' },
      { text: 'Contact page says "I work with a network of collaborators" — no actual team', tag: 'Personal Sites' },
    ],
    queryLogic: `site:behance.net "available for freelance" "creative director" "brand"
site:dribbble.com "open to work" "art director" "strategy"
site:contra.com "brand strategy" "pitch" "solo"
"available for freelance" "creative director" -site:linkedin.com -site:indeed.com
"open to projects" "brand strategy" "art direction"
"looking for collaborators" "pitch" site:*.com`,
  },
  {
    id: 'cs-substack',
    title: '5. Substack / Medium / Blog Signals',
    description: 'Strategists especially write about going solo. Creatives blog about craft. Both surfaces pain.',
    signals: [
      { text: '"What nobody tells you about going freelance from an agency"' },
      { text: '"Being a solo strategist means doing everything yourself"' },
      { text: '"I\'ve been pitching clients alone and here\'s what I\'ve learned"' },
      { text: '"The hardest part of running a one-person consultancy"' },
      { text: '"I lost a pitch and here\'s what I\'d do differently"' },
      { text: 'Essays about the gap between strategic quality and presentation quality' },
      { text: 'Posts about imposter syndrome related to the half of the job they weren\'t trained for' },
      { text: '"How I built a pitch deck without a strategist" — DIY workaround signal' },
      { text: '"Tools I use to punch above my weight as a solo creative/strategist"' },
      { text: 'Newsletter issues asking readers for tool recommendations' },
    ],
    queryLogic: `site:substack.com "freelance creative director" OR "solo strategist" "pitch"
site:medium.com "one person agency" OR "solo creative" "pitch deck"
"going independent" "agency" "pitch" "struggle" site:medium.com OR site:substack.com
"what nobody tells you" "freelance" ("creative" OR "strategy" OR "agency")`,
  },
  {
    id: 'cs-facebook',
    title: '6. Facebook Group Signals',
    description: 'Less visible but dense with mid-career practitioners who don\'t live on LinkedIn or Twitter.',
    lists: [
      'Freelance Creative Directors', 'Brand Strategy (various groups)', 'Independent Agency Owners',
      'Freelance Art Directors', 'Creative Business Owners', 'Graphic Design Freelancers',
      'The Strategy Collective', 'Brand and Marketing Professionals',
    ],
    signals: [
      { text: 'Asking for brief or strategy templates' },
      { text: 'Asking for deck design help' },
      { text: 'Posting decks for feedback' },
      { text: '"Does anyone else struggle with the [strategy / creative] side?"' },
      { text: '"Looking for a collaborator for a pitch this month"' },
      { text: 'Tool recommendation requests — especially for pitch or deck help' },
      { text: '"How do you compete with agencies when you\'re solo?"' },
    ],
  },
  {
    id: 'cs-job-boards',
    title: '7. Job Board Reverse Signals',
    description: 'People who recently left agency jobs and haven\'t settled into full-time roles yet.',
    signals: [
      { text: 'LinkedIn: filtered to "Freelance" or "Contract" in title + ex-agency background' },
      { text: 'Contra, Toptal, Worksome — senior creatives and strategists newly listed as independent' },
      { text: 'People who listed themselves as freelance after 5–10 year agency tenures' },
      { text: 'Postings looking for "collaborators" not employees — solo operator assembling a virtual team per-project' },
      { text: 'Agency postings for CD or Strategy Director with unusually high turnover — their employees are the ones going solo' },
      { text: 'People listing both strategy AND creative skills in the same profile — trying to cover both gaps' },
    ],
  },
  {
    id: 'cs-community',
    title: '8. Community & Slack/Discord Signals',
    description: 'Private but sometimes surfaceable through public-facing channels.',
    lists: [
      'Designer Hangout (Slack)', 'AIGA (professional forums)', 'Brand New (Under Consideration)',
      'ADC (Art Directors Club)', 'IPA / APG (planning and strategy)', 'Strategists collective Discord servers',
      'Freelance community Slack groups', 'The Dieline community',
    ],
    signals: [
      { text: 'Pinned "looking for collaborators" posts' },
      { text: 'Tool recommendation threads — especially AI tools for decks, briefs, research' },
      { text: 'Questions about how to handle strategy/creative when you don\'t have a partner' },
      { text: '"Who do you use for..." posts — looking for outsourced capability' },
    ],
  },
  {
    id: 'cs-content',
    title: '9. Content Consumption Signals',
    description: 'What they\'re reading and watching tells you what they\'re trying to solve.',
    tools: 'SparkToro, SimilarWeb, YouTube search visibility tools, BuzzSumo',
    signals: [
      { text: '"How to write a creative brief"', tag: 'YouTube Search' },
      { text: '"How to pitch a brand strategy"', tag: 'YouTube Search' },
      { text: '"Freelance creative director pitch deck"', tag: 'YouTube Search' },
      { text: '"Brand strategy presentation template"', tag: 'YouTube Search' },
      { text: '"How to present strategy to clients"', tag: 'YouTube Search' },
      { text: '"AI tools for creative directors"', tag: 'YouTube Search' },
      { text: '"AI tools for brand strategists"', tag: 'YouTube Search' },
      { text: 'Subscribed to: How Brands Are Built, The Positioning Manual, 2Bobs, Independent Consultant Alliance, Creative Class', tag: 'Newsletter/Podcast' },
      { text: 'Substack follows in brand strategy, creative direction, freelance business', tag: 'Newsletter/Podcast' },
    ],
  },
  {
    id: 'cs-ai-tools',
    title: '10. AI Tool Adoption Signals',
    description: 'People already trying to solve this problem with imperfect workarounds are the warmest audience.',
    signals: [
      { text: 'Public posts about using ChatGPT or Claude for pitch strategy — they know they need help, using wrong tool' },
      { text: 'Reviews of AI writing tools complaining "it doesn\'t understand brand strategy"' },
      { text: 'Reddit/Twitter threads asking "is there an AI that can help me with pitch decks?"' },
      { text: 'Using Canva AI, Gamma, or Beautiful.ai for decks — aware of the problem, using surface-level solutions' },
      { text: 'Midjourney for concepting without strategic framing — creative tools, no strategic layer' },
      { text: 'Perplexity for market research — research behavior without synthesis' },
      { text: 'Comments on AI tool Product Hunt launches asking "does this work for brand strategy pitches?"' },
      { text: 'LinkedIn posts about AI tools that get frustrated reactions — signals the category is on their radar' },
    ],
    queryLogic: `"ChatGPT" OR "Claude" ("pitch deck" OR "brand strategy" OR "creative brief") site:reddit.com OR site:twitter.com
"AI" "pitch deck" "freelance" (struggle OR doesn't work OR tried)
"Gamma" OR "Beautiful.ai" "strategy" "not quite"
site:producthunt.com "pitch deck" OR "brand strategy" comments`,
  },
]

// ─── CollapsibleSection ────────────────────────────────────────────────────

interface CollapsibleProps {
  id: string
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  borderVar: string
  textVar: string
  bgVar: string
}

function CollapsibleSection({ id, title, isOpen, onToggle, children, borderVar, textVar, bgVar }: CollapsibleProps) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: `var(${borderVar})` }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:opacity-90"
        style={{ background: `var(${bgVar})` }}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="font-semibold text-lg" style={{ color: `var(${textVar})` }}>
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl shrink-0 ml-4"
          style={{ color: `var(${textVar})` }}
        >
          ↓
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Signal List Renderer ────────────────────────────────────────────────────

function SignalList({ signals }: { signals: SignalItem[] }) {
  return (
    <ul className="space-y-1.5 mb-3">
      {signals.map((signal, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-sm">
          <span className="text-foreground-muted shrink-0 mt-0.5 text-xs">☐</span>
          <span className="text-foreground-muted leading-snug flex-1">
            {signal.text}
            {signal.tool && (
              <span
                className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                style={{ background: 'var(--ss-gray-bg)', color: 'var(--ss-gray-text)', border: '1px solid var(--ss-gray-border)' }}
              >
                {signal.tool}
              </span>
            )}
            {signal.tag && (
              <span className="ml-2 text-[10px] text-slate italic">{signal.tag}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SignalLibraryClient() {
  const [openSection, setOpenSection] = useState<string>('ransomware')

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? '' : id))
  }

  return (
    <>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mb-4"
          >
            Signal-State Marketing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            Signal Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-foreground-muted text-lg max-w-xl"
          >
            Catalogued signal patterns for AI agent targeting. Organized by use case, platform, and pain type. Built from qualitative research, not hypotheses.
          </motion.p>
        </div>
      </section>

      {/* Catalogues */}
      <section className="section">
        <div className="container-narrow space-y-4">

          {/* ── Ransomware Catalogue ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CollapsibleSection
              id="ransomware"
              title="Ransomware Vulnerability Signals"
              isOpen={openSection === 'ransomware'}
              onToggle={() => toggleSection('ransomware')}
              borderVar="--ss-teal-border"
              textVar="--ss-teal-text"
              bgVar="--ss-teal-bg"
            >
              <div className="p-5 space-y-6 bg-background">
                <p className="text-sm text-foreground-muted leading-relaxed">
                  External indicators that an organization is a likely ransomware target. Compiled for threat intelligence, security messaging, and ICP identification. Each signal category is extensible — add findings as they surface.
                </p>

                {RANSOMWARE_CATEGORIES.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-base mb-1">{category.title}</h3>
                    <p className="text-xs text-foreground-muted mb-3">{category.description}</p>
                    {category.signals && <SignalList signals={category.signals} />}
                    {category.tools && (
                      <p className="text-xs text-slate">
                        <strong>Tools:</strong> {category.tools}
                      </p>
                    )}
                  </div>
                ))}

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-slate italic">Last updated: March 2026 · Extend this catalogue as new signal patterns are identified.</p>
                </div>
              </div>
            </CollapsibleSection>
          </motion.div>

          {/* ── Org Dysfunction Catalogue ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <CollapsibleSection
              id="org-dysfunction"
              title="Organizational Dysfunction Signals"
              isOpen={openSection === 'org-dysfunction'}
              onToggle={() => toggleSection('org-dysfunction')}
              borderVar="--ss-coral-border"
              textVar="--ss-coral-text"
              bgVar="--ss-coral-bg"
            >
              <div className="p-5 space-y-6 bg-background">
                <p className="text-sm text-foreground-muted leading-relaxed">
                  External indicators that a company has broken culture, misalignment, slow execution, or leadership dysfunction. Compiled for ICP identification, ABM targeting, and messaging strategy. Each signal category is extensible.
                </p>

                {ORG_DYSFUNCTION_CATEGORIES.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-base mb-1">{category.title}</h3>
                    <p className="text-xs text-foreground-muted mb-3">{category.description}</p>

                    {category.sectorRows ? (
                      <div className="overflow-x-auto mb-3">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 pr-4 text-xs font-semibold text-slate w-48">Sector</th>
                              <th className="text-left py-2 text-xs font-semibold text-slate">Key Dysfunction Patterns</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.sectorRows.map((row, i) => (
                              <tr key={i} className="border-b border-border/50">
                                <td className="py-2 pr-4 text-xs font-medium text-charcoal dark:text-ash align-top">{row.sector}</td>
                                <td className="py-2 text-xs text-foreground-muted leading-relaxed">{row.patterns}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : category.signals ? (
                      <SignalList signals={category.signals} />
                    ) : null}

                    {category.tools && (
                      <p className="text-xs text-slate">
                        <strong>Tools:</strong> {category.tools}
                      </p>
                    )}
                  </div>
                ))}

                {/* Signal Scoring */}
                <div className="border-t border-border pt-5">
                  <h3 className="font-semibold text-base mb-3">Signal Scoring</h3>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-xs font-semibold text-slate w-32">Score</th>
                          <th className="text-left py-2 text-xs font-semibold text-slate">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { score: '1–3 signals', meaning: 'Low — could be isolated or temporary' },
                          { score: '4–7 signals', meaning: 'Moderate — worth flagging in messaging' },
                          { score: '8–12 signals', meaning: 'High — clear systemic issues, strong hook' },
                          { score: '13+ signals', meaning: 'Critical — likely in active crisis or decline' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-2 pr-4 text-xs font-mono font-medium" style={{ color: 'var(--ss-coral-text)' }}>{row.score}</td>
                            <td className="py-2 text-xs text-foreground-muted">{row.meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate mb-2"><strong>Weight multipliers:</strong></p>
                  <ul className="space-y-1 text-xs text-foreground-muted">
                    {[
                      'CEO approval below 60%: +3',
                      'VP/C-suite turnover cycle under 18 months: +3',
                      'Financial stress signals (down round, burn, layoffs): +3',
                      'Glassdoor score declining YoY: +2',
                      'No product delivery evidence for 12+ months: +2',
                      'Multiple reorg mentions in reviews: +2',
                      'Misaligned public messaging across channels: +2',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="shrink-0" style={{ color: 'var(--ss-coral-text)' }}>+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Research Workflow */}
                <div className="border-t border-border pt-5">
                  <h3 className="font-semibold text-base mb-3">Research Workflow — 60-Minute Recon Playbook</h3>
                  <ol className="space-y-1.5 text-sm">
                    {[
                      { n: 1, src: 'Glassdoor', detail: 'Score, trend, CEO approval, recurring themes in reviews' },
                      { n: 2, src: 'Blind / Teamblind', detail: 'Unfiltered anonymous employee sentiment' },
                      { n: 3, src: 'LinkedIn', detail: 'Headcount trend, tenure analysis, title structure, recent departures' },
                      { n: 4, src: 'LinkedIn Jobs', detail: 'Active postings, role patterns, repost frequency' },
                      { n: 5, src: 'Indeed / Comparably', detail: 'Cross-reference culture and compensation sentiment' },
                      { n: 6, src: 'Google News (past 2 years)', detail: 'Reorgs, pivots, layoffs, leadership exits' },
                      { n: 7, src: 'Crunchbase / PitchBook', detail: 'Funding history, round trajectory, investor signals' },
                      { n: 8, src: 'G2 / Capterra / Trustpilot', detail: 'Customer experience trends' },
                      { n: 9, src: 'App Store / Play Store', detail: 'Product quality signals and support responsiveness' },
                      { n: 10, src: 'Twitter/X + LinkedIn (exec accounts)', detail: 'Messaging coherence, engagement authenticity' },
                      { n: 11, src: 'SEC EDGAR (if public)', detail: 'Financials, auditor, filing timeliness' },
                      { n: 12, src: 'Company blog + changelog', detail: 'Delivery cadence and follow-through on commitments' },
                    ].map((step) => (
                      <li key={step.n} className="flex items-start gap-3 text-sm">
                        <span className="shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5"
                          style={{ background: 'var(--ss-coral-bg)', color: 'var(--ss-coral-text)', border: '1px solid var(--ss-coral-border)' }}>
                          {step.n}
                        </span>
                        <span className="text-foreground-muted leading-snug">
                          <strong className="text-charcoal dark:text-ash">{step.src}</strong> — {step.detail}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Messaging Angle Matrix */}
                <div className="border-t border-border pt-5">
                  <h3 className="font-semibold text-base mb-3">Messaging Angle Matrix</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-xs font-semibold text-slate">Primary Signal Cluster</th>
                          <th className="text-left py-2 text-xs font-semibold text-slate">Messaging Angle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { cluster: 'High turnover + low CEO approval', angle: '"Your people are telling you something — is leadership listening?"' },
                          { cluster: 'Reorg fatigue + strategy churn', angle: '"Constant change without progress isn\'t transformation — it\'s drift"' },
                          { cluster: 'Sales/product misalignment', angle: '"When your teams can\'t agree on the message, neither can your customers"' },
                          { cluster: 'Delivery gaps + roadmap debt', angle: '"Vision without execution is just a slide deck"' },
                          { cluster: 'Culture washing + Glassdoor delta', angle: '"The gap between your employer brand and employee reality is a risk"' },
                          { cluster: 'Financial stress + headcount whiplash', angle: '"Cutting your way to growth doesn\'t work — and your org knows it"' },
                          { cluster: 'Contractor-heavy + low tenure', angle: '"You can\'t build institutional knowledge on a revolving door"' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-2 pr-4 text-xs text-foreground-muted align-top leading-relaxed">{row.cluster}</td>
                            <td className="py-2 text-xs text-foreground-muted italic">{row.angle}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-slate italic">Last updated: March 2026 · Extend this catalogue as new signal patterns are identified.</p>
                  <Link href="/signal-state/use-cases/org-alignment" className="text-xs mt-2 inline-block hover:underline" style={{ color: 'var(--ss-coral-text)' }}>
                    See the org alignment use case →
                  </Link>
                </div>
              </div>
            </CollapsibleSection>
          </motion.div>

          {/* ── Creative Struggle Catalogue ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <CollapsibleSection
              id="creative-struggle"
              title="Creative & Strategist Struggle Signals"
              isOpen={openSection === 'creative-struggle'}
              onToggle={() => toggleSection('creative-struggle')}
              borderVar="--ss-purple-border"
              textVar="--ss-purple-text"
              bgVar="--ss-purple-bg"
            >
              <div className="p-5 space-y-6 bg-background">
                <p className="text-sm text-foreground-muted leading-relaxed">
                  External indicators that solo creatives, art directors, and independent strategists are hitting capability gaps that AI-augmented tools could fill. Compiled for micro-audience targeting, agent-based prospecting, and ICP messaging.
                </p>

                {/* Persona Context */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: 'Persona A — Creative Without Strategy',
                      who: 'Art director, CD, designer. Can make beautiful things.',
                      gap: 'Cannot frame a market problem, build a competitive narrative, or speak to a CFO.',
                    },
                    {
                      label: 'Persona B — Strategist Without Creative',
                      who: 'Ex-agency planner, brand consultant, indie strategist. Can build the thinking.',
                      gap: 'Cannot make it feel like anything.',
                    },
                  ].map((persona, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-4 text-sm"
                      style={{ background: 'var(--ss-purple-bg)', border: '1px solid var(--ss-purple-border)' }}
                    >
                      <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--ss-purple-text)' }}>
                        {persona.label}
                      </p>
                      <p className="text-foreground-muted text-xs leading-relaxed mb-1">{persona.who}</p>
                      <p className="text-foreground-muted text-xs leading-relaxed italic">{persona.gap}</p>
                    </div>
                  ))}
                </div>

                {/* Micro-Segments Table */}
                <div>
                  <h3 className="font-semibold text-base mb-3">Micro-Audience Segments</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate w-10">ID</th>
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate w-48">Segment</th>
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate">Who They Are</th>
                          <th className="text-left py-2 text-xs font-semibold text-slate">Core Pain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: 'A1', segment: 'The Newly Independent CD', who: 'Left agency 0–18 months ago, going solo', pain: 'Knows creative, terrified of cold-pitching strategy' },
                          { id: 'A2', segment: 'The Senior AD Going Direct', who: 'Freelance, now pitching brand clients directly', pain: 'Beautiful work, weak decks, losing to full-service' },
                          { id: 'A3', segment: 'The Accidental Creative Director', who: 'Promoted into CD at small agency, now expected to pitch', pain: 'Never trained for this, doing it anyway' },
                          { id: 'A4', segment: 'The Specialist Going Generalist', who: 'Deep in one discipline pitching broader brand work', pain: 'Gaps outside their lane are obvious in pitches' },
                          { id: 'B1', segment: 'The Solo Brand Strategist', who: 'Ex-planner, brand consultant, indie strategist', pain: 'Strong thinking, embarrassing presentations' },
                          { id: 'B2', segment: 'The 1–2 Person Creative Studio', who: 'Micro-agency, 1–2 founders covering everything', pain: 'Too small to hire, too big to stay DIY' },
                          { id: 'B3', segment: 'The Returning Agency Vet', who: 'Took time off, re-entering as freelance', pain: 'Skills current, network thin, pitching alone' },
                          { id: 'B4', segment: 'The Promoted Strategist', who: 'Mid-level planner now expected to pitch independently', pain: 'Trained to support, not to lead and close' },
                        ].map((row) => (
                          <tr key={row.id} className="border-b border-border/50">
                            <td className="py-2 pr-3 text-xs font-mono font-semibold" style={{ color: 'var(--ss-purple-text)' }}>{row.id}</td>
                            <td className="py-2 pr-3 text-xs font-medium text-charcoal dark:text-ash align-top">{row.segment}</td>
                            <td className="py-2 pr-3 text-xs text-foreground-muted align-top">{row.who}</td>
                            <td className="py-2 text-xs text-foreground-muted align-top">{row.pain}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Signal Categories */}
                {CREATIVE_STRUGGLE_CATEGORIES.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-base mb-1">{category.title}</h3>
                    <p className="text-xs text-foreground-muted mb-3">{category.description}</p>

                    {category.lists && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {category.lists.map((item, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 rounded-full"
                            style={{ background: 'var(--ss-purple-bg)', color: 'var(--ss-purple-text)', border: '1px solid var(--ss-purple-border)' }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {category.signals && <SignalList signals={category.signals} />}

                    {category.queryLogic && (
                      <div className="mt-3">
                        <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: 'var(--ss-purple-text)' }}>
                          Agent Query Logic
                        </p>
                        <pre
                          className="text-xs p-3 rounded-lg overflow-x-auto leading-relaxed"
                          style={{ background: 'var(--ss-purple-bg)', color: 'var(--ss-gray-text)', border: '1px solid var(--ss-purple-border)' }}
                        >
                          {category.queryLogic}
                        </pre>
                      </div>
                    )}

                    {category.tools && (
                      <p className="text-xs text-slate mt-2">
                        <strong>Tools:</strong> {category.tools}
                      </p>
                    )}
                  </div>
                ))}

                {/* Signal Scoring */}
                <div className="border-t border-border pt-5">
                  <h3 className="font-semibold text-base mb-3">Signal Scoring</h3>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-xs font-semibold text-slate w-32">Score</th>
                          <th className="text-left py-2 text-xs font-semibold text-slate">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { score: '1–2 signals', meaning: 'Awareness — knows a gap exists' },
                          { score: '3–5 signals', meaning: 'Consideration — actively looking for a solution' },
                          { score: '6–9 signals', meaning: 'High intent — frustrated with current workarounds' },
                          { score: '10+ signals', meaning: 'Critical — losing business because of the gap' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-2 pr-4 text-xs font-mono font-medium" style={{ color: 'var(--ss-purple-text)' }}>{row.score}</td>
                            <td className="py-2 text-xs text-foreground-muted">{row.meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate mb-2"><strong>Weight multipliers:</strong></p>
                  <ul className="space-y-1 text-xs text-foreground-muted">
                    {[
                      'Recently went independent (0–12 months): +3',
                      'Explicitly named the gap in a public post: +3',
                      'Already using an imperfect AI workaround: +3',
                      'Lost a pitch and attributed it to missing capability: +3',
                      'Portfolio shows both halves attempted solo: +2',
                      'Asking for partner/collaborator recommendations: +2',
                      'Senior title + solo operation: +2',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="shrink-0" style={{ color: 'var(--ss-purple-text)' }}>+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Master Agent Search Logic */}
                <div className="border-t border-border pt-5">
                  <h3 className="font-semibold text-base mb-3">Master Agent Search Logic</h3>
                  <div className="space-y-4">
                    {[
                      {
                        platform: 'LinkedIn (Sales Navigator)',
                        query: `("freelance" OR "independent" OR "solo") AND
("creative director" OR "art director" OR "brand strategist" OR "brand consultant") AND
("pitch" OR "brand" OR "agency") AND
(current title does NOT include: "agency" "studio" "group" "collective" "Inc" "LLC" [team > 2])`,
                      },
                      {
                        platform: 'Twitter/X',
                        query: `("solo creative" OR "one person shop" OR "freelance CD" OR "independent strategist")
AND ("pitch" OR "deck" OR "brief" OR "strategy")

"I need a [strategist/designer/creative partner]" from verified creatives or strategists

"lost the pitch" OR "didn't win" + (creative OR strategy OR deck)`,
                      },
                      {
                        platform: 'Google Universal Dorks',
                        query: `"available for freelance" ("creative director" OR "art director" OR "brand strategist")
"open to projects" "brand" ("strategy" OR "design" OR "creative")
"looking for a creative partner" OR "looking for a strategy partner" site:linkedin.com
"I work with a network of collaborators" ("brand" OR "agency" OR "creative")
"one-person" OR "solo" ("studio" OR "consultancy") "pitch" "brand"`,
                      },
                      {
                        platform: 'Upwork / Freelance Platforms',
                        query: `Profile search: "creative director" + "brand strategy" in same profile bio
Review text mining: "great creative but" OR "great strategy but"
Client post search: "need both strategy and design" OR "strategy + design" for pitch`,
                      },
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: 'var(--ss-purple-text)' }}>
                          {item.platform}
                        </p>
                        <pre
                          className="text-xs p-3 rounded-lg overflow-x-auto leading-relaxed"
                          style={{ background: 'var(--ss-purple-bg)', color: 'var(--ss-gray-text)', border: '1px solid var(--ss-purple-border)' }}
                        >
                          {item.query}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Messaging Angle Matrix */}
                <div className="border-t border-border pt-5">
                  <h3 className="font-semibold text-base mb-3">Messaging Angle Matrix</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate">Primary Signal</th>
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate w-20">Persona</th>
                          <th className="text-left py-2 text-xs font-semibold text-slate">Messaging Angle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { signal: 'Lost pitches, attributed to weak positioning', persona: 'A1, A2', angle: '"Your creative deserves a strategy that matches it"' },
                          { signal: 'Asking for strategist collaborators', persona: 'A1, A3', angle: '"You don\'t need a strategist. You need a strategy layer."' },
                          { signal: 'Using Gamma/Canva AI as a workaround', persona: 'A2, A4', angle: '"There\'s a difference between a deck tool and a thinking partner"' },
                          { signal: 'Recently went independent', persona: 'A1, B3', angle: '"Going solo doesn\'t mean going without a team"' },
                          { signal: 'Deck looks like homework', persona: 'B1, B4', angle: '"Your thinking is agency-grade. Your presentation should be too."' },
                          { signal: 'Can\'t afford a designer per pitch', persona: 'B1, B2', angle: '"Stop losing pitches to the slide deck"' },
                          { signal: 'Doing both strategy and creative solo', persona: 'B2, A3', angle: '"You\'re doing two jobs. One of them can be automated."' },
                          { signal: 'Venting about competing with full-service agencies', persona: 'A2, B2', angle: '"Level the playing field without hiring a team"' },
                          { signal: 'Asking for AI tool recommendations', persona: 'All', angle: '"The AI tools you\'ve tried weren\'t built for this. This one was."' },
                          { signal: 'Promoted into pitch responsibility', persona: 'A3, B4', angle: '"You were trained for the work. We\'ll handle the pitch."' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-2 pr-3 text-xs text-foreground-muted align-top">{row.signal}</td>
                            <td className="py-2 pr-3 text-xs font-mono" style={{ color: 'var(--ss-purple-text)' }}>{row.persona}</td>
                            <td className="py-2 text-xs text-foreground-muted italic">{row.angle}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Channels to Prioritize */}
                <div className="border-t border-border pt-5">
                  <h3 className="font-semibold text-base mb-3">Channels to Prioritize by Segment</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate">Segment</th>
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate">Primary Channel</th>
                          <th className="text-left py-2 pr-3 text-xs font-semibold text-slate">Secondary</th>
                          <th className="text-left py-2 text-xs font-semibold text-slate">Approach</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { segment: 'Newly Independent CD', primary: 'LinkedIn (transition posts)', secondary: 'Twitter/X', approach: 'Catch at the transition moment' },
                          { segment: 'Senior AD Going Direct', primary: 'Behance / Dribbble', secondary: 'LinkedIn', approach: 'Portfolio gap is visible' },
                          { segment: 'Accidental CD', primary: 'LinkedIn (title change)', secondary: 'Reddit r/advertising', approach: 'Promoted, scared, searching' },
                          { segment: 'Specialist Going Generalist', primary: 'Upwork / Contra', secondary: 'Reddit r/freelance', approach: 'Explicit capability gap in profile' },
                          { segment: 'Solo Brand Strategist', primary: 'Substack / Medium', secondary: 'LinkedIn', approach: 'They write about the pain' },
                          { segment: '1–2 Person Studio', primary: 'Facebook Groups', secondary: 'LinkedIn', approach: 'Community-first approach' },
                          { segment: 'Returning Agency Vet', primary: 'LinkedIn (return post)', secondary: 'Twitter/X', approach: 'Network reactivation moment' },
                          { segment: 'Promoted Strategist', primary: 'LinkedIn', secondary: 'Reddit r/brandstrategy', approach: 'Looking for frameworks' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-2 pr-3 text-xs font-medium text-charcoal dark:text-ash align-top">{row.segment}</td>
                            <td className="py-2 pr-3 text-xs text-foreground-muted align-top">{row.primary}</td>
                            <td className="py-2 pr-3 text-xs text-foreground-muted align-top">{row.secondary}</td>
                            <td className="py-2 text-xs text-foreground-muted align-top">{row.approach}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-slate italic">Last updated: March 2026 · Extend this catalogue as new signal patterns and micro-segments are identified.</p>
                  <Link href="/signal-state/use-cases/independent-creative" className="text-xs mt-2 inline-block hover:underline" style={{ color: 'var(--ss-purple-text)' }}>
                    See the independent creative use case →
                  </Link>
                </div>
              </div>
            </CollapsibleSection>
          </motion.div>

        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-3"
          >
            Want to deploy these signals?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-foreground-muted mb-6 max-w-lg"
          >
            The catalogues are the raw material. The framework shows you how to use them. The architecture shows you how to build the system.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/signal-state/framework" className="btn-primary">
              Read the framework →
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in touch →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
