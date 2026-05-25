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

  // Redirects for removed sections
  async redirects() {
    return [
      {
        source: "/portfolio/behavioral-lead-scoring",
        destination: "/portfolio/hybrid-lead-scoring",
        permanent: true,
      },
      {
        source: "/about/stack",
        destination: "/about#stack",
        permanent: true,
      },
      {
        source: "/portfolio/calculator",
        destination: "/portfolio/gtm-budget-calculator",
        permanent: true,
      },
      {
        source: "/thinking",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/thinking/:slug*",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/podcast",
        destination: "/",
        permanent: true,
      },
      {
        source: "/podcast/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about/brand",
        destination: "/brand",
        permanent: true,
      },
      {
        source: "/portfolio/psylocke-timeline",
        destination: "/feature/psylocke-timeline",
        permanent: true,
      },
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
