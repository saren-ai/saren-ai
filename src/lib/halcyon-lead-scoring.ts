export type InputType = 'radio' | 'checkbox'

export interface ScoreOption {
  label: string
  value: number
  tag?: string  // e.g. "IDEAL", "HIGH VALUE"
}

export interface ScoreCategory {
  id: string
  label: string
  type: InputType
  options: ScoreOption[]
}

export interface ScoreSection {
  id: string
  title: string
  subtitle: string
  maxPoints: number
  categories: ScoreCategory[]
}

export interface StatusBand {
  min: number
  max: number
  label: string
  color: string   // Tailwind text color class
  bg: string      // Tailwind bg color class
  action: string
  detail: string
}

export const FIT_SECTION: ScoreSection = {
  id: 'fit',
  title: 'Fit Score',
  subtitle: 'Does this company match the Halcyon ICP?',
  maxPoints: 50,
  categories: [
    {
      id: 'company-size',
      label: 'Company Size',
      type: 'radio',
      options: [
        { label: '<500 employees', value: 0 },
        { label: '500–1,000', value: 5 },
        { label: '1,000–5,000', value: 10, tag: 'IDEAL' },
        { label: '5,000+', value: 8, tag: 'slower cycle' },
      ],
    },
    {
      id: 'vertical',
      label: 'Industry Vertical',
      type: 'radio',
      options: [
        { label: 'Manufacturing', value: 10, tag: 'PRIMARY' },
        { label: 'Healthcare', value: 10, tag: 'PRIMARY' },
        { label: 'Government / Public Sector', value: 9, tag: 'HIGH VALUE' },
        { label: 'Retail / Financial Services', value: 7, tag: 'SECONDARY' },
        { label: 'Technology (SaaS/Cloud)', value: 4, tag: 'many EDR options' },
        { label: 'Other', value: 2 },
      ],
    },
    {
      id: 'security-posture',
      label: 'Current Security Stack',
      type: 'radio',
      options: [
        { label: 'Has CrowdStrike or SentinelOne deployed', value: 10, tag: 'perfect fit — Ransomware Gap conversation' },
        { label: 'Has Microsoft Defender', value: 6 },
        { label: 'Basic endpoint security only', value: 3 },
        { label: 'No EDR deployed', value: 0, tag: 'NOT ICP' },
      ],
    },
    {
      id: 'ransomware-pressure',
      label: 'Ransomware Pressure Signal',
      type: 'radio',
      options: [
        { label: 'Recent ransomware incident or near-miss', value: 10 },
        { label: 'Board-level ransomware mandate in place', value: 10 },
        { label: 'Cyber insurance renewal pressure', value: 8 },
        { label: 'Peer company ransomware incident (same vertical)', value: 7 },
        { label: 'Compliance / audit pressure', value: 6 },
        { label: 'No detected pressure', value: 0 },
      ],
    },
    {
      id: 'budget',
      label: 'Budget Signal',
      type: 'radio',
      options: [
        { label: 'Recent security vendor purchase (past 12mo)', value: 8 },
        { label: 'Security spend confirmed >$1M annually', value: 7 },
        { label: 'CISO or VP Security hired in last 6 months', value: 6 },
        { label: 'Funding round or IPO in last 12 months', value: 5 },
        { label: 'No budget signals detected', value: 0 },
      ],
    },
  ],
}

export const ENGAGEMENT_SECTION: ScoreSection = {
  id: 'engagement',
  title: 'Engagement Score',
  subtitle: 'Is this buyer showing buying signals?',
  maxPoints: 50,
  categories: [
    {
      id: 'website',
      label: 'Website Behavior',
      type: 'checkbox',
      options: [
        { label: 'Visited pricing page', value: 3 },
        { label: 'Downloaded whitepaper or technical guide', value: 4 },
        { label: 'Visited product features (3+ pages)', value: 4 },
        { label: 'Watched product demo or video', value: 4 },
        { label: 'Spent 5+ minutes on site in a single session', value: 2 },
      ],
    },
    {
      id: 'email',
      label: 'Email Engagement',
      type: 'checkbox',
      options: [
        { label: 'Opened email 2+ times', value: 2 },
        { label: 'Clicked link in email', value: 3 },
        { label: 'Replied to email', value: 5 },
      ],
    },
    {
      id: 'paid',
      label: 'Paid Media & Search Intent',
      type: 'checkbox',
      options: [
        { label: 'Clicked Halcyon ad (SEM or display)', value: 3 },
        { label: 'Searched "Halcyon" + competitor term', value: 5, tag: 'HIGH INTENT' },
        { label: 'Searched "ransomware" + "EDR gap" variant', value: 3 },
        { label: 'Triggered high-intent keyword from SEM', value: 4 },
        { label: 'Clicked retargeting ad', value: 2 },
      ],
    },
    {
      id: 'intent-tier',
      label: '6sense / Bombora Account Intent Tier',
      type: 'radio',
      options: [
        { label: '6sense Tier A — highest intent', value: 10 },
        { label: '6sense Tier B — medium-high intent', value: 7 },
        { label: '6sense Tier C — emerging intent', value: 4 },
        { label: 'No intent data detected', value: 0 },
      ],
    },
    {
      id: 'events',
      label: 'Webinars & Events',
      type: 'checkbox',
      options: [
        { label: 'Registered for webinar or virtual event', value: 3 },
        { label: 'Attended webinar (60%+ duration)', value: 5 },
        { label: 'Downloaded post-webinar materials', value: 3 },
      ],
    },
  ],
}

export const STATUS_BANDS: StatusBand[] = [
  {
    min: 0,
    max: 29,
    label: 'Not Qualified',
    color: 'text-slate',
    bg: 'bg-slate/10',
    action: 'Add to nurture list only',
    detail: 'Monthly educational drip. No BDR outreach. Historical data shows <5% conversion from this band regardless of engagement.',
  },
  {
    min: 30,
    max: 59,
    label: 'MQL',
    color: 'text-electric',
    bg: 'bg-electric/10',
    action: 'BDR outreach begins',
    detail: 'Value-first email sequence. Educational content, no sales pitch. Response rate peaks 9–12 months before close window.',
  },
  {
    min: 60,
    max: 74,
    label: 'Warm Lead',
    color: 'text-copper',
    bg: 'bg-copper/10',
    action: 'Aggressive multi-channel follow-up',
    detail: 'Email + LinkedIn + phone within 48 hours. Offer CISO peer conversation or "Ransomware Gap" briefing call.',
  },
  {
    min: 75,
    max: 100,
    label: 'SQL — Sales Ready',
    color: 'text-ember',
    bg: 'bg-ember/10',
    action: 'Immediate AE assignment',
    detail: 'AE assigned same day. Discovery call booking within 24 hours. Score crosses 75 → Salesforce lead routed automatically.',
  },
]
