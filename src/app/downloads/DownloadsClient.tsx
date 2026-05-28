"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, User, Lightbulb, ShoppingCart, Loader2 } from "lucide-react";
import { PUBLISHED_PRODUCTS } from "@/lib/products";

type FilterTag = "All" | "SMB" | "Solopreneurs" | "Thinkers";

const filterTabs: FilterTag[] = ["All", "SMB", "Solopreneurs", "Thinkers"];

const filterIcons: Record<FilterTag, React.ComponentType<{ className?: string }>> = {
  All: ArrowRight,
  SMB: Building2,
  Solopreneurs: User,
  Thinkers: Lightbulb,
};

const accentClasses: Record<string, { badge: string; price: string; dot: string; border: string; bar: string }> = {
  ember: {
    badge: "bg-ember/10 text-ember",
    price: "text-ember",
    dot: "bg-ember",
    border: "hover:border-ember/40",
    bar: "bg-ember",
  },
  lavender: {
    badge: "bg-lavender/10 text-lavender",
    price: "text-lavender",
    dot: "bg-lavender",
    border: "hover:border-lavender/40",
    bar: "bg-lavender",
  },
  copper: {
    badge: "bg-copper/10 text-copper",
    price: "text-copper",
    dot: "bg-copper",
    border: "hover:border-copper/40",
    bar: "bg-copper",
  },
};

export default function DownloadsClient() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const filtered =
    activeFilter === "All"
      ? PUBLISHED_PRODUCTS
      : PUBLISHED_PRODUCTS.filter((p) => p.tag === activeFilter);

  async function handleBuy(productId: string) {
    setLoadingId(productId);
    setErrorId(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch {
      setErrorId(productId);
      setLoadingId(null);
    }
  }

  return (
    <article>
      {/* Hero */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-ember/20 text-ember text-sm font-bold rounded-full uppercase tracking-wide mb-6">
              Downloads &amp; Templates
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
              Enterprise-grade frameworks.
              <br />
              <span className="text-gradient">Priced for operators.</span>
            </h1>
            <p className="text-lg text-ash/80 leading-relaxed">
              Every product here was built from real enterprise work — the
              same systems that generated $4M pipelines, 42% meeting rates,
              and 550% growth. Now available for any operator to run.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Products */}
      <section className="section bg-ash dark:bg-background">
        <div className="container-narrow">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {filterTabs.map((tab) => {
              const Icon = filterIcons[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    activeFilter === tab
                      ? "bg-ember text-white"
                      : "bg-card border border-border text-foreground hover:border-ember/40 hover:text-ember"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab}
                </button>
              );
            })}
          </motion.div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product) => {
                const accent = accentClasses[product.accentColor];
                const isLoading = loadingId === product.id;
                const hasError = errorId === product.id;
                return (
                  <div
                    key={product.id}
                    className={`flex flex-col p-6 bg-card rounded-2xl border border-border ${accent.border} transition-all duration-200 relative overflow-hidden`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 ${accent.bar} rounded-t-2xl`} />

                    {/* Tag + price */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <Link
                        href={product.persona}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${accent.badge} hover:opacity-80 transition-opacity`}
                      >
                        {product.tag}
                      </Link>
                      <div className="text-right">
                        <div className={`text-2xl font-bold font-mono ${accent.price}`}>
                          ${(product.priceCents / 100).toFixed(0)}
                        </div>
                        <div className="text-[10px] text-slate uppercase tracking-wide">
                          one-time
                        </div>
                      </div>
                    </div>

                    {/* Title + tagline */}
                    <h2 className="text-lg font-bold text-charcoal dark:text-foreground mb-2 leading-snug">
                      {product.name}
                    </h2>
                    <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed mb-5">
                      {product.tagline}
                    </p>

                    {/* Included items */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-slate dark:text-foreground-muted"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-1 shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {hasError && (
                      <p className="text-ember text-xs text-center mb-2">
                        Something went wrong — please try again.
                      </p>
                    )}
                    <button
                      onClick={() => handleBuy(product.id)}
                      disabled={isLoading || loadingId !== null}
                      className="btn-primary inline-flex items-center gap-2 justify-center text-sm py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Redirecting…
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Buy Now
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Free resources CTA */}
      <section className="section bg-white dark:bg-card">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl border border-border bg-ash dark:bg-background">
            <div>
              <h2 className="text-2xl font-bold text-charcoal dark:text-foreground mb-2">
                Not ready to buy? Start with the free tools.
              </h2>
              <p className="text-slate dark:text-foreground-muted">
                Interactive financial models, AI prompts, and frameworks — no
                paywall, no signup.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/playbooks"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Browse Playbooks
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/case-studies"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Explore Work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
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
              Need something custom-built?
            </h2>
            <p className="text-ash/70 text-lg max-w-xl mx-auto mb-8">
              Downloads are the starting point. An engagement builds the
              version that runs on your stack, with your data, for your team.
            </p>
            <Link
              href="/engage"
              className="btn-primary inline-flex items-center gap-2"
            >
              Work With Me
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
