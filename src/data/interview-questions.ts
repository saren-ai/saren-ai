export interface InterviewQuestion {
    id: string;
    number: number;
    section: string;
    question: string;
    description?: string; // Additional context or sub-questions
    placeholder?: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
    // Section 1: Company basics & product
    {
        id: "basics-name",
        number: 1,
        section: "1. Company basics & product",
        question: "Name and stage",
        description: "What’s the company called? How would you describe your current stage (pre-revenue / early customers / growth-stage)? Roughly where are you in terms of customers or ARR?",
    },
    {
        id: "basics-what-you-do",
        number: 2,
        section: "1. Company basics & product",
        question: "What you do (problem-first)",
        description: "In 2–3 sentences, how do you explain what you do to a smart but non-technical exec? What problem are you solving, and for whom?",
    },
    {
        id: "basics-overview",
        number: 3,
        section: "1. Company basics & product",
        question: "Product / service overview",
        description: "Walk me through what you actually sell today. Is it SaaS, services, a platform? What are the top 2–3 outcomes customers hire you for?",
    },
    {
        id: "basics-positioning",
        number: 4,
        section: "1. Company basics & product",
        question: "Current positioning",
        description: "When you pitch, how do you describe your category? If a prospect asks “so how are you different from X?”, what’s your go-to one-liner?",
    },
    {
        id: "basics-pricing",
        number: 5,
        section: "1. Company basics & product",
        question: "Pricing model & deal size",
        description: "How do you price today? What’s a typical annual deal size or range, and who usually signs the contract?",
    },

    // Section 2: Ideal customers, segments & markets
    {
        id: "icp-profile",
        number: 6,
        section: "2. Ideal customers, segments & markets",
        question: "Ideal customer profile (company level)",
        description: "Describe your absolute dream customer as if it were a single company: industry, size, region. What pains make them a “perfect fit”?",
    },
    {
        id: "icp-size",
        number: 7,
        section: "2. Ideal customers, segments & markets",
        question: "Target company size & industries",
        description: "For your happiest customers so far, what’s their rough employee range? Revenue range? Which verticals are no-brainers?",
    },
    {
        id: "icp-geo",
        number: 8,
        section: "2. Ideal customers, segments & markets",
        question: "Geography & market focus",
        description: "Where are you actively selling today? Are there regions you intentionally avoid?",
    },
    {
        id: "icp-segments",
        number: 9,
        section: "2. Ideal customers, segments & markets",
        question: "Target market segments (roles & teams)",
        description: "Who actually buys from you? Titles, departments, and functions. Are there specific segments you’re prioritizing?",
    },
    {
        id: "icp-priorities",
        number: 10,
        section: "2. Ideal customers, segments & markets",
        question: "Segments to prioritize vs. avoid",
        description: "Which 2–3 segments are your “must-win” areas? Are there customer types you explicitly do not want?",
    },
    {
        id: "icp-personas",
        number: 11,
        section: "2. Ideal customers, segments & markets",
        question: "How many distinct personas",
        description: "When you think about buyers/users, how many distinct “types” do you see? Which matter most for the next stage?",
    },

    // Section 3: Existing customers & data
    {
        id: "customers-clones",
        number: 12,
        section: "3. Existing customers & data",
        question: "Best customers to clone",
        description: "List 5–10 customers you’d happily clone. What do these “perfect” customers have in common?",
    },
    {
        id: "customers-use-cases",
        number: 13,
        section: "3. Existing customers & data",
        question: "Customer use cases & success",
        description: "What are they using you for day-to-day? What does “success” look like for them? Any hard metrics?",
    },
    {
        id: "customers-quotes",
        number: 14,
        section: "3. Existing customers & data",
        question: "Customer quotes & language",
        description: "Recall 3–5 real quotes about pain, choice, or impact. Any colorful phrases that show up repeatedly?",
    },
    {
        id: "customers-data",
        number: 15,
        section: "3. Existing customers & data",
        question: "Existing collateral & data",
        description: "What assets already exist (decks, docs)? Do you have formal win/loss analysis or call snippets?",
    },

    // Section 4: Pain points, triggers & buying journey
    {
        id: "pain-common",
        number: 16,
        section: "4. Pain points, triggers & buying journey",
        question: "Common pain points",
        description: "On first calls, what problems do prospects describe? Which pains make them visibly animated or frustrated?",
    },
    {
        id: "pain-triggers",
        number: 17,
        section: "4. Pain points, triggers & buying journey",
        question: "Buying triggers",
        description: "What typically happens right before someone reaches out? Are there specific metrics or thresholds that trigger the search?",
    },
    {
        id: "pain-workarounds",
        number: 18,
        section: "4. Pain points, triggers & buying journey",
        question: "Current workarounds",
        description: "What are they doing instead of using you? Why is that breaking down now?",
    },
    {
        id: "pain-cycle",
        number: 19,
        section: "4. Pain points, triggers & buying journey",
        question: "Sales cycle & process",
        description: "How long does a deal take? Where do deals stall? What speeds them up?",
    },
    {
        id: "pain-stakeholder",
        number: 20,
        section: "4. Pain points, triggers & buying journey",
        question: "Stakeholder map",
        description: "Who is the champion, blocker, decision-maker? Who uses the product day-to-day?",
    },
    {
        id: "pain-habits",
        number: 21,
        section: "4. Pain points, triggers & buying journey",
        question: "Information & content habits",
        description: "Where do buyers look for guidance? What formats do they respond to (posts, white papers, demos)?",
    },

    // Section 5: Wins, losses & objections
    {
        id: "wins-why",
        number: 22,
        section: "5. Wins, losses & objections",
        question: "Why you win",
        description: "When you win, what do customers say? Which 2–3 reasons show up most often?",
    },
    {
        id: "wins-lose",
        number: 23,
        section: "5. Wins, losses & objections",
        question: "Why you lose",
        description: "When deals go quiet, what explanations do you hear? Are there specific competitors you lose to?",
    },
    {
        id: "wins-criteria",
        number: 24,
        section: "5. Wins, losses & objections",
        question: "Evaluation criteria",
        description: "In a bake-off, what are the main comparison points? Which matter most vs. check-the-box?",
    },
    {
        id: "wins-objections",
        number: 25,
        section: "5. Wins, losses & objections",
        question: "Typical objections & fears",
        description: "What objects come up repeatedly? What unspoken fears (career risk, politics) do you feel?",
    },
    {
        id: "wins-team",
        number: 26,
        section: "5. Wins, losses & objections",
        question: "Sales team patterns",
        description: "What would your best AE say about where you win/lose? Any trap questions that work well?",
    },

    // Section 6: Competitive landscape
    {
        id: "comp-primary",
        number: 27,
        section: "6. Competitive landscape",
        question: "Primary competitors & status quo",
        description: "Which 3–5 companies show up most? How do you describe them? What about 'do nothing' or internal tools?",
    },
    {
        id: "comp-secondary",
        number: 28,
        section: "6. Competitive landscape",
        question: "Secondary / emerging competitors",
        description: "Who is on your radar as a future threat? Any new entrants or adjacent players?",
    },
    {
        id: "comp-swot",
        number: 29,
        section: "6. Competitive landscape",
        question: "Competitor strengths & weaknesses",
        description: "Where do competitors genuinely beat you? Where are they weakest?",
    },
    {
        id: "comp-trends",
        number: 30,
        section: "6. Competitive landscape",
        question: "Market shifts & trends",
        description: "What has changed in the last 12-18 months? Which trends are you riding (AI, consolidation, etc.)?",
    },

    // Section 7: Strategic boundaries & gaps
    {
        id: "strat-reality",
        number: 31,
        section: "7. Strategic boundaries & gaps",
        question: "Ideal vs. reality",
        description: "Who are you actually closing vs. who you want to close? Any surprising segments?",
    },
    {
        id: "strat-avoid",
        number: 32,
        section: "7. Strategic boundaries & gaps",
        question: "Deals to avoid",
        description: "Which deals caused the most pain? What would be on a 'Do Not Pursue' list?",
    },
    {
        id: "strat-gaps",
        number: 33,
        section: "7. Strategic boundaries & gaps",
        question: "Exclusions & known gaps",
        description: "Any audience you explicitly don't want to serve? Any potential fits you don't understand yet?",
    },
    {
        id: "strat-priorities",
        number: 34,
        section: "7. Strategic boundaries & gaps",
        question: "Personas & priorities check",
        description: "Which 2–3 personas should satisfy marketing/sales optimize for? Any internal bets on future growth?",
    },

    // Section 8: Wrap-up & logistics
    {
        id: "wrap-collateral",
        number: 35,
        section: "8. Wrap-up & logistics",
        question: "Collateral & follow-ups",
        description: "What should you send after this call? Are there customers or team members to talk to?",
    },
    {
        id: "wrap-sanity",
        number: 36,
        section: "8. Wrap-up & logistics",
        question: "Sanity check",
        description: "If you had to write a single sentence that captures why you exist and who you serve best, how would you say it right now?",
    },
];

export const getQuestionChunks = (chunkSize: number = 3) => {
    const chunks = [];
    for (let i = 0; i < INTERVIEW_QUESTIONS.length; i += chunkSize) {
        chunks.push(INTERVIEW_QUESTIONS.slice(i, i + chunkSize));
    }
    return chunks;
};
