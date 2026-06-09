"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import PortfolioCard from "@/components/portfolio/PortfolioCard";
import MatrixRain from "@/components/home/MatrixRain";
import FAQ from "@/components/ui/FAQ";
import { TestimonialGrid } from "@/components/ui/Testimonial";
import { TESTIMONIALS } from "@/data/testimonials";
import { Building2, User, Lightbulb, Bell, ArrowRight } from "lucide-react";

const interactiveTools = [
  {
    title: "Paid Media ROI Simulator",
    description:
      "Stop guessing. Simulate the revenue impact of your ad spend using real unit economics. An interactive financial model for performance marketers.",
    metric: "Live",
    metricLabel: "Interactive Model",
    href: "/playbooks/roi-simulator",
    pillars: ["Predictive Infrastructure"],
  },
  {
    title: "SaaS Revenue Calculator",
    description:
      "Reverse-engineer funnel metrics from revenue goals. Calculate exactly how many leads, MQLs, and demos you need to hit your target.",
    metric: "100%",
    metricLabel: "Funnel Clarity",
    href: "/playbooks/gtm-budget-calculator",
    pillars: ["Revenue Engineering"],
  },
  {
    title: "Behavioral Lead Scoring",
    description:
      "Making buyer motion legible. A dynamic scoring model that tracks fit and engagement to surface high-intent accounts automatically.",
    metric: "3x",
    metricLabel: "Lead Quality",
    href: "/playbooks/hybrid-lead-scoring",
    pillars: ["Automated Qualification"],
  },
];

const caseStudies = [
  {
    title: "Sovereign Buyer Personas",
    description:
      "Making complex markets simple. A framework for building personas that drive real targeting, messaging, and content decisions.",
    metric: "3x",
    metricLabel: "Conversion Lift",
    href: "/case-studies/sovereign-personas",
    pillars: ["Human Strategy"],
  },
  {
    title: "10-Touch Sales Play",
    description:
      "Turning cold outreach into executive conversations. A systematic approach to multi-channel prospecting that consistently books meetings.",
    metric: "42%",
    metricLabel: "Meeting Rate",
    href: "/case-studies/10-touch-sales-play",
    pillars: ["Predictive Infrastructure"],
  },
  {
    title: "120-Day Content Journey",
    description:
      "How I engineered $4M in quarterly pipeline at Cylance. A 120-day content system that turned awareness into closed deals.",
    metric: "$4M",
    metricLabel: "Quarterly Pipeline",
    href: "/case-studies/120-day-content-journey",
    pillars: ["Scale Without Headcount"],
  },
  {
    title: "B2B Marketing Framework",
    description:
      "The messaging infrastructure for teams who can't afford to build on quicksand. A 7-layer framework that creates B2B SaaS positioning from scratch.",
    metric: "21",
    metricLabel: "Prompts",
    href: "/playbooks/b2b-marketing-framework",
    pillars: ["Human Strategy"],
  },
];

