# ## 6 Claude GTM Strategy Prompts

# ## 6 Claude GTM Strategy Prompts

**These are designed to extract elite-level GTM strategy outputs. Use these inside Claude Projects with context memory turned on.**

---

## ### PROMPT 1 – Deep Market & Competitive Intelligence Engine

You are a tier-1 GTM strategist with 15+ years building $100M+ B2B growth engines.

**Your task:** Produce a complete competitive and market intelligence briefing for the company described below.

**COMPANY INPUT:** [Insert company name, website, product description, target audience, pricing, and positioning]

**OBJECTIVE:** Create a foundational GTM Intelligence document that will be used to inform ICP modeling, targeting logic, and messaging strategy.

**INSTRUCTIONS:**

1. **Analyze the company's positioning:**
* Category they claim
* Real category they operate in
* Differentiation angle
* Implied ICP
* Implied price sensitivity

2. **Identify direct and indirect competitors:**
* Direct (same category)
* Adjacent (solving same pain differently)
* Substitute solutions (status quo behavior)

**For each competitor:**

* Target segment
* Pricing tier
* Core value proposition
* Distribution strategy
* Acquisition channels
* Strengths
* Weaknesses
* Messaging gaps

3. **Identify market narrative patterns:**
* Common positioning tropes
* Repeated promises
* Overused claims
* Underserved narratives
* Emotional hooks currently winning

4. **Identify white space opportunities:**
* Under-served segments
* Underserved use cases
* Emerging buyer triggers
* Category reframing opportunities

5. **Identify strategic risks:**
* Commoditization threats
* AI displacement risk
* Platform dependency risk
* Regulatory exposure

**OUTPUT FORMAT:**

* Executive Summary (max 300 words)
* Competitive Landscape Table
* Market Narrative Analysis
* White Space Opportunities
* Strategic Risk Assessment
* 3 Strategic GTM Hypotheses to Test

**Constraints:**

* No generic advice
* No surface-level commentary
* Make assumptions explicit
* If data is missing, state "Assumption:" before proceeding
* Be concrete, not theoretical

---

## ### PROMPT 2 – TAM, SAM, Segment Prioritization Model

You are a growth economist and GTM architect.

**OBJECTIVE:** Using the context from previous analysis, build a segmented market model. Map TAM -> SAM -> SOM with strategic prioritization logic.

**INSTRUCTIONS:**

1. **Identify all plausible industry segments.**
2. **Break into sub-industries.**
3. **Estimate:**
* Market size (qualitative if quantitative unavailable)
* Growth rate direction
* Budget allocation maturity
* Buying sophistication
* Competitive density


4. **Score each segment 1–10 across:**
* Urgency of problem
* Budget availability
* Accessibility via outbound
* Sales cycle complexity
* Differentiation potential
* LTV potential


5. **Rank segments by weighted opportunity score.**
6. **For Top 3 segments:**
* Why they win
* Why they might fail
* Entry wedge strategy
* Expected CAC profile



**OUTPUT FORMAT:**

* Segment Table (scored)
* Ranked Priority List
* Detailed Breakdown for Top 3
* Recommended Beachhead Strategy
* Recommended Deprioritized Segments

**Constraints:**

* Show scoring logic
* Avoid generic "mid-market SaaS"
* Force specificity
* If unclear, create defensible assumptions

---

## ### PROMPT 3 – ICP + Buying Committee Architecture

You are a behavioral GTM psychologist and enterprise sales strategist.

**OBJECTIVE:** Using the prioritized segments above, build a complete ICP and buying committee architecture. Define WHO to target and HOW they buy.

**INSTRUCTIONS:**
**For each Top 3 segment:**

1. **Define Ideal Customer Profile:**
* Revenue range
* Team size
* Tech stack maturity
* Operational complexity
* Buying trigger events


2. **Map Buying Committee:**
* Economic buyer
* Champion
* Influencer
* Technical evaluator
* Blocker



**For each persona:**

* Primary KPIs
* Core fears
* Career incentives
* Political risk
* Emotional drivers
* Objection patterns
* Language they use

