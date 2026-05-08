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
        source: "/portfolio/b2b-marketing-framework",
        destination: "/playbooks/b2b-marketing-framework",
        permanent: true,
      },
      {
        source: "/portfolio/psylocke-timeline",
        destination: "/feature/kwannon-timeline",
        permanent: true,
      },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
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
