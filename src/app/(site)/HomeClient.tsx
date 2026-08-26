"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import MatrixRain from "@/components/home/MatrixRain";
import { LAYERS } from "@/lib/agentic-web/layers";

const clientLogos = [
  { name: "BlackBerry", logo: "white/blackberry.svg", metric: "8:1 ROI on Paid Media", href: "/about" },
  { name: "Qwiet AI", logo: "white/qwietai.svg", metric: "70% CAC Reduction", href: "/about/clients" },
  { name: "Cylance", logo: "white/cylance.svg", metric: "$4M Quarterly Pipeline", href: "/case-studies/120-day-content-journey" },
  { name: "Wethos AI", logo: "white/wethosai.png", metric: "344% Lead Growth", href: "/about/clients" },
];

const proofStrip = [
  {
    layer: "Human Experience",
    title: "Sovereign Buyer Personas",
    description: "A framework for building personas that drive targeting, messaging, and content.",
    href: "/case-studies/sovereign-personas",
  },
  {
    layer: "Machine Readability",
    title: "120-Day Content Journey",
    description: "How I engineered $4M in quarterly pipeline at Cylance through a structured content system.",
    href: "/case-studies/120-day-content-journey",
  },
  {
    layer: "Agent Access",
    title: "Intent Data as Funnel Intelligence",
    description: "Bombora signals mapped to buyer behavior 18 months before close.",
    href: "/case-studies/intent-data",
  },
];

const services = [
  {
    order: "Retainer",
    title: "Architecture Partner",
    description: "Ongoing ownership of Machine Readability and Agent Access, as the standards and models they're built against keep changing.",
    href: "/contact",
    cta: "Talk about the retainer",
  },
  {
    order: "Build",
    title: "AI-Native Website Build",
    description: "Fixed-scope build across all three layers. The on-ramp to the retainer, not a terminal offer.",
    href: "/contact",
    cta: "Scope a build",
  },
  {
    order: "Audit",
    title: "Agentic Readiness Audit",
    description: "A fixed-scope diagnostic across the three layers, with a checklist published in advance.",
    href: "/services/audit",
    cta: "Get the audit",
  },
];

export default function HomeClient() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero-card min-h-[80vh] flex items-center relative overflow-hidden py-20 pb-0">
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lavender font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
            >
              The agentic web
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-charcoal dark:text-foreground leading-[1.1] mb-8"
            >
              Your website still assumes<br /><span className="text-gradient">every reader is human.</span>
            </motion.h1>

            <div className="text-base md:text-lg text-slate dark:text-foreground-muted max-w-3xl mx-auto leading-relaxed mb-10 text-center">
              <p className="text-charcoal dark:text-foreground">
                Most B2B sites are invisible or illegible to the models and agents
                your buyers now use before they ever talk to a person. I build
                AI-native websites: legible to a model, usable by an agent, still
                built to sell. 20+ years from AKQA to Cylance ($1.4B exit).
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/services/audit" className="btn-primary" aria-label="Get the agentic readiness audit">
                Get the agentic readiness audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/agentic-web" className="btn-secondary" aria-label="Read the agentic web">
                Read the agentic web
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── The three layers ──────────────────────────────────────────────── */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              Three layers, one site
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-xl mx-auto">
              The same three terms, in the same order, everywhere on this site.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LAYERS.map((layer, index) => (
              <motion.div
                key={layer.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={layer.href}
                  className="group flex flex-col p-6 bg-ash dark:bg-background rounded-xl border border-border hover:border-ember/40 transition-all duration-200 h-full"
                >
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-ember">
                    Layer {layer.num} &middot; {layer.reader}
                  </p>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">{layer.name}</h3>
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed flex-1 mb-4">
                    {layer.whatThisIs}
                  </p>
                  <span className="text-ember text-sm font-semibold inline-flex items-center gap-1">
                    Read Layer {layer.num}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credibility bar ───────────────────────────────────────────────── */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-10"
          >
            <p className="text-slate dark:text-foreground-muted text-lg leading-relaxed">
              Twenty years of this work spans four retrieval regimes: directories,
              search engines, social graphs, now answer engines. The discipline
              underneath, being legible to whatever&apos;s doing the reading, is
              the one that produced these numbers.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={client.href}
                  className="flex flex-col items-center justify-between p-6 rounded-xl bg-offblack border border-charcoal/10 dark:border-white/10 hover:border-ember/40 dark:hover:border-lavender/40 transition-all duration-300 group cursor-pointer h-full"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof strip ───────────────────────────────────────────────────── */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center gap-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-foreground">
              Proof, by layer
            </h2>
            <div className="h-px flex-1 bg-charcoal/10 dark:bg-white/10" />
            <Link
              href="/case-studies"
              className="text-lavender font-medium hover:text-ember transition-colors flex items-center gap-1 group whitespace-nowrap"
            >
              All case studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofStrip.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="group flex flex-col p-6 bg-ash dark:bg-background rounded-xl border border-border hover:border-ember/40 transition-all duration-200 h-full"
                >
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-lavender">
                    {item.layer}
                  </p>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">{item.title}</h3>
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed flex-1 mb-4">
                    {item.description}
                  </p>
                  <span className="text-ember text-sm font-semibold inline-flex items-center gap-1">
                    Read the case study
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services summary ──────────────────────────────────────────────── */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              How this gets built
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-xl mx-auto">
              An audit or a build gets you started. The retainer is where the
              value compounds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={service.href}
                  className="group flex flex-col p-6 bg-card rounded-xl border border-border hover:border-ember/40 transition-all duration-200 h-full"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="w-4 h-4 text-ember" />
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-ember">
                      {service.order}
                    </p>
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">{service.title}</h3>
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed flex-1 mb-4">
                    {service.description}
                  </p>
                  <span className="text-ember text-sm font-semibold inline-flex items-center gap-1">
                    {service.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-slate dark:text-foreground-muted"
          >
            Still need embedded marketing leadership across the whole GTM
            function, not just the web layer?{" "}
            <Link href="/fractional-marketing-lead" className="text-lavender font-semibold hover:text-ember transition-colors">
              See fractional marketing lead
            </Link>
            .
          </motion.p>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────────────────── */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Find out what&apos;s actually broken.
            </h2>
            <p className="text-ash/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              The agentic readiness audit checks all three layers and hands back
              a published, specific scope. No guessing at what you get.
            </p>
            <Link href="/services/audit" className="btn-primary inline-flex text-lg">
              Get the agentic readiness audit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
