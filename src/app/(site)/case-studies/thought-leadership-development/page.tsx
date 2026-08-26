import ProcessNavigator from "@/components/thought-leadership-development/ProcessNavigator";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { buildGraph } from "@/lib/schema";

export const metadata = {
    title: "Thought Leadership Development — B2B Authority Engineering | Saren.ai",
    description: "A framework for becoming the source AI systems and buyers cite — through named frameworks, structured argumentation, original synthesis, and a publishing cadence built for compounding authority.",
    alternates: { canonical: "https://saren.ai/case-studies/thought-leadership-development" },
    openGraph: {
        title: "Thought Leadership Development — B2B Authority Engineering | Saren.ai",
        description: "Become the source AI systems and buyers cite. A framework for building compounding B2B authority through named frameworks, structured argumentation, and original synthesis.",
        url: "https://saren.ai/case-studies/thought-leadership-development",
        siteName: "Saren.ai",
        locale: "en_US",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Thought Leadership Development — B2B Authority Engineering | Saren.ai",
        description: "Become the source AI systems and buyers cite. Named frameworks, structured argumentation, original synthesis.",
    },
};

const trail = [
    { href: "/", label: "Home" },
    { href: "/case-studies", label: "Case Studies" },
    { label: "Thought Leadership Development" },
];

const graph = buildGraph({
    path: "/case-studies/thought-leadership-development",
    name: "Thought Leadership Development | Saren.ai",
    description: "Engineering B2B authority in the age of LLMs. A framework for becoming the source AI systems cite — through named frameworks, structured argumentation, and original synthesis.",
    dateModified: "2026-03-27T00:00:00Z",
    breadcrumb: trail,
    article: {
        headline: "Thought Leadership Development: From Clicks to Citations",
        datePublished: "2026-02-01T00:00:00Z",
        dateModified: "2026-03-27T00:00:00Z",
        image: "https://saren.ai/images/og/home.png",
        about: ["Thought leadership", "LLM citation strategy", "B2B content marketing", "Authority engineering"],
    },
});

