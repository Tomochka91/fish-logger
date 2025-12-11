import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Logger } from "../types";
import type { LoggerFormValues } from "../components/form/AddLoggerForm/loggerForm.types";
import toast from "react-hot-toast";
import { updateLogger } from "../../api/apiConnections";
import { mapFormValuesToPayload } from "../components/form/AddLoggerForm/mappers/mapFormValuesToPayload";

export function useUpdateLogger() {
  const queryClient = useQueryClient();
  const { mutate: updateLoggerMutate, isPending: isUpdating } = useMutation<
    Logger,
    Error,
    { id: number; values: LoggerFormValues }
  >({
    mutationFn: ({ id, values }) => {
      const payload = mapFormValuesToPayload(values);
      return updateLogger(id, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logger-list"] });
      toast.success("Logger was updated");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { updateLoggerMutate, isUpdating };
}
