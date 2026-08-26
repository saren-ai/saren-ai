import type { FAQItem } from "@/components/ui/FAQ";

/**
 * Single source of truth for every FAQ section on the site. Each page's
 * <FAQ items={FAQS.x} /> and its JSON-LD `buildGraph({ faq: FAQS.x })` read the
 * same array, so the visible Q&A and the FAQPage markup can never drift apart.
 */
export const FAQS = {
  home: [
    {
      question: "Why hire a Fractional Marketing Lead instead of a full-time marketing executive?",
      answer:
        "A Fractional Marketing Lead gives you senior GTM leadership to build your strategy and operations without the bloated executive salary, equity package, and overhead of a full-timer who just wants to manage agencies. You get active system-building, positioning clarity, and operational pipeline setup for early-stage and Series A startups, rather than a slide-deck generator.",
      link: { href: "/fractional-marketing-lead/cost", label: "See real engagement pricing →" },
    },
    {
      question: 'What does "demand generation as engineering" actually mean?',
      answer:
        "It means I treat your pipeline like a software system—defined by data inputs, logic gates, and feedback loops—instead of a series of hope-based branding campaigns. I build intent detection, lead scoring, and automated GTM tracking to capture active buyers, rather than throwing budget at Google Ads and hoping for a miracle.",
    },
    {
      question: "What size startups benefit most from Saren's consulting?",
      answer:
        "Startups that have product-market fit (usually $1M–$10M ARR) but find their growth is stalling because their messaging is muddy and their sales cycles are stretching. If you're spending $50k+/month on ads or sales development and can't trace where your best deals are coming from, we need to talk.",
    },
  ],

  contact: [
    {
      question: "What's the best way to work with you?",
      answer:
        "Most clients engage me as a fractional marketing lead (10-20 hours/week) for strategic leadership and system building. Some bring me in for project-based work like building a demand gen engine, implementing analytics frameworks, or creating a growth strategy. Send me an email and we'll figure out the best fit.",
      link: { href: "/fractional-marketing-lead/cost", label: "Engagement tiers and rates →" },
    },
    {
      question: "Do you take on short-term projects?",
      answer:
        "It depends. If it's a well-defined deliverable (like 'build an attribution dashboard' or 'create a content strategy'), yes. But most of my engagements start with at least 3 months to properly diagnose, build strategy, and start implementation. I'm not a good fit for one-off campaigns or quick audits.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "I focus on B2B SaaS, with deep experience in cybersecurity, AI/ML, and infrastructure software. But the principles of demand generation apply across complex B2B sales. What matters more is your sales motion (enterprise vs PLG), deal size ($10K+ ACV), and sales cycle length (60+ days).",
    },
    {
      question: "How quickly can you start?",
      answer:
        "I typically have 1-2 fractional slots available at any time. If we're a good fit, we can usually kick off within 2-3 weeks. Project-based work has more flexibility. Enterprise consulting engagements (through my network) can start immediately.",
    },
    {
      question: "Do you work with agencies or only direct with companies?",
      answer:
        "Both. Many agencies bring me in for strategic guidance when their client needs demand gen architecture, analytics frameworks, or fractional marketing lead services. I also work directly with companies that have agencies handling execution but need strategic direction.",
    },
    {
      question: "What if I'm not sure what I need?",
      answer:
        "That's normal. Most companies reach out because they know something isn't working but can't diagnose it. Just email me and describe your situation — what's working, what's not, what you've tried. We'll schedule a 30-min call to figure out if I can help and how.",
    },
  ],

  aiOrchestration: [
    {
      question: "Can I just automate all of my outbound marketing with AI agents?",
      answer:
        "Sure, if you want your brand to sound like a generic spambot and systematically alienate every high-value prospect in your pipeline. AI orchestration is about using machines for high-scale scanning and drafting, while keeping humans at critical review gates to inject actual judgment and empathy before anything touches a client.",
    },
    {
      question: "Why is a human review gate necessary in AI operations?",
      answer:
        "Because LLMs are excellent at hallucinating confidently and will happily email the wrong pitch to your top enterprise prospect without blinking. A human review gate catches context failures, ensuring you don't scale embarrassing GTM mistakes at the speed of light.",
    },
    {
      question: "How does AI orchestration prevent systems from failing quietly?",
      answer:
        "It flags anomalies, scoring drifts, and edge cases to human operators rather than letting a broken automation run unchecked for three quarters. When an AI system operates without a human loop, a miscalibrated scoring model can route worthless leads to sales for months before anyone notices the pipeline is dry.",
    },
  ],

  b2bMarketingFramework: [
    {
      question: "What makes this B2B marketing framework different from others?",
      answer:
        "This framework is built on operational reality and technical setup rather than vague high-level marketing theory and brand manifestos. It links your positioning directly to your CRM triggers, scoring rules, and sales outreach sequences, creating a predictable machine instead of a slide deck.",
    },
    {
      question: "How long does it take to deploy this growth framework?",
      answer:
        "A full GTM architecture deployment takes 60 to 90 days, but I build it in modular 2-week sprints so you see lead scoring and tracking improvements immediately. I don't sit in planning sessions for months; I build, test, and refine the loop in production.",
    },
  ],

  /** Thin answers (~35 words) — rendered visibly, excluded from FAQPage markup. */
  gtmBudgetCalculator: [
    {
      question: "What is a 'Good' MQL to SQL conversion rate?",
      answer:
        "15-20% is healthy for inbound. Outbound is often lower (5-10%). If you're above 30%, your definition of MQL might be too strict (leaving opportunity on the table). If below 10%, your scoring is too loose.",
    },
    {
      question: "How does ACV impact this model?",
      answer:
        "ACV (Average Contract Value) is the biggest lever. Doubling ACV halves the number of deals you need, but usually increases sales cycle length and decreases win rate. The 'Growth Golden Ratio' is balancing ACV friction with velocity.",
    },
    {
      question: "Why does the required budget seem so high?",
      answer:
        "Most companies underestimate Customer Acquisition Cost (CAC). To get $1M in new ARR, you might need to spend $800k-$1.2M depending on your efficiency. This calculator reveals the harsh truth of inefficient funnels.",
    },
  ],

  /** Thin answers (20–30 words) — rendered visibly, excluded from FAQPage markup. */
  itsGoodToBePitched: [
    {
      question: "What is this project?",
      answer:
        "A storyboarded 30-second TV spot concept built to sell the experience of being pitched—having three great options.",
    },
    {
      question: "What's the insight behind it?",
      answer: "The pleasure isn't 'who wins.' The pleasure is the buyer's confidence when multiple ideas are genuinely strong.",
    },
    {
      question: "Why use storyboard sketch style instead of photoreal images?",
      answer:
        "Sketch storyboards reduce uncanny valley and match how real pre-production work looks. They feel more authentic and production-ready than AI-generated photoreal images.",
    },
    {
      question: "How did you maintain character consistency across frames?",
      answer:
        "By generating prompts per shot with explicit carryover details—same protagonist description and continuity notes across every frame. The JSON structure prevented AI drift.",
    },
    {
      question: "What tools did you use?",
      answer: "Claude for concept and prompt structure; Nano Banana/Gemini for image generation; JSON to keep the system deterministic.",
    },
    {
      question: "How would this concept translate to a final commercial?",
      answer:
        "The beats stay the same; the storyboards become a shot list, then production design, casting, and edit timing. This is a production-ready blueprint.",
    },
    {
      question: "Can you apply this process to other narratives?",
      answer:
        "Yes—any short-form story benefits from beat structure plus consistency constraints. The methodology works for explainer videos, product demos, testimonials, and educational content.",
    },
  ],

  roiSimulator: [
    {
      question: "Is this tool for SEO or Organic traffic?",
      answer:
        "No. This simulator is specifically designed for Paid Media (Performance Marketing) where you have direct control over levers like Budget and Max CPC. Organic channels require a different set of inputs and lag assumptions.",
    },
    {
      question: "How accurate are the projections?",
      answer:
        "The projections are as accurate as the inputs you provide. The model uses standard funnel math. If you input your historical conversion rates (e.g., Lead-to-MQL), the revenue projection will be mathematically consistent with your budget.",
    },
    {
      question: "What is 'ACV'?",
      answer:
        "ACV stands for Annual Contract Value. In B2B SaaS, this is the average revenue you generate from a single closed deal over one year. We use a default of $25k for this simulation, but custom versions can make this dynamic.",
    },
    {
      question: "Can I export these scenarios?",
      answer:
        "Yes! Use the 'Share Scenario' button in the top right to generate a unique link. You can send this to your team or CFO to show them exactly what budget you need to hit your targets.",
    },
    {
      question: "Do you build this for Hubspot or Salesforce?",
      answer:
        "Yes. I build custom integrations that pull your live data from CRMs and Ad Platforms into unified views like this, so you're not just simulating—you're tracking actuals against forecast.",
    },
  ],

  about: [
    {
      question: "What does 'fractional marketing lead' actually mean?",
      answer:
        "I work with companies that need senior marketing leadership but don't need (or can't afford) a full-time CMO. Typical engagements are 10-20 hours per week for 6-12 months. I build the strategy, set up systems, hire and coach the team, then hand off execution to your in-house team or agency partners. It's like having a CMO on retainer.",
    },
    {
      question: "What size companies do you typically work with?",
      answer:
        "I focus on B2B SaaS companies in two stages: (1) Series A/B startups scaling from $1M-$10M ARR, and (2) growth-stage companies ($10M-$50M ARR) that need to professionalize their marketing function. If you're spending $50K+/month on marketing and sales but can't articulate what's working, we should talk.",
    },
    {
      question: "Do you only work with AI/security companies?",
      answer:
        "No, but that's where most of my experience is. The principles of demand generation, funnel optimization, and growth marketing apply across B2B SaaS. What matters more is sales motion (enterprise vs PLG), deal size, and sales cycle length. If you're selling complex software to technical buyers with 60+ day sales cycles, I've probably solved your problem before.",
    },
    {
      question: "How is working with you different from hiring a marketing agency?",
      answer:
        "Agencies execute campaigns. I build systems and strategy. I'll help you figure out what to do (channel strategy, positioning, demand gen architecture), then either execute it myself or work with your agency to implement it. Most companies hire me because they don't know what to tell their agency to do—or because their agency is doing what they're told but it's not working.",
    },
    {
      question: "Can you help if we already have a VP Marketing?",
      answer:
        "Yes. Many of my clients have VPs or Directors of Marketing who are strong executors but need strategic guidance on growth architecture, analytics frameworks, or demand gen systems. I often work alongside internal leaders as a strategic advisor and coach, helping them level up while building the infrastructure they need.",
    },
    {
      question: "What's your typical engagement timeline and cost?",
      answer:
        "Most engagements start with a 3-month sprint to diagnose, strategize, and start building, then extend for 6-12 months to execute and hand off. Real rates and engagement structures are published on the pricing page.",
      link: { href: "/fractional-marketing-lead/cost", label: "See fractional marketing lead pricing →" },
    },
  ],

  gtmEngineering: [
    {
      question: "How is GTM Engineering different from demand generation?",
      answer:
        "Demand generation asks what campaign to run next. GTM Engineering asks how every input — data, media, content, scoring, AI, channel — connects into one measurable system. Campaigns are an output of that system, not the strategy itself.",
    },
    {
      question: "Isn't this just marketing ops with a new name?",
      answer:
        "Marketing ops keeps the stack running. GTM Engineering designs the demand strategy and owns the infrastructure it runs on — so strategy and systems stop being separate jobs handed between separate people. The two only compound when one person owns both.",
    },
    {
      question: "Do I need to rip out my current stack?",
      answer:
        "No. I evaluate what you have with a bias toward capability, simplicity, and measurable impact — then evolve it. Most engagements start by connecting layers you already own, not buying new ones.",
    },
    {
      question: "Where does AI actually fit?",
      answer:
        "As an instrumented layer with a human review gate — signal detection, scoring, drafting at scale, with judgment kept in human hands. Not automation that runs wrong at scale until someone notices. Orchestration that catches drift before it compounds.",
    },
    {
      question: "Can you do this as a fractional engagement, or do you need to be full-time?",
      answer:
        "Both work. The system is the same whether I build it embedded as a fractional leader or own it full-time — what matters is that one person holds strategy and infrastructure together.",
    },
  ],

  sovereignPersonas: [
    {
      question: "Why do sovereign infrastructure deals need different personas than enterprise IT?",
      answer:
        "Sovereign deals involve public justification, geopolitical scrutiny, and 7–16 month approval journeys across buying committees. Generic 'CIO/CTO' personas collapse under this complexity—you need personas built around power dynamics, career risk, and the language altitude required at each level (policy/architecture/operations).",
    },
    {
      question: "How are these personas actually used in practice?",
      answer:
        "These personas drive five key workstreams: (1) Messaging architecture tailored by altitude, (2) Content strategy matched to trust signals, (3) Sales enablement for committee navigation, (4) Executive briefings addressing persona-specific concerns, and (5) Long-cycle deal orchestration mapping the 7–16 month approval journey.",
    },
    {
      question: "What makes the Minister persona different from typical 'executive buyer' personas?",
      answer:
        "The Minister cares about legacy outcomes—AI competitiveness, sovereignty, GDP impact—not speeds and feeds. They face political fallout, geopolitical scrutiny, and public accountability. Messaging must be strategic and geopolitical, never technical-first. They trust policy briefs, peer nation examples, and top-tier validation—and dismiss vendor bravado.",
    },
    {
      question: "Why is the Architect persona described as the 'quiet scapegoat'?",
      answer:
        "The Architect translates political ambition into executable architecture but bears technical risk if the recommendation fails. They're caught between political pressure and technical reality. They trust evaluation frameworks, peer references, and implementation realism—and dismiss hype. Winning requires acknowledging complexity, not oversimplifying it.",
    },
    {
      question: "How do you sell to the Sovereign Cloud Chief when they're competing with hyperscalers?",
      answer:
        "The Operator owns P&L, GPU utilization, and customer satisfaction. They need ROI in 12–18 months, live workload proof, and low-disruption migration plans. Messaging must connect sovereignty to operational excellence and competitive advantage. Sovereignty talk without operational proof gets dismissed immediately.",
    },
    {
      question: "Can I use this persona framework for non-sovereign infrastructure deals?",
      answer:
        "The framework—building personas around mandate, risk, trust signals, and language altitude—applies to any complex B2B buying committee. The specific sovereign context (geopolitical risk, public justification, national outcomes) is unique, but the methodology works for enterprise infrastructure, defense, healthcare systems, or any multi-stakeholder deal.",
    },
    {
      question: "Do you build these personas for clients, or teach teams to build them?",
      answer:
        "Both. For fractional engagements, I typically build the initial persona set through stakeholder interviews and deal forensics, then train the team to maintain and evolve them. The goal is to leave you with both the artifacts and the capability to update personas as your market evolves.",
    },
  ],

  /** Thin answers — rendered visibly, excluded from FAQPage markup. */
  tenTouchSalesPlay: [
    {
      question: "Why 25 days?",
      answer:
        "Executive attention is scarce. A 25-day sequence shows persistence without desperation. It gives them time to digest your content and recognize your name before you push for the meeting.",
    },
    {
      question: "Does this work for all industries?",
      answer:
        "It works best for complex B2B sales where the ACV justifies the effort. If you're selling a transactional $50/mo tool, this is overkill. If you're selling $50k+ outcomes, this is the baseline.",
    },
    {
      question: "How much personalization is required?",
      answer:
        "The 10-20-70 rule: 10% on the individual (LinkedIn bio), 20% on the company (news, 10-K), 70% on the persona pain points. You don't need to write a novel, just show you've done your homework.",
    },
  ],

  intentData: [
    {
      question: "Why do most B2B startups fail to see ROI from intent data feeds?",
      answer:
        "Because they dump raw, unfiltered intent feeds straight into their sales reps' queues without scoring them or generating relevant outreach context. An intent feed is just noise until you overlay company fit, search velocity, and a clear reason for the prospect to care.",
    },
    {
      question: "How do you keep sales reps from sounding creepy when using intent data?",
      answer:
        'By never saying "I saw you searched for our software" and instead referencing the industry pain points that triggered the intent signal. We use intent to dictate timing and topic, not as an excuse to announce we\'re tracking them online.',
    },
  ],

  /** Thin answers — rendered visibly, excluded from FAQPage markup. */
  contentJourney120Day: [
    {
      question: "Do I need all 120 days?",
      answer:
        "The timeline is symbolic of a quarter. You can compress it to 30 days for a sprint or expand it to 6 months for enterprise deals. The physics of the journey remain the same.",
    },
    {
      question: "What if we don't have a content team?",
      answer:
        "You don't need a team. You need a subject matter expert and a writer (or a very good AI workflow). Quality of insight > quantity of production.",
    },
    {
      question: "How do we measure this?",
      answer:
        "Early stage: Consumption and Qualitative Feedback (comments, DMs). Mid stage: Website engagement and retargeting pool growth. Late stage: Demo requests and pipeline influence.",
    },
  ],

  aeoPlaybook: [
    {
      question: "Is AEO different from SEO?",
      answer:
        "They're complementary, not competing. AEO is the citation layer built on top of technical SEO — weak SEO means there's nothing for an answer engine to extract and cite in the first place.",
    },
    {
      question: "How long until results?",
      answer:
        "Faster than traditional SEO for restructured existing pages, because engines re-crawl and swap cited sources continuously rather than waiting for a ranking refresh. Off-site authority — reviews, forums, community mentions — compounds over quarters, not weeks.",
    },
    {
      question: "How do you measure AEO?",
      answer: "Citation frequency, AI-agent referral traffic, and share of answer against named competitors. Rankings alone no longer describe buyer reality.",
    },
    {
      question: "Does this replace demand gen?",
      answer: "No — it determines whether demand gen has a shortlist to land on. 95% of deals already have a winning vendor on the Day One shortlist before outreach starts.",
    },
    {
      question: "What does an engagement look like?",
      answer:
        "Four phases over 90 days — audit, restructure, seed, measure — followed by ongoing measurement. The operational detail is what we walk through on an intro call.",
    },
  ],

  fractionalMarketingLeadCost: [
    {
      question: "What's included in a fractional marketing lead engagement?",
      answer:
        "Everything a senior marketing hire would own at 10–20 hours per week: GTM strategy, demand generation architecture, lead scoring and attribution systems, AI-native marketing operations, and coaching for your in-house team or agency. Engagements start with a 3-month diagnose-and-build sprint, then extend to 6–12 months for execution and handoff. The deliverable is a system your team can run without me.",
    },
    {
      question: "Fractional marketing lead vs. marketing agency — which is cheaper?",
      answer:
        "An agency retainer often costs less per month, but it buys execution, not direction — someone still has to decide what the agency should do. At $8K–$15K/month, a fractional lead sets the strategy and builds the systems, then directs cheaper execution resources. Most companies that hire me either have an agency that's underperforming for lack of direction, or replace agency spend with a leaner in-house system.",
    },
    {
      question: "How long until results?",
      answer:
        "The first 3 months produce diagnosis and working systems — scoring, attribution, outbound architecture. Pipeline movement typically shows in months 3–6, depending on your sales cycle length. Anyone promising meaningful B2B pipeline inside 90 days is selling you something. If your deals take 60+ days to close, the math says new programs need at least two cycles to prove out.",
    },
  ],

  signalState: [
    {
      question: "How is Signal-State intent targeting different from database feeds like ZoomInfo or Bombora?",
      answer:
        "Traditional intent databases tell you that a corporate IP address read a blog post, while Signal-State finds the exact individual publicly venting about a specific pain point. Instead of cold calling someone because their company bought a database list, you reach a buyer the moment they express a real struggle in a public forum.",
    },
    {
      question: "What platforms do your intent-detection agents monitor?",
      answer:
        "We scan public, high-context communities like Reddit, LinkedIn, Twitter/X, Glassdoor, and G2 where professionals go to complain about tools that broke. We don't scrape gated databases; we identify active intent where buyers are asking for help in real time.",
    },
    {
      question: "Is Signal-State marketing compliant with GDPR and privacy laws?",
      answer:
        "Yes, because we only analyze public forum posts and every message sent is a personalized, one-to-one email routed through a human review gate. We do not run bulk spam lists or scrape private data; we match public questions with direct, manual answers.",
    },
  ],

  agenticWeb: [
    {
      question: "What is the agentic web?",
      answer:
        "The layer of the web built for agents with a task, not just people reading a screen. It's the same internet, but a growing share of first contact with a business now comes from a model reading a site on a buyer's behalf, or an agent trying to act on it directly. A site built for the agentic web is legible and usable by both.",
    },
    {
      question: "How is this different from SEO or AEO?",
      answer:
        "SEO optimizes for a ranking algorithm and a click. AEO optimizes for getting quoted inside an AI answer. Both stop at citation. The agentic web adds a layer neither covers: whether an agent can act once it arrives, not just read and repeat what it found.",
      link: { href: "/agentic-web/agent-access", label: "See what Agent Access covers →" },
    },
    {
      question: "Do I need to rebuild my whole site?",
      answer:
        "No. The three layers, Human Experience, Machine Readability, Agent Access, can each be worked on independently, and most sites already have real strength in at least one. The audit exists to find out which layer is actually costing you before anything gets rebuilt.",
      link: { href: "/services/audit", label: "See what the audit covers →" },
    },
    {
      question: "What is llms.txt, and do I actually need one?",
      answer:
        "A plain-text index at the root of a domain that tells a model what a site contains and where to find it, the same job robots.txt does for crawlers. It's one piece of Agent Access, not the whole layer. This site publishes one, and it's a starting point, not a finish line.",
      link: { href: "/agentic-web/agent-access", label: "Read Layer 03 →" },
    },
    {
      question: "How do I know if my site already fails this?",
      answer:
        "Ask an AI assistant to describe the business from the site alone. If it hedges, contradicts the actual copy, or can't find a way to check pricing or book time, that's the failure showing up in the open. The three failure modes above are checkable on any site in a few minutes, including this one.",
    },
    {
      question: "Isn't this just \"add schema markup\"?",
      answer:
        "Schema is Machine Readability's mechanism, not the whole layer, and it's the easiest piece to get wrong. Markup that describes content the visible page doesn't actually show is a common failure, not a rare one. Machine Readability means the record and the page agree, with schema as the proof.",
      link: { href: "/agentic-web/machine-readability", label: "Read Layer 02 →" },
    },
    {
      question: "What's the difference between the audit and the retainer?",
      answer:
        "The audit is a fixed-scope diagnostic across all three layers, a snapshot. The retainer is ongoing ownership of Machine Readability and Agent Access, because the standards, crawlers, and model behavior a site is legible against keep changing after the snapshot is taken.",
      link: { href: "/agentic-web/standards", label: "See what's changed lately →" },
    },
  ],
} satisfies Record<string, FAQItem[]>;

/**
 * Sets whose answers are too short to be self-contained answer-engine citations
 * (under the ~40-word band). Rendered visibly like every other FAQ; excluded from
 * FAQPage JSON-LD so we don't mark up content that reads as filler out of context.
 */
export const FAQ_SCHEMA_EXCLUDED: ReadonlySet<keyof typeof FAQS> = new Set([
  "gtmBudgetCalculator",
  "itsGoodToBePitched",
  "tenTouchSalesPlay",
  "contentJourney120Day",
]);
