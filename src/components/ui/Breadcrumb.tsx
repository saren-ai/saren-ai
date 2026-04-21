'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface BreadcrumbProps {
  back: { href: string; label: string }
  current?: string
  /** CSS color value or var(). Defaults to ember red. */
  accentColor?: string
  /** Extra Tailwind classes on the wrapper — use for margin overrides. */
  className?: string
}

/**
 * Eyebrow breadcrumb used on secondary and sub-level pages.
 * Pattern:  ← Parent  ·  Current Page
 *
 * On dark hero sections: pass a light accent color (e.g. Signal-State teal).
 * On light hero sections: the default ember accent works.
 */
export default function Breadcrumb({
  back,
  current,
  accentColor,
  className = 'mb-4',
}: BreadcrumbProps) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <Link
        href={back.href}
        className="text-xs text-foreground-muted hover:text-foreground transition-colors"
      >
        ← {back.label}
      </Link>
      {current && (
        <>
          <span className="text-xs text-foreground-muted">·</span>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={accentColor ? { color: accentColor } : { color: 'var(--ember-red)' }}
          >
            {current}
          </span>
        </>
      )}
    </motion.nav>
  )
}
