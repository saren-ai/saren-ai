'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  INTENT_TOPICS,
  TIME_WINDOWS,
  INTENT_CELLS,
  VERTICALS,
  Vertical,
  IntentLevel,
  IntentCellData,
} from '@/lib/halcyon-intent-matrix'
import { X } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HoveredCell {
  topicId: string
  windowId: string
  data: IntentCellData
}

const INTENSITY_CONFIG: Record<IntentLevel, { bg: string; text: string; label: string; border: string }> = {
  none: {
    bg: 'bg-charcoal/5 dark:bg-ash/5',
    text: 'text-foreground-muted',
    label: 'No Signal',
    border: 'border-border/30',
  },
  low: {
    bg: 'bg-electric/10',
    text: 'text-electric',
    label: 'Low',
    border: 'border-electric/20',
  },
  medium: {
    bg: 'bg-electric/25',
    text: 'text-electric',
    label: 'Medium',
    border: 'border-electric/40',
  },
  high: {
    bg: 'bg-copper/25',
    text: 'text-copper',
    label: 'High',
    border: 'border-copper/40',
  },
  'very-high': {
    bg: 'bg-ember/20',
    text: 'text-ember',
    label: 'Very High',
    border: 'border-ember/30',
  },
  critical: {
    bg: 'bg-ember/60',
    text: 'text-white',
    label: 'Critical',
    border: 'border-ember',
  },
}

