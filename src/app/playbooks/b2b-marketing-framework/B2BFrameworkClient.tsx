"use client";

import { useState, useMemo, useEffect } from "react";
import Link from 'next/link';
import FAQ from "@/components/ui/FAQ";
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { marked } from 'marked';
import CopyButton from '../[id]/CopyButton';

interface PromptStep {
    id: string;
    title: string;
    level: string;
    content: string;
    stepNumber: number;
}

interface B2BFrameworkClientProps {
    initialSteps: PromptStep[];
    variablesContent: string;
}

function extractVariables(content: string): string[] {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = Array.from(content.matchAll(regex));
    return Array.from(new Set(matches.map(m => m[1].trim())));
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

    const finalMarkdown = cleanedLines.join('\n');
    return finalMarkdown;
}

export default function B2BFrameworkClient({ initialSteps, variablesContent }: B2BFrameworkClientProps) {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [variables, setVariables] = useState<Record<string, string>>({});

    const allExpectedVariables = useMemo(() => {
        const vars = new Set<string>();
        initialSteps.forEach(step => {
            extractVariables(step.content).forEach(v => vars.add(v));
        });
        return Array.from(vars);
    }, [initialSteps]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('b2b-framework-variables');
        if (saved) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setVariables(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved variables", e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        if (Object.keys(variables).length > 0) {
            localStorage.setItem('b2b-framework-variables', JSON.stringify(variables));
        }
    }, [variables]);

    const handleVariableChange = (name: string, value: string) => {
        setVariables(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const activeStep = initialSteps[activeStepIndex];

    const stepVariables = useMemo(() => {
        return extractVariables(activeStep.content);
    }, [activeStep.content]);

    const processedContent = useMemo(() => {
        let content = activeStep.content;

        // Replace variables
        stepVariables.forEach(varName => {
            const value = variables[varName];
            if (value && value.trim() !== "") {
                const regex = new RegExp(`\\{\\{${varName}\\}\\}`, 'g');
                content = content.replace(regex, value);
            }
        });

        const cleaned = cleanMarkdown(content, activeStep.title);

        // Highlight remaining unreplaced variables or bracket variables
        let finalHtml = marked.parse(cleaned) as string;

        // Highlight {{variable}}
        finalHtml = finalHtml.replace(/\{\{([^}]+)\}\}/g, '<span class="text-ember bg-ember/10 border border-ember/20 px-1 py-0.5 rounded-md font-bold mx-0.5 tracking-tight">{{$1}}</span>');

        // Highlight [bracketed] variables
        finalHtml = finalHtml.replace(/(?<!\!)\[([A-Za-z0-9\s_-]+)\](?!\()/g, '<span class="text-lavender bg-lavender/10 border border-lavender/20 px-1 py-0.5 rounded-md font-bold mx-0.5 tracking-tight">[$1]</span>');

        return finalHtml;
    }, [activeStep, variables, stepVariables]);

    const rawReplacedContent = useMemo(() => {
        let content = activeStep.content;
        stepVariables.forEach(varName => {
            const value = variables[varName];
            if (value && value.trim() !== "") {
                const regex = new RegExp(`\\{\\{${varName}\\}\\}`, 'g');
                content = content.replace(regex, value);
            }
        });
        return cleanMarkdown(content, activeStep.title);
    }, [activeStep, variables, stepVariables]);

    return (
        <>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left Column: Sequence Navigation & Content */}
            <div className="lg:col-span-8 space-y-8">
                {/* Header */}
                <div className="space-y-6">
                    <Link
                        href="/playbooks"
                        className="inline-flex items-center text-sm font-medium text-slate hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Playbooks
                    </Link>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-ember/10 text-ember border border-ember/20">
                                B2B Framework
                            </span>
                            <span className="text-sm text-slate font-medium">
                                {initialSteps.length} Steps
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">
                            B2B Marketing Framework
                        </h1>
                        <p className="text-lg text-slate leading-relaxed max-w-3xl">
                            An interactive, 21-step tracked sequence to engineer your B2B SaaS positioning from scratch.
                            Fill in your variables on the right, and they will persist across all prompts automatically.
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-charcoal/10 via-charcoal/20 to-charcoal/10" />

                {/* Step Navigation Controls */}
                <div className="flex items-center justify-between bg-charcoal/5 p-4 rounded-xl border border-charcoal/10">
                    <button
                        onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                        disabled={activeStepIndex === 0}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-charcoal/5 hover:bg-charcoal/10 disabled:opacity-50 disabled:hover:bg-charcoal/5 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous Step
                    </button>

                    <div className="text-sm font-medium text-slate">
                        Step <span className="text-white">{activeStepIndex + 1}</span> of {initialSteps.length}
                    </div>

                    <button
                        onClick={() => setActiveStepIndex(Math.min(initialSteps.length - 1, activeStepIndex + 1))}
                        disabled={activeStepIndex === initialSteps.length - 1}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-ember hover:bg-ember/90 disabled:opacity-50 disabled:hover:bg-ember rounded-lg transition-colors"
                    >
                        Next Step
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                </div>

                {/* Active Step Content */}
                <div className="relative p-6 lg:p-10 bg-charcoal/5 border border-charcoal/10 rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <span className="text-8xl font-black">{activeStep.stepNumber}</span>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="pb-4 border-b border-charcoal/10/50 flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div>
                                <span className="text-sm font-bold text-lavender uppercase tracking-widest mb-1 block">
                                    {activeStep.level}
                                </span>
                                <h2 className="text-2xl font-bold text-white pr-8">
                                    {activeStep.title}
                                </h2>
                            </div>
                            <div className="pt-2 shrink-0">
                                <CopyButton textToCopy={rawReplacedContent} />
                            </div>
                        </div>

                        <div
                            className="prose prose-invert max-w-none 
                            prose-headings:text-ash 
                            prose-p:text-ash/70 prose-p:leading-relaxed
                            prose-a:text-lavender prose-a:no-underline hover:prose-a:underline
                            prose-code:text-lavender prose-code:bg-lavender/10 prose-code:before:content-none prose-code:after:content-none prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-pre:bg-offblack prose-pre:border prose-pre:border-charcoal/10 prose-pre:shadow-inner
                            prose-blockquote:border-l-electric prose-blockquote:bg-lavender/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:-ml-4 prose-blockquote:rounded-r-lg
                            prose-strong:text-white"
                            dangerouslySetInnerHTML={{
                                __html: processedContent
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Right Column: Variable Tracker */}
            <div className="lg:col-span-4">
                <div className="sticky top-28 bg-charcoal/5 border border-charcoal/10 rounded-2xl p-6 shadow-xl max-h-[calc(100vh-8rem)] flex flex-col">
                    <div className="pb-4 border-b border-charcoal/10 mb-6 shrink-0">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            Variable Tracker
                        </h3>
                        <p className="text-sm text-slate mt-2">
                            Values are automatically saved and injected into prompts that require them.
                        </p>
                    </div>

                    <div className="overflow-y-auto pr-2 space-y-6 custom-scrollbar flex-1">
                        {stepVariables.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-ember uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-ember animate-pulse" />
                                    Used in this step
                                </h4>
                                {stepVariables.map(varName => (
                                    <div key={varName} className="space-y-2">
                                        <label className="text-sm font-medium text-ash/70 block">
                                            {varName}
                                        </label>
                                        <textarea
                                            value={variables[varName] || ''}
                                            onChange={(e) => handleVariableChange(varName, e.target.value)}
                                            placeholder={`Value for ${varName}`}
                                            className="w-full bg-charcoal/10 border border-charcoal/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-ember focus:border-ember transition-all resize-y min-h-[40px] max-h-[200px]"
                                            rows={variables[varName]?.includes('\n') || (variables[varName]?.length || 0) > 50 ? 3 : 1}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {allExpectedVariables.filter(v => !stepVariables.includes(v)).length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-charcoal/10/50">
                                <h4 className="text-xs font-bold text-slate uppercase tracking-wider">
                                    Other Variables
                                </h4>
                                {allExpectedVariables.filter(v => !stepVariables.includes(v)).map(varName => (
                                    <div key={varName} className="space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                                        <label className="text-sm font-medium text-slate block flex justify-between">
                                            {varName}
                                            {variables[varName] && <Check className="w-4 h-4 text-lavender" />}
                                        </label>
                                        <textarea
                                            value={variables[varName] || ''}
                                            onChange={(e) => handleVariableChange(varName, e.target.value)}
                                            placeholder={`Value for ${varName}`}
                                            className="w-full bg-charcoal/10 border border-charcoal/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-slate transition-all resize-y min-h-[40px] max-h-[200px]"
                                            rows={variables[varName]?.includes('\n') || (variables[varName]?.length || 0) > 50 ? 3 : 1}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: var(--slate-gray);
                    border-radius: 10px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: var(--foreground-muted);
                }
            `}} />
        </div>

        <div className="mt-20">
            <FAQ
                title="B2B Marketing Framework FAQ"
                description="Factual, technical operational detail on deploying and scaling this GTM positioning model."
                items={[
                    {
                        question: "What makes this B2B marketing framework different from others?",
                        answer: "This framework is built on operational reality and technical setup rather than vague high-level marketing theory and brand manifestos. It links your positioning directly to your CRM triggers, scoring rules, and sales outreach sequences, creating a predictable machine instead of a slide deck."
                    },
                    {
                        question: "How long does it take to deploy this growth framework?",
                        answer: "A full GTM architecture deployment takes 60 to 90 days, but we build it in modular 2-week sprints so you see lead scoring and tracking improvements immediately. We don't sit in planning sessions for months; we build, test, and refine the loop in production."
                    }
                ]}
            />
        </div>
        </>
    );
}

