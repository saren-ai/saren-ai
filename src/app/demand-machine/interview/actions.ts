"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InterviewData {
    userData: {
        name: string;
        email: string;
    };
    answers: Record<string, string>;
    questions: { id: string; number: number; question: string; section: string }[];
}

export async function sendInterviewResults(data: InterviewData) {
    const { userData, answers, questions } = data;

    if (!userData.email || !process.env.RESEND_API_KEY) {
        return { success: false, error: "Missing email or API key" };
    }

    // Generate Markdown content for the email
    let markdownContent = `# Demand Machine: Founder Interview - ${userData.name}\n\n`;
    let currentSection = "";

    questions.forEach((q) => {
        if (q.section !== currentSection) {
            currentSection = q.section;
            markdownContent += `\n## ${currentSection}\n\n`;
        }
        markdownContent += `### ${q.number}. ${q.question}\n`;
        const answer = answers[q.id] || "(No answer provided)";
        markdownContent += `${answer}\n\n`;
    });

    try {
        await resend.emails.send({
            from: "Demand Machine <onboarding@resend.dev>", // Update this sender if you have a verified domain
            to: userData.email,
            subject: "Your Demand Machine Interview Results",
            text: markdownContent,
            // react: <EmailTemplate ... /> // Could use react-email if preferred, but text is fine for MD
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error };
    }
}