export default function IntentMatrixClient() {
  const [activeVertical, setActiveVertical] = useState<Vertical>('all')
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null)
  const [pinnedCell, setPinnedCell] = useState<HoveredCell | null>(null)

  function handleCellClick(topicId: string, windowId: string, data: IntentCellData) {
    if (pinnedCell?.topicId === topicId && pinnedCell?.windowId === windowId) {
      setPinnedCell(null)
    } else {
      setPinnedCell({ topicId, windowId, data })
    }
  }

  const displayCell = pinnedCell ?? hoveredCell

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-b from-charcoal/5 to-transparent dark:from-ash/5">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-xs font-semibold text-ember uppercase tracking-widest mb-3">
              Halcyon AI · Demand Generation · Interactive Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Intent Activity Matrix
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Ransomware buyer intent signals mapped across an 18-month buying timeline.
              Filter by vertical to see how signal intensity and recommended outreach shifts.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          {/* Vertical Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {VERTICALS.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVertical(v.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeVertical === v.id
                    ? 'bg-ember text-white'
                    : 'bg-charcoal/8 dark:bg-ash/8 text-foreground-muted hover:text-foreground'
                  }
                `}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-6 text-xs">
            {(Object.entries(INTENSITY_CONFIG) as [IntentLevel, typeof INTENSITY_CONFIG[IntentLevel]][]).map(([level, cfg]) => (
              <div key={level} className="flex items-center gap-1.5">
                <div className={`w-4 h-4 rounded ${cfg.bg} border ${cfg.border}`} />
                <span className="text-foreground-muted">{cfg.label}</span>
              </div>
            ))}
          </div>

          {/* Matrix */}
          <div className="overflow-x-auto border border-border rounded-xl">
            <div className="min-w-max">
              {/* Header Row */}
              <div className="flex sticky top-0 z-20 bg-background border-b-2 border-electric/20">
                <div className="w-52 flex-shrink-0 p-3 border-r border-border">
                  <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                    Intent Signal
                  </div>
                </div>
                {TIME_WINDOWS.map((win) => (
                  <div
                    key={win.id}
                    className="w-28 flex-shrink-0 p-3 border-r border-border text-center"
                  >
                    <div className="text-sm font-bold text-foreground">{win.label}</div>
                    <div className="text-[10px] text-foreground-muted">{win.sublabel}</div>
                  </div>
                ))}
              </div>

              {/* Topic Rows */}
              {INTENT_TOPICS.map((topic, topicIdx) => (
                <div
                  key={topic.id}
                  className="flex border-b border-border last:border-b-0"
                >
                  {/* Row Header */}
                  <div className="w-52 flex-shrink-0 p-3 border-r border-border bg-background sticky left-0 z-10">
                    <div className="text-sm font-semibold text-foreground mb-1">{topic.label}</div>
                    <div className="text-xs text-foreground-muted leading-tight">{topic.description}</div>
                  </div>

                  {/* Cells */}
                  {TIME_WINDOWS.map((win) => {
                    const cellData = INTENT_CELLS[topic.id]?.[win.id]
                    if (!cellData) return <div key={win.id} className="w-28 flex-shrink-0 border-r border-border" />
                    const level = cellData.level[activeVertical]
                    const cfg = INTENSITY_CONFIG[level]
                    const isPinned = pinnedCell?.topicId === topic.id && pinnedCell?.windowId === win.id

                    return (
                      <motion.div
                        key={win.id}
                        className="w-28 flex-shrink-0 border-r border-border p-1.5 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: topicIdx * 0.05 }}
                      >
                        <button
                          className={`
                            w-full h-14 rounded-lg border transition-all flex flex-col items-center justify-center gap-0.5
                            ${cfg.bg} ${cfg.border}
                            ${isPinned ? 'ring-2 ring-ember ring-offset-1' : 'hover:scale-105'}
                            ${level === 'none' ? 'cursor-default' : 'cursor-pointer'}
                          `}
                          onMouseEnter={() => level !== 'none' && setHoveredCell({ topicId: topic.id, windowId: win.id, data: cellData })}
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => level !== 'none' && handleCellClick(topic.id, win.id, cellData)}
                          disabled={level === 'none'}
                        >
                          <span className={`text-[10px] font-bold ${cfg.text}`}>{cfg.label}</span>
                          {level !== 'none' && (
                            <span className="text-[9px] text-foreground-muted">click</span>
                          )}
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-foreground-muted text-center mt-4">
            Hover or click any cell for outreach strategy and content recommendations
          </p>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {displayCell && (
              <motion.div
                key={`${displayCell.topicId}-${displayCell.windowId}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-electric font-semibold uppercase tracking-wider mb-1">
                      {TIME_WINDOWS.find((w) => w.id === displayCell.windowId)?.label} ·{' '}
                      {INTENT_TOPICS.find((t) => t.id === displayCell.topicId)?.label}
                    </div>
                    <div className={`text-sm font-bold ${INTENSITY_CONFIG[displayCell.data.level[activeVertical]].text}`}>
                      Signal: {INTENSITY_CONFIG[displayCell.data.level[activeVertical]].label}
                    </div>
                  </div>
                  {pinnedCell && (
                    <button
                      onClick={() => setPinnedCell(null)}
                      className="p-1 rounded-lg hover:bg-charcoal/10 dark:hover:bg-ash/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-foreground-muted" />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-ember uppercase tracking-wide mb-2">Deal Value</div>
                    <p className="text-sm text-foreground">{displayCell.data.dealValue}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ember uppercase tracking-wide mb-2">Outreach Strategy</div>
                    <p className="text-sm text-foreground">{displayCell.data.outreachStrategy}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ember uppercase tracking-wide mb-2">Content Recommendation</div>
                    <p className="text-sm text-foreground">{displayCell.data.contentRecommendation}</p>
                  </div>
                  {displayCell.data.exampleQueries.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-ember uppercase tracking-wide mb-2">Example Queries</div>
                      <ul className="space-y-1">
                        {displayCell.data.exampleQueries.map((q) => (
                          <li key={q} className="text-xs text-foreground-muted font-mono bg-charcoal/5 dark:bg-ash/5 px-2 py-1 rounded">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-border">
        <div className="container-narrow text-center">
          <p className="text-foreground-muted mb-4">
            See the full content strategy mapped by persona and buying stage.
          </p>
          <Link href="/halcyon/content-matrix" className="btn-primary inline-flex items-center gap-2">
            View Content Matrix <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
