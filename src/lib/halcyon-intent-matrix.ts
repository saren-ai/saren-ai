export type IntentLevel = 'none' | 'low' | 'medium' | 'high' | 'very-high' | 'critical'
export type Vertical = 'all' | 'healthcare' | 'manufacturing' | 'government' | 'retail'

export interface IntentCellData {
  level: Record<Vertical, IntentLevel>
  exampleQueries: string[]
  dealValue: string
  outreachStrategy: string
  contentRecommendation: string
}

export interface IntentTopic {
  id: string
  label: string
  description: string
}

export interface TimeWindow {
  id: string
  label: string
  sublabel: string
}

export const VERTICALS: { id: Vertical; label: string }[] = [
  { id: 'all', label: 'All Verticals' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'government', label: 'Government' },
  { id: 'retail', label: 'Retail / Financial' },
]

export const TIME_WINDOWS: TimeWindow[] = [
  { id: 'w18', label: '18mo', sublabel: 'Before close' },
  { id: 'w15', label: '15mo', sublabel: 'Before close' },
  { id: 'w12', label: '12mo', sublabel: 'Before close' },
  { id: 'w9', label: '9mo', sublabel: 'Before close' },
  { id: 'w6', label: '6mo', sublabel: 'Before close' },
  { id: 'w3', label: '3mo', sublabel: 'Before close' },
  { id: 'w1', label: '1mo', sublabel: 'Before close' },
]

export const INTENT_TOPICS: IntentTopic[] = [
  {
    id: 'ransomware-general',
    label: 'Ransomware Awareness',
    description: 'General ransomware risk research across the buying team',
  },
  {
    id: 'edr-gap',
    label: 'EDR Gap Research',
    description: "Searches exposing CrowdStrike/SentinelOne ransomware blind spot",
  },
  {
    id: 'encryption-recovery',
    label: 'Encryption Recovery',
    description: 'Active incident response or recovery planning searches',
  },
  {
    id: 'halcyon-brand',
    label: 'Halcyon Brand Intent',
    description: 'Direct Halcyon brand + competitor comparison searches',
  },
  {
    id: 'insurance-compliance',
    label: 'Insurance / Compliance',
    description: 'Cyber insurance, CMMC, audit-driven demand signals',
  },
  {
    id: 'peer-incident',
    label: 'Peer Incident Trigger',
    description: 'Vertical peer attacked — buying team awareness spikes',
  },
]

