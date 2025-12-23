import { useMutation } from "@tanstack/react-query";
import { restartLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/apiHelpers";
import type { LoggerStatus } from "../types";

export function useRestartLogger() {
  const { mutate: runtimeRestart, isPending: isRestarting } = useMutation<
    LoggerStatus,
    unknown,
    number
  >({
    mutationFn: (logId) => restartLogger(logId),

    onError: (err) => {
      toast.error(getErrorMessage(err, "Something went wrong"));
    },
  });

  return { runtimeRestart, isRestarting };
}
