'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PERSONAS,
  BUYING_STAGES,
  CONTENT_CELLS,
  ContentCell,
  ContentPersona,
  PersonaColor,
} from '@/lib/halcyon-content-matrix'
import { X, FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const COLOR_MAP: Record<PersonaColor, { text: string; bg: string; border: string; badge: string }> = {
  ember: {
    text: 'text-ember',
    bg: 'bg-ember/5',
    border: 'border-ember/20',
    badge: 'bg-ember/10 text-ember',
  },
  electric: {
    text: 'text-electric',
    bg: 'bg-electric/5',
    border: 'border-electric/20',
    badge: 'bg-electric/10 text-electric',
  },
  copper: {
    text: 'text-copper',
    bg: 'bg-copper/5',
    border: 'border-copper/20',
    badge: 'bg-copper/10 text-copper',
  },
  slate: {
    text: 'text-slate',
    bg: 'bg-slate/5',
    border: 'border-slate/20',
    badge: 'bg-slate/10 text-slate',
  },
}

interface SelectedCell {
  persona: ContentPersona
  stageId: string
  stageLabel: string
  cell: ContentCell
}

export default function ContentMatrixClient() {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)
  const [activePersona, setActivePersona] = useState<string | null>(null)

  const visiblePersonas = activePersona ? PERSONAS.filter((p) => p.id === activePersona) : PERSONAS

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
              Full-Funnel Content Matrix
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              4 buying personas × 4 buying stages. Every cell shows recommended assets, KPIs,
              and activation guidance. Click any cell for the full content brief.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          {/* Persona Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActivePersona(null)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activePersona === null
                  ? 'bg-charcoal text-ash dark:bg-ash dark:text-charcoal'
                  : 'bg-charcoal/8 dark:bg-ash/8 text-foreground-muted hover:text-foreground'
                }
              `}
            >
              All Personas
            </button>
            {PERSONAS.map((p) => {
              const colors = COLOR_MAP[p.color]
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(activePersona === p.id ? null : p.id)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all border
                    ${activePersona === p.id
                      ? `${colors.bg} ${colors.text} ${colors.border}`
                      : 'border-transparent bg-charcoal/8 dark:bg-ash/8 text-foreground-muted hover:text-foreground'
                    }
                  `}
                >
                  {p.label}
                </button>
              )
            })}
          </div>

          {/* Matrix */}
          <div className="overflow-x-auto border border-border rounded-xl">
            <div className="min-w-max">
              {/* Header */}
              <div className="flex sticky top-0 z-20 bg-background border-b-2 border-electric/20">
                <div className="w-44 flex-shrink-0 p-3 border-r border-border">
                  <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                    Persona
                  </div>
                </div>
                {BUYING_STAGES.map((stage) => (
                  <div
                    key={stage.id}
                    className="w-56 flex-shrink-0 p-3 border-r border-border"
                  >
                    <div className="text-xs text-electric font-semibold uppercase tracking-wide mb-0.5">
                      {stage.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground">{stage.description}</div>
                    <div className="text-xs text-foreground-muted mt-1">{stage.timeframe}</div>
                  </div>
                ))}
              </div>

              {/* Persona Rows */}
              <AnimatePresence mode="popLayout">
                {visiblePersonas.map((persona) => {
                  const colors = COLOR_MAP[persona.color]
                  return (
                    <motion.div
                      key={persona.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex border-b border-border last:border-b-0"
                    >
                      {/* Row Header */}
                      <div className={`w-44 flex-shrink-0 p-3 border-r border-border bg-background sticky left-0 z-10 ${colors.bg}`}>
                        <div className={`text-sm font-bold ${colors.text} mb-0.5`}>{persona.label}</div>
                        <div className="text-xs text-foreground-muted leading-tight mb-2">{persona.role}</div>
                        <div className={`text-[10px] px-1.5 py-0.5 rounded ${colors.badge} leading-tight`}>
                          {persona.cares}
                        </div>
                      </div>

                      {/* Stage Cells */}
                      {BUYING_STAGES.map((stage) => {
                        const cell = CONTENT_CELLS[persona.id]?.[stage.id]
                        const isSelected = selectedCell?.persona.id === persona.id && selectedCell?.stageId === stage.id

                        return (
                          <div key={stage.id} className="w-56 flex-shrink-0 p-2 border-r border-border">
                            {cell ? (
                              <button
                                onClick={() =>
                                  setSelectedCell(
                                    isSelected
                                      ? null
                                      : { persona, stageId: stage.id, stageLabel: stage.label, cell }
                                  )
                                }
                                className={`
                                  w-full h-full min-h-[100px] p-3 text-left rounded-lg border transition-all
                                  hover:shadow-md focus:outline-none focus:ring-2 focus:ring-electric
                                  ${isSelected
                                    ? `${colors.bg} ${colors.border} ring-2 ring-${persona.color}`
                                    : 'border-border hover:border-electric/40 hover:bg-electric/3'
                                  }
                                `}
                              >
                                <div className="text-xs text-foreground-muted whitespace-pre-line leading-relaxed mb-2">
                                  {cell.preview}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-foreground-muted/60">
                                  <FileText className="w-3 h-3" />
                                  <span>{cell.assets.length} assets</span>
                                  <ChevronRight className="w-3 h-3 ml-auto" />
                                </div>
                              </button>
                            ) : (
                              <div className="w-full h-full min-h-[100px] rounded-lg bg-charcoal/3 dark:bg-ash/3 border border-border/30" />
                            )}
                          </div>
                        )
                      })}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-xs text-foreground-muted text-center mt-4">
            Click any cell for recommended assets, KPIs, and activation guidance
          </p>
        </div>
      </section>

      {/* Cell Detail Drawer */}
      <AnimatePresence>
        {selectedCell && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCell(null)}
              className="fixed inset-0 bg-offblack/60 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[620px] bg-background shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${COLOR_MAP[selectedCell.persona.color].text}`}>
                      {selectedCell.persona.label} · {selectedCell.stageLabel}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedCell.cell.assets[0]?.type} Strategy
                    </h2>
                    <p className="text-foreground-muted text-sm mt-1">{selectedCell.persona.cares}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCell(null)}
                    className="p-2 hover:bg-charcoal/10 dark:hover:bg-ash/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-foreground-muted" />
                  </button>
                </div>

                <div className="space-y-7">
                  {/* KPI */}
                  <section>
                    <h3 className="text-xs font-semibold text-ember uppercase tracking-wider mb-2">
                      Success KPI
                    </h3>
                    <div className="bg-ember/5 border border-ember/20 rounded-lg px-4 py-3 text-sm text-foreground">
                      {selectedCell.cell.kpi}
                    </div>
                  </section>

                  {/* Assets */}
                  <section>
                    <h3 className="text-xs font-semibold text-ember uppercase tracking-wider mb-3">
                      Recommended Assets
                    </h3>
                    <div className="space-y-3">
                      {selectedCell.cell.assets.map((asset, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-lg border ${COLOR_MAP[selectedCell.persona.color].bg} ${COLOR_MAP[selectedCell.persona.color].border}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${COLOR_MAP[selectedCell.persona.color].badge}`}>
                              {asset.type}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-foreground mb-1">{asset.title}</div>
                          <div className="text-xs text-foreground-muted">{asset.description}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Why This Stage */}
                  <section>
                    <h3 className="text-xs font-semibold text-ember uppercase tracking-wider mb-3">
                      Why This Persona at This Stage
                    </h3>
                    <ul className="space-y-2">
                      {selectedCell.cell.expanded.why.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="flex-shrink-0 w-5 h-5 bg-electric/10 rounded-full flex items-center justify-center mt-0.5">
                            <ChevronRight className="w-3 h-3 text-electric" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* What to Instrument */}
                  <section>
                    <h3 className="text-xs font-semibold text-ember uppercase tracking-wider mb-3">
                      What to Instrument
                    </h3>
                    <ul className="space-y-2">
                      {selectedCell.cell.expanded.instruments.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="flex-shrink-0 w-5 h-5 bg-copper/10 rounded-full flex items-center justify-center mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Content Formats */}
                  <section>
                    <h3 className="text-xs font-semibold text-ember uppercase tracking-wider mb-3">
                      Content Formats
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCell.cell.expanded.formats.map((fmt, i) => (
                        <span key={i} className="px-3 py-1.5 bg-electric/10 text-electric rounded-full text-sm">
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* How to Use */}
                  <section className="bg-copper/5 rounded-xl p-5 border border-copper/20">
                    <h3 className="text-xs font-semibold text-copper uppercase tracking-wider mb-3">
                      How to Activate This
                    </h3>
                    <p className="text-sm text-foreground leading-relaxed">
                      {selectedCell.cell.expanded.howToUse}
                    </p>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section border-t border-border">
        <div className="container-narrow text-center">
          <p className="text-foreground-muted mb-4">
            Score your first account against the Halcyon ICP.
          </p>
          <Link href="/halcyon/lead-scoring" className="btn-primary inline-flex items-center gap-2">
            Try the Lead Scoring Calculator
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
