import { getActivePlaybooks, getPlaybookWithContent } from '@/lib/playbooks';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { marked } from 'marked';
import CopyButton from './CopyButton';

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
            console.log(`[DEBUG] Cleaned length for step ${step.step}:`, cleaned.length);
            if (step.step === 1) {
                console.log(`[DEBUG] Step 1 snippet:`, cleaned.substring(0, 150));
            }
            const parsedContent = cleaned ? await marked.parse(cleaned) : '*No content available for this step.*';
            if (step.step === 1) {
                console.log(`[DEBUG] Step 1 PARSED HTML:`, parsedContent.substring(0, 150));
            }
            return {
                ...step,
                parsedContent
            };
        })
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-6 lg:px-12 selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Navigation & Header */}
                <div className="space-y-6">
                    <Link
                        href="/playbooks"
                        className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Playbooks
                    </Link>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {playbook.category}
                            </span>
                            <span className="text-sm text-neutral-500 font-medium">
                                {playbook.steps.length} Steps
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">
                            {playbook.title}
                        </h1>
                        <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl">
                            {playbook.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {playbook.tags.map(tag => (
                                <span key={tag} className="text-xs text-neutral-500 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />

                {/* Steps Content */}
                <div className="space-y-12">
                    {parsedSteps.map((step, index) => (
                        <div
                            key={index}
                            className="relative p-6 lg:p-10 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden"
                            id={`step-${step.step}`}
                        >
                            {/* Step Number Indicator */}
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="text-8xl font-black">{step.step}</span>
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="pb-4 border-b border-neutral-800/50 flex justify-between items-start gap-4">
                                    <div>
                                        <span className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1 block">
                                            Step {step.step}
                                        </span>
                                        <h2 className="text-2xl font-bold text-white">
                                            {step.title}
                                        </h2>
                                    </div>
                                    <div className="pt-2 shrink-0">
                                        <CopyButton textToCopy={step.content || ''} />
                                    </div>
                                </div>


                                <div
                                    className="prose prose-invert prose-blue max-w-none 
                                    prose-headings:text-neutral-200 
                                    prose-p:text-neutral-300 prose-p:leading-relaxed
                                    prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                    prose-code:text-blue-300 prose-code:bg-blue-900/20 prose-code:before:content-none prose-code:after:content-none prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                    prose-pre:bg-[#111] prose-pre:border prose-pre:border-neutral-800 prose-pre:shadow-inner
                                    prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-900/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:-ml-4 prose-blockquote:rounded-r-lg
                                    prose-strong:text-white"
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
