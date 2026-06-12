import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Saren Sakurai",
  robots: { index: false, follow: false },
};

const recoveryLinks = [
  { href: "/case-studies", label: "Case Studies", description: "B2B proof narratives from Cylance, BlackBerry, and beyond" },
  { href: "/playbooks", label: "Playbook Library", description: "Prompt sequences and interactive marketing tools" },
  { href: "/about", label: "About Saren", description: "20+ years of demand generation and marketing systems" },
  { href: "/contact", label: "Contact", description: "Looking for something specific? Ask directly" },
];

export default function NotFound() {
  return (
    <section className="section min-h-[70vh] flex items-center">
      <div className="container-narrow text-center">
        <p className="font-mono text-ember text-sm mb-4 animate-fadeInUp">404</p>
        <h1 className="text-3xl md:text-5xl font-bold text-charcoal dark:text-foreground mb-4 animate-fadeInUp stagger-1">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-slate dark:text-foreground-muted max-w-xl mx-auto mb-12 animate-fadeInUp stagger-2">
          The URL may be outdated — this site has been through a few
          reorganizations. Here&apos;s where the good stuff lives now:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left animate-fadeInUp stagger-3">
          {recoveryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card p-6 hover:border-ember/40 transition-colors group"
            >
              <span className="font-semibold text-charcoal dark:text-foreground group-hover:text-ember transition-colors">
                {link.label} →
              </span>
              <p className="text-sm text-slate dark:text-foreground-muted mt-1">
                {link.description}
              </p>
            </Link>
          ))}
        </div>

        <p className="text-sm text-slate dark:text-foreground-muted mt-12 animate-fadeInUp stagger-4">
          Or head back to the{" "}
          <Link href="/" className="text-lavender hover:text-ember transition-colors font-semibold">
            homepage
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
