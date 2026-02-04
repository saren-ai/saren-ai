/**
 * B2B Marketing Framework: Data Model
 * Based on https://github.com/saren-ai/b2b-marketing-framework
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Prompt {
  id: string;
  number: string; // "01", "02", etc.
  title: string;
  purpose: string;
  githubUrl: string;
}

export interface Layer {
  id: "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7";
  label: string; // "L1 — Foundations (who + where)"
  shortLabel: string; // "Foundations"
  summary: string;
  bestUsedFor: string[];
  folderUrl: string;
  folderName: string; // Actual GitHub folder name
  prompts: Prompt[];
}

// ============================================================================
// LAYER DATA
// ============================================================================

const baseUrl = "https://github.com/saren-ai/b2b-marketing-framework";

export const layers: Layer[] = [
  {
    id: "l1",
    label: "L1 — Foundations (who + where)",
    shortLabel: "Foundations",
    summary: "Define your target customers and understand your competitive landscape before building anything else.",
    bestUsedFor: [
      "ICP definition and persona development",
      "Competitive positioning research",
      "Market sizing and opportunity validation"
    ],
    folderName: "L1_Foundational_Elements",
    folderUrl: `${baseUrl}/tree/main/L1_Foundational_Elements`,
    prompts: [
      {
        id: "01",
        number: "01",
        title: "Target Customer Profiles",
        purpose: "Identify who you're selling to (and who you're ignoring)",
        githubUrl: `${baseUrl}/tree/main/L1_Foundational_Elements`
      },
      {
        id: "02",
        number: "02",
        title: "Market & Competitive Analysis",
        purpose: "Map where you fit in the landscape",
        githubUrl: `${baseUrl}/tree/main/L1_Foundational_Elements`
      }
    ]
  },
  {
    id: "l2",
    label: "L2 — Identity (why + how you show up)",
    shortLabel: "Identity",
    summary: "Establish your company's core identity: mission, values, voice, and personality that guides everything.",
    bestUsedFor: [
      "Brand voice guidelines",
      "Company culture documentation",
      "Internal alignment on 'who we are'"
    ],
    folderName: "L2_Core_Identity",
    folderUrl: `${baseUrl}/tree/main/L2_Core_Identity`,
    prompts: [
      {
        id: "03",
        number: "03",
        title: "Mission, Vision, Values",
        purpose: "Define why you exist beyond revenue",
        githubUrl: `${baseUrl}/tree/main/L2_Core_Identity`
      },
      {
        id: "04",
        number: "04",
        title: "Brand Voice & Tone",
        purpose: "Establish how you sound when you show up",
        githubUrl: `${baseUrl}/tree/main/L2_Core_Identity`
      },
      {
        id: "05",
        number: "05",
        title: "Brand Personality & Archetype",
        purpose: "Define the character behind your company",
        githubUrl: `${baseUrl}/tree/main/L2_Core_Identity`
      }
    ]
  },
  {
    id: "l3",
    label: "L3 — Positioning (what you are + why you win)",
    shortLabel: "Positioning",
    summary: "Articulate your unique value, competitive position, and the promise customers can count on.",
    bestUsedFor: [
      "Homepage messaging",
      "Pitch deck positioning slides",
      "Sales one-liners and elevator pitches"
    ],
    folderName: "L3_Core_Message",
    folderUrl: `${baseUrl}/tree/main/L3_Core_Message`,
    prompts: [
      {
        id: "06",
        number: "06",
        title: "Unique Value Propositions",
        purpose: "Define what makes you worth paying attention to",
        githubUrl: `${baseUrl}/tree/main/L3_Core_Message`
      },
      {
        id: "07",
        number: "07",
        title: "Brand Positioning Statement",
        purpose: "Plant your stake in the ground",
        githubUrl: `${baseUrl}/tree/main/L3_Core_Message`
      },
      {
        id: "08",
        number: "08",
        title: "Brand Promise",
        purpose: "State what customers can count on",
        githubUrl: `${baseUrl}/tree/main/L3_Core_Message`
      }
    ]
  },
  {
    id: "l4",
    label: "L4 — Messaging System (how you say it)",
    shortLabel: "Messaging",
    summary: "Build a complete messaging architecture: pillars, message maps, boilerplate, examples, and taglines.",
    bestUsedFor: [
      "Website copy",
      "Sales enablement decks",
      "Ad campaigns and content strategy",
      "PR and analyst briefings"
    ],
    folderName: "L4_Message_Articulation",
    folderUrl: `${baseUrl}/tree/main/L4_Message_Articulation`,
    prompts: [
      {
        id: "09",
        number: "09",
        title: "Core Messaging Pillars",
        purpose: "Create 3-5 themes that anchor everything you say",
        githubUrl: `${baseUrl}/tree/main/L4_Message_Articulation`
      },
      {
        id: "10",
        number: "10",
        title: "Message Map",
        purpose: "Show how your story flows from pillars to proof points",
        githubUrl: `${baseUrl}/tree/main/L4_Message_Articulation`
      },
      {
        id: "11",
        number: "11",
        title: "Elevator Pitch & Boilerplate",
        purpose: "Craft the 30-second and 100-word versions",
        githubUrl: `${baseUrl}/tree/main/L4_Message_Articulation`
      },
      {
        id: "12",
        number: "12",
        title: "Example Communications",
        purpose: "Create templates that show (don't just tell) your voice",
        githubUrl: `${baseUrl}/tree/main/L4_Message_Articulation`
      },
      {
        id: "13",
        number: "13",
        title: "Taglines & Slogans",
        purpose: "Develop the hooks that stick",
        githubUrl: `${baseUrl}/tree/main/L4_Message_Articulation`
      }
    ]
  },
  {
    id: "l5",
    label: "L5 — GTM Context (what surrounds the message)",
    shortLabel: "Context",
    summary: "Document the market forces, sales methodology, and product catalog that shape how your message lands.",
    bestUsedFor: [
      "Sales training and onboarding",
      "Product marketing briefs",
      "Analyst relations prep",
      "Partner enablement"
    ],
    folderName: "L5_Supporting_Context",
    folderUrl: `${baseUrl}/tree/main/L5_Supporting_Context`,
    prompts: [
      {
        id: "14",
        number: "14",
        title: "Industry Context",
        purpose: "Map the market forces and trends shaping your category",
        githubUrl: `${baseUrl}/tree/main/L5_Supporting_Context`
      },
      {
        id: "15",
        number: "15",
        title: "Sales Methodology",
        purpose: "Document how you actually close deals",
        githubUrl: `${baseUrl}/tree/main/L5_Supporting_Context`
      },
      {
        id: "16",
        number: "16",
        title: "Product/Service Catalog",
        purpose: "Define what you sell and how you describe it",
        githubUrl: `${baseUrl}/tree/main/L5_Supporting_Context`
      }
    ]
  },
  {
    id: "l6",
    label: "L6 — Activation & Governance (how it ships and stays consistent)",
    shortLabel: "Activation",
    summary: "Create the guidelines, strategies, and training that ensure your messaging actually gets used consistently.",
    bestUsedFor: [
      "Brand guidelines documentation",
      "Marketing ops playbooks",
      "Agency briefs",
      "New hire onboarding"
    ],
    folderName: "L6_Activation_&_Governance",
    folderUrl: `${baseUrl}/tree/main/L6_Activation_%26_Governance`,
    prompts: [
      {
        id: "17",
        number: "17",
        title: "Brand Guidelines Master Document",
        purpose: "Build the rulebook for consistent execution",
        githubUrl: `${baseUrl}/tree/main/L6_Activation_%26_Governance`
      },
      {
        id: "18",
        number: "18",
        title: "Communication Strategy",
        purpose: "Define how and where you show up",
        githubUrl: `${baseUrl}/tree/main/L6_Activation_%26_Governance`
      },
      {
        id: "19",
        number: "19",
        title: "Training & Enablement Materials",
        purpose: "Get your team speaking the same language",
        githubUrl: `${baseUrl}/tree/main/L6_Activation_%26_Governance`
      }
    ]
  },
  {
    id: "l7",
    label: "L7 — Measurement & Iteration (how it improves without starting over)",
    shortLabel: "Evolution",
    summary: "Build measurement frameworks and review protocols to keep your messaging fresh without constant rewrites.",
    bestUsedFor: [
      "Quarterly GTM reviews",
      "Message testing and validation",
      "Performance tracking dashboards",
      "Continuous improvement processes"
    ],
    folderName: "L7_Evolution_&_Refinement",
    folderUrl: `${baseUrl}/tree/main/L7_Evolution_%26_Refinement`,
    prompts: [
      {
        id: "20",
        number: "20",
        title: "Performance Measurement Framework",
        purpose: "Know if this stuff is actually working",
        githubUrl: `${baseUrl}/tree/main/L7_Evolution_%26_Refinement`
      },
      {
        id: "21",
        number: "21",
        title: "Review & Iteration Protocol",
        purpose: "Keep it fresh without starting over",
        githubUrl: `${baseUrl}/tree/main/L7_Evolution_%26_Refinement`
      }
    ]
  }
];

// ============================================================================
// EXPECTED OUTPUTS
// ============================================================================

export const expectedOutputs = [
  {
    category: "Strategic Foundation",
    items: [
      "Target customer profiles with ICP criteria",
      "Competitive landscape analysis and positioning",
      "Mission, vision, and values statements"
    ]
  },
  {
    category: "Brand & Voice",
    items: [
      "Brand voice and tone guidelines",
      "Brand personality and archetype definition",
      "Example communications templates"
    ]
  },
  {
    category: "Core Messaging",
    items: [
      "Unique value propositions",
      "Positioning statement and brand promise",
      "Core messaging pillars (3-5 themes)",
      "Message map with proof points",
      "Elevator pitch and boilerplate copy"
    ]
  },
  {
    category: "Activation & Execution",
    items: [
      "Brand guidelines master document",
      "Communication strategy and channel plans",
      "Sales enablement and training materials",
      "Performance measurement framework",
      "Review and iteration protocols"
    ]
  }
];
