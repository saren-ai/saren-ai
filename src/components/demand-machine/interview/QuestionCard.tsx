"use client";

import { InterviewQuestion } from "@/data/interview-questions";
import { motion } from "framer-motion";

interface QuestionCardProps {
    questions: InterviewQuestion[];
    stepIndex: number;
    answers: Record<string, string>;
    onAnswerChange: (id: string, value: string) => void;
}

export default function QuestionCard({ questions, stepIndex, answers, onAnswerChange }: QuestionCardProps) {
    return (
        <div className="space-y-6">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-foreground">
                    {questions[0].section}
                </h2>
                <p className="text-foreground-muted text-sm">
                    Be honest. Generic inputs lead to generic outputs.
                </p>
            </div>

            <div className="grid gap-6">
                {questions.map((q, index) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card-bg border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
                    >
                        <div className="absolute top-4 right-4 text-xs font-mono text-slate/50">
                            #{q.number}
                        </div>

                        <label htmlFor={q.id} className="block mb-3">
                            <span className="text-lg font-semibold text-foreground block mb-1">
                                {q.question}
                            </span>
                            {q.description && (
                                <span className="text-sm text-foreground-muted block leading-relaxed">
                                    {q.description}
                                </span>
                            )}
                        </label>

                        <textarea
                            id={q.id}
                            rows={4}
                            value={answers[q.id] || ""}
                            onChange={(e) => onAnswerChange(q.id, e.target.value)}
                            className="w-full bg-background border border-border rounded-lg p-3 text-foreground placeholder:text-slate/30 focus:border-electric focus:ring-1 focus:ring-electric transition-all outline-none resize-none"
                            placeholder="Type your answer here..."
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