export default function ThoughtLeadershipPage() {
    return (
        <>
      <JsonLd schema={graph} />
        <article className="min-h-screen bg-ash relative overflow-hidden">
            <AnimatedGrid />

            {/* Breadcrumbs */}
            <div className="relative z-10 border-b border-slate/10 dark:border-white/5">
                <div className="container-narrow py-3">
                    <Breadcrumb trail={trail} />
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-charcoal mb-6">
                    From Clicks to Citations.
                </h1>
                <p className="text-xl md:text-2xl text-slate max-w-3xl mx-auto leading-relaxed">
                    Engineering B2B authority in the age of LLMs. <br className="hidden md:block" />
                    Moving beyond static PDFs to interactive code experiences.
                </p>
            </section>

            {/* Interactive Process Section */}
            <section className="relative z-10">
                <ProcessNavigator />
            </section>

            {/* Article Section */}
            <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <article className="lg:col-span-8 bg-white dark:bg-[var(--card-bg)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                        <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">
                            Thought leadership is dead.<br />Long live thought leadership.
                        </h2>

                        <p className="text-xl text-slate leading-relaxed mb-10 border-b border-[var(--border)] pb-10">
                            In the traditional B2B marketing funnel, &quot;thought leadership&quot; was often a vanity metric—a long-form PDF living behind a lead gen wall, collecting dust and maybe a follow-up email nobody opened. Marketers patted themselves on the back for &quot;creating content.&quot; Prospects ignored it. Cycle repeats.
                        </p>

                        <div className="space-y-6 text-lg text-slate leading-relaxed">
                            <p>In 2026, the game has fundamentally changed. We aren&apos;t just marketing to humans anymore. We&apos;re marketing to the models that advise them.</p>

                            <p>That&apos;s not a metaphor. That&apos;s your new GTM reality.</p>

                            <h3 className="text-2xl font-bold text-charcoal mt-12 mb-6">The rise of the LLM citation</h3>

                            <p>When a prospect asks Gemini, Claude, or GPT-4o &quot;What&apos;s the most effective go-to-market strategy for a Series A SaaS company?&quot;, the model doesn&apos;t just answer—it answers with receipts. It synthesizes authority from whatever sources it deems credible enough to cite.</p>

                            <p>The question isn&apos;t whether LLMs are influencing your buyers. They already are. The question is: are you the source they&apos;re citing, or are you invisible?</p>

                            <p>This is what I call <b className="text-charcoal font-semibold">LLM citation strategy</b>—and it&apos;s the most underrated GTM lever most B2B marketers aren&apos;t pulling yet.</p>

                            <h3 className="text-2xl font-bold text-charcoal mt-12 mb-6">Why this matters for your pipeline</h3>

                            <p><b className="text-charcoal font-semibold">Machine readability is strategy.</b> LLMs prioritize structured, verifiable, well-attributed content. If your frameworks are clearly named, your data is cited, and your arguments are logically scaffolded, you&apos;re not just writing for humans—you&apos;re writing for the systems that brief humans. That moves your brand from search result to primary source. Big difference.</p>

                            <p><b className="text-charcoal font-semibold">Zero-click authority is the new share of voice.</b> In an AI Overview world, being cited once by a trusted model is worth more than a thousand low-intent clicks from a mediocre keyword. The citation is the endorsement. It&apos;s the model saying, in effect, &quot;these people know what they&apos;re talking about.&quot; You can&apos;t buy that placement. You have to earn it.</p>

                            <p><b className="text-charcoal font-semibold">Thought leadership is the connective tissue.</b> It&apos;s not a top-of-funnel play or a bottom-of-funnel play—it&apos;s the bridge. During consideration, it educates your prospect. Post-sale, it gives your champion the mental models to sell you internally. That white paper your customer shares in a Slack thread to their VP? That&apos;s your thought leadership compounding. Most CMOs optimize for the first conversion and ignore everything else. Don&apos;t be that CMO.</p>

                            <h3 className="text-2xl font-bold text-charcoal mt-12 mb-6">What &quot;LLM-ready&quot; content actually looks like</h3>

                            <p>This is where most thought leadership content falls apart. Writing a think-piece and hoping an AI finds it isn&apos;t a strategy. Here&apos;s what makes content actually citable in the model era:</p>

                            <div className="space-y-4 pl-6 border-l-2 border-[var(--border)]">
                                <p><b className="text-charcoal font-semibold">Named frameworks.</b> Give your ideas proper nouns. &quot;The Zero to GTM Motion Playbook&quot; is citable. &quot;Some thoughts on go-to-market&quot; is not.</p>

                                <p><b className="text-charcoal font-semibold">Structured argumentation.</b> Models love clear thesis → evidence → implication flows. Write like you&apos;re making a case, not just musing.</p>

                                <p><b className="text-charcoal font-semibold">Original data or synthesis.</b> Regurgitating someone else&apos;s stats isn&apos;t going to get you cited—it&apos;ll get them cited. Develop proprietary benchmarks, pull from your client work (anonymized), or synthesize primary research in a way nobody else has.</p>

                                <p><b className="text-charcoal font-semibold">Consistent publishing cadence.</b> One great piece doesn&apos;t build authority. A body of work does. The models are pattern-matching across your entire corpus—so the more coherent and consistent your POV, the more recognizable your authority signal.</p>

                                <p><b className="text-charcoal font-semibold">Structured metadata and semantic markup.</b> If you&apos;re publishing on the web, your technical SEO still matters—but now it&apos;s less about keyword density and more about schema markup, clear entity relationships, and content that answers specific questions cleanly.</p>
                            </div>

                            <h3 className="text-2xl font-bold text-charcoal mt-12 mb-6">The strategic flip</h3>

                            <div className="bg-ash dark:bg-[var(--background-secondary)] p-6 md:p-8 rounded-2xl border border-[var(--border)] my-8 flex flex-col gap-6">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    <div className="px-3 py-1 rounded-full bg-charcoal/10 inline-flex items-center justify-center flex-shrink-0 mt-1 self-start">
                                        <span className="text-xs font-bold text-slate uppercase tracking-wider">Old Method</span>
                                    </div>
                                    <p className="text-slate m-0 leading-relaxed pt-1 flex-1">Write content → hope humans find it → nurture them into buyers.</p>
                                </div>
                                <div className="h-px w-full bg-[var(--border)]"></div>
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    <div className="px-3 py-1 rounded-full bg-lavender/10 inline-flex items-center justify-center flex-shrink-0 mt-1 self-start">
                                        <span className="text-xs font-bold text-lavender uppercase tracking-wider">New Reality</span>
                                    </div>
                                    <p className="text-charcoal m-0 leading-relaxed pt-1 font-medium flex-1">Build a citable body of work → get referenced by AI systems → show up in the moment your buyer is actively researching → earn trust before the first conversation.</p>
                                </div>
                            </div>

                            <p>The funnel didn&apos;t disappear. It just got a new top. And most of your competitors haven&apos;t noticed yet.</p>

                            <p className="text-2xl font-bold text-charcoal mt-8 tracking-tight">That&apos;s the window.</p>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 bg-ash/80 dark:bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--border)] rounded-3xl p-8 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-charcoal/10 flex items-center justify-center mb-6 shadow-inner border border-charcoal/10">
                                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-charcoal mb-4 tracking-tight leading-tight">
                                The Philosophy:<br />Authority Engineering
                            </h3>
                            <div className="prose prose-md dark:prose-invert max-w-none text-slate">
                                <p className="mb-4">
                                    In 2026, we aren&apos;t just marketing to humans; we are marketing to the models that advise them.
                                    LLMs like Gemini and Claude prioritize structured, verifiable data.
                                </p>
                                <p>
                                    By using this workflow, you move your brand from a &quot;search result&quot; to a &quot;primary source.&quot;
                                    We don&apos;t just write white papers; we engineer authority that permeates the training data of the future.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </article>
        </>
    );
}
