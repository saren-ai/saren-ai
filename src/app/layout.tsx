import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {/* Person/Organization/WebSite/LocalBusiness JSON-LD moved to per-page
            graphs (src/lib/schema) — each page is self-contained rather than
            relying on this shared layout script. See AGENTS.md § Structured data. */}
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
