import { unstable_cache } from "next/cache";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PagefindProvider } from "@/components/search/PagefindProvider";
import { SearchProvider } from "@/components/search/SearchContext";
import SearchModal from "@/components/search/SearchModal";
import SiteHotkeys from "@/components/search/SiteHotkeys";
import { getLatestSubstackPosts } from "@/lib/substack-rss";

const getCachedLatestPost = unstable_cache(
  async () => {
    const posts = await getLatestSubstackPosts(1);
    return posts.length > 0 ? posts[0] : null;
  },
  ["substack-latest-post"],
  { revalidate: 3600 }
);

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const latestPost = await getCachedLatestPost();

  return (
    <PagefindProvider>
      <SearchProvider>
        <SiteHotkeys />
        <SearchModal />
        <div className="sticky top-0 z-50 bg-background">
          <Header latestPost={latestPost} />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </SearchProvider>
    </PagefindProvider>
  );
}
