export type ChatRole = "visitor" | "saren" | "ai";
export type ChatMode = "day" | "night";

export interface ChatMessageRow {
  id: string;
  role: ChatRole;
  body: string;
  created_at: string;
}

export interface ChatSendResponse {
  sessionId: string;
  mode: ChatMode;
}
