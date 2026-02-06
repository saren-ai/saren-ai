"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const clientLogos = [
  // B2B Technology
  { name: "BlackBerry", filename: "blackberry.png", category: "tech" },
  { name: "Cisco", filename: "cisco.png", category: "tech" },
  { name: "Cylance", filename: "cylance.png", category: "tech" },
  { name: "Palo Alto Networks", filename: "palo-alto.png", category: "tech" },
  { name: "Qwiet AI", filename: "qwiet.png", category: "tech" },
  { name: "Symantec", filename: "symantec.png", category: "tech" },
  { name: "Veritas", filename: "veritas.png", category: "tech" },
  { name: "WethosAI", filename: "wethos.png", category: "tech" },
  { name: "Peak Nano", filename: "peak-nano.png", category: "tech" },
  
  // Consumer Brands
  { name: "Coca-Cola", filename: "coca-cola.png", category: "consumer" },
  { name: "DiGiorno", filename: "digiorno.png", category: "consumer" },
  { name: "Honda", filename: "honda.png", category: "consumer" },
  { name: "Kraft", filename: "kraft.png", category: "consumer" },
  { name: "Method", filename: "method.png", category: "consumer" },
  { name: "Nike", filename: "nike.png", category: "consumer" },
  { name: "Philadelphia", filename: "philadelphia.png", category: "consumer" },
  { name: "Red Bull", filename: "red-bull.png", category: "consumer" },
  { name: "Sprite", filename: "sprite.png", category: "consumer" },
  { name: "Toyota", filename: "toyota.png", category: "consumer" },
  
  // Other
  { name: "CloudKitchens", filename: "cloudkitchens.png", category: "other" },
  { name: "Paramount", filename: "paramount.png", category: "other" },
  { name: "Sony", filename: "sony.png", category: "other" },
  { name: "Ampd", filename: "ampd.png", category: "other" },
  { name: "Number One", filename: "number-one.png", category: "other" },
];

export default function ClientsPageContent() {
  return (
    <article>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          {/* Back Link */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-ash/60 hover:text-ash transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to About
          </Link>

          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Brands I've Worked With
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-ash/80 leading-relaxed"
            >
              From early-stage startups to Fortune 500 companies—B2B tech, consumer brands, and everything in between.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Logo Grid - Dark Background (logos have black backgrounds) */}
      <section className="section bg-offblack">
        <div className="container-wide">
          {/* Animated Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={logo.filename}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="relative aspect-square flex items-center justify-center p-6 rounded-lg bg-charcoal/50 border border-ash/10 hover:border-electric/40 transition-colors group"
              >
                <Image
                  src={`/logos/clients/${logo.filename}`}
                  alt={`${logo.name} logo`}
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>

          {/* Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-ash/60 text-sm">
              {clientLogos.length} brands and counting
            </p>
          </motion.div>
        </div>
      </section>

      {/* Context Section */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-charcoal mb-6 text-center">
              Diverse Experience Across Industries
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-white rounded-lg border border-charcoal/10">
                <div className="text-4xl font-bold text-electric mb-2">
                  {clientLogos.filter(l => l.category === 'tech').length}
                </div>
                <div className="text-sm text-slate font-medium">B2B Technology</div>
                <p className="text-xs text-slate/60 mt-2">
                  Cybersecurity, AI, Enterprise SaaS
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg border border-charcoal/10">
                <div className="text-4xl font-bold text-copper mb-2">
                  {clientLogos.filter(l => l.category === 'consumer').length}
                </div>
                <div className="text-sm text-slate font-medium">Consumer Brands</div>
                <p className="text-xs text-slate/60 mt-2">
                  CPG, Automotive, Sports & Lifestyle
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg border border-charcoal/10">
                <div className="text-4xl font-bold text-ember mb-2">15+</div>
                <div className="text-sm text-slate font-medium">Years Experience</div>
                <p className="text-xs text-slate/60 mt-2">
                  From startups to Fortune 500
                </p>
              </div>
            </div>

            <div className="prose prose-lg text-slate leading-relaxed">
              <p>
                My career spans two worlds: the fast-moving, high-stakes environment of B2B technology (where I've led demand generation for cybersecurity unicorns and AI startups), and the brand-driven, mass-market world of consumer packaged goods (where I cut my teeth at major agencies working with household names).
              </p>
              <p>
                This unusual combination gives me a unique perspective: the rigor and analytics mindset of B2B demand gen, paired with the storytelling instincts and brand thinking of consumer marketing. I know how to build funnels <em>and</em> how to make people care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gradient-dark text-ash">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to add your brand to this list?
          </h2>
          <p className="text-ash/70 text-lg max-w-2xl mx-auto mb-8">
            Whether you're a startup looking to scale demand gen or an enterprise team that needs strategic firepower, let's talk.
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
