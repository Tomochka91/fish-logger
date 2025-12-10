import { useState } from "react";
import {
  LoggerFormStateContext,
  type LoggerFormPersistedState,
} from "./loggerFormContext";
import type { UsedLoggerType } from "../../components/form/AddLoggerForm/loggerRegistry";
import { createLoggerDefaultValues } from "../../components/form/AddLoggerForm/loggerDefaults";

const DEFAULT_LOGGER_TYPE: UsedLoggerType = "easy_serial";

export function LoggerFormStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<LoggerFormPersistedState>(() => ({
    values: createLoggerDefaultValues(DEFAULT_LOGGER_TYPE),
  }));

  return (
    <LoggerFormStateContext.Provider value={{ state, setState }}>
      {children}
    </LoggerFormStateContext.Provider>
  );
}
