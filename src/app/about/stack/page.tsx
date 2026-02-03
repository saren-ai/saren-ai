"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stackCategories = [
  {
    name: "AI Development",
    description: "The AI-native tools powering my workflow",
    tools: [
      {
        name: "Cursor",
        description: "AI-first code editor with Claude integration",
        category: "IDE",
        url: "https://cursor.com",
      },
      {
        name: "Claude Opus 4.5",
        description: "Advanced reasoning for complex development tasks",
        category: "AI Model",
        url: "https://anthropic.com",
      },
      {
        name: "Claude Desktop",
        description: "Native app for everyday AI assistance",
        category: "AI Assistant",
        url: "https://anthropic.com",
      },
      {
        name: "Claude Cowork",
        description: "Collaborative AI for team workflows",
        category: "AI Collaboration",
        url: "https://anthropic.com",
      },
      {
        name: "Claude Code",
        description: "Specialized coding assistant",
        category: "AI Coding",
        url: "https://anthropic.com",
      },
      {
        name: "ChatGPT 5.2",
        description: "Versatile AI for brainstorming and research",
        category: "AI Assistant",
        url: "https://openai.com",
      },
      {
        name: "Gemini",
        description: "Google's multimodal AI for diverse tasks",
        category: "AI Assistant",
        url: "https://gemini.google.com",
      },
      {
        name: "Perplexity",
        description: "AI-powered research and search",
        category: "AI Research",
        url: "https://perplexity.ai",
      },
    ],
  },
  {
    name: "Development & Deployment",
    description: "Infrastructure for building and shipping",
    tools: [
      {
        name: "GitHub",
        description: "Version control and collaboration",
        category: "Git",
        url: "https://github.com",
      },
      {
        name: "Vercel",
        description: "Deployment and hosting platform",
        category: "Hosting",
        url: "https://vercel.com",
      },
      {
        name: "NameCheap",
        description: "Domain registration and management",
        category: "Domains",
        url: "https://namecheap.com",
      },
    ],
  },
  {
    name: "Marketing & Sales",
    description: "Tools for growth and revenue",
    tools: [
      {
        name: "HubSpot",
        description: "CRM, marketing automation, and sales enablement",
        category: "CRM",
        url: "https://hubspot.com",
      },
      {
        name: "Apollo",
        description: "Sales intelligence and engagement platform",
        category: "Sales",
        url: "https://apollo.io",
      },
    ],
  },
  {
    name: "Content & Productivity",
    description: "Creating and managing content",
    tools: [
      {
        name: "Apple Creator Studio",
        description: "Content creation for Apple ecosystem",
        category: "Content",
        url: "https://apple.com",
      },
      {
        name: "Comet Browser",
        description: "AI-enhanced browsing experience",
        category: "Browser",
        url: "https://cometbrowser.com",
      },
    ],
  },
];

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
                  <Link href="/about" className="hover:text-ash transition-colors">
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

      {/* Stack Categories */}
      {stackCategories.map((category, categoryIndex) => (
        <section
          key={category.name}
          className={`section ${categoryIndex % 2 === 0 ? "bg-ash" : "bg-charcoal/5"}`}
        >
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
                {category.name}
              </h2>
              <p className="text-slate text-lg">{category.description}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {category.tools.map((tool, toolIndex) => (
                <motion.a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: toolIndex * 0.05 }}
                  className="group bg-white p-6 rounded-xl border border-charcoal/10 hover:border-electric hover:shadow-lg hover:shadow-electric/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-charcoal group-hover:text-ember transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-xs font-mono text-slate bg-charcoal/5 px-2 py-1 rounded">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-slate text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-electric text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
              ))}
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
                I believe the best way to understand AI&apos;s potential is to use
                it daily. By building with these tools, I discover what works,
                what doesn&apos;t, and how to help clients adopt AI effectively.
                This site is proof that AI augments human creativity—it
                doesn&apos;t replace it.
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
