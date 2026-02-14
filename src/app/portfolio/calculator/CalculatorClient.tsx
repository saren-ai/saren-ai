"use client";

import HeroCalculator from "@/components/calculator/HeroCalculator";
import FAQ from "@/components/ui/FAQ";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function CalculatorClient() {
    return (
        <article>
            {/* Interactive Hero */}
            <HeroCalculator />

            {/* Logic / How it Works */}
            <section className="section bg-ash dark:bg-background">
                <div className="container-narrow">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Why "Working Backwards" Wins
                        </h2>
                        <div className="prose prose-lg text-foreground-muted leading-relaxed">
                            <p>
                                Most revenue plans are just "last year + 20%." That's not a
                                plan; that's a wish.
                            </p>
                            <p>
                                True revenue engineering requires understanding the physics of
                                your specific funnel. If your ACV is low, you need massive top-of-funnel
                                volume. If your win rates are low, you burn cash on leads that
                                don't convert.
                            </p>
                            <p>
                                This calculator helps you stress-test your assumptions. Inputs
                                are based on industry standard benchmarks (like 20% MQL to SQL
                                conversion), but the reality is always local to your business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Sources */}
            <section className="section bg-card-bg dark:bg-background-secondary border-y border-border">
                <div className="container-narrow">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                            Benchmark Data Sources
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 text-sm text-foreground-muted">
                            <div>
                                <strong className="block text-foreground mb-2">
                                    Conversion Rates
                                </strong>
                                <p>
                                    Based on B2B SaaS industry averages (Sources: Gartner,
                                    Forrester, and internal proprietary data from 50+ audits).
                                    Assumes a "high-touch" sales motion (SLG), not PLG.
                                </p>
                            </div>
                            <div>
                                <strong className="block text-foreground mb-2">
                                    Sales Cycles
                                </strong>
                                <p>
                                    Pipeline velocity assumptions are linear for simplicity. In
                                    reality, larger deals ($100k+) will yield slower velocity but
                                    higher efficiency if targeting is correct.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "What is a 'Good' MQL to SQL conversion rate?",
                        answer: "15-20% is healthy for inbound. Outbound is often lower (5-10%). If you're above 30%, your definition of MQL might be too strict (leaving opportunity on the table). If below 10%, your scoring is too loose."
                    },
                    {
                        question: "How does ACV impact this model?",
                        answer: "ACV (Average Contract Value) is the biggest lever. Doubling ACV halves the number of deals you need, but usually increases sales cycle length and decreases win rate. The 'Growth Golden Ratio' is balancing ACV friction with velocity."
                    },
                    {
                        question: "Why does the required budget seem so high?",
                        answer: "Most companies underestimate Customer Acquisition Cost (CAC). To get $1M in new ARR, you might need to spend $800k-$1.2M depending on your efficiency. This calculator reveals the harsh truth of inefficient funnels."
                    }
                ]}
            />

            {/* CTA */}
            <section className="section gradient-dark text-ash">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Need to fix your funnel physics?
                    </h2>
                    <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
                        If usage of this calculator revealed a gap in your plan, let's fix
                        the inputs. We build demand architectures that improve conversion
                        and lower CAC.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric/90 text-white rounded-lg font-semibold transition-colors"
                    >
                        Audit My Funnel
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </article>
    );
}
