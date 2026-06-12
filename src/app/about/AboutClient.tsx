"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Guitar, BookOpen, Disc3, Film, Drama } from "lucide-react";
import FAQ from "@/components/ui/FAQ";
import { TierListBoard } from "@/components/tier-list/TierListBoard";
import { AI_TOOLS } from "@/lib/tier-list";

const stackCategories = [
  {
    name: "AI Development",
    description: "AI-native tools powering my daily workflow",
    toolIds: [
      "cursor",
      "claude-code",
      "claude",
      "chatgpt",
      "gemini",
      "perplexity",
      "deepseek",
      "grok",
      "notebooklm",
      "manus",
    ],
  },
  {
    name: "Development & Deployment",
    description: "Infrastructure for building and shipping",
    toolIds: ["github", "breeze"],
  },
  {
    name: "Marketing & Sales",
    description: "Tools for growth and revenue",
    toolIds: ["hubspot", "plai", "wethosai"],
  },
];

const toolMap = new Map(AI_TOOLS.map((t) => [t.id, t]));

interface CareerMetric {
    value: string;
    label: string;
}

interface CareerDetailSection {
    title: string;
    description: string;
    metrics: CareerMetric[];
}

interface CareerItem {
    role: string;
    company: string;
    period: string;
    metric?: string;
    description: string;
    href?: string;
    details?: {
        sections: CareerDetailSection[];
    };
}

const careerTimeline: CareerItem[] = [
    {
        role: "Fractional Head of Marketing",
        company: "Wethos AI",
        period: "Oct 2023 – Present",
        metric: "+344% lead growth",
        description:
            "Leading marketing strategy and demand generation for an AI-powered team collaboration platform.",
        details: {
            sections: [
                {
                    title: "Demand Generation",
                    description:
                        "Built multi-channel engine across inbound, ABM, webinar, and outbound with full attribution tracking from lead source to closed deal.",
                    metrics: [
                        { value: "999", label: "MQLs Generated" },
                        { value: "$3.45M", label: "Pipeline Created" },
                        { value: "22", label: "Marketing-Sourced Deals Closed" },
                    ],
                },
                {
                    title: "LinkedIn Growth",
                    description:
                        "Grew company presence with a director-level audience concentration across 100 posts.",
                    metrics: [
                        { value: "1,556", label: "Followers" },
                        { value: "29%", label: "Director-Level or Above" },
                        { value: "9.4%", label: "Engagement Rate" },
                        { value: "41K", label: "Impressions" },
                        { value: "2,499", label: "Website Clicks" },
                    ],
                },
                {
                    title: "Expansion Revenue",
                    description:
                        "Partnered with Customer Success on expansion marketing across renewing accounts.",
                    metrics: [
                        { value: "149%", label: "Net Revenue Retention" },
                        { value: "15", label: "Renewing Accounts" },
                        { value: "75%", label: "of Quarterly Revenue from Expansion" },
                        { value: "$518K", label: "All-Time Expansion Total" },
                    ],
                },
            ],
        },
    },
    {
        role: "Head of Growth",
        company: "Qwiet AI",
        period: "Jul – Dec 2023",
        metric: "70% Google Ads CAC reduction",
        description:
            "Built and scaled growth marketing function for application security startup — 300% inbound MQL growth.",
    },
    {
        role: "Head of Marketing (Fractional)",
        company: "CloudKitchens",
        period: "Jan – Jun 2023",
        description:
            "Six-month fractional engagement applying B2B demand generation and marketing operations practices to the ghost kitchen / food-tech platform.",
    },
    {
        role: "Senior Director of Marketing",
        company: "BlackBerry (formerly Cylance)",
        period: "Nov 2020 – Jan 2023",
        metric: "8:1 ROI on $2.3M paid budget",
        description:
            "Acquihired with the Cylance demand team post-acquisition. Inherited an underperforming digital program and rebuilt it end to end — SEM, SEO, landing experience, and conversion infrastructure. 550% paid search recovery and a 33% product page conversion lift from the rebuilt program.",
        href: "/about/work/cylance",
    },
    {
        role: "Director of Marketing",
        company: "Cylance",
        period: "Jul 2017 – Nov 2020",
        metric: "$4M quarterly pipeline",
        description:
            "Built demand gen engine from scratch, scaling from startup to $400M+ revenue — through to the BlackBerry acquisition.",
        href: "/about/work/cylance",
    },
    {
        role: "Group Account Director",
        company: "Perficient Digital",
        period: "2012 – 2017",
        description:
            "Led enterprise marketing delivery for national clients — creative, UX, and advertising work supporting Adobe Experience Manager and Salesforce platform implementations.",
    },
    {
        role: "Director of Client Service",
        company: "JUXT Interactive",
        period: "2010 – 2012",
        description:
            "Directed client service for the Newport Beach interactive agency's digital brand and campaign engagements.",
    },
    {
        role: "Management Supervisor",
        company: "AKQA",
        period: "2007 – 2010",
        description:
            "Account leadership at the global digital agency's San Francisco office, serving as day-to-day partner for executive client stakeholders.",
    },
    {
        role: "Web Producer, Asia Pacific Region",
        company: "Nike (via Aquent)",
        period: "2001 – 2007",
        metric: "4 APAC markets",
        description:
            "Localized AKQA-built Nike.com experiences for Japan, Korea, China, and Taiwan — early-career digital production across four Asia-Pacific markets.",
    },
];

