"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MegaMenu, { type MegaMenuContent } from "./MegaMenu";
import {
  portfolioMegaMenu,
  demandMachineMegaMenu,
  thinkingMegaMenu,
  aboutMegaMenu,
} from "@/lib/mega-menu-content";
import { SubstackLatestPost } from "./SubstackLatestPost";
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
    megaMenu: portfolioMegaMenu,
    mobileChildren: [
      { href: "/portfolio", label: "View All Work" },
      { href: "/portfolio/roi-simulator", label: "Paid Media ROI Calculator" },
      { href: "/portfolio/sovereign-personas", label: "Sovereign Personas" },
      { href: "/portfolio/10-touch-sales-play", label: "10-Touch Sales Play" },
      { href: "/portfolio/120-day-content-journey", label: "120-Day Content Journey" },
      { href: "/portfolio/b2b-marketing-framework", label: "B2B Marketing Framework" },
      { href: "/portfolio/its-good-to-be-pitched", label: "It's Good to Be Pitched" },
    ],
  },
  {
    label: "Demand Machine",
    megaMenu: demandMachineMegaMenu,
    mobileChildren: [
      { href: "/demand-machine/interview", label: "36-Question Interview" },
      { href: "/demand-machine/messaging", label: "21-Step Messaging Framework" },
      { href: "/demand-machine/content-planner", label: "120-Day Content Planner" },
      { href: "/demand-machine/outbound", label: "10-Touch Outbound Builder" },
    ],
  },
  {
    label: "Thinking",
    megaMenu: thinkingMegaMenu,
    mobileChildren: [
      { href: "/thinking", label: "Micro-Blog" },
      { href: "https://sarenai.substack.com", label: "Substack", isExternal: true },
    ],
  },
  {
    label: "About",
    megaMenu: aboutMegaMenu,
    mobileChildren: [
      { href: "/about", label: "About Me" },
      { href: "/about/clients", label: "Client Brands" },
      { href: "/about/stack", label: "My Stack" },
    ],
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
  const headerRef = useRef<HTMLElement>(null);

  // Handle mega menu hover with delay
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close mega menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMegaMenu(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-ash/95 dark:bg-background/95 backdrop-blur-sm border-b border-charcoal/10 dark:border-ember/20"
      onMouseLeave={handleMouseLeave}
    >
      <nav className="container-narrow py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-foreground tracking-tight hover:text-ember transition-colors"
          >
            saren<span className="text-ember">.</span>ai
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label, !!link.megaMenu)}
              >
                {link.href ? (
                  <Link
                    href={link.href}
                    className="text-charcoal dark:text-foreground hover:text-ember dark:hover:text-ember font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ember transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <button
                    className={`text-charcoal dark:text-foreground hover:text-ember dark:hover:text-ember font-medium transition-colors relative group ${openMegaMenu === link.label ? "text-ember" : ""
                      }`}
                    aria-expanded={openMegaMenu === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-ember transition-all duration-300 ${openMegaMenu === link.label ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                  </button>
                )}
              </div>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-charcoal dark:text-foreground hover:text-ember transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-charcoal/10 dark:border-ember/20">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
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
                          className="flex items-center justify-between w-full py-3 px-4 text-charcoal dark:text-foreground hover:text-ember hover:bg-charcoal/5 dark:hover:bg-ember/10 rounded-lg font-medium transition-all"
                        >
                          <span>{link.label}</span>
                          <svg
                            className={`w-4 h-4 transition-transform ${expandedMobileItem === link.label ? "rotate-180" : ""
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
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
                              <div className="pl-4 py-2 space-y-1">
                                {link.mobileChildren.map((child) => {
                                  const isExternal = child.isExternal || child.href.startsWith('http');
                                  const linkContent = (
                                    <>
                                      <span className="font-medium text-charcoal dark:text-foreground">
                                        {child.label}
                                        {isExternal && (
                                          <svg
                                            className="w-3 h-3 inline-block ml-1"
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
                                        )}
                                      </span>
                                      {child.description && (
                                        <span className="block text-xs text-foreground-muted mt-0.5">
                                          {child.description}
                                        </span>
                                      )}
                                    </>
                                  );

                                  const className =
                                    "block py-2 px-4 hover:text-ember hover:bg-charcoal/5 dark:hover:bg-ember/10 rounded-lg transition-all";

                                  return isExternal ? (
                                    <a
                                      key={child.href}
                                      href={child.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setIsMenuOpen(false)}
                                      className={className}
                                    >
                                      {linkContent}
                                    </a>
                                  ) : (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className={className}
                                    >
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
                        className="block py-3 px-4 text-charcoal dark:text-foreground hover:text-ember hover:bg-charcoal/5 dark:hover:bg-ember/10 rounded-lg font-medium transition-all"
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
      </nav>

      {/* Mega Menus */}
      {navLinks.map((link) => {
        if (!link.megaMenu) return null;

        // Inject Substack feed for Thinking menu
        const menuContent = link.label === "Thinking"
          ? { ...link.megaMenu, customContent: <SubstackLatestPost post={latestPost ?? null} /> }
          : link.megaMenu;

        return (
          <MegaMenu
            key={link.label}
            isOpen={openMegaMenu === link.label}
            content={menuContent}
            onClose={() => setOpenMegaMenu(null)}
          />
        );
      })}
    </header>
  );
}
