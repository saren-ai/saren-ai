
export interface FrameworkPrompt {
    id: string;
    title: string;
    level: string;
    levelTitle: string;
    hook: string;
    promptContent: string;
    visualLogic: string;
    size: 'standard' | 'wide' | 'tall' | 'featured';
    githubUrl: string;
}

export const FRAMEWORK_PROMPTS: FrameworkPrompt[] = [
    // LEVEL 1: FOUNDATIONAL ELEMENTS
    {
        id: "01",
        title: "Target Customer Profiles",
        level: "L1",
        levelTitle: "Foundational Elements",
        hook: "Define who you're selling to (and who you're ignoring).",
        promptContent: `## Target Customer Profile (ICP) Generation

**Role:** You are a Senior Product Marketing Manager specializing in B2B segmentation.

**Objective:** Create a detailed Ideal Customer Profile (ICP) for [PRODUCT/SERVICE].

**Input:**
- Product: [INSERT PRODUCT DESCRIPTION]
- Current Customers: [INSERT CUSTOMER LIST/TYPES]

**Instructions:**
1. define the firmographic parameters (Size, Revenue, Industry).
2. define the technographic requirements.
3. define the key buyer personas and their specific pain points.
4. identify the "trigger events" that cause them to buy.

**Output Format:**
- Summary Table
- Detailed Narrative for each Persona`,
        visualLogic: `[MARKET_DATA] -> {SEGMENTATION_ALGO} -> [ICP_DEFINITION]`,
        size: "featured",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L1_Foundational_Elements/01_Target_Customer_Profiles"
    },
    {
        id: "02",
        title: "Market & Competitive Analysis",
        level: "L1",
        levelTitle: "Foundational Elements",
        hook: "Analyze where you fit in the broader market landscape.",
        promptContent: `## Competitive Landscape Analysis

**Role:** You are a Market Intelligence Analyst.

**Objective:** Analyze the competitive landscape for [COMPANY] against [COMPETITORS].

**Input:**
- My Company: [INSERT URL/DESC]
- Competitors: [LIST 3-5 COMPETITORS]

**Instructions:**
1. standard SWOT analysis for each.
2. feature gap analysis.
3. distinct marketing positioning analysis (how do they talk about themselves?).
4. pricing strategy comparison.

**Output:**
- Strategic Recommendations for Differentiation`,
        visualLogic: `[COMPETITORS] -> {GAP_ANALYSIS} -> [OPPORTUNITY_MAP]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L1_Foundational_Elements/02_Market_&_Competitive_Analysis"
    },

    // LEVEL 2: CORE IDENTITY
    {
        id: "03",
        title: "Mission, Vision, Values",
        level: "L2",
        levelTitle: "Core Identity",
        hook: "Establish why you exist beyond generating revenue.",
        promptContent: `## Mission, Vision, & Values Development

**Role:** Brand Strategist.

**Objective:** Articulate the core identity of the brand.

**Input:**
- Origin Story: [INSERT STORY]
- Future Goals: [INSERT GOALS]

**Instructions:**
1. draft a Mission Statement (What we do today).
2. draft a Vision Statement (The world we are building).
3. define 5 Core Values with behavioral descriptions.

**Output:**
- The Core Identity Document`,
        visualLogic: `[ORIGIN_STORY] -> {VALUES_EXTRACTION} -> [CORE_IDENTITY]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L2_Core_Identity/03_Mission_Vision_Values"
    },
    {
        id: "04",
        title: "Brand Voice & Tone",
        level: "L2",
        levelTitle: "Core Identity",
        hook: "Define how your brand sounds when it shows up in the world.",
        promptContent: `## Brand Voice Definition

**Role:** Creative Director / Copy Chief.

**Objective:** Define the verbal identity of the brand.

**Input:**
- Adjectives: [LIST ADJECTIVES e.g. bold, technical, empathetic]
- Anti-Adjectives: [LIST WHAT WE ARE NOT]

**Instructions:**
1. define the primary Voice attributes.
2. create a Tone of Voice matrix (how we sound in different contexts).
3. provide "We Say / We Don't Say" examples.

**Output:**
- Brand Voice Guidelines`,
        visualLogic: `[ADJECTIVES] + [CONTEXT] -> {TONE_CALIBRATION} -> [VOICE_GUIDE]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L2_Core_Identity/04_Brand_Voice_&_Tone"
    },
    {
        id: "05",
        title: "Brand Personality & Archetype",
        level: "L2",
        levelTitle: "Core Identity",
        hook: "Develop the specific 'vibe' and persona your brand projects.",
        promptContent: `## Brand Archetype Identification

**Role:** Brand Psychologist.

**Objective:** Align the brand with a Jungian archetype.

**Input:**
- Brand Values: [INSERT VALUES]
- Customer Desires: [INSERT DESIRES]

**Instructions:**
1. identify primary and secondary archetypes (e.g., The Ruler, The Magician).
2. describe the personality traits.
3. describe the relationship with the customer.

**Output:**
- Personality Profile`,
        visualLogic: `[VALUES] -> {ARCHETYPE_MATCHING} -> [BRAND_PERSONA]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L2_Core_Identity/05_Brand_Personality_&_Archetype"
    },

    // LEVEL 3: CORE MESSAGE
    {
        id: "06",
        title: "Unique Value Propositions",
        level: "L3",
        levelTitle: "Core Message",
        hook: "Distill your core competitive advantages into sharp UVPs.",
        promptContent: `## UVP Development

**Role:** Product Positioning Expert.

**Objective:** Create crystal clear Unique Value Propositions.

**Input:**
- Feature List: [INSERT FEATURES]
- Pain Points: [INSERT PAIN POINTS]

**Instructions:**
1. map features to benefits.
2. identify the "Onlyness" factor (what only we can do).
3. draft 3 distinct UVPs (Technical, Economic, emotional).

**Output:**
- UVP Matrix`,
        visualLogic: `[FEATURES] + [PAIN_POINTS] -> {BENEFIT_MAPPING} -> [UVP_MATRIX]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L3_Core_Message/06_Unique_Value_Propositions"
    },
    {
        id: "07",
        title: "Brand Positioning Statement",
        level: "L3",
        levelTitle: "Core Message",
        hook: "Craft a definitive statement of your position in the category.",
        promptContent: `## Positioning Statement Creation

**Role:** Strategic Planner.

**Objective:** Write the canonical positioning statement.

**Input:**
- Target Audience: [INSERT]
- Category: [INSERT]
- Benefit: [INSERT]
- Proof: [INSERT]

**Instructions:**
1. use the standard template: "For [Target], [Brand] is the [Category] that [Benefit] because [Proof]."
2. create alternatives for different stakeholders.

**Output:**
- Core Positioning Statement`,
        visualLogic: `[AUDIENCE] + [CATEGORY] + [BENEFIT] -> {SYNTHESIS} -> [POSITIONING]`,
        size: "featured",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L3_Core_Message/07_Brand_Positioning_Statement"
    },
    {
        id: "08",
        title: "Brand Promise",
        level: "L3",
        levelTitle: "Core Message",
        hook: "Define the fundamental commitment you make to every customer.",
        promptContent: `## Brand Promise Formulation

**Role:** CX Strategist.

**Objective:** Define the non-negotiable promise used to align CX.

**Input:**
- UVPs: [INSERT UVPs]
- Mission: [INSERT MISSION]

**Instructions:**
1. draft a single sentence promise that is measurable.
2. define how this promise is delivered at each touchpoint.

**Output:**
- The Brand Promise`,
        visualLogic: `[UVPs] + [MISSION] -> {COMMITMENT_LOGIC} -> [BRAND_PROMISE]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L3_Core_Message/08_Brand_Promise"
    },

    // LEVEL 4: MESSAGE ARTICULATION
    {
        id: "09",
        title: "Core Messaging Pillars",
        level: "L4",
        levelTitle: "Message Articulation",
        hook: "Build the strategic pillars that support all your communication.",
        promptContent: `## Messaging Pillars Structure

**Role:** Content Strategist.

**Objective:** Define 3-4 thematic pillars for content.

**Input:**
- Strategic Goals: [INSERT GOALS]

**Instructions:**
1. identify 3-4 key themes that support the positioning.
2. define the "Big Idea" for each pillar.
3. list proof points for each.

**Output:**
- Messaging House Diagram`,
        visualLogic: `[STRATEGY] -> {THEME_CLUSTERING} -> [PILLARS]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/09_Core_Messaging_Pillars"
    },
    {
        id: "10",
        title: "Message Map",
        level: "L4",
        levelTitle: "Message Articulation",
        hook: "Create a matrix of messages tailored to different stakeholders.",
        promptContent: `## Stakeholder Message Mapping

**Role:** Communications Director.

**Objective:** Tailor the core message for specific personas.

**Input:**
- Personas: [LIST PERSONAS]
- Value Props: [LIST UVPs]

**Instructions:**
1. create a matrix of Persona x Value Prop.
2. write the specific headline and supporting copy for each intersection.

**Output:**
- Comprehensive Message Map`,
        visualLogic: `[PERSONAS] x [UVPs] -> {MATRIX_GENERATION} -> [MESSAGE_MAP]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/10_Message_Map"
    },
    {
        id: "11",
        title: "Elevator Pitch & Boilerplate",
        level: "L4",
        levelTitle: "Message Articulation",
        hook: "Hard-code your 30-second pitch and company 'About' text.",
        promptContent: `## Pitch & Boilerplate Writing

**Role:** PR Specialist.

**Objective:** Create standard descriptions of the company.

**Input:**
- Positioning: [INSERT]

**Instructions:**
1. write a 25-word, 50-word, and 100-word boilerplate.
2. write a 30-second spoken elevator pitch.

**Output:**
- Standard Company Descriptions`,
        visualLogic: `[POSITIONING] -> {LENGTH_CONSTRAINT} -> [BOILERPLATES]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/11_Elevator_Pitch_&_Boilerplate"
    },
    {
        id: "12",
        title: "Example Communications",
        level: "L4",
        levelTitle: "Message Articulation",
        hook: "Generate sample copy to illustrate the brand voice in action.",
        promptContent: `## Sample Copy Generation

**Role:** Copywriter.

**Objective:** Show, don't just tell, the brand voice.

**Input:**
- Brand Voice Guide: [INSERT]

**Instructions:**
1. rewrite a standard generic email in the new brand voice.
2. write a sample LinkedIn post.
3. write a sample website headline.

**Output:**
- Brand Voice Examples`,
        visualLogic: `[GENERIC_COPY] + [VOICE_GUIDE] -> {REWRITING} -> [ON_BRAND_COPY]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/12_Example_Communications"
    },
    {
        id: "13",
        title: "Taglines & Slogans",
        level: "L4",
        levelTitle: "Message Articulation",
        hook: "Develop catchy, memorable hooks for headers and ads.",
        promptContent: `## Creative Tagline Exploration

**Role:** Creative Copywriter.

**Objective:** Brainstorm memorable hooks.

**Input:**
- UVPs: [INSERT]

**Instructions:**
1. generate 20 tagline options.
2. categorize them (Descriptive, Aspirational, Provocative).
3. select top 3 recommendations.

**Output:**
- Tagline Options`,
        visualLogic: `[UVPs] -> {CREATIVE_ITERATION} -> [TAGLINES]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L4_Message_Articulation/13_Taglines_&_Slogans"
    },

    // LEVEL 5: SUPPORTING CONTEXT
    {
        id: "14",
        title: "Industry Context",
        level: "L5",
        levelTitle: "Supporting Context",
        hook: "Flesh out the specific industry nuances your product addresses.",
        promptContent: `## Industry Analysis & Trends

**Role:** Industry Researcher.

**Objective:** Contextualize the offering within major industry shifts.

**Input:**
- Industry: [INSERT INDUSTRY]

**Instructions:**
1. identify top 3 macro trends affecting the industry.
2. explain how our product aligns with or solves for these trends.

**Output:**
- Industry Context Brief`,
        visualLogic: `[MACRO_TRENDS] + [PRODUCT] -> {ALIGNMENT} -> [CONTEXT_BRIEF]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L5_Supporting_Context/14_Industry_Context"
    },
    {
        id: "15",
        title: "Sales Methodology",
        level: "L5",
        levelTitle: "Supporting Context",
        hook: "Align your messaging with your specific sales approach (e.g. Challenger).",
        promptContent: `## Sales Messaging Alignment

**Role:** Sales Enablement Manager.

**Objective:** Translate marketing messages for sales conversations.

**Input:**
- Validated Methodology: [e.g. MEDDIC, Challenger, Sandler]

**Instructions:**
1. map marketing pillars to the sales methodology stages.
2. create discovery questions based on the UVPs.

**Output:**
- Sales Playbook Chapter`,
        visualLogic: `[MARKETING_MSG] + [METHODOLOGY] -> {TRANSLATION} -> [SALES_SCRIPT]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L5_Supporting_Context/15_Sales_Methodology"
    },
    {
        id: "16",
        title: "Product-Service Catalog",
        level: "L5",
        levelTitle: "Supporting Context",
        hook: "Detail your offerings in a way that maps back to your UVPs.",
        promptContent: `## Product Catalog Structuring

**Role:** Productmarketer.

**Objective:** Organize the portfolio clearly.

**Input:**
- SKU list/Services: [INSERT]

**Instructions:**
1. categorize offerings logically.
2. write benefit-focused descriptions for each category.
3. link each offering back to a specific persona pain point.

**Output:**
- Portfolio Map`,
        visualLogic: `[SKUs] -> {CATEGORIZATION} -> [PORTFOLIO_MAP]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L5_Supporting_Context/16_Product-Service_Catalog"
    },

    // LEVEL 6: ACTIVATION & GOVERNANCE
    {
        id: "17",
        title: "Brand Guidelines Master",
        level: "L6",
        levelTitle: "Activation & Governance",
        hook: "Create the 'Source of Truth' for all brand-related decisions.",
        promptContent: `## Brand Guidelines Compilation

**Role:** Brand Manager.

**Objective:** Assemble the master document.

**Input:**
- All previous outputs (Voice, Identity, Visuals).

**Instructions:**
1. structured outline for a Brand Book.
2. introduction and "How to use this book" section.
3. governance rules (who approves what?).

**Output:**
- Brand Book Structure`,
        visualLogic: `[ALL_ASSETS] -> {COMPILATION} -> [BRAND_BOOK]`,
        size: "wide",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/17_Brand_Guidelines_Master"
    },
    {
        id: "18",
        title: "Communication Strategy",
        level: "L6",
        levelTitle: "Activation & Governance",
        hook: "Plan how these messages deploy across your marketing channels.",
        promptContent: `## Channel Strategy

**Role:** VP of Marketing.

**Objective:** Plan the distribution of the brand message.

**Input:**
- Channels: [Email, Social, Ads, Events]

**Instructions:**
1. define the role of each channel.
2. adapt the core message for each channel's constraints.
3. determine frequency and cadence.

**Output:**
- Integrated Comm Plan`,
        visualLogic: `[CHANNELS] + [MESSAGE] -> {DISTRIBUTION_PLAN} -> [COMM_STRATEGY]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/18_Communication_Strategy"
    },
    {
        id: "19",
        title: "Training & Enablement",
        level: "L6",
        levelTitle: "Activation & Governance",
        hook: "Onboard your team to use the framework effectively.",
        promptContent: `## Internal Enablement Plan

**Role:** L&D Specialist.

**Objective:** Teach the team to use the new brand.

**Input:**
- Brand Guide: [INSERT]

**Instructions:**
1. design a 1-hour workshop agenda.
2. create a cheat sheet for employees.
3. design a quiz to test understanding.

**Output:**
- Rollout Plan`,
        visualLogic: `[BRAND_GUIDE] -> {PEDAGOGY} -> [TRAINING_MATERIALS]`,
        size: "tall",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L6_Activation_&_Governance/19_Training_&_Enablement"
    },

    // LEVEL 7: EVOLUTION & REFINEMENT
    {
        id: "20",
        title: "Performance Measurement",
        level: "L7",
        levelTitle: "Evolution & Refinement",
        hook: "Set up the KPIs to track how your messaging is performing.",
        promptContent: `## Brand Performance KPIs

**Role:** Marketing Ops/Data Analyst.

**Objective:** Measure brand health.

**Input:**
- Goals: [INSERT]

**Instructions:**
1. define qualitative metrics (sentiment, awareness).
2. define quantitative metrics (traffic, conversion).
3. set up a dashboard structure.

**Output:**
- Measurement Framework`,
        visualLogic: `[GOALS] -> {METRIC_DEFINITION} -> [KPI_DASHBOARD]`,
        size: "featured",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L7_Evolution_&_Refinement/20_Performance_Measurement"
    },
    {
        id: "21",
        title: "Review & Iteration",
        level: "L7",
        levelTitle: "Evolution & Refinement",
        hook: "Schedule the regular audits and updates for your framework.",
        promptContent: `## Governance Calander

**Role:** CMO.

**Objective:** Ensure the brand stays relevant.

**Instructions:**
1. schedule quarterly reviews of market changes.
2. schedule annual brand audit.
3. define the process for updating the source of truth.

**Output:**
- Governance Calendar`,
        visualLogic: `[CALENDAR] + [AUDIT_CYCLES] -> {ITERATION_LOOP} -> [GOVERNANCE]`,
        size: "standard",
        githubUrl: "https://github.com/saren-ai/b2b-marketing-framework/blob/main/L7_Evolution_&_Refinement/21_Review_&_Iteration"
    }
];
