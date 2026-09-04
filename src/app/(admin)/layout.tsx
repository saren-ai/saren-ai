import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Saren.ai",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/chat", label: "Chat" },
  { href: "/admin/purchases", label: "Purchases" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-offblack text-foreground">
      <nav className="flex items-center gap-6 border-b border-border px-6 py-4">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm font-semibold hover:text-lavender">
            {item.label}
          </Link>
        ))}
        <a
          href="/desk"
          className="ml-auto text-sm text-foreground-muted hover:text-lavender"
        >
          Desk ↗
        </a>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
