import { Metadata } from 'next'
import IndependentCreativeClient from './IndependentCreativeClient'

export const metadata: Metadata = {
  title: 'Independent Creative Use Case — Signal-State Marketing',
  description:
    'The moment a solo operator names the capability gap. A Signal-State use case for AI tools for independent creatives.',
}

export default function IndependentCreativePage() {
  return <IndependentCreativeClient />
}
