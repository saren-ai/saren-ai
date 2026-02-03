"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // TODO: Replace with actual HubSpot integration
    // HubSpot Portal ID and Form ID will be needed
    // Example: await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, ...)

    // Simulating form submission
    console.log("Form submitted:", formState);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <article>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-charcoal to-offblack text-ash">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Let&apos;s Connect
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-ash/80 leading-relaxed"
            >
              Ready to build a growth engine that scales? Whether you need a
              fractional CMO, demand gen strategy, or marketing operations help,
              I&apos;d love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-ash">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-charcoal mb-6">
                Send a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-green-50 border border-green-200 rounded-xl text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
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
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-700">
                    Thanks for reaching out. I&apos;ll get back to you within 24-48
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Name <span className="text-ember">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Email <span className="text-ember">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all"
                      placeholder="Your company (optional)"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Message <span className="text-ember">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all resize-none"
                      placeholder="Tell me about your project or challenge..."
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Other Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Live Chat */}
              <div className="p-6 bg-white rounded-xl border border-charcoal/10">
                <h3 className="text-lg font-bold text-charcoal mb-2">
                  Need an answer right now?
                </h3>
                <p className="text-slate text-sm mb-4">
                  Start a live chat and I&apos;ll get back to you as soon as I can.
                </p>
                {/* TODO: Replace with actual HubSpot chat integration */}
                <button
                  onClick={() => {
                    // TODO: Open HubSpot chat widget
                    console.log("Open HubSpot chat");
                    alert(
                      "HubSpot chat will be integrated here. For now, please use the contact form or email."
                    );
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-electric text-white rounded-lg hover:bg-electric/90 transition-colors"
                >
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Start a live chat
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-6 bg-white rounded-xl border border-charcoal/10">
                <h3 className="text-lg font-bold text-charcoal mb-2">
                  Connect on LinkedIn
                </h3>
                <p className="text-slate text-sm mb-4">
                  Let&apos;s connect professionally and stay in touch.
                </p>
                <a
                  href="https://www.linkedin.com/in/saren/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#0077B5] text-[#0077B5] rounded-lg hover:bg-[#0077B5] hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  View LinkedIn Profile
                </a>
              </div>

              {/* Email */}
              <div className="p-6 bg-white rounded-xl border border-charcoal/10">
                <h3 className="text-lg font-bold text-charcoal mb-2">
                  Email directly
                </h3>
                <p className="text-slate text-sm mb-4">
                  Prefer email? Reach out directly and I&apos;ll respond within
                  24-48 hours.
                </p>
                <a
                  href="mailto:saren.sakurai@gmail.com"
                  className="inline-flex items-center gap-2 text-electric hover:text-ember transition-colors font-medium"
                >
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  saren.sakurai@gmail.com
                </a>
              </div>

              {/* Response Time */}
              <div className="p-4 bg-charcoal/5 rounded-lg">
                <p className="text-sm text-slate flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-electric"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Typical response time: 24-48 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </article>
  );
}
