"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Suspense, ReactNode } from "react";

export interface MegaMenuLink {
  href: string;
  label: string;
  description?: string;
  isExternal?: boolean;
  isComingSoon?: boolean;
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
  customContent?: ReactNode;
  layout?: "default" | "three-column" | "four-column";
}

interface MegaMenuProps {
  content: MegaMenuContent;
  onClose: () => void;
}

function MenuLink({ link, onClose }: { link: MegaMenuLink; onClose: () => void }) {
  if (link.isComingSoon) {
    return (
      <div className="group block opacity-50 cursor-not-allowed">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-charcoal dark:text-ash">{link.label}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-charcoal/10 dark:bg-ash/15 text-charcoal dark:text-ash px-1.5 py-0.5 rounded-full">
            Spec
          </span>
        </div>
        {link.description && (
          <p className="text-xs text-slate leading-relaxed">{link.description}</p>
        )}
      </div>
    );
  }

  if (link.isExternal) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClose} className="group block">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-charcoal dark:text-ash group-hover:text-ember transition-colors">
              {link.label}
            </span>
            {link.description && (
              <p className="text-xs text-slate mt-0.5 leading-relaxed">{link.description}</p>
            )}
          </div>
          <svg className="w-3.5 h-3.5 text-slate group-hover:text-ember transition-colors shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>
    );
  }

  return (
    <Link href={link.href} onClick={onClose} className="group block">
      <span className="text-sm font-medium text-charcoal dark:text-ash group-hover:text-ember transition-colors">
        {link.label}
      </span>
      {link.description && (
        <p className="text-xs text-slate mt-0.5 leading-relaxed">{link.description}</p>
      )}
    </Link>
  );
}

export default function MegaMenu({ content, onClose }: MegaMenuProps) {
  const isFourCol = content.layout === "four-column";
  const gridClass = isFourCol ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const sectionLimit = isFourCol ? 3 : 2;

  return (
    <div className="px-8 py-8" data-pagefind-ignore>
      <div className={`grid grid-cols-1 ${gridClass} gap-10`}>

        {/* ── Promo / Custom column (left) ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className={content.layout === "four-column" ? "lg:col-span-1" : (content.customContent ? "lg:col-span-2" : "lg:col-span-1")}
        >
          {content.customContent ? (
            <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-slate">Loading…</div>}>
              {content.customContent}
            </Suspense>
          ) : content.promotional ? (
            <div className="rounded-xl p-5 border border-charcoal/10 dark:border-ash/10 bg-ash dark:bg-charcoal/10 h-full flex flex-col">
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
              <h4 className="text-base font-bold text-charcoal dark:text-ash mb-2 leading-snug">
                {content.promotional.headline}
              </h4>
              <p className="text-xs text-slate leading-relaxed mb-4 flex-1">
                {content.promotional.description}
              </p>
              {content.promotional.cta && (
                <Link
                  href={content.promotional.cta.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-sm text-ember font-semibold hover:text-ember/80 transition-colors group"
                >
                  {content.promotional.cta.label}
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
          ) : null}
        </motion.div>

        {/* ── Link sections ─────────────────────────────────────────────── */}
        {content.sections.slice(0, sectionLimit).map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.04, duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-1"
          >
            {section.title && (
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate mb-4">
                {section.title}
              </p>
            )}
            <ul className="space-y-3.5">
              {section.links.map((link, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.04 + j * 0.02 }}
                >
                  <MenuLink link={link} onClose={onClose} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
