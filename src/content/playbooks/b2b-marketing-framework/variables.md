# B2B Marketing Framework - Variables Reference

This document contains all variables used across the 21 prompt templates in this framework. Fill in these values once, then reference them when running any prompt.

---

## How to use this file

1. Fill in the values for each variable below
2. When running a prompt, copy the relevant variables into the input section
3. Variables are formatted as `{{variableName}}` in the prompts

---

## Company fundamentals

```yaml
companyName: ""
# Your company name

companyUrl: ""
# Company website URL

companyDescription: ""
# 2-3 sentences on what you do. Focus on the problem you solve.

companyBackground: ""
# Context about company history and trajectory

originStory: ""
# How and why the company was founded

founderFrustration: ""
# The problem that motivated founding the company

yearFounded: ""
# Year company was established

keyMilestones: []
# Major achievements, funding rounds, product launches

teamStructure: ""
# Current team composition and size

companyStage: ""
# Growth stage: early, growth, mature (e.g., "Series A, 50 employees")
```

## Product & service

```yaml
productDescription: ""
# What you're selling and what problems it solves

productList: []
# All products/services offered

keyFeatures: []
# Main product/service features

technicalSpecs: ""
# Technical details, integrations, requirements

techStack: ""
# Tech your product is built on or integrates with

useCases: []
# How customers actually use your product

category: ""
# Market category you compete in

categoryPosition: ""
# Where you sit in the category

categoryName: ""
# What buyers call this category

categoryContext: ""
# Industry context for your category

productLifecycleStage: ""
# Where your product is in its lifecycle

productStrategy: ""
# Current product direction and roadmap context
```

## Pricing & business model

```yaml
pricingModel: ""
# Pricing structure (helps identify buyer authority levels)

businessModel: ""
# Business model (SaaS, services, marketplace, etc.)

acvRange: ""
# Typical contract value / average deal size

growthMetrics: ""
# Revenue growth, customer growth, etc.

growthGoals: ""
# Where you're trying to get to
```

## Target customers

```yaml
icpCompanySize: ""
# Employee count and/or revenue range of ideal customers

icpIndustries: []
# Verticals or sectors you serve best

geo: ""
# Where your customers are located

geoCulturalContext: ""
# Cultural considerations by region

icpDescription: ""
# Description of your perfect customer

targetAudience: ""
# Who you're talking to

targetAudiences: []
# Multiple audience segments

buyerPersonas: []
# Specific buyer personas with titles and roles

audienceDetails: ""
# Deep audience context
```

## Customer intelligence

```yaml
existingCustomerData: ""
# Names, titles, companies of best customers

notableClients: []
# Logos/names you can reference

customerQuotes: ""
# Verbatim language from customers

customerPhrase: ""
# How customers describe you

testimonials: []
# Formal testimonials

customerFeedback: ""
# General feedback patterns

customerPraise: ""
# What customers love about you

customerComplaints: ""
# What customers wish was different

successMetrics: ""
# How customers measure success with you

customerOutcomes: []
# Results customers achieve
```

## Pain points & problems

```yaml
coreProblem: ""
# The main problem you solve

pains: []
# Problems prospects mention most often

customerPriorities: []
# What matters most to customers
```

## Buying behavior

```yaml
triggers: []
# Events that prompt solution-seeking

buyerCommittee: ""
# Who gets involved in deals (titles, departments, roles)

stakeholderCount: ""
# Typical number of stakeholders in deals

salesCycleInsights: ""
# How long deals take, what accelerates/slows them

salesCycleDays: ""
# Typical sales cycle duration

salesMotion: ""
# How you currently sell

salesStages: []
# Your pipeline stages

qualification: ""
# How you qualify prospects

idealDiscoveryCall: ""
# What a great discovery call looks like

topPerformerBehaviors: []
# What your best salespeople do differently

salesChallenges: []
# What's hard about selling your product

dealbreakers: []
# Why deals get disqualified

salesTeamStructure: ""
# How sales team is organized

salesTeamInsights: ""
# Intelligence from sales team

roiModel: ""
# How you help customers calculate/justify ROI
```

## Win/loss intelligence

```yaml
whyWeWin: []
# Why customers chose you

whyWeLose: []
# Why prospects chose competitors or didn't buy

winLossData: ""
# Formal win/loss analysis data
```

## Competitive landscape

