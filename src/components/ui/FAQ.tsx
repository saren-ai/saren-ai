"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
  /** Optional link rendered after the answer text */
  link?: { href: string; label: string };
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions", description }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* FAQ Section */}
      <section className="section bg-ash dark:bg-background-secondary">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
              {description && (
                <p className="text-foreground-muted text-lg">
                  {description}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-card-bg border border-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-charcoal/5 dark:hover:bg-ash/5 transition-colors"
                  >
                    <span className="font-semibold text-foreground text-lg">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-foreground-muted" />
                    </motion.div>
                  </button>

                  {/* Always rendered — collapsed via height/opacity, not unmounted —
                      so the answer text ships in the server-rendered HTML. */}
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-foreground-muted leading-relaxed">
                      {item.answer}
                      {item.link && (
                        <>
                          {" "}
                          <Link
                            href={item.link.href}
                            className="text-lavender underline underline-offset-4 hover:text-ember transition-colors"
                          >
                            {item.link.label}
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
