"use client";

import Link from "next/link";
import Image from "next/image";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function HalcyonTab() {
  const handleClick = () => {
    window.dataLayer?.push({
      event: "halcyon_tab_click",
      event_category: "engagement",
      event_label: "halcyon_tab",
    });
  };

  return (
    <Link
      href="/halcyon"
      onClick={handleClick}
      aria-label="Saren × Halcyon — View application"
      className="fixed right-0 z-50 flex flex-col items-center justify-center gap-1 w-16 px-2 py-2 sm:w-20 sm:px-3 sm:py-3 md:w-28 md:py-4 bg-charcoal shadow-2xl rounded-l-2xl border border-r-0 border-white/10 hover:scale-105 transition-all duration-200"
      style={{ top: "50%", transform: "translateY(-50%)" }}
    >
      <span className="font-heading font-bold text-[7px] sm:text-[8px] md:text-[10px] tracking-wide text-white/90 uppercase">
        Hi, Halcyon.
      </span>
      <Image
        src="/logos/halcyon-logo.png"
        alt="Halcyon"
        width={80}
        height={80}
        className="object-contain w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16"
        priority
      />
      <span className="font-heading font-bold text-[7px] sm:text-[8px] md:text-[10px] tracking-wide text-white/90 uppercase">
        Click me.
      </span>
    </Link>
  );
}
