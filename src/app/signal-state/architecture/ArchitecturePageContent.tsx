'use client'

import { motion } from 'framer-motion'
import ArchitectureDiagram from './ArchitectureDiagram'

export default function ArchitecturePageContent() {
  return (
    <>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-[var(--ss-teal-text)] mb-4"
          >
            Signal-State Marketing — v1.0
          </motion.p>
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

      {/* Diagram */}
      <section className="section">
        <div className="container-narrow">
          <ArchitectureDiagram />
        </div>
      </section>
    </>
  )
}
