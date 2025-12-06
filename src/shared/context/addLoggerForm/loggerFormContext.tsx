import { createContext } from "react";
import { type LoggerFormValues } from "../../components/form/AddLoggerForm/AddLoggerForm.types";

export type LoggerFormPersistedState = {
  values: Partial<LoggerFormValues>;
};

export const LoggerFormStateContext = createContext<
  | {
      state: LoggerFormPersistedState;
      setState: React.Dispatch<React.SetStateAction<LoggerFormPersistedState>>;
    }
  | undefined
>(undefined);
