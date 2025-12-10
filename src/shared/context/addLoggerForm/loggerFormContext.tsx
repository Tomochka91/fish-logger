import { createContext } from "react";
import { type LoggerFormValues } from "../../components/form/AddLoggerForm/loggerForm.types";

export type LoggerFormPersistedState = {
  values: LoggerFormValues;
};

export const LoggerFormStateContext = createContext<
  | {
      state: LoggerFormPersistedState;
      setState: React.Dispatch<React.SetStateAction<LoggerFormPersistedState>>;
    }
  | undefined
>(undefined);