// INTENT_CELLS[topicId][windowId] = IntentCellData
export const INTENT_CELLS: Record<string, Record<string, IntentCellData>> = {
  'ransomware-general': {
    w18: {
      level: { all: 'low', healthcare: 'medium', manufacturing: 'low', government: 'medium', retail: 'low' },
      exampleQueries: ['ransomware statistics 2024', 'ransomware attack prevention', 'enterprise ransomware risk'],
      dealValue: 'Low — awareness only, no budget motion yet',
      outreachStrategy: 'Nurture only. Educational newsletter. No BDR contact.',
      contentRecommendation: '"State of Ransomware" annual report. Vertical-specific threat brief.',
    },
    w15: {
      level: { all: 'low', healthcare: 'medium', manufacturing: 'medium', government: 'medium', retail: 'low' },
      exampleQueries: ['ransomware attack cost 2024', 'ransomware recovery time', 'ransomware defense strategy'],
      dealValue: 'Low — research mode, no active buying motion',
      outreachStrategy: 'LinkedIn content only. Thought leadership impressions.',
      contentRecommendation: '"True Cost of Ransomware" calculator. Peer benchmark report.',
    },
    w12: {
      level: { all: 'medium', healthcare: 'high', manufacturing: 'medium', government: 'high', retail: 'medium' },
      exampleQueries: ['ransomware impact on healthcare', 'ransomware CISO responsibility', 'board ransomware mandate'],
      dealValue: 'Medium — board mandate forming. 12-month buying horizon.',
      outreachStrategy: 'BDR email sequence begins. Value-first framing. No pitch.',
      contentRecommendation: '"Board-Level Ransomware Briefing" deck. CISO peer case study.',
    },
    w9: {
      level: { all: 'medium', healthcare: 'high', manufacturing: 'high', government: 'high', retail: 'medium' },
      exampleQueries: ['ransomware vendor evaluation', 'anti-ransomware platform comparison', 'ransomware protection ROI'],
      dealValue: 'Medium-High — vendor evaluation starting.',
      outreachStrategy: 'Multi-touch: email + LinkedIn + webinar invite.',
      contentRecommendation: "\"Ransomware Platform Buyer's Guide.\" Analyst validation.",
    },
    w6: {
      level: { all: 'high', healthcare: 'very-high', manufacturing: 'high', government: 'very-high', retail: 'high' },
      exampleQueries: ['ransomware protection for hospitals', 'enterprise anti-ransomware 2024', 'ransomware backup not enough'],
      dealValue: 'High — active evaluation. Discovery call in window.',
      outreachStrategy: 'AE qualified outreach. Offer "Ransomware Gap" briefing call.',
      contentRecommendation: '"Why Backup Isn\'t Enough" webinar. Technical demo.',
    },
    w3: {
      level: { all: 'very-high', healthcare: 'critical', manufacturing: 'very-high', government: 'critical', retail: 'very-high' },
      exampleQueries: ['ransomware key capture technology', 'halcyon vs crowdstrike ransomware', 'ransomware proof of concept'],
      dealValue: 'Very High — competitive evaluation. Proposal stage.',
      outreachStrategy: 'AE daily cadence. Executive sponsor engagement. CISO peer call.',
      contentRecommendation: '"Halcyon vs EDR" competitive brief. POC runbook.',
    },
    w1: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon ai pricing', 'halcyon ransomware contract', 'halcyon MSA review'],
      dealValue: 'Critical — close stage. Procurement engaged.',
      outreachStrategy: 'Executive sponsor + procurement. Legal/MSA acceleration.',
      contentRecommendation: 'ROI summary deck. Reference customer calls. Mutual close plan.',
    },
  },

  'edr-gap': {
    w18: {
      level: { all: 'none', healthcare: 'low', manufacturing: 'none', government: 'low', retail: 'none' },
      exampleQueries: ['crowdstrike ransomware protection gap', 'sentinelone ransomware coverage'],
      dealValue: 'None — too early, no active buying signal',
      outreachStrategy: 'No action. Watch for escalation.',
      contentRecommendation: 'None. Wait for intent escalation.',
    },
    w15: {
      level: { all: 'low', healthcare: 'low', manufacturing: 'low', government: 'medium', retail: 'none' },
      exampleQueries: ['edr ransomware gap', 'does crowdstrike stop ransomware', 'edr limitations ransomware'],
      dealValue: 'Low — research mode, not yet operational',
      outreachStrategy: 'Nurture with EDR gap content. No BDR.',
      contentRecommendation: '"The EDR Ransomware Gap" white paper.',
    },
    w12: {
      level: { all: 'medium', healthcare: 'medium', manufacturing: 'high', government: 'medium', retail: 'medium' },
      exampleQueries: ['crowdstrike ransomware gap explained', 'edr vs anti-ransomware platform', 'sentinelone stop ransomware encryption'],
      dealValue: 'Medium — differentiation research. CISO-level.',
      outreachStrategy: "BDR email: \"The gap your EDR can't close.\" Technical framing.",
      contentRecommendation: '"CrowdStrike + Halcyon: Better Together" brief.',
    },
    w9: {
      level: { all: 'high', healthcare: 'high', manufacturing: 'very-high', government: 'high', retail: 'high' },
      exampleQueries: ['crowdstrike halcyon integration', 'anti-ransomware layer above edr', 'edr supplemental ransomware protection'],
      dealValue: 'High — actively building business case.',
      outreachStrategy: 'Offer CISO briefing: "Why CrowdStrike customers buy Halcyon."',
      contentRecommendation: 'CISO briefing deck. Technical architecture diagram.',
    },
    w6: {
      level: { all: 'very-high', healthcare: 'critical', manufacturing: 'critical', government: 'very-high', retail: 'very-high' },
      exampleQueries: ['edr gap ransomware encryption keys', 'ransomware key recovery technology', 'halcyon encryption key capture'],
      dealValue: 'Very High — Halcyon-specific differentiation search.',
      outreachStrategy: 'AE outreach. Technical demo: encryption key capture demonstration.',
      contentRecommendation: '"Encryption Key Capture" technical explainer. Demo video.',
    },
    w3: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon edr gap proof', 'halcyon ransomware poc results', 'halcyon vs crowdstrike evaluation'],
      dealValue: 'Critical — competitive differentiation in active deal.',
      outreachStrategy: 'AE + SE. Competitive battle card. Side-by-side POC.',
      contentRecommendation: 'Competitive battle card. POC results summary. Reference call.',
    },
    w1: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon contract terms', 'halcyon support sla', 'halcyon implementation timeline'],
      dealValue: 'Critical — deal close. Implementation planning.',
      outreachStrategy: 'CS intro. Procurement fast-track. Implementation kickoff.',
      contentRecommendation: 'Implementation guide. Customer success intro packet.',
    },
  },

  'encryption-recovery': {
    w18: {
      level: { all: 'none', healthcare: 'none', manufacturing: 'none', government: 'none', retail: 'none' },
      exampleQueries: [],
      dealValue: 'None — too early',
      outreachStrategy: 'No action.',
      contentRecommendation: 'None.',
    },
    w15: {
      level: { all: 'none', healthcare: 'low', manufacturing: 'none', government: 'none', retail: 'none' },
      exampleQueries: ['ransomware recovery planning', 'ransomware tabletop exercise'],
      dealValue: 'None — planning mode only',
      outreachStrategy: 'No action.',
      contentRecommendation: 'IR planning template.',
    },
    w12: {
      level: { all: 'low', healthcare: 'medium', manufacturing: 'low', government: 'medium', retail: 'low' },
      exampleQueries: ['ransomware recovery cost 2024', 'ransomware decryption without paying', 'ransomware backup recovery time'],
      dealValue: 'Low — incident planning, not post-incident',
      outreachStrategy: 'Educational nurture. Tabletop exercise invitation.',
      contentRecommendation: '"Ransomware Recovery Playbook." Tabletop exercise guide.',
    },
    w9: {
      level: { all: 'medium', healthcare: 'high', manufacturing: 'medium', government: 'high', retail: 'medium' },
      exampleQueries: ['ransomware recovery without paying ransom', 'ransomware key recovery tools', 'how to decrypt ransomware files'],
      dealValue: 'Medium — may have experienced a test incident or near-miss',
      outreachStrategy: 'BDR outreach: "Recover without paying." Key capture framing.',
      contentRecommendation: '"Zero Ransom Paid: How Key Capture Works" video.',
    },
    w6: {
      level: { all: 'high', healthcare: 'very-high', manufacturing: 'high', government: 'very-high', retail: 'high' },
      exampleQueries: ['ransomware incident recovery time', 'ransomware attack response team', 'post-ransomware business continuity'],
      dealValue: 'High — likely post-incident or peer incident triggered',
      outreachStrategy: 'AE fast-track. Offer IR retainer or immediate POC.',
      contentRecommendation: '"Halcyon Incident Response Partnership" brief.',
    },
    w3: {
      level: { all: 'very-high', healthcare: 'critical', manufacturing: 'very-high', government: 'critical', retail: 'very-high' },
      exampleQueries: ['ransomware containment halcyon', 'ransomware kill switch technology', 'halcyon ransomware incident response'],
      dealValue: 'Very High — urgent buying motion, often post-incident',
      outreachStrategy: 'Emergency response motion. CISO direct. Procurement bypass if needed.',
      contentRecommendation: 'IR partnership SLA. 24hr deployment case study.',
    },
    w1: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon emergency deployment', 'halcyon ransomware response sla'],
      dealValue: 'Critical — emergency procurement motion',
      outreachStrategy: 'CEO/CTO escalation path. Emergency contract vehicle.',
      contentRecommendation: 'Emergency deployment SLA. Government contract vehicle.',
    },
  },

  'halcyon-brand': {
    w18: {
      level: { all: 'none', healthcare: 'none', manufacturing: 'none', government: 'none', retail: 'none' },
      exampleQueries: [],
      dealValue: 'None',
      outreachStrategy: 'No action.',
      contentRecommendation: 'None.',
    },
    w15: {
      level: { all: 'none', healthcare: 'none', manufacturing: 'none', government: 'none', retail: 'none' },
      exampleQueries: ['halcyon ai security', 'halcyon cybersecurity'],
      dealValue: 'None — casual brand awareness',
      outreachStrategy: 'No action.',
      contentRecommendation: 'None.',
    },
    w12: {
      level: { all: 'low', healthcare: 'low', manufacturing: 'low', government: 'medium', retail: 'low' },
      exampleQueries: ['halcyon ai review', 'halcyon ai cybersecurity', 'halcyon anti-ransomware'],
      dealValue: 'Low — early brand evaluation',
      outreachStrategy: 'Nurture: third-party review content, analyst mentions.',
      contentRecommendation: 'G2/Gartner Peer Insights review campaign. Analyst brief.',
    },
    w9: {
      level: { all: 'medium', healthcare: 'medium', manufacturing: 'high', government: 'medium', retail: 'medium' },
      exampleQueries: ['halcyon vs crowdstrike', 'halcyon vs sentinelone', 'halcyon ai platform demo'],
      dealValue: 'Medium — active competitive research',
      outreachStrategy: "BDR: \"Seen you're evaluating [competitor] — here's what they can't stop.\"",
      contentRecommendation: '"Halcyon + Your EDR" competitive comparison brief.',
    },
    w6: {
      level: { all: 'high', healthcare: 'high', manufacturing: 'very-high', government: 'high', retail: 'high' },
      exampleQueries: ['halcyon demo request', 'halcyon pricing 2024', 'halcyon customer reviews'],
      dealValue: 'High — in active evaluation, Halcyon on shortlist',
      outreachStrategy: 'AE engaged. Trial/POC acceleration. CISO reference call.',
      contentRecommendation: 'Demo + POC kit. Customer success stories by vertical.',
    },
    w3: {
      level: { all: 'very-high', healthcare: 'critical', manufacturing: 'very-high', government: 'very-high', retail: 'very-high' },
      exampleQueries: ['halcyon contract negotiation', 'halcyon security assessment', 'halcyon proof of value results'],
      dealValue: 'Very High — Halcyon is the preferred vendor',
      outreachStrategy: 'Executive sponsor align. Legal review. Procurement fast-track.',
      contentRecommendation: 'ROI model. Mutual success plan. Reference site visit.',
    },
    w1: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon implementation plan', 'halcyon onboarding', 'halcyon contract finalize'],
      dealValue: 'Critical — deal at close',
      outreachStrategy: 'CS intro. Executive sponsor handoff. Implementation kickoff.',
      contentRecommendation: 'Implementation guide. Executive success plan. QBR template.',
    },
  },

  'insurance-compliance': {
    w18: {
      level: { all: 'low', healthcare: 'medium', manufacturing: 'low', government: 'high', retail: 'medium' },
      exampleQueries: ['cyber insurance ransomware requirements', 'CMMC ransomware controls', 'cyber insurance questionnaire endpoint'],
      dealValue: 'Low — compliance research, not yet budget motion',
      outreachStrategy: 'Compliance-angle nurture. CMMC/HIPAA framing.',
      contentRecommendation: '"Ransomware Controls for Cyber Insurance" checklist.',
    },
    w15: {
      level: { all: 'medium', healthcare: 'high', manufacturing: 'medium', government: 'high', retail: 'medium' },
      exampleQueries: ['cyber insurance renewal ransomware coverage', 'ransomware compliance requirements 2024', 'hipaa ransomware incident reporting'],
      dealValue: 'Medium — insurance renewal cycle beginning',
      outreachStrategy: 'Insurance angle: "Reduce your premium with Halcyon attestation."',
      contentRecommendation: '"How Halcyon Satisfies Cyber Insurance Requirements" brief.',
    },
    w12: {
      level: { all: 'high', healthcare: 'very-high', manufacturing: 'high', government: 'very-high', retail: 'high' },
      exampleQueries: ['ransomware insurance premium reduction', 'cyber insurer anti-ransomware requirements', 'CMMC 2.0 ransomware controls'],
      dealValue: 'High — insurance/compliance driving buying motion',
      outreachStrategy: '"Your insurer is about to ask about this." Urgency framing.',
      contentRecommendation: '"Halcyon Insurance Attestation Letter" template. CISO briefing.',
    },
    w9: {
      level: { all: 'high', healthcare: 'critical', manufacturing: 'high', government: 'very-high', retail: 'high' },
      exampleQueries: ['anti-ransomware platform insurance discount', 'halcyon cyber insurance', 'ransomware controls audit'],
      dealValue: 'High — active vendor evaluation driven by compliance deadline',
      outreachStrategy: 'AE engaged. Deadline-driven urgency. Insurance broker alignment.',
      contentRecommendation: 'Insurance partner co-sell kit. Compliance mapping matrix.',
    },
    w6: {
      level: { all: 'very-high', healthcare: 'critical', manufacturing: 'very-high', government: 'critical', retail: 'very-high' },
      exampleQueries: ['ransomware vendor insurance requirement', 'halcyon attestation letter', 'cyber insurance vendor certification'],
      dealValue: 'Very High — renewal date approaching, vendor decision imminent',
      outreachStrategy: 'Accelerate: offer insurance attestation on signature. Deadline urgency.',
      contentRecommendation: 'Executed attestation template. Insurance partner reference.',
    },
    w3: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon insurance paperwork', 'cyber insurance ransomware attestation', 'anti-ransomware contract for insurance'],
      dealValue: 'Critical — compliance deadline is close trigger',
      outreachStrategy: 'Expedited procurement. Insurance broker on call. 30-day close.',
      contentRecommendation: 'Fast-track implementation SLA. Insurance partner co-sign letter.',
    },
    w1: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon final contract', 'halcyon insurance attestation finalize'],
      dealValue: 'Critical — deal at close, compliance date is hard stop',
      outreachStrategy: 'CEO/CISO alignment. Contract signed before renewal date.',
      contentRecommendation: 'Signed attestation. Executive alignment memo.',
    },
  },

  'peer-incident': {
    w18: {
      level: { all: 'none', healthcare: 'low', manufacturing: 'none', government: 'none', retail: 'none' },
      exampleQueries: ['ransomware attack hospital 2024', 'healthcare ransomware incident'],
      dealValue: 'None — ambient awareness, not targeted',
      outreachStrategy: 'No action.',
      contentRecommendation: 'None.',
    },
    w15: {
      level: { all: 'low', healthcare: 'medium', manufacturing: 'low', government: 'low', retail: 'low' },
      exampleQueries: ['manufacturing ransomware attack', 'ransomware OT systems', 'hospital ransomware response'],
      dealValue: 'Low — watching but not acting',
      outreachStrategy: 'Nurture with vertical-specific threat report.',
      contentRecommendation: 'Vertical threat brief. Peer company case study.',
    },
    w12: {
      level: { all: 'medium', healthcare: 'very-high', manufacturing: 'high', government: 'high', retail: 'medium' },
      exampleQueries: ['hospital ransomware patient data 2024', 'manufacturer supply chain ransomware', 'government ransomware critical infrastructure'],
      dealValue: 'Medium — peer incident awareness creates board urgency',
      outreachStrategy: '"Your peer company just got hit. Here\'s what they used." 48hr window.',
      contentRecommendation: 'Incident flash report. "What would have stopped it" brief.',
    },
    w9: {
      level: { all: 'high', healthcare: 'critical', manufacturing: 'very-high', government: 'critical', retail: 'high' },
      exampleQueries: ['prevent ransomware like peer company', 'ransomware attack same industry', 'how did they stop the ransomware'],
      dealValue: 'High — peer incident driving board mandate',
      outreachStrategy: 'AE involved. Board presentation ready. Reference customer in same vertical.',
      contentRecommendation: '"How Halcyon Would Have Stopped [Peer Attack]" briefing.',
    },
    w6: {
      level: { all: 'very-high', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'very-high' },
      exampleQueries: ['anti-ransomware platform peer company uses', 'ransomware key capture peer validated', 'halcyon customer same industry'],
      dealValue: 'Very High — peer incident is the buying trigger, deal momentum high',
      outreachStrategy: 'Executive sponsor engaged. Reference site visit. Fast-track POC.',
      contentRecommendation: 'Peer customer reference. "Protected during active attack" case study.',
    },
    w3: {
      level: { all: 'very-high', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'very-high' },
      exampleQueries: ['halcyon proof same vertical', 'halcyon manufacturing reference', 'anti-ransomware contract urgent'],
      dealValue: 'Very High — urgency-driven deal, possibly fast-tracked',
      outreachStrategy: 'CEO urgency. Emergency procurement. 30-day close path.',
      contentRecommendation: 'Vertical peer reference call. Emergency deployment case study.',
    },
    w1: {
      level: { all: 'critical', healthcare: 'critical', manufacturing: 'critical', government: 'critical', retail: 'critical' },
      exampleQueries: ['halcyon deployment schedule', 'ransomware protection now'],
      dealValue: 'Critical — board-mandated emergency deployment',
      outreachStrategy: 'Expedited procurement. Board-level urgency. CEO handshake.',
      contentRecommendation: 'Emergency deployment guide. Board-level risk summary.',
    },
  },
}
