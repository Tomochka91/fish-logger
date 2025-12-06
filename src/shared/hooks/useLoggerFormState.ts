import { useContext } from "react";
import { LoggerFormStateContext } from "../context/addLoggerForm/loggerFormContext";

export function useLoggerFormState() {
  const context = useContext(LoggerFormStateContext);
  if (!context) {
    throw new Error(
      "useLoggerFormState must be used within LoggerFormStateProvider"
    );
  }

  return context;
}
