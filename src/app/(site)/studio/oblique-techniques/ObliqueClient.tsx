"use client";

import { motion } from "framer-motion";
import { Github, Download, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const techniques = [
  {
    name: "cut-up",
    description:
      "Scissors for people who don't own scissors. The text knew all along — it was just waiting to be rearranged.",
    lineage: "surrealist",
  },
  {
    name: "n+7",
    description:
      "Every noun, marched seven entries down the dictionary. The sentence survives. Mostly.",
    lineage: "oulipo",
  },
  {
    name: "exquisite-corpse",
    description:
      "The parlor game, except you play blind and the machine keeps the fold. For once it knows something you don't, and it's your poem.",
    lineage: "surrealist",
  },
  {
    name: "event-score",
    description:
      "One to four lines of instruction. May be impossible. Still due Friday.",
    lineage: "fluxus",
  },
  {
    name: "automatic-dispatch",
    description:
      "First thought, only thought. No transitions, no apologies, no adult supervision.",
    lineage: "surrealist",
  },
  {
    name: "détournement",
    description:
      "Your text, but it defected. Using only its own words. The audacity.",
    lineage: "fluxus",
  },
  {
    name: "queneau-machine",
    description:
      "Five versions now. The remaining 99,999,999,999,995 on request.",
    lineage: "oulipo",
  },
  {
    name: "lipogram",
    description:
      "One letter, exiled. You'll feel the draft coming through the gap.",
    lineage: "oulipo",
  },
  {
    name: "dream-logic",
    description:
      "Seven images deep, zero connective tissue. Dalí needed a key and a plate. You need a prompt.",
    lineage: "surrealist",
  },
  {
    name: "oblique-interrupt",
    description:
      "Not advice. Something worse: a non-sequitur that turns out to be correct.",
    lineage: "eno-schmidt",
  },
  {
    name: "entendre-engine",
    description: "Finds out what your text has been saying behind your back.",
    lineage: "wordplay",
  },
  {
    name: "pretentious-engine",
    description:
      "Your grocery list is now a site of contested meaning. You're welcome.",
    lineage: "wordplay",
  },
  {
    name: "fable",
    description:
      "Your hardest concept, but with fur on it. You won't see it coming until the moral does.",
    lineage: "aesop",
  },
];

const lineageColors = {
  surrealist: "text-purple",
  oulipo: "text-red",
  fluxus: "text-orange",
  "eno-schmidt": "text-blue",
  wordplay: "text-gold",
  aesop: "text-green",
};

export default function ObliqueClient() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-xs font-mono text-slate uppercase tracking-widest mb-3">
              Skills for Liberal Arts Majors
            </p>
            <h1 className="font-mono text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
              <span className="block">O B L I Q U E</span>
              <span className="block text-slate text-2xl md:text-4xl mt-2">
                - - - - - - - - - /
              </span>
              <span className="block mt-2">T E C H N I Q U E S</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gold font-medium mb-8">
              Prompt Against the Machine
            </p>

            <div className="prose prose-lg max-w-none text-foreground-muted space-y-6 mb-12">
              <p className="text-xl leading-relaxed">
                The machine has read everything.
                <br />
                It has read Middlemarch and the Pepsi can and your ex&apos;s
                substack and the entire archive of the Paris Review.
                <br />
                It has read more than you will ever read.
                <br />
                And it is very, very good at sounding like all of it at once.
              </p>

              <p className="text-lg border-l-2 border-slate pl-6">
                The question isn&apos;t whether AI can be creative. That argument
                is over and everyone lost.
              </p>

              <p className="text-lg">
                The question is: what do you do with a machine that defaults to
                the average of everything that&apos;s ever been written?
              </p>

              <p className="text-lg font-medium text-foreground">
                You don&apos;t argue with it. You don&apos;t explain yourself to
                it. You give it a constraint it wasn&apos;t built for and see
                what comes out the other side.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                href="https://github.com/saren-ai/oblique-techniques"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-mono text-sm hover:bg-foreground/90 transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById("install");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-mono text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                <Download className="w-4 h-4" />
                Installation
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-gold" />
              The Collection
            </h2>
            <p className="text-foreground-muted mb-8">
              Stratagems. Calculated moves against a system that wants to give
              you the most statistically likely next word.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techniques.map((technique, index) => (
                <motion.div
                  key={technique.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  className="border border-gray-800 hover:border-foreground transition-colors group"
                >
                  <div className="relative w-full aspect-square bg-gray-900 overflow-hidden">
                    <Image
                      src={`https://raw.githubusercontent.com/saren-ai/oblique-techniques/main/skills/${technique.name}/thumbnail.svg`}
                      alt={technique.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-mono text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                        {technique.name}
                      </h3>
                      <span
                        className={`text-xs font-mono uppercase tracking-wider ${
                          lineageColors[
                            technique.lineage as keyof typeof lineageColors
                          ]
                        }`}
                      >
                        {technique.lineage}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {technique.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-foreground-muted mt-8 font-mono text-sm">
              More coming. The goal is a hundred.
            </p>
          </motion.div>

          <motion.div
            id="install"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Download className="w-6 h-6 text-blue" />
              Install
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  One stratagem:
                </h3>
                <pre className="bg-gray-900 border border-gray-800 p-4 overflow-x-auto font-mono text-sm text-foreground">
                  curl -fsSL
                  https://raw.githubusercontent.com/saren-ai/oblique-techniques/main/install.sh
                  | bash -s -- cut-up
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  A starting set:
                </h3>
                <pre className="bg-gray-900 border border-gray-800 p-4 overflow-x-auto font-mono text-sm text-foreground">
                  curl -fsSL
                  https://raw.githubusercontent.com/saren-ai/oblique-techniques/main/install.sh
                  | bash -s -- @starter
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  By lineage:
                </h3>
                <pre className="bg-gray-900 border border-gray-800 p-4 overflow-x-auto font-mono text-sm text-foreground">
                  <span className="text-purple">
                    curl -fsSL
                    https://raw.githubusercontent.com/saren-ai/oblique-techniques/main/install.sh
                    | bash -s -- @surrealist
                  </span>
                  {"\n"}
                  <span className="text-red">
                    curl -fsSL
                    https://raw.githubusercontent.com/saren-ai/oblique-techniques/main/install.sh
                    | bash -s -- @oulipo
                  </span>
                  {"\n"}
                  <span className="text-orange">
                    curl -fsSL
                    https://raw.githubusercontent.com/saren-ai/oblique-techniques/main/install.sh
                    | bash -s -- @fluxus
                  </span>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  All of them:
                </h3>
                <pre className="bg-gray-900 border border-gray-800 p-4 overflow-x-auto font-mono text-sm text-foreground">
                  curl -fsSL
                  https://raw.githubusercontent.com/saren-ai/oblique-techniques/main/install.sh
                  | bash
                </pre>
              </div>

              <p className="text-sm text-foreground-muted">
                Stratagems land in <code className="font-mono">~/.claude/skills/</code> (override
                with <code className="font-mono">OBLIQUE_SKILLS_DIR</code>). The accented slugs
                take plain-ASCII aliases — <code className="font-mono">n7</code> for{" "}
                <code className="font-mono">n+7</code>, <code className="font-mono">detournement</code> for{" "}
                <code className="font-mono">détournement</code>.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="border-t border-gray-800 pt-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              On AI skepticism
            </h2>
            <div className="prose prose-lg max-w-none text-foreground-muted space-y-4">
              <p>
                You&apos;re right to be suspicious. The thing that generates
                human-sounding text by predicting the most likely next token is,
                in fact, not thinking. It is doing something stranger and more
                banal than thinking.
              </p>
              <p className="font-medium text-foreground">
                These stratagems don&apos;t fix that. They use it.
              </p>
              <p>
                The model is just running the machine. You&apos;re still the one
                making something.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <Link
                href="https://github.com/saren-ai/oblique-techniques"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-gold transition-colors font-mono text-sm"
              >
                <BookOpen className="w-4 h-4" />
                Read the full catalog on GitHub
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
