import { Archive, ArrowRight, Database, FileText, Layout, MessageSquare, Mic, Play, Settings } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "The Demand Machine | Saren.ai",
    description: "A complete operating system for B2B growth.",
};

export default function DemandMachinePage() {
    const steps = [
        {
            number: "01",
            icon: <Mic className="w-8 h-8 text-electric" />,
            title: "Diagnostic Interview",
            description: "We start with a deep-dive interview—36 targeted questions that extract your unique insights, market position, and 'founder secret sauce'.",
            stat: "36 Questions",
        },
        {
            number: "02",
            icon: <Database className="w-8 h-8 text-electric" />,
            title: "Variable Extraction",
            description: "Your answers are processed to define 153 unique variables—from 'Ideal Customer Profile' to 'Enemy Narrative'—creating a structured data model of your strategy.",
            stat: "153 Variables",
        },
        {
            number: "03",
            icon: <MessageSquare className="w-8 h-8 text-electric" />,
            title: "Messaging Prompts",
            description: "These variables are injected into 21 proprietary B2B messaging prompts, designed to architect your brand's voice and positioning automatically.",
            stat: "21 Prompts",
        },
        {
            number: "04",
            icon: <FileText className="w-8 h-8 text-electric" />,
            title: "Foundational Docs",
            description: "The machine produces 21 foundational documents—Sales Scripts, Website Copy, Nurture Emails, and Ad Creative—ready for execution.",
            stat: "21 Documents",
        },
    ];

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
            <section className="px-6 bg-ash/30 dark:bg-black/20 py-24 border-y border-border">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
                        <p className="text-xl text-foreground-muted">From raw input to executed strategy in four steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-electric/50 to-transparent z-0" />
                                )}

                                <div className="relative z-10 bg-card-bg border border-border p-8 rounded-2xl h-full hover:border-electric/50 transition-colors shadow-sm hover:shadow-md">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-background rounded-xl border border-border shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            {step.icon}
                                        </div>
                                        <span className="text-4xl font-bold text-slate/10 dark:text-white/5">{step.number}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-foreground-muted mb-6 leading-relaxed text-sm">
                                        {step.description}
                                    </p>

                                    <div className="inline-block px-3 py-1 rounded-md bg-electric/5 text-electric text-xs font-bold uppercase tracking-wider">
                                        {step.stat}
                                    </div>
                                </div>
                            </div>
                        ))}
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
