/**
 * Content Journey Matrix: Data Model & Types
 * Based on enterprise buyer journey from awareness to renewal
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Stage {
  id: string;
  label: string;
  aida: string; // Awareness, Consideration, Decision, Action, Retention
  duration: string;
  description?: string;
}

export interface RowTooltip {
  title: string;
  body: string;
  howToUse?: string;
}

export interface MatrixRow {
  id: string;
  label: string;
  tooltip?: RowTooltip;
  cells: Record<string, string>; // stageId -> cell content
  expandedContent?: Record<string, {
    why: string[];
    instruments?: string[];
    formats?: string[];
  }>;
}

export interface MatrixData {
  persona: "enterprise" | "smb";
  stages: Stage[];
  rows: MatrixRow[];
}

// ============================================================================
// STAGE DEFINITIONS
// ============================================================================

export const enterpriseStages: Stage[] = [
  {
    id: "problem_identification",
    label: "Problem Identification",
    aida: "Awareness",
    duration: "2-4 weeks",
    description: "Buyer recognizes a business problem or opportunity"
  },
  {
    id: "problem_analysis",
    label: "Problem Analysis",
    aida: "Awareness",
    duration: "2-3 weeks",
    description: "Buyer quantifies impact and urgency"
  },
  {
    id: "internal_consensus",
    label: "Internal Consensus",
    aida: "Consideration",
    duration: "3-4 weeks",
    description: "Building stakeholder alignment on solving the problem"
  },
  {
    id: "external_research",
    label: "External Research",
    aida: "Consideration",
    duration: "3-6 weeks",
    description: "Actively researching solution categories and vendors"
  },
  {
    id: "shortlist_comparison",
    label: "Shortlist & Comparison",
    aida: "Consideration",
    duration: "2-4 weeks",
    description: "Narrowing to 2-3 vendors for detailed evaluation"
  },
  {
    id: "recommendation",
    label: "Recommendation (Champion)",
    aida: "Decision",
    duration: "1-2 weeks",
    description: "Champion building internal business case"
  },
  {
    id: "sales_meetings",
    label: "Sales Meetings & Demos",
    aida: "Decision",
    duration: "2-3 weeks",
    description: "Technical and commercial validation"
  },
  {
    id: "purchase_decision",
    label: "Purchase Decision",
    aida: "Action",
    duration: "2-4 weeks",
    description: "Legal, security, procurement review"
  },
  {
    id: "post_purchase",
    label: "Post-Purchase Adoption",
    aida: "Retention",
    duration: "30-90 days",
    description: "Onboarding, time-to-value, proving ROI"
  },
  {
    id: "renewal",
    label: "Renewal",
    aida: "Retention",
    duration: "Ongoing",
    description: "Expansion, upsell, and renewal conversations"
  },
];

// ============================================================================
// MATRIX ROW DATA
// ============================================================================

export const enterpriseMatrix: MatrixData = {
  persona: "enterprise",
  stages: enterpriseStages,
  rows: [
    {
      id: "buyer_stage",
      label: "Buyer Stage",
      tooltip: {
        title: "Buyer Stage",
        body: "What the buying team is actually doing—not what marketing wishes they were doing.",
        howToUse: "Align content and CTAs to match real buyer behavior, not your funnel stages."
      },
      cells: {
        problem_identification: "Experiencing pain\nSearching for validation",
        problem_analysis: "Quantifying impact\nBuilding urgency",
        internal_consensus: "Socializing problem\nSecuring budget",
        external_research: "Scanning landscape\nUnderstanding options",
        shortlist_comparison: "Evaluating vendors\nComparing approaches",
        recommendation: "Building business case\nSecuring executive buy-in",
        sales_meetings: "Technical validation\nNegotiating terms",
        purchase_decision: "Legal/security review\nProcurement approval",
        post_purchase: "Onboarding team\nProving quick wins",
        renewal: "Measuring ROI\nExpanding use cases"
      }
    },
    {
      id: "user_tasks",
      label: "User Tasks",
      tooltip: {
        title: "User Tasks",
        body: "The jobs-to-be-done at this stage. What the buyer is actively trying to accomplish.",
        howToUse: "Create content that helps them complete these tasks faster or with more confidence."
      },
      cells: {
        problem_identification: "Search symptoms\nRead trend reports\nTalk to peers",
        problem_analysis: "Calculate costs\nBenchmark performance\nDocument failures",
        internal_consensus: "Present to leadership\nAlign stakeholders\nSecure budget allocation",
        external_research: "Read reviews\nWatch demos\nDownload guides",
        shortlist_comparison: "Build evaluation matrix\nRun POCs\nCheck references",
        recommendation: "Build ROI model\nCreate exec deck\nIdentify champions",
        sales_meetings: "Technical deep-dive\nContract negotiation\nSecurity review",
        purchase_decision: "Legal approval\nProcurement process\nImplementation planning",
        post_purchase: "Team training\nInitial deployment\nMeasure early wins",
        renewal: "ROI reporting\nExpansion planning\nRenewal negotiation"
      }
    },
    {
      id: "players_personas",
      label: "Players / Personas",
      tooltip: {
        title: "Players / Personas",
        body: "Who's involved at this stage. Influences channels, proof types, and friction tolerance.",
        howToUse: "Tailor content format, depth, and messaging to the active persona at each stage."
      },
      cells: {
        problem_identification: "End users\nFront-line managers",
        problem_analysis: "Department heads\nOperations leads",
        internal_consensus: "VPs\nBudget owners\nCFO",
        external_research: "Analysts\nPower users\nInfluencers",
        shortlist_comparison: "Technical evaluators\nSecurity team\nIT",
        recommendation: "Champion (VP/Director)\nEconomic buyer",
        sales_meetings: "Procurement\nLegal\nSecurity\nIT",
        purchase_decision: "C-suite\nLegal\nFinance",
        post_purchase: "Implementation team\nEnd users\nSuccess managers",
        renewal: "Economic buyer\nChampion\nEnd users"
      }
    },
    {
      id: "relevance",
      label: "Relevance",
      tooltip: {
        title: "Relevance",
        body: "How 'in-market' the buyer is. Determines how aggressive your CTA should be.",
        howToUse: "Early stage: educate and build trust. Late stage: enable decision and remove friction."
      },
      cells: {
        problem_identification: "Low → Medium\n(Problem-aware)",
        problem_analysis: "Medium\n(Solution-seeking)",
        internal_consensus: "Medium → High\n(Budget-approved)",
        external_research: "High\n(Actively shopping)",
        shortlist_comparison: "Very High\n(Vendor evaluation)",
        recommendation: "Very High\n(Sales-ready)",
        sales_meetings: "Very High\n(Commercial intent)",
        purchase_decision: "High\n(Closing)",
        post_purchase: "Medium\n(Adoption focus)",
        renewal: "Medium → High\n(Renewal window)"
      }
    },
    {
      id: "goal",
      label: "Goal",
      tooltip: {
        title: "Goal",
        body: "The outcome your content must produce at this stage.",
        howToUse: "Every piece of content should have ONE clear goal aligned to the buyer's stage."
      },
      cells: {
        problem_identification: "Validate pain\nCreate urgency",
        problem_analysis: "Quantify impact\nShow consequences",
        internal_consensus: "Build business case\nSecure buy-in",
        external_research: "Enter consideration set\nProve credibility",
        shortlist_comparison: "Make shortlist\nDifferentiate",
        recommendation: "Arm champion\nProvide proof",
        sales_meetings: "Remove objections\nEnable purchase",
        purchase_decision: "Accelerate approval\nReduce risk",
        post_purchase: "Prove value\nDrive adoption",
        renewal: "Demonstrate ROI\nExpand usage"
      }
    },
    {
      id: "metric",
      label: "Metric",
      tooltip: {
        title: "Metric",
        body: "How you measure progress and content effectiveness at this stage.",
        howToUse: "Track these to understand velocity, conversion rates, and content performance."
      },
      cells: {
        problem_identification: "Traffic quality\nTime on page\nContent engagement",
        problem_analysis: "Return visitors\nTool usage\nDownload rates",
        internal_consensus: "Email opens\nShare rates\nStakeholder engagement",
        external_research: "Trial starts\nDemo requests\nPricing page views",
        shortlist_comparison: "POC requests\nComparison downloads\nReference checks",
        recommendation: "Proposal requests\nChampion engagement\nBusiness case downloads",
        sales_meetings: "Meeting completions\nProposal acceptance\nContract reviews",
        purchase_decision: "Close rate\nSales cycle\nDeal size",
        post_purchase: "Activation rate\nTime to value\nNPS",
        renewal: "Expansion rate\nRenewal rate\nChurn risk"
      }
    },
    {
      id: "content_scoring",
      label: "Content Scoring",
      tooltip: {
        title: "Content Scoring",
        body: "How you translate behavior into intent signals. Scoring should vary by stage.",
        howToUse: "Weight actions differently based on buying stage. Late-stage actions score higher."
      },
      cells: {
        problem_identification: "Passive (+1)\nMultiple visits (+2)\nTool usage (+3)",
        problem_analysis: "Active research (+5)\nCalculator usage (+7)\nMultiple tools (+10)",
        internal_consensus: "Email sharing (+5)\nPresentation download (+10)\nMultiple stakeholders (+15)",
        external_research: "Demo view (+10)\nTrial start (+15)\nPricing view (+20)",
        shortlist_comparison: "POC request (+25)\nComparison view (+15)\nReference call (+30)",
        recommendation: "Business case tool (+30)\nProposal request (+40)\nChampion call (+50)",
        sales_meetings: "Meeting scheduled (+40)\nProposal opened (+30)\nContract review (+60)",
        purchase_decision: "Opportunity created\n(Sales-managed)",
        post_purchase: "Onboarding complete (+20)\nFeature adoption (+10)",
        renewal: "Renewal meeting (+30)\nUpsell interest (+40)"
      }
    },
    {
      id: "media",
      label: "Media",
      tooltip: {
        title: "Media",
        body: "The format container—blog, webinar, demo, sales conversation, etc.",
        howToUse: "Match format to buyer's time investment and information needs at each stage."
      },
      cells: {
        problem_identification: "Blog posts\nSocial content\nPodcasts",
        problem_analysis: "Whitepapers\nWebinars\nInteractive tools",
        internal_consensus: "Business case templates\nROI calculators\nExec briefs",
        external_research: "Product tours\nComparison guides\nAnalyst reports",
        shortlist_comparison: "Case studies\nDemo videos\nTechnical docs",
        recommendation: "Champion kits\nExec presentations\nProof points",
        sales_meetings: "Custom demos\nSecurity docs\nProposals",
        purchase_decision: "Contracts\nImplementation plans\nSuccess plans",
        post_purchase: "Onboarding videos\nTraining docs\nSupport resources",
        renewal: "ROI reports\nRoadmap previews\nExpansion proposals"
      }
    },
    {
      id: "strategy",
      label: "Strategy",
      tooltip: {
        title: "Strategy",
        body: "The message approach—validation, comparison, de-risking, proof.",
        howToUse: "Align messaging to the buyer's psychological needs at each stage."
      },
      cells: {
        problem_identification: "Problem validation\nPeer proof\nTrend authority",
        problem_analysis: "Cost of inaction\nBenchmarking\nFrameworks",
        internal_consensus: "Business case building\nStakeholder alignment\nBudget justification",
        external_research: "Category education\nCredibility building\nThought leadership",
        shortlist_comparison: "Differentiation\nProof of value\nRisk reduction",
        recommendation: "Champion enablement\nExecutive positioning\nROI demonstration",
        sales_meetings: "Objection handling\nTechnical proof\nCommercial terms",
        purchase_decision: "Risk mitigation\nSuccess planning\nLegal enablement",
        post_purchase: "Quick wins\nAdoption acceleration\nValue realization",
        renewal: "ROI reporting\nExpansion opportunities\nRelationship deepening"
      }
    },
    {
      id: "tactics",
      label: "Tactics",
      tooltip: {
        title: "Tactics",
        body: "Specific executions—retargeting, nurture, SDR enablement, case studies.",
        howToUse: "Tactical playbook for each stage. What marketing/sales actually does."
      },
      cells: {
        problem_identification: "SEO content\nSocial amplification\nThought leadership",
        problem_analysis: "Gated assets\nEmail nurture\nRetargeting",
        internal_consensus: "Account-based plays\nMulti-threading\nExecutive engagement",
        external_research: "Product marketing\nCompetitive content\nG2/TrustRadius",
        shortlist_comparison: "SDR outreach\nCase study delivery\nReferences",
        recommendation: "Champion coaching\nExec briefings\nCustom ROI models",
        sales_meetings: "AE-led demos\nTechnical Q&A\nProposal customization",
        purchase_decision: "Legal support\nSecurity reviews\nProcurement acceleration",
        post_purchase: "CSM onboarding\nTraining delivery\nQuick win targeting",
        renewal: "QBRs\nROI reviews\nExpansion plays"
      }
    },
    {
      id: "user_thoughts",
      label: "User Thoughts",
      tooltip: {
        title: "User Thoughts",
        body: "The cognitive layer—what buyers are thinking at this stage.",
        howToUse: "Anticipate these thoughts in your content to build trust and reduce friction."
      },
      cells: {
        problem_identification: "Is this really a problem?\nAre others seeing this?\nShould we care?",
        problem_analysis: "How bad is it?\nWhat's it costing us?\nCan we quantify this?",
        internal_consensus: "Will leadership care?\nCan we get budget?\nWho needs to buy in?",
        external_research: "What solutions exist?\nWho's credible?\nWhat's the best approach?",
        shortlist_comparison: "Which vendor is best?\nWhat are the tradeoffs?\nWho do we trust?",
        recommendation: "Can I sell this internally?\nHow do I build the case?\nWhat proof do I need?",
        sales_meetings: "Will this actually work?\nWhat are the risks?\nIs pricing fair?",
        purchase_decision: "Is this secure?\nAre we protected?\nCan we implement this?",
        post_purchase: "Did we make the right choice?\nWill we get value?\nHow fast can we see results?",
        renewal: "Did it work?\nShould we expand?\nWas it worth it?"
      }
    },
    {
      id: "user_feelings",
      label: "User Feelings",
      tooltip: {
        title: "User Feelings",
        body: "The emotional layer. Content should reduce anxiety and build confidence.",
        howToUse: "Address these feelings explicitly to reduce emotional friction in the buyer journey."
      },
      cells: {
        problem_identification: "Anxious\nCurious\nUncertain",
        problem_analysis: "Concerned\nUrgent\nOverwhelmed",
        internal_consensus: "Political\nCautious\nDetermined",
        external_research: "Hopeful\nSkeptical\nExcited",
        shortlist_comparison: "Analytical\nPressured\nComparative",
        recommendation: "Confident (or nervous)\nPersuasive\nCommitted",
        sales_meetings: "Evaluative\nNegotiating\nCareful",
        purchase_decision: "Risk-averse\nAnticipatory\nImpatient",
        post_purchase: "Hopeful\nValidation-seeking\nProof-hungry",
        renewal: "Retrospective\nSatisfied (or regretful)\nExpansion-minded"
      }
    },
  ]
};
