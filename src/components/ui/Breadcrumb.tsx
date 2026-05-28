'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface TrailItem {
  href?: string
  label: string
}

interface BreadcrumbProps {
  /** Full trail: each item with optional href; last item is current page (no href). */
  trail?: TrailItem[]
  /** Legacy: simple back link + current label. Use trail for full Home / Section / Title paths. */
  back?: { href: string; label: string }
  current?: string
  /** CSS color value or var(). Defaults to ember red. */
  accentColor?: string
  /** Extra Tailwind classes on the wrapper — use for margin overrides. */
  className?: string
}

/**
 * Breadcrumb navigation component.
 *
 * Preferred: pass `trail` for full Home / Section / Title rendering.
 * Legacy: pass `back` + optional `current` for the old ← Parent · Current pattern.
 */
export default function Breadcrumb({
  trail,
  back,
  current,
  accentColor,
  className = 'mb-4',
}: BreadcrumbProps) {
  if (trail && trail.length > 0) {
    return (
      <motion.nav
        aria-label="Breadcrumb"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 ${className}`}
      >
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1
          return (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-xs text-foreground-muted">/</span>}
              {isLast ? (
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={accentColor ? { color: accentColor } : { color: 'var(--ember-red)' }}
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-xs text-foreground-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-xs text-foreground-muted">{item.label}</span>
              )}
            </span>
          )
        })}
      </motion.nav>
    )
  }

  // Legacy two-part breadcrumb
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 ${className}`}
    >
      {back && (
        <Link
          href={back.href}
          className="text-xs text-foreground-muted hover:text-foreground transition-colors"
        >
          ← {back.label}
        </Link>
      )}
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