3. **Define Buying Triggers:**
* Hiring signals
* Funding events
* Product launches
* Regulatory shifts
* Competitive pressure


4. **Map Value Alignment:**
* ROI model
* Cost of inaction
* Internal narrative needed for approval



**OUTPUT FORMAT:**

* ICP Table
* Buying Committee Table
* Messaging Leverage Points
* High-Risk Objections + Counter Angles

**Constraints:**

* Avoid vague persona fluff
* No generic motivations
* Focus on B2B power dynamics

---

## ### PROMPT 4 – Data Acquisition & Signal Architecture

You are a data acquisition architect for high-performance outbound GTM teams.

**OBJECTIVE:** Design the most effective sourcing and enrichment architecture to reach prioritized ICPs.

**INSTRUCTIONS:**

1. **Identify best data sources:**
* Primary databases
* Niche directories
* Industry associations
* Conference attendee lists
* Public datasets
* Scraping opportunities


2. **Identify enrichment stack:**
* Email verification
* Tech stack detection
* Hiring signals
* Funding signals
* Web tracking tools


3. **Define targeting logic:**
* Boolean keyword strings
* Title combinations
* Industry exclusions
* Tech stack filters
* Company size filters


4. **Build Signal Framework:**
* High intent signals
* Medium signals
* Weak signals


5. **Build Workflow:**
* Lead sourcing
* Enrichment
* Segmentation
* Routing
* CRM tagging



**OUTPUT FORMAT:**

* Data Source Table
* Enrichment Stack Recommendation
* Targeting Boolean Strings
* Signal Hierarchy Table
* Workflow Architecture Diagram (text-based)

**Constraints:**

* No "just use Apollo"
* Specific tools
* Concrete examples
* No fluff

---

## ### PROMPT 5 – Category Narrative & Offer Engineering

You are a category designer and offer strategist.

**OBJECTIVE:** Design positioning and offers that dominate the identified segment.

**INSTRUCTIONS:**

1. **Define:**
* Current dominant narrative
* Emerging narrative
* "Old way vs new way" framing


2. **Create:**
* 3 Category angles
* 3 Differentiation angles
* 3 Value metrics


3. **Engineer Offers:**
* Entry offer
* Core offer
* Premium expansion



**For each:**

* Risk reversal
* Pricing logic
* Outcome framing
* Proof insertion

4. **Build Conversion Hooks:**
* Pain-based
* Status-based
* Risk-based
* Efficiency-based


5. **Simulate competitive reaction:**
* How would incumbents respond?
* How to defend position?



**OUTPUT FORMAT:**

* Narrative Framework
* Offer Stack Table
* Positioning Statements
* Conversion Hooks List
* Defensive Strategy Notes

**Constraints:**

* Avoid buzzwords
* Make positioning sharp
* Be polarizing where strategic

---

## ### PROMPT 6 – Multi-Channel Messaging & Sales Engine

You are a direct-response B2B messaging architect.

**OBJECTIVE:** Using all prior outputs, generate a complete outbound messaging engine. Create high-conversion outreach across multiple channels.

**INSTRUCTIONS:**
**For Top 2 segments:**

1. **Email:**
* 3 short variants (<40 words)
* 2 medium variants (~150 words)
* 1 long consultative version (~250 words)


2. **LinkedIn:**
* 3 connection request notes
* 3 first-touch DMs
* 2 follow-ups


3. **Cold call script:**
* Opener
* Pattern interrupt
* Discovery pivot
* Objection handling
* Close for meeting


4. **Objection Bank:**
* "No budget"
* "Already have a solution"
* "Not priority"
* "Send info"


5. **Personalization Layer:**
* How to reference trigger signals
* How to insert micro-research



**OUTPUT FORMAT:**

* Channel-separated sections
* Label by segment
* Clear copy blocks
* No generic filler lines

**Constraints:**

* Avoid clichés
* Avoid "just checking in"
* Every message must have:
* Clear angle
* Clear tension
* Clear CTA