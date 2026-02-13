"use client";

import Link from 'next/link';
import { Database, Zap, Brain, CircuitBoard, Rocket, BarChart3, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why AI Turns Marketing Into Engineering",
    "description": "AI-native demand generation explained: predictive infrastructure, human strategy, and scale without headcount.",
    "author": {
        "@type": "Person",
        "name": "Saren Sakurai",
        "url": "https://saren.ai/about"
    },
    "datePublished": "2026-02-12",
    "publisher": {
        "@type": "Organization",
        "name": "Saren.ai",
        "url": "https://saren.ai"
    }
};

export default function AIOperationsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* SECTION 1: HERO */}
            <section className="min-h-[90vh] flex items-center relative overflow-hidden py-20 bg-gradient-to-br from-charcoal to-offblack text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMlY2aDRVNGgtNHpNNiAzNHYtNEg0djRIMHYyaDR2NGgydi00aDR2LTJINnpNNiA0VjBINFY0SDB2Mmg0djRoMlY2aDRVNEg2eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

                <div className="container-narrow relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-6 text-center">
                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-electric font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
                    >
                        The Future of Demand Generation
                    </motion.p>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6"
                    >
                        Why AI Turns Marketing Into <span className="text-gradient">Engineering</span>
                    </motion.h1>

                    {/* Subhead */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl lg:text-2xl text-ash/80 max-w-3xl mx-auto leading-relaxed mb-10"
                    >
                        In an AI-native world, demand gen stops being guesswork and becomes predictive infrastructure. Machines handle optimization. Humans handle strategy. The result: Series B leverage with a seed-stage team.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="#the-shift" className="btn-primary" aria-label="See How It Works">
                            See How It Works
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link href="/contact" className="btn-secondary border-white/20 text-white hover:bg-white hover:text-charcoal" aria-label="Book a Strategy Call">
                            Book a Strategy Call
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: THE SHIFT */}
            <section id="the-shift" className="section bg-white scroll-mt-20">
                <div className="container-narrow">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6"
                        >
                            The Fundamental Shift
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-slate max-w-3xl mx-auto"
                        >
                            AI doesn't just make marketing faster. It rewrites what marketing is—transforming it from creative intuition into engineered systems that optimize themselves.
                        </motion.p>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[768px] grid grid-cols-2 rounded-xl overflow-hidden border border-slate/20 shadow-lg">
                            {/* Header Row */}
                            <div className="bg-gradient-to-r from-electric to-charcoal p-6 text-white font-bold text-lg">
                                Old World Demand Gen <span className="block text-sm font-normal opacity-80">(Pre-2023)</span>
                            </div>
                            <div className="bg-gradient-to-r from-charcoal to-electric p-6 text-white font-bold text-lg">
                                AI-Native Demand Gen <span className="block text-sm font-normal opacity-80">(2024+)</span>
                            </div>

                            {/* Rows */}
                            {[
                                {
                                    title: "Lead Scoring",
                                    old: [
                                        "Manual rules based on job title and company size",
                                        "Updated quarterly",
                                        "Misses 60% of high-intent buyers"
                                    ],
                                    new: [
                                        "AI scores based on behavioral signals in real-time",
                                        "Adapts continuously",
                                        "Predicts conversion likelihood with 85% accuracy"
                                    ]
                                },
                                {
                                    title: "Campaign Optimization",
                                    old: [
                                        "Humans A/B test manually",
                                        "Takes weeks to see results",
                                        "Optimization freezes between campaign cycles"
                                    ],
                                    new: [
                                        "AI reallocates spend automatically based on real-time performance",
                                        "Optimizes 24/7"
                                    ]
                                },
                                {
                                    title: "Attribution",
                                    old: [
                                        "Reports what happened",
                                        "Takes 2-3 weeks to generate",
                                        "Backward-looking only"
                                    ],
                                    new: [
                                        "Predicts what will work",
                                        "Updates in real-time",
                                        "Forward-looking + prescriptive"
                                    ]
                                },
                                {
                                    title: "Content Sequencing",
                                    old: [
                                        "Static nurture tracks",
                                        "Same emails for everyone",
                                        "2-3% engagement rates"
                                    ],
                                    new: [
                                        "AI adapts based on engagement patterns",
                                        "Personalized journeys",
                                        "12-18% engagement rates"
                                    ]
                                },
                                {
                                    title: "Scaling",
                                    old: [
                                        "Hire more SDRs, analysts, campaign managers",
                                        "Linear cost growth"
                                    ],
                                    new: [
                                        "AI handles execution",
                                        "Fractional CMO + AI systems = 10-person team output",
                                        "Exponential leverage"
                                    ]
                                }
                            ].map((row, index) => (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-6 bg-ember/5 border-b border-r border-slate/10 hover:bg-ember/10 transition-colors group"
                                    >
                                        <h3 className="font-bold text-charcoal mb-3">{row.title}</h3>
                                        <ul className="space-y-2 text-sm text-slate">
                                            {row.old.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-ember mt-1">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-6 bg-electric/5 border-b border-slate/10 hover:bg-electric/10 transition-colors group"
                                    >
                                        <h3 className="font-bold text-charcoal mb-3 hidden md:block opacity-0">{row.title}</h3>
                                        <ul className="space-y-2 text-sm text-slate">
                                            {row.new.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-electric mt-1">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: THREE PILLARS */}
            <section className="section bg-gradient-to-br from-charcoal to-offblack text-white">
                <div className="container-narrow">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                        >
                            How AI-Native Demand Gen Works
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-ash/70 max-w-3xl mx-auto"
                        >
                            AI-powered demand generation operates on three interconnected pillars. Each pillar represents a fundamental capability that wasn't possible before AI.
                        </motion.p>
                    </div>

                    <div className="space-y-8">
                        {/* PILLAR 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 border-2 border-electric rounded-2xl p-8 md:p-12 hover:bg-white/10 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Database className="w-24 h-24 text-electric" />
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-electric/20 rounded-xl">
                                    <Zap className="w-8 h-8 text-electric" />
                                </div>
                                <h3 className="text-2xl font-bold text-electric">PILLAR 1: PREDICTIVE INFRASTRUCTURE</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-lg font-bold mb-3 text-ash">WHAT IT IS:</h4>
                                    <p className="text-ash/70 mb-6 leading-relaxed">
                                        AI transforms demand gen from reactive reporting into predictive systems that optimize in real-time.
                                    </p>

                                    <h4 className="text-lg font-bold mb-3 text-ash">HOW IT WORKS:</h4>
                                    <ul className="space-y-3 text-ash/70">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                                            <span>Behavioral lead scoring analyzes engagement patterns to predict conversion likelihood</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                                            <span>Attribution models don't just report what happened—they predict which channels will perform</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric flex-shrink-0" />
                                            <span>Self-optimizing campaigns reallocate spend automatically based on conversion velocity</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="bg-charcoal/50 p-6 rounded-xl border border-electric/20 h-full">
                                        <h4 className="text-lg font-bold mb-4 text-electric">REAL EXAMPLE:</h4>
                                        <p className="text-ash/80 mb-6 leading-relaxed">
                                            At Qwiet AI, we built a behavioral scoring model that reduced CAC by 70% by routing high-intent leads to sales immediately while nurturing lower-intent prospects automatically.
                                        </p>
                                        <Link href="/portfolio/roi-simulator" className="text-electric font-bold hover:text-white transition-colors inline-flex items-center">
                                            See the ROI Simulator <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* PILLAR 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            className="bg-white/5 border-2 border-copper rounded-2xl p-8 md:p-12 hover:bg-white/10 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Brain className="w-24 h-24 text-copper" />
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-copper/20 rounded-xl">
                                    <CircuitBoard className="w-8 h-8 text-copper" />
                                </div>
                                <h3 className="text-2xl font-bold text-copper">PILLAR 2: HUMAN STRATEGY</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-lg font-bold mb-3 text-ash">WHAT IT IS:</h4>
                                    <p className="text-ash/70 mb-6 leading-relaxed">
                                        AI is brilliant at optimization. Terrible at strategy. Humans architect the frameworks—category narratives, buyer journeys, positioning—that tell AI what to optimize for.
                                    </p>

                                    <h4 className="text-lg font-bold mb-3 text-ash">HOW IT WORKS:</h4>
                                    <ul className="space-y-3 text-ash/70">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                                            <span>Category creation and market positioning (AI can't invent this)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                                            <span>Buyer psychology and persona frameworks that inform AI scoring rules</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                                            <span>Strategic content journeys that map emotional states to content types</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="bg-charcoal/50 p-6 rounded-xl border border-copper/20 h-full">
                                        <h4 className="text-lg font-bold mb-4 text-copper">REAL EXAMPLE:</h4>
                                        <p className="text-ash/80 mb-6 leading-relaxed">
                                            At WethosAI, we created the "Collaborative AI" category from scratch—defining the market narrative, buyer personas, and positioning that AI systems then executed through automated campaigns.
                                        </p>
                                        <Link href="/portfolio/sovereign-personas" className="text-copper font-bold hover:text-white transition-colors inline-flex items-center">
                                            See Sovereign Personas <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* PILLAR 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/5 border-2 border-ember rounded-2xl p-8 md:p-12 hover:bg-white/10 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Rocket className="w-24 h-24 text-ember" />
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-ember/20 rounded-xl">
                                    <Zap className="w-8 h-8 text-ember" />
                                </div>
                                <h3 className="text-2xl font-bold text-ember">PILLAR 3: SCALE WITHOUT HEADCOUNT</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-lg font-bold mb-3 text-ash">WHAT IT IS:</h4>
                                    <p className="text-ash/70 mb-6 leading-relaxed">
                                        Because AI handles repetitive execution, you can operate at Series B scale with a seed-stage team.
                                    </p>

                                    <h4 className="text-lg font-bold mb-3 text-ash">HOW IT WORKS:</h4>
                                    <ul className="space-y-3 text-ash/70">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0" />
                                            <span>Automated lead routing and nurture sequences replace SDR armies</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0" />
                                            <span>Self-optimizing campaigns eliminate campaign manager busywork</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0" />
                                            <span>Real-time attribution dashboards replace analyst reports</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="bg-charcoal/50 p-6 rounded-xl border border-ember/20 h-full">
                                        <h4 className="text-lg font-bold mb-4 text-ember">REAL EXAMPLE:</h4>
                                        <p className="text-ash/80 mb-6 leading-relaxed">
                                            At Cylance, we achieved 550% pipeline growth with a 5-person demand gen team by building AI-powered scoring, automated nurture tracks, and self-optimizing paid media—infrastructure that would have required 20+ people in the pre-AI world.
                                        </p>
                                        <Link href="/portfolio/120-day-content-journey" className="text-ember font-bold hover:text-white transition-colors inline-flex items-center">
                                            See the 120-Day Content Journey <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: MARKET TIMING */}
            <section className="section bg-white">
                <div className="container-narrow">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-charcoal mb-6"
                        >
                            Why This Shift Is Happening Right Now
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate max-w-2xl mx-auto"
                        >
                            Three converging forces are making AI-native demand gen the new standard—and companies that don't adapt will be left behind.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "AI Capability Explosion",
                                content: [
                                    "GPT-4, Claude, and multimodal models now handle:",
                                    "Behavioral pattern recognition",
                                    "Real-time decision making",
                                    "Multi-channel optimization"
                                ]
                            },
                            {
                                title: "Market Pressure",
                                content: [
                                    "Boards expect 3x efficiency with flat headcount.",
                                    "CAC is rising across every channel.",
                                    "Founders need pipeline NOW, not after they hire a full team."
                                ]
                            },
                            {
                                title: "Talent Shortage",
                                content: [
                                    "Hiring experienced demand gen talent takes 6-9 months.",
                                    "AI systems can be deployed in weeks.",
                                    "Fractional CMO + AI infrastructure = 10-person team output."
                                ]
                            }
                        ].map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-ash/50 to-white border border-ash rounded-2xl p-8 shadow-sm flex flex-col items-start"
                            >
                                <div className="w-10 h-10 rounded-full bg-ember text-white font-bold flex items-center justify-center text-xl mb-6 shadow-md">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-charcoal mb-4">{card.title}</h3>
                                <ul className="space-y-3">
                                    {card.content.map((item, i) => (
                                        <li key={i} className="text-slate text-sm leading-relaxed flex items-start gap-2">
                                            {i > 0 && <span className="text-ember mt-1.5 w-1 h-1 rounded-full flex-shrink-0" />}
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: HOW I WORK */}
            <section className="section gradient-accent text-white">
                <div className="container-narrow">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-6"
                        >
                            How We Build AI-Native Demand Systems
                        </motion.h2>
                        <p className="text-lg opacity-90">A typical 90-day engagement looks like this:</p>
                    </div>

                    <div className="max-w-4xl mx-auto relative pl-6 md:pl-0">
                        {/* Timeline Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-electric transform -translate-x-1/2" />

                        {[
                            {
                                week: "Week 1-2",
                                title: "Audit & Architecture",
                                items: [
                                    "Audit existing funnel, attribution, and tech stack",
                                    "Identify AI integration opportunities",
                                    "Design pillar-based growth architecture"
                                ],
                                deliverable: "Strategic roadmap with 90-day milestones"
                            },
                            {
                                week: "Week 3-6",
                                title: "Foundation Build",
                                items: [
                                    "Implement behavioral lead scoring",
                                    "Build attribution dashboards",
                                    "Set up automated nurture sequences"
                                ],
                                deliverable: "Functioning AI-powered infrastructure"
                            },
                            {
                                week: "Week 7-10",
                                title: "Optimization & Scale",
                                items: [
                                    "Train AI models on your data",
                                    "A/B test and refine scoring rules",
                                    "Document playbooks for future team"
                                ],
                                deliverable: "Self-optimizing system + handoff docs"
                            },
                            {
                                week: "Week 11-12",
                                title: "Prove ROI",
                                items: [
                                    "Measure pipeline impact",
                                    "Calculate CAC reduction",
                                    "Present board-ready metrics"
                                ],
                                deliverable: "ROI report with recommendations"
                            }
                        ].map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`relative mb-12 flex ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
                            >
                                {/* Spacer for desktop alignment */}
                                <div className="hidden md:block w-1/2" />

                                {/* Dot */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-ember rounded-full shadow-lg transform -translate-x-1/2 z-10" />

                                {/* Content Box */}
                                <div className={`md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className="bg-white text-charcoal p-6 rounded-xl shadow-lg inline-block text-left w-full hover:scale-105 transition-transform duration-300">
                                        <span className="text-sm font-mono text-electric font-bold uppercase mb-2 block">{phase.week}</span>
                                        <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                                        <ul className={`space-y-2 text-sm text-slate mb-6 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                            {phase.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-electric mt-1">→</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="inline-block bg-copper text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Deliverable: {phase.deliverable}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: CTA */}
            <section className="section bg-charcoal text-white text-center">
                <div className="container-narrow">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Ready to Build <span className="text-gradient">AI-Native</span> Demand Gen?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-ash/80 max-w-2xl mx-auto mb-10"
                    >
                        Let's audit your current funnel and architect a system that proves ROI in 90 days.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4" aria-label="Book a Strategy Call">
                            Book a Strategy Call
                        </Link>
                        <Link href="/portfolio" className="btn-secondary border-ash/30 text-white hover:bg-white hover:text-charcoal text-lg px-8 py-4" aria-label="See the Portfolio">
                            See the Portfolio
                        </Link>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-ash/50"
                    >
                        Trusted by Cylance ($1.4B exit), WethosAI (Series A), Qwiet AI (10M ARR)
                    </motion.p>
                </div>
            </section>
        </>
    );
}
