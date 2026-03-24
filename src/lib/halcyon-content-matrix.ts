export interface ContentAsset {
  type: string
  title: string
  description: string
}

export interface ContentCellExpanded {
  why: string[]
  instruments: string[]
  formats: string[]
  howToUse: string
}

export interface ContentCell {
  preview: string
  kpi: string
  assets: ContentAsset[]
  expanded: ContentCellExpanded
}

export type PersonaColor = 'ember' | 'electric' | 'copper' | 'slate'

export interface ContentPersona {
  id: string
  label: string
  role: string
  cares: string
  color: PersonaColor
}

export interface BuyingStage {
  id: string
  label: string
  description: string
  timeframe: string
}

export const PERSONAS: ContentPersona[] = [
  {
    id: 'ciso',
    label: 'CISO',
    role: 'Chief Information Security Officer',
    cares: 'Board risk posture, regulatory exposure, program ROI',
    color: 'ember',
  },
  {
    id: 'it-security',
    label: 'IT Security Lead',
    role: 'Director / Manager, Information Security',
    cares: 'Tool efficacy, integration complexity, analyst workflow',
    color: 'electric',
  },
  {
    id: 'infra-ops',
    label: 'Infra / Ops',
    role: 'Infrastructure Lead / IT Operations',
    cares: 'Deployment impact, performance overhead, rollback safety',
    color: 'copper',
  },
  {
    id: 'cfo',
    label: 'CFO / Finance',
    role: 'Chief Financial Officer / VP Finance',
    cares: 'ROI, insurance premium reduction, downtime cost avoidance',
    color: 'slate',
  },
]

export const BUYING_STAGES: BuyingStage[] = [
  {
    id: 'awareness',
    label: 'Awareness',
    description: 'Identifying the problem',
    timeframe: '12–18mo before close',
  },
  {
    id: 'consideration',
    label: 'Consideration',
    description: 'Evaluating solutions',
    timeframe: '6–12mo before close',
  },
  {
    id: 'validation',
    label: 'Validation',
    description: 'Proof and business case',
    timeframe: '3–6mo before close',
  },
  {
    id: 'selection',
    label: 'Selection',
    description: 'Decision and procurement',
    timeframe: '0–3mo before close',
  },
]

