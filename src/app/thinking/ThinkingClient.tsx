"use client";

import { motion } from "framer-motion";
import type { ThinkingPost } from "@/lib/thinking";

interface ThinkingClientProps {
  posts: ThinkingPost[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ThinkingClient({ posts }: ThinkingClientProps) {
  return (
    <article className="pt-20">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Thinking
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-ash/80 leading-relaxed"
            >
              Quick ideas, links, research, and things I&apos;m paying attention to
              in marketing, AI, and growth.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate text-lg">
                  No posts yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-6 md:p-8 rounded-xl border border-charcoal/10 hover:border-electric/30 hover:shadow-md transition-all"
                  >
                    {/* Date */}
                    <time className="text-sm text-slate font-mono">
                      {formatDate(post.date)}
                    </time>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-charcoal mt-2 mb-4">
                      {post.title}
                    </h2>

                    {/* Content */}
                    <div className="prose prose-slate max-w-none">
                      {post.content.split("\n\n").map((paragraph, i) => {
                        // Handle lists
                        if (paragraph.includes("1. **") || paragraph.includes("- **")) {
                          const items = paragraph.split("\n").filter(Boolean);
                          return (
                            <ul key={i} className="space-y-2 my-4">
                              {items.map((item, j) => {
                                // Parse markdown bold
                                const parts = item.replace(/^[\d\-\.\s]+/, "").split(/\*\*/);
                                return (
                                  <li key={j} className="text-slate leading-relaxed">
                                    {parts.map((part, k) =>
                                      k % 2 === 1 ? (
                                        <strong key={k} className="text-charcoal font-semibold">
                                          {part}
                                        </strong>
                                      ) : (
                                        <span key={k}>{part}</span>
                                      )
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          );
                        }

                        // Handle regular paragraphs
                        if (paragraph.trim()) {
                          return (
                            <p key={i} className="text-slate leading-relaxed mb-4">
                              {paragraph}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section bg-charcoal/5">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
              Want more insights?
            </h2>
            <p className="text-slate mb-6">
              These quick thoughts turn into deeper strategies. Let&apos;s talk about
              how to apply them to your business.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex"
            >
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
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
