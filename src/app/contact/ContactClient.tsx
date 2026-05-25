"use client";

import { motion } from "framer-motion";
import { Mail, Clock, CalendarDays } from "lucide-react";
import Image from "next/image";
import FAQ from "@/components/ui/FAQ";

export default function ContactClient() {
    return (
        <article>
            {/* Hero */}
            <section className="hero-card section gradient-dark text-ash">
                <div className="container-narrow">
                    <div className="flex items-center gap-8 md:gap-12">
                        {/* Profile photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="shrink-0"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-white/20">
                                <Image
                                    src="/profile/saren-profile_2026.png"
                                    alt="Saren Sakurai"
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover object-top"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Headline + subhead + CTA */}
                        <div className="min-w-0">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                            >
                                Let&apos;s Connect
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg md:text-xl text-ash/80 leading-relaxed mb-6 max-w-xl"
                            >
                                Ready to build a growth engine that scales? Whether you need a
                                fractional CMO, demand gen strategy, or marketing operations help,
                                I&apos;d love to hear from you.
                            </motion.p>
                            <motion.a
                                href="https://calendly.com/sarenai"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18 }}
                                className="btn-primary inline-flex items-center gap-2 self-start"
                            >
                                <CalendarDays className="w-4 h-4" />
                                Schedule time with me
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section bg-ash">
                <div className="container-narrow">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                        {/* Primary CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col justify-center"
                        >
                            <h2 className="text-2xl font-bold text-charcoal mb-4">
                                Just send me an email
                            </h2>
                            <p className="text-slate mb-8 leading-relaxed">
                                No forms, no funnels. Tell me what&apos;s going on — what&apos;s
                                working, what isn&apos;t, and what you&apos;ve tried. I&apos;ll
                                read it and write back.
                            </p>
                            <a
                                href="mailto:saren.sakurai@gmail.com?subject=Let%27s%20Work%20Together"
                                className="btn-primary inline-flex items-center gap-3 self-start text-lg px-8 py-4"
                            >
                                <Mail className="w-5 h-5" />
                                Email Saren
                            </a>
                            <p className="text-sm text-slate/70 mt-4">
                                Opens your email client · saren.sakurai@gmail.com
                            </p>
                        </motion.div>

                        {/* Other Contact Methods */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8"
                        >
                            {/* LinkedIn */}
                            <div className="p-6 bg-white rounded-xl border border-charcoal/10">
                                <h3 className="text-lg font-bold text-charcoal mb-2">
                                    Connect on LinkedIn
                                </h3>
                                <p className="text-slate text-sm mb-4">
                                    Let&apos;s connect professionally and stay in touch.
                                </p>
                                <a
                                    href="https://www.linkedin.com/in/saren/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-linkedin text-linkedin rounded-lg hover:bg-linkedin hover:text-white transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    View LinkedIn Profile
                                </a>
                            </div>

                            {/* Response Time */}
                            <div className="p-4 bg-charcoal/5 rounded-lg">
                                <p className="text-sm text-slate flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-lavender" />
                                    Typical response time: 24-48 hours
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                title="Before You Reach Out"
                description="Quick answers to common questions"
                items={[
                    {
                        question: "What's the best way to work with you?",
                        answer: "Most clients engage me as a fractional CMO (10-20 hours/week) for strategic leadership and system building. Some bring me in for project-based work like building a demand gen engine, implementing analytics frameworks, or creating a growth strategy. Send me an email and we'll figure out the best fit."
                    },
                    {
                        question: "Do you take on short-term projects?",
                        answer: "It depends. If it's a well-defined deliverable (like 'build an attribution dashboard' or 'create a content strategy'), yes. But most of my engagements start with at least 3 months to properly diagnose, build strategy, and start implementation. I'm not a good fit for one-off campaigns or quick audits."
                    },
                    {
                        question: "What industries do you specialize in?",
                        answer: "I focus on B2B SaaS, with deep experience in cybersecurity, AI/ML, and infrastructure software. But the principles of demand generation apply across complex B2B sales. What matters more is your sales motion (enterprise vs PLG), deal size ($10K+ ACV), and sales cycle length (60+ days)."
                    },
                    {
                        question: "How quickly can you start?",
                        answer: "I typically have 1-2 fractional slots available at any time. If we're a good fit, we can usually kick off within 2-3 weeks. Project-based work has more flexibility. Enterprise consulting engagements (through my network) can start immediately."
                    },
                    {
                        question: "Do you work with agencies or only direct with companies?",
                        answer: "Both. Many agencies bring me in for strategic guidance when their client needs demand gen architecture, analytics frameworks, or fractional CMO leadership. I also work directly with companies that have agencies handling execution but need strategic direction."
                    },
                    {
                        question: "What if I'm not sure what I need?",
                        answer: "That's normal. Most companies reach out because they know something isn't working but can't diagnose it. Just email me and describe your situation — what's working, what's not, what you've tried. We'll schedule a 30-min call to figure out if I can help and how."
                    }
                ]}
            />
        </article>
    );
}
