import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Metadata for deployment
  env: {
    SITE_URL: process.env.SITE_URL || "https://saren.ai",
  },

  // Redirects for removed sections and IA refactor (2026-05-28)
  // IMPORTANT: specific patterns must come before catch-alls — Next.js evaluates top-to-bottom.
  async redirects() {
    return [
      // ── Rebranded routes ─────────────────────────────────────────────────
      { source: "/ai-operations",                                    destination: "/ai-orchestration",                                permanent: true },
      // ── IA Refactor: tools moved portfolio → playbooks ──────────────────
      { source: "/portfolio/roi-simulator",                         destination: "/playbooks/roi-simulator",                         permanent: true },
      { source: "/portfolio/gtm-budget-calculator",                 destination: "/playbooks/gtm-budget-calculator",                 permanent: true },
      { source: "/portfolio/hybrid-lead-scoring",                   destination: "/playbooks/hybrid-lead-scoring",                   permanent: true },
      { source: "/portfolio/b2b-marketing-framework/:slug*",        destination: "/playbooks/b2b-marketing-framework/:slug*",        permanent: true },
      { source: "/portfolio/b2b-marketing-framework",               destination: "/playbooks/b2b-marketing-framework",               permanent: true },
      { source: "/portfolio/its-good-to-be-pitched",                destination: "/playbooks/its-good-to-be-pitched",               permanent: true },
      // ── Portfolio slugs that don't map to a case study ──────────────────
      { source: "/portfolio/behavioral-lead-scoring",               destination: "/playbooks/hybrid-lead-scoring",                   permanent: true },
      { source: "/portfolio/calculator",                             destination: "/playbooks/gtm-budget-calculator",                 permanent: true },
      { source: "/portfolio/golden-dashboard",                      destination: "/playbooks/roi-simulator",                         permanent: true },
      { source: "/portfolio/psylocke-timeline",                     destination: "/feature/psylocke-timeline",                       permanent: true },
      // ── IA Refactor: /portfolio → /case-studies (catch-all, must be last) ─
      { source: "/portfolio",                                        destination: "/case-studies",                                    permanent: true },
      { source: "/portfolio/:slug*",                                 destination: "/case-studies/:slug*",                             permanent: true },
      // ── Brief double-nesting bug (cc15254 → 026361d, 2026-05-28) ────────
      { source: "/playbooks/b2b-marketing-framework/b2b-marketing-framework/:slug*", destination: "/playbooks/b2b-marketing-framework/:slug*", permanent: true },
      { source: "/playbooks/b2b-marketing-framework/b2b-marketing-framework",        destination: "/playbooks/b2b-marketing-framework",         permanent: true },
      // ── Legacy /downloads → Playbook Library ────────────────────────────
      { source: "/downloads",                                        destination: "/playbooks",                                       permanent: true },
      // ── Other pre-refactor aliases ───────────────────────────────────────
      { source: "/about/stack",                                      destination: "/about#stack",                                     permanent: true },
      { source: "/about/brand",                                      destination: "/brand",                                           permanent: true },
      { source: "/about/fractional-cmo-services",                    destination: "/engage",                                          permanent: true },
      { source: "/thinking",                                         destination: "/case-studies",                                    permanent: true },
      { source: "/thinking/:slug*",                                  destination: "/case-studies",                                    permanent: true },
      { source: "/podcast",                                          destination: "/",                                                permanent: true },
      { source: "/podcast/:slug*",                                   destination: "/",                                                permanent: true },
      { source: "/home",                                             destination: "/",                                                permanent: true },
      { source: "/sitemap/sitemap.xml",                              destination: "/sitemap.xml",                                     permanent: true },
      // ── Old Medium publication (saren.ai was previously a Medium custom domain) ──
      // These articles accumulated backlinks before the domain moved to Next.js.
      // Redirecting to the nearest topically-relevant page preserves link equity.
      { source: "/b2b-content-at-ai-scale-thriving-in-the-era-of-zero-click-serps-f380153f45ca",       destination: "/case-studies",       permanent: true },
      { source: "/decentralized-social-disenshittification-now-b4d6ac43c307",                           destination: "/feature",             permanent: true },
      { source: "/the-3-questions-c-level-prospects-are-scanning-for-on-your-website-3efab4c7aa5e",     destination: "/case-studies",        permanent: true },
      { source: "/be-more-human-cultivating-your-uniquely-human-skills-in-the-age-of-ai-c24fbe945d05",  destination: "/about",               permanent: true },
      { source: "/ai-industry-reality-check-2024-a124530a003b",                                         destination: "/ai-orchestration",    permanent: true },
      { source: "/the-short-answer-to-how-do-i-update-my-website-for-aeo-geo-05251ab3e9aa",             destination: "/ai-orchestration",    permanent: true },
      { source: "/10-real-world-lessons-from-a-decade-of-gartners-hype-cycles-2012-2024-f4b90798d98f",  destination: "/case-studies",        permanent: true },
      { source: "/create-a-customized-gpt-for-brand-messaging-on-chatgpt-plus-8f638e08ffe4",            destination: "/playbooks",           permanent: true },
      // ── Old Medium/WordPress taxonomy and date-based paths (catch-alls) ────
      { source: "/tag/:slug*",                                       destination: "/case-studies",                                    permanent: true },
      { source: "/tagged/:slug*",                                    destination: "/case-studies",                                    permanent: true },
      { source: "/category/:slug*",                                  destination: "/case-studies",                                    permanent: true },
      { source: "/followers",                                        destination: "/about",                                           permanent: true },
      { source: "/latest",                                           destination: "/playbooks",                                       permanent: true },
      { source: "/2026/01/01/120-day-content-journey/:path*",        destination: "/case-studies/120-day-content-journey",           permanent: true },
      { source: "/2026/01/01/b2b-saas-icp-sales-play/:path*",        destination: "/case-studies/10-touch-sales-play",               permanent: true },
      { source: "/2026/01/05/personas-for-sovereign-markets/:path*", destination: "/case-studies/sovereign-personas",                permanent: true },
    ];
  },

  // Headers for security and performance
  async headers() {
    const csp = [
      "default-src 'self'",
      // Next.js + GTM + Sentry require unsafe-inline/eval for scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://browser.sentry-cdn.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co https://*.sentry.io https://o*.ingest.sentry.io https://www.google-analytics.com https://analytics.google.com",
      "frame-src https://calendly.com https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  disableLogger: true,
  automaticVercelMonitors: true,
});
