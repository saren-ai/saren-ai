import { getActivePlaybooks } from '@/lib/playbooks';
import Link from 'next/link';
import { AnimatedNavFramer } from '@/components/ui/navigation-menu';

export const metadata = {
    title: 'Playbooks | Saren.ai',
    description: 'Advanced prompt sequences and playbooks.',
};

export default async function PlaybooksIndex({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const playbooks = await getActivePlaybooks();
    const resolvedSearchParams = await searchParams;
    const currentCategory = resolvedSearchParams.category;

    // Filter playbooks by selected category, if any
    const filteredPlaybooks = currentCategory
        ? playbooks.filter(pb => pb.category === currentCategory)
        : playbooks;

    // Group by category
    const categories = filteredPlaybooks.reduce((acc, pb) => {
        if (!acc[pb.category]) acc[pb.category] = [];
        acc[pb.category].push(pb);
        return acc;
    }, {} as Record<string, typeof playbooks>);

    const categoryNames = Object.keys(categories).sort();

    // Define navigation items dynamically based on all available categories
    // or just hardcoded to the ones the user requested if preferred:
    const allUniqueCategories = Array.from(new Set(playbooks.map(pb => pb.category))).sort();

    const navItems = [
        { name: "All", href: "/playbooks" },
        ...allUniqueCategories.map(cat => ({
            name: cat,
            href: `/playbooks?category=${encodeURIComponent(cat)}`
        }))
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-16 px-6 lg:px-12 relative">
            <AnimatedNavFramer items={navItems} />

            <div className="max-w-6xl mx-auto space-y-12">
                <header className="space-y-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
                        Playbooks
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.
                    </p>
                </header>

                <div className="space-y-16">
                    {categoryNames.length === 0 && (
                        <div className="text-center text-neutral-500 py-12">
                            No playbooks found for this category.
                        </div>
                    )}
                    {categoryNames.map((cat) => (
                        <section key={cat} className="space-y-6 scroll-mt-32" id={cat}>
                            <h2 className="text-2xl font-semibold tracking-wide border-b border-neutral-800 pb-2">
                                {cat}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories[cat].map((playbook) => (
                                    <Link href={`/playbooks/${playbook.playbook_id}`} key={playbook.playbook_id} className="group h-full">
                                        <div className="h-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 transition-all duration-300 hover:bg-neutral-800/80 hover:border-neutral-700 hover:shadow-lg hover:-translate-y-1 flex flex-col relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </div>

                                            <div className="flex-grow space-y-3 z-10">
                                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 mb-2">
                                                    {playbook.steps.length} Steps
                                                </div>
                                                <h3 className="text-xl font-medium text-white group-hover:text-blue-400 transition-colors">
                                                    {playbook.title}
                                                </h3>
                                                <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                                                    {playbook.description}
                                                </p>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap gap-2 z-10">
                                                {playbook.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-900/80 px-2 py-1 rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {playbook.tags.length > 3 && (
                                                    <span className="text-xs text-neutral-500 bg-neutral-900/80 px-2 py-1 rounded-md">
                                                        +{playbook.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
