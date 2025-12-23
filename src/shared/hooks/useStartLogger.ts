import { useMutation } from "@tanstack/react-query";
import { startLogger } from "../../api/apiConnections";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/apiHelpers";
import type { LoggerStatus } from "../types";

export function useStartLogger() {
  const { mutate: runtimeStart, isPending: isStarting } = useMutation<
    LoggerStatus,
    unknown,
    number
  >({
    mutationFn: (logId) => startLogger(logId),

    onError: (err) => {
      toast.error(getErrorMessage(err, "Something went wrong"));
    },
  });

  return { runtimeStart, isStarting };
}
