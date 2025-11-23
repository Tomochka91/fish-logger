export type DebugMessageSource = "front" | "back";
export type DebugMessageLevel = "info" | "warn" | "error";

export interface DebugMessage {
  id: string;
  text: string;
  source: DebugMessageSource;
  level?: DebugMessageLevel;
  timestamp: Date;
}
