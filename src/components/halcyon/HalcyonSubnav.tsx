'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/halcyon', label: 'Overview' },
  { href: '/halcyon/intent-matrix', label: 'Intent Matrix' },
  { href: '/halcyon/content-matrix', label: 'Content Matrix' },
  { href: '/halcyon/lead-scoring', label: 'Lead Scoring' },
  { href: '/halcyon/faq', label: 'FAQ' },
  { href: '/halcyon/resume', label: 'Resume' },
]

export default function HalcyonSubnav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/halcyon' ? pathname === '/halcyon' : pathname.startsWith(href)

  return (
    <nav aria-label="Halcyon sections" className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container-narrow">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Section label */}
          <span className="shrink-0 text-xs font-semibold tracking-widest uppercase text-slate dark:text-slate mr-4 pr-4 border-r border-border">
            Halcyon
          </span>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                shrink-0 px-4 py-2.5 rounded-md text-sm font-medium transition-colors
                ${isActive(item.href)
                  ? 'text-ember bg-ember/8 dark:bg-ember/12'
                  : 'text-slate dark:text-slate hover:text-charcoal dark:hover:text-foreground hover:bg-charcoal/5 dark:hover:bg-white/5'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
