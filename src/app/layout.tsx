import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { PagefindProvider } from "@/components/search/PagefindProvider";
import { SearchProvider } from "@/components/search/SearchContext";
import SearchModal from "@/components/search/SearchModal";
import { getLatestSubstackPosts } from "@/lib/substack-rss";
import { headers } from "next/headers";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saren.ai"),
  title: {
    default: "Saren Sakurai | Fractional Marketing Lead & AI Operations | B2B SaaS",
    template: "%s | Saren.ai",
  },
  description:
    "Fractional marketing lead and AI operations consultant for B2B SaaS and cybersecurity companies. Built demand at Cylance ($1.4B exit), scaled it at BlackBerry. $4M quarterly pipeline, 70% CAC reduction.",
  keywords: [
    "demand generation",
    "cybersecurity marketing",
    "AI-augmented marketing",
    "B2B demand gen",
    "VP demand generation",
    "Cylance",
    "pipeline growth",
    "AI operations",
    "fractional marketing lead",
    "growth marketing",
  ],
  authors: [{ name: "Saren Sakurai" }],
  creator: "Saren Sakurai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saren.ai",
    siteName: "Saren.ai",
    title: "Saren Sakurai | Fractional Marketing Lead & AI Operations | B2B SaaS",
    description:
      "Fractional marketing lead and AI operations consultant for B2B SaaS and cybersecurity companies. Built demand at Cylance ($1.4B exit), scaled it at BlackBerry.",
    images: [
      {
        url: "/images/og/home.png",
        width: 1200,
        height: 630,
        alt: "Saren.ai - Fractional Marketing Lead & AI Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saren Sakurai | Fractional Marketing Lead & AI Operations | B2B SaaS",
    description:
      "Fractional marketing lead and AI operations consultant for B2B SaaS and cybersecurity companies. Built demand at Cylance ($1.4B exit), scaled it at BlackBerry.",
    images: ["/images/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const isStudio = headersList.get('x-is-studio') === '1';

  const posts = isStudio ? [] : await getLatestSubstackPosts(1);
  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P9VJJFGH');`,
          }}
        />
        {/* Prevent flash of wrong theme — reads localStorage before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='light'){document.documentElement.classList.remove('dark');}else if(t==='dark'){document.documentElement.classList.add('dark');}else{if(d)document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://saren.ai/#person",
              name: "Saren Sakurai",
              url: "https://saren.ai",
              image: "https://saren.ai/profile/saren-profile_2026.png",
              jobTitle: "Fractional Marketing Lead & AI Operations Consultant",
              description:
                "Fractional Marketing Lead and AI Operations Consultant specializing in B2B SaaS go-to-market strategy, demand generation, and AI-powered marketing operations. Formerly Senior Director of Demand Generation and Web at Cylance (acquired by BlackBerry for $1.4B). Principal at Identogram LLC.",
              worksFor: {
                "@type": "Organization",
                "@id": "https://identogram.com/#organization",
                name: "Identogram LLC",
                url: "https://identogram.com",
              },
              hasOccupation: {
                "@type": "Occupation",
                name: "Fractional Marketing Lead",
                occupationLocation: {
                  "@type": "City",
                  name: "Orange County, California",
                },
                skills: [
                  { "@type": "DefinedTerm", name: "B2B SaaS go-to-market strategy" },
                  { "@type": "DefinedTerm", name: "AI-native marketing operations" },
                  { "@type": "DefinedTerm", name: "Demand generation engineering" },
                  { "@type": "DefinedTerm", name: "Account-based marketing (ABM)" },
                  { "@type": "DefinedTerm", name: "Intent data strategy and activation" },
                  { "@type": "DefinedTerm", name: "Multi-agent workflow orchestration" },
                  { "@type": "DefinedTerm", name: "Agentic GTM systems" },
                  { "@type": "DefinedTerm", name: "HubSpot technical architecture" },
                  { "@type": "DefinedTerm", name: "Full-funnel attribution modeling" },
                  { "@type": "DefinedTerm", name: "Predictive lead scoring" },
                ],
              },
              alumniOf: [
                {
                  "@type": "Organization",
                  name: "Cylance",
                  url: "https://www.cylance.com",
                  description: "AI-driven endpoint security company acquired by BlackBerry for $1.4 billion in 2019",
                },
                {
                  "@type": "Organization",
                  name: "BlackBerry",
                  url: "https://www.blackberry.com",
                  description: "Enterprise cybersecurity and endpoint security",
                },
                {
                  "@type": "Organization",
                  name: "AKQA",
                  url: "https://www.akqa.com",
                  description: "Global digital innovation and design agency",
                },
                {
                  "@type": "Organization",
                  name: "JUXT Interactive",
                  description: "Digital experience and interactive agency",
                },
                {
                  "@type": "Organization",
                  name: "Perficient",
                  url: "https://www.perficient.com",
                  description: "Global digital transformation consulting firm",
                },
              ],
              knowsAbout: [
                "AI-native marketing operations",
                "demand generation engineering",
                "answer engine optimization (AEO)",
                "Model Context Protocol (MCP) for marketing automation",
                "multi-agent workflow orchestration for B2B sales",
                "agentic GTM systems",
                "B2B SaaS go-to-market strategy",
                "account-based marketing (ABM)",
                "intent data strategy and activation",
                "signal-led B2B pipeline development",
                "HubSpot technical architecture and automation",
                "predictive lead scoring models",
                "full-funnel attribution modeling",
                "AI-augmented sales development and SDR automation",
                "cybersecurity marketing and demand generation",
                "buyer journey orchestration",
                "programmatic outbound sequences",
                "fractional marketing lead services for Series A startups",
                "revenue operations (RevOps)",
                "Bombora intent data activation",
                "funnel architecture design",
                "customer acquisition cost (CAC) optimization",
                "pipeline velocity optimization",
                "AI content strategy for B2B SaaS",
                "Claude Code and LLM workflow automation",
              ],
              sameAs: [
                "https://www.linkedin.com/in/saren/",
                "https://bsky.app/profile/saren.bsky.social",
                "https://www.instagram.com/saren/",
                "https://mastodon.social/@saren",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService"],
              "@id": "https://identogram.com/#organization",
              name: "Identogram LLC",
              url: "https://identogram.com",
              founder: { "@id": "https://saren.ai/#person" },
              employee: { "@id": "https://saren.ai/#person" },
              description: "B2B marketing consultancy specializing in AI-native demand generation, multi-agent GTM systems, and fractional marketing lead services for SaaS and cybersecurity companies.",
              knowsAbout: [
                "AI-native marketing operations",
                "fractional marketing lead services",
                "B2B SaaS demand generation",
                "answer engine optimization (AEO)",
                "multi-agent workflow orchestration",
                "cybersecurity marketing",
                "AI-augmented GTM strategy",
                "HubSpot technical architecture",
                "intent data activation",
                "programmatic outbound sequences",
                "signal-led pipeline development",
              ],
              areaServed: [
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "Canada" },
              ],
              serviceType: ["Fractional Marketing Lead", "Marketing Operations Consulting", "AI GTM Strategy"],
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9VJJFGH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>
          {isStudio ? (
            <main className="flex-1">{children}</main>
          ) : (
            <PagefindProvider>
              <SearchProvider>
                <SearchModal />
                {/* <TopBanner /> */}
                <div className="sticky top-0 z-50 bg-background">
                  <Header latestPost={latestPost} />
                </div>
                <main className="flex-1">{children}</main>
                <Footer />
              </SearchProvider>
            </PagefindProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
