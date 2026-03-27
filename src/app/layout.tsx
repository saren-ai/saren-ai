import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";
import ThemeProvider from "@/components/layout/ThemeProvider";
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
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Saren Sakurai",
              url: "https://saren.ai",
              image: "https://saren.ai/og-image.png",
              jobTitle: "VP, Demand Generation — Cybersecurity & AI",
              description:
                "VP-level demand generation for AI-native cybersecurity companies. Built the program at Cylance ($1.4B exit). Scaled it at BlackBerry. 550% pipeline growth, 70% CAC reduction.",
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
          <TopBanner />
          <div className="sticky top-0 z-50">
            <Header latestPost={latestPost} />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
