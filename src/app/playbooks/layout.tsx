import PagefindBoundary from "@/components/search/PagefindBoundary";

export default function PlaybooksLayout({ children }: { children: React.ReactNode }) {
  return <PagefindBoundary section="Playbooks">{children}</PagefindBoundary>;
}
