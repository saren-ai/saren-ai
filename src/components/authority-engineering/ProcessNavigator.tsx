"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronRight } from 'lucide-react';

const steps = [
  {
    title: "The Research Seed",
    tool: "ChatGPT Project + Custom Instructions",
    description: "Initialize a ChatGPT Project with instructions referencing 30+ elite consultancies (Gartner, Forrester, HBR). This crafts a research prompt that moves beyond surface-level queries into deep industry analysis.",
    tip: "Use the 'Optimize' toggle in GPT-5 to refine the prompt before moving to research tools."
  },
  {
    title: "Deep Extraction",
    tool: "Perplexity Pro / Gemini 3.1",
    description: "Execute the prompt in Perplexity Pro's 'Deep Research' mode. Gather the full write-up and download the 5-10 primary source PDFs to a dedicated local folder.",
    tip: "Ensure you download the Markdown version of the research for easy parsing by other models."
  },
  {
    title: "Structural Synthesis",
    tool: "NotebookLM",
    description: "Upload your research and PDFs. Generate a Mind Map to organize the skeletal structure of the long-form article and use the 'Infographic' ideator to visualize data connections.",
    tip: "The Mind Map is your roadmap; use it to identify the three core 'answers' your white paper provides."
  },
  {
    title: "Visual IQ",
    tool: "Gemini 3.1 + Napkin AI",
    description: "Have Gemini describe the crucial data in a structured table or graph format. Take those descriptions into Napkin AI to generate brand-aligned visuals (PNGs) for the paper.",
    tip: "Keep visual styles consistent across all charts to maintain professional authority."
  },
  {
    title: "Voice Refinement",
    tool: "Claude Artifacts",
    description: "Refine the dry output from NotebookLM in Claude. Use a Claude Project pre-loaded with your voice guidelines to ensure the tone is 'Business Casual' and the citations are bulletproof.",
    tip: "Explicitly ask Claude to verify that every claim has a corresponding citation from your PDF folder."
  },
  {
    title: "High-Fidelity Deployment",
    tool: "Google Antigravity + HeroUI",
    description: "Flow the final content into your site using Antigravity. Integrate animated components from 21st.dev or HeroUI to create a 'Code Experience' that feels bespoke.",
    tip: "100% vibes. Don't just ship text; ship an experience."
  }
];

export default function ProcessNavigator() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full relative py-12 md:py-20">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Step Navigation */}
        <div className="lg:col-span-5 space-y-3">
          {steps.map((step, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-full group flex items-center justify-between p-4 md:p-5 rounded-2xl transition-all border text-left ${
                activeStep === index 
                ? 'bg-charcoal border-charcoal shadow-xl' 
                : 'bg-white/50 dark:bg-charcoal/5 border-slate/20 hover:border-slate/40 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${
                  activeStep === index ? 'bg-white/20 text-white' : 'bg-ash dark:bg-charcoal/10 text-slate'
                }`}>
                  {index + 1}
                </div>
                <span className={`font-semibold text-sm md:text-base tracking-tight ${
                  activeStep === index ? 'text-white' : 'text-slate group-hover:text-charcoal dark:group-hover:text-white transition-colors'
                }`}>
                  {step.title}
                </span>
              </div>
              {activeStep === index && <ChevronRight className="w-4 h-4 text-white/50" />}
            </motion.button>
          ))}
        </div>

        {/* Right: Content Card */}
        <div className="lg:col-span-7 min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-white dark:bg-offblack border border-slate/20 rounded-[2rem] p-8 md:p-12 shadow-sm flex flex-col justify-between relative overflow-hidden"
            >
              {/* Decorative top-right corner element */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-copper/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className="px-3 py-1 bg-ash dark:bg-charcoal/10 text-slate dark:text-slate rounded-full text-xs font-bold tracking-widest uppercase border border-slate/10">
                    {steps[activeStep].tool}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-white mb-6 leading-tight tracking-tight">
                  {steps[activeStep].title}
                </h2>
                <p className="text-lg md:text-xl text-slate dark:text-slate leading-relaxed mb-8">
                  {steps[activeStep].description}
                </p>
              </div>

              <div className="bg-ash/50 dark:bg-charcoal/5 p-5 md:p-6 rounded-2xl border border-slate/10 dark:border-charcoal/10 backdrop-blur-sm relative z-10">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-charcoal dark:text-white mb-1.5 opacity-80">Pro Tip</h4>
                    <p className="text-sm md:text-base text-slate font-medium">{steps[activeStep].tip}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
