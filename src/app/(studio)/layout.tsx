import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — Saren.ai",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-offblack text-foreground">
      {children}
    </div>
  );
}
