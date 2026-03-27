'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Video, Calendar, Users, Zap, BarChart2, Shield } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import HalcyonSubnav from '@/components/halcyon/HalcyonSubnav'
import {
  INTENT_TOPICS,
  TIME_WINDOWS,
  INTENT_CELLS,
  VERTICALS,
  type Vertical,
  type IntentLevel,
  type IntentCellData,
} from '@/lib/halcyon-intent-matrix'

interface DrawerCell {
  topicId: string
  windowId: string
  data: IntentCellData
}

const INTENSITY_CONFIG: Record<IntentLevel, { bg: string; text: string; label: string; border: string; dot: string }> = {
  none: {
    bg: 'bg-charcoal/5 dark:bg-ash/5',
    text: 'text-foreground-muted',
    label: 'No Signal',
    border: 'border-border/30',
    dot: 'bg-charcoal/20 dark:bg-ash/20',
  },
  low: {
    bg: 'bg-electric/10',
    text: 'text-electric',
    label: 'Low',
    border: 'border-electric/20',
    dot: 'bg-electric/50',
  },
  medium: {
    bg: 'bg-electric/25',
    text: 'text-electric',
    label: 'Medium',
    border: 'border-electric/40',
    dot: 'bg-electric',
  },
  high: {
    bg: 'bg-copper/25',
    text: 'text-copper',
    label: 'High',
    border: 'border-copper/40',
    dot: 'bg-copper',
  },
  'very-high': {
    bg: 'bg-ember/20',
    text: 'text-ember',
    label: 'Very High',
    border: 'border-ember/30',
    dot: 'bg-ember',
  },
  critical: {
    bg: 'bg-ember/60',
    text: 'text-white',
    label: 'Critical',
    border: 'border-ember',
    dot: 'bg-white',
  },
}

