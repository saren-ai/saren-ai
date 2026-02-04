/**
 * Data model and content for Sovereign Personas portfolio page
 */

export type PersonaId = "minister" | "architect" | "operator";

export interface PersonaCard {
  id: PersonaId;
  title: string;
  subtitle: string; // role in plain english
  thumbSrc: string; // /public/... image path
  pdfHref: string; // link to PDF artifact
  mandate: string;
  risks: string[];
  trusts: string[];
  dismisses: string[];
  messagingAltitude: string;
  bestContent: string[];
  antiPatterns: string[];
}

/**
 * The three sovereign buyer personas
 */
export const personaData: PersonaCard[] = [
  {
    id: "minister",
    title: "The Minister",
    subtitle: "Political sponsor of national AI & infrastructure",
    thumbSrc: "/portfolio/personas/thumbnail/minister-al-rashid.png",
    pdfHref: "/portfolio/personas/Minister_Al-Rashid_Architecting_Sovereignty.pdf",
    mandate:
      "Deliver national AI competitiveness, sovereignty, and measurable economic transformation.",
    risks: [
      "Public failure and political fallout",
      "Geopolitical scrutiny from peer nations",
      "Audits and public accountability for outcomes",
    ],
    trusts: [
      "Policy briefs that frame outcomes in national terms",
      "Peer nation examples and international validation",
      "Top-tier consulting firms and research institutions",
    ],
    dismisses: [
      "Feature-by-feature technical comparisons",
      "Vendor bravado without geopolitical credibility",
      "ROI arguments that ignore sovereignty and legacy",
    ],
    messagingAltitude:
      "Strategic and geopolitical—focus on national outcomes, legacy, and competitiveness. Never lead with technical details.",
    bestContent: [
      "Policy briefs on AI sovereignty and economic impact",
      "Case studies from peer sovereign nations",
      "Executive briefings on geopolitical positioning",
      "National transformation roadmaps",
    ],
    antiPatterns: [
      "Leading with speeds and feeds",
      "Selling features instead of outcomes",
      "Ignoring the political and public accountability context",
      "Treating this like a standard enterprise IT deal",
    ],
  },
  {
    id: "architect",
    title: "The Architect",
    subtitle: "National technical authority & risk translator",
    thumbSrc: "/portfolio/personas/thumbnail/dr-wei-chen.png",
    pdfHref: "/portfolio/personas/The_Architects_Mandate_Dr_Wei_Chen.pdf",
    mandate:
      "Turn political ambition into an executable, multi-vendor architecture that can be defended publicly.",
    risks: [
      "Being the quiet scapegoat if the recommendation fails",
      "Getting caught between political pressure and technical reality",
      "Recommending a path that can't be implemented at scale",
    ],
    trusts: [
      "Evaluation frameworks with clear trade-off analysis",
      "Peer references from other national infrastructure projects",
      "Sober, realistic implementation plans",
      "Vendors who acknowledge complexity rather than oversimplify",
    ],
    dismisses: [
      "Hype and marketing bravado",
      "Solutions that ignore multi-vendor integration reality",
      "Oversimplified technical claims",
    ],
    messagingAltitude:
      "Architectural and pragmatic—show how you translate policy into reality. Acknowledge complexity and trade-offs.",
    bestContent: [
      "Technical evaluation frameworks and decision matrices",
      "Multi-vendor integration playbooks",
      "Reference architectures from comparable sovereign projects",
      "Risk mitigation strategies and implementation roadmaps",
    ],
    antiPatterns: [
      "Overpromising technical outcomes",
      "Ignoring the multi-vendor reality",
      "Pretending implementation is trivial",
      "Dismissing legitimate concerns about scale and complexity",
    ],
  },
  {
    id: "operator",
    title: "The Sovereign Cloud Chief",
    subtitle: "Operator accountable for performance and economics",
    thumbSrc: "/portfolio/personas/thumbnail/sovreign-cloud-chief.png",
    pdfHref: "/portfolio/personas/The_Sovereign_Cloud_Chief_s_Dilemma.pdf",
    mandate:
      "Drive GPU utilization, profitability, and customer satisfaction while competing with hyperscalers on merit.",
    risks: [
      "Missing financial targets and losing P&L accountability",
      "Poor customer experience leading to churn",
      "Getting stuck with sovereignty rhetoric but no operational proof",
    ],
    trusts: [
      "Live workload validation and proof-of-performance",
      "ROI models with 12–18 month payback periods",
      "Low-disruption migration and onboarding plans",
      "Clear SLA commitments backed by operational excellence",
    ],
    dismisses: [
      "Sovereignty talk with no operational substance",
      "Long-term promises without near-term proof points",
      "Solutions that require massive customer disruption",
    ],
    messagingAltitude:
      "Commercial and operational—connect sovereignty to performance, economics, and competitive advantage.",
    bestContent: [
      "ROI calculators and financial models",
      "Customer case studies with workload metrics",
      "Migration playbooks with minimal disruption",
      "Performance benchmarks vs. hyperscaler alternatives",
    ],
    antiPatterns: [
      "Leading with sovereignty without operational proof",
      "Ignoring the commercial reality of competing with AWS/Azure/GCP",
      "Promising outcomes without clear migration paths",
      "Underestimating the importance of customer experience",
    ],
  },
];

/**
 * How these personas get used in practice
 */
export const useCases = [
  {
    title: "Messaging Architecture",
    description:
      "Tailor value propositions by altitude—policy for ministers, architecture for technical authorities, economics for operators.",
  },
  {
    title: "Content Strategy",
    description:
      "Create content formats matched to persona trust signals—briefs for ministers, frameworks for architects, ROI models for operators.",
  },
  {
    title: "Sales Enablement",
    description:
      "Equip sales teams to navigate buying committees and speak the right language at the right altitude.",
  },
  {
    title: "Executive Briefings",
    description:
      "Prepare custom briefings that address persona-specific concerns and earning trust at each level.",
  },
  {
    title: "Long-Cycle Deal Orchestration",
    description:
      "Map the 7–16 month approval journey and orchestrate touchpoints across the buying committee.",
  },
];
