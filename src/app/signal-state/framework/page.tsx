import { Metadata } from 'next'
import FrameworkClient from './FrameworkClient'

export const metadata: Metadata = {
  title: 'Signal-State Framework — Saren Sakurai',
  description:
    'The full Signal-State Marketing framework. Psychological research, signal typology, decay model, and response architecture.',
}

export default function FrameworkPage() {
  return <FrameworkClient />
}
