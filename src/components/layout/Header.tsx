"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string; description?: string }[];
}

const navLinks: NavItem[] = [
  {
    href: "/portfolio/golden-dashboard",
    label: "Portfolio",
    children: [
      {
        href: "/portfolio/golden-dashboard",
        label: "Golden Dashboard",
        description: "Full-funnel attribution analytics",
      },
      {
        href: "/portfolio/sovereign-personas",
        label: "Sovereign Personas",
        description: "Buyer personas that drive action",
      },
      {
        href: "/portfolio/10-touch-sales-play",
        label: "10-Touch Sales Play",
        description: "Multi-channel outbound system",
      },
      {
        href: "/portfolio/120-day-content-journey",
        label: "120-Day Content Journey",
        description: "Content-driven demand engine",
      },
      {
        href: "/portfolio/b2b-marketing-framework",
        label: "B2B Marketing Framework",
        description: "7-layer messaging system",
      },
    ],
  },
  { href: "/thinking", label: "Thinking" },
  {
    href: "/about",
    label: "About",
    children: [
      {
        href: "/about",
        label: "About Me",
        description: "Career journey and background",
      },
      {
        href: "/about/stack",
        label: "My Stack",
        description: "Tools I use to build and grow",
      },
    ],
  },
  { href: "/contact", label: "Contact" },
];

function DropdownMenu({
  items,
  isOpen,
  onClose,
}: {
  items: NavItem["children"];
  isOpen: boolean;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && items && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
        >
          <div className="bg-white dark:bg-offblack rounded-xl shadow-xl border border-charcoal/10 dark:border-ash/10 overflow-hidden min-w-[280px]">
            {items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block px-4 py-3 hover:bg-charcoal/5 dark:hover:bg-ash/5 transition-colors ${
                  index !== items.length - 1 ? "border-b border-charcoal/5 dark:border-ash/5" : ""
                }`}
              >
                <span className="font-medium text-charcoal dark:text-ash hover:text-ember transition-colors block">
                  {item.label}
                </span>
                {item.description && (
                  <span className="text-sm text-slate dark:text-slate mt-0.5 block">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  return (
    <header className="bg-ash/95 dark:bg-offblack/95 backdrop-blur-sm border-b border-charcoal/10 dark:border-ash/10 transition-colors">
      <nav className="container-narrow">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-charcoal dark:text-ash tracking-tight hover:text-ember transition-colors"
          >
            saren<span className="text-ember">.</span>ai
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.children ? (
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.label ? null : link.label)
                    }
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    className="text-charcoal/80 dark:text-ash/80 hover:text-ember font-medium transition-colors relative group flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
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
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ember transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-charcoal/80 dark:text-ash/80 hover:text-ember font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ember transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}

                {link.children && (
                  <div
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <DropdownMenu
                      items={link.children}
                      isOpen={openDropdown === link.label}
                      onClose={() => setOpenDropdown(null)}
                    />
                  </div>
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
              className="p-2 text-charcoal dark:text-ash hover:text-ember transition-colors"
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
              <div className="py-4 space-y-1 border-t border-charcoal/10 dark:border-ash/10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setExpandedMobileItem(
                              expandedMobileItem === link.label ? null : link.label
                            )
                          }
                          className="flex items-center justify-between w-full py-3 px-4 text-charcoal/80 dark:text-ash/80 hover:text-ember hover:bg-charcoal/5 dark:hover:bg-ash/5 rounded-lg font-medium transition-all"
                        >
                          <span>{link.label}</span>
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              expandedMobileItem === link.label ? "rotate-180" : ""
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
                                {link.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 px-4 text-slate dark:text-slate hover:text-ember hover:bg-charcoal/5 dark:hover:bg-ash/5 rounded-lg transition-all"
                                  >
                                    <span className="font-medium text-charcoal/80 dark:text-ash/80">
                                      {child.label}
                                    </span>
                                    {child.description && (
                                      <span className="block text-xs text-slate mt-0.5">
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 text-charcoal/80 dark:text-ash/80 hover:text-ember hover:bg-charcoal/5 dark:hover:bg-ash/5 rounded-lg font-medium transition-all"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
