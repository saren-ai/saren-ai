'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SignalStateSubnav from '@/components/signal-state/SignalStateSubnav'

const USE_CASES = [
  {
    number: '01',
    title: 'Cybersecurity / Ransomware',
    description: 'Finding organizational vulnerability before the attack.',
    detail: 'A mid-size company with no CISO, exposed RDP ports, and an IT team of two managing 400 employees. The signal is already visible — leadership just isn\'t looking.',
    href: '/signal-state/use-cases/cybersecurity',
    bgVar: '--ss-teal-bg',
    borderVar: '--ss-teal-border',
    textVar: '--ss-teal-text',
  },
  {
    number: '02',
    title: 'Organizational Alignment',
    description: 'Reading the signals leadership can\'t see from inside.',
    detail: 'A VP of Product just departed after 11 months with a carefully worded LinkedIn post. 43 comments. The signal is community-validated and the window is open.',
    href: '/signal-state/use-cases/org-alignment',
    bgVar: '--ss-coral-bg',
    borderVar: '--ss-coral-border',
    textVar: '--ss-coral-text',
  },
  {
    number: '03',
    title: 'Independent Creative',
    description: 'The moment a solo operator names the capability gap.',
    detail: '"Lost a pitch today… I realized I was bringing a knife to a gunfight." Posted 6 hours ago. 31 comments. 18 people saying "same." Peak window.',
    href: '/signal-state/use-cases/independent-creative',
    bgVar: '--ss-purple-bg',
    borderVar: '--ss-purple-border',
    textVar: '--ss-purple-text',
  },
]

export default function UseCasesClient() {
  return (
    <>
      {/* Hero */}
      <section className="hero-card section gradient-dark text-ash">
        <div className="container-narrow">
          <Breadcrumb
            back={{ href: '/signal-state', label: 'Signal-State' }}
            current="Use Cases"
            accentColor="var(--ss-teal-text)"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          >
            Three scenarios. One framework.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-foreground-muted text-lg max-w-xl"
          >
            Signal-State Marketing applied to three distinct use cases — each with a real signal, a real empathic read, and a real outreach.
          </motion.p>
        </div>
      </section>

      <SignalStateSubnav />

      {/* Use Case Cards */}
      <section className="section">
        <div className="container-narrow">
          <div className="space-y-6">
            {USE_CASES.map((uc, index) => (
              <motion.div
                key={uc.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={uc.href} className="block group">
                  <div
                    className="rounded-xl p-7 border transition-all group-hover:scale-[1.01]"
                    style={{
                      background: `var(${uc.bgVar})`,
                      borderColor: `var(${uc.borderVar})`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p
                          className="text-xs font-semibold tracking-widest uppercase mb-2"
                          style={{ color: `var(${uc.textVar})`, opacity: 0.75 }}
                        >
                          Use Case {uc.number}
                        </p>
                        <h2
                          className="text-2xl font-bold mb-2"
                          style={{ color: `var(${uc.textVar})` }}
                        >
                          {uc.title}
                        </h2>
                        <p
                          className="font-medium mb-3"
                          style={{ color: `var(${uc.textVar})` }}
                        >
                          {uc.description}
                        </p>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {uc.detail}
                        </p>
                      </div>
                      <div
                        className="text-2xl shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: `var(${uc.textVar})` }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