// Parse content recommendation string into individual asset items
function parseContentAssets(rec: string): { label: string; icon: React.ReactNode }[] {
  if (!rec || rec === 'None.' || rec === 'None') return []

  // Split on '. ' or '.' at end — handles quoted titles like '"Foo Bar" guide. "Other thing" report.'
  const raw = rec
    .split(/\.\s+(?=[A-Z"'])/)
    .map((s) => s.replace(/\.$/, '').trim())
    .filter(Boolean)

  return raw.map((item) => {
    const lower = item.toLowerCase()
    let icon: React.ReactNode

    if (lower.includes('webinar') || lower.includes('video') || lower.includes('demo video')) {
      icon = <Video className="w-3.5 h-3.5 shrink-0" />
    } else if (lower.includes('demo') || lower.includes('poc') || lower.includes('proof of')) {
      icon = <Zap className="w-3.5 h-3.5 shrink-0" />
    } else if (lower.includes('call') || lower.includes('reference') || lower.includes('case study') || lower.includes('briefing')) {
      icon = <Users className="w-3.5 h-3.5 shrink-0" />
    } else if (lower.includes('calculator') || lower.includes('roi') || lower.includes('model') || lower.includes('dashboard')) {
      icon = <BarChart2 className="w-3.5 h-3.5 shrink-0" />
    } else if (lower.includes('sla') || lower.includes('deployment') || lower.includes('implementation') || lower.includes('plan')) {
      icon = <Shield className="w-3.5 h-3.5 shrink-0" />
    } else if (lower.includes('event') || lower.includes('tabletop')) {
      icon = <Calendar className="w-3.5 h-3.5 shrink-0" />
    } else {
      icon = <FileText className="w-3.5 h-3.5 shrink-0" />
    }

    return { label: item.replace(/^["']|["']$/g, '').replace(/^"/, '').replace(/"$/, ''), icon }
  })
}

export default function IntentMatrixClient() {
  const [activeVertical, setActiveVertical] = useState<Vertical>('all')
  const [drawerCell, setDrawerCell] = useState<DrawerCell | null>(null)

  // Close drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerCell(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function handleCellClick(topicId: string, windowId: string, data: IntentCellData) {
    if (drawerCell?.topicId === topicId && drawerCell?.windowId === windowId) {
      setDrawerCell(null)
    } else {
      setDrawerCell({ topicId, windowId, data })
    }
  }

  const drawerLevel = drawerCell ? drawerCell.data.level[activeVertical] : null
  const drawerCfg = drawerLevel ? INTENSITY_CONFIG[drawerLevel] : null
  const drawerTopic = drawerCell ? INTENT_TOPICS.find((t) => t.id === drawerCell.topicId) : null
  const drawerWindow = drawerCell ? TIME_WINDOWS.find((w) => w.id === drawerCell.windowId) : null

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-card section bg-background-secondary">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Breadcrumb
              back={{ href: '/halcyon', label: 'Halcyon' }}
              current="Intent Matrix"
              className="mb-4 justify-center"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Intent Activity Matrix
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Ransomware buyer intent signals mapped across an 18-month buying timeline.
              Filter by vertical to see how signal intensity and outreach strategy shifts.
            </p>
          </motion.div>
        </div>
      </section>

      <HalcyonSubnav />

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
                    className="w-32 flex-shrink-0 p-3 border-r border-border text-center"
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
                    if (!cellData) return <div key={win.id} className="w-32 flex-shrink-0 border-r border-border" />

                    const level = cellData.level[activeVertical]
                    const cfg = INTENSITY_CONFIG[level]
                    const isActive = drawerCell?.topicId === topic.id && drawerCell?.windowId === win.id
                    const hasSignal = level !== 'none'
                    // Show first 2 queries as hints
                    const queryHints = cellData.exampleQueries.slice(0, 2)

                    return (
                      <motion.div
                        key={win.id}
                        className="w-32 flex-shrink-0 border-r border-border p-1.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: topicIdx * 0.04 }}
                      >
                        <button
                          className={`
                            w-full h-24 rounded-lg border transition-all flex flex-col items-start justify-start p-2 gap-1 text-left
                            ${cfg.bg} ${cfg.border}
                            ${isActive ? 'ring-2 ring-ember ring-offset-1 ring-offset-background' : ''}
                            ${hasSignal ? 'cursor-pointer hover:brightness-105' : 'cursor-default opacity-60'}
                          `}
                          onClick={() => hasSignal && handleCellClick(topic.id, win.id, cellData)}
                          disabled={!hasSignal}
                          aria-label={hasSignal ? `${topic.label} at ${win.label}: ${cfg.label}. Click for details.` : undefined}
                        >
                          {/* Intensity badge */}
                          <div className="flex items-center gap-1 w-full">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                            <span className={`text-[9px] font-bold uppercase tracking-wide leading-none ${cfg.text}`}>
                              {cfg.label}
                            </span>
                          </div>

                          {/* Query hints */}
                          {hasSignal && queryHints.length > 0 && (
                            <div className="w-full space-y-0.5 mt-0.5">
                              {queryHints.map((q, qi) => (
                                <p
                                  key={qi}
                                  className={`text-[8px] leading-tight truncate ${
                                    level === 'critical' ? 'text-white/70' : 'text-foreground-muted'
                                  }`}
                                >
                                  &ldquo;{q}&rdquo;
                                </p>
                              ))}
                            </div>
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
            Click any cell to open the full signal brief — queries, outreach strategy, and recommended content
          </p>
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

      {/* ── Right Drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerCell && drawerCfg && drawerTopic && drawerWindow && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setDrawerCell(null)}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-background border-l border-border shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer header */}
              <div className={`flex items-start justify-between p-5 border-b border-border ${drawerCfg.bg}`}>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-foreground-muted mb-1">
                    {drawerWindow.label} before close · {drawerTopic.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${drawerCfg.dot}`} />
                    <span className={`text-base font-bold ${drawerCfg.text}`}>
                      {drawerCfg.label} Signal
                    </span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-1 leading-relaxed max-w-xs">
                    {drawerTopic.description}
                  </p>
                </div>
                <button
                  onClick={() => setDrawerCell(null)}
                  className="p-2 rounded-lg hover:bg-charcoal/10 dark:hover:bg-ash/10 transition-colors shrink-0 ml-4"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-foreground-muted" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* Deal value */}
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-ember mb-2">
                    Deal Value Signal
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {drawerCell.data.dealValue}
                  </p>
                </div>

                {/* Intent Queries */}
                {drawerCell.data.exampleQueries.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-ember mb-3">
                      Intent Queries at This Stage
                    </p>
                    <div className="space-y-1.5">
                      {drawerCell.data.exampleQueries.map((q, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 bg-charcoal/5 dark:bg-ash/5 border border-border/60 rounded-lg px-3 py-2"
                        >
                          <span className="text-foreground-muted text-xs mt-0.5 shrink-0 font-mono">{i + 1}.</span>
                          <p className="text-xs text-foreground font-mono leading-relaxed">&ldquo;{q}&rdquo;</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outreach strategy */}
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-ember mb-2">
                    Outreach Strategy
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {drawerCell.data.outreachStrategy}
                  </p>
                </div>

                {/* Recommended content */}
                {(() => {
                  const assets = parseContentAssets(drawerCell.data.contentRecommendation)
                  if (!assets.length) return null
                  return (
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-ember mb-3">
                        Recommended Content &amp; Experiences to Build
                      </p>
                      <div className="space-y-2">
                        {assets.map((asset, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 bg-electric/5 border border-electric/15 rounded-lg px-3 py-2.5"
                          >
                            <span className="text-electric mt-0.5 shrink-0">{asset.icon}</span>
                            <p className="text-sm text-foreground leading-snug">{asset.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })()}

                {/* Vertical intensity breakdown */}
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-ember mb-3">
                    Signal Intensity by Vertical
                  </p>
                  <div className="space-y-1.5">
                    {VERTICALS.filter((v) => v.id !== 'all').map((v) => {
                      const vLevel = drawerCell.data.level[v.id]
                      const vCfg = INTENSITY_CONFIG[vLevel]
                      return (
                        <div key={v.id} className="flex items-center justify-between">
                          <span className="text-xs text-foreground-muted">{v.label}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${vCfg.bg} ${vCfg.text} border ${vCfg.border}`}>
                            {vCfg.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="border-t border-border p-4 flex items-center justify-between bg-background">
                <p className="text-xs text-foreground-muted">
                  {drawerTopic.label} · {drawerWindow.label} out
                </p>
                <Link
                  href="/halcyon/content-matrix"
                  className="text-xs font-semibold text-electric hover:text-ember transition-colors flex items-center gap-1"
                >
                  Full content matrix <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
