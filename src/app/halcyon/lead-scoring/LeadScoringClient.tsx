'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FIT_SECTION, ENGAGEMENT_SECTION, STATUS_BANDS, ScoreSection } from '@/lib/halcyon-lead-scoring'
import Link from 'next/link'
import { ArrowRight, RefreshCw } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import HalcyonSubnav from '@/components/halcyon/HalcyonSubnav'

type Selections = Record<string, number | number[]>

function computeScore(section: ScoreSection, selections: Selections): number {
  let total = 0
  for (const category of section.categories) {
    const sel = selections[category.id]
    if (category.type === 'radio' && typeof sel === 'number') {
      total += sel
    } else if (category.type === 'checkbox' && Array.isArray(sel)) {
      total += sel.reduce((a: number, b: number) => a + b, 0)
    }
  }
  return Math.min(total, section.maxPoints)
}

function toggleCheckbox(current: number[], value: number): number[] {
  return current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
}

export default function LeadScoringClient() {
  const [fitSelections, setFitSelections] = useState<Selections>({})
  const [engagementSelections, setEngagementSelections] = useState<Selections>({})

  const fitScore = computeScore(FIT_SECTION, fitSelections)
  const engagementScore = computeScore(ENGAGEMENT_SECTION, engagementSelections)
  const total = fitScore + engagementScore

  const band = STATUS_BANDS.find((b) => total >= b.min && total <= b.max) ?? STATUS_BANDS[0]

  const fitAnswered = FIT_SECTION.categories.filter((c) => fitSelections[c.id] !== undefined).length
  const engAnswered = ENGAGEMENT_SECTION.categories.filter((c) => {
    const s = engagementSelections[c.id]
    return s !== undefined && (typeof s === 'number' || (Array.isArray(s) && s.length > 0))
  }).length
  const totalCategories = FIT_SECTION.categories.length + ENGAGEMENT_SECTION.categories.length
  const answeredCategories = fitAnswered + engAnswered
  const hasStarted = answeredCategories > 0

  function reset() {
    setFitSelections({})
    setEngagementSelections({})
  }

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
              current="Lead Scoring"
              className="mb-4 justify-center"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ICP Lead Scoring Calculator
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Score any account against Halcyon&apos;s ICP and get an instant pipeline tier recommendation.
              Fit + Engagement = actionable outreach guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <HalcyonSubnav />

      <section className="section">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">

            {/* Scoring Panels */}
            <div className="space-y-8">

              {/* Fit Score Section */}
              <ScoringPanel
                section={FIT_SECTION}
                selections={fitSelections}
                onRadioChange={(catId, value) =>
                  setFitSelections((prev) => ({ ...prev, [catId]: value }))
                }
                onCheckboxChange={(catId, value) =>
                  setEngagementSelections((prev) => ({
                    ...prev,
                    [catId]: toggleCheckbox((prev[catId] as number[]) ?? [], value),
                  }))
                }
                score={fitScore}
                accentColor="ember"
              />

              {/* Engagement Score Section */}
              <ScoringPanel
                section={ENGAGEMENT_SECTION}
                selections={engagementSelections}
                onRadioChange={(catId, value) =>
                  setEngagementSelections((prev) => ({ ...prev, [catId]: value }))
                }
                onCheckboxChange={(catId, value) =>
                  setEngagementSelections((prev) => ({
                    ...prev,
                    [catId]: toggleCheckbox((prev[catId] as number[]) ?? [], value),
                  }))
                }
                score={engagementScore}
                accentColor="electric"
              />
            </div>

            {/* Score Summary — Sticky Sidebar */}
            <div className="lg:sticky lg:top-6 space-y-4">
              <ScoreSummary
                fitScore={fitScore}
                engagementScore={engagementScore}
                total={total}
                band={band}
                hasStarted={hasStarted}
                answeredCategories={answeredCategories}
                totalCategories={totalCategories}
                onReset={reset}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-border">
        <div className="container-narrow text-center">
          <p className="text-foreground-muted mb-4">
            See how this scoring model fits into a full intent signal workflow.
          </p>
          <Link href="/halcyon/intent-matrix" className="btn-primary inline-flex items-center gap-2">
            View Intent Activity Matrix <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

// ─── Scoring Panel ───────────────────────────────────────────────────────────

interface ScoringPanelProps {
  section: ScoreSection
  selections: Selections
  onRadioChange: (catId: string, value: number) => void
  onCheckboxChange: (catId: string, value: number) => void
  score: number
  accentColor: 'ember' | 'electric'
}

function ScoringPanel({ section, selections, onRadioChange, onCheckboxChange, score, accentColor }: ScoringPanelProps) {
  const accentClass = accentColor === 'ember' ? 'text-ember' : 'text-electric'
  const bgClass = accentColor === 'ember' ? 'bg-ember/10' : 'bg-electric/10'
  const borderClass = accentColor === 'ember' ? 'border-ember/20' : 'border-electric/20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card border-l-4 ${accentColor === 'ember' ? 'border-l-ember' : 'border-l-electric'}`}
    >
      {/* Section Header */}
      <div className={`flex items-center justify-between p-5 border-b ${borderClass}`}>
        <div>
          <div className={`text-xs font-semibold uppercase tracking-widest ${accentClass} mb-1`}>
            {section.subtitle}
          </div>
          <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
        </div>
        <div className={`text-right ${bgClass} rounded-xl px-4 py-2`}>
          <div className={`text-2xl font-bold font-mono ${accentClass}`}>{score}</div>
          <div className="text-xs text-foreground-muted">/ {section.maxPoints}</div>
        </div>
      </div>

      {/* Categories */}
      <div className="divide-y divide-border">
        {section.categories.map((category) => {
          const sel = selections[category.id]

          return (
            <div key={category.id} className="p-5">
              <div className="text-sm font-semibold text-foreground mb-3">{category.label}</div>

              {category.type === 'radio' && (
                <div className="space-y-2">
                  {category.options.map((opt) => {
                    const isSelected = sel === opt.value
                    return (
                      <label
                        key={`${opt.label}-${opt.value}`}
                        className={`
                          flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-all
                          ${isSelected
                            ? accentColor === 'ember'
                              ? 'border-ember/50 bg-ember/5'
                              : 'border-electric/50 bg-electric/5'
                            : 'border-border hover:border-border/80 hover:bg-charcoal/3 dark:hover:bg-ash/3'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`
                              w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                              ${isSelected
                                ? accentColor === 'ember'
                                  ? 'border-ember bg-ember'
                                  : 'border-electric bg-electric'
                                : 'border-border'
                              }
                            `}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <input
                            type="radio"
                            name={category.id}
                            value={opt.value}
                            checked={isSelected}
                            onChange={() => onRadioChange(category.id, opt.value)}
                            className="sr-only"
                          />
                          <span className="text-sm text-foreground truncate">{opt.label}</span>
                          {opt.tag && (
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${accentClass} ${bgClass}`}>
                              {opt.tag}
                            </span>
                          )}
                        </div>
                        <span className={`text-xs font-mono font-semibold flex-shrink-0 ${accentClass}`}>
                          +{opt.value}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}

              {category.type === 'checkbox' && (
                <div className="space-y-2">
                  {category.options.map((opt) => {
                    const checked = Array.isArray(sel) && sel.includes(opt.value)
                    return (
                      <label
                        key={`${opt.label}-${opt.value}`}
                        className={`
                          flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-all
                          ${checked
                            ? 'border-electric/50 bg-electric/5'
                            : 'border-border hover:border-border/80 hover:bg-charcoal/3 dark:hover:bg-ash/3'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`
                              w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all
                              ${checked ? 'border-electric bg-electric' : 'border-border'}
                            `}
                          >
                            {checked && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onCheckboxChange(category.id, opt.value)}
                            className="sr-only"
                          />
                          <span className="text-sm text-foreground truncate">{opt.label}</span>
                          {opt.tag && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 text-electric bg-electric/10">
                              {opt.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono font-semibold flex-shrink-0 text-electric">
                          +{opt.value}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Score Summary ────────────────────────────────────────────────────────────

interface ScoreSummaryProps {
  fitScore: number
  engagementScore: number
  total: number
  band: (typeof STATUS_BANDS)[0]
  hasStarted: boolean
  answeredCategories: number
  totalCategories: number
  onReset: () => void
}

function ScoreSummary({ fitScore, engagementScore, total, band, hasStarted, answeredCategories, totalCategories, onReset }: ScoreSummaryProps) {
  const pct = (total / 100) * 100

  return (
    <div className="card p-5 space-y-5">
      {/* Total */}
      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-2">
          Total Score
        </div>
        <div className={`text-6xl font-bold font-mono ${band.color}`}>{total}</div>
        <div className="text-foreground-muted text-sm">/ 100</div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-charcoal/10 dark:bg-ash/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${band.bg}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center bg-ember/5 rounded-lg p-3">
          <div className="text-xl font-bold font-mono text-ember">{fitScore}</div>
          <div className="text-xs text-foreground-muted">Fit Score</div>
        </div>
        <div className="text-center bg-electric/5 rounded-lg p-3">
          <div className="text-xl font-bold font-mono text-electric">{engagementScore}</div>
          <div className="text-xs text-foreground-muted">Engagement</div>
        </div>
      </div>

      {/* Band result */}
      <div className={`rounded-xl p-4 ${band.bg} border border-current/10`}>
        <div className={`text-sm font-bold ${band.color} mb-1`}>{band.label}</div>
        <div className={`text-xs font-semibold ${band.color} opacity-80 mb-2`}>{band.action}</div>
        <p className="text-xs text-foreground-muted leading-relaxed">{band.detail}</p>
      </div>

      {/* Thresholds */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2">Thresholds</div>
        {STATUS_BANDS.map((b) => (
          <div
            key={b.label}
            className={`flex items-center justify-between text-xs py-1 px-2 rounded ${total >= b.min && total <= b.max ? `${b.bg} ${b.color} font-semibold` : 'text-foreground-muted'}`}
          >
            <span>{b.label}</span>
            <span className="font-mono">{b.min}–{b.max}</span>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="text-xs text-foreground-muted text-center">
        {answeredCategories} / {totalCategories} categories answered
      </div>

      {/* Reset */}
      {hasStarted && (
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 text-xs text-foreground-muted hover:text-foreground py-2 rounded-lg hover:bg-charcoal/5 dark:hover:bg-ash/5 transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      )}
    </div>
  )
}
