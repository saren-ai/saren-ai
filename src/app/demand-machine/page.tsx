import { ArrowRight, Database, FileText, Layout, MessageSquare, Mic, Settings } from "lucide-react";
import Link from "next/link";
import BDPVariablesMarquee from "@/components/demand-machine/BDPVariablesMarquee";
import DiagnosticQuestionsMarquee from "@/components/demand-machine/DiagnosticQuestionsMarquee";
import MessagingPromptsMarquee from "@/components/demand-machine/MessagingPromptsMarquee";
import FoundationalDocsMarquee from "@/components/demand-machine/FoundationalDocsMarquee";

export const metadata = {
    title: "The Demand Machine | Saren.ai",
    description: "A complete operating system for B2B growth.",
};

export default function DemandMachinePage() {
    return (
        <div className="min-h-screen pt-24 pb-24">
            {/* Hero Section */}
            <section className="px-6 mb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 text-electric text-sm font-medium border border-electric/20">
                                <Settings className="w-4 h-4 animate-spin-slow" />
                                <span>Operating System v1.0</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                                The Demand <span className="text-electric">Machine</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed">
                                Stop guessing. Start engineering. A complete operating system that turns founder intuition into a scalable B2B growth engine.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/demand-machine/interview"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-electric hover:bg-electric/90 text-white rounded-lg font-bold text-lg shadow-lg shadow-electric/20 transition-all hover:translate-y-[-2px]"
                                >
                                    Start the Machine
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/portfolio"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-card-bg border border-border hover:bg-ash/50 text-foreground rounded-lg font-bold text-lg transition-all"
                                >
                                    View Case Studies
                                </Link>
                            </div>
                        </div>

                        {/* Visual Abstract */}
                        <div className="flex-1 w-full max-w-lg lg:max-w-xl">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal/5 to-electric/5 border border-border flex items-center justify-center">
                                {/* Placeholder for a complex diagram or animation */}
                                <div className="text-center space-y-4 p-8">
                                    <div className="w-24 h-24 mx-auto bg-electric/10 rounded-full flex items-center justify-center text-electric">
                                        <Layout className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">System Architecture</h3>
                                    <p className="text-foreground-muted">Input: Founder Intuition <br /> Output: Scalable Revenue</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Flow */}
            <section className="bg-ash/30 dark:bg-black/20 pb-24 border-b border-border">
                <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
                    <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                        From raw input to executed strategy in four steps.
                    </p>
                </div>

                <div className="space-y-32 max-w-7xl mx-auto px-6">

                    {/* Step 1: Diagnostic Interview (Visual Left) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="order-2 lg:order-1 lg:col-span-7 relative">
                            <DiagnosticQuestionsMarquee />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-electric/10 rounded-full blur-2xl -z-10" />
                        </div>
                        <div className="order-1 lg:order-2 lg:col-span-5 space-y-6">
                            <span className="text-6xl md:text-8xl font-bold text-slate/10 dark:text-white/5 block">01</span>
                            <h3 className="text-3xl font-bold text-foreground">Diagnostic Interview</h3>
                            <p className="text-lg text-foreground-muted leading-relaxed">
                                We start with a deep-dive interview—36 targeted questions that extract your unique insights, market position, and 'founder secret sauce'.
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-electric/10 text-electric text-sm font-medium rounded-full">
                                <span className="w-2 h-2 rounded-full bg-electric" />
                                36 Questions
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Variable Extraction (Visual Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <span className="text-6xl md:text-8xl font-bold text-slate/10 dark:text-white/5 block">02</span>
                            <h3 className="text-3xl font-bold text-foreground">Variable Extraction</h3>
                            <p className="text-lg text-foreground-muted leading-relaxed">
                                Your answers are processed to define 153 unique variables—from 'Ideal Customer Profile' to 'Enemy Narrative'—creating a structured data model of your strategy.
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ember/10 text-ember text-sm font-medium rounded-full">
                                <span className="w-2 h-2 rounded-full bg-ember" />
                                153 Unique Variables
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <BDPVariablesMarquee />
                        </div>
                    </div>

                    {/* Step 3: Messaging Prompts (Visual Left) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="order-2 lg:order-1 lg:col-span-7 relative">
                            <MessagingPromptsMarquee />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-ember/10 rounded-full blur-2xl -z-10" />
                        </div>
                        <div className="order-1 lg:order-2 lg:col-span-5 space-y-6">
                            <span className="text-6xl md:text-8xl font-bold text-slate/10 dark:text-white/5 block">03</span>
                            <h3 className="text-3xl font-bold text-foreground">Messaging Prompts</h3>
                            <p className="text-lg text-foreground-muted leading-relaxed">
                                These variables are injected into 21 proprietary B2B messaging prompts, designed to architect your brand's voice and positioning automatically.
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ember/10 text-ember text-sm font-medium rounded-full">
                                <span className="w-2 h-2 rounded-full bg-ember" />
                                21 Proprietary Prompts
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Foundational Docs (Visual Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <span className="text-6xl md:text-8xl font-bold text-slate/10 dark:text-white/5 block">04</span>
                            <h3 className="text-3xl font-bold text-foreground">Foundational Docs</h3>
                            <p className="text-lg text-foreground-muted leading-relaxed">
                                The machine produces 21 foundational documents—Sales Scripts, Website Copy, Nurture Emails, and Ad Creative—ready for execution.
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-electric/10 text-electric text-sm font-medium rounded-full">
                                <span className="w-2 h-2 rounded-full bg-electric" />
                                21 Strategic Assets
                            </div>
                        </div>
                        <div className="lg:col-span-7 relative">
                            <FoundationalDocsMarquee />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-electric/10 rounded-full blur-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Ready to define your engine?
                    </h2>
                    <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
                        It takes about 15 minutes to answer the 36 questions. This small investment saves hundreds of hours of misalignment later.
                    </p>
                    <Link
                        href="/demand-machine/interview"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-electric hover:bg-electric/90 text-white rounded-xl font-bold text-xl shadow-xl shadow-electric/20 transition-all hover:scale-105"
                    >
                        Start Diagnostic
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