export default function HomeClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-card min-h-[85vh] flex items-center relative overflow-hidden py-20 pb-0">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white dark:bg-offblack" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231D3557' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <MatrixRain />

        <div className="container-narrow relative z-10 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lavender font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
            >
              AI-Native Systems · Fractional Engagement
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-charcoal dark:text-foreground leading-[1.1] mb-8"
            >
              Demand generation,<br /><span className="text-gradient">engineered.</span>
            </motion.h1>

            {/* Body / value prop */}
            <div className="space-y-6 text-base md:text-lg text-slate dark:text-foreground-muted max-w-3xl mx-auto leading-relaxed mb-10 text-center">
              {/* Entity sentence — plain <p>, no animation: answer engines extract visible prose */}
              <p className="text-charcoal dark:text-foreground">
                I&apos;m Saren Sakurai. I engineer demand generation systems for
                Series A–C B2B SaaS and cybersecurity companies — built AI-native,
                delivered as a fractional marketing lead. 20+ years from Cylance
                ($1.4B exit) to AKQA.
              </p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-semibold text-charcoal dark:text-foreground text-lg md:text-xl"
              >
                Pipeline isn&apos;t a campaign problem. It&apos;s a systems problem.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Most early-stage companies are stuck between buying ChatGPT and actually running an AI-powered operation — the modern symptom of demand built on tactics instead of systems. I engineer the system itself: data inputs, scoring logic, feedback loops, wired into the workflows your team already runs.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/engage"
                className="btn-primary"
                aria-label="Work With Me"
              >
                Work With Me
                <svg
                  className="w-5 h-5 ml-2"
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
              <Link
                href="/downloads"
                className="btn-secondary"
                aria-label="Browse Downloads"
              >
                Browse Downloads
              </Link>
            </motion.div>

            {/* Reframe client logos and wins */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 border-t border-charcoal/10 dark:border-white/10 pt-10"
            >
              <h3 className="text-lg md:text-xl font-bold text-charcoal dark:text-foreground mb-2">
                Enterprise-grade architecture, scaled for early-stage teams.
              </h3>
              <p className="text-sm text-slate dark:text-foreground-muted mb-8">
                Experience engineering systems and reducing operational friction for:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { name: "BlackBerry", logo: "blackberry.png", metric: "8:1 ROI on Paid Media", href: "/about" },
                  { name: "Qwiet AI", logo: "qwiet.png", metric: "70% CAC Reduction", href: "/about/clients" },
                  { name: "Cylance", logo: "cylance.png", metric: "$4M Quarterly Pipeline", href: "/case-studies/120-day-content-journey" },
                  { name: "Wethos AI", logo: "wethos.png", metric: "344% Lead Growth", href: "/about/clients" },
                ].map((client) => (
                  <Link
                    key={client.name}
                    href={client.href}
                    className="flex flex-col items-center justify-between p-6 rounded-xl bg-offblack border border-charcoal/10 dark:border-white/10 hover:border-ember/40 dark:hover:border-lavender/40 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="h-12 w-full flex items-center justify-center mb-4 relative">
                      <Image
                        src={`/logos/clients/${client.logo}`}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain opacity-75 dark:opacity-60 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-300"
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    </div>
                    <div className="text-center mt-2 border-t border-white/10 pt-4 w-full">
                      <div className="text-lg md:text-xl font-bold font-mono text-ember">
                        {client.metric.split(" ")[0]}
                      </div>
                      <div className="text-[10px] md:text-[11px] uppercase tracking-widest text-ash/60 font-semibold mt-1 leading-tight">
                        {client.metric.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Audience Router */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              Who are you building for?
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-xl mx-auto">
              Every resource, playbook, and engagement here is mapped to a
              specific audience challenge. Find yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                label: "Founders & Mid-Market",
                description:
                  "GTM systems, demand gen architecture, and AI operations for growth-stage companies with budget but no infrastructure.",
                href: "/smb",
                accent: "ember",
                cta: "Built for your stage",
              },
              {
                icon: User,
                label: "Solo Founders & Fractional CMOs",
                description:
                  "Pipeline automation, personal leverage, and self-managed workflows for operators who are the whole marketing team.",
                href: "/solopreneurs",
                accent: "lavender",
                cta: "Built for your practice",
              },
              {
                icon: Lightbulb,
                label: "Subject Matter Experts",
                description:
                  "Authority engineering, content architecture, and monetization frameworks for practitioners who need to scale their expertise.",
                href: "/thinkers",
                accent: "copper",
                cta: "Built for your expertise",
              },
            ].map((audience, index) => {
              const Icon = audience.icon;
              const accentText =
                audience.accent === "ember"
                  ? "text-ember group-hover:text-ember"
                  : audience.accent === "lavender"
                    ? "text-lavender group-hover:text-lavender"
                    : "text-copper group-hover:text-copper";
              const accentBg =
                audience.accent === "ember"
                  ? "bg-ember/10"
                  : audience.accent === "lavender"
                    ? "bg-lavender/10"
                    : "bg-copper/10";
              const accentBorder =
                audience.accent === "ember"
                  ? "hover:border-ember/40"
                  : audience.accent === "lavender"
                    ? "hover:border-lavender/40"
                    : "hover:border-copper/40";
              return (
                <motion.div
                  key={audience.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={audience.href}
                    className={`group flex flex-col p-6 bg-ash dark:bg-background rounded-xl border border-border ${accentBorder} transition-all duration-200 h-full`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${accentBg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${accentText}`} />
                    </div>
                    <h3 className={`font-bold text-charcoal dark:text-foreground mb-2 ${accentText} transition-colors`}>
                      {audience.label}
                    </h3>
                    <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed flex-1 mb-4">
                      {audience.description}
                    </p>
                    <span className={`text-sm font-semibold inline-flex items-center gap-1 ${accentText}`}>
                      {audience.cta}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials — renders nothing until real quotes exist in src/data/testimonials.ts */}
      <TestimonialGrid items={TESTIMONIALS} />

      {/* Interactive Tools ("Try something") — live tools lead; they're stronger proof than unshipped products */}
      <section className="section bg-ash dark:bg-background pb-0">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-ember/10 text-ember text-sm font-bold rounded-full uppercase tracking-wide mb-4">
              Interactive Tryouts
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-foreground mb-4">
              Don&apos;t just read about it.{" "}
              <span className="text-gradient">Launch it.</span>
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl mx-auto">
              Interactive financial models and frameworks you can use right now
              to validate your growth strategy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
            {interactiveTools.map((item, index) => (
              <PortfolioCard
                key={item.href}
                {...item}
                index={index}
                variant="interactive"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Downloads */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center gap-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground">
              Featured Downloads
            </h2>
            <div className="h-px flex-1 bg-charcoal/10 dark:bg-white/10" />
            <Link
              href="/downloads"
              className="text-ember font-medium hover:underline flex items-center gap-1 group text-sm"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Complete Mid-Market GTM Execution Kit",
                tag: "SMB",
                tagColor: "text-ember",
                tagBg: "bg-ember/10",
                bar: "bg-ember",
                href: "/smb",
              },
              {
                title: "The Fractional Marketing Lead Pipeline Dashboard",
                tag: "Solopreneurs",
                tagColor: "text-lavender",
                tagBg: "bg-lavender/10",
                bar: "bg-lavender",
                href: "/solopreneurs",
              },
              {
                title: "The Content Hook Mastery Bundle",
                tag: "Thinkers",
                tagColor: "text-copper",
                tagBg: "bg-copper/10",
                bar: "bg-copper",
                href: "/thinkers",
              },
            ].map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={product.href}
                  className="group flex flex-col p-6 bg-card rounded-xl border border-border hover:border-charcoal/20 dark:hover:border-white/20 transition-all duration-200 relative overflow-hidden h-full"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${product.bar}`} />
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${product.tagBg} ${product.tagColor}`}>
                      {product.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-4 flex-1 leading-snug">
                    {product.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-charcoal/5 dark:bg-white/10 text-slate dark:text-foreground-muted rounded-full mb-3 self-start">
                    <Bell className="w-3 h-3" />
                    Coming Soon
                  </span>
                  <span className={`text-sm font-semibold inline-flex items-center gap-1 ${product.tagColor}`}>
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center gap-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground">
              Recent Case Studies
            </h2>
            <div className="h-px flex-1 bg-charcoal/10 dark:bg-white/10" />
            <Link
              href="/case-studies"
              className="text-lavender font-medium hover:text-ember transition-colors flex items-center gap-1 group"
            >
              View All Work
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {caseStudies.map((item, index) => (
              <PortfolioCard
                key={item.href}
                {...item}
                index={index}
                variant="case_study"
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate dark:text-foreground-muted text-sm font-mono">
              Looking for B2B frameworks and AI prompts you can run today?{" "}
              <Link
                href="/playbooks"
                className="text-ember dark:text-lavender font-bold hover:underline transition-all"
              >
                Browse the Playbooks &rarr;
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="GTM & Operations FAQ"
        description="Direct answers to hard questions about marketing architecture and fractional execution."
        items={[
          {
            question: "Why hire a Fractional Marketing Lead instead of a full-time marketing executive?",
            answer: "A Fractional Marketing Lead gives you senior GTM leadership to build your strategy and operations without the bloated executive salary, equity package, and overhead of a full-timer who just wants to manage agencies. You get active system-building, positioning clarity, and operational pipeline setup for early-stage and Series A startups, rather than a slide-deck generator.",
            link: { href: "/fractional-marketing-lead/cost", label: "See real engagement pricing →" }
          },
          {
            question: "What does \"demand generation as engineering\" actually mean?",
            answer: "It means I treat your pipeline like a software system—defined by data inputs, logic gates, and feedback loops—instead of a series of hope-based branding campaigns. I build intent detection, lead scoring, and automated GTM tracking to capture active buyers, rather than throwing budget at Google Ads and hoping for a miracle."
          },
          {
            question: "What size startups benefit most from Saren's consulting?",
            answer: "Startups that have product-market fit (usually $1M–$10M ARR) but find their growth is stalling because their messaging is muddy and their sales cycles are stretching. If you're spending $50k+/month on ads or sales development and can't trace where your best deals are coming from, we need to talk."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s build your growth engine.
            </h2>
            <p className="text-ash/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Let&apos;s talk about how AI-driven operations turn chaotic spend
              into predictable pipeline.
            </p>
            <Link href="/engage" className="btn-primary inline-flex text-lg">
              Work With Me
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
