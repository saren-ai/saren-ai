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
            <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash overflow-hidden">
                <div className="container-narrow relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Profile Gallery */}
                        <div className="shrink-0">
                            <ProfileGallery />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
                            >
                                I help AI and B2B tech companies fix the invisible leaks in their growth engine — before they waste another quarter chasing the wrong buyers.
                            </motion.h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Pattern */}
            <section className="section bg-white text-charcoal">
                <div className="container-narrow">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px bg-charcoal/20 flex-1" />
                            <span className="text-sm font-mono text-slate uppercase tracking-wider">The Pattern I Keep Seeing</span>
                            <div className="h-px bg-charcoal/20 flex-1" />
                        </div>

                        <div className="prose prose-lg text-slate leading-relaxed">
                            <p className="font-bold text-charcoal text-xl mb-4">
                                Strong product.<br />
                                Smart team.<br />
                                Decent traction.
                            </p>
                            <p className="mb-6">
                                But growth stalls.
                            </p>
                            <p className="mb-6">
                                Not because the product is broken.
                            </p>
                            <p className="mb-6">
                                Because the story is muddy. The positioning is vague. The wrong buyers are clicking. The homepage reads like version 0.7 of the company while the product is already 2.3.
                            </p>
                            <p>
                                I’ve spent 20+ years inside that moment — from Nike and AKQA to AI startups scaling through acquisition — and the pattern is remarkably consistent.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's actually going wrong */}
            <section className="section bg-charcoal/5">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 mb-12 justify-center">
                            <div className="h-px bg-charcoal/20 w-12" />
                            <span className="text-sm font-mono text-slate uppercase tracking-wider">What’s Actually Going Wrong</span>
                            <div className="h-px bg-charcoal/20 w-12" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-charcoal mb-4">
                                    Most teams think they have a traffic problem.
                                </h3>
                                <p className="text-xl text-ember font-medium">
                                    They usually have a clarity problem.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <ul className="space-y-3 text-slate">
                                    <li className="flex gap-3">
                                        <span className="text-ember">•</span>
                                        The value proposition isn’t painfully clear.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-ember">•</span>
                                        The site speaks in generic ambition instead of naming a specific failure.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-ember">•</span>
                                        Marketing attracts “problem-aware” browsers instead of “this just broke and I need a fix” buyers.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-ember">•</span>
                                        The brand hasn’t matured at the same speed as the product.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-ember">•</span>
                                        Growth depends on paid acquisition instead of engineered discoverability.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white rounded-xl border border-charcoal/5 text-center">
                            <p className="text-lg text-slate mb-2">When that happens, pipeline slows, sales cycles stretch, and everyone assumes “we need more leads.”</p>
                            <p className="text-xl font-bold text-charcoal">Usually, you don’t. You need better signal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How I Work */}
            <section className="section bg-charcoal text-ash">
                <div className="container-narrow">
                    <div className="text-center mb-16">
                        <div className="flex items-center gap-4 mb-6 justify-center">
                            <div className="h-px bg-ash/20 w-12" />
                            <span className="text-sm font-mono text-ash/60 uppercase tracking-wider">How I Work</span>
                            <div className="h-px bg-ash/20 w-12" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">I rebuild the growth system around three principles:</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Principle 1 */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-ember/50 transition-colors">
                            <div className="text-ember font-mono text-xl mb-4">01.</div>
                            <h3 className="text-xl font-bold mb-4">Failure-based positioning</h3>
                            <p className="text-ash/80 leading-relaxed mb-6">
                                We stop marketing to curiosity and start speaking to the moment something went wrong — the in-house build that collapsed, the tool migration that corrupted data, the demand gen engine that flatlined.
                            </p>
                            <p className="text-white font-medium border-t border-white/10 pt-4">
                                Failure-aware buyers move fast. We design for them.
                            </p>
                        </div>

                        {/* Principle 2 */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-ember/50 transition-colors">
                            <div className="text-ember font-mono text-xl mb-4">02.</div>
                            <h3 className="text-xl font-bold mb-4">Radical specificity</h3>
                            <p className="text-ash/80 leading-relaxed mb-6">
                                No more “we help teams grow.” We name the buyer, the mistake they’re making, and the cost of continuing.
                            </p>
                            <p className="text-white font-medium border-t border-white/10 pt-4">
                                If a founder reads the homepage and says, “That’s exactly what’s happening to us,” we’re on the right track.
                            </p>
                        </div>

                        {/* Principle 3 */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-ember/50 transition-colors">
                            <div className="text-ember font-mono text-xl mb-4">03.</div>
                            <h3 className="text-xl font-bold mb-4">Engineered visibility</h3>
                            <p className="text-ash/80 leading-relaxed mb-6">
                                Instead of relying purely on ads or trendy social noise, we build marketing assets that rank, compound, and attract intent — free tools, frameworks, structured content that shows up exactly when buyers are searching for help.
                            </p>
                            <p className="text-white font-medium border-t border-white/10 pt-4">
                                Growth should compound. Not reset every month.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes This Different */}
            <section className="section bg-white text-charcoal">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px bg-charcoal/20 flex-1" />
                            <span className="text-sm font-mono text-slate uppercase tracking-wider">What Makes This Different</span>
                            <div className="h-px bg-charcoal/20 flex-1" />
                        </div>

                        <div className="prose prose-lg text-slate leading-relaxed">
                            <p className="font-bold text-charcoal text-xl mb-6">
                                I don’t just write positioning decks.
                            </p>
                            <p className="mb-8">
                                I build systems that connect <span className="text-ember font-medium">messaging → demand generation → sales enablement → retention signals</span>.
                            </p>
                            <p className="mb-4">
                                Because unclear messaging doesn’t just hurt conversion.
                            </p>
                            <ul className="list-none pl-0 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-ember"></span>It erodes credibility.</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-ember"></span>It makes ROI harder to prove.</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-ember"></span>It lowers adoption.</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-ember"></span>It quietly drags valuation.</li>
                            </ul>
                            <p className="font-medium text-charcoal border-l-4 border-ember pl-6 py-2 bg-ember/5">
                                Marketing isn’t separate from operations. It’s the narrative layer of the entire revenue system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Where This Perspective Comes From */}
            <section className="section bg-charcoal/5">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 mb-8 justify-center">
                            <div className="h-px bg-charcoal/20 w-12" />
                            <span className="text-sm font-mono text-slate uppercase tracking-wider">Where This Perspective Comes From</span>
                            <div className="h-px bg-charcoal/20 w-12" />
                        </div>

                        <div className="text-center text-lg text-slate leading-relaxed space-y-6">
                            <p>
                                I’ve led brand and digital strategy at global agencies, helped scale cybersecurity and AI companies through acquisition, and worked inside early-stage startups where every hire and headline matters.
                            </p>
                            <p>
                                Across all of it, one truth repeats:
                            </p>
                            <div className="py-6">
                                <p className="text-2xl font-bold text-charcoal mb-2">
                                    When a company can clearly articulate the failure it prevents, growth accelerates.
                                </p>
                                <p className="text-xl text-slate/80">
                                    When it speaks vaguely about aspiration, growth stalls.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What I Believe */}
            <section className="py-24 bg-charcoal text-ash text-center">
                <div className="container-narrow">
                    <span className="text-sm font-mono text-ember uppercase tracking-wider mb-6 block">What I Believe</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                        Great marketing doesn’t add noise.<br />
                        It removes confusion.
                    </h2>
                    <p className="text-xl text-ash/80 max-w-2xl mx-auto">
                        When the right buyer lands on your site, they shouldn’t need interpretation. <span className="text-white font-medium block mt-2">They should feel seen.</span>
                    </p>
                </div>
            </section>

            {/* If This Sounds Familiar */}
            <section className="section bg-white">
                <div className="container-narrow text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 mb-8 justify-center">
                            <div className="h-px bg-charcoal/20 w-12" />
                            <span className="text-sm font-mono text-slate uppercase tracking-wider">If this sounds familiar</span>
                            <div className="h-px bg-charcoal/20 w-12" />
                        </div>
                        <div className="space-y-2 text-xl text-slate mb-8 font-medium">
                            <p>If your product works but your growth doesn’t feel proportional…</p>
                            <p>If you’re attracting interest but not urgency…</p>
                            <p>If your homepage feels like it belongs to a previous version of your company…</p>
                        </div>
                        <p className="text-2xl font-bold text-ember">Let’s fix the signal.</p>
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
