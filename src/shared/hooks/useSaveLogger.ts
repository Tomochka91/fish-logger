import { useCallback } from "react";
import type { Logger } from "../types";
import { useCreateLogger } from "./useCreateLogger";
import { useUpdateLogger } from "./useUpdateLogger";
import type { LoggerFormValues } from "../components/form/AddLoggerForm/AddLoggerForm";

export function useSaveLogger(selectedLogger: Logger | null) {
  const { createLogger, isCreating } = useCreateLogger();
  const { updateLoggerMutate, isUpdating } = useUpdateLogger();

  const isEditMode = Boolean(selectedLogger);
  const isSaving = isCreating || isUpdating;

  const saveLogger = useCallback(
    (values: LoggerFormValues, options?: { onSuccess?: () => void }) => {
      const onSuccess = () => {
        options?.onSuccess?.();
      };

      if (isEditMode && selectedLogger) {
        updateLoggerMutate({ id: selectedLogger.id, values }, { onSuccess });
      } else {
        createLogger(values, { onSuccess });
      }
    },
    [isEditMode, selectedLogger, updateLoggerMutate, createLogger]
  );

  return { saveLogger, isSaving, isEditMode };
}
