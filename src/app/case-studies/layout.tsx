import PagefindBoundary from "@/components/search/PagefindBoundary";

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <PagefindBoundary section="Case Studies">{children}</PagefindBoundary>;
}
