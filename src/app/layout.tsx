import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";
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
    default: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
    template: "%s | Saren.ai",
  },
  description:
    "Building AI-driven growth engines for early-stage and Series A startups. Scalable strategy, systems, and storytelling that turns vision into velocity.",
  keywords: [
    "fractional CMO",
    "AI operations",
    "growth marketing",
    "demand generation",
    "B2B marketing",
    "startup marketing",
  ],
  authors: [{ name: "Saren Sakurai" }],
  creator: "Saren Sakurai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saren.ai",
    siteName: "Saren.ai",
    title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
    description:
      "Building AI-driven growth engines for early-stage and Series A startups.",
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
    title: "Saren Sakurai | Fractional CMO & AI Operations Consultant",
    description:
      "Building AI-driven growth engines for early-stage and Series A startups.",
    images: ["/og-image.png"],
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
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <div className="sticky top-0 z-50">
            <TopBanner />
            <Header />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
