export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  /** Set on assistant replies; false means the answer was not found in the résumé. */
  grounded?: boolean;
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  answer?: string;
  grounded?: boolean;
  error?: string;
}
