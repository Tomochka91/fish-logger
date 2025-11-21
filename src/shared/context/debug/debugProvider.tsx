import {
  useCallback,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from "react";
import { debugReducer, initialState } from "./debugReducer";
import type {
  DebugMessage,
  DebugMessageLevel,
  DebugMessageSource,
} from "../../types/debug";
import { DebugContext, type DebugContextValue } from "./debugContext";
import { formatArgs } from "../../utils/formatArguments";

export function DebugProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(debugReducer, initialState);

  const pushMessage = useCallback(
    (payload: {
      text: string;
      level?: DebugMessageLevel;
      source?: DebugMessageSource;
    }) => {
      const msg: DebugMessage = {
        id: `${Date.now()} - ${Math.random}`,
        text: payload.text,
        level: payload.level ?? "info",
        source: payload.source ?? "frontend",
        timestamp: new Date().toISOString(),
      };

      dispatch({ type: "ADD_MESSAGE", payload: msg });
    },
    []
  );

  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

  const toggleAutoscroll = useCallback(() => {
    dispatch({ type: "TOGGLE_AUTOSCROLL" });
  }, []);

  useEffect(() => {
    const origLog = console.log;
    const origWarn = console.warn;
    const origErr = console.error;

    console.log = (...args) => {
      origLog(...args);
      pushMessage({ text: formatArgs(args), level: "info" });
    };

    console.warn = (...args) => {
      origWarn(...args);
      pushMessage({ text: formatArgs(args), level: "warn" });
    };

    console.error = (...args) => {
      origErr(...args);
      pushMessage({ text: formatArgs(args), level: "error" });
    };

    return () => {
      console.log = origLog;
      console.warn = origWarn;
      console.error = origErr;
    };
  }, [pushMessage]);

  const value: DebugContextValue = {
    messages: state.messages,
    autoscroll: state.autoscroll,

    pushMessage,
    clearMessages,
    toggleAutoscroll,
  };

  return (
    <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
  );
}
