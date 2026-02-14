import type { Metadata } from "next";
import InsightCarousel from "@/components/podcast/InsightCarousel";

export const metadata: Metadata = {
    title: "Scaling Smarter Podcast | Saren.ai",
    description:
        "Conversations on the mechanics of growth, AI operations, and the future of B2B marketing.",
    openGraph: {
        title: "Scaling Smarter Podcast | Saren.ai",
        description:
            "Conversations on the mechanics of growth, AI operations, and the future of B2B marketing.",
        images: ["/images/og/podcast-scaling-smarter.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Scaling Smarter Podcast | Saren.ai",
        description:
            "Conversations on the mechanics of growth, AI operations, and the future of B2B marketing.",
        images: ["/images/og/podcast-scaling-smarter.png"],
    },
};

export default function ScalingSmarterPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
                <div className="container-narrow relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember/10 text-ember text-sm font-mono mb-6 border border-ember/20">
                            <span className="w-2 h-2 rounded-full bg-ember animate-pulse"></span>
                            EPISODE 04: DEEP DIVE
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                            Scaling Smarter: <br />
                            <span className="text-gradient">The New Architecture</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                            In this episode, I join <span className="text-foreground font-semibold">Jim DiPiazza</span> to dismantle the current hype cycle surrounding generative AI and replace it with a pragmatic framework for growth.
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-charcoal/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            </section>

            {/* Carousel Integration */}
            <section className="relative z-20 -mt-12 md:-mt-24 pb-20">
                <InsightCarousel />
            </section>

            {/* Footer CTA / Summary */}
            <section className="py-24 bg-card border-t border-border">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to build your engine?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Move past 101-level tools and start compressing strategic planning cycles from weeks into hours.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="/contact" className="btn-primary">
                            Start the Conversation
                        </a>
                        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            Listen to Full Episode
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
