"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const careerTimeline = [
  {
    role: "Fractional Head of Marketing",
    company: "WethosAI",
    period: "2023 - Present",
    metric: "+344% lead growth",
    description:
      "Leading marketing strategy and demand generation for an AI-powered team collaboration platform.",
  },
  {
    role: "Head of Growth Marketing",
    company: "Qwiet AI",
    period: "2023",
    metric: "8:1 ROI on paid",
    description:
      "Built and scaled growth marketing function for application security startup.",
  },
  {
    role: "Sr. Director, Digital Marketing",
    company: "BlackBerry/Cylance",
    period: "2020 - 2023",
    metric: "$4M quarterly pipeline",
    description:
      "Led digital marketing through acquisition, maintaining growth momentum while integrating teams.",
  },
  {
    role: "Director, Demand Generation",
    company: "Cylance",
    period: "2017 - 2020",
    metric: "550% pipeline expansion",
    description:
      "Built demand gen engine from scratch, scaling from startup to $400M+ revenue.",
  },
];

const statsData = [
  { value: "550%", label: "Pipeline Expansion" },
  { value: "70%", label: "CAC Reduction" },
  { value: "344%", label: "Lead Growth" },
  { value: "8:1", label: "ROI on Paid Media" },
  { value: "$4M", label: "Quarterly Pipeline" },
  { value: "15+", label: "Years Experience" },
];

const personalLinks = [
  {
    name: "Comic Collection",
    description: "My pulls and collection on League of Comic Geeks",
    href: "https://leagueofcomicgeeks.com/profile/sarensakurai",
    icon: "📚",
  },
  {
    name: "Vinyl Collection",
    description: "Browse my record collection on Discogs",
    href: "https://discogs.com/user/saren",
    icon: "🎵",
  },
  {
    name: "Letterboxd",
    description: "Films I've watched and reviewed",
    href: "https://letterboxd.com/saren",
    icon: "🎬",
  },
  {
    name: "Funko Collection",
    description: "Pop culture collectibles",
    href: "#",
    icon: "🎭",
  },
];

export default function AboutPage() {
  return (
    <article className="pt-20">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              About Saren
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-ash/80 leading-relaxed"
            >
              I&apos;m a marketing leader who builds growth engines at the
              intersection of strategy, storytelling, and systems. My work spans
              from early-stage startups to enterprise—always with a focus on
              measurable outcomes.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center">
            Career Journey
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-charcoal/10 transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {careerTimeline.map((item, index) => (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="md:w-1/2 pl-8 md:pl-0">
                    <div
                      className={`bg-white p-6 rounded-xl border border-charcoal/10 shadow-sm hover:shadow-md transition-shadow ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <span className="text-sm text-slate font-mono">
                        {item.period}
                      </span>
                      <h3 className="text-xl font-bold text-charcoal mt-1">
                        {item.role}
                      </h3>
                      <p className="text-electric font-medium">{item.company}</p>
                      <p className="text-slate mt-3 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-4 inline-block px-3 py-1 bg-ember/10 rounded-full">
                        <span className="text-ember font-mono font-semibold text-sm">
                          {item.metric}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-ember rounded-full border-4 border-ash transform -translate-x-1/2 md:-translate-x-1/2 z-10" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            By the Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="metric-value text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="metric-label mt-2 text-ash/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 text-center">
              Outside of Work
            </h2>
            <p className="text-slate text-center mb-12">
              When I&apos;m not building growth engines, you&apos;ll find me collecting
              things, watching films, and exploring culture.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {personalLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-charcoal/10 hover:border-electric hover:shadow-md transition-all group"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <div>
                    <h3 className="font-semibold text-charcoal group-hover:text-ember transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-sm text-slate">{link.description}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate/40 ml-auto mt-1 group-hover:text-electric transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-charcoal/5">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Ready to talk about your growth engine?
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking for a fractional CMO, need help building
            your demand gen function, or want to optimize your marketing ops,
            let&apos;s connect.
          </p>
          <Link href="/contact" className="btn-primary inline-flex text-lg">
            Get in touch
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
