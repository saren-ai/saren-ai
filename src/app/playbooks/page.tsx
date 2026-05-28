import { getActivePlaybooks } from '@/lib/playbooks';
import { INTERACTIVE_TOOLS } from '@/lib/interactive-tools';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedNavFramer } from '@/components/ui/navigation-menu';

export const metadata = {
    title: 'Playbook Library | Saren.ai',
    description: 'A curated library of advanced prompt sequences, structured frameworks, interactive tools, and multi-step AI playbooks to accelerate execution.',
    openGraph: {
        title: 'Playbook Library | Saren.ai',
        description: 'A curated library of advanced prompt sequences, structured frameworks, interactive tools, and multi-step AI playbooks to accelerate execution.',
        url: 'https://saren.ai/playbooks',
        siteName: 'Saren.ai',
        images: [
            {
                url: '/og/playbooks.jpg',
                width: 1200,
                height: 630,
                alt: 'saren.ai Playbook Library',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Playbook Library | Saren.ai',
        description: 'A curated library of advanced prompt sequences, structured frameworks, interactive tools, and multi-step AI playbooks to accelerate execution.',
        images: ['/og/playbooks.jpg'],
    },
};

const accentClasses = {
    ember: {
        badge: "bg-ember/10 text-ember",
        dot: "bg-ember",
        border: "hover:border-ember/40",
        bar: "bg-ember",
    },
    lavender: {
        badge: "bg-lavender/10 text-lavender",
        dot: "bg-lavender",
        border: "hover:border-lavender/40",
        bar: "bg-lavender",
    },
    copper: {
        badge: "bg-copper/10 text-copper",
        dot: "bg-copper",
        border: "hover:border-copper/40",
        bar: "bg-copper",
    },
};

export default async function PlaybooksIndex({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; type?: string }>;
}) {
    const playbooks = await getActivePlaybooks();
    const resolvedSearchParams = await searchParams;
    const currentCategory = resolvedSearchParams.category;
    const isToolsTab = resolvedSearchParams.type === 'tools';

    // Category nav for current tab
    const navItems = isToolsTab
        ? [
              { name: "All", href: "/playbooks?type=tools" },
              ...Array.from(new Set(INTERACTIVE_TOOLS.map((t) => t.category)))
                  .sort()
                  .map((cat) => ({
                      name: cat,
                      href: `/playbooks?type=tools&category=${encodeURIComponent(cat)}`,
                  })),
          ]
        : [
              { name: "All", href: "/playbooks" },
              ...Array.from(new Set(playbooks.map((pb) => pb.category)))
                  .sort()
                  .map((cat) => ({
                      name: cat,
                      href: `/playbooks?category=${encodeURIComponent(cat)}`,
                  })),
          ];

    // Filtered content
    const filteredPlaybooks = isToolsTab
        ? []
        : currentCategory
          ? playbooks.filter((pb) => pb.category === currentCategory)
          : playbooks;

    const filteredTools = isToolsTab
        ? currentCategory
            ? INTERACTIVE_TOOLS.filter((t) => t.category === currentCategory)
            : INTERACTIVE_TOOLS
        : [];

    const categories = filteredPlaybooks.reduce(
        (acc, pb) => {
            if (!acc[pb.category]) acc[pb.category] = [];
            acc[pb.category].push(pb);
            return acc;
        },
        {} as Record<string, typeof playbooks>,
    );
    const categoryNames = Object.keys(categories).sort();

    const jsonLdItems = playbooks.map((pb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://saren.ai/playbooks/${pb.playbook_id}`,
        name: pb.title,
    }));

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        '@id': 'https://saren.ai/playbooks/#webpage',
                        url: 'https://saren.ai/playbooks',
                        name: 'Playbook Library | Saren.ai',
                        description:
                            'A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.',
                        isPartOf: { '@id': 'https://saren.ai/#website' },
                        author: { '@id': 'https://saren.ai/#person' },
                        inLanguage: 'en-US',
                        dateModified: '2026-05-28',
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://saren.ai' },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Playbook Library',
                                item: 'https://saren.ai/playbooks',
                            },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        '@id': 'https://saren.ai/playbooks/#list',
                        name: 'AI Prompt Playbooks by Saren Sakurai',
                        description:
                            'A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks for B2B marketing, sales, and GTM execution.',
                        author: { '@id': 'https://saren.ai/#person' },
                        numberOfItems: playbooks.length,
                        itemListElement: jsonLdItems,
                    }),
                }}
            />

            <div className="min-h-screen bg-ash dark:bg-offblack text-charcoal dark:text-white pt-32 pb-16 px-6 lg:px-12 relative transition-colors duration-300">
                {/* Type toggle */}
                <div className="max-w-6xl mx-auto mb-4 flex gap-2">
                    <Link
                        href="/playbooks"
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                            !isToolsTab
                                ? 'bg-lavender text-white'
                                : 'bg-card border border-border text-foreground hover:border-lavender/40 hover:text-lavender'
                        }`}
                    >
                        Playbooks
                    </Link>
                    <Link
                        href="/playbooks?type=tools"
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                            isToolsTab
                                ? 'bg-lavender text-white'
                                : 'bg-card border border-border text-foreground hover:border-lavender/40 hover:text-lavender'
                        }`}
                    >
                        Interactive Tools
                    </Link>
                </div>

                <AnimatedNavFramer items={navItems} />

                <div className="max-w-6xl mx-auto space-y-12">
                    <header className="space-y-4 text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-br from-charcoal to-slate dark:from-white dark:to-slate bg-clip-text text-transparent">
                            {isToolsTab ? 'Interactive Tools' : 'Playbook Library'}
                        </h1>
                        <p className="text-lg text-slate dark:text-slate max-w-2xl mx-auto">
                            {isToolsTab
                                ? 'Calculators, scoring models, and live frameworks you can run right now — no setup required.'
                                : 'A curated library of advanced prompt sequences, structured frameworks, and multi-step AI playbooks to accelerate execution.'}
                        </p>
                    </header>

                    {isToolsTab ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.length === 0 && (
                                <div className="col-span-full text-center text-slate py-12">
                                    No tools found for this category.
                                </div>
                            )}
                            {filteredTools.map((tool) => {
                                const accent = accentClasses[tool.accentColor];
                                return (
                                    <div
                                        key={tool.id}
                                        className={`flex flex-col p-6 bg-card rounded-2xl border border-border ${accent.border} transition-all duration-200 relative overflow-hidden`}
                                    >
                                        <div
                                            className={`absolute top-0 left-0 right-0 h-1 ${accent.bar} rounded-t-2xl`}
                                        />
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <span
                                                className={`text-xs font-bold px-2.5 py-1 rounded-full ${accent.badge}`}
                                            >
                                                {tool.category}
                                            </span>
                                            <span className="text-[10px] text-slate uppercase tracking-wide pt-1">
                                                Interactive
                                            </span>
                                        </div>
                                        <h2 className="text-lg font-bold text-charcoal dark:text-foreground mb-2 leading-snug">
                                            {tool.name}
                                        </h2>
                                        <p className="text-slate dark:text-foreground-muted text-sm leading-relaxed mb-5">
                                            {tool.tagline}
                                        </p>
                                        <ul className="space-y-2 mb-6 flex-1">
                                            {tool.items.map((bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="flex items-start gap-2 text-xs text-slate dark:text-foreground-muted"
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-1 shrink-0`}
                                                    />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href={tool.href}
                                            className="btn-secondary inline-flex items-center gap-2 justify-center text-sm py-3"
                                        >
                                            Open Tool
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {categoryNames.length === 0 && (
                                <div className="text-center text-slate py-12">
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
                                            <Link
                                                href={`/playbooks/${playbook.playbook_id}`}
                                                key={playbook.playbook_id}
                                                className="group h-full"
                                            >
                                                <div className="h-full bg-white dark:bg-charcoal/5 border border-charcoal/10 dark:border-charcoal/10 rounded-xl p-6 transition-all duration-300 hover:bg-ash dark:hover:bg-charcoal/10 hover:border-lavender/50 dark:hover:border-lavender/30 hover:shadow-lg hover:-translate-y-1 flex flex-col relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-5 group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity">
                                                        <ArrowRight className="w-12 h-12 text-charcoal dark:text-white" />
                                                    </div>

                                                    <div className="flex-grow space-y-3 z-10">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lavender/10 text-lavender">
                                                                {playbook.category}
                                                            </span>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-charcoal/5 dark:bg-charcoal/5 text-charcoal dark:text-ash/70">
                                                                {playbook.steps.length}{' '}
                                                                {playbook.steps.length === 1 ? 'Step' : 'Steps'}
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
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
