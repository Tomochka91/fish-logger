import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Logger } from "../types";
import type { LoggerFormValues } from "../components/form/AddLoggerForm/AddLoggerForm";
import { postLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";

export function useCreateLogger() {
  const queryClient = useQueryClient();
  const { mutate: createLogger, isPending: isCreating } = useMutation<
    Logger,
    Error,
    LoggerFormValues
  >({
    mutationFn: (values) => postLogger(values),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logger-list"] });
      toast.success("New logger was created");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { createLogger, isCreating };
}
