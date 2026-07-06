export type Stage = "sourced" | "enriched" | "sequenced" | "in_outreach" | "replied" | "meeting_booked";
export type NextAction = "enrich" | "write_sequence" | "review_and_send" | "send_next_touch" | "respond" | "prep_meeting";

export type Decision = "approved" | "rejected" | "archived";

// Research depth for the approve verdict (agent_jobs.params.depth).
export type ResearchDepth = "light" | "medium";

// Quick-pick reasons for archiving from the Inbox (mid-conversation context).
export type InboxArchiveReason =
  | "no-thank-you"
  | "not-interested"
  | "wrong-timing"
  | "bounced"
  | "other";

export type RejectReason =
  | "know-them"
  | "wrong-seniority"
  | "wrong-company"
  | "competitor"
  | "bad-timing"
  | "not-icp"
  | "other";

export interface PipelineContact {
  contact_id: string;
  client_id: string | null;
  client: string | null;
  company_id: string | null;
  company: string | null;
  full_name: string;
  title: string | null;
  segment: string | null;
  fit_score: number | null;
  email: string | null;
  linkedin_url: string | null;
  stage: Stage;
  next_action: NextAction;
  next_due: string | null;
  overdue: boolean;
  priority: number;
  // 008 SLA fields: latest dashboard approval + when the 24h outbound clock
  // breaches (approval→first-touch, or touch-due→sent). Null = no clock.
  approved_at: string | null;
  sla_due_at: string | null;
}

export interface Contact {
  id: string;
  full_name: string;
  email: string | null;
  linkedin_url: string | null;
  company: string | null;
  title: string | null;
  segment: string | null;
  location: string | null;
  notes: string | null;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  email_status: string;
  client: string | null;
  apollo_id: string | null;
  archived: boolean;
  status: string;
  last_action_date: string | null;
  fit_rationale: string | null;
  personalization_seed: string | null;
  recommended_angle: string | null;
  scheduled_date: string | null;
  fit_score: number | null;
  stage: string | null;
  seniority: string | null;
  buying_role_hypothesis: string | null;
  company_id: string | null;
}

export interface Company {
  id: string;
  name: string;
  domain: string | null;
  url: string | null;
  industry: string | null;
  employee_count: number | null;
  segment: string | null;
  fit_score: number | null;
  fit_rationale: string | null;
  funded_recently: boolean | null;
  funding_date: string | null;
  funding_round: string | null;
  funding_amount: string | null;
  has_marketing_gap: boolean | null;
  marketing_gap_signal: string | null;
}

export interface Sequence {
  id: string;
  contact_id: string | null;
  play: string;
  status: string | null;
  subject_a: string | null;
  subject_b: string | null;
  email_body: string | null;
  linkedin_connect_msg: string | null;
  linkedin_day10_msg: string | null;
  updated_at: string | null;
  started_at: string | null;
}

// One-sentence-per-message thread digest (cached in tool_outputs, keyed by
// Gmail UID — only new messages are re-summarized).
export interface ThreadSummary {
  uid: number;
  date: string;
  from: string;
  isOutbound: boolean;
  sentence: string;
}

export interface GmailMessage {
  uid: number;
  date: string;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  body: string;
  isOutbound: boolean;
}

export interface Touch {
  id: string;
  sequence_id: string | null;
  touch_num: number;
  channel: string | null;
  status: string | null;
  scheduled_at: string | null;
  sent_at: string | null;
  notes: string | null;
  subject: string | null;
  body_md: string | null;
  thread: Array<{ role: string; content: string; at: string }>;
  reply_at: string | null;
  sentiment: string | null;
}
