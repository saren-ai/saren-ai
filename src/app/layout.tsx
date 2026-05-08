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
    default: "Saren Sakurai | Demand Generation | Cybersecurity & AI | B2B Marketing",
    template: "%s | Saren.ai",
  },
  description:
    "VP-level demand generation for AI-native cybersecurity companies. Built the program at Cylance ($1.4B exit). Scaled it at BlackBerry. 550% pipeline growth, 70% CAC reduction.",
  keywords: [
    "demand generation",
    "cybersecurity marketing",
    "AI-augmented marketing",
    "B2B demand gen",
    "VP demand generation",
    "Cylance",
    "pipeline growth",
    "AI operations",
    "fractional CMO",
    "growth marketing",
  ],
  authors: [{ name: "Saren Sakurai" }],
  creator: "Saren Sakurai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saren.ai",
    siteName: "Saren.ai",
    title: "Saren Sakurai | Demand Generation | Cybersecurity & AI | B2B Marketing",
    description:
      "VP-level demand generation for AI-native cybersecurity companies. Built the program at Cylance ($1.4B exit). Scaled it at BlackBerry.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saren.ai - Fractional CMO & AI Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saren Sakurai | Demand Generation | Cybersecurity & AI | B2B Marketing",
    description:
      "VP-level demand generation for AI-native cybersecurity companies. Built the program at Cylance ($1.4B exit). Scaled it at BlackBerry.",
    images: ["/og-image.png"],
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
  const posts = await getLatestSubstackPosts(1);
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
              image: "https://saren.ai/og-image.png",
              jobTitle: "Fractional CMO & AI Operations Consultant",
              description:
                "Fractional CMO and AI Operations Consultant specializing in B2B SaaS go-to-market strategy, demand generation, and AI-powered marketing operations. Formerly Senior Director of Demand Generation and Web at Cylance (acquired by BlackBerry for $1.4B). Principal at Identogram LLC.",
              worksFor: {
                "@type": "Organization",
                "@id": "https://identogram.com/#organization",
                name: "Identogram LLC",
                url: "https://identogram.com",
              },
              hasOccupation: {
                "@type": "Occupation",
                name: "Fractional CMO",
                occupationLocation: {
                  "@type": "City",
                  name: "Orange County, California",
                },
                skills: "B2B SaaS go-to-market strategy, demand generation, AI-powered marketing operations, account-based marketing, intent data strategy, funnel architecture, agentic AI GTM systems",
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
                "B2B SaaS go-to-market strategy",
                "Demand generation",
                "AI-powered marketing operations",
                "Account-based marketing (ABM)",
                "Intent data strategy",
                "Funnel architecture and lead scoring",
                "Agentic AI GTM systems",
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
          <PagefindProvider>
            <SearchProvider>
              <SearchModal />
              <TopBanner />
              <div className="sticky top-0 z-50 bg-background">
                <Header latestPost={latestPost} />
              </div>
              <main className="flex-1">{children}</main>
              <Footer />
            </SearchProvider>
          </PagefindProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
