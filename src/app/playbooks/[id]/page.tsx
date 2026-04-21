import { getActivePlaybooks, getPlaybookWithContent } from '@/lib/playbooks';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { marked } from 'marked';
import CopyButton from './CopyButton';
import DownloadSkillButton from './DownloadSkillButton';
import { AnimatedNavFramer } from '@/components/ui/navigation-menu';
import { ProspectTable } from './ProspectTable';

export async function generateStaticParams() {
    const playbooks = await getActivePlaybooks();
    return playbooks.map((pb) => ({
        id: pb.playbook_id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const playbook = await getPlaybookWithContent(resolvedParams.id);

    if (!playbook) {
        return { title: 'Playbook Not Found' };
    }

    return {
        title: `${playbook.title} | Playbooks`,
        description: playbook.description,
        alternates: { canonical: `https://saren.ai/playbooks/${playbook.playbook_id}` },
        openGraph: {
            title: `${playbook.title} | Playbooks | Saren.ai`,
            description: playbook.description,
            url: `https://saren.ai/playbooks/${playbook.playbook_id}`,
            siteName: 'Saren.ai',
            images: [
                {
                    url: `/og/playbooks-${playbook.playbook_id}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: playbook.title,
                },
            ],
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${playbook.title} | Playbooks | Saren.ai`,
            description: playbook.description,
            images: [`/og/playbooks-${playbook.playbook_id}.jpg`],
        },
    };
}

function cleanMarkdown(content: string, stepTitle: string): string {
    if (!content) return '';

    // Split into lines for more precise processing
    const lines = content.split('\n');
    let inList = false;
    let titleStripped = false;

    const cleanedLines = lines.map((line, index) => {
        let trimmed = line.trim();

        // 1. Fix massive double hash headers like "## ### PROMPT 1" or "# ## Title"
        if (/^#{1,6}\s*#{1,6}/.test(trimmed)) {
            let level = 0;
            let text = trimmed;

            // Strip out all leading hashes and spaces to get the text
            text = text.replace(/^[#\s]+/, '');

            // Determine level by the first block of hashes
            const match = trimmed.match(/^(#{1,6})/);
            if (match) {
                level = match[1].length;
                trimmed = `${'#'.repeat(level)} ${text}`;
            }
        }

        // 1b. Strip out the step title if it appears as an H1 or H2 at the top of the markdown,
        // as Next.js already renders the step title in the UI above this markdown block.
        if (!titleStripped && index < 5 && /^#{1,4}\s/.test(trimmed)) {
            const headerText = trimmed.replace(/^#{1,4}\s+/, '').trim().toLowerCase();
            const cleanStepTitle = stepTitle.toLowerCase().trim();

            // Check if it matches step title, or if it's identical to the previous line (duplicate titles)
            if (headerText.includes(cleanStepTitle) || cleanStepTitle.includes(headerText) ||
                (index > 0 && trimmed === lines[index - 1]?.trim())) {
                titleStripped = true;
                return ''; // Drop it
            }
        }

        // 2. Fix lists missing spaces after asterisks or dashes e.g. "*Item" -> "* Item"
        const listMatch = trimmed.match(/^([*+-])([^\s*+-])/);
        if (listMatch) {
            return trimmed.replace(/^([*+-])([^\s*+-])/, '- $2');
        }

        // 3. Ensure list items have proper spacing to be recognized by marked
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
            inList = true;
            return trimmed;
        } else if (trimmed === '' && inList) {
            // keep empty lines inside lists
            return trimmed;
        } else if (trimmed !== '') {
            inList = false;
        }

        return line; // Return original if no modification needed
    });

    let finalMarkdown = cleanedLines.join('\n');

    // Highlight [bracketed] variables
    finalMarkdown = finalMarkdown.replace(/(?<!\!)\[([A-Za-z0-9\s_-]+)\](?!\()/g, '<span class="text-red-400 bg-red-500/10 border border-red-500/20 px-1 py-0.5 rounded-md font-bold mx-0.5 tracking-tight">[$1]</span>');

    return finalMarkdown;
}

export default async function PlaybookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const playbook = await getPlaybookWithContent(resolvedParams.id);

    if (!playbook) {
        notFound();
    }

    // Pre-parse markdown here so we don't have async calls inside the JSX
    const parsedSteps = await Promise.all(
        playbook.steps.map(async (step) => {
            const cleaned = step.content ? cleanMarkdown(step.content, step.title) : '';
            const parsedContent = cleaned ? await marked.parse(cleaned) : '*No content available for this step.*';
            return {
                ...step,
                parsedContent
            };
        })
    );

    const allPlaybooks = await getActivePlaybooks();
    const allUniqueCategories = Array.from(new Set(allPlaybooks.map(pb => pb.category))).sort();

    const navItems = [
        { name: "All", href: "/playbooks" },
        ...allUniqueCategories.map(cat => ({
            name: cat,
            href: `/playbooks?category=${encodeURIComponent(cat)}`
        }))
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `https://saren.ai/playbooks/${playbook.playbook_id}/#article`,
        "headline": playbook.title,
        "description": playbook.description,
        "url": `https://saren.ai/playbooks/${playbook.playbook_id}`,
        "image": {
            "@type": "ImageObject",
            "url": `https://saren.ai/og/playbooks-${playbook.playbook_id}.jpg`,
            "width": 1200,
            "height": 630
        },
        "author": { "@id": "https://saren.ai/#person" },
        "publisher": { "@id": "https://saren.ai/#person" },
        "mainEntityOfPage": { "@id": `https://saren.ai/playbooks/${playbook.playbook_id}/#webpage` },
        "keywords": playbook.tags.join(", "),
        "dateModified": "2026-04-01",
        "inLanguage": "en-US",
        "articleSection": playbook.category
    };

    const webPageLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `https://saren.ai/playbooks/${playbook.playbook_id}/#webpage`,
        "url": `https://saren.ai/playbooks/${playbook.playbook_id}`,
        "name": playbook.title,
        "description": playbook.description,
        "isPartOf": { "@id": "https://saren.ai/#website" },
        "about": { "@id": "https://saren.ai/#person" },
        "author": { "@id": "https://saren.ai/#person" },
        "inLanguage": "en-US"
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saren.ai" },
            { "@type": "ListItem", "position": 2, "name": "Playbooks", "item": "https://saren.ai/playbooks" },
            { "@type": "ListItem", "position": 3, "name": playbook.title, "item": `https://saren.ai/playbooks/${playbook.playbook_id}` }
        ]
    };

    return (
        <div className="min-h-screen bg-ash dark:bg-offblack text-charcoal dark:text-white pt-32 pb-20 px-6 lg:px-12 selection:bg-lavender/30 dark:selection:bg-lavender/30 relative transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <AnimatedNavFramer items={navItems} activeCategory={playbook.category} />
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Navigation & Header */}
                <div className="space-y-6">
                    <Link
                        href="/playbooks"
                        className="inline-flex items-center text-sm font-medium text-slate dark:text-slate hover:text-charcoal dark:hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Playbooks
                    </Link>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-lavender/10 dark:bg-lavender/10 text-lavender dark:text-lavender border border-lavender/20 dark:border-lavender/20">
                                {playbook.category}
                            </span>
                            <span className="text-sm text-slate dark:text-slate font-medium">
                                {playbook.steps.length} Steps
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-white">
                            {playbook.title}
                        </h1>
                        <p className="text-lg text-slate dark:text-slate leading-relaxed max-w-3xl">
                            {playbook.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {playbook.tags.map(tag => (
                                <span key={tag} className="text-xs text-slate dark:text-slate bg-charcoal/5 dark:bg-charcoal/5 px-2.5 py-1 rounded-md border border-charcoal/10 dark:border-charcoal/10">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {playbook.skill && (
                            <div className="pt-2">
                                <DownloadSkillButton skillPath={playbook.skill} />
                                <p className="text-xs text-slate dark:text-slate mt-2">
                                    Save to <code className="text-lavender dark:text-lavender bg-lavender/10 dark:bg-lavender/10 px-1 py-0.5 rounded text-[11px]">.claude/commands/</code> to use as a slash command in Claude Code.
                                </p>
                            </div>
                        )}

                        {playbook.playbook_id === "linkedin-prospect-dashboard" && (
                            <ProspectTable />
                        )}
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-charcoal/10 via-charcoal/20 to-charcoal/10 dark:from-charcoal/10 dark:via-charcoal/20 dark:to-charcoal/10" />

                {/* Steps Content */}
                <div className="space-y-12">
                    {parsedSteps.map((step, index) => (
                        <div
                            key={index}
                            className="relative p-6 lg:p-10 bg-white dark:bg-charcoal/5 border border-charcoal/10 dark:border-charcoal/10 rounded-2xl shadow-xl overflow-hidden transition-colors"
                            id={`step-${step.step}`}
                        >
                            {/* Step Number Indicator */}
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="text-8xl font-black">{step.step}</span>
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="pb-4 border-b border-charcoal/10 dark:border-charcoal/5 flex justify-between items-start gap-4">
                                    <div>
                                        <span className="text-sm font-bold text-lavender dark:text-lavender uppercase tracking-widest mb-1 block">
                                            Step {step.step}
                                        </span>
                                        <h2 className="text-2xl font-bold text-charcoal dark:text-white">
                                            {step.title}
                                        </h2>
                                    </div>
                                    {!(playbook.playbook_id === 'linkedin-prospect-dashboard' && step.step === 1) && (
                                        <div className="pt-2 shrink-0">
                                            <CopyButton textToCopy={step.content || ''} />
                                        </div>
                                    )}
                                </div>


                                <div
                                    className="prose dark:prose-invert max-w-none 
                                    prose-headings:text-charcoal dark:prose-headings:text-ash 
                                    prose-p:text-slate dark:prose-p:text-ash/70 prose-p:leading-relaxed
                                    prose-a:text-lavender dark:prose-a:text-lavender prose-a:no-underline hover:prose-a:underline
                                    prose-code:text-lavender dark:prose-code:text-lavender prose-code:bg-lavender/10 dark:prose-code:bg-lavender/10 prose-code:before:content-none prose-code:after:content-none prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                    prose-pre:bg-ash dark:prose-pre:bg-offblack prose-pre:border prose-pre:border-charcoal/10 dark:prose-pre:border-charcoal/10 prose-pre:shadow-inner
                                    prose-blockquote:border-l-electric dark:prose-blockquote:border-l-electric prose-blockquote:bg-lavender/5 dark:prose-blockquote:bg-lavender/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:-ml-4 prose-blockquote:rounded-r-lg
                                    prose-strong:text-charcoal dark:prose-strong:text-ash"
                                    dangerouslySetInnerHTML={{
                                        __html: step.parsedContent
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
