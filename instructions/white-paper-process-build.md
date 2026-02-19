Google Antigravity Instruction: Citable Authority Page Build
Project Name: Saren.ai White Paper Process Guide
Core Objective: Create a high-fidelity, interactive page on saren.ai that outlines the AI-driven white paper research process. The page must demonstrate "Authority Engineering" while maintaining a "vibey," premium aesthetic.

1. Brand & Aesthetic Requirements
Voice: Professional, intelligent, witty, and decisive. Avoid corporate fluff.

Visual Language: Minimalist, high contrast (deep blacks/off-whites), sharp typography (Inter or Geist Sans), and subtle motion.

Style Guide: Adhere to existing saren.ai CSS variables for colors and spacing. Use glassmorphism for cards where appropriate.

2. Page Structure & Content
Section A: The Hero (HeroUI Style)
Headline: From Clicks to Citations.
Sub-headline: Engineering B2B authority in the age of LLMs. How to build white papers that models love to cite.

Section B: The "Code Experience" (Interactive Timeline)
Implementation: Use the provided Next.js + Framer Motion component below. This should be the first interactive element users see.

Section C: The Philosophy (Markdown Content)
Content: "In 2026, we aren't just marketing to humans; we are marketing to the models that advise them. LLMs like Gemini and Claude prioritize structured, verifiable data. By using this workflow, you move your brand from a 'search result' to a 'primary source.'"

3. The Component: ProcessNavigator.tsx
TypeScript
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Share2, Palette, FileText, Code, CheckCircle, ChevronRight } from 'lucide-react';

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
    tool: "Google Antigravity + 21st.dev",
    description: "Flow the final content into your site using Antigravity. Integrate animated components from 21st.dev or HeroUI to create a 'Code Experience' that feels bespoke.",
    tip: "100% vibes. Don't just ship text; ship an experience."
  }
];

export default function ProcessNavigator() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto py-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Step Navigation */}
        <div className="lg:col-span-4 space-y-3">
          {steps.map((step, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-full group flex items-center justify-between p-5 rounded-2xl transition-all border ${
                activeStep === index 
                ? 'bg-zinc-900 border-zinc-700 shadow-2xl' 
                : 'bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${activeStep === index ? 'bg-blue-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                  {index + 1}
                </div>
                <span className={`font-semibold text-sm tracking-tight ${activeStep === index ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`}>
                  {step.title}
                </span>
              </div>
              {activeStep === index && <ChevronRight className="w-4 h-4 text-blue-500" />}
            </motion.button>
          ))}
        </div>

        {/* Right: Content Card */}
        <div className="lg:col-span-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-12 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase">
                    {steps[activeStep].tool}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                  {steps[activeStep].title}
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                  {steps[activeStep].description}
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Pro Tip</h4>
                    <p className="text-zinc-500 dark:text-zinc-400">{steps[activeStep].tip}</p>
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

4. Antigravity Build Instructions
Layout: Use a single-column layout with a maximum content width of 1200px.

Typography: Set h1 and h2 to tracking-tighter. Use text-zinc-900 for light mode and text-zinc-50 for dark mode.

Components: * Initialize the ProcessNavigator component in a separate file or inline as a server-client boundary.

Pull the "Animated Grid" background from HeroUI and set the opacity to 0.05 behind the component for depth.

Responsiveness: Ensure the ProcessNavigator stacks the navigation on top of the card for mobile screens (grid-cols-1).