```yaml
directCompetitors: []
# Main direct competitors

indirectCompetitors: []
# Indirect competitors

emergingCompetitors: []
# New market entrants to watch

alternatives: []
# What else customers consider (including status quo)

competitorDifferentiation: ""
# Competitors and how you differ

competitiveLandscape: ""
# Market dynamics overview

competitorWeaknesses: []
# Where competitors fall short

competitorClaims: []
# What competitors say about themselves

comparisonCriteria: []
# Criteria buyers use to evaluate options

antiIcp: []
# Deals/customers to avoid
```

## Differentiation & value

```yaml
differentiators: []
# What makes you different

uniqueCapabilities: []
# Things only you can do

uniqueSolution: ""
# Your unique approach to the problem

uniqueValue: ""
# The unique value you provide

valueProps: []
# Your value propositions
```

## Proof & credibility

```yaml
proofPoints: []
# Evidence that backs up your claims

proofMetrics: []
# Metrics you can prove

awards: []
# Awards, certifications, recognitions
```

## Brand identity

```yaml
values: []
# Company values

vision: ""
# What future you're creating

mission: ""
# Why you exist
```

## Brand voice & personality

```yaml
voiceDescription: ""
# How you sound

voiceAdjectives: []
# Words that describe your voice

voiceGuidelines: ""
# Formal voice guidelines

voiceNotes: ""
# Voice context for specific content

voiceDo: []
# Brands whose voice you admire / voice examples to follow

voiceDont: []
# Brands/examples to avoid

personalityTraits: []
# Your brand's personality adjectives

desiredFeelings: []
# How you want customers to feel

admiredBrands: []
# Brands you look up to

antiBrands: []
# Brands you don't want to be like

formalityLevel: ""
# Formal, casual, or somewhere in between

industryNormsApproach: ""
# Follow or break industry conventions

culturalNuances: ""
# Cultural considerations for brand expression

legalClaimLimits: []
# Things you can't or won't say

forbiddenPhrases: []
# Specific phrases never to use
```

## Brand promise & positioning

```yaml
positioningStatement: ""
# Your positioning statement

currentPositioning: ""
# How you describe your category/market position today

positioningChallenges: ""
# What's hard about your positioning

marketPosition: ""
# Where you sit in the market

praisedAttributes: []
# What you're known for

desiredReputation: ""
# What you want to be known for

brandPromise: ""
# What you promise to deliver

retentionDrivers: []
# Why customers stay

failureResponse: ""
# How you handle things when they go wrong

failureScenarios: []
# Things that could go wrong
```

## Messaging assets

```yaml
existingMessaging: ""
# Current messaging in use

existingTaglines: []
# Current taglines

elevatorPitch: ""
# Current elevator pitch

taglinesLove: []
# Taglines leadership likes

taglinesHate: []
# Taglines to avoid

famousForSaying: ""
# What you want to be quoted for

beliefShifts: []
# Beliefs you want to change in the market

winningConversations: ""
# What works in sales conversations
```

## Content & communications

```yaml
contentExamples: []
# Sample content you've produced

contentFeedback: ""
# Feedback on current content

highPerformingContent: []
# Content that worked well

highPerformingMetrics: ""
# Performance data on best content

highEngagementSpecifics: ""
# What drove engagement

contentThatWorks: []
# Patterns in successful content

contentThatFailed: []
# What didn't work

contentToAvoid: []
# Content types/styles to avoid

contentFormats: []
# Formats you use (blog, video, etc.)
```

## Industry context

```yaml
industry: ""
# Your industry

industryTrends: []
# Important industry trends

techTrends: []
# Tech trends affecting your market

marketShifts: []
# Recent changes in your market

marketChangeVelocity: ""
# How fast things change in your market

regulatoryRequirements: []
# Compliance/regulatory factors

industryTerminology: []
# Jargon and terms in your industry

industryConstraints: []
# What you can't say/do in your industry

commonMisconceptions: []
# Myths about your space
```

## Go-to-market

```yaml
businessContext: ""
# Current business situation

businessGoals: []
# What you're trying to achieve

primarySegment: ""
# Primary segment focus

channels: []
# Marketing/sales channels in use

plannedChannels: []
# Channels you're adding

ctas: []
# Primary calls-to-action used across channels

testingAudience: ""
# Who to test messaging with
```

## Existing collateral & assets

```yaml
existingCollateral: ""
# Marketing materials you have

foundationDocs: []
# Core brand/messaging docs

visualAssets: []
# Logo, colors, fonts, etc.

existingTemplates: []
# Templates in use
```

## Team & operations

