import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "10-Touch Sales Play: Turning Cold Outreach into Executive Conversations",
  description:
    "A systematic approach to multi-channel prospecting that consistently books meetings with decision-makers.",
};

export default function TenTouchSalesPlayPage() {
  return (
    <article>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-ash/60">
                <li>
                  <Link href="/" className="hover:text-ash transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-ash transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ember">10-Touch Sales Play</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              10-Touch Sales Play
            </h1>
            <p className="text-xl md:text-2xl text-ash/80 leading-relaxed">
              Turning cold outreach into executive conversations—a systematic
              approach to multi-channel prospecting.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              The Problem
            </h2>
            <div className="prose prose-lg text-slate leading-relaxed">
              <p>
                Cold outreach has a bad reputation because most of it is bad.
                Spray-and-pray emails, generic LinkedIn messages, robotic cold
                calls. Buyers are drowning in noise.
              </p>
              <p>
                But the alternative—waiting for inbound—doesn&apos;t work when
                you&apos;re trying to break into new accounts or reach
                executives who don&apos;t fill out forms.
              </p>
              <blockquote className="border-l-4 border-ember pl-6 my-8 text-charcoal font-medium italic">
                &quot;The goal isn&apos;t to get a response. The goal is to
                start a conversation that leads to a meeting.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="section bg-charcoal/5">
        <div className="container-narrow">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              The Approach
            </h2>
            <p className="text-slate text-lg mb-8">
              The 10-Touch Sales Play is a structured sequence that combines
              multiple channels, personalized messaging, and strategic timing
              over 25 days:
            </p>

            {/* Calendar Grid */}
            <div className="grid grid-cols-5 gap-3 md:gap-4">
              {(() => {
                const touches = {
                  1: { channel: "LinkedIn", action: "Connection request with personalized note" },
                  2: { channel: "Email", action: "Value-first cold email (no pitch)" },
                  4: { channel: "LinkedIn", action: "Engage with their content" },
                  6: { channel: "Email", action: "Follow-up with relevant insight" },
                  8: { channel: "Phone", action: "Cold call with specific reason" },
                  10: { channel: "LinkedIn", action: "Share relevant content directly" },
                  13: { channel: "Email", action: "Case study or social proof" },
                  16: { channel: "LinkedIn", action: "Voice message or video" },
                  20: { channel: "Phone", action: "Follow-up call" },
                  25: { channel: "Email", action: "Break-up email with value offer" },
                };

                return Array.from({ length: 25 }, (_, i) => {
                  const dayNumber = i + 1;
                  const touch = touches[dayNumber as keyof typeof touches];
                  const hasTouch = !!touch;

                  return (
                    <div
                      key={dayNumber}
                      className={`aspect-square rounded-lg border-2 p-2 md:p-3 flex flex-col ${
                        hasTouch
                          ? "bg-white border-ember/20 shadow-sm"
                          : "bg-ash/30 border-charcoal/10"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span
                          className={`text-xs md:text-sm font-mono font-semibold ${
                            hasTouch ? "text-ember" : "text-slate/40"
                          }`}
                        >
                          {dayNumber}
                        </span>
                      </div>
                      {hasTouch && touch && (
                        <div className="flex-1 flex flex-col gap-1.5 md:gap-2">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] md:text-xs font-medium self-start ${
                              touch.channel === "LinkedIn"
                                ? "bg-[#0077B5]/10 text-[#0077B5]"
                                : touch.channel === "Email"
                                ? "bg-electric/10 text-electric"
                                : "bg-copper/10 text-copper"
                            }`}
                          >
                            {touch.channel}
                          </span>
                          <p className="text-[10px] md:text-xs text-charcoal leading-tight line-clamp-3 md:line-clamp-4">
                            {touch.action}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#0077B5]/20 border-2 border-[#0077B5]"></span>
                <span className="text-sm text-slate">LinkedIn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-electric/20 border-2 border-electric"></span>
                <span className="text-sm text-slate">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-copper/20 border-2 border-copper"></span>
                <span className="text-sm text-slate">Phone</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Outcome */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
              The Outcome
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { value: "42%", label: "Meeting Rate" },
                { value: "3.2x", label: "Response Rate" },
                { value: "68%", label: "Executive Reach" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl border border-charcoal/10"
                >
                  <div className="metric-value">{stat.value}</div>
                  <div className="metric-label mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-4">
              {[
                "Consistent meeting bookings from target accounts",
                "Higher-quality conversations with decision-makers",
                "Repeatable playbook that scales with team growth",
                "Clear metrics for optimization and iteration",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-ember/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-ember"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-lg text-charcoal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to build your outbound engine?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Let&apos;s design a sales play customized for your market, your
            buyers, and your team.
          </p>
          <Link href="/contact" className="btn-primary inline-flex text-lg">
            Let&apos;s talk
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </article>
  );
}
