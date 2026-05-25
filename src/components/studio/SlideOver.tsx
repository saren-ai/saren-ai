"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface SlideOverProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SlideOver({ title, onClose, children }: SlideOverProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-md bg-charcoal border-l border-border flex flex-col h-full shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
