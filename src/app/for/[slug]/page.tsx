import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { OutreachPage } from '@/lib/contacts/types'
import OutreachPageClient from './PageClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('outreach_pages')
    .select('company, role, pain_point')
    .eq('slug', slug)
    .maybeSingle()

  if (!data) return { title: 'Saren Sakurai' }

  return {
    title: `Built for ${data.company ?? 'You'} — Saren Sakurai`,
    description: `A working demonstration of how I approach ${data.pain_point ?? 'your growth challenges'}.`,
    robots: { index: false, follow: false },
  }
}

export default async function OutreachPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('outreach_pages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!data) notFound()

  // Fire-and-forget view count — don't await, don't block render
  supabase.rpc('increment_page_view', { page_slug: slug })

  return <OutreachPageClient page={data as OutreachPage} />
}
