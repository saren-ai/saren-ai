"use client";

import Script from "next/script";

export default function CalendlyInlineWidget({
  url = "https://calendly.com/sarenai",
  className = "",
}: {
  url?: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={`calendly-inline-widget rounded-xl overflow-hidden ${className}`}
        data-url={url}
        style={{ minWidth: "280px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
