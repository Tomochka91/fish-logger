import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Logger } from "../types";
import type { LoggerFormValues } from "../components/form/AddLoggerForm/loggerForm.types";
import { postLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";
import { mapFormValuesToPayload } from "../components/form/AddLoggerForm/mappers/mapFormValuesToPayload";
import { getErrorMessage } from "../utils/apiHelpers";

export function useCreateLogger() {
  const queryClient = useQueryClient();
  const { mutate: createLogger, isPending: isCreating } = useMutation<
    Logger,
    unknown,
    LoggerFormValues
  >({
    mutationFn: (values) => {
      const payload = mapFormValuesToPayload(values);
      return postLogger(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logger-list"] });
      toast.success("New logger was created");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err, "Failed to create logger"));
    },
  });

  return { createLogger, isCreating };
}
