import { cookies } from 'next/headers';
import { getActivePlaybooks, getPlaybookWithContent } from '@/lib/playbooks';
import { PAID_TIERS } from '@/lib/playbook-tiers';
import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { marked } from 'marked';
import CopyButton from './CopyButton';
import DownloadSkillButton from './DownloadSkillButton';
import { BuyButton } from './BuyButton';
import { DownloadButton } from './DownloadButton';
import { GatedTeaser } from './GatedTeaser';
import { AnimatedNavFramer } from '@/components/ui/navigation-menu';
import { ProspectTable } from './ProspectTable';
import type { Playbook } from '@/lib/playbooks';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import { buildGraph, articleId, webPageId, howToId, ID } from '@/lib/schema';

// ---------------------------------------------------------------------------
// Access check — one lookup, one result, drives both the gate and the button
// ---------------------------------------------------------------------------

type Access =
  | { state: 'free' }
  | { state: 'locked' }
  | { state: 'owned'; downloadToken: string };

async function getAccess(playbook: Playbook): Promise<Access> {
  if (!playbook.paid) return { state: 'free' };

  const cookieToken = (await cookies()).get(`dlx_${playbook.playbook_id}`)?.value;
  if (!cookieToken) return { state: 'locked' };

  // Admin client required — entitlements table has RLS with no anon read policy
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('entitlements')
    .select('download_token, expires_at')
    .eq('playbook_id', playbook.playbook_id)
    .eq('cookie_token', cookieToken)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();

  if (!data) return { state: 'locked' };
  return { state: 'owned', downloadToken: data.download_token };
}

