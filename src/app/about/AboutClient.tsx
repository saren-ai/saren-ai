"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FAQ from "@/components/ui/FAQ";
import ProfileGallery from "@/components/ui/ProfileGallery";

const careerTimeline = [
    {
        role: "Fractional Head of Marketing",
        company: "WethosAI",
        period: "2023 - Present",
        metric: "+344% lead growth",
        description:
            "Leading marketing strategy and demand generation for an AI-powered team collaboration platform.",
    },
    {
        role: "Head of Growth Marketing",
        company: "Qwiet AI",
        period: "2023",
        metric: "8:1 ROI on paid",
        description:
            "Built and scaled growth marketing function for application security startup.",
    },
    {
        role: "Sr. Director, Digital Marketing",
        company: "BlackBerry/Cylance",
        period: "2020 - 2023",
        metric: "$4M quarterly pipeline",
        description:
            "Led digital marketing through acquisition, maintaining growth momentum while integrating teams.",
    },
    {
        role: "Director, Demand Generation",
        company: "Cylance",
        period: "2017 - 2020",
        metric: "550% pipeline expansion",
        description:
            "Built demand gen engine from scratch, scaling from startup to $400M+ revenue.",
    },
];

const statsData = [
    { value: "550%", label: "Pipeline Expansion" },
    { value: "70%", label: "CAC Reduction" },
    { value: "344%", label: "Lead Growth" },
    { value: "8:1", label: "ROI on Paid Media" },
    { value: "$4M", label: "Quarterly Pipeline" },
    { value: "15+", label: "Years Experience" },
];

const personalLinks = [
    {
        name: "Comic Collection",
        description: "My pulls and collection on League of Comic Geeks",
        href: "https://leagueofcomicgeeks.com/profile/saren/collection",
        icon: "📚",
    },
    {
        name: "Vinyl Collection",
        description: "Browse my record collection on Discogs",
        href: "https://www.discogs.com/user/saren13",
        icon: "🎵",
    },
    {
        name: "Letterboxd",
        description: "Films I've watched and reviewed",
        href: "https://letterboxd.com/saren13/films/",
        icon: "🎬",
    },
    {
        name: "Funko Pop Collection",
        description: "Pop culture collectibles on Pops.Today",
        href: "https://pops.today/user/Saren/collection/",
        icon: "🎭",
    },
];

