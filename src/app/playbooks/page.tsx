import { getActivePlaybooks } from '@/lib/playbooks';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedNavFramer } from '@/components/ui/navigation-menu';

export const metadata = {
    title: 'Playbooks | Saren.ai',
    description: 'A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.',
    openGraph: {
        title: 'Playbooks | Saren.ai',
        description: 'A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.',
        url: 'https://saren.ai/playbooks',
        siteName: 'Saren.ai',
        images: [
            {
                url: '/og/playbooks.jpg',
                width: 1200,
                height: 630,
                alt: 'saren.ai Prompt Playbooks',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Playbooks | Saren.ai',
        description: 'A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.',
        images: ['/og/playbooks.jpg'],
    },
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

    const jsonLdItems = playbooks.map((pb, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://saren.ai/playbooks/${pb.playbook_id}`,
        "name": pb.title
    }));

    return (
        <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://saren.ai/playbooks/#webpage",
            "url": "https://saren.ai/playbooks",
            "name": "Playbooks | Saren.ai",
            "description": "A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.",
            "isPartOf": { "@id": "https://saren.ai/#website" },
            "author": { "@id": "https://saren.ai/#person" },
            "inLanguage": "en-US",
            "dateModified": "2026-04-01"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
              { "@type": "ListItem", "position": 2, "name": "Playbooks", "item": "https://saren.ai/playbooks" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://saren.ai/playbooks/#list",
            "name": "AI Prompt Playbooks by Saren Sakurai",
            "description": "A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks for B2B marketing, sales, and GTM execution.",
            "author": { "@id": "https://saren.ai/#person" },
            "numberOfItems": playbooks.length,
            "itemListElement": jsonLdItems
          })
        }}
      />
        <div className="min-h-screen bg-ash dark:bg-offblack text-charcoal dark:text-white pt-32 pb-16 px-6 lg:px-12 relative transition-colors duration-300">
            <AnimatedNavFramer items={navItems} />

            <div className="max-w-6xl mx-auto space-y-12">
                <header className="space-y-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-br from-charcoal to-slate dark:from-white dark:to-slate bg-clip-text text-transparent">
                        Playbooks
                    </h1>
                    <p className="text-lg text-slate dark:text-slate max-w-2xl mx-auto">
                        A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.
                    </p>
                </header>

                <div className="space-y-16">
                    {categoryNames.length === 0 && (
                        <div className="text-center text-slate dark:text-slate py-12">
                            No playbooks found for this category.
                        </div>
                    )}
                    {categoryNames.map((cat) => (
                        <section key={cat} className="space-y-6 scroll-mt-32" id={cat}>
                            <h2 className="text-2xl font-semibold tracking-wide border-b border-charcoal/10 dark:border-charcoal/10 pb-2">
                                {cat}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories[cat].map((playbook) => (
                                    <Link href={`/playbooks/${playbook.playbook_id}`} key={playbook.playbook_id} className="group h-full">
                                        <div className="h-full bg-white dark:bg-charcoal/5 border border-charcoal/10 dark:border-charcoal/10 rounded-xl p-6 transition-all duration-300 hover:bg-ash dark:hover:bg-charcoal/10 hover:border-lavender/50 dark:hover:border-lavender/30 hover:shadow-lg hover:-translate-y-1 flex flex-col relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-5 group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity">
                                                <ArrowRight className="w-12 h-12 text-charcoal dark:text-white" />
                                            </div>

                                            <div className="flex-grow space-y-3 z-10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-charcoal/5 dark:bg-charcoal/5 text-charcoal dark:text-ash/70">
                                                        {playbook.steps.length} {playbook.steps.length === 1 ? 'Step' : 'Steps'}
                                                    </span>
                                                    {playbook.skill && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ember/10 dark:bg-ember/10 text-ember dark:text-ember border border-ember/20 dark:border-ember/20">
                                                            Skill
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-medium text-charcoal dark:text-white group-hover:text-lavender dark:group-hover:text-lavender transition-colors">
                                                    {playbook.title}
                                                </h3>
                                                <p className="text-sm text-slate dark:text-slate line-clamp-3 leading-relaxed">
                                                    {playbook.description}
                                                </p>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-charcoal/10 dark:border-charcoal/10 flex flex-wrap gap-2 z-10">
                                                {playbook.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-xs text-slate dark:text-slate bg-charcoal/5 dark:bg-charcoal/5 px-2 py-1 rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {playbook.tags.length > 3 && (
                                                    <span className="text-xs text-slate dark:text-slate bg-charcoal/5 dark:bg-charcoal/5 px-2 py-1 rounded-md">
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
        </>
    );
}
