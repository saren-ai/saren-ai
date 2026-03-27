'use client'

import { usePathname } from 'next/navigation'
import SignalStateSubnav from './SignalStateSubnav'

// Renders the subnav in the layout for all sub-pages.
// The overview page (/signal-state) renders it inline after its hero instead.
export default function SignalStateSubnavWrapper() {
  const pathname = usePathname()
  if (pathname === '/signal-state') return null
  return <SignalStateSubnav />
}
