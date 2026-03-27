'use client'

import { motion } from 'framer-motion'
import ArchitectureDiagram from './ArchitectureDiagram'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SignalStateSubnav from '@/components/signal-state/SignalStateSubnav'

export default function ArchitecturePageContent() {
  return (
    <>
      {/* Hero */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <Breadcrumb
            back={{ href: '/signal-state', label: 'Signal-State' }}
            current="Architecture"
            accentColor="var(--ss-teal-text)"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            Multi-Agent Platform Architecture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-foreground-muted text-lg max-w-xl"
          >
            Detect → Empathize → Respond. Each node is interactive — click to expand details.
          </motion.p>
        </div>
      </section>

      <SignalStateSubnav />

      {/* Diagram */}
      <section className="section">
        <div className="container-narrow">
          <ArchitectureDiagram />
        </div>
      </section>
    </>
  )
}
