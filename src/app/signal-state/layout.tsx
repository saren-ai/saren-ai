import PagefindBoundary from "@/components/search/PagefindBoundary";

export default function SignalStateLayout({ children }: { children: React.ReactNode }) {
  return <PagefindBoundary section="Signal State">{children}</PagefindBoundary>;
}
