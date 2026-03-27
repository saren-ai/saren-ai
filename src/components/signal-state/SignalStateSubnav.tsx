'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/signal-state', label: 'Overview' },
  { href: '/signal-state/framework', label: 'Framework' },
  { href: '/signal-state/architecture', label: 'Architecture' },
  { href: '/signal-state/use-cases', label: 'Use Cases' },
  { href: '/signal-state/signal-library', label: 'Signal Library' },
]

export default function SignalStateSubnav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/signal-state' ? pathname === '/signal-state' : pathname.startsWith(href)

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container-narrow">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Section label */}
          <span className="shrink-0 text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mr-4 pr-4 border-r border-border">
            Signal-State
          </span>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                shrink-0 px-4 py-2.5 rounded-md text-sm font-medium transition-colors
                ${isActive(item.href)
                  ? 'text-[var(--ss-teal-text)] bg-[var(--ss-teal-bg)]'
                  : 'text-slate dark:text-slate hover:text-charcoal dark:hover:text-foreground hover:bg-charcoal/5 dark:hover:bg-white/5'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
