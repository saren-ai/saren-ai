import PagefindBoundary from "@/components/search/PagefindBoundary";

export default function FeatureLayout({ children }: { children: React.ReactNode }) {
  return <PagefindBoundary section="Studio">{children}</PagefindBoundary>;
}
