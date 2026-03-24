'use client'

import { usePathname } from 'next/navigation'
import HalcyonSubnav from './HalcyonSubnav'

// Renders the subnav in the layout for all sub-pages.
// The overview page (/halcyon) renders it inline after its hero instead.
export default function HalcyonSubnavWrapper() {
  const pathname = usePathname()
  if (pathname === '/halcyon') return null
  return <HalcyonSubnav />
}