// ---------------------------------------------------------------------------
// Static params — free playbooks still pre-render; paid ones become dynamic
// once cookies() is actually called (Next.js opt-out is call-site, not import)
// ---------------------------------------------------------------------------

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
            // images intentionally omitted — opengraph-image.tsx generates them
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${playbook.title} | Playbooks | Saren.ai`,
            description: playbook.description,
        },
    };
}

function cleanMarkdown(content: string, stepTitle: string): string {
    if (!content) return '';

    const lines = content.split('\n');
    let inList = false;
    let titleStripped = false;

    const cleanedLines = lines.map((line, index) => {
        let trimmed = line.trim();

        if (/^#{1,6}\s*#{1,6}/.test(trimmed)) {
            let level = 0;
            let text = trimmed;
            text = text.replace(/^[#\s]+/, '');
            const match = trimmed.match(/^(#{1,6})/);
            if (match) {
                level = match[1].length;
                trimmed = `${'#'.repeat(level)} ${text}`;
            }
        }

        if (!titleStripped && index < 5 && /^#{1,4}\s/.test(trimmed)) {
            const headerText = trimmed.replace(/^#{1,4}\s+/, '').trim().toLowerCase();
            const cleanStepTitle = stepTitle.toLowerCase().trim();
            if (headerText.includes(cleanStepTitle) || cleanStepTitle.includes(headerText) ||
                (index > 0 && trimmed === lines[index - 1]?.trim())) {
                titleStripped = true;
                return '';
            }
        }

        const listMatch = trimmed.match(/^([*+-])([^\s*+-])/);
        if (listMatch) {
            return trimmed.replace(/^([*+-])([^\s*+-])/, '- $2');
        }

        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
            inList = true;
            return trimmed;
        } else if (trimmed === '' && inList) {
            return trimmed;
        } else if (trimmed !== '') {
            inList = false;
        }

        return line;
    });

    let finalMarkdown = cleanedLines.join('\n');
    finalMarkdown = finalMarkdown.replace(/(?<!\!)\[([A-Za-z0-9\s_-]+)\](?!\()/g, '<span class="text-red-400 bg-red-500/10 border border-red-500/20 px-1 py-0.5 rounded-md font-bold mx-0.5 tracking-tight">[$1]</span>');
    return finalMarkdown;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PlaybookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const playbook = await getPlaybookWithContent(resolvedParams.id);

    if (!playbook) {
        notFound();
    }

    // Merge paid tier config (catalog JSON doesn't carry this)
    const paidTier = PAID_TIERS[playbook.playbook_id];
    if (paidTier) playbook.paid = paidTier;

    // Single entitlement check — result drives both gated content and CTA
    const access = await getAccess(playbook);

    // Parse markdown only when steps will actually render
    const parsedSteps = access.state !== 'locked'
        ? await Promise.all(
            playbook.steps.map(async (step) => {
                const cleaned = step.content ? cleanMarkdown(step.content, step.title) : '';
                const parsedContent = cleaned ? await marked.parse(cleaned) : '*No content available for this step.*';
                return { ...step, parsedContent };
            })
        )
        : [];

    const allPlaybooks = await getActivePlaybooks();
    const allUniqueCategories = Array.from(new Set(allPlaybooks.map(pb => pb.category))).sort();

    const navItems = [
        { name: "All", href: "/playbooks" },
        ...allUniqueCategories.map(cat => ({
            name: cat,
            href: `/playbooks?category=${encodeURIComponent(cat)}`
        }))
    ];

    const path = `/playbooks/${playbook.playbook_id}`;
    const trail = [
        { href: '/', label: 'Home' },
        { href: '/playbooks', label: 'Playbooks' },
        { label: playbook.title },
    ];

    // Tag → DefinedTerm mapping is shared by `about` and `teaches` below.
    const tagTerms = playbook.tags.map((tag) => ({ '@type': 'DefinedTerm', name: tag }));

    // Hand-built (not via buildGraph's `article` helper) because this Article node
    // carries fields — abstract, keywords, teaches, isAccessibleForFree, offers,
    // articleSection — the shared articleNode() builder doesn't model, and several
    // are conditional on DB-backed playbook state that must be preserved exactly.
    const articleNode = {
        '@type': 'Article',
        '@id': articleId(path),
        headline: playbook.title,
        description: playbook.description,
        abstract: playbook.description,
        url: `https://saren.ai${path}`,
        image: {
            '@type': 'ImageObject',
            url: 'https://saren.ai/images/og/home.png',
            width: 1200,
            height: 630,
        },
        author: { '@id': ID.person },
        publisher: { '@id': ID.organization },
        mainEntityOfPage: { '@id': webPageId(path) },
        keywords: playbook.tags.join(', '),
        about: tagTerms,
        teaches: tagTerms,
        isAccessibleForFree: !playbook.paid,
        ...(playbook.paid && {
            offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                seller: { '@id': ID.person },
            },
        }),
        ...(playbook.date && { datePublished: `${playbook.date}T00:00:00Z` }),
        dateModified: '2026-04-01T00:00:00Z',
        inLanguage: 'en-US',
        articleSection: playbook.category,
    };

    // Locked (paid, unpurchased) pages only ever show a step count via
    // GatedTeaser — step titles and content never enter the rendered HTML — so
    // the HowTo node (which lists both) must not be emitted while locked.
    const howToNode = access.state !== 'locked' && playbook.steps.length > 0 ? {
        '@type': 'HowTo',
        '@id': howToId(path),
        name: playbook.title,
        description: playbook.description,
        tool: { '@type': 'HowToTool', name: 'Claude AI' },
        step: playbook.steps.map((step, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: step.title,
            text: step.content ? step.content.replace(/[#*`]/g, '').slice(0, 300) : step.title,
        })),
    } : null;

    const graph = buildGraph({
        path,
        name: playbook.title,
        description: playbook.description,
        breadcrumb: trail,
        extra: [articleNode, ...(howToNode ? [howToNode] : [])],
    });

    return (
        <div className="min-h-screen bg-ash dark:bg-offblack text-charcoal dark:text-white pt-32 pb-20 px-6 lg:px-12 selection:bg-lavender/30 dark:selection:bg-lavender/30 relative transition-colors duration-300">
            <JsonLd schema={graph} />
            <div className="max-w-4xl mx-auto mb-4">
                <Breadcrumb trail={trail} />
            </div>
            <AnimatedNavFramer items={navItems} activeCategory={playbook.category} />
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header — always visible */}
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
                            {access.state === 'free' && playbook.steps.length > 0 && (
                                <span className="text-sm text-slate dark:text-slate font-medium">
                                    {playbook.steps.length} Steps
                                </span>
                            )}
                            {playbook.paid && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-ember/10 text-ember border border-ember/20">
                                    Premium
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-charcoal dark:text-white">
                            {playbook.title}
                        </h1>
                        <p className="text-lg text-slate dark:text-slate leading-relaxed max-w-3xl">
                            {playbook.description}
                        </p>

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

                {/* ----------------------------------------------------------------
                    Three-state gate. The && short-circuit is the security boundary:
                    gated content never enters the RSC payload when state === locked.
                ---------------------------------------------------------------- */}

                {access.state === 'free' && (
                    <div className="space-y-12">
                        {parsedSteps.map((step, index) => (
                            <div
                                key={index}
                                className="relative p-6 lg:p-10 bg-white dark:bg-charcoal/5 border border-charcoal/10 dark:border-charcoal/10 rounded-2xl shadow-xl overflow-hidden transition-colors"
                                id={`step-${step.step}`}
                            >
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
                                        dangerouslySetInnerHTML={{ __html: step.parsedContent }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {access.state === 'locked' && (
                    <div className="space-y-8">
                        <GatedTeaser playbook={playbook} priceCents={paidTier!.priceCents} />
                        <div className="flex justify-center">
                            <BuyButton playbookId={playbook.playbook_id} />
                        </div>
                    </div>
                )}

                {access.state === 'owned' && (
                    <div className="space-y-12">
                        {parsedSteps.map((step, index) => (
                            <div
                                key={index}
                                className="relative p-6 lg:p-10 bg-white dark:bg-charcoal/5 border border-charcoal/10 dark:border-charcoal/10 rounded-2xl shadow-xl overflow-hidden transition-colors"
                                id={`step-${step.step}`}
                            >
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
                                        dangerouslySetInnerHTML={{ __html: step.parsedContent }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center pt-4 border-t border-charcoal/10 dark:border-charcoal/10">
                            <DownloadButton token={access.downloadToken} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
