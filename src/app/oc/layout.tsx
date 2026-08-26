import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Saren Sakurai | GTM Engineer, Orange County",
  description:
    "Orange County GTM engineer. Fixed-price GTM audits and fractional marketing leadership for OC startups and revenue teams. Book 30 minutes.",
  alternates: { canonical: "https://saren.ai/oc" },
  openGraph: {
    title: "Saren Sakurai | GTM Engineer, Orange County",
    description:
      "Orange County GTM engineer. Fixed-price GTM audits and fractional marketing leadership for OC startups and revenue teams. Book 30 minutes.",
    images: ["/images/og/home.png"],
    type: "website",
  },
};

export default function OcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 border-b border-border" data-pagefind-ignore>
        <div className="container-narrow flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-gradient">saren.ai</span>
          </Link>
          <Link href="#book" className="btn-primary text-sm py-1.5 px-4">
            Book a Call
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="py-8 border-t border-border" data-pagefind-ignore>
        <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate dark:text-foreground-muted">
          <p>© {new Date().getFullYear()} Saren Sakurai. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/saren/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ember transition-colors"
            >
              LinkedIn
            </a>
            <a href="mailto:saren#saren.ai" className="hover:text-ember transition-colors">
              saren#saren.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
