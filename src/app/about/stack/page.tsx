"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
    toolIds: ["hubspot", "plai"],
  },
  {
    name: "Content & Productivity",
    description: "Creating and managing content",
    toolIds: ["wethosai"],
  },
];

const toolMap = new Map(AI_TOOLS.map((t) => [t.id, t]));

export default function StackPage() {
  return (
    <article>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-ash/60">
                <li>
                  <Link href="/" className="hover:text-ash transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-ash transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ember">Stack</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1 bg-ember/20 text-ember text-sm font-semibold rounded-full mb-4">
                Building in Public
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                My Stack
              </h1>
              <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
                The marketing and technology tools I use to build growth engines
                for my clients—and this very website.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Tier List */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-2">
              Rank My Stack
            </h2>
            <p className="text-slate dark:text-foreground-muted text-lg">
              Drag and drop to rank these tools yourself — or check out my picks
            </p>
          </motion.div>

          <TierListBoard />
        </div>
      </section>

      {/* Stack Category Sections */}
      {stackCategories.map((category, categoryIndex) => (
        <section
          key={category.name}
          className={`section ${categoryIndex % 2 === 0 ? "bg-charcoal/5 dark:bg-background-secondary" : "bg-ash dark:bg-background"}`}
        >
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-foreground mb-2">
                {category.name}
              </h2>
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
                    className="group bg-white dark:bg-card-bg p-5 rounded-xl border border-charcoal/10 dark:border-ember/20 hover:border-electric hover:shadow-lg hover:shadow-electric/10 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Logo */}
                      {tool.logo && (
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          width={40}
                          height={40}
                          className="rounded-lg shrink-0 mt-0.5"
                        />
                      )}
                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-bold text-charcoal dark:text-foreground group-hover:text-ember transition-colors">
                            {tool.name}
                          </h3>
                          <span className="text-xs font-mono text-slate dark:text-foreground-muted bg-charcoal/5 dark:bg-ember/10 px-2 py-0.5 rounded">
                            {tool.category.split(" ")[0]}
                          </span>
                        </div>
                        <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-electric text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Philosophy Section */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why AI-Native?
              </h2>
              <p className="text-ash/80 text-lg leading-relaxed mb-8">
                I believe the best way to understand AI&apos;s potential is to
                use it daily. By building with these tools, I discover what
                works, what doesn&apos;t, and how to help clients adopt AI
                effectively. This site is proof that AI augments human
                creativity—it doesn&apos;t replace it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">
                  Let&apos;s discuss your stack
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
                <Link
                  href="/about"
                  className="btn-secondary border-ash/30 text-ash hover:bg-ash hover:text-charcoal"
                >
                  More about me
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </article>
  );
}