```yaml
teamRoles: ""
# Who does what on marketing/brand team

approvalLevel: ""
# Autonomy vs. approval requirements

accessPermissions: ""
# Who can access/edit brand assets

decisionStructure: ""
# How decisions get made

teamAvailability: ""
# Team capacity for brand work

enablementOwner: ""
# Who owns training/enablement

toolsAvailable: []
# Tech stack for marketing/brand
```

## Training & enablement

```yaml
onboardingProcess: ""
# Current onboarding approach

onboardingTimeline: ""
# How long onboarding takes

commonMistakes: []
# Mistakes new team members make

trainingPreference: ""
# How team prefers to learn

trainingPriorities: []
# What to train on first
```

## Measurement & review

```yaml
northStarMetric: ""
# Primary metric that indicates overall health

kpis: []
# How you measure success

currentMetrics: []
# Metrics you currently track

baseline: ""
# Current baseline for key metrics

blindSpots: []
# What you can't measure well

reportingAudience: ""
# Who sees reports

reportingCadence: ""
# How often you report

reviewCadence: ""
# Current review schedule

changeHistory: ""
# How brand has evolved

currentPainPoints: []
# What's not working

brandMaturity: ""
# How established your brand is

consistencyChallenges: []
# Where brand consistency breaks down
```

## Prompt-specific inputs

```yaml
numberOfPersonas: ""
# How many personas to generate (prompt 01)

prioritySegments: []
# Segments to focus on (prompt 01)

exclusions: []
# Audiences you don't serve (prompt 01)

knownGaps: []
# Customer types you struggle to understand (prompt 01)

additionalContext: ""
# Extra context for specific prompts
```

---

## Variable usage by prompt

| Prompt | Key Variables |
|--------|--------------|
| 01 Target Customer Profiles | companyName, icpCompanySize, icpIndustries, triggers, buyerCommittee |
| 02 Market & Competitive Analysis | directCompetitors, whyWeWin, whyWeLose, competitorWeaknesses |
| 03 Mission Vision Values | originStory, founderFrustration, values, vision |
| 04 Brand Voice & Tone | voiceAdjectives, voiceDo, voiceDont, legalClaimLimits |
| 05 Brand Personality & Archetype | personalityTraits, admiredBrands, formalityLevel |
| 06 Unique Value Propositions | coreProblem, directCompetitors, proofPoints |
| 07 Brand Positioning Statement | icpDescription, uniqueCapabilities, winLossData |
| 08 Brand Promise | brandPromise, retentionDrivers, failureScenarios |
| 09 Core Messaging Pillars | customerPriorities, beliefShifts, winningConversations |
| 10 Message Map | differentiators, customerOutcomes, competitorClaims |
| 11 Elevator Pitch & Boilerplate | coreProblem, uniqueSolution, customerOutcomes, yearFounded |
| 12 Example Communications | contentExamples, highPerformingContent, contentToAvoid |
| 13 Taglines & Slogans | famousForSaying, elevatorPitch, valueProps |
| 14 Industry Context | icpIndustries, industryTrends, regulatoryRequirements |
| 15 Sales Methodology | acvRange, salesCycleDays, salesStages |
| 16 Product-Service Catalog | productList, keyFeatures, useCases |
| 17 Brand Guidelines Master | foundationDocs, visualAssets, consistencyChallenges |
| 18 Communication Strategy | channels, plannedChannels, contentThatWorks |
| 19 Training & Enablement | onboardingProcess, commonMistakes, kpis |
| 20 Performance Measurement | businessGoals, currentMetrics, reportingCadence |
| 21 Review & Iteration | marketChangeVelocity, reviewCadence, brandMaturity |

---

## Quick-fill template

Copy this template and fill in your values:

```yaml
# === CORE IDENTITY ===
companyName: ""
companyUrl: ""
companyDescription: ""
companyStage: ""
yearFounded: ""

# === PRODUCT ===
productDescription: ""
category: ""
pricingModel: ""
acvRange: ""

# === CUSTOMERS ===
icpCompanySize: ""
icpIndustries: []
geo: ""
buyerPersonas: []
coreProblem: ""
pains: []
triggers: []

# === COMPETITION ===
directCompetitors: []
indirectCompetitors: []
differentiators: []
whyWeWin: []
whyWeLose: []

# === BRAND ===
values: []
vision: ""
voiceAdjectives: []
personalityTraits: []

# === GO-TO-MARKET ===
salesMotion: ""
salesCycleDays: ""
channels: []

# === MEASUREMENT ===
northStarMetric: ""
kpis: []
```
