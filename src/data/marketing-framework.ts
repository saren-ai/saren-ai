

export interface FrameworkPrompt {
    id: string;
    title: string;
    slug: string;
    level: string; // Foundation, Differentiation, Decision, Activation, Measurement
    levelTitle: string; // Same as level for now, or more descriptive
    hook: string;
    promptContent: string;
    visualLogic: string;
    size: 'standard' | 'wide' | 'tall' | 'featured';
    githubUrl: string;
    faq: { question: string; answer: string }[];
    frameworks: string[];
}

export const FRAMEWORK_PROMPTS: FrameworkPrompt[] = [
    // --- Foundation (Awareness) ---
    {
        id: "L1.01",
        title: "Target Market & Competitive Landscape",
        slug: "target-market-competitive-landscape",
        level: "Foundation",
        levelTitle: "Foundation",
        hook: "Define your target market, key competitors, and market context.",
        promptContent: `# Market & competitive analysis

## What this generates

A complete competitive intelligence package built on Porter's Five Forces and PESTEL frameworks. You'll get battlecards, trap-setting questions, win/loss analysis, and a deal qualification framework—everything your sales and marketing teams need to compete effectively and position with confidence.

## Why you need this

You can't build differentiated messaging or train a sales team without knowing exactly where you stand in the market. This isn't academic analysis—it's battle-tested competitive intel that helps you win more deals and walk away from the ones you shouldn't chase.

## Before you start

This prompt works best when you feed it real competitive intelligence, not guesses. Gather:
- Win/loss data from recent deals
- Sales call recordings where competitors came up
- Competitive intel from your sales team
- Analyst reports or market research on your category
- Competitor websites, pricing pages, and case studies
- Customer feedback about alternatives they considered

If you're early-stage, lean on founder experience, investor conversations, and whatever you can scrape from competitor positioning and customer reviews.

## Prepare your inputs

Fill out this form before running the prompt. The more specific you are, the sharper the output.

### Company profile

**{{companyName}}**  
Your company name

**{{productDescription}}**  
What you sell in 2-3 sentences—focus on the problem you solve, not feature lists

**{{icpIndustries}}**  
Who buys from you? Include industries, company sizes, specific roles.

**{{companyStage}}**  
Where are you? Choose one: Startup / Growth-stage / Established Enterprise

### Competitive intelligence

**{{directCompetitors}}**  
List 3-5 companies you compete with most often in deals. Include their names and a one-line description if they're not well-known.

**{{indirectCompetitors}}**  
Emerging or adjacent competitors on your radar. These might not be direct competitors today but could be threats tomorrow.

**{{whyWeWin}}**  
Why do you typically win deals? Be specific: features, service quality, pricing model, relationships, faster implementation, better support, etc. Pull from sales notes or customer interviews.

**{{whyWeLose}}**  
Why do you typically lose deals? Be honest: feature gaps, pricing concerns, brand perception, implementation complexity, lack of integrations, etc.

**{{comparisonCriteria}}**  
What dimensions do prospects use to evaluate vendors? Examples: ease of integration, security certifications, customization options, price, support response time, scalability, user experience, etc.

**{{competitorWeaknesses}}**  
Known vulnerabilities in competitor offerings, positioning, or go-to-market strategy. Examples: poor customer service, outdated technology, complex pricing, limited integrations, weak mobile experience, slow innovation pace, etc.

### Market dynamics

**{{marketShifts}}**  
Any significant industry changes in the last 12-18 months that impact how you compete. Think: new regulations, buyer behavior changes, economic factors, consolidation, funding environment shifts, remote work impacts, etc.

**{{emergingCompetitors}}**  
New entrants or companies expanding into your space. Include startups that just raised funding or adjacent players moving into your category.

**{{techTrends}}**  
Relevant tech developments impacting your market. Examples: AI adoption, automation trends, platform shifts, API-first architectures, no-code movement, data privacy regulations, etc.

### Strategic boundaries

**{{icpDescription}}**  
Who is your best-fit customer? Include company size, industry, use case, pain points, tech stack, buying process. Reference your Target Customer Profiles if you've already created them.

**{{antiIcp}}**  
Red flags or deal types that historically haven't worked out. Examples: companies under 50 employees, organizations without dedicated IT teams, prospects requiring custom development, price-sensitive buyers in certain verticals, etc.

### Supporting materials (optional but helpful)

**{{existingCollateral}}**  
Links to current positioning documents, website, pitch decks, or one-pagers.

**{{winLossData}}**  
Any formal win/loss analysis, Gong call summaries, or customer feedback from recent deals.

**{{salesTeamInsights}}**  
Common objections, trap questions that work, competitive situations your team faces most often, or internal competitive notes.

**Pro tip:** The win/loss reasons and competitor weaknesses are the most critical inputs. If you don't have formal data, interview your top 3 sales reps and synthesize their insights. Real quotes from customer calls make everything more actionable.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a world-class marketing strategist specializing in competitive intelligence, positioning, and go-to-market strategy. Your task is to conduct a comprehensive market and competitive analysis using Porter's Five Forces and PESTEL frameworks to create foundational marketing artifacts for a B2B SaaS client.

## Your objective

Generate battle-tested marketing assets that sales and marketing teams can immediately operationalize, including:
- Competitive landscape map - Visual/narrative overview of key players and market structure
- Head-to-head comparison matrix - Feature, pricing, and value prop comparison on critical dimensions
- Win/loss analysis - Patterns and insights from competitive situations
- Trap-setting question bank - Challenger Sale-style questions that expose competitor weaknesses
- Deal qualification framework - Criteria for when to walk away
- Competitive differentiator matrix - What makes this company uniquely defensible

## Analysis framework

### Porter's Five Forces Analysis

Evaluate and document:
- **Competitive rivalry:** Intensity of competition, market share distribution, differentiation levels
- **Threat of new entrants:** Barriers to entry, capital requirements, switching costs
- **Bargaining power of buyers:** Customer concentration, price sensitivity, alternatives
- **Bargaining power of suppliers:** Supplier concentration, uniqueness of service, switching costs
- **Threat of substitutes:** Alternative solutions, price-performance trade-offs, emerging technologies

### PESTEL Analysis

Assess macro-environmental factors:
- **Political:** Regulations, trade policies, government stability affecting the industry
- **Economic:** Market growth rates, economic cycles, funding environment
- **Social:** Buyer behavior shifts, workforce trends, demographic changes
- **Technological:** Emerging tech, automation trends, innovation pace
- **Environmental:** Sustainability pressures, ESG considerations
- **Legal:** Compliance requirements, IP protection, contractual norms

## Output requirements

### 1. Competitive landscape overview (500-750 words)
- Market map with competitor positioning
- Category leaders, challengers, niche players
- Market forces shaping competitive dynamics (Porter's Five Forces summary)
- PESTEL factors creating opportunities or threats

### 2. Head-to-head competitor comparison (table format)

Create a detailed matrix comparing {{companyName}} against {{directCompetitors}} across:
- Core product/service capabilities
- Pricing model and typical deal size
- Target customer segments
- Key differentiators
- Strengths and weaknesses
- Market positioning
- Sales approach
- Customer support model

### 3. Win/loss analysis & themes
- **Common win scenarios:** Situations where {{companyName}} consistently wins
- **Common loss scenarios:** Patterns in lost deals
- **Key differentiators that matter:** What actually influences buyer decisions
- **Competitive gaps:** Where the company is vulnerable
- **Messaging insights:** What resonates in competitive situations

### 4. Trap-setting question bank (15-20 questions)

Develop Challenger Sale-style questions organized by competitor:
- Questions that highlight {{companyName}}'s unique strengths
- Questions that expose specific competitor weaknesses from {{competitorWeaknesses}}
- Questions that reframe evaluation criteria in favorable ways
- Questions that uncover hidden costs/risks in competitive solutions

Format: Question | Why It Works | Ideal Follow-up

### 5. Deal qualification framework

Create clear criteria for:
- **Green light deals:** High-probability wins with strong fit
- **Yellow light deals:** Proceed with caution, requires specific conditions
- **Red light deals:** Walk away scenarios based on {{antiIcp}}

Include scoring rubric with qualifying questions.

### 6. Competitive differentiator matrix

Map differentiators across two dimensions:
- **Axis 1:** Importance to buyer (high/low)
- **Axis 2:** Competitive advantage (strong/weak)

Identify:
- **Core differentiators:** High importance + strong advantage (lead with these)
- **Table stakes:** High importance + weak advantage (must maintain parity)
- **Niche advantages:** Low importance + strong advantage (use selectively)
- **Deprioritize:** Low importance + weak advantage (don't emphasize)

### 7. Messaging pillars & positioning statement

Based on all analysis above, create:

**Positioning statement:** [For {{icpIndustries}}] who [need/want], {{companyName}} is the [category] that [key benefit]. Unlike {{directCompetitors}}, we [unique differentiator].

**3-5 messaging pillars:** Core themes that ladder up to positioning, each with supporting proof points

### 8. Battlecard summary (1-page format per competitor)

For each primary competitor, create a sales-ready battlecard:
- Quick overview
- When you'll compete
- Their strengths (be honest)
- Their weaknesses (attack points)
- Trap-setting questions
- Proof points (case studies, metrics, testimonials)
- Key differentiators
- Landmines to avoid

## Tone & style

- **Actionable:** Sales and marketing teams should be able to use these immediately
- **Honest:** Acknowledge real competitive strengths; credibility matters
- **Strategic:** Focus on defensible differentiation, not just feature comparisons
- **Data-informed:** Reference {{whyWeWin}}, {{whyWeLose}}, and market trends
- **Confident but not arrogant:** Professional competitive intelligence, not trash-talking

## Deliverable format

Organize output as:
1. Executive summary (key findings and strategic recommendations)
2. Detailed analysis sections (as outlined above)
3. Appendices (full comparison tables, extended question banks)

Use markdown formatting with clear headers, tables, and bullet points for scannability.

## Client context

[Paste all your prepared inputs here]

### Company profile
- Company name: {{companyName}}
- Product/service: {{productDescription}}
- Target market: {{icpIndustries}}
- Company stage: {{companyStage}}

### Competitive intelligence
- Primary competitors: {{directCompetitors}}
- Secondary competitors: {{indirectCompetitors}}
- Why we win: {{whyWeWin}}
- Why we lose: {{whyWeLose}}
- Evaluation criteria: {{comparisonCriteria}}
- Competitor weaknesses: {{competitorWeaknesses}}

### Market dynamics
- Recent market shifts: {{marketShifts}}
- Emerging competitors: {{emergingCompetitors}}
- Technology trends: {{techTrends}}

### Strategic boundaries
- Ideal customer profile: {{icpDescription}}
- Deals to avoid: {{antiIcp}}

### Supporting materials (if available)
- Existing collateral: {{existingCollateral}}
- Win/loss data: {{winLossData}}
- Sales team insights: {{salesTeamInsights}}
\`\`\`

---

## After you run it

Don't just file this away. Turn it into:
- **Sales battlecards** that live in your CRM or deal rooms
- **Onboarding materials** for new sales hires
- **Messaging briefs** for your content and demand gen teams
- **Product roadmap inputs** based on competitive gaps
- **Win/loss review framework** for ongoing deal analysis

Schedule quarterly reviews to keep this fresh. Markets shift, competitors evolve, and yesterday's trap-setting questions become today's table stakes.

## Examples

[Coming soon—sample competitive analysis outputs from real consulting engagements]
`, visualLogic: `[MARKET] -> {COMPETITIVE_ANALYSIS} -> [OPPORTUNITY]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L1_Foundational_Elements/02_Market_&_Competitive_Analysis",
        frameworks: ["TAM/SAM/SOM", "SWOT Analysis", "Porter's Five Forces"],
        faq: [
            { question: "Why start with market size?", answer: "Understanding TAM/SAM/SOM ensures you're chasing an opportunity big enough to matter and realistic enough to capture." },
            { question: "How often should I update this?", answer: "At least annually, or whenever a major competitor enters/exits the market." }
        ]
    },
    {
        id: "L1.02",
        title: "Ideal Customer Profile (ICP)",
        slug: "ideal-customer-profile-icp",
        level: "Foundation",
        levelTitle: "Foundation",
        hook: "Identify your best-fit customers and their buying committees.",
        promptContent: `# Target customer profiles

## What this generates

3-5 detailed buyer personas that combine company-level characteristics (ICP) with individual motivations, behaviors, and decision-making patterns. This is the foundation for everything else—messaging, content strategy, sales enablement, and segmentation.

## Why you need this

You can't write compelling copy, build effective campaigns, or train your sales team without knowing exactly who you're talking to. Generic "mid-market CTO" descriptions don't cut it. These personas force you to get specific about the humans behind the job titles.

## Before you start

Gather whatever customer intelligence you have:
- Sales call notes or recordings
- Customer interviews or survey data  
- Win/loss analysis
- Support tickets that reveal pain points
- LinkedIn profiles of your best customers
- Competitive intel on who your rivals are targeting

The better your inputs, the sharper your personas. If you're pre-revenue, lean on founder insights, industry research, and interviews with people who match your target profile.

## Prepare your inputs

Fill out this form before running the prompt. The more specific and honest you are, the better your personas will be.

### Company context

**{{companyName}}**  
Your company name

**{{companyDescription}}**  
What do you do in 2-3 sentences? Focus on the problem you solve, not feature lists.

**{{productDescription}}**  
What are you selling? What problems does it solve?

**{{currentPositioning}}**  
How do you describe your category or market position today?

**{{pricingModel}}**  
What's your pricing structure? This helps identify buyer authority levels (e.g., $5K/year vs. $100K/year changes who signs off)

**{{icpCompanySize}}**  
Employee count and/or revenue range of your ideal customers

**{{icpIndustries}}**  
Which verticals or sectors do you serve best?

**{{geo}}**  
Where are your customers located?

### Customer intelligence

**{{existingCustomerData}}**  
Names, titles, and companies of your best 5-10 customers (helps identify patterns)

**{{whyWeWin}}**  
Why did recent customers choose you? Pull from sales notes, close-won reports, or customer interviews.

**{{whyWeLose}}**  
Why did prospects choose competitors or not buy at all? Be honest—this reveals gaps.

**{{pains}}**  
What problems do prospects mention most often?

**{{triggers}}**  
What events prompt people to start looking for solutions like yours? (new regulation, funding round, leadership change, system failure, team growth, etc.)

**{{buyerCommittee}}**  
Who gets involved in deals? List all the titles, departments, and roles you typically encounter in the buying process.

**{{salesCycleInsights}}**  
How long do deals take? What slows them down? What accelerates them?

**{{customerQuotes}}**  
Any verbatim language from customers about their challenges or your value? Pull from Gong, sales calls, or reviews.

### Specific requirements

**{{numberOfPersonas}}**  
How many do you want? (3-5 recommended)

**{{prioritySegments}}**  
Any specific roles, departments, or industries to focus on?

**{{exclusions}}**  
Any audiences you explicitly don't serve?

**{{knownGaps}}**  
Any customer types you struggle to reach or understand?

**Pro tip:** Don't leave these sections blank. Even if you're pre-revenue, you can fill these with hypotheses based on founder experience, competitive research, or industry knowledge. Just label them as assumptions you'll validate.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are an expert marketing strategist specializing in customer research and persona development. Your task is to create comprehensive Target Customer Profiles using the Ideal Customer Profile (ICP) + Buyer Persona framework.

## Your objective

Develop 3-5 detailed buyer personas that combine firmographic/demographic data (ICP level) with deep psychographic insights (persona level). Each persona should provide actionable intelligence for messaging, sales, and content strategies.

## Framework approach

**ICP layer:** Broader organizational and demographic characteristics that define the target market

**Persona layer:** Individual motivations, behaviors, pain points, and decision-making patterns within that ICP

## Required output for each persona

Create a structured profile containing:

### 1. Persona overview
- Persona name (e.g., "Strategic Sarah - VP of Operations")
- Primary role/title
- Department/function
- Seniority level

### 2. Demographics & firmographics (ICP layer)
- Company size (employees/revenue)
- Industry/vertical
- Geographic location
- Technology stack/maturity level
- Annual budget authority

### 3. Professional context
- Day-to-day responsibilities
- Key performance indicators (KPIs) they're measured on
- Reporting structure (who they report to, who reports to them)
- Career aspirations

### 4. Pain points & challenges
- Top 3-5 business problems they face
- Personal frustrations in their role
- Consequences of not solving these problems
- Current workarounds or inadequate solutions

### 5. Goals & motivations
- Primary business objectives
- Personal success metrics
- What "winning" looks like for them
- Career advancement motivations

### 6. Buying behavior
- Typical buying triggers (what prompts them to seek solutions)
- Information gathering preferences (search, peer recommendations, analyst reports, etc.)
- Content consumption habits (formats, channels, topics)
- Decision-making criteria and priorities

### 7. Objections & barriers
- Common objections to purchasing solutions like yours
- Risk concerns (financial, operational, career)
- Competitive alternatives they consider
- Internal barriers (budget, approval, change resistance)

### 8. Decision process
- Role in the buying committee (champion, influencer, decision-maker, gatekeeper, end-user)
- Other stakeholders involved in the decision
- Typical evaluation timeline
- Approval requirements and budget cycles

### 9. Buying journey stages

Map their needs and behaviors across:
- **Early exploration:** Symptoms, trigger events, initial research
- **Evaluation:** Solution comparison, vendor assessment, stakeholder alignment
- **Decision:** Final criteria, negotiation points, implementation concerns

### 10. Messaging & engagement recommendations
- Key value propositions that resonate
- Recommended messaging tone and style
- Preferred communication channels
- Content types by journey stage
- Ideal touchpoint cadence

## Quality standards

- Base personas on real customer patterns from the provided inputs
- Avoid generic descriptions; be specific and actionable
- Include direct quotes or language patterns where possible
- Highlight differences between personas to guide segmentation
- Ensure each persona has clear implications for GTM strategy

## Client context

[Paste all your prepared inputs here]

### Company context
- Company name: {{companyName}}
- Company description: {{companyDescription}}
- Product/service overview: {{productDescription}}
- Current positioning: {{currentPositioning}}
- Price point/model: {{pricingModel}}
- Target company size: {{icpCompanySize}}
- Target industries: {{icpIndustries}}
- Geographic focus: {{geo}}

### Customer intelligence
- Existing customer data: {{existingCustomerData}}
- Win themes: {{whyWeWin}}
- Loss themes: {{whyWeLose}}
- Common pain points: {{pains}}
- Buying triggers: {{triggers}}
- Stakeholder map: {{buyerCommittee}}
- Sales cycle insights: {{salesCycleInsights}}
- Customer quotes: {{customerQuotes}}

### Specific requirements
- Number of personas: {{numberOfPersonas}}
- Priority segments: {{prioritySegments}}
- Exclusions: {{exclusions}}
- Known gaps: {{knownGaps}}
\`\`\`

---

## After you run it

Review the output for BS. If a persona feels like it could describe anyone, push back and ask for more specificity. Real personas should feel like you could pick them out of a LinkedIn search.

Use these to:
- Brief your copywriter or content team
- Build sales talk tracks and battlecards
- Prioritize product roadmap items
- Segment your email list or ad targeting
- Align your entire team on who you're actually selling to

## Examples

[Coming soon—sample persona outputs from real consulting engagements]
`, visualLogic: `[DATA] -> {SEGMENTATION} -> [ICP_DEFINITION]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L1_Foundational_Elements/01_Target_Customer_Profiles",
        frameworks: ["Firmographic Segmentation", "Buyer Persona Mapping", "Jobs to be Done"],
        faq: [
            { question: "What's the difference between ICP and Persona?", answer: "ICP describes the *account* (company) that is a good fit. Persona describes the *people* within that account involved in the buying decision." },
            { question: "Why do include 'Bad Fit' criteria?", answer: "Knowing who to say 'no' to is just as important as knowing who to target. It saves sales time and marketing budget." }
        ]
    },

    // --- Differentiation (Strategy) ---
    {
        id: "L2.03",
        title: "Mission, Vision, Values",
        slug: "mission-vision-values",
        level: "Differentiation",
        levelTitle: "Differentiation",
        hook: "Articulate your company's core purpose and guiding principles.",
        promptContent: `# Mission, vision, values & brand narrative

## What this generates

Your complete brand foundation: mission statement, vision statement, core values, brand narrative, brand promise, positioning statement, messaging pillars, tagline options, elevator pitch, and voice guidelines. Built using Simon Sinek's Golden Circle, Sequoia's Company Narrative structure, and Donald Miller's StoryBrand Framework.

## Why you need this

Everything else in your marketing—website copy, sales decks, content strategy, hiring posts—flows from these foundational documents. Without them, you get inconsistent messaging, confused positioning, and a team that can't articulate why you exist. This is the North Star that keeps everyone aligned.

## Before you start

This prompt works best when you have:
- A clear sense of your company's origin story and founding motivation
- Some articulation of what makes your culture and values different
- Customer feedback or win/loss data that shows what resonates
- Competitive intelligence about how you're positioned in the market
- A vision for where the company is headed (even if it's still evolving)

If you're a solo founder or early-stage team, this is the perfect time to do this exercise. Codifying these elements now prevents drift and misalignment as you scale.

## Prepare your inputs

Fill out this form before running the prompt. The more specific and honest you are, the more authentic and ownable your outputs will be.

### Company basics

**{{companyName}}**  
What is your company called?

**{{originStory}}**  
Why did the founders start this company? Tell the founding story—what was the catalyst, the "before" state, and the moment you decided to build this.

**{{founderFrustration}}**  
What problem were the founders personally frustrated by? What made this frustration big enough to warrant starting a company?

**{{keyMilestones}}**  
What are the most important milestones in your company's journey worth mentioning? Examples: first customer, key hires, funding rounds, product launches, major partnerships, pivot moments, revenue milestones, etc.

### Team & culture

**{{teamStructure}}**  
How large is your team and how is it structured? Include department breakdown if relevant, and any notable aspects of how you work (remote, distributed, in-person, etc.)

**{{values}}**  
What are your current core values, or what values do you aspire to embody? If you already have defined values, list them. If not, describe the cultural principles or behaviors that matter most to your team.

### Product & market

**{{productList}}**  
What do you sell or provide to customers? Be specific about what you offer and how customers engage with it.

**{{icpDescription}}**  
Who is your target customer? Include demographics, roles, industries, company characteristics, pain points, and any psychographic details that help paint a picture.

**{{coreProblem}}**  
What is the main problem you solve for customers? Focus on the business outcome or transformation, not just features.

**{{competitorDifferentiation}}**  
Who are your key competitors and how do you differentiate from them? Include direct competitors, adjacent solutions, and your unique positioning.

### Future direction

**{{vision}}**  
Where do you aim to be in 3-5 years? Think big: market position, impact, scale, product evolution, team size, category leadership, etc.

**Pro tip:** For the origin story and founder frustration, pull actual quotes or language from founding conversations, early pitch decks, or interviews. Authentic founder voice makes brand narratives way more compelling than corporate speak.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a world-class marketing strategist tasked with developing comprehensive foundational marketing artifacts for a client. You will leverage proven frameworks including Simon Sinek's Golden Circle, Sequoia Capital's Company Narrative structure, and Donald Miller's StoryBrand Framework to create compelling, cohesive brand messaging.

## Your task

Generate a complete set of foundational brand documents that will serve as the cornerstone for all marketing and communication activities. Each artifact should be strategically crafted, emotionally resonant, and commercially viable.

## Required outputs

Generate the following artifacts with depth, clarity, and strategic insight:

### 1. Mission statement

Using the Golden Circle's "Why," craft a concise, inspiring mission statement (1-2 sentences) that articulates:
- The company's core purpose
- The fundamental problem being solved
- The impact on customers/world

### 2. Vision statement

Create an aspirational vision statement (2-3 sentences) that describes:
- Future state the company is building toward
- Long-term impact and legacy
- Ambitious but achievable horizon (3-5 years)

### 3. Core values (set of 4-6)

Define values that guide behavior and decision-making, each with:
- Value name (2-3 words)
- Brief description (1 sentence)
- Behavioral indicator (what this looks like in action)

### 4. Brand narrative / company story

Using Sequoia's structure and StoryBrand principles, write a compelling 300-500 word narrative covering:
- **Origin:** The founder's journey and "aha moment"
- **Problem:** The frustration/gap that needed solving
- **Solution:** How the company uniquely addresses this
- **Journey:** Key milestones demonstrating traction
- **People:** Team culture and what makes them special
- **Future:** Where the story is heading

### 5. Brand promise

Craft a single, powerful statement (1-2 sentences) that commits to:
- The specific value delivered to customers
- The transformation or outcome guaranteed
- An emotional and functional benefit blend

### 6. Brand positioning statement

Using the classic format, create:

"For [target customer] who [customer need], [Company Name] is the [category] that [unique benefit]. Unlike [competitors], we [key differentiation]."

### 7. Messaging pillars (3-4 core messages)

Develop 3-4 key messages that support positioning, each containing:
- Pillar headline (compelling statement)
- Supporting proof points (2-3 bullets with evidence)
- Customer benefit (so what?)

### 8. Tagline options (3-5 variations)

Generate memorable taglines that:
- Capture brand essence in 2-7 words
- Are distinctive and ownable
- Connect emotionally while hinting at functional benefit
- Range from descriptive to aspirational

### 9. Elevator pitch (30-second version)

Write a conversational, compelling pitch that:
- Opens with the problem/insight
- Positions the company as the guide (StoryBrand)
- Clearly states what you do
- Highlights differentiation
- Ends with a clear call-to-action or memorable statement

### 10. Brand voice & tone guidelines

Define the brand's communication style:
- Voice attributes (3-4 adjectives with descriptions)
- What we are / What we're not (comparison table)
- Sample phrases showing voice in action

## Framework application notes

- **Golden Circle:** Ensure "Why" is evident in mission/narrative, "How" in values/differentiation, "What" in positioning
- **StoryBrand:** Position customer as hero, company as guide; emphasize customer transformation
- **Sequoia Structure:** Maintain narrative arc that builds credibility while inspiring

## Quality standards

- All outputs must be internally consistent and mutually reinforcing
- Language should be authentic to the founder's voice and company culture
- Avoid jargon and clichés; prioritize clarity and memorability
- Balance aspiration with credibility
- Ensure commercial viability (not just inspirational, but sellable)

## Client context

[Paste all your prepared inputs here]

### Company basics
- Company name: {{companyName}}
- Origin story: {{originStory}}
- Founder frustration: {{founderFrustration}}
- Key milestones: {{keyMilestones}}

### Team & culture
- Team size and structure: {{teamStructure}}
- Core values: {{values}}

### Product & market
- Primary products/services: {{productList}}
- Ideal customer profile: {{icpDescription}}
- Primary customer problem: {{coreProblem}}
- Key competitors and differentiation: {{competitorDifferentiation}}

### Future direction
- Future vision (3-5 years): {{vision}}
\`\`\`

---

## After you run it

Review everything for authenticity. Does this sound like your founder would actually say it? Does it feel true to your culture? If it reads like generic corporate mission statement bingo, push back and ask for more specificity.

Use these artifacts to:
- **Align your team** on who you are and where you're going
- **Brief agencies or freelancers** so they can write in your voice
- **Onboard new hires** with clarity on mission and values
- **Build your website** with consistent messaging architecture
- **Create sales enablement** materials that tell a coherent story
- **Guide product decisions** through the lens of mission and values

Update these annually or after major pivots. Your mission might stay stable, but positioning and messaging should evolve as your market and product mature.

## Examples

[Coming soon—sample brand foundation outputs from real consulting engagements]
`, visualLogic: `[PURPOSE] -> {ARTICULATION} -> [CORE_DNA]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L2_Core_Identity/03_Mission_Vision_Values",
        frameworks: ["Golden Circle (Simon Sinek)", "Jim Collins' Vision Framework", "Culture Code"],
        faq: [
            { question: "Does a startup really need this?", answer: "Yes. It aligns the team, guides hiring, and helps make difficult strategic decisions when things get tough." },
            { question: "Can these change?", answer: "Mission and values should be relatively stable. Vision can evolve as you scale and reach new milestones." }
        ]
    },
    {
        id: "L2.04",
        title: "Brand Voice & Tone",
        slug: "brand-voice-tone",
        level: "Differentiation",
        levelTitle: "Differentiation",
        hook: "Define how your brand sounds and communicates.",
        promptContent: `# Brand voice & tone

## What this generates

Your complete brand communication framework: core voice attributes, tone variation matrix, do/don't examples, voice-in-action snippets across formats, tone modulation guide, messaging pillars, elevator pitch variations, and tagline options. Built using proven frameworks from Mailchimp, Ann Handley's voice matrix, and foundational messaging models.

## Why you need this

Inconsistent voice is one of the fastest ways to erode trust and confuse your audience. When your website sounds corporate, your emails sound casual, and your sales team sounds desperate, nobody knows who you really are. This framework gives everyone—writers, designers, sales, support—a shared language and clear guardrails.

## Before you start

This prompt works best when you have:
- A clear sense of brands whose voice you admire (and why)
- Examples of your own content that feels "right" vs. content that missed the mark
- Customer or team feedback about how your current communications land
- Some articulation of your target audience and what resonates with them

If you don't have polished examples, that's fine. Rough drafts, email snippets, or even competitor examples that you want to emulate work just as well.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your examples and preferences, the more ownable your voice guidelines will be.

### Voice direction

**{{voiceAdjectives}}**  
Provide 3-5 adjectives describing how you want your brand to sound.  
Examples: professional, approachable, innovative, trustworthy, witty, confident, empathetic, bold, conversational, authoritative

**{{voiceDo}}**  
List 2-3 companies whose brand voice you admire. For each, explain WHY you admire their voice (1-2 sentences).  
Example: "Mailchimp - They make complex technical topics feel accessible without being condescending. Their voice is playful but never unprofessional."

**{{voiceDont}}**  
List 1-2 companies or voice styles you want to avoid. For each, explain WHY their voice doesn't resonate (1-2 sentences).  
Example: "Generic tech startup voice - overly hyped, uses too many buzzwords like 'revolutionize' and 'disrupt,' feels inauthentic and exhausting."

### Content examples

**{{contentExamples}}**  
Share 2-4 pieces of existing content that "sound like you" or are closest to your desired voice. Include: website copy, emails, social posts, presentations, product descriptions, etc. For each piece, indicate what specifically feels right about it.

**{{contentFeedback}}**  
Share 1-2 examples of content that missed the mark. Explain what felt wrong or what you'd change. Include any feedback you received from customers or your team about your current communications.

### Company context

**{{companyBackground}}**  
Brief company description (2-3 sentences), primary products/services, target audience(s), and key differentiators.

**{{businessContext}}**  
Industry/market category, company stage (startup, growth, established), primary competitors (2-3), and your unique value proposition (draft is fine).

**{{audienceDetails}}**  
Primary audience persona(s) including titles, roles, and pain points. Also note secondary audiences, whether you're B2B/B2C/both, and the technical sophistication level of your audience.

### Optional but valuable

**{{personalityTraits}}**  
If you've already defined brand personality traits or archetypes (e.g., "The Sage," "The Hero"), include them here.

**{{legalClaimLimits}}**  
Any industry regulations, compliance requirements, language/terminology to avoid, or required legal disclaimers.

**{{geoCulturalContext}}**  
Primary markets/regions, cultural considerations for voice/tone, and languages beyond English if relevant.

**Pro tip:** For voice inspiration and anti-examples, pull actual quotes or copy from those brands. Showing specific examples of what you love (or hate) makes your voice guidelines way more precise than just saying "be professional."

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a senior marketing strategist specializing in brand positioning and messaging architecture. Using proven frameworks including the Mailchimp Voice & Tone approach, Ann Handley's voice matrix, and foundational messaging models, you will develop comprehensive brand communication guidelines.

## Your task

Create a complete Brand Voice & Messaging Foundation document that includes:

### 1. Brand voice & tone framework

#### Core voice attributes (3-5)

Define distinct voice characteristics using the format: "[Attribute] but not [opposite excess]"
- Example structure: "witty but not snarky," "confident but not arrogant"
- Ground each attribute in the brand's strategic positioning

#### Tone variation matrix

Create a tone adjustment guide for these scenarios:
- Announcing success/achievements
- Addressing problems/apologizing for issues
- Educational/how-to content
- Sales/promotional messaging
- Customer support interactions
- Crisis communication

#### Do/don't examples

For each voice attribute, provide:
- 2-3 "Do" examples demonstrating the attribute correctly
- 2-3 "Don't" examples showing what to avoid
- Brief explanation of why each works or fails

#### Voice-in-action snippets (5-10)

Write example copy across these formats showing consistent voice:
- Email subject line + opening paragraph
- Social media post (LinkedIn or Twitter/X style)
- Website hero headline + supporting copy
- Product/feature announcement
- Customer support response
- Blog post opening

#### Tone modulation guide

Map tone shifts across:
- Content types (email, social, web, video scripts, ads)
- Audience segments (prospects, customers, partners, internal)
- Sensitivity contexts (technical, emotional, urgent, celebratory)

### 2. Foundation messaging elements

#### Messaging pillars (3-4 core themes)

For each pillar include:
- Pillar name
- Core message statement
- Supporting proof points (3-5 per pillar)
- Audience relevance

#### Elevator pitch variations

- 30-second version (75-100 words)
- 10-second version (25-30 words)
- One-sentence version

#### Tagline options

- Provide 5-7 tagline options with strategic rationale for each
- Indicate primary recommendation and why

## Output format

Deliver the complete framework as a structured document with:
- Executive summary
- Detailed sections for each component
- Visual examples where helpful
- Quick-reference guide (1-page cheat sheet)
- Implementation recommendations

## Client context

[Paste all your prepared inputs here]

### Voice direction
- Brand voice adjectives: {{voiceAdjectives}}
- Voice inspiration brands: {{voiceDo}}
- Voice anti-examples: {{voiceDont}}

### Content examples
- Existing content examples: {{contentExamples}}
- Existing content feedback: {{contentFeedback}}

### Company context
- Company background: {{companyBackground}}
- Business context: {{businessContext}}
- Audience details: {{audienceDetails}}

### Optional context (if available)
- Brand personality: {{personalityTraits}}
- Communication constraints: {{legalClaimLimits}}
- Geographic/cultural context: {{geoCulturalContext}}
\`\`\`

---

## After you run it

Don't let this become shelfware. Turn it into:
- **A brand voice checklist** for writers and content reviewers
- **Onboarding materials** for new marketing hires or agencies
- **QA criteria** for content approval processes
- **Sales enablement** so reps email in the same voice as marketing
- **Templates** for common content types (emails, social posts, support responses)

Test the guidelines with your team. Have them write something using the framework, then review it together. If the voice feels generic or hard to apply, push back on the LLM output and ask for more specific, ownable examples.

Update this annually or when your positioning shifts. Voice should evolve as your brand matures, but the core attributes should remain stable.

## Examples

[Coming soon—sample brand voice frameworks from real consulting engagements]
`, visualLogic: `[PERSONALITY] -> {GUIDELINES} -> [VOICE_GUIDE]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L2_Core_Identity/04_Brand_Voice_&_Tone",
        frameworks: ["Nielsen Norman Tone Dimensions", "Brand Archetypes (Jung)", "Kapferer Brand Identity Prism"],
        faq: [
            { question: "Voice vs. Tone?", answer: "Voice is your personality (constant). Tone is your mood (changes based on context/situation)." },
            { question: "How detailed should this be?", answer: "Start with high-level pillars. You can build a full glossary later." }
        ]
    },

    // --- Decision (Messaging) ---
    {
        id: "L3.01",
        title: "Unique Value Proposition (UVP)",
        slug: "unique-value-proposition-uvp",
        level: "Decision",
        levelTitle: "Decision",
        hook: "Identify and articulate your primary competitive advantage.",
        promptContent: `# Unique value propositions

## What this generates

Your complete positioning and messaging foundation using April Dunford's Obviously Awesome framework and Geoffrey Moore's value proposition structure. You'll get a positioning statement, persona-specific value propositions, competitive differentiation statements, proof points matrix, and messaging architecture—everything you need for your homepage, sales decks, and customer-facing communications.

## Why you need this

Generic value props like "we help companies be more efficient" don't win deals. You need messaging that's specific, differentiated, and backed by proof. This framework forces you to articulate exactly why customers choose you over alternatives, what makes you uniquely different (not just better), and how to prove it. Without this, your sales team is winging it and your marketing is forgettable.

## Before you start

This prompt works best when you have:
- Clear customer feedback about why they chose you (or didn't)
- Win/loss data from recent deals showing competitive patterns
- Proof points ready: metrics, testimonials, case studies, retention data
- A sense of your competitive landscape and where you fit

If you're early-stage, lean on customer discovery interviews, founder insights, and competitive research. The framework still works—you're just testing hypotheses rather than validating patterns.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your inputs, the sharper your messaging will be.

### Company basics

**{{companyName}}**  
Your company or product name

**{{coreProblem}}**  
What core problem does your solution solve? Describe it in 2-3 sentences from your customer's perspective.

**{{buyerPersonas}}**  
Who are your primary customer segments or personas? List each with a brief description (role, company size, key characteristics). Reference your Target Customer Profiles if you've already created them.

**{{category}}**  
What product category are you in or defining?  
Examples: "CRM software," "AI-powered analytics platform," "workflow automation for healthcare," "API infrastructure for developers"

### Competitive context

**{{directCompetitors}}**  
Who are your primary competitors and alternatives? Include direct competitors AND alternative solutions customers might consider (including "do nothing" or "build it ourselves" if relevant).

**{{whyWeWin}}**  
Why do customers choose your solution over alternatives? Pull from customer feedback, sales conversations, close-won reports, or post-sale interviews. Be specific—what did they say?

**{{winLossData}}**  
What have you learned from competitive wins and losses? Optional but highly valuable.  
Examples: "We win when speed matters more than features," "We lose to Competitor X when prospects need on-premise deployment," "We win against DIY solutions when teams hit scale challenges"

**{{categoryContext}}**  
Market category context: Is this an established or emerging category? Are you defining new category criteria? What makes this space unique right now?  
Examples: "Established CRM space but we're the first built specifically for remote teams," "Emerging category around AI code review—most buyers still building internally," "Mature category but recent regulatory changes created new requirements"

### Proof & validation

**{{proofPoints}}**  
What evidence validates your claims? Include all available proof:
- Customer metrics (time saved, revenue increased, costs reduced, etc.)
- Testimonials (with customer names and titles if possible)
- Case study summaries (problem → solution → result)
- Retention rates, NPS scores, or customer satisfaction data
- Growth numbers, user adoption stats, or scale metrics
- Awards, certifications, analyst recognition, or media coverage

Be specific. "Customers love us" is useless. "94% customer retention rate, 50+ enterprise customers, average ROI of 240% in first year" is actionable.

**Pro tip:** The proof points section is critical. Real numbers and customer quotes make everything else credible. If you don't have formal proof yet, use founding customer stories, pilot results, or even pre-sale validation from discovery calls.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a strategic marketing expert specializing in positioning and messaging. Your task is to develop comprehensive messaging artifacts for a client using April Dunford's Obviously Awesome positioning framework combined with Geoffrey Moore's value proposition structure.

## Your objective

Create a complete set of messaging and positioning artifacts that will serve as the foundation for the client's homepage, sales decks, and all customer-facing communications.

## Required deliverables

### 1. Positioning statement (Geoffrey Moore format)

Create a concise positioning statement following this structure:

For [target customer]  
Who [statement of need or opportunity]  
Our product is a [product category]  
That [key benefit/compelling reason to buy]  
Unlike [primary competitive alternative]  
We [primary differentiation]

### 2. Unique value propositions by persona/segment

For each target customer segment identified, develop:
- A primary value proposition (one compelling sentence)
- 3-5 supporting value pillars
- Specific outcomes/benefits relevant to that persona
- Emotional and rational drivers

### 3. Competitive differentiation statements

Create clear differentiation statements that:
- Identify what makes this solution uniquely different (not just better)
- Address the most common objection: "Why not just use [competitor]?"
- Frame differences as strengths, not feature comparisons
- Connect differentiation to customer value

### 4. Proof points matrix

Organize all evidence into:
- Quantitative metrics (with context)
- Customer testimonials (matched to claims)
- Case study summaries (problem → solution → result)
- Third-party validation (awards, analyst recognition, certifications)
- Map each proof point to specific claims/value props

### 5. Messaging architecture summary

Create a one-page messaging hierarchy showing:
- Core positioning statement
- Primary value proposition
- 3-5 key messaging pillars
- Supporting evidence for each pillar
- Recommended message prioritization by channel/audience

## Output format

Present your work in a clean, scannable format with:
- Clear headers for each section
- Bullet points for readability
- Callout boxes for the most critical statements
- A summary section at the beginning
- Notes on usage recommendations for different contexts (homepage vs. sales deck vs. email)

## Quality standards

Ensure all messaging is:
- **Clear:** Avoid jargon; use customer language
- **Specific:** Include concrete benefits, not vague claims
- **Credible:** Every claim backed by proof points
- **Differentiated:** Distinctly different from competitors
- **Compelling:** Emotionally resonant while rationally sound
- **Consistent:** Aligned across all statements and segments

## Client context

[Paste all your prepared inputs here]

### Company basics
- Company name: {{companyName}}
- Problem statement: {{coreProblem}}
- Target personas: {{buyerPersonas}}
- Product category: {{category}}

### Competitive context
- Primary competitors & alternatives: {{directCompetitors}}
- Reasons customers choose us: {{whyWeWin}}
- Win/loss insights: {{winLossData}}
- Category context: {{categoryContext}}

### Proof & validation
- Proof points: {{proofPoints}}
\`\`\`

---

## After you run it

Don't let this sit in a doc. Turn it into:
- **Homepage hero copy** using your core positioning and primary value prop
- **Sales deck opening slides** with positioning statement and persona-specific value props
- **Email templates** for outbound prospecting, segmented by persona
- **Sales battlecards** with differentiation statements and proof points
- **Product marketing briefs** so every launch uses consistent messaging
- **Content calendar themes** built around your messaging pillars

Test the messaging with customers and prospects. If they don't immediately get it or if they confuse you with competitors, your differentiation isn't sharp enough. Push back on the output and ask for more specificity.

Update this quarterly or after major product launches, competitive shifts, or positioning changes. Your category and proof points will evolve—your messaging should too.

## Examples

[Coming soon—sample value proposition frameworks from real consulting engagements]
`, visualLogic: `[FEATURES] -> {BENEFITS} -> [UVP]`,
        size: "featured",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L3_Core_Message/06_Unique_Value_Propositions",
        frameworks: ["Value Proposition Canvas", "Blue Ocean Strategy", "Jobs to be Done"],
        faq: [
            { question: "Can I have more than one UVP?", answer: "Ideally, no. You can have multiple value props for different personas, but your brand needs a single 'hook'." },
            { question: "What if we aren't unique?", answer: "Dig deeper. Uniqueness can be in your service model, pricing, specialized focus, or even your brand personality." }
        ]
    },
    {
        id: "L3.02",
        title: "Positioning Statement",
        slug: "positioning-statement",
        level: "Decision",
        levelTitle: "Decision",
        hook: "Draft an internal positioning statement to align your team.",
        promptContent: `# Brand positioning statement

## What this generates

Your complete brand positioning foundation using Geoffrey Moore's Positioning Template and April Dunford's Positioning Canvas. You'll get a precise positioning statement, competitive alternatives analysis, unique attributes mapping, value propositions, target segment definition, market category framing, proof points documentation, and a positioning-to-messaging bridge.

## Why you need this

Positioning is the strategic foundation everything else builds on. Without it, your messaging is inconsistent, your sales team tells different stories, and customers can't figure out where you fit or why you matter. This framework forces you to get brutally specific about who you're for, what makes you different, and why anyone should care—all backed by proof.

## Before you start

This prompt works best when you have:
- Real customer quotes about why they chose you and what value you deliver
- Win/loss data showing patterns in competitive deals
- Quantified customer outcomes (time saved, revenue increased, etc.)
- A clear sense of your competitive alternatives (including "do nothing")

If you're pre-revenue, you can still do this exercise based on customer discovery, competitive research, and strategic hypotheses. Just label assumptions vs. validated insights.

## Prepare your inputs

Fill out this form before running the prompt. The more specific and evidence-based your inputs, the sharper your positioning will be.

### Company basics

**{{companyName}}**  
Your legal entity or product name

**{{productDescription}}**  
What you sell or provide. Describe it in 50-150 words, focusing on what it does and the problem it solves, not feature lists.

**{{category}}**  
How do you currently describe your market category?  
Examples: "CRM for small businesses," "AI-powered code review platform," "workflow automation software for healthcare," "API infrastructure"

**{{originStory}}**  
Why was this created? What problem inspired it? Include the founder's "aha moment" or the frustration that led to building this solution.

### Customer understanding

**{{icpDescription}}**  
Who are your ideal customers? Include roles, company types, and situations.  
Example: "Mid-market B2B SaaS companies (50-500 employees) with remote sales teams struggling to maintain consistent messaging across reps"

**{{pains}}**  
What specific needs or problems do they experience? Be concrete about the pain, not just the solution.  
Example: "Sales reps waste 3-5 hours per week searching for the right content to send prospects, leading to inconsistent messaging and longer sales cycles"

**{{customerQuotes}}**  
Provide 5-10 verbatim quotes from customers about why they chose you, what value you provide, or how they describe you. Pull these from sales calls, customer interviews, reviews, or testimonials.

**{{successMetrics}}**  
Quantified outcomes customers have achieved using your solution.  
Examples: "Reduced sales cycle by 30%," "Increased win rate from 18% to 34%," "Saved 10 hours per week per rep," "Achieved $500K in additional revenue in first quarter"

### Competitive landscape

**{{directCompetitors}}**  
List 3-5 direct competitors. Include their names and a brief description if they're not well-known.

**{{alternatives}}**  
What do prospects use or do instead of your solution? Include manual processes, DIY approaches, incumbents, adjacent tools, or "do nothing."  
Example: "Shared Google Drives, email attachments, Salesforce content library, hiring a sales enablement manager, or just letting reps figure it out themselves"

**{{winLossData}}**  
Why do you win vs. competitors? Why do you lose? Be specific about patterns you've observed.  
Examples:  
- "We win when speed of implementation matters more than feature depth"  
- "We lose to Competitor X when prospects need on-premise deployment"  
- "We win against DIY solutions when companies hit 20+ sales reps and consistency breaks down"

### Differentiation & proof

**{{uniqueCapabilities}}**  
Features or capabilities only you offer (or do significantly better than alternatives). Focus on demonstrable, defensible differences—not just "better."  
Example: "AI-powered content recommendation engine that learns from won/lost deals, not just content consumption patterns"

**{{uniqueValue}}**  
Business outcomes only achievable through your unique capabilities. Connect your differentiation to customer results.  
Example: "Reps send the right content at the right time without searching, reducing sales cycle length and increasing win rates because messaging is consistently aligned to buyer stage"

**{{proofPoints}}**  
Evidence that validates your claims. Include:
- Case studies with problem → solution → result format
- Customer testimonials matched to specific value claims
- Quantitative data (retention rates, NPS, performance benchmarks, ROI calculations)
- Third-party validation (awards, analyst recognition, certifications, media coverage)

### Strategic direction

**{{businessGoals}}**  
What are you trying to achieve in the next 12-24 months?  
Examples: "Expand into enterprise segment," "Own the 'sales enablement for remote teams' category," "Double win rate against Competitor X"

**{{positioningChallenges}}**  
What current positioning problems are you trying to solve?  
Examples: "Prospects confuse us with generic CRMs," "We're perceived as too expensive," "Sales team describes us 5 different ways," "We're invisible in a crowded market"

**{{personalityTraits}}**  
3-5 adjectives describing how you want to be perceived. Reference your Brand Personality & Archetype doc if you've already created it.

**Pro tip:** The customer quotes section is gold. Real verbatim language from customers reveals positioning insights you can't manufacture. If you don't have quotes yet, go interview your last 5 customers or prospects and ask: "How would you describe us to a colleague?" and "Why did you choose us?"

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a world-class brand strategist specializing in positioning frameworks. Your task is to develop comprehensive brand positioning artifacts using Geoffrey Moore's Positioning Template and April Dunford's Positioning Canvas methodologies.

## Your deliverables

Create the following artifacts:

### 1. Geoffrey Moore positioning statement

Craft a precise positioning statement following this structure:

For [target customer]  
Who [statement of need or opportunity]  
The [product/service name] is a [product category]  
That [key benefit, reason to buy]  
Unlike [primary competitive alternative]  
Our product/solution [statement of primary differentiation]

### 2. April Dunford positioning canvas

Develop a detailed positioning canvas including:

**Competitive alternatives:**
- What would customers use/do if your solution didn't exist?
- List 3-5 realistic alternatives (including "do nothing")

**Unique attributes:**
- What capabilities/features do you have that alternatives don't?
- Focus on demonstrable, defensible differences (not just "better")

**Value (benefits):**
- What measurable value do those unique attributes enable?
- Translate features into business outcomes

**Target customer segments:**
- Who cares most about these specific value propositions?
- Define by psychographics, firmographics, and behaviors—not just demographics

**Market category:**
- What market context makes your value obvious?
- How do you frame the category to position your unique attributes as strengths?

### 3. Proof points documentation

For each unique attribute and value claim, provide:
- Customer testimonials/quotes validating the claim
- Quantitative data (metrics, ROI, performance benchmarks)
- Case studies or specific use cases
- Third-party validation (awards, analyst recognition, certifications)

### 4. Positioning-to-messaging bridge

Create a mapping document showing how the positioning statement directly informs:
- Core messaging pillars (3-5 key themes)
- Value propositions per customer segment
- Differentiation narratives
- Proof point alignment to each pillar

## Output format

Structure your response as follows:
1. Executive summary (150-200 words)
2. Geoffrey Moore positioning statement (formatted template)
3. April Dunford positioning canvas (detailed breakdown with rationale)
4. Proof points matrix (organized by claim type)
5. Positioning-to-messaging map (visual/table format)
6. Implementation recommendations (how to activate this positioning)

Use authentic customer language throughout. Prioritize clarity over cleverness. Ensure every claim is defensible with provided proof points.

## Client context

[Paste all your prepared inputs here]

### Company basics
- Company name: {{companyName}}
- Product/service description: {{productDescription}}
- Product category: {{category}}
- Founding story context: {{originStory}}

### Customer understanding
- Target customer description: {{icpDescription}}
- Customer needs/problems: {{pains}}
- Current customer quotes: {{customerQuotes}}
- Customer success metrics: {{successMetrics}}

### Competitive landscape
- Main competitors: {{directCompetitors}}
- Competitive alternatives: {{alternatives}}
- Win/loss insights: {{winLossData}}

### Differentiation & proof
- Unique capabilities: {{uniqueCapabilities}}
- Unique value delivered: {{uniqueValue}}
- Proof points: {{proofPoints}}

### Strategic direction
- Business goals: {{businessGoals}}
- Positioning challenges: {{positioningChallenges}}
- Brand personality: {{personalityTraits}}
\`\`\`

---

## After you run it

Don't just admire the output. Activate it:
- **Test it with customers** - Does the positioning resonate? Do they immediately get it?
- **Train your team** - Sales, support, marketing all need to internalize this
- **Audit existing content** - Does your website, deck, and collateral match this positioning?
- **Build messaging templates** - Create email, social, and sales talk tracks from the messaging bridge
- **Update competitive battlecards** - Your differentiation statements become your competitive playbook
- **Refine over time** - Track which positioning elements resonate in deals and iterate

If prospects still confuse you with competitors or can't articulate your differentiation back to you, your positioning isn't sharp enough. Push back on the output and demand more specificity.

Update this annually or after major shifts: new target market, significant product evolution, competitive landscape changes, or when your current positioning stops working in the market.

## Examples

[Coming soon—sample positioning frameworks from real consulting engagements]
`, visualLogic: `[SEGMENT] + [CATEGORY] + [BENEFIT] -> [POSITIONING]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L3_Core_Message/07_Brand_Positioning_Statement",
        frameworks: ["Crossing the Chasm (Geoffrey Moore)", "April Dunford's Positioning", "Category Design"],
        faq: [
            { question: "Is this for the website?", answer: "No. This is an internal tool to align product, sales, and marketing. External messaging is derived from this." },
            { question: "How specific should the category be?", answer: "Specific enough to be relevant, broad enough to grow. 'CRM for dentists' is better than just 'CRM'." }
        ]
    },
    {
        id: "L3.03",
        title: "Brand Promise",
        slug: "brand-promise",
        level: "Decision",
        levelTitle: "Decision",
        hook: "Define the commitment you make to every customer.",
        promptContent: `# Brand promise

## What this generates

Your complete brand promise framework using Duane Knapp's Brand Promise methodology. You'll get an external customer-facing promise, internal employee-facing promise, three promise pillars with measurable standards, proof points, KPIs for tracking delivery, and a recovery protocol for when things go wrong. This translates your aspirations into concrete, measurable commitments.

## Why you need this

Most companies make vague promises they can't measure or deliver consistently. "We deliver excellence" means nothing. A real brand promise is specific, measurable, and backed by systems that track delivery and fix failures. This framework ensures your promise is authentic (you can actually deliver it), distinctive (competitors aren't saying the same thing), and valuable (customers actually care).

## Before you start

This prompt works best when you have:
- Clear patterns in customer feedback—what they consistently praise and complain about
- Operational data showing what you can reliably deliver every time
- Examples of how you currently handle failures or complaints
- Understanding of what drives customer loyalty and retention

If you're early-stage, you can build this based on founder vision, customer discovery interviews, and your operational capabilities. Just be honest about what you can guarantee vs. what you aspire to deliver.

## Prepare your inputs

Fill out this form before running the prompt. The more honest and specific you are about both your strengths and failure points, the more credible your promise will be.

### Customer feedback

**{{customerPraise}}**  
What do customers consistently praise about your organization? Pull from reviews, testimonials, sales calls, support tickets, or NPS comments.  
Example: "Customers constantly mention our response time—'I always get an answer within an hour' shows up in almost every positive review"

**{{customerComplaints}}**  
What's your most repeated customer complaint or pain point? Be honest—this helps you build a promise around what matters most.  
Example: "Onboarding takes too long and feels confusing. Customers say they don't know what to do first or who to ask for help"

**{{praisedAttributes}}**  
Data or feedback on your most praised brand attributes. Include specific quotes, review snippets, or testimonials.  
Example: "'Your team actually understands our industry' - CTO at mid-market SaaS company. 'We've never had a vendor respond this fast' - VP Operations at healthcare tech startup"

### Strategic direction

**{{desiredReputation}}**  
What do you want to be known for? What's the reputation you're building toward?  
Example: "The most responsive and reliable partner for scaling sales teams—the vendor you can count on when growth is chaotic"

**{{brandPromise}}**  
What can you guarantee will happen every single time a customer interacts with you? Only include what you can truly, consistently deliver.  
Example: "Every support ticket gets a human response within 2 hours during business hours, and a resolution path within 24 hours"

**{{retentionDrivers}}**  
What makes your best customers stay loyal? Why don't they churn?  
Example: "Customers who stay 3+ years say it's because we evolve with them—they don't have to switch vendors when they scale. They also mention our customer success team knows their business deeply"

### Operational reality

**{{failureResponse}}**  
What happens when things go wrong? Describe your current approach to handling failures, complaints, or service breakdowns.  
Example: "Currently, customer success manually escalates issues to engineering. Average resolution time is 4-7 days. No formal process for communicating progress to customers during that window"

**{{failureScenarios}}**  
List 3-5 realistic failure scenarios or breakdown points in your customer experience. Where do things typically go wrong?  
Examples:  
- "Onboarding takes longer than promised when customer has complex integrations"  
- "Feature requests get lost and customers don't hear back"  
- "Support response times spike during product launches"  
- "Implementation team gets overwhelmed during Q4 and timelines slip"

**Pro tip:** The failure scenarios and complaints sections are just as important as the praise. A credible brand promise acknowledges where you might break down and builds recovery protocols around it. Don't skip the uncomfortable questions.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a brand strategist specializing in Duane Knapp's Brand Promise methodology. Your task is to develop a comprehensive brand promise framework that defines what the organization commits to delivering to customers and employees, including measurement systems and recovery protocols.

## Context

Using the client information provided below, create a complete brand promise system that translates the organization's aspirations into concrete, measurable commitments. The brand promise should be authentic (based on what they can truly deliver), distinctive (differentiated from competitors), and valuable (meaningful to target audiences).

## Required outputs

Create the following brand promise artifacts (800-1000 words total):

### 1. External brand promise (10-15 words)

A customer-facing promise statement that is:
- Clear and memorable
- Benefit-focused (not feature-focused)
- Emotionally resonant
- Credible and deliverable
- Differentiated from competitors

### 2. Internal brand promise (1 statement)

An employee-facing promise that:
- Translates the external promise into internal commitment
- Defines what employees must deliver
- Inspires and guides behavior
- Creates accountability

### 3. Three promise pillars with standards

For each pillar, include:
- Pillar name (2-4 words)
- Description of what this pillar means (2-3 sentences)
- Specific, measurable standard of delivery
- Connection to customer experience

### 4. Proof points (3-5 concrete examples)

Evidence that demonstrates the organization delivers on its promise:
- Existing programs, policies, or practices
- Customer testimonials or data
- Operational capabilities
- Unique differentiators
- Tangible examples customers can verify

### 5. Key performance indicators (3-5 metrics)

Specific, measurable KPIs to track promise delivery:
- Leading indicators (predict future performance)
- Lagging indicators (measure results)
- Both quantitative and qualitative measures
- Trackable through existing or reasonable data collection
- Linked directly to promise pillars

### 6. Recovery protocol

A framework for when the promise is broken:
- **Acknowledgment:** How to recognize and admit the failure
- **Immediate response:** First actions within 24 hours
- **Resolution process:** Steps to fix the problem
- **Prevention:** How to avoid repeat failures
- **Restoration:** How to rebuild trust with affected customers

## Formatting instructions

- Use clear headers for each section
- Write in a professional but accessible tone
- Include brief rationale for key recommendations
- Ensure all elements connect cohesively to the core promise
- Bold key terms and statements
- Use bullet points for clarity where appropriate

## Quality standards

The output should demonstrate:
- Strategic alignment between external promise and internal capability
- Realistic commitments (avoid over-promising)
- Measurable success criteria
- Actionable recovery plans
- Authentic reflection of client's actual strengths and values

## Client context

[Paste all your prepared inputs here]

### Customer feedback
- What customers consistently praise: {{customerPraise}}
- Most repeated complaint: {{customerComplaints}}
- Most praised attributes: {{praisedAttributes}}

### Strategic direction
- Desired reputation: {{desiredReputation}}
- Guaranteed delivery: {{brandPromise}}
- Retention drivers: {{retentionDrivers}}

### Operational reality
- Current failure response: {{failureResponse}}
- Potential failure scenarios: {{failureScenarios}}
\`\`\`

---

## After you run it

Don't let this become aspirational fluff. Make it operational:
- **Train every team** on the promise—sales, support, product, engineering, everyone
- **Build the KPI dashboard** and review it weekly in leadership meetings
- **Document the recovery protocol** and role-play failure scenarios with customer-facing teams
- **Test promise delivery** by mystery shopping your own experience
- **Update hiring criteria** to include "lives our brand promise" as a core competency
- **Link compensation** to promise delivery metrics for customer-facing roles

If you can't measure it or you're not willing to fire people who consistently break it, it's not a real promise—it's marketing copy.

Review quarterly. Your promise should be stable, but standards and KPIs can evolve as you improve operational capabilities. If you consistently overdeliver on your promise, it might be time to raise the bar.

## Examples

[Coming soon—sample brand promise frameworks from real consulting engagements]
`, visualLogic: `[EXPERIENCE] -> {CONSISTENCY} -> [PROMISE]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L3_Core_Message/08_Brand_Promise",
        frameworks: ["Blue Ocean Strategy", "Kano Model", "Brand Trust Matrix"],
        faq: [
            { question: "Is this a slogan?", answer: "It can be, but it's more about the operational commitment. A slogan is marketing; a promise is business logic." },
            { question: "What if we break the promise?", answer: "It damages trust immediately. Only promise what you can consistently deliver." }
        ]
    },
    {
        id: "L3.04",
        title: "Strategic Messaging Pillars",
        slug: "strategic-messaging-pillars",
        level: "Decision",
        levelTitle: "Decision",
        hook: "Establish the 3-4 key themes that support your value proposition.",
        promptContent: `# Core messaging pillars

## What this generates

Your complete core messaging framework with 3-5 named messaging pillars built on the Rule of Three and Challenger Sale's Commercial Teaching methodology. You'll get detailed pillar narratives, proof architecture, persona mapping, competitive response strategy, content activation plan, content calendar framework, and sales enablement notes. These pillars become the foundation for all customer communications.

## Why you need this

Random content and scattered messaging don't build conviction. You need 3-5 core themes that customers can remember, repeat, and act on. These pillars give your team a shared vocabulary, help sales reps lead better conversations, and ensure every piece of content ladders up to strategic positioning. Without pillars, you get marketing chaos—with them, you get a system that teaches customers why you matter and leads them to your unique strengths.

## Before you start

This prompt works best when you have:
- Clear patterns in what resonates during sales conversations (what questions land, what stories convert)
- Content performance data showing which topics drive engagement or conversions
- Customer feedback revealing beliefs you need to change or misconceptions to address
- Competitive intelligence about the narratives you need to counter

If you're early-stage, you can build this based on founder insights, customer discovery patterns, and strategic hypotheses about what will differentiate you. Just be ready to test and iterate as you learn what actually drives conviction.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your examples and data, the sharper your messaging pillars will be.

### Customer intelligence

**{{customerPriorities}}**  
What are the 3-5 things your customers care most about? Include specific pain points, business objectives, and success metrics they're measured on.  
Example: "1) Reducing sales cycle length—reps are measured on time-to-close. 2) Increasing win rates against competitors. 3) Maintaining consistent messaging across a growing team. 4) Proving ROI to leadership within first quarter. 5) Avoiding lengthy, disruptive implementations"

**{{beliefShifts}}**  
What beliefs or assumptions do you need to change in your market? What current misconceptions, outdated approaches, or status quo thinking prevents customers from seeing your value?  
Example: "Belief to shift: 'Sales enablement is just a content library.' Reality we need to teach: 'Real enablement is about behavior change and rep consistency, not just organizing files.'"

**{{winningConversations}}**  
What do your best sales conversations sound like? Include actual quotes, questions that land well, conversation patterns from top performers, or moments where prospects have "aha" insights.  
Example: "Our best reps ask: 'How much time does your average rep spend searching for the right content to send?' Prospects usually say '3-5 hours a week.' Then we ask: 'What if your top performer's approach was automatically replicated across your entire team?' That's when they lean in."

### Content & market performance

**{{highPerformingContent}}**  
What content topics, formats, or messages have performed best? Include engagement metrics, conversion data, qualitative feedback, or patterns in what gets shared/saved/referenced.  
Example: "Our 'Sales Velocity Calculator' tool gets 10x more conversions than any other lead magnet. Blog posts about 'onboarding new reps faster' have 3x higher engagement than posts about features. Case studies showing time-to-productivity improvements get requested most often in late-stage deals."

**{{competitiveLandscape}}**  
What competitor claims do you need to counter? List specific messaging, positioning angles, and market narratives from 2-3 key competitors.  
Example: "Competitor A: 'We have the most comprehensive feature set and integrations.' Competitor B: 'We're the easiest to implement—up and running in 24 hours.' Competitor C: 'AI-powered recommendations mean reps don't have to think.'"

### Strategic differentiation

**{{productStrategy}}**  
What makes your product strategy, approach, or methodology unique? Include proprietary frameworks, exclusive capabilities, or distinctive approaches that only you offer.  
Example: "We're the only platform that learns from won/lost deals, not just content consumption. Our algorithm analyzes what content was sent in deals that closed vs. deals that lost, and recommends based on deal stage + buyer profile + competitive situation. We have a proprietary 'Deal Context Engine' that competitors can't replicate."

### Optional context

**{{voiceGuidelines}}**  
If you've already defined your brand voice and tone, include it here or reference your Brand Voice & Tone doc.

**{{existingMessaging}}**  
Any current messaging documents, positioning statements, or value props you already use.

**{{buyerPersonas}}**  
Names and brief descriptions of your target personas. Reference your Target Customer Profiles if you've already created them.

**{{customerFeedback}}**  
Recent customer feedback, win/loss analysis, or patterns from customer success conversations.

**Pro tip:** The "winning conversations" section is gold. If you can pull actual quotes or moments from sales calls where prospects had breakthrough insights, those become the foundation for your pillar narratives. Use Gong, call recordings, or interview your top 3 reps.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are an expert strategic messaging architect specializing in developing core messaging pillars that drive customer conviction and commercial outcomes. Using the Rule of Three framework and Challenger Sale's Commercial Teaching methodology, you will create 3-5 powerful messaging pillars that form the foundation of all customer communications.

## Your task

Develop a comprehensive Core Messaging Pillars framework that includes:
- 3-5 named messaging pillars - Each representing a distinct theme that resonates with target customers and differentiates the brand
- Detailed pillar narratives - Compelling stories for each pillar that teach customers something new and challenge their current thinking
- Proof architecture - Supporting evidence, data points, and validation for each pillar
- Persona mapping - Clear guidance on which pillars resonate most with each target persona
- Competitive response strategy - How each pillar neutralizes competitor positioning
- Content activation plan - Specific content ideas and usage guidance for each pillar
- Content calendar framework - Strategic sequencing of pillar-based messaging across channels

## Context & methodology

Apply the Rule of Three principle to ensure memorable, persuasive messaging that customers can retain and repeat. Use the Challenger Sale Commercial Teaching approach to craft pillars that:
- Teach customers something valuable about their business
- Tailor the message to their specific circumstances
- Take control by leading to your unique capabilities

Each pillar should follow the structure: Reframe → Rationalize → Emotional Connection → Unique Capability Link

## Output structure

Deliver a 1200-1500 word strategic document formatted as follows:

### Executive summary
Brief overview of the pillar strategy and how it supports positioning (100-150 words)

### Messaging pillars overview

For each of the 3-5 pillars, provide:

**Pillar [#]: [Compelling Pillar Name]**

- **Core narrative (150-200 words):** The teaching story that reframes customer thinking
- **Key messages (3-4 bullet points):** Memorable statements that capture the pillar essence
- **Proof points (3-5 items):** Data, case studies, third-party validation, or demonstrable evidence
- **Customer beliefs addressed:** Which misconceptions this pillar changes
- **Emotional driver:** The underlying emotional motivation this pillar taps into

### Persona-to-pillar mapping matrix

Table or grid showing:
- Which personas are most influenced by each pillar (Primary/Secondary)
- Recommended lead pillar by persona
- Messaging emphasis adjustments by persona

### Competitive response guide

For each major competitor claim identified:
- Which pillar(s) provide the counter-narrative
- Specific rebuttal talking points
- Redirection strategy to your strengths

### Content activation plan

For each pillar:
- **Content ideas (5-7 per pillar):** Specific topics, formats, and angles
- **Channel recommendations:** Where each pillar performs best
- **Usage guidance:** When to lead with this pillar (buying stage, use case, persona)
- **Proof type priority:** Which evidence types to emphasize

### Content calendar framework

- Quarterly thematic focus recommendations
- Pillar rotation and integration strategy
- Campaign sequencing that builds progressive conviction
- Multi-pillar narrative arc suggestions

### Sales enablement notes

- Pillar-based conversation starters
- Discovery questions aligned to each pillar
- Objection handling connected to pillars
- Win story examples for each pillar

## Client context

[Paste all your prepared inputs here]

### Customer intelligence
- Customer priorities: {{customerPriorities}}
- Belief shifts needed: {{beliefShifts}}
- Winning conversations: {{winningConversations}}

### Content & market performance
- High-performing content: {{highPerformingContent}}
- Competitive landscape: {{competitiveLandscape}}

### Strategic differentiation
- Product strategy: {{productStrategy}}

### Optional context (if available)
- Brand voice guidelines: {{voiceGuidelines}}
- Existing messaging: {{existingMessaging}}
- Target personas: {{buyerPersonas}}
- Customer feedback: {{customerFeedback}}
\`\`\`

---

## After you run it

Turn these pillars into your messaging operating system:
- **Train every customer-facing team** on all pillars—sales, CS, marketing, product marketing
- **Build pillar-specific content libraries** organized by persona and buying stage
- **Create conversation guides** for sales that show how to introduce each pillar
- **Map existing content** to pillars and identify gaps
- **Score opportunities** based on which pillars resonate most in discovery
- **Review win/loss** through the lens of "which pillars did we lead with?"

Test pillar resonance in real conversations. If reps struggle to explain a pillar or customers don't have "aha moments," the narrative needs work. Push back on the LLM and ask for clearer teaching stories.

Refresh annually or when positioning shifts. Pillars should be stable, but the proof points, content activation, and competitive response will evolve as your market matures and competitors react.

## Examples

[Coming soon—sample core messaging pillars from real consulting engagements]
`, visualLogic: `[UVP] -> {THEMES} -> [PILLARS]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/09_Core_Messaging_Pillars",
        frameworks: ["Rule of Three", "Feature-Benefit-Value", "Pyramid Principle"],
        faq: [
            { question: "Why only 3-4?", answer: "Human memory is limited. More than 4 dilutes your message and confuses the audience." },
            { question: "how do I use these?", answer: "Every blog post, email, or ad should map back to one of these pillars." }
        ]
    },
    {
        id: "L3.05",
        title: "Message Map",
        slug: "message-map",
        level: "Decision",
        levelTitle: "Decision",
        hook: "Create a hierarchy of messages for different audiences.",
        promptContent: `# Message map

## What this generates

Your complete one-page message map using the proven 1-3-9 framework: 1 headline (your overarching brand promise), 3 key messages (primary value pillars), and 9 proof points (3 supporting pieces of evidence for each key message). This becomes your messaging north star—the foundation for sales conversations, content creation, and all communications.

## Why you need this

Without a message map, every team creates their own version of your story. Sales reps emphasize different benefits. Marketing highlights different value props. Your website says one thing, your deck says another. The 1-3-9 framework forces brutal prioritization and creates a shared language that fits on one page. If your team can't articulate your value consistently, your customers definitely can't.

## Before you start

This prompt works best when you have:
- Clear differentiation from competitors (not just "we're better," but truly different)
- Quantifiable proof points—metrics, testimonials, case studies with real numbers
- Understanding of what business outcomes your buyers care about most
- Competitive intelligence about what claims you need to counter

If you're early-stage, you can build this based on customer discovery insights, founder vision, and strategic positioning. Just be ready to validate and refine as you get market feedback.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your differentiators and proof points, the sharper your message map will be.

### Company basics

**{{companyName}}**  
Your company or brand name

**{{buyerPersonas}}**  
Primary buyer personas or decision-maker roles.  
Examples: "CFOs at mid-market manufacturing companies," "VPs of Sales at B2B SaaS companies (50-500 employees)," "IT Directors at healthcare organizations"

**{{voiceDescription}}**  
Desired tone and personality for messaging. Reference your Brand Voice & Tone doc if you've already created it.  
Examples: "Bold and visionary," "Trusted and enterprise-grade," "Innovative yet approachable," "Expert but not intimidating"

### Differentiation & value

**{{differentiators}}**  
List 3-5 biggest differentiators that set you apart from competitors. Be specific—not just "better" but "different."  
Examples:  
- "Only platform that learns from won/lost deals, not just content consumption"  
- "Built specifically for remote sales teams—not retrofitted from in-office workflows"  
- "Implementation in 48 hours vs. industry average of 6-8 weeks"

**{{customerOutcomes}}**  
Top 3-5 business outcomes that matter most to your buyers—the results they're measured on.  
Examples: "Reduce sales cycle length," "Increase win rates," "Improve rep productivity," "Accelerate onboarding of new hires," "Maintain consistent messaging at scale"

### Proof & credibility

**{{proofMetrics}}**  
Key metrics, results, or outcomes you can demonstrate. Include specific numbers with context.  
Examples: "95% customer retention rate," "Average 3x ROI within 6 months," "500+ enterprise customers," "Reduced onboarding time from 90 days to 21 days," "Increased win rates by an average of 28%"

**{{testimonials}}**  
Direct quotes or paraphrased feedback from satisfied customers. Include attribution (name, title, company) if possible.  
Example: "'We cut our sales cycle by 40% in the first quarter.' - VP of Sales, mid-market SaaS company"

**{{awards}}**  
Any relevant certifications, awards, partnerships, or third-party validations.  
Examples: "SOC 2 Type II certified," "Named Leader in Gartner Magic Quadrant," "G2 Top 50 Sales Software 2024," "Strategic partnership with Salesforce"

### Competitive context

**{{competitorClaims}}**  
What are your main competitors claiming? What messages do you need to counter or differentiate against?  
Example: "Competitor A claims 'most comprehensive feature set.' Competitor B claims 'easiest implementation—live in 24 hours.' Competitor C claims 'AI does all the work so reps don't have to think.'"

**{{additionalContext}}**  
Any other relevant information about market position, recent company developments, or strategic priorities.

**Pro tip:** The proof points make or break this exercise. "Customers love us" is useless. "94% retention rate, 50+ G2 reviews averaging 4.8/5 stars, and 3 customers featured in Forrester case studies" is powerful. Gather real data before you start.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a strategic messaging expert specializing in creating clear, compelling, and defensible message hierarchies for B2B and B2C brands. Your task is to develop a comprehensive Message Map using the proven 1-3-9 framework (1 Headline, 3 Key Messages, 9 Proof Points).

## Context

The Message Map is a foundational messaging tool that enforces clarity and prioritization. It enables sales teams to deliver consistent conversations, helps marketers create aligned content, and ensures all communications ladder up to a single, compelling brand promise. The structure is intentionally concise and memorable—designed to fit on one page and serve as the north star for all messaging efforts.

## Framework structure

### 1. Headline (overarching brand promise)

- One sentence that captures the brand's unique value proposition
- Must be concise (10-15 words maximum), compelling, and memorable
- Should differentiate from competitors while resonating with target buyers
- Think: "What is the ONE thing we want everyone to remember about us?"

### 2. Three key messages (primary value pillars)

- Three distinct supporting themes that reinforce and elaborate on the headline
- Each should address a separate dimension of value or benefit
- 15-20 words each
- These become the foundation for different content pieces, sales conversations, and campaign themes

### 3. Proof points (three per key message = 9 total)

- Specific, credible evidence that validates each key message
- Can include: customer testimonials/quotes, quantifiable metrics, certifications, awards, case study results, technical differentiators, or industry recognition
- 1-2 sentences each, with data/specifics when possible
- Must be defensible and verifiable

## Your task

Using the client inputs provided below, create a strategic Message Map that:
- Clearly differentiates {{companyName}} from competitors
- Speaks directly to the business outcomes that matter to {{buyerPersonas}}
- Leverages the strongest proof points available
- Counters or sidesteps competitor claims
- Maintains strategic coherence across all three levels

## Output requirements

### Format:
- 1 Headline (10-15 words max)
- 3 Key Messages (15-20 words each)
- 9 Proof Points (1-2 sentences each, with data when possible)
- Total length: 300-400 words
- Structured to fit on one page/slide

### Tone & style:
- Follow {{voiceDescription}} guidelines
- Language should be clear, jargon-free (unless industry-specific terms add credibility)
- Active voice preferred
- Benefits-focused rather than feature-focused

### Strategic considerations:
- Ensure each key message represents a distinct value pillar (avoid overlap)
- Distribute proof points strategically—use the strongest evidence for each message
- Where competitors make similar claims, find angles that differentiate or provide superior proof
- Balance emotional appeal (headline/key messages) with rational credibility (proof points)

## Client context

[Paste all your prepared inputs here]

### Company basics
- Company name: {{companyName}}
- Target buyers: {{buyerPersonas}}
- Brand voice: {{voiceDescription}}

### Differentiation & value
- Top differentiators: {{differentiators}}
- Buyer outcomes: {{customerOutcomes}}

### Proof & credibility
- Provable metrics: {{proofMetrics}}
- Customer testimonials: {{testimonials}}
- Certifications/awards: {{awards}}

### Competitive context
- Competitor claims: {{competitorClaims}}
- Additional context: {{additionalContext}}
\`\`\`

---

## After you run it

Make this operational, not decorative:
- **Print it** and put it on every wall in your office—sales bullpen, marketing team area, customer success desks
- **Train everyone** on the map—test them until they can recite the headline and three key messages without looking
- **Build content briefs** that map to each key message (blog posts, case studies, webinars)
- **Create sales talk tracks** that open with the headline and weave in key messages naturally
- **Score content** based on whether it supports one of the three key messages (if it doesn't, kill it)
- **Review every major deliverable** (website, deck, one-pager) against the map before shipping

Test the map in real conversations. If prospects don't remember your headline after a 30-minute call, it's not sticky enough. If sales reps are still making up their own messaging, the key messages aren't clear enough. Push back on the output and demand more memorability.

Update quarterly or when positioning shifts. The headline should be stable, but key messages and proof points will evolve as you gather more customer wins, launch new capabilities, or respond to competitive moves.

## Examples

[Coming soon—sample message maps from real consulting engagements]
`, visualLogic: `[CORE] -> {AUDIENCES} -> [ADAPTED_MESSAGES]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/10_Message_Map",
        frameworks: ["Message House", "Lushin's Message Map", "Stakeholder Analysis"],
        faq: [
            { question: "Why do I need different messages?", answer: "A CFO cares about ROI. A Developer cares about API documentation. Same product, different 'why'." },
            { question: "Does this replace the pillars?", answer: "No, it adapts the pillars to specific listeners." }
        ]
    },

    // --- Activation (Content) ---
    {
        id: "L4.01",
        title: "Elevator Pitch",
        slug: "elevator-pitch",
        level: "Activation",
        levelTitle: "Activation",
        hook: "Craft a verbal introduction to your business.",
        promptContent: `# Elevator pitch & boilerplate

## What this generates

Your complete suite of elevator pitches and boilerplate text using Guy Kawasaki's 10/20/30 Rule and AP Style guidelines. You'll get tiered pitches (1-sentence, 30-second, 60-second), audience-specific variants (executive, technical, general), AP-style boilerplate paragraphs (short, standard, long), and application examples showing how to use them across channels.

## Why you need this

Every team member needs a consistent, rehearsed way to introduce your company—whether it's a 10-second hallway conversation, a 30-second cold call, or a 60-second investor pitch. Without this, your sales rep says one thing, your CEO says another, and your marketing team writes something completely different. This framework gives everyone the same story, adapted for different contexts and audiences, so you sound like one company instead of five.

## Before you start

This prompt works best when you have:
- Clear positioning and differentiation already defined (reference your Positioning Statement and Message Map)
- Credibility markers ready: awards, client names, metrics, milestones
- A sense of your brand voice and tone (reference your Brand Voice & Tone doc)
- Real customer outcomes or proof points you can cite

If you're early-stage, you can still create these based on founder vision and strategic positioning. Just be ready to refine as you gather proof points and market validation.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your inputs, the more credible and differentiated your pitches will be.

### Company overview

**{{companyName}}**  
Your official company name

**{{industry}}**  
Your industry or market category.  
Examples: "B2B SaaS," "Healthcare technology," "Sales enablement software," "API infrastructure"

**{{targetAudiences}}**  
Primary audience segments (list 2-3).  
Examples: "VPs of Sales at mid-market B2B companies, Sales enablement managers, Revenue operations leaders"

**{{coreProblem}}**  
The main problem your customers face. Be specific and use customer language.  
Example: "Sales teams struggle to maintain consistent messaging across reps as they scale, leading to longer sales cycles and lower win rates"

**{{uniqueSolution}}**  
How your product/service solves this problem uniquely—not just better, but different.  
Example: "AI-powered content recommendation engine that learns from won/lost deals, not just content consumption, to automatically replicate top performer behavior"

**{{customerOutcomes}}**  
Primary benefits or results customers achieve. Use specific metrics if possible.  
Examples: "Reduce sales cycle by 30%," "Increase win rates by 25%," "Cut rep onboarding time from 90 to 21 days"

### Positioning foundation

**{{categoryPosition}}**  
How you position within your category.  
Examples: "Category leader in sales enablement for remote teams," "Disruptive challenger in CRM space," "Niche specialist for healthcare compliance software"

**{{differentiators}}**  
Top 2-3 factors that distinguish you from competitors. Be specific.  
Examples: "Only platform that learns from deal outcomes, not usage," "48-hour implementation vs. industry average of 6-8 weeks," "Built specifically for remote sales teams from day one"

**{{voiceDescription}}**  
Your brand's tone and personality. Reference your Brand Voice & Tone doc if you've already created it.  
Examples: "Authoritative yet approachable," "Technical and precise," "Bold and innovative," "Expert but not intimidating"

### Credibility elements

**{{yearFounded}}**  
Company founding year

**{{keyMilestones}}**  
2-3 significant company achievements or timeline moments.  
Examples: "Raised $10M Series A from Sequoia," "Surpassed 500 enterprise customers," "Named to Forbes Cloud 100," "Achieved SOC 2 Type II certification"

**{{awards}}**  
Notable awards, certifications, or industry recognition.  
Examples: "G2 Top 50 Sales Software 2024," "Gartner Cool Vendor," "Inc. 5000 Fastest Growing Companies," "SOC 2 Type II certified"

**{{notableClients}}**  
Recognizable customers or partners (if applicable and permissible to name).  
Example: "Trusted by companies like Stripe, HubSpot, and Notion"

**{{growthMetrics}}**  
Relevant metrics like customers served, funding raised, market presence (optional).  
Examples: "500+ enterprise customers across 30 countries," "$25M in funding from top-tier VCs," "95% customer retention rate"

**Pro tip:** For the boilerplate, stick to verifiable facts only. No "world-class," "cutting-edge," or "revolutionary" claims. Think like a journalist would write about you—factual, third-person, no hyperbole. That's what makes it credible for press releases and partner announcements.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are an expert brand messaging strategist specializing in creating concise, compelling company narratives. Using Guy Kawasaki's 10/20/30 Rule and AP Style guidelines, create a comprehensive set of elevator pitches and a standardized boilerplate for {{companyName}}.

## Deliverables

### 1. Tiered elevator pitches

Create elevator pitches for each scenario, following the Problem → Solution → Outcome structure:

**A. 1-sentence pitch (10-15 words)**
- Ultimate compression for quick introductions
- Lead with the transformational outcome

**B. 30-second pitch (~75 words)**
- Suitable for: Brief networking, cold outreach, email signatures
- Include: Problem hook, solution summary, unique differentiator, outcome

**C. 60-second pitch (~150 words)**
- Suitable for: Formal introductions, investor meetings, podcast intros
- Include: Context-setting, problem depth, solution mechanism, proof point, call-to-action

### 2. Audience-specific pitch variants

Adapt the 30-second pitch for:

**A. Executive/C-suite audience**
- Focus on business outcomes, ROI, strategic value
- Use business language, minimize technical jargon

**B. Technical/practitioner audience**
- Emphasize methodology, technical approach, implementation
- Use industry-specific terminology appropriately

**C. General/consumer audience**
- Simplify language, focus on relatable benefits
- Use analogies and accessible metaphors

### 3. AP-style boilerplate paragraph

Create a 75-100 word standardized boilerplate that includes:
- Company name and founding year
- Clear category definition
- Core value proposition
- Key differentiator
- Brief credibility marker (client, award, or metric)
- Website URL

**Format requirements:**
- Third-person, present tense
- AP Style adherence (state abbreviations, number style, punctuation)
- No marketing hyperbole or subjective claims
- Facts and verifiable statements only
- Suitable for press releases, partner announcements, and media kits

### 4. Boilerplate variations

**A. Short boilerplate (50 words)**
- For space-constrained contexts: email footers, social bios, directory listings

**B. Long boilerplate (150 words)**
- For comprehensive contexts: annual reports, major announcements, investment materials
- Include additional history, leadership, or market context

### 5. Application examples

Demonstrate usage in:
- Email signature format
- LinkedIn "About" section (company page)
- Press release footer
- Partnership announcement template

## Formatting & style guidelines

- Maintain {{voiceDescription}} throughout all variants
- Ensure consistency with positioning from {{categoryPosition}}
- Use active voice and strong verbs
- Avoid clichés ("cutting-edge," "world-class," "revolutionary")
- Make every word count—prioritize clarity and impact
- Ensure pitches can be spoken naturally (read aloud test)

## Client context

[Paste all your prepared inputs here]

### Company overview
- Company name: {{companyName}}
- Industry: {{industry}}
- Target audiences: {{targetAudiences}}
- Core problem: {{coreProblem}}
- Unique solution: {{uniqueSolution}}
- Key outcomes: {{customerOutcomes}}

### Positioning foundation
- Category position: {{categoryPosition}}
- Differentiators: {{differentiators}}
- Brand voice: {{voiceDescription}}

### Credibility elements
- Year founded: {{yearFounded}}
- Key milestones: {{keyMilestones}}
- Awards: {{awards}}
- Notable clients: {{notableClients}}
- Growth metrics: {{growthMetrics}}
\`\`\`

---

## After you run it

Put these to work immediately:
- **Train everyone** on the pitches—CEO, sales, marketing, even engineering should know the 30-second version
- **Record yourself** delivering each pitch and time it—if you can't say it naturally in the allotted time, it's too long
- **Update email signatures** with the 1-sentence pitch
- **Refresh LinkedIn company page** with the boilerplate
- **Create a "boilerplate library"** doc so everyone uses the same text for press releases, partner announcements, etc.
- **Test with strangers** at networking events—if they don't immediately get what you do, simplify the language

Role-play the pitches with your team. If someone stumbles over a phrase or struggles to remember the structure, it's not tight enough. Push back on the output and ask for more natural, conversational language.

Update these when positioning shifts, major milestones happen, or your differentiation evolves. The 1-sentence pitch should be stable, but proof points and credibility markers will change as you grow.

## Examples

[Coming soon—sample elevator pitches and boilerplates from real consulting engagements]
`, visualLogic: `[HOOK] -> [SOLUTION] -> [PROOF] -> [ASK]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/11_Elevator_Pitch_&_Boilerplate",
        frameworks: ["StoryBrand (One-Liner)", "Pixar Pitch", "NABC Model"],
        faq: [
            { question: "Should I memorize this?", answer: "Memorize the structure, not the words. It needs to sound natural, not robotic." },
            { question: "How is this different from positioning?", answer: "Positioning is for reading/strategy. The pitch is for *speaking*." }
        ]
    },
    {
        id: "L4.02",
        title: "Sales Playbook Outline",
        slug: "sales-playbook-outline",
        level: "Activation",
        levelTitle: "Activation",
        hook: "Structure your sales process and materials.",
        promptContent: `# Sales methodology

## What this generates

Your comprehensive sales methodology framework using proven B2B selling frameworks like MEDDPICC, BANT 2.0, Sandler Pain Funnel, SPIN Selling, and Challenger Sale. You'll get methodology selection with rationale, detailed qualification criteria, deal stages with exit criteria, discovery question framework, demo best practices, red flags and disqualification triggers, top performer playbook, sales manager coaching guide, and a 90-day implementation roadmap.

## Why you need this

Without a consistent sales methodology, every rep sells differently, qualification is subjective, and deals stall at unpredictable stages. You can't forecast accurately, you can't coach effectively, and you waste time on bad-fit opportunities. A rigorous methodology creates a shared language, enables objective deal inspection, and systematically replicates what your top performers do naturally. This is how you go from art to science in your sales motion.

## Before you start

This prompt works best when you have:
- Clear patterns in why deals win or lose (win/loss analysis)
- Understanding of what your top performers do differently
- Data on your current sales cycle length and deal sizes
- Visibility into typical stakeholder counts and buying processes
- Knowledge of where deals typically get stuck or disqualified

If you're early-stage, you can build this based on founder selling experience, initial customer patterns, and strategic hypotheses. Just be ready to validate and refine as your sales team scales.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your context and patterns, the more tailored your methodology will be.

### Company & market profile

**{{companyName}}**  
Your company name

**{{primarySegment}}**  
Are you primarily selling to Enterprise, Mid-Market, or SMB customers?

**{{acvRange}}**  
What is your average deal value (ACV or total contract value)?

**{{salesCycleDays}}**  
How long does a typical sales cycle take from first contact to close?

**{{productDescription}}**  
Briefly describe what you sell (product/service/solution)

### Current sales process

**{{salesMotion}}**  
Describe your current sales process from lead to close. Include stages and key activities.  
Example: "Lead → Discovery → Demo → Proposal → Negotiation → Closed Won. Discovery focuses on pain, Demo customized to persona, Proposal includes ROI calculator"

**{{qualification}}**  
How do you currently qualify opportunities? What criteria do you use?  
Example: "We ask about budget, decision-maker involvement, and timeline. But it's subjective—each rep qualifies differently"

**{{salesStages}}**  
What are your current pipeline stages?  
Example: "Prospecting, Discovery, Demo Scheduled, Demo Completed, Proposal Sent, Negotiation, Closed Won/Lost"

**{{salesTeamStructure}}**  
How many sellers do you have? How is the team organized?  
Example: "8 AEs split into hunters (new business) and farmers (expansion). 3 SDRs feeding the hunters. No industry specialization yet"

### Discovery & qualification insights

**{{idealDiscoveryCall}}**  
Describe what a great discovery call looks like. What gets covered? What outcomes indicate success?  
Example: "Great discovery: We uncover specific pain (not just 'it's hard'), quantify business impact ($X lost per quarter), identify who's affected, understand current workarounds, get timeline urgency. Success = prospect says 'I haven't thought about it that way' or asks 'how does your solution solve this?'"

**{{dealbreakers}}**  
What typically disqualifies a deal? When should you walk away?  
Example: "No budget authority identified after 2 calls. No quantifiable pain or ROI case. Competitor already implemented (we don't rip-and-replace well). Timeline beyond 6 months with no urgency"

**{{topPerformerBehaviors}}**  
What do your top-performing reps do differently than average performers?  
Example: "Top reps always get executive involvement early. They challenge prospects' assumptions instead of just pitching features. They disqualify faster—their pipeline is smaller but higher quality. They always send post-call summaries with next steps"

**{{salesChallenges}}**  
What are your biggest sales execution challenges right now?  
Example: "Deals stall in negotiation stage. Reps struggle to get past mid-level managers to economic buyers. We lose to 'do nothing' more than competitors. Average reps don't ask good discovery questions"

### Buyer & competitive context

**{{buyerPersonas}}**  
Who are the typical buyers/stakeholders involved in purchase decisions? Include titles and roles.  
Example: "VP of Sales (economic buyer), Sales Enablement Manager (champion), RevOps (influencer/technical buyer), IT/Security (gatekeeper for procurement)"

**{{stakeholderCount}}**  
How many people are typically involved in buying decisions?  
Example: "Usually 3-5 stakeholders in mid-market, 7-10 in enterprise deals"

**{{directCompetitors}}**  
Who are your top 3-5 competitors?

**{{differentiators}}**  
What are your key differentiators vs. competition? Why do customers choose you?  
Example: "We learn from won/lost deals, not just content usage. Our implementation is 48 hours vs. competitor average of 6-8 weeks. We're built for remote teams specifically, not retrofitted"

**Pro tip:** The "top performer behaviors" and "biggest sales challenges" sections are critical. They reveal what methodology elements to emphasize and where coaching should focus. Don't generalize—pull specific examples from recent deals.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a world-class sales methodology architect with deep expertise in enterprise and mid-market B2B selling frameworks including MEDDPICC, BANT 2.0, Sandler Pain Funnel, SPIN Selling, and Challenger Sale methodologies.

Your task is to design a comprehensive, actionable Sales Methodology Framework tailored to the client's business that will drive consistent revenue growth, improve qualification rigor, and enable sales teams to win more deals at higher velocity.

## Output deliverables

Create a comprehensive Sales Methodology Framework document that includes:

### 1. Recommended methodology selection & rationale

- Analyze the company's market segment, deal complexity, and sales environment
- Recommend the optimal primary methodology (MEDDPICC for enterprise, BANT 2.0 for mid-market, or hybrid approach)
- Recommend complementary methodologies (Sandler Pain Funnel, SPIN, or Challenger) based on buyer sophistication and competitive landscape
- Provide clear rationale for methodology selection tied to their specific context

### 2. Detailed qualification criteria

Based on the recommended methodology, define:

**MEDDPICC criteria (if applicable):**
- **Metrics:** What economic impact must be quantifiable?
- **Economic Buyer:** Who has budget authority? How to identify them?
- **Decision Criteria:** What are the evaluation criteria?
- **Decision Process:** What's their buying process?
- **Paper Process:** What's the procurement/legal process?
- **Identify Pain:** What business pain must exist?
- **Champion:** What defines a true champion?
- **Competition:** How to assess competitive threats?

**BANT 2.0 criteria (if applicable):**
- **Budget:** Not just "do they have money" but "is the ROI compelling?"
- **Authority:** Who influences vs. decides?
- **Need:** Business pain + timing urgency
- **Timeline:** Deal velocity indicators

**Minimum qualification thresholds:** What must be true to advance a deal?

### 3. Deal stages & exit criteria

Create a stage-gated sales process with:
- 5-7 clearly defined deal stages aligned to the buyer journey
- Specific exit criteria for each stage (what must be validated/achieved to advance)
- Required activities and deliverables per stage
- Expected timeline ranges per stage
- Probability/forecast guidance per stage
- Red flag indicators that signal stage regression or disqualification

### 4. Discovery question framework

Develop a structured discovery approach:

**Sandler Pain Funnel adaptation (if selected):**
- Initial surface-level pain questions
- Questions that deepen understanding of impact
- Questions that explore emotional/personal impact
- Questions that establish urgency and cost of inaction

**SPIN Selling framework (if selected):**
- **Situation questions:** Understanding current state
- **Problem questions:** Uncovering difficulties and dissatisfactions
- **Implication questions:** Exploring consequences and effects
- **Need-Payoff questions:** Focusing on solution value

**Challenger approach (if selected):**
- **Teaching questions:** Reframing their thinking
- **Tailoring questions:** Customizing insights to their context
- **Taking control questions:** Guiding toward your solution

Map specific questions to each buyer persona and deal stage. Include follow-up question examples and probing techniques. Provide guidance on question sequencing and conversational flow.

### 5. Demo & presentation best practices

Design a framework for conducting effective demos and presentations:
- Pre-demo qualification and discovery requirements
- Demo/presentation structure and flow
- How to customize presentations based on persona and pain
- Storytelling techniques and proof point deployment
- Handling objections during presentations
- Call-to-action and next-step frameworks
- Success metrics for effective demos (e.g., what outcomes indicate momentum)

### 6. Red flags & disqualification triggers

Create a comprehensive guide including:
- **Hard disqualification criteria:** Conditions that should immediately remove a deal from pipeline
- **Yellow flags:** Warning signs that require validation or mitigation
- **Competitive red flags:** Indicators of low win probability against competitors
- **Internal red flags:** Signs of poor internal alignment or capability to deliver
- Recommended actions when red flags appear
- When to walk away vs. persist
- How to gracefully disqualify and maintain relationship

### 7. Top performer playbook

Based on top performer behaviors, document:
- Specific behaviors and techniques that differentiate top performers
- Adoption framework for average performers to level up
- Coaching points for sales managers
- Success patterns and deal execution habits
- Relationship-building and stakeholder management tactics

### 8. Sales manager coaching guide

Include:
- How to coach to the methodology in pipeline reviews
- Key questions managers should ask at each deal stage
- Deal inspection checklist
- Coaching frameworks for common challenges
- How to identify coaching opportunities through methodology adherence

### 9. Implementation roadmap

Provide a practical 90-day rollout plan:
- **Phase 1 (Weeks 1-4):** Methodology training and adoption
- **Phase 2 (Weeks 5-8):** Application and coaching intensification
- **Phase 3 (Weeks 9-12):** Reinforcement and optimization
- Required tools, templates, and enablement assets
- Success metrics and KPIs to track adoption and impact

## Formatting & style guidelines

- Use clear, actionable language that sales teams can immediately apply
- Include specific examples and scenarios based on the client's context
- Provide visual frameworks (describe tables, flowcharts, decision trees that should be created)
- Balance rigor with practicality—methodology should be comprehensive but not bureaucratic
- Include "Quick Reference" sections for easy adoption
- Use bullet points, numbered lists, and bold headings for scannability
- Incorporate real-world examples that resonate with the market segment

## Quality standards

Ensure the framework:
- Aligns methodology selection to deal complexity and market segment
- Provides specific, measurable qualification criteria
- Creates clear stage gates that prevent premature advancement
- Equips sellers with powerful discovery questions, not generic ones
- Addresses the specific challenges noted
- Builds on what already works (top performer behaviors)
- Provides clear guidance on when to disqualify
- Is immediately implementable with provided examples
- Includes manager coaching integration
- Balances structure with sales agility

## Client context

[Paste all your prepared inputs here]

### Company & market profile
- Company name: {{companyName}}
- Primary market segment: {{primarySegment}}
- Average deal size: {{acvRange}}
- Sales cycle length: {{salesCycleDays}}
- Product/service description: {{productDescription}}

### Current sales process
- Current sales process: {{salesMotion}}
- Current qualification approach: {{qualification}}
- Current deal stages: {{salesStages}}
- Sales team structure: {{salesTeamStructure}}

### Discovery & qualification insights
- Ideal discovery call: {{idealDiscoveryCall}}
- Disqualification reasons: {{dealbreakers}}
- Top performer behaviors: {{topPerformerBehaviors}}
- Biggest sales challenges: {{salesChallenges}}

### Buyer & competitive context
- Buyer personas: {{buyerPersonas}}
- Stakeholder count: {{stakeholderCount}}
- Main competitors: {{directCompetitors}}
- Competitive differentiators: {{differentiators}}
\`\`\`

---

## After you run it

Turn this into your sales operating system:
- **Train the entire sales team** on the methodology in a 2-day intensive
- **Update your CRM** to enforce exit criteria at each stage gate
- **Create deal inspection templates** for weekly pipeline reviews
- **Build question libraries** in your sales content management system
- **Record top performers** using the methodology and create training modules
- **Certify reps** on the methodology before they can move deals past Discovery
- **Tie compensation** to methodology adherence, not just quota attainment

Coach to the methodology religiously. In every pipeline review, ask: "What's the quantified pain? Who's the economic buyer? What are the decision criteria?" If reps can't answer, the deal shouldn't advance—period.

Refresh quarterly based on win/loss patterns. Your methodology should evolve as your market, product, and competition change. But the core discipline—rigorous qualification, stage-gated advancement, consistent discovery—should remain constant.

## Examples

[Coming soon—sample sales methodology frameworks from real consulting engagements]
`, visualLogic: `[PROCESS] -> {ACTIVITIES} -> [ASSETS]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L5_Supporting_Context/15_Sales_Methodology",
        frameworks: ["MEDDIC / MEDDPICC", "Challenger Sale", "Sandler Training"],
        faq: [
            { question: "Is this a full manual?", answer: "This prompt generates the *outline* and structure. You'll need to fill in the specific scripts and tactics." },
            { question: "Who uses this?", answer: "New hires for onboarding, and existing reps for reference." }
        ]
    },
    {
        id: "L4.03",
        title: "Website Copy (Home/Landing)",
        slug: "website-copy-home-landing",
        level: "Activation",
        levelTitle: "Activation",
        hook: "Generate high-converting copy for your main pages.",
        promptContent: `# Example communications

## What this generates

Your strategic swipe file with 10-15 annotated content examples that capture your distinctive brand voice using the Before/After/Bridge (BAB) copywriting framework. You'll get voice and tone audits, messaging mechanics breakdowns, BAB structure mapping, CTA effectiveness analysis, performance context, anti-patterns guide, and quick-start templates. This becomes your training library and campaign development resource.

## Why you need this

Great brand voice isn't abstract—it lives in specific word choices, sentence structures, and proven frameworks. Without a swipe file of annotated examples, every new writer reinvents the wheel, every campaign feels inconsistent, and you can't systematically replicate what works. This framework dissects your best content to reveal the mechanics behind it, so anyone on your team can create on-brand, high-performing communications.

## Before you start

This prompt works best when you have:
- 10-15 content examples you're actually proud of (not aspirational, but real pieces that worked)
- Performance data for those examples (open rates, engagement, conversions)
- Examples of content that missed the mark (so you can define guardrails)
- A sense of what makes your voice distinctive vs. generic industry speak

If you're early-stage, you can still do this with founder-written emails, early sales decks, or even competitor examples you want to emulate. Just be clear about what's validated vs. hypothetical.

## Prepare your inputs

Fill out this form before running the prompt. The more examples and performance data you provide, the more actionable your swipe file will be.

### Content examples

**{{contentExamples}}**  
Provide 10-15 examples of content you're proud of. Include full text, screenshots, or links. Mix formats—emails, social posts, landing pages, ad copy, sales deck slides, case studies, etc.

For each example, include:
- The full content (text, image, or link)
- What format it is (sales email, LinkedIn post, landing page hero, etc.)
- Who the audience was (persona, role, company size)

**{{highPerformingMetrics}}**  
For each content example above, share specific results and performance data.  
Examples:  
- "Sales email: 38% open rate, 12% reply rate"  
- "LinkedIn post: 450 likes, 87 comments, 23 shares"  
- "Landing page: 18% conversion rate on demo requests"  
- "Ad copy: 2.3% CTR, $45 CPA"

**{{highEngagementSpecifics}}**  
Which specific pieces drove your best results? Identify your top 3-5 performers and explain what success looked like.  
Example: "Cold outreach email with subject line 'Your reps are wasting 5 hours/week' got 41% reply rate—3x our average. We think the specific time metric in the subject made it concrete and urgent."

### Content to avoid

**{{contentToAvoid}}**  
Share 2-5 examples of content that "feels wrong" or off-brand. For each, explain why it doesn't work.  
Examples:  
- "This email feels too salesy and pushy—doesn't match our consultative approach"  
- "This LinkedIn post sounds generic and could be from any company in our space"  
- "This landing page copy is too feature-focused and doesn't lead with customer outcomes"

### Context & guidelines

**{{contentFormats}}**  
List all content formats you regularly create. Check all that apply and add any missing formats.  
Examples: Sales emails, Nurture emails, LinkedIn posts, Twitter/X posts, Sales deck slides, Landing pages, Ad copy (Facebook, LinkedIn, Google), Case studies, Blog posts, Product announcements, Webinar descriptions, etc.

**{{targetAudience}}**  
Who is your primary audience? Include:
- Job titles/roles
- Industry/sectors  
- Key pain points they experience
- What motivates their decisions

Reference your Target Customer Profiles if you've already created them.

**{{voiceNotes}}**  
Do you have existing brand voice guidelines? If so, include them or reference your Brand Voice & Tone doc. If not, describe your desired brand personality in 3-5 adjectives.

**Pro tip:** Don't just share the prettiest or most polished examples. Share the ones that actually drove results—even if they're scrappy. A plain-text email that got 40% reply rate is worth more than a beautifully designed email that got 2%.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a master copywriter and brand voice architect. Your task is to analyze real-world content examples and create a comprehensive swipe file that captures the client's distinctive brand voice while demonstrating proven messaging frameworks.

## Your objective

Create a strategic swipe file document containing 10-15 annotated content examples that serve as a training library and campaign development resource. Each example should be dissected to reveal the underlying messaging mechanics that make it effective.

## Framework application

Apply the Before/After/Bridge (BAB) copywriting structure to analyze each example:
- **Before:** The pain point, problem, or current state
- **After:** The desired outcome or transformation
- **Bridge:** How the solution connects the two (your product/service)

## Content analysis requirements

For each of the 10-15 examples provided, create a detailed breakdown including:

### 1. Content categorization

Label each example by type:
- Email (sales, nurture, announcement, etc.)
- LinkedIn post
- Sales deck slide
- Landing page copy
- Ad copy
- Case study excerpt
- Other relevant formats

### 2. Core analysis components

**Voice & tone audit:**
- Identify distinctive voice characteristics (conversational, authoritative, playful, technical, etc.)
- Note tonal shifts for different contexts or audiences
- Highlight signature phrases or linguistic patterns

**Messaging mechanics:**
- **Message clarity:** How simply and directly is the core message communicated?
- **Emotional pull:** What emotions are triggered? (urgency, relief, aspiration, fear, trust, etc.)
- **Proof elements:** What credibility indicators are used? (data, testimonials, specificity, etc.)

**BAB structure mapping:**
- Annotate where the "Before" (pain/problem) appears in the copy
- Highlight the "After" (transformation/benefit) language
- Identify the "Bridge" (solution mechanism/product role)
- Note if the structure is explicit or subtle

**CTA effectiveness:**
- Identify the call-to-action and its placement
- Analyze CTA language (friction level, clarity, value proposition)
- Note what makes it compelling or how it could improve

### 3. Performance context

For each example, document:
- **Performance data:** What results did it drive? (reply rates, engagement, conversions, etc.)
- **Why it works:** 2-3 specific reasons this example succeeded
- **Replicable elements:** Which components can be systematically applied to future content?

### 4. Anti-patterns section

Create a separate section analyzing content to avoid:
- What makes these examples feel "off-brand"?
- Which messaging choices create friction or confusion?
- What tonal elements should be avoided?
- Document the "brand voice guardrails"

## Deliverable structure

Organize your swipe file as follows:

### Section 1: Brand voice DNA
- Summary of core voice attributes drawn from all examples
- Do's and don'ts quick reference guide

### Section 2: Annotated examples by category
- Group similar content types together
- Each example includes: original content + multi-layered annotations

### Section 3: BAB framework in action
- Cross-example analysis showing how BAB appears across different formats
- Templates extracted from best examples

### Section 4: CTA & conversion library
- Collection of high-performing CTAs
- Context for when each style works best

### Section 5: Anti-pattern guide
- Examples of what to avoid with explanations

### Section 6: Quick-start templates
- 3-5 fill-in-the-blank templates based on top-performing examples
- Each template annotated with guidance on customization

## Client context

[Paste all your prepared inputs here]

### Content examples
- Content examples (10-15): {{contentExamples}}
- Performance metrics for each: {{highPerformingMetrics}}
- Top performers (3-5 with context): {{highEngagementSpecifics}}

### Content to avoid
- Examples that feel off-brand: {{contentToAvoid}}

### Context & guidelines
- Content formats used: {{contentFormats}}
- Target audience: {{targetAudience}}
- Brand voice notes: {{voiceNotes}}
\`\`\`

---

## After you run it

Turn this swipe file into your content operating system:
- **Share with every writer** (internal team, freelancers, agencies) before they create anything
- **Create onboarding modules** where new content creators study the annotated examples
- **Build review checklists** based on the voice DNA and anti-patterns sections
- **Extract templates** from the quick-start section and turn them into fill-in-the-blank docs
- **Run content audits** quarterly—does new content match the swipe file patterns?
- **Update the swipe file** as you create new high-performing content

Test new content against the swipe file. If a draft doesn't match the voice characteristics, messaging mechanics, or BAB patterns in your best examples, it's probably off-brand. Use the annotated examples to coach writers on what needs to change.

Refresh annually or when your voice evolves. Add new high-performers, remove examples that feel dated, and update anti-patterns as you learn what doesn't work.

## Examples

[Coming soon—sample annotated swipe files from real consulting engagements]
`, visualLogic: `[HERO] -> [PROBLEM] -> [SOLUTION] -> [PROOF]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/12_Example_Communications",
        frameworks: ["AIDA (Attention, Interest, Desire, Action)", "PAS (Problem, Agitation, Solution)", "StoryBrand Layout"],
        faq: [
            { question: "Should I focus on features or benefits?", answer: "Benefits sell. Features justify. Lead with benefits (headlines), support with features (body copy)." },
            { question: "How long should it be?", answer: "As long as it needs to be to answer the user's questions and overcome objections. No longer." }
        ]
    },
    {
        id: "L4.04",
        title: "Case Study Framework",
        slug: "case-study-framework",
        level: "Activation",
        levelTitle: "Activation",
        hook: "Tell compelling stories of customer success.",
        promptContent: `# Example communications

## What this generates

Your strategic swipe file with 10-15 annotated content examples that capture your distinctive brand voice using the Before/After/Bridge (BAB) copywriting framework. You'll get voice and tone audits, messaging mechanics breakdowns, BAB structure mapping, CTA effectiveness analysis, performance context, anti-patterns guide, and quick-start templates. This becomes your training library and campaign development resource.

## Why you need this

Great brand voice isn't abstract—it lives in specific word choices, sentence structures, and proven frameworks. Without a swipe file of annotated examples, every new writer reinvents the wheel, every campaign feels inconsistent, and you can't systematically replicate what works. This framework dissects your best content to reveal the mechanics behind it, so anyone on your team can create on-brand, high-performing communications.

## Before you start

This prompt works best when you have:
- 10-15 content examples you're actually proud of (not aspirational, but real pieces that worked)
- Performance data for those examples (open rates, engagement, conversions)
- Examples of content that missed the mark (so you can define guardrails)
- A sense of what makes your voice distinctive vs. generic industry speak

If you're early-stage, you can still do this with founder-written emails, early sales decks, or even competitor examples you want to emulate. Just be clear about what's validated vs. hypothetical.

## Prepare your inputs

Fill out this form before running the prompt. The more examples and performance data you provide, the more actionable your swipe file will be.

### Content examples

**{{contentExamples}}**  
Provide 10-15 examples of content you're proud of. Include full text, screenshots, or links. Mix formats—emails, social posts, landing pages, ad copy, sales deck slides, case studies, etc.

For each example, include:
- The full content (text, image, or link)
- What format it is (sales email, LinkedIn post, landing page hero, etc.)
- Who the audience was (persona, role, company size)

**{{highPerformingMetrics}}**  
For each content example above, share specific results and performance data.  
Examples:  
- "Sales email: 38% open rate, 12% reply rate"  
- "LinkedIn post: 450 likes, 87 comments, 23 shares"  
- "Landing page: 18% conversion rate on demo requests"  
- "Ad copy: 2.3% CTR, $45 CPA"

**{{highEngagementSpecifics}}**  
Which specific pieces drove your best results? Identify your top 3-5 performers and explain what success looked like.  
Example: "Cold outreach email with subject line 'Your reps are wasting 5 hours/week' got 41% reply rate—3x our average. We think the specific time metric in the subject made it concrete and urgent."

### Content to avoid

**{{contentToAvoid}}**  
Share 2-5 examples of content that "feels wrong" or off-brand. For each, explain why it doesn't work.  
Examples:  
- "This email feels too salesy and pushy—doesn't match our consultative approach"  
- "This LinkedIn post sounds generic and could be from any company in our space"  
- "This landing page copy is too feature-focused and doesn't lead with customer outcomes"

### Context & guidelines

**{{contentFormats}}**  
List all content formats you regularly create. Check all that apply and add any missing formats.  
Examples: Sales emails, Nurture emails, LinkedIn posts, Twitter/X posts, Sales deck slides, Landing pages, Ad copy (Facebook, LinkedIn, Google), Case studies, Blog posts, Product announcements, Webinar descriptions, etc.

**{{targetAudience}}**  
Who is your primary audience? Include:
- Job titles/roles
- Industry/sectors  
- Key pain points they experience
- What motivates their decisions

Reference your Target Customer Profiles if you've already created them.

**{{voiceNotes}}**  
Do you have existing brand voice guidelines? If so, include them or reference your Brand Voice & Tone doc. If not, describe your desired brand personality in 3-5 adjectives.

**Pro tip:** Don't just share the prettiest or most polished examples. Share the ones that actually drove results—even if they're scrappy. A plain-text email that got 40% reply rate is worth more than a beautifully designed email that got 2%.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a master copywriter and brand voice architect. Your task is to analyze real-world content examples and create a comprehensive swipe file that captures the client's distinctive brand voice while demonstrating proven messaging frameworks.

## Your objective

Create a strategic swipe file document containing 10-15 annotated content examples that serve as a training library and campaign development resource. Each example should be dissected to reveal the underlying messaging mechanics that make it effective.

## Framework application

Apply the Before/After/Bridge (BAB) copywriting structure to analyze each example:
- **Before:** The pain point, problem, or current state
- **After:** The desired outcome or transformation
- **Bridge:** How the solution connects the two (your product/service)

## Content analysis requirements

For each of the 10-15 examples provided, create a detailed breakdown including:

### 1. Content categorization

Label each example by type:
- Email (sales, nurture, announcement, etc.)
- LinkedIn post
- Sales deck slide
- Landing page copy
- Ad copy
- Case study excerpt
- Other relevant formats

### 2. Core analysis components

**Voice & tone audit:**
- Identify distinctive voice characteristics (conversational, authoritative, playful, technical, etc.)
- Note tonal shifts for different contexts or audiences
- Highlight signature phrases or linguistic patterns

**Messaging mechanics:**
- **Message clarity:** How simply and directly is the core message communicated?
- **Emotional pull:** What emotions are triggered? (urgency, relief, aspiration, fear, trust, etc.)
- **Proof elements:** What credibility indicators are used? (data, testimonials, specificity, etc.)

**BAB structure mapping:**
- Annotate where the "Before" (pain/problem) appears in the copy
- Highlight the "After" (transformation/benefit) language
- Identify the "Bridge" (solution mechanism/product role)
- Note if the structure is explicit or subtle

**CTA effectiveness:**
- Identify the call-to-action and its placement
- Analyze CTA language (friction level, clarity, value proposition)
- Note what makes it compelling or how it could improve

### 3. Performance context

For each example, document:
- **Performance data:** What results did it drive? (reply rates, engagement, conversions, etc.)
- **Why it works:** 2-3 specific reasons this example succeeded
- **Replicable elements:** Which components can be systematically applied to future content?

### 4. Anti-patterns section

Create a separate section analyzing content to avoid:
- What makes these examples feel "off-brand"?
- Which messaging choices create friction or confusion?
- What tonal elements should be avoided?
- Document the "brand voice guardrails"

## Deliverable structure

Organize your swipe file as follows:

### Section 1: Brand voice DNA
- Summary of core voice attributes drawn from all examples
- Do's and don'ts quick reference guide

### Section 2: Annotated examples by category
- Group similar content types together
- Each example includes: original content + multi-layered annotations

### Section 3: BAB framework in action
- Cross-example analysis showing how BAB appears across different formats
- Templates extracted from best examples

### Section 4: CTA & conversion library
- Collection of high-performing CTAs
- Context for when each style works best

### Section 5: Anti-pattern guide
- Examples of what to avoid with explanations

### Section 6: Quick-start templates
- 3-5 fill-in-the-blank templates based on top-performing examples
- Each template annotated with guidance on customization

## Client context

[Paste all your prepared inputs here]

### Content examples
- Content examples (10-15): {{contentExamples}}
- Performance metrics for each: {{highPerformingMetrics}}
- Top performers (3-5 with context): {{highEngagementSpecifics}}

### Content to avoid
- Examples that feel off-brand: {{contentToAvoid}}

### Context & guidelines
- Content formats used: {{contentFormats}}
- Target audience: {{targetAudience}}
- Brand voice notes: {{voiceNotes}}
\`\`\`

---

## After you run it

Turn this swipe file into your content operating system:
- **Share with every writer** (internal team, freelancers, agencies) before they create anything
- **Create onboarding modules** where new content creators study the annotated examples
- **Build review checklists** based on the voice DNA and anti-patterns sections
- **Extract templates** from the quick-start section and turn them into fill-in-the-blank docs
- **Run content audits** quarterly—does new content match the swipe file patterns?
- **Update the swipe file** as you create new high-performing content

Test new content against the swipe file. If a draft doesn't match the voice characteristics, messaging mechanics, or BAB patterns in your best examples, it's probably off-brand. Use the annotated examples to coach writers on what needs to change.

Refresh annually or when your voice evolves. Add new high-performers, remove examples that feel dated, and update anti-patterns as you learn what doesn't work.

## Examples

[Coming soon—sample annotated swipe files from real consulting engagements]
`, visualLogic: `[CHALLENGE] -> [SOLUTION] -> [RESULTS]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/12_Example_Communications",
        frameworks: ["STAR Method (Situation, Task, Action, Result)", "Hero's Journey", "Challenger Case Study"],
        faq: [
            { question: "What if we don't have hard metrics?", answer: "Focus on qualitative improvements: speed, happiness, risk reduction, or strategic capability." },
            { question: "Do I need customer approval?", answer: "ALWAYS. Never publish a client name or logo without written permission." }
        ]
    },
    {
        id: "L4.05",
        title: "Objection Handling Scripts",
        slug: "objection-handling-scripts",
        level: "Activation",
        levelTitle: "Activation",
        hook: "Prepare your team to overcome common sales pushback.",
        promptContent: `# Sales methodology

## What this generates

Your comprehensive sales methodology framework using proven B2B selling frameworks like MEDDPICC, BANT 2.0, Sandler Pain Funnel, SPIN Selling, and Challenger Sale. You'll get methodology selection with rationale, detailed qualification criteria, deal stages with exit criteria, discovery question framework, demo best practices, red flags and disqualification triggers, top performer playbook, sales manager coaching guide, and a 90-day implementation roadmap.

## Why you need this

Without a consistent sales methodology, every rep sells differently, qualification is subjective, and deals stall at unpredictable stages. You can't forecast accurately, you can't coach effectively, and you waste time on bad-fit opportunities. A rigorous methodology creates a shared language, enables objective deal inspection, and systematically replicates what your top performers do naturally. This is how you go from art to science in your sales motion.

## Before you start

This prompt works best when you have:
- Clear patterns in why deals win or lose (win/loss analysis)
- Understanding of what your top performers do differently
- Data on your current sales cycle length and deal sizes
- Visibility into typical stakeholder counts and buying processes
- Knowledge of where deals typically get stuck or disqualified

If you're early-stage, you can build this based on founder selling experience, initial customer patterns, and strategic hypotheses. Just be ready to validate and refine as your sales team scales.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your context and patterns, the more tailored your methodology will be.

### Company & market profile

**{{companyName}}**  
Your company name

**{{primarySegment}}**  
Are you primarily selling to Enterprise, Mid-Market, or SMB customers?

**{{acvRange}}**  
What is your average deal value (ACV or total contract value)?

**{{salesCycleDays}}**  
How long does a typical sales cycle take from first contact to close?

**{{productDescription}}**  
Briefly describe what you sell (product/service/solution)

### Current sales process

**{{salesMotion}}**  
Describe your current sales process from lead to close. Include stages and key activities.  
Example: "Lead → Discovery → Demo → Proposal → Negotiation → Closed Won. Discovery focuses on pain, Demo customized to persona, Proposal includes ROI calculator"

**{{qualification}}**  
How do you currently qualify opportunities? What criteria do you use?  
Example: "We ask about budget, decision-maker involvement, and timeline. But it's subjective—each rep qualifies differently"

**{{salesStages}}**  
What are your current pipeline stages?  
Example: "Prospecting, Discovery, Demo Scheduled, Demo Completed, Proposal Sent, Negotiation, Closed Won/Lost"

**{{salesTeamStructure}}**  
How many sellers do you have? How is the team organized?  
Example: "8 AEs split into hunters (new business) and farmers (expansion). 3 SDRs feeding the hunters. No industry specialization yet"

### Discovery & qualification insights

**{{idealDiscoveryCall}}**  
Describe what a great discovery call looks like. What gets covered? What outcomes indicate success?  
Example: "Great discovery: We uncover specific pain (not just 'it's hard'), quantify business impact ($X lost per quarter), identify who's affected, understand current workarounds, get timeline urgency. Success = prospect says 'I haven't thought about it that way' or asks 'how does your solution solve this?'"

**{{dealbreakers}}**  
What typically disqualifies a deal? When should you walk away?  
Example: "No budget authority identified after 2 calls. No quantifiable pain or ROI case. Competitor already implemented (we don't rip-and-replace well). Timeline beyond 6 months with no urgency"

**{{topPerformerBehaviors}}**  
What do your top-performing reps do differently than average performers?  
Example: "Top reps always get executive involvement early. They challenge prospects' assumptions instead of just pitching features. They disqualify faster—their pipeline is smaller but higher quality. They always send post-call summaries with next steps"

**{{salesChallenges}}**  
What are your biggest sales execution challenges right now?  
Example: "Deals stall in negotiation stage. Reps struggle to get past mid-level managers to economic buyers. We lose to 'do nothing' more than competitors. Average reps don't ask good discovery questions"

### Buyer & competitive context

**{{buyerPersonas}}**  
Who are the typical buyers/stakeholders involved in purchase decisions? Include titles and roles.  
Example: "VP of Sales (economic buyer), Sales Enablement Manager (champion), RevOps (influencer/technical buyer), IT/Security (gatekeeper for procurement)"

**{{stakeholderCount}}**  
How many people are typically involved in buying decisions?  
Example: "Usually 3-5 stakeholders in mid-market, 7-10 in enterprise deals"

**{{directCompetitors}}**  
Who are your top 3-5 competitors?

**{{differentiators}}**  
What are your key differentiators vs. competition? Why do customers choose you?  
Example: "We learn from won/lost deals, not just content usage. Our implementation is 48 hours vs. competitor average of 6-8 weeks. We're built for remote teams specifically, not retrofitted"

**Pro tip:** The "top performer behaviors" and "biggest sales challenges" sections are critical. They reveal what methodology elements to emphasize and where coaching should focus. Don't generalize—pull specific examples from recent deals.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a world-class sales methodology architect with deep expertise in enterprise and mid-market B2B selling frameworks including MEDDPICC, BANT 2.0, Sandler Pain Funnel, SPIN Selling, and Challenger Sale methodologies.

Your task is to design a comprehensive, actionable Sales Methodology Framework tailored to the client's business that will drive consistent revenue growth, improve qualification rigor, and enable sales teams to win more deals at higher velocity.

## Output deliverables

Create a comprehensive Sales Methodology Framework document that includes:

### 1. Recommended methodology selection & rationale

- Analyze the company's market segment, deal complexity, and sales environment
- Recommend the optimal primary methodology (MEDDPICC for enterprise, BANT 2.0 for mid-market, or hybrid approach)
- Recommend complementary methodologies (Sandler Pain Funnel, SPIN, or Challenger) based on buyer sophistication and competitive landscape
- Provide clear rationale for methodology selection tied to their specific context

### 2. Detailed qualification criteria

Based on the recommended methodology, define:

**MEDDPICC criteria (if applicable):**
- **Metrics:** What economic impact must be quantifiable?
- **Economic Buyer:** Who has budget authority? How to identify them?
- **Decision Criteria:** What are the evaluation criteria?
- **Decision Process:** What's their buying process?
- **Paper Process:** What's the procurement/legal process?
- **Identify Pain:** What business pain must exist?
- **Champion:** What defines a true champion?
- **Competition:** How to assess competitive threats?

**BANT 2.0 criteria (if applicable):**
- **Budget:** Not just "do they have money" but "is the ROI compelling?"
- **Authority:** Who influences vs. decides?
- **Need:** Business pain + timing urgency
- **Timeline:** Deal velocity indicators

**Minimum qualification thresholds:** What must be true to advance a deal?

### 3. Deal stages & exit criteria

Create a stage-gated sales process with:
- 5-7 clearly defined deal stages aligned to the buyer journey
- Specific exit criteria for each stage (what must be validated/achieved to advance)
- Required activities and deliverables per stage
- Expected timeline ranges per stage
- Probability/forecast guidance per stage
- Red flag indicators that signal stage regression or disqualification

### 4. Discovery question framework

Develop a structured discovery approach:

**Sandler Pain Funnel adaptation (if selected):**
- Initial surface-level pain questions
- Questions that deepen understanding of impact
- Questions that explore emotional/personal impact
- Questions that establish urgency and cost of inaction

**SPIN Selling framework (if selected):**
- **Situation questions:** Understanding current state
- **Problem questions:** Uncovering difficulties and dissatisfactions
- **Implication questions:** Exploring consequences and effects
- **Need-Payoff questions:** Focusing on solution value

**Challenger approach (if selected):**
- **Teaching questions:** Reframing their thinking
- **Tailoring questions:** Customizing insights to their context
- **Taking control questions:** Guiding toward your solution

Map specific questions to each buyer persona and deal stage. Include follow-up question examples and probing techniques. Provide guidance on question sequencing and conversational flow.

### 5. Demo & presentation best practices

Design a framework for conducting effective demos and presentations:
- Pre-demo qualification and discovery requirements
- Demo/presentation structure and flow
- How to customize presentations based on persona and pain
- Storytelling techniques and proof point deployment
- Handling objections during presentations
- Call-to-action and next-step frameworks
- Success metrics for effective demos (e.g., what outcomes indicate momentum)

### 6. Red flags & disqualification triggers

Create a comprehensive guide including:
- **Hard disqualification criteria:** Conditions that should immediately remove a deal from pipeline
- **Yellow flags:** Warning signs that require validation or mitigation
- **Competitive red flags:** Indicators of low win probability against competitors
- **Internal red flags:** Signs of poor internal alignment or capability to deliver
- Recommended actions when red flags appear
- When to walk away vs. persist
- How to gracefully disqualify and maintain relationship

### 7. Top performer playbook

Based on top performer behaviors, document:
- Specific behaviors and techniques that differentiate top performers
- Adoption framework for average performers to level up
- Coaching points for sales managers
- Success patterns and deal execution habits
- Relationship-building and stakeholder management tactics

### 8. Sales manager coaching guide

Include:
- How to coach to the methodology in pipeline reviews
- Key questions managers should ask at each deal stage
- Deal inspection checklist
- Coaching frameworks for common challenges
- How to identify coaching opportunities through methodology adherence

### 9. Implementation roadmap

Provide a practical 90-day rollout plan:
- **Phase 1 (Weeks 1-4):** Methodology training and adoption
- **Phase 2 (Weeks 5-8):** Application and coaching intensification
- **Phase 3 (Weeks 9-12):** Reinforcement and optimization
- Required tools, templates, and enablement assets
- Success metrics and KPIs to track adoption and impact

## Formatting & style guidelines

- Use clear, actionable language that sales teams can immediately apply
- Include specific examples and scenarios based on the client's context
- Provide visual frameworks (describe tables, flowcharts, decision trees that should be created)
- Balance rigor with practicality—methodology should be comprehensive but not bureaucratic
- Include "Quick Reference" sections for easy adoption
- Use bullet points, numbered lists, and bold headings for scannability
- Incorporate real-world examples that resonate with the market segment

## Quality standards

Ensure the framework:
- Aligns methodology selection to deal complexity and market segment
- Provides specific, measurable qualification criteria
- Creates clear stage gates that prevent premature advancement
- Equips sellers with powerful discovery questions, not generic ones
- Addresses the specific challenges noted
- Builds on what already works (top performer behaviors)
- Provides clear guidance on when to disqualify
- Is immediately implementable with provided examples
- Includes manager coaching integration
- Balances structure with sales agility

## Client context

[Paste all your prepared inputs here]

### Company & market profile
- Company name: {{companyName}}
- Primary market segment: {{primarySegment}}
- Average deal size: {{acvRange}}
- Sales cycle length: {{salesCycleDays}}
- Product/service description: {{productDescription}}

### Current sales process
- Current sales process: {{salesMotion}}
- Current qualification approach: {{qualification}}
- Current deal stages: {{salesStages}}
- Sales team structure: {{salesTeamStructure}}

### Discovery & qualification insights
- Ideal discovery call: {{idealDiscoveryCall}}
- Disqualification reasons: {{dealbreakers}}
- Top performer behaviors: {{topPerformerBehaviors}}
- Biggest sales challenges: {{salesChallenges}}

### Buyer & competitive context
- Buyer personas: {{buyerPersonas}}
- Stakeholder count: {{stakeholderCount}}
- Main competitors: {{directCompetitors}}
- Competitive differentiators: {{differentiators}}
\`\`\`

---

## After you run it

Turn this into your sales operating system:
- **Train the entire sales team** on the methodology in a 2-day intensive
- **Update your CRM** to enforce exit criteria at each stage gate
- **Create deal inspection templates** for weekly pipeline reviews
- **Build question libraries** in your sales content management system
- **Record top performers** using the methodology and create training modules
- **Certify reps** on the methodology before they can move deals past Discovery
- **Tie compensation** to methodology adherence, not just quota attainment

Coach to the methodology religiously. In every pipeline review, ask: "What's the quantified pain? Who's the economic buyer? What are the decision criteria?" If reps can't answer, the deal shouldn't advance—period.

Refresh quarterly based on win/loss patterns. Your methodology should evolve as your market, product, and competition change. But the core discipline—rigorous qualification, stage-gated advancement, consistent discovery—should remain constant.

## Examples

[Coming soon—sample sales methodology frameworks from real consulting engagements]
`, visualLogic: `[OBJECTION] -> {EMPATHY} -> {REFRAME} -> [RESOLUTION]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L5_Supporting_Context/15_Sales_Methodology",
        frameworks: ["Feel-Felt-Found", "LAER (Listen, Acknowledge, Explore, Respond)", "Sandler Negative Reverse"],
        faq: [
            { question: "Does this sound robotic?", answer: "It shouldn't. Reps should internalize the *concept* of the reframe, not just recite the words." },
            { question: "What's the best way to handle price objections?", answer: "Shift the conversation from 'Price' (cost) to 'Value' (ROI). If you offer more value, you should cost more." }
        ]
    },
    {
        id: "L4.06",
        title: "Hooks & Taglines",
        slug: "hooks-taglines",
        level: "Activation",
        levelTitle: "Activation",
        hook: "Create memorable one-liners for ads and social.",
        promptContent: `# Taglines & slogans

## What this generates

Your complete tagline and slogan suite using David Aaker's seven characteristics of great taglines and classic copywriting principles. You'll get 10 tagline options with scoring, top 3 recommendations with rationale, 9 campaign slogans across three themes, a testing framework for choosing, and usage guidelines. This gives you both an enduring brand tagline and tactical slogans for campaigns.

## Why you need this

A great tagline is a strategic asset, not a creative afterthought. It captures your brand essence in a handful of words that customers remember and repeat. Without one, you're generic. With a bad one, you're forgettable or confusing. This framework uses David Aaker's proven criteria to develop options that are memorable, meaningful, differentiated, and built to last—plus campaign slogans for tactical activations.

## Before you start

This prompt works best when you have:
- Clear brand positioning and value propositions already defined (reference your Positioning Statement and Message Map)
- Examples of taglines you love and hate (so you can articulate what resonates)
- Customer language patterns—words or phrases they use to describe you
- Your elevator pitch nailed down (reference your Elevator Pitch doc)

If you're early-stage, you can still create these based on founder vision and strategic positioning. Just be ready to test with customers before committing to one publicly.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your examples and preferences, the more ownable your taglines will be.

### Brand aspiration & inspiration

**{{famousForSaying}}**  
What do you want your brand to be famous for saying? What message or idea should people immediately associate with your brand?  
Example: "We want to be known for the idea that sales enablement is about behavior change, not content libraries"

**{{taglinesLove}}**  
List 3-5 taglines from other brands (any industry) that you admire and explain briefly why they resonate with you.  
Examples:  
- "Nike: 'Just Do It' - Simple, motivational, works for any sport or activity"  
- "Apple: 'Think Different' - Aspirational, positions users as creative rebels"  
- "Avis: 'We Try Harder' - Turns competitive disadvantage into a strength"

**{{taglinesHate}}**  
List 2-3 taglines you dislike and explain what doesn't work about them for you.  
Examples:  
- "'Innovating Tomorrow Today' - Generic, could be any tech company, meaningless"  
- "'The Power of Possible' - Vague, no clear value proposition, sounds corporate"

### Company context

**{{elevatorPitch}}**  
Describe your business in one compelling sentence. What do you do and for whom? Reference your Elevator Pitch doc if you've already created it.  
Example: "We help B2B sales teams scale consistent messaging by learning from won deals, not just content usage"

**{{customerPhrase}}**  
What word or phrase do your customers consistently use to describe your brand, product, or service? Pull from reviews, testimonials, or sales calls.  
Example: "Customers always say 'you guys actually get it' or 'this is the first tool that understands how sales really works'"

**{{existingTaglines}}**  
List any taglines or slogans you've tried before and note what worked or didn't work about them.  
Example: "We tried 'Sales Enablement Reimagined' but it felt generic. We also tried 'Win More Deals Faster' but it was too tactical and didn't capture our methodology"

### Strategic foundation

**{{positioningStatement}}**  
Your brand positioning statement. If you've already created your Brand Positioning Statement doc, reference it or paste the positioning statement here.

**{{targetAudience}}**  
Primary target audience description. If you've already created your Target Customer Profiles, reference them or provide a brief summary.

**{{valueProps}}**  
Your core value propositions. If you've already created your Unique Value Propositions doc, reference it or provide key value props here.

### Optional context

**{{testingAudience}}**  
Do you have access to customers or focus groups for testing? (Yes/No, and approximate size)

**{{industryConstraints}}**  
Are there any industry-specific regulations or conventions regarding claims or language?

**{{geo}}**  
Will this tagline be used globally or in specific markets? Any language or cultural considerations?

**Pro tip:** The "taglines you love" and "taglines you hate" sections are critical. They reveal your aesthetic preferences and help the LLM understand what "great" means to you. Don't skip these—they're the difference between generic options and ownable ones.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a world-class brand copywriter and messaging strategist specializing in tagline development. Your task is to create a comprehensive taglines and slogans document using David Aaker's seven characteristics of great taglines and classic copywriting principles.

## Framework foundation

Apply David Aaker's seven characteristics:
1. **Memorable** - Easy to recall and repeat
2. **Meaningful** - Communicates brand positioning and value
3. **Likeable** - Creates positive emotional response
4. **Differentiated** - Stands apart from competitors
5. **Protectable** - Legally and competitively defensible
6. **Supports brand positioning** - Reinforces core strategy
7. **Short and simple** - Concise and easily understood

Combine with classic copywriting principles: rhythm, alliteration, metaphor, benefit-driven language, and emotional appeal.

## Your deliverables

### 1. Ten tagline options with scoring (400-500 words)

Develop 10 distinct tagline options that reflect the client's brand essence. For each option:
- Present the tagline
- Score it against Aaker's seven characteristics (1-5 scale for each)
- Provide total score out of 35
- Include brief rationale (2-3 sentences) explaining strategic intent

Consider variations in:
- Length (3-7 words ideal)
- Tone (aspirational, practical, provocative, warm)
- Focus (functional benefit, emotional benefit, brand personality, customer transformation)

### 2. Top 3 recommendations with rationale (250-300 words)

Select the three highest-performing taglines and provide:
- **Primary recommendation:** Why this tagline is "The Keeper"—the one that should become the enduring brand tagline
- **Runner-up options:** Why these are strong alternatives, including contexts where they might outperform the primary
- **Competitive differentiation analysis** for each
- **Longevity assessment** (will it remain relevant in 5-10 years?)

### 3. Nine campaign slogan ideas (200-250 words)

Create 3 campaign slogans for each of these themes:

**Theme 1: Product/service launch** - Focused on innovation, newness, or specific features

**Theme 2: Seasonal/promotional** - Timely, action-oriented, conversion-focused

**Theme 3: Brand building/awareness** - Emotional connection, brand values, or cultural relevance

Each slogan should:
- Complement (not compete with) the primary tagline
- Be adaptable across channels
- Include suggested use case

### 4. Testing framework for choosing (150-200 words)

Provide a structured evaluation methodology including:
- **Recall testing protocol:** How to measure memorability (aided/unaided recall)
- **Emotional resonance assessment:** Survey questions or semantic differential scales to measure emotional response
- **Competitive differentiation analysis:** Method for testing distinctiveness against competitor taglines
- **Stakeholder feedback template:** Questions for internal and customer testing groups
- **Decision matrix:** Weighted scoring system for final selection

### 5. Usage guidelines (100-150 words)

Clear directives covering:
- When to use primary tagline (brand touchpoints, signature applications)
- When to use campaign slogans (tactical campaigns, promotional periods)
- Formatting rules (punctuation, capitalization, lockup with logo)
- Channel-specific applications (social media bios, email signatures, advertising, website)
- Tone and voice considerations
- Examples of correct and incorrect usage

## Output requirements

- Total length: 1000-1200 words
- Tone: Professional, strategic, confident
- Format: Clear headings, bullet points for scannability, tables for scoring
- Structure: Follow the five-section format exactly as outlined above
- Quality standard: Every tagline and slogan should be production-ready, not placeholder examples

## Special considerations

- Ensure linguistic clarity and avoid jargon unless it's industry-appropriate
- Consider trademark availability concerns (flag potential issues)
- Test for unintended meanings or negative associations
- Ensure cultural sensitivity and global applicability if needed
- Verify alignment with previously established brand positioning and messaging hierarchy

## Client context

[Paste all your prepared inputs here]

### Brand aspiration & inspiration
- Famous for saying: {{famousForSaying}}
- Taglines they love: {{taglinesLove}}
- Taglines they hate: {{taglinesHate}}

### Company context
- Elevator pitch: {{elevatorPitch}}
- Customer phrase: {{customerPhrase}}
- Existing taglines: {{existingTaglines}}

### Strategic foundation
- Brand positioning: {{positioningStatement}}
- Target audience: {{targetAudience}}
- Value propositions: {{valueProps}}

### Optional context (if available)
- Testing audience: {{testingAudience}}
- Industry constraints: {{industryConstraints}}
- Geographic scope: {{geo}}
\`\`\`

---

## After you run it

Don't pick a tagline in a vacuum:
- **Test top 3 with customers** using the testing framework—do they remember it? Does it resonate?
- **Pressure-test internally** - Can everyone on your team say it without stumbling?
- **Check trademark availability** before committing (consult legal counsel)
- **Live with it for a week** - Put it in your email signature, say it out loud in pitches, see if it feels right
- **Audit competitor taglines** - Does yours stand out or blend in?

Once you choose one, commit fully:
- **Update every brand touchpoint** - website, decks, email signatures, social bios, ads
- **Train the team** - Everyone should know it and use it consistently
- **Build campaign slogans** around it for tactical activations
- **Resist the urge to change it** unless your positioning fundamentally shifts

Taglines should be stable for 5-10 years minimum. Campaign slogans can rotate quarterly or seasonally. Don't confuse the two—one is strategic, one is tactical.

## Examples

[Coming soon—sample taglines and slogans from real consulting engagements]
`, visualLogic: `[ANGLE] -> {VARIATIONS} -> [SELECTION]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/13_Taglines_&_Slogans",
        frameworks: ["The 4 U's (Useful, Urgent, Unique, Ultra-specific)", "Curiosity Gap", "AIDA"],
        faq: [
            { question: "Are clickbait hooks okay?", answer: "Only if you deliver on the promise. 'Clickbait' effectively just means high curiosity + low delivery. Ensure high delivery." },
            { question: "How do I know which one works?", answer: "A/B test them. Data beats opinion." }
        ]
    },

    // --- Measurement (Optimization) ---
    {
        id: "L5.01",
        title: "Channel Strategy",
        slug: "channel-strategy",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Decide where to distribute your content.",
        promptContent: `# Communication strategy

## What this generates

Your comprehensive communication strategy by channel using Integrated Marketing Communications (IMC), Customer Journey Mapping, and RACE Planning (Reach, Act, Convert, Engage) frameworks. You'll get channel inventory and assessment, channel-specific strategies (5-10 channels) with messaging adaptation rules, tone modulation guidelines, content format specifications, frequency and cadence recommendations, performance metrics, cross-channel consistency framework, governance and workflow, and a 90-day implementation roadmap.

## Why you need this

Without a channel strategy, your messaging is either inconsistent (confusing customers) or identical everywhere (ignoring how people consume content differently on LinkedIn vs. email vs. events). This framework ensures your core brand DNA stays intact while optimizing for each channel's unique characteristics, audience expectations, and funnel objectives. It's how you scale communications without chaos.

## Before you start

This prompt works best when you have:
- Clear inventory of channels you're currently using and which are working vs. not working
- Examples of content that performed well and content that flopped (with data or hypotheses)
- Understanding of your team structure and who owns which channels
- Sense of your approval comfort level (tight control vs. move fast)
- Brand voice and messaging foundation already defined (reference your Brand Voice & Tone and Core Messaging Pillars docs)

If you're early-stage, you can build this based on founder insights about what's resonated so far and strategic priorities for channel expansion. Just be ready to validate and iterate as you scale.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your examples and context, the more practical your channel strategy will be.

### Channel landscape

**{{channels}}**  
List all communication channels currently in use.  
Examples: "LinkedIn (company page + CEO personal), Email newsletter (monthly to customers + prospects), Blog (weekly), Trade shows (3-4 per year), Paid LinkedIn ads, Webinars (monthly), Sales outreach emails, Customer community (Slack)"

**{{plannedChannels}}**  
List any channels planned for expansion or testing in the next 6-12 months.  
Examples: "YouTube (product demos + thought leadership), Podcast (interviewing customers), Instagram (if we pivot to visual storytelling), Twitter/X (CEO thought leadership), Reddit (community engagement), TikTok (if we target younger buyers)"

### Team & workflow context

**{{teamStructure}}**  
Describe who owns what channels and how your team is organized.  
Examples:  
- "Marketing Manager owns LinkedIn, blog, newsletter. Sales team owns outbound email. CEO handles thought leadership posts. We have a contractor for paid ads"  
- "Single marketing person handling everything—need to prioritize ruthlessly"  
- "Agency supports paid channels and content creation. In-house team handles social and email"

**{{approvalLevel}}**  
Describe approval preferences and constraints.  
Examples:  
- "CEO wants to review everything before it goes out—we move slowly but stay on-brand"  
- "Team can self-approve social posts and blog content, but need VP approval for emails and paid campaigns"  
- "Fast-moving startup, minimal approvals—trust the team but need guardrails"  
- "Regulated industry (healthcare) requiring legal review for anything customer-facing"

### Performance context

**{{contentThatWorks}}**  
Provide 2-5 examples of content/campaigns that performed well, with brief explanation of what made them successful.  
Examples:  
- "LinkedIn post about 'Sales reps waste 5 hours per week' got 450+ likes, 87 comments, 15 demo requests—specific stat in headline drove engagement"  
- "Cold email with ROI calculator attachment had 34% reply rate vs. our 8% average—tangible value upfront"  
- "Customer case study video on YouTube got 12K views and was shared internally at 6 prospect companies—storytelling format resonated"

**{{contentThatFailed}}**  
Provide 2-3 examples of content/campaigns that underperformed, with lessons learned or hypotheses about why.  
Examples:  
- "Product feature announcement email had 4% open rate—subject line too generic, timing wrong (Friday afternoon)"  
- "LinkedIn carousel post explaining our methodology got 12 likes—too dense, text-heavy, no clear takeaway"  
- "Webinar on 'Future of Sales' attracted only 15 registrants—topic too broad, no tangible value promise"

**Pro tip:** For content that works/doesn't work, include specific metrics and your hypothesis about why. "It flopped" is useless. "4% open rate because subject line was generic and we sent Friday afternoon" gives the LLM actionable insights.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a marketing strategist specializing in Integrated Marketing Communications (IMC) and multi-channel strategy development. Your task is to create a comprehensive Communication Strategy by Channel document that ensures consistent brand messaging while optimizing for each channel's unique characteristics and audience expectations.

## Framework approach

Apply three complementary frameworks:
- **Integrated Marketing Communications (IMC)** - Ensure message consistency across all touchpoints while adapting for channel-specific formats
- **Customer Journey Mapping** - Align channel strategy with customer decision stages (awareness, consideration, purchase, post-purchase)
- **RACE Planning (Reach, Act, Convert, Engage)** - Structure channel objectives to optimize for funnel progression

## Document structure & requirements

Create a strategic document (2,500-3,500 words) containing the following sections:

### 1. Channel inventory & assessment

- Map all current channels
- Identify planned expansion channels
- Assign ownership based on team structure
- Analyze successful content examples
- Review underperforming content lessons

### 2. Channel-specific strategy (5-10 channels)

For each major channel, provide:

**Channel profile**
- Primary audience and their expectations
- Optimal content formats
- RACE objective alignment (Reach/Act/Convert/Engage)
- Customer journey stage relevance

**Messaging adaptation rules**
- How to translate core messages for this channel
- Format requirements and constraints
- 3-5 concrete examples showing message adaptation from other channels

**Tone modulation guidelines**
- Formality level adjustments
- Energy and style variations
- Language and vocabulary considerations
- Visual tone specifications

**Content format specifications**
- Recommended content types (video, text, image, interactive, etc.)
- Length/duration parameters
- Technical specifications
- Accessibility requirements

**Frequency & cadence**
- Optimal posting/sending schedule
- Seasonality considerations
- Engagement pattern observations
- Fatigue threshold warnings

**Performance metrics**
- Primary KPIs for this channel
- Secondary engagement metrics
- Benchmark targets
- Review frequency

### 3. Cross-channel consistency framework

Develop a checklist ensuring:
- Core message DNA remains intact across adaptations
- Visual identity consistency standards
- Brand voice recognition despite tone shifts
- Campaign coordination across channels
- Terminology and naming consistency

### 4. Governance & workflow

Design an approval process reflecting the client's approval comfort level.

Include:
- Decision authority matrix by channel and content type
- Review and approval workflow
- Quality control checkpoints
- Emergency/reactive communication protocols
- Escalation procedures
- Update and refresh cycles

### 5. Implementation roadmap

Provide:
- Prioritized channel activation sequence
- Quick wins vs. long-term builds
- Resource allocation recommendations
- Training and enablement needs
- 90-day activation plan

## Output quality standards

- **Actionable:** Every guideline must be immediately implementable
- **Specific:** Provide concrete examples, not just principles
- **Balanced:** Address both consistency and channel optimization
- **Realistic:** Consider the team structure and approval comfort provided
- **Measurable:** Include clear success metrics for each channel

## Tone & format

- Professional but accessible language
- Use tables, matrices, and visual frameworks where helpful
- Include before/after examples of message adaptation
- Provide decision trees for common scenarios
- Use callout boxes for critical warnings or best practices

## Client context

[Paste all your prepared inputs here]

### Channel landscape
- Current channels: {{channels}}
- Planned channels: {{plannedChannels}}

### Team & workflow context
- Team structure: {{teamStructure}}
- Approval comfort level: {{approvalLevel}}

### Performance context
- Content that works: {{contentThatWorks}}
- Content that failed: {{contentThatFailed}}
\`\`\`

---

## After you run it

Turn this strategy into your communications operating system:
- **Create channel playbooks** - One-pagers for each channel with quick-reference guidelines
- **Build content calendars** that map to channel frequency and cadence recommendations
- **Train channel owners** on their specific strategy, metrics, and approval workflows
- **Set up dashboards** tracking KPIs for each channel
- **Create message adaptation templates** so anyone can translate core messaging appropriately
- **Document approval workflows** in your project management tool (Asana, Monday, etc.)

Run quarterly channel reviews:
- What's working? Double down.
- What's underperforming? Kill it or fix it.
- Are new channels emerging that we should test?
- Is our messaging staying consistent across channels?
- Are approval workflows creating bottlenecks?

Update the strategy when:
- You launch new products or enter new markets
- Your positioning or messaging changes
- You hire channel-specific specialists
- Platform algorithms or best practices shift significantly
- Performance data reveals major channel opportunities or failures

## Examples

[Coming soon—sample communication strategy documents from real consulting engagements]
`, visualLogic: `[ICP_HABITS] -> {CHANNEL_AUDIT} -> [PRIORITIES]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/18_Communication_Strategy",
        frameworks: ["Bullseye Framework", "ICE Scoring (Impact, Confidence, Ease)", "PESO Model (Paid, Earned, Shared, Owned)"],
        faq: [
            { question: "Shouldn't we be everywhere?", answer: "No. It's better to be amazing on 2 channels than mediocre on 10." },
            { question: "How long to see results?", answer: "Paid = Immediate. Outbound = Weeks. SEO/Content = Months." }
        ]
    },
    {
        id: "L5.02",
        title: "Sales Enablement Plan",
        slug: "sales-enablement-plan",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Align marketing outputs with sales needs.",
        promptContent: `# Training & enablement materials

## What this generates

Your comprehensive training and enablement framework using Adult Learning Theory (Malcolm Knowles), the 70-20-10 Learning Model, Bloom's Taxonomy, and the ADDIE Model. You'll get onboarding curriculum, six core training modules, role-specific training guides, three-tier certification framework, self-assessment tools, practice scenarios and simulations, refresher training modules, ongoing enablement calendar, measurement framework, and implementation roadmap. This ensures knowledge retention, practical application, and measurable competency.

## Why you need this

Inconsistent onboarding and ad-hoc training create teams that don't speak the same brand language, make the same mistakes repeatedly, and can't scale without constant supervision. A systematic enablement program turns tribal knowledge into transferable competency, reduces time-to-productivity for new hires, and creates a culture of continuous learning. This is how you scale expertise, not just headcount.

## Before you start

This prompt works best when you have:
- Clear patterns in recurring mistakes or knowledge gaps your team encounters
- Understanding of your current onboarding process and what's working vs. not
- Sense of who will own ongoing enablement and what capacity they have
- Knowledge of available training tools and delivery preferences
- All 16 foundational brand artifacts completed (these become training content)

If you're early-stage with a small team, you can still build this as a scalable framework to implement as you grow. Just be realistic about what you can execute now vs. later.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your context and examples, the more practical and implementable your training program will be.

### Team & organizational context

**{{teamRoles}}**  
Describe your current team structure, size, and key roles.  
Example: "15-person team: 5 AEs (sales), 3 SDRs, 4 marketing (1 content, 1 demand gen, 1 product marketing, 1 ops), 2 customer success managers, 1 sales engineer"

**{{onboardingProcess}}**  
Describe your current onboarding approach, duration, and what's working/not working.  
Examples:  
- "2-week informal buddy system where new hires shadow different team members. No structured curriculum. Works: People get to know the team quickly. Doesn't work: Inconsistent knowledge transfer, reps take 6 months to ramp"  
- "We have a 30-day checklist but it's just admin tasks (benefits, tools setup). No training on brand, messaging, or methodology"

**{{onboardingTimeline}}**  
Specify your ideal onboarding duration and any constraints.  
Examples: "30-day intensive program with weekly milestones," "90-day gradual integration with monthly check-ins," "2-week crash course due to fast hiring pace"

### Performance & gaps

**{{commonMistakes}}**  
List the top 3-5 recurring errors, knowledge gaps, or performance issues your team encounters.  
Examples:  
- "Sales reps use generic value props instead of our messaging pillars"  
- "Inconsistent product positioning—everyone describes us differently"  
- "Customer success team doesn't know how to handle competitive objections"  
- "Marketing creates content off-brand because they don't understand our voice guidelines"  
- "New hires take 90 days to learn our qualification methodology"

### Delivery & ownership

**{{trainingPreference}}**  
Specify your preferred delivery method(s).  
Examples:  
- "Hybrid: 30% live virtual sessions, 70% self-paced asynchronous"  
- "100% in-person workshops during quarterly team gatherings"  
- "Fully remote and asynchronous—team is distributed globally"  
- "Live sessions for onboarding, self-paced for ongoing enablement"

**{{enablementOwner}}**  
Identify who will own ongoing training and enablement. Include their capacity/bandwidth.  
Examples:  
- "VP Sales, 5 hours/month available—needs turnkey materials"  
- "Dedicated Enablement Manager starting next quarter—can build custom content"  
- "Founder for now, will hire enablement lead at 25 employees"  
- "Marketing Manager + Sales Manager co-own, 10 hours/month combined"

**{{toolsAvailable}}**  
List learning/training tools and platforms you currently use or have access to.  
Examples:  
- "Zoom, Google Workspace, no LMS currently—need simple solutions"  
- "Articulate 360 for course creation, Docebo LMS, Gong for call reviews"  
- "Notion for documentation, Loom for video walkthroughs, no formal LMS"  
- "We can invest in tools if needed—budget for LMS if recommended"

### Optional but helpful

**{{productDescription}}**  
Brief description of what you do, who you serve, and key differentiators. Reference your Brand Positioning Statement if you've already created it.

**{{trainingPriorities}}**  
Any urgent skills gaps or upcoming launches requiring accelerated enablement.  
Example: "New product launching in Q2—need sales team trained on positioning in 6 weeks"

**{{kpis}}**  
How you currently measure team readiness or performance (if applicable).  
Example: "Track time-to-first-deal for new reps, win rate by rep, customer onboarding completion rates"

**Pro tip:** The "common mistakes" section is gold—it reveals exactly where training should focus and what scenarios to build practice exercises around. Don't generalize. Pull real examples from recent performance reviews or deal losses.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are an expert instructional designer and organizational learning strategist. Using Adult Learning Theory (Malcolm Knowles), the 70-20-10 Learning Model, Bloom's Taxonomy, and the ADDIE Model, create comprehensive training and enablement materials that ensure knowledge retention, practical application, and measurable competency.

## Framework application

- **Adult Learning Theory:** Design all materials to be self-directed, experience-based, and problem-focused, respecting that adult learners bring valuable experience and need immediate relevance
- **70-20-10 Model:** Structure learning so 70% happens through on-the-job experiences, 20% through coaching and peer learning, and 10% through formal training sessions
- **Bloom's Taxonomy:** Progress learning objectives from foundational knowledge → comprehension → application → analysis → evaluation → creation, ensuring learners can apply concepts in real business situations
- **ADDIE Model:** Follow Analysis → Design → Development → Implementation → Evaluation to create systematic, continuously improving training programs

## Your deliverables

Create a comprehensive Training & Enablement document (3000-4000 words) containing:

### 1. Onboarding curriculum

- Foundational knowledge modules for new hires
- Brand essentials and company culture integration
- Progressive learning path aligned with Bloom's Taxonomy
- Timeline considerations
- Adaptation for current team size and roles

### 2. Six core training modules

Design each module with:
- Clear learning objectives (mapped to Bloom's levels)
- 70-20-10 activity breakdown
- Estimated time to completion
- Prerequisites and dependencies
- Assessment criteria

Address common mistakes as learning opportunities within relevant modules.

### 3. Role-specific training guides

Create tailored materials for each role including:
- Unique skills and knowledge requirements
- Application scenarios per role
- Cross-functional touchpoint training where roles intersect

### 4. Three-tier certification framework

- **Foundation level:** Core competencies all team members must demonstrate
- **Practitioner level:** Role-specific mastery and application
- **Expert/trainer level:** Ability to coach others and contribute to content

Include certification criteria, assessment methods, and recertification requirements.

### 5. Self-assessment tools

- Pre-training knowledge checks
- Module completion assessments
- Quarterly self-evaluation frameworks
- Gap analysis templates linking to specific training resources

### 6. Practice scenarios & simulations

- Realistic application exercises based on common mistakes
- Role-play scripts and facilitation guides
- Decision-tree scenarios
- Safe-to-fail practice environments

Design for specified delivery method and available tools.

### 7. Refresher training modules

- Quarterly update schedule addressing new products, strategies, and tools
- Microlearning formats (5-15 minutes)
- Change management integration for major updates
- Push vs. pull content strategy

### 8. Ongoing enablement calendar

- 12-month rolling calendar
- Monthly themes and focus areas
- Quarterly deep-dives
- Annual recertification cycles
- Assigned ownership and integration with existing onboarding

### 9. Measurement framework

Establish metrics across four levels:
- **Reaction:** Learner satisfaction and engagement
- **Learning:** Knowledge and skill acquisition
- **Behavior:** On-the-job application and performance change
- **Results:** Business impact (tie to KPIs like time-to-productivity, error rates, customer satisfaction)

Include:
- Data collection methods
- Reporting cadence and dashboards
- Continuous improvement triggers
- ROI calculation methodology

### 10. Implementation roadmap

- Phased rollout plan considering team size and roles
- Quick wins vs. long-term builds
- Resource requirements
- Pilot program recommendations
- Scalability considerations

## Output specifications

- **Length:** 3000-4000 words of instructional design documentation
- **Format:** Structured document with clear sections, tables for frameworks, and actionable checklists
- **Tone:** Professional, practical, and energizing—emphasizing growth and capability building
- **Visuals:** Recommend diagrams for learning paths, certification progression, and 70-20-10 activity splits

## Quality standards

Ensure all deliverables:
- Respect adult learning principles (relevance, autonomy, experience-integration)
- Balance formal training with experiential and social learning
- Progress logically through Bloom's cognitive levels
- Include measurable outcomes at every stage
- Accommodate training delivery preferences
- Leverage available tools capabilities
- Address common mistakes proactively
- Enable enablement owner to execute independently

## Client context

[Paste all your prepared inputs here]

### Team & organizational context
- Current team size and roles: {{teamRoles}}
- Existing onboarding process: {{onboardingProcess}}
- Onboarding timeline: {{onboardingTimeline}}

### Performance & gaps
- Common mistakes: {{commonMistakes}}

### Delivery & ownership
- Training delivery preference: {{trainingPreference}}
- Enablement owner: {{enablementOwner}}
- Tools available: {{toolsAvailable}}

### Optional context (if available)
- Company/product overview: {{productDescription}}
- Immediate training priorities: {{trainingPriorities}}
- Success metrics: {{kpis}}
\`\`\`

---

## After you run it

Turn this into your learning and development system:
- **Build the onboarding program** first—get new hires productive faster
- **Create module content** using your 16 foundational brand artifacts as source material
- **Set up certification tracks** with clear criteria and assessment methods
- **Schedule enablement calendar** and assign ownership for each session
- **Implement measurement** - track time-to-productivity, knowledge retention, performance changes
- **Pilot with one role** before rolling out company-wide

Make it operational:
- **Create learning resources** - videos, one-pagers, job aids, checklists
- **Build assessment tools** - quizzes, role-plays, real-world application tests
- **Record training sessions** so they're reusable for future hires
- **Create a knowledge base** where team members can self-serve training content
- **Establish coaching culture** where 20% of learning happens through peer-to-peer

Review and iterate:
- **Monthly:** Check completion rates and learner feedback
- **Quarterly:** Update content for new products, messaging, or market changes
- **Annually:** Comprehensive program review with ROI analysis

Scale as you grow:
- **At 10 people:** Founder-led training with documented playbooks
- **At 25 people:** Dedicated enablement owner, structured onboarding program
- **At 50+ people:** Full enablement function, LMS, certification tracks, ongoing programs

## Examples

[Coming soon—sample training and enablement frameworks from real consulting engagements]
`, visualLogic: `[NEEDS] -> {TRAINING_CONTENT} -> [PERFORMANCE]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/19_Training_&_Enablement",
        frameworks: ["Just-in-Time Learning", "70-20-10 Model", "Kirkpatrick Evaluation Model"],
        faq: [
            { question: "Is this marketing's job?", answer: "It's a partnership. Marketing builds the fuel; Enablement teaches the car to drive." },
            { question: "How do we measure success?", answer: "Time to first deal, Win rates, Quota attainment." }
        ]
    },
    {
        id: "L5.03",
        title: "Campaign Brief",
        slug: "campaign-brief",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Plan integrated marketing campaigns.",
        promptContent: `# Communication strategy

## What this generates

Your comprehensive communication strategy by channel using Integrated Marketing Communications (IMC), Customer Journey Mapping, and RACE Planning (Reach, Act, Convert, Engage) frameworks. You'll get channel inventory and assessment, channel-specific strategies (5-10 channels) with messaging adaptation rules, tone modulation guidelines, content format specifications, frequency and cadence recommendations, performance metrics, cross-channel consistency framework, governance and workflow, and a 90-day implementation roadmap.

## Why you need this

Without a channel strategy, your messaging is either inconsistent (confusing customers) or identical everywhere (ignoring how people consume content differently on LinkedIn vs. email vs. events). This framework ensures your core brand DNA stays intact while optimizing for each channel's unique characteristics, audience expectations, and funnel objectives. It's how you scale communications without chaos.

## Before you start

This prompt works best when you have:
- Clear inventory of channels you're currently using and which are working vs. not working
- Examples of content that performed well and content that flopped (with data or hypotheses)
- Understanding of your team structure and who owns which channels
- Sense of your approval comfort level (tight control vs. move fast)
- Brand voice and messaging foundation already defined (reference your Brand Voice & Tone and Core Messaging Pillars docs)

If you're early-stage, you can build this based on founder insights about what's resonated so far and strategic priorities for channel expansion. Just be ready to validate and iterate as you scale.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your examples and context, the more practical your channel strategy will be.

### Channel landscape

**{{channels}}**  
List all communication channels currently in use.  
Examples: "LinkedIn (company page + CEO personal), Email newsletter (monthly to customers + prospects), Blog (weekly), Trade shows (3-4 per year), Paid LinkedIn ads, Webinars (monthly), Sales outreach emails, Customer community (Slack)"

**{{plannedChannels}}**  
List any channels planned for expansion or testing in the next 6-12 months.  
Examples: "YouTube (product demos + thought leadership), Podcast (interviewing customers), Instagram (if we pivot to visual storytelling), Twitter/X (CEO thought leadership), Reddit (community engagement), TikTok (if we target younger buyers)"

### Team & workflow context

**{{teamStructure}}**  
Describe who owns what channels and how your team is organized.  
Examples:  
- "Marketing Manager owns LinkedIn, blog, newsletter. Sales team owns outbound email. CEO handles thought leadership posts. We have a contractor for paid ads"  
- "Single marketing person handling everything—need to prioritize ruthlessly"  
- "Agency supports paid channels and content creation. In-house team handles social and email"

**{{approvalLevel}}**  
Describe approval preferences and constraints.  
Examples:  
- "CEO wants to review everything before it goes out—we move slowly but stay on-brand"  
- "Team can self-approve social posts and blog content, but need VP approval for emails and paid campaigns"  
- "Fast-moving startup, minimal approvals—trust the team but need guardrails"  
- "Regulated industry (healthcare) requiring legal review for anything customer-facing"

### Performance context

**{{contentThatWorks}}**  
Provide 2-5 examples of content/campaigns that performed well, with brief explanation of what made them successful.  
Examples:  
- "LinkedIn post about 'Sales reps waste 5 hours per week' got 450+ likes, 87 comments, 15 demo requests—specific stat in headline drove engagement"  
- "Cold email with ROI calculator attachment had 34% reply rate vs. our 8% average—tangible value upfront"  
- "Customer case study video on YouTube got 12K views and was shared internally at 6 prospect companies—storytelling format resonated"

**{{contentThatFailed}}**  
Provide 2-3 examples of content/campaigns that underperformed, with lessons learned or hypotheses about why.  
Examples:  
- "Product feature announcement email had 4% open rate—subject line too generic, timing wrong (Friday afternoon)"  
- "LinkedIn carousel post explaining our methodology got 12 likes—too dense, text-heavy, no clear takeaway"  
- "Webinar on 'Future of Sales' attracted only 15 registrants—topic too broad, no tangible value promise"

**Pro tip:** For content that works/doesn't work, include specific metrics and your hypothesis about why. "It flopped" is useless. "4% open rate because subject line was generic and we sent Friday afternoon" gives the LLM actionable insights.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a marketing strategist specializing in Integrated Marketing Communications (IMC) and multi-channel strategy development. Your task is to create a comprehensive Communication Strategy by Channel document that ensures consistent brand messaging while optimizing for each channel's unique characteristics and audience expectations.

## Framework approach

Apply three complementary frameworks:
- **Integrated Marketing Communications (IMC)** - Ensure message consistency across all touchpoints while adapting for channel-specific formats
- **Customer Journey Mapping** - Align channel strategy with customer decision stages (awareness, consideration, purchase, post-purchase)
- **RACE Planning (Reach, Act, Convert, Engage)** - Structure channel objectives to optimize for funnel progression

## Document structure & requirements

Create a strategic document (2,500-3,500 words) containing the following sections:

### 1. Channel inventory & assessment

- Map all current channels
- Identify planned expansion channels
- Assign ownership based on team structure
- Analyze successful content examples
- Review underperforming content lessons

### 2. Channel-specific strategy (5-10 channels)

For each major channel, provide:

**Channel profile**
- Primary audience and their expectations
- Optimal content formats
- RACE objective alignment (Reach/Act/Convert/Engage)
- Customer journey stage relevance

**Messaging adaptation rules**
- How to translate core messages for this channel
- Format requirements and constraints
- 3-5 concrete examples showing message adaptation from other channels

**Tone modulation guidelines**
- Formality level adjustments
- Energy and style variations
- Language and vocabulary considerations
- Visual tone specifications

**Content format specifications**
- Recommended content types (video, text, image, interactive, etc.)
- Length/duration parameters
- Technical specifications
- Accessibility requirements

**Frequency & cadence**
- Optimal posting/sending schedule
- Seasonality considerations
- Engagement pattern observations
- Fatigue threshold warnings

**Performance metrics**
- Primary KPIs for this channel
- Secondary engagement metrics
- Benchmark targets
- Review frequency

### 3. Cross-channel consistency framework

Develop a checklist ensuring:
- Core message DNA remains intact across adaptations
- Visual identity consistency standards
- Brand voice recognition despite tone shifts
- Campaign coordination across channels
- Terminology and naming consistency

### 4. Governance & workflow

Design an approval process reflecting the client's approval comfort level.

Include:
- Decision authority matrix by channel and content type
- Review and approval workflow
- Quality control checkpoints
- Emergency/reactive communication protocols
- Escalation procedures
- Update and refresh cycles

### 5. Implementation roadmap

Provide:
- Prioritized channel activation sequence
- Quick wins vs. long-term builds
- Resource allocation recommendations
- Training and enablement needs
- 90-day activation plan

## Output quality standards

- **Actionable:** Every guideline must be immediately implementable
- **Specific:** Provide concrete examples, not just principles
- **Balanced:** Address both consistency and channel optimization
- **Realistic:** Consider the team structure and approval comfort provided
- **Measurable:** Include clear success metrics for each channel

## Tone & format

- Professional but accessible language
- Use tables, matrices, and visual frameworks where helpful
- Include before/after examples of message adaptation
- Provide decision trees for common scenarios
- Use callout boxes for critical warnings or best practices

## Client context

[Paste all your prepared inputs here]

### Channel landscape
- Current channels: {{channels}}
- Planned channels: {{plannedChannels}}

### Team & workflow context
- Team structure: {{teamStructure}}
- Approval comfort level: {{approvalLevel}}

### Performance context
- Content that works: {{contentThatWorks}}
- Content that failed: {{contentThatFailed}}
\`\`\`

---

## After you run it

Turn this strategy into your communications operating system:
- **Create channel playbooks** - One-pagers for each channel with quick-reference guidelines
- **Build content calendars** that map to channel frequency and cadence recommendations
- **Train channel owners** on their specific strategy, metrics, and approval workflows
- **Set up dashboards** tracking KPIs for each channel
- **Create message adaptation templates** so anyone can translate core messaging appropriately
- **Document approval workflows** in your project management tool (Asana, Monday, etc.)

Run quarterly channel reviews:
- What's working? Double down.
- What's underperforming? Kill it or fix it.
- Are new channels emerging that we should test?
- Is our messaging staying consistent across channels?
- Are approval workflows creating bottlenecks?

Update the strategy when:
- You launch new products or enter new markets
- Your positioning or messaging changes
- You hire channel-specific specialists
- Platform algorithms or best practices shift significantly
- Performance data reveals major channel opportunities or failures

## Examples

[Coming soon—sample communication strategy documents from real consulting engagements]
`, visualLogic: `[GOAL] -> {CREATIVE} -> {DISTRIBUTION} -> [EXECUTION]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/18_Communication_Strategy",
        frameworks: ["SMART Goals", "Gantt Charting", "Integrated Marketing Communications (IMC)"],
        faq: [
            { question: "How detailed should a brief be?", answer: "Detailed enough that a creative team can build it without asking you 50 questions." },
            { question: "Who approves this?", answer: "Usually Marketing Leadership and potentially Sales Leadership if it affects lead flow." }
        ]
    },
    {
        id: "L5.04",
        title: "Nurture Sequence Strategy",
        slug: "nurture-sequence-strategy",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Automate follow-ups to convert cold leads.",
        promptContent: `# Communication strategy

## What this generates

Your comprehensive communication strategy by channel using Integrated Marketing Communications (IMC), Customer Journey Mapping, and RACE Planning (Reach, Act, Convert, Engage) frameworks. You'll get channel inventory and assessment, channel-specific strategies (5-10 channels) with messaging adaptation rules, tone modulation guidelines, content format specifications, frequency and cadence recommendations, performance metrics, cross-channel consistency framework, governance and workflow, and a 90-day implementation roadmap.

## Why you need this

Without a channel strategy, your messaging is either inconsistent (confusing customers) or identical everywhere (ignoring how people consume content differently on LinkedIn vs. email vs. events). This framework ensures your core brand DNA stays intact while optimizing for each channel's unique characteristics, audience expectations, and funnel objectives. It's how you scale communications without chaos.

## Before you start

This prompt works best when you have:
- Clear inventory of channels you're currently using and which are working vs. not working
- Examples of content that performed well and content that flopped (with data or hypotheses)
- Understanding of your team structure and who owns which channels
- Sense of your approval comfort level (tight control vs. move fast)
- Brand voice and messaging foundation already defined (reference your Brand Voice & Tone and Core Messaging Pillars docs)

If you're early-stage, you can build this based on founder insights about what's resonated so far and strategic priorities for channel expansion. Just be ready to validate and iterate as you scale.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your examples and context, the more practical your channel strategy will be.

### Channel landscape

**{{channels}}**  
List all communication channels currently in use.  
Examples: "LinkedIn (company page + CEO personal), Email newsletter (monthly to customers + prospects), Blog (weekly), Trade shows (3-4 per year), Paid LinkedIn ads, Webinars (monthly), Sales outreach emails, Customer community (Slack)"

**{{plannedChannels}}**  
List any channels planned for expansion or testing in the next 6-12 months.  
Examples: "YouTube (product demos + thought leadership), Podcast (interviewing customers), Instagram (if we pivot to visual storytelling), Twitter/X (CEO thought leadership), Reddit (community engagement), TikTok (if we target younger buyers)"

### Team & workflow context

**{{teamStructure}}**  
Describe who owns what channels and how your team is organized.  
Examples:  
- "Marketing Manager owns LinkedIn, blog, newsletter. Sales team owns outbound email. CEO handles thought leadership posts. We have a contractor for paid ads"  
- "Single marketing person handling everything—need to prioritize ruthlessly"  
- "Agency supports paid channels and content creation. In-house team handles social and email"

**{{approvalLevel}}**  
Describe approval preferences and constraints.  
Examples:  
- "CEO wants to review everything before it goes out—we move slowly but stay on-brand"  
- "Team can self-approve social posts and blog content, but need VP approval for emails and paid campaigns"  
- "Fast-moving startup, minimal approvals—trust the team but need guardrails"  
- "Regulated industry (healthcare) requiring legal review for anything customer-facing"

### Performance context

**{{contentThatWorks}}**  
Provide 2-5 examples of content/campaigns that performed well, with brief explanation of what made them successful.  
Examples:  
- "LinkedIn post about 'Sales reps waste 5 hours per week' got 450+ likes, 87 comments, 15 demo requests—specific stat in headline drove engagement"  
- "Cold email with ROI calculator attachment had 34% reply rate vs. our 8% average—tangible value upfront"  
- "Customer case study video on YouTube got 12K views and was shared internally at 6 prospect companies—storytelling format resonated"

**{{contentThatFailed}}**  
Provide 2-3 examples of content/campaigns that underperformed, with lessons learned or hypotheses about why.  
Examples:  
- "Product feature announcement email had 4% open rate—subject line too generic, timing wrong (Friday afternoon)"  
- "LinkedIn carousel post explaining our methodology got 12 likes—too dense, text-heavy, no clear takeaway"  
- "Webinar on 'Future of Sales' attracted only 15 registrants—topic too broad, no tangible value promise"

**Pro tip:** For content that works/doesn't work, include specific metrics and your hypothesis about why. "It flopped" is useless. "4% open rate because subject line was generic and we sent Friday afternoon" gives the LLM actionable insights.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a marketing strategist specializing in Integrated Marketing Communications (IMC) and multi-channel strategy development. Your task is to create a comprehensive Communication Strategy by Channel document that ensures consistent brand messaging while optimizing for each channel's unique characteristics and audience expectations.

## Framework approach

Apply three complementary frameworks:
- **Integrated Marketing Communications (IMC)** - Ensure message consistency across all touchpoints while adapting for channel-specific formats
- **Customer Journey Mapping** - Align channel strategy with customer decision stages (awareness, consideration, purchase, post-purchase)
- **RACE Planning (Reach, Act, Convert, Engage)** - Structure channel objectives to optimize for funnel progression

## Document structure & requirements

Create a strategic document (2,500-3,500 words) containing the following sections:

### 1. Channel inventory & assessment

- Map all current channels
- Identify planned expansion channels
- Assign ownership based on team structure
- Analyze successful content examples
- Review underperforming content lessons

### 2. Channel-specific strategy (5-10 channels)

For each major channel, provide:

**Channel profile**
- Primary audience and their expectations
- Optimal content formats
- RACE objective alignment (Reach/Act/Convert/Engage)
- Customer journey stage relevance

**Messaging adaptation rules**
- How to translate core messages for this channel
- Format requirements and constraints
- 3-5 concrete examples showing message adaptation from other channels

**Tone modulation guidelines**
- Formality level adjustments
- Energy and style variations
- Language and vocabulary considerations
- Visual tone specifications

**Content format specifications**
- Recommended content types (video, text, image, interactive, etc.)
- Length/duration parameters
- Technical specifications
- Accessibility requirements

**Frequency & cadence**
- Optimal posting/sending schedule
- Seasonality considerations
- Engagement pattern observations
- Fatigue threshold warnings

**Performance metrics**
- Primary KPIs for this channel
- Secondary engagement metrics
- Benchmark targets
- Review frequency

### 3. Cross-channel consistency framework

Develop a checklist ensuring:
- Core message DNA remains intact across adaptations
- Visual identity consistency standards
- Brand voice recognition despite tone shifts
- Campaign coordination across channels
- Terminology and naming consistency

### 4. Governance & workflow

Design an approval process reflecting the client's approval comfort level.

Include:
- Decision authority matrix by channel and content type
- Review and approval workflow
- Quality control checkpoints
- Emergency/reactive communication protocols
- Escalation procedures
- Update and refresh cycles

### 5. Implementation roadmap

Provide:
- Prioritized channel activation sequence
- Quick wins vs. long-term builds
- Resource allocation recommendations
- Training and enablement needs
- 90-day activation plan

## Output quality standards

- **Actionable:** Every guideline must be immediately implementable
- **Specific:** Provide concrete examples, not just principles
- **Balanced:** Address both consistency and channel optimization
- **Realistic:** Consider the team structure and approval comfort provided
- **Measurable:** Include clear success metrics for each channel

## Tone & format

- Professional but accessible language
- Use tables, matrices, and visual frameworks where helpful
- Include before/after examples of message adaptation
- Provide decision trees for common scenarios
- Use callout boxes for critical warnings or best practices

## Client context

[Paste all your prepared inputs here]

### Channel landscape
- Current channels: {{channels}}
- Planned channels: {{plannedChannels}}

### Team & workflow context
- Team structure: {{teamStructure}}
- Approval comfort level: {{approvalLevel}}

### Performance context
- Content that works: {{contentThatWorks}}
- Content that failed: {{contentThatFailed}}
\`\`\`

---

## After you run it

Turn this strategy into your communications operating system:
- **Create channel playbooks** - One-pagers for each channel with quick-reference guidelines
- **Build content calendars** that map to channel frequency and cadence recommendations
- **Train channel owners** on their specific strategy, metrics, and approval workflows
- **Set up dashboards** tracking KPIs for each channel
- **Create message adaptation templates** so anyone can translate core messaging appropriately
- **Document approval workflows** in your project management tool (Asana, Monday, etc.)

Run quarterly channel reviews:
- What's working? Double down.
- What's underperforming? Kill it or fix it.
- Are new channels emerging that we should test?
- Is our messaging staying consistent across channels?
- Are approval workflows creating bottlenecks?

Update the strategy when:
- You launch new products or enter new markets
- Your positioning or messaging changes
- You hire channel-specific specialists
- Platform algorithms or best practices shift significantly
- Performance data reveals major channel opportunities or failures

## Examples

[Coming soon—sample communication strategy documents from real consulting engagements]
`, visualLogic: `[LEAD] -> {VALUE_DRIP} -> [CONVERSION]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/18_Communication_Strategy",
        frameworks: ["Ryan Deiss' Machine", "Soap Opera Sequence", "Give-Give-Give-Ask"],
        faq: [
            { question: "How often should I email?", answer: "It depends. A common cadence is Day 0, Day 2, Day 5, Day 10, Day 20." },
            { question: "What if they don't open?", answer: "Resend with a new subject line, or move them to a general newsletter list." }
        ]
    },
    {
        id: "L5.05",
        title: "Content Formats & Repurposing",
        slug: "content-formats-repurposing",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Get maximum value from every piece of content.",
        promptContent: `# Communication strategy

## What this generates

Your comprehensive communication strategy by channel using Integrated Marketing Communications (IMC), Customer Journey Mapping, and RACE Planning (Reach, Act, Convert, Engage) frameworks. You'll get channel inventory and assessment, channel-specific strategies (5-10 channels) with messaging adaptation rules, tone modulation guidelines, content format specifications, frequency and cadence recommendations, performance metrics, cross-channel consistency framework, governance and workflow, and a 90-day implementation roadmap.

## Why you need this

Without a channel strategy, your messaging is either inconsistent (confusing customers) or identical everywhere (ignoring how people consume content differently on LinkedIn vs. email vs. events). This framework ensures your core brand DNA stays intact while optimizing for each channel's unique characteristics, audience expectations, and funnel objectives. It's how you scale communications without chaos.

## Before you start

This prompt works best when you have:
- Clear inventory of channels you're currently using and which are working vs. not working
- Examples of content that performed well and content that flopped (with data or hypotheses)
- Understanding of your team structure and who owns which channels
- Sense of your approval comfort level (tight control vs. move fast)
- Brand voice and messaging foundation already defined (reference your Brand Voice & Tone and Core Messaging Pillars docs)

If you're early-stage, you can build this based on founder insights about what's resonated so far and strategic priorities for channel expansion. Just be ready to validate and iterate as you scale.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your examples and context, the more practical your channel strategy will be.

### Channel landscape

**{{channels}}**  
List all communication channels currently in use.  
Examples: "LinkedIn (company page + CEO personal), Email newsletter (monthly to customers + prospects), Blog (weekly), Trade shows (3-4 per year), Paid LinkedIn ads, Webinars (monthly), Sales outreach emails, Customer community (Slack)"

**{{plannedChannels}}**  
List any channels planned for expansion or testing in the next 6-12 months.  
Examples: "YouTube (product demos + thought leadership), Podcast (interviewing customers), Instagram (if we pivot to visual storytelling), Twitter/X (CEO thought leadership), Reddit (community engagement), TikTok (if we target younger buyers)"

### Team & workflow context

**{{teamStructure}}**  
Describe who owns what channels and how your team is organized.  
Examples:  
- "Marketing Manager owns LinkedIn, blog, newsletter. Sales team owns outbound email. CEO handles thought leadership posts. We have a contractor for paid ads"  
- "Single marketing person handling everything—need to prioritize ruthlessly"  
- "Agency supports paid channels and content creation. In-house team handles social and email"

**{{approvalLevel}}**  
Describe approval preferences and constraints.  
Examples:  
- "CEO wants to review everything before it goes out—we move slowly but stay on-brand"  
- "Team can self-approve social posts and blog content, but need VP approval for emails and paid campaigns"  
- "Fast-moving startup, minimal approvals—trust the team but need guardrails"  
- "Regulated industry (healthcare) requiring legal review for anything customer-facing"

### Performance context

**{{contentThatWorks}}**  
Provide 2-5 examples of content/campaigns that performed well, with brief explanation of what made them successful.  
Examples:  
- "LinkedIn post about 'Sales reps waste 5 hours per week' got 450+ likes, 87 comments, 15 demo requests—specific stat in headline drove engagement"  
- "Cold email with ROI calculator attachment had 34% reply rate vs. our 8% average—tangible value upfront"  
- "Customer case study video on YouTube got 12K views and was shared internally at 6 prospect companies—storytelling format resonated"

**{{contentThatFailed}}**  
Provide 2-3 examples of content/campaigns that underperformed, with lessons learned or hypotheses about why.  
Examples:  
- "Product feature announcement email had 4% open rate—subject line too generic, timing wrong (Friday afternoon)"  
- "LinkedIn carousel post explaining our methodology got 12 likes—too dense, text-heavy, no clear takeaway"  
- "Webinar on 'Future of Sales' attracted only 15 registrants—topic too broad, no tangible value promise"

**Pro tip:** For content that works/doesn't work, include specific metrics and your hypothesis about why. "It flopped" is useless. "4% open rate because subject line was generic and we sent Friday afternoon" gives the LLM actionable insights.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a marketing strategist specializing in Integrated Marketing Communications (IMC) and multi-channel strategy development. Your task is to create a comprehensive Communication Strategy by Channel document that ensures consistent brand messaging while optimizing for each channel's unique characteristics and audience expectations.

## Framework approach

Apply three complementary frameworks:
- **Integrated Marketing Communications (IMC)** - Ensure message consistency across all touchpoints while adapting for channel-specific formats
- **Customer Journey Mapping** - Align channel strategy with customer decision stages (awareness, consideration, purchase, post-purchase)
- **RACE Planning (Reach, Act, Convert, Engage)** - Structure channel objectives to optimize for funnel progression

## Document structure & requirements

Create a strategic document (2,500-3,500 words) containing the following sections:

### 1. Channel inventory & assessment

- Map all current channels
- Identify planned expansion channels
- Assign ownership based on team structure
- Analyze successful content examples
- Review underperforming content lessons

### 2. Channel-specific strategy (5-10 channels)

For each major channel, provide:

**Channel profile**
- Primary audience and their expectations
- Optimal content formats
- RACE objective alignment (Reach/Act/Convert/Engage)
- Customer journey stage relevance

**Messaging adaptation rules**
- How to translate core messages for this channel
- Format requirements and constraints
- 3-5 concrete examples showing message adaptation from other channels

**Tone modulation guidelines**
- Formality level adjustments
- Energy and style variations
- Language and vocabulary considerations
- Visual tone specifications

**Content format specifications**
- Recommended content types (video, text, image, interactive, etc.)
- Length/duration parameters
- Technical specifications
- Accessibility requirements

**Frequency & cadence**
- Optimal posting/sending schedule
- Seasonality considerations
- Engagement pattern observations
- Fatigue threshold warnings

**Performance metrics**
- Primary KPIs for this channel
- Secondary engagement metrics
- Benchmark targets
- Review frequency

### 3. Cross-channel consistency framework

Develop a checklist ensuring:
- Core message DNA remains intact across adaptations
- Visual identity consistency standards
- Brand voice recognition despite tone shifts
- Campaign coordination across channels
- Terminology and naming consistency

### 4. Governance & workflow

Design an approval process reflecting the client's approval comfort level.

Include:
- Decision authority matrix by channel and content type
- Review and approval workflow
- Quality control checkpoints
- Emergency/reactive communication protocols
- Escalation procedures
- Update and refresh cycles

### 5. Implementation roadmap

Provide:
- Prioritized channel activation sequence
- Quick wins vs. long-term builds
- Resource allocation recommendations
- Training and enablement needs
- 90-day activation plan

## Output quality standards

- **Actionable:** Every guideline must be immediately implementable
- **Specific:** Provide concrete examples, not just principles
- **Balanced:** Address both consistency and channel optimization
- **Realistic:** Consider the team structure and approval comfort provided
- **Measurable:** Include clear success metrics for each channel

## Tone & format

- Professional but accessible language
- Use tables, matrices, and visual frameworks where helpful
- Include before/after examples of message adaptation
- Provide decision trees for common scenarios
- Use callout boxes for critical warnings or best practices

## Client context

[Paste all your prepared inputs here]

### Channel landscape
- Current channels: {{channels}}
- Planned channels: {{plannedChannels}}

### Team & workflow context
- Team structure: {{teamStructure}}
- Approval comfort level: {{approvalLevel}}

### Performance context
- Content that works: {{contentThatWorks}}
- Content that failed: {{contentThatFailed}}
\`\`\`

---

## After you run it

Turn this strategy into your communications operating system:
- **Create channel playbooks** - One-pagers for each channel with quick-reference guidelines
- **Build content calendars** that map to channel frequency and cadence recommendations
- **Train channel owners** on their specific strategy, metrics, and approval workflows
- **Set up dashboards** tracking KPIs for each channel
- **Create message adaptation templates** so anyone can translate core messaging appropriately
- **Document approval workflows** in your project management tool (Asana, Monday, etc.)

Run quarterly channel reviews:
- What's working? Double down.
- What's underperforming? Kill it or fix it.
- Are new channels emerging that we should test?
- Is our messaging staying consistent across channels?
- Are approval workflows creating bottlenecks?

Update the strategy when:
- You launch new products or enter new markets
- Your positioning or messaging changes
- You hire channel-specific specialists
- Platform algorithms or best practices shift significantly
- Performance data reveals major channel opportunities or failures

## Examples

[Coming soon—sample communication strategy documents from real consulting engagements]
`, visualLogic: `[CORE_ASSET] -> {ATOMIZATION} -> [DISTRIBUTION]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/18_Communication_Strategy",
        frameworks: ["GaryVee Content Model", "Content Atomization", "COPE (Create Once, Publish Everywhere)"],
        faq: [
            { question: "Isn't this repetitive?", answer: "No. Different people consume different formats on different channels. You're increasing reach, not annoying people." },
            { question: "Do I have to do video?", answer: "You should. It's the highest engagement format on almost every platform." }
        ]
    },
    {
        id: "L6.01",
        title: "Marketing KPIs & Metrics",
        slug: "marketing-kpis-metrics",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Define success and track what matters.",
        promptContent: `# Performance measurement framework

## What this generates

Your comprehensive performance measurement framework using OKRs, Marketing Mix Modeling, Brand Health Tracking, Balanced Scorecards, and Multi-Touch Attribution. You'll get strategic OKRs aligned with business goals, brand health scorecard, message effectiveness metrics, channel performance KPIs, leading vs. lagging indicators map, three-tiered dashboard structure (executive, management, specialist), reporting cadence calendar, and continuous improvement process. This connects marketing activities to business outcomes and enables data-driven decision-making.

## Why you need this

"We're doing marketing but we don't know what's working" is the death of a marketing budget. Without a measurement framework, you're flying blind—unable to prove ROI, optimize spend, or make strategic decisions. Tracking vanity metrics (followers, impressions) instead of business outcomes (pipeline, revenue, brand equity) means you can't answer the CEO's question: "What are we getting for this investment?" This framework balances short-term tactical metrics with long-term brand building, so you can both prove impact today and build sustainable competitive advantage.

## Before you start

This prompt works best when you have:
- Clear business goals and growth targets for the next 12-24 months
- Current metrics you're tracking (even if imperfect) with baseline performance data
- Understanding of your biggest measurement blind spots—where you lack visibility
- Inventory of analytics tools, CRM, and data sources you have access to
- Clarity on who needs reports and how often they need them

If you're early-stage, you can build this based on strategic priorities and available tools, even if you're not tracking much yet. The framework will guide what to implement first.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your goals and context, the more actionable your measurement framework will be.

### Business context

**{{businessGoals}}**  
What are your primary business objectives and specific growth targets for the next 12-24 months?  
Examples:  
- "Increase revenue from $5M to $10M ARR, expand from mid-market to enterprise segment, launch 2 new products, achieve 95% gross retention rate"  
- "Double pipeline from $20M to $40M, reduce CAC by 20%, increase average deal size from $50K to $75K, enter European market"

**{{currentMetrics}}**  
What metrics are you currently tracking, and what are your baseline performance levels?  
Examples:  
- "Monthly website visitors: 50K, MQL to SQL conversion: 18%, Average sales cycle: 90 days, Customer acquisition cost: $8,500, NPS: 42, Email open rate: 24%, LinkedIn engagement rate: 2.3%"  
- "We track basic Google Analytics (traffic, conversions) and Salesforce pipeline metrics, but don't have sophisticated attribution or brand health tracking"

**{{blindSpots}}**  
Where do you currently lack visibility or insights in your marketing performance?  
Examples:  
- "Don't know which marketing channels drive highest quality pipeline—just track first-touch attribution"  
- "No visibility into brand perception vs. competitors—we're guessing about positioning effectiveness"  
- "Can't connect marketing spend to revenue—sales says 'most deals come from referrals' but we can't prove it"  
- "Don't know if our messaging is resonating—just measuring vanity metrics like impressions"

### Operational context

**{{toolsAvailable}}**  
What analytics platforms, CRM systems, marketing automation tools, and data sources do you currently use?  
Examples:  
- "Google Analytics 4, HubSpot (CRM + marketing automation), Salesforce, LinkedIn Campaign Manager, Google Ads, SEMrush, no BI tool yet"  
- "Basic tech stack: Google Analytics, Mailchimp, social platform native analytics. Budget for one new tool if needed"  
- "Enterprise stack: Salesforce + Marketo + Tableau + 6sense + Gong + full martech suite"

**{{teamStructure}}**  
Who are the team members involved in measurement and reporting, and what are their roles?  
Examples:  
- "Marketing Director (owns strategy), Digital Marketing Manager (runs campaigns), Content Lead (creates content), no dedicated analyst—Director handles reporting"  
- "VP Marketing, Demand Gen Manager, Content Marketing Manager, Marketing Ops Analyst (part-time), Sales Ops Manager (partner for attribution)"

**{{reportingAudience}}**  
Who are the key stakeholders who will consume these reports, and what do they care about?  
Examples:  
- "CEO (cares about pipeline and ROI), CFO (cares about budget efficiency), VP Sales (cares about lead quality and velocity), Board (cares about brand health and market position quarterly)"  
- "Just founder + small team for now—need simple dashboards we can all understand"

**{{reportingCadence}}**  
What is your desired cadence for different types of reporting?  
Examples:  
- "Daily campaign snapshots for active campaigns, weekly channel performance review with marketing team, monthly comprehensive review with CEO, quarterly board presentation"  
- "Weekly dashboard check-ins, monthly deep dives, quarterly strategic reviews—keep it simple for now"

**Pro tip:** For "biggest blind spots," be brutally honest. "We have no idea if our $50K/month in LinkedIn ads is actually driving pipeline" is more useful than "we'd like better attribution." Specificity helps the LLM design measurements that actually solve your problems.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a performance measurement and marketing analytics expert specializing in OKRs, Marketing Mix Modeling, Brand Health Tracking, Balanced Scorecards, and Multi-Touch Attribution. Your task is to create a comprehensive Performance Measurement Framework that connects marketing activities to business outcomes and enables data-driven decision-making.

## Context

Using the provided client information, develop a measurement framework that:
- Aligns marketing performance with strategic business objectives
- Balances short-term tactical metrics with long-term brand building
- Provides actionable insights across multiple marketing channels
- Distinguishes between leading indicators (predictive) and lagging indicators (confirmatory)
- Enables stakeholders at all levels to make informed decisions

## Core framework approach

Integrate these complementary methodologies:
- **OKRs (Objectives & Key Results)** - To ensure measurement of what truly matters and maintain strategic focus
- **Marketing Mix Modeling** - To accurately attribute results to the appropriate channels and optimize budget allocation
- **Brand Health Tracking** - To monitor long-term brand equity and perception evolution
- **Balanced Scorecard** - To connect marketing metrics with broader business strategy across financial, customer, internal process, and learning/growth dimensions
- **Multi-Touch Attribution** - To understand the granular impact of each touchpoint in the customer journey

## Required outputs

Create a comprehensive Performance Measurement Framework document (3,000-3,500 words) containing:

### 1. Strategic OKRs (400-500 words)

Develop 4 strategic marketing objectives aligned with business goals, each with 3-5 measurable key results:
- **Objective 1:** Brand awareness and perception
- **Objective 2:** Demand generation and pipeline impact
- **Objective 3:** Customer acquisition and conversion efficiency
- **Objective 4:** Customer retention and lifetime value growth

For each objective, specify:
- The strategic "why" connecting to business goals
- Key results with specific targets and timeframes
- Owner/accountable party from team structure
- How this addresses any identified blind spots

### 2. Brand health scorecard (500-600 words)

Design a comprehensive brand health measurement system including:
- **Awareness metrics:** Aided/unaided awareness, share of voice, search volume trends
- **Perception metrics:** Brand attributes, Net Promoter Score (NPS), sentiment analysis
- **Consideration metrics:** Brand preference, purchase intent, competitive positioning
- **Loyalty metrics:** Repeat purchase rate, customer lifetime value, advocacy behaviors
- **Equity metrics:** Brand valuation indicators, price premium capability, brand extensions potential

Specify:
- Measurement methodology and data sources from available tools
- Benchmarking approach (competitive and historical)
- Recommended tracking frequency
- How to interpret directional changes

### 3. Message effectiveness metrics (400-500 words)

Create a framework to measure message resonance and performance:
- **Recall metrics:** Message retention, brand association, key message pull-through
- **Comprehension metrics:** Understanding of value propositions, clarity scores
- **Resonance metrics:** Emotional response, relevance ratings, persuasiveness scores
- **Behavioral metrics:** Click-through rates on message-driven content, conversion impact by message variant
- **Channel-specific adaptation:** How message effectiveness varies across channels

Include testing methodologies and iteration protocols.

### 4. Channel performance KPIs framework (500-600 words)

Develop tailored metrics for each relevant marketing channel aligned with available tools:

For each channel, define:
- **Reach metrics:** Impressions, unique users, audience growth
- **Engagement metrics:** Time spent, interaction rate, content consumption depth
- **Conversion metrics:** Click-through rate, conversion rate, cost per acquisition
- **Efficiency metrics:** ROI, ROAS, cost per engagement
- **Attribution weighting:** Multi-touch attribution model specifications

Create a channel attribution matrix showing how each channel contributes across the customer journey stages (awareness → consideration → decision → retention).

### 5. Leading vs. lagging indicators map (300-400 words)

Create a clear distinction between predictive and confirmatory metrics:

**Leading indicators (early warning signals):**
- Website engagement trends
- Content consumption patterns
- Pipeline velocity changes
- Market share of voice shifts
- Audience sentiment movements

**Lagging indicators (results confirmation):**
- Revenue and bookings
- Customer acquisition cost
- Conversion rates
- Market share
- Customer lifetime value

Explain the relationship between leading and lagging indicators and how to use both for proactive decision-making.

### 6. Dashboard structure blueprint (500-600 words)

Design three-tiered dashboard architecture tailored to reporting audience:

**Executive dashboard (strategic view):**
- 6-8 north star metrics
- Progress toward OKRs
- Brand health summary
- Revenue and pipeline impact
- Month-over-month and year-over-year trends

**Marketing management dashboard (tactical view):**
- Channel performance comparison
- Campaign effectiveness
- Budget pacing and ROI
- Message testing results
- Leading indicator alerts

**Specialist dashboard (operational view):**
- Granular channel metrics
- Real-time campaign performance
- A/B test results
- Content performance details
- Technical optimization opportunities

For each dashboard level, specify:
- Key visualizations and chart types
- Data refresh frequency
- Implementation using available tools
- Mobile vs. desktop considerations

### 7. Reporting cadence calendar (300-400 words)

Create a structured reporting schedule based on reporting frequency and audience:

**Daily reporting:**
- Automated snapshots for active campaigns
- Real-time performance alerts
- Who receives: Team operational roles

**Weekly reporting:**
- Channel performance summaries
- Campaign progress updates
- Optimization recommendations
- Who receives: Marketing management

**Monthly reporting:**
- Comprehensive marketing performance review
- OKR progress assessment
- Brand health update
- ROI analysis by channel and campaign
- Who receives: Marketing leadership and relevant stakeholders

**Quarterly reporting:**
- Strategic performance review
- Brand health deep dive
- Multi-touch attribution insights
- Budget reallocation recommendations
- Who receives: Executive team and board

Include report formats, presentation templates, and meeting structures.

### 8. Continuous improvement process (300-400 words)

Establish a framework for measurement evolution:
- **Monthly metric reviews:** Evaluate whether current metrics still align with business goals
- **Quarterly framework audits:** Assess measurement gaps revealed in blind spots
- **Learning agenda:** Prioritized questions to answer through measurement
- **Testing roadmap:** Systematic approach to message and channel testing
- **Tool optimization:** Maximizing value from available tools and identifying gaps
- **Team development:** Building analytical capabilities within team structure

Include a change management process for introducing new metrics or retiring irrelevant ones.

## Output format requirements

- Use clear headers and subheaders for easy navigation
- Include specific examples relevant to the client's context
- Provide calculation formulas for custom metrics
- Create visual descriptions for dashboard layouts (describe what would be shown)
- Use tables to organize complex metric frameworks
- Bold key metrics and important callouts
- Include implementation timelines (quick wins vs. long-term builds)

## Tone and style

- Strategic yet practical
- Data-driven but accessible to non-technical stakeholders
- Action-oriented with clear next steps
- Balanced between sophistication and simplicity
- Reference specific tools from available tools where relevant

## Client context

[Paste all your prepared inputs here]

### Business context
- Business goals: {{businessGoals}}
- Current metrics: {{currentMetrics}}
- Biggest blind spots: {{blindSpots}}

### Operational context
- Available tools: {{toolsAvailable}}
- Team structure: {{teamStructure}}
- Reporting audience: {{reportingAudience}}
- Reporting frequency: {{reportingCadence}}
\`\`\`

---

## After you run it

Turn this framework into your measurement operating system:
- **Implement dashboards** starting with the executive view—get leadership bought in first
- **Set up OKR tracking** in a visible place (Notion, spreadsheet, OKR tool) that the team reviews weekly
- **Configure tools** to collect the metrics you've defined (GA4 goals, CRM reports, attribution models)
- **Establish reporting rituals** - weekly team reviews, monthly leadership reviews, quarterly board prep
- **Train the team** on what metrics matter and how to interpret them
- **Start brand health tracking** even if it's manual surveys at first—trend data is gold

Build the infrastructure:
- **Connect data sources** - integrate CRM, marketing automation, analytics platforms
- **Create report templates** so reporting is consistent and efficient
- **Automate where possible** - scheduled reports, dashboard refreshes, alert triggers
- **Document definitions** - what exactly counts as an MQL? How is pipeline attributed?

Review and evolve:
- **Monthly:** Check if metrics are still answering the right questions
- **Quarterly:** Audit for blind spots—what new questions emerged that you can't answer?
- **Annually:** Comprehensive framework refresh aligned with new business goals

Mature over time:
- **Phase 1 (Months 1-3):** Basic dashboards, manual reporting, foundational OKRs
- **Phase 2 (Months 4-6):** Automated reporting, multi-touch attribution, brand health baseline
- **Phase 3 (Months 7-12):** Sophisticated attribution, predictive analytics, marketing mix modeling

## Examples

[Coming soon—sample performance measurement frameworks from real consulting engagements]
`, visualLogic: `[INPUTS] -> {FUNNEL} -> [OUTPUTS]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L7_Evolution_&_Refinement/20_Performance_Measurement",
        frameworks: ["OKR (Objectives and Key Results)", "SaaS Metrics (David Skok)", "Pirate Metrics (AARRR)"],
        faq: [
            { question: "What is a vanity metric?", answer: "Numbers that look good but don't pay the rent. E.g., 'Pageviews' (Vanity) vs. 'Demos Booked' (Value)." },
            { question: "How often should we report?", answer: "Ops team: Daily/Weekly. Leadership: Monthly/Quarterly." }
        ]
    },
    {
        id: "L6.02",
        title: "Marketing Dashboard",
        slug: "marketing-dashboard",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Visualize your data for rapid decision making.",
        promptContent: `# Performance measurement framework

## What this generates

Your comprehensive performance measurement framework using OKRs, Marketing Mix Modeling, Brand Health Tracking, Balanced Scorecards, and Multi-Touch Attribution. You'll get strategic OKRs aligned with business goals, brand health scorecard, message effectiveness metrics, channel performance KPIs, leading vs. lagging indicators map, three-tiered dashboard structure (executive, management, specialist), reporting cadence calendar, and continuous improvement process. This connects marketing activities to business outcomes and enables data-driven decision-making.

## Why you need this

"We're doing marketing but we don't know what's working" is the death of a marketing budget. Without a measurement framework, you're flying blind—unable to prove ROI, optimize spend, or make strategic decisions. Tracking vanity metrics (followers, impressions) instead of business outcomes (pipeline, revenue, brand equity) means you can't answer the CEO's question: "What are we getting for this investment?" This framework balances short-term tactical metrics with long-term brand building, so you can both prove impact today and build sustainable competitive advantage.

## Before you start

This prompt works best when you have:
- Clear business goals and growth targets for the next 12-24 months
- Current metrics you're tracking (even if imperfect) with baseline performance data
- Understanding of your biggest measurement blind spots—where you lack visibility
- Inventory of analytics tools, CRM, and data sources you have access to
- Clarity on who needs reports and how often they need them

If you're early-stage, you can build this based on strategic priorities and available tools, even if you're not tracking much yet. The framework will guide what to implement first.

## Prepare your inputs

Fill out this form before running the prompt. The more specific your goals and context, the more actionable your measurement framework will be.

### Business context

**{{businessGoals}}**  
What are your primary business objectives and specific growth targets for the next 12-24 months?  
Examples:  
- "Increase revenue from $5M to $10M ARR, expand from mid-market to enterprise segment, launch 2 new products, achieve 95% gross retention rate"  
- "Double pipeline from $20M to $40M, reduce CAC by 20%, increase average deal size from $50K to $75K, enter European market"

**{{currentMetrics}}**  
What metrics are you currently tracking, and what are your baseline performance levels?  
Examples:  
- "Monthly website visitors: 50K, MQL to SQL conversion: 18%, Average sales cycle: 90 days, Customer acquisition cost: $8,500, NPS: 42, Email open rate: 24%, LinkedIn engagement rate: 2.3%"  
- "We track basic Google Analytics (traffic, conversions) and Salesforce pipeline metrics, but don't have sophisticated attribution or brand health tracking"

**{{blindSpots}}**  
Where do you currently lack visibility or insights in your marketing performance?  
Examples:  
- "Don't know which marketing channels drive highest quality pipeline—just track first-touch attribution"  
- "No visibility into brand perception vs. competitors—we're guessing about positioning effectiveness"  
- "Can't connect marketing spend to revenue—sales says 'most deals come from referrals' but we can't prove it"  
- "Don't know if our messaging is resonating—just measuring vanity metrics like impressions"

### Operational context

**{{toolsAvailable}}**  
What analytics platforms, CRM systems, marketing automation tools, and data sources do you currently use?  
Examples:  
- "Google Analytics 4, HubSpot (CRM + marketing automation), Salesforce, LinkedIn Campaign Manager, Google Ads, SEMrush, no BI tool yet"  
- "Basic tech stack: Google Analytics, Mailchimp, social platform native analytics. Budget for one new tool if needed"  
- "Enterprise stack: Salesforce + Marketo + Tableau + 6sense + Gong + full martech suite"

**{{teamStructure}}**  
Who are the team members involved in measurement and reporting, and what are their roles?  
Examples:  
- "Marketing Director (owns strategy), Digital Marketing Manager (runs campaigns), Content Lead (creates content), no dedicated analyst—Director handles reporting"  
- "VP Marketing, Demand Gen Manager, Content Marketing Manager, Marketing Ops Analyst (part-time), Sales Ops Manager (partner for attribution)"

**{{reportingAudience}}**  
Who are the key stakeholders who will consume these reports, and what do they care about?  
Examples:  
- "CEO (cares about pipeline and ROI), CFO (cares about budget efficiency), VP Sales (cares about lead quality and velocity), Board (cares about brand health and market position quarterly)"  
- "Just founder + small team for now—need simple dashboards we can all understand"

**{{reportingCadence}}**  
What is your desired cadence for different types of reporting?  
Examples:  
- "Daily campaign snapshots for active campaigns, weekly channel performance review with marketing team, monthly comprehensive review with CEO, quarterly board presentation"  
- "Weekly dashboard check-ins, monthly deep dives, quarterly strategic reviews—keep it simple for now"

**Pro tip:** For "biggest blind spots," be brutally honest. "We have no idea if our $50K/month in LinkedIn ads is actually driving pipeline" is more useful than "we'd like better attribution." Specificity helps the LLM design measurements that actually solve your problems.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a performance measurement and marketing analytics expert specializing in OKRs, Marketing Mix Modeling, Brand Health Tracking, Balanced Scorecards, and Multi-Touch Attribution. Your task is to create a comprehensive Performance Measurement Framework that connects marketing activities to business outcomes and enables data-driven decision-making.

## Context

Using the provided client information, develop a measurement framework that:
- Aligns marketing performance with strategic business objectives
- Balances short-term tactical metrics with long-term brand building
- Provides actionable insights across multiple marketing channels
- Distinguishes between leading indicators (predictive) and lagging indicators (confirmatory)
- Enables stakeholders at all levels to make informed decisions

## Core framework approach

Integrate these complementary methodologies:
- **OKRs (Objectives & Key Results)** - To ensure measurement of what truly matters and maintain strategic focus
- **Marketing Mix Modeling** - To accurately attribute results to the appropriate channels and optimize budget allocation
- **Brand Health Tracking** - To monitor long-term brand equity and perception evolution
- **Balanced Scorecard** - To connect marketing metrics with broader business strategy across financial, customer, internal process, and learning/growth dimensions
- **Multi-Touch Attribution** - To understand the granular impact of each touchpoint in the customer journey

## Required outputs

Create a comprehensive Performance Measurement Framework document (3,000-3,500 words) containing:

### 1. Strategic OKRs (400-500 words)

Develop 4 strategic marketing objectives aligned with business goals, each with 3-5 measurable key results:
- **Objective 1:** Brand awareness and perception
- **Objective 2:** Demand generation and pipeline impact
- **Objective 3:** Customer acquisition and conversion efficiency
- **Objective 4:** Customer retention and lifetime value growth

For each objective, specify:
- The strategic "why" connecting to business goals
- Key results with specific targets and timeframes
- Owner/accountable party from team structure
- How this addresses any identified blind spots

### 2. Brand health scorecard (500-600 words)

Design a comprehensive brand health measurement system including:
- **Awareness metrics:** Aided/unaided awareness, share of voice, search volume trends
- **Perception metrics:** Brand attributes, Net Promoter Score (NPS), sentiment analysis
- **Consideration metrics:** Brand preference, purchase intent, competitive positioning
- **Loyalty metrics:** Repeat purchase rate, customer lifetime value, advocacy behaviors
- **Equity metrics:** Brand valuation indicators, price premium capability, brand extensions potential

Specify:
- Measurement methodology and data sources from available tools
- Benchmarking approach (competitive and historical)
- Recommended tracking frequency
- How to interpret directional changes

### 3. Message effectiveness metrics (400-500 words)

Create a framework to measure message resonance and performance:
- **Recall metrics:** Message retention, brand association, key message pull-through
- **Comprehension metrics:** Understanding of value propositions, clarity scores
- **Resonance metrics:** Emotional response, relevance ratings, persuasiveness scores
- **Behavioral metrics:** Click-through rates on message-driven content, conversion impact by message variant
- **Channel-specific adaptation:** How message effectiveness varies across channels

Include testing methodologies and iteration protocols.

### 4. Channel performance KPIs framework (500-600 words)

Develop tailored metrics for each relevant marketing channel aligned with available tools:

For each channel, define:
- **Reach metrics:** Impressions, unique users, audience growth
- **Engagement metrics:** Time spent, interaction rate, content consumption depth
- **Conversion metrics:** Click-through rate, conversion rate, cost per acquisition
- **Efficiency metrics:** ROI, ROAS, cost per engagement
- **Attribution weighting:** Multi-touch attribution model specifications

Create a channel attribution matrix showing how each channel contributes across the customer journey stages (awareness → consideration → decision → retention).

### 5. Leading vs. lagging indicators map (300-400 words)

Create a clear distinction between predictive and confirmatory metrics:

**Leading indicators (early warning signals):**
- Website engagement trends
- Content consumption patterns
- Pipeline velocity changes
- Market share of voice shifts
- Audience sentiment movements

**Lagging indicators (results confirmation):**
- Revenue and bookings
- Customer acquisition cost
- Conversion rates
- Market share
- Customer lifetime value

Explain the relationship between leading and lagging indicators and how to use both for proactive decision-making.

### 6. Dashboard structure blueprint (500-600 words)

Design three-tiered dashboard architecture tailored to reporting audience:

**Executive dashboard (strategic view):**
- 6-8 north star metrics
- Progress toward OKRs
- Brand health summary
- Revenue and pipeline impact
- Month-over-month and year-over-year trends

**Marketing management dashboard (tactical view):**
- Channel performance comparison
- Campaign effectiveness
- Budget pacing and ROI
- Message testing results
- Leading indicator alerts

**Specialist dashboard (operational view):**
- Granular channel metrics
- Real-time campaign performance
- A/B test results
- Content performance details
- Technical optimization opportunities

For each dashboard level, specify:
- Key visualizations and chart types
- Data refresh frequency
- Implementation using available tools
- Mobile vs. desktop considerations

### 7. Reporting cadence calendar (300-400 words)

Create a structured reporting schedule based on reporting frequency and audience:

**Daily reporting:**
- Automated snapshots for active campaigns
- Real-time performance alerts
- Who receives: Team operational roles

**Weekly reporting:**
- Channel performance summaries
- Campaign progress updates
- Optimization recommendations
- Who receives: Marketing management

**Monthly reporting:**
- Comprehensive marketing performance review
- OKR progress assessment
- Brand health update
- ROI analysis by channel and campaign
- Who receives: Marketing leadership and relevant stakeholders

**Quarterly reporting:**
- Strategic performance review
- Brand health deep dive
- Multi-touch attribution insights
- Budget reallocation recommendations
- Who receives: Executive team and board

Include report formats, presentation templates, and meeting structures.

### 8. Continuous improvement process (300-400 words)

Establish a framework for measurement evolution:
- **Monthly metric reviews:** Evaluate whether current metrics still align with business goals
- **Quarterly framework audits:** Assess measurement gaps revealed in blind spots
- **Learning agenda:** Prioritized questions to answer through measurement
- **Testing roadmap:** Systematic approach to message and channel testing
- **Tool optimization:** Maximizing value from available tools and identifying gaps
- **Team development:** Building analytical capabilities within team structure

Include a change management process for introducing new metrics or retiring irrelevant ones.

## Output format requirements

- Use clear headers and subheaders for easy navigation
- Include specific examples relevant to the client's context
- Provide calculation formulas for custom metrics
- Create visual descriptions for dashboard layouts (describe what would be shown)
- Use tables to organize complex metric frameworks
- Bold key metrics and important callouts
- Include implementation timelines (quick wins vs. long-term builds)

## Tone and style

- Strategic yet practical
- Data-driven but accessible to non-technical stakeholders
- Action-oriented with clear next steps
- Balanced between sophistication and simplicity
- Reference specific tools from available tools where relevant

## Client context

[Paste all your prepared inputs here]

### Business context
- Business goals: {{businessGoals}}
- Current metrics: {{currentMetrics}}
- Biggest blind spots: {{blindSpots}}

### Operational context
- Available tools: {{toolsAvailable}}
- Team structure: {{teamStructure}}
- Reporting audience: {{reportingAudience}}
- Reporting frequency: {{reportingCadence}}
\`\`\`

---

## After you run it

Turn this framework into your measurement operating system:
- **Implement dashboards** starting with the executive view—get leadership bought in first
- **Set up OKR tracking** in a visible place (Notion, spreadsheet, OKR tool) that the team reviews weekly
- **Configure tools** to collect the metrics you've defined (GA4 goals, CRM reports, attribution models)
- **Establish reporting rituals** - weekly team reviews, monthly leadership reviews, quarterly board prep
- **Train the team** on what metrics matter and how to interpret them
- **Start brand health tracking** even if it's manual surveys at first—trend data is gold

Build the infrastructure:
- **Connect data sources** - integrate CRM, marketing automation, analytics platforms
- **Create report templates** so reporting is consistent and efficient
- **Automate where possible** - scheduled reports, dashboard refreshes, alert triggers
- **Document definitions** - what exactly counts as an MQL? How is pipeline attributed?

Review and evolve:
- **Monthly:** Check if metrics are still answering the right questions
- **Quarterly:** Audit for blind spots—what new questions emerged that you can't answer?
- **Annually:** Comprehensive framework refresh aligned with new business goals

Mature over time:
- **Phase 1 (Months 1-3):** Basic dashboards, manual reporting, foundational OKRs
- **Phase 2 (Months 4-6):** Automated reporting, multi-touch attribution, brand health baseline
- **Phase 3 (Months 7-12):** Sophisticated attribution, predictive analytics, marketing mix modeling

## Examples

[Coming soon—sample performance measurement frameworks from real consulting engagements]
`, visualLogic: `[DATA_SOURCES] -> {AGGREGATION} -> [VISUALIZATION]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L7_Evolution_&_Refinement/20_Performance_Measurement",
        frameworks: ["Tufte's Data-Ink Ratio", "Actionable Metrics", "Traffic Light System"],
        faq: [
            { question: "Which tool should I use?", answer: "Looker, Tableau, HubSpot, or even a well-maintained Spreadsheet. The tool matters less than the data integrity." },
            { question: "What if the data is messy?", answer: "Clean it. Bad data leads to bad decisions. Fix the tracking at the source." }
        ]
    },
    {
        id: "L6.03",
        title: "Quarterly Business Review (QBR)",
        slug: "quarterly-business-review",
        level: "Measurement",
        levelTitle: "Measurement",
        hook: "Reflect on performance and iterate strategy.",
        promptContent: `# Review and Iteration

## What this generates

Your comprehensive review and iteration protocol using Agile retrospective methodology, PDCA cycle (Plan-Do-Check-Act), Kaizen Continuous Improvement, and Lean Startup Build-Measure-Learn principles. You'll get multi-tiered review architecture, review content scope by interval, trigger-based review protocol, stakeholder roles and responsibilities, decision-making framework, version control and documentation system, change communication plan, success metrics for iteration, and annual brand calendar. This transforms brand management from static documents into a living, responsive practice.

## Why you need this

The 16 artifacts you just created will become shelfware without a system to keep them current. Markets shift, competitors move, customer language evolves, and products launch—your brand can't be a "set it and forget it" exercise. This protocol ensures your positioning stays sharp, your messaging stays relevant, and your team stays aligned as your business grows. It's the difference between a brand that ossifies and a brand that scales.

## Before you start

This prompt works best when you have:
- Understanding of how quickly your market changes (fast-moving tech vs. stable industrial)
- History of what's worked and failed in past brand updates (even if informal)
- Clear sense of decision-making structure and who needs to be involved
- All 16 foundational brand artifacts completed (these become the assets you'll iterate)

If you're early-stage, you can build this based on founder decision-making patterns and anticipated growth trajectory. Just be ready to formalize it as your team scales.

## Prepare your inputs

Fill out this form before running the prompt. The more honest you are about organizational dynamics, the more practical your protocol will be.

### Market & product context

**{{marketChangeVelocity}}**  
How rapidly does your industry, competitive landscape, and customer preferences change?  
Examples:  
- "B2B SaaS with new competitors launching monthly, AI disrupting buyer expectations quarterly—very fast-moving"  
- "Manufacturing/industrial B2B with 3-5 year trend cycles, stable competitive set for past decade—slow-moving"  
- "Healthcare tech with regulatory changes annually, but core buyer needs stable—moderate pace"

**{{productLifecycleStage}}**  
Where is your primary product/service in its lifecycle, and what changes are planned?  
Examples:  
- "Mature product with planned enterprise features launching Q2, SMB version launching Q3—active product evolution"  
- "New market entry launching in 6 months, will require separate positioning and messaging"  
- "Stable product, no major changes planned—focus is on market expansion, not product evolution"

### Current state assessment

**{{reviewCadence}}**  
Describe your current brand review practices, if any. How often? Who participates? What format?  
Examples:  
- "Ad-hoc discussions in quarterly business reviews when someone notices messaging is off. No formal process. Marketing Manager raises issues, CEO decides"  
- "Annual planning session where we refresh positioning, then nothing until next year. Too slow, causes drift"  
- "No formal process—founder just updates messaging when they feel like it. Creates confusion"

**{{changeHistory}}**  
Share 2-3 examples of previous brand or messaging changes. What worked well? What challenges did you face? Key lessons learned?  
Examples:  
- "Repositioned from SMB to mid-market in 2023. Worked: Clear executive decision, updated all assets within 2 weeks. Didn't work: Sales team wasn't trained, kept using old pitch for 3 months"  
- "Changed tagline in 2024 after customer feedback. Worked: Simple change, easy to implement. Didn't work: No testing beforehand, new tagline confused prospects"  
- "Haven't made any major changes yet—this will be our first structured brand build"

**{{currentPainPoints}}**  
What are your biggest frustrations with how brand decisions are made or updated today?  
Examples:  
- "Takes 6 months to get CEO approval on anything—by the time we launch, market has moved"  
- "Different teams (sales, marketing, CS) using completely inconsistent messaging—no single source of truth"  
- "We update guidelines but nobody follows them—no enforcement or accountability"  
- "Brand decisions are made in a vacuum without data or customer input"

### Organizational structure

**{{decisionStructure}}**  
How are significant decisions typically made in your organization?  
Examples:  
- "CEO has final say on all brand matters—nothing ships without their approval. Slows us down but ensures consistency"  
- "Collaborative, data-driven consensus model—marketing presents recommendations, leadership team discusses, CMO decides"  
- "Marketing VP has full autonomy within budget—CEO only reviews quarterly results, not individual decisions"

**{{teamAvailability}}**  
What is the realistic availability of key stakeholders for regular brand review meetings? Who are the essential participants?  
Examples:  
- "CMO available monthly (owns process), Product Director quarterly, Sales VP quarterly, CEO quarterly for major decisions only"  
- "Small team—founder + marketing manager can meet weekly if needed, but prefer bi-weekly"  
- "Marketing team of 5 can dedicate Fridays to brand work, but executives only available quarterly"

**{{companyStage}}**  
Company size, structure, and geographic distribution?  
Examples:  
- "15-person single-office startup, everyone in same Slack workspace, fast decision-making"  
- "200-person company across US and UK offices, decentralized marketing teams by region, need coordination"  
- "50-person remote-first company, distributed globally, all async communication"

**{{brandMaturity}}**  
How established is your brand?  
Examples:  
- "Pre-launch startup defining initial brand from scratch—no legacy to manage"  
- "3-year-old growth-stage company that's never formalized brand—lots of inconsistency to clean up"  
- "10-year-old established brand needing refresh to stay relevant—have to balance legacy equity with evolution"

**Pro tip:** The "past change history" and "current pain points" sections reveal exactly what to design for. If past changes failed because sales wasn't trained, your protocol needs robust change communication. If decisions take forever, you need clear decision thresholds and authority levels.

## The prompt

Copy everything below this line and paste it into your LLM. Fill in your prepared inputs where indicated.

---
\`\`\`
You are a strategic brand management expert specializing in creating adaptive, sustainable review and iteration systems. Using Agile retrospective methodology, the PDCA cycle (Plan-Do-Check-Act), Kaizen Continuous Improvement, and Lean Startup Build-Measure-Learn principles, you will develop a comprehensive Review & Iteration Protocol that transforms brand management from a static document into a living, responsive practice.

## Your task

Create a detailed, actionable Evolution & Refinement Protocol (3000-3500 words) that establishes how the client will continuously review, measure, and refine their brand messaging, positioning, and communication strategies over time.

## Framework integration

- **Agile Retrospectives:** Structure regular reflection points with "What worked?", "What didn't?", "What should we try?"
- **PDCA Cycle:** Plan changes, Do implementation, Check results, Act on learnings
- **Kaizen:** Emphasize incremental improvements and collaborative feedback loops
- **Build-Measure-Learn:** Enable rapid testing of brand assumptions with market feedback

## Required output components

### 1. Review architecture (700-800 words)

Design a multi-tiered review system:
- **Continuous monitoring:** Real-time metrics and signals that inform ongoing brand health
- **Sprint reviews (if applicable):** Monthly pulse checks on active campaigns or launches
- **Quarterly business reviews:** Comprehensive brand performance assessment
- **Annual strategic reviews:** Deep-dive brand evolution planning

For each tier, specify:
- Exact timing and duration
- Participants and roles
- Agenda structure
- Decision-making authority
- Documentation requirements

Justify the recommended cadence based on market change velocity and product lifecycle stage.

### 2. Review content scope (600-700 words)

Define precisely what gets reviewed at each interval:
- **Brand health metrics:** Awareness, perception, consideration, preference, loyalty indicators
- **Messaging performance:** Which messages/channels/campaigns to evaluate
- **Competitive positioning:** When and how to reassess competitive landscape
- **Customer feedback integration:** VOC data, NPS trends, support themes
- **Market signal analysis:** Industry trends, regulatory changes, cultural shifts

Create a matrix showing review frequency for each element based on current pain points and brand maturity level.

### 3. Trigger-based review protocol (500-600 words)

Establish specific conditions that require immediate off-cycle brand reviews:
- **Performance triggers:** Metric thresholds that signal problems
- **Market triggers:** Competitive moves, industry disruption
- **Internal triggers:** Leadership changes, M&A, product pivots
- **External triggers:** PR crises, regulatory changes, cultural events

For each trigger type:
- Define clear thresholds
- Specify response timeline
- Identify review team composition
- Outline expedited decision process

Calibrate sensitivity based on market change velocity.

### 4. Stakeholder roles & responsibilities (400-500 words)

Map the review ecosystem considering decision-making structure and organizational size:
- **Review facilitator:** Who runs the process
- **Core review team:** Regular participants (marketing, product, sales, customer success)
- **Executive sponsors:** Decision-making authority and escalation path
- **Extended stakeholders:** When to involve finance, HR, operations, etc.
- **External advisors:** Role of agencies, consultants, or board members

Include RACI matrix for key decisions (Responsible, Accountable, Consulted, Informed).

### 5. Decision-making framework (500-600 words)

Create a structured approach for evaluating and implementing changes:
- **Change assessment criteria:** Impact vs. effort matrix, brand consistency score, resource requirements
- **Decision thresholds:** What level of change requires executive approval vs. team autonomy
- **Testing protocol:** When/how to pilot changes before full rollout (A/B tests, soft launches)
- **Go/No-go gates:** Clear criteria for proceeding with brand modifications
- **Escalation path:** When consensus fails, how decisions get made

Align with decision-making structure while introducing appropriate governance based on past change history.

### 6. Version control & documentation system (400-500 words)

Establish how brand assets and guidelines are managed:
- **Versioning convention:** Naming and numbering system for brand materials
- **Central repository:** Where master brand assets live (DAM, shared drives, etc.)
- **Change log:** How modifications are tracked with rationale and approvals
- **Archive protocol:** Retaining historical versions for reference
- **Access controls:** Who can view, edit, and approve changes
- **Sunset process:** Deprecating outdated materials

Address pain points from current pain points regarding asset management.

### 7. Change communication plan (400-500 words)

Design how brand updates are socialized:

**Internal communication:**
- Announcement channels and timing
- Training/enablement for teams using brand materials
- Feedback collection mechanisms

**External communication:**
- When customers/partners need notification
- Press/PR considerations for significant changes
- Website and collateral update coordination

Include templates and timelines aligned with organizational size.

### 8. Success metrics for iteration (300-400 words)

Define how to measure the review process itself:
- Review meeting effectiveness (participation, decisions made, action item completion)
- Time from insight to implementation
- Brand consistency scores across touchpoints
- Team satisfaction with review process
- Business impact of implemented changes

Create dashboard recommendations tied to existing review cadence improvements.

### 9. Annual brand calendar (200-300 words)

Provide a 12-month view integrating:
- Scheduled review sessions
- Typical business cycle events (planning, budgeting, product launches)
- Industry events/seasonality relevant to market change velocity
- Known strategic initiatives from product lifecycle stage

Visualize as a calendar with review milestones and likely trigger points.

## Tone & style requirements

- **Practical and implementable:** Avoid theoretical frameworks without clear application
- **Customized to context:** Constantly reference client's specific variables
- **Balance structure with flexibility:** Provide rigor without bureaucracy
- **Anticipate resistance:** Address common objections based on current pain points
- **Enable action:** Include next steps, templates, and quick-start guidance

## Deliverable structure

- Executive summary (150-200 words): Why continuous brand evolution matters for this client
- Numbered sections following the 9 components above
- Implementation roadmap (200-250 words): 30-60-90 day plan to establish the review system
- Appendices:
  - Sample review meeting agenda
  - Decision-making template
  - Change request form
  - Communication announcement template

## Client context

[Paste all your prepared inputs here]

### Market & product context
- Market change velocity: {{marketChangeVelocity}}
- Product lifecycle stage: {{productLifecycleStage}}

### Current state assessment
- Existing review cadence: {{reviewCadence}}
- Past change history: {{changeHistory}}
- Current pain points: {{currentPainPoints}}

### Organizational structure
- Decision-making structure: {{decisionStructure}}
- Team availability: {{teamAvailability}}
- Organizational size: {{companyStage}}
- Brand maturity level: {{brandMaturity}}
\`\`\`

---

## After you run it

Implement this protocol immediately—don't let it become another document nobody uses:
- **Schedule the first review** within 30 days using the protocol structure
- **Set up the central repository** for brand assets with version control
- **Train stakeholders** on their roles, responsibilities, and decision authority
- **Create calendar holds** for all recurring reviews (monthly, quarterly, annual)
- **Document the first review** using the templates provided—establish the pattern
- **Measure the process** from day one—track decisions made, time to implementation, consistency improvements

Start simple and scale:
- **Month 1:** Establish core review team, schedule first quarterly review, set up asset repository
- **Month 2:** Run first structured review, document decisions, implement quick wins
- **Month 3:** Refine based on what worked/didn't, formalize trigger protocols, train extended team

Build the culture:
- **Make reviews non-negotiable** - They're as important as sales calls or product development
- **Celebrate improvements** - When iteration leads to better results, acknowledge it
- **Empower the team** - Give clear decision thresholds so people can move fast
- **Stay disciplined** - Don't skip reviews when busy; that's when you need them most

Evolve the protocol itself:
- **After 3 reviews:** Survey participants—what's working, what's bureaucratic?
- **After 6 months:** Adjust cadence if too frequent or too infrequent
- **After 1 year:** Major protocol refresh based on organizational growth and market changes

Your brand is now a system, not a document. Congratulations—you just built a Zero to GTM Motion Playbook that actually scales.

## Examples

[Coming soon—sample evolution and refinement protocols from real consulting engagements]
`, visualLogic: `[REVIEW] -> {LEARNING} -> [PLANNING]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L7_Evolution_&_Refinement/21_Review_&_Iteration",
        frameworks: ["Start-Stop-Continue", "SWOT Analysis", "Retrospective Prime Directive"],
        faq: [
            { question: "Who attends the QBR?", answer: "Marketing team, Sales leadership, CEO/Founder." },
            { question: "Is this a blame session?", answer: "No. It's a learning session. 'Blameless Post-Mortem' is the golden rule." }
        ]
    }
];
