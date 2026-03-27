import { Metadata } from 'next'
import ArchitecturePageContent from './ArchitecturePageContent'

export const metadata: Metadata = {
  title: 'Signal-State Architecture — Saren Sakurai',
  description:
    'Interactive architecture diagram for the Signal-State Marketing platform. Click any node to expand details.',
}

export default function ArchitecturePage() {
  return <ArchitecturePageContent />
}
