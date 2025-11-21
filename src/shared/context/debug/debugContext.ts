import { createContext } from "react";
import type {
  DebugMessage,
  DebugMessageLevel,
  DebugMessageSource,
} from "../../types/debug";

export interface DebugContextValue {
  messages: DebugMessage[];
  autoscroll: boolean;

  pushMessage: (payload: {
    text: string;
    level?: DebugMessageLevel;
    source?: DebugMessageSource;
  }) => void;

  clearMessages: () => void;
  toggleAutoscroll: () => void;
}

export const DebugContext = createContext<DebugContextValue | undefined>(
  undefined
);