// CONTENT_CELLS[personaId][stageId] = ContentCell
export const CONTENT_CELLS: Record<string, Record<string, ContentCell>> = {
  ciso: {
    awareness: {
      preview: 'Board threat briefing\nVertical ransomware landscape',
      kpi: 'Briefing downloads, CISO newsletter subscribers',
      assets: [
        {
          type: 'Report',
          title: '"State of Ransomware" Threat Brief',
          description: 'Annual vertical-specific threat landscape for CISO board presentations',
        },
        {
          type: 'Deck',
          title: 'Board Ransomware Briefing Template',
          description: 'Ready-to-present slide deck for board risk committees',
        },
        {
          type: 'Article',
          title: '"Why Your EDR Can\'t Stop Ransomware"',
          description: 'Bylined thought leadership for CISO-level publications',
        },
      ],
      expanded: {
        why: [
          'CISOs form the buying mandate at this stage — their board presentation becomes the internal budget justification',
          'The "Ransomware Gap" is not yet understood; awareness content plants the seed',
          'Cylance/CrowdStrike context resonates — they already know the EDR market',
        ],
        instruments: [
          '6sense intent tier tracking (Tier C → B movement)',
          'Email open rate on "CISO Briefing" series',
          'LinkedIn engagement on threat landscape posts',
        ],
        formats: ['Executive report (PDF)', 'Board slide template', 'LinkedIn long-form', 'Email newsletter'],
        howToUse:
          'Send to named CISO accounts on your ICP list. Gate the board deck to capture intent signal. Track who downloads — these are 12-month pipeline accounts.',
      },
    },
    consideration: {
      preview: 'Ransomware Gap ROI analysis\nCISO peer case studies',
      kpi: 'Briefing call bookings, Salesforce opportunity creation',
      assets: [
        {
          type: 'Brief',
          title: '"The Ransomware Gap" Position Paper',
          description: 'Technical brief on why CrowdStrike/SentinelOne miss ransomware encryption',
        },
        {
          type: 'Case Study',
          title: 'CISO Peer: Manufacturing Ransomware Incident',
          description: 'Named or anonymized peer account that survived ransomware with Halcyon',
        },
        {
          type: 'Webinar',
          title: '"Ransomware Gap" Virtual Briefing',
          description: 'CISO-to-CISO panel: "What they don\'t tell you about EDR and ransomware"',
        },
      ],
      expanded: {
        why: [
          'CISO is now building the business case; peer proof is the most persuasive content at this stage',
          "Jon Miller's Cylance credibility opens doors — CISOs know the name",
          'Dell channel trust: "enterprise grade, battle-tested" messaging lands here',
        ],
        instruments: [
          'Webinar attendance and 60%+ completion rate',
          'Position paper downloads from target accounts',
          'Briefing call booked (AE opportunity created)',
        ],
        formats: ['Position paper (PDF)', 'CISO peer case study', 'Invite-only virtual briefing', 'Email sequence (3-touch)'],
        howToUse:
          "Segment by vertical — manufacturing CISO gets manufacturing peer story. Healthcare CISO gets HIPAA framing. Offer \"Ransomware Gap\" briefing call as CTA — this is the discovery motion.",
      },
    },
    validation: {
      preview: 'POC results summary\nBusiness case calculator',
      kpi: 'POC initiated, executive sponsor confirmed',
      assets: [
        {
          type: 'Tool',
          title: 'Ransomware Cost Avoidance Calculator',
          description: 'Interactive ROI model: downtime cost × recovery time × insurance premium reduction',
        },
        {
          type: 'Brief',
          title: 'POC Results Summary Template',
          description: 'Standard proof-of-concept results format for CISO executive review',
        },
        {
          type: 'Reference',
          title: 'CISO Reference Call Program',
          description: 'Curated peer CISO reference calls by vertical and company size',
        },
      ],
      expanded: {
        why: [
          'CISO is going to the board with a number — the ROI calculator gives them that number',
          'POC results are the proof point — make them easy to present upward',
          'Peer reference calls close CISOs. Same buyer, same problem, already solved.',
        ],
        instruments: [
          'Calculator sessions from target accounts',
          'POC initiated (Salesforce stage 3+)',
          'Reference call completed',
        ],
        formats: ['Interactive ROI calculator', 'POC summary PDF', 'Reference call program', 'Executive sponsor briefing'],
        howToUse:
          'Assign ROI calculator to every CISO in active POC. Pre-populate with their known downtime cost (use public incident data). POC results → board deck → approval.',
      },
    },
    selection: {
      preview: 'Executive alignment memo\nMutual close plan',
      kpi: 'Contract signed, CS intro completed',
      assets: [
        {
          type: 'Memo',
          title: 'Executive Alignment Summary',
          description: 'One-page: what was evaluated, what was proven, what was decided',
        },
        {
          type: 'Plan',
          title: 'Mutual Close Plan',
          description: 'Shared timeline: CISO + AE milestones to contract signature',
        },
        {
          type: 'Deck',
          title: 'Day 1 Success Plan',
          description: 'Implementation roadmap and CS intro deck for CISO handoff',
        },
      ],
      expanded: {
        why: [
          'CISO owns final approval — executive alignment memo is their internal sell-through tool',
          'Mutual close plan prevents slippage: both sides own milestones',
          '"What happens after I sign?" is the CISO\'s last objection — Day 1 plan answers it',
        ],
        instruments: [
          'Contract signed (Salesforce Closed Won)',
          'CS intro call completed within 5 days of signature',
          'Implementation kickoff scheduled',
        ],
        formats: ['One-page executive memo', 'Mutual close plan (Google Doc)', 'Implementation roadmap', 'CS intro deck'],
        howToUse:
          'Co-author the mutual close plan with the CISO team — shared ownership prevents stall. Send Day 1 deck before contract is signed to reduce post-signature anxiety.',
      },
    },
  },

  'it-security': {
    awareness: {
      preview: 'Technical threat brief\nEDR limitations analysis',
      kpi: 'Technical blog traffic, newsletter signups',
      assets: [
        {
          type: 'Blog',
          title: '"How Ransomware Bypasses Your EDR"',
          description: 'Deep-dive technical post on encryption-layer attacks that CrowdStrike/SentinelOne miss',
        },
        {
          type: 'Guide',
          title: '"Ransomware Triage Playbook"',
          description: 'Step-by-step IR guide for security analysts when ransomware is detected',
        },
        {
          type: 'Video',
          title: 'Live Malware Analysis: Ransomware Execution Chain',
          description: 'Screen-recorded malware sandbox analysis showing EDR gaps in real time',
        },
      ],
      expanded: {
        why: [
          'IT Security Lead is your technical gatekeeper — they vet tools before CISO ever sees them',
          'The encryption-layer explanation is the "aha" moment: EDR stops delivery, not encryption',
          'Technical content earns credibility before any sales motion begins',
        ],
        instruments: [
          'Blog pageviews from target account IP ranges (6sense)',
          'Technical newsletter open rates',
          'Video watch time (60%+ completion)',
        ],
        formats: ['Technical blog post', 'PDF playbook', 'YouTube/Wistia video', 'LinkedIn technical post'],
        howToUse:
          'Publish to security practitioner channels (Dark Reading, SC Magazine, LinkedIn Security groups). Gate the triage playbook — it captures technical buyer intent.',
      },
    },
    consideration: {
      preview: 'Integration architecture overview\nAnalyst workflow impact',
      kpi: 'Tech brief downloads, demo requests',
      assets: [
        {
          type: 'Brief',
          title: '"Halcyon + CrowdStrike: Architecture Overview"',
          description: 'Technical integration diagram: where Halcyon sits in the stack, what it sees',
        },
        {
          type: 'Demo',
          title: 'Technical Demo: Encryption Key Capture',
          description: 'Live demo of Halcyon intercepting and capturing ransomware encryption keys',
        },
        {
          type: 'FAQ',
          title: '"What Your Analysts Will Actually Do"',
          description: "Day-in-the-life: how Halcyon changes (or doesn't change) analyst workflow",
        },
      ],
      expanded: {
        why: [
          'IT Security Lead needs to know: "Does this break what I already have?" Answer: no, it adds a layer.',
          'The encryption key capture demo is the technical proof — they need to see it work',
          'Analyst workflow FAQ addresses the objection: "I don\'t want another console."',
        ],
        instruments: ['Technical demo completed (AE note)', 'Architecture brief downloaded', 'Demo request submitted'],
        formats: ['Architecture diagram PDF', 'Live technical demo', 'FAQ document', 'Technical email sequence'],
        howToUse:
          'Always demo encryption key capture live — not recorded. Let the analyst ask questions in real time. The "aha" moment is seeing the key intercepted before encryption completes.',
      },
    },
    validation: {
      preview: 'POC runbook\nTechnical integration guide',
      kpi: 'POC deployed, QA sign-off',
      assets: [
        {
          type: 'Runbook',
          title: 'POC Deployment Runbook',
          description: 'Step-by-step guide for IT Security Lead to deploy and validate Halcyon in a test environment',
        },
        {
          type: 'Checklist',
          title: 'Technical Validation Checklist',
          description: '12-point checklist for confirming ransomware key capture under test conditions',
        },
        {
          type: 'Guide',
          title: '"Zero Performance Impact" Benchmark Guide',
          description: "How to measure Halcyon's endpoint overhead during the POC period",
        },
      ],
      expanded: {
        why: [
          'The IT Security Lead runs the POC — this is their milestone to own',
          'The 12-point validation checklist gives them a clear pass/fail framework',
          'Performance overhead is always an objection — have the benchmark data ready',
        ],
        instruments: [
          'POC environment deployed (SE note)',
          'Validation checklist completed and returned',
          'Performance benchmark completed',
        ],
        formats: ['PDF runbook', 'Interactive checklist', 'Benchmark report template', 'Slack channel with SE support'],
        howToUse:
          'Assign a dedicated SE to every POC. The runbook is co-branded — Halcyon + customer team. SE Slack channel ensures 4-hour response SLA during POC period.',
      },
    },
    selection: {
      preview: 'Implementation guide\nSE handoff to CS',
      kpi: 'Go-live date confirmed, CS onboarding started',
      assets: [
        {
          type: 'Guide',
          title: 'Implementation Architecture Guide',
          description: 'How to deploy Halcyon at scale: rollout phases, agent deployment, console access',
        },
        {
          type: 'Playbook',
          title: '"Day 1 Operations" Playbook',
          description: "What the IT Security Lead does on go-live day — alerts, dashboards, escalation paths",
        },
        {
          type: 'Checklist',
          title: 'Go-Live Readiness Checklist',
          description: 'Pre-deployment verification: agent coverage, policy settings, CS contact confirmed',
        },
      ],
      expanded: {
        why: [
          "The IT Security Lead needs to know they won't break production during rollout",
          'Day 1 operations playbook reduces post-signature anxiety and accelerates go-live',
          'CS handoff is a trust moment — warm intro from SE, not a cold ticket',
        ],
        instruments: ['Go-live date confirmed', 'Agent deployment coverage ≥90% at kickoff', 'CS onboarding call completed'],
        formats: ['PDF implementation guide', 'Operations playbook', 'Go-live checklist', 'CS intro call deck'],
        howToUse:
          "SE owns go-live readiness check. CS takes handoff after first full deployment wave. Celebrate go-live with the IT Security Lead — they're the hero of the story.",
      },
    },
  },

  'infra-ops': {
    awareness: {
      preview: 'Deployment impact overview\nAgent performance data',
      kpi: 'Infrastructure blog traffic, ops newsletter signups',
      assets: [
        {
          type: 'Blog',
          title: '"Adding Security Without Slowing Production"',
          description: "How Halcyon's agent is designed for zero-impact deployment on production infrastructure",
        },
        {
          type: 'Data Sheet',
          title: 'Performance Overhead Benchmark',
          description: 'Third-party performance data: CPU, memory, disk I/O impact across endpoint types',
        },
        {
          type: 'Video',
          title: 'Deployment Architecture in 5 Minutes',
          description: 'Short explainer: how Halcyon deploys alongside existing tools without conflicts',
        },
      ],
      expanded: {
        why: [
          'Infra/Ops primary concern is: "Will this break something?" All early content must address this first',
          'Performance data earns trust before any feature conversation begins',
          'OT/ICS environments (healthcare, manufacturing) have unique concerns — address them explicitly',
        ],
        instruments: [
          'Performance data sheet downloads',
          'Blog traffic from ops/infrastructure roles (6sense)',
          'Video completion rate',
        ],
        formats: ['Technical blog', 'PDF data sheet', 'Short-form video (5 min)', 'Email digest'],
        howToUse:
          'Use performance benchmark data in outreach to Infra/Ops contacts. Lead with "zero performance impact" — it\'s the objection before the evaluation even starts.',
      },
    },
    consideration: {
      preview: 'Deployment options overview\nRollback and testing procedures',
      kpi: 'Demo scheduled, deployment question list received',
      assets: [
        {
          type: 'Guide',
          title: 'Deployment Options Overview',
          description: 'Agent deployment methods: silent push, staged rollout, golden image, SCCM/Intune',
        },
        {
          type: 'FAQ',
          title: '"What If Something Goes Wrong?" Rollback Guide',
          description: 'How to cleanly uninstall Halcyon agents if needed — no residual files, clean rollback',
        },
        {
          type: 'Demo',
          title: 'Infrastructure Demo: Agent Deployment Simulation',
          description: 'Live demo of silent agent push, policy configuration, and monitoring dashboard',
        },
      ],
      expanded: {
        why: [
          'Infra/Ops needs to know: "How does it deploy and how do I undo it if needed?"',
          'Rollback documentation is counterintuitive but builds massive trust',
          'Deployment method flexibility matters — IT environments are not uniform',
        ],
        instruments: ['Demo completed (infrastructure focus)', 'Deployment FAQ downloaded', 'Rollback guide reviewed (SE note)'],
        formats: ['Deployment guide PDF', 'Rollback documentation', 'Live deployment demo', 'Technical FAQ'],
        howToUse:
          'Let the Infra/Ops lead run the demo environment. The less friction they experience in the demo, the less friction they project onto production deployment.',
      },
    },
    validation: {
      preview: 'POC deployment metrics\nProduction environment test',
      kpi: 'Test deployment completed, performance confirmed',
      assets: [
        {
          type: 'Runbook',
          title: 'Infra/Ops POC Runbook',
          description: 'Deployment steps, monitoring setup, and performance verification for infrastructure teams',
        },
        {
          type: 'Report',
          title: 'Performance Validation Report Template',
          description: "Template for documenting Halcyon's measured overhead during POC period",
        },
        {
          type: 'Guide',
          title: 'OT/ICS Safety Guide',
          description: 'Special deployment guidance for operational technology and industrial control system environments',
        },
      ],
      expanded: {
        why: [
          "Infra/Ops owns the \"it works in prod\" sign-off — their validation unlocks the deal",
          'OT/ICS-specific guide is a significant competitive differentiator for manufacturing and government',
          'Performance report template makes it easy for them to document and share results internally',
        ],
        instruments: [
          'Test deployment coverage ≥75% of target environment',
          'Performance report completed',
          'OT/ICS segment tested (if applicable)',
        ],
        formats: ['PDF deployment runbook', 'Performance report template', 'OT/ICS guide PDF', 'SE-led deployment session'],
        howToUse:
          'SE owns the first deployment session. Infra/Ops runs subsequent waves. The performance report becomes their internal documentation for the change management process.',
      },
    },
    selection: {
      preview: 'Production rollout plan\nChange management documentation',
      kpi: 'Full production deployment scheduled',
      assets: [
        {
          type: 'Plan',
          title: 'Production Rollout Plan Template',
          description: 'Phased deployment plan: pilot → department → full org. With rollback gates at each phase.',
        },
        {
          type: 'Doc',
          title: 'Change Management Package',
          description: 'Change advisory board documentation: what Halcyon does, what it changes, approval checklist',
        },
        {
          type: 'Guide',
          title: 'Monitoring and Alerting Setup Guide',
          description: 'How to configure Halcyon alerting, integrate with SIEM, and set escalation thresholds',
        },
      ],
      expanded: {
        why: [
          'Infra/Ops needs to pass change advisory board review — give them the documentation',
          'The phased rollout plan addresses their risk management concerns explicitly',
          'SIEM integration guide removes the "another alert source" objection',
        ],
        instruments: [
          'Change management package submitted to CAB',
          'Production rollout phase 1 completed',
          'SIEM integration configured',
        ],
        formats: ['Rollout plan template', 'CAB documentation package', 'SIEM integration guide', 'CS engineering contact'],
        howToUse:
          'Infra/Ops owns the CAB package — Halcyon co-authors it. Assign a CS engineer for SIEM integration setup. Phase 1 rollout is the go-live milestone that triggers CS onboarding.',
      },
    },
  },

  cfo: {
    awareness: {
      preview: 'Ransomware financial exposure\nInsurance premium analysis',
      kpi: 'Finance newsletter engagement, CFO report downloads',
      assets: [
        {
          type: 'Report',
          title: '"Ransomware Financial Exposure" CFO Brief',
          description: 'Quantified: average ransomware downtime cost, recovery cost, insurance premium impact',
        },
        {
          type: 'Model',
          title: 'Ransomware Cost-of-Inaction Calculator',
          description: 'Spreadsheet model: probability × cost = expected annual loss from ransomware',
        },
        {
          type: 'Article',
          title: '"What Ransomware Costs CFOs Who Were Unprepared"',
          description: "Named case study: a CFO's account of ransomware impact on the business",
        },
      ],
      expanded: {
        why: [
          'CFOs are often invisible in the buying process until final approval — surface them early',
          "The expected annual loss model speaks the CFO's language: probability × impact",
          "Insurance premium reduction is often the CFO's primary lens for security investment",
        ],
        instruments: [
          'CFO-role contacts engaged with financial content (6sense)',
          'Cost calculator downloaded or used',
          'CFO identified as economic buyer in Salesforce',
        ],
        formats: ['Executive brief PDF', 'Excel/Google Sheets model', 'LinkedIn article', 'Executive email series'],
        howToUse:
          'Get this content in front of the CFO before the CISO brings it to them. If the CFO discovers the ROI on their own, they become a champion — not a gatekeeper.',
      },
    },
    consideration: {
      preview: 'ROI framework\nInsurance premium reduction case',
      kpi: 'CFO engaged in discovery, finance meeting scheduled',
      assets: [
        {
          type: 'Framework',
          title: '"Ransomware ROI Framework"',
          description: 'Three levers: downtime avoided, ransom payment avoided, insurance premium reduced',
        },
        {
          type: 'Brief',
          title: 'Cyber Insurance Premium Reduction Brief',
          description: 'How Halcyon deployment satisfies insurer requirements and reduces premiums by 15–25%',
        },
        {
          type: 'Reference',
          title: '"I\'ll Never Pay Ransom Again" — CFO Peer Story',
          description: 'CFO peer account: Halcyon paid for itself in Year 1 through premium reduction alone',
        },
      ],
      expanded: {
        why: [
          'CFO needs to see the three-part ROI: avoid downtime, avoid ransom, reduce insurance',
          'Insurance premium reduction is often the fastest payback — leads to fastest CFO approval',
          'Peer CFO reference is more persuasive than analyst data at this stage',
        ],
        instruments: ['ROI framework reviewed (AE note in Salesforce)', 'Finance team meeting scheduled', 'Insurance broker conversation initiated'],
        formats: ['One-page ROI framework', 'Insurance premium brief', 'CFO peer reference call', 'Finance team presentation'],
        howToUse:
          'Schedule a dedicated CFO conversation — not as part of the CISO call. Finance needs their own time to ask financial questions. Bring the insurance premium data with named insurer examples.',
      },
    },
    validation: {
      preview: 'Business case model\nInsurance attestation value',
      kpi: 'Budget approved, finance sign-off received',
      assets: [
        {
          type: 'Model',
          title: 'Full Business Case Model',
          description: 'Pre-built model with CFO-ready inputs: cost, probability, downtime hours, premium delta',
        },
        {
          type: 'Letter',
          title: 'Insurance Broker Attestation Letter',
          description: 'Template letter from Halcyon confirming ransomware protection for insurance underwriting',
        },
        {
          type: 'Comparison',
          title: '"Cost of Halcyon vs. Cost of One Incident"',
          description: 'Simple one-page comparison: annual Halcyon cost vs. average ransomware incident cost',
        },
      ],
      expanded: {
        why: [
          "The business case model IS the CFO's validation — give them the model, not a summary",
          'Insurance attestation letter is a concrete deliverable that drives CFO urgency',
          'One-page cost comparison is what CFOs share with CEOs and boards',
        ],
        instruments: ['Business case model returned with CFO inputs', 'Budget approved (Salesforce stage 4)', 'Insurance broker conversation confirmed'],
        formats: ['Excel business case model', 'Attestation letter template', 'One-page cost comparison', 'Board-ready summary deck'],
        howToUse:
          "Co-build the business case model with the CFO — their numbers, their assumptions. Offer to present to the board if needed. The attestation letter should be ready to issue on signature.",
      },
    },
    selection: {
      preview: 'Contract ROI summary\nFirst-year value delivery plan',
      kpi: 'Contract signed, Year 1 value milestone documented',
      assets: [
        {
          type: 'Summary',
          title: 'Contract ROI Summary',
          description: 'What the CFO approved: cost, expected ROI, Year 1 and Year 3 milestones',
        },
        {
          type: 'Plan',
          title: 'Year 1 Value Delivery Plan',
          description: 'Quarterly milestones: deployment coverage, premium reduction confirmed, QBR schedule',
        },
        {
          type: 'Report',
          title: 'Post-Implementation Value Report Template',
          description: 'Template for CS to deliver to CFO 90 days post-deployment: coverage, incidents detected, premium impact',
        },
      ],
      expanded: {
        why: [
          'CFO approved a number — make sure they see it delivered in Year 1',
          'Quarterly value delivery milestones prevent churn and secure renewal conversations',
          "Post-implementation report is the CS team's renewal insurance",
        ],
        instruments: ['Contract signed with documented ROI expectations', 'Year 1 milestone plan accepted', '90-day value report delivered'],
        formats: ['Contract ROI summary', 'Quarterly milestone plan', '90-day value report template', 'CS QBR deck'],
        howToUse:
          "Deliver the Year 1 value plan to the CFO on Day 1 — before they have a chance to wonder \"what did I just buy?\" CS owns the quarterly delivery. Every QBR includes an ROI progress summary.",
      },
    },
  },
}
