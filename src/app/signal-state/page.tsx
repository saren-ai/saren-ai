import { Metadata } from 'next'
import SignalStateClient from '@/components/signal-state/SignalStateClient'

export const metadata: Metadata = {
  title: 'Signal-State Marketing — Saren Sakurai',
  description:
    'AI-enabled expressed intent targeting. We find people the moment they say they have a problem and reach them before anyone else does.',
}

export default function SignalStatePage() {
  return <SignalStateClient />
}
