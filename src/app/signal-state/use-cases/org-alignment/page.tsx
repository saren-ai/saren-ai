import { Metadata } from 'next'
import OrgAlignmentClient from './OrgAlignmentClient'

export const metadata: Metadata = {
  title: 'Organizational Alignment Use Case — Signal-State Marketing',
  description:
    'Reading the signals leadership can\'t see from inside. A Signal-State use case for organizational alignment consulting.',
}

export default function OrgAlignmentPage() {
  return <OrgAlignmentClient />
}