const statsData = [
    { value: "3x", label: "MQL→SQL Conversion · Wethos AI" },
    { value: "70%", label: "CAC Reduction · Qwiet AI" },
    { value: "344%", label: "Lead Growth · Wethos AI" },
    { value: "8:1", label: "ROI on Paid Media · BlackBerry" },
    { value: "$4M", label: "Quarterly Pipeline · Cylance" },
    { value: "20+", label: "Years Experience" },
];

const personalLinks = [
    {
        name: "Concert History",
        description: "My archival log of every show, venue, and festival I've attended",
        href: "/about/concerts",
        icon: Guitar,
        external: false,
    },
    {
        name: "Comic Collection",
        description: "My pulls and collection on League of Comic Geeks",
        href: "https://leagueofcomicgeeks.com/profile/saren/collection",
        icon: BookOpen,
        external: true,
    },
    {
        name: "Vinyl Collection",
        description: "Browse my record collection on Discogs",
        href: "https://www.discogs.com/user/saren13",
        icon: Disc3,
        external: true,
    },
    {
        name: "Letterboxd",
        description: "Films I've watched and reviewed",
        href: "https://letterboxd.com/saren13/films/",
        icon: Film,
        external: true,
    },
    {
        name: "Funko Pop Collection",
        description: "Pop culture collectibles on Pops.Today",
        href: "https://pops.today/user/Saren/collection/",
        icon: Drama,
        external: true,
    },
];

