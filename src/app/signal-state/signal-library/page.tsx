import { Metadata } from 'next'
import SignalLibraryClient from './SignalLibraryClient'

export const metadata: Metadata = {
  title: 'Signal Library — Signal-State Marketing',
  description:
    'Catalogued signal patterns for AI agent targeting. Ransomware vulnerability, organizational dysfunction, and creative struggle signals.',
}

export default function SignalLibraryPage() {
  return <SignalLibraryClient />
}
