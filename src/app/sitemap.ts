import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://saren.ai";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
{
      url: `${baseUrl}/about/clients`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
{
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ai-orchestration`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/roi-simulator`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio/sovereign-personas`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/10-touch-sales-play`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/120-day-content-journey`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/b2b-marketing-framework`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/its-good-to-be-pitched`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/behavioral-lead-scoring`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/gtm-budget-calculator`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/psylocke-timeline`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/authority-engineering`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
