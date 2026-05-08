"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import { ComicIssue, formatDate } from "@/lib/psylocke-timeline";

interface IssueDrawerProps {
  issue: ComicIssue | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function IssueDrawer({ issue, isOpen, onClose }: IssueDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape key closes drawer
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus close button when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!issue) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-offblack/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-background shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 min-w-0">
                  <h2
                    id="drawer-title"
                    className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                  >
                    {issue.title}
                  </h2>
                  <p className="text-foreground-muted text-sm font-mono">
                    {formatDate(issue.releaseDate)}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="p-2 hover:bg-charcoal/10 dark:hover:bg-ash/10 rounded-lg transition-colors flex-shrink-0 ml-4"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5 text-foreground-muted" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Cover Image */}
                <section>
                  <div className="relative aspect-[2/3] max-h-[400px] w-auto mx-auto rounded-lg overflow-hidden border border-border">
                    <Image
                      src={issue.thumbnailPath}
                      alt={`Cover of ${issue.title}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 80vw, 400px"
                    />
                  </div>
                </section>

                {/* Plot Description */}
                <section>
                  <h3 className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
                    Plot Summary
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {issue.plotDescription}
                  </p>
                </section>

                {/* External Link */}
                <section>
                  <a
                    href={issue.marvelFandomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm"
                  >
                    View on Marvel Fandom
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
