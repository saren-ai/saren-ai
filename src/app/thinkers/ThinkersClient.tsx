"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Layers, Megaphone, ArrowRight, Bell } from "lucide-react";

const painPoints = [
  {
    icon: Lock,
    title: "Your expertise is locked in your head",
    description:
      "You know more than almost anyone in your field. But it's not packaged, not systematized, and not generating income independent of your time.",
  },
  {
    icon: Layers,
    title: "Your content doesn't compound",
    description:
      "You publish without architecture. Each piece starts from zero. There's no flywheel, no internal linking strategy, no compounding authority.",
  },
  {
    icon: Megaphone,
    title: "You're known in your circle, invisible everywhere else",
    description:
      "Your peers respect you. But your authority hasn't translated into reach, revenue, or inbound that finds you without constant self-promotion.",
  },
];

const resources = [
  {
    type: "Playbook",
    title: "Personal Bio & Brand Builder",
    description:
      "Build a personal brand narrative that converts — from LinkedIn summary to speaking bio to consulting pitch.",
    href: "/playbooks/personal-bio-brand-builder",
  },
  {
    type: "Playbook",
    title: "Viral Content Hook Trilogy",
    description:
      "Three hook frameworks that consistently generate engagement. Learn to write the first line that stops the scroll.",
    href: "/playbooks/viral-content-hook-trilogy",
  },
  {
    type: "Playbook",
    title: "Research Intelligence Pipeline",
    description:
      "Automated research and synthesis workflows that turn your knowledge intake into publishable insight.",
    href: "/playbooks/research-intelligence-pipeline",
  },
  {
    type: "Case Study",
    title: "Authority Engineering",
    description:
      "A systematic approach to engineering credibility — how to build thought leadership infrastructure that works at scale.",
    href: "/portfolio/authority-engineering",
  },
  {
    type: "Case Study",
    title: "Thought Leadership Development",
    description:
      "The complete process for developing and distributing expertise-driven content that positions you as a category authority.",
    href: "/portfolio/thought-leadership-development",
  },
  {
    type: "Deep-Dive",
    title: "B2B Marketing Framework",
    description:
      "21 layers of messaging architecture: positioning, brand voice, message mapping, and category creation for experts building their brand.",
    href: "/playbooks/b2b-marketing-framework",
  },
];

const typeStyles: Record<string, string> = {
  Playbook: "bg-lavender/10 text-lavender",
  "Case Study": "bg-copper/10 text-copper",
  "Deep-Dive": "bg-ember/10 text-ember",
};

export default function ThinkersClient() {
  return (
    <article>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-copper/20 text-copper text-sm font-bold rounded-full uppercase tracking-wide mb-6">
              For Subject Matter Experts &amp; Authority Builders
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.1]">
              Your expertise is the product.
              <br />
              <span className="text-gradient">
                Let&apos;s build the infrastructure around it.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-ash/80 max-w-2xl leading-relaxed mb-10">
              Deep knowledge is not enough. The experts who break out are the
              ones who build systems that distribute, compound, and monetize
              what they know — without requiring daily effort to maintain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/downloads"
                className="btn-primary inline-flex items-center gap-2"
              >
                Browse Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary-dark">
                Book a Positioning Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              Sound familiar?
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-xl mx-auto">
              These are the three patterns that hold most subject matter experts
              back from building authority that scales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-copper" />
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Hub */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-4">
              Built for your situation
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg max-w-2xl">
              Playbooks, case studies, and frameworks designed for experts
              building authority, monetizing knowledge, and creating content
              that compounds over time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={resource.href}
                  className="group flex flex-col p-5 rounded-xl border border-border bg-ash dark:bg-background hover:border-copper/40 transition-all duration-200 h-full"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeStyles[resource.type]}`}
                    >
                      {resource.type}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate group-hover:text-copper group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                  </div>
                  <h3 className="font-bold text-charcoal dark:text-foreground mb-1.5 group-hover:text-copper transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Bridge */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 bg-card rounded-2xl border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-copper rounded-t-2xl" />

              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-copper/10 text-copper text-xs font-bold rounded-full uppercase tracking-wide mb-3">
                    Coming Soon
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal dark:text-foreground">
                    The Content Hook Mastery Bundle
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-bold font-mono text-copper">
                    $49
                  </div>
                  <div className="text-xs text-slate uppercase tracking-wide">
                    one-time
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {[
                  "The Viral Content Hook Trilogy — three proven frameworks with worked examples",
                  "30-day content architecture template for compounding authority",
                  "Personal brand narrative builder with AI prompt sequences",
                  "LinkedIn engagement playbook for subject matter experts",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate dark:text-foreground-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 w-full justify-center"
              >
                <Bell className="w-4 h-4" />
                Notify Me When Available
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a positioning or ghostwriting engagement?
            </h2>
            <p className="text-ash/70 text-lg max-w-xl mx-auto mb-8">
              Frameworks give you the structure. A custom engagement builds the
              specific architecture for your ideas, your voice, and your target
              audience.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
