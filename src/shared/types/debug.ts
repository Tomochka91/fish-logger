export type DebugMessageSource = "frontend" | "backend";
export type DebugMessageLevel = "info" | "warn" | "error";

export interface DebugMessage {
  id: string;
  text: string;
  source: DebugMessageSource;
  level?: DebugMessageLevel;
  timestamp: string;
}
