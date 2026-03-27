import { Metadata } from 'next'
import UseCasesClient from './UseCasesClient'

export const metadata: Metadata = {
  title: 'Signal-State Use Cases — Saren Sakurai',
  description:
    'Three scenarios. One framework. See Signal-State Marketing applied to cybersecurity, organizational alignment, and independent creatives.',
}

export default function UseCasesPage() {
  return <UseCasesClient />
}
