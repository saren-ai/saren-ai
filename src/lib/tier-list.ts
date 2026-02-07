// Tier List — Types, data, and helpers

export interface AiTool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  logo?: string; // Path to transparent PNG in /public/logos/tools/
}

export type TierId = "S" | "A" | "B" | "C" | "D";

export interface TierConfig {
  id: TierId;
  label: string;
  color: string;
  textColor: string;
}

export type TierContents = Record<TierId | "unranked", string[]>;

export interface TierVote {
  placements: Record<string, TierId>;
  timestamp: number;
}

export interface ToolResult {
  toolId: string;
  averageScore: number;
  distribution: Record<TierId, number>;
  mostCommonTier: TierId;
}

export interface TierResults {
  totalVotes: number;
  tools: ToolResult[];
}

// ---- Static Data ----

export const AI_TOOLS: AiTool[] = [
  // AI Development
  { id: "cursor", name: "Cursor", description: "AI-first code editor with Claude & GPT integration", category: "AI Development", url: "https://cursor.com", logo: "/logos/ai-apps/cursor.png" },
  { id: "claude-code", name: "Claude Code", description: "Agentic coding assistant for the terminal", category: "AI Development", url: "https://anthropic.com", logo: "/logos/ai-apps/claude-code.jpg" },
  { id: "claude", name: "Claude", description: "Advanced reasoning for complex tasks and writing", category: "AI Development", url: "https://anthropic.com", logo: "/logos/ai-apps/claude.png" },
  { id: "chatgpt", name: "ChatGPT", description: "Versatile AI for brainstorming and research", category: "AI Development", url: "https://openai.com", logo: "/logos/ai-apps/chatgpt.png" },
  { id: "gemini", name: "Gemini", description: "Google's multimodal AI for diverse tasks", category: "AI Development", url: "https://gemini.google.com", logo: "/logos/ai-apps/gemini.png" },
  { id: "perplexity", name: "Perplexity", description: "AI-powered research and search engine", category: "AI Development", url: "https://perplexity.ai", logo: "/logos/ai-apps/perplexity.png" },
  { id: "deepseek", name: "DeepSeek", description: "Open-source AI for code and reasoning", category: "AI Development", url: "https://deepseek.com", logo: "/logos/ai-apps/deepseek.png" },
  { id: "grok", name: "Grok", description: "Real-time AI with X platform integration", category: "AI Development", url: "https://x.ai", logo: "/logos/ai-apps/grok.png" },
  { id: "notebooklm", name: "NotebookLM", description: "Google's AI-powered research notebook", category: "AI Development", url: "https://notebooklm.google.com", logo: "/logos/ai-apps/notebooklm.png" },
  { id: "manus", name: "Manus", description: "Autonomous AI agent for complex workflows", category: "AI Development", url: "https://manus.im", logo: "/logos/ai-apps/manus.png" },
  // Development & Deployment
  { id: "github", name: "GitHub", description: "Version control and collaboration platform", category: "Development & Deployment", url: "https://github.com", logo: "/logos/ai-apps/github.png" },
  { id: "breeze", name: "Breeze", description: "AI-powered design and development tool", category: "Development & Deployment", url: "https://breeze.com", logo: "/logos/ai-apps/breeze.png" },
  // Marketing & Sales
  { id: "hubspot", name: "HubSpot", description: "CRM, marketing automation, and sales enablement", category: "Marketing & Sales", url: "https://hubspot.com", logo: "/logos/ai-apps/hubspot.png" },
  { id: "plai", name: "Plai", description: "AI-powered ad management and optimization", category: "Marketing & Sales", url: "https://plai.io", logo: "/logos/ai-apps/plai.png" },
  // Content & Productivity
  { id: "wethosai", name: "Wethos AI", description: "AI-powered project scoping and pricing", category: "Content & Productivity", url: "https://wethos.co", logo: "/logos/ai-apps/wethosai.png" },
];

export const TIER_CONFIG: TierConfig[] = [
  { id: "S", label: "S", color: "#FF7F7F", textColor: "#000000" },
  { id: "A", label: "A", color: "#FFBF7F", textColor: "#000000" },
  { id: "B", label: "B", color: "#FFDF7F", textColor: "#000000" },
  { id: "C", label: "C", color: "#FFFF7F", textColor: "#000000" },
  { id: "D", label: "D", color: "#BFFF7F", textColor: "#000000" },
];

// ---- Saren's Picks (predefined ranking) ----

export const SAREN_PICKS: TierContents = {
  S: ["cursor", "claude-code", "claude"],
  A: ["perplexity", "chatgpt", "github", "hubspot"],
  B: ["gemini", "notebooklm", "deepseek", "plai"],
  C: ["grok", "manus", "breeze", "wethosai"],
  D: [],
  unranked: [],
};

// ---- Helpers ----

export function createInitialContents(): TierContents {
  return {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    unranked: AI_TOOLS.map((t) => t.id),
  };
}

export function getToolById(id: string): AiTool | undefined {
  return AI_TOOLS.find((t) => t.id === id);
}

const TIER_SCORES: Record<TierId, number> = { S: 5, A: 4, B: 3, C: 2, D: 1 };
const SCORE_TIERS: [number, TierId][] = [
  [4.5, "S"],
  [3.5, "A"],
  [2.5, "B"],
  [1.5, "C"],
  [0, "D"],
];

export function tierToScore(tier: TierId): number {
  return TIER_SCORES[tier];
}

export function scoreToTier(score: number): TierId {
  for (const [threshold, tier] of SCORE_TIERS) {
    if (score >= threshold) return tier;
  }
  return "D";
}

// ---- localStorage persistence ----

const STORAGE_KEY = "saren-tier-list-votes";

export function saveVote(vote: TierVote): void {
  const existing = getVotes();
  existing.push(vote);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getVotes(): TierVote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TierVote[];
  } catch {
    return [];
  }
}

export function aggregateVotes(votes: TierVote[]): TierResults {
  if (votes.length === 0) {
    return {
      totalVotes: 0,
      tools: AI_TOOLS.map((t) => ({
        toolId: t.id,
        averageScore: 0,
        distribution: { S: 0, A: 0, B: 0, C: 0, D: 0 },
        mostCommonTier: "C" as TierId,
      })),
    };
  }

  const toolStats: Record<string, { scores: number[]; distribution: Record<TierId, number> }> = {};

  for (const tool of AI_TOOLS) {
    toolStats[tool.id] = {
      scores: [],
      distribution: { S: 0, A: 0, B: 0, C: 0, D: 0 },
    };
  }

  for (const vote of votes) {
    for (const [toolId, tier] of Object.entries(vote.placements)) {
      if (toolStats[toolId]) {
        toolStats[toolId].scores.push(tierToScore(tier));
        toolStats[toolId].distribution[tier]++;
      }
    }
  }

  const tools: ToolResult[] = AI_TOOLS.map((tool) => {
    const stats = toolStats[tool.id];
    const avgScore =
      stats.scores.length > 0
        ? stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length
        : 0;

    let mostCommonTier: TierId = "C";
    let maxCount = 0;
    for (const [tier, count] of Object.entries(stats.distribution)) {
      if (count > maxCount) {
        maxCount = count;
        mostCommonTier = tier as TierId;
      }
    }

    return {
      toolId: tool.id,
      averageScore: avgScore,
      distribution: stats.distribution,
      mostCommonTier,
    };
  }).sort((a, b) => b.averageScore - a.averageScore);

  return { totalVotes: votes.length, tools };
}
