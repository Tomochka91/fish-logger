import { useState } from "react";
import { defaultLoggerValues } from "../../components/form/AddLoggerForm/AddLoggerForm.types";
import {
  LoggerFormStateContext,
  type LoggerFormPersistedState,
} from "./loggerFormContext";

export function LoggerFormStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<LoggerFormPersistedState>({
    values: defaultLoggerValues,
  });

  return (
    <LoggerFormStateContext.Provider value={{ state, setState }}>
      {children}
    </LoggerFormStateContext.Provider>
  );
}