export default function AboutClient() {
    const [activeDetail, setActiveDetail] = useState<CareerItem | null>(null);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveDetail(null);
        };
        if (activeDetail) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [activeDetail]);

    return (
        <article>
            {/* Hero */}
            <section className="hero-card section gradient-dark text-ash overflow-hidden">
                <div className="container-narrow relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="shrink-0 relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden drop-shadow-2xl ring-4 ring-white/10"
                        >
                            <Image
                                src="/profile/saren-profile_2026.png"
                                alt="Saren Sakurai"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 140px, 160px"
                                priority
                            />
                        </motion.div>

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

            {/* The Diagnostic Phase */}
            <section className="section bg-charcoal text-ash">
                <div className="container-narrow">
                    <div className="text-center mb-16">
                        <div className="flex items-center gap-4 mb-6 justify-center">
                            <div className="h-px bg-ash/20 w-12" />
                            <span className="text-sm font-mono text-ash/60 uppercase tracking-wider">The Diagnostic Phase</span>
                            <div className="h-px bg-ash/20 w-12" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">Every systems engagement starts with three diagnostic principles:</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Principle 1 */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-ember/50 transition-colors">
                            <div className="text-ember font-mono text-xl mb-4">01.</div>
                            <h3 className="text-xl font-bold mb-4">Failure-based positioning</h3>
                            <p className="text-ash/80 leading-relaxed mb-6">
                                I stop marketing to curiosity and start speaking to the moment something went wrong — the in-house build that collapsed, the tool migration that corrupted data, the demand gen engine that flatlined.
                            </p>
                            <p className="text-white font-medium border-t border-white/10 pt-4">
                                Failure-aware buyers move fast. I design for them.
                            </p>
                        </div>

                        {/* Principle 2 */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-ember/50 transition-colors">
                            <div className="text-ember font-mono text-xl mb-4">02.</div>
                            <h3 className="text-xl font-bold mb-4">Radical specificity</h3>
                            <p className="text-ash/80 leading-relaxed mb-6">
                                No more “we help teams grow.” I name the buyer, the mistake they’re making, and the cost of continuing.
                            </p>
                            <p className="text-white font-medium border-t border-white/10 pt-4">
                                If a founder reads the homepage and says, “That’s exactly what’s happening to us,” the positioning is working.
                            </p>
                        </div>

                        {/* Principle 3 */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-ember/50 transition-colors">
                            <div className="text-ember font-mono text-xl mb-4">03.</div>
                            <h3 className="text-xl font-bold mb-4">Engineered visibility</h3>
                            <p className="text-ash/80 leading-relaxed mb-6">
                                Instead of relying purely on ads or trendy social noise, I build marketing assets that rank, compound, and attract intent — free tools, frameworks, structured content that shows up exactly when buyers are searching for help.
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
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 text-center">
                        Career Journey
                    </h2>
                    <div className="text-center mb-12">
                        <Link
                            href="/resume"
                            className="inline-flex items-center gap-1 text-sm text-lavender hover:text-ember font-medium transition-colors"
                        >
                            View full resume
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

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
                                    transition={{ delay: index * 0.05 }}
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
                                            <p className="text-lavender font-medium">{item.company}</p>
                                            <p className="text-slate mt-3 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                            {item.metric && (
                                                <div className="mt-4 inline-block px-3 py-1 bg-ember/10 rounded-full">
                                                    <span className="text-ember font-mono font-semibold text-sm">
                                                        {item.metric}
                                                    </span>
                                                </div>
                                            )}
                                            {item.href && (
                                                <Link
                                                    href={item.href}
                                                    className="mt-3 flex items-center gap-1 text-sm text-lavender hover:text-ember font-medium transition-colors"
                                                >
                                                    Full story
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            )}
                                            {!item.href && item.details && (
                                                <button
                                                    onClick={() => setActiveDetail(item)}
                                                    className="mt-3 flex items-center gap-1 text-sm text-lavender hover:text-ember font-medium transition-colors"
                                                >
                                                    View full breakdown
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            )}
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

                    <div className="mt-16 text-center">
                        <Link
                            href="/about/expertise"
                            className="btn-lavender inline-flex items-center gap-2 group font-semibold"
                        >
                            Explore Subject Matter Expertise Timeline
                            <svg
                                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
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
                            { filename: "white/blackberry.svg", name: "BlackBerry" },
                            { filename: "white/cisco.svg", name: "Cisco" },
                            { filename: "white/nike.svg", name: "Nike" },
                            { filename: "white/red-bull-energy.svg", name: "Red Bull" },
                            { filename: "white/palo-alto-networks.svg", name: "Palo Alto Networks" },
                            { filename: "white/coca-cola.svg", name: "Coca-Cola" },
                        ].map((logo, index) => (
                            <motion.div
                                key={logo.filename}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="aspect-square flex items-center justify-center p-3 rounded-lg bg-offblack/80 border border-ash/10"
                            >
                                <Image
                                    src={`/logos/clients/${logo.filename}`}
                                    alt={`${logo.name} logo`}
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
                            className="inline-flex items-center gap-2 text-lavender hover:text-ember transition-colors font-medium"
                        >
                            View all client brands
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
                            {personalLinks.map((link, index) => {
                                const Icon = link.icon;
                                const cardClass =
                                    "flex items-start gap-4 p-4 bg-white rounded-lg border border-charcoal/10 hover:border-lavender hover:shadow-md transition-all group h-full";
                                const cardContent = (
                                    <>
                                        <Icon className="w-6 h-6 text-lavender shrink-0" strokeWidth={1.5} />
                                        <div>
                                            <h3 className="font-semibold text-charcoal group-hover:text-ember transition-colors">
                                                {link.name}
                                            </h3>
                                            <p className="text-sm text-slate">{link.description}</p>
                                        </div>
                                        <svg
                                            className="w-4 h-4 text-slate/40 ml-auto mt-1 group-hover:text-lavender transition-colors"
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
                                    </>
                                );

                                if (!link.external) {
                                    return (
                                        <Link key={link.name} href={link.href} className="block">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 }}
                                                className={cardClass}
                                            >
                                                {cardContent}
                                            </motion.div>
                                        </Link>
                                    );
                                }

                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className={cardClass}
                                    >
                                        {cardContent}
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "What does 'fractional marketing lead' actually mean?",
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
                        answer: "Most engagements start with a 3-month sprint to diagnose, strategize, and start building, then extend for 6-12 months to execute and hand off. Real rates and engagement structures are published on the pricing page.",
                        link: { href: "/fractional-marketing-lead/cost", label: "See fractional marketing lead pricing →" }
                    }
                ]}
            />

            {/* My Stack */}
            <section id="stack" className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-2">
                            My stack
                        </h2>
                        <p className="text-slate dark:text-foreground-muted text-lg">
                            The marketing and technology tools I use to build growth engines
                            for my clients—and this very website.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <h3 className="text-xl font-semibold text-charcoal dark:text-foreground mb-2">
                            Rank my stack
                        </h3>
                        <p className="text-slate dark:text-foreground-muted">
                            Drag and drop to rank these tools yourself — or check out my picks
                        </p>
                    </motion.div>

                    <TierListBoard />
                </div>
            </section>

            {/* Stack Categories */}
            {stackCategories.map((category, categoryIndex) => (
                <section
                    key={category.name}
                    className={`section ${categoryIndex % 2 === 0 ? "bg-charcoal/5 dark:bg-card" : "bg-ash dark:bg-background"}`}
                >
                    <div className="container-narrow">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground mb-2">
                                {category.name}
                            </h3>
                            <p className="text-slate dark:text-foreground-muted text-lg">
                                {category.description}
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {category.toolIds.map((id, toolIndex) => {
                                const tool = toolMap.get(id);
                                if (!tool) return null;
                                return (
                                    <motion.a
                                        key={tool.id}
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: toolIndex * 0.05 }}
                                        className="group bg-white dark:bg-card p-5 rounded-xl border border-charcoal/10 dark:border-ember/20 hover:border-lavender hover:shadow-lg hover:shadow-lavender/10 transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            {tool.logo && (
                                                <Image
                                                    src={tool.logo}
                                                    alt={tool.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-lg shrink-0 mt-0.5"
                                                />
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="text-lg font-bold text-charcoal dark:text-foreground group-hover:text-ember transition-colors">
                                                        {tool.name}
                                                    </h4>
                                                    <span className="text-xs font-mono text-slate dark:text-foreground-muted bg-charcoal/5 dark:bg-ember/10 px-2 py-0.5 rounded">
                                                        {tool.category.split(" ")[0]}
                                                    </span>
                                                </div>
                                                <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed">
                                                    {tool.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-1 text-lavender text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>Learn more</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ))}

            {/* Stack Philosophy */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                Why AI-native?
                            </h3>
                            <p className="text-ash/80 text-lg leading-relaxed">
                                I believe the best way to understand AI&apos;s potential is to
                                use it daily. By building with these tools, I discover what
                                works, what doesn&apos;t, and how to help clients adopt AI
                                effectively. This site is proof that AI augments human
                                creativity—it doesn&apos;t replace it.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-charcoal/5">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                        Ready to talk about your growth engine?
                    </h2>
                    <p className="text-slate text-lg max-w-2xl mx-auto mb-8">
                        Whether you&apos;re looking for a fractional marketing lead, need help building
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
            {/* Career Detail Modal */}
            <AnimatePresence>
                {activeDetail?.details && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm"
                        onClick={() => setActiveDetail(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${activeDetail.role} at ${activeDetail.company} — full breakdown`}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-charcoal/10 px-6 py-5 flex items-start justify-between rounded-t-2xl">
                                <div>
                                    <p className="text-xs font-mono text-slate uppercase tracking-wider mb-1">
                                        {activeDetail.period}
                                    </p>
                                    <h3 className="text-xl font-bold text-charcoal">{activeDetail.role}</h3>
                                    <p className="text-lavender font-medium">{activeDetail.company}</p>
                                </div>
                                <button
                                    onClick={() => setActiveDetail(null)}
                                    className="text-slate hover:text-charcoal transition-colors ml-6 mt-1 shrink-0"
                                    aria-label="Close"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="px-6 py-6 space-y-8">
                                {activeDetail.details.sections.map((section, sIdx) => (
                                    <div key={section.title}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-mono text-ember font-bold">
                                                {String(sIdx + 1).padStart(2, "0")}.
                                            </span>
                                            <h4 className="text-base font-bold text-charcoal">{section.title}</h4>
                                        </div>
                                        <p className="text-sm text-slate leading-relaxed mb-4">
                                            {section.description}
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {section.metrics.map((metric) => (
                                                <div
                                                    key={metric.label}
                                                    className="bg-ash rounded-xl px-4 py-3 text-center"
                                                >
                                                    <div className="text-lg font-bold font-mono text-ember">
                                                        {metric.value}
                                                    </div>
                                                    <div className="text-xs text-slate mt-0.5 leading-tight">
                                                        {metric.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </article>
    );
}
