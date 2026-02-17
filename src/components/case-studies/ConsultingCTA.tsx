"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ConsultingCTA() {
    return (
        <section className="section gradient-dark text-ash">
            <div className="container-narrow text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Ready to build this?
                    </h2>
                    <p className="text-ash/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        I help early-stage and Series A founders install these systems to
                        drive predictable pipeline.
                    </p>
                    <Link
                        href="/contact"
                        className="btn-primary inline-flex text-lg"
                    >
                        Start a conversation
                        <svg
                            className="w-5 h-5 ml-2"
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
                </motion.div>
            </div>
        </section>
    );
}
