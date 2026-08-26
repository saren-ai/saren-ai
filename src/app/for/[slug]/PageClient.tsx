'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { OutreachPage, ToolId } from '@/lib/contacts/types'

const toolRegistry: Record<ToolId, React.ComponentType> = {
  'behavioral-scoring': dynamic(
    () => import('@/components/behavioral-scoring/BehavioralSimulator'),
    { loading: () => <ToolSkeleton /> }
  ),
  'gtm-calculator': dynamic(
    () => import('@/components/calculator/SaasCalculator').then(m => ({ default: m.SaasCalculator })),
    { loading: () => <ToolSkeleton /> }
  ),
  'content-journey': dynamic(
    () => import('@/components/content-journey/JourneyMatrix').then(async m => {
      const { enterpriseMatrix } = await import('@/lib/content-journey')
      const Component = m.default
      return { default: () => <Component data={enterpriseMatrix} /> }
    }),
    { loading: () => <ToolSkeleton /> }
  ),
}

function ToolSkeleton() {
  return (
    <div className="h-64 rounded-lg bg-foreground/5 animate-pulse" />
  )
}

interface Props {
  page: OutreachPage
}

export default function OutreachPageClient({ page }: Props) {
  const { company, role, pain_point, tools, cta_text, cta_href } = page
  const ctaLabel = cta_text ?? 'Schedule a conversation'
  const ctaUrl   = cta_href ?? '/contact'

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Minimal header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          saren.ai
        </Link>
        <a
          href={ctaUrl}
          className="btn-primary text-sm px-4 py-2"
        >
          {ctaLabel}
        </a>
      </header>

      {/* Hero */}
      <section className="gradient-dark px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.p
            className="text-sm font-mono text-ember mb-4 uppercase tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Built for {company ?? 'you'}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            {pain_point
              ? <>A working demo of how I<br />approach {pain_point}.</>
              : <>A working demo of<br />what I build.</>
            }
          </motion.h1>
          {role && (
            <motion.p
              className="text-lg text-white/70 mb-10 max-w-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
            >
              Everything below is live — built specifically for{' '}
              {role} teams in {company ? `the ${company} context` : 'your context'}.
            </motion.p>
          )}
          <motion.a
            href={ctaUrl}
            className="btn-secondary-dark inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {ctaLabel} <ArrowRight size={16} />
          </motion.a>
        </div>
      </section>

      {/* Tools */}
      {tools && tools.length > 0 && (
        <div>
          {tools.map((embed, i) => {
            const Tool = toolRegistry[embed.id]
            if (!Tool) return null
            return (
              <section key={embed.id} className="section border-t border-border">
                <div className="container-narrow">
                  {embed.headline && (
                    <motion.h2
                      className="text-2xl font-bold text-foreground mb-8"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {embed.headline}
                    </motion.h2>
                  )}
                  <Tool />
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Closing CTA */}
      <section className="gradient-dark px-6 py-20 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            The work above is live.
          </h2>
          <p className="text-white/70 text-lg mb-8">
            If it&apos;s useful, let&apos;s talk about what it looks like inside{' '}
            {company ?? 'your organization'}.
          </p>
          <a
            href={ctaUrl}
            className="btn-primary inline-flex items-center gap-2"
          >
            {ctaLabel} <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </div>
  )
}
