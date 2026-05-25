import { createClient } from '@/lib/supabase/server'
import type { RawContact, Source } from './types'

export async function upsertContact(data: RawContact, source: Source): Promise<string> {
  const supabase = await createClient()

  const filters: string[] = []
  if (data.email)       filters.push(`email.eq.${data.email}`)
  if (data.linkedinUrl) filters.push(`linkedin_url.eq.${data.linkedinUrl}`)

  let contactId: string

  if (filters.length > 0) {
    const { data: existing } = await supabase
      .from('contacts')
      .select('id')
      .or(filters.join(','))
      .maybeSingle()

    if (existing) {
      contactId = existing.id
    } else {
      try {
        const { data: inserted, error } = await supabase
          .from('contacts')
          .insert({
            full_name:   data.fullName,
            email:       data.email       ?? null,
            linkedin_url: data.linkedinUrl ?? null,
            company:     data.company     ?? null,
            title:       data.title       ?? null,
            segment:     data.segment     ?? null,
            location:    data.location    ?? null,
            notes:       data.notes       ?? null,
          })
          .select('id')
          .single()

        if (error) throw error
        contactId = inserted.id
      } catch (err: unknown) {
        // Lost the race on unique constraint (email or linkedin_url)
        if (isUniqueViolation(err)) {
          const { data: recovered } = await supabase
            .from('contacts')
            .select('id')
            .or(filters.join(','))
            .maybeSingle()
          if (!recovered) throw new Error('Upsert race: could not recover contact')
          contactId = recovered.id
        } else {
          throw err
        }
      }
    }
  } else {
    const { data: inserted, error } = await supabase
      .from('contacts')
      .insert({ full_name: data.fullName })
      .select('id')
      .single()

    if (error) throw error
    contactId = inserted.id
  }

  await supabase.from('contact_sources').insert({
    contact_id: contactId,
    source,
    source_id:  data.sourceId ?? null,
    raw:        data.raw      ?? null,
  })

  return contactId
}

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: string }).code === '23505'
  )
}
