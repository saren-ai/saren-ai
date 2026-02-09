"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Suspense, ReactNode } from "react";

export interface MegaMenuLink {
  href: string;
  label: string;
  description?: string;
  isExternal?: boolean;
}

export interface MegaMenuSection {
  title?: string;
  links: MegaMenuLink[];
}

export interface PromotionalContent {
  image?: string;
  imageAlt?: string;
  headline: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
}

export interface MegaMenuContent {
  sections: MegaMenuSection[];
  promotional?: PromotionalContent;
  customContent?: ReactNode; // For custom layouts like Substack feed
  layout?: 'default' | 'three-column'; // Layout type
}

interface MegaMenuProps {
  isOpen: boolean;
  content: MegaMenuContent;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, content, onClose }: MegaMenuProps) {
  // Unified Three-Column Layout for all mega menus (Portfolio, Thinking, About)
  // Layout: [Left: Promo/Custom] [Middle: Links 1] [Right: Links 2]
  if (content.layout === 'three-column') {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-card-bg shadow-2xl border-t border-charcoal/10 dark:border-ember/20"
          >
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Column 1: Promo or Custom Content (Left) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`${content.customContent ? 'lg:col-span-2' : 'lg:col-span-1'}`}
                >
                  {content.customContent ? (
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center h-64">
                          <div className="text-foreground-muted">Loading...</div>
                        </div>
                      }
                    >
                      {content.customContent}
                    </Suspense>
                  ) : content.promotional ? (
                    <div className="bg-gradient-to-br from-charcoal/5 to-electric/5 dark:from-background-secondary dark:to-background-secondary rounded-xl p-6 border border-border dark:border-ember/20 h-full">
                      {content.promotional.image && (
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-charcoal/10">
                          <Image
                            src={content.promotional.image}
                            alt={content.promotional.imageAlt || ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <h4 className="text-xl font-bold text-foreground mb-3">
                        {content.promotional.headline}
                      </h4>
                      <p className="text-foreground-muted leading-relaxed mb-4">
                        {content.promotional.description}
                      </p>
                      {content.promotional.cta && (
                        <Link
                          href={content.promotional.cta.href}
                          onClick={onClose}
                          className="inline-flex items-center gap-2 text-ember font-semibold hover:text-ember/80 transition-colors group"
                        >
                          {content.promotional.cta.label}
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                      )}
                    </div>
                  ) : null}
                </motion.div>

                {/* Columns 2 & 3: Link Sections */}
                {/* Map up to 2 sections to the remaining 2 columns */}
                {content.sections.slice(0, 2).map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                    className="lg:col-span-1"
                  >
                    {section.title && (
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">
                        {section.title}
                      </h3>
                    )}
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={linkIndex}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.15 + (index * 0.05) + (linkIndex * 0.02),
                          }}
                        >
                          {link.isExternal ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onClose}
                              className="group block"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <span className="text-foreground font-medium group-hover:text-ember transition-colors">
                                    {link.label}
                                  </span>
                                  {link.description && (
                                    <p className="text-sm text-foreground-muted mt-1 leading-relaxed">
                                      {link.description}
                                    </p>
                                  )}
                                </div>
                                <svg
                                  className="w-4 h-4 text-foreground-muted group-hover:text-ember transition-colors flex-shrink-0 mt-0.5"
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
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="group block"
                            >
                              <span className="text-foreground font-medium group-hover:text-ember transition-colors">
                                {link.label}
                              </span>
                              {link.description && (
                                <p className="text-sm text-foreground-muted mt-1 leading-relaxed">
                                  {link.description}
                                </p>
                              )}
                            </Link>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {/* Special Case: If Thinking Menu (has customContent), putting links in the 3rd column since customContent spans 2 cols in previous logic? 
                    Wait, Thinking menu is [Custom: Image+Text] [Links]. 
                    My previous `SubstackLatestPost` component is 2 columns internally.
                    If I put `SubstackLatestPost` (which is grid-cols-2) into Col 1 (col-span-1), it will be squished.
                    
                    Re-reading Thinking Request: "From left to right, start with the image from Substack, then in the middle use the eyebrow/title/description copy and link, and on the right list the other links"
                    This implies 3 columns total for the MegaMenu.
                    Col 1: Substack Image
                    Col 2: Substack Text
                    Col 3: Menu Links
                    
                    My `SubstackLatestPost` has 2 columns. If I put it in Col 1 & 2, and links in Col 3, that works.
                    So for Thinking menu: Custom Content should span 2 columns.
                    
                    But for Portfolio/About: Promo is Col 1. Links are Col 2 & 3.
                */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Fallback / Default layout (Shouldn't be reached if all are three-column now)
  return null;
}
