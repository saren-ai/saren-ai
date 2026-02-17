import type { Metadata } from "next";
import InterviewWizard from "@/components/demand-machine/interview/InterviewWizard";

export const metadata: Metadata = {
    title: "36-Question Stakeholder Interview | Demand Machine Diagnostic",
    description:
        "A comprehensive diagnostic interview to extract your company's DNA, positioning, and ICP before building your demand engine.",
};

export default function InterviewPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-electric/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-ember/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <section className="pt-24 pb-12 text-center">
                <div className="container-narrow">
                    <span className="inline-block px-3 py-1 bg-electric/10 text-electric text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        Phase 1: Diagnostic
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Stakeholder Interview
                    </h1>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        This isn't a survey. It's an extraction of your brain. <br className="hidden md:block" />
                        Answer these 36 questions to build the raw material for your entire demand engine.
                    </p>
                </div>
            </section>

            <section className="pb-24">
                <InterviewWizard />
            </section>
        </main>
    );
}
