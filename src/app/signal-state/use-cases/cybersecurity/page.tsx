import { Metadata } from 'next'
import CybersecurityClient from './CybersecurityClient'

export const metadata: Metadata = {
  title: 'Cybersecurity Use Case — Signal-State Marketing',
  description:
    'Finding organizational vulnerability before the attack. A Signal-State use case for B2B cybersecurity.',
}

export default function CybersecurityPage() {
  return <CybersecurityClient />
}
