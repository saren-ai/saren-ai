"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MegaMenu, { type MegaMenuContent } from "./MegaMenu";
import {
  workMegaMenu,
  aboutMegaMenu,
  aiOrchestrationMegaMenu,
} from "@/lib/mega-menu-content";

import { type SubstackPost } from "@/lib/substack-rss";

interface NavItem {
  label: string;
  href?: string;
  megaMenu?: MegaMenuContent;
  mobileChildren?: { href: string; label: string; description?: string; isExternal?: boolean }[];
}

const navLinks: NavItem[] = [
  {
    label: "Portfolio",
    megaMenu: workMegaMenu,
    mobileChildren: [
      { href: "/portfolio", label: "View All Work" },
      ...workMegaMenu.sections.flatMap(section =>
        section.links.map(link => ({
          href: link.href,
          label: link.label,
          description: link.description,
          isExternal: link.isExternal,
        }))
      ),
    ],
  },
  {
    label: "AI Orchestration",
    megaMenu: aiOrchestrationMegaMenu,
    mobileChildren: [
      { href: "/ai-orchestration", label: "AI Orchestration", description: "Machines handle scale. Humans handle meaning." },
      { href: "/signal-state", label: "Signal-State: Overview", description: "AI-enabled expressed intent targeting" },
      { href: "/signal-state/framework", label: "Framework" },
      { href: "/signal-state/architecture", label: "Architecture" },
      { href: "/signal-state/use-cases", label: "Use Cases" },
      { href: "/signal-state/signal-library", label: "Signal Library" },
    ],
  },
  {
    label: "About",
    megaMenu: aboutMegaMenu,
    mobileChildren: aboutMegaMenu.sections.flatMap(section =>
      section.links.map(link => ({
        href: link.href,
        label: link.label,
        description: link.description,
        isExternal: link.isExternal,
      }))
    ),
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header({ latestPost }: { latestPost?: SubstackPost | null }) {
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string, hasMegaMenu: boolean) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (hasMegaMenu) {
      setOpenMegaMenu(label);
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMegaMenu(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Build mega menu content (injects Substack data for About)
  const getMegaMenuContent = (link: NavItem): MegaMenuContent | undefined => {
    if (!link.megaMenu) return undefined;
    if (link.label === "About" && latestPost) {
      const desc = latestPost.contentSnippet || link.megaMenu.promotional?.description || "";
      return {
        ...link.megaMenu,
        promotional: {
          image: latestPost.thumbnail || link.megaMenu.promotional?.image || "",
          imageAlt: latestPost.title || "Latest Substack Article",
          headline: latestPost.title || link.megaMenu.promotional?.headline || "Latest on Substack",
          description: desc.length > 120 ? desc.substring(0, 120) + "..." : desc,
          cta: {
            label: "Read on Substack",
            href: latestPost.link || "https://sarenai.substack.com",
          },
        },
      };
    }
    return link.megaMenu;
  };

  const activeMegaMenuContent = openMegaMenu
    ? getMegaMenuContent(navLinks.find(l => l.label === openMegaMenu)!)
    : undefined;

  return (
    <header className="py-3">
      {/*
        ── Pill wrapper ─────────────────────────────────────────────────────
        80% width, centered. Acts as positioning context for mega menu.
        onMouseLeave covers both pill AND menu — no bridge div needed.
      */}
      <div
        className="w-[90%] sm:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto relative"
        onMouseLeave={handleMouseLeave}
      >
        {/* ── The Pill ─────────────────────────────────────────────────── */}
        {/*
          Background:
            Light → white (#FFFFFF) on ash (#F5F5F7) page = clearly distinct
            Dark  → #1A1A1A on obsidian (#0F0F0F) page = clearly distinct
          Avoids CSS-variable flip: --charcoal-black inverts to #FFF in dark mode.
        */}
        <nav
          className="flex items-center justify-between px-5 py-2.5 rounded-full
            bg-white dark:bg-[#1A1A1A] backdrop-blur-md
            border border-[#D2D2D7] dark:border-[#2A2A2A]
            shadow-[0_2px_16px_rgba(0,0,0,0.10)]"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight shrink-0"
          >
            <span className="text-gradient">saren.ai</span><span className="font-mono text-gradient">()</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                onMouseEnter={() => handleMouseEnter(link.label, !!link.megaMenu)}
              >
                {link.href ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium
                      text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-ember
                      hover:bg-[#F5F5F7] dark:hover:bg-white/[0.07] transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                      openMegaMenu === link.label
                        ? "bg-[#F5F5F7] dark:bg-white/[0.09] text-ember dark:text-ember"
                        : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-ember hover:bg-[#F5F5F7] dark:hover:bg-white/[0.07]"
                    }`}
                    aria-expanded={openMegaMenu === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        openMegaMenu === link.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right side: Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-ember hover:bg-[#F5F5F7] dark:hover:bg-white/[0.07] transition-all"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* ── Mega Menu (desktop) ───────────────────────────────────────── */}
        <AnimatePresence>
          {openMegaMenu && activeMegaMenuContent && (
            <motion.div
              key={openMegaMenu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="hidden md:block absolute left-0 right-0 z-50 mt-2 rounded-2xl overflow-hidden
                bg-white dark:bg-[#1A1A1A] backdrop-blur-xl
                border border-[#D2D2D7] dark:border-[#2A2A2A]
                shadow-[0_16px_48px_rgba(0,0,0,0.16)]"
              style={{ top: "100%" }}
              onMouseEnter={() => handleMouseEnter(openMegaMenu, true)}
            >
              <MegaMenu
                content={activeMegaMenuContent}
                onClose={() => setOpenMegaMenu(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile Menu ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden absolute left-0 right-0 z-50 mt-2 rounded-2xl overflow-hidden
                bg-white dark:bg-[#1A1A1A] backdrop-blur-xl
                border border-[#D2D2D7] dark:border-[#2A2A2A]
                shadow-[0_16px_48px_rgba(0,0,0,0.16)]"
              style={{ top: "100%" }}
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.mobileChildren ? (
                      <div>
                        <button
                          onClick={() =>
                            setExpandedMobileItem(
                              expandedMobileItem === link.label ? null : link.label
                            )
                          }
                          className="flex items-center justify-between w-full py-2.5 px-4 text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-ember hover:bg-[#F5F5F7] dark:hover:bg-white/[0.07] rounded-xl font-medium text-sm transition-all"
                        >
                          <span>{link.label}</span>
                          <svg
                            className={`w-4 h-4 transition-transform ${expandedMobileItem === link.label ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {expandedMobileItem === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-3 py-1 space-y-0.5">
                                {link.mobileChildren.map((child) => {
                                  const isExternal = child.isExternal || child.href.startsWith("http");
                                  const linkContent = (
                                    <>
                                      <span className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7] text-sm">
                                        {child.label}
                                        {isExternal && (
                                          <svg className="w-3 h-3 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                          </svg>
                                        )}
                                      </span>
                                      {child.description && (
                                        <span className="block text-xs text-slate mt-0.5">{child.description}</span>
                                      )}
                                    </>
                                  );
                                  const cls = "block py-2 px-4 hover:text-ember hover:bg-[#F5F5F7] dark:hover:bg-white/[0.07] rounded-xl transition-all";
                                  return isExternal ? (
                                    <a key={child.href} href={child.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className={cls}>
                                      {linkContent}
                                    </a>
                                  ) : (
                                    <Link key={child.href} href={child.href} onClick={() => setIsMenuOpen(false)} className={cls}>
                                      {linkContent}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : link.href ? (
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2.5 px-4 text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-ember hover:bg-[#F5F5F7] dark:hover:bg-white/[0.07] rounded-xl font-medium text-sm transition-all"
                      >
                        {link.label}
                      </Link>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
