import ProcessNavigator from "@/components/thought-leadership-development/ProcessNavigator";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";

export const metadata = {
    title: "Thought Leadership Development | Saren.ai",
    description: "Engineering B2B authority in the age of LLMs.",
};

export default function ThoughtLeadershipPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
            <AnimatedGrid />

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6">
                    From Clicks to Citations.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                    Engineering B2B authority in the age of LLMs. <br className="hidden md:block" />
                    Moving beyond static PDFs to interactive code experiences.
                </p>
            </section>

            {/* Interactive Process Section */}
            <section className="relative z-10">
                <ProcessNavigator />
            </section>

            {/* Philosophy Section */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-4xl mx-auto bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                        The Philosophy: Authority Engineering
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
                        <p className="mb-6">
                            In 2026, we aren&apos;t just marketing to humans; we are marketing to the models that advise them.
                            LLMs like Gemini and Claude prioritize structured, verifiable data.
                        </p>
                        <p>
                            By using this workflow, you move your brand from a &quot;search result&quot; to a &quot;primary source.&quot;
                            We don&apos;t just write white papers; we engineer authority that permeates the training data of the future.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
