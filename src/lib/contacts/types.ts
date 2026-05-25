import type { Json } from '@/lib/supabase/database.types'
export type { Json }

export type Source = 'apollo' | 'linkedin' | 'vibe_prospecting' | 'facebook' | 'manual'

export type Segment = 'c_suite_startup_oc' | 'agency_leadership' | 'group_leader'

export interface RawContact {
  fullName: string
  email?: string | null
  linkedinUrl?: string | null
  company?: string | null
  title?: string | null
  segment?: Segment | null
  location?: string | null
  notes?: string | null
  sourceId?: string | null
  raw?: Json | null
}

export type ToolId = 'behavioral-scoring' | 'gtm-calculator' | 'content-journey'

export interface ToolEmbed {
  id: ToolId
  headline?: string
  preset?: Record<string, string | number | boolean>
}

export interface OutreachPage {
  slug: string
  company: string | null
  industry: string | null
  role: string | null
  pain_point: string | null
  tools: ToolEmbed[] | null
  cta_text: string | null
  cta_href: string | null
  published_at: string | null
  view_count: number | null
}
