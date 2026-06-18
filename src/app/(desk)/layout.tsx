import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desk — Saren.ai",
  robots: { index: false, follow: false },
};

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-offblack text-foreground">
      {children}
    </div>
  );
}
