"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTERVIEW_QUESTIONS, getQuestionChunks, InterviewQuestion } from "@/data/interview-questions";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import InterviewResults from "./InterviewResults";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { sendInterviewResults } from "@/app/demand-machine/interview/actions";

export default function InterviewWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [status, setStatus] = useState<"welcome" | "wizard" | "results">("welcome");
    const [isSending, setIsSending] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("demand-machine-interview-data");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed.answers) setAnswers(parsed.answers);
                if (typeof parsed.currentStep === "number") setCurrentStep(parsed.currentStep);
                if (parsed.userData) setUserData(parsed.userData);
                if (parsed.status) setStatus(parsed.status);
            } catch (e) {
                console.error("Failed to load interview data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (!isLoaded) return;
        const data = { answers, currentStep, userData, status };
        localStorage.setItem("demand-machine-interview-data", JSON.stringify(data));
    }, [answers, currentStep, userData, status, isLoaded]);

    const questionChunks = getQuestionChunks(3);
    const totalSteps = questionChunks.length;

    const handleAnswerChange = (id: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const startInterview = () => {
        if (userData.name && userData.email) {
            setStatus("wizard");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const finishInterview = async () => {
        setIsSending(true);
        setStatus("results");
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Send email in background
        await sendInterviewResults({
            userData,
            answers,
            questions: INTERVIEW_QUESTIONS,
        });
        setIsSending(false);
    };

    const goToNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            finishInterview();
        }
    };

    const goToPrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Optional: Go back to welcome screen if on first step?
            // For now, just disable button at step 0
        }
    };

    const resetInterview = () => {
        const confirmReset = window.confirm("Are you sure you want to clear all data and start over?");
        if (confirmReset) {
            setAnswers({});
            setCurrentStep(0);
            setUserData({ name: "", email: "" });
            setStatus("welcome");
            localStorage.removeItem("demand-machine-interview-data");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (status === "results") {
        return (
            <InterviewResults
                answers={answers}
                questions={INTERVIEW_QUESTIONS}
                isSending={isSending}
                onReset={resetInterview}
            />
        );
    }

    if (status === "welcome") {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-card-bg border border-border rounded-2xl p-8 md:p-12 shadow-lg">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Before we begin...</h2>
                    <p className="text-foreground-muted mb-8 text-lg">
                        This diagnostic creates a detailed profile of your stakeholder insights.
                        We'll email you a copy of your answers when you finish.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-electric focus:ring-1 focus:ring-electric transition-all outline-none"
                                placeholder="Jane Founder"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-electric focus:ring-1 focus:ring-electric transition-all outline-none"
                                placeholder="jane@startup.com"
                            />
                        </div>

                        <button
                            onClick={startInterview}
                            disabled={!userData.name || !userData.email}
                            className="w-full mt-4 flex justify-center items-center gap-2 px-8 py-4 bg-electric hover:bg-electric/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-lg shadow-electric/20 transition-all hover:translate-y-[-2px]"
                        >
                            Start Interview
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 w-full">
            {/* Progress Bar */}
            <div className="mb-8 sticky top-24 z-10 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 rounded-xl border border-white/5 shadow-sm">
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            {/* Wizard Content */}
            <div className="relative min-h-[600px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full"
                    >
                        <QuestionCard
                            questions={questionChunks[currentStep]}
                            stepIndex={currentStep}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center mt-12 py-8 border-t border-border">
                <button
                    onClick={goToPrev}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${currentStep === 0
                        ? "text-slate/50 cursor-not-allowed"
                        : "text-slate hover:text-foreground hover:bg-ash/50 dark:hover:bg-white/5"
                        }`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                </button>

                <button
                    onClick={goToNext}
                    className="flex items-center gap-2 px-8 py-4 bg-electric hover:bg-electric/90 text-white rounded-lg font-bold shadow-lg shadow-electric/20 transition-all hover:translate-y-[-2px]"
                >
                    {currentStep === totalSteps - 1 ? (
                        <>
                            {isSending ? (
                                <>
                                    Sending... <Loader2 className="w-5 h-5 animate-spin" />
                                </>
                            ) : (
                                <>
                                    Sort & Send
                                    <Check className="w-5 h-5" />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            Next Step
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