export default function AboutClient() {
    return (
        <article>
            {/* Hero */}
            <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
                <div className="container-narrow">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Profile Gallery */}
                        <div className="shrink-0">
                            <ProfileGallery />
                        </div>

                        {/* Text */}
                        <div className="flex-1 max-w-2xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                            >
                                Marketing for the messy middle.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl text-ash/80 leading-relaxed"
                            >
                                I build growth engines at the intersection of cultural
                                storytelling and systems design. From early-stage sprints to
                                enterprise scale, I skip the 101s and focus on the mechanics of
                                what actually moves the needle. No fluff, just smart takes and
                                measurable outcomes.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Timeline */}
            <section className="section bg-ash">
                <div className="container-narrow">
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center">
                        Career Journey
                    </h2>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-charcoal/10 transform md:-translate-x-1/2" />

                        {/* Timeline Items */}
                        <div className="space-y-12">
                            {careerTimeline.map((item, index) => (
                                <motion.div
                                    key={item.company}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content */}
                                    <div className="md:w-1/2 pl-8 md:pl-0">
                                        <div
                                            className={`bg-white p-6 rounded-xl border border-charcoal/10 shadow-sm hover:shadow-md transition-shadow ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                                                }`}
                                        >
                                            <span className="text-sm text-slate font-mono">
                                                {item.period}
                                            </span>
                                            <h3 className="text-xl font-bold text-charcoal mt-1">
                                                {item.role}
                                            </h3>
                                            <p className="text-electric font-medium">{item.company}</p>
                                            <p className="text-slate mt-3 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                            <div className="mt-4 inline-block px-3 py-1 bg-ember/10 rounded-full">
                                                <span className="text-ember font-mono font-semibold text-sm">
                                                    {item.metric}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-ember rounded-full border-4 border-ash transform -translate-x-1/2 md:-translate-x-1/2 z-10" />

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block md:w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Logo Teaser */}
            <section className="section bg-charcoal/5">
                <div className="container-narrow">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                            Trusted by Leading Brands
                        </h2>
                        <p className="text-slate text-lg max-w-2xl mx-auto mb-8">
                            From B2B tech unicorns to Fortune 500 consumer brands
                        </p>
                    </div>

                    {/* Logo Preview Grid */}
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto mb-8">
                        {[
                            "blackberry.png",
                            "cisco.png",
                            "nike.png",
                            "red-bull.png",
                            "palo-alto.png",
                            "coca-cola.png",
                        ].map((logo, index) => (
                            <motion.div
                                key={logo}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="aspect-square flex items-center justify-center p-3 rounded-lg bg-offblack/80 border border-ash/10"
                            >
                                <Image
                                    src={`/logos/clients/${logo}`}
                                    alt="Client logo"
                                    width={100}
                                    height={100}
                                    className="w-full h-auto object-contain opacity-70"
                                />
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/about/clients"
                            className="inline-flex items-center gap-2 text-electric hover:text-ember transition-colors font-medium"
                        >
                            View all {26} brands
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* By the Numbers */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        By the Numbers
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        {statsData.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
                            >
                                <div className="metric-value text-3xl md:text-4xl">
                                    {stat.value}
                                </div>
                                <div className="metric-label mt-2 text-ash/60">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Personal Interests */}
            <section className="section bg-ash">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 text-center">
                            Outside of Work
                        </h2>
                        <p className="text-slate text-center mb-12">
                            When I&apos;m not building growth engines, you&apos;ll find me collecting
                            things, watching films, and exploring culture.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {personalLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-4 p-4 bg-white rounded-lg border border-charcoal/10 hover:border-electric hover:shadow-md transition-all group"
                                >
                                    <span className="text-2xl">{link.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-charcoal group-hover:text-ember transition-colors">
                                            {link.name}
                                        </h3>
                                        <p className="text-sm text-slate">{link.description}</p>
                                    </div>
                                    <svg
                                        className="w-4 h-4 text-slate/40 ml-auto mt-1 group-hover:text-electric transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "What does 'fractional CMO' actually mean?",
                        answer: "I work with companies that need senior marketing leadership but don't need (or can't afford) a full-time CMO. Typical engagements are 10-20 hours per week for 6-12 months. I build the strategy, set up systems, hire and coach the team, then hand off execution to your in-house team or agency partners. It's like having a CMO on retainer."
                    },
                    {
                        question: "What size companies do you typically work with?",
                        answer: "I focus on B2B SaaS companies in two stages: (1) Series A/B startups scaling from $1M-$10M ARR, and (2) growth-stage companies ($10M-$50M ARR) that need to professionalize their marketing function. If you're spending $50K+/month on marketing and sales but can't articulate what's working, we should talk."
                    },
                    {
                        question: "Do you only work with AI/security companies?",
                        answer: "No, but that's where most of my experience is. The principles of demand generation, funnel optimization, and growth marketing apply across B2B SaaS. What matters more is sales motion (enterprise vs PLG), deal size, and sales cycle length. If you're selling complex software to technical buyers with 60+ day sales cycles, I've probably solved your problem before."
                    },
                    {
                        question: "How is working with you different from hiring a marketing agency?",
                        answer: "Agencies execute campaigns. I build systems and strategy. I'll help you figure out what to do (channel strategy, positioning, demand gen architecture), then either execute it myself or work with your agency to implement it. Most companies hire me because they don't know what to tell their agency to do—or because their agency is doing what they're told but it's not working."
                    },
                    {
                        question: "Can you help if we already have a VP Marketing?",
                        answer: "Yes. Many of my clients have VPs or Directors of Marketing who are strong executors but need strategic guidance on growth architecture, analytics frameworks, or demand gen systems. I often work alongside internal leaders as a strategic advisor and coach, helping them level up while building the infrastructure they need."
                    },
                    {
                        question: "What's your typical engagement timeline and cost?",
                        answer: "Most engagements start with a 3-month sprint to diagnose, strategize, and start building. Then we typically extend for 6-12 months to execute and hand off. Cost varies based on scope and company stage, but typical range is $8K-$15K/month for fractional work. Reach out and we can discuss your specific situation."
                    }
                ]}
            />

            {/* CTA */}
            <section className="section bg-charcoal/5">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                        Ready to talk about your growth engine?
                    </h2>
                    <p className="text-slate text-lg max-w-2xl mx-auto mb-8">
                        Whether you&apos;re looking for a fractional CMO, need help building
                        your demand gen function, or want to optimize your marketing ops,
                        let&apos;s connect.
                    </p>
                    <Link href="/contact" className="btn-primary inline-flex text-lg">
                        Get in touch
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </section>
        </article>
    );
}
