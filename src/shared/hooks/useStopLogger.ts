import { useMutation } from "@tanstack/react-query";
import { stopLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/apiHelpers";
import type { LoggerStatus } from "../types";

export function useStopLogger() {
  const { mutate: runtimeStop, isPending: isStopping } = useMutation<
    LoggerStatus,
    unknown,
    number
  >({
    mutationFn: (logId) => stopLogger(logId),

    onError: (err) => {
      toast.error(getErrorMessage(err, "Something went wrong"));
    },
  });

  return { runtimeStop, isStopping };
}
